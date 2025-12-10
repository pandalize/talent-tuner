# talent-tuner 移行仕様書

## 概要

**ドメイン移管**: お名前.com → Cloudflare  
**フロントエンド移行**: Vercel へ統一化  
**フレームワーク移行**: Vue 3 + Vite → Nuxt 3  

---

## 1. 現状分析

### 1.1 現在のアーキテクチャ

```
┌─────────────────────────────────────────┐
│       ドメイン: pandalize.com           │
│         (お名前.com)                    │
└──────────────┬──────────────────────────┘
               │
        ┌──────┴───────┐
        ▼              ▼
    フロント        サーバー
    (お名前.com     (Vercel)
     FTP)           Next.js
                    ・API: /api/**
                    ・Stripe API
                    ・Claude API
```

### 1.2 フロントエンド現状

| 項目 | 現状 |
|------|------|
| **フレームワーク** | Vue 3 + Vite |
| **ホスティング** | お名前.com (FTP) |
| **ビルド** | `npm run build` → dist/ → FTP |
| **パッケージマネージャー** | npm |
| **API呼び出し** | fetch API (import.meta.env.VITE_API_BASE) |
| **環境変数** | .env (VITE_API_BASE, VITE_CLAUDE_API_KEY) |
| **ルーティング** | Vue Router 4 |
| **SPA対応** | .htaccess で /index.html へのリライト |
| **モック・プロキシ** | dev-proxy-server.js (開発用) |

### 1.3 サーバーサイド現状

| 項目 | 現状 |
|------|------|
| **ホスティング** | Vercel |
| **フレームワーク** | Next.js (serverside/package.json に記載) |
| **ビルド** | TypeScript コンパイル |
| **エンドポイント** | vercel.json で定義 |
| **API関数** | /serverside/api/*.ts (Vercel Serverless Functions) |

### 1.4 API エンドポイント

```
POST   /api/chat                   - Claude AI チャット
POST   /api/create-payment-intent  - Stripe 決済
GET    /api/check-session          - セッション確認
GET    /api/download-pdf           - PDF ダウンロード
GET    /api/health                 - ヘルスチェック
```

### 1.5 認証・環境変数

**フロントエンド**:
- `VITE_API_BASE`: API ベースURL (開発: http://localhost:3000 / 本番: https://talent-tuner.vercel.app)
- `VITE_CLAUDE_API_KEY`: Claude API キー

**サーバーサイド**:
- 環境変数は Vercel のプロジェクト設定で管理
- `.env` ファイルは含まない

---

## 2. 移行計画

### 2.1 Phase 1: フロントエンドの Nuxt 3 移行 (1-2週間)

#### 2.1.1 プロジェクト構造の変更

**Vue 3 + Vite 構造**:
```
frontend/
├── src/
│   ├── components/        # Vue コンポーネント
│   ├── views/            # ページコンポーネント
│   ├── router/           # Vue Router
│   ├── stores/           # Pinia (必要に応じて)
│   ├── utils/            # ユーティリティ
│   ├── i18n/             # 国際化
│   └── App.vue
├── index.html            # SPA エントリーポイント
├── vite.config.ts
└── package.json
```

**Nuxt 3 構造**:
```
frontend/
├── app/
│   └── app.vue           default.vueに変更し、layouts/に移動
├── pages/                # ファイルベースルーティング (旧 views/)
│   ├── index.vue
│   ├── diagnosis.vue
│   ├── payment.vue
│   ├── [profession]/
│   │   └── [...id].vue
│   └── ...
├── components/           # ★ コンポーネント (layout/ で自動スコープ付け)
│   ├── base/
│   │   ├── BaseButton.vue
│   │   └── BaseCard.vue
│   └── ...
├── composables/          # Vue 3 Composition API
├── middleware/           # ★ Nuxt ミドルウェア
├── plugins/              # ★ Nuxt プラグイン
├── server/               # ★ サーバーサイドルーティング (旧 API)
│   └── api/
│       ├── chat.ts
│       ├── create-payment-intent.ts
│       ├── check-session.ts
│       └── download-pdf.ts
├── public/               # 静的ファイル
├── nuxt.config.ts        # Nuxt 設定
├── tsconfig.json
└── package.json
```

#### 2.1.2 主要な変更箇所

| 項目 | Vue 3 + Vite | Nuxt 3 | 対応方法 |
|------|--------------|--------|---------|
| **ルーティング** | Vue Router (`router/index.ts`) | ファイルベースルーティング (`pages/`) | pages/ ディレクトリに移動 |
| **API呼び出し** | `fetch(import.meta.env.VITE_API_BASE)` | `$fetch('/api/*')` | `$fetch` に置き換え |
| **ストア** | Pinia (必要に応じて) | Pinia (対応) または `useState()` | そのまま使用可能 |
| **環境変数** | `import.meta.env` | `useRuntimeConfig()` | ランタイム設定に移行 |
| **ミドルウェア** | Vue Router ガード | Nuxt ミドルウェア | `middleware/` に配置 |
| **プラグイン** | Vue インスタンス設定 | Nuxt プラグイン | `plugins/` に配置 |
| **レイアウト** | App.vue | `app.vue` + `layouts/` | `layouts/default.vue` に分離 |
| **サーバーサイド** | PHP プロキシ または Vite プロキシ | Nuxt サーバー (`server/api/`) | TypeScript で実装 |

#### 2.1.3 変更が必要なファイル

**ルーティング**:
- ❌ 削除: `src/router/index.ts`
- ✅ 作成: `pages/index.vue`, `pages/diagnosis.vue` など

**API呼び出し**:
```typescript
// 旧 (Vue 3)
const apiBase = import.meta.env.VITE_API_BASE ?? ''
const url = `${apiBase}/api/chat`
const res = await fetch(url, { method: 'POST', ... })

// 新 (Nuxt 3)
const data = await $fetch('/api/chat', { method: 'POST', ... })
```

**環境変数**:
```typescript
// 旧 (Vue 3)
const apiKey = import.meta.env.VITE_CLAUDE_API_KEY

// 新 (Nuxt 3)
const config = useRuntimeConfig()
const apiKey = config.public.claudeApiKey  // クライアント側
// または
const apiKey = config.claudeApiKey         // サーバー側のみ
```

**レイアウト**:
```vue
<!-- 旧: App.vue (手動でレイアウトを記述) -->
<template>
  <div id="app">
    <AppHeader />
    <RouterView />
    <AppFooter />
  </div>
</template>

<!-- 新: layouts/default.vue (自動適用) -->
<template>
  <div>
    <AppHeader />
    <slot />
    <AppFooter />
  </div>
</template>

<!-- 新: pages/index.vue (ルートレイアウト使用) -->
<template>
  <div class="home-page">
    <!-- ページ内容 -->
  </div>
</template>
```

### 2.2 Phase 2: サーバーサイド統一 (1週間)

#### 2.2.1 API エンドポイント移行

**Vercel 構成の統一**:
- 現在: `/serverside/api/*.ts` (Vercel Serverless Functions)
- 新: 同じ構成を維持（Nuxt でも `/server/api/` で定義可）

**オプション 1: Nuxt Server Endpoints で統一**
```typescript
// server/api/chat.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // Claude API 呼び出しロジック
  return { success: true, message: '...' }
})
```

**オプション 2: Vercel Serverless Functions を継続使用**
- `/serverside/api/*.ts` をそのまま保持
- フロントエンド (Nuxt) から `/api/**` で呼び出し

推奨: **オプション 1** (Nuxt Server で統一)

#### 2.2.2 API レスポンス形式統一

```typescript
// 統一レスポンス形式
interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  timestamp?: string
}
```

### 2.3 Phase 3: デプロイ構成変更 (3-5日)

#### 2.3.1 vercel.json の更新
Vercel は Nuxt 4 を自動検出して最適化するためvercel.jsonは不要

**現在**:
```json
{
  "version": 2,
  "builds": [{ "src": "api/**/*.ts", "use": "@vercel/node" }],
  "routes": [
    { "src": "/api/chat", "dest": "/api/chat.ts" },
    ...
  ]
}
```

**新規** (Nuxt 3 使用時):
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": ".output/public"
}
```

Nuxt 3 を Vercel にデプロイすると自動的に最適化されます。

#### 2.3.2 package.json スクリプト更新

**フロントエンド**:
```json
{
  "scripts": {
    "dev": "nuxi dev",
    "build": "nuxi build",
    "preview": "nuxt preview",
    "generate": "nuxi generate",
    "deploy": "vercel --prod"
  }
}
```

#### 2.3.3 環境変数管理

**Vercel 環境変数**:
- `NUXT_PUBLIC_API_BASE`: フロントエンドから見える API ベースURL
- `NUXT_PUBLIC_STRIPE_PUBLIC_KEY`: Stripe Public Key
- `CLAUDE_API_KEY`: Claude API キー (サーバーサイド専用)
- `STRIPE_SECRET_KEY`: Stripe Secret Key (サーバーサイド専用)

**nuxt.config.ts**:
```typescript
export default defineNuxtConfig({
  runtimeConfig: {
    claudeApiKey: process.env.CLAUDE_API_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://talent-tuner.vercel.app',
      stripePublicKey: process.env.NUXT_PUBLIC_STRIPE_PUBLIC_KEY
    }
  }
})
```

### 2.4 Phase 4: ドメイン移管 (1-2日)

#### 2.4.1 DNS 設定変更

**現在** (お名前.com):
```
pandalize.com CNAME → お名前.com ネームサーバー
```

**新規** (Cloudflare):
```
1. Cloudflare アカウント作成
2. pandalize.com をサイト追加
3. お名前.com のネームサーバー設定変更:
   - ns1.cloudflare.com
   - ns2.cloudflare.com
   - ns3.cloudflare.com
   - ns4.cloudflare.com

4. Cloudflare での DNS レコード設定:
   - Vercel CNAME: @ → cname.vercel-dns.com
   - または A レコード: @ → Vercel IP アドレス
```

#### 2.4.2 SSL/TLS 設定

- **Cloudflare**: 自動 SSL (Full または Full (strict) 推奨)
- **Vercel**: 自動 SSL 対応

#### 2.4.3 DNS 伝播確認

```bash
# DNS 伝播確認
dig pandalize.com
nslookup pandalize.com
```

---

## 3. ファイル・フォルダ単位の変更詳細

### 3.1 削除ファイル

```
frontend/
├── deploy-ftp.js           ❌ (FTP デプロイ不要)
├── deploy-simple.sh        ❌ (FTP デプロイ不要)
├── dev-proxy-server.js     ⚠️  (開発用プロキシ - 不要になる可能性)
├── index.html              ❌ (Nuxt が自動生成)
├── vite.config.ts          ❌ (Nuxt が代替)
├── src/
│   ├── router/             ❌ (ファイルベースルーティング に置き換え)
│   └── App.vue             ⚠️  (app.vue に置き換え)
```

### 3.2 新規作成ファイル

```
frontend/
├── nuxt.config.ts          ✅ (Nuxt メイン設定)
├── app.vue                 ✅ (ルートレイアウト)  default.vueに変更し、layouts/に移動
├── pages/                  ✅ (ファイルベースルーティング)
│   ├── index.vue
│   ├── about.vue
│   ├── diagnosis.vue
│   ├── chat.vue
│   ├── payment.vue
│   ├── profession/
│   │   └── [id].vue
│   └── ...
├── middleware/             ✅ (ナビゲーションガード等)
├── plugins/                ✅ (i18n, Stripe.js 統合)
├── server/                 ✅ (サーバーサイドコード)
│   ├── api/
│   │   ├── chat.ts
│   │   ├── create-payment-intent.ts
│   │   ├── check-session.ts
│   │   └── download-pdf.ts
│   └── middleware/         (サーバーミドルウェア)
└── .env                    ✅ (環境変数)
```

### 3.3 移動・リネームファイル

| 現在 | 移行先 | 理由 |
|------|--------|------|
| `src/views/*.vue` | `pages/` | Nuxt ファイルベースルーティング |
| `src/components/` | `components/` | そのまま使用可能 (自動スコープ付け) |
| `src/composables/` | `composables/` | そのまま使用可能 |
| `src/utils/` | `utils/` または `composables/` | ユーティリティは保持、API クライアントは `server/` へ |
| `src/i18n/` | `i18n/` または `layers/` | Nuxt i18n モジュール使用を推奨 |
| `public/` | `public/` | そのまま使用可能 |

---

## 4. 詳細な API・ビジネスロジック変更

### 4.1 Chat API (`/api/chat`)

**現在**:
```typescript
// src/views/NewCareerChatView.vue
const apiBase = import.meta.env.VITE_API_BASE ?? ''
const url = `${apiBase}/api/chat`
const res = await fetch(url, {
  method: 'POST',
  body: JSON.stringify({ messages: apiMessages })
})
```

**Nuxt 3**:
```typescript
// composables/useCareerChat.ts
const { data, pending, error } = await useFetch('/api/chat', {
  method: 'POST',
  body: { messages: apiMessages }
})

// または
const data = await $fetch('/api/chat', {
  method: 'POST',
  body: { messages: apiMessages }
})
```

**サーバーサイド**:
```typescript
// server/api/chat.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  
  try {
    // Claude API 呼び出し
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.claudeApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 800,
        messages: body.messages
      })
    })
    
    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error('API error:', error)
    setResponseStatus(event, 500)
    return { success: false, error: 'Internal server error' }
  }
})
```

### 4.2 Payment API (`/api/create-payment-intent`)

**変更**: Stripe Payment Intent の作成ロジックはサーバーサイドに移動

```typescript
// server/api/create-payment-intent.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  
  const stripe = new Stripe(config.stripeSecretKey)
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: body.price * 100,
      currency: 'jpy',
      automatic_payment_methods: { enabled: true }
    })
    
    return { success: true, clientSecret: paymentIntent.client_secret }
  } catch (error) {
    setResponseStatus(event, 400)
    return { success: false, error: error.message }
  }
})
```

### 4.3 セッション管理 (`/api/check-session`)

```typescript
// server/api/check-session.ts
export default defineEventHandler(async (event) => {
  const sessionId = getCookie(event, 'sessionId')
  
  if (!sessionId) {
    setResponseStatus(event, 401)
    return { success: false, authenticated: false }
  }
  
  // セッション検証ロジック
  return { success: true, authenticated: true }
})
```

---

## 5. 設定ファイル・環境変数の変更

### 5.1 nuxt.config.ts (新規)

```typescript
export default defineNuxtConfig({
  // 基本設定
  devtools: { enabled: true },
  ssr: true,
  
  // ランタイム設定
  runtimeConfig: {
    claudeApiKey: process.env.CLAUDE_API_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://talent-tuner.vercel.app',
      stripePublicKey: process.env.NUXT_PUBLIC_STRIPE_PUBLIC_KEY
    }
  },
  
  // モジュール
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    // '@pinia/nuxt'  (必要に応じて)
  ],
  
  // i18n 設定
  i18n: {
    vueI18n: './i18n/config.ts'
  },
  
  // 画像最適化
  image: {
    provider: 'ipx'
  },
  
  // CSS
  css: ['~/assets/main.scss', '~/style.css'],
  
  // ViteConfig
  vite: {
    // Core Web Vitals 最適化
  }
})
```

### 5.2 .env ファイル

**開発環境** (`.env.local` または `.env.development`):
```
NUXT_PUBLIC_API_BASE=http://localhost:3000
NUXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
CLAUDE_API_KEY=sk-ant-...
STRIPE_SECRET_KEY=sk_test_...
```

**本番環境** (Vercel でセット):
```
NUXT_PUBLIC_API_BASE=https://talent-tuner.vercel.app
NUXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_...
CLAUDE_API_KEY=sk-ant-...
STRIPE_SECRET_KEY=sk_live_...
```

### 5.3 package.json (フロントエンド)
バージョンは修正せず

```json
{
  "name": "talent-tuner-frontend",
  "version": "3.0.0",
  "type": "module",
  "scripts": {
    "dev": "nuxi dev",
    "build": "nuxi build",
    "preview": "nuxi preview",
    "generate": "nuxi generate",
    "postinstall": "nuxi prepare",
    "lint": "eslint . --fix",
    "format": "prettier --write .",
    "type-check": "nuxi typecheck",
    "deploy": "vercel --prod"
  },
  "dependencies": {
    "@nuxt/image": "^1.7.0",
    "@nuxtjs/tailwindcss": "^6.11.0",
    "@nuxtjs/i18n": "^8.3.0",
    "nuxt": "^3.11.0",
    "vue": "^3.5.0",
    "@stripe/stripe-js": "^7.9.0",
    "pinia": "^3.0.0"
  },
  "devDependencies": {
    "@nuxt/devtools": "latest",
    "@nuxtjs/eslint-config": "^12.5.0",
    "eslint": "^9.22.0",
    "prettier": "^3.5.0",
    "typescript": "^5.8.0",
    "vue-tsc": "^2.0.0" // Nuxt4では不要であるため、追加せず
  }
}
```

---

## 6. デプロイ・ホスティング構成

### 6.1 現在 vs 新規

| 項目 | 現在 | 新規 |
|------|------|------|
| **フロントエンド** | お名前.com (FTP) | Vercel |
| **バックエンド** | Vercel | Vercel (Nuxt Server または単独) |
| **ドメイン** | お名前.com DNS | Cloudflare DNS |
| **SSL** | お名前.com SSL | Cloudflare + Vercel 自動 SSL |
| **CDN** | なし | Vercel Edge Network + Cloudflare |

### 6.2 Vercel デプロイ手順

1. **GitHub リポジトリ連携**
   ```bash
   git push origin develop
   ```

2. **Vercel デプロイ**
   ```bash
   vercel --prod
   ```

3. **環境変数設定** (Vercel Dashboard)
   - `NUXT_PUBLIC_API_BASE`
   - `NUXT_PUBLIC_STRIPE_PUBLIC_KEY`
   - `CLAUDE_API_KEY`
   - `STRIPE_SECRET_KEY`

### 6.3 Cloudflare DNS 設定

```
pandalize.com
├── @ (root)        CNAME → cname.vercel-dns.com
├── www             CNAME → cname.vercel-dns.com
├── _acme-challenge TXT  → (SSL 検証用)
└── MX              (メール設定が必要な場合)
```

---

## 7. テスト・検証計画

### 7.1 単体テスト

```typescript
// tests/composables/useCareerChat.test.ts
describe('useCareerChat', () => {
  it('should fetch chat response', async () => {
    const { data } = await useFetch('/api/chat')
    expect(data.value).toBeDefined()
  })
})
```

### 7.2 統合テスト

```typescript
// tests/api/chat.test.ts
describe('/api/chat endpoint', () => {
  it('should return chat response', async () => {
    const res = await $fetch('/api/chat', {
      method: 'POST',
      body: { messages: [{ role: 'user', content: 'test' }] }
    })
    expect(res.success).toBe(true)
  })
})
```

### 7.3 E2E テスト

Vercel プレビューデプロイで検証

---

## 8. リスク・注意事項

### 8.1 リスク

| リスク | 対策 |
|--------|------|
| **DNS 伝播遅延** | 事前に Cloudflare へ移行、キャッシュ TTL 設定 |
| **API 互換性** | API レスポンス形式を統一テスト |
| **CORS 問題** | サーバーサイド API で対応 |
| **環境変数設定漏れ** | チェックリスト作成、Vercel 確認 |
| **セッション・クッキー管理** | Nuxt のセッション ハンドリング検証 |

### 8.2 フォールバック計画

- **DNS 問題**: お名前.com ネームサーバーに戻す
- **Vercel デプロイ失敗**: GitHub から前バージョンへロールバック
- **API エラー**: フロントエンド側でエラーメッセージ表示

---

## 9. 実装スケジュール

| Phase | 期間 | 内容 | 責任者 |
|-------|------|------|--------|
| **1** | 1-2週 | Nuxt 3 移行、ファイル構造変更 | フロント開発 |
| **2** | 1週 | サーバーサイド API 統一 | バック開発 |
| **3** | 3-5日 | Vercel デプロイ設定、環境変数管理 | DevOps/デプロイ |
| **4** | 1-2日 | Cloudflare DNS 設定、ドメイン移管 | インフラ/DNS |
| **5** | 3-5日 | テスト・検証、本番デプロイ | QA/デプロイ |

**合計**: 約 **3-4週間**

---

## 10. チェックリスト

### フロントエンド移行
- [ ] Nuxt 3 プロジェクト初期化
- [ ] `pages/` ディレクトリに *.vue ファイル移動
- [ ] `components/` 自動スコープ化確認
- [ ] `composables/` 移行
- [ ] `utils/` 分割 (クライアント/サーバー)
- [ ] API 呼び出しを `$fetch` に更新
- [ ] 環境変数を `useRuntimeConfig()` に更新
- [ ] ルーティングテスト

### サーバーサイド統合
- [ ] `/server/api/` ディレクトリ作成
- [ ] API エンドポイント実装
- [ ] Claude API ロジック移行
- [ ] Stripe API ロジック移行
- [ ] エラーハンドリング統一

### Vercel デプロイ
- [ ] `nuxt.config.ts` 最適化
- [ ] 環境変数設定 (Vercel)
- [ ] ビルド・デプロイテスト
- [ ] プレビューデプロイ検証

### DNS・ドメイン
- [ ] Cloudflare アカウント作成
- [ ] お名前.com ネームサーバー変更
- [ ] Cloudflare DNS レコード設定
- [ ] DNS 伝播確認
- [ ] SSL/TLS 確認

### 最終検証
- [ ] 本番環境 API テスト
- [ ] 決済フロー テスト
- [ ] チャット機能 テスト
- [ ] SEO メタデータ確認
- [ ] モバイルレスポンシブ確認

---

## 11. 参考リンク

- **Nuxt 3**: https://nuxt.com/
- **Vercel Deployment**: https://vercel.com/docs
- **Cloudflare**: https://www.cloudflare.com/
- **Claude API**: https://docs.anthropic.com/
- **Stripe API**: https://stripe.com/docs/api

---

## 付録 A: Nuxt 3 マイグレーション概要

### ディレクトリ構造マッピング

| Vue 3 + Vite | Nuxt 3 | 自動処理 |
|--------------|--------|---------|
| `src/App.vue` | `app.vue` | ✅ 自動スコープ付け |
| `src/views/` | `pages/` | ✅ ファイルベースルーティング |
| `src/components/` | `components/` | ✅ 自動スコープ付け |
| `src/composables/` | `composables/` | ✅ 自動import |
| `src/utils/` | `utils/` または `server/` | ❌ 手動分割 |
| `src/router/` | — (廃止) | — |
| `src/stores/` | `stores/` (Pinia) | ✅ 互換 |
| `public/` | `public/` | ✅ そのまま |

### API 呼び出し形式

```typescript
// Vue 3 (Vite)
const apiBase = import.meta.env.VITE_API_BASE ?? ''
const res = await fetch(`${apiBase}/api/endpoint`)

// Nuxt 3
const res = await $fetch('/api/endpoint')  // 自動 baseURL 処理
```

---

## 付録 B: FTP デプロイから Vercel へ

### 現在のデプロイプロセス
```bash
npm run build          # dist/ 生成
node deploy-ftp.js     # FTP 接続・アップロード
```

### 新規デプロイプロセス
```bash
git push origin develop       # リポジトリへプッシュ
# Vercel 自動デプロイ開始
vercel --prod               # 本番環境へデプロイ (手動)
```

### メリット
- ✅ ビルド時間短縮 (Vercel の高速インフラ)
- ✅ 自動 CI/CD パイプライン
- ✅ プレビューデプロイ
- ✅ 自動 SSL
- ✅ Edge Functions サポート

---

**ドキュメント作成日**: 2025年12月7日  
**バージョン**: 1.0
