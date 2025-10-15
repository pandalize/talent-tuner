<template>
  <div class="not-found">
    <div class="not-found-content">
      <div class="error-icon">
        <span class="error-number">404</span>
      </div>
      
      <h1>ページが見つかりません</h1>
      
      <div class="error-message">
        <p>お探しのページは存在しないか、移動した可能性があります。</p>
        <p>URLをご確認いただくか、以下のリンクからサイトをご利用ください。</p>
      </div>
      
      <div class="navigation-links">
        <router-link to="/" class="btn home-button">
          ホームに戻る
        </router-link>
        <router-link to="/diagnosis" class="btn diagnosis-button">
          診断を始める
        </router-link>
        <router-link to="/about" class="btn about-button">
          職業一覧を見る
        </router-link>
      </div>
      
      <div class="help-section">
        <p>お困りの場合は、<router-link to="/contact">お問い合わせ</router-link>よりご連絡ください。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.not-found {
  width: 100%;
  min-height: 80vh;
  padding: 2rem 1rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

.not-found-content {
  width: 100%;
  max-width: 600px;
  background-color: var(--background-white);
  border-radius: 20px;
  padding: 3rem 2rem;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.error-icon {
  margin-bottom: 2rem;
}

.error-number {
  font-size: clamp(80px, 15vw, 120px);
  font-weight: 900;
  color: var(--main-color);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

.not-found-content h1 {
  color: var(--text-dark);
  margin-bottom: 2rem;
  font-size: clamp(20px, 4vw, 32px);
  font-weight: 600;
  line-height: 1.4;
}

.error-message {
  margin-bottom: 3rem;
}

.error-message p {
  color: var(--text-dark);
  margin-bottom: 1rem;
  font-size: clamp(14px, 2.5vw, 18px);
  line-height: 1.7;
}

.navigation-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;
  align-items: center;
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
  text-decoration: none;
  font-size: clamp(14px, 2.5vw, 18px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  min-width: 200px;
}

.home-button {
  background-color: var(--main-color);
  color: var(--background-white);
}

.home-button:hover {
  background-color: var(--accent-coral);
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.diagnosis-button {
  background-color: var(--orange-beige);
  color: var(--text-dark);
}

.diagnosis-button:hover {
  background-color: var(--accent-coral);
  color: var(--background-white);
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.about-button {
  background-color: var(--light-pink);
  color: var(--text-dark);
}

.about-button:hover {
  background-color: var(--main-color);
  color: var(--background-white);
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.help-section {
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;
}

.help-section p {
  color: #666;
  font-size: clamp(12px, 2vw, 16px);
  margin: 0;
}

.help-section a {
  color: var(--main-color);
  text-decoration: underline;
}

.help-section a:hover {
  color: var(--accent-coral);
}

@media (min-width: 768px) {
  .navigation-links {
    flex-direction: row;
    justify-content: center;
    gap: 1.5rem;
  }
  
  .btn {
    min-width: 160px;
  }
}

@media (max-width: 480px) {
  .not-found {
    padding: 1rem 0.5rem;
  }
  
  .not-found-content {
    padding: 2rem 1.5rem;
  }
}
</style>