<template>
  <div class="terms-of-service">
    <div class="terms-content">
      <h1>利用規約</h1>
      
      <div class="terms-section">
        <h2>1. はじめに</h2>
        <p>この利用規約（以下「本規約」）は、「ため職」（以下「当サイト」）が提供するサービスの利用条件を定めたものです。当サイトを利用される方は、本規約に同意したものとみなします。</p>
      </div>
      
      <div class="terms-section">
        <h2>2. サービスの内容</h2>
        <p>当サイトは、職業適性診断サービスを無料で提供しています。診断結果はあくまで参考情報であり、実際の進路選択や就職活動においては、ご自身の判断で行ってください。</p>
      </div>
      
      <div class="terms-section">
        <h2>3. 利用にあたって</h2>
        <p>当サイトを利用する際は、以下の事項をお守りください：</p>
        <ul>
          <li>法令や公序良俗に反する行為をしないこと</li>
          <li>他の利用者や第三者に迷惑をかけないこと</li>
          <li>当サイトのシステムやサービスを悪用しないこと</li>
          <li>不正な手段でアクセスしないこと</li>
        </ul>
      </div>
      
      <div class="terms-section">
        <h2>4. 禁止事項</h2>
        <p>以下の行為は禁止します：</p>
        <ul>
          <li>当サイトのコンテンツを無断で複製、転載、配布すること</li>
          <li>当サイトの運営を妨げる行為</li>
          <li>他の利用者の個人情報を不正に収集すること</li>
          <li>コンピューターウイルスの作成、配布</li>
        </ul>
      </div>
      
      <div class="terms-section">
        <h2>5. 免責事項</h2>
        <p>当サイトは、サービスの内容について細心の注意を払っていますが、情報の正確性、完全性、最新性を保証するものではありません。サービスの利用により生じた損害について、当サイトは一切の責任を負いかねます。</p>
      </div>
      
      <div class="terms-section">
        <h2>6. 著作権について</h2>
        <p>当サイトのコンテンツ（テキスト、画像、デザイン等）の著作権は、当サイトまたは正当な権利者に帰属します。無断での複製、転載、修正、配布は禁止します。</p>
      </div>
      
      <div class="terms-section">
        <h2>7. サービスの変更・停止</h2>
        <p>当サイトは、事前の通知なくサービスの内容を変更、またはサービスの提供を停止することがあります。これらにより利用者に生じた損害について、当サイトは一切の責任を負いかねます。</p>
      </div>
      
      <div class="terms-section">
        <h2>8. 利用規約の変更</h2>
        <p>当サイトは、必要に応じて本規約を変更することがあります。変更後の利用規約は、当ページに掲載した時点で効力を生じるものとします。定期的に本ページをご確認ください。</p>
      </div>
      
      <div class="terms-section">
        <h2>9. お問い合わせ</h2>
        <p>本規約に関するお問い合わせは、<router-link to="/contact">お問い合わせページ</router-link>よりご連絡ください。</p>
      </div>
      
      <div class="update-date">
        <p>最終更新日：2025年7月21日</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 利用規約ページ
</script>

<style scoped>
.terms-of-service {
  width: 100%;
  padding: 2rem 1rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}

.terms-content {
  width: 100%;
  max-width: 800px;
  background-color: var(--background-white);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
  line-height: 1.8;
}

.terms-content h1 {
  color: var(--text-dark);
  text-align: center;
  margin-bottom: 2rem;
  font-size: clamp(20px, 4vw, 32px);
  font-weight: 600;
  border-bottom: 3px solid var(--main-color);
  padding-bottom: 1rem;
}

.terms-section {
  margin-bottom: 2rem;
}

.terms-section h2 {
  color: var(--main-color);
  font-size: clamp(16px, 3vw, 24px);
  margin-bottom: 1rem;
  font-weight: 600;
}

.terms-section p {
  color: var(--text-dark);
  margin-bottom: 1rem;
  font-size: clamp(14px, 2vw, 16px);
}

.terms-section ul {
  color: var(--text-dark);
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.terms-section li {
  margin-bottom: 0.5rem;
  font-size: clamp(14px, 2vw, 16px);
}

.terms-section a {
  color: var(--main-color);
  text-decoration: underline;
}

.terms-section a:hover {
  color: var(--accent-coral);
}

.update-date {
  text-align: right;
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}

.update-date p {
  color: #666;
  font-size: clamp(12px, 1.5vw, 14px);
  margin: 0;
}

@media (max-width: 768px) {
  .terms-of-service {
    padding: 1rem 0.5rem;
  }
  
  .terms-content {
    padding: 1.5rem;
  }
}
</style>