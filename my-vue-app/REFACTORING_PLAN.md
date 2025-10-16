# 診断機能リファクタリング計画

## 目標
- QuestionNavigatorの分割による保守性向上
- 状態管理の整理・最適化
- Stripe決済機能の完全実装
- PDF生成・配信システムの構築

## Phase 1: コンポーネント分割

### 1.1 QuestionNavigator分割
```
components/diagnosis/
├── DiagnosisContainer.vue      # メインコンテナ
├── QuestionDisplay.vue         # 質問表示
├── QuestionNavigation.vue      # 質問間ナビゲーション
├── ResultDisplay.vue           # 結果表示
├── ShareSection.vue            # シェア機能
├── PremiumSection.vue          # プレミアム機能
```

### 1.2 状態管理の整理
```typescript
// composables/useDiagnosis.ts
export interface DiagnosisState {
  currentQuestionIndex: number
  answers: Record<string, Record<string, number>>
  showResult: boolean
  topProfessions: ProfessionScore[]
  loading: boolean
  error: string | null
}
```

### 1.3 SCSSクリーンアップ
- レガシーCSS（1900行）の完全削除
- 新しいSCSS Mixinの統一
- CSS Variablesへの移行完了

## Phase 2: Stripe決済統合

### 2.1 バックエンド実装（PHP）
```php
// api/stripe-handlers/
├── create-checkout-session.php
├── webhook-handler.php
├── generate-pdf.php
└── verify-payment.php
```

### 2.2 フロントエンド実装
```typescript
// composables/usePayment.ts
export interface PaymentState {
  sessionId: string | null
  paymentStatus: 'pending' | 'completed' | 'failed'
  pdfUrl: string | null
}
```

### 2.3 PDF生成システム
- TCPDF または mPDF を使用
- 診断結果の詳細分析レポート
- 個人向けキャリアアドバイス
- スキルアップロードマップ

## Phase 3: 品質改善

### 3.1 TypeScript厳格化
- strict: true
- noImplicitAny: true
- 全コンポーネントの型安全性確保

### 3.2 エラーハンドリング強化
- 決済エラーの詳細処理
- ネットワークエラー対応
- ユーザーフレンドリーなエラー表示

### 3.3 パフォーマンス最適化
- 遅延読み込み
- メモ化の適切な使用
- バンドルサイズ最適化

## Phase 4: セキュリティ & 運用

### 4.1 セキュリティ強化
- APIキーの適切な管理
- Webhook署名検証
- XSS/CSRF対策

### 4.2 監視・ログ機能
- 決済状況の監視
- エラーログ収集
- ユーザー行動分析

### 4.3 テスト実装
- 単体テスト（Vitest）
- コンポーネントテスト
- E2Eテスト（Playwright）

## 実装スケジュール

**Week 1**: コンポーネント分割・SCSS整理
**Week 2**: Stripe決済統合・PDF生成
**Week 3**: 品質改善・セキュリティ
**Week 4**: テスト・運用準備

## 期待効果

1. **保守性**: 2500行→300行×8コンポーネント
2. **テスト性**: 各コンポーネントの単体テスト可能
3. **収益化**: Stripe決済による安定収入
4. **UX向上**: エラーハンドリング・パフォーマンス改善