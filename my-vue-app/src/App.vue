<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <header class="app-header">
      <nav>
        <RouterLink to="/">ホーム</RouterLink> |
        <RouterLink to="/diagnosis">診断ページ</RouterLink> |
        <RouterLink to="/about">職業一覧</RouterLink>
      </nav>
      <h1>
        <span class="title-base title-emphasis">ため職</span><br>
        <span class="title-base">日本一</span>
        <span class="title-base title-highlight">ためになる正直な</span>
        <span class="title-base">おすすめ</span>
        <span class="title-base title-highlight">職業診断</span>
      </h1>
    </header>
    
    <main class="app-content">
      <RouterView />
    </main>
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
}

#app {
  font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Meiryo', sans-serif;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  background-color: var(--light-blue);
}

/* ==========================================================================
   ヘッダーエリア
   ========================================================================== */
.app-header {
  position: relative;
  width: 100%;
  max-width: 1200px;
  z-index: 10;
  padding: 2rem 1rem 0 1rem;
  box-sizing: border-box;
  background-color: transparent;
}

nav {
  margin-bottom: 0;
  text-align: center;
  padding: 1rem;
}

nav a {
  color: var(--text-medium);
  text-decoration: none;
  margin: 0 1rem;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  transition: all 0.3s ease;
  font-weight: 400;
  border: 1px solid transparent;
  font-size: clamp(10px, 1.5vw, 20px);
}

nav a:hover {
  color: var(--main-color);
  border: 1px solid var(--main-color);
  background-color: rgba(95, 144, 178, 0.1);
}

nav a.router-link-active {
  color: var(--background-white);
  background-color: var(--main-color);
  border-color: var(--main-color);
  box-shadow: 0 4px 15px rgba(95, 144, 178, 0.3);
}

/* ==========================================================================
   タイトル (h1)
   ========================================================================== */
h1 {
  margin: 1rem;
  text-align: center;
  letter-spacing: 0.1em;
}

/* h1内のspanの共通スタイル */
.title-base {
  font-weight: 700;
  display: inline-block;
  margin: 0 0.2rem;
  position: relative;
  font-size: clamp(13px, 3vw, 30px);
}

/* 強調したい部分のスタイル */
.title-highlight {
  font-size: clamp(17px, 4vw, 40px);
  color: orange;
  text-shadow: 2px 3px 2px rgb(51, 51, 51);
}

/* 最も強調したい部分のスタイル */
.title-emphasis {
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: clamp(20px, 5vw, 60px);
  color: orange;
  text-shadow: 2px 3px 2px rgb(51, 51, 53);
}

/* ==========================================================================
   メインコンテンツエリア
   ========================================================================== */
.app-content {
  width: 100%;
}

/* ==========================================================================
   メディアクエリ (レスポンシブ対応)
   ========================================================================== */
/* タブレット以下 */
@media (max-width: 1024px) {
  nav {
    gap: 0.5rem;
  }
  
  nav a {
    margin: 0;
    padding: 0.5rem;
  }
}

/* スマートフォン向け */
@media (max-width: 455px) {
  .app-header {
    padding-top: 0;
  }

  nav {
    padding-bottom: 0;
  }

  h1 {
    line-height: 1.2; /* 少し行間を調整 */
  }

  .title-base {
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
  }
} 
</style>