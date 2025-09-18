<template>
  <div class="student-guide">
    <div class="student-guide-content">
      <!-- ヘッダー -->
      <header class="guide-header">
        <h1 class="guide-title">学生向けキャリアガイド</h1>
        <p class="guide-subtitle">就職活動を成功させる準備と戦略</p>
      </header>

      <!-- 目次 -->
      <nav class="table-of-contents">
        <h2>目次</h2>
        <ul>
          <li><a href="#preparation">就活準備の基本</a></li>
          <li><a href="#self-analysis">学生のための自己分析</a></li>
          <li><a href="#industry-research">業界・企業研究</a></li>
          <li><a href="#application-process">選考対策・面接準備</a></li>
          <li><a href="#internship">インターンシップ活用法</a></li>
          <li><a href="#timeline">就活スケジュール</a></li>
        </ul>
      </nav>

      <!-- 就活準備の基本 -->
      <section id="preparation" class="guide-section">
        <h2>就職活動準備の基本</h2>
        
        <div class="content-block">
          <p>就職活動は人生の重要な分岐点です。早期から計画的に準備することで、理想の職業に就く可能性を大幅に高めることができます。</p>
          
          <div class="statistics">
            <div class="stat-item">
              <div class="stat-number">73%</div>
              <div class="stat-label">早期準備した学生の内定獲得率</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">8.2社</div>
              <div class="stat-label">平均エントリー数（2024年卒）</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">3ヶ月</div>
              <div class="stat-label">内定獲得までの平均期間</div>
            </div>
          </div>
          
          <div class="highlight-box">
            <h3>成功する就活準備の5つのポイント</h3>
            <ul>
              <li><strong>早期スタート：</strong>大学3年の春から準備を開始することで選択肢が広がる</li>
              <li><strong>自己理解：</strong>適性診断と自己分析で自分の強みと興味を明確化</li>
              <li><strong>情報収集：</strong>業界研究と企業分析で最適な就職先を見つける</li>
              <li><strong>スキル習得：</strong>希望職種に必要なスキルを学生時代に身につける</li>
              <li><strong>実践経験：</strong>インターンシップやアルバイトで実務経験を積む</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 学生のための自己分析 -->
      <section id="self-analysis" class="guide-section">
        <h2>学生のための自己分析</h2>
        
        <div class="content-block">
          <p>自己分析は就職活動の基盤となる重要なプロセスです。学生ならではの視点で自分を客観視しましょう。</p>
          
          <div class="analysis-framework">
            <div class="framework-card">
              <h3>学業・研究経験</h3>
              <div class="framework-questions">
                <h4>分析ポイント</h4>
                <ul>
                  <li>最も興味を持って取り組んだ授業・研究</li>
                  <li>課題解決で発揮した創意工夫</li>
                  <li>チームプロジェクトでの役割</li>
                  <li>成果を出すために努力したこと</li>
                </ul>
              </div>
              <div class="framework-tip">
                <strong>活用法：</strong> 学業経験を通じて培った思考力や問題解決能力をアピール材料に
              </div>
            </div>
            
            <div class="framework-card">
              <h3>課外活動・サークル</h3>
              <div class="framework-questions">
                <h4>分析ポイント</h4>
                <ul>
                  <li>リーダーシップを発揮した経験</li>
                  <li>困難を乗り越えた体験</li>
                  <li>チームワークで成し遂げたこと</li>
                  <li>継続的に取り組んだ活動</li>
                </ul>
              </div>
              <div class="framework-tip">
                <strong>活用法：</strong> 組織運営能力や協調性、継続力の証明として活用
              </div>
            </div>
            
            <div class="framework-card">
              <h3>アルバイト・インターン</h3>
              <div class="framework-questions">
                <h4>分析ポイント</h4>
                <ul>
                  <li>責任感を持って取り組んだ業務</li>
                  <li>お客様や同僚との関係構築</li>
                  <li>効率化や改善に貢献した経験</li>
                  <li>ビジネスマナーの習得度</li>
                </ul>
              </div>
              <div class="framework-tip">
                <strong>活用法：</strong> 実務経験と職業意識の高さをアピール
              </div>
            </div>
            
            <div class="framework-card">
              <h3>価値観・将来ビジョン</h3>
              <div class="framework-questions">
                <h4>分析ポイント</h4>
                <ul>
                  <li>社会に対してどう貢献したいか</li>
                  <li>10年後の理想的な自分像</li>
                  <li>仕事で大切にしたい価値観</li>
                  <li>ワークライフバランスの考え方</li>
                </ul>
              </div>
              <div class="framework-tip">
                <strong>活用法：</strong> 志望動機と企業選びの軸として活用
              </div>
            </div>
          </div>
          
          <div class="self-analysis-tools">
            <h3>おすすめ自己分析ツール</h3>
            <div class="tools-grid">
              <div class="tool-item">
                <div class="tool-name">適性診断（ため職）</div>
                <div class="tool-desc">4つの観点から職業適性を総合判定</div>
                <div class="tool-price">無料</div>
                <router-link to="/diagnosis" class="tool-link">今すぐ診断</router-link>
              </div>
              <div class="tool-item">
                <div class="tool-name">ストレングスファインダー</div>
                <div class="tool-desc">34の資質から上位5つの強みを発見</div>
                <div class="tool-price">2,340円</div>
              </div>
              <div class="tool-item">
                <div class="tool-name">リクナビ診断</div>
                <div class="tool-desc">性格と価値観から適職を分析</div>
                <div class="tool-price">無料</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 業界・企業研究 -->
      <section id="industry-research" class="guide-section">
        <h2>効果的な業界・企業研究</h2>
        
        <div class="content-block">
          <div class="research-process">
            <div class="process-step">
              <div class="step-header">
                <div class="step-number">STEP 1</div>
                <h3>業界全体の把握</h3>
              </div>
              <div class="step-content">
                <div class="step-details">
                  <div class="step-details-row">
                    <div class="step-detail-col">
                      <h4>調査内容</h4>
                      <ul>
                        <li>業界の市場規模と成長性</li>
                        <li>主要企業とそのシェア</li>
                        <li>業界のトレンドと将来性</li>
                        <li>平均年収と労働条件</li>
                      </ul>
                    </div>
                    <div class="step-detail-col">
                      <h4>情報源</h4>
                      <ul>
                        <li>業界団体の公式サイト</li>
                        <li>経済新聞・業界誌</li>
                        <li>政府統計・調査レポート</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="process-step">
              <div class="step-header">
                <div class="step-number">STEP 2</div>
                <h3>企業の詳細分析</h3>
              </div>
              <div class="step-content">
                <div class="step-details">
                  <div class="step-details-row">
                    <div class="step-detail-col">
                      <h4>調査内容</h4>
                      <ul>
                        <li>企業理念・ミッション</li>
                        <li>事業内容と競合優位性</li>
                        <li>財務状況と業績推移</li>
                        <li>社風・企業文化</li>
                      </ul>
                    </div>
                    <div class="step-detail-col">
                      <h4>情報源</h4>
                      <ul>
                        <li>会社四季報・有価証券報告書</li>
                        <li>企業の採用サイト・IR情報</li>
                        <li>転職口コミサイト</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="process-step">
              <div class="step-header">
                <div class="step-number">STEP 3</div>
                <h3>キャリアパスの理解</h3>
              </div>
              <div class="step-content">
                <div class="step-details">
                  <!-- ここは2カラム構造に統一 -->
                  <div class="step-details-row">
                    <div class="step-detail-col">
                      <h4>調査内容</h4>
                      <ul>
                        <li>職種の役割・業務内容</li>
                        <li>必要なスキル・資格</li>
                        <li>キャリアパスの選択肢</li>
                        <li>年収レンジと昇給例</li>
                      </ul>
                    </div>
                    <div class="step-detail-col">
                      <h4>情報源</h4>
                      <ul>
                        <li>求人票・職種ガイド</li>
                        <li>現役社員のインタビュー</li>
                        <li>転職エージェントのアドバイス</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="industry-grid">
              <div class="industry-card">
                <h4>IT・テクノロジー</h4>
                <div class="industry-growth">成長性: ★★★★★</div>
                <div class="industry-skills">
                  <strong>求められるスキル: </strong>
                  <span>プログラミング、論理思考、継続学習意欲</span>
                </div>
                <div class="industry-salary">平均年収: 450-800万円</div>
              </div>
              
              <div class="industry-card">
                <h4>金融・保険</h4>
                <div class="industry-growth">成長性: ★★★☆☆</div>
                <div class="industry-skills">
                  <strong>求められるスキル: </strong>
                  <span>数値分析、リスク管理、コミュニケーション</span>
                </div>
                <div class="industry-salary">平均年収: 500-900万円</div>
              </div>
              
              <div class="industry-card">
                <h4>製造業</h4>
                <div class="industry-growth">成長性: ★★★☆☆</div>
                <div class="industry-skills">
                  <strong>求められるスキル: </strong>
                  <span>品質管理、改善提案、チームワーク</span>
                </div>
                <div class="industry-salary">平均年収: 400-700万円</div>
              </div>
              
              <div class="industry-card">
                <h4>小売・サービス</h4>
                <div class="industry-growth">成長性: ★★☆☆☆</div>
                <div class="industry-skills">
                  <strong>求められるスキル: </strong>
                  <span>接客力、企画力、店舗運営</span>
                </div>
                <div class="industry-salary">平均年収: 350-600万円</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 選考対策・面接準備 -->
      <section id="application-process" class="guide-section">
        <h2>選考対策・面接準備</h2>
        
        <div class="content-block">
          <div class="selection-stages">
            <div class="stage-item">
              <div class="stage-title">書類選考対策</div>
              <div class="stage-content">
                <h4>エントリーシート(ES)のポイント</h4>
                <ul>
                  <li><strong>具体性:</strong> 数字や固有名詞を使って具体的に記述</li>
                  <li><strong>構造化:</strong> 結論→理由→具体例→結論の構成</li>
                  <li><strong>差別化:</strong> 他の学生との違いを明確にする</li>
                  <li><strong>企業適合:</strong> その企業を選ぶ理由を明確にする</li>
                </ul>
                
                <div class="example-box">
                  <h4>良いESの例</h4>
                  <p><strong>質問:</strong> 学生時代に最も力を入れたことを教えてください。</p>
                  <p><strong>回答例:</strong> 「カフェアルバイトで売上向上に貢献しました。来客数減少という課題に対し、常連客への聞き取り調査を実施。その結果、Wi-Fi環境の改善要望が多いことが判明。店長に提案し、Wi-Fi設備を導入した結果、3ヶ月で客単価が15%向上しました。この経験から、課題発見力と提案力を身につけることができました。」</p>
                </div>
              </div>
            </div>
            
            <div class="stage-item">
              <div class="stage-title">面接対策</div>
              <div class="stage-content">
                <h4>面接の種類と対策</h4>
                <div class="interview-types">
                  <div class="interview-type">
                    <h5>個人面接</h5>
                    <ul>
                      <li>自己紹介は1分以内で簡潔に</li>
                      <li>志望動機は企業研究の成果を活用</li>
                      <li>逆質問で積極性をアピール</li>
                    </ul>
                  </div>
                  <div class="interview-type">
                    <h5>グループ面接</h5>
                    <ul>
                      <li>他の学生の発言をよく聞く</li>
                      <li>協調性を意識した発言</li>
                      <li>簡潔で印象に残る自己アピール</li>
                    </ul>
                  </div>
                  <div class="interview-type">
                    <h5>グループディスカッション</h5>
                    <ul>
                      <li>司会、書記、タイムキーパーの役割分担</li>
                      <li>論理的な発言と建設的な議論</li>
                      <li>チーム全体での合意形成を重視</li>
                    </ul>
                  </div>
                </div>
                
                <div class="common-questions">
                  <h4>頻出質問と回答のポイント</h4>
                  <div class="question-list">
                    <div class="question-item">
                      <div class="question">「なぜ弊社を志望するのですか？」</div>
                      <div class="answer-point">企業の特徴×自分の価値観の一致を具体的に説明</div>
                    </div>
                    <div class="question-item">
                      <div class="question">「あなたの強みは何ですか？」</div>
                      <div class="answer-point">エピソードで証明し、その強みをどう活かすかも伝える</div>
                    </div>
                    <div class="question-item">
                      <div class="question">「10年後どうなっていたいですか？」</div>
                      <div class="answer-point">現実的で具体的なキャリアビジョンを示す</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="stage-item">
              <div class="stage-title">筆記・適性検査対策</div>
              <div class="stage-content">
                <h4>主要な検査と対策法</h4>
                <div class="test-types">
                  <div class="test-type">
                    <h5>SPI3</h5>
                    <p><strong>内容:</strong> 言語・非言語・性格検査</p>
                    <p><strong>対策:</strong> 問題集での反復練習、時間配分の練習</p>
                  </div>
                  <div class="test-type">
                    <h5>玉手箱</h5>
                    <p><strong>内容:</strong> 計数・言語・英語・性格</p>
                    <p><strong>対策:</strong> 素早い問題処理能力の向上</p>
                  </div>
                  <div class="test-type">
                    <h5>CAB/GAB</h5>
                    <p><strong>内容:</strong> 論理思考力測定</p>
                    <p><strong>対策:</strong> IT業界志望者は特に重要、専用問題集で対策</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- インターンシップ活用法 -->
      <section id="internship" class="guide-section">
        <h2>インターンシップの効果的活用法</h2>
        
        <div class="content-block">
          <div class="internship-benefits">
            <h3>インターンシップ参加のメリット</h3>
            <div class="benefits-grid">
              <div class="benefit-item">
                <h4>業界・職種理解</h4>
                <p>実際の業務を体験することで、仕事内容や社風を具体的に理解できる</p>
              </div>
              <div class="benefit-item">
                <h4>実務スキル習得</h4>
                <p>ビジネスマナーや実践的なスキルを身につけ、就職後のスタートダッシュが可能</p>
              </div>
              <div class="benefit-item">
                <h4>人脈形成</h4>
                <p>社員や他の参加学生とのネットワークを構築し、情報収集に活用</p>
              </div>
              <div class="benefit-item">
                <h4>選考優遇</h4>
                <p>優秀な成果を残せば早期選考や特別選考ルートへの招待の可能性</p>
              </div>
            </div>
          </div>
          
          <div class="internship-types">
            <h3>インターンシップの種類と特徴</h3>
            <div class="types-comparison">
              <div class="type-card">
                <h4>1日インターン</h4>
                <div class="duration">期間: 1日</div>
                <div class="content-desc">
                  <strong>内容:</strong> 会社説明、業界セミナー、グループワーク
                </div>
                <div class="pros-cons">
                  <div class="pros">
                    <strong>メリット:</strong> 気軽に参加可能、複数企業を比較できる
                  </div>
                  <div class="cons">
                    <strong>デメリット:</strong> 実務体験は限定的
                  </div>
                </div>
              </div>
              
              <div class="type-card">
                <h4>短期インターン</h4>
                <div class="duration">期間: 3日-2週間</div>
                <div class="content-desc">
                  <strong>内容:</strong> プロジェクト型課題、実務の一部体験
                </div>
                <div class="pros-cons">
                  <div class="pros">
                    <strong>メリット:</strong> 実践的な経験、チームワーク体験
                  </div>
                  <div class="cons">
                    <strong>デメリット:</strong> 深い理解には時間不足
                  </div>
                </div>
              </div>
              
              <div class="type-card">
                <h4>長期インターン</h4>
                <div class="duration">期間: 3ヶ月以上</div>
                <div class="content-desc">
                  <strong>内容:</strong> 実際の業務を担当、プロジェクト責任者として参加
                </div>
                <div class="pros-cons">
                  <div class="pros">
                    <strong>メリット:</strong> 本格的な実務経験、高い内定率
                  </div>
                  <div class="cons">
                    <strong>デメリット:</strong> 時間的負担大、学業との両立が困難
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="internship-success">
            <h3>インターンシップを成功させるコツ</h3>
            <div class="success-tips">
              <div class="tip-category">
                <h4>参加前の準備</h4>
                <ul>
                  <li>企業研究を徹底的に行う</li>
                  <li>参加目的と学びたいことを明確化</li>
                  <li>基本的なビジネスマナーを身につける</li>
                </ul>
              </div>
              <div class="tip-category">
                <h4>参加中の姿勢</h4>
                <ul>
                  <li>積極的に質問し、学習意欲をアピール</li>
                  <li>与えられた課題には全力で取り組む</li>
                  <li>社員や他の参加者との交流を大切にする</li>
                </ul>
              </div>
              <div class="tip-category">
                <h4>参加後のフォロー</h4>
                <ul>
                  <li>お礼メールを送り、感謝の気持ちを伝える</li>
                  <li>学んだことを整理し、今後の活動に活かす</li>
                  <li>継続的な関係構築を心がける</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 就活スケジュール -->
      <section id="timeline" class="guide-section">
        <h2>就活成功のための年間スケジュール</h2>
        
        <div class="content-block">
          <div class="timeline-container">
            <div class="timeline-year">
              <h3>大学3年生の流れ</h3>
              <div class="timeline">
                <div class="timeline-item">
                  <div class="timeline-marker">4-6月</div>
                  <div class="timeline-content">
                    <h4>就活基盤作り</h4>
                    <ul>
                      <li>自己分析の開始</li>
                      <li>適性診断の実施</li>
                      <li>業界研究の基礎</li>
                      <li>OB・OG訪問の準備</li>
                    </ul>
                    <div class="timeline-tip">この時期が重要！早期スタートで選択肢が広がります</div>
                  </div>
                </div>
                
                <div class="timeline-item">
                  <div class="timeline-marker">7-9月</div>
                  <div class="timeline-content">
                    <h4>夏期インターン</h4>
                    <ul>
                      <li>サマーインターンへの参加</li>
                      <li>企業との接点作り</li>
                      <li>実務体験による職業理解</li>
                      <li>就活仲間との情報交換</li>
                    </ul>
                    <div class="timeline-tip">人気企業のインターンは競争率が高いので早めの対策を</div>
                  </div>
                </div>
                
                <div class="timeline-item">
                  <div class="timeline-marker">10-12月</div>
                  <div class="timeline-content">
                    <h4>本格準備期間</h4>
                    <ul>
                      <li>企業研究の深化</li>
                      <li>ES・履歴書の作成</li>
                      <li>面接練習の開始</li>
                      <li>筆記試験対策</li>
                    </ul>
                    <div class="timeline-tip">年明けの選考に向けて実践的な準備を進めましょう</div>
                  </div>
                </div>
                
                <div class="timeline-item">
                  <div class="timeline-marker">1-3月</div>
                  <div class="timeline-content">
                    <h4>選考直前対策</h4>
                    <ul>
                      <li>合同企業説明会への参加</li>
                      <li>志望企業の絞り込み</li>
                      <li>最終的な選考対策</li>
                      <li>就活解禁に向けた準備完了</li>
                    </ul>
                    <div class="timeline-tip">3月の就活解禁に向けて万全の準備を</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="timeline-year">
              <h3>大学4年生の流れ</h3>
              <div class="timeline">
                <div class="timeline-item">
                  <div class="timeline-marker">3-5月</div>
                  <div class="timeline-content">
                    <h4>選考本格化</h4>
                    <ul>
                      <li>ES提出・書類選考</li>
                      <li>筆記試験の受験</li>
                      <li>一次面接の開始</li>
                      <li>志望企業の最終決定</li>
                    </ul>
                    <div class="timeline-tip">複数企業の選考が重なるのでスケジュール管理が重要</div>
                  </div>
                </div>
                
                <div class="timeline-item">
                  <div class="timeline-marker">6-8月</div>
                  <div class="timeline-content">
                    <h4>内定獲得期間</h4>
                    <ul>
                      <li>最終面接の実施</li>
                      <li>内定通知の受領</li>
                      <li>内定承諾の検討</li>
                      <li>入社準備の開始</li>
                    </ul>
                    <div class="timeline-tip">内定獲得後も卒業まで気を抜かずに学業に励みましょう</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="schedule-checklist">
            <h3>月別チェックリスト</h3>
            <div class="checklist-grid">
              <div class="checklist-card">
                <h4>3年生春学期（4-7月）</h4>
                <div class="checklist-items">
                  <label><input type="checkbox"> 自己分析完了</label>
                  <label><input type="checkbox"> 適性診断受験</label>
                  <label><input type="checkbox"> 業界研究開始</label>
                  <label><input type="checkbox"> 就活サイト登録</label>
                  <label><input type="checkbox"> インターン情報収集</label>
                </div>
              </div>
              
              <div class="checklist-card">
                <h4>3年生夏休み（8-9月）</h4>
                <div class="checklist-items">
                  <label><input type="checkbox"> インターン参加</label>
                  <label><input type="checkbox"> OB・OG訪問実施</label>
                  <label><input type="checkbox"> 企業研究深化</label>
                  <label><input type="checkbox"> ESの雛形作成</label>
                  <label><input type="checkbox"> 面接練習開始</label>
                </div>
              </div>
              
              <div class="checklist-card">
                <h4>3年生秋学期（10-1月）</h4>
                <div class="checklist-items">
                  <label><input type="checkbox"> 志望企業リスト作成</label>
                  <label><input type="checkbox"> ES本格作成</label>
                  <label><input type="checkbox"> 筆記試験対策</label>
                  <label><input type="checkbox"> 面接対策強化</label>
                  <label><input type="checkbox"> 証明写真撮影</label>
                </div>
              </div>
              
              <div class="checklist-card">
                <h4>4年生春学期（2-6月）</h4>
                <div class="checklist-items">
                  <label><input type="checkbox"> ES提出</label>
                  <label><input type="checkbox"> 筆記試験受験</label>
                  <label><input type="checkbox"> 面接選考対応</label>
                  <label><input type="checkbox"> 内定獲得</label>
                  <label><input type="checkbox"> 内定承諾決定</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA セクション -->
      <section class="cta-section">
        <div class="cta-content">
          <h2>就活成功の第一歩を踏み出そう！</h2>
          <p>適性診断で自分の強みを発見し、最適な職業選択の基盤を作りましょう。</p>
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
          <router-link to="/skills-development" class="related-card">
            <h3>スキル開発ガイド</h3>
            <p>高収入職業に必要なスキルの効率的な身につけ方</p>
          </router-link>
          <router-link to="/salary-guide" class="related-card">
            <h3>年収・転職情報</h3>
            <p>職業別年収相場と転職市場の最新動向</p>
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
</script>

<style scoped>
/* 基本レイアウト */
.student-guide {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
}

.student-guide-content {
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

.step-details-row {
  display: flex;
  gap: 2rem;
}
.step-detail-col {
  flex: 1;
}

/* 分析フレームワーク */
.analysis-framework {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.framework-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 2px solid #f0f0f0;
  transition: all 0.3s ease;
}

.framework-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border-color: var(--main-color);
}


.framework-card h3 {
  color: var(--main-color);
  text-align: center;
  margin-bottom: 1.5rem;
}

.framework-questions h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
  font-size: 1rem;
}

.framework-questions ul {
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
}

.framework-questions li {
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  position: relative;
  font-size: 0.9rem;
}

.framework-questions li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--main-color);
}

.framework-tip {
  background: #f8f9ff;
  padding: 1rem;
  border-radius: 8px;
  border-left: 3px solid var(--main-color);
  font-size: 0.9rem;
}

/* 自己分析ツール */
.self-analysis-tools {
  margin: 2rem 0;
}

.self-analysis-tools h3 {
  color: var(--main-color);
  margin-bottom: 1.5rem;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.tool-item {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 2px solid #f0f0f0;
}

.tool-name {
  font-weight: 600;
  color: var(--main-color);
  margin-bottom: 0.5rem;
}

.tool-desc {
  color: var(--text-dark);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.tool-price {
  color: #666;
  font-size: 0.8rem;
  margin-bottom: 1rem;
}

.tool-link {
  display: inline-block;
  background: var(--main-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.tool-link:hover {
  background: #4a7ba7;
  transform: translateY(-2px);
}

/* 研究プロセス */
.research-process {
  margin: 2rem 0;
}

.process-step {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  gap: 2rem;
  margin-bottom: 3rem;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.step-number {
  background: var(--main-color);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-content h3 {
  color: var(--main-color);
  margin: 1rem 0;
}

.step-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.2rem;
}
.step-header .step-number {
  font-size: 1rem;
  padding: 0.7rem 1.2rem;
}
.step-header h3 {
  font-size: 1.1rem;
  margin: 0;
}

.step-details ul li {
  text-align: left;
}

.step-details ul {
  width: 120%;
}

.step-details h4 {
  color: var(--text-dark);
  margin: 1rem 0 0.5rem 0;
  font-size: 1rem;
}

.step-details ul {
  list-style: none;
  padding: 0;
  margin-bottom: 1rem;
}

.step-details li {
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  position: relative;
  font-size: 0.9rem;
}

.step-details li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--main-color);
}

/* 業界グリッド */
.industry-categories {
  margin: 2rem 0;
}

.industry-categories h3 {
  color: var(--main-color);
  margin-bottom: 1.5rem;
}

.industry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.industry-card {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 2px solid #f0f0f0;
}

.industry-card h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.industry-growth {
  color: #ff9800;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.industry-skills {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.industry-skills strong {
  color: var(--main-color);
}

.industry-salary {
  color: #666;
  font-size: 0.9rem;
  font-weight: 600;
}

/* 選考段階 */
.selection-stages {
  margin: 2rem 0;
}

.stage-item {
  margin-bottom: 3rem;
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.stage-title {
  background: var(--main-color);
  color: white;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
}

.stage-content {
  padding: 2rem;
}

.stage-content h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.stage-content ul {
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
}

.stage-content li {
  margin-bottom: 0.8rem;
  padding-left: 1.5rem;
  position: relative;
}

.stage-content li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--main-color);
  font-weight: bold;
}

/* 例文ボックス */
.example-box {
  background: #f8f9ff;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 4px solid var(--main-color);
  margin: 1.5rem 0;
}

.example-box h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.example-box p {
  margin-bottom: 0.8rem;
  line-height: 1.6;
}

/* 面接タイプ */
.interview-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.interview-type {
  background: #f8f9ff;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 3px solid var(--main-color);
}

.interview-type h5 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.interview-type ul {
  list-style: none;
  padding: 0;
}

.interview-type li {
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  position: relative;
  font-size: 0.9rem;
}

.interview-type li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--main-color);
}

/* よくある質問 */
.common-questions {
  margin: 2rem 0;
}

.common-questions h4 {
  color: var(--main-color);
  margin-bottom: 1.5rem;
}

.question-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.question-item {
  background: #f8f9ff;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 3px solid var(--main-color);
}

.question {
  font-weight: 600;
  color: var(--main-color);
  margin-bottom: 0.5rem;
}

.answer-point {
  font-size: 0.9rem;
  color: var(--text-dark);
  line-height: 1.5;
}

/* テストタイプ */
.test-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.test-type {
  background: #f8f9ff;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 3px solid var(--main-color);
}

.test-type h5 {
  color: var(--main-color);
  margin-bottom: 0.8rem;
}

.test-type p {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.4;
}

/* インターンシップメリット */
.internship-benefits {
  margin: 2rem 0;
}

.internship-benefits h3 {
  color: var(--main-color);
  margin-bottom: 1.5rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

@media (max-width: 700px) {
  .benefits-grid {
    grid-template-columns: 1fr;
  }
}

.benefit-item {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  text-align: center;
  border: 2px solid #f0f0f0;
  transition: all 0.3s ease;
}

.benefit-item:hover {
  transform: translateY(-5px);
  border-color: var(--main-color);
}


.benefit-item h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.benefit-item p {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--text-dark);
}

/* インターンシップタイプ */
.internship-types {
  margin: 2rem 0;
}

.internship-types h3 {
  color: var(--main-color);
  margin-bottom: 1.5rem;
}

.types-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.type-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 2px solid #f0f0f0;
}

.type-card h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
  text-align: center;
}

.duration {
  background: var(--light-pink);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  font-weight: 600;
}

.content-desc {
  margin-bottom: 1.5rem;
}

.content-desc strong {
  color: var(--main-color);
}

.pros-cons {
  font-size: 0.9rem;
}

.pros, .cons {
  margin-bottom: 0.8rem;
}

.pros strong {
  color: #4caf50;
}

.cons strong {
  color: #f44336;
}

/* 成功のコツ */
.internship-success {
  margin: 2rem 0;
}

.internship-success h3 {
  color: var(--main-color);
  margin-bottom: 1.5rem;
}

.success-tips {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.tip-category {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 2px solid #f0f0f0;
}

.tip-category h4 {
  color: var(--main-color);
  margin-bottom: 1rem;
}

.tip-category ul {
  list-style: none;
  padding: 0;
}

.tip-category li {
  margin-bottom: 0.8rem;
  padding-left: 1.5rem;
  position: relative;
  font-size: 0.9rem;
}

.tip-category li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--main-color);
  font-weight: bold;
}

/* タイムライン */
.timeline-container {
  margin: 2rem 0;
}

.timeline-year {
  margin-bottom: 4rem;
}

.timeline-year h3 {
  color: var(--main-color);
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(135deg, var(--light-pink), #fff);
  padding: 1rem;
  border-radius: 10px;
}

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

.timeline-tip {
  background: #e3f2fd;
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  color: var(--main-color);
  font-weight: 600;
  margin-top: 1rem;
}

/* チェックリスト */
.schedule-checklist {
  margin: 3rem 0;
}

.schedule-checklist h3 {
  color: var(--main-color);
  margin-bottom: 2rem;
  text-align: center;
}

.checklist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.checklist-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 2px solid #f0f0f0;
}

.checklist-card h4 {
  color: var(--main-color);
  margin-bottom: 1.5rem;
  text-align: center;
  background: var(--light-pink);
  padding: 1rem;
  border-radius: 10px;
  margin: -1rem -1rem 1.5rem -1rem;
}

.checklist-items {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.checklist-items label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.9rem;
  line-height: 1.4;
}

.checklist-items input[type="checkbox"] {
  margin-right: 0.8rem;
  transform: scale(1.2);
  accent-color: var(--main-color);
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
  .student-guide-content {
    margin: 0;
    box-shadow: none;
  }
  
  .guide-header {
    padding: 2rem 1rem;
  }
  
  .guide-title {
    font-size: clamp(1.5rem, 8vw, 2.5rem);
  }
  
  .guide-section {
    padding: 2rem 1rem;
  }
  
  .guide-section h2 {
    font-size: clamp(1rem, 2rem, 5vw);
  }
  
  .statistics {
    grid-template-columns: 1fr;
  }
  
  .analysis-framework {
    grid-template-columns: 1fr;
  }
  
  .tools-grid {
    grid-template-columns: 1fr;
  }
  
  .industry-grid {
    grid-template-columns: 1fr;
  }
  
  .interview-types {
    grid-template-columns: 1fr;
  }
  
  .test-types {
    grid-template-columns: 1fr;
  }
  
  .benefits-grid {
    grid-template-columns: 1fr;
  }
  
  .types-comparison {
    grid-template-columns: 1fr;
  }
  
  .success-tips {
    grid-template-columns: 1fr;
  }
  
  .timeline::before {
    display: none;
  }
  
  .timeline-item {
    flex-direction: column;
    text-align: center;
  }
  
  .checklist-grid {
    grid-template-columns: 1fr;
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
    padding: 1.5rem;
  }
  
  .stat-item {
    width: 50%
  }

  .stat-number {
    font-size: 2rem;
  }

  .step-details-row {
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }

  .framework-card {
    margin-bottom: 1rem;
  }
  
  .stage-content {
    padding: 1.5rem;
  }
}
</style>