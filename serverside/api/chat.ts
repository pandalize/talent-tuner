import type { IncomingMessage, ServerResponse } from 'http';
import type { ChatMessage } from '~/composables/useChat';

type Messages = ChatMessage[];

// Vercel の `VercelRequest` / `VercelResponse` を直接参照しないよう、
// Node の `http` 型をベースにした軽量な型を定義します。
type Req = IncomingMessage & {
    body?: any;
    headers?: IncomingMessage['headers'];
    method?: string;
    url?: string;
};
// 実行環境が Vercel のレスポンス拡張（.status/.json 等）を提供することがあるため、
// ServerResponse をベースに必要なメソッドをオプショナルで追加しておきます。
type Res = ServerResponse & {
    status: (code: number) => Res;
    json: (body: any) => void;
};

// frontend/server/api/chat.ts
export default defineEventHandler(async (event) => {
  try {
    // リクエストボディを取得
    const { messages } = await readBody(event)
    
    // ランタイム設定から秘密キーを取得
    const apiKey = useRuntimeConfig().claudeApiKey
    
    if (!apiKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Claude API key not configured'
      })
    }
    
    // Claude API呼び出し
    const externalApi = 'https://api.anthropic.com/v1/messages'
    const model = 'claude-3-5-haiku-latest'
    
    console.log(`[outgoing] POST ${externalApi} model=${model} messages=${messages?.length ?? 0}`)
    
    const claudeResponse = await fetch(externalApi, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 256
      })
    })
    
    console.log(`[outgoing] response status: ${claudeResponse.status}`)
    
    const data: any = await claudeResponse.json()
    const aiText = data?.content?.[0]?.text || ''
    
    console.log('[assistant]', data)
    
    return {
      success: true,
      message: aiText,
      timestamp: new Date().toISOString()
    }
    
  } catch (error) {
    console.error('Chat API error:', error)
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get chat response',
      data: { error: error.message }
    })
  }
})