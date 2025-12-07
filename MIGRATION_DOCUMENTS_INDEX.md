# talent-tuner 移行プロジェクト ドキュメント一覧

## 📋 概要

**ドメイン移管**: お名前.com → Cloudflare  
**フロントエンド移行**: Vue 3 + Vite → Nuxt 3  
**ホスティング統一**: フロント・バック両方 → Vercel

**総期間**: 約 3-4 週間

---

## 📚 ドキュメント構成

### 1️⃣ [MIGRATION_SPECIFICATION.md](./MIGRATION_SPECIFICATION.md)

**対象**: プロジェクトマネージャー・リーダー

**内容**:
- 📊 現状分析（アーキテクチャ図）
- 🔄 4 つの Phase に分けた移行計画
- 📁 ファイル・フォルダ単位の変更
- 🔌 API・ビジネスロジック変更
- ⚙️ 設定ファイル変更
- 🌐 DNS・ドメイン移管手順
- 📈 スケジュール・チェックリスト

**読むべき人**:
- プロジェクトマネージャー
- スクラムマスター
- 技術リード

**対応時間**: 20-30 分で全体像把握

---

### 2️⃣ [MIGRATION_IMPLEMENTATION_GUIDE.md](./MIGRATION_IMPLEMENTATION_GUIDE.md)

**対象**: 開発エンジニア

**内容**:
- 🚀 Nuxt 3 プロジェクト初期化
- 📦 ファイル移行・変換手順（コード例付き）
- 🔧 ルーティング・API 呼び出し変更（具体例）
- ⚙️ nuxt.config.ts 詳細設定
- 🔑 環境変数管理
- 💻 サーバーサイド API 実装例
- 📡 Cloudflare DNS 設定手順
- ✅ Vercel デプロイ手順
- 🧪 テスト・検証方法
- 🐛 トラブルシューティング

**読むべき人**:
- フロントエンド開発者
- バックエンド開発者
- インフラ/DevOps エンジニア

**対応時間**: 各 Phase ごとに 1-2 時間

---

### 3️⃣ [MIGRATION_CHANGE_MAPPING.md](./MIGRATION_CHANGE_MAPPING.md)

**対象**: 詳細実装の参照資料

**内容**:
- 📋 ファイル単位の変更マッピング表
- ✗ 削除ファイル一覧（理由付き）
- ✓ 新規作成ファイル一覧
- 📝 修正が必要な API 呼び出し箇所（before/after）
- 🔄 移動・リネーム ファイル一覧
- 🔑 環境変数変更マッピング
- ⚙️ 設定ファイル変更マッピング
- 🌐 DNS 設定変更詳細
- 📦 パッケージ依存関係変更

**読むべき人**:
- 各 Phase 実装者
- コードレビュアー
- QA テスター

**対応時間**: 参照ドキュメントとして必要な時に確認

---

## 🗺️ ドキュメント使用フロー

```
プロジェクト開始
    ↓
[MIGRATION_SPECIFICATION.md を読む]
    ├─ 現状分析
    ├─ 全体計画を把握
    └─ Phase ごとのスケジュール確認
    ↓
Phase 4: DNS・ドメイン移管
    ├─ [MIGRATION_SPECIFICATION.md] Phase 4 を参照
    ├─ Cloudflare 設定
    └─ DNS 伝播確認
    ↓
Phase 3: Vercel デプロイ設定
    ├─ [MIGRATION_IMPLEMENTATION_GUIDE.md] Phase 8-9 を参照
    ├─ 環境変数設定
    └─ プレビューデプロイ
    ↓
Phase 1: Nuxt 3 移行
    ├─ [MIGRATION_IMPLEMENTATION_GUIDE.md] Phase 1-2 を参照
    ├─ [MIGRATION_CHANGE_MAPPING.md] でファイル対応確認
    └─ 実装開始
    ↓
Phase 2: サーバーサイド統一
    ├─ [MIGRATION_IMPLEMENTATION_GUIDE.md] Phase 5 を参照
    ├─ API 実装開始
    └─ テスト実施
    ↓    
Phase 5: テスト・本番デプロイ
    ├─ [MIGRATION_IMPLEMENTATION_GUIDE.md] Phase 10 を参照
    ├─ 統合テスト実施
    └─ 本番環境デプロイ
    ↓
プロジェクト完了
```

---

## 🎯 各ロール別の読むべきドキュメント

### PM・スクラムマスター

```
優先度: SPECIFICATION > CHANGE_MAPPING > IMPLEMENTATION_GUIDE

1️⃣ MIGRATION_SPECIFICATION.md
   - 概要, 現状分析, Phase 説明
   - スケジュール・チェックリスト
   - リスク・注意事項

2️⃣ MIGRATION_CHANGE_MAPPING.md
   - 変更優先度セクション
   - スケジュール全体感把握
```

### フロントエンド開発者

```
優先度: IMPLEMENTATION_GUIDE > CHANGE_MAPPING > SPECIFICATION

1️⃣ MIGRATION_IMPLEMENTATION_GUIDE.md
   - Phase 1: Nuxt 3 プロジェクト初期化
   - Phase 2: ファイル移行
   - Phase 4: API 呼び出し更新

2️⃣ MIGRATION_CHANGE_MAPPING.md
   - フロントエンド ファイル変更マッピング
   - API 呼び出しの before/after 確認

3️⃣ MIGRATION_SPECIFICATION.md
   - 全体図・アーキテクチャ確認
```

### バックエンド・DevOps エンジニア

```
優先度: IMPLEMENTATION_GUIDE > CHANGE_MAPPING > SPECIFICATION

1️⃣ MIGRATION_IMPLEMENTATION_GUIDE.md
   - Phase 5: サーバーサイド API 実装
   - Phase 8: Cloudflare DNS 設定
   - Phase 9: Vercel デプロイ

2️⃣ MIGRATION_CHANGE_MAPPING.md
   - サーバーサイド ファイル変更マッピング
   - DNS・デプロイ設定変更
   - パッケージ依存関係変更

3️⃣ MIGRATION_SPECIFICATION.md
   - API エンドポイント仕様
   - ドメイン移管計画
```

### QA・テスター

```
優先度: SPECIFICATION > IMPLEMENTATION_GUIDE > CHANGE_MAPPING

1️⃣ MIGRATION_SPECIFICATION.md
   - テスト・検証計画
   - チェックリスト

2️⃣ MIGRATION_IMPLEMENTATION_GUIDE.md
   - Phase 10: テスト・検証
   - トラブルシューティング

3️⃣ MIGRATION_CHANGE_MAPPING.md
   - 変更箇所の一覧確認
```

---

## 📊 変更スコープサマリー

### ファイル構造変更

```
変更ファイル数:
├─ 削除: 7 ファイル
├─ 新規作成: 15+ ファイル
├─ 修正: 8 ファイル
└─ 移動・リネーム: 20+ ファイル
```

### API 呼び出し変更

```
変更対象 API:
├─ /api/chat              ← fetch + PHP proxy → $fetch + Server API
├─ /api/create-payment-intent
├─ /api/check-session
└─ /api/download-pdf
```

### 設定変更

```
設定ファイル変更:
├─ 環境変数: 4 個 追加 / 削除
├─ tsconfig.json: Nuxt 自動生成に変更
├─ vite.config.ts: nuxt.config.ts に統合
├─ vercel.json: 簡略化
└─ package.json: Scripts 更新
```

---

## ⏱️ 実装タイムライン

| Phase | 期間 | 重点 | ドキュメント |
|-------|------|------|------------|
| **準備** | 1-2日 | ドキュメント読込・計画確認 | SPECIFICATION |
| **Phase 1** | 1-2週 | Nuxt 3 移行 | IMPLEMENTATION_GUIDE (1-3) |
| **Phase 2** | 1週 | サーバーサイド統一 | IMPLEMENTATION_GUIDE (5) |
| **Phase 3** | 3-5日 | Vercel デプロイ設定 | IMPLEMENTATION_GUIDE (8-9) |
| **Phase 4** | 1-2日 | DNS・ドメイン移管 | IMPLEMENTATION_GUIDE (8) |
| **Phase 5** | 3-5日 | テスト・本番デプロイ | IMPLEMENTATION_GUIDE (10) |
| **合計** | **3-4週** | | 全ドキュメント |

---

## 🔍 よくある質問への対応

### Q: Nuxt 3 に移行する理由は？

**A**: [MIGRATION_SPECIFICATION.md](./MIGRATION_SPECIFICATION.md) の **1.1 Phase 1** 参照
- ファイルベースルーティングで複雑さ軽減
- サーバーサイド統合による保守性向上
- Vercel での最適化（Edge Functions 対応）

---

### Q: 現在のコードはどの程度変更が必要？

**A**: [MIGRATION_CHANGE_MAPPING.md](./MIGRATION_CHANGE_MAPPING.md) 参照
- **API 呼び出し**: `fetch` → `$fetch` (高頻度)
- **環境変数**: `import.meta.env` → `useRuntimeConfig()` (高頻度)
- **ルーティング**: ファイル構造の変更 (一度のみ)
- **コンポーネント**: ほぼ変更不要 (自動スコープ付け)

---

### Q: デプロイプロセスはどう変わる？

**A**: [MIGRATION_SPECIFICATION.md](./MIGRATION_SPECIFICATION.md) の **6. デプロイ・ホスティング構成** 参照
- **旧**: `npm run build` → FTP アップロード
- **新**: `git push` → Vercel 自動デプロイ（または `vercel --prod`）

---

### Q: DNS 移管時にダウンタイムはある？

**A**: [MIGRATION_SPECIFICATION.md](./MIGRATION_SPECIFICATION.md) の **4.3 DNS 伝播確認** 参照
- **TTL 設定**: 1 時間で反映（最短）
- **フォールバック**: お名前.com に戻す可能（即座）
- **推奨**: オフピーク時間（夜間）に実施

---

### Q: 既存ユーザーへの影響は？

**A**: ユーザー影響最小化:
- URL 構造変更なし（ルーティング互換性維持）
- API レスポンス形式統一（互換性確保）
- SSL 自動更新（ダウンタイムなし）

---

## 🚀 スタートガイド

### 今すぐ始める場合

```
1. [MIGRATION_SPECIFICATION.md] をすべて読む (30分)
2. チーム内で役割分担を決定 (1時間)
3. [MIGRATION_IMPLEMENTATION_GUIDE.md] Phase 1 開始
4. [MIGRATION_CHANGE_MAPPING.md] を参照ドキュメントに保持
```

### 計画段階で確認すべき項目

```
□ Nuxt 3 開発環境の要件確認
□ Vercel アカウント・プロジェクト確認
□ Cloudflare アカウント作成
□ API キー（Claude, Stripe）の有効性確認
□ バックアップ体制の構築
```

---

## 📞 サポート・参考リンク

### 公式ドキュメント

- **Nuxt 3**: https://nuxt.com/docs
- **Vercel Deployment**: https://vercel.com/docs
- **Cloudflare**: https://developers.cloudflare.com/
- **Claude API**: https://docs.anthropic.com/
- **Stripe API**: https://stripe.com/docs/api

### トラブルシューティング

すべてのトラブルシューティングは  
[MIGRATION_IMPLEMENTATION_GUIDE.md](./MIGRATION_IMPLEMENTATION_GUIDE.md) の  
**トラブルシューティング** セクション参照

---

## 📝 ドキュメント更新履歴

| 日時 | 内容 | 作成者 |
|------|------|--------|
| 2025-12-07 | 初版作成 | AI Copilot |
| - | (更新予定) | - |

---

**最終更新日**: 2025年12月7日  
**バージョン**: 1.0

---

## 関連ファイル

- [MIGRATION_SPECIFICATION.md](./MIGRATION_SPECIFICATION.md) - メイン仕様書
- [MIGRATION_IMPLEMENTATION_GUIDE.md](./MIGRATION_IMPLEMENTATION_GUIDE.md) - 実装ガイド
- [MIGRATION_CHANGE_MAPPING.md](./MIGRATION_CHANGE_MAPPING.md) - 変更マッピング
- [README.md](./README.md) - プロジェクト概要（参照用）
