<template>
  <div>
    <h2>ご購入ありがとうございました！</h2>
    <button @click="downloadPdf" :disabled="!sessionId">PDFダウンロード</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const sessionId = route.query.session_id as string

// 画面表示用の変数を定義
const professionName = ref('')
const customerName = ref('')

const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

onMounted(async () => {
  if (!sessionId) return
  try {
    const res = await fetch(`${apiBase}/api/check-session?session_id=${encodeURIComponent(sessionId)}`)
    const data = await res.json()
    professionName.value = data.professionName
    customerName.value = data.customerName
  } catch (error) {
    // エラー時の処理
  }
})

function downloadPdf() {
  if (!sessionId) return
  fetch(`${apiBase}/api/download-pdf?session_id=${encodeURIComponent(sessionId)}`)
    .then(res => res.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      const name = professionName.value ? `${professionName.value}-report.pdf` : 'report.pdf'
      a.download = name
      a.click()
      URL.revokeObjectURL(url)
    })
    .catch(() => {
      alert('PDFのダウンロードに失敗しました')
    })
}
</script>

