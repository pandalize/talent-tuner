/**
 * 翻訳ファイル自動マージユーティリティ
 * 分割された翻訳モジュールを自動的に統合
 */

import type { SupportedLocale } from '../index'

// 翻訳モジュールの型定義
interface TranslationModule {
  [key: string]: any
}

// 深いオブジェクトマージ関数
function deepMerge(target: TranslationModule, source: TranslationModule): TranslationModule {
  const result = { ...target }
  
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (
        typeof source[key] === 'object' && 
        source[key] !== null && 
        !Array.isArray(source[key]) &&
        typeof result[key] === 'object' && 
        result[key] !== null && 
        !Array.isArray(result[key])
      ) {
        result[key] = deepMerge(result[key], source[key])
      } else {
        result[key] = source[key]
      }
    }
  }
  
  return result
}

// 動的インポートでモジュールを読み込み
async function loadTranslationModules(locale: SupportedLocale): Promise<TranslationModule> {
  const modules = [
    'common',
    'navigation', 
    'home',
    'diagnosis',
    'chat'
  ]
  
  let mergedTranslations: TranslationModule = {}
  
  for (const moduleName of modules) {
    try {
      const module = await import(`../locales/${locale}/modules/${moduleName}.json`)
      mergedTranslations = deepMerge(mergedTranslations, module.default || module)
    } catch (error) {
      console.warn(`Failed to load translation module: ${locale}/${moduleName}`, error)
    }
  }
  
  return mergedTranslations
}

// 全言語の翻訳を読み込み
export async function loadAllTranslations() {
  const translations: Record<SupportedLocale, TranslationModule> = {} as any
  
  const locales: SupportedLocale[] = ['ja', 'en', 'zh']
  
  for (const locale of locales) {
    translations[locale] = await loadTranslationModules(locale)
  }
  
  return translations
}

// 開発時のホットリロード対応
export function createTranslationLoader() {
  let cachedTranslations: Record<SupportedLocale, TranslationModule> | null = null
  
  return {
    async getTranslations(forceReload = false) {
      if (!cachedTranslations || forceReload) {
        cachedTranslations = await loadAllTranslations()
      }
      return cachedTranslations
    },
    
    clearCache() {
      cachedTranslations = null
    }
  }
}

// モジュール追加ヘルパー
export function addTranslationModule(
  translations: Record<SupportedLocale, TranslationModule>,
  moduleName: string,
  moduleTranslations: Record<SupportedLocale, TranslationModule>
) {
  for (const locale of Object.keys(translations) as SupportedLocale[]) {
    if (moduleTranslations[locale]) {
      translations[locale] = deepMerge(translations[locale], moduleTranslations[locale])
    }
  }
  
  return translations
}

// 翻訳キー存在チェック
export function hasTranslationKey(
  translations: TranslationModule,
  key: string
): boolean {
  const keys = key.split('.')
  let current = translations
  
  for (const k of keys) {
    if (typeof current !== 'object' || current === null || !(k in current)) {
      return false
    }
    current = current[k]
  }
  
  return typeof current === 'string'
}

// 翻訳キー一覧取得
export function getAllTranslationKeys(
  translations: TranslationModule,
  prefix = ''
): string[] {
  const keys: string[] = []
  
  function traverse(obj: any, currentPrefix: string) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const fullKey = currentPrefix ? `${currentPrefix}.${key}` : key
        
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          traverse(obj[key], fullKey)
        } else if (typeof obj[key] === 'string') {
          keys.push(fullKey)
        }
      }
    }
  }
  
  traverse(translations, prefix)
  return keys.sort()
}