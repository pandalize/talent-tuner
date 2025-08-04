<template>
  <div class="salary-guide">
    <div class="salary-guide-content">
      <!-- ヘッダー -->
      <header class="guide-header">
        <div class="breadcrumb">
          <router-link to="/">ホーム</router-link>
          <span class="separator">></span>
          <span class="current">年収・転職情報ガイド</span>
        </div>
        <h1 class="guide-title">年収・転職情報ガイド</h1>
        <p class="guide-subtitle">職業別年収相場と転職市場の最新動向</p>
      </header>

      <!-- 目次 -->
      <nav class="table-of-contents">
        <h2>目次</h2>
        <ul>
          <li><a href="#salary-trends">2024年の年収トレンド</a></li>
          <li><a href="#profession-salaries">職業別年収データ</a></li>
          <li><a href="#salary-factors">年収を決める要因</a></li>
          <li><a href="#market-analysis">転職市場分析</a></li>
          <li><a href="#negotiation-tips">年収交渉のコツ</a></li>
          <li><a href="#action-plan">年収アップ戦略</a></li>
        </ul>
      </nav>

      <!-- 年収トレンド -->
      <section id="salary-trends" class="guide-section">
        <h2>2024年の年収トレンド</h2>
        
        <div class="content-block">
          <p>厚生労働省の「令和5年賃金構造基本統計調査」によると、日本の平均年収は約458万円で、前年比2.1%の上昇となりました。IT・デジタル人材の需要急増により、技術職の年収アップが顕著に現れています。</p>
          
          <div class="statistics">
            <div class="stat-item">
              <div class="stat-number">458万円</div>
              <div class="stat-label">日本の平均年収（2024年）</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">+2.1%</div>
              <div class="stat-label">前年比上昇率</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">35歳</div>
              <div class="stat-label">年収ピークの平均年齢</div>
            </div>
          </div>
          
          <div class="trend-analysis">
            <h3>🔥 年収上昇が著しい分野</h3>
            <div class="trend-grid">
              <div class="trend-item hot">
                <h4>IT・テクノロジー</h4>
                <div class="trend-stats">
                  <span class="increase-rate">+15.2%</span>
                  <span class="average-salary">平均640万円</span>
                </div>
                <p>DX推進、AI・機械学習、サイバーセキュリティ分野での人材争奪戦が激化</p>
              </div>
              
              <div class="trend-item rising">
                <h4>デジタルマーケティング</h4>
                <div class="trend-stats">
                  <span class="increase-rate">+12.8%</span>
                  <span class="average-salary">平均520万円</span>
                </div>
                <p>EC市場拡大とデジタル広告需要の増加による専門人材の価値向上</p>
              </div>
              
              <div class="trend-item rising">
                <h4>データサイエンス</h4>
                <div class="trend-stats">
                  <span class="increase-rate">+18.5%</span>
                  <span class="average-salary">平均720万円</span>
                </div>
                <p>ビッグデータ活用とAI導入で企業の意思決定に直結する価値創出</p>
              </div>
              
              <div class="trend-item moderate">
                <h4>コンサルティング</h4>
                <div class="trend-stats">
                  <span class="increase-rate">+8.3%</span>
                  <span class="average-salary">平均780万円</span>
                </div>
                <p>企業の経営課題解決・DX支援需要の継続的な成長</p>
              </div>
            </div>
          </div>
          
          <div class="highlight-box">
            <h3>年収アップの背景要因</h3>
            <ul>
              <li><strong>人材不足の深刻化：</strong>IT人材は2030年までに約79万人不足の予測</li>
              <li><strong>デジタル変革の加速：</strong>全業界でDX推進による専門人材への需要急増</li>
              <li><strong>リモートワークの普及：</strong>地域に関係なく優秀な人材を確保する企業の競争激化</li>
              <li><strong>副業・フリーランス市場の拡大：</strong>個人のスキルを複数収入源に活用する働き方の浸透</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 職業別年収データ -->
      <section id="profession-salaries" class="guide-section">
        <h2>職業別年収データ詳細</h2>
        
        <div class="content-block">
          <p>転職サイト大手3社（リクルート、doda、マイナビ）の求人データと実際の転職成功事例を基に、職業別の年収相場を詳細に分析しました。</p>
          
          <div class="salary-categories">
            <div class="salary-category">
              <h3>💻 IT・エンジニア系</h3>
              <div class="profession-list">
                <div class="profession-item high-salary">
                  <div class="profession-header">
                    <h4>AIエンジニア・機械学習エンジニア</h4>
                    <span class="salary-badge">高年収</span>
                  </div>
                  <div class="salary-range">
                    <span class="salary-min">600万円</span>
                    <span class="salary-separator">〜</span>
                    <span class="salary-max">1,500万円</span>
                  </div>
                  <div class="salary-details">
                    <div class="experience-levels">
                      <div class="exp-item">
                        <span class="exp-label">未経験〜2年</span>
                        <span class="exp-salary">600-800万円</span>
                      </div>
                      <div class="exp-item">
                        <span class="exp-label">3-5年</span>
                        <span class="exp-salary">800-1200万円</span>
                      </div>
                      <div class="exp-item">
                        <span class="exp-label">5年以上</span>
                        <span class="exp-salary">1200-1500万円</span>
                      </div>
                    </div>
                    <div class="required-skills">
                      <span class="skill-tag">Python</span>
                      <span class="skill-tag">TensorFlow</span>
                      <span class="skill-tag">統計学</span>
                      <span class="skill-tag">大学院卒歓迎</span>
                    </div>
                  </div>
                </div>
                
                <div class="profession-item high-salary">
                  <div class="profession-header">
                    <h4>クラウドエンジニア（AWS/Azure）</h4>
                    <span class="salary-badge">高年収</span>
                  </div>
                  <div class="salary-range">
                    <span class="salary-min">500万円</span>
                    <span class="salary-separator">〜</span>
                    <span class="salary-max">1,200万円</span>
                  </div>
                  <div class="salary-details">
                    <div class="experience-levels">
                      <div class="exp-item">
                        <span class="exp-label">未経験〜2年</span>
                        <span class="exp-salary">500-700万円</span>
                      </div>
                      <div class="exp-item">
                        <span class="exp-label">3-5年</span>
                        <span class="exp-salary">700-1000万円</span>
                      </div>
                      <div class="exp-item">
                        <span class="exp-label">5年以上</span>
                        <span class="exp-salary">1000-1200万円</span>
                      </div>
                    </div>
                    <div class="required-skills">
                      <span class="skill-tag">AWS</span>
                      <span class="skill-tag">Docker</span>
                      <span class="skill-tag">Kubernetes</span>
                      <span class="skill-tag">インフラ設計</span>
                    </div>
                  </div>
                </div>
                
                <div class="profession-item medium-salary">
                  <div class="profession-header">
                    <h4>Webエンジニア（フロントエンド・バックエンド）</h4>
                    <span class="salary-badge">中年収</span>
                  </div>
                  <div class="salary-range">
                    <span class="salary-min">400万円</span>
                    <span class="salary-separator">〜</span>
                    <span class="salary-max">900万円</span>
                  </div>
                  <div class="salary-details">
                    <div class="experience-levels">
                      <div class="exp-item">
                        <span class="exp-label">未経験〜2年</span>
                        <span class="exp-salary">400-550万円</span>
                      </div>
                      <div class="exp-item">
                        <span class="exp-label">3-5年</span>
                        <span class="exp-salary">550-750万円</span>
                      </div>
                      <div class="exp-item">
                        <span class="exp-label">5年以上</span>
                        <span class="exp-salary">750-900万円</span>
                      </div>
                    </div>
                    <div class="required-skills">
                      <span class="skill-tag">JavaScript</span>
                      <span class="skill-tag">React/Vue</span>
                      <span class="skill-tag">Node.js</span>
                      <span class="skill-tag">Git</span>
                    </div>
                  </div>
                </div>
                
                <div class="profession-item high-salary">
                  <div class="profession-header">
                    <h4>情報セキュリティスペシャリスト</h4>
                    <span class="salary-badge">高年収</span>
                  </div>
                  <div class="salary-range">
                    <span class="salary-min">550万円</span>
                    <span class="salary-separator">〜</span>
                    <span class="salary-max">1,300万円</span>
                  </div>
                  <div class="salary-details">
                    <div class="experience-levels">
                      <div class="exp-item">
                        <span class="exp-label">未経験〜2年</span>
                        <span class="exp-salary">550-750万円</span>
                      </div>
                      <div class="exp-item">
                        <span class="exp-label">3-5年</span>
                        <span class="exp-salary">750-1100万円</span>
                      </div>
                      <div class="exp-item">
                        <span class="exp-label">5年以上</span>
                        <span class="exp-salary">1100-1300万円</span>
                      </div>
                    </div>
                    <div class="required-skills">
                      <span class="skill-tag">CISSP</span>
                      <span class="skill-tag">脆弱性診断</span>
                      <span class="skill-tag">インシデント対応</span>
                      <span class="skill-tag">コンプライアンス</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="salary-category">
              <h3>📊 データ・分析系</h3>
              <div class="profession-list">
                <div class="profession-item high-salary">
                  <div class="profession-header">
                    <h4>データサイエンティスト</h4>
                    <span class="salary-badge">高年収</span>
                  </div>
                  <div class="salary-range">
                    <span class="salary-min">600万円</span>
                    <span class="salary-separator">〜</span>
                    <span class="salary-max">1,400万円</span>
                  </div>
                  <div class="salary-details">
                    <div class="experience-levels">
                      <div class="exp-item">
                        <span class="exp-label">未経験〜2年</span>
                        <span class="exp-salary">600-800万円</span>
                      </div>
                      <div class="exp-item">
                        <span class="exp-label">3-5年</span>
                        <span class="exp-salary">800-1200万円</span>
                      </div>
                      <div class="exp-item">
                        <span class="exp-label">5年以上</span>
                        <span class="exp-salary">1200-1400万円</span>
                      </div>
                    </div>
                    <div class="required-skills">
                      <span class="skill-tag">Python</span>
                      <span class="skill-tag">SQL</span>
                      <span class="skill-tag">統計解析</span>
                      <span class="skill-tag">ビジネス理解</span>
                    </div>
                  </div>
                </div>
                
                <div class="profession-item medium-salary">
                  <div class="profession-header">
                    <h4>データアナリスト</h4>
                    <span class="salary-badge">中年収</span>
                  </div>
                  <div class="salary-range">
                    <span class="salary-min">450万円</span>
                    <span class="salary-separator">〜</span>
                    <span class="salary-max">800万円</span>
                  </div>
                  <div class="salary-details">
                    <div class="experience-levels">
                      <div class="exp-item">
                        <span class="exp-label">未経験〜2年</span>
                        <span class="exp-salary">450-600万円</span>
                      </div>
                      <div class="exp-item">
                        <span class="exp-label">3-5年</span>
                        <span class="exp-salary">600-700万円</span>
                      </div>
                      <div class="exp-item">
                        <span class="exp-label">5年以上</span>
                        <span class="exp-salary">700-800万円</span>
                      </div>
                    </div>
                    <div class="required-skills">
                      <span class="skill-tag">Excel</span>
                      <span class="skill-tag">SQL</span>
                      <span class="skill-tag">Tableau/PowerBI</span>
                      <span class="skill-tag">統計知識</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="salary-category">
              <h3>🎨 デザイン・クリエイティブ系</h3>
              <div class="profession-list">
                <div class="profession-item medium-salary">
                  <div class="profession-header">
                    <h4>UI/UXデザイナー</h4>
                    <span class="salary-badge">中年収</span>
                  </div>
                  <div class="salary-range">
                    <span class="salary-min">400万円</span>
                    <span class="salary-separator">〜</span>
                    <span class="salary-max">850万円</span>
                  </div>
                  <div class="salary-details">
                    <div class="experience-levels">
                      <div class="exp-item">
                        <span class="exp-label">未経験〜2年</span>
                        <span class="exp-salary">400-550万円</span>
                      </div>
                      <div class="exp-item">
                        <span class="exp-label">3-5年</span>
                        <span class="exp-salary">550-700万円</span>
                      </div>
                      <div class="exp-item">
                        <span class="exp-label">5年以上</span>
                        <span class="exp-salary">700-850万円</span>
                      </div>
                    </div>
                    <div class="required-skills">
                      <span class="skill-tag">Figma</span>
                      <span class="skill-tag">Photoshop</span>
                      <span class="skill-tag">ユーザビリティ</span>
                      <span class="skill-tag">プロトタイピング</span>
                    </div>
                  </div>
                </div>
                
                <div class="profession-item medium-salary">
                  <div class="profession-header">
                    <h4>Webデザイナー</h4>
                    <span class="salary-badge">中年収</span>
                  </div>
                  <div class="salary-range">
                    <span class="salary-min">350万円</span>
                    <span class="salary-separator">〜</span>
                    <span class="salary-max">650万円</span>
                  </div>
                  <div class="salary-details">
                    <div class="experience-levels">
                      <div class="exp-item">
                        <span class="exp-label">未経験〜2年</span>
                        <span class="exp-salary">350-450万円</span>
                      </div>
                      <div class="exp-item">
                        <span class="exp-label">3-5年</span>
                        <span class="exp-salary">450-550万円</span>
                      </div>
                      <div class="exp-item">
                        <span class="exp-label">5年以上</span>
                        <span class="exp-salary">550-650万円</span>
                      </div>
                    </div>
                    <div class="required-skills">
                      <span class="skill-tag">HTML/CSS</span>
                      <span class="skill-tag">JavaScript</span>
                      <span class="skill-tag">レスポンシブ</span>
                      <span class="skill-tag">Adobe CC</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="salary-category">
              <h3>📈 ビジネス・マーケティング系</h3>
              <div class="profession-list">
                <div class="profession-item high-salary">
                  <div class="profession-header">
                    <h4>コンサルタント（戦略・IT）</h4>
                    <span class="salary-badge">高年収</span>
                  </div>
                  <div class="salary-range">
                    <span class="salary-min">600万円</span>
                    <span class="salary-separator">〜</span>
                    <span class="salary-max">2,000万円</span>
                  </div>
                  <div class="required-skills">
                    <span class="skill-tag">論理的思考</span>
                    <span class="skill-tag">PowerPoint</span>
                    <span class="skill-tag">業界知識</span>
                    <span class="skill-tag">英語力</span>
                  </div>
                </div>
                
                <div class="profession-item medium-salary">
                  <div class="profession-header">
                    <h4>デジタルマーケター</h4>
                    <span class="salary-badge">中年収</span>
                  </div>
                  <div class="salary-range">
                    <span class="salary-min">400万円</span>
                    <span class="salary-separator">〜</span>
                    <span class="salary-max">800万円</span>
                  </div>
                  <div class="required-skills">
                    <span class="skill-tag">Google Analytics</span>
                    <span class="skill-tag">SNS運用</span>
                    <span class="skill-tag">広告運用</span>
                    <span class="skill-tag">データ分析</span>
                  </div>
                </div>
                
                <div class="profession-item medium-salary">
                  <div class="profession-header">
                    <h4>プロジェクトマネージャー</h4>
                    <span class="salary-badge">中年収</span>
                  </div>
                  <div class="salary-range">
                    <span class="salary-min">500万円</span>
                    <span class="salary-separator">〜</span>
                    <span class="salary-max">1,000万円</span>
                  </div>
                  <div class="required-skills">
                    <span class="skill-tag">PMP</span>
                    <span class="skill-tag">アジャイル</span>
                    <span class="skill-tag">リーダーシップ</span>
                    <span class="skill-tag">コミュニケーション</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="salary-legend">
            <h3>年収レベルの定義</h3>
            <div class="legend-items">
              <div class="legend-item">
                <span class="legend-color high-salary"></span>
                <span class="legend-text">高年収：平均600万円以上（市場価値が高く年収アップが期待しやすい）</span>
              </div>
              <div class="legend-item">
                <span class="legend-color medium-salary"></span>
                <span class="legend-text">中年収：平均400-600万円（安定した需要があり専門性でアップ可能）</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 年収を決める要因 -->
      <section id="salary-factors" class="guide-section">
        <h2>年収を決める重要要因</h2>
        
        <div class="content-block">
          <div class="factors-analysis">
            <div class="factor-item">
              <div class="factor-icon">🎯</div>
              <div class="factor-content">
                <h3>スキル・専門性（影響度40%）</h3>
                <p>最も年収に直結する要因。希少性の高い技術スキルや資格、専門知識の深さが収入を左右します。</p>
                <div class="factor-details">
                  <h4>高年収に繋がるスキルの特徴：</h4>
                  <ul>
                    <li><strong>希少性：</strong>習得者が少なく需要が高い（AI・機械学習、サイバーセキュリティ等）</li>
                    <li><strong>事業インパクト：</strong>企業の売上・利益に直接貢献する（データ分析、マーケティング等）</li>
                    <li><strong>代替困難性：</strong>AIでは代替できない創造性や判断力が必要</li>
                    <li><strong>継続性：</strong>長期間にわたって価値を持続できる（基礎理論、コミュニケーション等）</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div class="factor-item">
              <div class="factor-icon">🏢</div>
              <div class="factor-content">
                <h3>業界・企業規模（影響度25%）</h3>
                <p>所属業界と企業規模により年収レンジが大きく異なります。成長業界や大手企業は高年収の傾向があります。</p>
                <div class="industry-comparison">
                  <h4>業界別平均年収ランキング：</h4>
                  <div class="industry-list">
                    <div class="industry-item">
                      <span class="industry-rank">1位</span>
                      <span class="industry-name">金融・保険</span>
                      <span class="industry-salary">615万円</span>
                    </div>
                    <div class="industry-item">
                      <span class="industry-rank">2位</span>
                      <span class="industry-name">IT・通信</span>
                      <span class="industry-salary">599万円</span>
                    </div>
                    <div class="industry-item">
                      <span class="industry-rank">3位</span>
                      <span class="industry-name">総合商社</span>
                      <span class="industry-salary">588万円</span>
                    </div>
                    <div class="industry-item">
                      <span class="industry-rank">4位</span>
                      <span class="industry-name">コンサルティング</span>
                      <span class="industry-salary">567万円</span>
                    </div>
                    <div class="industry-item">
                      <span class="industry-rank">5位</span>
                      <span class="industry-name">医療・製薬</span>
                      <span class="industry-salary">542万円</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="factor-item">
              <div class="factor-icon">📍</div>
              <div class="factor-content">
                <h3>地域・勤務形態（影響度20%）</h3>
                <p>勤務地と働き方により年収に地域格差が生じます。リモートワークの普及で格差は縮小傾向にあります。</p>
                <div class="region-comparison">
                  <h4>地域別年収格差：</h4>
                  <div class="region-grid">
                    <div class="region-item">
                      <span class="region-name">東京都</span>
                      <span class="region-multiplier">基準</span>
                      <span class="region-salary">100%</span>
                    </div>
                    <div class="region-item">
                      <span class="region-name">大阪府</span>
                      <span class="region-multiplier">-8%</span>
                      <span class="region-salary">92%</span>
                    </div>
                    <div class="region-item">
                      <span class="region-name">愛知県</span>
                      <span class="region-multiplier">-12%</span>
                      <span class="region-salary">88%</span>
                    </div>
                    <div class="region-item">
                      <span class="region-name">福岡県</span>
                      <span class="region-multiplier">-18%</span>
                      <span class="region-salary">82%</span>
                    </div>
                    <div class="region-item">
                      <span class="region-name">リモート</span>
                      <span class="region-multiplier">-5%</span>
                      <span class="region-salary">95%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="factor-item">
              <div class="factor-icon">⏰</div>
              <div class="factor-content">
                <h3>経験年数・年齢（影響度15%）</h3>
                <p>一般的には経験とともに年収も上昇しますが、スキルベースの職種では年齢より能力が重視される傾向があります。</p>
                <div class="age-salary-chart">
                  <h4>年齢別平均年収推移：</h4>
                  <div class="chart-description">
                    <p>25歳: 350万円 → 30歳: 450万円 → 35歳: 550万円 → 40歳: 600万円 → 45歳: 650万円</p>
                    <p class="chart-note">※IT系は35歳以降もスキル次第で大幅アップが可能</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 転職市場分析 -->
      <section id="market-analysis" class="guide-section">
        <h2>2024年転職市場分析</h2>
        
        <div class="content-block">
          <div class="market-overview">
            <p>転職市場は2024年も活況を継続。特にDX推進、AI活用、サイバーセキュリティ分野での人材需要が急拡大しています。</p>
            
            <div class="market-statistics">
              <div class="market-stat">
                <div class="stat-number">1.68倍</div>
                <div class="stat-label">有効求人倍率（IT系）</div>
              </div>
              <div class="market-stat">
                <div class="stat-number">76%</div>
                <div class="stat-label">転職で年収アップした人の割合</div>
              </div>
              <div class="market-stat">
                <div class="stat-number">+18%</div>
                <div class="stat-label">平均年収アップ率</div>
              </div>
            </div>
          </div>
          
          <div class="demand-analysis">
            <h3>🔥 求人需要が急増している職種</h3>
            <div class="demand-grid">
              <div class="demand-item hot">
                <h4>生成AI・LLMエンジニア</h4>
                <div class="demand-stats">
                  <span class="growth-rate">求人数 +320%</span>
                  <span class="avg-offer">平均年収 1200万円</span>
                </div>
                <p>ChatGPT、Claude等の活用から自社AI開発まで幅広い需要</p>
                <div class="required-exp">
                  <span class="exp-tag">Python</span>
                  <span class="exp-tag">機械学習</span>
                  <span class="exp-tag">自然言語処理</span>
                </div>
              </div>
              
              <div class="demand-item rising">
                <h4>サイバーセキュリティエンジニア</h4>
                <div class="demand-stats">
                  <span class="growth-rate">求人数 +180%</span>
                  <span class="avg-offer">平均年収 950万円</span>
                </div>
                <p>サイバー攻撃の高度化によりセキュリティ専門家が慢性的に不足</p>
                <div class="required-exp">
                  <span class="exp-tag">CISSP</span>
                  <span class="exp-tag">脆弱性診断</span>
                  <span class="exp-tag">インシデント対応</span>
                </div>
              </div>
              
              <div class="demand-item rising">
                <h4>クラウドアーキテクト</h4>
                <div class="demand-stats">
                  <span class="growth-rate">求人数 +150%</span>
                  <span class="avg-offer">平均年収 1100万円</span>
                </div>
                <p>企業のクラウド移行・最適化による設計専門家への需要増</p>
                <div class="required-exp">
                  <span class="exp-tag">AWS/Azure</span>
                  <span class="exp-tag">システム設計</span>
                  <span class="exp-tag">コスト最適化</span>
                </div>
              </div>
              
              <div class="demand-item moderate">
                <h4>DXコンサルタント</h4>
                <div class="demand-stats">
                  <span class="growth-rate">求人数 +120%</span>
                  <span class="avg-offer">平均年収 850万円</span>
                </div>
                <p>企業の業務プロセス改善・デジタル化を推進する専門家</p>
                <div class="required-exp">
                  <span class="exp-tag">業務分析</span>
                  <span class="exp-tag">ITスキル</span>
                  <span class="exp-tag">プロジェクト管理</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="market-trends">
            <h3>📊 転職市場のトレンド</h3>
            <div class="trend-cards">
              <div class="trend-card">
                <h4>リモートワーク常態化</h4>
                <p>完全リモート可の求人が60%を超え、地方在住者の転職機会が拡大。東京企業への転職で地域格差を克服するケースが増加。</p>
              </div>
              
              <div class="trend-card">
                <h4>スキルベース採用の浸透</h4>
                <p>学歴・職歴より実際のスキル・成果物を重視する企業が増加。ポートフォリオやGitHubでの実績アピールが重要。</p>
              </div>
              
              <div class="trend-card">
                <h4>副業・複業人材の活用</h4>
                <p>正社員以外の働き方を認める企業が増加。週3-4日勤務や業務委託での高単価案件が豊富。</p>
              </div>
              
              <div class="trend-card">
                <h4>即戦力志向の強化</h4>
                <p>育成コストを削減し即戦力を求める傾向。未経験歓迎の求人は減少も、スキル習得後の転職成功率は向上。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 年収交渉のコツ -->
      <section id="negotiation-tips" class="guide-section">
        <h2>効果的な年収交渉のコツ</h2>
        
        <div class="content-block">
          <div class="negotiation-strategy">
            <p>年収交渉は転職活動の最重要フェーズです。適切な準備と戦略により、想定以上の条件を獲得できる可能性があります。</p>
            
            <div class="negotiation-steps">
              <div class="step-item">
                <div class="step-number">STEP 1</div>
                <div class="step-content">
                  <h3>市場価値の客観的把握</h3>
                  <p>同職種・同経験年数の年収相場を複数のソースから収集し、自分の適正年収レンジを設定します。</p>
                  <div class="step-details">
                    <h4>情報収集の方法：</h4>
                    <ul>
                      <li><strong>転職サイト：</strong>doda、リクルートエージェント等の年収診断ツール</li>
                      <li><strong>口コミサイト：</strong>OpenWork、転職会議での同業他社の年収情報</li>
                      <li><strong>人脈活用：</strong>同業者との情報交換、OB・OG訪問</li>
                      <li><strong>転職エージェント：</strong>業界専門エージェントからの市場情報</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div class="step-item">
                <div class="step-number">STEP 2</div>
                <div class="step-content">
                  <h3>貢献価値の数値化・可視化</h3>
                  <p>これまでの実績を具体的な数値で示し、転職先での貢献可能性を明確に伝えられるよう準備します。</p>
                  <div class="value-examples">
                    <h4>貢献価値の表現例：</h4>
                    <div class="example-grid">
                      <div class="example-item">
                        <strong>エンジニア：</strong>
                        <p>「システム最適化で処理速度30%向上、年間運用コスト500万円削減」</p>
                      </div>
                      <div class="example-item">
                        <strong>マーケター：</strong>
                        <p>「新規施策でCVR2.5倍改善、月間売上1200万円増加に貢献」</p>
                      </div>
                      <div class="example-item">
                        <strong>営業：</strong>
                        <p>「新規開拓で年間売上3億円達成、目標達成率130%を3年連続」</p>
                      </div>
                      <div class="example-item">
                        <strong>コンサル：</strong>
                        <p>「業務効率化提案で顧客の作業時間40%短縮、コスト年2000万円削減」</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="step-item">
                <div class="step-number">STEP 3</div>
                <div class="step-content">
                  <h3>交渉タイミングの最適化</h3>
                  <p>年収交渉は適切なタイミングで行うことが成功の鍵。企業側の採用意欲が最も高いタイミングを狙います。</p>
                  <div class="timing-guide">
                    <div class="timing-item best">
                      <h4>最適なタイミング</h4>
                      <ul>
                        <li>内定通知直後（企業の採用意欲がピーク）</li>
                        <li>複数内定を獲得した時（選択権を持つ状況）</li>
                        <li>入社承諾前の最終条件確認時</li>
                      </ul>
                    </div>
                    <div class="timing-item avoid">
                      <h4>避けるべきタイミング</h4>
                      <ul>
                        <li>一次面接での早すぎる交渉</li>
                        <li>他候補者との競争が激しいとき</li>
                        <li>企業の業績悪化・採用予算削減時</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="step-item">
                <div class="step-number">STEP 4</div>
                <div class="step-content">
                  <h3>効果的な交渉話法の活用</h3>
                  <p>感情論ではなく、論理的根拠に基づいた交渉を行い、双方にメリットのある条件を模索します。</p>
                  <div class="negotiation-phrases">
                    <h4>効果的な交渉フレーズ：</h4>
                    <div class="phrase-examples">
                      <div class="phrase-item good">
                        <strong>良い例：</strong>
                        <p>「市場相場と私のスキル・経験を踏まえ、○○万円でご検討いただけますでしょうか。前職での実績（具体例）を活かし、入社後3ヶ月で△△の成果をお約束いたします。」</p>
                      </div>
                      <div class="phrase-item bad">
                        <strong>悪い例：</strong>
                        <p>「生活費が厳しいので、もう少し上げてもらえませんか。」</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="negotiation-alternatives">
            <h3>💡 年収以外の交渉ポイント</h3>
            <p>基本給の増額が難しい場合、他の条件での交渉も検討しましょう。</p>
            <div class="alternatives-grid">
              <div class="alternative-item">
                <h4>諸手当・賞与</h4>
                <ul>
                  <li>資格手当の新設・増額</li>
                  <li>成果賞与の条件改善</li>
                  <li>通勤手当・住宅手当の充実</li>
                </ul>
              </div>
              <div class="alternative-item">
                <h4>働き方</h4>
                <ul>
                  <li>リモートワーク頻度の増加</li>
                  <li>フレックスタイム制の導入</li>
                  <li>有給取得率の向上</li>
                </ul>
              </div>
              <div class="alternative-item">
                <h4>キャリア支援</h4>
                <ul>
                  <li>研修・セミナー参加費用の支援</li>
                  <li>資格取得支援制度</li>
                  <li>昇進・昇格スケジュールの明確化</li>
                </ul>
              </div>
              <div class="alternative-item">
                <h4>入社時期・条件</h4>
                <ul>
                  <li>入社時期の調整</li>
                  <li>試用期間の短縮</li>
                  <li>サインオンボーナス</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 年収アップ戦略 -->
      <section id="action-plan" class="guide-section">
        <h2>効果的な年収アップ戦略</h2>
        
        <div class="content-block">
          <div class="strategy-overview">
            <p>年収アップには短期的な転職戦略と中長期的なキャリア戦略の両方が重要です。自分の現状に応じた最適なアプローチを選択しましょう。</p>
          </div>
          
          <div class="strategy-paths">
            <div class="path-item">
              <h3>🚀 短期集中型（6ヶ月以内）</h3>
              <div class="path-content">
                <p><strong>対象：</strong>現在のスキルレベルが高く、即転職で年収アップを狙える人</p>
                <div class="path-steps">
                  <div class="timeline-item">
                    <div class="timeline-marker">1-2ヶ月目</div>
                    <div class="timeline-content">
                      <h4>市場価値の最大化</h4>
                      <ul>
                        <li>ポートフォリオ・職務経歴書の充実</li>
                        <li>複数の転職エージェント登録</li>
                        <li>LinkedInプロフィールの最適化</li>
                        <li>業界動向・求人トレンドの調査</li>
                      </ul>
                    </div>
                  </div>
                  <div class="timeline-item">
                    <div class="timeline-marker">3-4ヶ月目</div>
                    <div class="timeline-content">
                      <h4>戦略的転職活動</h4>
                      <ul>
                        <li>年収アップが期待できる企業への集中応募</li>
                        <li>複数内定の同時進行</li>
                        <li>面接での価値訴求の練習</li>
                        <li>年収交渉の準備・実践</li>
                      </ul>
                    </div>
                  </div>
                  <div class="timeline-item">
                    <div class="timeline-marker">5-6ヶ月目</div>
                    <div class="timeline-content">
                      <h4>条件交渉・入社準備</h4>
                      <ul>
                        <li>複数オファーでの条件比較</li>
                        <li>年収・労働条件の最終交渉</li>
                        <li>円満退職の準備</li>
                        <li>新職場でのスタートダッシュ準備</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="expected-result">
                  <strong>期待される結果：</strong>年収20-40%アップ（平均150万円増）
                </div>
              </div>
            </div>
            
            <div class="path-item">
              <h3>📈 スキルアップ型（1-2年）</h3>
              <div class="path-content">
                <p><strong>対象：</strong>現在のスキルに不足があり、学習・実践を通じて市場価値を高めたい人</p>
                <div class="path-steps">
                  <div class="timeline-item">
                    <div class="timeline-marker">1-6ヶ月目</div>
                    <div class="timeline-content">
                      <h4>スキル習得・基礎固め</h4>
                      <ul>
                        <li>高収入職種に必要なスキルの選定・学習</li>
                        <li>オンラインコース・プログラミングスクール受講</li>
                        <li>実践的なプロジェクト制作</li>
                        <li>基礎的な資格取得</li>
                      </ul>
                    </div>
                  </div>
                  <div class="timeline-item">
                    <div class="timeline-marker">7-12ヶ月目</div>
                    <div class="timeline-content">
                      <h4>実務経験・ポートフォリオ構築</h4>
                      <ul>
                        <li>副業・フリーランスでの実務経験積み上げ</li>
                        <li>GitHub・ポートフォリオサイトの充実</li>
                        <li>技術記事執筆・発信活動</li>
                        <li>業界コミュニティへの参加</li>
                      </ul>
                    </div>
                  </div>
                  <div class="timeline-item">
                    <div class="timeline-marker">13-24ヶ月目</div>
                    <div class="timeline-content">
                      <h4>転職活動・キャリアアップ</h4>
                      <ul>
                        <li>上級資格・認定の取得</li>
                        <li>実績を武器にした戦略的転職</li>
                        <li>専門性を活かした高年収ポジション応募</li>
                        <li>継続的なスキルアップ計画策定</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="expected-result">
                  <strong>期待される結果：</strong>年収50-100%アップ（平均300万円増）
                </div>
              </div>
            </div>
            
            <div class="path-item">
              <h3>🏢 社内昇進型（2-3年）</h3>
              <div class="path-content">
                <p><strong>対象：</strong>現在の職場に満足しており、社内でのキャリアアップを重視する人</p>
                <div class="path-steps">
                  <div class="timeline-item">
                    <div class="timeline-marker">1年目</div>
                    <div class="timeline-content">
                      <h4>社内評価の向上</h4>
                      <ul>
                        <li>現職での成果最大化・可視化</li>
                        <li>上司・人事との定期的なキャリア相談</li>
                        <li>社内研修・外部セミナーの積極的受講</li>
                        <li>他部署との横断的プロジェクト参加</li>
                      </ul>
                    </div>
                  </div>
                  <div class="timeline-item">
                    <div class="timeline-marker">2年目</div>
                    <div class="timeline-content">
                      <h4>リーダーシップ・専門性の発揮</h4>
                      <ul>
                        <li>チームリーダー・プロジェクトマネージャー経験</li>
                        <li>業界最新トレンドの社内共有・啓蒙</li>
                        <li>後輩指導・メンタリング実践</li>
                        <li>社外活動（講演・執筆）による知名度向上</li>
                      </ul>
                    </div>
                  </div>
                  <div class="timeline-item">
                    <div class="timeline-marker">3年目</div>
                    <div class="timeline-content">
                      <h4>昇進・条件改善交渉</h4>
                      <ul>
                        <li>管理職・専門職への昇進申請</li>
                        <li>これまでの成果を基にした待遇改善交渉</li>
                        <li>他社オファーを交渉材料とした条件向上</li>
                        <li>長期キャリアパスの明確化</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="expected-result">
                  <strong>期待される結果：</strong>年収30-60%アップ（平均200万円増）+ 安定性確保
                </div>
              </div>
            </div>
          </div>
          
          <div class="success-metrics">
            <h3>📊 年収アップ成功の指標</h3>
            <div class="metrics-grid">
              <div class="metric-item">
                <h4>市場価値指標</h4>
                <ul>
                  <li>転職サイトでのスカウト数・質の向上</li>
                  <li>想定年収の段階的上昇</li>
                  <li>複数社からの内定獲得</li>
                  <li>業界内での認知度向上</li>
                </ul>
              </div>
              <div class="metric-item">
                <h4>スキル習熟度指標</h4>
                <ul>
                  <li>関連資格・認定の取得</li>
                  <li>実務プロジェクトでの成果創出</li>
                  <li>技術記事・発表の反響</li>
                  <li>同業者からの評価・推薦</li>
                </ul>
              </div>
              <div class="metric-item">
                <h4>キャリア発展指標</h4>
                <ul>
                  <li>責任範囲・裁量権の拡大</li>
                  <li>チーム規模・予算規模の増加</li>
                  <li>業界イベント・メディア出演</li>
                  <li>転職・ヘッドハンティングの打診増加</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA セクション -->
      <section class="cta-section">
        <div class="cta-content">
          <h2>あなたの年収アップを始めよう！</h2>
          <p>適性診断で自分に最適な高年収キャリアを発見しませんか？</p>
          <div class="cta-buttons">
            <router-link to="/diagnosis" class="cta-button primary">
              適性診断で年収アップの道筋を見つける（無料）
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
          <router-link to="/career-change" class="related-card">
            <h3>転職・キャリアチェンジ</h3>
            <p>異業種転職を成功させるための実践的な方法</p>
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
.salary-guide {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
}

.salary-guide-content {
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

.trend-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.trend-item {
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border-left: 4px solid #ddd;
}

.trend-item.hot {
  background: linear-gradient(135deg, #fff3e0, #fff);
  border-left-color: #ff5722;
}

.trend-item.rising {
  background: linear-gradient(135deg, #f3e5f5, #fff);
  border-left-color: #e91e63;
}

.trend-item.moderate {
  background: linear-gradient(135deg, #e8f5e8, #fff);
  border-left-color: #4caf50;
}

.trend-item h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.trend-stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.increase-rate {
  background: #ff5722;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.average-salary {
  background: var(--main-color);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

/* 職業別年収 */
.salary-categories {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin: 2rem 0;
}

.salary-category {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.salary-category h3 {
  color: var(--main-color);
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.profession-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.profession-item {
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 2px solid #f0f0f0;
}

.profession-item.high-salary {
  background: linear-gradient(135deg, #fff3e0, #fff);
  border-color: #ff9800;
}

.profession-item.medium-salary {
  background: linear-gradient(135deg, #f3e5f5, #fff);
  border-color: #9c27b0;
}

.profession-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.profession-header h4 {
  color: var(--main-color);
  margin: 0;
}

.salary-badge {
  background: var(--main-color);
  color: white;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.salary-range {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  font-weight: 600;
}

.salary-min, .salary-max {
  color: var(--main-color);
}

.salary-separator {
  color: #666;
}

.salary-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.experience-levels {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.exp-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #f8f9ff;
  border-radius: 8px;
}

.exp-label {
  font-size: 0.9rem;
  color: #666;
}

.exp-salary {
  font-weight: 600;
  color: var(--main-color);
}

.required-skills {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.skill-tag {
  background: var(--main-color);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

/* 年収レベル凡例 */
.salary-legend {
  background: #f8f9ff;
  padding: 1.5rem;
  border-radius: 10px;
  margin: 2rem 0;
}

.salary-legend h3 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.legend-items {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 3px;
}

.legend-color.high-salary {
  background: #ff9800;
}

.legend-color.medium-salary {
  background: #9c27b0;
}

.legend-text {
  font-size: 0.9rem;
}

/* 要因分析 */
.factors-analysis {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.factor-item {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 2px solid #f0f0f0;
}

.factor-icon {
  font-size: 3rem;
  text-align: center;
  flex-shrink: 0;
}

.factor-content h3 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.factor-content p {
  line-height: 1.6;
  margin-bottom: 1rem;
}

.factor-details {
  background: #f8f9ff;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 3px solid var(--main-color);
}

.factor-details h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.factor-details ul {
  list-style: none;
  padding: 0;
}

.factor-details li {
  margin-bottom: 0.8rem;
  padding-left: 1rem;
  position: relative;
}

.factor-details li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--main-color);
}

/* 業界比較 */
.industry-comparison {
  background: #f8f9ff;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 3px solid var(--main-color);
}

.industry-comparison h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.industry-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.industry-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  background: white;
  border-radius: 8px;
}

.industry-rank {
  background: var(--main-color);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  min-width: 40px;
  text-align: center;
}

.industry-name {
  flex: 1;
  margin-left: 1rem;
  font-weight: 600;
}

.industry-salary {
  color: var(--main-color);
  font-weight: 700;
}

/* 地域比較 */
.region-comparison {
  background: #f8f9ff;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 3px solid var(--main-color);
}

.region-comparison h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.region-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.region-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  text-align: center;
}

.region-name {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.region-multiplier {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.3rem;
}

.region-salary {
  color: var(--main-color);
  font-weight: 700;
}

/* 年齢別 */
.age-salary-chart {
  background: #f8f9ff;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 3px solid var(--main-color);
}

.age-salary-chart h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.chart-description p {
  margin-bottom: 0.5rem;
}

.chart-note {
  font-size: 0.9rem;
  color: #666;
  font-style: italic;
}

/* 市場分析 */
.market-overview {
  margin-bottom: 2rem;
}

.market-statistics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.market-stat {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #e3f2fd, #fff);
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.demand-analysis {
  margin: 2rem 0;
}

.demand-analysis h3 {
  color: var(--main-color);
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.demand-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.demand-item {
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border-left: 4px solid #ddd;
}

.demand-item.hot {
  background: linear-gradient(135deg, #fff3e0, #fff);
  border-left-color: #ff5722;
}

.demand-item.rising {
  background: linear-gradient(135deg, #f3e5f5, #fff);
  border-left-color: #e91e63;
}

.demand-item.moderate {
  background: linear-gradient(135deg, #e8f5e8, #fff);
  border-left-color: #4caf50;
}

.demand-stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.growth-rate {
  background: #ff5722;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.avg-offer {
  background: var(--main-color);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.required-exp {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.exp-tag {
  background: var(--main-color);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

/* トレンドカード */
.market-trends {
  margin-top: 2rem;
}

.market-trends h3 {
  color: var(--main-color);
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.trend-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.trend-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 2px solid #f0f0f0;
  transition: all 0.3s ease;
}

.trend-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border-color: var(--main-color);
}

.trend-card h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.trend-card p {
  line-height: 1.6;
}

/* 交渉戦略 */
.negotiation-strategy {
  margin-bottom: 2rem;
}

.negotiation-steps {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem 0;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 2px solid #f0f0f0;
}

.step-number {
  background: var(--main-color);
  color: white;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  flex-shrink: 0;
}

.step-content h3 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.step-content p {
  line-height: 1.6;
  margin-bottom: 1rem;
}

.step-details {
  background: #f8f9ff;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 3px solid var(--main-color);
}

.step-details h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.step-details ul {
  list-style: none;
  padding: 0;
}

.step-details li {
  margin-bottom: 0.8rem;
  padding-left: 1rem;
  position: relative;
}

.step-details li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--main-color);
}

/* 価値表現例 */
.value-examples {
  background: #f8f9ff;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 3px solid var(--main-color);
}

.value-examples h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.example-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.example-item {
  background: white;
  padding: 1rem;
  border-radius: 8px;
}

.example-item strong {
  color: var(--main-color);
}

/* タイミングガイド */
.timing-guide {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.timing-item {
  padding: 1.5rem;
  border-radius: 10px;
}

.timing-item.best {
  background: #e8f5e8;
  border-left: 4px solid #4caf50;
}

.timing-item.avoid {
  background: #ffebee;
  border-left: 4px solid #f44336;
}

.timing-item h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.timing-item ul {
  list-style: none;
  padding: 0;
}

.timing-item li {
  margin-bottom: 0.8rem;
  padding-left: 1rem;
  position: relative;
}

.timing-item.best li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #4caf50;
  font-weight: bold;
}

.timing-item.avoid li::before {
  content: '✗';
  position: absolute;
  left: 0;
  color: #f44336;
  font-weight: bold;
}

/* 交渉フレーズ */
.negotiation-phrases {
  background: #f8f9ff;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 3px solid var(--main-color);
}

.negotiation-phrases h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.phrase-examples {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.phrase-item {
  padding: 1rem;
  border-radius: 8px;
}

.phrase-item.good {
  background: #e8f5e8;
  border-left: 3px solid #4caf50;
}

.phrase-item.bad {
  background: #ffebee;
  border-left: 3px solid #f44336;
}

.phrase-item strong {
  color: var(--main-color);
}

/* 代替案 */
.negotiation-alternatives {
  background: #f8f9ff;
  padding: 2rem;
  border-radius: 15px;
  margin: 2rem 0;
}

.negotiation-alternatives h3 {
  color: var(--main-color);
  margin-bottom: 2rem;
}

.alternatives-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.alternative-item {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 4px solid var(--main-color);
}

.alternative-item h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.alternative-item ul {
  list-style: none;
  padding: 0;
}

.alternative-item li {
  margin-bottom: 0.8rem;
  padding-left: 1rem;
  position: relative;
}

.alternative-item li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--main-color);
}

/* 戦略パス */
.strategy-overview {
  margin-bottom: 2rem;
}

.strategy-paths {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.path-item {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 2px solid #f0f0f0;
}

.path-item h3 {
  color: var(--main-color);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.path-content p {
  margin-bottom: 2rem;
  line-height: 1.6;
}

.path-steps {
  margin-bottom: 2rem;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 2rem;
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
  text-align: center;
}

.timeline-content {
  background: #f8f9ff;
  padding: 2rem;
  border-radius: 15px;
  flex: 1;
}

.timeline-content h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.timeline-content ul {
  list-style: none;
  padding: 0;
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

.expected-result {
  background: linear-gradient(135deg, #e3f2fd, #fff);
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid var(--main-color);
  font-weight: 600;
  color: var(--main-color);
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

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.metric-item {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 4px solid var(--main-color);
}

.metric-item h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.metric-item ul {
  list-style: none;
  padding: 0;
}

.metric-item li {
  margin-bottom: 0.8rem;
  padding-left: 1rem;
  position: relative;
}

.metric-item li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--main-color);
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
  .salary-guide-content {
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
  
  .trend-grid {
    grid-template-columns: 1fr;
  }
  
  .salary-categories {
    gap: 2rem;
  }
  
  .profession-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .factor-item {
    flex-direction: column;
    text-align: center;
  }
  
  .step-item {
    flex-direction: column;
    text-align: center;
  }
  
  .timeline-item {
    flex-direction: column;
    text-align: center;
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
  
  .step-number {
    width: 60px;
    height: 60px;
    font-size: 0.9rem;
  }
  
  .example-grid {
    grid-template-columns: 1fr;
  }
  
  .timing-guide {
    grid-template-columns: 1fr;
  }
  
  .alternatives-grid {
    grid-template-columns: 1fr;
  }
  
  .metrics-grid {
    grid-template-columns: 1fr;
  }
}
</style>