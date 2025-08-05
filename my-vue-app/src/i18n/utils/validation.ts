/**
 * 翻訳バリデーションユーティリティ
 * 開発効率向上のための自動検証ツール
 */

import type { SupportedLocale } from '../index-new'
import type { TranslationSchema } from '../types/translations'
import { getAllTranslationKeys } from './mergeTranslations'

// 検証結果の型定義
export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
  warnings: ValidationWarning[]
  summary: ValidationSummary
}

export interface ValidationError {
  type: 'missing_key' | 'missing_translation' | 'invalid_format' | 'type_mismatch'
  message: string
  key: string
  locale?: SupportedLocale
  severity: 'error' | 'warning'
}

export interface ValidationWarning {
  type: 'unused_key' | 'inconsistent_params' | 'long_text' | 'empty_translation'
  message: string
  key: string
  locale?: SupportedLocale
}

export interface ValidationSummary {
  totalKeys: number
  validKeys: number
  errorCount: number
  warningCount: number
  locales: SupportedLocale[]
  completeness: Record<SupportedLocale, number> // 0-100%
}

// 翻訳完全性チェック
export function validateTranslationCompleteness(
  translations: Record<SupportedLocale, any>
): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationWarning[] = []
  const locales = Object.keys(translations) as SupportedLocale[]
  
  // 基準言語（日本語）のキーを取得
  const baseKeys = getAllTranslationKeys(translations.ja)
  const totalKeys = baseKeys.length
  
  const completeness: Record<SupportedLocale, number> = {} as any
  
  // 各言語の完全性をチェック
  for (const locale of locales) {
    const localeKeys = getAllTranslationKeys(translations[locale])
    const missingKeys = baseKeys.filter(key => !localeKeys.includes(key))
    const extraKeys = localeKeys.filter(key => !baseKeys.includes(key))
    
    // 完全性スコア計算
    completeness[locale] = Math.round(
      ((totalKeys - missingKeys.length) / totalKeys) * 100
    )
    
    // 欠落キーをエラーとして記録
    for (const missingKey of missingKeys) {
      errors.push({
        type: 'missing_key',
        message: `Missing translation key: ${missingKey}`,
        key: missingKey,
        locale,
        severity: 'error'
      })
    }
    
    // 余分なキーを警告として記録
    for (const extraKey of extraKeys) {
      warnings.push({
        type: 'unused_key',
        message: `Extra translation key (not in base locale): ${extraKey}`,
        key: extraKey,
        locale
      })
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    summary: {
      totalKeys,
      validKeys: totalKeys - errors.filter(e => e.type === 'missing_key').length,
      errorCount: errors.length,
      warningCount: warnings.length,
      locales,
      completeness
    }
  }
}

// パラメータ一貫性チェック
export function validateParameterConsistency(
  translations: Record<SupportedLocale, any>
): ValidationError[] {
  const errors: ValidationError[] = []
  const locales = Object.keys(translations) as SupportedLocale[]
  
  // パラメータを含む可能性のあるキーを検出
  const parameterKeys = getAllTranslationKeys(translations.ja).filter(key => {
    const value = getNestedValue(translations.ja, key)
    return typeof value === 'string' && value.includes('{')
  })
  
  for (const key of parameterKeys) {
    const baseValue = getNestedValue(translations.ja, key) as string
    const baseParams = extractParameters(baseValue)
    
    for (const locale of locales) {
      if (locale === 'ja') continue
      
      const localeValue = getNestedValue(translations[locale], key) as string
      if (typeof localeValue !== 'string') continue
      
      const localeParams = extractParameters(localeValue)
      
      // パラメータの一貫性チェック
      const missingParams = baseParams.filter(p => !localeParams.includes(p))
      const extraParams = localeParams.filter(p => !baseParams.includes(p))
      
      if (missingParams.length > 0 || extraParams.length > 0) {
        errors.push({
          type: 'inconsistent_params',
          message: `Parameter inconsistency in ${key}: missing [${missingParams.join(', ')}], extra [${extraParams.join(', ')}]`,
          key,
          locale,
          severity: 'error'
        })
      }
    }
  }
  
  return errors
}

// 翻訳品質チェック
export function validateTranslationQuality(
  translations: Record<SupportedLocale, any>
): ValidationWarning[] {
  const warnings: ValidationWarning[] = []
  const locales = Object.keys(translations) as SupportedLocale[]
  
  for (const locale of locales) {
    const keys = getAllTranslationKeys(translations[locale])
    
    for (const key of keys) {
      const value = getNestedValue(translations[locale], key)
      
      if (typeof value !== 'string') continue
      
      // 空の翻訳チェック
      if (value.trim() === '') {
        warnings.push({
          type: 'empty_translation',
          message: `Empty translation for key: ${key}`,
          key,
          locale
        })
        continue
      }
      
      // 長すぎるテキストチェック（UI表示を考慮）
      if (value.length > 200) {
        warnings.push({
          type: 'long_text',
          message: `Translation may be too long (${value.length} chars): ${key}`,
          key,
          locale
        })
      }
      
      // 基本的な翻訳チェック（日本語以外で日本語文字が含まれている場合）
      if (locale !== 'ja' && /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(value)) {
        warnings.push({
          type: 'inconsistent_params',
          message: `Non-Japanese locale contains Japanese characters: ${key}`,
          key,
          locale
        })
      }
    }
  }
  
  return warnings
}

// 包括的な翻訳検証
export async function validateAllTranslations(
  translations: Record<SupportedLocale, any>
): Promise<ValidationResult> {
  const completenessResult = validateTranslationCompleteness(translations)
  const parameterErrors = validateParameterConsistency(translations)
  const qualityWarnings = validateTranslationQuality(translations)
  
  return {
    isValid: completenessResult.isValid && parameterErrors.length === 0,
    errors: [...completenessResult.errors, ...parameterErrors],
    warnings: [...completenessResult.warnings, ...qualityWarnings],
    summary: completenessResult.summary
  }
}

// 検証レポート生成
export function generateValidationReport(result: ValidationResult): string {
  const { summary, errors, warnings } = result
  
  let report = `# 翻訳検証レポート\n\n`
  
  // サマリー
  report += `## 概要\n`
  report += `- 総キー数: ${summary.totalKeys}\n`
  report += `- 有効キー数: ${summary.validKeys}\n`
  report += `- エラー数: ${summary.errorCount}\n`
  report += `- 警告数: ${summary.warningCount}\n`
  report += `- 全体の状態: ${result.isValid ? '✅ 正常' : '❌ エラーあり'}\n\n`
  
  // 言語別完全性
  report += `## 言語別完全性\n`
  for (const locale of summary.locales) {
    const percentage = summary.completeness[locale]
    const status = percentage === 100 ? '✅' : percentage >= 90 ? '⚠️' : '❌'
    report += `- ${locale}: ${percentage}% ${status}\n`
  }
  report += `\n`
  
  // エラー詳細
  if (errors.length > 0) {
    report += `## エラー詳細\n`
    for (const error of errors) {
      report += `- **${error.type}** (${error.locale || 'all'}): ${error.message}\n`
    }
    report += `\n`
  }
  
  // 警告詳細
  if (warnings.length > 0) {
    report += `## 警告詳細\n`
    for (const warning of warnings) {
      report += `- **${warning.type}** (${warning.locale || 'all'}): ${warning.message}\n`
    }
    report += `\n`
  }
  
  return report
}

// ユーティリティ関数
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

function extractParameters(text: string): string[] {
  const matches = text.match(/\{([^}]+)\}/g)
  return matches ? matches.map(match => match.slice(1, -1)) : []
}

// 開発用: ファイル監視とリアルタイム検証
export function setupDevelopmentValidation() {
  if (process.env.NODE_ENV !== 'development') return
  
  // 翻訳ファイルの変更を監視して自動検証
  // 実装時にchokidarなどのファイル監視ライブラリを使用
  console.log('🔍 Translation validation enabled in development mode')
}