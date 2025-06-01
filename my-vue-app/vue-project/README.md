# 職業診断アプリ (Talent Tuner)

Vue 3とViteを使用した職業診断アプリケーションです。ユーザーの興味、能力、価値観、バランスを分析し、最適な職業をランキング形式で提案します。

## Git ブランチ運用方法

### ブランチ戦略
このプロジェクトでは **Git Flow** を採用しています。

#### メインブランチ
- **main**: 本番環境用の安定版ブランチ
- **develop**: 開発統合ブランチ

#### サポートブランチ
- **feature/**: 新機能開発用ブランチ
  - 命名規則: `feature/機能名` (例: `feature/question-navigation`)
- **hotfix/**: 緊急修正用ブランチ
  - 命名規則: `hotfix/修正内容` (例: `hotfix/fix-progress-bar`)
- **release/**: リリース準備用ブランチ
  - 命名規則: `release/バージョン` (例: `release/v1.0.0`)

#### ワークフロー
1. **新機能開発**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/機能名
   # 開発作業
   git add .
   git commit -m "feat: 機能の説明"
   git push origin feature/機能名
   # プルリクエスト作成 → develop へマージ
   ```

2. **バグ修正**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b hotfix/修正内容
   # 修正作業
   git add .
   git commit -m "fix: 修正内容の説明"
   git push origin hotfix/修正内容
   # プルリクエスト作成 → develop へマージ
   ```

3. **リリース**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b release/v1.0.0
   # リリース準備（バージョン更新等）
   git add .
   git commit -m "release: v1.0.0"
   git push origin release/v1.0.0
   # プルリクエスト作成 → main へマージ
   # main から develop へマージバック
   ```

#### コミットメッセージ規約
- **feat**: 新機能追加
- **fix**: バグ修正
- **docs**: ドキュメント更新
- **style**: コードスタイル修正
- **refactor**: リファクタリング
- **test**: テスト追加・修正
- **chore**: その他の変更

例: `feat: 質問ナビゲーション機能を追加`

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
