<template>
  <input v-model="userInput" placeholder="メッセージを入力" />
  <button :disabled="pending" @click="onSend">送信</button>

  <div v-if="error" class="error">{{ error }}</div>

  <div class="chat-history">
    <div v-for="(msg, idx) in messages" :key="idx" :class="msg.role">
      <div>{{ msg.role === 'user' ? 'あなた' : 'AI' }}:</div>
      {{ msg.content }}
    </div>
  </div>
</template>

<script setup lang="ts">
const userInput = ref('')
const { messages, pending, error, sendMessage } = useChat()

const onSend = async () => {
  await sendMessage(userInput.value)  // インプットの値をサーバーに送信
  userInput.value = ''  // インプットをクリア
}
</script>
