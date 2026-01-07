<template>
  <div 
    class="swipe-card"
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
    <p class="swipe-meta">質問 {{ currentIndex + 1 }} / {{ totalCount }}</p>
    <p class="swipe-text">{{ questionText }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const OFFSET_Y = -250
const HIDDEN_Y = 30
const HIDDEN_TOTAL_Y = OFFSET_Y + HIDDEN_Y

interface Props {
  questionId: string
  questionText: string
  currentRating: number | null
  currentIndex: number
  totalCount: number
}
const props = defineProps<Props>()

interface Emits {
  'select-rating': [questionId: string, rating: number]
  'answer-completed': []
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

watch(() => props.currentRating, (newVal) => {
  hasAnswered.value = newVal !== null
})

watch(() => [props.questionId, props.questionText], () => {
  isVisible.value = false
  setTimeout(() => { isVisible.value = true }, 150)
})

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
    const rating = translateX.value < 0 ? 1 : 5
    selectAnswer(rating)
  } else {
    resetCard()
  }
}

function resetCard() {
  translateX.value = 0
  rotation.value = 0
  swipeDirection.value = null
}

function selectAnswer(rating: number) {
  if (hasAnswered.value) return
  hasAnswered.value = true

  const currentX = translateX.value
  const currentRotation = rotation.value

  if (rating === 1) {
    isAnimatingNo.value = true
    translateX.value = currentX - window.innerWidth * 1.5
    rotation.value = currentRotation - 60
  } else {
    isAnimatingYes.value = true
    translateX.value = currentX + window.innerWidth * 1.5
    rotation.value = currentRotation + 60
  }

  emit('select-rating', props.questionId, rating)

  setTimeout(() => {
    emit('answer-completed')
  }, 800)
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
  padding: var(--space-lg);
  cursor: grab;
  touch-action: pan-y;
  will-change: transform, opacity;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  margin: var(--space-md) auto 0;

  opacity: 0;
  transition: opacity 0.8s ease, 
              transform 0.8s ease,
              background 0.1s ease;

  &.visible { opacity: 1; }

  &.swiping {
    cursor: grabbing;

    &.swipe-left { background: rgba(255, 107, 107, 0.7); }
    &.swipe-right { background: rgba(81, 207, 102, 0.7); }
  }
}

.swipe-meta,
.swipe-text {
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0.02em;
}

.swipe-meta {
  font-size: clamp(0.7rem, 1.5vw, 0.9rem);
  color: var(--text-secondary);
  width: 100%;
  text-align: right;
}

.swipe-text {
  font-size: clamp(1.5rem, 2vw, 2rem);
  color: var(--text-primary);
  margin-top: 50%;
  text-align: center;
}

@media (max-width: 480px) {
  .swipe-card {
    width: 80vw;
    height: 65vh;
  }
}
</style>
