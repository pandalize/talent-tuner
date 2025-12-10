export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  
  runtimeConfig: {
    claudeApiKey: process.env.CLAUDE_API_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://talent-tuner.vercel.app',
      stripePublicKey: process.env.NUXT_PUBLIC_STRIPE_PUBLIC_KEY,
      siteUrl: 'https://pandalize.com'
    }
  },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/image'
  ],
  
  i18n: {
    vueI18n: './i18n/config.ts',
    defaultLocale: 'ja'
  },

  image: {
    provider: 'ipx'
  },
  
  css: ['~/assets/main.scss', '~/style.css'],
  
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
    typeCheck: 'build'
  }
})

