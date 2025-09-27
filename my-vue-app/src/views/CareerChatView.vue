<template>
  <div class="career-chat-view">
    <CareerChatBot @close="handleChatClose" class="full-width-chat" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import CareerChatBot from '../components/CareerChatBot.vue';

const router = useRouter();

function handleChatClose() {
  // チャットを閉じた場合の処理（必要に応じて）
  router.push('/');
}
</script>

<style scoped>
/* ==========================================================================
   チャットビュー基本レイアウト
   ========================================================================== */
.career-chat-view {
  background: var(--bg-secondary);
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  padding: 0;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  position: relative;
}

.full-width-chat {
  width: 100%;
  max-width: 100%;
  height: calc(100vh - 80px);
  margin: 0;
  box-sizing: border-box;
  border-radius: 0;
}


/* ==========================================================================
   レスポンシブデザイン
   ========================================================================== */
@media (min-width: 769px) {
  .career-chat-view {
    align-items: center;
    justify-content: center;
  }
  
  .full-width-chat {
    max-width: 900px;
    height: auto;
    max-height: 80vh;
    border-radius: 16px;
    margin: 0 auto;
  }
  
}

@media (max-width: 768px) {
  .career-chat-view {
    padding: 0;
    align-items: stretch;
    justify-content: stretch;
    min-height: calc(100vh - 80px);
  }

  .full-width-chat {
    width: 100%;
    height: calc(100vh - 80px);
    max-height: none;
    border-radius: 0;
  }

}

</style>