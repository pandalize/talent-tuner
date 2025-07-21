<?php
// CORSヘッダー設定
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// OPTIONSリクエストの処理
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// POSTリクエストのみ許可
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Stripe PHP ライブラリの読み込み
// 注: 本番環境では composer を使用してインストールしてください
// require_once 'vendor/autoload.php';

// 環境変数から秘密キーを取得（本番環境では必須）
$stripeSecretKey = getenv('STRIPE_SECRET_KEY') ?: 'sk_test_YOUR_TEST_SECRET_KEY';

try {
    // リクエストボディを取得
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        throw new Exception('Invalid request body');
    }
    
    // 診断結果データを取得
    $resultData = $input['resultData'] ?? null;
    $priceAmount = $input['priceAmount'] ?? 500;
    
    if (!$resultData) {
        throw new Exception('診断結果データがありません');
    }
    
    // セッションIDを生成（仮実装）
    $sessionId = 'cs_test_' . bin2hex(random_bytes(16));
    
    // Stripe Checkoutセッション作成の仮実装
    // 本番環境では実際のStripe APIを使用
    /*
    \Stripe\Stripe::setApiKey($stripeSecretKey);
    
    $session = \Stripe\Checkout\Session::create([
        'payment_method_types' => ['card'],
        'line_items' => [[
            'price_data' => [
                'currency' => 'jpy',
                'product_data' => [
                    'name' => 'ため職 詳細診断レポート',
                    'description' => 'あなたの診断結果に基づいた詳細なPDFレポート',
                ],
                'unit_amount' => $priceAmount,
            ],
            'quantity' => 1,
        ]],
        'mode' => 'payment',
        'success_url' => 'https://pandalize.com/payment-success?session_id={CHECKOUT_SESSION_ID}',
        'cancel_url' => 'https://pandalize.com/diagnosis',
        'metadata' => [
            'result_data' => json_encode($resultData)
        ]
    ]);
    
    $sessionId = $session->id;
    */
    
    // レスポンスを返す
    echo json_encode([
        'sessionId' => $sessionId,
        'message' => '開発環境用の仮実装です。本番環境では実際のStripe APIを使用してください。'
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}
?>