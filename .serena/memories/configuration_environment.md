# 設定・環境変数

## 環境変数設定

### 開発環境（.env）
```bash
# Claude AI API（進路相談チャット）
VITE_CLAUDE_API_KEY=sk-ant-api03-your_actual_api_key_here

# Stripe決済（テスト環境）
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxx
```

### 本番環境
- **場所**: お名前.comサーバー上の `.env` ファイル
- **権限**: 600（読み書き、所有者のみ）
- **注意**: Git除外設定済み（絶対コミット禁止）

### デプロイ設定（.env.deploy）
```bash
# FTP接続情報（デプロイ自動化）
FTP_HOST=your-ftp-server.com
FTP_USER=your-username
FTP_PASSWORD=your-password
```

## Vite設定（vite.config.ts）

### 基本設定
```typescript
export default defineConfig({
  plugins: [
    vue(),                    // Vue 3サポート
    vueDevTools({            // Vue DevTools統合
      launchEditor: 'code'   // VSCode連携
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

### パフォーマンス最適化
```typescript
build: {
  // Code Splitting
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['vue', 'vue-router'],
        utils: ['./src/utils/diagnosisLoader.ts', './src/utils/seoUtils.ts']
      }
    }
  },
  
  // 圧縮最適化
  minify: 'terser',
  terserOptions: {
    compress: {
      drop_console: true,    // 本番でconsole削除
      drop_debugger: true    // debugger文削除
    }
  },
  
  // チャンクサイズ警告閾値
  chunkSizeWarningLimit: 1000
}
```

### 開発サーバー設定
```typescript
server: {
  fs: {
    allow: ['..']    // 親ディレクトリアクセス許可
  }
}
```

## TypeScript設定

### メイン設定（tsconfig.json）
```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "exactOptionalPropertyTypes": true
  },
  "references": [
    { "path": "./tsconfig.node.json" },
    { "path": "./tsconfig.app.json" }
  ]
}
```

### アプリ用設定（tsconfig.app.json）
```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "include": [
    "env.d.ts",
    "src/**/*"
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]    // @ エイリアス設定
    }
  }
}
```

## パッケージ管理（package.json）

### 主要依存関係
```json
{
  "dependencies": {
    "vue": "^3.5.13",           // Vue 3フレームワーク
    "vue-router": "^4.5.0",     // SPA ルーティング
    "vue-i18n": "^10.0.4",      // 多言語対応
    "pinia": "^3.0.1",          // 状態管理（利用可能）
    "basic-ftp": "^5.0.5"       // FTPデプロイ
  }
}
```

### 開発依存関係
```json
{
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.3",     // Vite Vue統合
    "typescript": "~5.8.0",             // TypeScript
    "eslint": "^9.22.0",                // リント
    "prettier": "3.5.3",               // フォーマット
    "vue-tsc": "^2.2.8",               // Vue型チェック
    "terser": "^5.43.1",               // JS圧縮
    "jiti": "^2.4.2"                   // 翻訳バリデーション用
  }
}
```

### npmスクリプト
```json
{
  "scripts": {
    "dev": "vite",                              // 開発サーバー
    "build": "vite build",                      // 本番ビルド
    "type-check": "vue-tsc --build",           // 型チェック
    "lint": "eslint . --fix",                  // リント（自動修正）
    "format": "prettier --write src/",         // フォーマット
    "deploy": "node deploy-ftp.js",            // 自動デプロイ
    "validate:translations": "node scripts/validate-translations.js"
  }
}
```

## Vue Router設定

### 基本ルーティング（src/router/index.ts）
```typescript
import { createRouter, createWebHistory } from 'vue-router'
import { multilingualRoutes } from './multilingual'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: multilingualRoutes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

// 動的メタタグ設定
router.beforeEach((to, from, next) => {
  // SEO・OGP設定処理
  next()
})
```

### 多言語ルーティング（src/router/multilingual.ts）
```typescript
// 言語別URL生成
const createMultilingualRoute = (path: string, component: any) => [
  { path, component },                    // 日本語（デフォルト）
  { path: `/en${path}`, component },      // 英語
  { path: `/zh${path}`, component }       // 中国語
]
```

## Vue I18n設定（src/i18n/index.ts）

### 基本設定
```typescript
import { createI18n } from 'vue-i18n'

// 言語検出ロジック
function detectLanguage(): string {
  // 1. URL検出 (/en/, /zh/)
  // 2. ブラウザ言語
  // 3. localStorage
  // 4. デフォルト（日本語）
}

const i18n = createI18n({
  locale: detectLanguage(),
  fallbackLocale: 'ja',
  messages: {
    ja: () => import('./locales/ja.json'),
    en: () => import('./locales/en.json'),
    zh: () => import('./locales/zh.json')
  }
})
```

## サーバー設定

### .htaccess（public/.htaccess）
```apache
# SPA対応（Vue Router）
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# セキュリティヘッダー
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"

# GZIP圧縮
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/javascript
</IfModule>
```

### PHP設定（お名前.com）
```php
# public/api/*.php
<?php
// CORS対応
header('Access-Control-Allow-Origin: https://pandalize.com');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// 環境変数読み込み
if (file_exists('../.env')) {
    $env = parse_ini_file('../.env');
    foreach ($env as $key => $value) {
        $_ENV[$key] = $value;
    }
}
?>
```

## エディタ設定

### VSCode設定（.vscode/settings.json）
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### EditorConfig（.editorconfig）
```ini
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

## セキュリティ設定

### ファイル権限（本番環境）
```bash
# 環境変数ファイル（秘匿）
chmod 600 .env .env.deploy

# 設定ファイル（Web読み取り可）
chmod 644 .htaccess

# PHPファイル（実行可能）
chmod 644 public/api/*.php
```

### Git除外（.gitignore）
```gitignore
# 環境変数（絶対除外）
.env
.env.deploy
.env.local
.env.*.local

# 依存関係
node_modules/

# ビルド成果物
dist/
dist-ssr/

# ログ・キャッシュ
*.log
.DS_Store
```