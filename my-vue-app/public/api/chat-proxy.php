<?php
/**
 * Claude API プロキシ
 * お名前.com共用サーバー対応版
 */

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

// 環境変数またはファイルからAPIキーを取得
function getApiKey() {
    // .envファイルから取得を試行
    $envFile = __DIR__ . '/../../.env';
    if (file_exists($envFile)) {
        $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            if (strpos($line, 'VITE_CLAUDE_API_KEY=') === 0) {
                return substr($line, strlen('VITE_CLAUDE_API_KEY='));
            }
        }
    }
    
    // 環境変数から取得
    $apiKey = getenv('CLAUDE_API_KEY');
    if ($apiKey) {
        return $apiKey;
    }
    
    return null;
}

// リクエストデータの取得
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request data']);
    exit;
}

$apiKey = getApiKey();
if (!$apiKey) {
    http_response_code(500);
    echo json_encode(['error' => 'API key not configured']);
    exit;
}

// Claude APIへのリクエスト準備
$claudeData = [
    'model' => 'claude-3-haiku-20240307',
    'max_tokens' => 1000,
    'messages' => [
        [
            'role' => 'system',
            'content' => '
あなたは進路相談のプロフェッショナルなアドバイザーです。以下の28の職業から適切な職業を提案し、具体的で実践的なアドバイスを提供してください。

【対応職業一覧】
プログラマー、Webデザイナー、グラフィックデザイナー、公認会計士、税理士、建設業、製造業、起業家、経営コンサルタント、営業職、建築士、保育士、看護師、教師、社会福祉士、カウンセラー・心理士、研究者、データサイエンティスト、マーケティング、広告・PR、エンジニア、医師、薬剤師、獣医師、弁護士、公務員、金融、不動産

回答の際は：
1. 相談者の状況を理解し共感を示す
2. 具体的な職業を1-3個提案
3. その理由を明確に説明
4. 次のステップを具体的に提示
5. 親しみやすく励ます口調で回答

回答は500文字以内で簡潔にまとめてください。
            '
        ],
        [
            'role' => 'user',
            'content' => $input['message']
        ]
    ]
];

// cURLセッション開始
$ch = curl_init();
curl_setopt_array($ch, [
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
    CURLOPT_USERAGENT => 'TalentTuner/1.0'
]);

// API呼び出し実行
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

// エラーハンドリング
if ($error) {
    http_response_code(500);
    echo json_encode(['error' => 'Network error: ' . $error]);
    exit;
}

if ($httpCode !== 200) {
    http_response_code($httpCode);
    echo json_encode(['error' => 'API error: HTTP ' . $httpCode]);
    exit;
}

// レスポンス解析
$claudeResponse = json_decode($response, true);

if (!$claudeResponse || !isset($claudeResponse['content'][0]['text'])) {
    http_response_code(500);
    echo json_encode(['error' => 'Invalid API response']);
    exit;
}

// 成功レスポンス
echo json_encode([
    'success' => true,
    'message' => $claudeResponse['content'][0]['text'],
    'timestamp' => date('c')
]);
?>