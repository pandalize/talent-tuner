/**
 * SEO最適化のためのユーティリティ関数群
 * 構造化データ(JSON-LD)、メタタグ管理、SEOキーワード生成など
 */

// 構造化データの型定義
interface StructuredData {
  '@context': string
  '@type': string
  [key: string]: unknown
}

// 組織情報の構造化データ
export function generateOrganizationSchema(): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ため職',
    alternateName: 'talent-tuner',
    url: 'https://pandalize.com',
    logo: 'https://pandalize.com/logo.png',
    description: '科学的な職業適性診断で最適なキャリアを発見できる無料ツール',
    address: {
      '@type': 'PostalAddress',
      addressRegion: '北海道',
      addressCountry: 'JP'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'pandalize.info@gmail.com',
      contactType: 'customer service',
      availableLanguage: 'Japanese'
    },
    sameAs: []
  }
}

// ウェブサイト情報の構造化データ
export function generateWebsiteSchema(): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ため職 - 無料職業適性診断',
    alternateName: 'talent-tuner',
    url: 'https://pandalize.com',
    description: '16の質問で科学的に職業適性を分析。プログラマー、デザイナー、会計士など8つの職業から最適なキャリアを発見',
    inLanguage: 'ja-JP',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://pandalize.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }
}

// FAQページの構造化データ
export function generateFAQSchema(): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '職業適性診断は本当に無料ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'はい、基本的な適性診断は完全無料でご利用いただけます。16の質問に答えるだけで、あなたに最適な職業を科学的に分析します。'
        }
      },
      {
        '@type': 'Question',
        name: '診断にはどのくらい時間がかかりますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '約5-10分程度で完了します。16の質問に5段階で評価していただくだけの簡単な診断です。'
        }
      },
      {
        '@type': 'Question',
        name: '診断結果の精度はどの程度ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '4つのカテゴリー（スキル、興味、優先事項、ワークライフバランス）を多角的に分析する科学的手法を採用しており、高い精度を実現しています。'
        }
      },
      {
        '@type': 'Question',
        name: 'どのような職業が分析対象ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'プログラマー、デザイナー、営業職、建設業、公認会計士、起業家、建築士、保育士など、幅広い分野の職業を分析対象としています。'
        }
      }
    ]
  }
}

// 職業情報の構造化データ
export function generateOccupationSchema(profession: {
  id: string
  name: string
  annualIncome: string
  jobDetails: string
  requiredSkills?: string[]
  educationRequirements?: string
}): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Occupation',
    name: profession.name,
    description: profession.jobDetails,
    estimatedSalary: {
      '@type': 'MonetaryAmountDistribution',
      name: '年収',
      currency: 'JPY',
      duration: 'P1Y',
      median: profession.annualIncome
    },
    skills: profession.requiredSkills || [],
    educationRequirements: profession.educationRequirements || '高等学校卒業以上',
    occupationLocation: {
      '@type': 'Country',
      name: '日本'
    }
  }
}

// パンくずリストの構造化データ
export function generateBreadcrumbSchema(breadcrumbs: Array<{name: string, url: string}>): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://pandalize.com${item.url}`
    }))
  }
}

// メタタグ管理
export function updateMetaTags(meta: {
  title?: string
  description?: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  canonicalUrl?: string
}) {
  // タイトル更新
  if (meta.title) {
    document.title = meta.title
  }

  // メタタグ更新のヘルパー関数
  const updateMeta = (name: string, content: string) => {
    let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
    if (!element) {
      element = document.createElement('meta')
      element.name = name
      document.head.appendChild(element)
    }
    element.content = content
  }

  const updateProperty = (property: string, content: string) => {
    let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement
    if (!element) {
      element = document.createElement('meta')
      element.setAttribute('property', property)
      document.head.appendChild(element)
    }
    element.content = content
  }

  // メタタグ更新
  if (meta.description) updateMeta('description', meta.description)
  if (meta.keywords) updateMeta('keywords', meta.keywords)
  if (meta.ogTitle) updateProperty('og:title', meta.ogTitle)
  if (meta.ogDescription) updateProperty('og:description', meta.ogDescription)
  if (meta.ogImage) updateProperty('og:image', meta.ogImage)

  // カノニカルURL
  if (meta.canonicalUrl) {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = meta.canonicalUrl
  }
}

// 構造化データをページに注入
export function injectStructuredData(...schemas: StructuredData[]) {
  // 既存の構造化データを削除
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]')
  existingScripts.forEach(script => script.remove())

  // 新しい構造化データを注入
  schemas.forEach(schema => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)
  })
}

// ページタイプに応じた構造化データ生成
export function generatePageStructuredData(pageType: string, data?: unknown): StructuredData[] {
  const schemas: StructuredData[] = [
    generateOrganizationSchema(),
    generateWebsiteSchema()
  ]

  switch (pageType) {
    case 'home':
      schemas.push(generateFAQSchema())
      break
    case 'profession':
      if (data && typeof data === 'object' && data !== null && 
          'id' in data && 'name' in data && 'annualIncome' in data && 'jobDetails' in data) {
        schemas.push(generateOccupationSchema(data as {
          id: string;
          name: string;
          annualIncome: string;
          jobDetails: string;
          requiredSkills?: string[];
          educationRequirements?: string;
        }))
      }
      break
    case 'diagnosis-method':
      schemas.push(generateFAQSchema())
      break
  }

  return schemas
}

// SEO最適化済みページタイトル生成
export function generateSEOTitle(pageType: string, data?: unknown): string {
  const baseTitles = {
    home: 'ため職 - 無料職業適性診断で最適な高収入職業を発見',
    diagnosis: '職業適性診断 - 16の質問で科学的に分析｜ため職',
    'diagnosis-method': '診断方法について - 科学的適性分析の仕組み｜ため職',
    'career-guide': 'キャリアガイド - 職業選択の総合情報｜ため職',
    'skills-development': 'スキル開発ガイド - 職業別学習ロードマップ｜ため職',
    'salary-guide': '年収・転職ガイド - 職業別収入情報｜ため職',
    'career-change': '転職・キャリアチェンジガイド｜ため職',
    'student-guide': '学生向けキャリアガイド - 就職活動の指針｜ため職',
    'result-guide': '診断結果活用ガイド - キャリア選択への活かし方｜ため職',
    'diagnosis-theory': '適性診断の理論と背景 - 心理学的根拠｜ため職',
    privacy: 'プライバシーポリシー｜ため職',
    terms: '利用規約｜ため職',
    contact: 'お問い合わせ｜ため職',
    company: '運営者情報｜ため職'
  }

  if (pageType === 'profession' && data && typeof data === 'object' && data !== null && 'name' in data) {
    const professionData = data as { name: string }
    return `${professionData.name}の適性診断結果 - 年収・スキル・将来性｜ため職`
  }

  return baseTitles[pageType as keyof typeof baseTitles] || 'ため職 - 無料職業適性診断'
}

// SEO最適化済みメタディスクリプション生成
export function generateSEODescription(pageType: string, data?: unknown): string {
  const baseDescriptions = {
    home: '【完全無料】16の質問でAIが科学的に職業適性を分析。プログラマー・デザイナー・公認会計士など高収入職業から最適なキャリアを発見。5分で完了、即座に結果表示。',
    diagnosis: '4つのカテゴリー（スキル・興味・優先事項・バランス）で多角的に分析する科学的職業適性診断。16の質問に5段階評価で答えるだけで、あなたに最適な職業が分かります。',
    'diagnosis-method': 'ため職の適性診断システムの詳細解説。心理学とデータサイエンスを融合した科学的分析方法、4つのカテゴリーによる多次元評価、スコアリングアルゴリズムについて専門的に説明。',
    'career-guide': '職業選択から転職まで、キャリア形成の総合ガイド。適性診断の結果を活かした具体的なキャリア戦略、スキルアップ方法、業界研究のポイントを詳しく解説。',
    'skills-development': '職業別のスキル開発ロードマップを詳細解説。プログラマー、デザイナー、会計士など各職業に必要なスキル、学習方法、資格取得の指針を具体的に提供。',
    'salary-guide': '職業別年収データと転職市場情報を詳細分析。業界動向、給与水準、キャリアアップによる収入向上の具体的方法、転職のタイミングと戦略を専門的に解説。',
    'career-change': '転職・キャリアチェンジの成功戦略を詳細ガイド。適性診断結果を活かした転職方法、業界研究、スキル転換、面接対策まで実践的なアドバイスを提供。',
    'student-guide': '学生向けキャリア選択ガイド。就職活動の準備から業界研究、適性に基づく職業選択、内定獲得までの具体的ステップを詳しく解説。',
    'result-guide': '適性診断結果をキャリア選択に活かす具体的方法。診断結果の読み方、職業研究への活用、スキルアップ計画の立て方を実践的に解説。',
    'diagnosis-theory': '職業適性診断の心理学的理論と科学的根拠を詳細解説。パーソナリティ理論、職業興味理論、能力適性の測定方法について専門的に説明。'
  }

  if (pageType === 'profession' && data && typeof data === 'object' && data !== null && 'name' in data && 'annualIncome' in data) {
    const professionData = data as { name: string; annualIncome: string }
    return `${professionData.name}の詳細情報：年収${professionData.annualIncome}、必要スキル、キャリアパス、将来性を詳しく解説。適性診断結果を活かした${professionData.name}への転職・就職戦略も提供。`
  }

  return baseDescriptions[pageType as keyof typeof baseDescriptions] || 
    '無料の職業適性診断で最適なキャリアを発見。科学的分析による信頼性の高い結果を即座に提供。'
}