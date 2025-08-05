<template>
  <main class="home-main">
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="hero-subtitle">{{ $t('home.hero.subtitle') }}</span>
          {{ $t('home.hero.title') }}
        </h1>
        <p class="hero-description">
          {{ $t('home.hero.description') }}
        </p>
        
        <div class="feature-grid">
          <div class="feature-item">
            <div class="feature-number">01</div>
            <h3 class="feature-title">{{ $t('home.features.analysis.title') }}</h3>
            <p class="feature-desc">{{ $t('home.features.analysis.description') }}</p>
          </div>
          <div class="feature-item">
            <div class="feature-number">02</div>
            <h3 class="feature-title">{{ $t('home.features.evidence.title') }}</h3>
            <p class="feature-desc">{{ $t('home.features.evidence.description') }}</p>
          </div>
          <div class="feature-item">
            <div class="feature-number">03</div>
            <h3 class="feature-title">{{ $t('home.features.instant.title') }}</h3>
            <p class="feature-desc">{{ $t('home.features.instant.description') }}</p>
          </div>
        </div>

        <div class="action-buttons">
          <router-link to="/diagnosis" class="btn btn-primary">
            {{ $t('home.cta.start_diagnosis') }}
            <svg class="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </router-link>
          <router-link to="/chat" class="btn btn-chat">
            <svg class="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7A1,1 0 0,0 14,8H18A4,4 0 0,1 22,12V16A4,4 0 0,1 18,20H6A4,4 0 0,1 2,16V12A4,4 0 0,1 6,8H10A1,1 0 0,0 11,7V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A1.5,1.5 0 0,0 6,14.5A1.5,1.5 0 0,0 7.5,16A1.5,1.5 0 0,0 9,14.5A1.5,1.5 0 0,0 7.5,13M16.5,13A1.5,1.5 0 0,0 15,14.5A1.5,1.5 0 0,0 16.5,16A1.5,1.5 0 0,0 18,14.5A1.5,1.5 0 0,0 16.5,13Z" />
            </svg>
            {{ $t('home.cta.ai_counseling') }}
          </router-link>
          <router-link to="/about" class="btn btn-secondary">
            {{ $t('home.cta.view_professions') }}
          </router-link>
        </div>

        <div class="trust-indicators">
          <div class="trust-item">
            <svg class="trust-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
            <span>{{ $t('home.trust.users', { count: '25,000' }) }}</span>
          </div>
          <div class="trust-item">
            <svg class="trust-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
            </svg>
            <span>{{ $t('home.trust.updated', { year: '2025' }) }}</span>
          </div>
          <div class="trust-item">
            <svg class="trust-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            </svg>
            <span>{{ $t('home.trust.privacy') }}</span>
          </div>
        </div>
      </div>
    </div>

    <section class="methodology-section">
      <div class="section-container">
        <h2 class="section-title">診断の特徴</h2>
        <div class="methodology-grid">
          <div class="methodology-card">
            <div class="card-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M9 17H7a2 2 0 01-2-2V7a2 2 0 012-2h2m10 10h2a2 2 0 002-2V7a2 2 0 00-2-2h-2m-5-3v18m-4-8h8"/>
              </svg>
            </div>
            <h3>包括的な評価基準</h3>
            <p>個人の能力、興味、価値観、ワークライフバランスを総合的に分析し、最適な職業を提案します。</p>
          </div>
          <div class="methodology-card">
            <div class="card-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <h3>データに基づく分析</h3>
            <p>統計的手法と心理測定学の理論を応用し、信頼性の高い診断結果を提供します。</p>
          </div>
          <div class="methodology-card">
            <div class="card-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3>迅速な診断プロセス</h3>
            <p>厳選された質問により、短時間で精度の高い診断を実現。忙しい方にも最適です。</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* ==========================================================================
   ホームページ - 知的でプロフェッショナルなデザイン
   ========================================================================== */

/* メインコンテナ */
.home-main {
  width: 100%;
  min-height: 100vh;
  background: var(--bg-primary);
}

/* ==========================================================================
   ヒーローセクション
   ========================================================================== */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
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
  background: radial-gradient(circle, rgba(52, 152, 219, 0.03) 0%, transparent 70%);
  animation: pulse 20s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.hero-content {
  max-width: 1200px;
  width: 90%;
  padding: var(--space-xl) var(--space-lg);
  text-align: center;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-family: var(--font-heading);
  font-size: var(--fs-h1);
  font-weight: 700;
  color: var(--primary-navy);
  margin-bottom: var(--space-sm);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.hero-subtitle {
  display: block;
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 400;
  color: var(--text-secondary);
  margin-bottom: var(--space-xs);
  letter-spacing: 0.05em;
}

.hero-description {
  font-size: var(--fs-body);
  color: var(--text-secondary);
  margin-bottom: var(--space-xl);
  line-height: 1.8;
}

/* ==========================================================================
   特徴グリッド
   ========================================================================== */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
}

.feature-item {
  background: var(--bg-primary);
  padding: var(--space-lg);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  border: 1px solid var(--border-light);
}

.feature-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.feature-number {
  font-family: var(--font-mono);
  font-size: var(--fs-small);
  color: var(--accent-blue);
  font-weight: 500;
  margin-bottom: var(--space-xs);
}

.feature-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  color: var(--primary-navy);
  margin-bottom: var(--space-xs);
  font-weight: 600;
}

.feature-desc {
  font-size: var(--fs-small);
  color: var(--text-secondary);
  line-height: 1.6;
}

/* ==========================================================================
   アクションボタン
   ========================================================================== */
.action-buttons {
  display: flex;
  gap: var(--space-md);
  justify-content: center;
  margin-bottom: var(--space-xl);
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-lg);
  font-size: var(--fs-body);
  font-weight: 500;
  text-decoration: none;
  border-radius: 6px;
  transition: all var(--transition-fast);
  cursor: pointer;
  border: 2px solid transparent;
}

.btn-primary {
  background: var(--primary-navy);
  color: white;
  border-color: var(--primary-navy);
}

.btn-primary:hover {
  background: var(--primary-blue);
  border-color: var(--primary-blue);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  background: transparent;
  color: var(--primary-navy);
  border-color: var(--primary-navy);
}

.btn-secondary:hover {
  background: var(--primary-navy);
  color: white;
}

.btn-chat {
  background: var(--accent-blue);
  color: white;
  border-color: var(--accent-blue);
}

.btn-chat:hover {
  background: var(--primary-blue);
  border-color: var(--primary-blue);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-icon {
  transition: transform var(--transition-fast);
}

.btn:hover .btn-icon {
  transform: translateX(4px);
}

/* ==========================================================================
   信頼性指標
   ========================================================================== */
.trust-indicators {
  display: flex;
  gap: var(--space-lg);
  justify-content: center;
  flex-wrap: wrap;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: var(--fs-small);
  color: var(--text-secondary);
}

.trust-icon {
  color: var(--accent-gold);
}

/* ==========================================================================
   方法論セクション
   ========================================================================== */
.methodology-section {
  padding: var(--space-xxl) 0;
  background: var(--bg-secondary);
}

.section-container {
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
}

.section-title {
  font-family: var(--font-heading);
  font-size: var(--fs-h2);
  color: var(--primary-navy);
  text-align: center;
  margin-bottom: var(--space-xl);
  font-weight: 600;
}

.methodology-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-lg);
}

.methodology-card {
  background: var(--bg-primary);
  padding: var(--space-lg);
  border-radius: 8px;
  text-align: center;
  transition: all var(--transition-normal);
  border: 1px solid var(--border-light);
}

.methodology-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: var(--bg-secondary);
  border-radius: 50%;
  margin-bottom: var(--space-md);
  color: var(--primary-navy);
}

.methodology-card h3 {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  color: var(--primary-navy);
  margin-bottom: var(--space-sm);
  font-weight: 600;
}

.methodology-card p {
  font-size: var(--fs-body);
  color: var(--text-secondary);
  line-height: 1.6;
}

/* ==========================================================================
   レスポンシブデザイン - タブレット (768px以下)
   ========================================================================== */
@media (max-width: 768px) {
  .hero-section {
    min-height: auto;
    padding: var(--space-lg) 0;
  }

  .hero-content {
    padding: var(--space-lg) var(--space-md);
  }

  .hero-title {
    font-size: clamp(1.75rem, 5vw, 2.5rem);
  }

  .feature-grid {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }

  .action-buttons {
    flex-direction: column;
    width: 100%;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .trust-indicators {
    gap: var(--space-md);
  }

  .methodology-grid {
    grid-template-columns: 1fr;
  }
}

/* ==========================================================================
   レスポンシブデザイン - スマートフォン (480px以下)
   ========================================================================== */
@media (max-width: 480px) {
  /* ヒーローセクション調整 */
  .hero-section {
    padding: var(--space-md) 0;
  }

  .hero-content {
    padding: var(--space-md) var(--space-sm);
    width: 95%;
  }

  .hero-title {
    font-size: 1.75rem;
    margin-bottom: var(--space-xs);
  }

  .hero-subtitle {
    font-size: 0.875rem;
    letter-spacing: 0.02em;
  }

  .hero-description {
    font-size: 0.9375rem;
    margin-bottom: var(--space-lg);
  }

  .hero-description br {
    display: none;
  }

  /* 特徴カード調整 */
  .feature-grid {
    gap: var(--space-sm);
    margin-bottom: var(--space-lg);
  }

  .feature-item {
    padding: var(--space-md);
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .feature-number {
    font-size: 0.75rem;
  }

  .feature-title {
    font-size: 1.125rem;
  }

  .feature-desc {
    font-size: 0.875rem;
    line-height: 1.5;
  }

  /* ボタン調整 */
  .action-buttons {
    gap: var(--space-sm);
    margin-bottom: var(--space-lg);
  }

  .btn {
    padding: var(--space-sm) var(--space-md);
    font-size: 1rem;
    border-radius: 8px;
  }

  .btn-icon {
    width: 16px;
    height: 16px;
  }

  /* 信頼性指標調整 */
  .trust-indicators {
    gap: var(--space-sm);
    flex-direction: column;
    align-items: center;
  }

  .trust-item {
    font-size: 0.8125rem;
  }

  .trust-icon {
    width: 14px;
    height: 14px;
  }

  /* 方法論セクション調整 */
  .methodology-section {
    padding: var(--space-xl) 0;
  }

  .section-title {
    font-size: 1.5rem;
    margin-bottom: var(--space-lg);
  }

  .methodology-card {
    padding: var(--space-md);
  }

  .card-icon {
    width: 60px;
    height: 60px;
    margin-bottom: var(--space-sm);
  }

  .card-icon svg {
    width: 30px;
    height: 30px;
  }

  .methodology-card h3 {
    font-size: 1.125rem;
  }

  .methodology-card p {
    font-size: 0.875rem;
  }
}

/* ==========================================================================
   レスポンシブデザイン - 極小画面 (375px以下)
   ========================================================================== */
@media (max-width: 375px) {
  .hero-title {
    font-size: 1.5rem;
  }

  .hero-subtitle {
    font-size: 0.8125rem;
  }

  .feature-item {
    padding: var(--space-sm);
  }

  .btn {
    font-size: 0.9375rem;
    padding: 0.75rem var(--space-md);
  }
}

/* ==========================================================================
   モバイルファースト最適化
   ========================================================================== */
@media (hover: none) and (pointer: coarse) {
  /* タッチデバイス向けの調整 */
  .feature-item:hover,
  .methodology-card:hover {
    transform: none;
    box-shadow: var(--shadow-sm);
  }

  .btn {
    -webkit-tap-highlight-color: transparent;
  }

  .btn:active {
    transform: scale(0.98);
  }

  /* スクロールパフォーマンス向上 */
  .hero-section::before {
    animation: none;
  }
}
</style>