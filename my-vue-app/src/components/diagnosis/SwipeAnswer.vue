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
        'selected-yes': isAnimatingYes,
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
      <div class="card-content">
        <!-- 進捗表示 -->
        <div v-if="currentIndex !== undefined && totalCount !== undefined" class="progress-header">
          <div class="progress-text">{{ currentIndex + 1 }} / {{ totalCount }}</div>
        </div>
        
        <div class="option-header">
          <div class="option-text">{{ option.text }}</div>
        </div>
      </div>
      
    </div>
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
  currentIndex?: number
  totalCount?: number
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
.swipe-answer-container {
  position: relative;
  width: 100%;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: var(--space-sm) 0;
  margin: 0 auto;
  box-sizing: border-box;
}

// スワイプカード
.swipe-card {
  position: relative;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  padding: 0;
  cursor: grab;
  user-select: none;
  touch-action: pan-y;
  will-change: transform, opacity;
  width: 95%;
  max-width: 1000px;
  aspect-ratio: 4 / 3;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
  margin: var(--space-md) auto 0;
  left: 0;
  right: 0;
  
  // aspect-ratio未対応ブラウザ向けフォールバック
  @supports not (aspect-ratio: 4 / 3) {
    height: 71.25vw; // 95vw × 0.75 = 3:4の比率
    max-height: 750px;
  }
  
  // 初期状態（非表示）
  opacity: 0;
  transform: scale(0.8) translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
              transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              background 0.3s ease;
  
  // 表示状態（ディゾルブイン）
  &.visible {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  
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
    box-shadow: 0 12px 48px rgba(255, 107, 107, 0.6);
    opacity: 0.9;
    
    .option-text {
      color: white;
    }
  }
  
  &.selected-yes {
    background: linear-gradient(135deg, #51cf66, #69db7c) !important;
    border: 2px solid #40c057;
    box-shadow: 0 12px 48px rgba(81, 207, 102, 0.6);
    opacity: 0.9;
    
    .option-text {
      color: white;
    }
  }
}

.card-content {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  padding: var(--space-xl) var(--space-lg);
  box-sizing: border-box;
}

.progress-header {
  position: absolute;
  top: clamp(12px, 3vw, 20px);
  right: clamp(12px, 3vw, 20px);
  z-index: 3;
}

.progress-text {
  font-size: clamp(0.7rem, 2vw, 0.9rem);
  color: var(--text-secondary, #666);
  background: rgba(255, 255, 255, 0.9);
  padding: var(--space-xs, 4px) var(--space-sm, 8px);
  border-radius: 20px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.option-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.option-text {
  // デスクトップ基準のフォントサイズ
  font-size: clamp(1.5rem, 2vw, 2rem);
  line-height: clamp(1.4, 1.5, 1.6);
  color: var(--text-primary);
  text-align: center;
  font-weight: 500;
  letter-spacing: 0.02em;
  word-break: keep-all;
  white-space: normal;
  max-height: 100%;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-wrap: break-word;
  transition: font-size 0.3s ease;
}

// タブレット最適化
@media (min-width: 769px) and (max-width: 1024px) {
  .swipe-card {
    aspect-ratio: 3 / 4 !important;
    height: auto !important;
    min-height: auto !important;
    max-height: none !important;
    padding: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  
  .card-content {
    padding: var(--space-xxl) var(--space-xl);
  }
  
  .option-text {
    font-size: 1.6rem;
  }
}

// モバイル最適化 - 縦長カードで大きな画面占有率
@media (max-width: 768px) {
  .swipe-answer-container {
    width: 100%;
    min-height: 70vh; // 画面高の70%を使用
    padding: var(--space-xs) 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  
  .swipe-card {
    width: 75vw !important; // 3:4比率に適した横幅
    max-width: 75vw !important;
    min-width: 75vw !important;
    height: 100vw !important; // 3:4比率: width * 4/3
    min-height: 100vw !important;
    max-height: 100vw !important;
    aspect-ratio: 3/4 !important;
    padding: 0;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%); // 初期位置は画面中央、スワイプで動的に変更
  }
  
  .card-content {
    padding: clamp(12px, 3vw, 20px) clamp(8px, 2vw, 16px);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  
  .option-header {
    padding: 0;
    max-width: 100%;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .option-text {
    // 動的フォントサイズ: 最小1rem、推奨4vw、最大1.8rem
    font-size: clamp(1rem, 4vw, 1.8rem) !important;
    line-height: clamp(1.3, 1.4, 1.5);
    word-break: keep-all;
    overflow-wrap: break-word;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: clamp(4px, 1vw, 12px);
    box-sizing: border-box;
  }
}

// 小画面モバイル最適化（iPhone SE等）
@media (max-width: 480px) {
  .swipe-answer-container {
    min-height: 65vh; // 小画面では少し小さく
  }
  
  .swipe-card {
    width: 80vw !important; // 3:4比率に最適化
    max-width: 80vw !important;
    min-width: 80vw !important;
    height: calc(80vw * 4 / 3) !important; // 3:4比率維持
    min-height: calc(80vw * 4 / 3) !important;
    max-height: calc(80vw * 4 / 3) !important;
    aspect-ratio: 3/4 !important;
    left: 50% !important;
    top: 50% !important;
    transform: translate(-50%, -50%) !important;
  }
  
  .option-text {
    // より小さい画面用の動的フォントサイズ: 最小0.9rem、推奨3.5vw、最大1.4rem
    font-size: clamp(0.9rem, 3.5vw, 1.4rem) !important;
    line-height: clamp(1.25, 1.35, 1.45);
  }
  
  .card-content {
    padding: clamp(8px, 2vw, 16px) clamp(4px, 1.5vw, 12px);
  }
}

// 大画面最適化
@media (min-width: 1025px) {
  .swipe-card {
    aspect-ratio: 3 / 4 !important;
    height: auto !important;
    min-height: auto !important;
    max-height: none !important;
    padding: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  
  .card-content {
    padding: var(--space-xxxl) var(--space-xxl);
  }
  
  .option-text {
    font-size: clamp(1.8rem, 2.5vw, 2.2rem);
    line-height: 1.5;
  }
}

// 非常に大きな画面での上限設定
@media (min-width: 1400px) {
  .option-text {
    font-size: 2.2rem !important;
  }
}

// 非常に小さな画面（Galaxy Fold等）
@media (max-width: 320px) {
  .swipe-answer-container {
    min-height: 60vh;
  }
  
  .swipe-card {
    width: 95vw !important;
    max-width: 95vw !important;
    min-width: 95vw !important;
    height: 45vh !important;
    min-height: 45vh !important;
    max-height: 45vh !important;
    border-radius: 16px;
  }
  
  .option-text {
    font-size: clamp(0.8rem, 3vw, 1.2rem) !important;
    line-height: 1.2;
    padding: clamp(2px, 0.5vw, 8px);
  }
  
  .card-content {
    padding: clamp(6px, 1.5vw, 12px) clamp(3px, 1vw, 8px);
  }
}

</style>