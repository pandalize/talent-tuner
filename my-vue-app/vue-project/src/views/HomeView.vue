<script setup lang="ts">
import { useRouter } from 'vue-router';
import MyComponent from '../components/MyComponent.vue';

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
      <h2>ホームページへようこそ</h2>
      <p>このアプリでは、簡単な質問に答えることであなたに最適な職業を診断できます。</p>
      
      <div class="navigation-cards">
        <div class="card" @click="goToDiagnosis">
          <h3>診断を始める</h3>
          <p>簡単な質問に答えて、あなたに最適な職業を診断します。</p>
          <button class="card-button diagnosis-button">診断ページへ</button>
        </div>
        
        <div class="card" @click="goToAbout">
          <h3>職業の説明</h3>
          <p>各職業の詳細な説明を確認できます。</p>
          <button class="card-button about-button">Aboutページへ</button>
        </div>
      </div>
      
      <MyComponent />
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
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
}

h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center;
}

p {
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
  text-align: center;
}

.navigation-cards {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  width: 100%;
}

.card {
  flex: 1;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.card h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  text-align: center;
}

.card p {
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.card-button {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  font-size: 1rem;
}

.diagnosis-button {
  background-color: #4CAF50;
}

.diagnosis-button:hover {
  background-color: #45a049;
}

.about-button {
  background-color: #2196F3;
}

.about-button:hover {
  background-color: #0b7dda;
}

/* スマートフォン向け */
@media (max-width: 768px) {
  .navigation-cards {
    flex-direction: column;
  }
  
  .card {
    min-height: 150px;
  }
}

/* タブレット向け */
@media (min-width: 769px) and (max-width: 1024px) {
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
