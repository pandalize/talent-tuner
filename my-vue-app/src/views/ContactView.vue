<template>
  <div class="contact">
    <div class="contact-content">
      <h1>お問い合わせ</h1>
      
      <div class="contact-intro">
        <p>「ため職」に関するご意見、ご要望、お問い合わせは以下のフォームよりお送りください。</p>
        <p>いただいた内容は、サービスの改善に役立てさせていただきます。</p>
      </div>
      
      <div v-if="submitted" class="success-message">
        <h2>お問い合わせありがとうございました</h2>
        <p>いただいた内容を確認し、後日回答させていただきます。</p>
        <button @click="resetForm" class="btn reset-button">新たにお問い合わせする</button>
      </div>
      
      <form v-else @submit.prevent="submitForm" class="contact-form">
        <div class="form-group">
          <label for="name">お名前 <span class="required">*</span></label>
          <input 
            type="text" 
            id="name" 
            v-model="form.name" 
            required 
            placeholder="山田太郎"
          >
        </div>
        
        <div class="form-group">
          <label for="email">メールアドレス <span class="required">*</span></label>
          <input 
            type="email" 
            id="email" 
            v-model="form.email" 
            required 
            placeholder="example@mail.com"
          >
        </div>
        
        <div class="form-group">
          <label for="category">お問い合わせ項目 <span class="required">*</span></label>
          <select id="category" v-model="form.category" required>
            <option value="">選択してください</option>
            <option value="サービスに関するお問い合わせ">サービスに関するお問い合わせ</option>
            <option value="診断結果に関するお問い合わせ">診断結果に関するお問い合わせ</option>
            <option value="技術的なお問い合わせ">技術的なお問い合わせ</option>
            <option value="ご意見・ご要望">ご意見・ご要望</option>
            <option value="その他">その他</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="message">お問い合わせ内容 <span class="required">*</span></label>
          <textarea 
            id="message" 
            v-model="form.message" 
            required 
            rows="6" 
            placeholder="こちらにお問い合わせ内容を具体的にご記入ください。"
          ></textarea>
        </div>
        
        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" v-model="form.privacyAgreed" required>
            <span class="checkmark"></span>
            <router-link to="/privacy">プライバシーポリシー</router-link>に同意します <span class="required">*</span>
          </label>
        </div>
        
        <button type="submit" class="btn submit-button" :disabled="isSubmitting">
          {{ isSubmitting ? '送信中...' : '送信する' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  category: '',
  message: '',
  privacyAgreed: false
})

const submitted = ref(false)
const isSubmitting = ref(false)

const submitForm = async () => {
  isSubmitting.value = true
  
  // 実際のアプリケーションでは、ここでAPIへの送信処理を行います
  // 現在はデモ用の遅延処理
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // フォームデータをコンソールに出力（デバッグ用）
    console.log('お問い合わせフォーム送信:', form.value)
    
    submitted.value = true
  } catch (error) {
    console.error('送信エラー:', error)
    alert('送信に失敗しました。しばらくしてから再度お試しください。')
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  form.value = {
    name: '',
    email: '',
    category: '',
    message: '',
    privacyAgreed: false
  }
  submitted.value = false
}
</script>

<style scoped>
.contact {
  width: 100%;
  padding: 2rem 1rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}

.contact-content {
  width: 100%;
  max-width: 800px;
  background-color: var(--background-white);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
}

.contact-content h1 {
  color: var(--text-dark);
  text-align: center;
  margin-bottom: 2rem;
  font-size: clamp(20px, 4vw, 32px);
  font-weight: 600;
  border-bottom: 3px solid var(--main-color);
  padding-bottom: 1rem;
}

.contact-intro {
  margin-bottom: 2rem;
  text-align: center;
}

.contact-intro p {
  color: var(--text-dark);
  margin-bottom: 1rem;
  font-size: clamp(14px, 2vw, 16px);
  line-height: 1.7;
}

.success-message {
  text-align: center;
  padding: 2rem;
  background-color: #e8f5e8;
  border-radius: 10px;
  border: 2px solid #4caf50;
}

.success-message h2 {
  color: #2e7d32;
  margin-bottom: 1rem;
  font-size: clamp(18px, 3vw, 24px);
}

.success-message p {
  color: #2e7d32;
  margin-bottom: 1.5rem;
  font-size: clamp(14px, 2vw, 16px);
}

.contact-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-dark);
  font-weight: 600;
  font-size: clamp(14px, 2vw, 16px);
}

.required {
  color: #e74c3c;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: clamp(14px, 2vw, 16px);
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--main-color);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.checkbox-group {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  cursor: pointer;
  line-height: 1.5;
  font-size: clamp(14px, 2vw, 16px);
}

.checkbox-label input[type="checkbox"] {
  width: auto;
  margin: 0;
}

.checkbox-label a {
  color: var(--main-color);
  text-decoration: underline;
}

.checkbox-label a:hover {
  color: var(--accent-coral);
}

.btn {
  display: inline-block;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-family: 'Hiragino Sans', sans-serif;
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  font-size: clamp(16px, 2.5vw, 18px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.submit-button {
  width: 100%;
  background-color: var(--main-color);
  color: var(--background-white);
  margin-top: 1rem;
}

.submit-button:hover:not(:disabled) {
  background-color: var(--accent-coral);
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  transform: none;
}

.reset-button {
  background-color: var(--orange-beige);
  color: var(--text-dark);
}

.reset-button:hover {
  background-color: var(--accent-coral);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .contact {
    padding: 1rem 0.5rem;
  }
  
  .contact-content {
    padding: 1.5rem;
  }
  
  .checkbox-label {
    font-size: 14px;
  }
}
</style>