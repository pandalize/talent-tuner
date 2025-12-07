<template>
  <main class="diagnosis-main">
    <DiagnosisContainer />
  </main>
</template>

<script setup lang="ts">
import DiagnosisContainer from '../components/diagnosis/DiagnosisContainer.vue'
</script>

<style scoped>
.diagnosis-main {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>