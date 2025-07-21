import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: (to, from, savedPosition) => {
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
        description: 'スキル、興味、価値観、ライフスタイルの4つの観点から、あなたにマッチする高収入職業を短時間で多角的に分析。プログラマー、公認会計士、起業家など8つの職業から最適な仕事をランキング形式でおすすめします。'
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: '職業一覧 | ため職',
        description: 'プログラマー、公認会計士、建設業、起業家など8つの高収入職業の詳細情報。各職業の仕事内容、向いている人の特徴、年収範囲を詳しく解説します。'
      }
    },
    {
      path: '/diagnosis',
      name: 'diagnosis',
      component: () => import('../views/DiagnosisView.vue'),
      meta: {
        title: '職業適性診断 | ため職',
        description: '16の質問に答えるだけで、あなたの適性に合った職業をランキング形式で診断。スキル、興味、性格、考え方の4つの観点から総合的に分析し、最適な高収入職業をおすすめします。'
      }
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('../views/PrivacyPolicyView.vue'),
      meta: {
        title: 'プライバシーポリシー | ため職',
        description: 'ため職のプライバシーポリシー。個人情報の収集、利用目的、第三者への提供、Cookieの使用、Google AdSenseについて詳しく説明しています。'
      }
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('../views/TermsOfServiceView.vue'),
      meta: {
        title: '利用規約 | ため職',
        description: 'ため職の利用規約。サービスの内容、利用にあたっての注意事項、禁止事項、免責事項、著作権について詳しく説明しています。'
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: {
        title: 'お問い合わせ | ため職',
        description: 'ため職に関するご意見、ご要望、お問い合わせはこちらから。サービスに関する質問、技術的な問い合わせ、診断結果についてなど、お気軽にご連絡ください。'
      }
    },
    {
      path: '/company',
      name: 'company',
      component: () => import('../views/CompanyInfoView.vue'),
      meta: {
        title: '運営者情報 | ため職',
        description: 'ため職の運営者情報。サイト概要、運営チーム情報、サービス内容、免責事項、著作権について詳しく説明しています。'
      }
    },
    {
      path: '/404',
      name: 'notfound',
      component: () => import('../views/NotFoundView.vue'),
      meta: {
        title: 'ページが見つかりません | ため職',
        description: 'お探しのページは存在しないか、移動した可能性があります。ホームページや診断ページからサイトをご利用ください。'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    },
  ],
})

// ページ遷移時にメタタグを動的に更新
router.beforeEach((to, from, next) => {
  // タイトルの更新
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  
  // meta descriptionの更新
  if (to.meta.description) {
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', to.meta.description as string)
    
    // OGP descriptionも更新
    let ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute('content', to.meta.description as string)
    }
    
    // Twitter descriptionも更新
    let twitterDescription = document.querySelector('meta[property="twitter:description"]')
    if (twitterDescription) {
      twitterDescription.setAttribute('content', to.meta.description as string)
    }
  }
  
  // OGP titleの更新
  if (to.meta.title) {
    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', to.meta.title as string)
    }
    
    // Twitter titleも更新
    let twitterTitle = document.querySelector('meta[property="twitter:title"]')
    if (twitterTitle) {
      twitterTitle.setAttribute('content', to.meta.title as string)
    }
  }
  
  next()
})

export default router
