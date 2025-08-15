<template>
  <div class="career-chat-view">
    <CareerChatBot @close="handleChatClose" class="full-width-chat" />
    
    <!-- チャット紹介セクション（モバイル用） -->
    <div class="chat-intro" v-if="showIntro">
      <div class="intro-content">
        <h1>🤖 AI進路相談</h1>
        <p>進路や転職について、AIアシスタントがあなたの悩みを親身に聞きます。</p>
        
        <div class="features">
          <div class="feature">
            <span class="feature-icon">💬</span>
            <h3>対話形式の相談</h3>
            <p>チャット形式で気軽に相談できます</p>
          </div>
          <div class="feature">
            <span class="feature-icon">🎯</span>
            <h3>職業提案</h3>
            <p>28の職業データベースから最適な職業を提案</p>
          </div>
          <div class="feature">
            <span class="feature-icon">📊</span>
            <h3>診断連携</h3>
            <p>より詳しい分析には適性診断もご案内</p>
          </div>
        </div>
        
        <button @click="startChat" class="start-chat-btn">
          相談を始める
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CareerChatBot from '../components/CareerChatBot.vue';

const router = useRouter();
const showIntro = ref(false);

onMounted(() => {
  // モバイルデバイスの場合は紹介セクションを表示
  showIntro.value = window.innerWidth <= 768;
});

function startChat() {
  showIntro.value = false;
}

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
  min-height: calc(100vh - 80px);
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
   チャット紹介セクション
   ========================================================================== */
.chat-intro {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.intro-content {
  background: var(--bg-primary);
  padding: var(--space-xl);
  border-radius: 16px;
  box-shadow: var(--shadow-lg);
}

.intro-content h1 {
  color: var(--primary-navy);
  margin-bottom: var(--space-md);
  font-size: 2.5rem;
  font-weight: 700;
}

.intro-content > p {
  color: var(--text-secondary);
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: var(--space-xl);
}

.features {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
}

.feature {
  text-align: center;
  padding: var(--space-md);
}

.feature-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: var(--space-sm);
}

.feature h3 {
  color: var(--primary-navy);
  margin: 0 0 var(--space-xs) 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.feature p {
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.5;
}

.start-chat-btn {
  background: var(--primary-navy);
  color: white;
  border: none;
  padding: var(--space-md) var(--space-xl);
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-sm);
}

.start-chat-btn:hover {
  background: var(--primary-blue);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* ==========================================================================
   レスポンシブデザイン
   ========================================================================== */
@media (min-width: 769px) {
  .career-chat-view {
    padding: var(--space-md);
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
  
  .chat-intro {
    display: none;
  }
  
  .features {
    grid-template-columns: repeat(3, 1fr);
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

  .intro-content {
    border-radius: 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .intro-content h1 {
    font-size: 2rem;
  }

  .features {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }

  .feature {
    padding: var(--space-sm);
  }

  .feature-icon {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .intro-content {
    padding: var(--space-lg);
  }

  .intro-content h1 {
    font-size: 1.75rem;
  }

  .intro-content > p {
    font-size: 1rem;
  }

  .start-chat-btn {
    width: 100%;
    padding: var(--space-md);
  }
}
</style>