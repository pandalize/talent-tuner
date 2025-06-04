<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function goToAbout() {
  router.push('/about');
}

function goToDiagnosis() {
  router.push('/diagnosis');
}
</script>

<template>
  <main>
    <div class="home-container">
      <div class="welcome-section">
        <h1 class="diagnosis-welcome" style="white-space: normal; font-size: clamp(6px, 2vw, 20px);">
          ため職へようこそ！<br>「興味」「能力」「性格」「考え方」の4つの観点で、<br>あなたにマッチする職業を短時間で多角的に分析。
          <br>あなたに最適な高収入職業を<br>ランキング形式でおすすめします。
        </h1>
      </div>
      <div class="image-container">
        <img src="/image/construction.png" alt="Image 1" />
        <img src="/image/influencer.png" alt="Image 2" />
      </div>
      <div class="navigation-cards">
        <router-link to="/diagnosis" class="btn btn-border-shadow btn-border-shadow--radius">診断する</router-link>
        <router-link to="/about" class="btn btn-border-shadow btn-border-shadow--radius">職業一覧</router-link>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.home-container {
  width: 70%;
  max-width: 1200px;
  padding: 1rem;
  box-sizing: border-box;
}

.welcome-section {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: var(--background-white, #ffffff);
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.diagnosis-welcome {
  color: var(--text-dark, #333);
  margin: 0;
  line-height: 1.6;
  font-weight: 500;
}

.image-container {
  display: flex;
  justify-content: center;
  /* gap: 2rem; */
  margin-bottom: 2rem;
}

.home-container img {
  width: 20rem;
  height: auto; /* 固定の高さから自動サイズに変更し縦横比を維持 */
  max-width: 50%;
}

.navigation-cards {
  display: flex;
  gap: 3rem;
  margin-bottom: 4rem;
  width: 100%;
  justify-content: center;
}

*,
*:before,
*:after {
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
}

html {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 62.5%;
}

.btn,
a.btn,
button.btn {
  font-size: clamp(5px, 3vw, 40px);
  font-weight: 700;
  line-height: 1.5;
  position: relative;
  display: inline-block;
  padding: 1rem 4rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;
  letter-spacing: 0.1em;
  color: #212529;
  border-radius: 0.5rem;
}

a.btn-border-shadow--radius {
  border-radius: 100vh;
}
a.btn-border-shadow {
  padding: calc(1.5rem - 12px) 3rem 1.5rem;

  background: var(--cream);
}

a.btn-border-shadow:before {
  position: absolute;
  top: -6px;
  left: -6px;
  width: 100%;
  height: 100%;
  content: "";
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  border: 3px solid #000;
  border-radius: 0.5rem;
}

a.btn-border-shadow--radius:before {
  border-radius: 100vh;
}

a.btn-border-shadow:hover {
  padding: calc(1.5rem - 6px) 3rem;
}

a.btn-border-shadow:hover:before {
  top: 0;
  left: 0;
}


/* スマートフォン向け */
@media (max-width: 455px) {
  .navigation-cards {
    flex-direction: column;
    align-items: center;  /* 横方向の中央揃え */
  }
}

/* タブレット向け */
@media (min-width: 456px) and (max-width: 1024px) {
  .home-container {
    max-width: 90%;
  }
}

/* 大画面向け */
@media (min-width: 1025px) {
  .home-container {
    max-width: 1200px;
  }
}
</style>
