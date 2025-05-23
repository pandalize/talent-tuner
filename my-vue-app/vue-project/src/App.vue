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
        <RouterLink to="/about">About</RouterLink> |
        <RouterLink to="/diagnosis">診断ページ</RouterLink>
      </nav>
      <h1>
        <span>日本一</span>
        <span class="title1">ため</span>
        <span>になるけど日本一</span>
        <span class="title1">失礼</span>
        <span>な</span>
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
  font-family: TsukuARdGothic-Bold;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center; /* 中央揃え */
  padding: 0;
  background-color: #cef4fe;
}

.app-header {
  position: relative;
  width: 100%;
  max-width: 900px;
  z-index: 10;
  padding: 0.5rem;
}

h1 {
  color: #000000;
  margin: 2rem;
  text-align: center;
  font-weight: bold;
}

.title1 {
  font-family: ToppanBunkyuMidashiGothicStdN-ExtraBold;
  font-size: 50px;
  display: inline-block; /* これがないと transform が効かない場合あり */
  transform: rotate(5deg);
}

nav {
  margin-bottom: 0;
  text-align: center;
  width: 100%;
  padding: 0.5rem;
  background-color: #cef4fe;
  border-radius: 8px;
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

nav a.router-link-active {
  font-weight: bold;
  color: #42b983;
}

h5 {
  color: #000000;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 1.5rem;
}

/* スマートフォン向け */
@media (max-width: 455px) {
  h1 {
    font-size: 25px;
  }

  h2 {
    font-size: 28px
  }
  
  nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }
  
  nav a {
    margin: 0;
    width: 80%;
    text-align: center;
    padding: 0.3rem 0;
  }
}

/* タブレット向け */
@media (min-width: 456px) and (max-width: 1024px) {
  
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

