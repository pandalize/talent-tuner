/**
 * 職業データ管理のためのユーティリティクラス
 * スケーラブルな職業データの読み込み・管理・検索機能を提供
 */

import type { 
  ProfessionData, 
  ProfessionCategory, 
  ProfessionDatabase,
  WorkStyle, 
  DemandLevel,
  DifficultyLevel,
  StabilityLevel
} from './diagnosisLoader'

// 職業フィルターの定義
export interface ProfessionFilters {
  category?: string;
  workStyle?: WorkStyle;
  demandLevel?: DemandLevel;
  difficultyLevel?: DifficultyLevel;
  minIncome?: number;
  maxIncome?: number;
}

// 職業検索結果の定義
export interface ProfessionSearchResult {
  professions: ProfessionData[];
  totalCount: number;
  categories: string[];
}

// カテゴリーデータベースの定義
export interface CategoryDatabase {
  categories: Record<string, ProfessionCategory>;
}


/**
 * 職業データ管理クラス
 */
export class ProfessionDataManager {
  private categories: Record<string, ProfessionCategory> = {};
  private professions: Record<string, ProfessionData> = {};
  private isInitialized = false;

  /**
   * データマネージャーを初期化
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // カテゴリーデータを読み込み
      await this.loadCategories();
      
      // 既存の職業データを読み込み（後方互換性のため）
      await this.loadExistingProfessions();
      
      this.isInitialized = true;
    } catch (error) {
      console.error('ProfessionDataManager initialization failed:', error);
      throw error;
    }
  }

  /**
   * カテゴリーデータを読み込み
   */
  private async loadCategories(): Promise<void> {
    try {
      const data = await $fetch<CategoryDatabase>('/data/categories.json');
      
      this.categories = data.categories;
    } catch (error) {
      console.error('Failed to load categories:', error);
      throw error;
    }
  }

  /**
   * 既存の職業データを読み込み（移行期間用）
   */
  private async loadExistingProfessions(): Promise<void> {
    try {
      // 新しいカテゴリー別データファイルを読み込み
      await this.loadNewProfessionData();
      
      // フォールバック: 既存のprofessions.jsonも読み込み
      await this.loadLegacyProfessionData();
    } catch (error) {
      console.error('Failed to load profession data:', error);
      throw error;
    }
  }

  /**
   * 新しいカテゴリー別職業データを読み込み
   */
  private async loadNewProfessionData(): Promise<void> {
    const categoryFiles = [
      'tech-creative.json',
      'business-finance.json', 
      'medical-welfare-education.json',
      'service-hospitality.json',
      'professional-specialized.json'
    ];

    const loadPromises = categoryFiles.map(async (filename) => {
      try {
        const data = await $fetch<{ professions: Record<string, ProfessionData> }>(`/data/professions/${filename}`);
        
        // 新しい職業データを統合
        Object.assign(this.professions, data.professions);
      } catch (error) {
        console.warn(`Error loading ${filename}:`, error);
      }
    });

    await Promise.all(loadPromises);
  }

  /**
   * レガシー職業データを読み込み（フォールバック）
   */
  private async loadLegacyProfessionData(): Promise<void> {
    try {
      const data = await $fetch<{ professions: Record<string, unknown> }>('/data/professions.json');
      
      // 既存データを新構造に変換して統合（重複は新データを優先）
      const legacyProfessions = this.convertLegacyProfessions(data.professions);
      
      // 既存職業データがない場合のみレガシーデータを使用
      Object.entries(legacyProfessions).forEach(([name, profession]) => {
        if (!this.professions[name]) {
          this.professions[name] = profession;
        }
      });
    } catch (error) {
      console.warn('Failed to load legacy profession data:', error);
    }
  }

  /**
   * レガシー職業データを新構造に変換
   */
  private convertLegacyProfessions(legacyProfessions: Record<string, unknown>): Record<string, ProfessionData> {
    const converted: Record<string, ProfessionData> = {};

    Object.entries(legacyProfessions).forEach(([name, rawData]) => {
      const data = rawData as Record<string, unknown>;
      converted[name] = {
        id: (data.id as string) || this.generateId(name),
        name: name,
        categoryId: this.inferCategoryId(name),
        annualIncome: (data.annualIncome as string) || '未定',
        jobDetails: (data.jobDetails as string) || '',
        comment: (data.comment as string) || '',
        traits: (data.traits as string[]) || [],
        requiredSkills: (data.requiredSkills as string[]) || [],
        careerPath: (data.careerPath as string[]) || [],
        workEnvironment: (data.workEnvironment as string) || '',
        demandOutlook: (data.demandOutlook as string) || '',
        relatedProfessions: (data.relatedProfessions as string[]) || [],
        educationRequirements: (data.educationRequirements as string) || '',
        // デフォルト値を設定
        workStyle: this.inferWorkStyle(name),
        difficultyLevel: this.inferDifficultyLevel(name),
        stabilityLevel: this.inferStabilityLevel(name),
      };
    });

    return converted;
  }

  /**
   * 職業名からIDを生成
   */
  private generateId(name: string): string {
    return name.toLowerCase()
      .replace(/[^a-z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  /**
   * 職業名からカテゴリーIDを推定
   */
  private inferCategoryId(name: string): string {
    const categoryMappings: Record<string, string> = {
      'プログラマー': 'tech-creative',
      '公認会計士': 'professional-specialized',
      '建設業': 'service-hospitality',
      'デイトレーダー': 'business-finance',
      '起業家': 'entrepreneurial',
      'ワーホリ': 'lifestyle',
      'インフルエンサー': 'tech-creative',
      '難関大進学': 'academic'
    };

    return categoryMappings[name] || 'business-finance';
  }

  /**
   * 職業名から作業スタイルを推定
   */
  private inferWorkStyle(name: string): WorkStyle {
    const workStyleMappings: Record<string, WorkStyle> = {
      'プログラマー': 'remote',
      '公認会計士': 'office',
      '建設業': 'field',
      'デイトレーダー': 'remote',
      '起業家': 'mixed',
      'ワーホリ': 'field',
      'インフルエンサー': 'remote',
      '難関大進学': 'office'
    };

    return workStyleMappings[name] || 'office';
  }

  /**
   * 職業名から難易度レベルを推定
   */
  private inferDifficultyLevel(name: string): DifficultyLevel {
    const difficultyMappings: Record<string, DifficultyLevel> = {
      'プログラマー': 3,
      '公認会計士': 5,
      '建設業': 2,
      'デイトレーダー': 5,
      '起業家': 5,
      'ワーホリ': 2,
      'インフルエンサー': 3,
      '難関大進学': 4
    };

    return difficultyMappings[name] || 3;
  }

  /**
   * 職業名から安定性レベルを推定
   */
  private inferStabilityLevel(name: string): StabilityLevel {
    const stabilityMappings: Record<string, StabilityLevel> = {
      'プログラマー': 4,
      '公認会計士': 5,
      '建設業': 3,
      'デイトレーダー': 1,
      '起業家': 1,
      'ワーホリ': 2,
      'インフルエンサー': 2,
      '難関大進学': 4
    };

    return stabilityMappings[name] || 3;
  }

  /**
   * 全カテゴリーを取得
   */
  getAllCategories(): ProfessionCategory[] {
    return Object.values(this.categories);
  }

  /**
   * カテゴリーIDでカテゴリーを取得
   */
  getCategoryById(categoryId: string): ProfessionCategory | undefined {
    return this.categories[categoryId];
  }

  /**
   * 全職業を取得
   */
  getAllProfessions(): ProfessionData[] {
    return Object.values(this.professions);
  }

  /**
   * 職業IDで職業を取得
   */
  getProfessionById(professionId: string): ProfessionData | undefined {
    return Object.values(this.professions).find(p => p.id === professionId);
  }

  /**
   * 職業名で職業を取得
   */
  getProfessionByName(name: string): ProfessionData | undefined {
    return this.professions[name];
  }

  /**
   * カテゴリー別に職業を取得
   */
  getProfessionsByCategory(categoryId: string): ProfessionData[] {
    return Object.values(this.professions).filter(p => p.categoryId === categoryId);
  }

  /**
   * 職業を検索
   */
  searchProfessions(query: string, filters?: ProfessionFilters): ProfessionSearchResult {
    let results = Object.values(this.professions);

    // テキスト検索
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(profession => 
        profession.name.toLowerCase().includes(lowerQuery) ||
        profession.jobDetails.toLowerCase().includes(lowerQuery) ||
        profession.traits.some(trait => trait.toLowerCase().includes(lowerQuery)) ||
        profession.requiredSkills.some(skill => skill.toLowerCase().includes(lowerQuery))
      );
    }

    // フィルター適用
    if (filters) {
      if (filters.category) {
        results = results.filter(p => p.categoryId === filters.category);
      }
      if (filters.workStyle) {
        results = results.filter(p => p.workStyle === filters.workStyle);
      }
      if (filters.difficultyLevel) {
        results = results.filter(p => p.difficultyLevel === filters.difficultyLevel);
      }
    }

    // カテゴリー一覧を取得
    const categories = [...new Set(results.map(p => p.categoryId))];

    return {
      professions: results,
      totalCount: results.length,
      categories
    };
  }

  /**
   * 新しい職業を追加
   */
  addProfession(profession: ProfessionData): void {
    // バリデーション
    this.validateProfessionData(profession);
    
    // 追加
    this.professions[profession.name] = profession;
  }

  /**
   * 職業データのバリデーション
   */
  private validateProfessionData(profession: ProfessionData): void {
    const required = ['id', 'name', 'categoryId', 'annualIncome', 'jobDetails'];
    
    for (const field of required) {
      if (!profession[field as keyof ProfessionData]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // カテゴリーIDの存在確認
    if (!this.categories[profession.categoryId]) {
      throw new Error(`Invalid categoryId: ${profession.categoryId}`);
    }
  }

  /**
   * レガシー形式のデータベースを取得（後方互換性のため）
   */
  getLegacyDatabase(): ProfessionDatabase {
    const legacyProfessions: Record<string, ProfessionData> = {};
    
    Object.values(this.professions).forEach(profession => {
      legacyProfessions[profession.name] = profession;
    });

    return { professions: legacyProfessions };
  }
}

// シングルトンインスタンス
export const professionDataManager = new ProfessionDataManager();