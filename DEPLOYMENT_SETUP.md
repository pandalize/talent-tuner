# 🚀 自動デプロイ & メール通知設定ガイド

GitHub Actionsを使用してmainブランチへのpushで自動デプロイ + メール通知を実現する設定手順です。

## 📋 必要な情報

以下の情報を用意してください：

### FTP接続情報
- `FTP_HOST`: pandalize.com
- `FTP_USER`: webapp@pandalize.com
- `FTP_PASSWORD`: webapur1developers?

### メール送信情報（Gmail推奨）
- `MAIL_USERNAME`: 送信用Gmailアドレス
- `MAIL_PASSWORD`: Gmailアプリパスワード
- `NOTIFICATION_EMAIL`: 通知先メールアドレス

## 🔧 設定手順

### 1. GitHub Secretsの設定

GitHub リポジトリで以下の設定を行います：

1. **リポジトリページ** → **Settings** → **Secrets and variables** → **Actions**

2. **New repository secret** で以下を追加：

```
FTP_HOST = pandalize.com
FTP_USER = webapp@pandalize.com
FTP_PASSWORD = webapur1developers?
MAIL_USERNAME = あなたのGmailアドレス
MAIL_PASSWORD = Gmailアプリパスワード
NOTIFICATION_EMAIL = 通知先メールアドレス
```

### 2. Gmailアプリパスワードの取得

1. **Googleアカウント管理** → **セキュリティ**
2. **2段階認証プロセス** を有効にする
3. **アプリパスワード** を生成
4. 生成されたパスワードを `MAIL_PASSWORD` に設定

### 3. 動作確認

設定完了後、mainブランチにpushすると：

1. **自動でビルド & デプロイ実行**
2. **成功時**: ✅ デプロイ成功メールが届く
3. **失敗時**: ❌ デプロイ失敗メールが届く

## 📧 通知メールの内容

### 成功時の通知例
```
件名: ✅ pandalize.com デプロイ成功

🎉 pandalize.com への自動デプロイが成功しました！

📊 デプロイ詳細:
• リポジトリ: pandalize/talent-tuner
• ブランチ: main
• コミット: abc123...
• 実行者: username
• 実行時刻: 2025-01-XX XX:XX:XX

🔗 サイト URL: https://pandalize.com/
📝 GitHub Actions: [ログリンク]

最新の変更内容:
feat: 新機能を追加
```

### 失敗時の通知例
```
件名: ❌ pandalize.com デプロイ失敗

⚠️ pandalize.com への自動デプロイが失敗しました。

📊 失敗詳細:
• リポジトリ: pandalize/talent-tuner
• ブランチ: main
• コミット: abc123...
• 実行者: username
• 実行時刻: 2025-01-XX XX:XX:XX

📝 ログを確認: [GitHub Actionsログリンク]
```

## 🛠️ トラブルシューティング

### 1. FTP接続エラー
- FTP認証情報が正しいか確認
- サーバーのファイアウォール設定を確認

### 2. メール送信エラー
- Gmailアプリパスワードが正しいか確認
- 2段階認証が有効になっているか確認

### 3. ビルドエラー
- 翻訳バリデーションエラーをチェック
- 依存関係の問題を確認

## 🎯 ワークフローの特徴

### 実行タイミング
- mainブランチへのpush時に自動実行
- 手動実行も可能（Actions タブから）

### 実行内容
1. ✅ 翻訳ファイルのバリデーション
2. ✅ Vue.jsプロジェクトのビルド
3. ✅ カスタムFTPスクリプトでデプロイ
4. ✅ 結果をメール通知

### セキュリティ
- 全ての認証情報はGitHub Secretsで暗号化
- ログに機密情報は表示されない

## 📝 カスタマイズ

### 通知先の追加
複数のメールアドレスに通知したい場合：
```yaml
to: user1@example.com,user2@example.com
```

### 通知条件の変更
特定の条件でのみ通知したい場合：
```yaml
if: success() && github.actor == 'main-developer'
```

これで自動デプロイとメール通知システムが完成です！