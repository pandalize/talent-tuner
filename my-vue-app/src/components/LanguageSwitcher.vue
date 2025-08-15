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
  // 言語を変更
  changeLanguage(newLocale)
  currentLocale.value = newLocale

  // URLを言語別パスに更新
  const currentPath = router.currentRoute.value.path
  const newPath = getLocalizedPath(currentPath, newLocale)
  
  if (newPath !== currentPath) {
    router.push(newPath)
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
  @include mixins.button-outline;
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
}

.language-btn:hover {
  background: var(--bg-secondary, #f8f9fa);
  border-color: var(--primary-blue, #007bff);
}

.language-btn.active {
  background: var(--primary-blue, #007bff);
  color: white;
  border-color: var(--primary-blue, #007bff);
}

.language-btn .flag {
  font-size: 1.1em;
}

.language-btn .code {
  font-weight: 500;
  font-size: 0.8rem;
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