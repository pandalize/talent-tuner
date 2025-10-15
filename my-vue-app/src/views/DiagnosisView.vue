<template>
  <div class="diagnosis-view">
    <DiagnosisContainer />
  </div>
</template>

<script setup lang="ts">
import DiagnosisContainer from '../components/diagnosis/DiagnosisContainer.vue'
</script>

<style scoped>
.diagnosis-view {
  width: 100%;
}

@media (max-width: 768px) {
  .diagnosis-view {
    min-height: 100vh;
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: var(--bg-primary, #ffffff);
    padding-top: 80px;
    box-sizing: border-box;
  }
}
</style>