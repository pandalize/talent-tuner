<template>
  <div>
    <input v-model="userInput" placeholder="メッセージを入力" />
    <button @click="addUserMessage">送信</button>
    <!-- <button @click="callAPI">APIを呼び出す</button> -->
    <div class="chat-history">
      <div v-for="(msg, idx) in messages" :key="idx" :class="msg.role"> <!-- messages 配列の要素を1つずつ msg という変数で取り出し、idx をインデックスとして使う、msg.roleをクラス名としてdivに付与 -->
        <div>{{ msg.role === 'user' ? 'あなた' : 'AI' }}:</div> <!-- メッセージの送り主がユーザーならtrueであなたと表示、falseならAIと表示 -->
        {{ msg.content }}
      </div>
    </div>
    <!-- <div v-if="result !== null">
      <p>APIレスポンス：{{ result }}</p>
    </div> -->
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
    callAPI(); // APIを呼び出す関数を実行
}

function addaiResponse(aiText: string) { // addUserMessageと同様
    const aiResponse: Message = {
        role: 'assistant',
        content: aiText,
        timestamp: new Date()
    };
    messages.value.push(aiResponse);
}

async function callAPI() { // この関数の中に処理が完了するのを待たなければいけない作業があるかも
    try {
        const apiMessages = messages.value.map(m => ({ // messages.value配列の各要素(m)に対して新しいオブジェクトを作成、各要素を受け取ってroleとcontentだけを返す
            role: m.role,
            content: m.content
        }));
        const apiBase = import.meta.env.VITE_API_BASE ?? ''; // 存在しないまま使うと空文字になる仕様は良いのか？
        const url = `${apiBase}/api/chat`; // サーバーレス関数のエンドポイントURLを作成
        const res = await fetch(url, { // fetch：サーバーレス関数のエンドポイントにリクエストを送り、結果を取ってくる、fetchが完了するまで次の処理を待つ
            method: 'POST', // HTTPメソッドはPOST
            headers: { 'Content-Type': 'application/json' }, // JSON形式のデータを送ることを指定
            body: JSON.stringify({ messages: apiMessages }) // messagesプロパティで内容をセットでJSON形式の文字列に変換してリクエストボディにセット
        });
        
        const aiText = await res.json(); // レスポンスをJSONとして取得、これも完了まで待つ
        addaiResponse(aiText); // AIのレスポンスをメッセージリストに追加
        result.value = aiText; // レスポンスをJSONとして取得、これも完了まで待つ、リアクティブ変数は常に.valueを使って値を更新する
        console.log(messages.value)
    } catch (error) {
        result.value = 'APIの呼び出しに失敗しました'; // リアクティブ変数は常に.valueを使って値を更新する  
    }
}
</script>