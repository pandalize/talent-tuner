# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

職業適性診断アプリケーション（talent-tuner）です。ユーザーの質問への回答に基づいて職業推奨を行うVue.jsアプリケーションです。4つのカテゴリー（スキル、興味、優先事項、バランス）でユーザーの特性を分析し、事前定義された職業リストから適切な職業を推奨します。

## アーキテクチャ

- **フロントエンド**: Vue 3 + TypeScript、Composition API使用
- **ルーティング**: Vue Router でSPAナビゲーション
- **状態管理**: コンポーネントローカル状態（Vueのリアクティビティ以外のグローバル状態管理なし）
- **ビルドツール**: Vite（標準Vue設定）
- **データ保存**: `/public/data/` の静的JSONファイルをfetch APIで取得

### 主要コンポーネント構造
- `App.vue`: ナビゲーション付きメインアプリケーションシェル
- `DiagnosisView.vue`: 診断フローのシンプルなコンテナ
- `QuestionNavigator.vue`: 質問ロジックと結果表示を担うコアコンポーネント
- `diagnosisLoader.ts`: データ読み込みとスコアリングアルゴリズムのユーティリティ関数
- `AppFooter.vue`: 全ページ共通のフッターコンポーネント（必須ページリンク含む）

### データフロー
1. JSONファイルから診断設定と職業データを読み込み
2. 4カテゴリーにわたる16の質問をユーザーに提示
3. 重み付けされた回答に基づいて職業スコアを計算
4. 上位N件の結果を詳細情報とともに表示

## 開発コマンド

```bash
# 最初にVueアプリディレクトリに移動
cd my-vue-app

# 依存関係のインストール
npm install

# 開発サーバー起動（通常 http://localhost:5173）
npm run dev

# 本番ビルド
npm run build

# 本番ビルドのプレビュー
npm run preview

# 型チェック
npm run type-check

# リント
npm run lint

# コードフォーマット
npm run format
```

## 重要なファイルと設定

- `public/data/diagnostic_config.json`: 質問、選択肢、スコア重み、職業マッピングを含む
- `public/data/professions.json`: 職業の詳細情報（年収、説明、コメント）
- `src/utils/diagnosisLoader.ts`: コア診断ロジックとデータ処理関数

## 診断設定

診断の動作は `diagnostic_config.json` で制御されます：
- `recommend_top_n`: 表示する上位職業数（現在3）
- `category_weights`: 各カテゴリーのスコア重み（skill, interest, priority, balance）
- 質問は選択肢の選択を通じて職業にマッピングされる

## AdSense審査対応（2025年7月21日実装）

Google AdSense審査通過のために以下の改善を実装済み：

### 必須ページの追加
- `/privacy` - プライバシーポリシー（AdSense対応、Cookie使用説明含む）
- `/terms` - 利用規約（サービス利用条件、免責事項含む）  
- `/contact` - お問い合わせフォーム（プライバシーポリシー同意機能付き）
- `/company` - 運営者情報（サイト概要、免責事項含む）
- `/404` - カスタム404エラーページ

### SEO・技術改善
- 動的メタタグ更新（router.beforeEach使用）
- sitemap.xml・robots.txt作成
- OGP・Twitterカード対応
- フッターコンポーネント追加（必須ページリンク配置）

### レイアウト修正
- App.vueをflexboxレイアウトに変更（min-height: 100vh）
- フッター位置の最適化（margin-top: auto）
- 診断ページのフッター位置問題修正（DiagnosisView.vueの height: 100vh削除）

## 開発時の注意点

- アプリは `QuestionNavigator.vue` にメインロジックを持つシングルページ構造
- すべてのデータは静的JSONファイルから非同期で読み込み
- スコアリングアルゴリズムはカテゴリー別にユーザー回答を重み付けし、職業マッチを合計
- `diagnosisLoader.ts` でTypeScriptインターフェースが適切に定義され型安全性を確保
- CSS カスタムプロパティを使用したテーマ対応のレスポンシブデザイン
- **フッター位置**: App.vueのflexレイアウトに依存するため、各ビューで固定高さ（height: 100vh等）を設定しない