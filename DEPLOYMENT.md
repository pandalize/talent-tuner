# お名前.comサーバーへのデプロイガイド

## サーバー環境の制限

### 1. SSH接続
- **共用サーバー**: SSH接続不可（FTPのみ）
- **VPS/専用サーバー**: SSH接続可能

### 2. Node.js
- サーバー上でのNode.js実行は不可
- ビルドはローカルまたはGitHub Actionsで実行
- 静的ファイルのみアップロード

### 3. .htaccessの設定
SPAのルーティング対応のため、以下の.htaccessが必要：

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## デプロイ方法

### 方法1: GitHub Actions（推奨）
1. `.github/workflows/deploy.yml` を設定
2. GitHub Secretsに認証情報を設定
3. mainブランチにpushで自動デプロイ

### 方法2: ローカルスクリプト
```bash
# 環境変数を設定
export FTP_USER="your-username"
export FTP_PASS="your-password"

# デプロイ実行
./deploy.sh
```

### 方法3: 手動FTP
1. `npm run build` でビルド
2. FTPクライアント（FileZilla等）でアップロード
3. `dist/` の内容を `public_html/` にアップロード

## セキュリティ注意事項

1. **認証情報の管理**
   - FTPパスワードは環境変数で管理
   - `.env` ファイルは絶対にコミットしない
   - GitHub Secretsを使用

2. **APIキーの扱い**
   - Stripe公開キーは環境変数で管理
   - ビルド時に埋め込まれる

3. **HTTPS設定**
   - お名前.comの管理画面でSSL証明書を設定
   - Let's Encrypt対応あり

## トラブルシューティング

### FTPアップロードが失敗する
- パッシブモード（PASV）を有効にする
- ファイアウォール設定を確認
- 同時接続数の制限を確認（通常2-3接続まで）

### 404エラーが発生する
- `.htaccess` が正しく配置されているか確認
- `mod_rewrite` が有効か確認
- ファイルパーミッションを確認（644推奨）

### ビルドサイズが大きすぎる
- 画像を最適化
- 不要な依存関係を削除
- コード分割を活用

## 推奨フロー

1. **開発環境**: ローカルで開発・テスト
2. **ステージング**: developブランチで確認
3. **本番**: mainブランチにマージで自動デプロイ

## お名前.com固有の設定

### FTP情報の確認方法
1. お名前.com Naviにログイン
2. 「レンタルサーバー」→「コントロールパネル」
3. 「アカウント」→「FTP・SSHアカウント」

### ディレクトリ構造
```
/home/username/
  ├── public_html/     # Webルートディレクトリ
  ├── logs/            # アクセスログ
  └── tmp/             # 一時ファイル
```

### PHPバージョン
- コントロールパネルで変更可能
- 推奨: PHP 7.4以上（Stripe SDK用）