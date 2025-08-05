# 多言語対応戦略 - グローバル展開計画

職業適性診断アプリ「ため職」の多言語対応実装計画

## 🎯 対象言語・市場分析

### Phase 1: 基本多言語対応
- **🇯🇵 日本語** (現在) - 国内市場
- **🇺🇸 英語** - グローバルスタンダード、欧米市場
- **🇨🇳 中国語（簡体字）** - 世界最大市場

### Phase 2: アジア展開
- **🇰🇷 韓国語** - 隣接市場、文化的親和性
- **🇹🇼 中国語（繁体字）** - 台湾・香港市場
- **🇻🇳 ベトナム語** - 急成長市場

### Phase 3: 欧州展開
- **🇩🇪 ドイツ語** - 欧州最大経済圏
- **🇫🇷 フランス語** - フランス語圏
- **🇪🇸 スペイン語** - スペイン語圏

## 🏗️ 技術アーキテクチャ

### 1. Vue I18n統合

```bash
# 依存関係追加
npm install vue-i18n

# TypeScript型定義
npm install @types/vue-i18n
```

```typescript
// src/i18n/index.ts
import { createI18n } from 'vue-i18n'
import ja from './locales/ja.json'
import en from './locales/en.json'
import zh from './locales/zh.json'

const i18n = createI18n({
  locale: 'ja', // デフォルト言語
  fallbackLocale: 'en',
  messages: { ja, en, zh }
})

export default i18n
```

### 2. URL構造設計

```
https://pandalize.com/        # 日本語（デフォルト）
https://pandalize.com/en/     # 英語
https://pandalize.com/zh/     # 中国語
https://pandalize.com/ko/     # 韓国語

# ページ例
/diagnosis          → /en/diagnosis
/chat              → /en/chat  
/profession/programmer → /en/profession/programmer
```

### 3. ファイル構造

```
my-vue-app/
├── src/
│   ├── i18n/                     # 国際化設定
│   │   ├── index.ts              # Vue I18n設定
│   │   ├── locales/              # 言語ファイル
│   │   │   ├── ja.json           # 日本語UI文言
│   │   │   ├── en.json           # 英語UI文言
│   │   │   ├── zh.json           # 中国語UI文言
│   │   │   └── ko.json           # 韓国語UI文言
│   │   │
│   │   └── utils/
│   │       ├── languageDetector.ts  # ブラウザ言語検出
│   │       └── dateFormatter.ts     # 言語別日付フォーマット
│   │
├── public/
│   ├── data/
│   │   ├── locales/              # 言語別データ
│   │   │   ├── ja/              # 日本語コンテンツ
│   │   │   │   ├── diagnostic_config.json
│   │   │   │   ├── professions.json
│   │   │   │   └── chat_prompts.json
│   │   │   │
│   │   │   ├── en/              # 英語コンテンツ
│   │   │   │   ├── diagnostic_config.json
│   │   │   │   ├── professions.json
│   │   │   │   └── chat_prompts.json
│   │   │   │
│   │   │   └── zh/              # 中国語コンテンツ
│   │   │       ├── diagnostic_config.json
│   │   │       ├── professions.json
│   │   │       └── chat_prompts.json
│   │   │
│   │   └── sitemap/             # 言語別サイトマップ
│   │       ├── sitemap-ja.xml
│   │       ├── sitemap-en.xml
│   │       └── sitemap-zh.xml
```

## 🔧 実装フェーズ

### Phase 1: 基盤構築（推定工数: 2-3週間）

#### 1-1. Vue I18n セットアップ
```bash
npm install vue-i18n
```

#### 1-2. 言語切り替えコンポーネント
```vue
<!-- src/components/LanguageSwitcher.vue -->
<template>
  <div class="language-switcher">
    <select v-model="currentLocale" @change="changeLanguage">
      <option value="ja">🇯🇵 日本語</option>
      <option value="en">🇺🇸 English</option>
      <option value="zh">🇨🇳 中文</option>
    </select>
  </div>
</template>
```

#### 1-3. ルーティング拡張
```typescript
// src/router/index.ts
const routes = [
  {
    path: '/:locale(en|zh|ko)?',
    component: LocaleWrapper,
    children: [
      { path: '', name: 'home', component: HomeView },
      { path: 'diagnosis', name: 'diagnosis', component: DiagnosisView },
      { path: 'chat', name: 'chat', component: CareerChatView }
    ]
  }
]
```

### Phase 2: コンテンツ翻訳（推定工数: 4-6週間）

#### 2-1. UI文言翻訳
```json
// src/i18n/locales/en.json
{
  "nav": {
    "home": "Home",
    "diagnosis": "Career Assessment",
    "chat": "AI Career Counseling",
    "about": "Professions"
  },
  "diagnosis": {
    "title": "Professional Career Assessment",
    "start": "Start Assessment",
    "question": "Question {current} of {total}"
  }
}
```

#### 2-2. 診断データ翻訳
```json
// public/data/locales/en/diagnostic_config.json
{
  "questions": [
    {
      "id": 1,
      "category": "skill",
      "text": "Which of the following activities do you enjoy most?",
      "choices": [
        { "text": "Programming and system development", "weights": {...} },
        { "text": "Design and creative work", "weights": {...} }
      ]
    }
  ]
}
```

#### 2-3. 職業データ翻訳
```json
// public/data/locales/en/professions.json
{
  "programmer": {
    "name": "Software Developer",
    "description": "Develops software applications and systems",
    "salaryRange": "$60,000 - $150,000",
    "requiredSkills": ["Programming", "Problem Solving", "Logic"],
    "workEnvironment": "Office or remote work environment"
  }
}
```

### Phase 3: AI多言語対応（推定工数: 1-2週間）

#### 3-1. Claude AIプロンプト多言語化
```typescript
// src/utils/claudeApiClient.ts
private buildSystemPrompt(locale: string): string {
  const prompts = {
    ja: `あなたは「ため職」という職業適性診断サービスの...`,
    en: `You are an AI career counselor for "TameShoku", a professional...`,
    zh: `您是"为职"职业适性诊断服务的AI职业顾问...`
  }
  return prompts[locale] || prompts.en
}
```

#### 3-2. レスポンス言語制御
```typescript
async getCareerAdvice(request: CareerAdviceRequest, locale: string) {
  const systemPrompt = this.buildSystemPrompt(locale)
  const userMessage = `[Language: ${locale}] ${request.message}`
  // ...
}
```

### Phase 4: SEO・運用対応（推定工数: 1週間）

#### 4-1. hreflang設定
```html
<!-- 各ページのhreflang -->
<link rel="alternate" hreflang="ja" href="https://pandalize.com/" />
<link rel="alternate" hreflang="en" href="https://pandalize.com/en/" />
<link rel="alternate" hreflang="zh" href="https://pandalize.com/zh/" />
<link rel="alternate" hreflang="x-default" href="https://pandalize.com/" />
```

#### 4-2. 言語別サイトマップ
```xml
<!-- sitemap-index.xml -->
<sitemapindex>
  <sitemap>
    <loc>https://pandalize.com/sitemap-ja.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://pandalize.com/sitemap-en.xml</loc>
  </sitemap>
</sitemapindex>
```

## 💡 技術的検討事項

### 1. 文字エンコーディング
- UTF-8完全対応
- 右から左（RTL）言語への将来対応準備
- フォント最適化（言語別Web Fonts）

### 2. データローディング最適化
```typescript
// 必要な言語のデータのみ読み込み
const loadLocaleData = async (locale: string) => {
  const [config, professions, prompts] = await Promise.all([
    fetch(`/data/locales/${locale}/diagnostic_config.json`),
    fetch(`/data/locales/${locale}/professions.json`),
    fetch(`/data/locales/${locale}/chat_prompts.json`)
  ])
  return { config, professions, prompts }
}
```

### 3. Claude API多言語プロンプト
```typescript
const LANGUAGE_SPECIFIC_PROMPTS = {
  ja: {
    greeting: "こんにちは！進路について何でも相談してください。",
    profession_suggestion: "あなたにおすすめの職業は以下の通りです：",
    follow_up: "他に気になることはありますか？"
  },
  en: {
    greeting: "Hello! I'm here to help with your career questions.",
    profession_suggestion: "Based on our conversation, I recommend these careers:",
    follow_up: "Is there anything else you'd like to know?"
  }
}
```

## 🚀 段階的展開戦略

### Step 1: 英語対応（グローバル基盤）
- 最もROIが高い
- 技術的課題の洗い出し
- 翻訳品質の確立

### Step 2: 中国語対応（最大市場）
- 世界最大のユーザーベース
- 文化的適応が必要
- 中国国内法規制対応

### Step 3: 韓国語対応（近隣市場）
- 文化的親和性
- K-Career需要の取り込み
- 韓国特有の職業文化反映

## 📊 成功指標（KPI）

### 技術指標
- ページロード時間: 各言語 < 3秒
- 翻訳カバレッジ: 100%
- Claude API多言語レスポンス精度: > 85%

### ビジネス指標
- 海外ユーザー比率: 30%以上
- 言語別コンバージョン率
- 国際SEOランキング向上

## 💰 コスト試算

### 開発コスト
- Phase 1（基盤）: 約40-60時間
- Phase 2（翻訳）: 約80-120時間  
- Phase 3（AI対応）: 約20-40時間
- Phase 4（SEO）: 約10-20時間

### 運用コスト
- 翻訳サービス: 月額$200-500
- Claude API多言語使用量増加: 月額$100-300
- 多言語コンテンツ管理: 月額$100-200

## 🎯 推奨実装順序

1. **Vue I18n基盤構築** (1週間)
2. **英語UI翻訳** (2週間)
3. **英語診断データ作成** (1週間)
4. **Claude AI英語対応** (1週間)
5. **テスト・デバッグ** (1週間)
6. **本番リリース・検証** (1週間)

**Total: 約7週間で英語対応完了**

---

この多言語対応により、グローバル市場での競争力を大幅に向上させ、ユーザーベースの国際的拡大を実現できます。