<template>
  <div class="diagnosis-method-page">
    <div class="hero-section">
      <h1>ため職の診断方法について</h1>
      <p class="hero-subtitle">科学的根拠に基づく4つのカテゴリーで、あなたの職業適性を多角的に分析</p>
    </div>
    
    <div class="content-container">
      <!-- 診断の概要 -->
      <section class="overview-section">
        <h2>診断システムの概要</h2>
        <div class="overview-grid">
          <div class="overview-card">
            <div class="card-icon">📊</div>
            <h3>多次元分析</h3>
            <p>スキル、興味、優先事項、ワークライフバランスの4つの軸で総合的に判定</p>
          </div>
          <div class="overview-card">
            <div class="card-icon">🎯</div>
            <h3>精密なマッチング</h3>
            <p>各職業に対して重み付けされたスコアリングシステムで適性を算出</p>
          </div>
          <div class="overview-card">
            <div class="card-icon">⚡</div>
            <h3>即座の結果</h3>
            <p>16の質問に答えるだけで、3分以内に詳細な分析結果を提供</p>
          </div>
        </div>
      </section>

      <!-- 4つのカテゴリー詳細 -->
      <section class="categories-section">
        <h2>4つの診断カテゴリー</h2>
        
        <div class="category-detail">
          <div class="category-header">
            <span class="category-number">01</span>
            <h3>スキル（Skills）</h3>
          </div>
          <div class="category-content">
            <h4>測定内容</h4>
            <ul>
              <li>論理的思考力と分析能力</li>
              <li>コミュニケーション・対人関係スキル</li>
              <li>創造性・アイデア発想力</li>
              <li>技術的・専門的能力</li>
              <li>リーダーシップと組織運営能力</li>
            </ul>
            <h4>質問例</h4>
            <p>「複雑な問題を論理的に分析して解決することが得意ですか？」</p>
            <p>「新しいアイデアを考え出すことに喜びを感じますか？」</p>
            <h4>職業マッチングへの影響</h4>
            <p>プログラマー、デザイナー、営業職、管理職など、職業に必要な基本的な能力特性を測定し、適性度を判定します。</p>
          </div>
        </div>

        <div class="category-detail">
          <div class="category-header">
            <span class="category-number">02</span>
            <h3>興味（Interest）</h3>
          </div>
          <div class="category-content">
            <h4>測定内容</h4>
            <ul>
              <li>データ・数字への関心度</li>
              <li>人との関わりへの興味</li>
              <li>創作・表現活動への情熱</li>
              <li>問題解決・改善への欲求</li>
              <li>学習・研究への意欲</li>
            </ul>
            <h4>質問例</h4>
            <p>「データを分析して傾向やパターンを見つけることに興味がありますか？」</p>
            <p>「人の成長や成功をサポートすることにやりがいを感じますか？」</p>
            <h4>職業マッチングへの影響</h4>
            <p>内発的動機を測定し、長期的に満足感を得られる職業を特定します。興味と職業内容の一致度が高いほど、仕事への継続的なモチベーションが期待できます。</p>
          </div>
        </div>

        <div class="category-detail">
          <div class="category-header">
            <span class="category-number">03</span>
            <h3>優先事項（Priority）</h3>
          </div>
          <div class="category-content">
            <h4>測定内容</h4>
            <ul>
              <li>経済的安定・収入への重視度</li>
              <li>社会貢献・やりがいの重要性</li>
              <li>キャリア成長・昇進への願望</li>
              <li>職場環境・人間関係の優先度</li>
              <li>自由度・裁量権への価値観</li>
            </ul>
            <h4>質問例</h4>
            <p>「収入の安定性は職業選択において重要な要素ですか？」</p>
            <p>「社会に貢献できる仕事であることを重視しますか？」</p>
            <h4>職業マッチングへの影響</h4>
            <p>個人の価値観と職業特性のマッチングを行い、満足度の高いキャリア選択をサポートします。年収、成長性、社会意義などの要素を総合的に評価します。</p>
          </div>
        </div>

        <div class="category-detail">
          <div class="category-header">
            <span class="category-number">04</span>
            <h3>ワークライフバランス（Balance）</h3>
          </div>
          <div class="category-content">
            <h4>測定内容</h4>
            <ul>
              <li>労働時間・残業に対する許容度</li>
              <li>プライベート時間の重要性</li>
              <li>責任とストレスへの耐性</li>
              <li>転勤・出張への適応度</li>
              <li>チームワーク vs 個人作業の嗜好</li>
            </ul>
            <h4>質問例</h4>
            <p>「責任のある立場で多少のストレスがあっても、やりがいのある仕事を選びたいですか？」</p>
            <p>「プライベートの時間を確実に確保できることを重視しますか？」</p>
            <h4>職業マッチングへの影響</h4>
            <p>働き方の希望と職業の特性を照合し、持続可能なキャリアを提案します。労働環境、勤務形態、ストレスレベルなどを考慮した適性判定を行います。</p>
          </div>
        </div>
      </section>

      <!-- スコアリング方法 -->
      <section class="scoring-section">
        <h2>スコアリング・アルゴリズム</h2>
        <div class="scoring-explanation">
          <div class="scoring-step">
            <h3>Step 1: 回答の重み付け</h3>
            <p>各質問の回答選択肢には、職業ごとに異なる重みが設定されています。例えば「論理的思考が得意」という回答は、プログラマーに高い重み、デザイナーに中程度の重みが付与されます。</p>
          </div>
          <div class="scoring-step">
            <h3>Step 2: カテゴリー別スコア算出</h3>
            <p>4つのカテゴリーそれぞれで、職業ごとの適性スコアを計算します。カテゴリーごとに重み付けが調整されており、スキル（30%）、興味（30%）、優先事項（25%）、バランス（15%）の比重で統合されます。</p>
          </div>
          <div class="scoring-step">
            <h3>Step 3: 総合適性判定</h3>
            <p>全カテゴリーのスコアを統合し、職業ごとの総合適性度を算出します。上位3つの職業が推奨結果として表示され、それぞれに詳細な説明とキャリアアドバイスが提供されます。</p>
          </div>
        </div>
      </section>

      <!-- 診断の信頼性 -->
      <section class="reliability-section">
        <h2>診断の信頼性と限界</h2>
        <div class="reliability-content">
          <div class="reliability-point">
            <h3>✓ 診断の強み</h3>
            <ul>
              <li>多次元的な分析による包括的な適性評価</li>
              <li>現実的な職業情報に基づく実用的な結果</li>
              <li>個人の価値観と働き方の希望を重視</li>
              <li>継続的なデータ分析による精度向上</li>
            </ul>
          </div>
          <div class="reliability-point">
            <h3>⚠ 診断の限界</h3>
            <ul>
              <li>自己申告による回答のため、客観性に制限がある</li>
              <li>職業体験や実際の業務内容との差異がある可能性</li>
              <li>市場環境や業界動向の変化は反映されない</li>
              <li>最終的な職業選択は個人の総合的判断が必要</li>
            </ul>
          </div>
        </div>
        <div class="recommendation-note">
          <h3>📝 診断結果の活用方法</h3>
          <p>この診断は職業選択の<strong>参考情報</strong>として活用し、実際の職業体験、業界研究、キャリアカウンセリングなどと組み合わせることで、より確実なキャリア選択が可能になります。診断結果を出発点として、さらに深い自己分析と情報収集を行うことをお勧めします。</p>
        </div>
      </section>

      <!-- 関連リンク -->
      <section class="related-links">
        <h2>関連情報</h2>
        <div class="links-grid">
          <router-link to="/diagnosis" class="link-card">
            <h3>📊 診断を受ける</h3>
            <p>実際に適性診断を体験してみましょう</p>
          </router-link>
          <router-link to="/result-guide" class="link-card">
            <h3>📈 結果の活用ガイド</h3>
            <p>診断結果をキャリア選択に活かす方法</p>
          </router-link>
          <router-link to="/career-guide" class="link-card">
            <h3>🎯 キャリアガイド</h3>
            <p>職業選択の総合的なガイダンス</p>
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// メタタグの設定
import { onMounted } from 'vue'

onMounted(() => {
  document.title = '診断方法について｜ため職 - 適性診断の仕組みと信頼性'
  
  // メタディスクリプション
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', 'ため職の適性診断システムの詳細解説。4つのカテゴリー（スキル・興味・優先事項・バランス）による科学的分析方法、スコアリング・アルゴリズム、診断の信頼性と限界について専門的に説明します。')
  }
})
</script>

<style scoped>
.diagnosis-method-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  background-color: var(--background-white, #fff);
}

.hero-section {
  text-align: center;
  padding: 3rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e3f2fd 100%);
  border-radius: 20px;
  margin-bottom: 3rem;
}

.hero-section h1 {
  font-size: clamp(28px, 4vw, 42px);
  color: var(--text-dark, #333);
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero-subtitle {
  font-size: clamp(16px, 2.5vw, 20px);
  color: var(--text-medium, #666);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.content-container {
  max-width: 900px;
  margin: 0 auto;
}

section {
  margin-bottom: 4rem;
}

h2 {
  font-size: clamp(24px, 3.5vw, 32px);
  color: var(--text-dark, #333);
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid var(--main-color, #5f90b2);
  font-weight: 600;
}

/* 概要セクション */
.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.overview-card {
  background: #fff;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.overview-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.overview-card h3 {
  font-size: clamp(18px, 2.5vw, 22px);
  color: var(--text-dark, #333);
  margin-bottom: 1rem;
  font-weight: 600;
}

.overview-card p {
  color: var(--text-medium, #666);
  line-height: 1.6;
}

/* カテゴリー詳細 */
.category-detail {
  background: #fff;
  border-radius: 15px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border-left: 5px solid var(--main-color, #5f90b2);
}

.category-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.category-number {
  background: var(--main-color, #5f90b2);
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  margin-right: 1rem;
  min-width: 60px;
  text-align: center;
}

.category-header h3 {
  font-size: clamp(20px, 3vw, 26px);
  color: var(--text-dark, #333);
  margin: 0;
  font-weight: 600;
}

.category-content h4 {
  font-size: clamp(16px, 2.5vw, 20px);
  color: var(--text-dark, #333);
  margin: 1.5rem 0 1rem 0;
  font-weight: 600;
}

.category-content ul {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.category-content li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
  color: var(--text-medium, #666);
}

.category-content p {
  line-height: 1.7;
  color: var(--text-medium, #666);
  margin: 1rem 0;
}

/* スコアリングセクション */
.scoring-explanation {
  background: #f8fafc;
  border-radius: 15px;
  padding: 2rem;
}

.scoring-step {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 10px;
  border-left: 4px solid var(--main-color, #5f90b2);
}

.scoring-step:last-child {
  margin-bottom: 0;
}

.scoring-step h3 {
  font-size: clamp(18px, 2.5vw, 22px);
  color: var(--text-dark, #333);
  margin-bottom: 1rem;
  font-weight: 600;
}

.scoring-step p {
  line-height: 1.7;
  color: var(--text-medium, #666);
}

/* 信頼性セクション */
.reliability-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.reliability-point {
  background: #fff;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
}

.reliability-point h3 {
  font-size: clamp(18px, 2.5vw, 22px);
  margin-bottom: 1rem;
  font-weight: 600;
}

.reliability-point ul {
  padding-left: 1.5rem;
}

.reliability-point li {
  margin-bottom: 0.8rem;
  line-height: 1.5;
  color: var(--text-medium, #666);
}

.recommendation-note {
  background: linear-gradient(135deg, #fff3cd, #fef9e7);
  border: 1px solid #faebcc;
  border-radius: 15px;
  padding: 2rem;
}

.recommendation-note h3 {
  font-size: clamp(18px, 2.5vw, 22px);
  color: var(--text-dark, #333);
  margin-bottom: 1rem;
  font-weight: 600;
}

.recommendation-note p {
  line-height: 1.7;
  color: var(--text-medium, #666);
  margin: 0;
}

/* 関連リンク */
.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.link-card {
  background: #fff;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid transparent;
}

.link-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: var(--main-color, #5f90b2);
}

.link-card h3 {
  font-size: clamp(16px, 2.5vw, 20px);
  color: var(--text-dark, #333);
  margin-bottom: 1rem;
  font-weight: 600;
}

.link-card p {
  line-height: 1.5;
  color: var(--text-medium, #666);
  margin: 0;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .diagnosis-method-page {
    padding: 1rem;
  }

  .hero-section {
    padding: 2rem 1rem;
    margin-bottom: 2rem;
  }

  section {
    margin-bottom: 3rem;
  }

  .category-detail {
    padding: 1.5rem;
  }

  .category-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .category-number {
    margin-right: 0;
  }

  .reliability-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .reliability-point {
    padding: 1.5rem;
  }

  .recommendation-note {
    padding: 1.5rem;
  }

  .scoring-step {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .overview-grid {
    grid-template-columns: 1fr;
  }

  .overview-card {
    padding: 1.5rem;
  }

  .links-grid {
    grid-template-columns: 1fr;
  }
}
</style>