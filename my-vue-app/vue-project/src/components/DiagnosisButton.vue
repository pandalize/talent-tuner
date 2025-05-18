<template>
  <div class="diagnosis-button-container">
    <h2>日本一ためになるけど日本一失礼な適性診断</h2>
    <p>簡単な質問に答えて、あなたに最適な職業を診断します。あなたの本当の才能と適性を容赦なく明らかにします。</p>
    <button class="start-button" @click="startDiagnosis">診断を開始する</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function startDiagnosis() {
  router.push('/diagnosis')
}
</script>

<style scoped>
.diagnosis-button-container {
  width: 100%;
  margin: 2rem 0;
  padding: 2rem;
  background-color: #f0f7ff;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

p {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.start-button {
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
}

.start-button:hover {
  background-color: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.start-button:active {
  transform: translateY(0);
}

/* スマートフォン向け */
@media (max-width: 768px) {
  .diagnosis-button-container {
    padding: 1.5rem 1rem;
    margin: 1rem 0;
  }
  
  h2 {
    font-size: 1.3rem;
  }
  
  .start-button {
    width: 100%;
    max-width: 300px;
  }
}

/* タブレット向け */
@media (min-width: 769px) and (max-width: 1024px) {
  .diagnosis-button-container {
    max-width: 100%;
  }
}

/* 大画面向け */
@media (min-width: 1025px) {
  .diagnosis-button-container {
    max-width: 100%;
  }
}
</style>