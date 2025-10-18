<template>
  <div 
    class="swipe-card"
    :class="{ 
      'swiping': isSwiping,
      'swipe-left': swipeDirection === 'left',
      'swipe-right': swipeDirection === 'right',
      'visible': isVisible
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
      transform: isVisible ? `translate(calc(-50% + ${translateX}px), -50%) rotate(${rotation}deg)` : 'translate(-50%, -50%) scale(0.8) translateY(30px)',
      transition: isSwiping ? 'none' : (isAnimatingNo || isAnimatingYes) ? 'all 0.8s cubic-bezier(0.43, 0.13, 0.23, 0.96)' : isVisible ? 'all 0.3s ease' : 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }"
  >
    <div class="progress-header">
      <div class="progress-text">質問 {{ currentIndex + 1 }} / {{ totalCount }}</div>
    </div>
    
    <div class="option-text">{{ option.text }}</div>
      
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

// Props
interface Props {
  questionId: string
  option: {
    label: string
    text: string
  }
  currentRating: number | null
  currentIndex: number
  totalCount: number
}

const props = defineProps<Props>()

// Emits
interface Emits {
  'select-rating': [questionId: string, optionLabel: string, rating: number]
  'answer-completed': []
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
const isVisible = ref(false)

// スワイプの閾値
const SWIPE_THRESHOLD = 100
const ROTATION_FACTOR = 0.2

// 回答状態の監視
watch(() => props.currentRating, (newVal) => {
  hasAnswered.value = newVal !== null
})

// 質問・オプションの変更監視
watch(() => [props.questionId, props.option.label], () => {
  // 新しい質問/オプションが表示される時にディゾルブ効果を再実行
  isVisible.value = false
  setTimeout(() => {
    isVisible.value = true
  }, 150)
}, { deep: true })

// ディゾルブ効果（マウント後に表示）
onMounted(() => {
  // 少し遅延してからフェードイン開始
  setTimeout(() => {
    isVisible.value = true
  }, 100)
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
  
  // 現在の位置と回転を保持（ユーザーがスワイプした位置から開始）
  const currentX = translateX.value
  const currentRotation = rotation.value
  
  // 色変更とアニメーション開始
  if (rating === 1) {
    isAnimatingNo.value = true
    // 現在位置から左へ飛ばす
    translateX.value = currentX - window.innerWidth * 1.5
    rotation.value = currentRotation - 60
  } else {
    isAnimatingYes.value = true
    // 現在位置から右へ飛ばす
    translateX.value = currentX + window.innerWidth * 1.5
    rotation.value = currentRotation + 60
  }
  
  // 回答を送信
  emit('select-rating', props.questionId, props.option.label, rating)
  
  // 排出アニメーション完了後に次の質問へ進む
  setTimeout(() => {
    // 次のカード用にリセット
    resetForNextCard()
    emit('answer-completed')
  }, 800)
}

// 次のカード用のリセット処理
function resetForNextCard() {
  isVisible.value = false
  hasAnswered.value = false
  isAnimatingNo.value = false
  isAnimatingYes.value = false
  translateX.value = 0
  rotation.value = 0
  swipeDirection.value = null
}
</script>

<style lang="scss" scoped>
.swipe-card {
  width: 50%;
  max-width: 400px;
  aspect-ratio: 3/4;
  position: relative;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  padding: var(--space-sm);
  cursor: grab; // マウスを掴める手の形にする
  touch-action: pan-y; // スクロールを制御
  will-change: transform, opacity; // transform/opacityのアニメーションをすることを事前に伝える
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: var(--space-md) auto 0;
  left: 25%;
  top: 50%;

  opacity: 0;
  transition: opacity 0.8s ease, 
              transform 0.8s ease,
              background 0.1s ease;
  
  &.visible {
    opacity: 1;
  }

  &.swiping {
    cursor: grabbing; // 掴んでいる手の形にする
    
    &.swipe-left {
      background: rgba(255, 107, 107, 0.7);
    }
    
    &.swipe-right {
      background: rgba(81, 207, 102, 0.7);
    }
  }
}

.progress-header {
  position: absolute;
  top: clamp(12px, 3vw, 20px);
  right: clamp(12px, 3vw, 20px);
  z-index: 3;
}

.progress-text {
  font-size: clamp(0.7rem, 2vw, 0.9rem);
  color: var(--text-secondary);
  background: var(--bg-tertiary);
  padding: var(--space-xs, 4px) var(--space-sm, 8px);
  border-radius: 20px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.option-text {
  font-size: clamp(1.5rem, 2vw, 2rem);
  line-height: 1.4;
  color: var(--text-primary);
  text-align: center;
  font-weight: 500;
  letter-spacing: 0.02em;
  white-space: normal;
  overflow: visible;
  overflow-wrap: break-word;
  padding: 0 var(--space-sm);
}

@media (max-width: 480px) {
  .swipe-card {
    width: 80vw;
    height: 65vh;
    left: 45%;
    top: 45%;
  }
}
</style>