<template>
  <div class="toggle-container">
    <h3>トグルボタン</h3>
    <div class="toggle-button" :class="{ active: isActive }" @click="toggle">
      {{ isActive ? 'ON' : 'OFF' }}
    </div>
    <p>現在の状態: {{ isActive ? 'アクティブ' : '非アクティブ' }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isActive = ref(false)

function toggle() {
  isActive.value = !isActive.value
}
</script>

<style scoped>
.toggle-container {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.toggle-button {
  display: inline-block;
  padding: 0.5rem 2rem;
  background-color: #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;
}

.toggle-button.active {
  background-color: #4CAF50;
  color: white;
}
</style>