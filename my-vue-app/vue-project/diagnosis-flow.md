# フロントエンド診断システムの可視化

このドキュメントでは、mermaid.jsを使用してフロントエンドの診断システムの仕組みを可視化します。

## 1. ユーザーフロー

```mermaid
flowchart TD
    A[ホーム画面] -->|診断ボタンをクリック| B[診断画面]
    B -->|質問に回答| C{全ての質問に回答済み?}
    C -->|はい| D[診断結果を計算]
    C -->|いいえ| B
    D --> E[結果画面]
    E -->|もう一度診断する| B
    E -->|ホームに戻る| A
```

## 2. データフロー

```mermaid
sequenceDiagram
    participant User as ユーザー
    participant DV as DiagnosisView
    participant DL as diagnosisLoader
    participant Config as diagnostic_config.json

    User->>DV: 診断を開始
    DV->>DL: loadDiagnosticConfig()
    DL->>Config: fetch()
    Config-->>DL: 診断設定データ
    DL-->>DV: 診断設定
    DV->>User: 質問を表示
    
    loop 各質問
        User->>DV: 回答を選択
        DV->>DV: 回答を保存
    end
    
    User->>DV: 診断結果を見る
    DV->>DL: calculateProfessionScores(config, answers)
    DL-->>DV: 職業スコア
    DV->>DL: getTopProfessions(scores, n)
    DL-->>DV: 上位n個の職業
    DV->>User: 診断結果を表示
```

## 3. コンポーネント構造

```mermaid
classDiagram
    class DiagnosisButton {
        +startDiagnosis()
    }
    
    class DiagnosisView {
        -config: DiagnosticConfig
        -loading: boolean
        -error: string
        -answers: Record<string, string>
        -showResult: boolean
        -topProfessions: ProfessionScore[]
        +loadConfig()
        +selectOption(questionId, label)
        +calculateResult()
        +resetDiagnosis()
        +goHome()
    }
    
    class diagnosisLoader {
        +loadDiagnosticConfig()
        +calculateProfessionScores(config, answers)
        +getTopProfessions(scores, n)
        +getProfessionElements(config, professionName)
    }
    
    class DiagnosticConfig {
        +category_weights: Record<string, number>
        +threshold: object
        +questions: Question[]
    }
    
    class Question {
        +id: string
        +text: string
        +options: Option[]
    }
    
    class Option {
        +label: string
        +text: string
        +element: string
        +category: string
        +professions: string[]
    }
    
    class ProfessionScore {
        +name: string
        +score: number
        +categories: Record<string, number>
    }
    
    DiagnosisButton --> DiagnosisView: 遷移
    DiagnosisView --> diagnosisLoader: 利用
    diagnosisLoader --> DiagnosticConfig: 読み込み
    DiagnosticConfig --> Question: 含む
    Question --> Option: 含む
    diagnosisLoader --> ProfessionScore: 生成
```

## 4. 診断ロジックのフロー

```mermaid
flowchart TD
    A[診断開始] --> B[診断設定を読み込む]
    B --> C[質問を表示]
    C --> D[回答を収集]
    D --> E{全ての質問に回答済み?}
    E -->|いいえ| C
    E -->|はい| F[職業スコアを計算]
    
    subgraph スコア計算プロセス
    F --> G[各回答を処理]
    G --> H[選択された選択肢に関連する職業にスコアを加算]
    H --> I[カテゴリーの重み付けを適用]
    I --> J[職業をスコア順にソート]
    end
    
    J --> K[上位N個の職業を取得]
    K --> L[診断結果を表示]
    L --> M[各職業のカテゴリー別スコアを表示]
    M --> N[職業に対するコメントを表示]
```

## 5. データモデル

```mermaid
erDiagram
    DiagnosticConfig ||--o{ Question : contains
    Question ||--o{ Option : contains
    Option ||--o{ Profession : references
    
    DiagnosticConfig {
        object category_weights
        object threshold
        array questions
    }
    
    Question {
        string id
        string text
        array options
    }
    
    Option {
        string label
        string text
        string element
        string category
        array professions
    }
    
    Profession {
        string name
    }
    
    ProfessionScore {
        string name
        number score
        object categories
    }