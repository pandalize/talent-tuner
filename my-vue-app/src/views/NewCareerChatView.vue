<template>
  <div>
    <input v-model="userInput" placeholder="メッセージを入力" />
    <button @click="addUserMessage">送信</button>
    <!-- <button @click="callAPI">APIを呼び出す</button> -->
    <div v-if="result !== null">
      <p>APIレスポンス：{{ result }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'; // 値の変化をVueが監視し、自動でUIに反映してくれる変数を使うためにref関数をインポート
type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};
type Messages = Message[];

const userInput = ref<string>(''); // ユーザーの入力を格納する変数、初期値は空文字
const messages = ref<Messages>([]); // メッセージのリストを格納する変数、初期値は空の配列
const result = ref<null | string>(null); // APIレスポンスを格納する変数、値はnullかstring型、初期値はnull

function addUserMessage() { // 送信ボタンが押されたときに呼ばれる関数
    if (userInput.value.trim() === '') { // 入力が空文字や空白だけの場合は何もしない
        return;
    }
    const userMessage: Message = { // 新しいメッセージオブジェクトを作成
        role: 'user', // 役割は'user'
        content: userInput.value, // 内容はユーザーの入力
        timestamp: new Date() // 現在日時を設定
    };
    messages.value.push(userMessage); // 既存のメッセージリストに新しいメッセージを追加
    userInput.value = ''; // 入力欄を空にする
    console.log(messages.value); // メッセージリストをコンソールに表示（デバッグ用）
    callAPI(); // APIを呼び出す関数を実行
}

function addAIResponse(aiText: string) { // 理解してない
    const aiMessage: Message = {
        role: 'assistant',
        content: aiText, 
        timestamp: new Date()
    };
    messages.value.push(aiMessage);
    console.log(messages.value);    
}

async function callAPI() { // この関数の中に処理が完了するのを待たなければいけない作業があるかも
    try {
        const res = await fetch('/api/chat', { // fetch：サーバーレス関数のエンドポイントにリクエストを送り、結果を取ってくる、fetchが完了するまで次の処理を待つ
            method: 'POST' // HTTPメソッドはPOST
        });
        const data = await res.json(); // レスポンスをJSONとして取得、これも完了まで待つ
        if (data && data.data && data.data.content && data.data.content[0] && data.data.content[0].text) { // 一つずつ確認しないと、elseに行かずにエラーになる
            addAIResponse(data.data.content[0].text); // AIのレスポンスをメッセージリストに追加
            result.value = data.data.content[0].text; // レスポンスをJSONとして取得、これも完了まで待つ、リアクティブ変数は常に.valueを使って値を更新する
        } else {
            const fallback = String(data);
            addAIResponse(fallback);
            result.value = fallback;
        } 
    } catch (error) {
        result.value = 'APIの呼び出しに失敗しました'; // リアクティブ変数は常に.valueを使って値を更新する  
    }
}
</script>