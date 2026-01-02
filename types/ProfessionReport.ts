export interface ProfessionReportConfig {
  price: number;
  priceId: string;
  reportId: string;
  // 他に必要な項目があれば追加
}

export type ProfessionReports = Record<string, ProfessionReportConfig>;
