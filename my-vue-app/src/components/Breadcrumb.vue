<template>
  <nav class="breadcrumb-nav" aria-label="パンくずナビゲーション">
    <ol class="breadcrumb-list">
      <li 
        v-for="(item, index) in breadcrumbs" 
        :key="index"
        class="breadcrumb-item"
        :class="{ 'breadcrumb-current': index === breadcrumbs.length - 1 }"
      >
        <router-link 
          v-if="index < breadcrumbs.length - 1" 
          :to="item.url"
          class="breadcrumb-link"
        >
          {{ item.name }}
        </router-link>
        <span v-else class="breadcrumb-current-text">
          {{ item.name }}
        </span>
        
        <svg 
          v-if="index < breadcrumbs.length - 1"
          class="breadcrumb-separator" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2"
        >
          <polyline points="9,18 15,12 9,6"/>
        </svg>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
 
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { generateBreadcrumbSchema, injectStructuredData } from '@/utils/seoUtils'

interface BreadcrumbItem {
  name: string
  url: string
}

const route = useRoute()

// ルートに基づいてパンくずリストを生成
const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const items: BreadcrumbItem[] = [
    { name: 'ホーム', url: '/' }
  ]

  const pathSegments = route.path.split('/').filter(segment => segment)
  
  // ルートベースのパンくず生成
  if (pathSegments.length === 0) {
    return [{ name: 'ホーム', url: '/' }]
  }

  // 各パスに応じたパンくず生成
  const pathMap: Record<string, BreadcrumbItem[]> = {
    'diagnosis': [
      { name: '診断を受ける', url: '/diagnosis' }
    ],
    'diagnosis-method': [
      { name: '診断について', url: '/diagnosis-method' }
    ],
    'result-guide': [
      { name: '診断結果ガイド', url: '/result-guide' }
    ],
    'diagnosis-theory': [
      { name: '診断理論', url: '/diagnosis-theory' }
    ],
    'career-guide': [
      { name: 'キャリアガイド', url: '/career-guide' }
    ],
    'skills-development': [
      { name: 'キャリアガイド', url: '/career-guide' },
      { name: 'スキル開発', url: '/skills-development' }
    ],
    'salary-guide': [
      { name: 'キャリアガイド', url: '/career-guide' },
      { name: '年収ガイド', url: '/salary-guide' }
    ],
    'career-change': [
      { name: 'キャリアガイド', url: '/career-guide' },
      { name: '転職ガイド', url: '/career-change' }
    ],
    'student-guide': [
      { name: 'キャリアガイド', url: '/career-guide' },
      { name: '学生ガイド', url: '/student-guide' }
    ],
    'privacy': [
      { name: 'プライバシーポリシー', url: '/privacy' }
    ],
    'terms': [
      { name: '利用規約', url: '/terms' }
    ],
    'contact': [
      { name: 'お問い合わせ', url: '/contact' }
    ],
    'company': [
      { name: '運営者情報', url: '/company' }
    ]
  }

  // 職業詳細ページの特別処理
  if (pathSegments[0] === 'profession' && pathSegments[1]) {
    const professionNames: Record<string, string> = {
      'programmer': 'プログラマー',
      'designer': 'デザイナー',
      'sales': '営業職',
      'construction': '建設業',
      'accountant': '公認会計士',
      'entrepreneur': '起業家',
      'architect': '建築士',
      'childcare': '保育士'
    }
    
    return [
      ...items,
      { name: '職業詳細', url: '/profession' },
      { name: professionNames[pathSegments[1]] || pathSegments[1], url: route.path }
    ]
  }

  const firstSegment = pathSegments[0]
  if (pathMap[firstSegment]) {
    return [...items, ...pathMap[firstSegment]]
  }

  // デフォルト：パスセグメントから生成
  let currentPath = ''
  pathSegments.forEach(segment => {
    currentPath += `/${segment}`
    items.push({
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      url: currentPath
    })
  })

  return items
})

// 構造化データを注入
onMounted(() => {
  if (breadcrumbs.value.length > 1) {
    const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs.value)
    injectStructuredData(breadcrumbSchema)
  }
})
</script>

<style scoped>
.breadcrumb-nav {
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-light);
  padding: var(--space-sm) 0;
  margin-bottom: var(--space-lg);
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-md);
  list-style: none;
  font-size: var(--fs-small);
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.breadcrumb-link {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color var(--transition-fast);
  padding: var(--space-xs);
  border-radius: 4px;
}

.breadcrumb-link:hover {
  color: var(--accent-blue);
  background: rgba(52, 152, 219, 0.1);
}

.breadcrumb-current-text {
  color: var(--text-primary);
  font-weight: 500;
}

.breadcrumb-separator {
  color: var(--text-secondary);
  opacity: 0.6;
  width: 12px;
  height: 12px;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .breadcrumb-list {
    padding: 0 var(--space-sm);
    font-size: 0.8125rem;
  }
  
  .breadcrumb-link,
  .breadcrumb-current-text {
    padding: var(--space-xs) 0;
  }
}

@media (max-width: 480px) {
  .breadcrumb-nav {
    padding: var(--space-xs) 0;
  }
  
  .breadcrumb-list {
    font-size: 0.75rem;
    gap: 4px;
  }
  
  .breadcrumb-separator {
    width: 10px;
    height: 10px;
  }
  
  /* 長いパンくずの場合は省略 */
  .breadcrumb-item:not(:first-child):not(:last-child) {
    display: none;
  }
  
  .breadcrumb-item:nth-last-child(2) {
    display: flex;
  }
  
  .breadcrumb-item:nth-last-child(2)::before {
    content: '...';
    color: var(--text-secondary);
    margin-right: var(--space-xs);
  }
}

/* ダークモード対応（将来用） */
@media (prefers-color-scheme: dark) {
  .breadcrumb-nav {
    background: var(--bg-tertiary, #f8f9fa);
    border-color: var(--border-light, #dee2e6);
  }
}
</style>