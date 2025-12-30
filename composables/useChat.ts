export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp?: string
}

type ApiResponse<T> =
  | {
      success: true
      data: T
      timestamp?: string
    }
  | {
      success: false
      error: string
      timestamp?: string
    }

export const useChat = () => {
  const messages = ref<ChatMessage[]>([])
  const pending = ref(false)
  const error = ref<string | null>(null)

  const sendMessage = async (userInput: string) => {
    if (!userInput.trim()) return

    messages.value.push({ role: 'user', content: userInput, timestamp: new Date().toISOString() })
    
    error.value = null
    pending.value = true


    try {
      const res = await $fetch<ApiResponse<{ message: string }>>('/api/chat', {
        method: 'POST',
        body: { messages: messages.value.map(m => ({ role: m.role, content: m.content })) }
      })

      if (!res.success) {
        error.value = res.error ?? 'チャット応答の取得に失敗しました'
        return
      }

      const assistantText = res.data.message
      messages.value.push({ role: 'assistant', content: assistantText, timestamp: res.timestamp})
    } catch (error: any) {
      console.error('chat error:', error)
      error.value =
        error?.data?.statusMessage ??
        error?.message ??
        'チャットの取得に失敗しました'
    } finally {
      pending.value = false
    }
  }

  return { messages, pending, error, sendMessage }
}