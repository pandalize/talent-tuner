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
      path: '/payment-success',
      name: 'payment-success',
      component: () => import('../views/PaymentSuccessView.vue'),
      meta: {
        title: '決済完了 | ため職',
        description: 'ため職の詳細診断レポートの決済が完了しました。PDFレポートのダウンロードが可能です。'
      }
    },
    {
      path: '/profession/:id',
      name: 'profession-detail',
      component: () => import('../views/ProfessionDetailView.vue'),
      meta: {
        title: '職業詳細 | ため職',
        description: '職業の詳細情報、必要スキル、キャリアパス、年収情報、転職・就職に役立つ情報を詳しく解説します。'
      }
    },
    {
      path: '/career-guide',
      name: 'career-guide',
      component: () => import('../views/CareerGuideView.vue'),
      meta: {
        title: 'キャリア選択ガイド | ため職',
        description: '自分に合ったキャリアの選び方、職業選択のポイント、キャリア設計の方法を詳しく解説。適性診断と合わせて最適な職業を見つけましょう。'
      }
    },
    {
      path: '/skills-development',
      name: 'skills-development',
      component: () => import('../views/SkillsDevelopmentView.vue'),
      meta: {
        title: 'スキル開発ガイド | ため職',
        description: '高収入職業に必要なスキルの身につけ方、効率的な学習方法、資格取得のポイントを職業別に詳しく解説します。'
      }
    },
    {
      path: '/salary-guide',
      name: 'salary-guide',
      component: () => import('../views/SalaryGuideView.vue'),
      meta: {
        title: '年収・転職情報ガイド | ため職',
        description: '職業別の年収相場、転職市場の動向、年収アップのための戦略を詳しく解説。高収入を目指すためのキャリア戦略をご紹介します。'
      }
    },
    {
      path: '/career-change',
      name: 'career-change',
      component: () => import('../views/CareerChangeView.vue'),
      meta: {
        title: '転職・キャリアチェンジガイド | ため職',
        description: '異業種転職の成功法、キャリアチェンジのタイミング、転職活動のポイントを詳しく解説。新たなキャリアへの第一歩をサポートします。'
      }
    },
    {
      path: '/student-guide',
      name: 'student-guide',
      component: () => import('../views/StudentGuideView.vue'),
      meta: {
        title: '学生向けキャリアガイド | ため職',
        description: '就職活動の準備、業界研究の方法、内定獲得のコツを詳しく解説。学生のうちから始めるキャリア設計で理想の職業を目指しましょう。'
      }
    },
    {
      path: '/diagnosis-method',
      name: 'diagnosis-method',
      component: () => import('../views/DiagnosisMethodView.vue'),
      meta: {
        title: '診断方法について | ため職',
        description: 'ため職の適性診断システムの詳細解説。4つのカテゴリー（スキル・興味・優先事項・バランス）による科学的分析方法、スコアリング・アルゴリズム、診断の信頼性と限界について専門的に説明します。'
      }
    },
    {
      path: '/result-guide',
      name: 'result-guide',
      component: () => import('../views/ResultGuideView.vue'),
      meta: {
        title: '診断結果の活用ガイド | ため職',
        description: '適性診断の結果を最大限に活用するための実践的ガイド。結果の読み方から、現職者・学生・転職検討者それぞれの活用方法、注意点、次のステップまで詳細に解説します。'
      }
    },
    {
      path: '/diagnosis-theory',
      name: 'diagnosis-theory',
      component: () => import('../views/DiagnosisTheoryView.vue'),
      meta: {
        title: '適性診断の理論と背景 | ため職',
        description: '適性診断の科学的根拠を詳細解説。ホランド理論、多重知能理論、統計学的手法、診断精度、今後の技術発展まで、職業適性診断の理論的背景を専門的に説明します。'
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
