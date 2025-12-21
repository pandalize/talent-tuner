<template>
  <div>
    <h2>ご購入ありがとうございました！</h2>
    <button @click="downloadPdf" :disabled="!sessionId">PDFダウンロード</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from '#app'

const route = useRoute()
const sessionId = route.query.session_id as string

// 画面表示用の変数を定義
const professionName = ref<string>('')

onMounted(async () => {
  if (!sessionId) return
  try {
    const data = await $fetch(`/api/check-session?session_id=${encodeURIComponent(sessionId)}`)
    if (data.professionName) {
      professionName.value = data.professionName
    }
  } catch (error) {
    // エラー時の処理
    console.error('Session check failed:', error)
  }
})

function downloadPdf() {
  if (!sessionId) return
  return $fetch<Blob>(`/api/download-pdf?session_id=${encodeURIComponent(sessionId)}`, {
    responseType: 'blob'
  })
    .then((blob) => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      const name = professionName.value ? `${professionName.value}-report.pdf` : 'report.pdf'
      a.download = name
      a.click()
      URL.revokeObjectURL(url)
    })
    .catch(() => {
      alert('PDFのダウンロードに失敗しました。')
    })
}
</script>
