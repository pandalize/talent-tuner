/**
 * diagnostic_config.jsonファイルを読み込み、データをパースするユーティリティ関数
 */

// 質問の選択肢の定義
export interface Option {
  label: string;
  text: string;
  element: string;
  category: string;
  professions: string[];
}

// 質問の定義
export interface Question {
  id: string;
  text: string;
  options: Option[];
}

// 診断設定の定義
export interface DiagnosticConfig {
  category_weights: Record<string, number>;
  threshold: {
    recommend_top_n: number;
  };
  questions: Question[];
}

// 職業データの定義
export interface ProfessionData {
  annualIncome: string;
  jobDetails: string;
  comment: string;
  traits: string[];
}

// 職業スコアの定義
export interface ProfessionScore {
  name: string;
  score: number;
  categories: Record<string, number>;
  annualIncome?: string;
  jobDetails?: string;
  comment?: string;
  traits?: string[];
}

// 職業データベースの定義
export interface ProfessionDatabase {
  professions: Record<string, ProfessionData>;
}

/**
 * diagnostic_config.jsonファイルを読み込む
 * @returns Promise<DiagnosticConfig> 読み込まれた設定データ
 */
export async function loadDiagnosticConfig(): Promise<DiagnosticConfig> {
  try {
    // JSONファイルを取得
    const response = await fetch('/data/diagnostic_config.json');
    if (!response.ok) {
      throw new Error(`設定ファイルの読み込みに失敗しました: ${response.statusText}`);
    }

    // JSONとして読み込み
    const config = await response.json();
    return config as DiagnosticConfig;
  } catch (error) {
    console.error('診断設定の読み込み中にエラーが発生しました:', error);
    // デフォルト値を返す
    return {
      category_weights: {
        skill: 1.0,
        motivation: 1.0,
        environment: 1.0,
        personality: 1.0
      },
      threshold: {
        recommend_top_n: 1
      },
      questions: []
    };
  }
}

/**
 * 職業データベースを読み込む
 * @returns Promise<ProfessionDatabase> 読み込まれた職業データ
 */
export async function loadProfessionDatabase(): Promise<ProfessionDatabase> {
  try {
    // JSONファイルを取得
    const response = await fetch('/data/professions.json');
    if (!response.ok) {
      throw new Error(`職業データファイルの読み込みに失敗しました: ${response.statusText}`);
    }

    // JSONとして読み込み
    const database = await response.json();
    return database as ProfessionDatabase;
  } catch (error) {
    console.error('職業データの読み込み中にエラーが発生しました:', error);
    // デフォルト値を返す
    return {
      professions: {}
    };
  }
}

/**
 * 回答に基づいて職業スコアを計算する
 * @param config 診断設定
 * @param answers 回答（質問IDと選択肢ラベルのマップ）
 * @param professionDatabase 職業データベース（オプション）
 * @returns ProfessionScore[] 職業スコアの配列（スコア順）
 */
export function calculateProfessionScores(
  config: DiagnosticConfig,
  answers: Record<string, string>,
  professionDatabase?: ProfessionDatabase
): ProfessionScore[] {
  // 職業ごとのスコアを初期化
  const professionScores: Record<string, ProfessionScore> = {};
  
  // 各カテゴリーのウェイト
  const categoryWeights = config.category_weights;
  
  // 回答を処理
  Object.entries(answers).forEach(([questionId, selectedLabel]) => {
    // 質問を見つける
    const question = config.questions.find(q => q.id === questionId);
    if (!question) return;
    
    // 選択された選択肢を見つける
    const selectedOption = question.options.find(opt => opt.label === selectedLabel);
    if (!selectedOption) return;
    
    // この選択肢に関連する職業にスコアを加算
    const category = selectedOption.category;
    const categoryWeight = categoryWeights[category] || 1.0;
    
    selectedOption.professions.forEach(profession => {
      // 職業のスコアを初期化（存在しない場合）
      if (!professionScores[profession]) {
        professionScores[profession] = {
          name: profession,
          score: 0,
          categories: {}
        };
      }
      
      // カテゴリースコアを初期化（存在しない場合）
      if (!professionScores[profession].categories[category]) {
        professionScores[profession].categories[category] = 0;
      }
      
      // スコアを加算（カテゴリー別スコアにも重みを適用）
      professionScores[profession].categories[category] += categoryWeight;
      professionScores[profession].score += categoryWeight;
    });
  });
  
  // スコア順にソートし、職業データを追加
  const sortedScores = Object.values(professionScores).sort((a, b) => b.score - a.score);
  
  // 職業データベースが提供されている場合、追加情報を設定
  if (professionDatabase) {
    sortedScores.forEach(profession => {
      const professionData = professionDatabase.professions[profession.name];
      if (professionData) {
        profession.annualIncome = professionData.annualIncome;
        profession.jobDetails = professionData.jobDetails;
        profession.comment = professionData.comment;
        profession.traits = professionData.traits;
      }
    });
  }
  
  return sortedScores;
}

/**
 * 上位N個の職業を取得する
 * @param scores 職業スコアの配列
 * @param n 取得する数
 * @returns ProfessionScore[] 上位N個の職業スコア
 */
export function getTopProfessions(scores: ProfessionScore[], n: number): ProfessionScore[] {
  return scores.slice(0, n);
}

/**
 * 職業名から職業データを取得する
 * @param config 診断設定
 * @param professionName 職業名
 * @returns 職業に関連する要素とカテゴリーの配列
 */
export function getProfessionElements(
  config: DiagnosticConfig,
  professionName: string
): { element: string; category: string }[] {
  const elements: { element: string; category: string }[] = [];
  
  // すべての質問の選択肢から、この職業に関連するものを探す
  config.questions.forEach(question => {
    question.options.forEach(option => {
      if (option.professions.includes(professionName)) {
        // 重複を避ける
        if (!elements.some(e => e.element === option.element)) {
          elements.push({
            element: option.element,
            category: option.category
          });
        }
      }
    });
  });
  
  return elements;
}