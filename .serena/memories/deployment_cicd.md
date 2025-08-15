# デプロイ・CI/CD設定

## 自動デプロイシステム

### 1. Node.js FTPスクリプト（推奨）

#### 設定
```bash
# 初期設定
npm run deploy:setup
vi .env.deploy  # FTP情報編集

# 実行
npm run deploy
```

#### 機能
- ✅ 完全自動化（ビルド→FTP→権限設定）
- ✅ エラーハンドリング充実
- ✅ プログレス表示
- ✅ `basic-ftp` ライブラリ使用

#### ファイル
- `deploy-ftp.js`: メインスクリプト
- `.env.deploy`: FTP認証情報

### 2. GitHub Actions CI/CD

#### 設定ファイル
```yaml
# .github/workflows/deploy.yml
- mainブランチpush時自動実行
- 翻訳バリデーション → ビルド → デプロイ
- 成功/失敗メール通知（複数アドレス対応）
```

#### 実行フロー
1. コードチェックアウト
2. Node.js 20 セットアップ
3. 依存関係インストール
4. 翻訳バリデーション実行
5. プロジェクトビルド
6. FTP認証確認
7. 本番サーバーデプロイ
8. メール通知送信

#### GitHub Secrets設定
```
FTP_HOST: FTPサーバーアドレス
FTP_USER: FTPユーザー名
FTP_PASSWORD: FTPパスワード
MAIL_USERNAME: Gmail SMTP認証
MAIL_PASSWORD: Gmailアプリパスワード
NOTIFICATION_EMAIL: 通知先メール
NOTIFICATION_EMAIL_2~4: 追加通知先
```

### 3. Bash軽量スクリプト

#### 設定
```bash
# 必要ツールインストール（macOS）
brew install lftp

# 実行
./deploy-simple.sh
```

#### 機能
- lftp + rsync使用
- 高速・軽量
- 上級者向け

## 本番環境（お名前.com）

### サーバー設定
- **ホスティング**: 共用サーバー
- **PHP**: バージョン7.4以上
- **ドキュメントルート**: `/`
- **FTP**: FTPS対応

### .htaccess設定
```apache
# SPA対応（Vue Router）
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# セキュリティヘッダー
# GZIP圧縮
# APIプロキシ設定
```

### ファイル権限
- `.env`: 600（秘匿情報）
- `.htaccess`: 644（Web設定）
- PHP files: 644（実行可能）

## ビルド設定

### Vite設定（vite.config.ts）
```typescript
- Vue DevTools統合
- パス解決（@ エイリアス）
- Code Splitting最適化
- Terser圧縮（console削除）
- チャンクサイズ最適化
```

### 最適化機能
- **Manual Chunks**: vendor, utils分離
- **Tree Shaking**: 未使用コード削除
- **Asset Optimization**: 画像・CSS最適化
- **Preload**: 重要リソース優先読み込み

## 環境別設定

### 開発環境
- Hot Module Replacement (HMR)
- Source Maps有効
- Dev Tools統合
- エラー詳細表示

### 本番環境
- 圧縮・最適化
- Console出力削除
- Source Maps無効
- キャッシュ最適化

## 品質管理

### 自動チェック
```bash
npm run type-check      # TypeScript型検証
npm run lint           # ESLint（自動修正）
npm run format         # Prettier整形
npm run validate:translations  # 翻訳整合性
```

### 継続的インテグレーション
- プルリクエスト時自動テスト
- コード品質チェック
- 翻訳バリデーション
- ビルド確認

## 監視・通知

### デプロイ通知
- 成功時: ✅ デプロイ完了通知
- 失敗時: ❌ エラー詳細通知
- 複数メールアドレス対応

### ログ監視
- GitHub Actions実行ログ
- サーバーエラーログ（お名前.com管理画面）
- アプリケーションエラー追跡

## セキュリティ

### 認証情報管理
- 環境変数による機密情報保護
- GitHub Secrets暗号化
- ローカル .env ファイル権限制限

### アクセス制御
- FTP接続暗号化
- API認証（Claude, Stripe）
- CORS適切設定