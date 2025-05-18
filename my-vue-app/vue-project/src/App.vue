<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Counter from    './components/Counter.vue'
import Greeting from './components/Greeting.vue'
import ColorBox from './components/ColorBox.vue'
import ToggleButton from './components/ToggleButton.vue'
</script>

<template>
  <div id="app">
    <div class="app-header">
      <h1>My Vue App</h1>
      
      <!-- ナビゲーション -->
      <nav>
        <RouterLink to="/">ホーム</RouterLink> |
        <RouterLink to="/about">About</RouterLink> |
        <RouterLink to="/diagnosis">診断ページ</RouterLink>
      </nav>
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 2rem;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center; /* 中央揃え */
}

.app-header {
  position: relative;
  background-color: white;
  width: 100%;
  z-index: 10;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
  width: 100%;
}

nav {
  margin-bottom: 0;
  text-align: center;
  width: 100%;
  padding: 1rem 0;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.app-content {
  width: 100%;
  margin-top: 0;
  padding-top: 0;
}

nav a {
  color: #2c3e50;
  text-decoration: none;
  margin: 0 0.8rem;
  padding: 0.5rem 0.8rem;
  border-radius: 4px;
  transition: all 0.3s;
}

nav a:hover {
  background-color: #e8e8e8;
}

nav a.router-link-active {
  font-weight: bold;
  color: #42b983;
  background-color: #f0f7ff;
}

/* スマートフォン向け */
@media (max-width: 768px) {
  #app {
    padding: 1rem;
  }
  
  h1 {
    font-size: 1.5rem;
  }
  
  nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  
  nav a {
    margin: 0;
    width: 80%;
    text-align: center;
    padding: 0.5rem 0;
  }
}

/* タブレット向け */
@media (min-width: 769px) and (max-width: 1024px) {
  #app {
    padding: 1.5rem;
  }
}

/* 大画面向け */
@media (min-width: 1025px) {
  #app {
    max-width: 1400px;
    margin: 0 auto;
  }
}

/* 全体のスタイルリセット */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>

