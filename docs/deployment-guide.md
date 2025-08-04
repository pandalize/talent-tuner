# 🚀 talent-tuner デプロイメントガイド

このドキュメントでは、talent-tuner（ため職）アプリケーションのデプロイ方法について説明します。

## 📋 目次

1. [概要](#概要)
2. [お名前.comサーバーへの自動デプロイ](#お名前comサーバーへの自動デプロイ)
3. [その他のホスティングサービス](#その他のホスティングサービス)
4. [デプロイ前チェックリスト](#デプロイ前チェックリスト)
5. [トラブルシューティング](#トラブルシューティング)

## 概要

talent-tunerは、Vue.js 3で構築された静的サイトジェネレーター（SPA）です。ビルド後は静的ファイルとして配信できるため、様々なホスティングサービスに対応しています。

### 必要な環境

- Node.js 18以上
- npm または yarn
- FTPアクセス（お名前.comの場合）

## お名前.comサーバーへの自動デプロイ

### 方法1: GitHub Actions を使用した自動デプロイ（推奨）

#### 1. GitHub Actions ワークフローの設定

`.github/workflows/deploy.yml` ファイルが既に設定されています：

```yaml
name: Deploy to お名前.com Server

on:
  push:
    branches:
      - main
    paths:
      - 'my-vue-app/**'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    # ... (詳細は実際のファイルを参照)
```

#### 2. GitHub Secrets の設定

GitHubリポジトリで以下のSecretsを設定する必要があります：

1. リポジトリの **Settings** → **Secrets and variables** → **Actions** に移動
2. **New repository secret** をクリックして以下を追加：

| Secret名 | 値の例 | 説明 |
|---------|-------|------|
| `FTP_SERVER` | `ftp.onamae.com` | FTPサーバーのホスト名 |
| `FTP_USERNAME` | `your-username` | FTPユーザー名 |
| `FTP_PASSWORD` | `your-password` | FTPパスワード |
| `FTP_PORT` | `21` | FTPポート（通常は21） |

#### 3. デプロイの実行

mainブランチに変更をプッシュすると、自動的にデプロイが実行されます：

```bash
git add .
git commit -m "feat: 新機能の追加"
git push origin main
```

### 方法2: ローカルスクリプトを使用したデプロイ

#### 1. 環境変数の設定

`.env` ファイルを作成（`.gitignore`に含まれています）：

```bash
FTP_HOST=ftp.onamae.com
FTP_USER=your-username
FTP_PASS=your-password
REMOTE_DIR=/public_html
```

#### 2. デプロイスクリプトの実行

```bash
# 実行権限を付与（初回のみ）
chmod +x deploy.sh

# デプロイ実行
./deploy.sh
```

### 方法3: 手動デプロイ

#### 1. ビルドの実行

```bash
cd my-vue-app
npm run build
```

#### 2. FTPクライアントでアップロード

- **FileZilla** や **Cyberduck** などのFTPクライアントを使用
- `dist/` フォルダの内容を `public_html/` にアップロード

### お名前.com固有の設定

#### .htaccess の配置

SPAのルーティングを正しく動作させるため、`.htaccess` ファイルが必要です。
このファイルは `my-vue-app/public/.htaccess` に既に配置されており、ビルド時に自動的に含まれます。

#### ディレクトリ構造

```
/home/username/
  ├── public_html/       # Webルートディレクトリ（ここにデプロイ）
  │   ├── index.html
  │   ├── assets/
  │   ├── .htaccess
  │   └── ...
  ├── logs/              # アクセスログ
  └── tmp/               # 一時ファイル
```

## その他のホスティングサービス

### Vercel

```bash
# Vercel CLIのインストール
npm i -g vercel

# デプロイ
cd my-vue-app
vercel
```

### Netlify

```bash
# Netlify CLIのインストール
npm i -g netlify-cli

# デプロイ
cd my-vue-app
npm run build
netlify deploy --prod --dir=dist
```

### GitHub Pages

```bash
# gh-pagesパッケージのインストール
npm install --save-dev gh-pages

# package.jsonにスクリプト追加
"scripts": {
  "deploy-gh": "npm run build && gh-pages -d dist"
}

# デプロイ
npm run deploy-gh
```

## デプロイ前チェックリスト

### 🔍 必須確認項目

- [ ] **環境変数の設定**
  - [ ] Stripe公開キー（`VITE_STRIPE_PUBLIC_KEY`）
  - [ ] 本番URLの設定

- [ ] **ビルドの確認**
  ```bash
  npm run build
  npm run preview
  ```

- [ ] **TypeScriptエラーのチェック**
  ```bash
  npm run type-check
  ```

- [ ] **リントエラーのチェック**
  ```bash
  npm run lint
  ```

- [ ] **最新のsitemap.xml**
  - 新しいページを追加した場合は更新

- [ ] **プライバシーポリシーの日付**
  - 更新がある場合は日付を変更

### 📊 パフォーマンス最適化

- [ ] **画像の最適化**（もし画像を追加した場合）
  - WebP形式の使用を検討
  - 適切なサイズでの配信

- [ ] **ビルドサイズの確認**
  ```bash
  # ビルド後のサイズを確認
  du -sh dist/
  ```

- [ ] **Lighthouse スコアの確認**
  - Chrome DevToolsのLighthouseタブで確認
  - 目標: Performance 90+, SEO 100

## トラブルシューティング

### よくある問題と解決方法

#### 1. FTPアップロードが失敗する

**症状**: `Error: Connection timeout`

**解決方法**:
- パッシブモード（PASV）を有効にする
- ファイアウォール設定を確認
- 同時接続数を減らす（お名前.comは通常2-3接続まで）

#### 2. 404エラーが発生する

**症状**: ページリロード時に404エラー

**解決方法**:
- `.htaccess` が正しくアップロードされているか確認
- `mod_rewrite` が有効か確認（お名前.comは通常有効）
- ファイルパーミッションを確認（644推奨）

#### 3. 環境変数が反映されない

**症状**: Stripeキーなどが undefined

**解決方法**:
```bash
# .envファイルの確認
cat .env

# ビルド時に環境変数を確認
npm run build
```

#### 4. ビルドエラー

**症状**: `npm run build` が失敗

**解決方法**:
```bash
# node_modulesを削除して再インストール
rm -rf node_modules package-lock.json
npm install
npm run build
```

### デバッグ方法

#### FTPログの確認

```bash
# deploy.shを詳細モードで実行
bash -x deploy.sh
```

#### GitHub Actions のログ確認

1. GitHubリポジトリの **Actions** タブ
2. 失敗したワークフローをクリック
3. エラーログを確認

## セキュリティ注意事項

### 🔐 重要なセキュリティ対策

1. **認証情報の管理**
   - FTPパスワードは絶対にコードにハードコードしない
   - `.env` ファイルは `.gitignore` に含める
   - GitHub Secrets を使用する

2. **APIキーの管理**
   - 公開キーのみフロントエンドで使用
   - シークレットキーはサーバーサイドのみ

3. **HTTPS の設定**
   - お名前.comの管理画面でSSL証明書を設定
   - Let's Encrypt の無料SSL証明書が利用可能

4. **ファイルパーミッション**
   ```bash
   # 推奨設定
   ファイル: 644
   ディレクトリ: 755
   ```

## 継続的デプロイメントのベストプラクティス

### ブランチ戦略

```
main          → 本番環境（自動デプロイ）
  ├─ develop  → 開発環境
  └─ feature/ → 機能開発
```

### デプロイフロー

1. **機能開発**: `feature/xxx` ブランチで開発
2. **レビュー**: Pull Request を作成
3. **テスト**: `develop` ブランチでテスト
4. **本番デプロイ**: `main` ブランチにマージで自動デプロイ

### モニタリング

- **Google Analytics**: トラフィック監視
- **Google Search Console**: SEO監視
- **サーバーログ**: エラー監視

## リソース

- [Vue.js 公式ドキュメント](https://ja.vuejs.org/)
- [Vite デプロイガイド](https://ja.vitejs.dev/guide/static-deploy.html)
- [お名前.com ヘルプ](https://www.onamae.com/server/help/)
- [GitHub Actions ドキュメント](https://docs.github.com/ja/actions)

---

最終更新日: 2025年8月4日