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
    '@nuxt/image'
  ],

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

