<!--
  スワイプ式2値回答コンポーネント
  左スワイプ：全く当てはまらない（1）
  右スワイプ：よく当てはまる（5）
-->
<template>
  <div class="swipe-answer-container">
    <!-- 質問カード -->
    <div 
      class="swipe-card"
      :class="{ 
        'swiping': isSwiping,
        'swipe-left': swipeDirection === 'left',
        'swipe-right': swipeDirection === 'right',
        'answered': hasAnswered,
        'selected-no': isAnimatingNo,
        'selected-yes': isAnimatingYes
      }"
      ref="swipeCardRef"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseUp"
      :style="{
        transform: `translateX(${translateX}px) rotate(${rotation}deg)`,
        transition: isSwiping ? 'none' : 'all 0.3s ease'
      }"
    >
      <div class="card-content">
        <div class="option-header">
          <div class="option-text">{{ option.text }}</div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

// Props
interface Props {
  questionId: string
  option: {
    label: string
    text: string
  }
  currentRating: number | null
}

const props = defineProps<Props>()

// Emits
interface Emits {
  'select-rating': [questionId: string, optionLabel: string, rating: number]
}

const emit = defineEmits<Emits>()

// リアクティブデータ
const swipeCardRef = ref<HTMLElement>()
const isSwiping = ref(false)
const startX = ref(0)
const translateX = ref(0)
const rotation = ref(0)
const swipeDirection = ref<'left' | 'right' | null>(null)
const hasAnswered = ref(false)
const isAnimatingNo = ref(false)
const isAnimatingYes = ref(false)

// スワイプの閾値
const SWIPE_THRESHOLD = 100
const ROTATION_FACTOR = 0.2

// 回答状態の監視
watch(() => props.currentRating, (newVal) => {
  hasAnswered.value = newVal !== null
})

// タッチイベントハンドラー
function handleTouchStart(event: TouchEvent) {
  if (event.touches.length !== 1) return
  startSwipe(event.touches[0].clientX)
}

function handleTouchMove(event: TouchEvent) {
  if (event.touches.length !== 1 || !isSwiping.value) return
  event.preventDefault()
  updateSwipe(event.touches[0].clientX)
}

function handleTouchEnd() {
  endSwipe()
}

// マウスイベントハンドラー（デスクトップサポート）
function handleMouseDown(event: MouseEvent) {
  event.preventDefault()
  startSwipe(event.clientX)
}

function handleMouseMove(event: MouseEvent) {
  if (!isSwiping.value) return
  event.preventDefault()
  updateSwipe(event.clientX)
}

function handleMouseUp() {
  endSwipe()
}

// スワイプ処理
function startSwipe(x: number) {
  isSwiping.value = true
  startX.value = x
  translateX.value = 0
  rotation.value = 0
}

function updateSwipe(x: number) {
  const deltaX = x - startX.value
  translateX.value = deltaX
  rotation.value = deltaX * ROTATION_FACTOR
  
  // スワイプ方向の判定（より敏感に）
  if (deltaX < -15) {
    swipeDirection.value = 'left'
  } else if (deltaX > 15) {
    swipeDirection.value = 'right'
  } else {
    swipeDirection.value = null
  }
}

function endSwipe() {
  if (!isSwiping.value) return
  
  isSwiping.value = false
  
  // スワイプ距離が閾値を超えていたら選択
  if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
    const rating = translateX.value < 0 ? 1 : 5
    selectAnswer(rating)
    
    // アニメーション後にリセット
    setTimeout(() => {
      resetCard()
    }, 300)
  } else {
    // 閾値未満なら元に戻す
    resetCard()
  }
}

function resetCard() {
  translateX.value = 0
  rotation.value = 0
  swipeDirection.value = null
}

// 回答選択
function selectAnswer(rating: number) {
  hasAnswered.value = true
  
  // 色変更アニメーション
  if (rating === 1) {
    isAnimatingNo.value = true
    translateX.value = -200
    rotation.value = -30
  } else {
    isAnimatingYes.value = true
    translateX.value = 200
    rotation.value = 30
  }
  
  // 少し遅延してから回答を送信
  setTimeout(() => {
    emit('select-rating', props.questionId, props.option.label, rating)
    
    // アニメーション後にリセット
    setTimeout(() => {
      resetCard()
      isAnimatingNo.value = false
      isAnimatingYes.value = false
    }, 200)
  }, 300)
}
</script>

<style lang="scss" scoped>
.swipe-answer-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  padding: var(--space-sm);
  position: relative;
  min-height: 350px;
  width: 95%;
  max-width: 900px;
  margin: 0 auto;
}

// スワイプカード
.swipe-card {
  position: relative;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  padding: var(--space-xxl) var(--space-xl);
  cursor: grab;
  user-select: none;
  touch-action: pan-y;
  will-change: transform;
  width: 100%;
  min-height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &.swiping {
    cursor: grabbing;
    
    // スワイプ中の背景色変化
    &.swipe-left {
      background: linear-gradient(135deg, rgba(255, 107, 107, 0.7), rgba(255, 135, 135, 0.7)) !important;
      transition: background 0.1s ease;
      
      .option-text {
        color: white;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      }
    }
    
    &.swipe-right {
      background: linear-gradient(135deg, rgba(81, 207, 102, 0.7), rgba(105, 219, 124, 0.7)) !important;
      transition: background 0.1s ease;
      
      .option-text {
        color: white;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      }
    }
  }
  
  // 選択時の色変更アニメーション
  &.selected-no {
    background: linear-gradient(135deg, #ff6b6b, #ff8787) !important;
    border: 2px solid #ff5252;
    animation: pulseRed 0.5s ease;
    
    .option-text {
      color: white;
    }
  }
  
  &.selected-yes {
    background: linear-gradient(135deg, #51cf66, #69db7c) !important;
    border: 2px solid #40c057;
    animation: pulseGreen 0.5s ease;
    
    .option-text {
      color: white;
    }
  }
}

.card-content {
  position: relative;
  z-index: 2;
}

.option-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--space-lg);
}

.option-text {
  font-size: 1.5rem;
  line-height: 1.7;
  color: var(--text-primary);
  text-align: center;
  font-weight: 500;
  letter-spacing: 0.02em;
}

// モバイル最適化
@media (max-width: 768px) {
  .swipe-answer-container {
    width: 98%;
    padding: var(--space-xs);
    min-height: 300px;
  }
  
  .swipe-card {
    padding: var(--space-xl) var(--space-lg);
    min-height: 240px;
  }
  
  .option-text {
    font-size: 1.25rem;
    line-height: 1.6;
  }
}

// アニメーション
@keyframes swipeLeft {
  to {
    transform: translateX(-150%) rotate(-30deg);
    opacity: 0;
  }
}

@keyframes swipeRight {
  to {
    transform: translateX(150%) rotate(30deg);
    opacity: 0;
  }
}

@keyframes pulseRed {
  0% {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  }
  50% {
    box-shadow: 0 8px 40px rgba(255, 107, 107, 0.5);
    transform: scale(1.02);
  }
  100% {
    box-shadow: 0 8px 32px rgba(255, 107, 107, 0.3);
  }
}

@keyframes pulseGreen {
  0% {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  }
  50% {
    box-shadow: 0 8px 40px rgba(81, 207, 102, 0.5);
    transform: scale(1.02);
  }
  100% {
    box-shadow: 0 8px 32px rgba(81, 207, 102, 0.3);
  }
}
</style>