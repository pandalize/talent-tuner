# talent-tuner

職業適性診断アプリケーション

## 概要

このアプリケーションは、ユーザーの回答に基づいて最適な職業を診断するVue.jsアプリケーションです。

## 機能

- 8つの質問による職業適性診断
- カテゴリー別スコア表示（スキル、モチベーション、環境適応、性格）
- 診断結果に基づく職業推奨とコメント表示

## 動作確認・開発環境の起動方法

### 前提条件

- Node.js (推奨バージョン: 18以上)
- npm

### セットアップと起動手順

1. **プロジェクトディレクトリに移動**
   ```bash
   cd my-vue-app/vue-project
   ```

2. **依存関係のインストール**
   ```bash
   npm install
   ```

3. **開発サーバーの起動**
   ```bash
   npm run dev
   ```

4. **ブラウザでアクセス**
   
   開発サーバーが起動すると、ターミナルにローカルサーバーのURLが表示されます（通常は `http://localhost:5173`）。
   
   ブラウザで表示されたURLにアクセスしてアプリケーションを確認できます。

### その他のコマンド

- **ビルド**: `npm run build`
- **プレビュー**: `npm run preview`
- **型チェック**: `npm run type-check`
- **リント**: `npm run lint`
- **フォーマット**: `npm run format`

## プロジェクト構成

```
my-vue-app/vue-project/
├── src/
│   ├── components/          # Vue コンポーネント
│   ├── views/              # ページコンポーネント
│   │   └── DiagnosisView.vue  # 診断画面（メイン機能）
│   ├── utils/              # ユーティリティ
│   │   └── diagnosisLoader.ts # 診断ロジック
│   └── router/             # ルーティング設定
├── public/
│   └── data/
│       └── types.csv       # 職業データ
├── diagnostic_config.json  # 診断設定ファイル
└── package.json
```

## 診断結果について

現在の設定では、診断結果として**上位1位**の職業のみが表示されます。
複数の職業を表示したい場合は、`diagnostic_config.json`の`threshold.recommend_top_n`の値を変更してください。

```json
{
  "threshold": {
    "recommend_top_n": 3  // 上位3位まで表示する場合
  }
}