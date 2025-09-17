<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import ResultDisplay from './components/diagnosis/ResultDisplay.vue'
import AppFooter from './components/AppFooter.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import CareerChatBot from './components/CareerChatBot.vue'

import { onMounted, onUnmounted } from 'vue'

const route = useRoute()
const isMobile = ref(false)
function checkMobile() {
  isMobile.value = window.innerWidth <= 768
}
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

const { t } = useI18n()
const isMobileMenuOpen = ref(false)
const isDemoChatOpen = ref(false)
const isDemoResultOpen = ref(false)

// デモ診断結果データ
const demoProfessions = [
  {
    name: 'Webデザイナー',
    score: 86,
    categories: { skill: 22, interest: 22, priority: 21, balance: 21 },
  annualIncome: '350万円〜600万円',
  jobDetails: 'Webサイトやバナー、UI/UXデザインなどを担当し、クライアントや自社サービスのデザイン業務を行います。HTML/CSSやFigma、Photoshopなどのツールを活用します。',
  comment: 'あなたはクリエイティブな発想力とデザインへの関心が高く、細部までこだわる力があります。Webデザイナーとして多様な案件で活躍できる素質があります。'
  },
  {
    name: 'インフルエンサー',
    score: 83,
    categories: { skill: 20, interest: 22, priority: 21, balance: 20 },
  annualIncome: '100万円〜1,000万円以上',
  jobDetails: 'SNSやYouTubeなどで情報発信し、フォロワーや企業案件、広告収入などで収益を得ます。企画力や発信力、セルフブランディングが重要です。',
  comment: 'あなたは新しいことに挑戦する意欲と発信力があり、SNSで自分の世界観を表現するのが得意です。インフルエンサーとして多くの人に影響を与えられるでしょう。'
  },
  {
    name: 'マーケティング',
    score: 77,
    categories: { skill: 19, interest: 20, priority: 19, balance: 19 },
  annualIncome: '400万円〜800万円',
  jobDetails: '市場調査や広告運用、SNS運用、プロモーション企画などを通じて、商品やサービスの売上拡大を目指します。分析力やコミュニケーション力が求められます。',
  comment: 'あなたは情報収集や分析が得意で、戦略的に物事を考える力があります。マーケティング分野で企画やプロモーションに携わる適性が高いです。'
  }
]
const demoMaxCategoryScore = 25
const demoTotalQuestions = 16

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const showDemoChat = () => {
  isDemoChatOpen.value = true
  closeMobileMenu()
}

const closeDemoChat = () => {
  isDemoChatOpen.value = false
}

const showDemoResult = () => {
  isDemoResultOpen.value = true
  closeMobileMenu()
}
const closeDemoResult = () => {
  isDemoResultOpen.value = false
}
</script>

<template>
  <div id="app" style="width: 100vw; max-width: 100vw; overflow-x: hidden; box-sizing: border-box;">
    <header class="app-header">
      <!-- ロゴ部分 -->
      <RouterLink to="/" class="logo" @click="closeMobileMenu">
        <img src="/favicon.ico" alt="ため職" class="logo-icon">
        <div class="logo-text">
          <span class="logo-main">ため職</span>
          <span class="logo-sub">Professional Career Assessment</span>
        </div>
      </RouterLink>

      <!-- デスクトップナビゲーション -->
      <nav class="main-nav desktop-nav">
        <RouterLink to="/" class="nav-item">{{ $t('nav.home') }}</RouterLink>
        <RouterLink to="/diagnosis" class="nav-item">{{ $t('nav.diagnosis') }}</RouterLink>
        <RouterLink to="/about" class="nav-item">{{ $t('nav.about') }}</RouterLink>
        <RouterLink to="/career-guide" class="nav-item">{{ $t('nav.career_guide') }}</RouterLink>
        <RouterLink to="/diagnosis-method" class="nav-item">診断について</RouterLink>
        <button 
          class="nav-item demo-chat-desktop-btn" 
          @click="showDemoChat"
        >
          AI進路相談
        </button>
      </nav>

      <!-- ヘッダーコントロール -->
      <div class="header-controls">
        <!-- <LanguageSwitcher /> -->

        <!-- ハンバーガーメニューボタン -->
        <button 
          class="mobile-menu-toggle"
          @click="toggleMobileMenu"
          :class="{ 'menu-open': isMobileMenuOpen }"
          :aria-label="isMobileMenuOpen ? t('nav.close_menu') : t('nav.open_menu')"
          :aria-expanded="isMobileMenuOpen"
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
        <!-- 閉じるボタン -->
        <div class="mobile-nav-header">
          <span class="mobile-nav-title">メニュー</span>
          <button 
            class="mobile-nav-close"
            @click="closeMobileMenu"
            :aria-label="t('nav.close_menu')"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <!-- ナビゲーションコンテンツ -->
        <div class="mobile-nav-content">
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
          to="/chat"
          class="mobile-nav-item demo-chat-btn"
            @click="() => { showDemoChat(); closeMobileMenu(); }"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
          </svg>
          AI進路相談
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
        </div>
      </nav>
    </header>
    
    <main class="app-content">
      <RouterView @show-demo-chat="showDemoChat" />
    </main>
    
  <AppFooter v-if="!(route.path.startsWith('/diagnosis') && isMobile) && !(isMobile && isDemoChatOpen)" />

    <!-- デモチャットモーダル -->
    <div v-if="isDemoChatOpen" class="demo-chat-overlay" @click="closeDemoChat">
      <div class="demo-chat-modal" @click.stop>
        <CareerChatBot @close="closeDemoChat" />
      </div>
    </div>
    <!-- デモ診断結果モーダルは廃止（ページ遷移に変更） -->
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
  overflow-x: hidden; /* 横スクロールを完全に防止 */
  overflow-y: auto;
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
  overflow-x: hidden;
  overflow-y: auto;
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
  align-items: center;
  gap: var(--space-xs);
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

.logo-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.logo-text {
  display: flex;
  flex-direction: column;
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
  width: 100vw;
  height: 100vh;
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
  bottom: 0;
  left: auto;
  width: 65vw; /* 画面幅の65% */
  min-width: 280px; /* 最小幅を保証 */
  max-width: 420px; /* 最大幅を制限 */
  height: 100vh; /* ビューポート高さ100% */
  height: 100dvh; /* 動的ビューポート高さ（モバイル対応） */
  background: linear-gradient(135deg, var(--bg-primary) 0%, rgba(248, 250, 252, 0.98) 100%);
  backdrop-filter: blur(20px);
  border-left: 1px solid var(--border-light);
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
  z-index: 999;
  transition: right var(--transition-normal);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
  display: flex;
  flex-direction: column;
  
  &.mobile-nav-open {
    right: 0;
  }
}

/* モバイルメニューヘッダー */
.mobile-nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-lg) var(--space-xl);
  border-bottom: 1px solid var(--border-light);
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 10;
  flex-shrink: 0; /* ヘッダーが縮まないように */
}

.mobile-nav-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--primary-navy);
  font-family: var(--font-heading);
}

.mobile-nav-close {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 2px solid var(--border-light);
  border-radius: 50%;
  cursor: pointer;
  transition: all var(--transition-normal);
  color: var(--text-secondary);
  
  &:hover {
    background: var(--bg-secondary);
    border-color: var(--accent-blue);
    color: var(--accent-blue);
    transform: rotate(90deg);
  }
  
  &:active {
    transform: rotate(90deg) scale(0.9);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
}

/* モバイルナビコンテンツ */
.mobile-nav-content {
  flex: 1;
  overflow-y: auto;
  padding-bottom: var(--space-xl);
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg) var(--space-xl);
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: all var(--transition-normal);
  position: relative;
  white-space: nowrap;
  
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
    font-weight: 600 !important;
    color: white !important;
    border: none !important;
    width: 100%;
    text-align: left;
    
    &::before {
      display: none !important;
    }
    
    &:hover {
      background: linear-gradient(135deg, #2980b9, #1e3a8a) !important;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(243, 156, 18, 0.4);
    }
    
    svg {
      position: relative;
      
      circle {
        fill: rgba(255, 255, 255, 0.9);
      }
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
    padding: var(--space-sm) var(--space-md);
    height: 10vh; 
    
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
    display: none;
  }

  .result-subtitle {
    display: none !important;
  }
}

@media (max-width: 480px) {
  .logo-main {
    font-size: 1.375rem;
  }

  .header-controls {
    gap: var(--space-sm);
  }
  
  .mobile-nav {
    width: 70vw; /* 小さい画面では70% */
    right: -100vw;
    
    &.mobile-nav-open {
      right: 0;
    }
  }
  
  .mobile-nav-item {
    padding: var(--space-lg) var(--space-xl);
    font-size: 1.0625rem;
    
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

/* ==========================================================================
   デモチャットモーダル
   ========================================================================== */
.demo-chat-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-md);
  animation: fadeIn 0.3s ease;
}

.demo-chat-modal {
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.demo-chat-btn {
  background: linear-gradient(135deg, var(--accent-gold), #f39c12) !important;
  color: white !important;
  font-weight: 600 !important;
  border: none !important;
  width: 100%;
  text-align: left;
  
  &::before {
    display: none !important;
  }
  
  &:hover {
    background: linear-gradient(135deg, #e67e22, #d35400) !important;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(243, 156, 18, 0.4);
  }
  
  svg {
    position: relative;
    
    circle {
      fill: rgba(255, 255, 255, 0.9);
    }
  }
}

.demo-chat-desktop-btn {
  background: linear-gradient(135deg, var(--accent-gold), #f39c12) !important;
  color: white !important;
  font-weight: 600 !important;
  border: none !important;
  cursor: pointer;
  
  &::before {
    display: none !important;
  }
  
  &::after {
    display: none !important;
  }
  
  &:hover {
    background: linear-gradient(135deg, #e67e22, #d35400) !important;
    color: white !important;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(243, 156, 18, 0.4);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .demo-chat-overlay {
    padding: 0;
  }
  .demo-chat-modal {
    width: 100%;
    height: 100%;
    max-height: 100vh;
    border-radius: 0;
    overflow-y: auto;
  }
}
</style>