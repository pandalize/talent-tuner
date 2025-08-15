<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AppFooter from './components/AppFooter.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'

const { t } = useI18n()
</script>

<template>
  <div id="app">
    <header class="app-header">
      <!-- ロゴ部分 -->
      <RouterLink to="/" class="logo">
        <span class="logo-main">ため職</span>
        <span class="logo-sub">Professional Career Assessment</span>
      </RouterLink>

      <!-- ナビゲーション -->
      <nav class="main-nav">
        <RouterLink to="/" class="nav-item">{{ $t('nav.home') }}</RouterLink>
        <RouterLink to="/diagnosis" class="nav-item">{{ $t('nav.diagnosis') }}</RouterLink>
        <RouterLink to="/about" class="nav-item">{{ $t('nav.about') }}</RouterLink>
        <RouterLink to="/career-guide" class="nav-item">{{ $t('nav.career_guide') }}</RouterLink>
        <RouterLink to="/diagnosis-method" class="nav-item">診断について</RouterLink>
      </nav>

      <!-- 言語切り替え -->
      <div class="header-controls">
        <LanguageSwitcher />
      </div>
    </header>
    
    <main class="app-content">
      <RouterView />
    </main>
    
    <AppFooter />
  </div>
</template>

<style>
/* ==========================================================================
   グローバルスタイル & リセット
   ========================================================================== */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden; /* 横スクロールを完全に防止 */
}

#app {
  font-family: var(--font-body);
  width: 100vw;
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  background-color: var(--bg-primary);
  min-height: 100vh;
  overflow-x: hidden;
}

/* ==========================================================================
   ヘッダーエリア - 知的でプロフェッショナルなデザイン
   ========================================================================== */
.app-header {
  position: sticky;
  top: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(59, 130, 246, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm) var(--space-lg);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05);
  gap: var(--space-md);
  transition: all var(--transition-normal);
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(59, 130, 246, 0.3) 20%, 
      rgba(16, 185, 129, 0.3) 50%, 
      rgba(245, 158, 11, 0.3) 80%, 
      transparent 100%
    );
    opacity: 0;
    animation: headerGlow 4s ease-in-out infinite;
  }
}

@keyframes headerGlow {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

/* ==========================================================================
   ロゴ
   ========================================================================== */
.logo {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: var(--primary-navy);
  transition: all var(--transition-normal);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -4px;
    right: -4px;
    bottom: -2px;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1));
    border-radius: 8px;
    opacity: 0;
    transition: opacity var(--transition-normal);
    z-index: -1;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  &:hover {
    transform: translateY(-1px);
  }
}

.logo-main {
  font-family: var(--font-heading);
  font-size: 1.75rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-navy), var(--accent-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  transition: all var(--transition-normal);
}

.logo-sub {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  color: var(--text-secondary);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-top: 2px;
  opacity: 0.8;
  transition: opacity var(--transition-normal);
}

.logo:hover .logo-sub {
  opacity: 1;
}

/* ==========================================================================
   メインナビゲーション
   ========================================================================== */
.main-nav {
  display: flex;
  gap: var(--space-sm);
  align-items: center;
  flex-wrap: wrap;
  background: rgba(248, 250, 252, 0.8);
  padding: var(--space-xs);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.1);
}

.nav-item {
  color: var(--text-secondary);
  text-decoration: none;
  padding: var(--space-xs) var(--space-md);
  border-radius: 8px;
  transition: all var(--transition-normal);
  font-weight: 500;
  font-size: 0.9375rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
    transition: left 0.5s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 80%;
    height: 2px;
    background: linear-gradient(135deg, var(--accent-blue), var(--accent-gold));
    border-radius: 1px;
    transition: transform var(--transition-normal);
    transform-origin: center;
  }
}

.nav-item:hover {
  color: var(--primary-navy);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.08));
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
  
  &::before {
    left: 100%;
  }
  
  &::after {
    transform: translateX(-50%) scaleX(1);
  }
}

.nav-item.router-link-active {
  color: var(--primary-navy);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(16, 185, 129, 0.1));
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
  
  &::after {
    transform: translateX(-50%) scaleX(1);
    background: linear-gradient(135deg, var(--accent-blue), var(--primary-blue));
    height: 3px;
  }
}

/* ==========================================================================
   ヘッダーコントロール（言語切り替え等）
   ========================================================================== */
.header-controls {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

/* ==========================================================================
   メインコンテンツエリア
   ========================================================================== */
.app-content {
  width: 100%;
  max-width: 100vw;
  flex: 1;
  overflow-x: hidden;
}

.breadcrumb-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

@media (max-width: 768px) {
  .breadcrumb-container {
    padding: 0 var(--space-md);
  }
}

/* ==========================================================================
   レスポンシブデザイン
   ========================================================================== */
@media (max-width: 768px) {
  .app-header {
    flex-direction: column;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md);
    
    &::before {
      height: 2px;
      animation: headerGlow 3s ease-in-out infinite;
    }
  }

  .main-nav {
    order: 2;
    justify-content: center;
    gap: var(--space-xs);
    background: rgba(248, 250, 252, 0.9);
    padding: var(--space-xs) var(--space-sm);
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .logo {
    order: 1;
  }

  .header-controls {
    order: 3;
    width: 100%;
    justify-content: center;
    margin-top: var(--space-xs);
  }

  .logo-main {
    font-size: 1.5rem;
  }

  .logo-sub {
    font-size: 0.5625rem;
  }

  .nav-item {
    font-size: 0.875rem;
    padding: var(--space-xs) var(--space-sm);
    white-space: nowrap;
    flex-shrink: 0;
  }
}

@media (max-width: 480px) {
  .app-header {
    padding: var(--space-sm);
  }

  .logo-main {
    font-size: 1.375rem;
  }

  .main-nav {
    gap: var(--space-xs);
    justify-content: flex-start;
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  }

  .nav-item {
    font-size: 0.8125rem;
    padding: var(--space-xs) var(--space-sm);
    min-width: auto;
    white-space: nowrap;
  }
  
  .header-controls {
    margin-top: var(--space-sm);
  }
}

/* タッチデバイス最適化 */
@media (hover: none) and (pointer: coarse) {
  .nav-item:hover {
    background-color: transparent;
  }

  .nav-item:active {
    background-color: var(--bg-secondary);
  }
}
</style>