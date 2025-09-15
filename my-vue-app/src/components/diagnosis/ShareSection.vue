<!--
  診断結果シェア機能コンポーネント
  LINE, X(Twitter), Instagram での共有機能
-->
<template>
  <div class="share-section">
    <div class="section-header">
      <h3 class="section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
          <polyline points="16,6 12,2 8,6"/>
          <line x1="12" y1="2" x2="12" y2="15"/>
        </svg>
        診断結果をシェア
      </h3>
      <p class="section-subtitle">友人や家族と結果を共有して、キャリアについて話し合ってみましょう</p>
    </div>
    <div class="share-grid">
      <div @click="shareToLine" class="share-card line-card" role="button" tabindex="0" @keydown.enter="shareToLine" @keydown.space="shareToLine">
        <div class="share-icon">
          <img src="/image/LINE.png" alt="LINE" class="platform-icon">
        </div>
        <div class="share-content">
          <span class="share-title">LINEでシェア</span>
          <span class="share-description">友達やグループに結果を送信</span>
        </div>
      </div>
      <div @click="shareToX" class="share-card x-card" role="button" tabindex="0" @keydown.enter="shareToX" @keydown.space="shareToX">
        <div class="share-icon">
          <img src="/image/X.png" alt="X (Twitter)" class="platform-icon">
        </div>
        <div class="share-content">
          <span class="share-title">Xでシェア</span>
          <span class="share-description">フォロワーと診断結果を共有</span>
        </div>
      </div>
      <div @click="shareToInstagram" class="share-card instagram-card" role="button" tabindex="0" @keydown.enter="shareToInstagram" @keydown.space="shareToInstagram">
        <div class="share-icon">
          <img src="/image/Instagram.png" alt="Instagram" class="platform-icon">
        </div>
        <div class="share-content">
          <span class="share-title">Instagramでシェア</span>
          <span class="share-description">ストーリーズで結果を投稿</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProfessionScore } from '../../utils/diagnosisLoader'

// Props
interface Props {
  professions: ProfessionScore[]
}

const props = defineProps<Props>()

// シェア機能
function generateShareText(): string {
  if (props.professions.length === 0) return ''
  
  const top3 = props.professions.slice(0, 3)
  const professionNames = top3.map((p, index) => `${index + 1}位: ${p.name}`).join('\n')
  
  return `🎯 職業診断結果 🎯\n\n${professionNames}\n\n#職業診断 #適職診断 #キャリア診断\n\n診断はこちら: ${window.location.href}`
}

function shareToLine() {
  const text = generateShareText()
  const encodedText = encodeURIComponent(text)
  const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}&text=${encodedText}`
  window.open(lineUrl, '_blank')
}

function shareToX() {
  const text = generateShareText()
  const encodedText = encodeURIComponent(text)
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}`
  window.open(twitterUrl, '_blank')
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Clipboard API failed, falling back to execCommand:', err)
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.select()
    try {
      const successful = document.execCommand('copy')
      return successful
    } catch (execErr) {
      console.error('execCommand failed:', execErr)
      return false
    } finally {
      document.body.removeChild(textArea)
    }
  }
}

async function shareToInstagram() {
  const text = generateShareText()
  const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent)
  
  try {
    if (isMobile) {
      await shareToInstagramStories(text)
    } else {
      await shareToInstagramDesktop(text)
    }
  } catch (error) {
    console.error('Instagram共有エラー:', error)
    await fallbackInstagramShare(text)
  }
}

async function shareToInstagramStories(text: string) {
  const instagramStoriesUrl = 'instagram-stories://share'
  
  const copied = await copyToClipboard(text)
  
  if (copied) {
    try {
      window.location.href = instagramStoriesUrl
      
      setTimeout(() => {
        alert('📱 Instagram Storiesが開きました！\n\n' +
              '1. ストーリー作成画面で背景を選択\n' +
              '2. テキストツールを選択\n' +
              '3. クリップボードからテキストを貼り付け\n' +
              '4. 投稿してください！\n\n' +
              '💡 診断結果のテキストはクリップボードにコピー済みです')
      }, 1000)
    } catch {
      window.location.href = 'instagram://camera'
      alert('📱 Instagramカメラが開きました！\n\n' +
            'ストーリーを作成して診断結果をシェアしてください。\n' +
            'テキストはクリップボードにコピー済みです。')
    }
  } else {
    throw new Error('クリップボードへのコピーに失敗')
  }
}

async function shareToInstagramDesktop(text: string) {
  const copied = await copyToClipboard(text)
  
  if (copied) {
    window.open('https://www.instagram.com/', '_blank')
    
    setTimeout(() => {
      alert('💻 Instagram Webが開きました！\n\n' +
            '1. 左上の「+」ボタンをクリック\n' +
            '2. 「ストーリーズ」を選択\n' +
            '3. 画像をアップロードまたは背景を選択\n' +
            '4. テキストツールでクリップボードの内容を貼り付け\n' +
            '5. ストーリーを投稿してください！\n\n' +
            '💡 診断結果のテキストはクリップボードにコピー済みです')
    }, 1500)
  } else {
    throw new Error('クリップボードへのコピーに失敗')
  }
}

async function fallbackInstagramShare(text: string) {
  const copied = await copyToClipboard(text)
  const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent)

  if (copied) {
    alert('📋 共有テキストをクリップボードにコピーしました！\n' +
          'Instagramを開いてストーリーに貼り付けてください。')
  } else {
    alert('❌ クリップボードへのコピーに失敗しました。\n' +
          '手動でテキストをコピーしてInstagramでシェアしてください。')
  }

  if (isMobile) {
    try {
      window.location.href = 'instagram://'
    } catch {
      window.open('https://www.instagram.com/', '_blank')
    }
  } else {
    window.open('https://www.instagram.com/', '_blank')
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins.scss' as mixins;

.share-section {
  @include mixins.card-padding(xl);
  background: var(--bg-secondary);
  border-radius: 12px;
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  font-family: var(--font-heading);
  font-size: var(--fs-h2);
  color: var(--primary-navy);
  margin-bottom: var(--space-sm);
  font-weight: 600;
}

.section-subtitle {
  color: var(--text-secondary);
  font-size: var(--fs-body);
  margin: 0;
}

.share-grid {
  @include mixins.grid-auto-fit(250px);
  gap: var(--space-md);
}

.share-card {
  @include mixins.card-base;
  @include mixins.flex-row(var(--space-md));
  @include mixins.card-padding(lg);
  text-align: left;
  cursor: pointer;
  border: none;
  background: var(--bg-primary);
  transition: all var(--transition-normal);
  
  &:hover {
    @include mixins.card-shadow(md);
    transform: translateY(-2px);
  }
}

.share-icon {
  @include mixins.flex-center;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: var(--bg-secondary);
  flex-shrink: 0;
}

.platform-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.share-content {
  flex: 1;
  display: flex;
  flex-direction: column;

  .share-title {
    font-size: 1rem;
    color: var(--primary-navy);
    margin-bottom: var(--space-xs);
    font-weight: 600;
  }

  .share-description {
    font-size: var(--fs-small);
    color: var(--text-secondary);
    line-height: 1.4;
  }
}

// プラットフォーム別スタイリング
.line-card:hover {
  border-color: #00b900;
  background: linear-gradient(135deg, rgba(0, 185, 0, 0.05), var(--bg-primary));
}

.x-card:hover {
  border-color: #1da1f2;
  background: linear-gradient(135deg, rgba(29, 161, 242, 0.05), var(--bg-primary));
}

.instagram-card:hover {
  border-color: #e4405f;
  background: linear-gradient(135deg, rgba(228, 64, 95, 0.05), var(--bg-primary));
}

// レスポンシブデザイン
@media (min-width: 769px) and (max-width: 1024px) {
  .share-section {
    padding: var(--space-lg);
  }

  .section-header {
    margin-bottom: var(--space-lg);
  }

  .share-grid {
    gap: var(--space-md);
  }
}

@media (max-width: 768px) {
  .share-section {
    padding: 0;
    margin: var(--space-sm) 0;
  }

  .section-header {
    margin-bottom: var(--space-md);
    text-align: center;
  }

  .section-title {
    font-size: var(--fs-h3);
    margin-bottom: var(--space-xs);
  }

  .section-subtitle {
    font-size: var(--fs-small);
    line-height: 1.4;
  }

  .share-grid {
    gap: var(--space-xs);
    grid-template-columns: 1fr;
  }

  .share-card {
    padding: var(--space-xs);
    flex-direction: row;
    align-items: center;
    text-align: left;

    .share-title {
      font-size: var(--fs-body);
      margin-bottom: 2px;
    }

    .share-description {
      font-size: var(--fs-small);
    }
  }

  .share-icon {
    margin-right: var(--space-sm);
    margin-bottom: 0;
  }

  .platform-icon {
    width: 32px;
    height: 32px;
  }
}

@media (max-width: 480px) {
  .share-section {
    padding: 0;
    margin: var(--space-xs) 0;
  }

  .section-header {
    margin-bottom: var(--space-sm);
  }

  .section-title {
    font-size: 1rem;
    margin-bottom: 4px;
  }

  .section-subtitle {
    display: none;
  }

  .share-grid {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-lg);
  }

  .share-card {
    padding: var(--space-xs);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 60px;
    background: transparent;
    border: none;
    box-shadow: none;

    .share-title {
      display: none;
    }

    .share-description {
      display: none;
    }
  }

  .share-icon {
    margin-right: 0;
    margin-bottom: 0;
  }

  .platform-icon {
    width: 50px;
    height: 50px;
  }
}
</style>