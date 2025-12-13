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
const professionName = ref('')

onMounted(async () => {
  if (!sessionId) return
  try {
    const data = await $fetch(`/api/check-session?session_id=${encodeURIComponent(sessionId)}`)
    professionName.value = data.professionName
  } catch (error) {
    // エラー時の処理
    console.error('Session check failed:', error)
  }
})

function downloadPdf() {
  if (!sessionId) return
  $fetch(`/api/download-pdf?session_id=${encodeURIComponent(sessionId)}`, {
    responseType: 'blob'
  })
    .then((blob: Blob) => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      const name = professionName.value ? `${professionName.value}-report.pdf` : 'report.pdf'
      a.download = name
      a.click()
      URL.revokeObjectURL(url)
    })
    .catch((err: any) => {
      // ステータス別のユーザ向けメッセージ
      if (err?.status === 403) {
        alert('お支払いが確認できません。決済を完了してください。')
      } else if (err?.status === 404) {
        alert('ダウンロードするPDFが見つかりませんでした。')
      } else if (err?.status === 500) {
        alert('サーバーエラーが発生しました。しばらくしてから再度お試しください。')
      } else {
        // ネットワークエラーやそれ以外
        alert('PDFのダウンロードに失敗しました。ネットワークを確認してください。')
      }
    })
}
</script>
