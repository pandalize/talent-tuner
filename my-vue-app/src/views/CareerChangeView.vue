<template>
  <div class="career-change">
    <div class="career-change-content">
      <!-- ヘッダー -->
      <header class="guide-header">
        <div class="breadcrumb">
          <router-link to="/">ホーム</router-link>
          <span class="separator">></span>
          <span class="current">転職・キャリアチェンジガイド</span>
        </div>
        <h1 class="guide-title">転職・キャリアチェンジガイド</h1>
        <p class="guide-subtitle">異業種転職を成功させるための実践的な方法</p>
      </header>

      <!-- 目次 -->
      <nav class="table-of-contents">
        <h2>目次</h2>
        <ul>
          <li><a href="#career-change-trends">転職・キャリアチェンジの現状</a></li>
          <li><a href="#success-patterns">成功パターンの分析</a></li>
          <li><a href="#preparation-strategy">転職準備戦略</a></li>
          <li><a href="#skill-bridging">スキル移転の方法</a></li>
          <li><a href="#job-search-tactics">効果的な転職活動</a></li>
          <li><a href="#transition-management">転職後の適応戦略</a></li>
        </ul>
      </nav>

      <!-- 転職・キャリアチェンジの現状 -->
      <section id="career-change-trends" class="guide-section">
        <h2>転職・キャリアチェンジの現状</h2>
        
        <div class="content-block">
          <p>終身雇用制度の変化と働き方の多様化により、転職・キャリアチェンジは一般的な選択肢となりました。厚生労働省の調査によると、転職者の約30%が異業種への転職を経験しており、成功事例も増加傾向にあります。</p>
          
          <div class="statistics">
            <div class="stat-item">
              <div class="stat-number">2.8回</div>
              <div class="stat-label">平均的な転職回数（生涯）</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">68%</div>
              <div class="stat-label">転職で満足度が向上した人の割合</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">42%</div>
              <div class="stat-label">異業種転職の成功率</div>
            </div>
          </div>
          
          <div class="trend-analysis">
            <h3>🔄 転職市場の変化</h3>
            <div class="change-grid">
              <div class="change-item positive">
                <h4>ポジティブな変化</h4>
                <ul>
                  <li><strong>スキルベース採用の拡大：</strong>学歴・職歴よりも実力重視の採用が増加</li>
                  <li><strong>リモートワークの普及：</strong>地理的制約が減少し転職選択肢が拡大</li>
                  <li><strong>副業・複業の浸透：</strong>転職前にスキル検証や人脈構築が可能</li>
                  <li><strong>ダイバーシティ重視：</strong>多様な経験・バックグラウンドが評価される</li>
                </ul>
              </div>
              
              <div class="change-item challenging">
                <h4>チャレンジング要素</h4>
                <ul>
                  <li><strong>専門性の高度化：</strong>より深い専門知識が求められる傾向</li>
                  <li><strong>即戦力志向：</strong>育成コストを避け即戦力を求める企業増加</li>
                  <li><strong>年収競争の激化：</strong>優秀な人材への高額オファー競争</li>
                  <li><strong>選考過程の複雑化：</strong>多段階選考と実技試験の増加</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="highlight-box">
            <h3>転職・キャリアチェンジのメリット</h3>
            <ul>
              <li><strong>年収アップ：</strong>転職成功者の76%が年収向上を実現</li>
              <li><strong>スキル多様化：</strong>複数業界経験で市場価値が向上</li>
              <li><strong>人脈拡大：</strong>異なる業界・職種での人的ネットワーク構築</li>
              <li><strong>キャリア自律性：</strong>主体的なキャリア設計力の向上</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 成功パターンの分析 -->
      <section id="success-patterns" class="guide-section">
        <h2>異業種転職の成功パターン</h2>
        
        <div class="content-block">
          <p>異業種転職の成功事例を分析すると、いくつかの共通パターンが見えてきます。これらのパターンを理解し、自分の状況に適用することで成功確率を高められます。</p>
          
          <div class="success-patterns">
            <div class="pattern-item">
              <div class="pattern-icon">🔗</div>
              <div class="pattern-content">
                <h3>スキル橋渡し型</h3>
                <div class="pattern-description">
                  <p>既存スキルを新しい業界で活用するパターン。最も成功率が高く、年収ダウンリスクも低い。</p>
                </div>
                <div class="pattern-examples">
                  <h4>成功事例：</h4>
                  <div class="example-cases">
                    <div class="case-item">
                      <strong>営業 → ITコンサル：</strong>
                      <p>顧客折衝力とビジネス理解力を活かし、技術知識を後から習得</p>
                      <div class="case-result">年収: 500万円 → 750万円（+50%）</div>
                    </div>
                    <div class="case-item">
                      <strong>製造業エンジニア → データサイエンティスト：</strong>
                      <p>統計・分析スキルと問題解決能力を基盤にPython・機械学習を習得</p>
                      <div class="case-result">年収: 600万円 → 900万円（+50%）</div>
                    </div>
                    <div class="case-item">
                      <strong>金融営業 → Fintech企業PM：</strong>
                      <p>金融業界知識と顧客ニーズ理解力をプロダクト企画に活用</p>
                      <div class="case-result">年収: 650万円 → 850万円（+31%）</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="pattern-item">
              <div class="pattern-icon">🎯</div>
              <div class="pattern-content">
                <h3>専門特化型</h3>
                <div class="pattern-description">
                  <p>特定スキルを深く習得し、そのスキルが高く評価される業界に転職するパターン。</p>
                </div>
                <div class="pattern-examples">
                  <h4>成功事例：</h4>
                  <div class="example-cases">
                    <div class="case-item">
                      <strong>一般事務 → Webデザイナー：</strong>
                      <p>デザインスクール→副業→ポートフォリオ構築の段階的アプローチ</p>
                      <div class="case-result">年収: 320万円 → 480万円（+50%）</div>
                    </div>
                    <div class="case-item">
                      <strong>小売店員 → プログラマー：</strong>
                      <p>オンライン学習→プログラミングスクール→GitHub実績蓄積</p>
                      <div class="case-result">年収: 280万円 → 450万円（+61%）</div>
                    </div>
                    <div class="case-item">
                      <strong>公務員 → デジタルマーケター：</strong>
                      <p>Google広告・Analytics認定→個人ブログ運営実績→転職</p>
                      <div class="case-result">年収: 450万円 → 580万円（+29%）</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="pattern-item">
              <div class="pattern-icon">🌟</div>
              <div class="pattern-content">
                <h3>人脈・推薦型</h3>
                <div class="pattern-description">
                  <p>業界人脈や推薦を活用し、スキル面での不足を補うパターン。リスクは高いが成功時のリターンは大きい。</p>
                </div>
                <div class="pattern-examples">
                  <h4>成功事例：</h4>
                  <div class="example-cases">
                    <div class="case-item">
                      <strong>教師 → 企業研修コンサル：</strong>
                      <p>教育スキルを評価した元教え子の経営者から直接スカウト</p>
                      <div class="case-result">年収: 500万円 → 720万円（+44%）</div>
                    </div>
                    <div class="case-item">
                      <strong>飲食店長 → 人事マネージャー：</strong>
                      <p>人材育成力を評価した常連客（人事部長）からの推薦</p>
                      <div class="case-result">年収: 400万円 → 600万円（+50%）</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="pattern-item">
              <div class="pattern-icon">📈</div>
              <div class="pattern-content">
                <h3>成長業界参入型</h3>
                <div class="pattern-description">
                  <p>急成長している業界・職種に早期参入し、業界成長とともにキャリアアップするパターン。</p>
                </div>
                <div class="pattern-examples">
                  <h4>成功事例：</h4>
                  <div class="example-cases">
                    <div class="case-item">
                      <strong>新聞記者 → YouTubeプロデューサー：</strong>
                      <p>取材・編集スキルを動画コンテンツ制作に活用、業界拡大の波に乗る</p>
                      <div class="case-result">年収: 550万円 → 800万円（+45%）</div>
                    </div>
                    <div class="case-item">
                      <strong>保険営業 → SaaS営業：</strong>
                      <p>営業スキルを成長著しいSaaS業界で発揮、ストックオプションも獲得</p>
                      <div class="case-result">年収: 480万円 → 750万円（+56%）</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="success-factors">
            <h3>🏆 成功者の共通要素</h3>
            <div class="factors-grid">
              <div class="factor-card">
                <h4>明確な転職理由</h4>
                <p>「なぜその業界・職種に転職したいのか」を論理的に説明できる</p>
              </div>
              <div class="factor-card">
                <h4>継続的な学習姿勢</h4>
                <p>転職前から新分野の知識・スキル習得を開始している</p>
              </div>
              <div class="factor-card">
                <h4>実績の可視化</h4>
                <p>これまでの成果を数値・具体例で示せる</p>
              </div>
              <div class="factor-card">
                <h4>柔軟な条件設定</h4>
                <p>短期的な年収ダウンを受け入れ、中長期的な成長を重視</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 転職準備戦略 -->
      <section id="preparation-strategy" class="guide-section">
        <h2>効果的な転職準備戦略</h2>
        
        <div class="content-block">
          <div class="preparation-phases">
            <div class="phase-item">
              <div class="phase-number">Phase 1</div>
              <div class="phase-content">
                <h3>自己分析・目標設定（1-2ヶ月）</h3>
                <div class="phase-description">
                  <p>転職の動機を明確化し、理想的なキャリアビジョンを設定します。</p>
                </div>
                <div class="phase-tasks">
                  <h4>具体的なタスク：</h4>
                  <div class="task-grid">
                    <div class="task-item">
                      <h5>転職動機の整理</h5>
                      <ul>
                        <li>現職での不満・課題の明文化</li>
                        <li>転職で実現したいことの優先順位付け</li>
                        <li>5年後・10年後のキャリアビジョン設定</li>
                      </ul>
                    </div>
                    <div class="task-item">
                      <h5>スキル・経験の棚卸し</h5>
                      <ul>
                        <li>これまでの業務経験・成果の整理</li>
                        <li>保有スキル・資格の一覧化</li>
                        <li>市場価値の客観的評価</li>
                      </ul>
                    </div>
                    <div class="task-item">
                      <h5>希望条件の設定</h5>
                      <ul>
                        <li>年収・労働条件の希望範囲設定</li>
                        <li>勤務地・働き方の希望整理</li>
                        <li>妥協可能な条件の明確化</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="phase-item">
              <div class="phase-number">Phase 2</div>
              <div class="phase-content">
                <h3>市場調査・情報収集（2-3ヶ月）</h3>
                <div class="phase-description">
                  <p>転職市場の状況と希望業界・職種の詳細情報を収集します。</p>
                </div>
                <div class="phase-tasks">
                  <h4>具体的なタスク：</h4>
                  <div class="task-grid">
                    <div class="task-item">
                      <h5>業界・職種研究</h5>
                      <ul>
                        <li>希望業界の市場動向・将来性調査</li>
                        <li>職種の具体的な業務内容・必要スキル調査</li>
                        <li>年収相場・キャリアパスの把握</li>
                      </ul>
                    </div>
                    <div class="task-item">
                      <h5>企業情報収集</h5>
                      <ul>
                        <li>転職希望企業の業績・事業戦略調査</li>
                        <li>企業文化・働き方の情報収集</li>
                        <li>求人情報・採用動向の継続的チェック</li>
                      </ul>
                    </div>
                    <div class="task-item">
                      <h5>人脈・情報源の構築</h5>
                      <ul>
                        <li>業界関係者との接点作り</li>
                        <li>転職エージェント・ヘッドハンターとの関係構築</li>
                        <li>LinkedInでの業界人脈拡大</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="phase-item">
              <div class="phase-number">Phase 3</div>
              <div class="phase-content">
                <h3>スキルアップ・実績作り（3-6ヶ月）</h3>
                <div class="phase-description">
                  <p>転職に必要なスキルを習得し、実績を積み上げます。</p>
                </div>
                <div class="phase-tasks">
                  <h4>具体的なタスク：</h4>
                  <div class="task-grid">
                    <div class="task-item">
                      <h5>必要スキルの習得</h5>
                      <ul>
                        <li>オンライン学習・スクール受講</li>
                        <li>関連資格の取得</li>
                        <li>実践的なプロジェクト制作</li>
                      </ul>
                    </div>
                    <div class="task-item">
                      <h5>ポートフォリオ構築</h5>
                      <ul>
                        <li>作品・成果物の整理・公開</li>
                        <li>技術ブログ・記事執筆</li>
                        <li>GitHub・個人サイトの充実</li>
                      </ul>
                    </div>
                    <div class="task-item">
                      <h5>実務経験の獲得</h5>
                      <ul>
                        <li>副業・フリーランスでの経験積み上げ</li>
                        <li>ボランティア・プロボノ活動</li>
                        <li>現職での関連業務への挑戦</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="phase-item">
              <div class="phase-number">Phase 4</div>
              <div class="phase-content">
                <h3>転職活動準備（1ヶ月）</h3>
                <div class="phase-description">
                  <p>具体的な転職活動に向けて必要な書類・戦略を準備します。</p>
                </div>
                <div class="phase-tasks">
                  <h4>具体的なタスク：</h4>
                  <div class="task-grid">
                    <div class="task-item">
                      <h5>応募書類の作成</h5>
                      <ul>
                        <li>職務経歴書の業界・職種特化版作成</li>
                        <li>志望動機・自己PRの業界別バージョン準備</li>
                        <li>推薦状・推薦者の確保</li>
                      </ul>
                    </div>
                    <div class="task-item">
                      <h5>面接対策</h5>
                      <ul>
                        <li>想定質問・回答の準備</li>
                        <li>業界知識・企業研究の最終確認</li>
                        <li>模擬面接・面接練習の実施</li>
                      </ul>
                    </div>
                    <div class="task-item">
                      <h5>転職活動戦略</h5>
                      <ul>
                        <li>応募企業の優先順位設定</li>
                        <li>転職活動スケジュールの作成</li>
                        <li>現職との調整・退職準備計画</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- スキル移転の方法 -->
      <section id="skill-bridging" class="guide-section">
        <h2>効果的なスキル移転の方法</h2>
        
        <div class="content-block">
          <p>異業種転職で最も重要なのは、既存スキルをどのように新しい業界・職種で活用できるかを明確に示すことです。スキルの「翻訳」と「橋渡し」が成功の鍵となります。</p>
          
          <div class="skill-bridging-framework">
            <h3>📋 スキル移転フレームワーク</h3>
            <div class="framework-steps">
              <div class="framework-step">
                <div class="step-icon">🔍</div>
                <div class="step-content">
                  <h4>STEP 1: スキル分解</h4>
                  <p>現在のスキルを要素レベルまで分解し、転用可能な部分を特定します。</p>
                  <div class="step-example">
                    <strong>例（営業職の場合）：</strong>
                    <ul>
                      <li>顧客ニーズヒアリング → ユーザーリサーチスキル</li>
                      <li>提案・プレゼンテーション → 企画・提案力</li>
                      <li>数値管理・分析 → データ分析基礎力</li>
                      <li>関係構築 → ステークホルダー管理</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div class="framework-step">
                <div class="step-icon">🎯</div>
                <div class="step-content">
                  <h4>STEP 2: 需要マッチング</h4>
                  <p>転職先業界・職種で求められるスキルと、自分の保有スキルのマッチング分析を行います。</p>
                  <div class="matching-matrix">
                    <h5>マッチング分析例（営業 → ITコンサル）：</h5>
                    <div class="matrix-grid">
                      <div class="matrix-item high-match">
                        <h6>高適合</h6>
                        <p>課題解決力、コミュニケーション力、プレゼンテーション力</p>
                      </div>
                      <div class="matrix-item medium-match">
                        <h6>中適合</h6>
                        <p>数値分析、プロジェクト管理、顧客理解</p>
                      </div>
                      <div class="matrix-item low-match">
                        <h6>要習得</h6>
                        <p>技術知識、システム理解、業界知識</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="framework-step">
                <div class="step-icon">🔗</div>
                <div class="step-content">
                  <h4>STEP 3: ブリッジ構築</h4>
                  <p>既存スキルと新分野を結ぶ「橋」となる知識・経験を積み重ねます。</p>
                  <div class="bridge-strategies">
                    <div class="strategy-item">
                      <h5>🎓 学習ブリッジ</h5>
                      <p>業界特化の知識・スキルを体系的に学習</p>
                      <ul>
                        <li>オンライン講座・資格取得</li>
                        <li>業界セミナー・勉強会参加</li>
                        <li>専門書籍・業界誌の読破</li>
                      </ul>
                    </div>
                    
                    <div class="strategy-item">
                      <h5>💼 実践ブリッジ</h5>
                      <p>副業・プロジェクトでの実務経験獲得</p>
                      <ul>
                        <li>フリーランス案件の受注</li>
                        <li>社内プロジェクトでの役割拡大</li>
                        <li>ボランティア・プロボノ活動</li>
                      </ul>
                    </div>
                    
                    <div class="strategy-item">
                      <h5>👥 人脈ブリッジ</h5>
                      <p>業界関係者との関係構築</p>
                      <ul>
                        <li>業界イベント・交流会参加</li>
                        <li>LinkedIn・SNSでの発信</li>
                        <li>メンター・アドバイザーとの面談</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="success-stories">
            <h3>🌟 スキル移転成功事例</h3>
            <div class="stories-grid">
              <div class="story-card">
                <h4>人事 → UXデザイナー</h4>
                <div class="story-path">
                  <div class="path-item">
                    <strong>既存スキル：</strong>
                    <p>人材評価、面接技術、組織分析</p>
                  </div>
                  <div class="path-arrow">→</div>
                  <div class="path-item">
                    <strong>ブリッジ：</strong>
                    <p>ユーザビリティ学習、デザインツール習得、HCD理論</p>
                  </div>
                  <div class="path-arrow">→</div>
                  <div class="path-item">
                    <strong>新活用法：</strong>
                    <p>ユーザーインタビュー、ペルソナ設計、ユーザー行動分析</p>
                  </div>
                </div>
                <div class="story-result">
                  <strong>結果：</strong>年収520万円→680万円、大手IT企業のUXデザイナーとして転職成功
                </div>
              </div>
              
              <div class="story-card">
                <h4>経理 → データアナリスト</h4>
                <div class="story-path">
                  <div class="path-item">
                    <strong>既存スキル：</strong>
                    <p>数値分析、Excel運用、業務効率化</p>
                  </div>
                  <div class="path-arrow">→</div>
                  <div class="path-item">
                    <strong>ブリッジ：</strong>
                    <p>SQL・Python学習、統計学習得、BIツール習得</p>
                  </div>
                  <div class="path-arrow">→</div>
                  <div class="path-item">
                    <strong>新活用法：</strong>
                    <p>財務データ分析、予算予測モデル、経営指標設計</p>
                  </div>
                </div>
                <div class="story-result">
                  <strong>結果：</strong>年収450万円→650万円、コンサル会社のデータアナリストとして転職成功
                </div>
              </div>
              
              <div class="story-card">
                <h4>教師 → 企業研修講師</h4>
                <div class="story-path">
                  <div class="path-item">
                    <strong>既存スキル：</strong>
                    <p>指導力、カリキュラム設計、プレゼンテーション</p>
                  </div>
                  <div class="path-arrow">→</div>
                  <div class="path-item">
                    <strong>ブリッジ：</strong>
                    <p>企業研修理論、コーチング資格、ビジネス知識</p>
                  </div>
                  <div class="path-arrow">→</div>
                  <div class="path-item">
                    <strong>新活用法：</strong>
                    <p>管理職研修、新人教育、組織開発支援</p>
                  </div>
                </div>
                <div class="story-result">
                  <strong>結果：</strong>年収500万円→750万円、大手研修会社の主任講師として転職成功
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 効果的な転職活動 -->
      <section id="job-search-tactics" class="guide-section">
        <h2>効果的な転職活動戦術</h2>
        
        <div class="content-block">
          <div class="job-search-strategy">
            <h3>🎯 異業種転職特化の活動戦略</h3>
            <p>異業種転職では、従来の転職活動とは異なるアプローチが必要です。業界への理解不足や経験不足を補う戦略的な活動が重要になります。</p>
            
            <div class="strategy-components">
              <div class="component-item">
                <div class="component-icon">📝</div>
                <div class="component-content">
                  <h4>応募書類戦略</h4>
                  <div class="strategy-details">
                    <h5>職務経歴書の差別化ポイント：</h5>
                    <ul>
                      <li><strong>転用可能スキルの強調：</strong>業界経験よりも汎用性の高いスキル・成果を前面に出す</li>
                      <li><strong>学習意欲の可視化：</strong>新分野での学習・実践経験を具体的に記載</li>
                      <li><strong>数値実績の業界翻訳：</strong>現業界の成果を転職先業界の文脈で表現</li>
                      <li><strong>将来ビジョンの明確化：</strong>なぜその業界・職種を選ぶのかの論理的説明</li>
                    </ul>
                    
                    <div class="document-examples">
                      <h5>効果的な表現例：</h5>
                      <div class="example-comparison">
                        <div class="example-bad">
                          <h6>❌ 弱い表現</h6>
                          <p>「小売業界で5年間営業を経験しました」</p>
                        </div>
                        <div class="example-good">
                          <h6>✅ 強い表現</h6>
                          <p>「顧客データ分析による提案型営業で売上30%向上を実現。データドリブンな課題解決スキルをIT業界のコンサルティングに活かしたい」</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="component-item">
                <div class="component-icon">🎤</div>
                <div class="component-content">
                  <h4>面接戦略</h4>
                  <div class="strategy-details">
                    <h5>異業種転職面接の重要ポイント：</h5>
                    <div class="interview-tactics">
                      <div class="tactic-item">
                        <h6>転職理由の論理性</h6>
                        <p>「逃げ」ではなく「向かう」理由を明確に説明。業界研究の深さで本気度を示す。</p>
                      </div>
                      <div class="tactic-item">
                        <h6>スキル移転の具体性</h6>
                        <p>抽象的な「頑張ります」ではなく、具体的な活用方法と成果予測を提示。</p>
                      </div>
                      <div class="tactic-item">
                        <h6>学習継続性の証明</h6>
                        <p>既に開始している学習・実践活動を通じて継続的成長意欲をアピール。</p>
                      </div>
                      <div class="tactic-item">
                        <h6>逆質問での差別化</h6>
                        <p>業界・企業への深い理解を示す質問で、他候補者との差別化を図る。</p>
                      </div>
                    </div>
                    
                    <div class="interview-examples">
                      <h5>効果的な逆質問例：</h5>
                      <ul>
                        <li>「御社の○○事業で想定される課題に対し、私の△△経験をどう活かせるでしょうか？」</li>
                        <li>「業界未経験者が戦力化するまでの期間と、そのために必要な学習内容を教えてください」</li>
                        <li>「御社が重視する□□スキルについて、現在の私のレベルと期待値のギャップはいかがでしょうか？」</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="component-item">
                <div class="component-icon">🌐</div>
                <div class="component-content">
                  <h4>ネットワーク戦略</h4>
                  <div class="strategy-details">
                    <h5>業界人脈構築の具体的手法：</h5>
                    <div class="networking-methods">
                      <div class="method-category">
                        <h6>🔍 情報収集型ネットワーキング</h6>
                        <ul>
                          <li><strong>業界勉強会・セミナー参加：</strong>月2-3回の定期参加で顔と名前を覚えてもらう</li>
                          <li><strong>LinkedIn活用：</strong>業界キーパーソンへの適切なアプローチとコンテンツ発信</li>
                          <li><strong>業界メディア・コミュニティ参加：</strong>専門誌・オンラインコミュニティでの積極的発言</li>
                        </ul>
                      </div>
                      
                      <div class="method-category">
                        <h6>🤝 関係構築型ネットワーキング</h6>
                        <ul>
                          <li><strong>OB・OG訪問の活用：</strong>大学・前職の人脈から業界関係者を紹介してもらう</li>
                          <li><strong>メンター・アドバイザー確保：</strong>業界経験者からの継続的な指導・助言</li>
                          <li><strong>同期・仲間作り：</strong>同じく業界転職を目指す人との情報共有・励まし合い</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="timeline-strategy">
            <h3>📅 転職活動タイムライン戦略</h3>
            <div class="timeline-phases">
              <div class="timeline-phase">
                <div class="phase-header">
                  <div class="phase-duration">1-2ヶ月目</div>
                  <h4>情報収集・関係構築期</h4>
                </div>
                <div class="phase-activities">
                  <ul>
                    <li><strong>市場調査：</strong>求人動向、年収相場、企業情報の収集</li>
                    <li><strong>人脈構築：</strong>業界イベント参加、LinkedIn活動開始</li>
                    <li><strong>スキルアップ：</strong>不足スキルの学習・実践開始</li>
                    <li><strong>応募準備：</strong>職務経歴書・ポートフォリオの第一版作成</li>
                  </ul>
                </div>
              </div>
              
              <div class="timeline-phase">
                <div class="phase-header">
                  <div class="phase-duration">3-4ヶ月目</div>
                  <h4>選考対策・応募開始期</h4>
                </div>
                <div class="phase-activities">
                  <ul>
                    <li><strong>応募書類完成：</strong>企業別カスタマイズ版の作成</li>
                    <li><strong>面接対策：</strong>模擬面接、想定問答の準備</li>
                    <li><strong>戦略的応募：</strong>第一志望群（5-10社）への応募開始</li>
                    <li><strong>実績積み上げ：</strong>副業・プロジェクトでの成果創出</li>
                  </ul>
                </div>
              </div>
              
              <div class="timeline-phase">
                <div class="phase-header">
                  <div class="phase-duration">5-6ヶ月目</div>
                  <h4>選考進行・条件交渉期</h4>
                </div>
                <div class="phase-activities">
                  <ul>
                    <li><strong>選考対応：</strong>面接・選考課題への対応</li>
                    <li><strong>応募拡大：</strong>第二志望群への応募展開</li>
                    <li><strong>条件交渉：</strong>内定獲得後の年収・条件交渉</li>
                    <li><strong>退職準備：</strong>現職での引き継ぎ・退職手続き準備</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 転職後の適応戦略 -->
      <section id="transition-management" class="guide-section">
        <h2>転職後の適応戦略</h2>
        
        <div class="content-block">
          <p>異業種転職では、転職後の適応がキャリア成功の鍵となります。新しい環境で早期に成果を出し、長期的なキャリア発展を築くための戦略的アプローチが重要です。</p>
          
          <div class="adaptation-framework">
            <h3>🎯 転職後適応フレームワーク</h3>
            <div class="adaptation-phases">
              <div class="adaptation-phase">
                <div class="phase-timeline">最初の30日</div>
                <div class="phase-content">
                  <h4>🔍 観察・学習期間</h4>
                  <div class="phase-objectives">
                    <h5>主要目標：</h5>
                    <ul>
                      <li>組織文化・業務プロセスの理解</li>
                      <li>キーパーソンとの関係構築</li>
                      <li>業界知識・専門用語の習得</li>
                      <li>期待役割・成果指標の明確化</li>
                    </ul>
                  </div>
                  <div class="phase-actions">
                    <h5>具体的アクション：</h5>
                    <div class="action-grid">
                      <div class="action-item">
                        <h6>👥 人間関係構築</h6>
                        <ul>
                          <li>直属上司との週次1on1実施</li>
                          <li>チームメンバーとの個別面談</li>
                          <li>他部署キーパーソンとの挨拶回り</li>
                        </ul>
                      </div>
                      <div class="action-item">
                        <h6>📚 知識習得</h6>
                        <ul>
                          <li>社内資料・マニュアルの読破</li>
                          <li>業界情報・競合他社の調査</li>
                          <li>専門用語・業界常識の学習</li>
                        </ul>
                      </div>
                      <div class="action-item">
                        <h6>🎯 目標設定</h6>
                        <ul>
                          <li>90日・180日の成果目標設定</li>
                          <li>評価基準・期待値の確認</li>
                          <li>キャリア発展計画の相談</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="adaptation-phase">
                <div class="phase-timeline">31-90日</div>
                <div class="phase-content">
                  <h4>⚡ 貢献・実証期間</h4>
                  <div class="phase-objectives">
                    <h5>主要目標：</h5>
                    <ul>
                      <li>小さな成果・改善の積み重ね</li>
                      <li>既存スキルの効果的活用</li>
                      <li>新スキルの実践的習得</li>
                      <li>チーム・組織への価値提供</li>
                    </ul>
                  </div>
                  <div class="phase-actions">
                    <h5>具体的アクション：</h5>
                    <div class="contribution-strategies">
                      <div class="strategy-card">
                        <h6>🔧 プロセス改善提案</h6>
                        <p>前職経験を活かした業務効率化・改善提案を実施。小さくても確実な成果を積み重ねる。</p>
                        <div class="strategy-example">
                          <strong>例：</strong>営業経験者がマーケ部門で顧客データの活用方法を提案し、リード品質を20%向上
                        </div>
                      </div>
                      
                      <div class="strategy-card">
                        <h6>🎓 スキル習得の可視化</h6>
                        <p>新分野の学習進捗と実践結果を定期的に上司・チームに報告。成長意欲と能力をアピール。</p>
                        <div class="strategy-example">
                          <strong>例：</strong>週次レポートで学習内容・実践結果を報告し、3ヶ月で基本業務を習得
                        </div>
                      </div>
                      
                      <div class="strategy-card">
                        <h6>🤝 クロスファンクション協力</h6>
                        <p>他部署との連携プロジェクトに積極参加。組織横断的な価値提供と人脈拡大を実現。</p>
                        <div class="strategy-example">
                          <strong>例：</strong>前職の顧客対応経験を活かし、カスタマーサクセス改善プロジェクトをリード
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="adaptation-phase">
                <div class="phase-timeline">91-180日</div>
                <div class="phase-content">
                  <h4>🚀 成長・発展期間</h4>
                  <div class="phase-objectives">
                    <h5>主要目標：</h5>
                    <ul>
                      <li>主要業務での独り立ち</li>
                      <li>専門性・責任範囲の拡大</li>
                      <li>後輩指導・知識共有の開始</li>
                      <li>次期目標・キャリアパスの設定</li>
                    </ul>
                  </div>
                  <div class="phase-actions">
                    <h5>具体的アクション：</h5>
                    <div class="growth-initiatives">
                      <div class="initiative-item">
                        <h6>📈 成果拡大</h6>
                        <p>担当業務での目標達成・超過達成を実現し、より大きな責任・権限を獲得する。</p>
                      </div>
                      <div class="initiative-item">
                        <h6>🎯 専門性強化</h6>
                        <p>業界・職種特有の高度スキルを習得し、社内での専門家ポジションを確立する。</p>
                      </div>
                      <div class="initiative-item">
                        <h6>👨‍🏫 知識共有</h6>
                        <p>習得した知識・スキルを社内で共有し、組織の知識レベル向上に貢献する。</p>
                      </div>
                      <div class="initiative-item">
                        <h6>🔮 将来設計</h6>
                        <p>1-3年後のキャリア目標を設定し、必要な経験・スキル獲得計画を立案する。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="success-metrics">
            <h3>📊 適応成功の指標</h3>
            <div class="metrics-categories">
              <div class="metric-category">
                <h4>🎯 業績指標</h4>
                <div class="metric-items">
                  <div class="metric-item">
                    <span class="metric-name">目標達成率</span>
                    <span class="metric-target">90%以上</span>
                  </div>
                  <div class="metric-item">
                    <span class="metric-name">上司評価</span>
                    <span class="metric-target">4.0以上（5段階）</span>
                  </div>
                  <div class="metric-item">
                    <span class="metric-name">成果創出</span>
                    <span class="metric-target">月1回以上の改善提案</span>
                  </div>
                </div>
              </div>
              
              <div class="metric-category">
                <h4>🤝 関係性指標</h4>
                <div class="metric-items">
                  <div class="metric-item">
                    <span class="metric-name">同僚評価</span>
                    <span class="metric-target">協力的・信頼できる</span>
                  </div>
                  <div class="metric-item">
                    <span class="metric-name">相談頻度</span>
                    <span class="metric-target">週2-3回の業務相談</span>
                  </div>
                  <div class="metric-item">
                    <span class="metric-name">ネットワーク</span>
                    <span class="metric-target">他部署10名以上との関係</span>
                  </div>
                </div>
              </div>
              
              <div class="metric-category">
                <h4>📚 成長指標</h4>
                <div class="metric-items">
                  <div class="metric-item">
                    <span class="metric-name">スキル習得</span>
                    <span class="metric-target">基本業務の習熟</span>
                  </div>
                  <div class="metric-item">
                    <span class="metric-name">業界知識</span>
                    <span class="metric-target">専門用語・常識の理解</span>
                  </div>
                  <div class="metric-item">
                    <span class="metric-name">継続学習</span>
                    <span class="metric-target">月10時間以上の学習</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="common-challenges">
            <h3>⚠️ よくある課題と対処法</h3>
            <div class="challenges-grid">
              <div class="challenge-item">
                <h4>💼 業界知識不足</h4>
                <div class="challenge-symptoms">
                  <strong>症状：</strong>専門用語が分からない、業界常識を知らない、的外れな発言をしてしまう
                </div>
                <div class="challenge-solutions">
                  <strong>対処法：</strong>
                  <ul>
                    <li>業界専門誌・ニュースサイトの定期購読</li>
                    <li>先輩社員への積極的な質問・相談</li>
                    <li>業界セミナー・勉強会への参加継続</li>
                    <li>競合他社・業界動向の継続的調査</li>
                  </ul>
                </div>
              </div>
              
              <div class="challenge-item">
                <h4>🔧 技術スキル不足</h4>
                <div class="challenge-symptoms">
                  <strong>症状：</strong>必要ツールが使えない、作業効率が悪い、同僚に依存してしまう
                </div>
                <div class="challenge-solutions">
                  <strong>対処法：</strong>
                  <ul>
                    <li>業務時間外での集中的なスキル学習</li>
                    <li>社内研修・eラーニングの活用</li>
                    <li>メンター・指導者からの個別指導</li>
                    <li>小さなプロジェクトでの実践練習</li>
                  </ul>
                </div>
              </div>
              
              <div class="challenge-item">
                <h4>🏢 組織文化への適応</h4>
                <div class="challenge-symptoms">
                  <strong>症状：</strong>暗黙のルールが分からない、コミュニケーション方法が合わない
                </div>
                <div class="challenge-solutions">
                  <strong>対処法：</strong>
                  <ul>
                    <li>観察・模倣による文化理解</li>
                    <li>同僚との非公式な交流機会の創出</li>
                    <li>上司との定期的な1on1での相談</li>
                    <li>組織の歴史・背景の理解</li>
                  </ul>
                </div>
              </div>
              
              <div class="challenge-item">
                <h4>🎯 成果への焦り</h4>
                <div class="challenge-symptoms">
                  <strong>症状：</strong>早く結果を出さなければという焦り、前職との比較による自信喪失
                </div>
                <div class="challenge-solutions">
                  <strong>対処法：</strong>
                  <ul>
                    <li>短期・中期目標の適切な設定</li>
                    <li>小さな成功体験の積み重ね</li>
                    <li>上司・同僚からの定期的フィードバック</li>
                    <li>成長過程の記録・振り返り</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA セクション -->
      <section class="cta-section">
        <div class="cta-content">
          <h2>転職・キャリアチェンジを成功させよう！</h2>
          <p>あなたの理想的なキャリアパスを適性診断で発見しませんか？</p>
          <div class="cta-buttons">
            <router-link to="/diagnosis" class="cta-button primary">
              適性診断で転職の方向性を見つける（無料）
            </router-link>
            <router-link to="/skills-development" class="cta-button secondary">
              スキル開発ガイドを見る
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
          <router-link to="/skills-development" class="related-card">
            <h3>スキル開発ガイド</h3>
            <p>高収入職業に必要なスキルの効率的な身につけ方</p>
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
  // スムーススクロールのためのイベントリスナー
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
</script>

<style scoped>
/* 基本スタイルは既存のCareerGuideView.vueと同じ構造を踏襲 */
.career-change {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
}

.career-change-content {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* ヘッダー */
.guide-header {
  background: linear-gradient(135deg, var(--main-color), var(--light-blue));
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
  border-left: 4px solid var(--main-color);
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

/* トレンド分析 */
.trend-analysis {
  margin: 2rem 0;
}

.trend-analysis h3 {
  color: var(--main-color);
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.change-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.change-item {
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.change-item.positive {
  background: linear-gradient(135deg, #e8f5e8, #fff);
  border-left: 4px solid #4caf50;
}

.change-item.challenging {
  background: linear-gradient(135deg, #fff3e0, #fff);
  border-left: 4px solid #ff9800;
}

.change-item h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.change-item ul {
  list-style: none;
  padding: 0;
}

.change-item li {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  position: relative;
}

.change-item.positive li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #4caf50;
  font-weight: bold;
}

.change-item.challenging li::before {
  content: '⚠';
  position: absolute;
  left: 0;
  color: #ff9800;
  font-weight: bold;
}

/* 成功パターン */
.success-patterns {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin: 2rem 0;
}

.pattern-item {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 2px solid #f0f0f0;
}

.pattern-icon {
  font-size: 4rem;
  text-align: center;
  flex-shrink: 0;
  width: 80px;
}

.pattern-content h3 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.pattern-description {
  margin-bottom: 2rem;
}

.pattern-description p {
  line-height: 1.6;
  font-size: 1.1rem;
}

.pattern-examples h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.example-cases {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.case-item {
  background: #f8f9ff;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 3px solid var(--main-color);
}

.case-item strong {
  color: var(--main-color);
  font-size: 1.1rem;
}

.case-item p {
  margin: 0.5rem 0;
  line-height: 1.5;
}

.case-result {
  background: var(--main-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  display: inline-block;
  margin-top: 0.5rem;
}

/* 成功要因 */
.success-factors {
  background: #f8f9ff;
  padding: 2rem;
  border-radius: 15px;
  margin: 2rem 0;
}

.success-factors h3 {
  color: var(--main-color);
  margin-bottom: 2rem;
  text-align: center;
}

.factors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.factor-card {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 4px solid var(--main-color);
  text-align: center;
}

.factor-card h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.factor-card p {
  line-height: 1.5;
  font-size: 0.9rem;
}

/* 準備フェーズ */
.preparation-phases {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.phase-item {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 2px solid #f0f0f0;
}

.phase-number {
  background: var(--main-color);
  color: white;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  flex-shrink: 0;
}

.phase-content h3 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.phase-description {
  margin-bottom: 2rem;
}

.phase-description p {
  line-height: 1.6;
  font-size: 1.1rem;
}

.phase-tasks h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.task-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.task-item {
  background: #f8f9ff;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 3px solid var(--main-color);
}

.task-item h5 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.task-item ul {
  list-style: none;
  padding: 0;
}

.task-item li {
  margin-bottom: 0.8rem;
  padding-left: 1rem;
  position: relative;
}

.task-item li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--main-color);
}

/* スキル橋渡しフレームワーク */
.skill-bridging-framework {
  margin: 2rem 0;
}

.skill-bridging-framework h3 {
  color: var(--main-color);
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.framework-steps {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.framework-step {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 2px solid #f0f0f0;
}

.step-icon {
  font-size: 3rem;
  text-align: center;
  flex-shrink: 0;
  width: 60px;
}

.step-content h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.step-content p {
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.step-example {
  background: #f8f9ff;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 3px solid var(--main-color);
}

.step-example strong {
  color: var(--main-color);
}

.step-example ul {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
}

.step-example li {
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  position: relative;
}

.step-example li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--main-color);
}

/* マッチング分析 */
.matching-matrix {
  background: #f8f9ff;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 3px solid var(--main-color);
}

.matching-matrix h5 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.matrix-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.matrix-item {
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
}

.matrix-item.high-match {
  background: #e8f5e8;
  border: 2px solid #4caf50;
}

.matrix-item.medium-match {
  background: #fff3e0;
  border: 2px solid #ff9800;
}

.matrix-item.low-match {
  background: #ffebee;
  border: 2px solid #f44336;
}

.matrix-item h6 {
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.matrix-item.high-match h6 {
  color: #4caf50;
}

.matrix-item.medium-match h6 {
  color: #ff9800;
}

.matrix-item.low-match h6 {
  color: #f44336;
}

.matrix-item p {
  font-size: 0.9rem;
  line-height: 1.4;
}

/* ブリッジ戦略 */
.bridge-strategies {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.strategy-item {
  background: #f8f9ff;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 3px solid var(--main-color);
}

.strategy-item h5 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.strategy-item p {
  margin-bottom: 1rem;
  line-height: 1.5;
}

.strategy-item ul {
  list-style: none;
  padding: 0;
}

.strategy-item li {
  margin-bottom: 0.8rem;
  padding-left: 1rem;
  position: relative;
}

.strategy-item li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--main-color);
}

/* 成功事例 */
.success-stories {
  margin: 2rem 0;
}

.success-stories h3 {
  color: var(--main-color);
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.stories-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.story-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 2px solid #f0f0f0;
}

.story-card h4 {
  color: var(--main-color);
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
}

.story-path {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.path-item {
  background: #f8f9ff;
  padding: 1rem;
  border-radius: 10px;
  flex: 1;
  min-width: 200px;
}

.path-item strong {
  color: var(--main-color);
  display: block;
  margin-bottom: 0.5rem;
}

.path-item p {
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
}

.path-arrow {
  font-size: 1.5rem;
  color: var(--main-color);
  font-weight: bold;
}

.story-result {
  background: linear-gradient(135deg, #e3f2fd, #fff);
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid var(--main-color);
}

.story-result strong {
  color: var(--main-color);
}

/* 転職活動戦略 */
.job-search-strategy {
  margin-bottom: 2rem;
}

.job-search-strategy h3 {
  color: var(--main-color);
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.strategy-components {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.component-item {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 2px solid #f0f0f0;
}

.component-icon {
  font-size: 3rem;
  text-align: center;
  flex-shrink: 0;
  width: 60px;
}

.component-content h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.strategy-details h5 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.strategy-details ul {
  list-style: none;
  padding: 0;
}

.strategy-details li {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  position: relative;
}

.strategy-details li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--main-color);
}

.document-examples {
  background: #f8f9ff;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 3px solid var(--main-color);
  margin-top: 1rem;
}

.document-examples h5 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.example-comparison {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.example-bad, .example-good {
  padding: 1rem;
  border-radius: 8px;
}

.example-bad {
  background: #ffebee;
  border-left: 3px solid #f44336;
}

.example-good {
  background: #e8f5e8;
  border-left: 3px solid #4caf50;
}

.example-bad h6 {
  color: #f44336;
  margin-bottom: 0.5rem;
}

.example-good h6 {
  color: #4caf50;
  margin-bottom: 0.5rem;
}

/* 面接戦略 */
.interview-tactics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.tactic-item {
  background: #f8f9ff;
  padding: 1rem;
  border-radius: 8px;
  border-left: 3px solid var(--main-color);
}

.tactic-item h6 {
  color: var(--main-color);
  margin-bottom: 0.5rem;
}

.tactic-item p {
  font-size: 0.9rem;
  line-height: 1.4;
}

.interview-examples {
  background: #f8f9ff;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 3px solid var(--main-color);
  margin-top: 1rem;
}

.interview-examples h5 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.interview-examples ul {
  list-style: none;
  padding: 0;
}

.interview-examples li {
  margin-bottom: 1rem;
  padding: 0.8rem;
  background: white;
  border-radius: 8px;
  font-style: italic;
}

/* ネットワーク戦略 */
.networking-methods {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.method-category {
  background: #f8f9ff;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 3px solid var(--main-color);
}

.method-category h6 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.method-category ul {
  list-style: none;
  padding: 0;
}

.method-category li {
  margin-bottom: 0.8rem;
  padding-left: 1rem;
  position: relative;
}

.method-category li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--main-color);
}

/* タイムライン戦略 */
.timeline-strategy {
  margin-top: 2rem;
}

.timeline-strategy h3 {
  color: var(--main-color);
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.timeline-phases {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.timeline-phase {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 2px solid #f0f0f0;
}

.phase-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.phase-duration {
  background: var(--main-color);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  white-space: nowrap;
}

.phase-header h4 {
  color: var(--main-color);
  margin: 0;
}

.phase-activities ul {
  list-style: none;
  padding: 0;
}

.phase-activities li {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  position: relative;
}

.phase-activities li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--main-color);
  font-weight: bold;
}

/* 適応フレームワーク */
.adaptation-framework {
  margin: 2rem 0;
}

.adaptation-framework h3 {
  color: var(--main-color);
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.adaptation-phases {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.adaptation-phase {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 2px solid #f0f0f0;
}

.phase-timeline {
  background: var(--main-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 1rem;
}

.phase-content h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.phase-objectives h5 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.phase-objectives ul {
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
}

.phase-objectives li {
  margin-bottom: 0.8rem;
  padding-left: 1rem;
  position: relative;
}

.phase-objectives li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--main-color);
}

.phase-actions h5 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.action-item {
  background: #f8f9ff;
  padding: 1rem;
  border-radius: 8px;
  border-left: 3px solid var(--main-color);
}

.action-item h6 {
  color: var(--main-color);
  margin-bottom: 0.8rem;
}

.action-item ul {
  list-style: none;
  padding: 0;
}

.action-item li {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  padding-left: 1rem;
  position: relative;
}

.action-item li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--main-color);
}

/* 貢献戦略 */
.contribution-strategies {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.strategy-card {
  background: #f8f9ff;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 3px solid var(--main-color);
}

.strategy-card h6 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.strategy-card p {
  line-height: 1.5;
  margin-bottom: 1rem;
}

.strategy-example {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  border-left: 2px solid var(--main-color);
}

.strategy-example strong {
  color: var(--main-color);
}

/* 成長イニシアチブ */
.growth-initiatives {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.initiative-item {
  background: #f8f9ff;
  padding: 1rem;
  border-radius: 8px;
  border-left: 3px solid var(--main-color);
}

.initiative-item h6 {
  color: var(--main-color);
  margin-bottom: 0.8rem;
}

.initiative-item p {
  font-size: 0.9rem;
  line-height: 1.4;
}

/* 成功指標 */
.success-metrics {
  background: #f8f9ff;
  padding: 2rem;
  border-radius: 15px;
  margin: 2rem 0;
}

.success-metrics h3 {
  color: var(--main-color);
  margin-bottom: 2rem;
  text-align: center;
}

.metrics-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.metric-category {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 4px solid var(--main-color);
}

.metric-category h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.metric-items {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.metric-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  background: #f8f9ff;
  border-radius: 8px;
}

.metric-name {
  font-weight: 600;
}

.metric-target {
  color: var(--main-color);
  font-weight: 700;
  font-size: 0.9rem;
}

/* よくある課題 */
.common-challenges {
  margin: 2rem 0;
}

.common-challenges h3 {
  color: var(--main-color);
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.challenges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.challenge-item {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 2px solid #f0f0f0;
}

.challenge-item h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.challenge-symptoms {
  background: #ffebee;
  padding: 1rem;
  border-radius: 8px;
  border-left: 3px solid #f44336;
  margin-bottom: 1rem;
}

.challenge-symptoms strong {
  color: #f44336;
}

.challenge-solutions {
  background: #e8f5e8;
  padding: 1rem;
  border-radius: 8px;
  border-left: 3px solid #4caf50;
}

.challenge-solutions strong {
  color: #4caf50;
}

.challenge-solutions ul {
  list-style: none;
  padding: 0;
  margin-top: 0.5rem;
}

.challenge-solutions li {
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  position: relative;
}

.challenge-solutions li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #4caf50;
  font-weight: bold;
}

/* CTA セクション */
.cta-section {
  background: linear-gradient(135deg, var(--main-color), var(--light-blue));
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
  .career-change-content {
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
  
  .change-grid {
    grid-template-columns: 1fr;
  }
  
  .pattern-item {
    flex-direction: column;
    text-align: center;
  }
  
  .phase-item {
    flex-direction: column;
    text-align: center;
  }
  
  .framework-step {
    flex-direction: column;
    text-align: center;
  }
  
  .component-item {
    flex-direction: column;
    text-align: center;
  }
  
  .story-path {
    flex-direction: column;
  }
  
  .path-arrow {
    transform: rotate(90deg);
  }
  
  .phase-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
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
  
  .phase-number {
    width: 80px;
    height: 80px;
    font-size: 0.9rem;
  }
  
  .task-grid {
    grid-template-columns: 1fr;
  }
  
  .matrix-grid {
    grid-template-columns: 1fr;
  }
  
  .action-grid {
    grid-template-columns: 1fr;
  }
  
  .challenges-grid {
    grid-template-columns: 1fr;
  }
}
</style>