<template>
  <div class="hello">
    <h2>{{ message }}</h2>
    <button @click="onClick">クリックしてね！</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// メッセージ用のリアクティブ変数
const message = ref('こんにちは、Vueコンポーネント！')

function onClick() {
  message.value = 'ボタンがクリックされました！'
}
</script>

<style scoped>
.hello {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  margin-top: 0.5rem;
}
</style>
