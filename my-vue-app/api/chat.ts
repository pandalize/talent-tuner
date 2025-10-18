import type { VercelRequest, VercelResponse } from '@vercel/node'; // Vercelのサーバーレス関数で使うリクエスト・レスポンス型をインポート

type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};
type Messages = Message[];

export default async function handler(req: VercelRequest, res: VercelResponse) { // サーバーレスAPIのエントリーポイント（export defaultされた関数：他のファイルからインポートできる関数）となる非同期関数を定義
    if (req.method !== 'POST') {
        res.status(405).json({ エラー: 'メソッドが許可されていません' }); // メソッドがPOSTでない場合に405エラーを返すとJSONレスポンスを返す
        return;
    }

    try {
        const apiKey = process.env.CLAUDE_API_KEY; // 環境変数からAPIキーを取得
        const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', { // ClaudeのAPIエンドポイントにリクエストを送り、結果を取ってくる
            method: 'POST', // TTPメソッドはPOST
            headers: {
                'x-api-key': apiKey ?? '',
                'Content-Type': 'application/json',
                'anthropic-version': '2023-06-01', // 使用するAPIバージョンを指定
            },
            body: JSON.stringify({ // オブジェクトや配列をJSON形式の文字列に変換してリクエストボディにセット
                model: 'claude-3-5-haiku-latest', // 使用するモデルを指定
                messages: [
                    {
                        role: 'user',
                        content: 'こんにちは！'
                    }
                ],
                max_tokens: 256,
            })
        });

        const data = await claudeResponse.json(); // ClaudeのAPIからのレスポンスをJavaScriptのオブジェクトに変換
        res.status(200).json({ data }); // ClaudeのAPIからのレスポンスをJSONにして返す
    } catch (error) {}
        res.status(500).json({ エラー: '外部APIの呼び出しに失敗しました' }); // エラーメッセージをJSONレスポンスで返す
    }
}