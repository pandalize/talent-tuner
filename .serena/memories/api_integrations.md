# API統合・外部サービス

## Claude AI統合

### 設定
- **モデル**: Claude 3 Haiku
- **API**: Anthropic Claude API
- **環境変数**: `VITE_CLAUDE_API_KEY`

### 実装詳細
```typescript
// src/utils/claudeApiClient.ts
- 開発環境: 直接API呼び出し（localhost検出）
- 本番環境: PHP プロキシ経由（CORS対応）
- フォールバック: APIエラー時はモックレスポンス
```

### プロキシ設定（本番）
```php
// public/api/chat-proxy.php
- Claude API中継
- セキュリティ対応（CORS、レート制限）
- 環境変数からAPIキー取得
```

### システムプロンプト
- 28職業データベース連携
- 日本語専門用語対応
- 進路相談特化プロンプト

## Stripe決済統合

### 設定
- **環境変数**: 
  - `VITE_STRIPE_PUBLIC_KEY` (フロントエンド)
  - `STRIPE_SECRET_KEY` (バックエンド)

### 実装状況
- ✅ Checkout セッション作成（仮実装）
- ✅ 決済成功ページ (`PaymentSuccessView.vue`)
- 📋 TODO: PDF生成・ダウンロード機能
- 📋 TODO: Webhook処理完全実装

### PHP API
```php
// public/api/create-checkout-session.php
- Stripe Checkout セッション作成
- CORS対応
- エラーハンドリング
```

## データAPI（内部）

### 診断データ
```typescript
// 静的JSON読み込み
- diagnostic_config.json: 質問・選択肢・重み設定
- professions.json: 職業詳細データベース
- categories.json: カテゴリー定義
```

### 職業データベース
```typescript
// public/data/professions/ 分割構造
- tech-creative.json: 技術・クリエイティブ系
- business-finance.json: ビジネス・金融系
- medical-welfare-education.json: 医療・福祉・教育系
- service-hospitality.json: サービス・接客系
- professional-specialized.json: 専門職・士業
```

## 環境変数管理

### 開発環境（.env）
```bash
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_CLAUDE_API_KEY=sk-ant-api03-...
```

### 本番環境
- お名前.com サーバー上の .env ファイル
- 権限 600 設定必須
- Git除外設定済み

### GitHub Secrets（CI/CD）
```yaml
FTP_HOST: FTPサーバーアドレス
FTP_USER: FTPユーザー名  
FTP_PASSWORD: FTPパスワード
MAIL_USERNAME: Gmail SMTP
MAIL_PASSWORD: Gmail アプリパスワード
NOTIFICATION_EMAIL: 通知先メール
```

## セキュリティ対策

### API保護
- CORS設定
- レート制限
- 入力サニタイズ
- APIキー環境変数化

### データ保護
- 機密データのGit除外
- ファイル権限管理
- HTTPS強制（本番）

## エラーハンドリング

### Claude API
- 接続エラー時フォールバック
- 高品質モックレスポンス
- ユーザー体験維持

### Stripe API  
- 決済エラー処理
- ユーザーフレンドリーメッセージ
- リトライ機能

### 全般
- try-catch包括的実装
- ログ出力（開発時）
- 本番環境エラー監視