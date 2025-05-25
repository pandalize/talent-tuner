<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
// import Counter from    './components/Counter.vue'
// import Greeting from './components/Greeting.vue'
// import ColorBox from './components/ColorBox.vue'
// import ToggleButton from './components/ToggleButton.vue'
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
    
    <!-- ここにコンポーネントを配置 -->
    <!-- <HelloWorld />
    <Counter />
    <Greeting />
    <ColorBox />
    <ToggleButton /> -->
  </div>
</template>

<style>
#app {
  font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Meiryo', sans-serif;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  background-color: var(--light-blue);
  background-image: linear-gradient(135deg, var(--light-blue) 0%, var(--bright-blue) 100%);
}

.app-header {
  position: relative;
  width: 100%;
  max-width: 1200px;
  z-index: 10;
  padding: 2rem 1rem;
  background-color: transparent;
}

h1 {
  color: var(--text-dark);
  margin: 1rem 0 2rem 0;
  text-align: center;
  font-weight: 700;
  font-size: 2.5rem;
  letter-spacing: 0.1em;
}

.title1 {
  font-family: 'Hiragino Sans', sans-serif;
  font-size: 3rem;
  display: inline-block;
  color: orange;
  -webkit-text-stroke: 2px rgb(61, 61, 61);
  font-weight: 700;
  position: relative;
  margin: 0 0.2rem; 
}

.title2 {
  font-family: 'M PLUS Rounded 1c'; /* 修正ここ */
  font-size: 3.5rem;
  display: inline-block;
  color: orange;
  /* font-style: italic; */
  text-shadow:3px 4px 3px rgb(51, 51, 53);
  position: relative;
  margin: 0 0.2rem;
}

span {
  font-size: 2.5rem;
  font-weight: 700;
}

nav {
  margin-bottom: 0;
  text-align: center;
  width: 100%;
  padding: 1rem;
  background-color: transparent;
  border-radius: 50px;
  position: relative;
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
  font-size: 1rem;
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

h5 {
  color: var(--text-dark);
  margin-bottom: 3rem;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  letter-spacing: 0.05em;
}

/* スマートフォン向け */
@media (max-width: 455px) {
  .title1 {
    font-size: 2.1rem;
  }

  .title2 {
    font-size: 3.2rem;
  }

  span {
    font-size: 1.4rem;
  }
  
  nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    padding-bottom: 0;
  }
  
  nav a {
    margin: 0;
    width: 80%;
    text-align: center;
    padding: 0.3rem 0;
  }

  .app-header {
    padding-bottom: 0;
  }

  h5 {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
  }
}

/* タブレット向け */
@media (min-width: 456px) and (max-width: 1024px) {
  nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    padding-bottom: 0;
  }
  
  nav a {
    margin: 0;
    width: 80%;
    text-align: center;
    padding: 0.3rem 0;
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

