<template>
  <div 
    class="explain-swipe-card"
    :class="{ 'swiping': isSwiping, 'swipe-left': swipeDirection === 'left', 'swipe-right': swipeDirection === 'right', 'visible': isVisible }"
    ref="swipeCardRef"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
    :style="{
      transform: isVisible ? `translate(-50%, -50%) translateX(${translateX}px) rotate(${rotation}deg)` : 'translate(-50%, -50%) scale(0.8) translateY(30px)',
      transition: isSwiping ? 'none' : isVisible ? 'all 0.3s ease' : 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }"
  >
    <div class="explain-header">
      <slot name="icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" fill="#e3f2fd" />
          <path d="M12 8v4m0 4h.01" stroke="#1976d2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </slot>
      <h3 class="explain-title">スワイプ操作の説明</h3>
    </div>
    <div class="explain-content">
      <slot>
        <p>左右にスワイプして回答を選択できます。<br>「はい」「いいえ」など、直感的に操作してください。</p>
      </slot>
    </div>
    <div class="explain-actions">
      <button class="explain-btn" @click="$emit('close')">OK</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// スワイプ用データ
const swipeCardRef = ref<HTMLElement>()
const isSwiping = ref(false)
const startX = ref(0)
const translateX = ref(0)
const rotation = ref(0)
const swipeDirection = ref<'left' | 'right' | null>(null)
const isVisible = ref(false)

const SWIPE_THRESHOLD = 100
const ROTATION_FACTOR = 0.2

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

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
  if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
    // 左右どちらでも閉じる
    emitClose()
  } else {
    resetCard()
  }
}
function resetCard() {
  translateX.value = 0
  rotation.value = 0
  swipeDirection.value = null
}
function emitClose() {
  isVisible.value = false
  setTimeout(() => {
    // emit close after animation
    // @ts-ignore
    // eslint-disable-next-line vue/custom-event-name-casing
    // $emit is available in template, but here we use defineEmits
    // so just emit
    // @ts-ignore
    // eslint-disable-next-line
    // $emit('close')
    // Instead, use defineEmits
    // workaround for script setup
    // see below
    // Actually, defineEmits is available
    emit('close')
  }, 300)
}

const emit = defineEmits(['close'])
</script>

<style scoped lang="scss">
.explain-swipe-card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2000;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(33, 150, 243, 0.08), 0 1.5px 6px rgba(33, 150, 243, 0.10);
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  max-width: 340px;
  width: 90vw;
  max-height: 90vh;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
}
.explain-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}
.explain-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1976d2;
  margin: 0.5rem 0 0 0;
}
.explain-content {
  font-size: 1rem;
  color: #333;
  margin-bottom: 1.5rem;
}
.explain-btn {
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.explain-btn:hover {
  background: #1565c0;
}
</style>
