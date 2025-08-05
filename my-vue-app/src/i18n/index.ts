/**
 * Vue I18n 多言語対応設定（分割ファイル対応版）
 * グローバル展開対応の国際化システム
 */

import { createI18n } from 'vue-i18n'

// 分割された翻訳ファイルの動的インポート
import { loadAllTranslations } from './utils/mergeTranslations'

// フォールバック用の基本翻訳（開発時・エラー時）
import ja from './locales/ja.json'
import en from './locales/en.json'
import zh from './locales/zh.json'

// サポートする言語リスト
export const SUPPORTED_LOCALES = [
  { code: 'ja', name: '日本語', flag: '🇯🇵', nativeName: '日本語' },
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'zh', name: '中文', flag: '🇨🇳', nativeName: '中文' }
] as const

export type SupportedLocale = typeof SUPPORTED_LOCALES[number]['code']

// ブラウザ言語検出
export function detectBrowserLanguage(): SupportedLocale {
  const browserLang = navigator.language.split('-')[0]
  const supportedCodes = SUPPORTED_LOCALES.map(locale => locale.code)
  
  if (supportedCodes.includes(browserLang as SupportedLocale)) {
    return browserLang as SupportedLocale
  }
  
  return 'ja' // デフォルト言語
}

// ローカルストレージから言語設定を取得
export function getStoredLanguage(): SupportedLocale | null {
  const stored = localStorage.getItem('talent-tuner-language')
  if (stored && SUPPORTED_LOCALES.some(locale => locale.code === stored)) {
    return stored as SupportedLocale
  }
  return null
}

// 言語設定を保存
export function storeLanguage(locale: SupportedLocale): void {
  localStorage.setItem('talent-tuner-language', locale)
}

// 初期言語の決定（優先順位: ストレージ > URL > ブラウザ > デフォルト）
export function getInitialLanguage(): SupportedLocale {
  // 1. ローカルストレージから取得
  const stored = getStoredLanguage()
  if (stored) return stored
  
  // 2. URLパスから取得（/en/, /zh/ など）
  const pathLang = window.location.pathname.split('/')[1]
  if (SUPPORTED_LOCALES.some(locale => locale.code === pathLang)) {
    return pathLang as SupportedLocale
  }
  
  // 3. ブラウザ言語検出
  return detectBrowserLanguage()
}

// Vue I18n インスタンス（非同期読み込み対応）
let i18n: ReturnType<typeof createI18n>

// 分割された翻訳ファイルを読み込んでi18nインスタンスを初期化
export async function createI18nInstance() {
  try {
    // 分割された翻訳ファイルを読み込み
    const mergedTranslations = await loadAllTranslations()
    
    i18n = createI18n({
      locale: getInitialLanguage(),
      fallbackLocale: 'ja',
      legacy: false, // Composition API対応
      globalInjection: true,
      messages: mergedTranslations,
      // 数値フォーマット設定
      numberFormats: {
        ja: {
          currency: {
            style: 'currency',
            currency: 'JPY',
            notation: 'standard'
          },
          decimal: {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
          }
        },
        en: {
          currency: {
            style: 'currency',
            currency: 'USD',
            notation: 'standard'
          },
          decimal: {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
          }
        },
        zh: {
          currency: {
            style: 'currency',
            currency: 'CNY',
            notation: 'standard'
          },
          decimal: {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
          }
        }
      },
      // 日時フォーマット設定
      datetimeFormats: {
        ja: {
          short: {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          },
          long: {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            hour: 'numeric',
            minute: 'numeric'
          }
        },
        en: {
          short: {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          },
          long: {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            hour: 'numeric',
            minute: 'numeric'
          }
        },
        zh: {
          short: {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          },
          long: {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            hour: 'numeric',
            minute: 'numeric'
          }
        }
      }
    })
  } catch (error) {
    console.warn('Failed to load merged translations, using fallback:', error)
    // フォールバック: 元の単一ファイル翻訳を使用
    i18n = createI18n({
      locale: getInitialLanguage(),
      fallbackLocale: 'ja',
      legacy: false,
      globalInjection: true,
      messages: {
        ja,
        en,
        zh
      },
      numberFormats: {
        ja: {
          currency: {
            style: 'currency',
            currency: 'JPY',
            notation: 'standard'
          },
          decimal: {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
          }
        },
        en: {
          currency: {
            style: 'currency',
            currency: 'USD',
            notation: 'standard'
          },
          decimal: {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
          }
        },
        zh: {
          currency: {
            style: 'currency',
            currency: 'CNY',
            notation: 'standard'
          },
          decimal: {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
          }
        }
      },
      datetimeFormats: {
        ja: {
          short: {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          },
          long: {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            hour: 'numeric',
            minute: 'numeric'
          }
        },
        en: {
          short: {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          },
          long: {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            hour: 'numeric',
            minute: 'numeric'
          }
        },
        zh: {
          short: {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          },
          long: {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            hour: 'numeric',
            minute: 'numeric'
          }
        }
      }
    })
  }
  
  return i18n
}

// 同期的にアクセスするためのゲッター
export function getI18nInstance() {
  if (!i18n) {
    throw new Error('i18n instance not initialized. Call createI18nInstance() first.')
  }
  return i18n
}

// デフォルトエクスポート（後方互換性のため）
// 同期的な読み込みのためのフォールバック
const defaultI18n = createI18n({
  locale: getInitialLanguage(),
  fallbackLocale: 'ja',
  legacy: false,
  globalInjection: true,
  messages: {
    ja,
    en,
    zh
  }
})

export default defaultI18n

// 言語変更ユーティリティ関数
export function changeLanguage(locale: SupportedLocale): void {
  const i18nInstance = getI18nInstance()
  i18nInstance.global.locale.value = locale
  storeLanguage(locale)
  document.documentElement.lang = locale
  
  // ページタイトルを更新
  updatePageTitle()
  
  // 言語変更イベントを発火（analytics等で使用）
  window.dispatchEvent(new CustomEvent('language-changed', { 
    detail: { locale, previousLocale: i18nInstance.global.locale.value } 
  }))
}

// ページタイトル更新
function updatePageTitle(): void {
  const i18nInstance = getI18nInstance()
  const routeName = window.location.pathname.split('/').pop() || 'home'
  const titleKey = `meta.title.${routeName}`
  
  if (i18nInstance.global.te(titleKey)) {
    document.title = i18nInstance.global.t(titleKey)
  }
}

// 言語別URLパス生成
export function getLocalizedPath(path: string, locale?: SupportedLocale): string {
  const i18nInstance = getI18nInstance()
  const targetLocale = locale || i18nInstance.global.locale.value
  
  // 日本語の場合はパスプレフィックスなし
  if (targetLocale === 'ja') {
    return path
  }
  
  // その他の言語は /{locale}/ プレフィックス
  return `/${targetLocale}${path}`
}

// 現在の言語情報を取得
export function getCurrentLanguageInfo() {
  const i18nInstance = getI18nInstance()
  const currentLocale = i18nInstance.global.locale.value as SupportedLocale
  return SUPPORTED_LOCALES.find(locale => locale.code === currentLocale)
}