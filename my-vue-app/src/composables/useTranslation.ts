/**
 * 翻訳ヘルパー用Composable
 * 開発効率向上のための型安全な翻訳アクセス
 */

import { useI18n } from 'vue-i18n'
import type { SupportedLocale } from '../i18n'

export function useTranslation() {
  const { t, locale, tm } = useI18n()

  // 短縮アクセス用ヘルパー関数
  const helpers = {
    // ナビゲーション関連
    nav: {
      home: () => t('nav.home'),
      diagnosis: () => t('nav.diagnosis'),
      about: () => t('nav.about'),
      careerGuide: () => t('nav.career_guide'),
      aiCounseling: () => t('nav.ai_counseling')
    },

    // ホームページ関連
    home: {
      hero: {
        title: () => t('home.hero.title'),
        subtitle: () => t('home.hero.subtitle'),
        description: () => t('home.hero.description')
      },
      features: {
        analysis: {
          title: () => t('home.features.analysis.title'),
          description: () => t('home.features.analysis.description')
        },
        evidence: {
          title: () => t('home.features.evidence.title'),
          description: () => t('home.features.evidence.description')
        },
        instant: {
          title: () => t('home.features.instant.title'),
          description: () => t('home.features.instant.description')
        }
      },
      cta: {
        startDiagnosis: () => t('home.cta.start_diagnosis'),
        aiCounseling: () => t('home.cta.ai_counseling'),
        viewProfessions: () => t('home.cta.view_professions')
      },
      trust: {
        users: (count: string) => t('home.trust.users', { count }),
        updated: (year: string) => t('home.trust.updated', { year }),
        privacy: () => t('home.trust.privacy')
      }
    },

    // 職業一覧関連
    about: {
      title: () => t('about.title'),
      subtitle: () => t('about.subtitle'),
      description: () => t('about.description'),
      salaryRange: () => t('about.salary_range'),
      jobDetails: () => t('about.job_details'),
      suitableFor: () => t('about.suitable_for'),
      viewDetail: () => t('about.view_detail'),
      takeDiagnosis: () => t('about.take_diagnosis')
    },

    // 診断関連
    diagnosis: {
      title: () => t('diagnosis.title'),
      start: () => t('diagnosis.start'),
      next: () => t('diagnosis.next'),
      previous: () => t('diagnosis.previous'),
      submit: () => t('diagnosis.submit'),
      results: () => t('diagnosis.results'),
      progress: (current: number, total: number) => t('diagnosis.progress', { current, total }),
      category: {
        skill: () => t('diagnosis.category.skill'),
        interest: () => t('diagnosis.category.interest'),
        priority: () => t('diagnosis.category.priority'),
        balance: () => t('diagnosis.category.balance')
      },
      result: {
        title: () => t('diagnosis.result.title'),
        subtitle: () => t('diagnosis.result.subtitle'),
        score: () => t('diagnosis.result.score'),
        salary: () => t('diagnosis.result.salary'),
        description: () => t('diagnosis.result.description'),
        matchReason: () => t('diagnosis.result.match_reason'),
        actions: {
          retry: () => t('diagnosis.result.actions.retry'),
          viewDetail: () => t('diagnosis.result.actions.view_detail'),
          aiConsultation: () => t('diagnosis.result.actions.ai_consultation'),
          share: () => t('diagnosis.result.actions.share')
        }
      },
      noResults: () => t('diagnosis.no_results')
    },

    // チャット関連
    chat: {
      title: () => t('chat.title'),
      placeholder: () => t('chat.placeholder'),
      send: () => t('chat.send'),
      loading: () => t('chat.loading')
    },

    // 共通UI
    common: {
      loading: () => t('common.loading'),
      error: () => t('common.error'),
      retry: () => t('common.retry'),
      close: () => t('common.close'),
      back: () => t('common.back'),
      next: () => t('common.next'),
      previous: () => t('common.previous'),
      submit: () => t('common.submit'),
      cancel: () => t('common.cancel'),
      confirm: () => t('common.confirm')
    }
  }

  // 動的キー生成ヘルパー
  const dynamicKey = (base: string, ...parts: string[]) => {
    return t([base, ...parts].join('.'))
  }

  // 条件付き翻訳（fallback付き）
  const tWithFallback = (key: string, fallback: string, params?: Record<string, any>) => {
    try {
      const result = t(key, params)
      return result === key ? fallback : result
    } catch {
      return fallback
    }
  }

  // 複数形対応ヘルパー
  const tPlural = (key: string, count: number, params?: Record<string, any>) => {
    return t(key, { count, ...params })
  }

  // 現在の言語情報
  const currentLocale = locale as SupportedLocale
  const isJapanese = () => currentLocale === 'ja'
  const isEnglish = () => currentLocale === 'en'
  const isChinese = () => currentLocale === 'zh'

  return {
    // 基本関数
    t,
    tm,
    locale: currentLocale,
    
    // ヘルパー関数
    ...helpers,
    dynamicKey,
    tWithFallback,
    tPlural,
    
    // 言語判定
    isJapanese,
    isEnglish,
    isChinese
  }
}

// TypeScript型安全性のための型定義
export type TranslationHelpers = ReturnType<typeof useTranslation>

// 翻訳キーの型定義（自動生成対応）
export interface TranslationKeys {
  nav: {
    home: string
    diagnosis: string
    about: string
    career_guide: string
    ai_counseling: string
  }
  home: {
    hero: {
      title: string
      subtitle: string
      description: string
    }
    features: {
      analysis: { title: string; description: string }
      evidence: { title: string; description: string }
      instant: { title: string; description: string }
    }
    cta: {
      start_diagnosis: string
      ai_counseling: string
      view_professions: string
    }
    trust: {
      users: string
      updated: string
      privacy: string
    }
  }
  diagnosis: {
    title: string
    start: string
    next: string
    previous: string
    submit: string
    results: string
  }
  chat: {
    title: string
    placeholder: string
    send: string
    loading: string
  }
  common: {
    loading: string
    error: string
    retry: string
    close: string
    back: string
    next: string
    previous: string
    submit: string
    cancel: string
    confirm: string
  }
}