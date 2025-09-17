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
          <li><router-link to="/chat">AI進路相談</router-link></li>
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
          <li><router-link to="/sitemap">サイトマップ</router-link></li>
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
      <p>&copy; 2025 Pandalize. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
// アプリケーションフッターコンポーネント
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins.scss' as mixins;
.app-footer {
  background-color: var(--text-dark, #333);
  color: var(--background-white, #fff);
  margin-top: auto;
  padding: var(--space-lg) 0;
  width: 100%;
}

.footer-content {
  @include mixins.container(1200px);
  @include mixins.grid-auto-fit(200px);
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: var(--space-md);
}

.footer-section h3 {
  color: var(--background-white, #fff);
  font-size: clamp(18px, 3vw, 24px);
  margin-bottom: var(--space-sm);
  font-weight: 700;
}

.footer-section h4 {
  color: var(--background-white, #fff);
  font-size: clamp(14px, 2.5vw, 18px);
  margin-bottom: var(--space-sm);
  font-weight: 600;
}

.footer-section p {
  color: #ccc;
  font-size: clamp(12px, 2vw, 14px);
  line-height: 1.6;
  margin: 0;
}

.footer-section ul {
  @include mixins.list-reset;
}

.footer-section li {
  margin-bottom: var(--space-xs);
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
  margin: var(--space-md) auto 0;
  padding-top: var(--space-md);
  border-top: 1px solid #555;
  text-align: center;
}

.footer-bottom p {
  color: #999;
  font-size: clamp(10px, 1.8vw, 12px);
  margin: 0;
}

// レスポンシブデザイン
@media (max-width: 1024px) {
  .footer-content {
    @include mixins.grid-columns(2);
    gap: var(--space-md);
  }
  
  .footer-section:first-child {
    grid-column: 1 / -1;
    text-align: center;
    margin-bottom: var(--space-sm);
  }
}

@media (max-width: 768px) {
  .app-footer {
    padding: var(--space-xl) var(--space-md) var(--space-lg);
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    box-shadow: inset 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .footer-content {
    @include mixins.grid-columns(2);
    text-align: center;
    max-width: 400px;
    margin: 0 auto;
  }

  .footer-section:nth-child(1),
  .footer-section:nth-child(2) {
    display: none;
  }
  
  .footer-section {
    padding: var(--space-md);
    backdrop-filter: blur(10px);
    
    &:first-child {
      grid-column: auto;
      margin-bottom: 0;
      background: linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(16, 185, 129, 0.08));
      border: 1px solid rgba(52, 152, 219, 0.2);
      
      h3 {
        font-size: 1.5rem;
        background: linear-gradient(135deg, var(--accent-blue), var(--accent-gold));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: var(--space-sm);
      }
      
      p {
        color: #e8f4fd;
        font-size: 0.9375rem;
        line-height: 1.6;
        opacity: 0.9;
      }
    }
    
    h4 {
      font-size: 1.125rem;
      color: #e8f4fd;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 2px;
        background: linear-gradient(90deg, var(--accent-blue), var(--accent-gold));
        border-radius: 1px;
      }
    }
    
    ul {
      display: flex;
      flex-direction: column;
    }
    
    li {
      margin-bottom: 0;
    }
    
    a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-xs) var(--space-sm);
      color: #bdc3c7;
      font-size: 0.875rem;
      border-radius: 8px;
      transition: all var(--transition-normal);
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        transition: left 0.6s ease;
      }
      
      &:hover {
        color: #ffffff;
        background: rgba(52, 152, 219, 0.2);
        transform: translateY(-2px);
        text-decoration: none;
        
        &::before {
          left: 100%;
        }
      }
      
      &:active {
        transform: translateY(0) scale(0.98);
      }
    }
    
    margin-bottom: 0;
  }
  
  .footer-bottom {
    margin-top: var(--space-xl);
    padding-top: var(--space-lg);
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    
    p {
      color: #95a5a6;
      font-size: 0.75rem;
      opacity: 0.8;
      padding: var(--space-xs);
    }
  }
}

@media (max-width: 480px) {
  .app-footer {
    padding: var(--space-md) var(--space-sm) var(--space-md);
    margin: 0 !important;
    height: 30vh;
  }
  
  .footer-content {
    padding: 0;
    max-width: 100%;
    gap: 0;
  }
  
  .footer-section {
    padding: var(--space-sm);
    
    &:first-child {
      h3 {
        font-size: 1.25rem;
      }
      
      p {
        font-size: 0.875rem;
      }
    }
    
    h4 {
      font-size: 1rem;
      margin-bottom: var(--space-sm);
    }
    
    a {
      font-size: 0.8125rem;
      padding: 0;
    }
  }
  
  .footer-bottom {
    margin-top: 0;
    padding-top: 0;
    
    p {
      font-size: 0.6875rem;
    }
  }
}

/* タッチデバイス最適化 */
@media (hover: none) and (pointer: coarse) {
  .footer-section a:hover {
    background: transparent;
    transform: none;
  }
  
  .footer-section a:active {
    background: rgba(52, 152, 219, 0.3);
    transform: scale(0.95);
    transition: all 0.1s ease;
  }
}
</style>