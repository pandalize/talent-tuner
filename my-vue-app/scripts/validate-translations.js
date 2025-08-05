#!/usr/bin/env node

/**
 * 翻訳バリデーション CLI スクリプト
 * npm run validate:translations で実行
 */

const fs = require('fs').promises
const path = require('path')

// カラー出力用のユーティリティ
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
}

function colorize(color, text) {
  return `${colors[color]}${text}${colors.reset}`
}

// 翻訳ファイルを読み込み
async function loadTranslationFiles() {
  const localesDir = path.join(__dirname, '../src/i18n/locales')
  const locales = ['ja', 'en', 'zh']
  const translations = {}
  
  for (const locale of locales) {
    const modulesDir = path.join(localesDir, locale, 'modules')
    const moduleFiles = await fs.readdir(modulesDir)
    
    let mergedTranslation = {}
    
    for (const file of moduleFiles) {
      if (!file.endsWith('.json')) continue
      
      const filePath = path.join(modulesDir, file)
      const content = await fs.readFile(filePath, 'utf-8')
      const data = JSON.parse(content)
      
      // 深いマージ
      mergedTranslation = deepMerge(mergedTranslation, data)
    }
    
    translations[locale] = mergedTranslation
  }
  
  return translations
}

// 深いオブジェクトマージ
function deepMerge(target, source) {
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

// 全キーを取得
function getAllKeys(obj, prefix = '') {
  const keys = []
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const fullKey = prefix ? `${prefix}.${key}` : key
      
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        keys.push(...getAllKeys(obj[key], fullKey))
      } else if (typeof obj[key] === 'string') {
        keys.push(fullKey)
      }
    }
  }
  
  return keys.sort()
}

// ネストされた値を取得
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

// パラメータを抽出
function extractParameters(text) {
  const matches = text.match(/\{([^}]+)\}/g)
  return matches ? matches.map(match => match.slice(1, -1)) : []
}

// 検証実行
async function validateTranslations() {
  console.log(colorize('cyan', colorize('bold', '\n🔍 翻訳ファイル検証を開始します...\n')))
  
  try {
    const translations = await loadTranslationFiles()
    const locales = Object.keys(translations)
    
    console.log(colorize('blue', `検証対象言語: ${locales.join(', ')}\n`))
    
    // 完全性チェック
    const baseKeys = getAllKeys(translations.ja)
    const totalKeys = baseKeys.length
    
    console.log(colorize('white', `📊 統計情報:`))
    console.log(`   総キー数: ${totalKeys}`)
    
    let totalErrors = 0
    let totalWarnings = 0
    
    // 各言語の完全性をチェック
    const completeness = {}
    
    for (const locale of locales) {
      const localeKeys = getAllKeys(translations[locale])
      const missingKeys = baseKeys.filter(key => !localeKeys.includes(key))
      const extraKeys = localeKeys.filter(key => !baseKeys.includes(key))
      
      completeness[locale] = Math.round(((totalKeys - missingKeys.length) / totalKeys) * 100)
      
      console.log(`   ${locale}: ${localeKeys.length}キー (完全性: ${completeness[locale]}%)`)
      
      if (missingKeys.length > 0) {
        totalErrors += missingKeys.length
        console.log(colorize('red', `     ❌ 欠落キー: ${missingKeys.length}個`))
        if (process.argv.includes('--verbose')) {
          missingKeys.forEach(key => {
            console.log(colorize('red', `        - ${key}`))
          })
        }
      }
      
      if (extraKeys.length > 0) {
        totalWarnings += extraKeys.length
        console.log(colorize('yellow', `     ⚠️  余分キー: ${extraKeys.length}個`))
        if (process.argv.includes('--verbose')) {
          extraKeys.forEach(key => {
            console.log(colorize('yellow', `        - ${key}`))
          })
        }
      }
    }
    
    // パラメータ一貫性チェック
    console.log(colorize('white', `\n🔧 パラメータ一貫性チェック:`))
    
    const parameterKeys = baseKeys.filter(key => {
      const value = getNestedValue(translations.ja, key)
      return typeof value === 'string' && value.includes('{')
    })
    
    console.log(`   パラメータ付きキー: ${parameterKeys.length}個`)
    
    let parameterErrors = 0
    
    for (const key of parameterKeys) {
      const baseValue = getNestedValue(translations.ja, key)
      const baseParams = extractParameters(baseValue)
      
      for (const locale of locales) {
        if (locale === 'ja') continue
        
        const localeValue = getNestedValue(translations[locale], key)
        if (typeof localeValue !== 'string') continue
        
        const localeParams = extractParameters(localeValue)
        const missingParams = baseParams.filter(p => !localeParams.includes(p))
        const extraParams = localeParams.filter(p => !baseParams.includes(p))
        
        if (missingParams.length > 0 || extraParams.length > 0) {
          parameterErrors++
          console.log(colorize('red', `     ❌ ${key} (${locale}): 不整合`))
          if (process.argv.includes('--verbose')) {
            if (missingParams.length > 0) {
              console.log(colorize('red', `        欠落: {${missingParams.join('}, {')}}`))
            }
            if (extraParams.length > 0) {
              console.log(colorize('red', `        余分: {${extraParams.join('}, {')}}`))
            }
          }
        }
      }
    }
    
    totalErrors += parameterErrors
    
    // 結果サマリー
    console.log(colorize('white', colorize('bold', '\n📋 検証結果:')))
    
    if (totalErrors === 0) {
      console.log(colorize('green', '✅ 全ての検証をパスしました！'))
    } else {
      console.log(colorize('red', `❌ ${totalErrors}個のエラーが見つかりました`))
    }
    
    if (totalWarnings > 0) {
      console.log(colorize('yellow', `⚠️  ${totalWarnings}個の警告があります`))
    }
    
    // 言語別完全性サマリー
    console.log(colorize('white', '\n🌐 言語別完全性:'))
    for (const locale of locales) {
      const percentage = completeness[locale]
      const status = percentage === 100 ? '✅' : percentage >= 90 ? '⚠️' : '❌'
      console.log(`   ${locale}: ${percentage}% ${status}`)
    }
    
    console.log() // 改行
    
    // 終了コード
    process.exit(totalErrors > 0 ? 1 : 0)
    
  } catch (error) {
    console.error(colorize('red', `❌ 検証中にエラーが発生しました: ${error.message}`))
    process.exit(1)
  }
}

// ヘルプ表示
function showHelp() {
  console.log(colorize('cyan', colorize('bold', '翻訳検証ツール\n')))
  console.log('使用方法:')
  console.log('  npm run validate:translations')
  console.log('  node scripts/validate-translations.js')
  console.log('')
  console.log('オプション:')
  console.log('  --verbose    詳細な出力を表示')
  console.log('  --help       このヘルプを表示')
  console.log('')
}

// メイン実行
if (process.argv.includes('--help')) {
  showHelp()
} else {
  validateTranslations()
}