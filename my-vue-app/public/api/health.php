<?php
/**
 * ヘルスチェック・診断エンドポイント
 * 本番環境の設定状況を確認するためのAPI
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// プリフライトリクエスト対応
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// APIキー取得関数（chat-proxy.phpと同じロジック）
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

// セッション情報取得（安全に）
function getSessionInfo() {
    try {
        session_start();
        return [
            'session_started' => true,
            'session_id' => session_id(),
            'session_save_path' => session_save_path(),
            'has_chat_session' => isset($_SESSION['chat_session']),
            'message_count' => $_SESSION['chat_session']['message_count'] ?? 0
        ];
    } catch (Exception $e) {
        return [
            'session_started' => false,
            'error' => $e->getMessage()
        ];
    }
}

// ディスク容量チェック
function getDiskInfo() {
    $freeBytes = disk_free_space(__DIR__);
    $totalBytes = disk_total_space(__DIR__);
    
    return [
        'free_space_mb' => $freeBytes ? round($freeBytes / 1024 / 1024, 2) : 'unknown',
        'total_space_mb' => $totalBytes ? round($totalBytes / 1024 / 1024, 2) : 'unknown',
        'usage_percent' => ($totalBytes && $freeBytes) ? 
            round((($totalBytes - $freeBytes) / $totalBytes) * 100, 2) : 'unknown'
    ];
}

// メインヘルスチェック
$healthCheck = [
    'status' => 'OK',
    'timestamp' => date('c'),
    'environment' => [
        'php_version' => phpversion(),
        'server_name' => $_SERVER['SERVER_NAME'] ?? 'unknown',
        'http_host' => $_SERVER['HTTP_HOST'] ?? 'unknown',
        'document_root' => $_SERVER['DOCUMENT_ROOT'] ?? 'unknown',
        'script_filename' => __FILE__,
        'current_user' => function_exists('posix_getpwuid') && function_exists('posix_geteuid') 
            ? posix_getpwuid(posix_geteuid())['name'] ?? 'unknown' 
            : 'unknown'
    ],
    'php_settings' => [
        'memory_limit' => ini_get('memory_limit'),
        'max_execution_time' => ini_get('max_execution_time'),
        'upload_max_filesize' => ini_get('upload_max_filesize'),
        'post_max_size' => ini_get('post_max_size'),
        'session_save_path' => ini_get('session.save_path'),
        'error_reporting_level' => error_reporting(),
        'display_errors' => ini_get('display_errors'),
        'log_errors' => ini_get('log_errors')
    ],
    'extensions' => [
        'curl_loaded' => extension_loaded('curl'),
        'json_loaded' => extension_loaded('json'),
        'session_loaded' => extension_loaded('session'),
        'openssl_loaded' => extension_loaded('openssl')
    ],
    'file_system' => [
        'env_file' => [
            'path' => __DIR__ . '/../../.env',
            'exists' => file_exists(__DIR__ . '/../../.env'),
            'readable' => file_exists(__DIR__ . '/../../.env') && is_readable(__DIR__ . '/../../.env'),
            'size_bytes' => file_exists(__DIR__ . '/../../.env') ? filesize(__DIR__ . '/../../.env') : 0
        ],
        'logs_directory' => [
            'path' => __DIR__ . '/../../logs',
            'exists' => is_dir(__DIR__ . '/../../logs'),
            'writable' => is_dir(__DIR__ . '/../../logs') && is_writable(__DIR__ . '/../../logs')
        ],
        'disk_info' => getDiskInfo()
    ],
    'api_configuration' => [
        'api_key_configured' => !empty(getApiKey()),
        'api_key_length' => strlen(getApiKey() ?? ''),
        'api_key_prefix' => !empty(getApiKey()) ? substr(getApiKey(), 0, 10) . '...' : 'none'
    ],
    'session_info' => getSessionInfo(),
    'curl_info' => extension_loaded('curl') ? [
        'version' => curl_version()['version'] ?? 'unknown',
        'ssl_version' => curl_version()['ssl_version'] ?? 'unknown',
        'protocols' => curl_version()['protocols'] ?? []
    ] : [
        'error' => 'cURL extension not loaded'
    ]
];

// cURL接続テスト（オプション）
if (isset($_GET['test_curl']) && extension_loaded('curl')) {
    $testUrl = 'https://api.anthropic.com/v1/messages';
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $testUrl,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 5,
        CURLOPT_NOBODY => true,  // HEADリクエストのみ
        CURLOPT_SSL_VERIFYPEER => true
    ]);
    
    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    $healthCheck['curl_test'] = [
        'test_url' => $testUrl,
        'http_code' => $httpCode,
        'curl_error' => $error,
        'connection_successful' => empty($error) && $httpCode > 0,
        'note' => 'HEADリクエストのテスト - 401エラーは正常（認証が必要なため）'
    ];
}

// 問題検出
$issues = [];

if (!extension_loaded('curl')) {
    $issues[] = 'cURL拡張が有効でない';
}

if (!extension_loaded('json')) {
    $issues[] = 'JSON拡張が有効でない';
}

if (empty(getApiKey())) {
    $issues[] = 'Claude APIキーが設定されていない';
}

if (!file_exists(__DIR__ . '/../../.env')) {
    $issues[] = '.envファイルが存在しない';
}

if (!is_dir(__DIR__ . '/../../logs') || !is_writable(__DIR__ . '/../../logs')) {
    $issues[] = 'ログディレクトリが存在しないか、書き込み権限がない';
}

if ($healthCheck['session_info']['session_started'] === false) {
    $issues[] = 'セッション開始に失敗';
}

if (!empty($issues)) {
    $healthCheck['status'] = 'WARNING';
    $healthCheck['issues'] = $issues;
}

// レスポンス送信
echo json_encode($healthCheck, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>