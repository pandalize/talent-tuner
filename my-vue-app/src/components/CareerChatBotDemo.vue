<template>
  <div class="career-chat-bot-demo">
    <div class="chat-header">
      <div class="bot-avatar">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7A1,1 0 0,0 14,8H18A4,4 0 0,1 22,12V16A4,4 0 0,1 18,20H6A4,4 0 0,1 2,16V12A4,4 0 0,1 6,8H10A1,1 0 0,0 11,7V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A1.5,1.5 0 0,0 6,14.5A1.5,1.5 0 0,0 7.5,16A1.5,1.5 0 0,0 9,14.5A1.5,1.5 0 0,0 7.5,13M16.5,13A1.5,1.5 0 0,0 15,14.5A1.5,1.5 0 0,0 16.5,16A1.5,1.5 0 0,0 18,14.5A1.5,1.5 0 0,0 16.5,13Z" />
        </svg>
      </div>
      <div class="bot-info">
  <h3>進路相談アシスタント</h3>
      </div>
      <button class="close-chat" @click="$emit('close')" aria-label="チャットを閉じる">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
        </svg>
      </button>
    </div>

    <div class="chat-messages" ref="messagesContainer">
      <div class="welcome-message" v-if="messages.length === 0">
        <div class="message bot-message">
          <div class="message-content">
            <p>こんにちは！進路相談アシスタントです！</p>
          </div>
        </div>
        <div class="quick-options">
          <button 
            v-for="option in quickStartOptions" 
            :key="option.text"
            @click="sendQuickOption(option)"
            class="quick-option-btn"
          >
            {{ option.text }}
          </button>
        </div>
      </div>

      <div 
        v-for="(message, index) in messages" 
        :key="index"
        class="message"
        :class="{ 'user-message': message.role === 'user', 'bot-message': message.role === 'assistant' }"
      >
        <div class="message-content">
          <p v-html="formatMessage(message.content)"></p>
          <span class="message-time">{{ formatTime(message.timestamp) }}</span>
        </div>
      </div>

      <!-- 職業提案カード -->
      <div v-if="showSuggestedProfessions && suggestedProfessions.length > 0" class="profession-suggestions">
        <h4>💼 おすすめの職業</h4>
        <div class="profession-cards">
          <div 
            v-for="profession in suggestedProfessions" 
            :key="profession"
            class="profession-card"
            @click="exploreProfession(profession)"
          >
            <span class="profession-name">{{ profession }}</span>
            <svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- 次の質問候補 -->
      <div v-if="showNextQuestions && nextQuestions.length > 0" class="next-questions">
        <p class="questions-label">💭 こんなことも聞かせてください：</p>
        <div class="question-buttons">
          <button 
            v-for="question in nextQuestions" 
            :key="question"
            @click="askQuestion(question)"
            class="question-btn"
          >
            {{ question }}
          </button>
        </div>
      </div>

      <!-- 診断推奨バナー -->
      <div v-if="shouldShowDiagnosisRecommendation" class="diagnosis-recommendation">
        <div class="recommendation-content">
          <h4>🎯 より詳しく適性を知りたい方へ</h4>
          <p>科学的な適性診断で、あなたにぴったりの職業を発見しませんか？</p>
          <div class="recommendation-actions">
            <router-link to="/diagnosis" class="diagnosis-btn">
              適性診断を受ける
            </router-link>
            <button @click="dismissDiagnosisRecommendation" class="dismiss-btn">
              後で
            </button>
          </div>
        </div>
      </div>

      <!-- タイピングインジケーター -->
      <div v-if="isTyping" class="message bot-message typing-indicator">
        <div class="message-content">
          <div class="typing-animation">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>

    <div class="chat-input">
      <div class="input-container">
        <textarea
          v-model="currentMessage"
          @keydown="handleKeyDown"
          @input="adjustTextareaHeight"
          ref="messageInput"
          placeholder="進路について相談したいことを入力してください..."
          rows="1"
          :disabled="isTyping"
        ></textarea>
        <button 
          @click="sendMessage" 
          :disabled="!currentMessage.trim() || isTyping"
          class="send-btn"
          aria-label="メッセージを送信"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

// エミット定義
defineEmits<{
  close: []
}>()

// メッセージ型定義
interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

// リアクティブデータ
const messages = ref<ChatMessage[]>([])
const currentMessage = ref('')
const isTyping = ref(false)
const messagesContainer = ref<HTMLElement>()
const messageInput = ref<HTMLTextAreaElement>()

// AI回答から抽出した情報
const suggestedProfessions = ref<string[]>([])
const nextQuestions = ref<string[]>([])
const shouldShowDiagnosisRecommendation = ref(false)
const showSuggestedProfessions = ref(false)
const showNextQuestions = ref(false)

// クイックスタートオプション
const quickStartOptions = [
  { text: '将来何をしたいかわからない', content: '将来何をしたいかわからなくて悩んでいます。どうやって進路を考えればいいでしょうか？' },
  { text: '部活やサークルでの悩み', content: '部活やサークル活動での人間関係や役割について悩んでいます。どうしたら良いでしょうか？' },
  { text: '進路選択で迷っています', content: '文系・理系や将来の進路選択で迷っています。どのように考えれば良いでしょうか？' },
  { text: '就職活動の相談', content: '就職活動中ですが、どの業界・職種を選べばいいか迷っています。' }
]

// デモ用の事前定義レスポンス
const demoResponses: Record<string, {
  message: string
  suggestedProfessions: string[]
  nextQuestions: string[]
}> = {
  '将来何をしたいかわからなくて悩んでいます。どうやって進路を考えればいいでしょうか？': {
    message: `将来への不安を感じられているのですね。これは多くの方が経験する自然な悩みです。🌟

**まずは自己理解から始めましょう：**
• あなたが自然と時間を忘れて取り組めることは何ですか？
• 周りの人から「得意だね」と言われることはありますか？
• どんな環境で働いているときに、最もエネルギーを感じますか？

**進路を考える3つのステップ：**
1. **興味・価値観の探索** - 何に心が動くか観察する
2. **スキル・強みの棚卸し** - これまでの経験を振り返る  
3. **情報収集と体験** - 気になる分野について調べ、可能なら体験する

焦らず、小さな一歩から始めることが大切です。まずは、どの分野に興味をお持ちか、お聞かせください。`,
    suggestedProfessions: ['ITエンジニア', 'デザイナー', '営業・販売', '事務・企画'],
    nextQuestions: ['どんなことをしているときが一番楽しいですか？', '人と関わる仕事と一人で集中する仕事、どちらが向いていると思いますか？']
  },
  '転職を考えているのですが、自分に合う職業がわからず迷っています。': {
    message: `転職を検討されているとのこと、新しいキャリアへの一歩を踏み出そうとする勇気は素晴らしいですね！💪

**転職成功のための戦略的アプローチ：**

**1. 現状分析**
• 現在の仕事で満足している点・不満な点を整理
• 転職で解決したい課題を明確化（給与、働き方、やりがいなど）

**2. 市場価値の把握**
• これまでの経験・スキルを棚卸し
• 転職市場での需要が高い分野をリサーチ
• 必要に応じてスキルアップの計画を立案

**3. 段階的なキャリアチェンジ**
• 急激な業界転換よりも、スキルを活かせる隣接分野から検討
• 副業や学習を通じて新分野への適性を確認

現在どのような業界・職種にいらして、どんな点を改善したいと考えていますか？`,
    suggestedProfessions: ['Webマーケティング', 'プロジェクトマネージャー', 'ITコンサルタント', '営業企画'],
    nextQuestions: ['現在の職種で一番やりがいを感じる業務は何ですか？', '転職で最も重視したいのは、給与・働き方・やりがいのうちどれですか？']
  },
  '今の仕事に不満を感じていて、自分に本当に合う職業を見つけたいです。': {
    message: `仕事への不満を感じながらも、より良いキャリアを求める姿勢は前向きで素晴らしいです！✨

**不満から理想の仕事を見つけるプロセス：**

**Step 1: 不満の根本原因を特定**
• 人間関係、業務内容、労働条件、成長機会など、具体的に何が問題か
• それぞれの重要度を整理（最も改善したいものから優先順位付け）

**Step 2: 理想の働き方を描く**
• どんな環境で働きたいか（チーム vs 個人、オフィス vs リモートなど）
• どんな価値を提供したいか（人の役に立つ、創造的、社会貢献など）
• どんな成長を望むか（専門性向上、マネジメント、起業など）

**Step 3: 適性の再発見**
• これまでの経験で「やってて良かった」と感じた瞬間を思い出す
• 周囲から評価された実績や得意分野を振り返る

現在の仕事で特にストレスを感じるのはどの部分でしょうか？`,
    suggestedProfessions: ['Webデザイナー', 'カスタマーサクセス', 'セールスエンジニア', 'フリーランス'],
    nextQuestions: ['現在の職場環境で一番改善したいことは何ですか？', '理想の一日の働き方はどのようなものですか？']
  },
  '就職活動中ですが、どの業界・職種を選べばいいか迷っています。': {
    message: `就職活動お疲れ様です！業界・職種選びは人生の重要な決断の一つですが、焦らず戦略的に進めましょう。🎯

**就活成功のための業界・職種選び：**

**1. 自己分析の深掘り**
• 学生時代に力を入れたこと（学業、サークル、アルバイト）から強みを抽出
• 興味のある分野と将来の目標を整理
• 働く上で大切にしたい価値観を明確化

**2. 業界研究のポイント**
• 成長性：今後10年の市場動向
• 安定性：景気変動への耐性
• 働き方：ライフワークバランス、キャリアパス

**3. 職種の特性理解**
• 営業：人との関わり、目標達成の醍醐味
• 企画：創造性、戦略思考
• エンジニア：論理性、技術への興味
• 管理部門：正確性、組織運営への貢献

**おすすめアプローチ：**
まずは興味のある業界を2-3つに絞り、それぞれで説明会やOB/OG訪問を実施してみてください。

どの分野に興味をお持ちですか？また、大学での専攻は何でしょうか？`,
    suggestedProfessions: ['システムエンジニア', 'デジタルマーケティング', '法人営業', '経営企画'],
    nextQuestions: ['大学で学んでいることを活かせる職種に興味がありますか？', '安定性と成長性、どちらを重視したいですか？']
  },
  'ITエンジニアについて詳しく教えてください。': {
    message: `ITエンジニアに興味をお持ちいただき、ありがとうございます！現代社会を支える重要な職業の一つですね。🖥️

**ITエンジニアの主な職種：**

**1. システムエンジニア（SE）**
• 顧客のニーズを聞いて、システム設計・開発を行う
• 年収：400万～800万円（経験によりそれ以上も）
• 必要スキル：プログラミング、コミュニケーション能力

**2. プログラマー**
• 実際にコードを書いてソフトウェアを作成
• 年収：300万～600万円
• 必要スキル：Java、Python、JavaScriptなどの言語

**3. Webエンジニア**
• WebサイトやWebアプリケーションを開発
• 年収：350万～700万円
• 必要スキル：HTML/CSS、JavaScript、データベース

**4. インフラエンジニア**
• サーバーやネットワークの構築・運用
• 年収：400万～750万円
• 必要スキル：Linux、AWS、ネットワーク知識

**ITエンジニアの魅力：**
✅ 手に職をつけられる専門性
✅ リモートワークしやすい環境
✅ 継続的な学習でスキルアップ可能
✅ 転職市場での需要が高い

**未経験から始めるには：**
• プログラミングスクールでの学習
• 独学（オンライン教材、書籍）
• 未経験可の求人への応募

どの分野のITエンジニアに特に興味がありますか？`,
    suggestedProfessions: ['システムエンジニア', 'Webエンジニア', 'プログラマー', 'インフラエンジニア'],
    nextQuestions: ['プログラミング経験はありますか？', '理系・文系どちらの出身ですか？', 'どのようなアプリやシステムを作ってみたいですか？']
  }
}

// 汎用的なデモレスポンス
const genericDemoResponse = {
  message: `ご質問ありがとうございます！😊

申し訳ございませんが、このデモ版では限定的な質問にのみ対応しています。

**デモで体験できる相談内容：**
• 将来何をしたいかわからない悩み
• 転職に関する相談
• 現在の仕事への不満
• 就職活動の進め方

より詳しいご相談をお希望の場合は、実際のAI進路相談サービスをご利用ください。
適性診断と組み合わせることで、より具体的なアドバイスを受けることができます。`,
  suggestedProfessions: ['一般事務', '接客・販売', 'ITサポート', '企画アシスタント'],
  nextQuestions: ['適性診断を受けてみませんか？', '上記のよくある質問から選んでみてください']
}

/**
 * クイックオプションを送信
 */
function sendQuickOption(option: { text: string, content: string }) {
  sendUserMessage(option.content)
}

/**
 * メッセージを送信
 */
async function sendMessage() {
  if (!currentMessage.value.trim() || isTyping.value) return
  
  await sendUserMessage(currentMessage.value.trim())
  currentMessage.value = ''
  resetTextareaHeight()
}

/**
 * ユーザーメッセージを送信してデモ回答を取得
 */
async function sendUserMessage(content: string) {
  // ユーザーメッセージを追加
  const userMessage: ChatMessage = {
    role: 'user',
    content,
    timestamp: new Date()
  }
  messages.value.push(userMessage)
  
  // 自動スクロール
  await nextTick()
  scrollToBottom()
  
  // デモ回答を取得
  await getDemoResponse(content)
}

/**
 * デモ回答を取得
 */
async function getDemoResponse(userContent: string) {
  isTyping.value = true
  
  // 提案情報を非表示にする
  showSuggestedProfessions.value = false
  showNextQuestions.value = false
  
  // タイピング効果のための遅延（少し長めに設定）
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000))
  
  try {
    // デモレスポンスまたは汎用レスポンスを取得
    const response = demoResponses[userContent] || genericDemoResponse
    
    // タイピングインジケーターを非表示にして、メッセージ表示開始
    isTyping.value = false
    
    // 一時的なメッセージを追加（文字アニメーション用）
    const tempMessage: ChatMessage = {
      role: 'assistant',
      content: '',
      timestamp: new Date()
    }
    messages.value.push(tempMessage)
    
    // 文字を一文字ずつ表示
    await typeMessage(response.message, messages.value.length - 1)
    
    // メッセージ表示完了後に提案情報を表示
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // 提案情報を更新
    suggestedProfessions.value = response.suggestedProfessions || []
    nextQuestions.value = response.nextQuestions || []
    
    // アニメーションで表示
    if (suggestedProfessions.value.length > 0) {
      showSuggestedProfessions.value = true
      await nextTick()
      scrollToBottom()
      await new Promise(resolve => setTimeout(resolve, 400))
    }
    
    if (nextQuestions.value.length > 0) {
      showNextQuestions.value = true
      await nextTick()
      scrollToBottom()
    }
    
    // ランダムで診断推奨を表示
    if (Math.random() > 0.7) {
      shouldShowDiagnosisRecommendation.value = true
    }
    
  } finally {
    await nextTick()
    scrollToBottom()
  }
}

/**
 * 文字を一文字ずつタイプする効果
 */
async function typeMessage(fullMessage: string, messageIndex: number) {
  const chars = fullMessage.split('')
  let currentText = ''
  
  for (let i = 0; i < chars.length; i++) {
    currentText += chars[i]
    
    // メッセージを更新
    if (messages.value[messageIndex]) {
      messages.value[messageIndex].content = currentText
    }
    
    // スクロールを維持
    await nextTick()
    scrollToBottom()
    
    // 文字間の遅延（改行やスペースの場合は短く、通常の文字は少し長く）
    const delay = chars[i] === '\n' || chars[i] === ' ' ? 10 : 25 + Math.random() * 20
    await new Promise(resolve => setTimeout(resolve, delay))
  }
}

/**
 * 職業を探索
 */
function exploreProfession(professionName: string) {
  sendUserMessage(`${professionName}について詳しく教えてください。`)
}

/**
 * 質問を送信
 */
function askQuestion(question: string) {
  sendUserMessage(question)
  nextQuestions.value = []
  showNextQuestions.value = false
}

/**
 * 診断推奨を非表示
 */
function dismissDiagnosisRecommendation() {
  shouldShowDiagnosisRecommendation.value = false
}

/**
 * 最下部にスクロール
 */
function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

/**
 * 時刻フォーマット
 */
function formatTime(timestamp: Date): string {
  return timestamp.toLocaleTimeString('ja-JP', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

/**
 * メッセージフォーマット（マークダウン風の変換）
 */
function formatMessage(content: string): string {
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>')
}

/**
 * キーボードイベント処理
 */
function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    sendMessage()
  }
}

/**
 * テキストエリアの高さ調整
 */
function adjustTextareaHeight() {
  const textarea = messageInput.value
  if (textarea) {
    textarea.style.height = 'auto'
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
  }
}

/**
 * テキストエリアの高さリセット
 */
function resetTextareaHeight() {
  const textarea = messageInput.value
  if (textarea) {
    textarea.style.height = 'auto'
  }
}
</script>

<style scoped lang="scss">
// 既存のCareerChatBot.vueと同じスタイルを継承
// ただし、デモ版特有のスタイルを追加

.career-chat-bot-demo {
  display: flex;
  flex-direction: column;
  height: 600px;
  max-height: 80vh;
  background: var(--bg-primary);
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15), 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-light);
  overflow: hidden;
  position: relative;
}

.demo-notice {
  background: linear-gradient(135deg, #fff3cd, #ffeaa7);
  border: 1px solid #e6cc00;
  border-radius: 8px;
  padding: var(--space-sm);
  margin-top: var(--space-md);
  font-size: 0.875rem;
  color: #856404;
}

.chat-header {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg);
  background: linear-gradient(135deg, var(--bg-primary) 0%, rgba(248, 250, 252, 0.8) 100%);
  border-bottom: 1px solid var(--border-light);
  backdrop-filter: blur(10px);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent-blue), transparent);
    opacity: 0.5;
  }
}

.bot-avatar {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, var(--accent-blue), var(--primary-blue));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

.bot-info {
  flex: 1;
  min-width: 0;
}

.bot-info h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--primary-navy);
  font-family: var(--font-heading);
}

.bot-status {
  margin: 2px 0 0 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
  transition: all var(--transition-normal);
  
  &.typing {
    color: var(--accent-blue);
    font-style: italic;
  }
}

.close-chat {
  width: 32px;
  height: 32px;
  background: transparent;
  border: 1px solid var(--border-light);
  border-radius: 50%;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-normal);
  flex-shrink: 0;
  
  &:hover {
    background: var(--bg-secondary);
    border-color: var(--accent-red);
    color: var(--accent-red);
  }
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.welcome-message {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.message {
  display: flex;
  animation: slideIn 0.3s ease-out;
  
  &.user-message {
    justify-content: flex-end;
    
    .message-content {
      background: linear-gradient(135deg, var(--accent-blue), var(--primary-blue));
      color: white;
      border-radius: 18px 18px 4px 18px;
      max-width: 80%;
    }
  }
  
  &.bot-message {
    justify-content: flex-start;
    
    .message-content {
      background: var(--bg-secondary);
      color: var(--text-primary);
      border: 1px solid var(--border-light);
      border-radius: 18px 18px 18px 4px;
      max-width: 85%;
    }
  }
}

.message-content {
  padding: var(--space-md) var(--space-lg);
  position: relative;
  
  p {
    margin: 0 0 var(--space-sm) 0;
    line-height: 1.6;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.message-time {
  font-size: 0.75rem;
  opacity: 0.6;
  display: block;
  margin-top: var(--space-xs);
}

.quick-options {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.quick-option-btn {
  background: linear-gradient(135deg, var(--bg-primary), var(--bg-secondary));
  border: 2px solid var(--border-light);
  border-radius: 12px;
  padding: var(--space-md) var(--space-lg);
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-normal);
  text-align: left;
  
  &:hover {
    background: linear-gradient(135deg, var(--accent-blue), var(--primary-blue));
    color: white;
    border-color: var(--accent-blue);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
  }
}

.profession-suggestions {
  margin: var(--space-md) 0;
  animation: slideInUp 0.5s ease-out;
  
  h4 {
    margin: 0 0 var(--space-sm) 0;
    font-size: 1rem;
    color: var(--primary-navy);
  }
}

.profession-cards {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.profession-card {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  background: linear-gradient(135deg, var(--accent-gold), #f39c12);
  color: white;
  padding: var(--space-xs) var(--space-sm);
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-normal);
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(243, 156, 18, 0.4);
  }
}

.next-questions {
  margin: var(--space-md) 0;
  animation: slideInUp 0.5s ease-out;
  
  .questions-label {
    margin: 0 0 var(--space-sm) 0;
    font-size: 0.9375rem;
    color: var(--text-secondary);
    font-weight: 500;
  }
}

.question-buttons {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.question-btn {
  background: rgba(52, 152, 219, 0.1);
  border: 1px solid rgba(52, 152, 219, 0.3);
  border-radius: 8px;
  padding: var(--space-sm) var(--space-md);
  font-size: 0.875rem;
  color: var(--accent-blue);
  cursor: pointer;
  transition: all var(--transition-normal);
  text-align: left;
  
  &:hover {
    background: rgba(52, 152, 219, 0.2);
    border-color: var(--accent-blue);
  }
}

.diagnosis-recommendation {
  margin: var(--space-md) 0;
  padding: var(--space-md);
  background: linear-gradient(135deg, var(--accent-blue) 0%, var(--primary-navy) 100%);
  color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

.recommendation-content h4 {
  margin: 0 0 var(--space-xs) 0;
  font-size: 1.1rem;
}

.recommendation-content p {
  margin: 0 0 var(--space-md) 0;
  opacity: 0.9;
  line-height: 1.5;
}

.recommendation-actions {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.diagnosis-btn {
  background: white;
  color: var(--primary-navy);
  padding: var(--space-sm) var(--space-md);
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all var(--transition-fast);
  display: inline-block;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(255, 255, 255, 0.3);
  }
}

.dismiss-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: var(--space-sm) var(--space-md);
  border-radius: 8px;
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
}

.typing-indicator .message-content {
  padding: var(--space-md);
}

.typing-animation {
  display: flex;
  gap: 4px;
  align-items: center;
}

.typing-animation span {
  width: 8px;
  height: 8px;
  background: var(--text-secondary);
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-animation span:nth-child(1) { animation-delay: -0.32s; }
.typing-animation span:nth-child(2) { animation-delay: -0.16s; }

.chat-input {
  padding: var(--space-md);
  border-top: 1px solid var(--border-light);
  background: var(--bg-primary);
}

.input-container {
  display: flex;
  gap: var(--space-sm);
  align-items: flex-end;
}

.input-container textarea {
  flex: 1;
  min-width: 0;
  border: 2px solid var(--border-light);
  border-radius: 12px;
  padding: var(--space-sm) var(--space-md);
  font-size: clamp(0.75rem, 2vw, 0.875rem);
  font-family: inherit;
  line-height: 1.5;
  resize: none;
  min-height: 44px;
  max-height: 120px;
  transition: border-color var(--transition-fast);
  background: var(--bg-primary);
  color: var(--text-primary);
  box-sizing: border-box;
  overflow-y: hidden;
}

.input-container textarea:not(:placeholder-shown) {
  overflow-y: auto;
}

.input-container textarea::placeholder {
  font-size: clamp(0.7rem, 1.8vw, 0.85rem);
  color: var(--text-secondary);
  opacity: 0.7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.input-container textarea:focus {
  outline: none;
  border-color: var(--primary-navy);
}

.input-container textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.send-btn {
  width: 44px;
  height: 44px;
  background: var(--primary-navy);
  border: none;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  flex-shrink: 0;
  
  &:hover:not(:disabled) {
    background: var(--primary-blue);
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
}

.input-hint {
  margin: var(--space-xs) 0 0 0;
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-align: center;
  font-style: italic;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes typing {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// レスポンシブ対応
@media (max-width: 768px) {
  .career-chat-bot-demo {
    height: 100%;
    max-height: 100%;
    border-radius: 0;
  }
  
  .chat-header {
    padding: var(--space-md);
  }
  
  .chat-messages {
    padding: var(--space-md);
  }
  
  .message-content {
    padding: var(--space-sm) var(--space-sm);
  }
  
  .quick-option-btn {
    padding: var(--space-sm) var(--space-md);
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  .input-container textarea {
    font-size: 14px;
    min-height: 40px;
    padding: 10px 12px;
    line-height: 1.3;
  }
  
  .input-container textarea::placeholder {
    font-size: calc(10px + 0.5vw);
    letter-spacing: -0.02em;
  }
  
  .send-btn {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 360px) {
  .input-container textarea {
    font-size: 13px;
    min-height: 38px;
    padding: 8px 10px;
  }
  
  .input-container textarea::placeholder {
    font-size: 10.5px;
  }
}

@media (max-width: 320px) {
  .input-container textarea::placeholder {
    font-size: 10px;
    letter-spacing: -0.03em;
  }
}
</style>