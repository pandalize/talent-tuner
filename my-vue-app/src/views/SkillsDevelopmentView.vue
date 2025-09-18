<template>
  <div class="skills-development">
    <div class="skills-development-content">
      <!-- ヘッダー -->
      <header class="guide-header">
        <h1 class="guide-title">スキル開発ガイド</h1>
        <p class="guide-subtitle">高収入職業に必要なスキルを効率的に身につける方法</p>
      </header>

      <!-- 目次 -->
      <nav class="table-of-contents">
        <h2>目次</h2>
        <ul>
          <li><a href="#overview">スキル開発の重要性</a></li>
          <li><a href="#profession-skills">職業別必須スキル</a></li>
          <li><a href="#learning-methods">効率的な学習方法</a></li>
          <li><a href="#skill-assessment">スキルレベル診断</a></li>
          <li><a href="#roadmap">学習ロードマップ</a></li>
          <li><a href="#resources">おすすめ学習リソース</a></li>
        </ul>
      </nav>

      <!-- スキル開発の重要性 -->
      <section id="overview" class="guide-section">
        <h2>なぜスキル開発が重要なのか</h2>
        
        <div class="content-block">
          <p>デジタル化とAI技術の進歩により、労働市場は急速に変化しています。スキル開発は高収入を得る上で最も重要な投資の一つです。</p>
          
          <div class="statistics">
            <div class="stat-item">
              <div class="stat-number">42%</div>
              <div class="stat-label">2030年までに必要になる新しいスキルの割合</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">220万円</div>
              <div class="stat-label">スキル習得による年収アップの平均額</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">6ヶ月</div>
              <div class="stat-label">新スキル習得の平均期間</div>
            </div>
          </div>
          
          <div class="highlight-box">
            <h3>スキル開発がもたらす5つのメリット</h3>
            <ul>
              <li><strong>年収向上：</strong>専門スキルを持つ人材は市場価値が高く、高い報酬を得やすい</li>
              <li><strong>転職優位性：</strong>求められるスキルを持つことで転職市場での競争力が向上</li>
              <li><strong>職業安定性：</strong>AIに代替されにくいスキルにより長期的な雇用安定</li>
              <li><strong>キャリア選択肢：</strong>多様なスキルにより幅広いキャリアパスが可能</li>
              <li><strong>自己実現：</strong>新しい挑戦と成長による満足感の向上</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 職業別必須スキル -->
      <section id="profession-skills" class="guide-section">
        <h2>職業別必須スキル一覧</h2>
        
        <div class="content-block">
          <div class="profession-skills-grid">
            <div class="skill-category">
              <div class="category-header">
                <h3>プログラマー</h3>
                <div class="difficulty">習得難易度: ★★★☆☆</div>
              </div>
              <div class="skills-list">
                <div class="skill-item">
                  <div class="skill-name">プログラミング言語</div>
                  <div class="skill-detail">Python, JavaScript, Java等</div>
                  <div class="learn-time">習得期間: 3-6ヶ月</div>
                </div>
                <div class="skill-item">
                  <div class="skill-name">フレームワーク</div>
                  <div class="skill-detail">React, Django, Spring等</div>
                  <div class="learn-time">習得期間: 2-4ヶ月</div>
                </div>
                <div class="skill-item">
                  <div class="skill-name">データベース</div>
                  <div class="skill-detail">SQL, MySQL, PostgreSQL</div>
                  <div class="learn-time">習得期間: 1-3ヶ月</div>
                </div>
                <div class="skill-item">
                  <div class="skill-name">バージョン管理</div>
                  <div class="skill-detail">Git, GitHub</div>
                  <div class="learn-time">習得期間: 2-4週間</div>
                </div>
              </div>
            </div>

            <div class="skill-category">
              <div class="category-header">
                <h3>公認会計士</h3>
                <div class="difficulty">習得難易度: ★★★★★</div>
              </div>
              <div class="skills-list">
                <div class="skill-item">
                  <div class="skill-name">会計知識</div>
                  <div class="skill-detail">簿記、財務会計、管理会計</div>
                  <div class="learn-time">習得期間: 1-2年</div>
                </div>
                <div class="skill-item">
                  <div class="skill-name">監査</div>
                  <div class="skill-detail">監査基準、リスク評価</div>
                  <div class="learn-time">習得期間: 6ヶ月-1年</div>
                </div>
                <div class="skill-item">
                  <div class="skill-name">税務</div>
                  <div class="skill-detail">法人税、所得税、消費税</div>
                  <div class="learn-time">習得期間: 6ヶ月-1年</div>
                </div>
                <div class="skill-item">
                  <div class="skill-name">ITスキル</div>
                  <div class="skill-detail">Excel、会計ソフト</div>
                  <div class="learn-time">習得期間: 1-3ヶ月</div>
                </div>
              </div>
            </div>

            <div class="skill-category">
              <div class="category-header">
                <h3>建設業</h3>
                <div class="difficulty">習得難易度: ★★★☆☆</div>
              </div>
              <div class="skills-list">
                <div class="skill-item">
                  <div class="skill-name">建設技術</div>
                  <div class="skill-detail">施工管理、品質管理</div>
                  <div class="learn-time">習得期間: 6ヶ月-2年</div>
                </div>
                <div class="skill-item">
                  <div class="skill-name">CAD操作</div>
                  <div class="skill-detail">AutoCAD, Revit等</div>
                  <div class="learn-time">習得期間: 2-4ヶ月</div>
                </div>
                <div class="skill-item">
                  <div class="skill-name">安全管理</div>
                  <div class="skill-detail">労働安全衛生法理解</div>
                  <div class="learn-time">習得期間: 1-2ヶ月</div>
                </div>
                <div class="skill-item">
                  <div class="skill-name">コミュニケーション</div>
                  <div class="skill-detail">チーム調整、交渉力</div>
                  <div class="learn-time">習得期間: 継続的</div>
                </div>
              </div>
            </div>

            <div class="skill-category">
              <div class="category-header">
                <h3>デイトレーダー</h3>
                <div class="difficulty">習得難易度: ★★★★☆</div>
              </div>
              <div class="skills-list">
                <div class="skill-item">
                  <div class="skill-name">テクニカル分析</div>
                  <div class="skill-detail">チャート読み、指標分析</div>
                  <div class="learn-time">習得期間: 3-6ヶ月</div>
                </div>
                <div class="skill-item">
                  <div class="skill-name">ファンダメンタル分析</div>
                  <div class="skill-detail">財務分析、経済指標</div>
                  <div class="learn-time">習得期間: 6ヶ月-1年</div>
                </div>
                <div class="skill-item">
                  <div class="skill-name">リスク管理</div>
                  <div class="skill-detail">資金管理、損切り</div>
                  <div class="learn-time">習得期間: 3-6ヶ月</div>
                </div>
                <div class="skill-item">
                  <div class="skill-name">心理的コントロール</div>
                  <div class="skill-detail">感情管理、規律遵守</div>
                  <div class="learn-time">習得期間: 継続的</div>
                </div>
              </div>
            </div>

            <div class="skill-category">
              <div class="category-header">
                <h3>起業家</h3>
                <div class="difficulty">習得難易度: ★★★★★</div>
              </div>
              <div class="skills-list">
                <div class="skill-item">
                  <div class="skill-name">ビジネスプラン</div>
                  <div class="skill-detail">事業計画、収益モデル</div>
                  <div class="learn-time">習得期間: 3-6ヶ月</div>
                </div>
                <div class="skill-item">
                  <div class="skill-name">マーケティング</div>
                  <div class="skill-detail">市場分析、販促戦略</div>
                  <div class="learn-time">習得期間: 6ヶ月-1年</div>
                </div>
                <div class="skill-item">
                  <div class="skill-name">財務管理</div>
                  <div class="skill-detail">資金調達、会計管理</div>
                  <div class="learn-time">習得期間: 3-6ヶ月</div>
                </div>
                <div class="skill-item">
                  <div class="skill-name">リーダーシップ</div>
                  <div class="skill-detail">チーム構築、意思決定</div>
                  <div class="learn-time">習得期間: 継続的</div>
                </div>
              </div>
            </div>

            <div class="skill-category">
              <div class="category-header">
                <h3>インフルエンサー</h3>
                <div class="difficulty">習得難易度: ★★☆☆☆</div>
              </div>
              <div class="skills-list">
                <div class="skill-item">
                  <div class="skill-name">コンテンツ制作</div>
                  <div class="skill-detail">動画編集、写真撮影</div>
                  <div class="learn-time">習得期間: 2-4ヶ月</div>
                </div>
                <div class="skill-item">
                  <div class="skill-name">SNSマーケティング</div>
                  <div class="skill-detail">プラットフォーム運用</div>
                  <div class="learn-time">習得期間: 3-6ヶ月</div>
                </div>
                <div class="skill-item">
                  <div class="skill-name">ブランディング</div>
                  <div class="skill-detail">パーソナルブランド構築</div>
                  <div class="learn-time">習得期間: 6ヶ月-1年</div>
                </div>
                <div class="skill-item">
                  <div class="skill-name">データ分析</div>
                  <div class="skill-detail">アナリティクス、KPI管理</div>
                  <div class="learn-time">習得期間: 1-3ヶ月</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 効率的な学習方法 -->
      <section id="learning-methods" class="guide-section">
        <h2>効率的なスキル習得方法</h2>
        
        <div class="content-block">
          <div class="method-grid">
            <div class="method-card">
              <h3>目標設定と計画立案</h3>
              <div class="method-steps">
                <div class="step">
                  <strong>STEP 1:</strong> SMART目標の設定（具体的、測定可能、達成可能、関連性、期限）
                </div>
                <div class="step">
                  <strong>STEP 2:</strong> スキル習得の優先順位付け（市場価値×習得難易度）
                </div>
                <div class="step">
                  <strong>STEP 3:</strong> 週次・月次の学習計画作成
                </div>
              </div>
              <div class="method-tip">
                <strong>コツ：</strong> 大きな目標を小さなマイルストーンに分割し、達成感を積み重ねる
              </div>
            </div>

            <div class="method-card">
              <h3>マルチモーダル学習</h3>
              <div class="method-steps">
                <div class="step">
                  <strong>理論学習:</strong> 書籍、オンライン講座、動画教材
                </div>
                <div class="step">
                  <strong>実践練習:</strong> プロジェクト作成、模擬演習
                </div>
                <div class="step">
                  <strong>アウトプット:</strong> ブログ執筆、発表、教える
                </div>
              </div>
              <div class="method-tip">
                <strong>コツ：</strong> インプット3:アウトプット7の比率が最も効果的
              </div>
            </div>

            <div class="method-card">
              <h3>コミュニティ活用</h3>
              <div class="method-steps">
                <div class="step">
                  <strong>オンラインコミュニティ:</strong> Discord、Slack、Reddit等
                </div>
                <div class="step">
                  <strong>勉強会・セミナー:</strong> 定期的なオフライン交流
                </div>
                <div class="step">
                  <strong>メンター探し:</strong> 経験者からの直接指導
                </div>
              </div>
              <div class="method-tip">
                <strong>コツ：</strong> 質問を積極的に行い、他者に教えることで理解を深める
              </div>
            </div>

            <div class="method-card">
              <h3>反復と応用</h3>
              <div class="method-steps">
                <div class="step">
                  <strong>スパイラル学習:</strong> 基礎→応用→基礎の繰り返し
                </div>
                <div class="step">
                  <strong>実プロジェクト応用:</strong> 学んだスキルの実践活用
                </div>
                <div class="step">
                  <strong>定期的な復習:</strong> エビングハウスの忘却曲線対策
                </div>
              </div>
              <div class="method-tip">
                <strong>コツ：</strong> 学習から24時間以内、1週間後、1ヶ月後の復習が効果的
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- スキルレベル診断 -->
      <section id="skill-assessment" class="guide-section">
        <h2>スキルレベル診断チェック</h2>
        
        <div class="content-block">
          <p>自分の現在のスキルレベルを正確に把握することで、効率的な学習計画を立てることができます。</p>
          
          <div class="assessment-levels">
            <div class="level-card">
              <div class="level-title">初心者レベル (0-6ヶ月)</div>
              <div class="level-indicators">
                <div class="indicator">基本用語を理解している</div>
                <div class="indicator">簡単なタスクを指導の下で実行できる</div>
                <div class="indicator">学習リソースを活用して情報収集できる</div>
              </div>
              <div class="level-action">
                <strong>推奨アクション：</strong> 基礎知識の徹底、基本スキルの反復練習
              </div>
            </div>

            <div class="level-card">
              <div class="level-title">中級者レベル (6ヶ月-2年)</div>
              <div class="level-indicators">
                <div class="indicator">独立して一般的なタスクを実行できる</div>
                <div class="indicator">問題が発生した際に解決策を見つけられる</div>
                <div class="indicator">他者に基本事項を教えることができる</div>
              </div>
              <div class="level-action">
                <strong>推奨アクション：</strong> 応用スキルの習得、プロジェクト経験の蓄積
              </div>
            </div>

            <div class="level-card">
              <div class="level-title">上級者レベル (2年以上)</div>
              <div class="level-indicators">
                <div class="indicator">複雑な問題を分析・解決できる</div>
                <div class="indicator">効率的な手法やベストプラクティスを知っている</div>
                <div class="indicator">チームやプロジェクトをリードできる</div>
              </div>
              <div class="level-action">
                <strong>推奨アクション：</strong> 専門性の深化、リーダーシップスキルの向上
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 学習ロードマップ -->
      <section id="roadmap" class="guide-section">
        <h2>職業別学習ロードマップ</h2>
        
        <div class="content-block">
          <div class="roadmap-tabs">
            <div class="tab-nav">
              <button class="tab-button active" onclick="showTab('programmer')">プログラマー</button>
              <button class="tab-button" onclick="showTab('accountant')">公認会計士</button>
              <button class="tab-button" onclick="showTab('trader')">デイトレーダー</button>
            </div>
            
            <div id="programmer" class="tab-content active">
              <h3>プログラマー 6ヶ月習得プラン</h3>
              <div class="timeline">
                <div class="timeline-item">
                  <div class="timeline-marker">1ヶ月目</div>
                  <div class="timeline-content">
                    <h4>プログラミング基礎</h4>
                    <ul>
                      <li>Python基礎文法（変数、関数、クラス）</li>
                      <li>Git/GitHubの基本操作</li>
                      <li>開発環境構築（VSCode、Python環境）</li>
                    </ul>
                    <div class="study-time">推奨学習時間: 週15時間</div>
                  </div>
                </div>
                
                <div class="timeline-item">
                  <div class="timeline-marker">2-3ヶ月目</div>
                  <div class="timeline-content">
                    <h4>Web開発基礎</h4>
                    <ul>
                      <li>HTML/CSS/JavaScript基礎</li>
                      <li>Django/Flaskフレームワーク</li>
                      <li>データベース基礎（SQL、MySQL）</li>
                    </ul>
                    <div class="study-time">推奨学習時間: 週20時間</div>
                  </div>
                </div>
                
                <div class="timeline-item">
                  <div class="timeline-marker">4-5ヶ月目</div>
                  <div class="timeline-content">
                    <h4>実践プロジェクト</h4>
                    <ul>
                      <li>Webアプリケーション開発</li>
                      <li>API設計・実装</li>
                      <li>テスト駆動開発</li>
                    </ul>
                    <div class="study-time">推奨学習時間: 週25時間</div>
                  </div>
                </div>
                
                <div class="timeline-item">
                  <div class="timeline-marker">6ヶ月目</div>
                  <div class="timeline-content">
                    <h4>ポートフォリオ完成</h4>
                    <ul>
                      <li>3-5個のプロジェクト完成</li>
                      <li>GitHubポートフォリオ整備</li>
                      <li>転職活動準備</li>
                    </ul>
                    <div class="study-time">推奨学習時間: 週30時間</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div id="accountant" class="tab-content">
              <h3>公認会計士 2年習得プラン</h3>
              <div class="timeline">
                <div class="timeline-item">
                  <div class="timeline-marker">1-6ヶ月目</div>
                  <div class="timeline-content">
                    <h4>簿記基礎固め</h4>
                    <ul>
                      <li>簿記3級・2級取得</li>
                      <li>会計の基本概念理解</li>
                      <li>財務諸表の読み方</li>
                    </ul>
                    <div class="study-time">推奨学習時間: 週20時間</div>
                  </div>
                </div>
                
                <div class="timeline-item">
                  <div class="timeline-marker">7-12ヶ月目</div>
                  <div class="timeline-content">
                    <h4>短答式試験対策</h4>
                    <ul>
                      <li>財務会計論・管理会計論</li>
                      <li>監査論・企業法</li>
                      <li>過去問演習・模試受験</li>
                    </ul>
                    <div class="study-time">推奨学習時間: 週40時間</div>
                  </div>
                </div>
                
                <div class="timeline-item">
                  <div class="timeline-marker">13-18ヶ月目</div>
                  <div class="timeline-content">
                    <h4>論文式試験対策</h4>
                    <ul>
                      <li>会計学・監査論・税法</li>
                      <li>選択科目（経営学等）</li>
                      <li>論文答案練習</li>
                    </ul>
                    <div class="study-time">推奨学習時間: 週50時間</div>
                  </div>
                </div>
                
                <div class="timeline-item">
                  <div class="timeline-marker">19-24ヶ月目</div>
                  <div class="timeline-content">
                    <h4>最終仕上げ</h4>
                    <ul>
                      <li>弱点分野の集中学習</li>
                      <li>模試・答練の反復</li>
                      <li>論文式試験受験</li>
                    </ul>
                    <div class="study-time">推奨学習時間: 週60時間</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div id="trader" class="tab-content">
              <h3>デイトレーダー 4ヶ月習得プラン</h3>
              <div class="timeline">
                <div class="timeline-item">
                  <div class="timeline-marker">1ヶ月目</div>
                  <div class="timeline-content">
                    <h4>基礎知識習得</h4>
                    <ul>
                      <li>株式市場の仕組み理解</li>
                      <li>テクニカル分析の基本</li>
                      <li>チャートの読み方</li>
                    </ul>
                    <div class="study-time">推奨学習時間: 週10時間</div>
                  </div>
                </div>
                
                <div class="timeline-item">
                  <div class="timeline-marker">2ヶ月目</div>
                  <div class="timeline-content">
                    <h4>分析手法習得</h4>
                    <ul>
                      <li>移動平均、RSI、MACD等</li>
                      <li>ファンダメンタル分析基礎</li>
                      <li>デモトレード開始</li>
                    </ul>
                    <div class="study-time">推奨学習時間: 週15時間</div>
                  </div>
                </div>
                
                <div class="timeline-item">
                  <div class="timeline-marker">3ヶ月目</div>
                  <div class="timeline-content">
                    <h4>実践と検証</h4>
                    <ul>
                      <li>少額リアルトレード開始</li>
                      <li>トレード記録と分析</li>
                      <li>リスク管理手法確立</li>
                    </ul>
                    <div class="study-time">推奨学習時間: 週20時間</div>
                  </div>
                </div>
                
                <div class="timeline-item">
                  <div class="timeline-marker">4ヶ月目</div>
                  <div class="timeline-content">
                    <h4>手法確立</h4>
                    <ul>
                      <li>勝率向上のための分析</li>
                      <li>メンタル管理手法習得</li>
                      <li>本格的なトレード開始</li>
                    </ul>
                    <div class="study-time">推奨学習時間: 週25時間</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- おすすめ学習リソース -->
      <section id="resources" class="guide-section">
        <h2>おすすめ学習リソース</h2>
        
        <div class="content-block">
          <div class="resource-categories">
            <div class="resource-category">
              <h3>オンライン学習プラットフォーム</h3>
              <div class="resource-list">
                <div class="resource-item">
                  <div class="resource-name">Udemy</div>
                  <div class="resource-desc">実践的なプログラミング・ビジネススキルコース</div>
                  <div class="resource-price">料金: 1,200円〜（セール時）</div>
                  <div class="resource-rating">★★★★☆</div>
                </div>
                <div class="resource-item">
                  <div class="resource-name">Coursera</div>
                  <div class="resource-desc">大学レベルの専門コース、認定証付き</div>
                  <div class="resource-price">料金: 月額4,000円〜</div>
                  <div class="resource-rating">★★★★★</div>
                </div>
                <div class="resource-item">
                  <div class="resource-name">Progate</div>
                  <div class="resource-desc">プログラミング初心者向け、日本語対応</div>
                  <div class="resource-price">料金: 月額1,078円</div>
                  <div class="resource-rating">★★★★☆</div>
                </div>
              </div>
            </div>

            <div class="resource-category">
              <h3>書籍・参考資料</h3>
              <div class="resource-list">
                <div class="resource-item">
                  <div class="resource-name">プログラミング言語別入門書</div>
                  <div class="resource-desc">基礎から応用まで体系的に学習</div>
                  <div class="resource-price">料金: 2,000円〜4,000円</div>
                  <div class="resource-rating">★★★★☆</div>
                </div>
                <div class="resource-item">
                  <div class="resource-name">資格試験対策書</div>
                  <div class="resource-desc">効率的な資格取得のための専門書</div>
                  <div class="resource-price">料金: 3,000円〜5,000円</div>
                  <div class="resource-rating">★★★★☆</div>
                </div>
                <div class="resource-item">
                  <div class="resource-name">業界専門誌・レポート</div>
                  <div class="resource-desc">最新トレンドと実践的な情報</div>
                  <div class="resource-price">料金: 月額1,000円〜</div>
                  <div class="resource-rating">★★★☆☆</div>
                </div>
              </div>
            </div>

            <div class="resource-category">
              <h3>コミュニティ・イベント</h3>
              <div class="resource-list">
                <div class="resource-item">
                  <div class="resource-name">Meetup・connpass</div>
                  <div class="resource-desc">技術勉強会・セミナーの情報と参加</div>
                  <div class="resource-price">料金: 無料〜3,000円</div>
                  <div class="resource-rating">★★★★☆</div>
                </div>
                <div class="resource-item">
                  <div class="resource-name">Discord・Slack</div>
                  <div class="resource-desc">リアルタイムでの質問・情報交換</div>
                  <div class="resource-price">料金: 無料</div>
                  <div class="resource-rating">★★★★★</div>
                </div>
                <div class="resource-item">
                  <div class="resource-name">オンラインスクール</div>
                  <div class="resource-desc">メンターサポート付きの集中学習</div>
                  <div class="resource-price">料金: 月額20,000円〜</div>
                  <div class="resource-rating">★★★★☆</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA セクション -->
      <section class="cta-section">
        <div class="cta-content">
          <h2>スキル習得の第一歩を踏み出そう！</h2>
          <p>適性診断であなたに最適な職業を見つけ、必要なスキルを効率的に身につけましょう。</p>
          <div class="cta-buttons">
            <router-link to="/diagnosis" class="cta-button primary">
              適性診断を受ける（無料）
            </router-link>
            <router-link to="/career-guide" class="cta-button secondary">
              キャリア選択ガイドを見る
            </router-link>
          </div>
        </div>
      </section>

      <!-- 関連記事 -->
      <section class="related-section">
        <h2>関連ガイド</h2>
        <div class="related-cards">
          <router-link to="/career-guide" class="related-card">
            <h3>キャリア選択ガイド</h3>
            <p>自分に最適な職業を見つけるための完全ガイド</p>
          </router-link>
          <router-link to="/salary-guide" class="related-card">
            <h3>年収・転職情報</h3>
            <p>職業別年収相場と転職市場の最新動向</p>
          </router-link>
          <router-link to="/student-guide" class="related-card">
            <h3>学生向けガイド</h3>
            <p>就職活動を成功させる準備と戦略</p>
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  // スムーススクロール
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href')?.substring(1);
      const targetElement = targetId ? document.getElementById(targetId) : null;
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

// タブ切り替え関数
function showTab(tabId: string) {
  // 全てのタブコンテンツを非表示
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => {
    content.classList.remove('active');
  });
  
  // 全てのタブボタンから active クラスを削除
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.classList.remove('active');
  });
  
  // 選択されたタブを表示
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }
  
  // 対応するボタンに active クラスを追加
  const clickedButton = event?.target as HTMLElement;
  if (clickedButton) {
    clickedButton.classList.add('active');
  }
}

// グローバルに関数を公開
(window as Window & { showTab?: typeof showTab }).showTab = showTab;
</script>

<style scoped>
/* CareerGuideView.vueと同じベーススタイルを継承 */
.skills-development {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
}

.skills-development-content {
  width: 100%;
}

/* ヘッダー */
.guide-header {
  background: linear-gradient(135deg, var(--primary-navy) 0%, var(--primary-blue) 70%);
  color: white;
  padding: 3rem 2rem;
  text-align: center;
}

.breadcrumb {
  margin-bottom: 1rem;
  font-size: 0.9rem;
  opacity: 0.9;
}

.breadcrumb a {
  color: white;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.separator {
  margin: 0 0.5rem;
}

.guide-title {
  font-size: 2.5rem;
  margin: 1rem 0;
  font-weight: 700;
}

.guide-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin: 0;
}

/* 目次 */
.table-of-contents {
  background: #f8f9ff;
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

.table-of-contents h2 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.table-of-contents ul {
  list-style: none;
  padding: 0;
}

.table-of-contents li {
  margin-bottom: 0.8rem;
}

.table-of-contents a {
  color: var(--text-dark);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.table-of-contents a:hover {
  color: var(--main-color);
}

/* セクション */
.guide-section {
  padding: 3rem 2rem;
  border-bottom: 1px solid #f0f0f0;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

.guide-section h2 {
  color: var(--main-color);
  font-size: 2rem;
  margin-bottom: 2rem;
  border-left: 4px solid var(--main-color);
  padding-left: 1rem;
}

/* 統計情報 */
.statistics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.stat-item {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, var(--light-pink), #fff);
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  color: var(--main-color);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-dark);
  line-height: 1.4;
}

/* ハイライトボックス */
.highlight-box {
  background: linear-gradient(135deg, #e3f2fd, #f8f9ff);
  padding: 2rem;
  border-radius: 15px;
  border-left: 4px solid var(--main-color);
  margin: 2rem 0;
}

.highlight-box h3 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.highlight-box ul {
  list-style: none;
  padding: 0;
}

.highlight-box li {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  position: relative;
}

.highlight-box li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--main-color);
  font-weight: bold;
}

/* 職業別スキルグリッド */
.profession-skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.skill-category {
  background: white;
  border: 2px solid #f0f0f0;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.skill-category:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border-color: var(--main-color);
}

.category-header {
  background: linear-gradient(135deg, var(--primary-navy) 0%, var(--primary-blue) 70%);
  color: white;
  padding: 1.5rem;
  text-align: center;
}

.category-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
}

.difficulty {
  font-size: 0.9rem;
  opacity: 0.9;
}

.skills-list {
  padding: 1.5rem;
}

.skill-item {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8f9ff;
  border-radius: 8px;
}

.skill-name {
  font-weight: 600;
  color: var(--main-color);
  margin-bottom: 0.5rem;
}

.skill-detail {
  color: var(--text-dark);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.learn-time {
  font-size: 0.8rem;
  color: #666;
  font-style: italic;
}

/* 学習方法グリッド */
.method-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.method-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 2px solid #f0f0f0;
  transition: all 0.3s ease;
}

.method-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border-color: var(--main-color);
}

.method-card h3 {
  color: var(--main-color);
  text-align: center;
  margin-bottom: 1.5rem;
}

.method-steps {
  margin-bottom: 1.5rem;
}

.step {
  margin-bottom: 1rem;
  padding: 0.8rem;
  background: #f8f9ff;
  border-radius: 8px;
  font-size: 0.9rem;
  line-height: 1.5;
}

.method-tip {
  background: #e3f2fd;
  padding: 1rem;
  border-radius: 8px;
  border-left: 3px solid var(--main-color);
  font-size: 0.9rem;
}

/* スキルレベル評価 */
.assessment-levels {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem 0;
}

.level-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 2px solid #f0f0f0;
}

.level-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--main-color);
  margin-bottom: 1rem;
  text-align: center;
}

.level-indicators {
  margin-bottom: 1.5rem;
}

.indicator {
  margin-bottom: 0.8rem;
  padding-left: 1.5rem;
  position: relative;
}

.indicator::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--main-color);
  font-weight: bold;
}

.level-action {
  background: #f8f9ff;
  padding: 1rem;
  border-radius: 8px;
  border-left: 3px solid var(--main-color);
  font-size: 0.9rem;
}

/* タブ機能 */
.roadmap-tabs {
  margin: 2rem 0;
}

.tab-nav {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.tab-button {
  padding: 1rem 2rem;
  background: #f0f0f0;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  color: var(--text-dark);
}

.tab-button.active,
.tab-button:hover {
  background: var(--main-color);
  color: white;
  transform: translateY(-2px);
}

.tab-content {
  display: none;
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.tab-content.active {
  display: block;
}

.tab-content h3 {
  color: var(--main-color);
  margin-bottom: 2rem;
  text-align: center;
}

/* タイムライン */
.timeline {
  position: relative;
  margin: 2rem 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 30px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--main-color);
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 3rem;
  position: relative;
}

.timeline-marker {
  background: var(--main-color);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.timeline-content {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  flex: 1;
}

.timeline-content h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.timeline-content ul {
  list-style: none;
  padding: 0;
  margin-bottom: 1rem;
}

.timeline-content li {
  margin-bottom: 0.8rem;
  padding-left: 1.5rem;
  position: relative;
}

.timeline-content li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--main-color);
  font-weight: bold;
}

.study-time {
  background: #e3f2fd;
  padding: 0.8rem;
  border-radius: 8px;
  font-weight: 600;
  color: var(--main-color);
  text-align: center;
  font-size: 0.9rem;
}

/* リソース */
.resource-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.resource-category {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.resource-category h3 {
  color: var(--main-color);
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.resource-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.resource-item {
  padding: 1.5rem;
  background: #f8f9ff;
  border-radius: 10px;
  border-left: 3px solid var(--main-color);
}

.resource-name {
  font-weight: 600;
  color: var(--main-color);
  margin-bottom: 0.5rem;
}

.resource-desc {
  color: var(--text-dark);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.resource-price {
  color: #666;
  font-size: 0.8rem;
  margin-bottom: 0.3rem;
}

.resource-rating {
  color: #ffa500;
  font-size: 0.9rem;
}

/* CTA セクション */
.cta-section {
  background: linear-gradient(135deg, var(--primary-navy) 0%, var(--primary-blue) 70%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.cta-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  display: inline-block;
  padding: 1rem 2rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  min-width: 200px;
}

.cta-button.primary {
  background: white;
  color: var(--main-color);
}

.cta-button.primary:hover {
  background: #f0f0f0;
  transform: translateY(-2px);
}

.cta-button.secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.cta-button.secondary:hover {
  background: white;
  color: var(--main-color);
  transform: translateY(-2px);
}

/* 関連記事 */
.related-section {
  padding: 3rem 2rem;
  background: #f8f9ff;
}

.related-section h2 {
  color: var(--main-color);
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.related-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.related-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-decoration: none;
  color: var(--text-dark);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.related-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border-color: var(--main-color);
}

.related-card h3 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.related-card p {
  line-height: 1.6;
  color: #666;
  font-size: 0.9rem;
}

/* レスポンシブ */
@media (max-width: 768px) {
  .skills-development-content {
    margin: 0;
    box-shadow: none;
  }
  
  .guide-header {
    padding: 2rem 1rem;
  }
  
  .guide-title {
    font-size: 2rem;
  }
  
  .guide-section {
    padding: 2rem 1rem;
  }
  
  .guide-section h2 {
    font-size: 1.5rem;
  }
  
  .statistics {
    grid-template-columns: 1fr;
  }
  
  .profession-skills-grid {
    grid-template-columns: 1fr;
  }
  
  .method-grid {
    grid-template-columns: 1fr;
  }
  
  .resource-categories {
    grid-template-columns: 1fr;
  }
  
  .timeline::before {
    display: none;
  }
  
  .timeline-item {
    flex-direction: column;
    text-align: center;
  }
  
  .tab-nav {
    flex-direction: column;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .related-cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .table-of-contents,
  .guide-section {
    padding: 1.5rem 1rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .profession-skills-grid {
    grid-template-columns: 1fr;
  }
  
  .skill-category {
    margin-bottom: 1rem;
  }
}
</style>