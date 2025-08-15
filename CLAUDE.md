# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。
詳細な技術ドキュメントは `.serena/memories/` ディレクトリに保管されています。

## プロジェクト概要

職業適性診断アプリケーション「ため職」（talent-tuner）
- 4カテゴリー16問の診断で28職業から最適な職業を推奨
- Claude AI APIによる進路相談チャットbot
- 日本語・英語・中国語の多言語対応
- Vue 3 + TypeScript + Vite構成のSPA

## クイックスタート

```bash
# 開発環境起動
cd my-vue-app
npm install
npm run dev  # http://localhost:5173

# 本番ビルド＆デプロイ
npm run build
npm run deploy  # お名前.comサーバーへ自動デプロイ
```

## 主要コマンド一覧

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番ビルド |
| `npm run deploy` | 自動デプロイ（要.env.deploy設定） |
| `npm run type-check` | TypeScript型チェック |
| `npm run lint` | ESLintコード品質チェック |
| `npm run validate:translations` | 翻訳整合性チェック |

## 環境変数設定

```bash
# .env（開発用）
VITE_CLAUDE_API_KEY=sk-ant-api03-xxxxx
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxx

# .env.deploy（デプロイ用）
FTP_HOST=your-server.com
FTP_USER=username
FTP_PASSWORD=password
```

## プロジェクト構造

```
my-vue-app/
├── src/
│   ├── components/       # 再利用可能コンポーネント
│   ├── views/           # 25ページのビューコンポーネント
│   ├── router/          # Vue Routerルーティング
│   ├── utils/           # ビジネスロジック・API連携
│   ├── i18n/            # 多言語対応（Vue I18n）
│   └── composables/     # Composition APIヘルパー
├── public/
│   ├── data/            # 診断・職業JSONデータ
│   └── api/             # PHPプロキシAPI
└── scripts/             # 開発用スクリプト
```

## 主要コンポーネント

- **QuestionNavigator.vue**: 診断機能の中核（質問表示・スコアリング・結果表示）
- **CareerChatBot.vue**: AI進路相談チャット
- **LanguageSwitcher.vue**: 多言語切り替えUI
- **App.vue**: メインアプリケーションシェル

## 開発ワークフロー

1. **機能開発**: `feature/` ブランチで開発
2. **品質確認**: `npm run lint && npm run type-check`
3. **テスト**: `npm run dev` でローカル確認
4. **デプロイ**: `develop` → `main` マージでGitHub Actions自動デプロイ

## 重要な注意事項

- **型安全性**: 新規フィールド追加時は必ず型定義を更新
- **多言語対応**: 新UI追加時は3言語の翻訳を追加
- **SEO**: 新ページ追加時はメタタグ・sitemap.xml更新
- **セキュリティ**: APIキーは必ず環境変数で管理
- **フッター位置**: App.vueのflexレイアウトを維持（height: 100vh禁止）

## 詳細ドキュメント

技術的な詳細は以下のメモリーファイルを参照：

- `.serena/memories/project_overview.md` - プロジェクト概要
- `.serena/memories/architecture_components.md` - アーキテクチャ詳細
- `.serena/memories/api_integrations.md` - API連携仕様
- `.serena/memories/deployment_cicd.md` - デプロイ手順
- `.serena/memories/multilingual_implementation.md` - 多言語実装
- `.serena/memories/business_logic_algorithms.md` - ビジネスロジック
- `.serena/memories/development_workflow.md` - 開発フロー
- `.serena/memories/configuration_environment.md` - 設定詳細
- `.serena/memories/suggested_commands.md` - コマンドリファレンス

## 連絡先

- サイトURL: https://pandalize.com/
- メール: pandalize.info@gmail.com
- ブランチ: `develop`（開発）、`main`（本番）

---
最終更新: 2025年8月15日