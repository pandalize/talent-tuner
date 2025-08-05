# デプロイ自動化 - 使用方法

お名前.com共用サーバーへの自動デプロイが可能になりました。3つの方法から選択できます。

## 🎯 推奨方法: Node.js FTPスクリプト

### 初期設定（一度だけ）

```bash
# 1. 依存関係インストール
npm install

# 2. FTP設定ファイル作成
npm run deploy:setup

# 3. FTP情報を編集
vi .env.deploy
```

`.env.deploy` の内容:
```bash
FTP_HOST=your-ftp-server.com
FTP_USER=your-username
FTP_PASSWORD=your-password
```

### デプロイ実行

```bash
# ワンコマンドでデプロイ完了
npm run deploy
```

実行内容:
- ✅ プロジェクトビルド
- ✅ FTP接続・ファイルアップロード  
- ✅ 権限設定
- ✅ エラーハンドリング

---

## 🚀 高度な方法: GitHub Actions

### 設定手順

1. **GitHubリポジトリのSecrets設定**
   - Repository Settings → Secrets and variables → Actions
   - 以下を追加:
     - `FTP_HOST`: FTPサーバーアドレス
     - `FTP_USER`: FTPユーザー名
     - `FTP_PASSWORD`: FTPパスワード

2. **自動デプロイ**
   - `main`ブランチにpushすると自動実行
   - GitHub Actionsタブで進行状況確認

---

## 💡 軽量な方法: Bashスクリプト

### 必要なツール

```bash
# macOS
brew install lftp

# Ubuntu/Debian
sudo apt install lftp
```

### デプロイ実行

```bash
# 設定
npm run deploy:setup
vi .env.deploy

# デプロイ
./deploy-simple.sh
```

---

## 🔧 どの方法を選ぶべきか

| 方法 | 推奨度 | メリット | デメリット |
|------|-------|---------|-----------|
| **Node.js FTP** | ⭐⭐⭐ | 簡単・高機能・エラー処理充実 | Node.js依存 |
| **GitHub Actions** | ⭐⭐ | 完全自動化・チーム開発向け | GitHub必須 |
| **Bashスクリプト** | ⭐ | 軽量・高速 | 追加ツール必要 |

### 初心者の方
→ **Node.js FTP** (`npm run deploy`)

### チーム開発
→ **GitHub Actions**

### 上級者・軽量重視
→ **Bashスクリプト**

---

## ⚠️ 注意事項

1. **セキュリティ**
   - `.env.deploy`は絶対にGitにコミットしない
   - パスワードは定期的に変更

2. **初回デプロイ後**
   - サイトが正常表示されるか確認
   - チャット機能が動作するか確認

3. **エラー時**
   - FTP接続情報を再確認
   - お名前.com管理画面でエラーログ確認

---

## 🎉 これで完了！

```bash
npm run deploy
```

たった1コマンドで本番サイトが更新されます！