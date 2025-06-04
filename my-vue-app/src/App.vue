<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <div class="app-header">
      <!-- ナビゲーション -->
      <nav>
        <RouterLink to="/">ホーム</RouterLink> |
        <RouterLink to="/diagnosis">診断ページ</RouterLink> |
        <RouterLink to="/about">職業一覧</RouterLink>
      </nav>
      <h1>
        <span class="title2">ため職</span><br>
        <span>日本一</span>
        <span class="title1">ためになる正直な</span>
        <span>おすすめ</span>
        <span class="title1">職業診断</span>
      </h1>
    </div>
    
    <!-- メインコンテンツ -->
    <div class="app-content">
      <RouterView />
    </div>
  </div>
</template>

<style>
#app {
  font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Meiryo', sans-serif;
  width: 100%;
  /* min-height: 100vh; */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  background-color: var(--light-blue);
  /* background-image: linear-gradient(135deg, var(--light-blue) 0%, var(--bright-blue) 100%); */
}

.app-header {
  position: relative;
  width: 70%;
  max-width: 1200px;
  z-index: 10;
  padding-top: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: transparent;
}

h1 {
  margin: 1rem;
  text-align: center;
  letter-spacing: 0.1em;
}

.title1 {
  font-family: 'Hiragino Sans', sans-serif;
  font-size: clamp(12px, 4vw, 40px); /* 画面の大きさに合わせてフォントサイズが変わる */
  display: inline-block; /* 画面の大きさに合わせて途中で改行されない*/
  color: orange;
  -webkit-text-stroke: 2px rgb(61, 61, 61);
  font-weight: 700;
  position: relative;
  margin: 0 0.2rem; 
}

.title2 {
  font-family: 'M PLUS Rounded 1c';
  font-size: clamp(15px, 5vw, 60px);
  display: inline-block;
  color: orange;
  text-shadow:3px 4px 3px rgb(51, 51, 53);
  position: relative;
  margin: 0 0.2rem;
}

span {
  font-size: clamp(10px, 3vw, 30px);
  font-weight: 700;
  display: inline-block;
  max-height: 3rem;
}

nav {
  margin-bottom: 0;
  text-align: center;
  width: 100%;
  padding: 1rem;
  background-color: transparent;
  border-radius: 50px;
  position: relative;
  flex-direction: row;
  align-items: center;
}

.app-content {
  width: 100%;
  margin-top: 0;
  padding-top: 0;
}

nav a {
  color: var(--text-medium);
  text-decoration: none;
  margin: 0 1rem;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  transition: all 0.3s ease;
  font-weight: 400;
  position: relative;
  font-size: clamp(5px, 1.5vw, 20px);
  border: 1px solid transparent;
}

nav a.router-link-active {
  color: var(--background-white);
  background-color: var(--main-color);
  border: 1px solid var(--main-color);
  box-shadow: 0 4px 15px rgba(95, 144, 178, 0.3);
}

nav a:hover {
  color: var(--main-color);
  border: 1px solid var(--main-color);
  background-color: rgba(95, 144, 178, 0.1);
}


/* スマートフォン向け */
@media (max-width: 455px) {
  nav {
    gap: 0.5rem;
    padding-bottom: 0;
    /* display: flex; */

  }
  
  nav a {
    margin: 0;
    padding: 0.5rem;
  }

  .app-header {
    padding-bottom: 0;
  }
}

/* タブレット向け */
@media (min-width: 456px) and (max-width: 1024px) {
  nav {
    gap: 0.5rem;
  }
  
  nav a {
    margin: 0;
    padding: 0.5rem;
  }
}

/* 大画面向け */
@media (min-width: 1025px) {
}
  

/* 全体のスタイルリセット */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>

