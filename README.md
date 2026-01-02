# Talent-Tuner

AI職業適性診断・キャリア相談アプリケーション

## 概要

Talent-Tunerは、科学的な職業適性診断とAIを活用したキャリア相談を提供するNuxt 3アプリケーションです。多言語対応（日本語・英語・中国語）により、グローバルなユーザーに対応しています。

## 主要機能

### 1. 職業適性診断
- **16の質問による精密診断**: 4つのカテゴリー（スキル・興味・優先事項・バランス）で総合評価
- **スワイプ式UI**: 直感的な回答インターフェース
- **28職業のデータベース**: 各職業の詳細情報、年収、適性情報を提供
- **上位3職業を推奨**: カテゴリー別スコアと総合適性度を表示

### 2. AI進路相談
- **Claude AI統合**: Anthropic Claude APIによるインテリジェントなキャリアアドバイス
- **リアルタイムチャット**: 個別の質問や悩みに対応

### 3. 詳細レポート販売
- **Stripe決済統合**: 診断結果の詳細PDFレポートを販売
- **セキュアな決済**: Stripe Checkout Sessionによる安全な支払い処理

### 4. 多言語対応
- 日本語（デフォルト）
- 英語
- 中国語（簡体字）

### 5. 豊富なコンテンツ
- 25ページ以上のコンテンツ
- SEO最適化済み
- Google AdSense審査対応

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