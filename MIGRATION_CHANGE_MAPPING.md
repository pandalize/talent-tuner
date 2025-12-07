# talent-tuner 変更箇所詳細マッピング

## 概要

このドキュメントは、各ソースファイルで**具体的にどこを変更するか**を示します。

---

## 1. フロントエンド ファイル変更マッピング

### 1.1 削除するファイル

#### ✗ `frontend/deploy-ftp.js`

**理由**: FTP デプロイが不要になるため

**依存関係**:
- `.env.deploy` ファイル

**代替**: Vercel 自動デプロイ

---

#### ✗ `frontend/deploy-simple.sh`

**理由**: FTP デプロイスクリプト不要

**代替**: GitHub 連携による自動デプロイ

---

#### ✗ `frontend/dev-proxy-server.js`

**理由**: Nuxt Server API で API プロキシが内蔵されるため

**注記**: 開発環境でも Claude API はサーバーサイドで呼び出すため不要

---

#### ✗ `frontend/index.html`

**理由**: Nuxt 3 が自動生成

**代替**: 自動生成される `dist/index.html`

---

#### ✗ `frontend/vite.config.ts`

**理由**: Nuxt 3 が `nuxt.config.ts` で代替

**代替**: `nuxt.config.ts`

---

#### ✗ `frontend/src/router/index.ts`

**理由**: ファイルベースルーティングで代替

**代替**: `pages/` ディレクトリ構造

---

#### ✗ `frontend/src/App.vue` (全体)

**理由**: `app.vue` + `layouts/` で代替

**代替**: `app.vue` + `layouts/default.vue`

---

### 1.2 新規作成するファイル

#### ✓ `frontend/nuxt.config.ts` (新規)

```typescript
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  
  runtimeConfig: {
    claudeApiKey: process.env.CLAUDE_API_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://talent-tuner.vercel.app',
      stripePublicKey: process.env.NUXT_PUBLIC_STRIPE_PUBLIC_KEY
    }
  },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n'
  ],
  
  i18n: {
    vueI18n: './i18n/config.ts'
  }
})
```

**用途**: Nuxt メイン設定ファイル

---

#### ✓ `frontend/app.vue` (新規)

```vue
<template>
  <div class="app">
    <AppHeader />
    <main class="app-main">
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
</script>

<style>
/* グローバルスタイル */
</style>
```

**用途**: ルートレイアウト

---

#### ✓ `frontend/pages/index.vue` (移動)

**元ファイル**: `src/views/HomeView.vue`

**変更内容**:
- ファイル名変更のみ
- API 呼び出しを `$fetch` に統一

---

#### ✓ `frontend/pages/diagnosis.vue` (移動)

**元ファイル**: `src/views/DiagnosisView.vue`

**変更内容**:
```typescript
// 変更前
const apiBase = import.meta.env.VITE_API_BASE ?? ''
const res = await fetch(`${apiBase}/api/chat`)

// 変更後
const res = await $fetch('/api/chat')
```

---

#### ✓ `frontend/pages/payment.vue` (移動)

**元ファイル**: `src/views/PaymentView.vue`

**主要変更**:
```typescript
// 変更前
const apiBase = import.meta.env.VITE_API_BASE ?? ''
const url = `${apiBase}/api/create-payment-intent`
const res = await fetch(url, { method: 'POST', body: ... })

// 変更後
const res = await $fetch('/api/create-payment-intent', {
  method: 'POST',
  body: { ... }
})
```

---

#### ✓ `frontend/pages/profession/[id].vue` (新規)

**元ファイル**: `src/views/ProfessionDetailView.vue`

**変更内容**:
```typescript
// 動的ルートパラメータ取得
const route = useRoute()
const professionId = route.params.id  // 自動取得

// API 呼び出し
const profession = await $fetch(`/api/profession/${professionId}`)
```

---

#### ✓ `frontend/pages/[...slug].vue` (新規 - キャッチオール)

**目的**: 404 ページ処理

```vue
<template>
  <div class="error-page">
    <h1>404 - ページが見つかりません</h1>
    <NuxtLink to="/">ホームに戻る</NuxtLink>
  </div>
</template>
```

---

#### ✓ `frontend/server/api/chat.ts` (新規)

**元ファイル**: `dev-proxy-server.js`, `public/api/chat-proxy.php`

**内容**: Claude API プロキシをサーバーサイドで実装

```typescript
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  
  // Claude API 呼び出し
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': config.claudeApiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({ ... })
  })
  
  return await response.json()
})
```

---

#### ✓ `frontend/server/api/create-payment-intent.ts` (新規)

**元ファイル**: `/serverside/api/create-payment-intent.ts` を統合

```typescript
import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  const stripe = new Stripe(config.stripeSecretKey)
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: body.price * 100,
    currency: 'jpy'
  })
  
  return { clientSecret: paymentIntent.client_secret }
})
```

---

#### ✓ `frontend/server/api/check-session.ts` (新規)

**元ファイル**: `/serverside/api/check-session.ts` を統合

```typescript
export default defineEventHandler(async (event) => {
  const sessionId = getCookie(event, 'sessionId')
  return { authenticated: !!sessionId }
})
```

---

#### ✓ `frontend/.env` (更新)

**変更前**:
```env
VITE_API_BASE=http://localhost:3000
VITE_CLAUDE_API_KEY=sk-ant-...
```

**変更後**:
```env
NUXT_PUBLIC_API_BASE=http://localhost:3000
NUXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
CLAUDE_API_KEY=sk-ant-...
STRIPE_SECRET_KEY=sk_test_...
```

---

### 1.3 修正するファイル（重要な API 呼び出し）

#### 📝 `frontend/src/views/NewCareerChatView.vue` → `pages/chat.vue`

**変更個所**:

```typescript
// ========== 変更前 ==========
import { ref } from 'vue'

const userInput = ref<string>('')
const messages = ref<ChatMessage[]>([])

async function callAPI() {
  const apiMessages = messages.value.map(m => ({ ... }))
  const apiBase = import.meta.env.VITE_API_BASE ?? ''  // ❌ 削除
  const url = `${apiBase}/api/chat`  // ❌ 削除
  
  const res = await fetch(url, {  // ❌ fetch → $fetch
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: apiMessages })
  })
  
  const aiText = await res.json()  // ❌ 手動 JSON パース不要
  addaiResponse(aiText)
}

// ========== 変更後 ==========
async function callAPI() {
  const apiMessages = messages.value.map(m => ({ ... }))
  
  try {
    const aiText = await $fetch('/api/chat', {  // ✅ $fetch 使用
      method: 'POST',
      body: { messages: apiMessages }  // ✅ JSON 自動変換
    })
    
    addaiResponse(aiText)
  } catch (error) {
    console.error('API error:', error)
  }
}
```

---

#### 📝 `frontend/src/views/PaymentView.vue` → `pages/payment.vue`

**変更個所**:

```typescript
// ========== 変更前 ==========
const handlePayment = async () => {
  const apiBase = import.meta.env.VITE_API_BASE ?? ''  // ❌ 削除
  const url = `${apiBase}/api/create-payment-intent`  // ❌ 削除
  
  const res = await fetch(url, {  // ❌ fetch → $fetch
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ... })
  })
  
  const data = await res.json()  // ❌ 手動 JSON パース
  if (res.ok && data.url) {
    window.location.href = data.url
  }
}

// ========== 変更後 ==========
const handlePayment = async () => {
  try {
    const data = await $fetch('/api/create-payment-intent', {  // ✅ $fetch
      method: 'POST',
      body: {  // ✅ JSON 自動変換
        professionName: purchaseData.value?.professionName,
        price: purchaseData.value?.price
      }
    })
    
    if (data.clientSecret) {
      // Stripe 決済フロー
      window.location.href = data.url
    }
  } catch (error) {
    error.value = 'Payment failed'
  }
}
```

---

#### 📝 `frontend/src/utils/claudeApiClient.ts` → `server/utils/claudeApiClient.ts`

**変更内容**:

```typescript
// ========== 変更前 ==========
// クライアント側で API 呼び出し
export class ClaudeApiClient {
  async getCareerAdvice(request: CareerAdviceRequest): Promise<CareerAdviceResponse> {
    const apiUrl = '/api/chat-proxy.php'  // ❌ PHP プロキシ
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({ ... })
    })
    
    const data = await response.json()
    return this.parseResponse(data.message)
  }
}

// ========== 変更後 ==========
// サーバーサイドで実装
// (server/api/chat.ts に統合)
// クライアントからは $fetch で呼び出し
```

**クライアント側の使用**:
```typescript
// pages/chat.vue
const response = await $fetch('/api/chat', {
  method: 'POST',
  body: { messages }
})
```

---

#### 📝 `frontend/src/router/index.ts` → `pages/` (ファイルベースルーティング)

**削除**: `src/router/index.ts` 全体

**代替**:
- Vue Router の定義をファイル構造で自動生成
- メタデータは `defineRouteRules()` で定義

```typescript
// pages/index.vue (メタデータ設定)
<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

useHead({
  title: 'ため職 - 日本一ためになる正直なおすすめ職業診断',
  meta: [
    {
      name: 'description',
      content: '無料職業適性診断...'
    }
  ]
})
</script>
```

---

### 1.4 移動するファイル（内容変更なし）

| 現在の場所 | 新しい場所 | 変更内容 |
|-----------|----------|--------|
| `src/views/AboutView.vue` | `pages/about.vue` | ファイル名のみ |
| `src/views/ContactView.vue` | `pages/contact.vue` | ファイル名のみ |
| `src/views/CompanyInfoView.vue` | `pages/company-info.vue` | ファイル名のみ |
| `src/views/PrivacyPolicyView.vue` | `pages/privacy-policy.vue` | ファイル名のみ |
| `src/views/TermsOfServiceView.vue` | `pages/terms-of-service.vue` | ファイル名のみ |
| `src/views/CareerChatView.vue` | `pages/career-chat.vue` | ファイル名のみ |
| `src/views/NotFoundView.vue` | `pages/[...slug].vue` | キャッチオール対応 |
| `src/components/` | `components/` | そのまま使用可（自動スコープ） |
| `src/composables/` | `composables/` | そのまま使用可（自動import） |
| `src/utils/` (クライアント) | `utils/` | そのまま使用可 |
| `src/i18n/` | `i18n/` | 構成ファイル追加 |
| `public/` | `public/` | そのまま使用可 |

---

## 2. サーバーサイド ファイル変更マッピング

### 2.1 統合されるファイル

#### Nuxt 統合オプション: `serverside/api/` → `frontend/server/api/`

**フロントエンドに統合する場合**:

```
frontend/server/api/
├── chat.ts                    ← serverside/api/chat.ts
├── create-payment-intent.ts   ← serverside/api/create-payment-intent.ts
├── check-session.ts           ← serverside/api/check-session.ts
└── download-pdf.ts            ← serverside/api/download-pdf.ts
```

**または**: `/serverside/` を独立させる場合（推奨）

```
/serverside/
├── api/
│   ├── chat.ts
│   ├── create-payment-intent.ts
│   ├── check-session.ts
│   └── download-pdf.ts
├── nuxt.config.ts (削除)
└── vercel.json (保持)
```

---

#### 📝 `serverside/api/chat.ts` (変更)

**変更内容**:

```typescript
// ========== 変更前 (Vercel Serverless) ==========
export default async (req, res) => {
  const { message, sessionId, messageCount } = req.body
  
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.CLAUDE_API_KEY
      },
      body: JSON.stringify({ ... })
    })
    
    res.status(200).json({ success: true, message: ... })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// ========== 変更後 (Nuxt Server) ==========
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': config.claudeApiKey
      },
      body: JSON.stringify({ ... })
    })
    
    const data = await response.json()
    return { success: true, message: data.content[0].text }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }
})
```

---

#### 📝 `serverside/api/create-payment-intent.ts` (変更)

```typescript
// ========== 変更前 ==========
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
  const { price, professionName } = req.body
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price * 100,
    currency: 'jpy'
  })
  
  res.status(200).json({ clientSecret: paymentIntent.client_secret })
}

// ========== 変更後 ==========
import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  const stripe = new Stripe(config.stripeSecretKey)
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: body.price * 100,
    currency: 'jpy'
  })
  
  return { clientSecret: paymentIntent.client_secret }
})
```

---

#### 📝 `serverside/api/check-session.ts` (変更)

```typescript
// ========== 変更前 ==========
export default async (req, res) => {
  const sessionId = req.cookies.sessionId
  
  if (!sessionId) {
    return res.status(401).json({ authenticated: false })
  }
  
  res.status(200).json({ authenticated: true })
}

// ========== 変更後 ==========
export default defineEventHandler(async (event) => {
  const sessionId = getCookie(event, 'sessionId')
  
  return { authenticated: !!sessionId }
})
```

---

### 2.2 削除するファイル

#### ✗ `serverside/vercel.json` (オプション)

**判断**:
- **Nuxt 統合の場合**: フロントエンド側に統合
- **独立継続の場合**: そのまま保持

---

## 3. 環境変数の変更マッピング

### 3.1 削除する環境変数

| 変数 | 理由 |
|-----|------|
| `VITE_API_BASE` | `NUXT_PUBLIC_API_BASE` に統合 |
| `VITE_CLAUDE_API_KEY` | サーバーサイド専用に移動 |

---

### 3.2 新規作成する環境変数

| 変数 | 対象 | 値例 |
|-----|------|------|
| `NUXT_PUBLIC_API_BASE` | 開発: `http://localhost:3000`<br/>本番: `https://talent-tuner.vercel.app` | クライアント側で使用 |
| `NUXT_PUBLIC_STRIPE_PUBLIC_KEY` | Stripe Public Key | クライアント側で使用 |
| `CLAUDE_API_KEY` | Claude API Key | サーバーサイドのみ |
| `STRIPE_SECRET_KEY` | Stripe Secret Key | サーバーサイドのみ |

---

### 3.3 .env 設定ファイル例

**`.env.development` (開発)**:
```env
NUXT_PUBLIC_API_BASE=http://localhost:3000
NUXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_51234567890
CLAUDE_API_KEY=sk-ant-xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
```

**Vercel 本番環境設定**:
```
Project Settings → Environment Variables
├── NUXT_PUBLIC_API_BASE=https://talent-tuner.vercel.app
├── NUXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_xxxxx
├── CLAUDE_API_KEY=sk-ant-xxxxx
└── STRIPE_SECRET_KEY=sk_live_xxxxx
```

---

## 4. 設定ファイルの変更マッピング

### 4.1 削除する設定

| ファイル | 理由 |
|---------|------|
| `frontend/vite.config.ts` | Nuxt が代替 |
| `frontend/tsconfig.json` | Nuxt が生成 |
| `frontend/tsconfig.app.json` | Nuxt が代替 |
| `frontend/tsconfig.node.json` | Nuxt が代替 |
| `frontend/index.html` | Nuxt が生成 |
| `frontend/postcss.config.cjs` | Nuxt + Tailwind が統合 |

---

### 4.2 新規作成する設定

| ファイル | 内容 |
|---------|------|
| `frontend/nuxt.config.ts` | Nuxt メイン設定 |
| `frontend/.nuxtrc` | Nuxt CLI 設定（オプション） |
| `frontend/tsconfig.json` | Nuxt が自動生成 |

---

### 4.3 更新する設定

#### `frontend/package.json`

```json
{
  "scripts": {
    "dev": "nuxi dev",           // vite → nuxi dev
    "build": "nuxi build",       // vite build → nuxi build
    "preview": "nuxi preview",   // vite preview → nuxi preview
    "postinstall": "nuxi prepare",  // ★ 新規追加
    "type-check": "nuxi typecheck", // vue-tsc → nuxi typecheck
    "deploy": "vercel --prod"    // そのまま
  },
  "dependencies": {
    "nuxt": "^3.11.0",          // ★ 新規追加
    "vue": "^3.5.0"              // そのまま
  },
  "devDependencies": {
    "@nuxt/devtools": "latest",  // ★ 新規追加
    "vite": "削除",              // Nuxt が代替
    "@vitejs/plugin-vue": "削除",  // Nuxt が代替
    "vue-tsc": "保持"            // nuxi typecheck と共存
  }
}
```

---

## 5. DNS・デプロイ設定の変更

### 5.1 ドメイン DNS 変更

#### お名前.com 現在設定

```
ドメイン名: pandalize.com
ネームサーバー: お名前.com NS

DNS レコード:
- @ CNAME → お名前.com IP
- www CNAME → @ へのリダイレクト
```

#### Cloudflare 新規設定

```
ドメイン名: pandalize.com
ネームサーバー: Cloudflare NS

DNS レコード:
- @ CNAME → cname.vercel-dns.com (Proxied)
- www CNAME → cname.vercel-dns.com (Proxied)
- _acme-challenge TXT → (SSL 検証用)
```

---

### 5.2 Vercel デプロイ設定

#### `vercel.json` 更新

**削除**:
```json
{
  "version": 2,
  "builds": [{ "src": "api/**/*.ts", "use": "@vercel/node" }],
  "routes": [ ... ]
}
```

**新規** (Nuxt 統合時):
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": ".output/public"
}
```

**またはデフォルト設定を使用**:
- `.vercelignore` で必要なファイルのみ含める
- Vercel Dashboard から自動検出

---

## 6. パッケージ依存関係の変更

### 6.1 削除する依存関係

```
❌ @vitejs/plugin-vue
❌ vite
❌ @vueuse/core (Nuxt に統合)
❌ basic-ftp (FTP デプロイ不要)
❌ vue-tsc (nuxi typecheck で代替、devDependency に移動)
```

### 6.2 追加する依存関係

```
✅ nuxt
✅ @nuxt/devtools
✅ @nuxtjs/tailwindcss
✅ @nuxtjs/i18n
✅ @nuxt/image (オプション)
✅ @anthropic-ai/sdk (Claude API 公式)
✅ stripe (Stripe API)
```

---

## 変更優先度

### 🔴 高優先度（Phase 1）

1. `nuxt.config.ts` 作成
2. `pages/` ディレクトリ構造作成
3. API 呼び出しを `$fetch` に統一
4. サーバーサイド API 実装

### 🟡 中優先度（Phase 2）

5. 環境変数統一
6. package.json スクリプト更新
7. TypeScript 設定更新
8. ビルド・デプロイテスト

### 🟢 低優先度（Phase 3）

9. DNS 設定変更
10. FTP デプロイ関連ファイル削除
11. 古い設定ファイル削除
12. ドキュメント更新

---

**最終更新日**: 2025年12月7日
