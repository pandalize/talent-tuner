<script setup>
import { ref } from 'vue'

const greeting = ref('こんにちは！')
const name = ref('ゲスト')

function changeGreeting() {
  const greetings = ['おはようございます！', 'こんにちは！', 'こんばんは！', 'お疲れ様です！']
  greeting.value = greetings[Math.floor(Math.random() * greetings.length)]
}

function changeName() {
  const names = ['ゲスト', 'ユーザー', '開発者', 'プログラマー']
  name.value = names[Math.floor(Math.random() * names.length)]
}
</script>

<template>
  <div class="greeting-container">
    <h2>{{ greeting }} {{ name }}さん</h2>
    <div class="button-container">
      <button @click="changeGreeting" class="greeting-button">挨拶を変更</button>
      <button @click="changeName" class="greeting-button">名前を変更</button>
    </div>
  </div>
</template>

<style scoped>
.greeting-container {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.greeting-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.greeting-button:hover {
  background-color: #45a049;
}
</style>