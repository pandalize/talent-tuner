# 開発ワークフロー・規約

## コードスタイル・規約

### TypeScript設定
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,           // 厳格な型チェック
    "noImplicitAny": true,   // 暗黙的any禁止
    "exactOptionalPropertyTypes": true
  }
}
```

### ESLint設定
```typescript
// eslint.config.ts
- Vue 3 + TypeScript対応
- Prettier統合（競合回避）
- 'vue/multi-word-component-names': 'off' // Vue推奨無効化
```

### Prettier設定
```json
// .prettierrc.json  
{
  "semi": false,        // セミコロン無し
  "singleQuote": true,  // シングルクォート使用
  "printWidth": 100     // 行幅100文字
}
```

### 命名規約

#### ファイル・ディレクトリ
- **Vueコンポーネント**: PascalCase (`HomeView.vue`)
- **utilities**: camelCase (`diagnosisLoader.ts`)
- **constants**: UPPER_SNAKE_CASE (`STORAGE_KEYS`)
- **i18n keys**: snake_case (`home.hero.title`)

#### 変数・関数
```typescript
// 変数: camelCase
const currentQuestion = ref(0)
const isLoadingConfig = ref(false)

// 関数: camelCase動詞開始
function calculateScore() {}
function loadDiagnosticConfig() {}

// 定数: UPPER_SNAKE_CASE  
const DISPLAY_TOP_N = 3
const CATEGORY_LABELS = { ... }

// コンポーネント: PascalCase
const QuestionNavigator = defineComponent({ ... })
```

## Git ワークフロー

### ブランチ戦略
```bash
main       # 本番環境（自動デプロイ）
develop    # 開発統合ブランチ（最新版）
feature/*  # 機能開発ブランチ
hotfix/*   # 緊急修正ブランチ
```

### コミット規約
```bash
# Conventional Commits準拠
feat: 新機能追加
fix: バグ修正  
docs: ドキュメント更新
style: スタイル変更（機能影響なし）
refactor: リファクタリング
test: テスト追加・修正
chore: 雑務（依存関係更新等）

# 例
feat: 多言語対応システム実装
fix: 診断結果表示バグ修正
docs: API統合ガイド更新
```

### プルリクエスト
```markdown
## 変更概要
診断機能のパフォーマンス改善

## 変更内容  
- [ ] スコア計算アルゴリズム最適化
- [ ] メモ化による高速化
- [ ] TypeScript型定義強化

## テスト
- [ ] 全質問回答テスト
- [ ] 結果表示確認
- [ ] パフォーマンス測定

## レビューポイント
- アルゴリズムロジック妥当性
- 型安全性向上
```

## 開発環境セットアップ

### 必須ツール
```bash
# Node.js（v20以上）
node --version

# npm（最新）
npm --version

# Vue DevTools（ブラウザ拡張）
# Vite DevTools（組み込み済み）
```

### VSCode推奨拡張
```json
// .vscode/extensions.json
{
  "recommendations": [
    "Vue.volar",              // Vue 3サポート
    "esbenp.prettier-vscode", // Prettier統合
    "ms-vscode.vscode-typescript-next", // TypeScript  
    "bradlc.vscode-tailwindcss" // CSS支援
  ]
}
```

### 設定例
```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## タスク完了時のプロセス

### 品質チェック
```bash
# 1. 型チェック
npm run type-check

# 2. リント（自動修正）  
npm run lint

# 3. フォーマット
npm run format

# 4. 翻訳バリデーション（多言語対応時）
npm run validate:translations
```

### テスト・確認
```bash
# 1. 開発サーバー起動
npm run dev

# 2. 機能テスト
# - 全画面動作確認
# - レスポンシブ対応確認  
# - エラーハンドリング確認

# 3. ビルドテスト
npm run build
npm run preview
```

### デプロイ準備
```bash
# 1. 環境変数確認
cat .env.example
ls -la .env*

# 2. 本番デプロイ（テスト）
npm run deploy

# 3. 動作確認
# - サイト表示確認
# - API機能確認
# - チャット機能確認
```

## コードレビュー基準

### 必須チェック項目
- [ ] TypeScript型定義の適切性
- [ ] Vueコンポーネント設計の妥当性  
- [ ] パフォーマンス影響（bundle size）
- [ ] セキュリティリスク
- [ ] アクセシビリティ対応

### 推奨事項
- [ ] コメント・ドキュメントの充実
- [ ] エラーハンドリングの包括性
- [ ] テスタビリティ
- [ ] 再利用性の考慮

## 問題発生時の対応

### 開発環境問題
```bash
# Node modules再インストール
rm -rf node_modules package-lock.json
npm install

# キャッシュクリア
npm run dev -- --force

# TypeScript設定確認
npm run type-check
```

### ビルド問題
```bash
# 依存関係確認
npm audit
npm update

# 設定確認
cat vite.config.ts
```

### デプロイ問題
```bash
# FTP設定確認
cat .env.deploy

# ログ確認
# - GitHub Actions: Actionsタブ
# - お名前.com: 管理画面エラーログ
```

## パフォーマンス指標

### Core Web Vitals
- **LCP**: < 2.5s（Largest Contentful Paint）
- **FID**: < 100ms（First Input Delay）  
- **CLS**: < 0.1（Cumulative Layout Shift）

### バンドルサイズ
- **Initial**: < 100KB gzipped
- **Vendor**: < 200KB gzipped
- **Total**: < 500KB gzipped