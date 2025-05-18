<script setup lang="ts">
import { ref, computed } from 'vue'

const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3']
const currentColorIndex = ref(0)

function changeColor() {
  currentColorIndex.value = (currentColorIndex.value + 1) % colors.length
}

const boxStyle = computed(() => {
  return {
    backgroundColor: colors[currentColorIndex.value]
  }
})
</script>

<template>
  <div class="color-box-container">
    <h3>カラーボックス</h3>
    <div 
      class="color-box" 
      :style="boxStyle"
      @click="changeColor"
    ></div>
    <p>クリックして色を変更してください</p>
  </div>
</template>

<style scoped>
.color-box-container {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
}

.color-box {
  width: 150px;
  height: 150px;
  margin: 0 auto;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

h3 {
  margin-top: 0;
}
</style>