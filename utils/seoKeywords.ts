// SEOキーワード戦略定義

export interface KeywordStrategy {
  primary: string[] // プライマリキーワード
  secondary: string[] // セカンダリキーワード  
  longTail: string[] // ロングテールキーワード
}

// 職業関連キーワード
export const professionKeywords: Record<string, KeywordStrategy> = {
  programmer: {
    primary: ['プログラマー', 'エンジニア', 'IT職'],
    secondary: ['プログラミング', 'システム開発', 'Web開発', 'アプリ開発'],
    longTail: [
      'プログラマー 年収',
      'プログラマー 未経験',
      'プログラマー 転職',
      'プログラマー 将来性',
      'プログラマー スキル',
      'IT エンジニア なるには'
    ]
  },
  accountant: {
    primary: ['公認会計士', '会計士', '経理職'],
    secondary: ['会計', '監査', '税務', '財務'],
    longTail: [
      '公認会計士 年収',
      '公認会計士 試験',
      '公認会計士 資格',
      '会計士 転職',
      '会計士 将来性',
      '経理 キャリアアップ'
    ]
  },
  sales: {
    primary: ['営業職', '営業', 'セールス'],
    secondary: ['法人営業', '個人営業', '新規開拓', '顧客管理'],
    longTail: [
      '営業職 年収',
      '営業 転職',
      '営業 スキル',
      '営業 向いている人',
      'セールス キャリア',
      '営業職 将来性'
    ]
  },
  entrepreneur: {
    primary: ['起業家', '経営者', '独立'],
    secondary: ['起業', 'スタートアップ', 'ビジネス', '事業経営'],
    longTail: [
      '起業 方法',
      '起業家 なるには',
      '独立 準備',
      'スタートアップ 創業',
      '事業 立ち上げ',
      '経営者 資質'
    ]
  }
}

// 業界・分野別キーワード
export const industryKeywords: KeywordStrategy = {
  primary: ['転職', '就職', 'キャリア', '適職'],
  secondary: ['職業選択', 'キャリア診断', '適性診断', 'キャリアチェンジ'],
  longTail: [
    '転職 適職診断',
    '就職 職業選択',
    'キャリア 見つけ方',
    '適職 診断 無料',
    '職業 適性 テスト',
    'キャリアチェンジ 方法',
    '天職 見つける',
    '仕事 向いている',
    '高収入 職業',
    '将来性 ある仕事'
  ]
}

// スキル・学習関連キーワード
export const skillKeywords: KeywordStrategy = {
  primary: ['スキルアップ', '資格取得', '学習'],
  secondary: ['技術習得', '専門知識', '能力開発', '研修'],
  longTail: [
    'スキルアップ 方法',
    '資格 取得 おすすめ',
    '技術 習得 効率',
    '専門スキル 身につける',
    'キャリア 開発',
    '学習計画 立て方'
  ]
}

// 年収・待遇関連キーワード
export const salaryKeywords: KeywordStrategy = {
  primary: ['年収', '給料', '待遇'],
  secondary: ['収入', '給与', '報酬', '昇進'],
  longTail: [
    '年収 上げる方法',
    '高年収 職業',
    '給料 良い仕事',
    '収入 アップ',
    '昇進 条件',
    '待遇 良い 会社'
  ]
}

// メタディスクリプション生成ヘルパー
export const generateMetaDescription = (
  pageType: string,
  profession?: string,
  customKeywords?: string[]
): string => {
  const baseKeywords = ['無料', '適性診断', '職業', 'キャリア']
  const keywords = customKeywords || baseKeywords
  
  const templates = {
    home: `【完全無料】5分で分かる職業適性診断。${keywords.slice(0, 3).join('・')}から最適な仕事をAI診断。転職・就職活動に役立つキャリア分析レポート付き。`,
    diagnosis: `16の質問で適職診断。${keywords.slice(0, 2).join('・')}の観点から科学的に分析し、最適な職業をランキング形式でご提案。無料で今すぐ診断開始。`,
    profession: `${profession}の詳細情報。年収・必要スキル・キャリアパス・転職情報を詳しく解説。${profession}に向いている人の特徴や将来性も分析。`,
    guide: `${keywords[0]}に関する実践的ガイド。専門家が教える効果的な方法と成功のポイントを詳しく解説。キャリア成功への道筋を明確に示します。`
  }
  
  return templates[pageType as keyof typeof templates] || '職業適性診断・キャリアガイドの専門サイト'
}

// タイトル生成ヘルパー  
export const generateTitle = (
  pageType: string,
  profession?: string,
  customTitle?: string
): string => {
  if (customTitle) return `${customTitle} | ため職`
  
  const templates = {
    home: 'ため職 - 無料職業適性診断で最適な高収入職業を発見',
    diagnosis: '職業適性診断 | 5分で分かるあなたの天職 | ため職',
    profession: `${profession}の年収・転職情報 | 詳細ガイド | ため職`,
    guide: '実践的キャリアガイド | ため職'
  }
  
  return templates[pageType as keyof typeof templates] || 'ため職'
}

// キーワードメタタグ生成
export const generateKeywords = (pageType: string, profession?: string): string => {
  const baseKeywords = ['職業適性診断', '無料', '転職', '就職', 'キャリア診断', 'ため職']
  
  if (profession && professionKeywords[profession]) {
    const profKeywords = professionKeywords[profession]
    return [...baseKeywords, ...profKeywords.primary, ...profKeywords.secondary].join(',')
  }
  
  const allKeywords = [
    ...baseKeywords,
    ...industryKeywords.primary,
    ...industryKeywords.secondary
  ]
  
  return allKeywords.join(',')
}