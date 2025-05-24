<script setup lang="ts">
import { useRouter } from 'vue-router';
// import MyComponent from '../components/MyComponent.vue';

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
      <div class="navigation-cards">
        <a href="" class="btn btn-border-shadow btn-border-shadow--radius" @click="goToDiagnosis">診断する</a>
        <a href="" class="btn btn-border-shadow btn-border-shadow--radius" @click="goToAbout">職業一覧</a>
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
  width: 100%;
  max-width: 1200px;
  margin-top: 3rem;
  padding: 1rem;
  box-sizing: border-box;
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

/* 背景用*/
.btn,
a.btn,
button.btn {
  font-size: 2rem;
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

  background: #e6eaed;
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

.card {
  flex: 1;
  background-color: var(--background-white);
  border-radius: 50px;
  padding: 3rem 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 280px;
  max-width: 350px;
  min-height: 200px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.card h3 {
  color: var(--main-color);
  margin-bottom: 0.5rem;
  text-align: center;
  font-weight: bold;
}

.card p {
  font-size: 1.4rem;
  margin: 0;
  text-align: center;
  color: var(--text-dark);
  line-height: 1.4;
  font-weight: 500;
  letter-spacing: 0.05em;
}

.card:hover {
  background-color: var(--main-color);
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(95, 144, 178, 0.3);
  border-color: var(--main-color);
}

.card:hover p {
  color: var(--background-white);
}

/* スマートフォン向け */
@media (max-width: 455px) {
  .navigation-cards {
    flex-direction: column;
    align-items: center;     /* 横方向の中央揃え */
  }
}

/* タブレット向け */
@media (min-width: 456px) and (max-width: 1024px) {
  .home-container {
    max-width: 90%;
  }
  .navigation-cards {
    justify-content: center;
  }
}

/* 大画面向け */
@media (min-width: 1025px) {
  .home-container {
    max-width: 1200px;
  }
  .navigation-cards {
    justify-content: center;
  }
}
</style>
