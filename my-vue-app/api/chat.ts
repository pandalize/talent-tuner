import type { VercelRequest, VercelResponse } from '@vercel/node'; // Vercelのサーバーレス関数で使うリクエスト・レスポンス型をインポート
export default async function handler(req: VercelRequest, res: VercelResponse) { // サーバーレスAPIのエントリーポイント（export defaultされた関数：他のファイルからインポートできる関数）となる非同期関数を定義
    if (req.method !== 'POST') {
        res.status(405).json({ エラー: 'メソッドが許可されていません' }); // メソッドがPOSTでない場合に405エラーを返すとJSONレスポンスを返す
        return;
    }
    res.status(200).json({成功: 'APIが正常に呼び出されました'}); // 成功時に200ステータスとJSONレスポンスを返す
}