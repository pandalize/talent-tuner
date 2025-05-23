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
        <div class="card"  @click="goToDiagnosis">
          <p>診断してみる</p>
        </div>
        
        <div class="card" @click="goToAbout">
          <p>職業の情報を見る</p>
        </div>
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
  gap: 2rem;
  margin-bottom: 3rem;
  width: 100%;
}

.card {
  flex: 1;
  background-color: #fcfece;
  border-radius: 40px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 300px;
  max-width: 400px;
  transition: all 0.3s;

}

.card h3 {
  color: #000000;
  margin-bottom: 0.5rem;
  text-align: center;
}

.card p {
  font-size: 30px;
  margin: 1.5rem;
  flex-grow: 1;
  text-align: center;
  color: #000000;
  line-height: 1.6;
}

.card:hover {
  background-color: #fcffa9;
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
