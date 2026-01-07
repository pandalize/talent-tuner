<template>
  <div 
    class="tutorial-swipe-card"
    :class="{
      'swiping': isSwiping,
      'swipe-left': swipeDirection === 'left',
      'swipe-right': swipeDirection === 'right',
      'visible': isVisible
    }"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
    :style="{
      transform: isVisible
        ? `translateY(${OFFSET_Y}px) translateX(${translateX}px) rotate(${rotation}deg)`
        : `translateY(${HIDDEN_TOTAL_Y}px) scale(0.8)`,

      transition: isSwiping
        ? 'none'
        : (isAnimatingNo || isAnimatingYes)
          ? 'all 0.8s cubic-bezier(0.43, 0.13, 0.23, 0.96)'
          : isVisible
            ? 'all 0.3s ease'
            : 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }"
  >
    <p class="tutorial-title">使い方</p>

    <p class="tutorial-instruction-text">
      このカードを左右にスワイプして回答してください
    </p>

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
  </div>
</template>

<script setup lang="ts">
const OFFSET_Y = -250
const HIDDEN_Y = 30
const HIDDEN_TOTAL_Y = OFFSET_Y + HIDDEN_Y

import { ref, onMounted } from 'vue'

interface Emits {
  'tutorial-completed': []
}
const emit = defineEmits<Emits>()

const isSwiping = ref(false)
const startX = ref(0)
const translateX = ref(0)
const rotation = ref(0)
const swipeDirection = ref<'left' | 'right' | null>(null)
const hasAnswered = ref(false)
const isAnimatingNo = ref(false)
const isAnimatingYes = ref(false)
const isVisible = ref(false)

const SWIPE_THRESHOLD = 100
const ROTATION_FACTOR = 0.2

onMounted(() => {
  setTimeout(() => { isVisible.value = true }, 100)
})

function handleTouchStart(event: TouchEvent) {
  if (hasAnswered.value) return
  if (event.touches.length !== 1) return

  const touch = event.touches.item(0)
  if (!touch) return

  startSwipe(touch.clientX)
}

function handleTouchMove(event: TouchEvent) {
  if (hasAnswered.value) return
  if (!isSwiping.value) return
  if (event.touches.length !== 1) return

  const touch = event.touches.item(0)
  if (!touch) return

  event.preventDefault()
  updateSwipe(touch.clientX)
}

function handleTouchEnd() {
  endSwipe()
}

function handleMouseDown(event: MouseEvent) {
  if (hasAnswered.value) return
  event.preventDefault()
  startSwipe(event.clientX)
}

function handleMouseMove(event: MouseEvent) {
  if (hasAnswered.value) return
  if (!isSwiping.value) return
  event.preventDefault()
  updateSwipe(event.clientX)
}

function handleMouseUp() {
  endSwipe()
}

function startSwipe(x: number) {
  if (hasAnswered.value) return
  isSwiping.value = true
  startX.value = x
  translateX.value = 0
  rotation.value = 0
}

function updateSwipe(x: number) {
  const deltaX = x - startX.value
  translateX.value = deltaX
  rotation.value = deltaX * ROTATION_FACTOR

  if (deltaX < -15) swipeDirection.value = 'left'
  else if (deltaX > 15) swipeDirection.value = 'right'
  else swipeDirection.value = null
}

function endSwipe() {
  if (!isSwiping.value) return
  isSwiping.value = false

  if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
    completeTutorial()
  } else {
    resetCard()
  }
}

function resetCard() {
  translateX.value = 0
  rotation.value = 0
  swipeDirection.value = null
}

function completeTutorial() {
  if (hasAnswered.value) return
  hasAnswered.value = true

  const currentX = translateX.value
  const currentRotation = rotation.value

  if (translateX.value < 0) {
    isAnimatingNo.value = true
    translateX.value = currentX - window.innerWidth * 1.5
    rotation.value = currentRotation - 60
  } else {
    isAnimatingYes.value = true
    translateX.value = currentX + window.innerWidth * 1.5
    rotation.value = currentRotation + 60
  }

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
  padding: var(--space-lg);
  cursor: grab;
  touch-action: pan-y;
  will-change: transform, opacity;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  margin: var(--space-md) auto 0;
  gap: var(--space-lg);

  opacity: 0;
  transition: opacity 0.8s ease, 
              transform 0.8s ease,
              background 0.1s ease;

  &.visible {
    opacity: 1;
  }

  &.swiping {
    cursor: grabbing;

    &.swipe-left {
      background: rgba(255, 107, 107, 0.7);
    }

    &.swipe-right {
      background: rgba(81, 207, 102, 0.7);
    }
  }
}

.tutorial-title{
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: clamp(10px, 1.5rem, 40px);
  margin-bottom: var(--space-lg);
}

.tutorial-instruction-text {
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  color: var(--text-primary);
  font-weight: 500;
  margin-bottom: var(--space-md);
  line-height: 1.4;
}

.tutorial-swipe-demo {
  margin-bottom: var(--space-lg);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-xl);
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

@media (max-width: 480px) {
  .tutorial-swipe-card {
    width: 80vw;
    height: 65vh;
  }
}
</style>
