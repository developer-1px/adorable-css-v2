// Note: docsApi import moved to avoid circular dependency

export type DocsConfig = {
  title: string;
  href: string;
  description: string;
  source: string;
  category: 'public' | 'internal' | 'api';
  tags: string[];
  badge?: 'new' | 'beta' | 'deprecated';
};

export type DocsSection = {
  title: string;
  items: DocsConfig[];
};

export const docsConfig: DocsSection[] = [
  {
    title: 'Getting Started',
    items: [
      {
        title: 'Background',
        href: '/docs/background',
        description: '디자인과 개발 사이의 20년 간극',
        source: '5-public/mdx/00-background.md',
        category: 'public',
        tags: ['design', 'development', 'problem'],
      },
      {
        title: 'Why AdorableCSS',
        href: '/docs/why-adorablecss',
        description: 'Tailwind와 뭐가 다른데?',
        source: '5-public/overview/WHY_ADORABLECSS.md',
        category: 'public',
        tags: ['why', 'philosophy', 'comparison'],
      },
      {
        title: 'Introduction',
        href: '/docs/introduction',
        description: 'Figma 스타일로 CSS 작성하기',
        source: '5-public/mdx/00-introduction.md',
        category: 'public',
        tags: ['introduction', 'overview', 'features', 'philosophy'],
      },
      {
        title: 'Quick Start',
        href: '/docs/quick-start',
        description: '5분 안에 첫 번째 컴포넌트 만들기',
        source: '5-public/getting-started/QUICK_START.md',
        category: 'public',
        tags: ['quick-start', 'tutorial'],
      },
      {
        title: 'Project Setup Guide',
        href: '/docs/project-setup',
        description: '실제 프로젝트에서 AdorableCSS 시작하기',
        source: '5-public/getting-started/PROJECT_SETUP.md',
        category: 'public',
        tags: ['setup', 'getting-started'],
      },
    ]
  },
  {
    title: 'Core Concepts',
    items: [
      {
        title: 'Design Principles',
        href: '/docs/design-principles',
        description: 'margin 안 쓰는 이유',
        source: '5-public/overview/DESIGN_PRINCIPLES.md',
        category: 'public',
        tags: ['design', 'principles', 'philosophy'],
      },
      {
        title: 'Figma-First CSS Utility',
        href: '/docs/figma-first-css-utility',
        description: 'hbox(), vbox(), gap() - Figma처럼 생각하기',
        source: '5-public/mdx/02-figma-first-css-utility.md',
        category: 'public',
        tags: ['figma', 'utility', 'design-to-code'],
      },
      {
        title: 'Design Token System',
        href: '/docs/design-token',
        description: 'sm, md, lg가 뭔지 다 아는 시스템',
        source: '5-public/mdx/03-design-token.md',
        category: 'public',
        tags: ['design-token', 'single-source-of-truth'],
      },
      {
        title: 'Color System',
        href: '/docs/color-system',
        description: 'OKLCH로 진짜 예쁜 그라데이션 만들기',
        source: '5-public/mdx/08-color-system.md',
        category: 'public',
        tags: ['color', 'oklch', 'gradient'],
      },
      {
        title: 'Layout System',
        href: '/docs/layout',
        description: 'Figma처럼 생각하고 코딩하기: hbox, vbox, gap',
        source: '5-public/mdx/04-layout.md',
        category: 'public',
        tags: ['layout', 'flexbox', 'grid', 'position', 'no-margin'],
      },
      {
        title: 'Component System',
        href: '/docs/component',
        description: 'button, card, input 한 번에 정의하기',
        source: '5-public/mdx/05-component.md',
        category: 'public',
        tags: ['component', 'design-system', 'reusable'],
      },
    ]
  },
  {
    title: 'Guides',
    items: [
      {
        title: 'Syntax Guide',
        href: '/docs/syntax-guide',
        description: 'p(20), c(red), bg(white.5) 문법 정리',
        source: '5-public/mdx/11-syntax-guide.md',
        category: 'public',
        tags: ['syntax', 'guide', 'grammar'],
      },
      {
        title: 'Cookbook',
        href: '/docs/cookbook',
        description: '복붙해서 쓰는 실전 예제',
        source: '5-public/COOKBOOK.md',
        category: 'public',
        tags: ['cookbook', 'examples', 'patterns', 'guide'],
      },
      {
        title: 'Common Mistakes & Best Practices',
        href: '/docs/common-mistakes',
        description: '이렇게 쓰지 마세요',
        source: '5-public/guides/COMMON_MISTAKES_FROM_TAILWIND.md',
        category: 'public',
        tags: ['mistakes', 'best-practices', 'wrong-vs-right'],
      },
      {
        title: 'Migration Guide',
        href: '/docs/migration-guide',
        description: 'Tailwind에서 갈아타기',
        source: '5-public/guides/MIGRATION_GUIDE.md',
        category: 'public',
        tags: ['migration', 'tailwind', 'css-in-js'],
      },
      {
        title: 'Tailwind Users Guide',
        href: '/docs/tailwind-users',
        description: 'TailwindCSS 사용자를 위한 10초 가이드',
        source: '5-public/guides/TAILWIND_USERS.md',
        category: 'public',
        tags: ['tailwind', 'guide', 'quick-reference'],
      },
      {
        title: 'Integration Guide',
        href: '/docs/integration-guide',
        description: 'React, Vue, Svelte에서 쓰는 법',
        source: '5-public/guides/INTEGRATION_GUIDE.md',
        category: 'public',
        tags: ['integration', 'tools', 'ecosystem'],
      },
      {
        title: 'Performance Guide',
        href: '/docs/performance-guide',
        description: '더 빠르게 만드는 방법',
        source: '5-public/guides/performance.md',
        category: 'public',
        tags: ['performance', 'optimization'],
      },
      {
        title: 'Troubleshooting Guide',
        href: '/docs/troubleshooting-guide',
        description: '안 될 때 보는 페이지',
        source: '5-public/guides/troubleshooting.md',
        category: 'public',
        tags: ['troubleshooting', 'debugging'],
      },
    ]
  },
  {
    title: 'API Reference',
    items: [
      {
        title: 'API Reference',
        href: '/docs/api-reference',
        description: '사용 가능한 모든 클래스 목록',
        source: '5-public/API_REFERENCE.md',
        category: 'public',
        tags: ['api', 'reference', 'rules', 'utilities'],
      },
      {
        title: 'JavaScript API',
        href: '/docs/javascript-api',
        description: 'JavaScript로 CSS 생성하기',
        source: '5-public/reference/JAVASCRIPT_API.md',
        category: 'public',
        tags: ['javascript', 'api', 'programmatic'],
      },
    ]
  },
  {
    title: 'Advanced Topics',
    items: [
      {
        title: 'Technical Architecture',
        href: '/docs/technical-architecture',
        description: '내부 동작 원리 (궁금하면 읽어보세요)',
        source: '5-public/mdx/07-technical-architecture.md',
        category: 'public',
        tags: ['architecture', 'parser', 'rules-engine', 'advanced'],
      },
    ]
  },
  {
    title: 'Community',
    items: [
      {
        title: 'Contributing',
        href: '/docs/contributing',
        description: 'PR 날리는 방법',
        source: '2-areas/community/development/CONTRIBUTING.md',
        category: 'public',
        tags: ['contributing', 'development', 'community'],
      },
      {
        title: 'Onboarding Guide',
        href: '/docs/onboarding',
        description: '처음 시작하는 사람들을 위한 가이드',
        source: '2-areas/community/onboarding/README.md',
        category: 'public',
        tags: ['onboarding', 'guide', 'new-users', 'principles'],
      },
    ]
  },
  // Internal Documentation Section
  {
    title: 'Projects & Strategy',
    items: [
      {
        title: 'Projects Overview',
        href: '/docs/projects',
        description: '명확한 마감일과 결과물이 있는 작업들',
        source: '1-projects/README.md',
        category: 'internal',
        tags: ['projects', 'roadmap', 'planning'],
      },
      {
        title: 'Features Tracking',
        href: '/docs/features',
        description: 'AdorableCSS의 모든 기능을 추적하고 문서화합니다.',
        source: '1-projects/active/features.md',
        category: 'internal',
        tags: ['features', 'roadmap', 'active'],
      },
      {
        title: 'Product Strategy & Roadmap',
        href: '/docs/product-strategy',
        description: 'AdorableCSS v2 제품 전략 및 로드맵',
        source: '1-projects/planning/PRODUCT_STRATEGY.md',
        category: 'internal',
        tags: ['product', 'strategy', 'roadmap', 'planning'],
      },
      {
        title: 'Technical Messaging',
        href: '/docs/tech-messaging',
        description: 'AdorableCSS - Technical Messaging Guide',
        source: '1-projects/planning/strategy/TECH_MESSAGING.md',
        category: 'internal',
        tags: ['marketing', 'messaging', 'strategy'],
      },
      {
        title: 'The 30-Second Pitch',
        href: '/docs/tech-pitch',
        description: 'AdorableCSS - The 30-Second Pitch',
        source: '1-projects/planning/strategy/TECH_PITCH.md',
        category: 'internal',
        tags: ['pitch', 'marketing', 'strategy'],
      },
    ]
  },
  {
    title: 'Design System (Internal)',
    items: [
      {
        title: 'Areas Overview',
        href: '/docs/areas',
        description: '지속적으로 관리해야 하는 책임 영역들',
        source: '2-areas/README.md',
        category: 'internal',
        tags: ['areas', 'management'],
      },
      {
        title: 'Design System Guide',
        href: '/docs/design-system-overview',
        description: 'AdorableCSS v2 디자인 시스템 가이드',
        source: '2-areas/design-system/DESIGN_SYSTEM_OVERVIEW.md',
        category: 'internal',
        tags: ['design-system', 'guide', 'overview'],
      },
      {
        title: 'Typography System',
        href: '/docs/typography-system',
        description: '계층적이고 의미론적인 타이포그래피 컴포넌트 시스템',
        source: '2-areas/design-system/TYPOGRAPHY-SYSTEM.md',
        category: 'internal',
        tags: ['typography', 'design-system'],
      },
    ]
  },
  {
    title: 'Team Onboarding',
    items: [
      {
        title: 'Claude Onboarding',
        href: '/docs/claude-onboarding',
        description: 'Claude Code와 같은 AI 도구들이 AdorableCSS를 올바르게 사용하기 위한 필수 가이드',
        source: '2-areas/community/onboarding/CLAUDE-ONBOARDING.md',
        category: 'internal',
        tags: ['claude', 'ai', 'onboarding'],
      },
      {
        title: 'Team Onboarding',
        href: '/docs/team-onboarding',
        description: '새로운 팀원을 위한 1일차 가이드',
        source: '2-areas/community/onboarding/TEAM_ONBOARDING.md',
        category: 'internal',
        tags: ['team', 'onboarding', 'guide'],
      },
    ]
  },
  {
    title: 'Technical Documentation',
    items: [
      {
        title: 'Best Practices',
        href: '/docs/best-practices',
        description: '대규모 프로젝트에서의 모범 사례',
        source: '3-resources/best-practices/development/BEST_PRACTICES.md',
        category: 'internal',
        tags: ['best-practices', 'development', 'guidelines'],
      },
      {
        title: 'Color Specification',
        href: '/docs/color-specification',
        description: 'AdorableCSS의 색상 시스템에 대한 공식 사양입니다.',
        source: '3-resources/best-practices/technical/COLOR_SPECIFICATION.md',
        category: 'internal',
        tags: ['color', 'specification', 'technical'],
      },
      {
        title: 'Core Concepts - Visual Guide',
        href: '/docs/core-concepts-visual',
        description: 'AdorableCSS 핵심 개념을 시각적으로 설명합니다.',
        source: '3-resources/best-practices/technical/CORE_CONCEPTS_VISUAL.md',
        category: 'internal',
        tags: ['core-concepts', 'visual-guide', 'technical'],
      },
      {
        title: 'Syntax Updates',
        href: '/docs/syntax-updates',
        description: 'AdorableCSS v2 문법 업데이트 요약',
        source: '3-resources/best-practices/technical/SYNTAX_UPDATES.md',
        category: 'internal',
        tags: ['syntax', 'updates', 'technical'],
      },
      {
        title: 'Position Coordinate Syntax',
        href: '/docs/position-syntax',
        description: 'AdorableCSS v2의 좌표 기반 포지셔닝 문법',
        source: '3-resources/best-practices/technical/position-syntax.md',
        category: 'internal',
        tags: ['position', 'syntax', 'technical'],
      },
      {
        title: 'Range Syntax Guide',
        href: '/docs/range-syntax',
        description: 'AdorableCSS의 다양한 range(..) 문법 완벽 가이드',
        source: '3-resources/best-practices/technical/range-syntax.md',
        category: 'internal',
        tags: ['range', 'syntax', 'technical'],
      },
      {
        title: 'Syntax Philosophy',
        href: '/docs/syntax-philosophy',
        description: 'AdorableCSS 문법 체계',
        source: '3-resources/best-practices/technical/syntax-philosophy.md',
        category: 'internal',
        tags: ['syntax', 'philosophy', 'technical'],
      },
      {
        title: 'defineComponent',
        href: '/docs/define-component',
        description: '`defineComponent`는 AdorableCSS에서 재사용 가능한 컴포넌트를 정의하는 통합 헬퍼 함수입니다.',
        source: '3-resources/best-practices/technical/archive/defineComponent.md',
        category: 'internal',
        tags: ['component', 'defineComponent', 'technical'],
      },
    ]
  },
  {
    title: 'Research & Analysis',
    items: [
      {
        title: 'Resources Overview',
        href: '/docs/resources',
        description: '미래에 참고할 수 있는 지식과 정보',
        source: '3-resources/README.md',
        category: 'internal',
        tags: ['resources', 'knowledge'],
      },
      {
        title: 'Figma Compatibility Background',
        href: '/docs/figma-compatibility-background',
        description: 'Figma와 CSS 사이의 간극, 그리고 AdorableCSS의 탄생',
        source: '3-resources/research/background-figma-compatibility.md',
        category: 'internal',
        tags: ['figma', 'css', 'research'],
      },
      {
        title: 'Token Scale Generator',
        href: '/docs/token-scale-generator',
        description: '수학적으로 완벽한 디자인 토큰 스케일을 생성하는 강력한 시스템',
        source: '3-resources/research/token-scale-generator.md',
        category: 'internal',
        tags: ['token', 'scale', 'generator', 'research'],
      },
      {
        title: 'Design Token Calculation Research',
        href: '/docs/design-token-calculation-research',
        description: 'Design Token 계산식 시스템 연구 보고서',
        source: '3-resources/research/token-calculation-research.md',
        category: 'internal',
        tags: ['token', 'calculation', 'research'],
      },
      {
        title: 'Project Analysis Summary',
        href: '/docs/project-analysis-summary',
        description: 'AdorableCSS v2 프로젝트 분석 요약',
        source: '3-resources/research/project-analysis-summary.md',
        category: 'internal',
        tags: ['project-analysis', 'summary', 'research'],
      },
      {
        title: 'Master CSS Inspired Features',
        href: '/docs/master-css-inspired-features',
        description: 'Master CSS에서 영감받은 AdorableCSS v2 신규 기능 제안',
        source: '3-resources/research/packages/adorable-css-core/MASTER_CSS_INSPIRED_FEATURES.md',
        category: 'internal',
        tags: ['features', 'master-css', 'research'],
      },
      {
        title: 'Core Architecture Analysis',
        href: '/docs/core-folder-structure-analysis',
        description: 'AdorableCSS Core - Folder Structure Analysis Report',
        source: '3-resources/research/packages/adorable-css-core/FOLDER_STRUCTURE_ANALYSIS.md',
        category: 'internal',
        tags: ['architecture', 'folder-structure', 'analysis'],
      },
    ]
  },
  {
    title: 'Development Resources',
    items: [
      {
        title: 'Unused Files Guide',
        href: '/docs/unused-files-guide',
        description: '사용하지 않는 파일 찾기 가이드',
        source: '3-resources/development/UNUSED_FILES_GUIDE.md',
        category: 'internal',
        tags: ['unused-files', 'guide', 'development'],
      },
      {
        title: 'Heading Plugin Documentation',
        href: '/docs/heading-plugin-documentation',
        description: 'Heading plugin provides a comprehensive typography system for headings.',
        source: '3-resources/research/packages/adorable-css-core/HEADING_PLUGIN.md',
        category: 'internal',
        tags: ['plugin', 'heading', 'typography'],
      },
    ]
  },
  {
    title: 'Package Documentation',
    items: [
      {
        title: 'AdorableCSS Core',
        href: '/docs/adorable-css-core-readme',
        description: 'The core parsing and generation engine for AdorableCSS v2.',
        source: '3-resources/research/packages/adorable-css-core/README.md',
        category: 'internal',
        tags: ['core', 'engine', 'readme'],
      },
      {
        title: 'AdorableCSS CDN',
        href: '/docs/cdn-readme',
        description: 'Browser-ready distribution of AdorableCSS v2 for direct use via CDN.',
        source: '3-resources/research/packages/adorable-css-cdn/README.MB',
        category: 'internal',
        tags: ['cdn', 'readme'],
      },
      {
        title: 'CDN Debugging',
        href: '/docs/cdn-debugging',
        description: 'AdorableCSS v2 CDN 패키지는 생성되지 않은 클래스를 자동으로 감지하고 로그로 표시합니다.',
        source: '3-resources/research/packages/adorable-css-cdn/DEBUGGING.md',
        category: 'internal',
        tags: ['cdn', 'debugging', 'troubleshooting'],
      },
      {
        title: 'Homepage Kit',
        href: '/docs/homepage-kit-readme',
        description: 'Everything you need to build a Svelte project, powered by `sv`.',
        source: '3-resources/research/packages/homepage-kit/README.md',
        category: 'internal',
        tags: ['homepage', 'svelte', 'readme'],
      },
      {
        title: 'Homepage Design Analysis',
        href: '/docs/homepage-kit-design-system-analysis',
        description: 'Comprehensive analysis of the design patterns and components used in the AdorableCSS homepage.',
        source: '3-resources/research/packages/homepage-kit/DESIGN_SYSTEM_ANALYSIS.md',
        category: 'internal',
        tags: ['homepage', 'design-system', 'analysis'],
      },
      {
        title: 'Tailwind Conversion Report',
        href: '/docs/tailwind-conversion-report',
        description: 'Report on Tailwind CSS classes found in homepage-kit that need conversion.',
        source: '3-resources/research/packages/homepage-kit/TAILWIND_CONVERSION_REPORT.md',
        category: 'internal',
        tags: ['tailwind', 'conversion', 'report'],
      },
    ]
  },
  {
    title: 'Archive',
    items: [
      {
        title: 'Archive Overview',
        href: '/docs/archive',
        description: '완료되었거나 더 이상 관련 없는 항목들',
        source: '4-archive/README.md',
        category: 'internal',
        tags: ['archive', 'completed', 'deprecated'],
      },
      {
        title: 'Documentation Cleanup',
        href: '/docs/cleanup-summary',
        description: '문서 정리 요약',
        source: '4-archive/completed-projects/CLEANUP_SUMMARY.md',
        category: 'internal',
        tags: ['cleanup', 'summary', 'documentation'],
      },
    ]
  },
];

// Helper function to get all doc items including API docs
export function getAllDocItems(): DocsConfig[] {
  return docsConfig.flatMap(section => section.items);
}

// Find document by href
export function findDocByHref(href: string): DocsConfig | null {
  for (const section of docsConfig) {
    const doc = section.items.find(item => item.href === href);
    if (doc) return doc;
  }
  return null;
}

// Get navigation structure
export function getDocNavigation(currentHref?: string) {
  const allDocs = getAllDocItems();
  const currentIndex = currentHref ? allDocs.findIndex(doc => doc.href === currentHref) : -1;
  
  return {
    prev: currentIndex > 0 ? allDocs[currentIndex - 1] : null,
    next: currentIndex >= 0 && currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null,
    current: currentIndex >= 0 ? allDocs[currentIndex] : null
  };
}

// Get first document
export function getFirstDocItem(): DocsConfig | null {
  return docsConfig[0]?.items[0] || null;
}

// Get documents by category
export function getDocsByCategory(category: 'public' | 'internal' | 'api'): DocsConfig[] {
  return getAllDocItems().filter(doc => doc.category === category);
}

// Search documents by tags
export function searchDocsByTags(tags: string[]): DocsConfig[] {
  return getAllDocItems().filter(doc => 
    doc.tags && tags.some(tag => doc.tags!.includes(tag))
  );
}

// Docs metadata
export const docsMetadata = {
  total: getAllDocItems().length,
  categories: {
    public: getAllDocItems().filter(d => d.category === 'public').length,
    internal: getAllDocItems().filter(d => d.category === 'internal').length,
    api: getAllDocItems().filter(d => d.category === 'api').length
  }
};

// Type definitions for backward compatibility
export type DocSection = DocsSection;
export type DocItem = DocsConfig;