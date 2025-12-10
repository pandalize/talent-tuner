/**
 * Vue I18n 多言語対応設定
 * シンプルな単一ファイル構成
 */

import { createI18n } from 'vue-i18n'
import ja from './locales/ja.json'
import en from './locales/en.json'
import zh from './locales/zh.json'

const i18n = createI18n({
  locale: 'ja',
  fallbackLocale: 'ja',
  legacy: false,
  messages: { ja, en, zh }
})

export default i18n

export function changeLanguage(locale: 'ja' | 'en' | 'zh') {
  i18n.global.locale.value = locale
  localStorage.setItem('language', locale)
}
