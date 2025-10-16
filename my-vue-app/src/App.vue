<template>
  <div id="app">
    <header class="app-header">
      <RouterLink to="/" class="logo">
        <img src="/favicon.ico" alt="Pandalize" class="logo-icon">
        <div class="logo-text">
          <span class="logo-main">{{ $t('app.tameshoku') }}</span>
        </div>
      </RouterLink>

      <nav class="header-nav">
          <RouterLink to="/" class="nav-item">{{ $t('nav.home') }}</RouterLink>
          <RouterLink to="/diagnosis" class="nav-item">{{ $t('nav.diagnosis') }}</RouterLink>
          <!-- <RouterLink to="/career-guide" class="nav-item">{{ $t('nav.career_guide') }}</RouterLink> -->
          <!-- <RouterLink to="/diagnosis-method" class="nav-item">{{ $t('nav.diagnosis_method') }}</RouterLink> -->
          <!-- <RouterLink to="/chat" class="nav-item">{{ $t('nav.chat') }}</RouterLink> -->
          <!-- <RouterLink to="/payment" class="nav-item">{{ $t('nav.payment') }}</RouterLink> -->
          <RouterLink to="/newchat" class="nav-item">{{ $t('nav.newchat') }}</RouterLink>
          <RouterLink to="/about" class="nav-item">{{ $t('nav.about') }}</RouterLink>
      </nav>

      <!-- ヘッダーコントロール -->
      <div class="header-controls">
        <LanguageSwitcher />

        <!-- ハンバーガーメニューボタン -->
        <button 
          class="mobile-menu-toggle"
          @click="toggleMobileMenu"
          :class="{ 'menu-open': isMobileMenuOpen }"
          :aria-expanded="isMobileMenuOpen"
        >
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>

      <!-- モバイルメニューオーバーレイ（ハンバーガーメニューが開いているときに画面全体に表示される半透明の背景レイヤー） -->
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
          <button 
            class="mobile-nav-close"
            @click="closeMobileMenu"
          >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="1.5">
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
          <svg class='nav-icon' viewBox="0 0 24 24">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          </svg>
          {{ $t('nav.home') }}
        </RouterLink>
        
        <RouterLink 
          to="/diagnosis" 
          class="mobile-nav-item" 
          @click="closeMobileMenu"
        >
          <svg class='nav-icon' viewBox="0 0 24 24">
            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
          </svg>
          {{ $t('nav.diagnosis') }}
        </RouterLink>
        
        <RouterLink 
          to="/about" 
          class="mobile-nav-item" 
          @click="closeMobileMenu"
        >
          <svg class='nav-icon' viewBox="0 0 24 24">
            <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
          </svg>
          {{ $t('nav.about') }}
        </RouterLink>
        
        <RouterLink 
          to="/career-guide" 
          class="mobile-nav-item" 
          @click="closeMobileMenu"
        >
          <svg class='nav-icon' viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          {{ $t('nav.career_guide') }}
        </RouterLink>
        
        <RouterLink 
          to="/chat"
          class="mobile-nav-item"
          @click="closeMobileMenu"
        >
          <svg class='nav-icon' viewBox="0 0 24 24">
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
          </svg>
          {{ $t('nav.chat') }}
        </RouterLink>
        
        <RouterLink 
          to="/diagnosis-method" 
          class="mobile-nav-item" 
          @click="closeMobileMenu"
        >
          <svg class='nav-icon' viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
          </svg>
          診断について
        </RouterLink>
        </div>
      </nav>
    </header>

  
    <main class="app-content">
      <RouterView/>
    </main>
  </div>

  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>ため職</h3>
        <p>日本一ためになる正直なおすすめ職業診断</p>
      </div>
      
      <div class="footer-section">
        <h4>サービス</h4>
        <ul>
          <li><router-link to="/diagnosis">診断ページ</router-link></li>
          <li><router-link to="/chat">AI進路相談</router-link></li>
          <li><router-link to="/about">職業一覧</router-link></li>
          <li><router-link to="/career-guide">キャリアガイド</router-link></li>
          <li><router-link to="/diagnosis-method">診断方法</router-link></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h4>サポート</h4>
        <ul>
          <li><router-link to="/contact">お問い合わせ</router-link></li>
          <li><router-link to="/company">運営者情報</router-link></li>
          <li><router-link to="/sitemap">サイトマップ</router-link></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h4>法的情報</h4>
        <ul>
          <li><router-link to="/privacy">プライバシーポリシー</router-link></li>
          <li><router-link to="/terms">利用規約</router-link></li>
        </ul>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2025 Pandalize. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue' 
import LanguageSwitcher from './components/LanguageSwitcher.vue';

const { t } = useI18n()

// ハンバーガーメニューを開閉
const isMobileMenuOpen = ref(false); // モバイルメニューの開閉状態を管理するリアクティブ変数
const toggleMobileMenu = () => { // isMobileMenuOpenを反転させる関数
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
const closeMobileMenu = () => { // isMobileMenuOpenをfalseにする関数
  isMobileMenuOpen.value = false
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins.scss' as mixins;
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

#app {
  font-family: var(--font-body);
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
}

.app-header {
  position: sticky; top: 0;
  z-index: 1000;
  width: 100%;
  max-height: 80px;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm) var(--space-lg);
  transition: all var(--transition-normal);
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  text-decoration: none;
  transition: all var(--transition-normal);
  position: relative;
  max-width: 180px;
}

.logo-icon {
  width: 30%;
}

.logo-text {
  display: flex;
  flex-direction: column;
  height: 100%
}

.logo-main {
  font-family: var(--font-heading);
  font-size: 1.75rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-navy), var(--accent-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all var(--transition-normal);
}

.header-nav {
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3%;
  flex-wrap: wrap; 
  padding: var(--space-xs); 
  border-radius: 12px;
}

.nav-item {
  width: 13.8%;
  color: var(--text-secondary);
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
  transition: all var(--transition-normal);
  font-weight: 500;
  font-size: 1.3vw;
  padding: var(--space-xs) 0;
  position: relative;
  overflow: hidden;
  
  
  &::after {
    /* 下線アニメーション */
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 100%;
    height: 2px;
    background: linear-gradient(135deg, var(--accent-blue), var(--accent-gold));
    border-radius: 1px;
    transition: transform var(--transition-normal);
    transform-origin: center;
  }
}

.nav-item:hover {
  color: var(--primary-navy);
  background: transparent;
  
  &::after {
    transform: translateX(-50%) scaleX(1);
  }
}

.nav-item.router-link-active {
  color: var(--primary-navy);
  font-weight: 600;
  
  &::after {
    transform: translateX(-50%) scaleX(1);
    background: linear-gradient(135deg, var(--accent-blue), var(--primary-blue));
    height: 3px;
  }
}

.header-controls {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

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
}

.hamburger-line {
  width: 20px;
  height: 2px;
  background: var(--primary-navy);
  transition: all var(--transition-normal);
  transform-origin: center;
}

/* 3本線（.hamburger-line）を×（バツ）に変形 */
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

/* ハンバーガーメニューが開いているときに画面全体に表示される半透明の黒い背景レイヤー */
.mobile-menu-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 998; /* 値が大きいほど前面に表示される */
}

.mobile-nav {
  position: fixed; /* スクロールしても常に同じ場所に表示される */
  top: 0; right: -100%; bottom: 0; left: auto; /* 画面外に配置 */
  width: 280px;
  height: 100vh;
  background: var(--bg-primary);
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

.mobile-nav-header {
  height: 10vh;
  display: flex;
  justify-content: flex-end; /* 右寄せ */
  align-items: center;
  padding: var(--space-sm) var(--space-md);
  border-bottom: #e2e2e2 2px solid;
  position: sticky;
  top: 0;
  z-index: 10;
  flex-shrink: 0;
}

.mobile-nav-close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all var(--transition-normal);
  color: var(--text-secondary);
  padding: 0;
  
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
    width: 32px;
    height: 32px;
  }
}

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
  
  &.router-link-active {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(16, 185, 129, 0.08));
    color: var(--primary-navy);
    font-weight: 600;
  }

  .nav-icon {
    width: 20px;
    height: 20px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
    flex-shrink: 0;
    opacity: 0.8;
    transition: opacity var(--transition-normal);
  }
  
  &:hover svg {
    opacity: 1;
  }
}

.app-content {
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}

.app-footer {
  background-color: var(--text-dark, #333);
  color: var(--background-white, #fff);
  margin-top: auto;
  padding: var(--space-lg) 0;
  width: 100%;
}

.footer-content {
  @include mixins.container(1200px);
  @include mixins.grid-auto-fit(200px);
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: var(--space-md);
}

.footer-section h3 {
  color: var(--background-white, #fff);
  font-size: clamp(18px, 3vw, 24px);
  margin-bottom: var(--space-sm);
  font-weight: 700;
}

.footer-section p {
  color: #ccc;
  font-size: clamp(12px, 2vw, 14px);
  line-height: 1.6;
  margin: 0;
}

.footer-section h4 {
  color: var(--background-white, #fff);
  font-size: clamp(14px, 2.5vw, 18px);
  margin-bottom: var(--space-sm);
  font-weight: 600;
}

.footer-section ul {
  @include mixins.list-reset;
}

.footer-section li {
  margin-bottom: var(--space-xs);
}

.footer-section a {
  color: #ccc;
  text-decoration: none;
  font-size: clamp(12px, 2vw, 14px);
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: var(--background-white, #fff);
  text-decoration: underline;
}

.footer-bottom {
  max-width: 1200px;
  margin: var(--space-md) auto 0;
  padding-top: var(--space-md);
  border-top: 1px solid #555;
  text-align: center;
}

.footer-bottom p {
  color: #999;
  font-size: clamp(10px, 1.8vw, 12px);
  margin: 0;
}

@media (max-width: 1024px) {
  .footer-content {
    @include mixins.grid-columns(2);
    gap: var(--space-md);
  }
  
  .footer-section:first-child {
    grid-column: 1 / -1;
    text-align: center;
    margin-bottom: var(--space-sm);
  }
}

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

  .header-nav {
    display: none;
  }

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

  .app-footer {
  padding: var(--space-xl) var(--space-md) var(--space-lg);
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  box-shadow: inset 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .footer-content {
    @include mixins.grid-columns(2);
    text-align: center;
    max-width: 400px;
    margin: 0 auto;
  }

  .footer-section:nth-child(1),
  .footer-section:nth-child(2) {
    display: none;
  }
  
  .footer-section {
    padding: var(--space-md);
    backdrop-filter: blur(10px);
    
    &:first-child {
      grid-column: auto;
      margin-bottom: 0;
      background: linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(16, 185, 129, 0.08));
      border: 1px solid rgba(52, 152, 219, 0.2);
      
      h3 {
        font-size: 1.5rem;
        background: linear-gradient(135deg, var(--accent-blue), var(--accent-gold));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: var(--space-sm);
      }
      
      p {
        color: #e8f4fd;
        font-size: 0.9375rem;
        line-height: 1.6;
        opacity: 0.9;
      }
    }
    
    h4 {
      font-size: 1.125rem;
      color: #e8f4fd;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 2px;
        background: linear-gradient(90deg, var(--accent-blue), var(--accent-gold));
        border-radius: 1px;
      }
    }
    
    ul {
      display: flex;
      flex-direction: column;
    }
    
    li {
      margin-bottom: 0;
    }
    
    a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-xs) var(--space-sm);
      color: #bdc3c7;
      font-size: 0.875rem;
      border-radius: 8px;
      transition: all var(--transition-normal);
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        transition: left 0.6s ease;
      }
      
      &:hover {
        color: #ffffff;
        background: rgba(52, 152, 219, 0.2);
        transform: translateY(-2px);
        text-decoration: none;
        
        &::before {
          left: 100%;
        }
      }
      
      &:active {
        transform: translateY(0) scale(0.98);
      }
    }
    
    margin-bottom: 0;
  }
  
  .footer-bottom {
    margin-top: var(--space-xl);
    padding-top: var(--space-lg);
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    
    p {
      color: #95a5a6;
      font-size: 0.75rem;
      opacity: 0.8;
      padding: var(--space-xs);
    }
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
    width: 70vw;
    right: -100vw;
    
    &.mobile-nav-open {
      right: 0;
    }
  }
  
  .mobile-nav-item {
    padding: var(--space-lg) var(--space-xl);
    font-size: 1.0625rem;
    
  }

    .app-footer {
    padding: var(--space-md) var(--space-sm) var(--space-md);
    margin: 0;
    height: 30vh;
  }
  
  .footer-content {
    padding: 0;
    max-width: 100%;
    gap: 0;
  }
  
  .footer-section {
    padding: var(--space-sm);
    
    &:first-child {
      h3 {
        font-size: 1.25rem;
      }
      
      p {
        font-size: 0.875rem;
      }
    }
    
    h4 {
      font-size: 1rem;
      margin-bottom: var(--space-sm);
    }
    
    a {
      font-size: 0.8125rem;
      padding: 0;
    }
  }
  
  .footer-bottom {
    margin-top: 0;
    padding-top: 0;
    
    p {
      font-size: 0.6875rem;
    }
  }
}
</style>