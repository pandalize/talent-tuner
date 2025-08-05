/**
 * 多言語対応ルーティングユーティリティ
 * URL構造: / (日本語), /en/, /zh/, /ko/ 等
 */

import type { RouteRecordRaw } from 'vue-router'
import { SUPPORTED_LOCALES, type SupportedLocale } from '../i18n'

// 基本ルート定義（言語プレフィックスなし）
export const baseRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: 'about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: 'diagnosis',
    name: 'diagnosis',
    component: () => import('../views/DiagnosisView.vue')
  },
  {
    path: 'chat',
    name: 'career-chat',
    component: () => import('../views/CareerChatView.vue')
  },
  {
    path: 'profession/:id',
    name: 'profession-detail',
    component: () => import('../views/ProfessionDetailView.vue')
  },
  {
    path: 'career-guide',
    name: 'career-guide',
    component: () => import('../views/CareerGuideView.vue')
  },
  {
    path: 'skills-development',
    name: 'skills-development',
    component: () => import('../views/SkillsDevelopmentView.vue')
  },
  {
    path: 'salary-guide',
    name: 'salary-guide',
    component: () => import('../views/SalaryGuideView.vue')
  },
  {
    path: 'career-change',
    name: 'career-change',
    component: () => import('../views/CareerChangeView.vue')
  },
  {
    path: 'student-guide',
    name: 'student-guide',
    component: () => import('../views/StudentGuideView.vue')
  },
  {
    path: 'diagnosis-method',
    name: 'diagnosis-method',
    component: () => import('../views/DiagnosisMethodView.vue')
  },
  {
    path: 'result-guide',
    name: 'result-guide',
    component: () => import('../views/ResultGuideView.vue')
  },
  {
    path: 'diagnosis-theory',
    name: 'diagnosis-theory',
    component: () => import('../views/DiagnosisTheoryView.vue')
  },
  {
    path: 'privacy',
    name: 'privacy',
    component: () => import('../views/PrivacyPolicyView.vue')
  },
  {
    path: 'terms',
    name: 'terms',
    component: () => import('../views/TermsOfServiceView.vue')
  },
  {
    path: 'contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue')
  },
  {
    path: 'company',
    name: 'company',
    component: () => import('../views/CompanyInfoView.vue')
  },
  {
    path: 'payment-success',
    name: 'payment-success',
    component: () => import('../views/PaymentSuccessView.vue')
  },
  {
    path: '404',
    name: 'notfound',
    component: () => import('../views/NotFoundView.vue')
  }
]

// 多言語ルート生成
export function createMultilingualRoutes(): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  SUPPORTED_LOCALES.forEach(locale => {
    const isDefault = locale.code === 'ja'
    const pathPrefix = isDefault ? '' : `/${locale.code}`

    // 各言語用のルートを作成
    baseRoutes.forEach(route => {
      const localizedRoute: RouteRecordRaw = {
        ...route,
        path: `${pathPrefix}/${route.path}`.replace(/\/+/g, '/').replace(/\/$/, '') || '/',
        name: isDefault ? route.name : `${route.name}-${locale.code}`,
        meta: {
          ...route.meta,
          locale: locale.code
        }
      }

      routes.push(localizedRoute)
    })
  })

  return routes
}

// 言語別メタ情報
export const metaTemplates = {
  ja: {
    home: {
      title: 'ため職 - 日本一ためになる正直なおすすめ職業診断',
      description: 'スキル、興味、価値観、ライフスタイルの4つの観点から、あなたにマッチする高収入職業を短時間で多角的に分析。'
    },
    diagnosis: {
      title: '職業適性診断 | ため職',
      description: '16の質問に答えるだけで、あなたの適性に合った職業をランキング形式で診断。'
    },
    chat: {
      title: 'AI進路相談 | ため職',
      description: 'AI進路相談アシスタントが、あなたの進路・転職の悩みを親身に聞きます。'
    },
    about: {
      title: '職業一覧 | ため職',
      description: 'プログラマー、公認会計士、建設業、起業家など高収入職業の詳細情報。'
    }
  },
  en: {
    home: {
      title: 'TameShoku - Professional Career Assessment System',
      description: 'Comprehensive career analysis from 4 perspectives: skills, interests, values, and lifestyle to match you with high-income professions.'
    },
    diagnosis: {
      title: 'Career Assessment | TameShoku',
      description: 'Answer just 16 questions to discover careers perfectly matched to your aptitude, ranked by compatibility.'
    },
    chat: {
      title: 'AI Career Counseling | TameShoku',
      description: 'Our AI career counseling assistant is here to listen and guide you through your career concerns.'
    },
    about: {
      title: 'Professions | TameShoku',
      description: 'Detailed information about high-income professions including programmers, accountants, entrepreneurs.'
    }
  },
  zh: {
    home: {
      title: '为职 - 专业职业适性诊断系统',
      description: '从技能、兴趣、价值观、生活方式4个角度全面分析，为您匹配高收入职业。'
    },
    diagnosis: {
      title: '职业适性诊断 | 为职',
      description: '只需回答16个问题，即可发现最适合您的职业，按匹配度排名显示。'
    },
    chat: {
      title: 'AI职业咨询 | 为职',
      description: 'AI职业咨询助手将倾听您的职业和转职烦恼，提供贴心指导。'
    },
    about: {
      title: '职业列表 | 为职',
      description: '程序员、会计师、建筑业、企业家等高收入职业的详细信息。'
    }
  }
} as const

// メタ情報取得ヘルパー
export function getMetaForRoute(routeName: string, locale: SupportedLocale) {
  const templates = metaTemplates[locale]
  const routeKey = routeName.replace(`-${locale}`, '') as keyof typeof templates
  
  return templates[routeKey] || templates.home
}