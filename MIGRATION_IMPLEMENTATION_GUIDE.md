# talent-tuner 移行実装ガイド

## 概要

このドキュメントは、[MIGRATION_SPECIFICATION.md](./MIGRATION_SPECIFICATION.md) の詳細な実装手順です。  
各セクションでは、具体的なコード例とコマンドを記載しています。

---

## Phase 1: Nuxt 3 プロジェクト初期化

### 1.1 Nuxt 3 プロジェクト作成

```bash
# フロントエンドディレクトリで実行
cd /Users/fujinoyuki/Documents/talent-tuner/frontend

# 既存の node_modules をバックアップ
mv node_modules node_modules.bak # ファイルが存在しない

# Nuxt 3 プロジェクト初期化
npx nuxi init .

# または既存プロジェクトから段階的に移行する場合:
npm install nuxt@latest
npm install -D @nuxt/devtools
```

### 1.2 package.json 依存関係の更新

```bash
npm install \
  nuxt@latest \
  @nuxt/image@latest \
  @nuxtjs/tailwindcss@latest \
  @nuxtjs/i18n@latest \
  pinia@latest \
  @stripe/stripe-js@latest \
  vue@latest \
  vue-router@latest

npm install -D \
  @nuxt/devtools \
  typescript@latest \
  vue-tsc@latest \
  @nuxtjs/eslint-config \
  prettier@latest
```

### 1.3 ディレクトリ構造の準備

```bash
# Nuxt 3 に必要なディレクトリを作成
mkdir -p pages
mkdir -p components
mkdir -p composables
mkdir -p utils
mkdir -p middleware
mkdir -p plugins
mkdir -p server/api
mkdir -p server/middleware
mkdir -p layouts
mkdir -p i18n
```

---

## Phase 2: ファイル移行・変換

### 2.1 Views → Pages の移行

**処理内容**:
1. `src/views/*.vue` ファイルを `pages/` へ移動
2. ファイル名をルートに合わせてリネーム

**例**:
```bash
# ホームページ
mv src/views/HomeView.vue pages/index.vue

# 診断ページ
mv src/views/DiagnosisView.vue pages/diagnosis.vue

# 職業詳細ページ
mv src/views/ProfessionDetailView.vue pages/profession/[id].vue

# 決済ページ
mv src/views/PaymentView.vue pages/payment.vue
```

**pages/ ディレクトリ構造例**:
```
pages/
├── index.vue                  # / (ホーム)
├── about.vue                  # /about
├── diagnosis.vue              # /diagnosis
├── chat.vue                   # /chat
├── payment.vue                # /payment
├── profession/
│   └── [id].vue               # /profession/:id
├── contact.vue                # /contact
├── company-info.vue           # /company-info
├── career-guide.vue           # /career-guide
├── privacy-policy.vue         # /privacy-policy
├── terms-of-service.vue       # /terms-of-service
└── demo-result.vue            # /demo-result
```

### 2.2 コンポーネント移行

```bash
# 既存コンポーネントディレクトリをコピー
cp -r src/components/* components/

# 削除: src/components（不要になったら）
rm -rf src/components
```

**components/ の自動スコープ化**:
stories 内ではコンポーネントを明示的に import する必要あり
```vue
<!-- pages/diagnosis.vue で自動import -->
<template>
  <div>
    <BaseButton />  <!-- components/base/BaseButton.vue -->
    <BaseCard />    <!-- components/base/BaseCard.vue -->
  </div>
</template>

<!-- 明示的import不要 (Nuxt 3 自動処理) -->
```

### 2.3 Composables 移行

```bash
cp -r src/composables/* composables/
```

**useDiagnosis.ts の例**:
何を変更すべきかわからず、放置

```typescript
// composables/useDiagnosis.ts
import type { DiagnosisResult } from '~/types'

export const useDiagnosis = () => {
  const results = ref<DiagnosisResult[]>([])
  const loading = ref(false)
  
  const runDiagnosis = async (answers: string[]) => {
    loading.value = true
    try {
      // 診断ロジック
      results.value = await calculateResults(answers)
    } finally {
      loading.value = false
    }
  }
  
  return { results, loading, runDiagnosis }
}
```

### 2.4 Utils 分割

```bash
# クライアント側 utils
mkdir -p utils
cp src/utils/diagnosisLoader.ts utils/
cp src/utils/professionDataManager.ts utils/
cp src/utils/seoKeywords.ts utils/

# サーバー側 utils (後に server/ に統合)
# - claudeApiClient.ts → server/utils/
# - その他バックエンド処理 → server/utils/
```

### 2.5 i18n 設定の移行

```bash
cp -r src/i18n/* i18n/
```

**i18n/config.ts (新規作成)**:
```typescript
// i18n/config.ts
import en from './locales/en.json'
import ja from './locales/ja.json'

export default {
  legacy: false,
  locale: 'ja',
  messages: {
    en,
    ja
  }
}
```

**nuxt.config.ts での設定**:
```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n'
  ],
  i18n: {
    vueI18n: './i18n/config.ts'
  }
})
```

---

## Phase 3: Vue Router → Nuxt ファイルベースルーティング

### 3.1 ルートの自動生成

Nuxt 3 ではファイルシステムが自動でルートを生成するため、  
`src/router/index.ts` を削除し、`pages/` ディレクトリ構造でルーティングを定義します。

**ルートマッピング例**:

| ファイルパス | URL パス |
|------------|---------|
| `pages/index.vue` | `/` |
| `pages/about.vue` | `/about` |
| `pages/diagnosis.vue` | `/diagnosis` |
| `pages/profession/[id].vue` | `/profession/:id` |
| `pages/[...slug].vue` | `/*` (キャッチオール) |

### 3.2 動的ルート例

```vue
<!-- pages/profession/[id].vue -->
<template>
  <div class="profession-detail">
    <h1>{{ profession?.name }}</h1>
  </div>
</template>

<script setup lang="ts">
import type { ProfessionReport } from '~/types'

// URL パラメータ自動取得
const route = useRoute()
const professionId = route.params.id

const profession = ref<ProfessionReport | null>(null)

onMounted(async () => {
  // profession ID でデータ取得
  profession.value = await loadProfessionData(professionId as string)
})
</script>
```

### 3.3 ナビゲーション

```typescript
// 旧 (Vue Router)
router.push({ name: 'diagnosis', params: { id: 123 } })
router.go(-1)

// 新 (Nuxt)
await navigateTo('/diagnosis')
await navigateTo({
  path: '/profession/123'
})
navigateTo('/')  // ホームに移動
```

---

## Phase 4: API 呼び出しの更新

### 4.1 Fetch → $fetch への置き換え

**旧コード (Vue 3)**:
```typescript
// src/views/NewCareerChatView.vue
const apiBase = import.meta.env.VITE_API_BASE ?? ''
const url = `${apiBase}/api/chat`

const res = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ messages: apiMessages })
})
const data = await res.json()
```

**新コード (Nuxt 3)**:
```typescript
// composables/useCareerChat.ts
const messages = ref<ChatMessage[]>([])

const sendMessage = async (userInput: string) => {
  messages.value.push({
    role: 'user',
    content: userInput,
    timestamp: new Date()
  })
  
  try {
    // $fetch は自動で JSON 解析、CORS 対応
    const response = await $fetch('/api/chat', {
      method: 'POST',
      body: { messages: messages.value }
    })
    
    messages.value.push({
      role: 'assistant',
      content: response.message,
      timestamp: new Date()
    })
    
    return response
  } catch (error) {
    console.error('Chat API error:', error)
    throw error
  }
}

return { messages, sendMessage }
```

### 4.2 環境変数の置き換え

**旧 (Vue 3)**:
```typescript
const apiKey = import.meta.env.VITE_CLAUDE_API_KEY
const apiBase = import.meta.env.VITE_API_BASE ?? ''
const isDev = import.meta.env.DEV
```

**新 (Nuxt 3)**:
```typescript
// クライアント側で public config にアクセス
const config = useRuntimeConfig()
const apiBase = config.public.apiBase

// サーバー側で秘密キーにアクセス
const serverConfig = useRuntimeConfig()
const claudeApiKey = serverConfig.claudeApiKey  // サーバーサイドのみ
```

---

## Phase 5: サーバーサイド API 実装

### 5.1 Chat API エンドポイント

```typescript
// server/api/chat.ts
import Anthropic from '@anthropic-ai/sdk'

export default defineEventHandler(async (event) => {
  try {
    // リクエスト本体を取得
    const body = await readBody(event)
    
    // ランタイム設定から秘密キーを取得
    const config = useRuntimeConfig()
    const claudeApiKey = config.claudeApiKey
    
    if (!claudeApiKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Claude API key not configured'
      })
    }
    
    // Claude クライアント初期化
    const anthropic = new Anthropic({ apiKey: claudeApiKey })
    
    // システムプロンプト
    const systemPrompt = `あなたは「ため職」という職業適性診断サービスの進路相談AIアシスタントです。
    以下の28の職業から適切な職業を提案し、具体的で実践的なアドバイスを提供してください。
    
    【対応職業一覧】
    - プログラマー / エンジニア
    - 公認会計士
    - 建設業
    - 起業家
    ... (28職業)
    `
    
    // Claude API へのリクエスト
    const message = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 800,
      system: systemPrompt,
      messages: body.messages || []
    })
    
    // レスポンス整形
    return {
      success: true,
      message: message.content[0].type === 'text' ? message.content[0].text : '',
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    console.error('Chat API error:', error)
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get chat response',
      data: { error: error.message }
    })
  }
})
```

### 5.2 Payment Intent API

```typescript
// server/api/create-payment-intent.ts
import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const config = useRuntimeConfig()
    
    const stripe = new Stripe(config.stripeSecretKey, {
      apiVersion: '2023-10-16'
    })
    
    // Payment Intent 作成
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(body.price * 100),  // 円をセント換算
      currency: 'jpy',
      automatic_payment_methods: {
        enabled: true
      },
      metadata: {
        profession_name: body.professionName,
        timestamp: body.timestamp
      }
    })
    
    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
      intentId: paymentIntent.id
    }
  } catch (error) {
    console.error('Payment Intent error:', error)
    
    throw createError({
      statusCode: 400,
      statusMessage: 'Failed to create payment intent',
      data: { error: error.message }
    })
  }
})
```

### 5.3 Session Check API

```typescript
// server/api/check-session.ts
export default defineEventHandler(async (event) => {
  try {
    // クッキーからセッション ID を取得
    const sessionId = getCookie(event, 'sessionId')
    
    if (!sessionId) {
      return {
        success: true,
        authenticated: false
      }
    }
    
    // セッション検証ロジック
    // (例: Redis からセッション情報を取得)
    
    return {
      success: true,
      authenticated: true,
      sessionId
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Session check failed'
    })
  }
})
```

### 5.4 PDF Download API

```typescript
// server/api/download-pdf.ts
export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const professionId = query.professionId as string
    
    // PDF 生成ロジック
    const pdfBuffer = await generateProfessionReport(professionId)
    
    // レスポンスヘッダ設定
    setHeader(event, 'Content-Type', 'application/pdf')
    setHeader(event, 'Content-Disposition', `attachment; filename="report-${professionId}.pdf"`)
    
    return pdfBuffer
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'PDF generation failed'
    })
  }
})
```

---

## Phase 6: nuxt.config.ts 設定

### 6.1 基本設定

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  // devtools 有効化
  devtools: { enabled: true },
  
  // SSR 設定
  ssr: true,  // サーバーサイドレンダリング有効
  
  // ランタイム設定
  runtimeConfig: {
    // サーバーサイドのみアクセス可能
    claudeApiKey: process.env.CLAUDE_API_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    
    // public: クライアント & サーバーサイドアクセス可能
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://talent-tuner.vercel.app',
      stripePublicKey: process.env.NUXT_PUBLIC_STRIPE_PUBLIC_KEY,
      siteUrl: 'https://pandalize.com'
    }
  },
  
  // モジュール
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/image',
    // '@pinia/nuxt'  // 必要に応じて
  ],
  
  // i18n 設定
  i18n: {
    vueI18n: './i18n/config.ts',
    defaultLocale: 'ja'
  },
  
  // 画像最適化
  image: {
    provider: 'ipx'
  },
  
  // CSS
  css: ['~/assets/main.scss', '~/style.css'],
  
  // Vite 設定
  vite: {
    // CSS/ビルド最適化
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router', 'pinia'],
            stripe: ['@stripe/stripe-js']
          }
        }
      }
    }
  },
  
  // TypeScript
  typescript: {
    strict: true,
    typeCheck: 'build'
  }
})
```

---

## Phase 7: 環境変数・ビルド設定

### 7.1 .env ファイル構成

**開発環境** (`.env.development`):
```env
NUXT_PUBLIC_API_BASE=http://localhost:3000
NUXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_51234567890
CLAUDE_API_KEY=sk-ant-...
STRIPE_SECRET_KEY=sk_test_...
```

**本番環境** (Vercel で設定):
```
NUXT_PUBLIC_API_BASE=https://talent-tuner.vercel.app
NUXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_...
CLAUDE_API_KEY=sk-ant-...
STRIPE_SECRET_KEY=sk_live_...
```

### 7.2 Vercel 環境変数設定

```bash
# Vercel CLI で環境変数を設定
vercel env add NUXT_PUBLIC_API_BASE
vercel env add NUXT_PUBLIC_STRIPE_PUBLIC_KEY
vercel env add CLAUDE_API_KEY
vercel env add STRIPE_SECRET_KEY

# または Vercel Dashboard から設定
# https://vercel.com/[project]/settings/environment-variables
```

### 7.3 package.json スクリプト更新

testはcomponents/__tests__/BaseButton.test.tsが存在するため、現在の構成に変更


```json
{
  "scripts": {
    "dev": "nuxi dev",
    "build": "nuxi build",
    "preview": "nuxi preview",
    "generate": "nuxi generate",
    "postinstall": "nuxi prepare",
    "type-check": "nuxi typecheck",
    "lint": "eslint . --fix",
    "format": "prettier --write .",
    "test": "vitest",
    "test:ui": "nuxi preview",
    "deploy": "vercel --prod"
  }
}
```

---

## Phase 8: Cloudflare DNS 設定

### 8.1 Cloudflare へのドメイン追加

1. https://dash.cloudflare.com にログイン
2. "Add a site" → `pandalize.com` を入力
3. Cloudflare ネームサーバーをコピー:
   ```
   ns1.cloudflare.com
   ns2.cloudflare.com
   ns3.cloudflare.com
   ns4.cloudflare.com
   ```

### 8.2 お名前.com でネームサーバー変更

1. お名前.com 管理画面にログイン
2. ドメイン設定 → DNS 設定
3. ネームサーバー を Cloudflare に変更
4. 変更を確認 (数分～数時間で反映)

### 8.3 Cloudflare DNS レコード設定

```dns
# DNS レコード設定

# Vercel CNAME（推奨）
@    CNAME    cname.vercel-dns.com    (Proxied)

# または A レコード + IP アドレス
# 34.120.0.0/13 を使用（Vercel IP 範囲）
@    A        76.76.19.0  (Proxied)

# www サブドメイン
www  CNAME    cname.vercel-dns.com    (Proxied)
```

### 8.4 SSL/TLS 設定

Cloudflare ダッシュボード → SSL/TLS:
- **Full (strict)** または **Full** を選択
- 自動 HTTPS リダイレクト有効化
- HSTS 有効化 (オプション)

### 8.5 DNS 伝播確認

```bash
# DNS 伝播状況確認
dig pandalize.com +short
dig www.pandalize.com +short

# または
nslookup pandalize.com
nslookup www.pandalize.com

# オンラインツール
# https://mxtoolbox.com/
# https://dnschecker.org/
```

---

## Phase 9: Vercel デプロイ

### 9.1 Vercel CLI インストール

```bash
npm install -g vercel
```

### 9.2 Vercel プロジェクト初期化

```bash
cd /Users/fujinoyuki/Documents/talent-tuner/frontend
vercel

# プロンプト:
# Which scope? → アカウント選択
# Link to existing project? → yes → existing project
# 設定を確認して完了
```

### 9.3 プレビューデプロイ

```bash
# develop ブランチをプレビューデプロイ
vercel

# または
vercel --prod  # 本番環境へデプロイ
```

### 9.4 GitHub リポジトリ連携

```bash
# GitHub リポジトリから自動デプロイ
vercel link

# または Vercel Dashboard で:
# Project Settings → Git → Connect Git Repository
```

### 9.5 本番環境デプロイ

```bash
# main ブランチをプッシュ
git push origin main

# または手動で
vercel --prod
```

---

## Phase 10: テスト・検証

### 10.1 ローカルテスト

```bash
# 開発サーバー起動
npm run dev

# ブラウザで確認
# http://localhost:3000

# ビルドテスト
npm run build
npm run preview
```

### 10.2 Vercel プレビューデプロイテスト

```bash
# プレビューリンク確認
vercel inspect

# 機能テスト:
# - ホームページ表示確認
# - ルーティング確認
# - API 呼び出し確認
# - 決済フロー確認
```

### 10.3 本番環境検証

```bash
# HTTPS 接続確認
curl -I https://pandalize.com

# SEO メタデータ確認
curl https://pandalize.com | grep -E '<title|<meta name="description'

# Core Web Vitals 確認
# Google PageSpeed Insights: https://pagespeed.web.dev/
```

---

## トラブルシューティング

### ビルドエラー

```bash
# node_modules 再インストール
rm -rf node_modules
npm install

# キャッシュクリア
npm run build -- --no-cache

# TypeScript エラー
npm run type-check
```

### DNS 伝播遅延

- **TTL**: Cloudflare で 1 時間～24時間に設定
- **確認**: https://dnschecker.org/ で複数地域確認
- **代替**: `/etc/hosts` ローカル設定でテスト

```bash
# /etc/hosts に追加 (テスト用)
76.76.19.0  pandalize.com
76.76.19.0  www.pandalize.com
```

### API エラー

```typescript
// server/middleware でエラーログ
export default defineEventHandler((event) => {
  console.log(`[${new Date().toISOString()}] ${event.node.req.method} ${event.node.req.url}`)
})
```

---

## デプロイチェックリスト

- [ ] Nuxt 3 ローカル開発完了 (`npm run dev`)
- [ ] ビルド成功 (`npm run build`)
- [ ] 環境変数設定完了
- [ ] API エンドポイント実装完了
- [ ] Vercel プレビューデプロイ成功
- [ ] DNS レコード設定完了
- [ ] SSL 証明書発行確認
- [ ] 本番環境 API テスト完了
- [ ] SEO メタデータ確認
- [ ] モバイルレスポンシブ確認
- [ ] 決済フロー テスト完了

---

**最終更新日**: 2025年12月7日
