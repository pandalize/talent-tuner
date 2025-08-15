import './assets/main.scss'
import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createI18nInstance } from './i18n'

// 非同期でアプリケーションを初期化
async function initializeApp() {
  // i18nインスタンスを非同期で作成
  const i18n = await createI18nInstance()
  
  const app = createApp(App)

  app.use(createPinia())
  app.use(router)
  app.use(i18n)

  app.mount('#app')
}

// アプリケーション初期化を実行
initializeApp().catch(error => {
  console.error('Failed to initialize application:', error)
  
  // フォールバック: 基本的なアプリケーション初期化
  import('./i18n').then(({ default: i18n }) => {
    const app = createApp(App)
    app.use(createPinia())
    app.use(router)
    app.use(i18n)
    app.mount('#app')
  })
})