<template>
  <div class="language-switcher">
    <select v-model="currentLocale" @change="handleChange" class="language-select">
      <option value="ja">🇯🇵 日本語</option>
      <option value="en">🇺🇸 English</option>
      <option value="zh">🇨🇳 中文</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { changeLanguage } from '~/i18n'

const { locale } = useI18n()
const currentLocale = ref(locale.value)

const handleChange = () => {
  changeLanguage(currentLocale.value as 'ja' | 'en' | 'zh')
}
</script>

<style scoped>
.language-switcher {
  display: flex;
  align-items: center;
}

.language-select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  font-size: 0.9rem;
  cursor: pointer;
}

.language-select:focus {
  outline: 2px solid #3b82f6;
  border-color: #3b82f6;
}
</style>