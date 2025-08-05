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

## プロジェクト構成

```
talent-tuner/
│
├── 📁 my-vue-app/                    # メインアプリケーション
│   ├── 📁 src/                       # ソースコード
│   │   ├── 📄 App.vue                # ナビゲーション付きメインアプリシェル
│   │   ├── 📄 main.ts                # アプリケーションエントリーポイント
│   │   │
│   │   ├── 📁 components/            # 再利用可能コンポーネント
│   │   │   ├── 📄 AppFooter.vue      # 全ページ共通フッター（必須ページリンク）
│   │   │   ├── 📄 QuestionNavigator.vue # 診断コアロジック（質問・結果表示）
│   │   │   ├── 📄 CareerChatBot.vue  # AI進路相談チャットUI
│   │   │   └── 📄 Breadcrumb.vue     # パンくずナビゲーション
│   │   │
│   │   ├── 📁 views/                 # ページコンポーネント（25ページ）
│   │   │   ├── 📄 HomeView.vue       # ホームページ
│   │   │   ├── 📄 DiagnosisView.vue  # 診断ページコンテナ
│   │   │   ├── 📄 CareerChatView.vue # AI進路相談ページ
│   │   │   ├── 📄 AboutView.vue      # 職業一覧ページ
│   │   │   │
│   │   │   ├── 📄 ProfessionDetailView.vue  # 職業詳細（動的ルーティング）
│   │   │   │
│   │   │   ├── 📁 キャリアガイド/
│   │   │   │   ├── 📄 CareerGuideView.vue      # キャリア選択ガイド
│   │   │   │   ├── 📄 SkillsDevelopmentView.vue # スキル開発ガイド
│   │   │   │   ├── 📄 SalaryGuideView.vue      # 年収・転職情報
│   │   │   │   ├── 📄 CareerChangeView.vue     # 転職・キャリアチェンジ
│   │   │   │   └── 📄 StudentGuideView.vue     # 学生向けガイド
│   │   │   │
│   │   │   ├── 📁 診断関連/
│   │   │   │   ├── 📄 DiagnosisMethodView.vue  # 診断方法解説
│   │   │   │   ├── 📄 ResultGuideView.vue      # 結果活用ガイド
│   │   │   │   └── 📄 DiagnosisTheoryView.vue  # 適性診断理論
│   │   │   │
│   │   │   ├── 📁 必須ページ/
│   │   │   │   ├── 📄 PrivacyPolicyView.vue    # プライバシーポリシー
│   │   │   │   ├── 📄 TermsOfServiceView.vue   # 利用規約
│   │   │   │   ├── 📄 ContactView.vue          # お問い合わせ
│   │   │   │   ├── 📄 CompanyInfoView.vue      # 運営者情報
│   │   │   │   └── 📄 NotFoundView.vue         # 404エラーページ
│   │   │   │
│   │   │   └── 📄 PaymentSuccessView.vue # Stripe決済成功ページ
│   │   │
│   │   ├── 📁 router/                # ルーティング設定
│   │   │   └── 📄 index.ts           # Vue Router設定（25ページ対応）
│   │   │
│   │   ├── 📁 utils/                 # ユーティリティ関数
│   │   │   ├── 📄 diagnosisLoader.ts      # 診断ロジック・データ処理
│   │   │   ├── 📄 claudeApiClient.ts      # Claude AI API統合
│   │   │   ├── 📄 professionDataManager.ts # 職業データ管理
│   │   │   ├── 📄 seoUtils.ts             # SEO・構造化データ
│   │   │   └── 📄 seoKeywords.ts          # SEOキーワード定義
│   │   │
│   │   └── 📁 assets/                # 静的アセット
│   │       ├── 📄 base.css           # ベースCSS（CSS Variables）
│   │       └── 📄 main.css           # メインスタイル
│   │
│   ├── 📁 public/                    # 静的ファイル（ビルド時にそのまま配信）
│   │   ├── 📁 data/                  # 診断・職業データ（JSON）
│   │   │   ├── 📄 diagnostic_config.json  # 診断設定（質問・重み・マッピング）
│   │   │   ├── 📄 professions.json        # 職業詳細データ
│   │   │   ├── 📄 categories.json         # カテゴリー定義
│   │   │   └── 📁 professions/            # 職業別詳細データ
│   │   │       ├── 📄 tech-creative.json       # 技術・クリエイティブ系
│   │   │       ├── 📄 business-finance.json    # ビジネス・金融系
│   │   │       ├── 📄 medical-welfare-education.json # 医療・福祉・教育系
│   │   │       ├── 📄 service-hospitality.json # サービス・接客系
│   │   │       └── 📄 professional-specialized.json # 専門職・士業
│   │   │
│   │   ├── 📁 api/                   # サーバーサイドAPI（PHP）
│   │   │   ├── 📄 chat-proxy.php          # Claude API プロキシ
│   │   │   └── 📄 create-checkout-session.php # Stripe決済API
│   │   │
│   │   ├── 📁 image/                 # 画像ファイル
│   │   │   ├── 📄 construction.png   # 職業イメージ画像
│   │   │   ├── 📄 influencer.png     # SNSアイコン等
│   │   │   └── 📄 *.png              # その他画像
│   │   │
│   │   ├── 📄 .htaccess              # SPA対応・セキュリティ設定
│   │   ├── 📄 sitemap.xml            # SEO用サイトマップ（25ページ）
│   │   ├── 📄 robots.txt             # 検索エンジン設定
│   │   └── 📄 favicon.ico            # ファビコン
│   │
│   ├── 📁 .github/workflows/         # GitHub Actions CI/CD
│   │   └── 📄 deploy.yml             # 自動デプロイ設定
│   │
│   ├── 📄 .env                       # 環境変数（APIキー）※Git除外
│   ├── 📄 .env.deploy                # デプロイ設定（FTP情報）※Git除外  
│   ├── 📄 .env.deploy.example        # デプロイ設定テンプレート
│   ├── 📄 package.json               # npm設定・依存関係
│   ├── 📄 vite.config.ts             # Vite設定
│   ├── 📄 tsconfig.json              # TypeScript設定
│   │
│   ├── 📄 deploy-ftp.js              # Node.js自動デプロイスクリプト
│   ├── 📄 deploy-simple.sh           # Bash自動デプロイスクリプト
│   └── 📄 DEPLOY_AUTOMATION.md       # デプロイ自動化ガイド
│
├── 📄 CLAUDE.md                      # プロジェクト仕様書（このファイル）
├── 📄 DEPLOYMENT_ONAMAE.md           # お名前.com デプロイガイド
└── 📄 README.md                      # プロジェクト概要
```

### 主要コンポーネント機能
- **App.vue**: ナビゲーション付きメインアプリケーションシェル
- **QuestionNavigator.vue**: 診断コアロジック（質問表示・結果計算・表示）
- **CareerChatBot.vue**: Claude AI統合チャット機能
- **diagnosisLoader.ts**: データ読み込み・スコアリングアルゴリズム
- **claudeApiClient.ts**: AI進路相談API統合・環境別処理
- **AppFooter.vue**: 全ページ共通フッター（必須ページリンク含む）

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

# 自動デプロイ（本番サーバーへアップロード）
npm run deploy

# デプロイ設定ファイル作成
npm run deploy:setup
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

#### 1. Stripeアカウント設定（詳細手順）

##### 1-1. アカウント作成
1. **サインアップ**
   - https://dashboard.stripe.com/register にアクセス
   - メールアドレス、パスワード、国（日本）を入力
   - メール認証を完了

2. **基本情報入力**
   - ビジネス名：「ため職」または個人名
   - ビジネスタイプ：個人事業主 or 法人
   - 業種：「ソフトウェア」または「教育」

##### 1-2. テスト用APIキー取得
1. **ダッシュボードアクセス**
   - https://dashboard.stripe.com/ にログイン
   - 左メニュー「開発者」→「APIキー」

2. **テストモード確認**
   - 画面右上の「テストモード」がONであることを確認
   - OFFの場合はクリックしてONに切り替え

3. **APIキー取得**
   ```
   公開可能キー: pk_test_51O... (フロントエンドで使用)
   シークレットキー: sk_test_51O... (バックエンドで使用)
   ```

##### 1-3. 商品・価格設定
1. **商品作成**
   - ダッシュボード > 商品カタログ > 「商品を追加」
   ```
   商品名: ため職 詳細診断レポート
   説明: あなたの診断結果に基づいた詳細なPDFレポート
   ```

2. **価格設定**
   ```
   価格: 500円
   通貨: JPY
   課金タイプ: 1回限り
   ```

3. **価格ID取得**
   - 作成後、価格ID（`price_xxxxx`）をコピー
   - PHPファイルで使用

##### 1-4. Webhook設定（本番用）
1. **エンドポイント追加**
   - 開発者 > Webhook > 「エンドポイントを追加」
   - URL: `https://pandalize.com/api/webhook.php`

2. **イベント選択**
   - `checkout.session.completed`
   - `payment_intent.succeeded`

3. **署名シークレット取得**
   - Webhook署名シークレットをコピー（`whsec_xxxxx`）

#### 2. 環境変数設定
```bash
# .envファイル作成
cd my-vue-app
cp .env.example .env

# .envファイル編集
VITE_STRIPE_PUBLIC_KEY=pk_test_あなたの公開キー

# .gitignore確認（.envが含まれていることを確認）
cat .gitignore | grep .env
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

#### 1. ローカルテスト環境セットアップ
```bash
# 開発サーバー起動
cd my-vue-app && npm run dev

# ブラウザで診断を実行
1. http://localhost:5173 にアクセス
2. 「診断を始める」をクリック
3. 全質問に回答
4. 診断結果画面で「詳細レポートを購入する（¥500）」をクリック
```

#### 2. Stripeテストカード情報
```
成功するカード:
- カード番号: 4242 4242 4242 4242
- 有効期限: 12/34（任意の将来日付）
- CVC: 123（任意の3桁）
- 郵便番号: 任意の5桁

その他のテストカード:
- 残高不足: 4000 0000 0000 9995
- カード拒否: 4000 0000 0000 0002
- 3Dセキュア必須: 4000 0027 6000 3184
```

#### 3. 本番移行チェックリスト

##### Stripe設定
- [ ] 本番APIキー取得・設定
- [ ] 本人確認書類提出
- [ ] 銀行口座登録
- [ ] Webhook本番URL設定

##### コード修正
- [ ] success_url を本番URLに変更
- [ ] cancel_url を本番URLに変更
- [ ] APIエンドポイントURLの確認
- [ ] エラーログ出力設定

##### セキュリティ
- [ ] HTTPS強制設定
- [ ] APIキーの環境変数化確認
- [ ] Webhook署名検証実装
- [ ] CSRF対策実装

##### 運用準備
- [ ] エラー通知設定
- [ ] バックアップ体制
- [ ] サポート体制構築
- [ ] 利用規約・特商法表記更新

## AdSense審査用コンテンツ充実（2025年8月4日実装）

Google AdSense審査通過のために大規模なコンテンツ拡充を実施。

### 実装内容

#### 1. 職業詳細ページ（8ページ）
- **個別職業ページ** (`/profession/:id`)
  - プログラマー、デザイナー、営業職、建設業、公認会計士、起業家、建築士、保育士
  - 各職業の詳細情報（必要スキル、キャリアパス、労働環境、需要見通し、関連職業、必要学歴）
  - `ProfessionDetailView.vue` で動的ルーティング実装

#### 2. キャリアガイドページ（5ページ）
- `/career-guide` - キャリア選択の総合ガイド
- `/skills-development` - スキル開発ガイド（職業別学習ロードマップ）
- `/salary-guide` - 年収・転職情報ガイド
- `/career-change` - 転職・キャリアチェンジガイド
- `/student-guide` - 学生向けキャリアガイド

#### 3. 診断関連ページ（3ページ）
- `/diagnosis-method` - 診断方法の詳細解説
- `/result-guide` - 診断結果活用ガイド
- `/diagnosis-theory` - 適性診断の理論と背景

### データ構造の拡張

#### professions.json の拡張フィールド
```json
{
  "id": "profession-id",
  "requiredSkills": ["スキル1", "スキル2"],
  "careerPath": ["ジュニア", "シニア", "マネージャー"],
  "workEnvironment": "働く環境の説明",
  "demandOutlook": "需要見通し",
  "relatedProfessions": ["関連職業1", "関連職業2"],
  "educationRequirements": "必要な学歴・資格"
}
```

#### TypeScript型定義の更新
`diagnosisLoader.ts` の `ProfessionData` インターフェースに新フィールドを追加。

### 成果
- **総ページ数**: 25ページ（AdSense推奨15-20ページを大幅超過）
- **コンテンツ品質**: 各ページ2000-3000文字の専門的コンテンツ
- **SEO最適化**: 全ページにメタタグ、構造化されたHTML
- **ユーザビリティ**: 相互リンクによる回遊性向上

### sitemap.xml
全25ページを記載し、Google Search Consoleへの送信準備完了。

## 開発時の注意点

- アプリは `QuestionNavigator.vue` にメインロジックを持つシングルページ構造
- すべてのデータは静的JSONファイルから非同期で読み込み
- スコアリングアルゴリズムはカテゴリー別にユーザー回答を重み付けし、職業マッチを合計
- `diagnosisLoader.ts` でTypeScriptインターフェースが適切に定義され型安全性を確保
- CSS カスタムプロパティを使用したテーマ対応のレスポンシブデザイン
- **フッター位置**: App.vueのflexレイアウトに依存するため、各ビューで固定高さ（height: 100vh等）を設定しない
- **決済処理**: Stripeの公式ベストプラクティスに従い、カード情報は直接扱わない
- **TypeScript型定義**: 新規フィールド追加時は必ず `diagnosisLoader.ts` の型定義を更新

## AI進路相談チャットbot機能実装（2025年8月5日）

Claude AI APIを活用した進路相談機能を実装。

### 実装内容

#### 1. チャットbotコア機能
- **Claude API統合** (`src/utils/claudeApiClient.ts`)
  - Claude 3 Haiku モデル使用
  - 28職業データベースと連携したシステムプロンプト
  - 開発・本番環境自動判定（localhost: 直接API、本番: PHP proxy経由）
  - フォールバック機能（APIエラー時はモックレスポンス）

- **チャットUI** (`src/components/CareerChatBot.vue`)
  - リアルタイム会話インターフェース
  - タイピングアニメーション、職業カード表示
  - 提案質問機能、適性診断への誘導
  - 完全レスポンシブデザイン

#### 2. お名前.com共用サーバー対応
- **PHPプロキシAPI** (`public/api/chat-proxy.php`)
  - Claude API呼び出し中継（CORS対応）
  - 環境変数（.env）からAPIキー取得
  - セキュリティ・エラーハンドリング実装

- **SPA対応設定** (`public/.htaccess`)
  - Vue Routerクライアントサイドルーティング対応
  - APIリクエストプロキシ設定
  - セキュリティヘッダー、GZIP圧縮

#### 3. 自動デプロイシステム
複数の自動化手法を実装：

##### Node.js FTPスクリプト（推奨）
```bash
# 初期設定
npm run deploy:setup
# FTP情報を .env.deploy に設定

# ワンコマンドデプロイ
npm run deploy
```
- 完全自動化（ビルド→FTP→権限設定）
- エラーハンドリング充実
- `deploy-ftp.js` + `basic-ftp` ライブラリ使用

##### GitHub Actions CI/CD
- mainブランチpush時に自動デプロイ
- `.github/workflows/deploy.yml` 設定済み
- Secrets設定でFTP情報管理

##### 軽量Bashスクリプト
```bash
./deploy-simple.sh
```
- `lftp` + `rsync` 使用の高速デプロイ
- 上級者・軽量重視向け

### APIキー設定

#### 環境変数
```bash
# .env
VITE_CLAUDE_API_KEY=sk-ant-api03-your_actual_api_key_here

# .env.deploy（FTPデプロイ用）
FTP_HOST=your-ftp-server.com
FTP_USER=your-username
FTP_PASSWORD=your-password
```

#### セキュリティ
- APIキーは環境変数で管理
- .envファイルは権限600設定必須
- 公開リポジトリへのコミット厳禁

### 職業相談機能
28職業カテゴリー対応：
- 技術・クリエイティブ系（プログラマー、Webデザイナー等）
- ビジネス・金融系（営業、コンサルタント等）
- 医療・福祉・教育系（看護師、教師等）
- サービス・接客系（美容師、シェフ等）
- 専門職・士業（会計士、弁護士等）

### デプロイ手順
1. **ローカルビルド**: `npm run build`
2. **自動アップロード**: FTPスクリプトで全ファイル配置
3. **権限設定**: .env (600), .htaccess (644), PHP (644)
4. **動作確認**: チャット機能・SPA動作テスト

### アーキテクチャ更新
- **API呼び出し**: 開発環境（直接）⇔ 本番環境（PHP proxy）
- **エラー処理**: API失敗時は高品質なモックレスポンス
- **パフォーマンス**: 遅延アニメーション、非同期処理最適化
- **セキュリティ**: CORS対応、入力サニタイズ、レート制限

### 運用・保守
- **ログ監視**: API呼び出しエラー、PHP実行エラー
- **APIキー管理**: 定期ローテーション推奨
- **バックアップ**: 全サイトファイル、.envファイル
- **アップデート**: `npm run deploy` で即座に本番反映

## 多言語対応システム設計（2025年8月5日策定）

グローバル展開を見据えた包括的な多言語対応戦略を策定。

### 対象言語・展開戦略
- **Phase 1**: 🇯🇵日本語（現在）+ 🇺🇸英語 + 🇨🇳中国語（簡体字）
- **Phase 2**: 🇰🇷韓国語 + 🇹🇼中国語（繁体字）+ 🇻🇳ベトナム語  
- **Phase 3**: 🇩🇪ドイツ語 + 🇫🇷フランス語 + 🇪🇸スペイン語

### 技術実装

#### Vue I18n統合
- **国際化エンジン**: Vue I18n v9（Composition API対応）
- **言語検出**: ブラウザ言語 → URL → ローカルストレージの優先順位
- **フォールバック**: 全言語で日本語をフォールバック言語に設定

#### ファイル構造拡張
```
src/i18n/
├── index.ts                 # Vue I18n設定・言語切り替えロジック
├── locales/                 # UI文言（JSON）
│   ├── ja.json             # 日本語UI文言
│   ├── en.json             # 英語UI文言
│   └── zh.json             # 中国語UI文言
└── utils/
    ├── languageDetector.ts  # ブラウザ言語自動検出
    └── dateFormatter.ts     # 言語別日時フォーマット

public/data/locales/         # コンテンツデータ
├── ja/                     # 日本語コンテンツ
│   ├── diagnostic_config.json  # 診断質問・選択肢
│   ├── professions.json        # 職業詳細データ
│   └── chat_prompts.json       # Claude AIプロンプト
├── en/                     # 英語コンテンツ
└── zh/                     # 中国語コンテンツ
```

#### URL構造設計
```
https://pandalize.com/        # 日本語（デフォルト）
https://pandalize.com/en/     # 英語
https://pandalize.com/zh/     # 中国語
https://pandalize.com/ko/     # 韓国語

# 各言語でのページ例
/diagnosis          → /en/diagnosis
/chat              → /en/chat
/profession/programmer → /en/profession/programmer
```

#### 主要コンポーネント
- **LanguageSwitcher.vue**: レスポンシブ言語切り替えUI
  - モバイル: ドロップダウン選択
  - デスクトップ: フラグ付きボタン
  - 初回変更時確認モーダル
  - アクセシビリティ完全対応

- **多言語データローダー**: 必要な言語のみを動的読み込み
- **SEO対応**: hreflang設定、言語別サイトマップ生成

### Claude AI多言語対応
- **言語別システムプロンプト**: 各言語に最適化された専門プロンプト
- **レスポンス言語制御**: ユーザー言語での回答を強制
- **職業データベース連携**: 28職業×多言語の詳細情報提供

### 実装工数・コスト試算
- **Phase 1基盤構築**: 2-3週間（Vue I18n、英語・中国語対応）
- **コンテンツ翻訳**: 4-6週間（全25ページ + 診断データ）
- **AI多言語化**: 1-2週間（Claude プロンプト最適化）
- **SEO・運用対応**: 1週間（hreflang、サイトマップ）

**合計推定**: 8-12週間で3言語完全対応

### 技術的特徴
- **自動言語検出**: ブラウザ言語→URL→保存設定の優先順位
- **動的データローディング**: 必要言語のみを効率的に読み込み
- **完全レスポンシブ**: 全デバイスで統一された多言語体験
- **アクセシビリティ**: WCAG 2.1準拠の言語切り替えUI
- **SEO最適化**: 各言語の検索エンジン最適化

### グローバル展開効果
- **市場拡大**: アジア太平洋地域で25億人のユーザーベース
- **競合優位性**: 多言語AI進路相談サービスとしての先行者利益
- **収益多様化**: 地域別の収益化モデル構築

この多言語対応により、国内市場から世界市場への本格展開が可能になります。