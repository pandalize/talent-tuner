<template>
  <div>
    <h2>ご購入ありがとうございました！</h2>
    <p>職業名: {{ professionName }}</p>
    <p>購入者名: {{ customerName }}</p>
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

onMounted(async () => {
  if (!sessionId) return
  try {
    const res = await fetch(`/api/check-session?session_id=${sessionId}`)
    const data = await res.json()
    professionName.value = data.professionName
    customerName.value = data.customerName
  } catch (error) {
    // エラー時の処理
  }
})

function downloadPdf() {
  if (!sessionId) return
  fetch(`/api/download-pdf?session_id=${sessionId}`)
    .then(res => res.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'report.pdf'
      a.click()
      URL.revokeObjectURL(url)
    })
    .catch(() => {
      alert('PDFのダウンロードに失敗しました')
    })
}
</script>

