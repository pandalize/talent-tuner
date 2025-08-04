<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>ため職</h3>
        <p>日本一ためになる正直なおすすめ職業診断</p>
      </div>
      
      <div class="footer-section">
        <h4>サービス</h4>
        <ul>
          <li><router-link to="/diagnosis">診断ページ</router-link></li>
          <li><router-link to="/about">職業一覧</router-link></li>
          <li><router-link to="/career-guide">キャリアガイド</router-link></li>
          <li><router-link to="/diagnosis-method">診断方法</router-link></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h4>サポート</h4>
        <ul>
          <li><router-link to="/contact">お問い合わせ</router-link></li>
          <li><router-link to="/company">運営者情報</router-link></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h4>法的情報</h4>
        <ul>
          <li><router-link to="/privacy">プライバシーポリシー</router-link></li>
          <li><router-link to="/terms">利用規約</router-link></li>
        </ul>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2025 ため職. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
// アプリケーションフッターコンポーネント
</script>

<style scoped>
.app-footer {
  background-color: var(--text-dark, #333);
  color: var(--background-white, #fff);
  margin-top: auto;
  padding: 3rem 1rem 1rem;
  width: 100%;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 2rem;
}

.footer-section h3 {
  color: var(--background-white, #fff);
  font-size: clamp(18px, 3vw, 24px);
  margin-bottom: 1rem;
  font-weight: 700;
}

.footer-section h4 {
  color: var(--background-white, #fff);
  font-size: clamp(14px, 2.5vw, 18px);
  margin-bottom: 1rem;
  font-weight: 600;
}

.footer-section p {
  color: #ccc;
  font-size: clamp(12px, 2vw, 14px);
  line-height: 1.6;
  margin: 0;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: #ccc;
  text-decoration: none;
  font-size: clamp(12px, 2vw, 14px);
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: var(--background-white, #fff);
  text-decoration: underline;
}

.footer-bottom {
  max-width: 1200px;
  margin: 2rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid #555;
  text-align: center;
}

.footer-bottom p {
  color: #999;
  font-size: clamp(10px, 1.8vw, 12px);
  margin: 0;
}

/* タブレット向け */
@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  
  .footer-section:first-child {
    grid-column: 1 / -1;
    text-align: center;
    margin-bottom: 1rem;
  }
}

/* スマートフォン向け */
@media (max-width: 768px) {
  .app-footer {
    padding: 2rem 1rem 1rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 1rem;
    text-align: center;
  }
  
  .footer-section:first-child {
    grid-column: auto;
    margin-bottom: 1.5rem;
  }
  
  .footer-section {
    margin-bottom: 1.5rem;
  }
  
  .footer-bottom {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
  }
}
</style>