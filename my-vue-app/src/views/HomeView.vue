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
            <div class="feature-content">
              <h3 class="feature-title">{{ $t('home.features.analysis.title') }}</h3>
              <p class="feature-desc">{{ $t('home.features.analysis.description') }}</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-number">02</div>
            <div class="feature-content">
              <h3 class="feature-title">{{ $t('home.features.evidence.title') }}</h3>
              <p class="feature-desc">{{ $t('home.features.evidence.description') }}</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-number">03</div>
            <div class="feature-content">
              <h3 class="feature-title">{{ $t('home.features.instant.title') }}</h3>
              <p class="feature-desc">{{ $t('home.features.instant.description') }}</p>
            </div>
          </div>
        </div>

        <div class="aligned-button">
          <BaseButton
            variant="blue"
            size="md"
            @click="$router.push('/diagnosis')"
          >
            {{ $t('home.cta.start_diagnosis') }}
          </BaseButton>
          <BaseButton
            variant="gold"
            size="md"
            @click="$router.push('/chat')"
          >
            {{ $t('home.cta.ai_counseling') }}
          </BaseButton>
          <BaseButton
            variant="white"
            size="md"
            @click="$router.push('/about')"
          >
            {{ $t('home.cta.view_professions') }}
          </BaseButton>
        </div>

      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseButton from '@/components/BaseButton.vue'

const { t } = useI18n()
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins.scss' as mixins;

.aligned-button {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.home-main {
  width: 100%;
  min-height: calc(100vh - 80px); // ヘッダー分を引く
  background: var(--bg-primary);
  display: flex;
  flex-direction: column;
}

// ヒーローセクション
.hero-section {
  @include mixins.flex-center;
  flex: 1;
  min-height: 500px;
  padding: var(--space-xl) 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%);
  position: relative;
  overflow: hidden;
  
  // 動的な背景パターン（高さ・幅は固定）
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 30% 60%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.06) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(245, 158, 11, 0.04) 0%, transparent 50%);
    animation: float 25s ease-in-out infinite;
  }
  
  // 装飾的な幾何学模様（高さ・幅は固定）
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
    transform: none;
    opacity: 0.6;
  }
  25% { 
    transform: none;
    opacity: 0.8;
  }
  50% { 
    transform: none;
    opacity: 1;
  }
  75% { 
    transform: none;
    opacity: 0.8;
  }
}

@keyframes drift {
  0%, 100% { 
    transform: none;
  }
  33% { 
    transform: none;
  }
  66% { 
    transform: none;
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
  width: 100%;
  padding: var(--space-xl) var(--space-lg);
  text-align: center;
  position: relative;
  z-index: 1;
}

.hero-title {
  overflow-wrap: anywhere;
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
  .feature-item:hover,
  .feature-item:active {
    transform: none !important;
    box-shadow: none !important;
    border: none !important;
  }
  .feature-item:hover::before,
  .feature-item:active::before {
    opacity: 0 !important;
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
    height: 60vh !important;
  }
  .hero-section {
    height: 60vh !important;
    padding: var(--space-lg) 0;
  }

  .hero-content {
    padding: var(--space-lg) var(--space-sm);
    height: 60vh !important;
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