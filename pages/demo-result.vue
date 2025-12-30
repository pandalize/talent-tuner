<template>
  <div class="demo-result-page" style="min-height: 100vh; background: #f8fafc; padding: 0;">
    <ResultDisplay
      :professions="demoProfessions"
      :maxCategoryScore="demoMaxCategoryScore"
      :totalQuestions="demoTotalQuestions"
    />
  </div>
</template>


<script setup lang="ts">

const demoProfessions = [
  {
    name: 'Webデザイナー',
    score: 86,
    categories: { skill: 25, interest: 21, priority: 19, balance: 21 },
    annualIncome: '350万円〜600万円',
    jobDetails: 'Webサイトやバナー、UI/UXデザインなどを担当し、クライアントや自社サービスのデザイン業務を行います。HTML/CSSやFigma、Photoshopなどのツールを活用します。',
    comment: 'あなたはクリエイティブな発想力とデザインへの関心が高く、細部までこだわる力があります。Webデザイナーとして多様な案件で活躍できる素質があります。'
  },
  {
    name: 'インフルエンサー',
    score: 83,
    categories: { skill: 20, interest: 22, priority: 21, balance: 20 },
    annualIncome: '100万円〜1,000万円以上',
    jobDetails: 'SNSやYouTubeなどで情報発信し、フォロワーや企業案件、広告収入などで収益を得ます。企画力や発信力、セルフブランディングが重要です。',
    comment: 'あなたは新しいことに挑戦する意欲と発信力があり、SNSで自分の世界観を表現するのが得意です。インフルエンサーとして多くの人に影響を与えられるでしょう。'
  },
  {
    name: 'マーケティング',
    score: 77,
    categories: { skill: 19, interest: 23, priority: 16, balance: 19 },
    annualIncome: '400万円〜800万円',
    jobDetails: '市場調査や広告運用、SNS運用、プロモーション企画などを通じて、商品やサービスの売上拡大を目指します。分析力やコミュニケーション力が求められます。',
    comment: 'あなたは情報収集や分析が得意で、戦略的に物事を考える力があります。マーケティング分野で企画やプロモーションに携わる適性が高いです。'
  }
]
const demoMaxCategoryScore = 25
const demoTotalQuestions = 16
</script>

<style scoped>
.demo-result-page {
  padding-bottom: 2rem;
}
</style>
