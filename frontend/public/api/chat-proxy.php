<?php
/**
 * Claude API プロキシ
 * 開発・本番環境統一版
 */

// CORS設定
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// プリフライトリクエスト対応
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// POSTメソッドのみ許可
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// レート制限設定
define('MAX_OUTPUT_TOKENS', 800);

// APIキー取得
function getApiKey() {
    $envPaths = [
        __DIR__ . '/.env',
        __DIR__ . '/../.env',
        __DIR__ . '/../../.env'
    ];
    
    foreach ($envPaths as $envFile) {
        if (file_exists($envFile) && is_readable($envFile)) {
            $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                $line = trim($line);
                if (strpos($line, 'VITE_CLAUDE_API_KEY=') === 0) {
                    return substr($line, strlen('VITE_CLAUDE_API_KEY='));
                }
            }
        }
    }
    return null;
}

// リクエストデータの取得
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

if (!$input || !isset($input['message'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid request data']);
    exit;
}

$userMessage = $input['message'];
$apiKey = getApiKey();

if (!$apiKey) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'APIキーが設定されていません']);
    exit;
}

// Claude APIへのリクエスト準備
$claudeData = [
    'model' => 'claude-3-5-haiku-20241022',
    'max_tokens' => MAX_OUTPUT_TOKENS,
    'temperature' => 0.7,
    'system' => 'あなたは「ため職」という職業適性診断サービスの進路相談AIアシスタントです。以下の28の職業から適切な職業を提案し、具体的で実践的なアドバイスを提供してください。

【対応職業一覧】
プログラマー、Webデザイナー、グラフィックデザイナー、公認会計士、税理士、建設業、製造業、起業家、経営コンサルタント、営業職、建築士、保育士、看護師、教師、社会福祉士、カウンセラー・心理士、研究者、データサイエンティスト、マーケティング、広告・PR、エンジニア、医師、薬剤師、獣医師、弁護士、公務員、金融、不動産

【回答方針】
1. 相談者の状況を理解し共感を示す
2. 具体的な職業を1-3個提案
3. その理由を明確に説明
4. 必要なスキルやキャリアパスを説明
5. 次のステップを具体的に提示
6. 親しみやすく励ます口調で回答

【注意事項】
- 回答は400文字以内で簡潔にまとめる
- 具体的で実行可能なアドバイスを提供
- 年収や労働環境などの現実的な情報も含める
- 適性診断の受診も適宜提案する',
    'messages' => [
        [
            'role' => 'user',
            'content' => $userMessage
        ]
    ]
];

// cURL設定
$ch = curl_init();
$curlOptions = [
    CURLOPT_URL => 'https://api.anthropic.com/v1/messages',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($claudeData),
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'x-api-key: ' . $apiKey,
        'anthropic-version: 2023-06-01'
    ],
    CURLOPT_TIMEOUT => 30,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_SSL_VERIFYHOST => 2,
];

curl_setopt_array($ch, $curlOptions);

// API呼び出し実行
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

// エラーハンドリング
if ($error) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'ネットワークエラーが発生しました']);
    exit;
}

if ($httpCode !== 200) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'AIサービスで一時的な問題が発生しました']);
    exit;
}

// レスポンス処理
$responseData = json_decode($response, true);
if (!$responseData || !isset($responseData['content'][0]['text'])) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'AIサービスからの応答を解析できませんでした']);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => $responseData['content'][0]['text']
]);
?>