import type { VercelRequest, VercelResponse } from '@vercel/node'; // Vercelのサーバーレス関数で使うリクエスト・レスポンス型をインポート

type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
};
type Messages = Message[];

export default async function handler(req: VercelRequest, res: VercelResponse) { // サーバーレスAPIのエントリーポイント（export defaultされた関数：他のファイルからインポートできる関数）となる非同期関数を定義
    const allowedOrigin = (process.env.ALLOWED_ORIGINS ?? ''); // 環境変数から許可されたオリジンを取得（undefined を空文字に正規化）

    console.log(`[incoming] ${req.method} ${req.url} origin=${req.headers.origin ?? 'unknown'}`);

    // プリフライト対応、リクエストが許可されるかを確かめる、もうちょっと勉強が必要
    // 空文字をそのままセットしない（型エラーと不適切なヘッダ設定を防ぐ）
    if (allowedOrigin) res.setHeader('Access-Control-Allow-Origin', allowedOrigin); // リクエストを送信できるオリジンを指定
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // リクエストで許可されるヘッダーを指定

    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); // 許可されるHTTPメソッドを指定
        res.status(204).end(); // HTTPレスポンスの送信を完了し、接続を閉じる
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ エラー: 'POSTのみ許可' });
        return;
    }

    console.log('[user]', req.body);

    try {
        const apiKey = process.env.CLAUDE_API_KEY; // 環境変数からAPIキーを取得
        const { messages } = req.body; // フロントから受け取ったbodyの中でmessagesだけをmessagesに保存、今はbodyにmessagesしかないが、将来他のデータが増えたときに備えて分割代入で取得

        // --- 追加: 外部APIの情報を変数化してログ出力 ---
        const externalApi = 'https://api.anthropic.com/v1/messages';
        const model = 'claude-3-5-haiku-latest';
        console.log(`[outgoing] POST ${externalApi} model=${model} messages=${Array.isArray(messages) ? messages.length : 0}`);
        // --- ここまで追加 ---

        const claudeResponse = await fetch(externalApi, { // ClaudeのAPIエンドポイントにリクエストを送り、結果を取ってくる
            method: 'POST', // HTTPメソッドはPOST
            headers: {
                'x-api-key': apiKey ?? '',
                'Content-Type': 'application/json',
                'anthropic-version': '2023-06-01', // 使用するAPIバージョンを指定
            },
            body: JSON.stringify({ // オブジェクトや配列をJSON形式の文字列に変換してリクエストボディにセット
                model, // ここを model 変数に変更
                messages,
                max_tokens: 256,
            })
        });

        // --- 追加: 外部APIのHTTPステータスをログ出力 ---
        console.log(`[outgoing] response status: ${claudeResponse.status}`);
        // --- ここまで追加 ---

        // 型チェックでエラーにならないよう any にしてから抽出
        const data: any = await claudeResponse.json(); // ClaudeのAPIからのレスポンスをJavaScriptのオブジェクトに変換
        const aiText = data?.content?.[0]?.text || ''; // レスポンスからテキストを抽出
        console.log('[assistant] ', data);
        res.status(200).json( aiText ); // ClaudeのAPIからのレスポンスをJSONにして返す
    } catch (error) {
        res.status(500).json({ エラー: '外部APIの呼び出しに失敗しました' }); // エラーメッセージをJSONレスポンスで返す
    }
}