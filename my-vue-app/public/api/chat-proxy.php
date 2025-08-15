<?php
/**
 * Claude API プロキシ
 * お名前.com共用サーバー対応版（レート制限機能付き）
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

// レート制限設定
define('MAX_MESSAGES_PER_SESSION', 20);
define('MAX_MESSAGES_PER_HOUR', 10);
define('MAX_MESSAGES_PER_DAY', 30);
define('MAX_INPUT_LENGTH', 500);
define('MAX_OUTPUT_TOKENS', 800);
define('COOLDOWN_SECONDS', 10);

// セッションデータを管理
session_start();

// セッション初期化
if (!isset($_SESSION['chat_session'])) {
    $_SESSION['chat_session'] = [
        'message_count' => 0,
        'hourly_messages' => [],
        'daily_messages' => [],
        'last_message_time' => 0,
        'session_start_time' => time()
    ];
}

// レート制限チェック
function checkRateLimit() {
    $now = time();
    $session = &$_SESSION['chat_session'];
    
    // クールダウンチェック
    $timeSinceLastMessage = $now - $session['last_message_time'];
    if ($timeSinceLastMessage < COOLDOWN_SECONDS) {
        $waitTime = COOLDOWN_SECONDS - $timeSinceLastMessage;
        return ['allowed' => false, 'error' => "少しお待ちください。{$waitTime}秒後に送信できます。"];
    }
    
    // セッション制限チェック
    if ($session['message_count'] >= MAX_MESSAGES_PER_SESSION) {
        return ['allowed' => false, 'error' => 'セッションのメッセージ数上限に達しました。'];
    }
    
    // 時間制限チェック（1時間）
    $session['hourly_messages'] = array_filter($session['hourly_messages'], function($time) use ($now) {
        return ($now - $time) < 3600;
    });
    if (count($session['hourly_messages']) >= MAX_MESSAGES_PER_HOUR) {
        return ['allowed' => false, 'error' => '1時間あたりのメッセージ数上限に達しました。'];
    }
    
    // 日次制限チェック（24時間）
    $session['daily_messages'] = array_filter($session['daily_messages'], function($time) use ($now) {
        return ($now - $time) < 86400;
    });
    if (count($session['daily_messages']) >= MAX_MESSAGES_PER_DAY) {
        return ['allowed' => false, 'error' => '本日のメッセージ数上限に達しました。'];
    }
    
    return ['allowed' => true];
}

// 使用状況を記録
function recordUsage() {
    $now = time();
    $session = &$_SESSION['chat_session'];
    
    $session['message_count']++;
    $session['hourly_messages'][] = $now;
    $session['daily_messages'][] = $now;
    $session['last_message_time'] = $now;
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
    echo json_encode(['success' => false, 'error' => 'Invalid request data']);
    exit;
}

// 入力検証
$message = trim($input['message']);
if (empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'メッセージを入力してください。']);
    exit;
}

if (strlen($message) > MAX_INPUT_LENGTH) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'メッセージは' . MAX_INPUT_LENGTH . '文字以内で入力してください。']);
    exit;
}

// 不適切なコンテンツチェック
$bannedPatterns = [
    '/\b(hack|exploit|injection|malicious)\b/i',
    '/<script/i',
    '/javascript:/i'
];

foreach ($bannedPatterns as $pattern) {
    if (preg_match($pattern, $message)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => '不適切な内容が含まれています。']);
        exit;
    }
}

// レート制限チェック
$rateCheck = checkRateLimit();
if (!$rateCheck['allowed']) {
    http_response_code(429);
    echo json_encode(['success' => false, 'error' => $rateCheck['error']]);
    exit;
}

$apiKey = getApiKey();
if (!$apiKey) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'API key not configured']);
    exit;
}

// Claude APIへのリクエスト準備
$claudeData = [
    'model' => 'claude-3-5-haiku-20241022',  // コスト効率の良いHaikuモデル
    'max_tokens' => MAX_OUTPUT_TOKENS,
    'temperature' => 0.7,
    'messages' => [
        [
            'role' => 'system',
            'content' => '
あなたは「ため職」という職業適性診断サービスの進路相談AIアシスタントです。以下の28の職業から適切な職業を提案し、具体的で実践的なアドバイスを提供してください。

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
- 適性診断の受診も適宜提案する
            '
        ],
        [
            'role' => 'user',
            'content' => $message
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
    echo json_encode(['success' => false, 'error' => 'Network error: ' . $error]);
    exit;
}

if ($httpCode !== 200) {
    // レート制限エラーの場合
    if ($httpCode === 429) {
        echo json_encode(['success' => false, 'error' => 'API rate limit exceeded. Please try again later.']);
    } else {
        echo json_encode(['success' => false, 'error' => 'API error: HTTP ' . $httpCode]);
    }
    http_response_code($httpCode);
    exit;
}

// レスポンス解析
$claudeResponse = json_decode($response, true);

if (!$claudeResponse || !isset($claudeResponse['content'][0]['text'])) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Invalid API response']);
    exit;
}

// 使用状況を記録
recordUsage();

// 成功レスポンス
echo json_encode([
    'success' => true,
    'message' => $claudeResponse['content'][0]['text'],
    'timestamp' => date('c'),
    'usage_stats' => [
        'session_messages' => $_SESSION['chat_session']['message_count'],
        'session_limit' => MAX_MESSAGES_PER_SESSION,
        'hourly_count' => count($_SESSION['chat_session']['hourly_messages']),
        'hourly_limit' => MAX_MESSAGES_PER_HOUR,
        'daily_count' => count($_SESSION['chat_session']['daily_messages']),
        'daily_limit' => MAX_MESSAGES_PER_DAY
    ]
]);
?>