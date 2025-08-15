<?php
/**
 * Claude API プロキシ
 * お名前.com共用サーバー対応版（レート制限機能付き）
 */

// エラーロギング設定
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../../logs/php_errors.log');

// カスタムログ関数
function logDebug($message, $data = null) {
    $timestamp = date('Y-m-d H:i:s');
    $logMessage = "[$timestamp] DEBUG: $message";
    if ($data !== null) {
        $logMessage .= " | Data: " . json_encode($data, JSON_UNESCAPED_UNICODE);
    }
    $logMessage .= "\n";
    
    // ファイルログ（共用サーバー対応）
    $logDir = __DIR__ . '/../../logs';
    if (!is_dir($logDir)) {
        if (!@mkdir($logDir, 0755, true)) {
            // ログディレクトリ作成失敗時の代替パス
            $logDir = sys_get_temp_dir() . '/talent-tuner-logs';
            @mkdir($logDir, 0755, true);
        }
    }
    
    // ログファイル権限設定
    $logFile = $logDir . '/chat_debug.log';
    error_log($logMessage, 3, $logFile);
    
    if (file_exists($logFile) && is_writable($logFile)) {
        @chmod($logFile, 0644);
    }
    
    // 開発環境では標準エラー出力も
    if ($_SERVER['HTTP_HOST'] === 'localhost' || strpos($_SERVER['HTTP_HOST'], '127.0.0.1') !== false) {
        error_log($logMessage);
    }
}

function logError($message, $error = null) {
    $timestamp = date('Y-m-d H:i:s');
    $logMessage = "[$timestamp] ERROR: $message";
    if ($error !== null) {
        $logMessage .= " | Error: " . json_encode($error, JSON_UNESCAPED_UNICODE);
    }
    $logMessage .= "\n";
    
    // ファイルログ（共用サーバー対応）
    $logDir = __DIR__ . '/../../logs';
    if (!is_dir($logDir)) {
        if (!@mkdir($logDir, 0755, true)) {
            // ログディレクトリ作成失敗時の代替パス
            $logDir = sys_get_temp_dir() . '/talent-tuner-logs';
            @mkdir($logDir, 0755, true);
        }
    }
    
    // ログファイル権限設定
    $logFile = $logDir . '/chat_errors.log';
    error_log($logMessage, 3, $logFile);
    
    if (file_exists($logFile) && is_writable($logFile)) {
        @chmod($logFile, 0644);
    }
    
    // 標準エラー出力
    error_log($logMessage);
}

// スクリプト開始をログ
logDebug("chat-proxy.php スクリプト開始", [
    'REQUEST_METHOD' => $_SERVER['REQUEST_METHOD'] ?? 'UNKNOWN',
    'HTTP_HOST' => $_SERVER['HTTP_HOST'] ?? 'UNKNOWN',
    'REQUEST_URI' => $_SERVER['REQUEST_URI'] ?? 'UNKNOWN',
    'PHP_VERSION' => phpversion(),
    'SCRIPT_FILENAME' => __FILE__
]);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// プリフライトリクエスト対応
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    logDebug("プリフライトリクエスト処理");
    exit(0);
}

// POSTメソッドのみ許可
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    logError("不正なHTTPメソッド", ['method' => $_SERVER['REQUEST_METHOD']]);
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

logDebug("POSTリクエスト確認OK");

// レート制限設定
define('MAX_MESSAGES_PER_SESSION', 20);
define('MAX_MESSAGES_PER_HOUR', 10);
define('MAX_MESSAGES_PER_DAY', 30);
define('MAX_INPUT_LENGTH', 500);
define('MAX_OUTPUT_TOKENS', 800);
define('COOLDOWN_SECONDS', 10);

// お名前.com共用サーバー最適化設定
if (!defined('PHP_VERSION_ID') || PHP_VERSION_ID < 70400) {
    logError("PHPバージョンが古すぎます", ['php_version' => phpversion()]);
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'error' => 'サーバー設定が最新ではありません。サポートにお問い合わせください。',
        'error_code' => 'PHP_VERSION_ERROR',
        'support_contact' => 'pandalize.info@gmail.com'
    ]);
    exit;
}

// メモリ使用量最適化
$memoryLimit = ini_get('memory_limit');
$memoryLimitBytes = return_bytes($memoryLimit);
$currentMemory = memory_get_usage();

logDebug("メモリ使用状況", [
    'memory_limit' => $memoryLimit,
    'memory_limit_bytes' => $memoryLimitBytes,
    'current_usage_bytes' => $currentMemory,
    'current_usage_mb' => round($currentMemory / 1024 / 1024, 2)
]);

// メモリ制限のチェック（共用サーバー対応）
if ($memoryLimitBytes && $currentMemory > $memoryLimitBytes * 0.8) {
    logError("メモリ使用量が制限に近い", [
        'limit' => $memoryLimit,
        'usage' => round($currentMemory / 1024 / 1024, 2) . 'MB'
    ]);
}

// バイト単位変換用ヘルパー関数
function return_bytes($val) {
    $val = trim($val);
    $last = strtolower($val[strlen($val)-1]);
    $val = (int)$val;
    switch($last) {
        case 'g': $val *= 1024;
        case 'm': $val *= 1024;
        case 'k': $val *= 1024;
    }
    return $val;
}

// セッション設定（共用サーバー最適化）
ini_set('session.cookie_httponly', 1);
ini_set('session.use_strict_mode', 1);
ini_set('session.cookie_samesite', 'Strict');

// セッションの安全な開始（共用サーバー対応）
try {
    logDebug("セッション開始試行", [
        'session_save_path' => session_save_path(),
        'session_name' => session_name()
    ]);
    
    // セッション保存パスの確認と作成
    $sessionPath = session_save_path();
    if (empty($sessionPath)) {
        $sessionPath = sys_get_temp_dir();
        session_save_path($sessionPath);
        logDebug("セッション保存パス設定", ['path' => $sessionPath]);
    }
    
    if (!is_dir($sessionPath)) {
        logError("セッション保存ディレクトリが存在しない", ['path' => $sessionPath]);
    } elseif (!is_writable($sessionPath)) {
        logError("セッション保存ディレクトリが書き込み不可", ['path' => $sessionPath]);
    }
    
    session_start();
    logDebug("セッション開始成功", [
        'session_id' => session_id(),
        'session_save_path' => session_save_path()
    ]);
} catch (Exception $e) {
    logError("セッション開始失敗", ['error' => $e->getMessage()]);
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'error' => 'サーバー設定エラーが発生しました。しばらく後に再試行してください。',
        'error_code' => 'SESSION_ERROR',
        'support_contact' => 'pandalize.info@gmail.com'
    ]);
    exit;
}

// セッション初期化
if (!isset($_SESSION['chat_session'])) {
    logDebug("新規チャットセッション初期化");
    $_SESSION['chat_session'] = [
        'message_count' => 0,
        'hourly_messages' => [],
        'daily_messages' => [],
        'last_message_time' => 0,
        'session_start_time' => time()
    ];
} else {
    logDebug("既存チャットセッション利用", [
        'message_count' => $_SESSION['chat_session']['message_count']
    ]);
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

// 環境変数またはファイルからAPIキーを取得（強化版）
function getApiKey() {
    logDebug("APIキー取得開始");
    
    // デバッグ: ディレクトリ情報をログ出力
    logDebug("ディレクトリ情報", [
        '__DIR__' => __DIR__,
        'DOCUMENT_ROOT' => $_SERVER['DOCUMENT_ROOT'] ?? 'not_set',
        'SCRIPT_FILENAME' => $_SERVER['SCRIPT_FILENAME'] ?? 'not_set',
        'get_current_user()' => get_current_user(),
        'getcwd()' => getcwd()
    ]);
    
    // 1. 複数のパスパターンで.envファイルを検索
    $envPaths = [
        __DIR__ . '/.env',                          // 同じディレクトリ
        __DIR__ . '/../.env',                       // 一つ上（public/）
        __DIR__ . '/../../.env',                    // 二つ上（pandalize.com/）
        __DIR__ . '/../../../.env',                 // 三つ上
        __DIR__ . '/../../../../.env',              // 四つ上
        $_SERVER['DOCUMENT_ROOT'] . '/.env',        // ドキュメントルート
        dirname($_SERVER['SCRIPT_FILENAME']) . '/../../.env',  // スクリプトベース
        '/home/' . get_current_user() . '/public_html/.env',   // 一般的な共用サーバー構造
        '/home/' . get_current_user() . '/public_html/pandalize.com/.env',   // ドメイン直下
        '/.env',                                    // ルートディレクトリ
        getcwd() . '/.env'                         // 現在の作業ディレクトリ
    ];
    
    logDebug("envファイル検索開始", ['search_paths' => count($envPaths)]);
    
    foreach ($envPaths as $envFile) {
        logDebug("envファイルパス試行", ['path' => $envFile, 'exists' => file_exists($envFile)]);
        
        if (file_exists($envFile) && is_readable($envFile)) {
            logDebug(".envファイル発見・読み込み開始", ['path' => $envFile]);
            
            try {
                $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                logDebug(".envファイル読み込み成功", ['line_count' => count($lines), 'path' => $envFile]);
                
                foreach ($lines as $line) {
                    $line = trim($line);
                    
                    // コメント行をスキップ
                    if (empty($line) || $line[0] === '#') {
                        continue;
                    }
                    
                    // 複数のキー形式を試行
                    $keyPatterns = [
                        'VITE_CLAUDE_API_KEY=',
                        'CLAUDE_API_KEY=',
                        'ANTHROPIC_API_KEY=',
                        'API_KEY='
                    ];
                    
                    foreach ($keyPatterns as $pattern) {
                        if (strpos($line, $pattern) === 0) {
                            $key = substr($line, strlen($pattern));
                            // クオートを除去
                            $key = trim($key, '"\'');
                            
                            if (!empty($key)) {
                                $keyLength = strlen($key);
                                logDebug("APIキー発見", [
                                    'pattern' => $pattern,
                                    'key_length' => $keyLength,
                                    'key_prefix' => substr($key, 0, 10) . '...',
                                    'from_file' => $envFile
                                ]);
                                return $key;
                            }
                        }
                    }
                }
                logDebug("APIキーが.envファイルに見つからない", ['file' => $envFile]);
                
            } catch (Exception $e) {
                logError(".envファイル読み込みエラー", ['file' => $envFile, 'error' => $e->getMessage()]);
                continue;
            }
        }
    }
    
    // 2. 環境変数から取得（複数パターン）
    $envVars = [
        'CLAUDE_API_KEY',
        'VITE_CLAUDE_API_KEY',
        'ANTHROPIC_API_KEY',
        'API_KEY'
    ];
    
    foreach ($envVars as $envVar) {
        $apiKey = getenv($envVar);
        if (!empty($apiKey)) {
            logDebug("環境変数から取得成功", ['var_name' => $envVar]);
            return $apiKey;
        }
    }
    
    // 3. $_SERVER変数から取得
    foreach ($envVars as $envVar) {
        if (isset($_SERVER[$envVar]) && !empty($_SERVER[$envVar])) {
            logDebug("$_SERVER変数から取得成功", ['var_name' => $envVar]);
            return $_SERVER[$envVar];
        }
    }
    
    // 4. 設定ファイルから取得（最後の手段）
    $configPaths = [
        __DIR__ . '/config.php',
        __DIR__ . '/../config.php',
        __DIR__ . '/../../config.php'
    ];
    
    foreach ($configPaths as $configFile) {
        if (file_exists($configFile)) {
            try {
                logDebug("設定ファイル試行", ['path' => $configFile]);
                include_once $configFile;
                if (defined('CLAUDE_API_KEY') && !empty(CLAUDE_API_KEY)) {
                    logDebug("設定ファイルから取得成功", ['file' => $configFile]);
                    return CLAUDE_API_KEY;
                }
            } catch (Exception $e) {
                logError("設定ファイル読み込みエラー", ['file' => $configFile, 'error' => $e->getMessage()]);
            }
        }
    }
    
    logError("APIキーが見つからない - 全ての方法を試行済み", [
        'env_paths_tried' => count($envPaths),
        'env_vars_tried' => $envVars,
        'config_paths_tried' => count($configPaths)
    ]);
    return null;
}

// リクエストデータの取得
logDebug("リクエストデータ取得開始");
$rawInput = file_get_contents('php://input');
logDebug("生リクエストデータ", ['raw_length' => strlen($rawInput), 'raw_preview' => substr($rawInput, 0, 100)]);

$input = json_decode($rawInput, true);
$jsonError = json_last_error();

if ($jsonError !== JSON_ERROR_NONE) {
    logError("JSON解析エラー", ['json_error' => json_last_error_msg(), 'raw_input' => $rawInput]);
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON data']);
    exit;
}

if (!$input || !isset($input['message'])) {
    logError("リクエストデータ検証失敗", ['input' => $input]);
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid request data']);
    exit;
}

logDebug("リクエストデータ検証OK", ['message_length' => strlen($input['message'])]);

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

logDebug("APIキー取得試行");
$apiKey = getApiKey();
if (!$apiKey) {
    logError("APIキー取得失敗 - 設定されていない");
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'API key not configured']);
    exit;
}
logDebug("APIキー取得成功");

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
logDebug("Claude API呼び出し準備開始");
$ch = curl_init();

if (!$ch) {
    logError("cURL初期化失敗");
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'cURL初期化エラー']);
    exit;
}

// 共用サーバー対応のcURLオプション設定
$curlOptions = [
    CURLOPT_URL => 'https://api.anthropic.com/v1/messages',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($claudeData),
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'x-api-key: ' . $apiKey,
        'anthropic-version: 2023-06-01',
        'Connection: close'  // 共用サーバーでの接続問題対策
    ],
    CURLOPT_TIMEOUT => 30,
    CURLOPT_CONNECTTIMEOUT => 10,      // 接続タイムアウト
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_SSL_VERIFYHOST => 2,
    CURLOPT_FOLLOWLOCATION => false,    // リダイレクト無効（セキュリティ）
    CURLOPT_MAXREDIRS => 0,
    CURLOPT_USERAGENT => 'TalentTuner/1.0',
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,  // HTTP/1.1を強制
    CURLOPT_FRESH_CONNECT => true,     // 新しい接続を強制
    CURLOPT_FORBID_REUSE => true,      // 接続再利用を禁止
    CURLOPT_DNS_CACHE_TIMEOUT => 60,   // DNS キャッシュタイムアウト
    CURLOPT_LOW_SPEED_LIMIT => 1,      // 低速接続の検出
    CURLOPT_LOW_SPEED_TIME => 10,      // 低速接続のタイムアウト
];

// 共用サーバーでプロキシが必要な場合の設定
if (getenv('HTTP_PROXY')) {
    $curlOptions[CURLOPT_PROXY] = getenv('HTTP_PROXY');
    logDebug("プロキシ設定検出", ['proxy' => getenv('HTTP_PROXY')]);
}

// IPv4を優先（共用サーバーでのIPv6問題対策）
if (defined('CURLOPT_IPRESOLVE')) {
    $curlOptions[CURLOPT_IPRESOLVE] = CURL_IPRESOLVE_V4;
}

logDebug("cURLオプション設定", [
    'url' => $curlOptions[CURLOPT_URL],
    'timeout' => $curlOptions[CURLOPT_TIMEOUT],
    'postfields_length' => strlen($curlOptions[CURLOPT_POSTFIELDS])
]);

curl_setopt_array($ch, $curlOptions);

// API呼び出し実行
logDebug("Claude API呼び出し実行開始");
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
$curlInfo = curl_getinfo($ch);
curl_close($ch);

logDebug("Claude API呼び出し完了", [
    'http_code' => $httpCode,
    'curl_error' => $error,
    'response_length' => strlen($response),
    'total_time' => $curlInfo['total_time']
]);

// エラーハンドリング（強化版）
if ($error) {
    logError("cURLネットワークエラー", ['error' => $error, 'curl_info' => $curlInfo]);
    
    // 具体的なエラーメッセージを提供
    $userError = 'ネットワーク接続エラーが発生しました。';
    if (strpos($error, 'Could not resolve host') !== false) {
        $userError = 'サーバーに接続できません。インターネット接続を確認してください。';
    } elseif (strpos($error, 'SSL') !== false || strpos($error, 'certificate') !== false) {
        $userError = 'セキュリティ証明書の問題が発生しました。しばらく後に再試行してください。';
    } elseif (strpos($error, 'timeout') !== false || strpos($error, 'Timeout') !== false) {
        $userError = '接続タイムアウトが発生しました。しばらく後に再試行してください。';
    }
    
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'error' => $userError,
        'error_code' => 'NETWORK_ERROR',
        'support_contact' => 'pandalize.info@gmail.com'
    ]);
    exit;
}

if ($httpCode !== 200) {
    logError("Claude API HTTPエラー", [
        'http_code' => $httpCode,
        'response' => substr($response, 0, 500),
        'curl_info' => $curlInfo
    ]);
    
    // HTTPコードに応じた詳細なエラーハンドリング
    $userError = '';
    $errorCode = '';
    
    switch ($httpCode) {
        case 401:
            $userError = 'API認証に失敗しました。設定を確認中です。';
            $errorCode = 'API_AUTH_ERROR';
            break;
        case 403:
            $userError = 'APIアクセス権限がありません。サポートにお問い合わせください。';
            $errorCode = 'API_PERMISSION_ERROR';
            break;
        case 429:
            $userError = 'APIの使用制限に達しました。しばらく待ってから再試行してください。';
            $errorCode = 'API_RATE_LIMIT';
            break;
        case 500:
        case 502:
        case 503:
        case 504:
            $userError = 'AIサービスが一時的に利用できません。しばらく後に再試行してください。';
            $errorCode = 'API_SERVER_ERROR';
            break;
        default:
            $userError = 'AIサービスで予期しないエラーが発生しました。しばらく後に再試行してください。';
            $errorCode = 'API_UNKNOWN_ERROR';
    }
    
    echo json_encode([
        'success' => false, 
        'error' => $userError,
        'error_code' => $errorCode,
        'http_code' => $httpCode,
        'support_contact' => 'pandalize.info@gmail.com',
        'timestamp' => date('c')
    ]);
    http_response_code($httpCode);
    exit;
}

// レスポンス解析
logDebug("レスポンス解析開始");
$claudeResponse = json_decode($response, true);
$jsonError = json_last_error();

if ($jsonError !== JSON_ERROR_NONE) {
    logError("レスポンスJSON解析エラー", [
        'json_error' => json_last_error_msg(),
        'json_error_code' => $jsonError,
        'response_preview' => substr($response, 0, 200),
        'response_length' => strlen($response)
    ]);
    
    $userError = 'AIサービスからの応答を正しく解析できませんでした。しばらく後に再試行してください。';
    
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'error' => $userError,
        'error_code' => 'API_RESPONSE_PARSE_ERROR',
        'support_contact' => 'pandalize.info@gmail.com',
        'timestamp' => date('c')
    ]);
    exit;
}

if (!$claudeResponse || !isset($claudeResponse['content'][0]['text'])) {
    // Claude APIエラーレスポンスの場合の詳細処理
    $apiErrorMessage = '';
    if (isset($claudeResponse['error']['message'])) {
        $apiErrorMessage = $claudeResponse['error']['message'];
    } elseif (isset($claudeResponse['message'])) {
        $apiErrorMessage = $claudeResponse['message'];
    }
    
    logError("Claude APIレスポンス構造エラー", [
        'response_structure' => array_keys($claudeResponse ?? []),
        'has_content' => isset($claudeResponse['content']),
        'content_count' => isset($claudeResponse['content']) ? count($claudeResponse['content']) : 0,
        'api_error_message' => $apiErrorMessage,
        'full_response' => $claudeResponse
    ]);
    
    $userError = 'AIサービスから予期しない応答形式を受信しました。';
    if (!empty($apiErrorMessage)) {
        if (strpos($apiErrorMessage, 'rate limit') !== false || strpos($apiErrorMessage, 'quota') !== false) {
            $userError = 'APIの使用制限に達しました。しばらく待ってから再試行してください。';
        } elseif (strpos($apiErrorMessage, 'invalid') !== false || strpos($apiErrorMessage, 'authentication') !== false) {
            $userError = 'API認証エラーが発生しました。設定を確認中です。';
        } else {
            $userError = 'AI処理エラー: ' . substr($apiErrorMessage, 0, 100);
        }
    }
    
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'error' => $userError,
        'error_code' => 'API_RESPONSE_STRUCTURE_ERROR',
        'support_contact' => 'pandalize.info@gmail.com',
        'timestamp' => date('c')
    ]);
    exit;
}

// 使用状況を記録
logDebug("使用状況記録");
recordUsage();

// 成功レスポンス
$responseData = [
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
];

logDebug("処理成功 - レスポンス送信", [
    'message_length' => strlen($claudeResponse['content'][0]['text']),
    'session_messages' => $_SESSION['chat_session']['message_count']
]);

echo json_encode($responseData);
?>