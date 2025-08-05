/**
 * 翻訳キーの型安全性強化
 * 自動生成対応のTypeScript型定義
 */

// 基本翻訳キー構造の定義
export interface TranslationSchema {
  // ナビゲーション
  nav: {
    home: string
    diagnosis: string
    about: string
    career_guide: string
    ai_counseling: string
  }

  // ホームページ
  home: {
    hero: {
      subtitle: string
      title: string
      description: string
    }
    features: {
      analysis: {
        title: string
        description: string
      }
      evidence: {
        title: string
        description: string
      }
      instant: {
        title: string
        description: string
      }
    }
    cta: {
      start_diagnosis: string
      ai_counseling: string
      view_professions: string
    }
    trust: {
      users: string  // {count} パラメータ対応
      updated: string  // {year} パラメータ対応
      privacy: string
    }
  }

  // 診断
  diagnosis: {
    title: string
    start: string
    next: string
    previous: string
    submit: string
    results: string
  }

  // チャット
  chat: {
    title: string
    placeholder: string
    send: string
    loading: string
  }

  // 共通UI
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

// ネストされたキーのパス型を生成
type PathImpl<T, K extends keyof T> = K extends string
  ? T[K] extends Record<string, any>
    ? T[K] extends ArrayLike<any>
      ? K | `${K}.${PathImpl<T[K], Exclude<keyof T[K], keyof any[]>>}`
      : K | `${K}.${PathImpl<T[K], keyof T[K]>}`
    : K
  : never

type Path<T> = PathImpl<T, keyof T> | keyof T

// 翻訳キーの型定義
export type TranslationKey = Path<TranslationSchema>

// パラメータ付き翻訳関数の型定義
export interface TranslationParameters {
  'home.trust.users': { count: string | number }
  'home.trust.updated': { year: string | number }
}

// 型安全な翻訳関数のインターface
export interface TypeSafeTranslation {
  // 基本翻訳（パラメータなし）
  <K extends Exclude<TranslationKey, keyof TranslationParameters>>(key: K): string
  
  // パラメータ付き翻訳
  <K extends keyof TranslationParameters>(key: K, params: TranslationParameters[K]): string
  
  // フォールバック付き翻訳
  <K extends TranslationKey>(key: K, fallback: string): string
}

// Vue I18n拡張用の型定義
declare module 'vue-i18n' {
  interface DefineLocaleMessage extends TranslationSchema {}
}

// 翻訳キー存在チェックの型ガード
export function isValidTranslationKey(key: string): key is TranslationKey {
  // 実際の検証ロジックは実装時に追加
  return key.split('.').length >= 1
}

// 翻訳キーの自動補完用ヘルパー型
export type TranslationKeyPaths = {
  nav: keyof TranslationSchema['nav']
  home: {
    hero: keyof TranslationSchema['home']['hero']
    features: keyof TranslationSchema['home']['features']
    cta: keyof TranslationSchema['home']['cta']
    trust: keyof TranslationSchema['home']['trust']
  }
  diagnosis: keyof TranslationSchema['diagnosis']
  chat: keyof TranslationSchema['chat']
  common: keyof TranslationSchema['common']
}

// 型安全な翻訳キー構築ヘルパー
export const translationKeys = {
  nav: {
    home: 'nav.home' as const,
    diagnosis: 'nav.diagnosis' as const,
    about: 'nav.about' as const,
    career_guide: 'nav.career_guide' as const,
    ai_counseling: 'nav.ai_counseling' as const
  },
  home: {
    hero: {
      subtitle: 'home.hero.subtitle' as const,
      title: 'home.hero.title' as const,
      description: 'home.hero.description' as const
    },
    features: {
      analysis: {
        title: 'home.features.analysis.title' as const,
        description: 'home.features.analysis.description' as const
      },
      evidence: {
        title: 'home.features.evidence.title' as const,
        description: 'home.features.evidence.description' as const
      },
      instant: {
        title: 'home.features.instant.title' as const,
        description: 'home.features.instant.description' as const
      }
    },
    cta: {
      start_diagnosis: 'home.cta.start_diagnosis' as const,
      ai_counseling: 'home.cta.ai_counseling' as const,
      view_professions: 'home.cta.view_professions' as const
    },
    trust: {
      users: 'home.trust.users' as const,
      updated: 'home.trust.updated' as const,
      privacy: 'home.trust.privacy' as const
    }
  },
  diagnosis: {
    title: 'diagnosis.title' as const,
    start: 'diagnosis.start' as const,
    next: 'diagnosis.next' as const,
    previous: 'diagnosis.previous' as const,
    submit: 'diagnosis.submit' as const,
    results: 'diagnosis.results' as const
  },
  chat: {
    title: 'chat.title' as const,
    placeholder: 'chat.placeholder' as const,
    send: 'chat.send' as const,
    loading: 'chat.loading' as const
  },
  common: {
    loading: 'common.loading' as const,
    error: 'common.error' as const,
    retry: 'common.retry' as const,
    close: 'common.close' as const,
    back: 'common.back' as const,
    next: 'common.next' as const,
    previous: 'common.previous' as const,
    submit: 'common.submit' as const,
    cancel: 'common.cancel' as const,
    confirm: 'common.confirm' as const
  }
} as const