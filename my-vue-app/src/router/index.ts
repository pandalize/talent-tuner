import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SuccessView from '@/views/SuccessView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: (to: any , from: any, savedPosition: any) => {
    if (to.name !== from.name) {
      return { top: 0 }
    } else {
      return savedPosition || { top: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'ため職 - 日本一ためになる正直なおすすめ職業診断',
        description: 'スキル、興味、価値観、ライフスタイルの4つの観点から、あなたにマッチする高収入職業を短時間で多角的に分析。'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: '職業一覧 | ため職',
        description: 'プログラマー、公認会計士、建設業、起業家など8つの高収入職業の詳細情報。'
      }
    },
    {
      path: '/diagnosis',
      name: 'diagnosis',
      component: () => import('../views/DiagnosisView.vue'),
      meta: {
        title: '職業適性診断 | ため職',
        description: '16の質問に答えるだけで、あなたの適性に合った職業をランキング形式で診断。'
      }
    },
    {
      path: '/chat',
      name: 'career-chat',
      component: () => import('../views/CareerChatView.vue'),
      meta: {
        title: 'AI進路相談 | ため職',
        description: 'AI進路相談アシスタントが、あなたの進路・転職の悩みを親身に聞きます。'
      }
    },
    {
      path: '/newchat',
      name: 'new-career-chat',
      component: () => import('../views/NewCareerChatView.vue'),
      meta: {
        title: 'NewAI進路相談 | ため職',
        description: 'AI進路相談アシスタント'
      }
    },
    {
      path: '/profession/:id',
      name: 'profession-detail',
      component: () => import('../views/ProfessionDetailView.vue'),
      meta: {
        title: '職業詳細 | ため職',
        description: '職業の詳細情報、必要スキル、キャリアパス、年収情報を詳しく解説。'
      }
    },
    // その他のルート（簡素化）
    { path: '/privacy', name: 'privacy', component: () => import('../views/PrivacyPolicyView.vue') },
    { path: '/terms', name: 'terms', component: () => import('../views/TermsOfServiceView.vue') },
    { path: '/contact', name: 'contact', component: () => import('../views/ContactView.vue') },
    { path: '/payment', name: 'payment', component: () => import('../views/PaymentView.vue') },
    { path: '/payment-success', name: 'payment-success', component: () => import('../views/PaymentSuccessView.vue') },
    { path: '/success', name: 'Success', component: SuccessView },
    { path: '/:pathMatch(.*)*', component: () => import('../views/NotFoundView.vue') }
  ]
})

// シンプルなメタタグ更新のみ
router.beforeEach((to, from, next) => {
  // ページタイトル更新
  if (to.meta?.title) {
    document.title = to.meta.title as string
  }
  
  // メタディスクリプション更新
  if (to.meta?.description) {
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', to.meta.description as string)
  }
  
  next()
})

export default router
