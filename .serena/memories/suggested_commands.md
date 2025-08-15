# 推奨開発コマンド

## 基本開発コマンド

### プロジェクト開始
```bash
# プロジェクトディレクトリに移動
cd my-vue-app

# 依存関係インストール
npm install

# 開発サーバー起動（http://localhost:5173）
npm run dev
```

### ビルド・デプロイ
```bash
# 本番ビルド
npm run build

# ビルド + TypeScript型チェック
npm run build:with-typecheck

# 本番プレビュー
npm run preview

# 自動デプロイ（お名前.com）
npm run deploy
```

### 開発品質管理
```bash
# TypeScript型チェック
npm run type-check

# ESLint（自動修正）
npm run lint

# Prettier フォーマット
npm run format

# 翻訳バリデーション
npm run validate:translations
npm run validate:translations:verbose
```

### デプロイ設定
```bash
# FTP設定ファイル作成
npm run deploy:setup

# 手動でFTP情報編集
vi .env.deploy
```

## システムコマンド（Darwin/macOS）

### ファイル操作
```bash
# ファイル一覧（詳細）
ls -la

# ディレクトリ移動
cd /path/to/directory

# ファイル検索
find . -name "*.vue" -type f

# 文字列検索（ripgrep推奨）
rg "searchterm" --type vue
```

### Git操作
```bash
# 状態確認
git status

# ブランチ確認
git branch -a

# コミット
git add .
git commit -m "feat: 新機能追加"

# プッシュ（GitHub Actions自動デプロイ）
git push origin main
```

### 権限・セキュリティ
```bash
# .envファイル権限設定
chmod 600 .env .env.deploy

# ファイル権限確認
ls -l .env*
```

## 開発ワークフロー

### 新機能開発
1. `git checkout -b feature/new-feature`
2. `npm run dev` で開発サーバー起動
3. コード変更
4. `npm run lint && npm run type-check` で品質確認
5. `git commit` でコミット
6. `npm run deploy` でテストデプロイ（必要に応じて）

### 多言語対応作業
1. `src/i18n/locales/` で翻訳追加
2. `npm run validate:translations` で整合性確認
3. `npm run dev` でUI確認

### 本番デプロイ
1. `develop` → `main` へマージ
2. GitHub Actions自動実行
3. または手動: `npm run deploy`