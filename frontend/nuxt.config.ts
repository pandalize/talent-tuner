export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  
  runtimeConfig: {
    claudeApiKey: process.env.CLAUDE_API_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://talent-tuner.vercel.app',
      stripePublicKey: process.env.NUXT_PUBLIC_STRIPE_PUBLIC_KEY,
      siteUrl: 'http://localhost:3000' // 本番環境では適切なURLに変更すること
    }
  },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/image'
  ],
  
  i18n: {
    locales: [
      { code: 'ja', iso: 'ja-JP', name: '日本語' },
      { code: 'en', iso: 'en-US', name: 'English' },
      { code: 'zh', iso: 'zh-CN', name: '中文' }
    ],
    defaultLocale: 'ja',
    strategy: 'prefix_except_default',
    vueI18n: './i18n/config.ts',
    detectBrowserLanguage: false
  },


  image: {
    provider: 'ipx'
  },
  
  css: ['~/assets/main.scss'],
  
  vite: {
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
  
  typescript: {
    strict: true,
    typeCheck: false
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
})

