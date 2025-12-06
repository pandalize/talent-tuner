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
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
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
    .then(res => {
      if (!res.ok) {
        if (res.status === 403) throw new Error('NOT_PAID')
        if (res.status === 404) throw new Error('NOT_FOUND')
        // 500 などその他のサーバーエラー
        throw new Error('SERVER_ERROR')
      }
      return res.blob()
    })
    .then(blob => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      const name = professionName.value ? `${professionName.value}-report.pdf` : 'report.pdf'
      a.download = name
      a.click()
      URL.revokeObjectURL(url)
    })
    .catch((err) => {
      // ステータス別のユーザ向けメッセージ
      if (err?.message === 'NOT_PAID') {
        alert('お支払いが確認できません。決済を完了してください。')
      } else if (err?.message === 'NOT_FOUND') {
        alert('ダウンロードするPDFが見つかりませんでした。')
      } else if (err?.message === 'SERVER_ERROR') {
        alert('サーバーエラーが発生しました。しばらくしてから再度お試しください。')
      } else {
        // ネットワークエラーやそれ以外
        alert('PDFのダウンロードに失敗しました。ネットワークを確認してください。')
      }
    })
}
</script>

