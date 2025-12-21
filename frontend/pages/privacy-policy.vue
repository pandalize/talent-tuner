<template>
  <div class="privacy-policy">
    <div class="privacy-content">
      <h1>プライバシーポリシー</h1>
      
      <div class="policy-section">
        <h2>1. 個人情報の収集について</h2>
        <p>当サイト「ため職」では、より良いサービスを提供するため、以下の情報を収集する場合があります：</p>
        <ul>
          <li>診断結果の統計分析のための匿名データ</li>
          <li>お問い合わせ時に提供いただく連絡先情報</li>
          <li>サイト利用状況の分析データ（Google Analytics等）</li>
        </ul>
      </div>
      
      <div class="policy-section">
        <h2>2. 個人情報の利用目的</h2>
        <p>収集した個人情報は、以下の目的で利用いたします：</p>
        <ul>
          <li>お問い合わせへの回答</li>
          <li>サービスの改善・向上</li>
          <li>統計データの作成（個人を特定できない形で処理）</li>
          <li>法令に基づく対応</li>
        </ul>
      </div>
      
      <div class="policy-section">
        <h2>3. 第三者への提供</h2>
        <p>当サイトは、法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。</p>
      </div>
      
      <div class="policy-section">
        <h2>4. Cookieについて</h2>
        <p>当サイトでは、サービス向上のためCookieを使用しています。Cookieの使用を希望されない場合は、ブラウザの設定で無効にすることができます。</p>
      </div>
      
      <div class="policy-section">
        <h2>5. Google AdSenseについて</h2>
        <p>当サイトでは、広告配信サービス「Google AdSense」を利用しています。Google AdSenseは、ユーザーの興味に応じた広告を表示するため、Cookieを使用して情報を収集しています。詳細は<a href="https://policies.google.com/privacy-policy" target="_blank" rel="noopener noreferrer">Googleプライバシーポリシー</a>をご確認ください。</p>
      </div>
      
      <div class="policy-section">
        <h2>6. アクセス解析について</h2>
        <p>当サイトでは、Google Analyticsを利用してアクセス解析を行っています。Google Analyticsは、Cookieを使用してユーザーのサイト利用状況を分析します。このデータは匿名で収集されており、個人を特定するものではありません。</p>
      </div>
      
      <div class="policy-section">
        <h2>7. プライバシーポリシーの変更</h2>
        <p>当サイトは、必要に応じてプライバシーポリシーを変更することがあります。変更後のプライバシーポリシーは、当ページに掲載した時点で効力を生じるものとします。</p>
      </div>
      
      <div class="policy-section">
        <h2>8. お問い合わせ</h2>
        <p>
          プライバシーポリシーに関するお問い合わせは、
          <a href="mailto:pandalize.info@gmail.com?subject=【ため職】プライバシーポリシーについて">
            pandalize.info@gmail.com
          </a>
          よりご連絡ください。
        </p>
      </div>
      
      <div class="update-date">
        <p>最終更新日：2025年8月4日</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.privacy-policy {
  width: 100%;
  padding: 2rem 1rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}

.privacy-content {
  width: 100%;
  max-width: 800px;
  background-color: var(--background-white);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
  line-height: 1.8;
}

.privacy-content h1 {
  color: var(--text-dark);
  text-align: center;
  margin-bottom: 2rem;
  font-size: clamp(20px, 4vw, 32px);
  font-weight: 600;
  border-bottom: 3px solid var(--main-color);
  padding-bottom: 1rem;
}

.policy-section {
  margin-bottom: 2rem;
}

.policy-section h2 {
  color: var(--main-color);
  font-size: clamp(16px, 3vw, 24px);
  margin-bottom: 1rem;
  font-weight: 600;
}

.policy-section p {
  color: var(--text-dark);
  margin-bottom: 1rem;
  font-size: clamp(14px, 2vw, 16px);
}

.policy-section ul {
  color: var(--text-dark);
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.policy-section li {
  margin-bottom: 0.5rem;
  font-size: clamp(14px, 2vw, 16px);
}

.policy-section a {
  color: var(--main-color);
  text-decoration: underline;
}

.policy-section a:hover {
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
  .privacy-policy {
    padding: 1rem 0.5rem;
  }
  
  .privacy-content {
    padding: 1.5rem;
  }
}
</style>