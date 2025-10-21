<template>
  <div 
    class="tutorial-swipe-card"
    :class="{ 
      'swiping': isSwiping,
      'swipe-left': swipeDirection === 'left',
      'swipe-right': swipeDirection === 'right',
      'visible': isVisible
    }"
    ref="tutorialCardRef"
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
    <div class="tutorial-card-content">
      <div class="tutorial-header">
        <h2 class="tutorial-title">使い方</h2>
        <div class="tutorial-progress">質問 {{ questionIndex + 1 }} / {{ totalQuestions }}</div>
      </div>
      
      <div class="tutorial-instructions">
        <div class="tutorial-main-text">
          <template v-if="categoryInfo">
            {{ categoryInfo.description }}
          </template>
          <template v-else>
            {{ mainQuestion }}
          </template>
        </div>
        
        <div class="tutorial-swipe-demo">
            <div class="swipe-left-demo">
              <span>←</span>
              <small>当てはまらない</small>
            </div>
            <div class="swipe-right-demo">
              <span>→</span>
              <small>当てはまる</small>
            </div>
        </div>
        
        <div class="tutorial-instruction-text">
          このカードを左右にスワイプして回答してください
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

interface Props {
  mainQuestion: string
  questionIndex: number
  totalQuestions: number
  categoryInfo?: {
    name: string
    description: string
    icon: string
  } | null
}

interface Emits {
  'tutorial-completed': []
}

const emit = defineEmits<Emits>()

const props = defineProps<Props>()  // 参照されていないように見えるが必要

// リアクティブデータ
const tutorialCardRef = ref<HTMLElement>()
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

// ディゾルブ効果（マウント後に表示）
onMounted(() => {
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
  
  // スワイプ方向の判定
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
  
  // スワイプ距離が閾値を超えていたらチュートリアル完了
  if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
    completeTutorial()
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

// チュートリアル完了処理
function completeTutorial() {
  hasAnswered.value = true
  
  // 現在の位置と回転を保持
  const currentX = translateX.value
  const currentRotation = rotation.value
  
  // 色変更とアニメーション開始
  if (translateX.value < 0) {
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
  
  // アニメーション完了後にイベント発火
  setTimeout(() => {
    emit('tutorial-completed')
  }, 800)
}
</script>

<style lang="scss" scoped>
.tutorial-swipe-card {
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

.tutorial-card-content {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.tutorial-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: var(--space-lg);
}

.tutorial-title {
  font-family: var(--font-heading);
  font-size: clamp(1.2rem, 4vw, 1.6rem);
  color: var(--primary-navy);
  font-weight: 600;
  margin: 0;
}

.tutorial-progress {
  font-size: clamp(0.7rem, 2vw, 0.9rem);
  color: var(--text-secondary);
  background: var(--bg-tertiary);
  padding: var(--space-xs) var(--space-sm);
  border-radius: 20px;
}

.tutorial-instructions {
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.tutorial-main-text {
  font-size: clamp(1rem, 3.5vw, 1.4rem);
  color: var(--text-primary);
  font-weight: 500;
  margin-bottom: var(--space-lg);
  line-height: 1.4;
  padding: 0 var(--space-sm);
}

.tutorial-swipe-demo {
  margin-bottom: var(--space-lg);
  display: flex;
  justify-content: center;
  align-items: center;
}

.swipe-left-demo, .swipe-right-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
  
  span {
    font-size: clamp(1.2rem, 4vw, 1.8rem);
    font-weight: bold;
  }
  
  small {
    font-size: clamp(0.7rem, 2vw, 0.9rem);
    color: var(--text-secondary);
  }
}

.swipe-left-demo span {
  color: #ff6b6b;
}

.swipe-right-demo span {
  color: #51cf66;
}

.tutorial-instruction-text {
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  color: var(--text-primary);
  font-weight: 500;
  margin: 0;
  line-height: 1.4;
  padding: 0 var(--space-sm);
}

@media (max-width: 480px) {
  .tutorial-swipe-card {
    width: 80vw;
    height: 65vh;
    left: 45%;
    top: 45%;
  }

  .tutorial-header {
    padding-top: 10px;
    padding-left: 8px;
    padding-right: 8px;
  }
}
</style>