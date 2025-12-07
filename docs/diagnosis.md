# 診断画面（DiagnosisView）簡易仕様書

目的  
- ユーザーに診断質問を提示し、回答を収集して診断結果（推奨職業やレポート購入）を表示する。

## コンポーネント親子関係

DiagnosisView
└─ DiagnosisContainer
   ├─ QuestionDisplay
   │  ├─ SwipeAnswer
   │  └─ TutorialSwipeCard
   └─ ResultDisplay
      ├─ PremiumSection
      ├─ ProfessionCard
      └─ ShareSection

## 各コンポーネントの責務
- DiagnosisView：画面ラッパー 
- DiagnosisContainer：診断か結果の表示制御
- QuestionDisplay：チュートリアルか質問の表示制御
- SwipeAnswer：質問を表示
- TutorialSwipeCard：チュートリアルを表示
- QuestionNavigation：必要か要検討
- ResultDisplay：診断結果を表示
- PremiumSection：レポート購入セクション
- ProfessionCard：診断結果の職業カード表示
- ShareSection：結果共有セクション

## コンポーネント構造
QuestionDisplay
├─ div.question-display
│  ├─ TutorialSwipeCard (v-if)
│  └─ SwipeAnswer (v-if)

SwipeAnswer
├─ div.swipe-card
│  ├─ p.swipe-meta
│  └─ p.swipe-text

TutorialSwipeCard
├─ div.tutorial-swipe-card
│  ├─ p.tutorial-title
│  ├─ p.tutorial-instruction-text
│  └─ div.tutorial-swipe-demo
│     ├─ div.swipe-left-demo
│     │  ├─ span
│     │  └─ small
│     └─ div.swipe-right-demo
│        ├─ span
│        └─ small

ResultDisplay
├─ div.result-container
│  ├─ h1
│  ├─ p
│  ├─ ProfessionCard (v-for)
│  ├─ ShareSection
│  ├─ PremiumSection
│  └─ BaseButton.base-button

PremiumSection
├─ div.premium-card
│  ├─ div.premium-header
│  │  ├─ h3
│  │  └─ p.premium-text
│  └─ div.purchase-buttons
│     └─ div.profession-card (v-for)
│        ├─ p.profession-rank
│        ├─ p.profession-name
│        ├─ p.profession-price
│        └─ BaseButton
│           ├─ div.loading-spinner (v-if)
│           └─ div (v-else) — テキスト "レポートを購入"

ProfessionCard
├─ div.tw-profession-card
│  ├─ div.tw-rank-section
│  │  ├─ div.tw-rank-badge
│  │  └─ h3
│  ├─ div.score-circle
│  │  ├─ svg.score-ring
│  │  └─ div.score-text
│  │     ├─ p.score-value
│  │     └─ p.score-unit
│  ├─ div.tw-category-analysis
│  │  ├─ h4
│  │  └─ div.tw-category-item (v-for)
│  │     ├─ div.tw-category-header
│  │     │  ├─ p.tw-category-name
│  │     │  └─ p.tw-category-score
│  │     └─ div.tw-category-bar
│  │        └─ div.tw-category-fill
│  ├─ div.tw-profession-details
│  │  └─ div.tw-detail-section* (v-if, 複数)
│  │     ├─ h4
│  │     └─ p.tw-detail-content / p.tw-income-value
│  └─ BaseButton

ShareSection
├─ div.share-section
│  ├─ div.section-header
│  │  ├─ h3
│  │  └─ p
│  └─ div.share-grid
│     ├─ BaseButton.action-buttons (LINE)
│     ├─ BaseButton.action-buttons (X)
│     └─ BaseButton.action-buttons (Instagram)