<template>
  <div class="diagnosis-method-page">
    <!-- ヒーローセクション -->
    <div class="hero-section">
      <div class="hero-content">
        <div class="hero-badge">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
          </svg>
          診断システム
        </div>
        <h1 class="hero-title">科学的な適職診断メソッド</h1>
        <p class="hero-subtitle">
          心理学とデータサイエンスを融合した<br>
          精密な職業適性分析システム
        </p>
        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-number">4</div>
            <div class="stat-label">診断軸</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">4</div>
            <div class="stat-label">質問項目</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">8</div>
            <div class="stat-label">職業分野</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="content-container">
      <!-- システム特徴 -->
      <section class="features-section">
        <div class="section-header">
          <h2 class="section-title">診断システムの3つの特徴</h2>
          <p class="section-subtitle">最新の心理学理論に基づく、信頼性の高い職業適性診断</p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <h3 class="feature-title">多次元分析</h3>
            <p class="feature-description">
              スキル、興味、価値観、ライフスタイルの4つの観点から、
              あなたの職業適性を立体的に分析します。
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="feature-title">精密マッチング</h3>
            <p class="feature-description">
              各職業に対する重み付けスコアリングにより、
              あなたに最も適した職業を科学的に算出します。
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 class="feature-title">即時フィードバック</h3>
            <p class="feature-description">
              短時間の回答で即座に結果を生成。
              詳細な分析レポートをリアルタイムで提供します。
            </p>
          </div>
        </div>
      </section>

      <!-- 診断カテゴリー -->
      <section class="categories-section">
        <div class="section-header">
          <h2 class="section-title">4つの診断カテゴリー</h2>
          <p class="section-subtitle">各カテゴリーが職業適性の異なる側面を測定し、総合的な分析を実現</p>
        </div>
        
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
            <h4>実際の質問</h4>
            <p>「あなたの最も得意なスキルはどれですか？」</p>
            <div class="question-options">
              <span class="option">• 計画的かつ継続的に物事を進める集中力</span>
              <span class="option">• 人前で話したり、アイデアを分かりやすく伝える力</span>
              <span class="option">• 体力と器用さを活かした現場での実践的な作業</span>
              <span class="option">• 瞬時の判断力と大胆な行動力</span>
            </div>
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
            <h4>実際の質問</h4>
            <p>「あなたが最も興味を持つ活動はどれですか？」</p>
            <div class="question-options">
              <span class="option">• 論理的思考や分析を必要とする複雑な問題解決</span>
              <span class="option">• 創造性を活かして人を驚かせたり楽しませること</span>
              <span class="option">• 手を動かして実際に物を作ったり構築すること</span>
              <span class="option">• 市場やお金の動きを分析して投資判断すること</span>
            </div>
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
            <h4>実際の質問</h4>
            <p>「仕事で最も重視したいことは何ですか？」</p>
            <div class="question-options">
              <span class="option">• 専門的な知識とスキルを極めて、その道のプロになること</span>
              <span class="option">• 多くの人に影響を与え、注目される存在になること</span>
              <span class="option">• 社会に役立つものを作って、人々の生活を支えること</span>
              <span class="option">• 短期間で大きな利益を得て、経済的自由を手に入れること</span>
            </div>
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
            <h4>実際の質問</h4>
            <p>「理想的な働き方・ライフスタイルはどれですか？」</p>
            <div class="question-options">
              <span class="option">• 規則正しい生活リズムで、仕事とプライベートを明確に分ける</span>
              <span class="option">• 自分のペースで自由に働き、好きなことを仕事にする</span>
              <span class="option">• チームで協力しながら、大きなプロジェクトを達成する</span>
              <span class="option">• 高いリスクを取ってでも、大きなリターンを狙う</span>
            </div>
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

/* 特徴セクション */
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-lg);
  padding: 0 var(--space-md);
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

.scoring-explanation {
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary));
  border-radius: 16px;
  padding: var(--space-xl);
  border: 1px solid var(--border-light);
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

.reliability-point {
  background: var(--bg-primary);
  padding: var(--space-xl);
  border-radius: 16px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-light);
  transition: all var(--transition-normal);
}

.reliability-point:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.reliability-point h3 {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  margin-bottom: var(--space-md);
  font-weight: 600;
  color: var(--primary-navy);
}

.reliability-point ul {
  padding-left: var(--space-lg);
}

.reliability-point li {
  margin-bottom: var(--space-sm);
  line-height: 1.7;
  color: var(--text-secondary);
}

.reliability-point li::marker {
  color: var(--accent-blue);
}

.recommendation-note {
  background: linear-gradient(135deg, rgba(184, 134, 11, 0.05), rgba(52, 152, 219, 0.05));
  border: 1px solid var(--border-light);
  border-radius: 16px;
  padding: var(--space-xl);
  position: relative;
  overflow: hidden;
}

.recommendation-note::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--accent-gold), var(--accent-blue));
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
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-lg);
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
.question-options {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  margin: var(--space-md) 0;
  padding: var(--space-lg);
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary));
  border-radius: 12px;
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
}

.option {
  padding: var(--space-md);
  background: var(--bg-primary);
  border-radius: 8px;
  border: 1px solid var(--border-light);
  font-size: var(--fs-body);
  color: var(--text-secondary);
  line-height: 1.6;
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.option::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 4px;
  background: var(--accent-blue);
  transform: scaleY(0);
  transition: transform var(--transition-normal);
  transform-origin: bottom;
}

.option:hover {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(16, 185, 129, 0.05));
  border-color: var(--accent-blue);
  transform: translateX(4px);
  box-shadow: var(--shadow-md);
}

.option:hover::before {
  transform: scaleY(1);
}

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
    flex-direction: column;
    align-items: flex-start;
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
  
  .hero-stats {
    flex-direction: column;
    gap: var(--space-md);
  }
  
  .stat-item {
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }
  
  .stat-number {
    font-size: 1.75rem;
    margin-bottom: 0;
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