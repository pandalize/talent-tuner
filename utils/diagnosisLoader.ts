/**
 * diagnostic_config.jsonファイルを読み込み、データをパースするユーティリティ関数
 */

export interface Question {
  id: string;
  text: string;
  category: string;
  professions: string[];
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

// 新回答形式：質問ID -> rating(1..5)
export type Answers = Record<string, number>;

/**
 * diagnostic_config.jsonファイルを読み込む
 * @returns Promise<DiagnosticConfig> 読み込まれた設定データ
 */
export async function loadDiagnosticConfig(): Promise<DiagnosticConfig> {
  try {
    const response = await $fetch<DiagnosticConfig>('/data/diagnostic_config.json');

    // もし JSON 側で id が number の場合に備えて string 化（安全策）
    if (response?.questions?.length) {
      response.questions = response.questions.map((q: any) => ({
        ...q,
        id: String(q.id)
      }));
    }

    return response;
  } catch (error) {
    console.error('診断設定の読み込み中にエラーが発生しました:', error);
    // デフォルト値を返す
    return {
      category_weights: {
        skill: 1.0,
        interest: 1.0,
        priority: 1.0,
        balance: 1.0
      },
      threshold: {
        recommend_top_n: 3
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
 * @param answers 回答（質問ID -> rating(1-5)）
 * @param professionDatabase 職業データベース（オプション）
 * @returns ProfessionScore[] 職業スコアの配列（スコア順）
 */
export function calculateProfessionScores(
  config: DiagnosticConfig,
  answers: Answers,
  professionDatabase?: ProfessionDatabase
): ProfessionScore[] {
  // 職業ごとのスコアを初期化
  const professionScores: Record<string, ProfessionScore> = {};

  const categoryWeights = config.category_weights || {};

  // categories の初期キーを category_weights から作る（未知カテゴリでも破綻しにくい）
  const baseCategories: Record<string, number> = Object.keys(categoryWeights).reduce((acc, k) => {
    acc[k] = 0;
    return acc;
  }, {} as Record<string, number>);

  // 回答を処理
  Object.entries(answers).forEach(([questionId, rating]) => {
    if (typeof rating !== 'number' || rating < 1 || rating > 5) return;

    const question = config.questions.find(q => q.id === questionId);
    if (!question) return;

    const category = question.category;
    const categoryWeight = categoryWeights[category] ?? 1.0;
    const scoreContribution = rating * categoryWeight;

    question.professions.forEach(profession => {
      if (!professionScores[profession]) {
        professionScores[profession] = {
          name: profession,
          score: 0,
          categories: { ...baseCategories }
        };
      }

      professionScores[profession].score += scoreContribution;

      // categoriesに該当カテゴリがなければ追加
      if (professionScores[profession].categories[category] === undefined) {
        professionScores[profession].categories[category] = 0;
      }
      professionScores[profession].categories[category] += scoreContribution;
    });
  });

  // スコア順にソートし、職業データを追加
  const sortedScores = Object.values(professionScores).sort((a, b) => b.score - a.score);

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
