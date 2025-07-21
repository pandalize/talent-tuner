<template>
  <div class="company-info">
    <div class="company-content">
      <h1>運営者情報</h1>
      
      <div class="info-section">
        <h2>サイト情報</h2>
        <div class="info-item">
          <dt>サイト名</dt>
          <dd>ため職 - 日本一ためになる正直なおすすめ職業診断</dd>
        </div>
        <div class="info-item">
          <dt>URL</dt>
          <dd>https://talent-tuner.com/</dd>
        </div>
        <div class="info-item">
          <dt>サービス内容</dt>
          <dd>職業適性診断サービスの提供</dd>
        </div>
      </div>
      
      <div class="info-section">
        <h2>運営者情報</h2>
        <div class="info-item">
          <dt>運営者</dt>
          <dd>ため職運営チーム</dd>
        </div>
        <div class="info-item">
          <dt>所在地</dt>
          <dd>日本</dd>
        </div>
        <div class="info-item">
          <dt>連絡先</dt>
          <dd><router-link to="/contact">お問い合わせフォーム</router-link>よりご連絡ください</dd>
        </div>
      </div>
      
      <div class="info-section">
        <h2>サービスについて</h2>
        <div class="service-description">
          <p>「ため職」は、ユーザーの皆様にとって真に「ためになる」職業選択のサポートを目指しています。</p>
          <p>以下の4つの観点から総合的に分析し、あなたに最適な職業を推薦します：</p>
          <ul>
            <li><strong>スキル（skill）</strong>：あなたの能力や得意分野</li>
            <li><strong>興味（interest）</strong>：やりがいや情熱を持てること</li>
            <li><strong>性格（priority）</strong>：価値観や人生の優先順位</li>
            <li><strong>考え方（balance）</strong>：ワークライフバランスや働き方の希望</li>
          </ul>
          <p>診断結果はあくまで参考情報であり、最終的な進路選択はご自身の判断で行ってください。</p>
        </div>
      </div>
      
      <div class="info-section">
        <h2>免責事項</h2>
        <div class="disclaimer">
          <p>当サイトの診断結果は、一般的な参考情報として提供しており、個人の具体的な状況や将来の成果を保証するものではありません。</p>
          <p>実際の進路選択や就職活動においては、家族や学校の先生、専門家のアドバイスを参考にし、総合的に判断してください。</p>
        </div>
      </div>
      
      <div class="info-section">
        <h2>著作権について</h2>
        <div class="copyright">
          <p>当サイトのコンテンツ（テキスト、画像、デザイン等）の著作権は、当サイト運営チームに帰属します。</p>
          <p>無断での複製、転載、修正、配布は禁止します。</p>
        </div>
      </div>
      
      <div class="update-date">
        <p>最終更新日：2025年7月21日</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 運営者情報ページ
</script>

<style scoped>
.company-info {
  width: 100%;
  padding: 2rem 1rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}

.company-content {
  width: 100%;
  max-width: 800px;
  background-color: var(--background-white);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
  line-height: 1.8;
}

.company-content h1 {
  color: var(--text-dark);
  text-align: center;
  margin-bottom: 2rem;
  font-size: clamp(20px, 4vw, 32px);
  font-weight: 600;
  border-bottom: 3px solid var(--main-color);
  padding-bottom: 1rem;
}

.info-section {
  margin-bottom: 3rem;
}

.info-section h2 {
  color: var(--main-color);
  font-size: clamp(16px, 3vw, 24px);
  margin-bottom: 1.5rem;
  font-weight: 600;
  border-left: 4px solid var(--main-color);
  padding-left: 1rem;
}

.info-item {
  display: flex;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.info-item dt {
  font-weight: 600;
  color: var(--text-dark);
  min-width: 120px;
  margin-right: 1rem;
  font-size: clamp(14px, 2vw, 16px);
}

.info-item dd {
  flex: 1;
  margin: 0;
  color: var(--text-dark);
  font-size: clamp(14px, 2vw, 16px);
}

.info-item a {
  color: var(--main-color);
  text-decoration: underline;
}

.info-item a:hover {
  color: var(--accent-coral);
}

.service-description,
.disclaimer,
.copyright {
  color: var(--text-dark);
}

.service-description p,
.disclaimer p,
.copyright p {
  margin-bottom: 1rem;
  font-size: clamp(14px, 2vw, 16px);
}

.service-description ul {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.service-description li {
  margin-bottom: 0.8rem;
  font-size: clamp(14px, 2vw, 16px);
}

.service-description strong {
  color: var(--main-color);
}

.disclaimer {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #ffc107;
}

.copyright {
  background-color: #f1f8ff;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid var(--main-color);
}

.update-date {
  text-align: right;
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}

.update-date p {
  color: #666;
  font-size: clamp(12px, 1.5vw, 14px);
  margin: 0;
}

@media (max-width: 768px) {
  .company-info {
    padding: 1rem 0.5rem;
  }
  
  .company-content {
    padding: 1.5rem;
  }
  
  .info-item {
    flex-direction: column;
  }
  
  .info-item dt {
    min-width: auto;
    margin-right: 0;
    margin-bottom: 0.25rem;
  }
}
</style>