<template>
    <div class="counter">
      <p>カウント: {{ count }}</p>
      <button @click="increment">+1</button>
      <button @click="decrement">-1</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const count = ref(0)
  function increment() { count.value++ }
  function decrement() { count.value-- }
  </script>
  
  <style scoped>
  .counter {
    margin-top: 1rem;
    padding: 1rem;
    border: 1px dashed #666;
    border-radius: 4px;
  }
  button {
    margin-right: 0.5rem;
  }
  </style>
  