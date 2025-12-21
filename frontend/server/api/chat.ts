type Message = {
    role: 'user' | 'assistant';
    content: string;
    timestamp?: string;
};

type ChatRequestBody = {
    messages: Message[]
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const apiKey = config.claudeApiKey
    const body = await readBody<ChatRequestBody>(event)
    const model = 'claude-3-5-haiku-latest';
    try {
        const data:any = await $fetch('https://api.anthropic.com/v1/messages', { // ClaudeのAPIエンドポイントにリクエストを送り、結果を取ってくる
            method: 'POST', // HTTPメソッドはPOST
            headers: {
                'x-api-key': apiKey,
                'Content-Type': 'application/json',
                'anthropic-version': '2023-06-01', // 使用するAPIバージョンを指定
            },
            body: { // オブジェクトや配列をJSON形式の文字列に変換してリクエストボディにセット
                model,
                messages: body.messages,
                max_tokens: 256,
            },
        })

        // 型チェックでエラーにならないよう any にしてから抽出
        const aiText: string = data.content[0].text; // レスポンスからテキストを抽出
        return { success:true, data:{ message: aiText }, timestamp: new Date().toISOString() };
    } catch (error) {
        throw createError({
            statusCode: 502,
            statusMessage: '外部APIの呼び出しに失敗しました',
        })
    }
})