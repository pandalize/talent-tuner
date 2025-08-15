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
  
  // レート制限設定
  private static readonly RATE_LIMITS = {
    MAX_MESSAGES_PER_SESSION: 20,     // セッションあたり最大メッセージ数
    MAX_MESSAGES_PER_HOUR: 10,        // 1時間あたり最大メッセージ数
    MAX_MESSAGES_PER_DAY: 30,         // 1日あたり最大メッセージ数
    MAX_INPUT_LENGTH: 500,             // 入力文字数制限
    MAX_OUTPUT_TOKENS: 800,            // 出力トークン制限（コスト管理）
    COOLDOWN_SECONDS: 10               // メッセージ間のクールダウン時間（秒）
  };

  // セッション管理
  private sessionStorage = {
    messageCount: 0,
    hourlyMessages: [] as number[],
    dailyMessages: [] as number[],
    lastMessageTime: 0,
    sessionStartTime: Date.now()
  };

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.loadSessionData();
  }

  /**
   * セッションデータの読み込み
   */
  private loadSessionData(): void {
    const stored = localStorage.getItem('chatbot_session');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        this.sessionStorage = {
          ...this.sessionStorage,
          ...data,
          // 古いメッセージをクリーンアップ
          hourlyMessages: (data.hourlyMessages || []).filter(
            (time: number) => Date.now() - time < 3600000 // 1時間以内
          ),
          dailyMessages: (data.dailyMessages || []).filter(
            (time: number) => Date.now() - time < 86400000 // 24時間以内
          )
        };
      } catch (e) {
        console.warn('セッションデータの読み込みに失敗:', e);
      }
    }
  }

  /**
   * セッションデータの保存
   */
  private saveSessionData(): void {
    localStorage.setItem('chatbot_session', JSON.stringify(this.sessionStorage));
  }

  /**
   * レート制限チェック
   */
  private checkRateLimit(): { allowed: boolean; reason?: string; waitTime?: number } {
    const now = Date.now();
    
    // クールダウンチェック
    const timeSinceLastMessage = (now - this.sessionStorage.lastMessageTime) / 1000;
    if (timeSinceLastMessage < ClaudeApiClient.RATE_LIMITS.COOLDOWN_SECONDS) {
      const waitTime = Math.ceil(ClaudeApiClient.RATE_LIMITS.COOLDOWN_SECONDS - timeSinceLastMessage);
      return { 
        allowed: false, 
        reason: `少しお待ちください。${waitTime}秒後に送信できます。`,
        waitTime 
      };
    }

    // セッション制限チェック
    if (this.sessionStorage.messageCount >= ClaudeApiClient.RATE_LIMITS.MAX_MESSAGES_PER_SESSION) {
      return { 
        allowed: false, 
        reason: 'セッションのメッセージ数上限に達しました。ページを更新して新しいセッションを開始してください。' 
      };
    }

    // 時間制限チェック
    const recentHourlyMessages = this.sessionStorage.hourlyMessages.filter(
      time => now - time < 3600000
    );
    if (recentHourlyMessages.length >= ClaudeApiClient.RATE_LIMITS.MAX_MESSAGES_PER_HOUR) {
      return { 
        allowed: false, 
        reason: '1時間あたりのメッセージ数上限に達しました。しばらくお待ちください。' 
      };
    }

    // 日次制限チェック
    const recentDailyMessages = this.sessionStorage.dailyMessages.filter(
      time => now - time < 86400000
    );
    if (recentDailyMessages.length >= ClaudeApiClient.RATE_LIMITS.MAX_MESSAGES_PER_DAY) {
      return { 
        allowed: false, 
        reason: '本日のメッセージ数上限に達しました。明日またお試しください。' 
      };
    }

    return { allowed: true };
  }

  /**
   * 入力検証
   */
  private validateInput(message: string): { valid: boolean; reason?: string } {
    if (!message || message.trim().length === 0) {
      return { valid: false, reason: 'メッセージを入力してください。' };
    }

    if (message.length > ClaudeApiClient.RATE_LIMITS.MAX_INPUT_LENGTH) {
      return { 
        valid: false, 
        reason: `メッセージは${ClaudeApiClient.RATE_LIMITS.MAX_INPUT_LENGTH}文字以内で入力してください。` 
      };
    }

    // 不適切なコンテンツのチェック（簡易版）
    const bannedPatterns = [
      /\b(hack|exploit|injection|malicious)\b/i,
      /<script/i,
      /javascript:/i
    ];
    
    for (const pattern of bannedPatterns) {
      if (pattern.test(message)) {
        return { valid: false, reason: '不適切な内容が含まれています。' };
      }
    }

    return { valid: true };
  }

  /**
   * 使用状況の記録
   */
  private recordUsage(): void {
    const now = Date.now();
    this.sessionStorage.messageCount++;
    this.sessionStorage.hourlyMessages.push(now);
    this.sessionStorage.dailyMessages.push(now);
    this.sessionStorage.lastMessageTime = now;
    
    // 古いエントリをクリーンアップ
    this.sessionStorage.hourlyMessages = this.sessionStorage.hourlyMessages.filter(
      time => now - time < 3600000
    );
    this.sessionStorage.dailyMessages = this.sessionStorage.dailyMessages.filter(
      time => now - time < 86400000
    );
    
    this.saveSessionData();
  }

  /**
   * 使用状況の取得（UI表示用）
   */
  public getUsageStats(): {
    sessionMessages: number;
    hourlyMessages: number;
    dailyMessages: number;
    canSendMessage: boolean;
    nextAvailableTime?: number;
  } {
    const now = Date.now();
    const hourlyMessages = this.sessionStorage.hourlyMessages.filter(
      time => now - time < 3600000
    ).length;
    const dailyMessages = this.sessionStorage.dailyMessages.filter(
      time => now - time < 86400000
    ).length;
    
    const rateCheck = this.checkRateLimit();
    
    return {
      sessionMessages: this.sessionStorage.messageCount,
      hourlyMessages,
      dailyMessages,
      canSendMessage: rateCheck.allowed,
      nextAvailableTime: rateCheck.waitTime 
        ? this.sessionStorage.lastMessageTime + (ClaudeApiClient.RATE_LIMITS.COOLDOWN_SECONDS * 1000)
        : undefined
    };
  }

  /**
   * 進路相談のための会話を処理
   */
  async getCareerAdvice(request: CareerAdviceRequest): Promise<CareerAdviceResponse> {
    try {
      // 最後のユーザーメッセージを取得
      const lastUserMessage = request.messages
        .filter(msg => msg.role === 'user')
        .pop()?.content || '';

      // 入力検証
      const validation = this.validateInput(lastUserMessage);
      if (!validation.valid) {
        return {
          message: validation.reason || 'メッセージの送信に失敗しました。',
          suggestedProfessions: [],
          nextQuestions: [],
          shouldRecommendDiagnosis: false
        };
      }

      // レート制限チェック
      const rateCheck = this.checkRateLimit();
      if (!rateCheck.allowed) {
        return {
          message: rateCheck.reason || 'メッセージの送信制限に達しました。',
          suggestedProfessions: [],
          nextQuestions: [],
          shouldRecommendDiagnosis: false
        };
      }

      // 本番環境ではPHPプロキシAPIを使用
      const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? this.baseUrl  // 開発環境: 直接Claude APIを呼び出し
        : '/api/chat-proxy.php';   // 本番環境: PHPプロキシ経由

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
            model: 'claude-3-5-sonnet-20241022',  // 最新のSonnetモデルに更新
            max_tokens: ClaudeApiClient.RATE_LIMITS.MAX_OUTPUT_TOKENS,
            system: systemPrompt,
            messages: messages,
            temperature: 0.7  // より自然な応答のため
          })
        });

        if (!response.ok) {
          throw new Error(`Claude API error: ${response.status}`);
        }

        const data = await response.json();
        
        // 使用状況を記録
        this.recordUsage();
        
        return this.parseResponse(data.content[0].text);
      } else {
        // 本番環境: PHPプロキシ経由
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: lastUserMessage,
            sessionId: this.sessionStorage.sessionStartTime,  // セッション識別用
            messageCount: this.sessionStorage.messageCount
          })
        });

        if (!response.ok) {
          throw new Error(`Proxy API error: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.success) {
          // レート制限エラーの場合
          if (data.error?.includes('rate limit')) {
            return {
              message: 'メッセージ送信制限に達しました。しばらくお待ちください。',
              suggestedProfessions: [],
              nextQuestions: [],
              shouldRecommendDiagnosis: false
            };
          }
          throw new Error(data.error || 'Unknown API error');
        }

        // 使用状況を記録
        this.recordUsage();

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
以下の28の職業から適切な職業を提案し、具体的で実践的なアドバイスを提供してください。

【対応職業一覧】
プログラマー、Webデザイナー、グラフィックデザイナー、公認会計士、税理士、建設業、製造業、起業家、経営コンサルタント、営業職、建築士、保育士、看護師、教師、社会福祉士、カウンセラー・心理士、研究者、データサイエンティスト、マーケティング、広告・PR、エンジニア、医師、薬剤師、獣医師、弁護士、公務員、金融、不動産

【回答方針】
1. 相談者の状況を理解し共感を示す
2. 具体的な職業を1-3個提案
3. その理由を明確に説明
4. 必要なスキルやキャリアパスを説明
5. 次のステップを具体的に提示
6. 親しみやすく励ます口調で回答

【注意事項】
- 回答は400文字以内で簡潔にまとめる
- 具体的で実行可能なアドバイスを提供
- 年収や労働環境などの現実的な情報も含める
- 適性診断の受診も適宜提案する`;
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