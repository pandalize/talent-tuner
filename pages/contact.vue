<template>
  <div class="contact">
    <div class="contact-content">
      <h1>お問い合わせ</h1>
      
      <div class="contact-intro">
        <p>「ため職」に関するご意見、ご要望、お問い合わせは以下のメールアドレスまでお送りください。</p>
        <p>いただいた内容は、サービスの改善に役立てさせていただきます。</p>
      </div>
      
      <div class="email-contact">
        <div class="email-section">
          <h2>📧 お問い合わせ先</h2>
          <div class="email-address">
            <a href="mailto:pandalize.info@gmail.com?subject=【ため職】お問い合わせ" class="email-link">
              pandalize.info@gmail.com
            </a>
          </div>
          <p class="email-note">
            メールの件名に「【ため職】お問い合わせ」と記載していただくとスムーズです。
          </p>
        </div>
        
        <div class="contact-categories">
          <h3>📝 お問い合わせ内容の例</h3>
          <ul>
            <li>サービスに関するお問い合わせ</li>
            <li>診断結果に関するご質問</li>
            <li>技術的なお問い合わせ</li>
            <li>ご意見・ご要望</li>
            <li>その他のお問い合わせ</li>
          </ul>
        </div>
        
        <div class="response-info">
          <h3>📅 回答について</h3>
          <p>お問い合わせいただいた内容については、通常1〜3営業日以内にご回答いたします。</p>
          <p>内容によってはお時間をいただく場合がございますので、予めご了承ください。</p>
        </div>
        
        <div class="privacy-note">
          <p>
            個人情報の取り扱いについては、
            <NuxtLink to="/privacy-policy">プライバシーポリシー</NuxtLink>
            をご確認ください。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const localePath = useLocalePath()
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
  margin-bottom: 3rem;
  text-align: center;
}

.contact-intro p {
  color: var(--text-dark);
  margin-bottom: 1rem;
  font-size: clamp(14px, 2vw, 16px);
  line-height: 1.7;
}

.email-contact {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.email-section {
  text-align: center;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 15px;
  border: 2px solid var(--main-color);
}

.email-section h2 {
  color: var(--main-color);
  margin-bottom: 1.5rem;
  font-size: clamp(18px, 3vw, 24px);
}

.email-address {
  margin-bottom: 1rem;
}

.email-link {
  font-size: clamp(18px, 3.5vw, 28px);
  color: var(--main-color);
  text-decoration: none;
  font-weight: 600;
  padding: 1rem 2rem;
  border: 2px solid var(--main-color);
  border-radius: 50px;
  display: inline-block;
  transition: all 0.3s ease;
  background-color: var(--background-white);
}

.email-link:hover {
  background-color: var(--main-color);
  color: var(--background-white);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(95, 144, 178, 0.3);
}

.email-note {
  color: #666;
  font-size: clamp(12px, 1.8vw, 14px);
  margin: 0;
  font-style: italic;
}

.contact-categories,
.response-info {
  padding: 1.5rem;
  background-color: #f1f8ff;
  border-radius: 10px;
  border-left: 4px solid var(--main-color);
}

.contact-categories h3,
.response-info h3 {
  color: var(--main-color);
  margin-bottom: 1rem;
  font-size: clamp(16px, 2.5vw, 20px);
}

.contact-categories ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact-categories li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #e0e0e0;
  color: var(--text-dark);
  font-size: clamp(14px, 2vw, 16px);
}

.contact-categories li:last-child {
  border-bottom: none;
}

.contact-categories li:before {
  content: "✓ ";
  color: var(--main-color);
  font-weight: bold;
  margin-right: 0.5rem;
}

.response-info p {
  color: var(--text-dark);
  margin-bottom: 0.5rem;
  font-size: clamp(14px, 2vw, 16px);
  line-height: 1.6;
}

.response-info p:last-child {
  margin-bottom: 0;
}

.privacy-note {
  text-align: center;
  padding: 1rem;
  background-color: #fff3cd;
  border-radius: 8px;
  border: 1px solid #ffeaa7;
}

.privacy-note p {
  color: #856404;
  margin: 0;
  font-size: clamp(12px, 1.8vw, 14px);
}

.privacy-note a {
  color: var(--main-color);
  text-decoration: underline;
}

.privacy-note a:hover {
  color: var(--accent-coral);
}

@media (max-width: 768px) {
  .contact {
    padding: 1rem 0.5rem;
  }
  
  .contact-content {
    padding: 1.5rem;
  }
  
  .email-link {
    font-size: clamp(16px, 4vw, 22px);
    padding: 0.8rem 1.5rem;
  }
}
</style>