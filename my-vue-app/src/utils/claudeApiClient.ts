/**
 * Claude API クライアント
 * 進路相談チャットbotのためのClaude AI連携機能
 */

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface CareerAdviceRequest {
  messages: ChatMessage[];
  userProfile?: {
    age?: number;
    currentStatus?: string; // 学生、社会人、転職検討中など
    interests?: string[];
    skills?: string[];
    concerns?: string[];
  };
}

export interface CareerAdviceResponse {
  message: string;
  suggestedProfessions?: string[];
  nextQuestions?: string[];
  shouldRecommendDiagnosis?: boolean;
}

/**
 * Claude API クライアントクラス
 */
export class ClaudeApiClient {
  private apiKey: string;
  private baseUrl = 'https://api.anthropic.com/v1/messages';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * 進路相談のための会話を処理
   */
  async getCareerAdvice(request: CareerAdviceRequest): Promise<CareerAdviceResponse> {
    try {
      // 本番環境ではPHPプロキシAPIを使用
      const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? this.baseUrl  // 開発環境: 直接Claude APIを呼び出し
        : '/api/chat';   // 本番環境: PHPプロキシ経由

      const lastUserMessage = request.messages
        .filter(msg => msg.role === 'user')
        .pop()?.content || '';

      console.log('API URL:', apiUrl);
      console.log('User message:', lastUserMessage);

      let response;
      
      if (apiUrl === this.baseUrl) {
        // 開発環境: 直接Claude APIを呼び出し
        const systemPrompt = this.buildSystemPrompt();
        const messages = this.buildMessages(request.messages, request.userProfile);

        response = await fetch(this.baseUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-3-haiku-20240307',
            max_tokens: 1000,
            system: systemPrompt,
            messages: messages
          })
        });

        if (!response.ok) {
          throw new Error(`Claude API error: ${response.status}`);
        }

        const data = await response.json();
        return this.parseResponse(data.content[0].text);
      } else {
        // 本番環境: PHPプロキシ経由
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: lastUserMessage
          })
        });

        if (!response.ok) {
          throw new Error(`Proxy API error: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.error || 'Unknown API error');
        }

        return this.parseResponse(data.message);
      }
    } catch (error) {
      console.error('API呼び出しエラー:', error);
      
      // エラーの場合はモックレスポンスにフォールバック
      console.log('エラーのため、モックレスポンスを使用します');
      return this.getMockResponse(request);
    }
  }

  /**
   * モックレスポンスを生成（開発・フォールバック用）
   */
  private getMockResponse(request: CareerAdviceRequest): Promise<CareerAdviceResponse> {
    // 最後のユーザーメッセージを取得
    const lastUserMessage = request.messages
      .filter(msg => msg.role === 'user')
      .pop()?.content || '';

    const responses = this.generateMockResponses(lastUserMessage);
    
    // ランダムに遅延を追加してリアルな感覚を演出
    const delay = Math.random() * 1500 + 500; // 0.5-2秒の遅延
    
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(responses);
      }, delay);
    });
  }

  /**
   * メッセージに応じたモックレスポンスを生成
   */
  private generateMockResponses(userMessage: string): CareerAdviceResponse {
    const message = userMessage.toLowerCase();

    // 職業別の詳細情報
    if (message.includes('webデザイナー') || message.includes('webデザイン')) {
      return {
        message: "Webデザイナーは、ウェブサイトやWebアプリケーションの見た目やユーザー体験をデザインする職業です。\n\n【主な仕事内容】\n・ウェブサイトのレイアウト・デザイン作成\n・UI/UXデザインの設計\n・HTML/CSS/JavaScriptでのコーディング\n・クライアントとの打ち合わせ・提案\n\n【年収】300万円～700万円（経験により大幅に変動）\n\n【必要スキル】\n・Adobe Creative Suite（Photoshop、Illustrator等）\n・HTML/CSS/JavaScript\n・デザイン理論・色彩理論\n・コミュニケーション能力\n\n【向いている人】\n・創造性とアート感覚がある\n・最新技術やトレンドに敏感\n・細かい作業に集中できる\n・ユーザーの立場で考えられる\n\nWebデザイナーを目指すなら、まずはPhotoshopとHTML/CSSの基礎から始めることをおすすめします！",
        suggestedProfessions: ["プログラマー", "ゲームクリエイター", "動画編集者"],
        nextQuestions: ["デザインやクリエイティブな作業は好きですか？", "プログラミングに興味はありますか？", "フリーランスと会社員、どちらに興味がありますか？"],
        shouldRecommendDiagnosis: false
      };
    }

    if (message.includes('プログラマー') || message.includes('プログラミング')) {
      return {
        message: "プログラマーは、コンピューターソフトウェアやアプリケーションを作る技術職です。\n\n【主な仕事内容】\n・システム開発・プログラミング\n・バグ修正・テスト\n・仕様書作成・設計\n・チームでの開発プロジェクト\n\n【年収】350万円～1000万円以上\n\n【必要スキル】\n・プログラミング言語（Java、Python、JavaScript等）\n・データベース操作\n・問題解決能力\n・論理的思考力\n\n【向いている人】\n・論理的に考えることが得意\n・新しい技術を学ぶのが好き\n・集中して作業に取り組める\n・問題を解決することに喜びを感じる\n\nIT業界は人手不足で、未経験からでも転職しやすい分野です。まずは基本的なプログラミング言語から始めてみませんか？",
        suggestedProfessions: ["Webデザイナー", "データサイエンティスト", "ゲームクリエイター"],
        nextQuestions: ["どのプログラミング言語に興味がありますか？", "Web開発とアプリ開発、どちらに興味がありますか？", "チームワークは得意ですか？"],
        shouldRecommendDiagnosis: false
      };
    }

    if (message.includes('看護師')) {
      return {
        message: "看護師は、医療チームの一員として患者さんのケアを行う専門職です。\n\n【主な仕事内容】\n・患者さんの健康状態の観察・記録\n・医師の診療補助\n・薬の管理・投与\n・患者さんや家族への説明・相談\n\n【年収】400万円～600万円\n\n【必要スキル】\n・医学・看護学の専門知識\n・コミュニケーション能力\n・体力・精神力\n・観察力・判断力\n\n【向いている人】\n・人の役に立ちたいという使命感\n・思いやりと共感力がある\n・責任感が強い\n・チームワークを大切にできる\n\n看護師は慢性的に人手不足で、就職率はほぼ100%です。人の命に関わる責任は重いですが、とてもやりがいのある職業です。",
        suggestedProfessions: ["薬剤師", "カウンセラー・心理士", "教師・講師"],
        nextQuestions: ["医療分野に興味はありますか？", "人のケアをすることに喜びを感じますか？", "夜勤や不規則な勤務は大丈夫ですか？"],
        shouldRecommendDiagnosis: false
      };
    }

    if (message.includes('カウンセラー') || message.includes('心理士') || message.includes('心理学')) {
      return {
        message: "カウンセラー・心理士は、心の悩みを抱えた人の相談に乗り、心理的支援を行う専門職です。\n\n【主な仕事内容】\n・個人やグループカウンセリング\n・心理検査・心理アセスメント\n・治療計画の立案・実施\n・危機介入・緊急対応\n・他職種との連携・コンサルテーション\n\n【年収】300万円～700万円（勤務先により大きく変動）\n\n【必要スキル】\n・心理学・カウンセリング理論の深い知識\n・傾聴・共感・受容のスキル\n・心理検査の実施・解釈能力\n・倫理観と守秘義務の徹底\n・継続的な自己研鑽・スーパービジョン\n\n【向いている人】\n・人の話を聞くことが好き\n・他者の気持ちに共感できる\n・冷静で客観的な判断ができる\n・忍耐強く、継続的に関わることができる\n・自分自身の心の健康を管理できる\n\n【活躍分野】\n・学校（スクールカウンセラー）\n・企業（産業カウンセラー）\n・病院・クリニック\n・心理相談室・開業\n\nメンタルヘルスへの関心が高まる中、需要が増加している分野です。公認心理師や臨床心理士の資格取得には大学院での専門教育が必要です。",
        suggestedProfessions: ["教師・講師", "看護師", "薬剤師"],
        nextQuestions: ["人の心理や感情に興味がありますか？", "じっくりと人の話を聞くことは得意ですか？", "学校・企業・医療、どの分野に興味がありますか？"],
        shouldRecommendDiagnosis: false
      };
    }

    if (message.includes('将来') || message.includes('わからない')) {
      return {
        message: "将来について悩むのは自然なことですね。まずは、あなたが普段興味を持って取り組んでいることや、得意だと感じることから考えてみましょう。\n\n例えば、人と話すのが好きなら営業やカウンセラー、物を作ることが好きなら技術系やクリエイティブ系の職業が向いているかもしれません。\n\n適性診断を受けることで、より具体的な方向性を見つけることができますよ。",
        suggestedProfessions: ["マーケティング・営業職", "Webデザイナー", "カウンセラー・心理士"],
        nextQuestions: ["普段どんなことに興味がありますか？", "得意だと思うことはありますか？", "どんな働き方がしたいですか？"],
        shouldRecommendDiagnosis: true
      };
    }

    if (message.includes('転職')) {
      return {
        message: "転職をお考えなんですね。現在のお仕事で培ったスキルや経験を活かせる職業を見つけることが重要です。\n\n転職を成功させるためには、自分の強みを明確にし、それを新しい職場でどう活かせるかを具体的に説明できることが大切です。\n\n今の仕事で何にやりがいを感じ、何に不満を感じているかを整理してみませんか？",
        suggestedProfessions: ["中小企業診断士", "ファイナンシャルプランナー", "プログラマー"],
        nextQuestions: ["現在のお仕事は何をされていますか？", "転職で何を重視したいですか？", "どんなスキルをお持ちですか？"],
        shouldRecommendDiagnosis: false
      };
    }

    if (message.includes('学生') || message.includes('就職')) {
      return {
        message: "就職活動は人生の大きな節目ですね。学生時代に学んだことや、アルバイトでの経験、そして何より自分の興味関心を大切にして職業を選ぶことをおすすめします。\n\n業界研究も重要ですが、まずは自分がどんな働き方をしたいか、どんな価値観を大切にしたいかを明確にすることから始めましょう。\n\n適性診断で客観的に自分の特性を知ることも、就職活動の強い味方になりますよ。",
        suggestedProfessions: ["プログラマー", "看護師", "教師・講師"],
        nextQuestions: ["どんな分野を学んでいますか？", "将来どんな働き方をしたいですか？", "人と関わる仕事と、黙々と作業する仕事、どちらが好きですか？"],
        shouldRecommendDiagnosis: true
      };
    }

    // デフォルトレスポンス
    return {
      message: "ご相談ありがとうございます。進路について考えるのは素晴らしいことですね。\n\nあなたの状況をもう少し詳しく教えていただけますか？現在の状況（学生・社会人・転職検討中など）や、どんなことに興味がおありか、お聞かせください。\n\nそれに基づいて、より具体的で役立つアドバイスをさせていただきます。",
      suggestedProfessions: [],
      nextQuestions: ["現在の状況を教えてください", "どんなことに興味がありますか？", "理想の働き方はありますか？"],
      shouldRecommendDiagnosis: false
    };
  }

  /**
   * システムプロンプトを構築
   */
  private buildSystemPrompt(): string {
    return `あなたは「ため職」という職業適性診断サービスの進路相談AIアシスタントです。

【あなたの役割】
- 学生や社会人の進路・転職に関する悩みを親身に聞き、具体的で実用的なアドバイスを提供する
- 28の職業データベース（技術・クリエイティブ系、ビジネス・金融系、医療・福祉・教育系、サービス・接客系、専門職・士業）と連携した提案
- 適切なタイミングで本格的な適性診断への誘導

【利用可能な職業カテゴリー】
1. 技術・クリエイティブ系: プログラマー、Webデザイナー、データサイエンティスト、ゲームクリエイター、動画編集者
2. ビジネス・金融系: マーケティング・営業職、中小企業診断士、ファイナンシャルプランナー、投資銀行員
3. 医療・福祉・教育系: 看護師、薬剤師、教師・講師、カウンセラー・心理士
4. サービス・接客系: 美容師・理容師、シェフ・調理師、ホテル・観光業、スポーツトレーナー
5. 専門職・士業: 公認会計士、弁護士、税理士、建築士、行政書士

【対応方針】
- 温かみのある、親しみやすい語調で応答
- 具体的で実行可能なアドバイスを提供
- ユーザーの状況に応じて段階的に質問を深掘り
- 職業提案時は年収・必要スキル・キャリアパス等の具体的情報を含める
- 迷いが深い場合は「適性診断」の受診を自然に提案

【回答形式】
JSON形式で以下の構造で回答してください：
{
  "message": "ユーザーへの具体的なアドバイス（300-500文字）",
  "suggestedProfessions": ["提案する職業名1", "職業名2"],
  "nextQuestions": ["深掘りのための質問1", "質問2"],
  "shouldRecommendDiagnosis": false
}`;
  }

  /**
   * Claude API用のメッセージ配列を構築
   */
  private buildMessages(messages: ChatMessage[], userProfile?: any): Array<{role: 'user' | 'assistant', content: string}> {
    const apiMessages: Array<{role: 'user' | 'assistant', content: string}> = [];
    
    // 既存の会話履歴を追加
    messages.forEach(msg => {
      apiMessages.push({
        role: msg.role,
        content: msg.content
      });
    });
    
    // 最初のメッセージの場合、ユーザープロフィール情報を含める
    if (messages.length === 1 && messages[0].role === 'user') {
      const profileInfo = userProfile && Object.keys(userProfile).length > 0 
        ? `\n\n[ユーザー情報: ${JSON.stringify(userProfile)}]` 
        : '';
      
      apiMessages[0] = {
        role: 'user',
        content: messages[0].content + profileInfo
      };
    }
    
    return apiMessages;
  }

  /**
   * メッセージ履歴をフォーマット（レガシー用）
   */
  private formatMessages(messages: ChatMessage[]): string {
    return messages
      .map(msg => `${msg.role === 'user' ? 'ユーザー' : 'アシスタント'}: ${msg.content}`)
      .join('\n');
  }

  /**
   * Claude APIのレスポンスをパース
   */
  private parseResponse(responseText: string): CareerAdviceResponse {
    try {
      // JSONを抽出（マークダウンのコードブロックがある場合も考慮）
      const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) || 
                       responseText.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const jsonStr = jsonMatch[1] || jsonMatch[0];
        const parsed = JSON.parse(jsonStr);
        return {
          message: parsed.message || responseText,
          suggestedProfessions: parsed.suggestedProfessions || [],
          nextQuestions: parsed.nextQuestions || [],
          shouldRecommendDiagnosis: parsed.shouldRecommendDiagnosis || false
        };
      }
    } catch (error) {
      console.warn('JSON解析に失敗、プレーンテキストとして処理:', error);
    }

    // JSONパースに失敗した場合はプレーンテキストとして処理
    return {
      message: responseText,
      suggestedProfessions: [],
      nextQuestions: [],
      shouldRecommendDiagnosis: false
    };
  }
}

/**
 * シングルトンインスタンス
 */
let claudeClientInstance: ClaudeApiClient | null = null;

export function getClaudeApiClient(): ClaudeApiClient {
  if (!claudeClientInstance) {
    const apiKey = import.meta.env.VITE_CLAUDE_API_KEY;
    console.log('環境変数確認:', {
      VITE_CLAUDE_API_KEY: apiKey ? `${apiKey.substring(0, 20)}...` : '未設定',
      isDev: import.meta.env.DEV,
      mode: import.meta.env.MODE
    });
    
    if (!apiKey) {
      throw new Error('Claude API key not found. Please set VITE_CLAUDE_API_KEY in your .env file.');
    }
    claudeClientInstance = new ClaudeApiClient(apiKey);
  }
  return claudeClientInstance;
}