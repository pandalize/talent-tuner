<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import AppFooter from './components/AppFooter.vue'
import Breadcrumb from './components/Breadcrumb.vue'

const route = useRoute()

// パンくずリストを表示しないページ
const hideBreadcrumbPages = computed(() => {
  return route.name === 'home' || route.name === 'notfound'
})
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
        <RouterLink to="/" class="nav-item">ホーム</RouterLink>
        <RouterLink to="/diagnosis" class="nav-item">診断開始</RouterLink>
        <RouterLink to="/about" class="nav-item">職業一覧</RouterLink>
        <RouterLink to="/career-guide" class="nav-item">キャリアガイド</RouterLink>
        <RouterLink to="/diagnosis-method" class="nav-item">診断について</RouterLink>
      </nav>
    </header>
    
    <main class="app-content">
      <div v-if="!hideBreadcrumbPages" class="breadcrumb-container">
        <Breadcrumb />
      </div>
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
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-light);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm) var(--space-lg);
  box-shadow: var(--shadow-sm);
}

/* ==========================================================================
   ロゴ
   ========================================================================== */
.logo {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: var(--primary-navy);
}

.logo-main {
  font-family: var(--font-heading);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary-navy);
  line-height: 1;
}

.logo-sub {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  color: var(--text-secondary);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-top: 2px;
}

/* ==========================================================================
   メインナビゲーション
   ========================================================================== */
.main-nav {
  display: flex;
  gap: var(--space-md);
  align-items: center;
  flex-wrap: wrap;
}

.nav-item {
  color: var(--text-secondary);
  text-decoration: none;
  padding: var(--space-xs) var(--space-sm);
  border-radius: 6px;
  transition: all var(--transition-fast);
  font-weight: 500;
  font-size: 0.9375rem;
  position: relative;
}

.nav-item:hover {
  color: var(--primary-navy);
  background-color: var(--bg-secondary);
}

.nav-item.router-link-active {
  color: var(--primary-navy);
  background-color: var(--bg-tertiary);
}

.nav-item.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 2px;
  background: var(--accent-blue);
  border-radius: 1px;
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
  }

  .main-nav {
    order: 2;
    justify-content: center;
    gap: var(--space-sm);
  }

  .logo {
    order: 1;
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
    flex-direction: column;
    width: 100%;
    gap: var(--space-xs);
  }

  .nav-item {
    width: 100%;
    text-align: center;
    padding: var(--space-sm);
    border-radius: 6px;
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