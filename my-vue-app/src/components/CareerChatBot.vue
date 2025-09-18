<template>
  <div class="career-chat-bot">
    <div class="chat-header">
      <div class="bot-avatar">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7A1,1 0 0,0 14,8H18A4,4 0 0,1 22,12V16A4,4 0 0,1 18,20H6A4,4 0 0,1 2,16V12A4,4 0 0,1 6,8H10A1,1 0 0,0 11,7V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A1.5,1.5 0 0,0 6,14.5A1.5,1.5 0 0,0 7.5,16A1.5,1.5 0 0,0 9,14.5A1.5,1.5 0 0,0 7.5,13M16.5,13A1.5,1.5 0 0,0 15,14.5A1.5,1.5 0 0,0 16.5,16A1.5,1.5 0 0,0 18,14.5A1.5,1.5 0 0,0 16.5,13Z" />
        </svg>
      </div>
      <div class="bot-info">
        <h3>進路相談アシスタント</h3>

      </div>
      <button class="close-chat" @click="$emit('close')" aria-label="チャットを閉じる">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
        </svg>
      </button>
    </div>

    <div class="chat-messages" ref="messagesContainer">
      <div class="welcome-message" v-if="messages.length === 0">
        <div class="message bot-message">
          <div class="message-content">
            <p>こんにちは！進路相談アシスタントです！
            </p>
            <p>進路や転職について、どのようなことでお悩みですか？お気軽にご相談ください。</p>
          </div>
        </div>
        <div class="quick-options">
          <button 
            v-for="option in quickStartOptions" 
            :key="option.text"
            @click="sendQuickOption(option)"
            class="quick-option-btn"
          >
            {{ option.text }}
          </button>
        </div>
      </div>

      <div 
        v-for="(message, index) in messages" 
        :key="index"
        class="message"
        :class="{ 'user-message': message.role === 'user', 'bot-message': message.role === 'assistant' }"
      >
        <div class="message-content">
          <p>{{ message.content }}</p>
          <span class="message-time">{{ formatTime(message.timestamp) }}</span>
        </div>
      </div>

      <!-- 職業提案カード -->
      <div v-if="suggestedProfessions.length > 0" class="profession-suggestions">
        <h4>💼 おすすめの職業</h4>
        <div class="profession-cards">
          <div 
            v-for="profession in suggestedProfessions" 
            :key="profession"
            class="profession-card"
            @click="exploreProfession(profession)"
          >
            <span class="profession-name">{{ profession }}</span>
            <svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- 次の質問候補 -->
      <div v-if="nextQuestions.length > 0" class="next-questions">
        <p class="questions-label">💭 こんなことも聞かせてください：</p>
        <div class="question-buttons">
          <button 
            v-for="question in nextQuestions" 
            :key="question"
            @click="askQuestion(question)"
            class="question-btn"
          >
            {{ question }}
          </button>
        </div>
      </div>

      <!-- 診断推奨バナー -->
      <div v-if="shouldShowDiagnosisRecommendation" class="diagnosis-recommendation">
        <div class="recommendation-content">
          <h4>🎯 より詳しく適性を知りたい方へ</h4>
          <p>科学的な適性診断で、あなたにぴったりの職業を発見しませんか？</p>
          <div class="recommendation-actions">
            <router-link to="/diagnosis" class="diagnosis-btn">
              適性診断を受ける
            </router-link>
            <button @click="dismissDiagnosisRecommendation" class="dismiss-btn">
              後で
            </button>
          </div>
        </div>
      </div>

      <!-- タイピングインジケーター -->
      <div v-if="isTyping" class="message bot-message typing-indicator">
        <div class="message-content">
          <div class="typing-animation">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>

    <div class="chat-input">
      <div class="input-container">
        <textarea
          v-model="currentMessage"
          @keydown="handleKeyDown"
          @input="adjustTextareaHeight"
          ref="messageInput"
          placeholder="進路について相談したいことを入力してください..."
          rows="1"
          :disabled="isTyping || !canSendMessage"
        ></textarea>
        <button 
          @click="sendMessage" 
          :disabled="!currentMessage.trim() || isTyping || !canSendMessage"
          class="send-btn"
          aria-label="メッセージを送信"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- 使用状況表示 -->
    <div class="usage-stats" v-if="usageStats">
      <div class="usage-bar">
        <div class="usage-label">メッセージ数: {{ usageStats.sessionMessages }}/{{ RATE_LIMITS.MAX_MESSAGES_PER_SESSION }}</div>
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: (usageStats.sessionMessages / RATE_LIMITS.MAX_MESSAGES_PER_SESSION * 100) + '%' }"
            :class="{ 'warning': usageStats.sessionMessages >= RATE_LIMITS.MAX_MESSAGES_PER_SESSION * 0.8 }"
          ></div>
        </div>
      </div>
      <div class="usage-limits">
        <span class="limit-item" :class="{ 'exceeded': usageStats.hourlyMessages >= RATE_LIMITS.MAX_MESSAGES_PER_HOUR }">
          ⏰ 1時間: {{ usageStats.hourlyMessages }}/{{ RATE_LIMITS.MAX_MESSAGES_PER_HOUR }}
        </span>
        <span class="limit-item" :class="{ 'exceeded': usageStats.dailyMessages >= RATE_LIMITS.MAX_MESSAGES_PER_DAY }">
          📅 本日: {{ usageStats.dailyMessages }}/{{ RATE_LIMITS.MAX_MESSAGES_PER_DAY }}
        </span>
      </div>
      <div v-if="cooldownRemaining > 0" class="cooldown-message">
        ⏳ {{ cooldownRemaining }}秒後に送信可能
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref, nextTick, onMounted, computed, onUnmounted } from 'vue';
import { ClaudeApiClient, getClaudeApiClient, type ChatMessage, type CareerAdviceResponse } from '../utils/claudeApiClient';
import { professionDataManager } from '../utils/professionDataManager';

// Emits
const emit = defineEmits<{
  close: [];
}>();

// claudeApiClientのRATE_LIMITSを直接参照
const RATE_LIMITS = (ClaudeApiClient as any).RATE_LIMITS;

// リアクティブデータ
const messages = ref<ChatMessage[]>([]);
const currentMessage = ref('');
const isTyping = ref(false);
const messagesContainer = ref<HTMLElement>();
const messageInput = ref<HTMLTextAreaElement>();

// 使用状況
const usageStats = ref<{
  sessionMessages: number;
  hourlyMessages: number;
  dailyMessages: number;
  canSendMessage: boolean;
  nextAvailableTime?: number;
} | null>(null);
const cooldownRemaining = ref(0);
const cooldownTimer = ref<number | null>(null);

// 送信可能状態
const canSendMessage = computed(() => {
  return usageStats.value?.canSendMessage ?? true;
});

// Claude APIの回答から抽出した情報
const suggestedProfessions = ref<string[]>([]);
const nextQuestions = ref<string[]>([]);
const shouldShowDiagnosisRecommendation = ref(false);

// クイックスタートオプション
const quickStartOptions = [
  { text: '将来やりたいことが見つからない', content: '将来やりたいことが見つからず、進路選択に悩んでいます。どう考えればいいですか？' },
  { text: '文系・理系どちらを選ぶべきか迷っている', content: '文系・理系どちらを選ぶべきか迷っています。自分に合う選び方を知りたいです。' },
  { text: '部活と勉強の両立が難しい', content: '部活と勉強の両立が難しく、進路に不安があります。アドバイスがほしいです。' },
  { text: '志望校・学部の選び方がわからない', content: '志望校や学部の選び方がわかりません。どうやって決めればいいでしょうか？' }
];

// ユーザープロフィール（会話から推測）
const userProfile = ref({
  age: undefined as number | undefined,
  currentStatus: '',
  interests: [] as string[],
  skills: [] as string[],
  concerns: [] as string[]
});

/**
 * コンポーネント初期化
 */
onMounted(async () => {
  try {
    await professionDataManager.initialize();
    updateUsageStats();
    startCooldownTimer();
  } catch (error) {
    console.error('職業データの初期化に失敗:', error);
  }
});

/**
 * コンポーネント破棄時の処理
 */
onUnmounted(() => {
  if (cooldownTimer.value) {
    clearInterval(cooldownTimer.value);
  }
});

/**
 * 使用状況を更新
 */
function updateUsageStats() {
  const claudeClient = getClaudeApiClient();
  usageStats.value = claudeClient.getUsageStats();
}

/**
 * クールダウンタイマーを開始
 */
function startCooldownTimer() {
  cooldownTimer.value = window.setInterval(() => {
    if (usageStats.value?.nextAvailableTime) {
      const remaining = Math.max(0, Math.ceil((usageStats.value.nextAvailableTime - Date.now()) / 1000));
      cooldownRemaining.value = remaining;
      
      if (remaining === 0) {
        updateUsageStats();
      }
    } else {
      cooldownRemaining.value = 0;
    }
  }, 1000);
}

/**
 * クイックオプションを送信
 */
function sendQuickOption(option: { text: string, content: string }) {
  sendUserMessage(option.content);
}

/**
 * メッセージを送信
 */
async function sendMessage() {
  if (!currentMessage.value.trim() || isTyping.value || !canSendMessage.value) return;
  
  await sendUserMessage(currentMessage.value.trim());
  currentMessage.value = '';
  resetTextareaHeight();
}

/**
 * ユーザーメッセージを送信してAIの回答を取得
 */
async function sendUserMessage(content: string) {
  // ユーザーメッセージを追加
  const userMessage: ChatMessage = {
    role: 'user',
    content,
    timestamp: new Date()
  };
  messages.value.push(userMessage);
  
  // 自動スクロール
  await nextTick();
  scrollToBottom();
  
  // AI回答を取得
  await getAIResponse();
}

/**
 * AIからの回答を取得
 */
async function getAIResponse() {
  isTyping.value = true;
  
  try {
    const claudeClient = getClaudeApiClient();
    const response: CareerAdviceResponse = await claudeClient.getCareerAdvice({
      messages: messages.value,
      userProfile: userProfile.value
    });
    
    // AIメッセージを追加
    const aiMessage: ChatMessage = {
      role: 'assistant',
      content: response.message,
      timestamp: new Date()
    };
    messages.value.push(aiMessage);
    
    // 提案情報を更新
    suggestedProfessions.value = response.suggestedProfessions || [];
    nextQuestions.value = response.nextQuestions || [];
    
    // 使用状況を更新
    updateUsageStats();
    
    if (response.shouldRecommendDiagnosis) {
      shouldShowDiagnosisRecommendation.value = true;
    }
    
    // ユーザープロフィールを推測・更新
    updateUserProfile(messages.value[messages.value.length - 2].content);
    
  } catch (error) {
    console.error('AI回答取得エラー:', error);
    const errorMessage: ChatMessage = {
      role: 'assistant',
      content: 'すみません、一時的にサービスが利用できません。しばらく後にもう一度お試しください。',
      timestamp: new Date()
    };
    messages.value.push(errorMessage);
  } finally {
    isTyping.value = false;
    await nextTick();
    scrollToBottom();
  }
}

/**
 * 職業を探索
 */
function exploreProfession(professionName: string) {
  sendUserMessage(`${professionName}について詳しく教えてください。`);
}

/**
 * 質問を送信
 */
function askQuestion(question: string) {
  sendUserMessage(question);
  nextQuestions.value = [];
}

/**
 * 診断推奨を非表示
 */
function dismissDiagnosisRecommendation() {
  shouldShowDiagnosisRecommendation.value = false;
}

/**
 * ユーザープロフィールを更新
 */
function updateUserProfile(userMessage: string) {
  const message = userMessage.toLowerCase();
  
  // 年齢を推測
  const ageMatch = message.match(/(\d{1,2})歳|(\d{1,2})才/);
  if (ageMatch) {
    userProfile.value.age = parseInt(ageMatch[1] || ageMatch[2]);
  }
  
  // 現在の状況を推測
  if (message.includes('学生') || message.includes('大学') || message.includes('高校')) {
    userProfile.value.currentStatus = '学生';
  } else if (message.includes('転職') || message.includes('会社員') || message.includes('社会人')) {
    userProfile.value.currentStatus = '社会人';
  }
  
  // 興味や関心を抽出
  const interests = ['プログラミング', 'デザイン', '営業', '教育', '医療', '金融', '料理', '美容', 'スポーツ'];
  interests.forEach(interest => {
    if (message.includes(interest.toLowerCase()) && !userProfile.value.interests.includes(interest)) {
      userProfile.value.interests.push(interest);
    }
  });
}

/**
 * キーボードイベント処理
 */
function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
}

/**
 * テキストエリアの高さを調整
 */
function adjustTextareaHeight() {
  const textarea = messageInput.value;
  if (textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  }
}

/**
 * テキストエリアの高さをリセット
 */
function resetTextareaHeight() {
  const textarea = messageInput.value;
  if (textarea) {
    textarea.style.height = 'auto';
  }
}

/**
 * メッセージ領域を最下部にスクロール
 */
function scrollToBottom() {
  const container = messagesContainer.value;
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
}

/**
 * 時刻をフォーマット
 */
function formatTime(date: Date): string {
  return date.toLocaleTimeString('ja-JP', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins.scss' as mixins;
/* ==========================================================================
   チャットbot基本レイアウト
   ========================================================================== */
.career-chat-bot {
  @include mixins.flex-column;
  @include mixins.card-base;
  @include mixins.card-shadow(lg);
  height: 600px;
  max-height: 80vh;
  width: 100%;
  max-width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-sizing: border-box;
  
  &.full-width-chat {
    height: 100%;
    max-height: 100%;
    width: 100%;
    max-width: 100%;
    border-radius: 0;
  }
}

/* ==========================================================================
   チャットヘッダー
   ========================================================================== */
.chat-header {
  @include mixins.flex-row(var(--space-sm));
  @include mixins.section-padding(sm);
  background: var(--primary-navy);
  color: white;
}

.bot-avatar {
  @include mixins.flex-center;
  width: 40px;
  height: 40px;
  background: var(--accent-blue);
  border-radius: 50%;
  flex-shrink: 0;
}

.bot-info {
  flex: 1;
}

.bot-info h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.close-chat {
  @include mixins.button-base;
  background: none;
  border: none;
  color: white;
  padding: var(--space-xs);
  border-radius: 6px;
}

.close-chat:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* ==========================================================================
   チャットメッセージ
   ========================================================================== */
.chat-messages {
  @include mixins.flex-column(var(--space-md));
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: var(--space-md);
  width: 100%;
  box-sizing: border-box;
}

.message {
  @include mixins.flex-row;
  @include mixins.fade-in;
  width: 100%;
  box-sizing: border-box;
}

.user-message {
  justify-content: flex-end;
}

.bot-message {
  justify-content: flex-start;
}

.message-content {
  @include mixins.card-base;
  @include mixins.card-padding(sm);
  max-width: min(70%, calc(100% - var(--space-md)));
  border-radius: 18px;
  position: relative;
  word-wrap: break-word;
  overflow-wrap: break-word;
  box-sizing: border-box;
}

.user-message .message-content {
  background: var(--primary-navy);
  color: white;
  border-bottom-right-radius: 6px;
}

.bot-message .message-content {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border-bottom-left-radius: 6px;
}

.message-content p {
  margin: 0;
  line-height: 1.5;
  word-wrap: break-word;
}

.message-time {
  font-size: 0.75rem;
  opacity: 0.6;
  display: block;
  margin-top: var(--space-xs);
}

/* ==========================================================================
   ウェルカムメッセージとクイックオプション
   ========================================================================== */
.welcome-message {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: var(--space-md);
}

.quick-options {
  display: flex;
  flex-direction: column;
  gap: 2%;
  width: 100%;
  margin-top: auto;
}

.quick-option-btn {
  @include mixins.button-base;
  @include mixins.button-outline;
  flex: 1 1 calc(48% - 1%);
  min-width: 0;
  border-radius: 12px;
  text-align: center;
  font-size: clamp(0.75rem, 2.5vw, 0.9rem);
  word-wrap: break-word;
  white-space: normal;
  box-sizing: border-box;
}

.quick-option-btn:hover {
  border-color: var(--primary-navy);
  background: var(--bg-secondary);
  transform: translateY(-1px);
}

/* ==========================================================================
   職業提案カード
   ========================================================================== */
.profession-suggestions {
  @include mixins.card-base;
  @include mixins.card-padding(md);
  margin: var(--space-md) 0;
  border-radius: 12px;
}

.profession-suggestions h4 {
  margin: 0 0 var(--space-sm) 0;
  color: var(--primary-navy);
  font-size: 1rem;
}

.profession-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 2%;
  width: 100%;
}

.profession-card {
  @include mixins.flex-between;
  @include mixins.card-base;
  @include mixins.card-padding(sm);
  flex: 1 1 calc(48% - 1%);
  min-width: 0;
  border-radius: 8px;
  cursor: pointer;
  box-sizing: border-box;
}

.profession-card:hover {
  @include mixins.card-shadow(sm);
  border-color: var(--primary-navy);
  transform: translateY(-1px);
}

.profession-name {
  font-weight: 500;
  color: var(--text-primary);
}

.arrow-icon {
  color: var(--text-secondary);
  transition: transform var(--transition-fast);
}

.profession-card:hover .arrow-icon {
  transform: translateX(4px);
}

/* ==========================================================================
   次の質問候補
   ========================================================================== */
.next-questions {
  margin: var(--space-md) 0;
}

.questions-label {
  margin: 0 0 var(--space-sm) 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.question-buttons {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  width: 100%;
}

.question-btn {
  @include mixins.button-base;
  @include mixins.button-outline;
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border-radius: 8px;
  text-align: left;
  font-size: clamp(0.8rem, 2.5vw, 0.85rem);
  word-wrap: break-word;
  box-sizing: border-box;
}

.question-btn:hover {
  border-color: var(--primary-navy);
  background: var(--primary-navy);
  color: white;
}

/* ==========================================================================
   使用状況表示
   ========================================================================== */
.usage-stats {
  @include mixins.card-padding(sm);
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
}

.usage-bar {
  margin-bottom: var(--space-xs);
}

.usage-label {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: var(--bg-primary);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--accent-blue);
  transition: width 0.3s ease, background-color 0.3s ease;
}

.progress-fill.warning {
  background: var(--warning-color, #ff9800);
}

.usage-limits {
  @include mixins.flex-row(var(--space-md));
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.limit-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.limit-item.exceeded {
  color: var(--error-color, #f44336);
  font-weight: 600;
}

.cooldown-message {
  margin-top: var(--space-xs);
  padding: var(--space-xs) var(--space-sm);
  background: var(--warning-bg, rgba(255, 152, 0, 0.1));
  color: var(--warning-color, #ff9800);
  border-radius: 6px;
  font-size: 0.85rem;
  text-align: center;
  animation: pulse 1s ease-in-out infinite;
}

/* ==========================================================================
   診断推奨バナー
   ========================================================================== */
.diagnosis-recommendation {
  margin: var(--space-md) 0;
  padding: var(--space-md);
  background: linear-gradient(135deg, var(--accent-blue) 0%, var(--primary-navy) 100%);
  color: white;
  border-radius: 12px;
  box-shadow: var(--shadow-md);
}

.recommendation-content h4 {
  margin: 0 0 var(--space-xs) 0;
  font-size: 1.1rem;
}

.recommendation-content p {
  margin: 0 0 var(--space-md) 0;
  opacity: 0.9;
  line-height: 1.5;
}

.recommendation-actions {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.diagnosis-btn {
  background: white;
  color: var(--primary-navy);
  padding: var(--space-sm) var(--space-md);
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all var(--transition-fast);
  display: inline-block;
}

.diagnosis-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.dismiss-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: var(--space-sm) var(--space-md);
  border-radius: 8px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.dismiss-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* ==========================================================================
   タイピングインジケーター
   ========================================================================== */
.typing-indicator .message-content {
  padding: var(--space-md);
}

.typing-animation {
  display: flex;
  gap: 4px;
  align-items: center;
}

.typing-animation span {
  width: 8px;
  height: 8px;
  background: var(--text-secondary);
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-animation span:nth-child(1) { animation-delay: -0.32s; }
.typing-animation span:nth-child(2) { animation-delay: -0.16s; }

/* ==========================================================================
   チャット入力
   ========================================================================== */
.chat-input {
  padding: var(--space-md);
  border-top: 1px solid var(--border-light);
  background: var(--bg-primary);
  width: 100%;
  box-sizing: border-box;
}

.input-container {
  display: flex;
  gap: var(--space-sm);
  align-items: flex-end;
  width: 100%;
  box-sizing: border-box;
}

.input-container textarea {
  flex: 1;
  min-width: 0;
  width: 100%;
  border: 2px solid var(--border-light);
  border-radius: 12px;
  padding: var(--space-sm) var(--space-md);
  font-size: clamp(0.75rem, 2vw, 0.875rem);
  font-family: inherit;
  line-height: 1.5;
  resize: none;
  min-height: 44px; /* 最小高さを設定 */
  max-height: 120px;
  transition: border-color var(--transition-fast);
  background: var(--bg-primary);
  color: var(--text-primary);
  box-sizing: border-box;
  overflow-y: hidden; /* 初期状態でスクロールバーを非表示 */
}

/* テキスト入力時のみスクロール可能に */
.input-container textarea:not(:placeholder-shown) {
  overflow-y: auto;
}

/* プレースホルダーのスタイル調整 */
.input-container textarea::placeholder {
  font-size: clamp(0.7rem, 1.8vw, 0.85rem);
  color: var(--text-secondary);
  opacity: 0.7;
  white-space: nowrap; /* 改行を防ぐ */
  overflow: hidden;
  text-overflow: ellipsis; /* 長すぎる場合は省略 */
}

.input-container textarea:focus {
  outline: none;
  border-color: var(--primary-navy);
}

.input-container textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.send-btn {
  width: 44px;
  height: 44px;
  background: var(--primary-navy);
  border: none;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.send-btn:hover:not(:disabled) {
  background: var(--primary-blue);
  transform: translateY(-1px);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* ==========================================================================
   アニメーション
   ========================================================================== */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}

@keyframes typing {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* ==========================================================================
   レスポンシブデザイン
   ========================================================================== */
/* 小さめタブレット用 (481px - 768px) */
@media (max-width: 768px) and (min-width: 481px) {
  .input-container textarea {
    font-size: 16px;
    min-height: 42px;
  }
  
  .input-container textarea::placeholder {
    font-size: calc(11px + 0.4vw);
  }
}

/* タブレット以下全般 */
@media (max-width: 768px) {
  .career-chat-bot {
    height: 100%;
    max-height: 100%;
    border-radius: 0;
    width: 100%;
    max-width: 100%;
    
    &.full-width-chat {
      height: 100%;
      max-height: 100%;
      width: 100%;
      max-width: 100%;
    }
  }

  .chat-messages {
    padding: var(--space-sm) var(--space-sm);
  }

  .message-content {
    max-width: min(85%, calc(100vw - var(--space-lg)));
    padding: var(--space-sm) var(--space-md);
    font-size: clamp(0.875rem, 3vw, 1rem);
  }

  .quick-option-btn {
    flex: 1 1 100%;
    min-height: 44px;
    padding: var(--space-sm) var(--space-md);
  }

  .profession-card {
    flex: 1 1 100%;
    min-height: 48px;
  }

  .question-btn {
    min-height: 44px;
    padding: var(--space-sm) var(--space-md);
  }

  .recommendation-actions {
    flex-direction: column;
  }

  .diagnosis-btn,
  .dismiss-btn {
    text-align: center;
  }
}

@media (max-width: 480px) {
  .chat-header {
    padding: var(--space-sm);
    width: 100vw;
    max-width: 100vw;
    box-sizing: border-box;
  }

  .chat-messages {
    padding: var(--space-sm);
    width: 100vw;
    max-width: 100vw;
  }

  .chat-input {
    padding: var(--space-sm);
    width: 100vw;
    max-width: 100vw;
  }

  .input-container {
    width: 100%;
    max-width: calc(100vw - var(--space-md));
  }

  .bot-info h3 {
    font-size: 1rem;
  }

  .input-container textarea {
    font-size: 16px;
    width: 100%;
    min-width: 0;
    min-height: 40px;
    padding: 10px 12px;
    line-height: 1.3;
  }
  
  /* モバイル用プレースホルダー調整 - 画面幅に応じて動的に調整 */
  .input-container textarea::placeholder {
    font-size: clamp(16px, calc(10px + 0.5vw), 20px); /* 320px: 11.6px, 375px: 11.875px, 414px: 12.07px */
    letter-spacing: -0.02em; /* 文字間を少し詰める */
  }

  .send-btn {
    flex-shrink: 0;
    width: 44px;
    height: 44px;
  }
}


</style>