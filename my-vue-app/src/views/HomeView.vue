<template>
  <main>
    <div class="home-container">
      <div class="welcome-section">
        <h1 class="diagnosis-welcome">
          ため職へようこそ！<br>「興味」「能力」「性格」「考え方」の4つの観点で、<br>あなたにマッチする職業を短時間で多角的に分析。
          <br>あなたに最適な高収入職業を<br>ランキング形式でおすすめします。
        </h1>
      </div>
      <div class="image-container">
        <img src="/image/construction.png" alt="建設業で働く人のイラスト - 高収入職業の一つ" />
        <img src="/image/influencer.png" alt="インフルエンサーのイラスト - 高収入職業の一つ" />
      </div>
      <div class="navigation-cards">
        <router-link to="/diagnosis" class="btn btn-border-shadow btn-border-shadow--radius">診断する</router-link>
        <router-link to="/about" class="btn btn-border-shadow btn-border-shadow--radius">職業一覧</router-link>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* ==========================================================================
   注: グローバルスタイル
   本来は `src/assets/main.css` のようなサイト全体で読み込むファイルに記述します
   ========================================================================== */
*,
*:before,
*:after {
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
}

html {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 62.5%;
}

/* ==========================================================================
   ページ基本レイアウト
   ========================================================================== */
main {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.home-container {
  width: 70%;
  max-width: 1200px;
  padding: 1rem;
  box-sizing: border-box;
}

/* ==========================================================================
   コンテンツ要素（出現順）
   ========================================================================== */

/* --- 1. ウェルカムセクション --- */
.welcome-section {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: var(--background-white, #ffffff);
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.diagnosis-welcome {
  color: var(--text-dark, #333);
  margin: 0;
  line-height: 1.6;
  font-weight: 500;
  font-size: clamp(9px, 2vw, 20px);
}

/* --- 2. イメージコンテナ --- */
.image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.home-container img {
  width: 20rem;
  height: auto;
  max-width: 50%;
}

/* --- 3. ナビゲーションカード (ボタンのコンテナ) --- */
.navigation-cards {
  display: flex;
  gap: 3rem;
  margin-bottom: 4rem;
  width: 100%;
  justify-content: center;
}

/* ==========================================================================
   コンポーネント: ボタン
   ========================================================================== */
.btn,
button.btn {
  font-size: clamp(15px, 3vw, 40px);
  font-weight: 700;
  line-height: 1.5;
  position: relative;
  display: inline-block;
  padding: 1rem 4rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;
  letter-spacing: 0.1em;
  color: #212529;
  border-radius: 0.5rem;
}

.btn-border-shadow {
  padding: calc(1.5rem - 12px) 3rem 1.5rem;
  background: var(--cream);
}

.btn-border-shadow--radius {
  border-radius: 100vh;
}

.btn-border-shadow:before {
  position: absolute;
  top: -6px;
  left: -6px;
  width: 100%;
  height: 100%;
  content: "";
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  border: 3px solid #000;
  border-radius: 0.5rem;
}

.btn-border-shadow--radius:before {
  border-radius: 100vh;
}

.btn-border-shadow:hover {
  padding: calc(1.5rem - 6px) 3rem;
}

.btn-border-shadow:hover:before {
  top: 0;
  left: 0;
}

/* ==========================================================================
   メディアクエリ (レスポンシブ対応)
   ========================================================================== */
/* スマートフォン向け */
@media (max-width: 455px) {
  .home-container {
    width:90%;
  }

  .navigation-cards {
    justify-content: center;
    align-items: center;
  }

  .btn,
  button.btn {
    font-size: clamp(12px, 2.5vw, 16px);
    white-space: nowrap;
  }

  .btn-border-shadow {
    padding: calc(1.3rem - 12px) 2rem 1.4rem;
  }

  .btn-border-shadow:hover {
    padding: calc(0.8rem - 6px) 1.5rem;
  }
}

/* タブレット向け */
@media (min-width: 456px) and (max-width: 1024px) {
  .home-container {
    max-width: 90%;
  }
}

/* 大画面向け */
@media (min-width: 1025px) {
  .home-container {
    max-width: 1200px;
  }
}
</style>