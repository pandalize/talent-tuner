# デプロイ自動化ワークフロー

## GitHub Actions 自動デプロイ設定

### 重要：mainブランチプッシュ時の自動デプロイ
- **mainブランチにプッシュすると自動的に本番環境にデプロイされる**
- `.github/workflows/deploy.yml` で設定済み
- お名前.comサーバーへのFTPアップロードが実行される

### ワークフロー概要
1. mainブランチへのpush時にトリガー
2. Node.js環境セットアップ
3. 依存関係インストール (`npm install`)
4. プロダクションビルド (`npm run build`)
5. FTPによる本番サーバーへのデプロイ

### 重要な注意事項
- **developブランチでの作業 → mainマージ → 自動デプロイの流れ**
- mainにマージ/プッシュする前に必ずテストを完了させる
- GitHub Secretsに以下の情報が設定済み：
  - FTP_HOST, FTP_USER, FTP_PASSWORD
  - VITE_CLAUDE_API_KEY

### 手動デプロイオプション
ローカルからの手動デプロイも可能：
```bash
npm run deploy
```

### デプロイ状況確認
- GitHub の Actions タブでデプロイ状況を確認可能
- 失敗時はSlackやメール通知設定済み（要確認）

この自動化により、開発→テスト→本番デプロイの流れが効率化されている。