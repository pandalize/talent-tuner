<template>
  <div class="diagnosis-method-page">
    <!-- ヒーローセクション -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">診断の特徴</h1>
        <!--<p class="hero-subtitle">
          心理学とデータサイエンスを融合した<br>
          精密な職業適性分析システム
        </p>-->
      </div>
    </div>
    
    <div class="content-container">

      <!-- 診断カテゴリー -->
      <section class="categories-section">
        <div class="section-header">
          <h2 class="section-title">4つの診断カテゴリー</h2>
          <p class="section-subtitle">各カテゴリーが職業適性の異なる側面を測定し、総合的な分析を実現</p>
        </div>
        
        <div class="category-detail">
          <div class="category-header">
            <span class="category-number">01</span>
            <h3>スキル</h3>
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
            <h4>職業マッチングへの影響</h4>
            <p>プログラマー、デザイナー、営業職、管理職など、職業に必要な基本的な能力特性を測定し、適性度を判定します。</p>
          </div>
        </div>

        <div class="category-detail">
          <div class="category-header">
            <span class="category-number">02</span>
            <h3>興味</h3>
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
            <h4>職業マッチングへの影響</h4>
            <p>内発的動機を測定し、長期的に満足感を得られる職業を特定します。興味と職業内容の一致度が高いほど、仕事への継続的なモチベーションが期待できます。</p>
          </div>
        </div>

        <div class="category-detail">
          <div class="category-header">
            <span class="category-number">03</span>
            <h3>優先事項</h3>
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
            <h4>職業マッチングへの影響</h4>
            <p>個人の価値観と職業特性のマッチングを行い、満足度の高いキャリア選択をサポートします。年収、成長性、社会意義などの要素を総合的に評価します。</p>
          </div>
        </div>

        <div class="category-detail">
          <div class="category-header">

            <span class="category-number">04</span>
            <h3>ワークライフバランス</h3>
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
            <h4>職業マッチングへの影響</h4>
            <p>働き方の希望と職業の特性を照合し、持続可能なキャリアを提案します。労働環境、勤務形態、ストレスレベルなどを考慮した適性判定を行います。</p>
          </div>
        </div>
      </section>

      <!-- 診断の信頼性 -->
      <section class="reliability-section">
        <h2>診断結果の活用方法</h2>
        <div class="recommendation-note">
          <p>この診断は職業選択の<strong>参考情報</strong>として活用し、実際の職業体験、業界研究、キャリアカウンセリングなどと組み合わせることで、より確実なキャリア選択が可能になります。診断結果を出発点として、さらに深い自己分析と情報収集を行うことをお勧めします。</p>
        </div>
      </section>

      <!-- 関連リンク -->
      <section class="related-links">
        <h2>関連情報</h2>
        <div class="links-grid">
          <router-link to="/diagnosis" class="link-card">
            <h3>診断を受ける</h3>
            <p>実際に適性診断を体験してみましょう</p>
          </router-link>
          <router-link to="/result-guide" class="link-card">
            <h3>結果の活用ガイド</h3>
            <p>診断結果をキャリア選択に活かす方法</p>
          </router-link>
          <router-link to="/career-guide" class="link-card">
            <h3>キャリアガイド</h3>
            <p>職業選択の総合的なガイダンス</p>
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.diagnosis-method-page {
  width: 100%;
  min-height: 100vh;
  background: var(--bg-primary);
}

.hero-section {
  background: linear-gradient(135deg, var(--primary-navy) 0%, var(--primary-blue) 100%);
  color: white;
  padding: var(--space-xxl) 0;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: pulse 20s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.hero-content {
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: var(--space-xs) var(--space-md);
  border-radius: 50px;
  font-size: var(--fs-small);
  font-weight: 500;
  margin-bottom: var(--space-md);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.hero-title {
  font-family: var(--font-heading);
  font-size: var(--fs-h1);
  font-weight: 700;
  margin-bottom: var(--space-md);
  line-height: 1.2;
}

.hero-subtitle {
  font-size: var(--fs-body);
  opacity: 0.9;
  margin-bottom: var(--space-xl);
  line-height: 1.8;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: var(--space-xl);
  margin-top: var(--space-xl);
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--accent-gold);
  margin-bottom: var(--space-xs);
}

.stat-label {
  font-size: var(--fs-small);
  opacity: 0.9;
}

.content-container {
  max-width: 900px;
  margin: 0 auto;
}

section {
  margin-bottom: var(--space-xxl);
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-xl);
}


.section-title {
  font-family: var(--font-heading);
  font-size: var(--fs-h2);
  color: var(--primary-navy);
  margin-bottom: var(--space-md);
  position: relative;
}

.diagnosis-method-page .section-title {
  margin-top: 3.5rem;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-gold), var(--accent-blue));
  border-radius: 2px;
}

.section-subtitle {
  font-size: var(--fs-body);
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.8;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
  padding: 0 var(--space-md);
  max-width: 1200px;
  width: 100vw;
  margin: 0 auto;
}

.features-section {
  width: 100vw;
  max-width: 100vw;
  margin-left: 50%;
  transform: translateX(-50%);
}

@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}

.feature-card {
  background: var(--bg-primary);
  padding: var(--space-xl);
  border-radius: 16px;
  box-shadow: var(--shadow-lg);
  text-align: center;
  transition: all var(--transition-normal);
  border: 1px solid var(--border-light);
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--accent-gold), var(--accent-blue));
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(26, 35, 50, 0.15);
  border-color: var(--accent-blue);
}

.feature-icon {
  color: var(--primary-navy);
  margin-bottom: var(--space-md);
  transition: color var(--transition-normal);
}

.feature-card:hover .feature-icon {
  color: var(--accent-blue);
}

.feature-title {
  font-family: var(--font-heading);
  font-size: var(--fs-h3);
  color: var(--primary-navy);
  margin-bottom: var(--space-md);
  font-weight: 600;
}

.feature-description {
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: var(--fs-body);
}

/* カテゴリー詳細 */
.categories-section {
  padding: 0 var(--space-md);
}

.category-detail {
  background: var(--bg-primary);
  border-radius: 16px;
  padding: var(--space-xl);
  margin-bottom: var(--space-xl);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-light);
  transition: all var(--transition-normal);
  position: relative;
}

.category-detail:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.category-header {
  display: flex;
  align-items: center;
  margin-bottom: var(--space-lg);
  gap: var(--space-md);
}

.category-number {
  background: linear-gradient(135deg, var(--primary-navy), var(--primary-blue));
  color: white;
  font-family: var(--font-mono);
  font-size: 1.1rem;
  font-weight: 700;
  padding: var(--space-sm) var(--space-md);
  border-radius: 12px;
  min-width: 64px;
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.category-header h3 {
  font-family: var(--font-heading);
  font-size: var(--fs-h3);
  color: var(--primary-navy);
  margin: 0;
  font-weight: 600;
}

.category-content h4 {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  color: var(--primary-navy);
  margin: var(--space-lg) 0 var(--space-md) 0;
  font-weight: 600;
  position: relative;
  padding-left: var(--space-md);
}

.category-content h4::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 20px;
  background: var(--accent-gold);
  border-radius: 2px;
}

.category-content ul {
  margin: var(--space-md) 0;
  padding-left: var(--space-lg);
}

.category-content li {
  margin-bottom: var(--space-sm);
  line-height: 1.7;
  color: var(--text-secondary);
  position: relative;
}

.category-content li::marker {
  color: var(--accent-blue);
}

.category-content p {
  line-height: 1.7;
  color: var(--text-secondary);
  margin: var(--space-md) 0;
  font-size: var(--fs-body);
}

/* スコアリングセクション */
.scoring-section {
  padding: 0 var(--space-md);
}

.scoring-section h2 {
  font-family: var(--font-heading);
  font-size: var(--fs-h2);
  color: var(--primary-navy);
  margin-bottom: var(--space-xl);
  text-align: center;
  position: relative;
}

.scoring-section h2::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-gold), var(--accent-blue));
  border-radius: 2px;
}


.scoring-step {
  margin-bottom: var(--space-lg);
  padding: var(--space-lg);
  background: var(--bg-primary);
  border-radius: 12px;
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.scoring-step::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, var(--accent-gold), var(--accent-blue));
}

.scoring-step:hover {
  transform: translateX(4px);
  box-shadow: var(--shadow-md);
}

.scoring-step:last-child {
  margin-bottom: 0;
}

.scoring-step h3 {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  color: var(--primary-navy);
  margin-bottom: var(--space-md);
  font-weight: 600;
}

.scoring-step p {
  line-height: 1.7;
  color: var(--text-secondary);
  font-size: var(--fs-body);
}

/* 信頼性セクション */
.reliability-section {
  padding: 0 var(--space-md);
}

.reliability-section h2 {
  font-family: var(--font-heading);
  font-size: var(--fs-h2);
  color: var(--primary-navy);
  margin-bottom: var(--space-xl);
  text-align: center;
  position: relative;
}

.reliability-section h2::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-gold), var(--accent-blue));
  border-radius: 2px;
}

.reliability-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
}

.recommendation-note {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-md);
  border-radius: 16px;
  padding: var(--space-xl);
  position: relative;
  overflow: hidden;
  transition: all var(--transition-normal);

}

.recommendation-note:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}


.recommendation-note h3 {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  color: var(--primary-navy);
  margin-bottom: var(--space-md);
  font-weight: 600;
}

.recommendation-note p {
  line-height: 1.7;
  color: var(--text-secondary);
  margin: 0;
  font-size: var(--fs-body);
}

/* 関連リンク */
.related-links {
  padding: 0 var(--space-md);
}

.related-links h2 {
  font-family: var(--font-heading);
  font-size: var(--fs-h2);
  color: var(--primary-navy);
  margin-bottom: var(--space-xl);
  text-align: center;
  position: relative;
}

.related-links h2::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-gold), var(--accent-blue));
  border-radius: 2px;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

@media (max-width: 1024px) {
  .links-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

.link-card {
  background: var(--bg-primary);
  padding: var(--space-xl);
  border-radius: 16px;
  box-shadow: var(--shadow-md);
  text-decoration: none;
  color: inherit;
  transition: all var(--transition-normal);
  border: 1px solid var(--border-light);
  position: relative;
  overflow: hidden;
}

.link-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--accent-gold), var(--accent-blue));
  transform: translateY(-4px);
  transition: transform var(--transition-normal);
}

.link-card:hover::before {
  transform: translateY(0);
}

.link-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
  border-color: var(--accent-blue);
}

.link-card h3 {
  font-family: var(--font-heading);
  font-size: 1.125rem;
  color: var(--primary-navy);
  margin-bottom: var(--space-md);
  font-weight: 600;
}

.link-card p {
  line-height: 1.7;
  color: var(--text-secondary);
  margin: 0;
  font-size: var(--fs-body);
}

/* 質問選択肢表示 */

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .hero-section {
    padding: var(--space-xl) var(--space-md);
  }
  
  .hero-stats {
    gap: var(--space-lg);
  }
  
  .stat-number {
    font-size: 2rem;
  }

  .content-container {
    padding: 0 var(--space-sm);
  }

  .features-grid {
    grid-template-columns: 1fr;
    padding: 0;
  }

  .feature-card {
    padding: var(--space-lg);
  }

  .category-detail {
    padding: var(--space-lg);
  }

  .category-header {
    flex-direction: row;
    align-items: center;
    gap: var(--space-md);
  }

  .reliability-content {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }

  .reliability-point {
    padding: var(--space-lg);
  }

  .recommendation-note {
    padding: var(--space-lg);
  }

  .scoring-step {
    padding: var(--space-lg);
  }
  
  .scoring-explanation {
    padding: var(--space-lg);
  }
}

@media (max-width: 480px) {
  .hero-content {
    width: 95%;
  }

  .categories-section {
    padding: 0;
  }
  .features-grid {
    gap: var(--space-md);
  }

  .feature-card {
    padding: var(--space-md);
  }

  .category-detail {
    padding: var(--space-md);
  }

  .category-number {
    font-size: 0.95rem;
    min-width: 48px;
    padding: var(--space-xs) var(--space-sm);
  }

  .category-content h4 {
    padding-left: var(--space-sm);
  }

  .category-content h4::before {
    width: 3px;
    height: 16px;
  }

  .links-grid {
    grid-template-columns: 1fr;
  }

  .reliability-section {
    padding: 0;
  }

  .link-card {
    padding: var(--space-lg);
  }

  .question-options {
    padding: var(--space-md);
  }

  .option {
    padding: var(--space-sm) var(--space-md);
    font-size: 0.9375rem;
  }
}
</style>