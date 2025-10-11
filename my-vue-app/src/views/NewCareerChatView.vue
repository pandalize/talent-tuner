<template>
  <div>
    <button @click="callAPI">APIを呼び出す</button>
    <div v-if="result !== null">
      <p>APIレスポンス：{{ result }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'; // 値の変化をVueが監視し、自動でUIに反映してくれる変数を使うためにref関数をインポート
const result = ref<null | string>(null); // APIレスポンスを格納する変数、値はnullかstring型、初期値はnull
async function callAPI() { // この関数の中に処理が完了するのを待たなければいけない作業があるかも
    try {
        const res = await fetch('/api/chat', { // fetch：サーバーレス関数のエンドポイントにリクエストを送り、結果を取ってくる、fetchが完了するまで次の処理を待つ
            method: 'POST' // HTTPメソッドはPOST
        })
        result.value = await res.json() // レスポンスをJSONとして取得、これも完了まで待つ、リアクティブ変数は常に.valueを使って値を更新する
    } catch (error) {
        result.value = 'APIの呼び出しに失敗しました'; // リアクティブ変数は常に.valueを使って値を更新する  
    }
}
</script>