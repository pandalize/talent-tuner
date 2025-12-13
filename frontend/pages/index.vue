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
          <BaseCard variant="home">
            <template #number>01</template>
            <template #header>{{ $t('home.features.analysis.title') }}</template>
            {{ $t('home.features.analysis.description') }}
          </BaseCard>
          <BaseCard variant="home">
            <template #number>02</template>
            <template #header>{{ $t('home.features.evidence.title') }}</template>
            {{ $t('home.features.evidence.description') }}
          </BaseCard>
          <BaseCard variant="home">
            <template #number>03</template>
            <template #header>{{ $t('home.features.instant.title') }}</template>
            {{ $t('home.features.instant.description') }}
          </BaseCard>
        </div>

        <div class="aligned-button">
          <BaseButton
            variant="blue"
            size="md"
            @click="navigateTo('/diagnosis')"
          >
            {{ $t('home.cta.start_diagnosis') }}
          </BaseButton>
          <BaseButton
            variant="gold"
            size="md"
            @click="navigateTo('/chat')"
          >
            {{ $t('home.cta.ai_counseling') }}
          </BaseButton>
          <BaseButton
            variant="secondary"
            size="md"
            @click="navigateTo('/about')"
          >
            {{ $t('home.cta.view_professions') }}
          </BaseButton>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { navigateTo } from '#app'
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins.scss' as mixins;

.home-main {
  width: 100%;
  min-height: calc(100vh - 80px); // ヘッダー分を引く
  background: var(--bg-primary);
  display: flex;
  flex-direction: column;
}

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

.feature-grid {
  @include mixins.grid-auto-fit(250px);
  margin-bottom: var(--space-xl);
}

.aligned-button {
  display: flex;
  justify-content: center;
  gap: 20px;
}

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
}

@media (max-width: 480px) {
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

  .aligned-button {
    flex-direction: column;
    gap: var(--space-md);
  }
}
</style>