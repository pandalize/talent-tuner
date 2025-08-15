<template>
  <div class="sitemap-page">
    <div class="container">
      <!-- ヒーローセクション -->
      <header class="sitemap-hero">
        <h1>サイトマップ</h1>
        <p>ため職の全ページをカテゴリー別に整理してご紹介します。目的のページを素早く見つけることができます。</p>
      </header>

      <!-- メインコンテンツ -->
      <div class="sitemap-content">
        <!-- 主要機能 -->
        <section class="sitemap-section">
          <h2>🎯 主要機能</h2>
          <ul class="sitemap-list">
            <li>
              <router-link to="/">
                <strong>ホームページ</strong>
                <span>サービス概要とご利用の流れ</span>
              </router-link>
            </li>
            <li>
              <router-link to="/diagnosis">
                <strong>職業適性診断</strong>
                <span>16の質問であなたに最適な職業を診断</span>
              </router-link>
            </li>
            <li>
              <router-link to="/chat">
                <strong>AI進路相談</strong>
                <span>28職業に特化したAIアシスタントに相談</span>
              </router-link>
            </li>
            <li>
              <router-link to="/about">
                <strong>職業一覧</strong>
                <span>診断対象の全職業を一覧で確認</span>
              </router-link>
            </li>
          </ul>
        </section>

        <!-- 職業詳細ページ -->
        <section class="sitemap-section">
          <h2>💼 職業詳細ページ</h2>
          <p>各職業の詳細情報、必要スキル、キャリアパス、年収データを網羅</p>
          <div class="profession-grid">
            <div class="profession-category">
              <h3>技術・クリエイティブ系</h3>
              <ul class="sitemap-list">
                <li><router-link to="/profession/programmer"><strong>プログラマー</strong></router-link></li>
                <li><router-link to="/profession/web-designer"><strong>Webデザイナー</strong></router-link></li>
                <li><router-link to="/profession/graphic-designer"><strong>グラフィックデザイナー</strong></router-link></li>
                <li><router-link to="/profession/engineer"><strong>エンジニア</strong></router-link></li>
                <li><router-link to="/profession/data-scientist"><strong>データサイエンティスト</strong></router-link></li>
                <li><router-link to="/profession/researcher"><strong>研究者</strong></router-link></li>
              </ul>
            </div>

            <div class="profession-category">
              <h3>ビジネス・金融系</h3>
              <ul class="sitemap-list">
                <li><router-link to="/profession/entrepreneur"><strong>起業家</strong></router-link></li>
                <li><router-link to="/profession/consultant"><strong>経営コンサルタント</strong></router-link></li>
                <li><router-link to="/profession/sales"><strong>営業職</strong></router-link></li>
                <li><router-link to="/profession/marketing"><strong>マーケティング</strong></router-link></li>
                <li><router-link to="/profession/advertising-pr"><strong>広告・PR</strong></router-link></li>
                <li><router-link to="/profession/finance"><strong>金融</strong></router-link></li>
                <li><router-link to="/profession/real-estate"><strong>不動産</strong></router-link></li>
              </ul>
            </div>

            <div class="profession-category">
              <h3>専門職・士業</h3>
              <ul class="sitemap-list">
                <li><router-link to="/profession/accountant"><strong>公認会計士</strong></router-link></li>
                <li><router-link to="/profession/tax-accountant"><strong>税理士</strong></router-link></li>
                <li><router-link to="/profession/architect"><strong>建築士</strong></router-link></li>
                <li><router-link to="/profession/doctor"><strong>医師</strong></router-link></li>
                <li><router-link to="/profession/pharmacist"><strong>薬剤師</strong></router-link></li>
                <li><router-link to="/profession/veterinarian"><strong>獣医師</strong></router-link></li>
                <li><router-link to="/profession/lawyer"><strong>弁護士</strong></router-link></li>
                <li><router-link to="/profession/civil-servant"><strong>公務員</strong></router-link></li>
              </ul>
            </div>

            <div class="profession-category">
              <h3>医療・福祉・教育系</h3>
              <ul class="sitemap-list">
                <li><router-link to="/profession/nurse"><strong>看護師</strong></router-link></li>
                <li><router-link to="/profession/teacher"><strong>教師</strong></router-link></li>
                <li><router-link to="/profession/childcare-worker"><strong>保育士</strong></router-link></li>
                <li><router-link to="/profession/social-worker"><strong>社会福祉士</strong></router-link></li>
                <li><router-link to="/profession/counselor"><strong>カウンセラー・心理士</strong></router-link></li>
              </ul>
            </div>

            <div class="profession-category">
              <h3>製造・建設系</h3>
              <ul class="sitemap-list">
                <li><router-link to="/profession/construction"><strong>建設業</strong></router-link></li>
                <li><router-link to="/profession/manufacturing"><strong>製造業</strong></router-link></li>
              </ul>
            </div>
          </div>
        </section>

        <!-- キャリアガイド -->
        <section class="sitemap-section">
          <h2>📚 キャリアガイド</h2>
          <ul class="sitemap-list">
            <li>
              <router-link to="/career-guide">
                <strong>キャリア選択ガイド</strong>
                <span>自分に合ったキャリアの選び方と設計方法</span>
              </router-link>
            </li>
            <li>
              <router-link to="/skills-development">
                <strong>スキル開発ガイド</strong>
                <span>高収入職業に必要なスキルの身につけ方</span>
              </router-link>
            </li>
            <li>
              <router-link to="/salary-guide">
                <strong>年収・転職情報ガイド</strong>
                <span>職業別年収相場と転職市場の動向</span>
              </router-link>
            </li>
            <li>
              <router-link to="/career-change">
                <strong>転職・キャリアチェンジガイド</strong>
                <span>異業種転職の成功法とタイミング</span>
              </router-link>
            </li>
            <li>
              <router-link to="/student-guide">
                <strong>学生向けキャリアガイド</strong>
                <span>就職活動の準備と内定獲得のコツ</span>
              </router-link>
            </li>
          </ul>
        </section>

        <!-- 診断について -->
        <section class="sitemap-section">
          <h2>🔬 診断システムについて</h2>
          <ul class="sitemap-list">
            <li>
              <router-link to="/diagnosis-method">
                <strong>診断方法について</strong>
                <span>4つのカテゴリーによる科学的分析方法の詳細</span>
              </router-link>
            </li>
            <li>
              <router-link to="/result-guide">
                <strong>診断結果の活用ガイド</strong>
                <span>結果を最大限に活用するための実践的ガイド</span>
              </router-link>
            </li>
            <li>
              <router-link to="/diagnosis-theory">
                <strong>適性診断の理論と背景</strong>
                <span>ホランド理論などの科学的根拠を詳細解説</span>
              </router-link>
            </li>
          </ul>
        </section>

        <!-- サイト情報 -->
        <section class="sitemap-section">
          <h2>ℹ️ サイト情報</h2>
          <ul class="sitemap-list">
            <li>
              <router-link to="/company">
                <strong>運営者情報</strong>
                <span>サイト概要と運営チームの情報</span>
              </router-link>
            </li>
            <li>
              <router-link to="/contact">
                <strong>お問い合わせ</strong>
                <span>ご意見・ご要望・技術的なお問い合わせ</span>
              </router-link>
            </li>
            <li>
              <router-link to="/privacy">
                <strong>プライバシーポリシー</strong>
                <span>個人情報保護方針とCookieの使用について</span>
              </router-link>
            </li>
            <li>
              <router-link to="/terms">
                <strong>利用規約</strong>
                <span>サービス利用にあたっての注意事項</span>
              </router-link>
            </li>
          </ul>
        </section>
      </div>

      <!-- フッター -->
      <footer class="sitemap-footer">
        <div class="sitemap-stats">
          <p><strong>総ページ数:</strong> 25ページ</p>
          <p><strong>職業詳細ページ:</strong> 28職業対応</p>
          <p><strong>最終更新:</strong> {{ currentDate }}</p>
        </div>
        <div class="sitemap-note">
          <p>※ このサイトマップは定期的に更新されています。新しいコンテンツが追加された場合、こちらのページに反映されます。</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 現在の日付を取得
const currentDate = computed(() => {
  return new Date().toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>

<style scoped>
.sitemap-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.sitemap-hero {
  text-align: center;
  color: white;
  margin-bottom: 3rem;
}

.sitemap-hero h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.sitemap-hero p {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.sitemap-content {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.sitemap-section {
  margin-bottom: 3rem;
}

.sitemap-section h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid #3498db;
}

.sitemap-section h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
}

.sitemap-list {
  list-style: none;
  padding: 0;
}

.sitemap-list li {
  margin-bottom: 1rem;
  padding: 0.8rem 1.2rem;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid #3498db;
  transition: all 0.3s ease;
}

.sitemap-list li:hover {
  background: #e9ecef;
  transform: translateX(5px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.sitemap-list a {
  text-decoration: none;
  color: inherit;
  display: block;
}

.sitemap-list strong {
  color: #2c3e50;
  font-weight: 600;
  font-size: 1.1rem;
}

.sitemap-list span {
  color: #6c757d;
  font-size: 0.9rem;
  margin-left: 0.5rem;
  display: block;
  margin-top: 0.2rem;
}

.profession-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

.profession-category {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 15px;
  border: 2px solid #e9ecef;
}

.profession-category h3 {
  margin-top: 0;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #3498db;
}

.profession-category .sitemap-list li {
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  background: white;
  border-left-color: #27ae60;
}

.profession-category .sitemap-list li:hover {
  border-left-color: #2ecc71;
  background: #f1f8e9;
}

.sitemap-footer {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.sitemap-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.sitemap-stats p {
  margin: 0;
  padding: 0.5rem 1rem;
  background: #e3f2fd;
  border-radius: 20px;
  color: #1976d2;
  font-weight: 600;
}

.sitemap-note {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
  color: #6c757d;
  font-size: 0.9rem;
  line-height: 1.5;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .sitemap-hero h1 {
    font-size: 2.2rem;
  }
  
  .sitemap-hero p {
    font-size: 1rem;
  }
  
  .sitemap-content {
    padding: 2rem 1.5rem;
  }
  
  .profession-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .sitemap-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .sitemap-list span {
    margin-left: 0;
  }
}
</style>