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

## 連絡先情報更新（2025年7月21日）

メールアドレスとサイト情報を更新：
- 全ページの連絡先メールアドレス：`pandalize.info@gmail.com`
- 運営者所在地：北海道
- サイトURL：https://pandalize.com/
- お問い合わせ方式：直接メールアドレス表示（フォーム廃止）

## Stripe決済機能実装（2025年7月21日）

診断結果に基づく詳細PDFレポートの販売機能を実装。

### ブランチ戦略
- `main`: 本番環境用ブランチ
- `develop`: 開発統合ブランチ（最新版）
- `feature/stripe-payment`: Stripe決済機能開発ブランチ

### 実装済み機能

#### 1. フロントエンド
- **診断結果画面の拡張** (`QuestionNavigator.vue`)
  - PDF購入セクション追加（詳細レポートの説明、特徴リスト）
  - 購入ボタン（500円）実装
  - Stripe Checkoutへのリダイレクト処理
  
- **決済成功ページ** (`PaymentSuccessView.vue`)
  - `/payment-success` ルート追加
  - 決済確認UI
  - PDFダウンロードボタン（仮実装）
  - エラーハンドリング

- **Stripe.js統合**
  - `index.html` にStripe.jsライブラリ追加
  - 環境変数対応（`VITE_STRIPE_PUBLIC_KEY`）

#### 2. バックエンド（PHP）
- **APIエンドポイント** (`/public/api/`)
  - `create-checkout-session.php`: Stripe Checkoutセッション作成（仮実装）
  - CORS対応
  - エラーハンドリング

#### 3. 設定ファイル
- `.env.example`: Stripe APIキーのテンプレート作成

### 必要な追加作業

#### 1. Stripeアカウント設定
```bash
# 1. Stripeアカウント作成
# https://dashboard.stripe.com/register

# 2. APIキー取得（テスト環境）
# Dashboard > Developers > API keys

# 3. 商品・価格設定
# Dashboard > Products で「詳細診断レポート」を作成
```

#### 2. 環境変数設定
```bash
# my-vue-app/.env ファイル作成
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxx
```

#### 3. PHP環境構築
```bash
# Composerインストール
curl -sS https://getcomposer.org/installer | php

# Stripe PHPライブラリインストール
php composer.phar require stripe/stripe-php

# .htaccess設定（APIディレクトリ保護）
```

#### 4. 本番実装タスク

##### バックエンド完全実装
- [ ] Stripe Checkoutセッション作成の本実装
- [ ] Webhook処理（`webhook.php`）
  - 決済完了確認
  - 顧客情報保存
  - メール送信
- [ ] セキュリティ強化
  - Webhook署名検証
  - CSRF対策
  - レート制限

##### PDF生成機能
- [ ] PDF生成ライブラリ選定（TCPDF推奨）
- [ ] PDFテンプレート作成
  - 診断結果詳細
  - カテゴリー別分析グラフ
  - キャリアアドバイス
  - スキルアップ提案
- [ ] `generate-pdf.php` 実装
- [ ] PDFダウンロード機能（`download-pdf.php`）

##### データベース設計
```sql
-- 購入履歴テーブル
CREATE TABLE purchases (
  id INT PRIMARY KEY AUTO_INCREMENT,
  session_id VARCHAR(255) UNIQUE,
  email VARCHAR(255),
  result_data JSON,
  pdf_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

##### メール送信機能
- [ ] 購入確認メール
- [ ] PDFダウンロードリンク送信
- [ ] 24時間有効期限設定

### デプロイ時の注意事項

1. **環境変数の設定**
   - 本番用Stripe APIキー
   - データベース接続情報
   - メール送信設定

2. **セキュリティ対策**
   - HTTPSの強制
   - APIエンドポイントの認証
   - ファイルアップロード制限

3. **お名前.comサーバー対応**
   - PHPバージョン確認（7.4以上推奨）
   - Composerが使えない場合は手動でライブラリ配置
   - .htaccessでAPIディレクトリ保護

### テスト手順

1. **ローカルテスト**
```bash
# 開発サーバー起動
cd my-vue-app && npm run dev

# Stripeテストカード使用
# カード番号: 4242 4242 4242 4242
# 有効期限: 任意の将来日付
# CVC: 任意の3桁
```

2. **本番前チェックリスト**
- [ ] Stripe本番APIキー設定
- [ ] success_url/cancel_url更新
- [ ] エラーログ設定
- [ ] バックアップ体制確立

## 開発時の注意点

- アプリは `QuestionNavigator.vue` にメインロジックを持つシングルページ構造
- すべてのデータは静的JSONファイルから非同期で読み込み
- スコアリングアルゴリズムはカテゴリー別にユーザー回答を重み付けし、職業マッチを合計
- `diagnosisLoader.ts` でTypeScriptインターフェースが適切に定義され型安全性を確保
- CSS カスタムプロパティを使用したテーマ対応のレスポンシブデザイン
- **フッター位置**: App.vueのflexレイアウトに依存するため、各ビューで固定高さ（height: 100vh等）を設定しない
- **決済処理**: Stripeの公式ベストプラクティスに従い、カード情報は直接扱わない