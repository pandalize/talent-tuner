#!/usr/bin/env node
/**
 * 開発環境用 Claude API プロキシサーバー
 * CORSエラーを回避してブラウザからClaude APIにアクセス可能にする
 */

import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const app = express();
const PORT = 3001;

// ミドルウェア設定
app.use(cors());
app.use(express.json());

// .envファイルからAPIキーを読み込み
function getApiKey() {
  try {
    const envPath = resolve(process.cwd(), '.env');
    const envContent = readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    
    for (const line of lines) {
      if (line.startsWith('VITE_CLAUDE_API_KEY=')) {
        return line.substring('VITE_CLAUDE_API_KEY='.length).trim();
      }
    }
  } catch (error) {
    console.error('Error reading .env file:', error.message);
  }
  return null;
}

// レート制限管理（簡易版）
const sessions = new Map();

function checkRateLimit(sessionId) {
  const now = Date.now();
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, {
      messageCount: 0,
      messages: [],
      lastMessageTime: 0
    });
  }
  
  const session = sessions.get(sessionId);
  
  // クールダウンチェック（10秒）
  if (now - session.lastMessageTime < 10000) {
    const waitTime = Math.ceil((10000 - (now - session.lastMessageTime)) / 1000);
    return { allowed: false, error: `少しお待ちください。${waitTime}秒後に送信できます。` };
  }
  
  // セッション制限チェック（20メッセージ）
  if (session.messageCount >= 20) {
    return { allowed: false, error: 'セッションのメッセージ数上限に達しました。' };
  }
  
  // 1時間制限チェック（10メッセージ）
  const recentMessages = session.messages.filter(time => now - time < 3600000);
  if (recentMessages.length >= 10) {
    return { allowed: false, error: '1時間あたりのメッセージ数上限に達しました。' };
  }
  
  return { allowed: true };
}

function recordUsage(sessionId) {
  const now = Date.now();
  const session = sessions.get(sessionId);
  
  session.messageCount++;
  session.messages.push(now);
  session.lastMessageTime = now;
  
  // 古いメッセージ記録をクリーンアップ（24時間以上前）
  session.messages = session.messages.filter(time => now - time < 86400000);
}

// Claude API プロキシエンドポイント
app.post('/chat', async (req, res) => {
  try {
    const { message, sessionId = 'default' } = req.body;
    
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'メッセージを入力してください。'
      });
    }
    
    if (message.length > 500) {
      return res.status(400).json({
        success: false,
        error: 'メッセージは500文字以内で入力してください。'
      });
    }
    
    // レート制限チェック
    const rateCheck = checkRateLimit(sessionId);
    if (!rateCheck.allowed) {
      return res.status(429).json({
        success: false,
        error: rateCheck.error
      });
    }
    
    // APIキー確認
    const apiKey = getApiKey();
    if (!apiKey) {
      console.error('Claude API key not found in .env file');
      return res.status(500).json({
        success: false,
        error: 'API key not configured'
      });
    }
    
    // Claude API呼び出し
    const systemPrompt = `あなたは「ため職」という職業適性診断サービスの進路相談AIアシスタントです。以下の28の職業から適切な職業を提案し、具体的で実践的なアドバイスを提供してください。

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

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 800,
        temperature: 0.7,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: message
          }
        ]
      })
    });
    
    if (!response.ok) {
      console.error(`Claude API error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      
      return res.status(response.status).json({
        success: false,
        error: 'API error occurred'
      });
    }
    
    const data = await response.json();
    
    // 使用状況を記録
    recordUsage(sessionId);
    
    // 成功レスポンス
    res.json({
      success: true,
      message: data.content[0].text,
      timestamp: new Date().toISOString(),
      usage_stats: {
        session_messages: sessions.get(sessionId).messageCount,
        session_limit: 20
      }
    });
    
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// ヘルスチェックエンドポイント
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    apiKeyConfigured: !!getApiKey()
  });
});

// サーバー起動
app.listen(PORT, () => {
  const apiKey = getApiKey();
  console.log(`🚀 開発環境用Claude APIプロキシサーバーが起動しました`);
  console.log(`📡 ポート: ${PORT}`);
  console.log(`🔑 APIキー: ${apiKey ? '✅ 設定済み' : '❌ 未設定'}`);
  console.log(`🌐 ヘルスチェック: http://localhost:${PORT}/health`);
  console.log(`💬 チャットエンドポイント: http://localhost:${PORT}/chat`);
});

export default app;