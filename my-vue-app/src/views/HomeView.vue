
<template>
  <main class="home-main">
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="hero-subtitle">{{ home.hero.subtitle() }}</span>
          {{ home.hero.title() }}
        </h1>
        <p class="hero-description">
          {{ home.hero.description() }}
        </p>

        <div class="feature-grid">
          <div class="feature-item">
            <div class="feature-number">01</div>
            <div class="feature-content">
              <h3 class="feature-title">{{ home.features.analysis.title() }}</h3>
              <p class="feature-desc">{{ home.features.analysis.description() }}</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-number">02</div>
            <div class="feature-content">
              <h3 class="feature-title">{{ home.features.evidence.title() }}</h3>
              <p class="feature-desc">{{ home.features.evidence.description() }}</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-number">03</div>
            <div class="feature-content">
              <h3 class="feature-title">{{ home.features.instant.title() }}</h3>
              <p class="feature-desc">{{ home.features.instant.description() }}</p>
            </div>
          </div>
        </div>

        <div class="action-buttons">
          <router-link to="/diagnosis" class="btn btn-primary">
            {{ home.cta.startDiagnosis() }}
          </router-link>
          <router-link to="/chat" class="btn btn-chat">
            {{ home.cta.aiCounseling() }}
          </router-link>
          <router-link to="/about" class="btn btn-secondary">
            {{ home.cta.viewProfessions() }}
          </router-link>
        </div>

        <div class="trust-indicators">
          <div class="trust-item">
            <svg class="trust-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
            <span>{{ home.trust.users('25,000') }}</span>
          </div>
          <div class="trust-item">
            <svg class="trust-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
            </svg>
            <span>{{ home.trust.updated('2025') }}</span>
          </div>
          <div class="trust-item">
            <svg class="trust-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            </svg>
            <span>{{ home.trust.privacy() }}</span>
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

<script setup lang="ts">
import { useTranslation } from '../composables/useTranslation'

// 翻訳ヘルパーを使用（型安全で短縮されたアクセス）
const { home, nav, common } = useTranslation()
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins.scss' as mixins;
// =====================================================
// Home Page - SCSS版
// =====================================================

.home-main {
  width: 100%;
  height: 380px;
  // min-height: 100vh;
  background: var(--bg-primary);
}

// ヒーローセクション
.hero-section {
  @include mixins.flex-center;
  min-height: 420px;
  height: 420px;
  padding: var(--space-xl) 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%);
  position: relative;
  overflow: hidden;
  
  // 動的な背景パターン
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 30% 60%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.06) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(245, 158, 11, 0.04) 0%, transparent 50%);
    animation: float 25s ease-in-out infinite;
  }
  
  // 装飾的な幾何学模様
  &::after {
    content: '';
    position: absolute;
    top: 10%;
    left: 10%;
    width: 100px;
    height: 100px;
    background: linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%);
    border-radius: 50%;
    animation: drift 20s ease-in-out infinite;
  }
}

// 新しいアニメーション
@keyframes float {
  0%, 100% { 
    transform: translateX(0) translateY(0) rotate(0deg);
    opacity: 0.6;
  }
  25% { 
    transform: translateX(20px) translateY(-10px) rotate(90deg);
    opacity: 0.8;
  }
  50% { 
    transform: translateX(-10px) translateY(-20px) rotate(180deg);
    opacity: 1;
  }
  75% { 
    transform: translateX(-20px) translateY(10px) rotate(270deg);
    opacity: 0.8;
  }
}

@keyframes drift {
  0%, 100% { 
    transform: translate(0, 0) scale(1);
  }
  33% { 
    transform: translate(30px, -20px) scale(1.1);
  }
  66% { 
    transform: translate(-20px, 20px) scale(0.9);
  }
}

@keyframes shimmer {
  0% { 
    background-position: -200% center; 
  }
  100% { 
    background-position: 200% center; 
  }
}

.hero-content {
  @include mixins.container;
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
  margin-bottom: var(--space-md);
  letter-spacing: -0.02em;
  line-height: 1.1;
  position: relative;
  
  // グラデーションテキスト効果
  background: linear-gradient(135deg, var(--primary-navy) 0%, var(--accent-blue) 50%, var(--primary-navy) 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s ease-in-out infinite;
  
  // テキストシャドウで深度を追加
  filter: drop-shadow(0 2px 4px rgba(26, 35, 50, 0.15));
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

// 特徴グリッド - 共通コンポーネントを使用
.feature-grid {
  @include mixins.grid-auto-fit(250px);
  margin-bottom: var(--space-xl);
}

.feature-item {
  @include mixins.card-base;
  @include mixins.card-padding(lg);
  @include mixins.card-shadow(sm);
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all var(--transition-normal);
  border: 1px solid rgba(59, 130, 246, 0.1);
  
  // グラデーションボーダー効果
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 2px;
    background: linear-gradient(135deg, var(--accent-blue), var(--accent-gold), var(--primary-blue));
    border-radius: inherit;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    opacity: 0;
    transition: opacity var(--transition-normal);
  }

  &:hover {
    @include mixins.card-shadow(lg);
    transform: translateY(-8px) scale(1.02);
    border-color: transparent;
    
    &::before {
      opacity: 1;
    }
  }
}

.feature-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  font-family: var(--font-mono);
  font-size: var(--fs-lg);
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, var(--accent-blue) 0%, var(--primary-blue) 100%);
  border-radius: var(--radius-round);
  margin-bottom: var(--space-md);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(135deg, var(--accent-blue), var(--accent-gold));
    border-radius: inherit;
    z-index: -1;
    opacity: 0;
    transition: opacity var(--transition-fast);
  }
  
  .feature-item:hover & {
    transform: scale(1.1) rotate(5deg);
    
    &::after {
      opacity: 0.3;
    }
  }
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
   レスポンシブデザイン - モバイル最適化
   ========================================================================== */
@media (max-width: 768px) {
  .hero-content {
    padding: var(--space-lg) var(--space-md);
  }

  .hero-title {
    font-size: 2rem;
    line-height: 1.1;
    margin-bottom: var(--space-sm);
  }

  .hero-subtitle {
    font-size: 1.125rem;
    margin-bottom: var(--space-xs);
  }

  .hero-description {
    display: none;
  }

  .feature-grid {
    grid-template-columns: 1fr;
    gap: 0;
    margin-top: var(--space-xs);
    margin-bottom: var(--space-sm);
  }

  .feature-item {
    padding: 0;
    background: transparent;
    border: none;
    box-shadow: none;
    min-height: auto;
    height: 50px;
    margin-bottom: 0;
  }

  .feature-number {
    width: 48px;
    height: 48px;
    font-size: 1.25rem;
  }

  .feature-title {
    font-size: 1.375rem;
    margin-bottom: var(--space-sm);
  }

  .feature-desc {
    font-size: 1rem;
    line-height: 1.3;
  }

  .action-buttons {
    display: flex;
    flex-direction: row;
    gap: var(--space-sm);
    align-items: center;
    justify-content: center;
    margin-bottom: var(--space-xl);
    flex-wrap: wrap;
  }

  // アクションボタンの間隔を確実に空ける
  .action-buttons > *:not(:last-child) {
    margin-right: var(--space-md, 1rem);
  }

  .btn {
    width: 130px;
    justify-content: center;
    padding: var(--space-md) var(--space-sm);
    font-size: 0.9rem;
    font-weight: 600;
    border-radius: 50px;
    border: 2px solid transparent;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    text-decoration: none;
    
    &.btn-primary {
      order: 1;
      background: linear-gradient(135deg, var(--accent-blue) 0%, var(--primary-blue) 100%);
      border: 2px solid var(--accent-blue);
      box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
      color: white;
      min-height: 48px;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(59, 130, 246, 0.5);
      }

      &:active {
        transform: translateY(0);
        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
      }
    }

    &.btn-chat {
      order: 2;
      background: linear-gradient(135deg, #fbbf24 0%, var(--accent-gold) 100%);
      border: 2px solid var(--accent-gold);
      color: var(--primary-navy);
      min-height: 48px;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 18px rgba(245, 158, 11, 0.4);
      }

      &:active {
        transform: translateY(0);
        box-shadow: 0 3px 10px rgba(245, 158, 11, 0.3);
      }
    }
    
    &.btn-secondary {
      display: none;
    }
  }

  .btn-icon {
    width: 24px;
    height: 24px;
  }

  .trust-indicators {
    display: none;
  }

  .methodology-section {
    display: none;
  }

  .section-container {
    width: 95%;
    padding: 0 var(--space-md);
  }

  .section-title {
    font-size: 1.75rem;
    margin-bottom: var(--space-lg);
  }

  .methodology-grid {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }

  .methodology-card {
    padding: var(--space-xl);
    border-radius: 16px;
    background: linear-gradient(135deg, var(--bg-primary) 0%, rgba(248, 250, 252, 0.95) 100%);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }

  .card-icon {
    width: 64px;
    height: 64px;
    margin-bottom: var(--space-lg);
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.08));
  }

  .methodology-card h3 {
    font-size: 1.25rem;
    margin-bottom: var(--space-md);
  }

  .methodology-card p {
    font-size: 1rem;
    line-height: 1.7;
  }
}

@media (max-width: 480px) {
  .action-buttons {
    gap: 20px !important;
  }
  .action-buttons > *:not(:last-child) {
    margin-right: unset !important;
  }

  .home-main {
    min-height: 60vh;
    height: auto;
  }
  .hero-section {
    min-height: 60vh;
    height: auto;
  }

  .hero-content {
    padding: var(--space-lg) var(--space-sm);
    min-height: 60vh;
  }

  .hero-title {
    font-size: 1.60rem;
    line-height: 1.1;
  }

  .feature-item {
    padding: var(--space-sm);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-md);
  }

  .feature-content {
    display: flex;
    flex-direction: column;
  }

  .feature-title {
    margin-bottom: var(--space-xs);
  }

  .feature-number {
    display: none;
  }

  .feature-title {
    font-size: 1.125rem;
  }

  .feature-desc {
    display: none;
  }


  .trust-indicators {
    flex-direction: column;
    align-items: center;
    gap: var(--space-sm);
  }

  .trust-item {
    font-size: 0.8125rem;
  }

  .methodology-card {
    padding: var(--space-lg);
  }

  .card-icon {
    width: 56px;
    height: 56px;
  }
}

/* タッチデバイス最適化 */
@media (hover: none) and (pointer: coarse) {
  .btn:hover {
    transform: none;
    box-shadow: initial;
  }

  .btn:active {
    transform: scale(0.98);
    transition: transform 0.1s ease;
  }

  .feature-item:hover {
    transform: none;
  }

  .feature-item:active {
    transform: scale(0.98);
    transition: transform 0.1s ease;
  }

  .methodology-card:hover {
    transform: none;
  }

  .methodology-card:active {
    transform: scale(0.98);
    transition: transform 0.1s ease;
  }
}
</style>