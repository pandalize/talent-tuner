# 🔐 GitHub Secrets 設定ガイド

自動デプロイ & メール通知システムに必要なGitHub Secretsの完全設定手順です。

## 📋 必要なSecrets一覧

### 必須: FTP接続情報
```
Name: FTP_HOST
Secret: pandalize.com

Name: FTP_USER
Secret: webapp@pandalize.com

Name: FTP_PASSWORD
Secret: webapur1developers?
```

### オプション: メール通知情報
```
Name: MAIL_USERNAME
Secret: あなたのGmailアドレス (例: example@gmail.com)

Name: MAIL_PASSWORD
Secret: Gmailアプリパスワード (例: abcd efgh ijkl mnop)

Name: NOTIFICATION_EMAIL
Secret: 通知先メールアドレス1 (例: notify@example.com)

Name: NOTIFICATION_EMAIL_2
Secret: 通知先メールアドレス2 (例: admin@example.com)

Name: NOTIFICATION_EMAIL_3
Secret: 通知先メールアドレス3 (例: dev@example.com)

Name: NOTIFICATION_EMAIL_4
Secret: 通知先メールアドレス4 (例: manager@example.com)
```

## 🛠️ GitHub Secrets設定手順

### Step 1: リポジトリ設定画面を開く
1. **GitHub**で `pandalize/talent-tuner` リポジトリを開く
2. **Settings** タブをクリック
3. 左メニューから **「Secrets and variables」** をクリック
4. **「Actions」** をクリック

### Step 2: FTP情報を設定 (必須)
**「New repository secret」** ボタンを押して以下を順番に追加：

#### FTP_HOST
```
Name: FTP_HOST
Secret: pandalize.com
```
**「Add secret」** をクリック

#### FTP_USER
```
Name: FTP_USER
Secret: webapp@pandalize.com
```
**「Add secret」** をクリック

#### FTP_PASSWORD
```
Name: FTP_PASSWORD
Secret: webapur1developers?
```
**「Add secret」** をクリック

### Step 3: メール通知情報を設定 (オプション)

#### MAIL_USERNAME (送信用Gmailアドレス)
```
Name: MAIL_USERNAME
Secret: あなたのGmailアドレス
```
例: `pandalize.info@gmail.com`

#### MAIL_PASSWORD (Gmailアプリパスワード)
```
Name: MAIL_PASSWORD
Secret: Gmailアプリパスワード
```
例: `abcd efgh ijkl mnop`

#### NOTIFICATION_EMAIL (メイン通知先)
```
Name: NOTIFICATION_EMAIL
Secret: メイン通知先メールアドレス
```
例: `pandalize.info@gmail.com`

#### NOTIFICATION_EMAIL_2～4 (追加通知先)
```
Name: NOTIFICATION_EMAIL_2
Secret: 追加通知先メールアドレス2

Name: NOTIFICATION_EMAIL_3  
Secret: 追加通知先メールアドレス3

Name: NOTIFICATION_EMAIL_4
Secret: 追加通知先メールアドレス4
```
例: `admin@company.com`, `dev@company.com`, `manager@company.com`

**注意**: 不要な通知先がある場合は、そのSecretsを設定しなくてもOKです（空のSecretsは自動でスキップされます）

## 📧 Gmailアプリパスワード取得手順

### Step 1: Googleアカウント設定
1. **Google アカウント管理** (https://myaccount.google.com/) にアクセス
2. **「セキュリティ」** をクリック

### Step 2: 2段階認証を有効化
1. **「2段階認証プロセス」** をクリック
2. まだ有効でない場合は設定を完了

### Step 3: アプリパスワード生成
1. **「アプリ パスワード」** をクリック
2. **「アプリを選択」** → **「その他（カスタム名）」**
3. 名前を入力: `GitHub Actions - talent-tuner`
4. **「生成」** をクリック
5. 表示された16文字のパスワードをコピー
   ```
   例: abcd efgh ijkl mnop
   ```

### Step 4: GitHubに設定
コピーしたパスワードを `MAIL_PASSWORD` として設定

## ✅ 設定完了後の動作

### FTPのみ設定した場合
- ✅ 自動ビルド & デプロイ実行
- 📟 成功・失敗をGitHub Actionsログに表示

### FTP + メール設定した場合  
- ✅ 自動ビルド & デプロイ実行
- 📧 **成功時**: ✅ デプロイ成功メール送信（全通知先に送信）
- 📧 **失敗時**: ❌ デプロイ失敗メール送信（全通知先に送信）

**メール送信先**: NOTIFICATION_EMAIL, NOTIFICATION_EMAIL_2, NOTIFICATION_EMAIL_3, NOTIFICATION_EMAIL_4 に設定されたすべてのアドレス

## 📨 メール通知の内容例

### 成功通知メール
```
件名: ✅ pandalize.com デプロイ成功

🎉 pandalize.com への自動デプロイが成功しました！

📊 デプロイ詳細:
• リポジトリ: pandalize/talent-tuner
• ブランチ: main
• コミット: dd0156d...
• 実行者: wiskty21
• 実行時刻: 2025-08-05T13:37:00Z

🔗 サイト URL: https://pandalize.com/
📝 GitHub Actions: [ログリンク]

最新の変更内容:
fix: GitHub Actions構文エラー修正
```

### 失敗通知メール
```
件名: ❌ pandalize.com デプロイ失敗

⚠️ pandalize.com への自動デプロイが失敗しました。

📊 失敗詳細:
• リポジトリ: pandalize/talent-tuner
• ブランチ: main  
• コミット: dd0156d...
• 実行者: wiskty21
• 実行時刻: 2025-08-05T13:37:00Z

📝 ログを確認: [GitHub Actionsログリンク]
```

## 🔒 セキュリティ注意事項

### ✅ 安全な設定
- GitHub Secretsは暗号化されて保存
- GitHub Actionsログに機密情報は表示されない
- リポジトリ管理者のみアクセス可能

### ⚠️ 注意点
- アプリパスワードは通常のGmailパスワードとは異なります
- アプリパスワードを忘れた場合は再生成が必要
- メールアドレスの送信制限に注意（Gmailは1日500通まで）

## 🚀 テスト方法

### 1. FTP設定のテスト
1. FTP関連の3つのSecretsを設定
2. mainブランチに何かコミット & push
3. GitHub Actionsが実行され、デプロイ成功を確認

### 2. メール通知のテスト
1. メール関連の3つのSecretsを追加設定
2. 再度mainブランチにpush
3. メールボックスに通知メールが届くことを確認

## 🛠️ トラブルシューティング

### FTPエラーの場合
- FTP認証情報が正しいか確認
- サーバーのメンテナンス状況を確認

### メールエラーの場合
- 2段階認証が有効になっているか確認
- アプリパスワードが正しいか確認
- Gmail側の送信制限に達していないか確認

### 設定確認方法
GitHub → Settings → Secrets and variables → Actions で設定済みのSecretsを確認できます（値は表示されませんが、存在確認は可能）

---

設定完了後、mainブランチへのpushで自動デプロイ + メール通知が実行されます！🎉