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

// 職業カテゴリーの定義
export interface ProfessionCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  traits: string[];
  workStyle: WorkStyle[];
  demandOutlook: DemandLevel;
}

// 作業スタイルの定義
export type WorkStyle = 'remote' | 'office' | 'field' | 'mixed';

// 需要レベルの定義
export type DemandLevel = 'high' | 'medium' | 'low';

// 難易度レベルの定義
export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

// 安定性レベルの定義
export type StabilityLevel = 1 | 2 | 3 | 4 | 5;

// 職業データの定義（拡張版）
export interface ProfessionData {
  id: string;
  name: string;
  categoryId: string;
  annualIncome: string;
  jobDetails: string;
  comment: string;
  traits: string[];
  requiredSkills: string[];
  careerPath: string[];
  workEnvironment: string;
  demandOutlook: string;
  relatedProfessions: string[];
  educationRequirements: string;
  // 新しい属性
  workStyle: WorkStyle;
  difficultyLevel: DifficultyLevel;
  stabilityLevel: StabilityLevel;
  averageWorkingHours?: string;
  stressLevel?: DifficultyLevel;
  creativityLevel?: DifficultyLevel;
  socialInteractionLevel?: DifficultyLevel;
}

// 職業スコアの定義
export interface ProfessionScore {
  id?: string;
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
    const response = await $fetch<DiagnosticConfig>('/data/diagnostic_config.json')

    // JSONとして読み込み
    return response
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
 * 職業データベースを読み込む（新システム対応）
 * @returns Promise<ProfessionDatabase> 読み込まれた職業データ
 */
export async function loadProfessionDatabase(): Promise<ProfessionDatabase> {
  try {
    // 新しいProfessionDataManagerを使用
    const { professionDataManager } = await import('./professionDataManager');
    await professionDataManager.initialize();
    
    // レガシー形式で返す（後方互換性のため）
    return professionDataManager.getLegacyDatabase();
  } catch (error) {
    console.error('職業データの読み込み中にエラーが発生しました:', error);
    
    // フォールバック: 直接JSONファイルを読み込み
    try {
      const response = await $fetch('/data/professions.json');
      return response as ProfessionDatabase;
    } catch (fallbackError) {
      console.error('フォールバック読み込みも失敗しました:', fallbackError);
      return { professions: {} };
    }
  }
}

/**
 * 職業データマネージャーを取得（新システム用）
 * @returns Promise<ProfessionDataManager> 初期化済みのデータマネージャー
 */
export async function getProfessionDataManager() {
  const { professionDataManager } = await import('./professionDataManager');
  await professionDataManager.initialize();
  return professionDataManager;
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
  answers: Record<string, string | Record<string, number>>,
  professionDatabase?: ProfessionDatabase
): ProfessionScore[] {
  // 職業ごとのスコアを初期化
  const professionScores: Record<string, ProfessionScore> = {};
  
  // 各カテゴリーのウェイト
  const categoryWeights = config.category_weights;
  
  // 回答を処理
  Object.entries(answers).forEach(([questionId, answerData]) => {
    // 質問を見つける
    const question = config.questions.find(q => q.id === questionId);
    if (!question) return;
    
    // 新しい評価形式かレガシー形式かを判定
    if (typeof answerData === 'string') {
      // レガシー形式（A/B/C/Dの単一選択）
      const selectedOption = question.options.find(opt => opt.label === answerData);
      if (!selectedOption) return;
      
      const category = selectedOption.category;
      const categoryWeight = categoryWeights[category] || 1.0;
      
      selectedOption.professions.forEach(profession => {
        if (!professionScores[profession]) {
          professionScores[profession] = {
            name: profession,
            score: 0,
            categories: { skill: 0, interest: 0, priority: 0, balance: 0 }
          };
        }
        
        professionScores[profession].score += categoryWeight;
        if (professionScores[profession].categories[category]) {
          professionScores[profession].categories[category] += categoryWeight;
        }
      });
    } else if (typeof answerData === 'object') {
      // 新しい評価形式（各選択肢に1-5の評価）
      Object.entries(answerData).forEach(([optionLabel, rating]) => {
        const option = question.options.find(opt => opt.label === optionLabel);
        if (!option || typeof rating !== 'number' || rating < 1 || rating > 5) return;
        
        const category = option.category;
        const categoryWeight = categoryWeights[category] || 1.0;
        // 評価値（1-5）をスコアに反映
        const scoreContribution = rating * categoryWeight;
        
        option.professions.forEach(profession => {
          if (!professionScores[profession]) {
            professionScores[profession] = {
              name: profession,
              score: 0,
              categories: { skill: 0, interest: 0, priority: 0, balance: 0 }
            };
          }
          
          professionScores[profession].score += scoreContribution;
          if (professionScores[profession].categories[category]) {
            professionScores[profession].categories[category] += scoreContribution;
          }
        });
      });
    }
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