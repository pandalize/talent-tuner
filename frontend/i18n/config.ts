import en from './locales/en.json'
import ja from './locales/ja.json'
import zh from './locales/zh.json'
import { defineI18nConfig } from '#i18n'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'ja',
  fallbackLocale: 'ja',
  missingWarn: false,
  fallbackWarn: false,
  messages: { ja, en, zh }
}))
