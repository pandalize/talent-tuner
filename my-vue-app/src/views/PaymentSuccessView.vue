<template>
  <div class="payment-success">
    <div class="success-content">
      <div v-if="loading" class="loading-container">
        <p>決済を確認中...</p>
      </div>
      
      <div v-else-if="paymentConfirmed" class="success-message">
        <h1>🎉 決済が完了しました！</h1>
        <p class="thank-you">詳細診断レポートをご購入いただき、ありがとうございます。</p>
        
        <div class="download-section">
          <h2>📄 PDFレポートのダウンロード</h2>
          <p>以下のボタンからPDFレポートをダウンロードできます。</p>
          <button @click="downloadPdf" class="btn download-button">
            PDFレポートをダウンロード
          </button>
          <p class="download-note">
            ※ダウンロードリンクは24時間有効です。<br>
            ※メールアドレスにもダウンロードリンクをお送りしています。
          </p>
        </div>
        
        <div class="action-section">
          <router-link to="/" class="btn home-button">ホームに戻る</router-link>
        </div>
      </div>
      
      <div v-else class="error-message">
        <h1>⚠️ エラーが発生しました</h1>
        <p>決済の確認中にエラーが発生しました。</p>
        <p>お手数ですが、メールでお問い合わせください。</p>
        <a href="mailto:pandalize.info@gmail.com?subject=【ため職】決済エラーについて" class="contact-link">
          pandalize.info@gmail.com
        </a>
        <div class="action-section">
          <router-link to="/" class="btn home-button">ホームに戻る</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const loading = ref(true)
const paymentConfirmed = ref(false)
const sessionId = ref('')

onMounted(async () => {
  try {
    // URLパラメータからセッションIDを取得
    sessionId.value = route.query.session_id as string || ''
    
    if (!sessionId.value) {
      throw new Error('セッションIDが見つかりません')
    }
    
    // 決済確認API呼び出し（仮実装）
    // 本番環境では実際のAPI呼び出しを実装
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    paymentConfirmed.value = true
    loading.value = false
  } catch (error) {
    console.error('Payment confirmation error:', error)
    paymentConfirmed.value = false
    loading.value = false
  }
})

async function downloadPdf() {
  try {
    // PDF生成・ダウンロードAPI呼び出し（仮実装）
    alert('PDFダウンロード機能は準備中です。\nメールにてPDFをお送りいたします。')
    
    // 本番環境では実際のダウンロード処理を実装
    /*
    const response = await fetch('/api/download-pdf.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: sessionId.value
      })
    })
    
    if (!response.ok) throw new Error('ダウンロードに失敗しました')
    
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tameshoku-report-${new Date().toISOString().split('T')[0]}.pdf`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
    */
  } catch (error) {
    console.error('Download error:', error)
    alert('ダウンロードに失敗しました。メールをご確認ください。')
  }
}
</script>

<style scoped>
.payment-success {
  width: 100%;
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  box-sizing: border-box;
}

.success-content {
  width: 100%;
  max-width: 800px;
  background-color: var(--background-white);
  border-radius: 20px;
  padding: 3rem 2rem;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
}

.loading-container {
  text-align: center;
  padding: 4rem;
}

.loading-container p {
  color: var(--text-dark);
  font-size: clamp(16px, 2.5vw, 20px);
}

.success-message h1,
.error-message h1 {
  color: var(--text-dark);
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 700;
}

.thank-you {
  text-align: center;
  color: var(--text-dark);
  font-size: clamp(16px, 2.5vw, 20px);
  margin-bottom: 3rem;
}

.download-section {
  background: linear-gradient(135deg, #f7f9fc 0%, #f1f5f9 100%);
  border-radius: 15px;
  padding: 2.5rem;
  margin-bottom: 3rem;
  border: 2px solid var(--main-color);
}

.download-section h2 {
  color: var(--text-dark);
  font-size: clamp(20px, 3vw, 28px);
  margin-bottom: 1rem;
  text-align: center;
}

.download-section p {
  text-align: center;
  color: var(--text-dark);
  margin-bottom: 1.5rem;
  font-size: clamp(14px, 2vw, 18px);
}

.download-button {
  background: linear-gradient(135deg, var(--main-color), #4a7ba7);
  color: white;
  font-size: clamp(16px, 2.5vw, 22px);
  font-weight: 700;
  padding: 1.5rem 3rem;
  border-radius: 50px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto 1.5rem;
  display: block;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(95, 144, 178, 0.3);
}

.download-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(95, 144, 178, 0.4);
  background: linear-gradient(135deg, #4a7ba7, var(--main-color));
}

.download-note {
  font-size: clamp(12px, 1.8vw, 14px);
  color: #666;
  font-style: italic;
}

.action-section {
  text-align: center;
}

.home-button {
  background-color: var(--orange-beige);
  color: var(--text-dark);
  font-size: clamp(16px, 2.5vw, 20px);
  padding: 1rem 3rem;
  display: inline-block;
  text-decoration: none;
  border-radius: 50px;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.home-button:hover {
  background-color: var(--accent-coral);
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.error-message {
  text-align: center;
}

.error-message p {
  color: var(--text-dark);
  font-size: clamp(14px, 2vw, 18px);
  margin-bottom: 1.5rem;
}

.contact-link {
  color: var(--main-color);
  font-size: clamp(16px, 2.5vw, 20px);
  text-decoration: underline;
  display: inline-block;
  margin-bottom: 2rem;
}

.contact-link:hover {
  color: var(--accent-coral);
}

@media (max-width: 768px) {
  .success-content {
    padding: 2rem 1.5rem;
  }
  
  .download-section {
    padding: 2rem 1.5rem;
  }
}
</style>