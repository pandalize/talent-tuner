<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import AppFooter from './components/AppFooter.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'

const { t } = useI18n()
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <div id="app" style="width: 100vw; max-width: 100vw; overflow-x: hidden; box-sizing: border-box;">
    <header class="app-header">
      <!-- ロゴ部分 -->
      <RouterLink to="/" class="logo" @click="closeMobileMenu">
        <span class="logo-main">ため職</span>
        <span class="logo-sub">Professional Career Assessment</span>
      </RouterLink>

      <!-- デスクトップナビゲーション -->
      <nav class="main-nav desktop-nav">
        <RouterLink to="/" class="nav-item">{{ $t('nav.home') }}</RouterLink>
        <RouterLink to="/diagnosis" class="nav-item">{{ $t('nav.diagnosis') }}</RouterLink>
        <RouterLink to="/about" class="nav-item">{{ $t('nav.about') }}</RouterLink>
        <RouterLink to="/career-guide" class="nav-item">{{ $t('nav.career_guide') }}</RouterLink>
        <RouterLink to="/diagnosis-method" class="nav-item">診断について</RouterLink>
      </nav>

      <!-- ヘッダーコントロール -->
      <div class="header-controls">
        <LanguageSwitcher />
        
        <!-- ハンバーガーメニューボタン -->
        <button 
          class="mobile-menu-toggle"
          @click="toggleMobileMenu"
          :class="{ 'menu-open': isMobileMenuOpen }"
          aria-label="メニュー"
        >
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>

      <!-- モバイルメニューオーバーレイ -->
      <div 
        v-if="isMobileMenuOpen" 
        class="mobile-menu-overlay"
        @click="closeMobileMenu"
      ></div>

      <!-- モバイルナビゲーション -->
      <nav 
        class="mobile-nav"
        :class="{ 'mobile-nav-open': isMobileMenuOpen }"
      >
        <RouterLink 
          to="/" 
          class="mobile-nav-item" 
          @click="closeMobileMenu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          </svg>
          {{ $t('nav.home') }}
        </RouterLink>
        
        <RouterLink 
          to="/diagnosis" 
          class="mobile-nav-item diagnosis-highlight" 
          @click="closeMobileMenu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
          </svg>
          {{ $t('nav.diagnosis') }}
        </RouterLink>
        
        <RouterLink 
          to="/about" 
          class="mobile-nav-item" 
          @click="closeMobileMenu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
          </svg>
          {{ $t('nav.about') }}
        </RouterLink>
        
        <RouterLink 
          to="/career-guide" 
          class="mobile-nav-item" 
          @click="closeMobileMenu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          {{ $t('nav.career_guide') }}
        </RouterLink>
        
        <RouterLink 
          to="/diagnosis-method" 
          class="mobile-nav-item" 
          @click="closeMobileMenu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
          </svg>
          診断について
        </RouterLink>
      </nav>
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
   ヘッダーコントロール（言語切り替え・ハンバーガーメニュー等）
   ========================================================================== */
.header-controls {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

/* ハンバーガーメニューボタン */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 0;
  transition: all var(--transition-normal);
  border-radius: 8px;
  
  &:hover {
    background: rgba(59, 130, 246, 0.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
}

.hamburger-line {
  width: 20px;
  height: 2px;
  background: var(--primary-navy);
  border-radius: 1px;
  transition: all var(--transition-normal);
  transform-origin: center;
}

.mobile-menu-toggle.menu-open .hamburger-line {
  &:nth-child(1) {
    transform: rotate(45deg) translateY(6px);
  }
  
  &:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }
  
  &:nth-child(3) {
    transform: rotate(-45deg) translateY(-6px);
  }
}

/* モバイルメニューオーバーレイ */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* モバイルナビゲーション */
.mobile-nav {
  position: fixed;
  top: 0;
  right: -100%;
  width: 280px;
  height: 100vh;
  background: linear-gradient(135deg, var(--bg-primary) 0%, rgba(248, 250, 252, 0.98) 100%);
  backdrop-filter: blur(20px);
  border-left: 1px solid var(--border-light);
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
  z-index: 999;
  transition: right var(--transition-normal);
  overflow-y: auto;
  padding: var(--space-xxl) 0 var(--space-xl) 0;
  
  &.mobile-nav-open {
    right: 0;
  }
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md) var(--space-xl);
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: all var(--transition-normal);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--accent-blue);
    transform: scaleX(0);
    transition: transform var(--transition-normal);
  }
  
  &:hover {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(16, 185, 129, 0.05));
    color: var(--primary-navy);
    
    &::before {
      transform: scaleX(1);
    }
  }
  
  &.router-link-active {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(16, 185, 129, 0.08));
    color: var(--primary-navy);
    font-weight: 600;
    
    &::before {
      transform: scaleX(1);
      background: var(--accent-gold);
    }
  }
  
  &.diagnosis-highlight {
    background: linear-gradient(135deg, var(--accent-blue), var(--primary-blue));
    color: white;
    font-weight: 600;
    margin: var(--space-md) var(--space-lg);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
    
    &::before {
      display: none;
    }
    
    &:hover {
      background: linear-gradient(135deg, #2980b9, #1e3a8a);
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(52, 152, 219, 0.4);
    }
  }
  
  svg {
    flex-shrink: 0;
    opacity: 0.8;
    transition: opacity var(--transition-normal);
  }
  
  &:hover svg {
    opacity: 1;
  }
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
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-md) var(--space-lg);
    
    &::before {
      height: 2px;
      animation: headerGlow 3s ease-in-out infinite;
    }
  }

  /* デスクトップナビを非表示 */
  .desktop-nav {
    display: none;
  }

  /* モバイルメニューボタンを表示 */
  .mobile-menu-toggle {
    display: flex;
  }

  .header-controls {
    flex-direction: row;
    gap: var(--space-md);
    width: auto;
    justify-content: flex-end;
    margin-top: 0;
  }

  .logo {
    order: 0;
  }

  .logo-main {
    font-size: 1.5rem;
  }

  .logo-sub {
    font-size: 0.5625rem;
  }
}

@media (max-width: 480px) {
  .app-header {
    padding: var(--space-md) var(--space-md);
  }

  .logo-main {
    font-size: 1.375rem;
  }

  .header-controls {
    gap: var(--space-sm);
  }
  
  .mobile-nav {
    width: 100vw;
    right: -100vw;
    
    &.mobile-nav-open {
      right: 0;
    }
  }
  
  .mobile-nav-item {
    padding: var(--space-lg) var(--space-xl);
    font-size: 1.125rem;
    
    &.diagnosis-highlight {
      margin: var(--space-lg) var(--space-md);
      padding: var(--space-lg) var(--space-xl);
    }
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
  
  .mobile-nav-item:hover {
    background: transparent;
    transform: none;
  }
  
  .mobile-nav-item:active {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(16, 185, 129, 0.08));
    transform: scale(0.98);
  }
  
  .mobile-menu-toggle:hover {
    background: transparent;
  }
  
  .mobile-menu-toggle:active {
    background: rgba(59, 130, 246, 0.15);
  }
}
</style>