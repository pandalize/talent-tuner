<template>
  <div class="theory-page">
    <div class="hero-section">
      <h1>適性診断の理論と背景</h1>
      <p class="hero-subtitle">心理学と統計学に基づく職業適性診断の科学的根拠を詳しく解説</p>
    </div>
    
    <div class="content-container">
      <!-- 適性診断の歴史 -->
      <section class="history-section">
        <h2>適性診断の歴史と発展</h2>
        <div class="timeline-history">
          <div class="history-item">
            <div class="year">1900年代初期</div>
            <div class="content">
              <h3>心理測定学の誕生</h3>
              <p>フランシス・ガルトンとアルフレッド・ビネーらにより個人差の測定方法が確立され、心理学的測定の基礎が築かれました。</p>
            </div>
          </div>
          <div class="history-item">
            <div class="year">1917年</div>
            <div class="content">
              <h3>軍事用適性検査の開発</h3>
              <p>第一次世界大戦中にアメリカ軍が兵士の配置のための適性検査を開発。大規模な心理検査の実用化が始まりました。</p>
            </div>
          </div>
          <div class="history-item">
            <div class="year">1930年代</div>
            <div class="content">
              <h3>職業興味測定の確立</h3>
              <p>E.K.ストロングが職業興味検査を開発し、個人の興味と職業選択の関連性が科学的に研究されるようになりました。</p>
            </div>
          </div>
          <div class="history-item">
            <div class="year">1950年代</div>
            <div class="content">
              <h3>多因子理論の発達</h3>
              <p>ジョン・ホランドの職業選択理論など、複数の要因を組み合わせた包括的な適性理論が発展しました。</p>
            </div>
          </div>
          <div class="history-item">
            <div class="year">現在</div>
            <div class="content">
              <h3>AI・統計学の活用</h3>
              <p>機械学習と大規模データ分析により、より精密で個人化された適性診断が可能になっています。</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 理論的基盤 -->
      <section class="theory-section">
        <h2>適性診断の理論的基盤</h2>
        
        <div class="theory-grid">
          <div class="theory-card">
            <h3>ホランドの職業選択理論</h3>
            <div class="theory-content">
              <h4>6つの職業興味タイプ</h4>
              <div class="holland-types">
                <div class="holland-type">
                  <span class="type-label">R</span>
                  <div class="type-info">
                    <strong>現実的（Realistic）</strong>
                    <p>具体的・実用的な作業を好む</p>
                  </div>
                </div>
                <div class="holland-type">
                  <span class="type-label">I</span>
                  <div class="type-info">
                    <strong>研究的（Investigative）</strong>
                    <p>知的・分析的な活動を好む</p>
                  </div>
                </div>
                <div class="holland-type">
                  <span class="type-label">A</span>
                  <div class="type-info">
                    <strong>芸術的（Artistic）</strong>
                    <p>創造的・表現的な活動を好む</p>
                  </div>
                </div>
                <div class="holland-type">
                  <span class="type-label">S</span>
                  <div class="type-info">
                    <strong>社会的（Social）</strong>
                    <p>人との関わりを重視する</p>
                  </div>
                </div>
                <div class="holland-type">
                  <span class="type-label">E</span>
                  <div class="type-info">
                    <strong>企業的（Enterprising）</strong>
                    <p>リーダーシップを発揮したい</p>
                  </div>
                </div>
                <div class="holland-type">
                  <span class="type-label">C</span>
                  <div class="type-info">
                    <strong>慣習的（Conventional）</strong>
                    <p>組織的・規則的な作業を好む</p>
                  </div>
                </div>
              </div>
              <p class="theory-description">
                ホランドは個人の職業興味が6つのタイプに分類でき、それぞれに適した職業環境があると提唱しました。現代の適性診断の多くがこの理論をベースにしています。
              </p>
            </div>
          </div>

          <div class="theory-card">
            <h3>多重知能理論</h3>
            <div class="theory-content">
              <h4>ハワード・ガードナーの8つの知能</h4>
              <ul class="intelligence-list">
                <li><strong>言語的知能</strong> - 言葉や文章を理解・使用する能力</li>
                <li><strong>論理数学的知能</strong> - 数字や論理的思考を扱う能力</li>
                <li><strong>空間的知能</strong> - 空間や視覚的情報を処理する能力</li>
                <li><strong>身体運動的知能</strong> - 身体を使って表現・問題解決する能力</li>
                <li><strong>音楽的知能</strong> - 音楽やリズムを理解・創造する能力</li>
                <li><strong>対人知能</strong> - 他者の気持ちや動機を理解する能力</li>
                <li><strong>内省的知能</strong> - 自分自身を理解・内省する能力</li>
                <li><strong>自然親和的知能</strong> - 自然や生物を理解・分類する能力</li>
              </ul>
              <p class="theory-description">
                従来のIQテストでは測れない多様な知能があることを示し、個人の強みをより包括的に評価する重要性を示しました。
              </p>
            </div>
          </div>

          <div class="theory-card">
            <h3>パーソナリティ理論</h3>
            <div class="theory-content">
              <h4>ビッグファイブ理論</h4>
              <div class="big-five">
                <div class="factor">
                  <strong>開放性（Openness）</strong>
                  <p>新しい経験や創造的活動への興味</p>
                </div>
                <div class="factor">
                  <strong>誠実性（Conscientiousness）</strong>
                  <p>責任感や自己統制の程度</p>
                </div>
                <div class="factor">
                  <strong>外向性（Extraversion）</strong>
                  <p>社交性や積極性のレベル</p>
                </div>
                <div class="factor">
                  <strong>協調性（Agreeableness）</strong>
                  <p>他者への共感や協力的態度</p>
                </div>
                <div class="factor">
                  <strong>神経症的傾向（Neuroticism）</strong>
                  <p>ストレスや不安への敏感さ</p>
                </div>
              </div>
              <p class="theory-description">
                パーソナリティの5つの基本次元が職業適性や職場での成功に大きく影響することが実証されています。
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 測定方法と統計学 -->
      <section class="measurement-section">
        <h2>測定方法と統計学的根拠</h2>
        
        <div class="measurement-content">
          <div class="method-explanation">
            <h3>標準化された測定手法</h3>
            <div class="method-grid">
              <div class="method-item">
                <h4>信頼性（Reliability）</h4>
                <p>同じ人が同じ条件で測定を受けた場合、一貫した結果が得られる程度を示します。</p>
                <div class="stats-box">
                  <span class="stat-label">内的一貫性係数</span>
                  <span class="stat-value">α = 0.85以上</span>
                </div>
                <div class="stats-box">
                  <span class="stat-label">再測定信頼性</span>
                  <span class="stat-value">r = 0.80以上</span>
                </div>
              </div>
              
              <div class="method-item">
                <h4>妥当性（Validity）</h4>
                <p>測定したい特性を正確に測定できているかを示す指標です。</p>
                <div class="stats-box">
                  <span class="stat-label">基準関連妥当性</span>
                  <span class="stat-value">r = 0.60以上</span>
                </div>
                <div class="stats-box">
                  <span class="stat-label">構成概念妥当性</span>
                  <span class="stat-value">CFI > 0.95</span>
                </div>
              </div>
            </div>
          </div>

          <div class="statistical-methods">
            <h3>使用される統計手法</h3>
            <div class="stats-grid">
              <div class="stats-method">
                <h4>因子分析</h4>
                <p>多数の質問項目から潜在的な因子（適性の次元）を抽出し、測定の構造を明確化します。</p>
                <div class="formula">
                  <code>X = Λf + ε</code>
                  <small>X: 観測変数, Λ: 因子負荷, f: 因子, ε: 誤差</small>
                </div>
              </div>
              
              <div class="stats-method">
                <h4>回帰分析</h4>
                <p>個人の回答パターンから職業適性スコアを予測するモデルを構築します。</p>
                <div class="formula">
                  <code>Y = β₀ + β₁X₁ + β₂X₂ + ... + βₙXₙ + ε</code>
                  <small>Y: 適性スコア, β: 回帰係数, X: 説明変数</small>
                </div>
              </div>
              
              <div class="stats-method">
                <h4>クラスター分析</h4>
                <p>類似した回答パターンを持つ個人をグループ化し、職業適性のタイプを特定します。</p>
                <div class="formula">
                  <code>d(i,j) = √Σ(xᵢₖ - xⱼₖ)²</code>
                  <small>d: 距離, x: 個人iとjの特性値</small>
                </div>
              </div>
              
              <div class="stats-method">
                <h4>機械学習</h4>
                <p>大量のデータから複雑なパターンを学習し、予測精度を向上させます。</p>
                <div class="algorithm-list">
                  <span class="algorithm">ランダムフォレスト</span>
                  <span class="algorithm">サポートベクターマシン</span>
                  <span class="algorithm">ニューラルネットワーク</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 精度と限界 -->
      <section class="accuracy-section">
        <h2>診断精度と科学的限界</h2>
        
        <div class="accuracy-content">
          <div class="accuracy-stats">
            <h3>適性診断の予測精度</h3>
            <div class="prediction-grid">
              <div class="prediction-item">
                <h4>職業満足度の予測</h4>
                <div class="accuracy-bar">
                  <div class="accuracy-fill" style="width: 68%">68%</div>
                </div>
                <p>適性の高い職業への従事者は、そうでない場合と比較して68%高い職業満足度を示す</p>
              </div>
              
              <div class="prediction-item">
                <h4>職業継続率の予測</h4>
                <div class="accuracy-bar">
                  <div class="accuracy-fill" style="width: 75%">75%</div>
                </div>
                <p>適性診断に基づいた職業選択では、3年後の継続率が75%に向上</p>
              </div>
              
              <div class="prediction-item">
                <h4>パフォーマンス予測</h4>
                <div class="accuracy-bar">
                  <div class="accuracy-fill" style="width: 62%">62%</div>
                </div>
                <p>適性の高い職業では、業務パフォーマンスが平均より62%高くなる傾向</p>
              </div>
            </div>
          </div>

          <div class="limitations">
            <h3>科学的限界と注意点</h3>
            <div class="limitation-grid">
              <div class="limitation-item">
                <div class="limitation-icon">⚠️</div>
                <h4>文化・時代的バイアス</h4>
                <p>診断ツールは特定の文化圏・時代背景で開発されるため、普遍的な適用には限界があります。定期的な更新と文化適応が必要です。</p>
              </div>
              
              <div class="limitation-item">
                <div class="limitation-icon">📊</div>
                <h4>統計的な一般化</h4>
                <p>個人の特性は統計的平均から導出されるため、例外的なケースや個人の独自性を完全には捉えられません。</p>
              </div>
              
              <div class="limitation-item">
                <div class="limitation-icon">🔄</div>
                <h4>発達・変化への対応</h4>
                <p>人の興味や能力は年齢とともに変化するため、一度の診断結果を永続的な指標として使用すべきではありません。</p>
              </div>
              
              <div class="limitation-item">
                <div class="limitation-icon">🌍</div>
                <h4>環境要因の影響</h4>
                <p>経済状況、技術の進歩、社会情勢の変化などの外部要因は診断モデルに十分に反映されていない場合があります。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 今後の発展 -->
      <section class="future-section">
        <h2>適性診断の今後の発展</h2>
        
        <div class="future-content">
          <div class="future-trends">
            <h3>技術的進歩</h3>
            <div class="trend-grid">
              <div class="trend-item">
                <h4>🧠 AIとディープラーニング</h4>
                <p>より複雑なパターン認識により、個人の潜在能力や隠れた適性をより正確に発見できるようになります。</p>
              </div>
              
              <div class="trend-item">
                <h4>📱 リアルタイム分析</h4>
                <p>日常的な行動データやパフォーマンスデータを活用し、継続的に適性を更新・調整する仕組みが普及します。</p>
              </div>
              
              <div class="trend-item">
                <h4>🔬 神経科学の応用</h4>
                <p>脳科学の知見を活用し、認知的特性や情報処理パターンをより客観的に測定する技術が発展します。</p>
              </div>
              
              <div class="trend-item">
                <h4>🌐 ビッグデータ活用</h4>
                <p>大規模な職業データベースと個人データを照合し、より精密で現実的な適性予測が可能になります。</p>
              </div>
            </div>
          </div>

          <div class="ethical-considerations">
            <h3>倫理的課題と対応</h3>
            <div class="ethics-list">
              <div class="ethics-item">
                <h4>プライバシー保護</h4>
                <p>個人の心理的特性データの取り扱いには厳格なプライバシー保護措置が必要です。</p>
              </div>
              
              <div class="ethics-item">
                <h4>差別防止</h4>
                <p>診断結果が不当な差別や機会の制限につながらないよう、公正性の確保が重要です。</p>
              </div>
              
              <div class="ethics-item">
                <h4>透明性の向上</h4>
                <p>診断の仕組みや限界について、利用者への十分な説明と理解促進が必要です。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 関連リンク -->
      <section class="related-links">
        <h2>関連情報</h2>
        <div class="links-grid">
          <router-link to="/diagnosis-method" class="link-card">
            <h3>📊 診断方法について</h3>
            <p>実際の診断システムの詳細解説</p>
          </router-link>
          <router-link to="/result-guide" class="link-card">
            <h3>📈 結果の活用ガイド</h3>
            <p>診断結果を実際に活用する方法</p>
          </router-link>
          <router-link to="/career-guide" class="link-card">
            <h3>🎯 キャリアガイド</h3>
            <p>職業選択の総合的なガイダンス</p>
          </router-link>
          <router-link to="/diagnosis" class="link-card">
            <h3>🚀 診断を受ける</h3>
            <p>理論を理解したら実際に診断を体験</p>
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

// メタタグの設定
onMounted(() => {
  document.title = '適性診断の理論と背景｜ため職 - 心理学・統計学に基づく科学的根拠の詳細解説'
  
  // メタディスクリプション
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', '適性診断の科学的根拠を詳細解説。ホランド理論、多重知能理論、統計学的手法、診断精度、今後の技術発展まで、職業適性診断の理論的背景を専門的に説明します。')
  }
})
</script>

<style scoped>
.theory-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  background-color: var(--background-white, #fff);
}

.hero-section {
  text-align: center;
  padding: 3rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
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

/* 歴史セクション */
.timeline-history {
  position: relative;
  padding-left: 2rem;
}

.timeline-history::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--main-color, #5f90b2);
}

.history-item {
  position: relative;
  margin-bottom: 3rem;
  display: flex;
  align-items: flex-start;
  gap: 2rem;
}

.history-item::before {
  content: '';
  position: absolute;
  left: -2.7rem;
  top: 1rem;
  width: 12px;
  height: 12px;
  background: var(--main-color, #5f90b2);
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 0 0 3px var(--main-color, #5f90b2);
}

.year {
  background: var(--main-color, #5f90b2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  min-width: 120px;
  text-align: center;
  font-size: 14px;
}

.history-item .content {
  flex: 1;
  background: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
}

.history-item h3 {
  font-size: clamp(16px, 2.5vw, 20px);
  color: var(--text-dark, #333);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.history-item p {
  line-height: 1.6;
  color: var(--text-medium, #666);
  margin: 0;
}

/* 理論セクション */
.theory-grid {
  display: grid;
  gap: 2rem;
}

.theory-card {
  background: #fff;
  border-radius: 15px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border-left: 5px solid var(--main-color, #5f90b2);
}

.theory-card h3 {
  font-size: clamp(20px, 3vw, 26px);
  color: var(--text-dark, #333);
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.theory-content h4 {
  font-size: clamp(16px, 2.5vw, 20px);
  color: var(--text-dark, #333);
  margin: 1.5rem 0 1rem 0;
  font-weight: 600;
}

.holland-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.holland-type {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 10px;
}

.type-label {
  background: var(--main-color, #5f90b2);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
}

.type-info strong {
  display: block;
  color: var(--text-dark, #333);
  margin-bottom: 0.25rem;
}

.type-info p {
  margin: 0;
  color: var(--text-medium, #666);
  font-size: 14px;
}

.intelligence-list {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
}

.intelligence-list li {
  padding: 0.8rem;
  margin-bottom: 0.5rem;
  background: #f8fafc;
  border-radius: 8px;
  border-left: 3px solid var(--main-color, #5f90b2);
}

.intelligence-list strong {
  color: var(--text-dark, #333);
}

.big-five {
  display: grid;
  gap: 1rem;
  margin: 1.5rem 0;
}

.factor {
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  border-left: 3px solid var(--main-color, #5f90b2);
}

.factor strong {
  display: block;
  color: var(--text-dark, #333);
  margin-bottom: 0.5rem;
}

.factor p {
  margin: 0;
  color: var(--text-medium, #666);
}

.theory-description {
  line-height: 1.7;
  color: var(--text-medium, #666);
  margin-top: 1.5rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  border-left: 3px solid var(--main-color, #5f90b2);
}

/* 測定方法セクション */
.measurement-content {
  display: grid;
  gap: 3rem;
}

.method-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

.method-item {
  background: #fff;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
}

.method-item h4 {
  font-size: clamp(16px, 2.5vw, 20px);
  color: var(--text-dark, #333);
  margin-bottom: 1rem;
  font-weight: 600;
}

.method-item p {
  line-height: 1.6;
  color: var(--text-medium, #666);
  margin-bottom: 1.5rem;
}

.stats-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  background: #f8fafc;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: var(--text-dark, #333);
  font-weight: 500;
}

.stat-value {
  background: var(--main-color, #5f90b2);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-weight: 600;
  font-family: monospace;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

.stats-method {
  background: #fff;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
}

.stats-method h4 {
  font-size: clamp(16px, 2.5vw, 20px);
  color: var(--text-dark, #333);
  margin-bottom: 1rem;
  font-weight: 600;
}

.stats-method p {
  line-height: 1.6;
  color: var(--text-medium, #666);
  margin-bottom: 1rem;
}

.formula {
  background: #2d3748;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  margin-bottom: 0.5rem;
}

.formula code {
  font-size: 16px;
  display: block;
  margin-bottom: 0.5rem;
}

.formula small {
  color: #a0aec0;
  font-size: 12px;
}

.algorithm-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.algorithm {
  background: var(--main-color, #5f90b2);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 500;
}

/* 精度セクション */
.accuracy-content {
  display: grid;
  gap: 3rem;
}

.prediction-grid {
  display: grid;
  gap: 2rem;
  margin-top: 1.5rem;
}

.prediction-item {
  background: #fff;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
}

.prediction-item h4 {
  font-size: clamp(16px, 2.5vw, 20px);
  color: var(--text-dark, #333);
  margin-bottom: 1rem;
  font-weight: 600;
}

.accuracy-bar {
  background: #f0f0f0;
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 1rem;
  position: relative;
}

.accuracy-fill {
  background: linear-gradient(90deg, var(--main-color, #5f90b2), #4a90e2);
  height: 100%;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 15px;
  color: white;
  font-weight: 600;
  transition: width 2s ease-in-out;
}

.prediction-item p {
  line-height: 1.6;
  color: var(--text-medium, #666);
  margin: 0;
}

.limitation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

.limitation-item {
  background: #fff;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  text-align: center;
}

.limitation-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.limitation-item h4 {
  font-size: clamp(16px, 2.5vw, 20px);
  color: var(--text-dark, #333);
  margin-bottom: 1rem;
  font-weight: 600;
}

.limitation-item p {
  line-height: 1.6;
  color: var(--text-medium, #666);
  margin: 0;
}

/* 今後の発展セクション */
.future-content {
  display: grid;
  gap: 3rem;
}

.trend-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

.trend-item {
  background: #fff;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
}

.trend-item h4 {
  font-size: clamp(16px, 2.5vw, 20px);
  color: var(--text-dark, #333);
  margin-bottom: 1rem;
  font-weight: 600;
}

.trend-item p {
  line-height: 1.6;
  color: var(--text-medium, #666);
  margin: 0;
}

.ethics-list {
  display: grid;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.ethics-item {
  background: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  border-left: 4px solid #f39c12;
}

.ethics-item h4 {
  font-size: clamp(16px, 2.5vw, 18px);
  color: var(--text-dark, #333);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.ethics-item p {
  line-height: 1.6;
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
  .theory-page {
    padding: 1rem;
  }

  .hero-section {
    padding: 2rem 1rem;
    margin-bottom: 2rem;
  }

  section {
    margin-bottom: 3rem;
  }

  .timeline-history {
    padding-left: 0;
  }

  .timeline-history::before {
    display: none;
  }

  .history-item {
    flex-direction: column;
    gap: 1rem;
  }

  .history-item::before {
    display: none;
  }

  .year {
    align-self: flex-start;
  }

  .theory-card {
    padding: 2rem;
  }

  .holland-types {
    grid-template-columns: 1fr;
  }

  .method-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .prediction-grid {
    grid-template-columns: 1fr;
  }

  .limitation-grid {
    grid-template-columns: 1fr;
  }

  .trend-grid {
    grid-template-columns: 1fr;
  }

  .links-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .method-item {
    padding: 1.5rem;
  }

  .stats-method {
    padding: 1.5rem;
  }

  .prediction-item {
    padding: 1.5rem;
  }

  .limitation-item {
    padding: 1.5rem;
  }

  .trend-item {
    padding: 1.5rem;
  }

  .ethics-item {
    padding: 1rem;
  }
}
</style>