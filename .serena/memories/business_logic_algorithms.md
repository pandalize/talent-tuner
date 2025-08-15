# ビジネスロジック・アルゴリズム

## 職業適性診断アルゴリズム

### 診断フロー
1. **質問提示**: 4カテゴリー × 4質問 = 16問
2. **回答収集**: 5段階リッカート尺度（1-5）
3. **スコア計算**: 重み付きカテゴリー別スコアリング
4. **職業マッチング**: 28職業との適合度計算
5. **結果表示**: 上位N件の職業推奨

### カテゴリー構造
```typescript
// 4つの診断カテゴリー
1. skills (スキル): 技術的能力・専門性
2. interest (興味): 業務内容への関心度  
3. priority (優先事項): 働く上で重視する価値
4. balance (バランス): ワークライフバランス志向
```

### スコアリングアルゴリズム
```typescript
// src/utils/diagnosisLoader.ts
function calculateProfessionScores(answers, config) {
  // 1. カテゴリー別スコア計算
  const categoryScores = {
    skills: calculateCategoryScore(answers, 'skills'),
    interest: calculateCategoryScore(answers, 'interest'), 
    priority: calculateCategoryScore(answers, 'priority'),
    balance: calculateCategoryScore(answers, 'balance')
  }
  
  // 2. 職業別適合度計算
  for (const profession of professions) {
    let totalScore = 0;
    for (const category in categoryScores) {
      const weight = config.category_weights[category];
      const professionWeight = profession.categories[category];
      totalScore += categoryScores[category] * weight * professionWeight;
    }
    profession.score = totalScore;
  }
  
  // 3. スコア降順ソート
  return professions.sort((a, b) => b.score - a.score);
}
```

## データ構造

### 診断設定（diagnostic_config.json）
```json
{
  "recommend_top_n": 3,
  "category_weights": {
    "skills": 0.3,
    "interest": 0.25, 
    "priority": 0.25,
    "balance": 0.2
  },
  "questions": [
    {
      "id": 1,
      "category": "skills",
      "text": "技術的な問題解決が得意ですか？",
      "options": [
        {"value": 1, "text": "全く当てはまらない"},
        {"value": 5, "text": "非常に当てはまる"}
      ]
    }
  ]
}
```

### 職業データ（professions.json）
```json
{
  "programmer": {
    "id": "programmer",
    "name": "プログラマー",
    "categories": {
      "skills": 0.9,     // 高い技術的スキル要求
      "interest": 0.8,   // 論理的思考への興味
      "priority": 0.6,   // 成長機会重視
      "balance": 0.7     // リモートワーク可能
    },
    "salary_range": "400-800万円",
    "description": "システム開発・プログラミング",
    "required_skills": ["プログラミング言語", "論理的思考"],
    "career_path": ["ジュニア開発者", "シニア開発者", "テックリード"]
  }
}
```

## Claude AI進路相談アルゴリズム

### システムプロンプト設計
```typescript
// 28職業データベース連携プロンプト
const SYSTEM_PROMPT = `
あなたは進路相談の専門家です。
以下の28職業から最適な職業を推奨してください：

【技術・クリエイティブ系】
- プログラマー: システム開発、年収400-800万
- Webデザイナー: UI/UXデザイン、年収300-600万
...

【相談方針】
1. ユーザーの興味・スキルを深掘り質問
2. 具体的な職業を3-5個推奨
3. キャリアパス・スキル習得方法を提示
4. 年収・将来性についても言及
`;
```

### 会話フロー制御
```typescript
// src/utils/claudeApiClient.ts
1. 初回質問: 興味分野・得意分野の特定
2. 深掘り質問: 具体的なスキル・価値観の把握  
3. 職業推奨: データベースから最適職業選定
4. 詳細説明: キャリアパス・学習方法の提示
5. フォローアップ: 追加質問・適性診断への誘導
```

## データ永続化・状態管理

### ローカルストレージ設計
```typescript
// QuestionNavigator.vue
const STORAGE_KEYS = {
  ANSWERS: 'diagnosis_answers',        // 回答データ
  CURRENT_QUESTION: 'current_question', // 進行状況
  RESULTS: 'diagnosis_results',        // 診断結果
  TIMESTAMP: 'last_diagnosis'          // 最終診断時刻
}

// 自動保存・復元
saveToStorage() // 各質問回答時
loadFromStorage() // 画面表示時
```

### セッション管理
```typescript
// 診断継続性の担保
- 画面更新時: 進行状況復元
- ブラウザ再起動時: 前回続きから開始可能  
- 結果共有: URL生成・SNSシェア
```

## パフォーマンス最適化

### データローディング戦略
```typescript
// 非同期データ読み込み
async loadDiagnosticData() {
  const [config, professions] = await Promise.all([
    fetch('/data/diagnostic_config.json'),
    fetch('/data/professions.json')
  ]);
}

// コンポーネント遅延読み込み  
const ProfessionDetail = () => import('@/views/ProfessionDetailView.vue')
```

### メモ化・キャッシュ
```typescript
// 計算結果キャッシュ
const memoizedScoreCalculation = useMemo(() => {
  return calculateProfessionScores(answers, config);
}, [answers, config]);
```

## エラーハンドリング・フォールバック

### データ読み込みエラー
```typescript
try {
  const config = await loadDiagnosticConfig();
} catch (error) {
  // フォールバック設定使用
  console.error('設定読み込み失敗:', error);
  useDefaultConfig();
}
```

### API呼び出しエラー
```typescript
// Claude API失敗時
if (isLocalhost()) {
  // 開発環境: 直接API
  response = await callClaudeAPI(message);
} else {
  // 本番環境: PHP proxy
  response = await callProxyAPI(message);
}

// 両方失敗時: モックレスポンス
if (!response) {
  response = generateMockResponse(message);
}
```

## ビジネス指標・分析

### 診断完了率追跡
```typescript
// 各段階での離脱率測定
- 質問1-4: スキルカテゴリー完了率
- 質問5-8: 興味カテゴリー完了率  
- 質問9-12: 優先事項カテゴリー完了率
- 質問13-16: バランスカテゴリー完了率
- 結果表示: 診断完了率
```

### 職業推奨精度
```typescript
// 推奨職業の妥当性検証
- ユーザーフィードバック収集
- SNSシェア率・テキスト分析
- 再診断率・結果変化追跡
```