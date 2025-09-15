<template>
  <div class="language-switcher">
    <!-- モバイル用ドロップダウン -->
    <div class="mobile-switcher" v-if="isMobile">
      <select 
        v-model="currentLocale" 
        @change="handleLanguageChange"
        class="language-select"
        :aria-label="$t('nav.language')"
      >
        <option 
          v-for="locale in SUPPORTED_LOCALES" 
          :key="locale.code"
          :value="locale.code"
        >
          {{ locale.flag }} {{ locale.nativeName }}
        </option>
      </select>
    </div>

    <!-- デスクトップ用ボタンリスト -->
    <div class="desktop-switcher" v-else>
      <div class="language-label">{{ $t('nav.language') }}</div>
      <div class="language-buttons">
        <button
          v-for="locale in SUPPORTED_LOCALES"
          :key="locale.code"
          @click="changeToLanguage(locale.code)"
          :class="[
            'language-btn', 
            { 'active': currentLocale === locale.code }
          ]"
          :aria-label="`${$t('nav.language')}: ${locale.nativeName}`"
          :title="locale.nativeName"
        >
          <span class="flag">{{ locale.flag }}</span>
          <span class="code">{{ locale.code.toUpperCase() }}</span>
        </button>
      </div>
    </div>

    <!-- 言語変更確認モーダル（初回のみ） -->
    <div v-if="showConfirmModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h3>{{ $t('language.confirm.title') }}</h3>
        <p>{{ $t('language.confirm.message', { language: selectedLanguageName }) }}</p>
        <div class="modal-actions">
          <button @click="confirmLanguageChange" class="btn-confirm">
            {{ $t('language.confirm.yes') }}
          </button>
          <button @click="closeModal" class="btn-cancel">
            {{ $t('language.confirm.no') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { 
  SUPPORTED_LOCALES, 
  changeLanguage, 
  getLocalizedPath,
  getCurrentLanguageInfo,
  type SupportedLocale 
} from '../i18n'

// Vue Router & I18n
const router = useRouter()
const { locale, t } = useI18n()

// リアクティブデータ
const currentLocale = ref<SupportedLocale>(locale.value as SupportedLocale)
const showConfirmModal = ref(false)  
const pendingLocale = ref<SupportedLocale | null>(null)
const isMobile = ref(window.innerWidth < 768)

// 計算プロパティ
const selectedLanguageName = computed(() => {
  if (!pendingLocale.value) return ''
  const language = SUPPORTED_LOCALES.find(l => l.code === pendingLocale.value)
  return language?.nativeName || ''
})

// 画面サイズ監視
const handleResize = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  currentLocale.value = locale.value as SupportedLocale
})

// 言語変更処理
const changeToLanguage = (newLocale: SupportedLocale) => {
  if (newLocale === currentLocale.value) return

  // 初回変更時は確認モーダルを表示
  const hasChangedBefore = localStorage.getItem('language-changed-before')
  if (!hasChangedBefore) {
    pendingLocale.value = newLocale
    showConfirmModal.value = true
    return
  }

  executeLanguageChange(newLocale)
}

const handleLanguageChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  changeToLanguage(target.value as SupportedLocale)
}

const confirmLanguageChange = () => {
  if (pendingLocale.value) {
    executeLanguageChange(pendingLocale.value)
    localStorage.setItem('language-changed-before', 'true')
  }
  closeModal()
}

const executeLanguageChange = (newLocale: SupportedLocale) => {
  try {
    // 言語を変更
    changeLanguage(newLocale)
    currentLocale.value = newLocale

    // 現在のルート名を取得
    const currentRoute = router.currentRoute.value
    const routeName = currentRoute.name as string
    
    // パラメータがあれば保持
    const params = currentRoute.params
    
    // 言語切り替え時は基本的に同じページに留まる
    // 新しい言語でのルート名を生成
    let targetRouteName = routeName
    
    // 既に言語プレフィックスが付いている場合は除去
    if (routeName && (routeName.endsWith('-en') || routeName.endsWith('-zh'))) {
      targetRouteName = routeName.replace(/-[a-z]{2}$/, '')
    }
    
    // 新しい言語のルート名を生成（日本語以外の場合）
    if (newLocale !== 'ja') {
      targetRouteName = `${targetRouteName}-${newLocale}`
    }
    
    // ルートが存在するかチェック
    const hasRoute = router.hasRoute(targetRouteName)
    
    if (hasRoute) {
      // 存在する場合はナビゲート
      router.push({ name: targetRouteName, params })
    } else {
      // 存在しない場合はホームページに戻る
      const homeName = newLocale === 'ja' ? 'home' : `home-${newLocale}`
      if (router.hasRoute(homeName)) {
        router.push({ name: homeName })
      } else {
        // フォールバック: 基本ホームページ
        router.push('/')
      }
    }

    // Google Analytics言語変更イベント（もしあれば）
    if (window.gtag) {
      window.gtag('event', 'language_change', {
        'language': newLocale,
        'previous_language': locale.value
      })
    }

    // 成功通知
    showSuccessMessage(newLocale)
  } catch (error) {
    console.error('Language change failed:', error)
    // エラー時はホームページにリダイレクト
    router.push('/')
  }
}

const closeModal = () => {
  showConfirmModal.value = false
  pendingLocale.value = null
}

const showSuccessMessage = (newLocale: SupportedLocale) => {
  const language = SUPPORTED_LOCALES.find(l => l.code === newLocale)
  if (language) {
    // 簡単な成功メッセージ（Toast通知等があれば使用）
    console.log(`Language changed to ${language.nativeName}`)
  }
}

// クリーンアップ
onMounted(() => {
  return () => {
    window.removeEventListener('resize', handleResize)
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins.scss' as mixins;
.language-switcher {
  position: relative;
}

/* モバイル用ドロップダウン */
.mobile-switcher {
  @include mixins.flex-row;
}

.language-select {
  @include mixins.button-base;
  @include mixins.button-outline;
  background: var(--bg-primary, #fff);
  font-size: 0.9rem;
  min-width: 120px;
}

.language-select:focus {
  @include mixins.focus-ring;
}

/* デスクトップ用ボタンリスト */
.desktop-switcher {
  @include mixins.flex-row(0.5rem);
}

.language-label {
  font-size: 0.9rem;
  color: var(--text-secondary, #6c757d);
  margin-right: 0.5rem;
}

.language-buttons {
  @include mixins.flex-row(0.25rem);
}

.language-btn {
  @include mixins.flex-row(0.25rem);
  @include mixins.button-base;
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  border: 2px solid rgba(59, 130, 246, 0.2);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
    transition: left 0.4s ease;
  }
}

.language-btn:hover {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.08));
  border-color: var(--accent-blue);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
  
  &::before {
    left: 100%;
  }
}

.language-btn.active {
  background: linear-gradient(135deg, var(--accent-blue), var(--primary-blue));
  color: white;
  border-color: var(--accent-blue);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
  transform: translateY(-1px);
  
  &::before {
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  }
  
  &:hover::before {
    left: 100%;
  }
}

.language-btn .flag {
  font-size: 1.2em;
  transition: all var(--transition-fast);
}

.language-btn .code {
  font-weight: 600;
  font-size: 0.8rem;
  letter-spacing: 0.5px;
  transition: all var(--transition-fast);
}

.language-btn:hover .flag {
  transform: scale(1.1);
}

.language-btn:hover .code {
  color: var(--accent-blue);
}

.language-btn.active:hover .code {
  color: white;
}

/* 確認モーダル */
.modal-overlay {
  @include mixins.flex-center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  @include mixins.card-base;
  @include mixins.card-padding(lg);
  @include mixins.card-shadow(lg);
  border-radius: 8px;
  max-width: 400px;
  margin: 1rem;
}

.modal-content h3 {
  margin: 0 0 1rem 0;
  color: var(--text-primary, #333);
}

.modal-content p {
  margin: 0 0 1.5rem 0;
  color: var(--text-secondary, #666);
  line-height: 1.5;
}

.modal-actions {
  @include mixins.flex-row(1rem);
  justify-content: flex-end;
}

.btn-confirm,
.btn-cancel {
  @include mixins.button-base;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  font-weight: 500;
}

.btn-confirm {
  @include mixins.button-primary;
}

.btn-confirm:hover {
  background: var(--primary-blue-dark, #0056b3);
}

.btn-cancel {
  @include mixins.button-secondary;
}

.btn-cancel:hover {
  background: var(--bg-tertiary, #e9ecef);
}

/* レスポンシブ対応 */
@media (max-width: 767px) {
  .desktop-switcher {
    display: none;
  }
}

@media (min-width: 768px) {
  .mobile-switcher {
    display: none;
  }
}

/* モバイル最適化 */
@media (max-width: 768px) {
  .language-select {
    padding: var(--space-xs) 0;
    min-width: 80px;
    width: 80px;
    font-size: 0.85rem;
    border: none;
    background: transparent;
  }
}

/* ダークモード対応 */
@media (prefers-color-scheme: dark) {
  .language-select,
  .language-btn {
    background: var(--bg-dark, #2d3748);
    border-color: var(--border-dark, #4a5568);
    color: var(--text-dark, #e2e8f0);
  }

  .modal-content {
    background: var(--bg-dark, #2d3748);
    color: var(--text-dark, #e2e8f0);
  }
}

/* アクセシビリティ: 高コントラストモード */
@media (prefers-contrast: high) {
  .language-btn {
    border-width: 2px;
  }
  
  .language-btn.active {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
}

/* アニメーション削減設定 */
@media (prefers-reduced-motion: reduce) {
  .language-btn,
  .btn-confirm,
  .btn-cancel {
    transition: none;
  }
}
</style>