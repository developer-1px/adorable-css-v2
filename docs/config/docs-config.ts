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

export const docsConfig: DocsConfig[] = [
  // 1-projects
  {
    title: 'Projects',
    href: '/docs/projects',
    description: '명확한 마감일과 결과물이 있는 작업들',
    source: '1-projects/README.md',
    category: 'internal',
    tags: ['projects', 'roadmap', 'planning'],
  },
  {
    title: 'AdorableCSS Features',
    href: '/docs/features',
    description: 'AdorableCSS의 모든 기능을 추적하고 문서화합니다.',
    source: '1-projects/active/features.md',
    category: 'internal',
    tags: ['features', 'roadmap', 'active'],
  },
  {
    title: 'Product Strategy & Development Roadmap',
    href: '/docs/product-strategy',
    description: 'AdorableCSS v2 제품 전략 및 로드맵',
    source: '1-projects/planning/PRODUCT_STRATEGY.md',
    category: 'internal',
    tags: ['product', 'strategy', 'roadmap', 'planning'],
  },
  {
    title: 'Technical Messaging Guide',
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

  // 2-areas
  {
    title: 'Areas',
    href: '/docs/areas',
    description: '지속적으로 관리해야 하는 책임 영역들',
    source: '2-areas/README.md',
    category: 'internal',
    tags: ['areas', 'management'],
  },
  {
    title: 'AdorableCSS Design System Guide',
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
  {
    title: 'Design Philosophy',
    href: '/docs/design-philosophy',
    description: 'AdorableCSS의 핵심 디자인 철학 및 원칙',
    source: '2-areas/design-system/DESIGN_PHILOSOPHY.md',
    category: 'internal',
    tags: ['design', 'philosophy', 'principles'],
  },
  {
    title: 'API Reference',
    href: '/docs/api-reference',
    description: 'AdorableCSS의 모든 규칙과 유틸리티 클래스에 대한 완전한 레퍼런스입니다.',
    source: '2-areas/documentation/REFERENCE.md',
    category: 'api',
    tags: ['api', 'reference', 'rules', 'utilities'],
  },
  {
    title: 'Contributing to AdorableCSS',
    href: '/docs/contributing',
    description: 'AdorableCSS에 기여하는 방법을 안내합니다.',
    source: '2-areas/community/development/CONTRIBUTING.md',
    category: 'internal',
    tags: ['contributing', 'development', 'community'],
  },
  {
    title: 'AdorableCSS 문법 실수 기록',
    href: '/docs/adorable-css-mistakes',
    description: '홈페이지 제작 중 발견한 AdorableCSS 문법 실수들을 기록합니다.',
    source: '2-areas/community/development/ADORABLE_CSS_MISTAKES.md',
    category: 'internal',
    tags: ['mistakes', 'common-mistakes', 'development'],
  },
  {
    title: 'AdorableCSS 온보딩',
    href: '/docs/onboarding',
    description: '새로운 사용자와 AI 도구들을 위한 체계적인 학습 가이드',
    source: '2-areas/community/onboarding/README.md',
    category: 'internal',
    tags: ['onboarding', 'guide', 'new-users'],
  },
  {
    title: 'Claude 온보딩 가이드',
    href: '/docs/claude-onboarding',
    description: 'Claude Code와 같은 AI 도구들이 AdorableCSS를 올바르게 사용하기 위한 필수 가이드',
    source: '2-areas/community/onboarding/CLAUDE-ONBOARDING.md',
    category: 'internal',
    tags: ['claude', 'ai', 'onboarding'],
  },
  {
    title: 'AdorableCSS 핵심 원칙',
    href: '/docs/core-principles',
    description: '모든 AdorableCSS 사용자가 반드시 알아야 하는 기본 원칙들',
    source: '2-areas/community/onboarding/CORE-PRINCIPLES.md',
    category: 'internal',
    tags: ['principles', 'core', 'guide'],
  },
  {
    title: '잘못된 vs 올바른 사용법',
    href: '/docs/wrong-vs-right',
    description: '실제 코드 예제로 보는 AdorableCSS의 올바른 사용법',
    source: '2-areas/community/onboarding/WRONG-VS-RIGHT.md',
    category: 'internal',
    tags: ['examples', 'best-practices', 'wrong-vs-right'],
  },
  {
    title: '팀 온보딩 가이드',
    href: '/docs/team-onboarding',
    description: '새로운 팀원을 위한 1일차 가이드',
    source: '2-areas/community/onboarding/TEAM_ONBOARDING.md',
    category: 'internal',
    tags: ['team', 'onboarding', 'guide'],
  },

  // 3-resources
  {
    title: 'Resources',
    href: '/docs/resources',
    description: '미래에 참고할 수 있는 지식과 정보',
    source: '3-resources/README.md',
    category: 'internal',
    tags: ['resources', 'knowledge'],
  },
  {
    title: 'AdorableCSS Best Practices',
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
    title: 'Range 문법 총정리',
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
    title: 'Project Analysis Summary',
    href: '/docs/project-analysis-summary',
    description: 'AdorableCSS v2 프로젝트 분석 요약',
    source: '3-resources/research/project-analysis-summary.md',
    category: 'internal',
    tags: ['project-analysis', 'summary', 'research'],
  },
  {
    title: 'Unused Files Guide',
    href: '/docs/unused-files-guide',
    description: '사용하지 않는 파일 찾기 가이드',
    source: '3-resources/development/UNUSED_FILES_GUIDE.md',
    category: 'internal',
    tags: ['unused-files', 'guide', 'development'],
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
    title: 'AdorableCSS Core - Folder Structure Analysis Report',
    href: '/docs/core-folder-structure-analysis',
    description: 'AdorableCSS Core - Folder Structure Analysis Report',
    source: '3-resources/research/packages/adorable-css-core/FOLDER_STRUCTURE_ANALYSIS.md',
    category: 'internal',
    tags: ['architecture', 'folder-structure', 'analysis'],
  },
  {
    title: 'Heading Plugin Documentation',
    href: '/docs/heading-plugin-documentation',
    description: 'Heading plugin provides a comprehensive typography system for headings.',
    source: '3-resources/research/packages/adorable-css-core/HEADING_PLUGIN.md',
    category: 'internal',
    tags: ['plugin', 'heading', 'typography'],
  },
  {
    title: 'AdorableCSS Core README',
    href: '/docs/adorable-css-core-readme',
    description: 'The core parsing and generation engine for AdorableCSS v2.',
    source: '3-resources/research/packages/adorable-css-core/README.md',
    category: 'internal',
    tags: ['core', 'engine', 'readme'],
  },
  {
    title: 'AdorableCSS CDN - Debugging',
    href: '/docs/cdn-debugging',
    description: 'AdorableCSS v2 CDN 패키지는 생성되지 않은 클래스를 자동으로 감지하고 로그로 표시합니다.',
    source: '3-resources/research/packages/adorable-css-cdn/DEBUGGING.md',
    category: 'internal',
    tags: ['cdn', 'debugging', 'troubleshooting'],
  },
  {
    title: 'AdorableCSS CDN README',
    href: '/docs/cdn-readme',
    description: 'Browser-ready distribution of AdorableCSS v2 for direct use via CDN.',
    source: '3-resources/research/packages/adorable-css-cdn/README.MB',
    category: 'internal',
    tags: ['cdn', 'readme'],
  },
  {
    title: 'Homepage Kit Design System Analysis',
    href: '/docs/homepage-kit-design-system-analysis',
    description: 'Comprehensive analysis of the design patterns and components used in the AdorableCSS homepage.',
    source: '3-resources/research/packages/homepage-kit/DESIGN_SYSTEM_ANALYSIS.md',
    category: 'internal',
    tags: ['homepage', 'design-system', 'analysis'],
  },
  {
    title: 'Homepage Kit README',
    href: '/docs/homepage-kit-readme',
    description: 'Everything you need to build a Svelte project, powered by `sv`.',
    source: '3-resources/research/packages/homepage-kit/README.md',
    category: 'internal',
    tags: ['homepage', 'svelte', 'readme'],
  },
  {
    title: 'Tailwind Conversion Report',
    href: '/docs/tailwind-conversion-report',
    description: 'Report on Tailwind CSS classes found in homepage-kit that need conversion.',
    source: '3-resources/research/packages/homepage-kit/TAILWIND_CONVERSION_REPORT.md',
    category: 'internal',
    tags: ['tailwind', 'conversion', 'report'],
  },
  {
    title: 'Design Token Calculation Research',
    href: '/docs/design-token-calculation-research',
    description: 'Design Token 계산식 시스템 연구 보고서',
    source: '3-resources/research/token-calculation-research.md',
    category: 'internal',
    tags: ['token', 'calculation', 'research'],
  },

  // 4-archive
  {
    title: 'Archive',
    href: '/docs/archive',
    description: '완료되었거나 더 이상 관련 없는 항목들',
    source: '4-archive/README.md',
    category: 'internal',
    tags: ['archive', 'completed', 'deprecated'],
  },
  {
    title: 'Documentation Cleanup Summary',
    href: '/docs/cleanup-summary',
    description: '문서 정리 요약',
    source: '4-archive/completed-projects/CLEANUP_SUMMARY.md',
    category: 'internal',
    tags: ['cleanup', 'summary', 'documentation'],
  },
  {
    title: 'Deprecated Design System',
    href: '/docs/deprecated-design-system',
    description: 'This document contains outdated syntax and is kept for historical reference only.',
    source: '4-archive/deprecated/DESIGN_SYSTEM.md',
    category: 'internal',
    tags: ['deprecated', 'design-system'],
    badge: 'deprecated',
  },
  {
    title: 'Deprecated Design System Analysis',
    href: '/docs/deprecated-design-system-analysis',
    description: 'Comprehensive analysis of the AdorableCSS design system plugins and usage patterns.',
    source: '4-archive/deprecated/design-system-analysis.md',
    category: 'internal',
    tags: ['deprecated', 'design-system', 'analysis'],
    badge: 'deprecated',
  },
  {
    title: 'Clean Components Report',
    href: '/docs/clean-components-report',
    description: 'Successfully removed all legacy CSS object code from AdorableCSS v2 components.',
    source: '4-archive/deprecated/reports/CLEAN_COMPONENTS_REPORT.md',
    category: 'internal',
    tags: ['deprecated', 'components', 'report'],
    badge: 'deprecated',
  },
  {
    title: 'Component Conversion Report',
    href: '/docs/component-conversion-report',
    description: 'CSS Objects → AdorableCSS Strings',
    source: '4-archive/deprecated/reports/COMPONENT_CONVERSION_REPORT.md',
    category: 'internal',
    tags: ['deprecated', 'components', 'conversion'],
    badge: 'deprecated',
  },
  {
    title: 'Shadcn/UI Enhancement Report',
    href: '/docs/shadcn-ui-enhancement-report',
    description: 'Successfully enhanced AdorableCSS v2 components to achieve the shadcn/ui aesthetic.',
    source: '4-archive/deprecated/reports/SHADCN_UI_ENHANCEMENT_REPORT.md',
    category: 'internal',
    tags: ['deprecated', 'shadcn-ui', 'enhancement'],
    badge: 'deprecated',
  },
  {
    title: 'Margin Usage Report',
    href: '/docs/margin-usage-report',
    description: 'Margin 사용 보고서',
    source: '4-archive/deprecated/reports/margin-usage-report.md',
    category: 'internal',
    tags: ['deprecated', 'margin', 'report'],
    badge: 'deprecated',
  },
  {
    title: 'Token Calculation Research (Deprecated)',
    href: '/docs/deprecated-token-calculation-research',
    description: 'Design Token 계산식 시스템 연구 보고서 (Deprecated)',
    source: '4-archive/deprecated/reports/token-calculation-research.md',
    category: 'internal',
    tags: ['deprecated', 'token', 'calculation', 'research'],
    badge: 'deprecated',
  },

  // 5-public
  {
    title: 'Background',
    href: '/docs/background',
    description: '디자인과 개발, 왜 우리는 같은 곳을 보지 못하는가?',
    source: '5-public/mdx/00-background.md',
    category: 'public',
    tags: ['design', 'development', 'problem'],
  },
  {
    title: 'Introduction',
    href: '/docs/introduction',
    description: 'AdorableCSS: 디자인과 개발의 언어 장벽을 허무는 혁신',
    source: '5-public/mdx/00-introduction.md',
    category: 'public',
    tags: ['introduction', 'overview'],
  },
  {
    title: 'Overview',
    href: '/docs/overview',
    description: 'AdorableCSS: 디자인과 개발의 언어 장벽을 허무는 혁신',
    source: '5-public/mdx/01-overview.md',
    category: 'public',
    tags: ['overview', 'features', 'philosophy'],
  },
  {
    title: 'Figma-First CSS Utility',
    href: '/docs/figma-first-css-utility',
    description: '디자인 의도를 코드로, 코드 의도를 디자인으로',
    source: '5-public/mdx/02-figma-first-css-utility.md',
    category: 'public',
    tags: ['figma', 'utility', 'design-to-code'],
  },
  {
    title: 'Design Token System',
    href: '/docs/design-token',
    description: '디자인과 개발을 잇는 단일 진실 공급원',
    source: '5-public/mdx/03-design-token.md',
    category: 'public',
    tags: ['design-token', 'single-source-of-truth'],
  },
  {
    title: 'Layout System',
    href: '/docs/layout',
    description: 'Figma처럼 생각하고 코딩하기',
    source: '5-public/mdx/04-layout.md',
    category: 'public',
    tags: ['layout', 'flexbox', 'grid', 'position'],
  },
  {
    title: 'Component System',
    href: '/docs/component',
    description: '디자인 시스템의 재사용 가능한 빌딩 블록',
    source: '5-public/mdx/05-component.md',
    category: 'public',
    tags: ['component', 'design-system', 'reusable'],
  },
  {
    title: 'Technical Architecture',
    href: '/docs/technical-architecture',
    description: 'AdorableCSS의 내부 아키텍처와 파서 시스템, 규칙 엔진에 대한 심층 분석입니다.',
    source: '5-public/mdx/07-technical-architecture.md',
    category: 'public',
    tags: ['architecture', 'parser', 'rules-engine'],
  },
  {
    title: 'Color System',
    href: '/docs/color-system',
    description: 'AdorableCSS의 과학적이고 혁신적인 색상 시스템에 대한 완전한 가이드입니다.',
    source: '5-public/mdx/08-color-system.md',
    category: 'public',
    tags: ['color', 'oklch', 'gradient'],
  },
  {
    title: 'Rules Reference',
    href: '/docs/rules-reference',
    description: 'AdorableCSS의 모든 규칙과 유틸리티 클래스에 대한 완전한 레퍼런스입니다.',
    source: '5-public/mdx/09-rules-reference.md',
    category: 'public',
    tags: ['rules', 'reference', 'utilities'],
  },
  {
    title: 'JavaScript API',
    href: '/docs/javascript-api',
    description: 'AdorableCSS를 프로그래매틱하게 사용하기 위한 JavaScript API 가이드입니다.',
    source: '5-public/mdx/10-javascript-api.md',
    category: 'public',
    tags: ['javascript', 'api', 'programmatic'],
  },
  {
    title: 'Syntax Guide',
    href: '/docs/syntax-guide',
    description: 'AdorableCSS의 완전한 문법 체계와 사용법을 안내합니다.',
    source: '5-public/mdx/11-syntax-guide.md',
    category: 'public',
    tags: ['syntax', 'guide', 'grammar'],
  },
  {
    title: 'API Reference (Public)',
    href: '/docs/public-api-reference',
    description: 'AdorableCSS의 모든 규칙과 유틸리티 클래스에 대한 완전한 레퍼런스입니다.',
    source: '5-public/API_REFERENCE.md',
    category: 'public',
    tags: ['api', 'reference', 'rules', 'utilities'],
  },
  {
    title: 'Practical Guide',
    href: '/docs/practical-guide',
    description: '실무에서 바로 쓰는 레시피 모음',
    source: '5-public/PRACTICAL_GUIDE.md',
    category: 'public',
    tags: ['guide', 'cookbook', 'examples'],
  },
  {
    title: 'Project Setup Guide',
    href: '/docs/project-setup',
    description: '새 프로젝트에서 AdorableCSS 시작하기',
    source: '5-public/getting-started/PROJECT_SETUP.md',
    category: 'public',
    tags: ['setup', 'getting-started'],
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
    title: 'Common Mistakes From Tailwind',
    href: '/docs/common-mistakes-from-tailwind',
    description: 'Tailwind CSS에서 AdorableCSS로 넘어올 때 자주 발생하는 실수들과 올바른 사용법',
    source: '5-public/guides/COMMON_MISTAKES_FROM_TAILWIND.md',
    category: 'public',
    tags: ['tailwind', 'mistakes', 'migration'],
  },
  {
    title: 'Integration Guide',
    href: '/docs/integration-guide',
    description: 'AdorableCSS와 다른 도구들의 조화로운 공존',
    source: '5-public/guides/INTEGRATION_GUIDE.md',
    category: 'public',
    tags: ['integration', 'tools', 'ecosystem'],
  },
  {
    title: 'Migration Guide',
    href: '/docs/migration-guide',
    description: 'TailwindCSS, CSS-in-JS, 또는 기존 CSS에서 AdorableCSS로 마이그레이션하는 가이드',
    source: '5-public/guides/MIGRATION_GUIDE.md',
    category: 'public',
    tags: ['migration', 'tailwind', 'css-in-js'],
  },
  {
    title: 'Tailwind Users',
    href: '/docs/tailwind-users',
    description: 'TailwindCSS 사용자를 위한 10초 가이드',
    source: '5-public/guides/TAILWIND_USERS.md',
    category: 'public',
    tags: ['tailwind', 'guide', 'quick-reference'],
  },
  {
    title: 'Performance Guide',
    href: '/docs/performance-guide',
    description: 'AdorableCSS 성능 최적화 가이드',
    source: '5-public/guides/performance.md',
    category: 'public',
    tags: ['performance', 'optimization'],
  },
  {
    title: 'Troubleshooting Guide',
    href: '/docs/troubleshooting-guide',
    description: '"왜 안 되지?" 싶을 때 보는 가이드',
    source: '5-public/guides/troubleshooting.md',
    category: 'public',
    tags: ['troubleshooting', 'debugging'],
  },
  {
    title: 'Cookbook',
    href: '/docs/cookbook',
    description: '실무에서 바로 쓰는 레시피 모음',
    source: '5-public/examples/COOKBOOK.md',
    category: 'public',
    tags: ['cookbook', 'examples', 'patterns'],
  },
  {
    title: 'Design Principles',
    href: '/docs/design-principles',
    description: 'AdorableCSS 디자인 철학 및 원칙',
    source: '5-public/overview/DESIGN_PRINCIPLES.md',
    category: 'public',
    tags: ['design', 'principles', 'philosophy'],
  },
  {
    title: 'Why AdorableCSS',
    href: '/docs/why-adorablecss',
    description: '"또 다른 CSS Framework가 왜 필요한가요?"',
    source: '5-public/overview/WHY_ADORABLECSS.md',
    category: 'public',
    tags: ['why', 'philosophy', 'comparison'],
  },
];

// Helper function to get all doc items including API docs
export function getAllDocItems(): DocsConfig[] {
  return docsConfig; // Only return static docs for now to avoid circular dependency
}

// Find document by href
export function findDocByHref(href: string): DocsConfig | null {
  return docsConfig.find(doc => doc.href === href) || null;
}

// Get navigation structure
export function getDocNavigation() {
  return docsConfig.map(doc => ({
    title: doc.title,
    href: doc.href,
    category: doc.category,
    tags: doc.tags
  }));
}

// Get first document
export function getFirstDocItem(): DocsConfig | null {
  return docsConfig[0] || null;
}

// Get documents by category
export function getDocsByCategory(category: 'public' | 'internal' | 'api'): DocsConfig[] {
  return docsConfig.filter(doc => doc.category === category);
}

// Search documents by tags
export function searchDocsByTags(tags: string[]): DocsConfig[] {
  return docsConfig.filter(doc => 
    doc.tags && tags.some(tag => doc.tags!.includes(tag))
  );
}

// Docs metadata
export const docsMetadata = {
  total: docsConfig.length,
  categories: {
    public: docsConfig.filter(d => d.category === 'public').length,
    internal: docsConfig.filter(d => d.category === 'internal').length,
    api: docsConfig.filter(d => d.category === 'api').length
  }
};

// Type definitions for backward compatibility
export type DocSection = DocsConfig;
export type DocItem = DocsConfig;