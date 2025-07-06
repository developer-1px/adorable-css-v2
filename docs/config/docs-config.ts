/**
 * Documentation configuration
 * This file defines the structure and order of documentation
 * 
 * Path Resolution:
 * - Absolute paths starting with '/' are resolved from monorepo root
 * - Relative paths are resolved from the docs package
 */

export interface DocSection {
	title: string;
	items: DocItem[];
}

export interface DocItem {
	title: string;
	href: string;
	description?: string;
	badge?: 'new' | 'beta' | 'deprecated' | 'experimental';
	external?: boolean; // For external markdown files
	source?: string; // Path to external markdown file
	category?: 'public' | 'internal' | 'api'; // Documentation category
	tags?: string[]; // For search and filtering
}

export const docsConfig: DocSection[] = [
	{
		title: '시작하기',
		items: [
			{
				title: 'Background',
				href: '/docs/background',
				description: '디자인과 코드 사이의 영원한 숙제',
				source: '/docs/5-public/mdx/00-background.md',
				category: 'public',
				badge: 'new',
				tags: ['intro', 'philosophy']
			},
			{
				title: 'Overview',
				href: '/docs/overview',
				description: 'AdorableCSS의 핵심 철학과 기본 개념',
				source: '/docs/5-public/mdx/01-overview.md',
				category: 'public',
				tags: ['intro', 'core']
			},
			{
				title: 'Getting Started',
				href: '/docs/getting-started',
				description: '설치와 첫 번째 컴포넌트',
				source: '/docs/5-public/getting-started/QUICK_START.md',
				category: 'public',
				tags: ['setup', 'tutorial']
			},
			{
				title: '문법 가이드',
				href: '/docs/syntax-guide',
				description: '완전한 문법 체계와 사용법',
				source: '/docs/5-public/mdx/11-syntax-guide.md',
				category: 'public',
				tags: ['syntax', 'reference']
			},
			{
				title: 'Claude 온보딩',
				href: '/docs/claude-onboarding',
				description: 'AI 도구를 위한 AdorableCSS 가이드',
				source: '/docs/2-areas/community/onboarding/CLAUDE-ONBOARDING.md',
				category: 'internal',
				badge: 'new',
				tags: ['ai', 'onboarding']
			}
		]
	},
	{
		title: '핵심 개념',
		items: [
			{
				title: 'Figma-First CSS Utility',
				href: '/docs/figma-first-css-utility',
				description: 'Figma 디자인 패널과 CSS 유틸리티 매핑',
				source: '/docs/5-public/mdx/02-figma-first-css-utility.md',
				category: 'public',
				tags: ['figma', 'design']
			},
			{
				title: 'Design Token',
				href: '/docs/design-token',
				description: '완전한 디자인 토큰 시스템',
				source: '/docs/5-public/mdx/03-design-token.md',
				category: 'public',
				tags: ['tokens', 'design']
			},
			{
				title: 'Layout 시스템',
				href: '/docs/layout',
				description: 'Auto Layout, Grid, Position 등 레이아웃 시스템',
				source: '/docs/5-public/mdx/04-layout.md',
				category: 'public',
				tags: ['layout', 'flexbox']
			},
			{
				title: 'Design Philosophy',
				href: '/docs/design-philosophy',
				description: 'AdorableCSS 디자인 철학 및 원칙',
				source: '/docs/DESIGN_PHILOSOPHY.md',
				category: 'public',
				tags: ['philosophy', 'principles']
			}
		]
	},
	{
		title: 'Component & Design System',
		items: [
			{
				title: 'Component 시스템',
				href: '/docs/component',
				description: 'defineComponent API와 내장 컴포넌트',
				source: '/docs/5-public/mdx/05-component.md',
				category: 'public',
				tags: ['components', 'api']
			},
			{
				title: 'Typography System',
				href: '/docs/typography-system',
				description: '7가지 의미론적 타이포그래피 컴포넌트',
				source: '/docs/2-areas/design-system/TYPOGRAPHY-SYSTEM.md',
				category: 'public',
				badge: 'new',
				tags: ['typography', 'components']
			},
			{
				title: 'Design System 구축',
				href: '/docs/design-system',
				description: '완전한 디자인 시스템 구축 가이드',
				source: '/docs/5-public/mdx/06-design-system.md',
				category: 'public',
				badge: 'new',
				tags: ['design-system', 'guide']
			}
		]
	},
	{
		title: '기술 문서',
		items: [
			{
				title: '기술 아키텍처',
				href: '/docs/technical-architecture',
				description: '파서 시스템, 규칙 엔진, 우선순위 시스템',
				source: '/docs/5-public/mdx/07-technical-architecture.md',
				category: 'public',
				tags: ['architecture', 'technical']
			},
			{
				title: '색상 시스템',
				href: '/docs/color-system',
				description: 'OKLCH, Dot Notation, 그라디언트 시스템',
				source: '/docs/5-public/mdx/08-color-system.md',
				category: 'public',
				tags: ['color', 'oklch']
			},
			{
				title: 'Plugin Architecture',
				href: '/docs/plugin-architecture',
				description: '플러그인 시스템 상세 설계',
				source: '/docs/3-resources/technical/plugin-architecture.md',
				category: 'internal',
				tags: ['plugin', 'architecture']
			}
		]
	},
	{
		title: 'API Reference',
		items: [
			{
				title: 'Rules Reference',
				href: '/docs/rules-reference',
				description: '모든 규칙과 유틸리티 클래스',
				source: '/docs/5-public/mdx/09-rules-reference.md',
				category: 'api',
				tags: ['api', 'reference']
			},
			{
				title: 'JavaScript API',
				href: '/docs/javascript-api',
				description: '프로그래매틱 사용법',
				source: '/docs/5-public/mdx/10-javascript-api.md',
				category: 'api',
				tags: ['api', 'javascript']
			},
			{
				title: 'API Reference',
				href: '/docs/reference',
				description: '전체 API 문서',
				source: '/docs/REFERENCE.md',
				category: 'api',
				tags: ['api', 'complete']
			}
		]
	},
	{
		title: 'Migration',
		items: [
			{
				title: 'From Tailwind',
				href: '/docs/migration-tailwind',
				description: 'Tailwind CSS에서 마이그레이션',
				source: '/docs/5-public/guides/TAILWIND_USERS.md',
				category: 'public',
				tags: ['migration', 'tailwind']
			},
			{
				title: 'Tailwind 사용자 흔한 실수',
				href: '/docs/common-mistakes-tailwind',
				description: 'Tailwind 습관으로 인한 실수들과 해결법',
				source: '/docs/5-public/guides/COMMON_MISTAKES_FROM_TAILWIND.md',
				category: 'public',
				badge: 'new',
				tags: ['tailwind', 'mistakes', 'common-errors', 'migration']
			},
			{
				title: 'Migration Guide',
				href: '/docs/migration-guide',
				description: '전체 마이그레이션 가이드',
				source: '/docs/5-public/guides/MIGRATION_GUIDE.md',
				category: 'public',
				tags: ['migration', 'guide']
			}
		]
	},
	{
		title: '실전 가이드',
		items: [
			{
				title: 'Why AdorableCSS?',
				href: '/docs/why-adorablecss',
				description: '왜 AdorableCSS를 선택해야 하는가',
				source: '/docs/5-public/overview/WHY_ADORABLECSS.md',
				category: 'public',
				badge: 'new',
				tags: ['why', 'comparison']
			},
			{
				title: 'Cheat Sheet',
				href: '/docs/cheat-sheet',
				description: '한 장으로 보는 핵심 문법',
				source: '/docs/5-public/reference/CHEAT_SHEET.md',
				category: 'public',
				tags: ['cheatsheet', 'reference']
			},
			{
				title: 'Cookbook',
				href: '/docs/cookbook',
				description: '실무에서 바로 쓰는 레시피',
				source: '/docs/5-public/examples/COOKBOOK.md',
				category: 'public',
				tags: ['cookbook', 'examples']
			},
			{
				title: 'Best Practices',
				href: '/docs/best-practices',
				description: '대규모 프로젝트 모범 사례',
				source: '/docs/3-resources/best-practices/development/BEST_PRACTICES.md',
				category: 'internal',
				tags: ['best-practices', 'guide']
			},
			{
				title: 'Performance Guide',
				href: '/docs/performance',
				description: '성능 최적화 가이드',
				source: '/docs/5-public/guides/performance.md',
				category: 'public',
				tags: ['performance', 'optimization']
			},
			{
				title: 'Troubleshooting',
				href: '/docs/troubleshooting',
				description: '문제 해결 가이드',
				source: '/docs/5-public/guides/troubleshooting.md',
				category: 'public',
				tags: ['troubleshooting', 'debugging']
			}
		]
	},
	{
		title: '팀 & 프로젝트',
		items: [
			{
				title: '팀 온보딩',
				href: '/docs/team-onboarding',
				description: '새로운 팀원을 위한 가이드',
				source: '/docs/2-areas/community/onboarding/TEAM_ONBOARDING.md',
				category: 'internal',
				badge: 'new',
				tags: ['team', 'onboarding']
			},
			{
				title: '프로젝트 설정',
				href: '/docs/project-setup',
				description: '프로젝트 초기 설정 가이드',
				source: '/docs/5-public/getting-started/PROJECT_SETUP.md',
				category: 'public',
				tags: ['setup', 'project']
			},
			{
				title: '통합 가이드',
				href: '/docs/integration',
				description: '다른 도구들과의 통합',
				source: '/docs/5-public/guides/INTEGRATION_GUIDE.md',
				category: 'public',
				tags: ['integration', 'tools']
			},
			{
				title: 'Contributing',
				href: '/docs/contributing',
				description: '프로젝트 기여 가이드',
				source: '/docs/2-areas/community/development/CONTRIBUTING.md',
				category: 'internal',
				tags: ['contributing', 'development']
			},
			{
				title: 'Features Roadmap',
				href: '/docs/features',
				description: '기능 개발 로드맵',
				source: '/docs/1-projects/active/features.md',
				category: 'internal',
				badge: 'new',
				tags: ['roadmap', 'features']
			}
		]
	}
];

// Helper function to get all doc items flat
export function getAllDocItems(): (DocItem & { section: string })[] {
	return docsConfig.flatMap((section) =>
		section.items.map((item) => ({ ...item, section: section.title }))
	);
}

// Helper function to find doc by href
export function findDocByHref(href: string): (DocItem & { section: string }) | undefined {
	return getAllDocItems().find((item) => item.href === href);
}

// Helper function to get prev/next navigation
export function getDocNavigation(currentHref: string) {
	const allDocs = getAllDocItems();
	const currentIndex = allDocs.findIndex((doc) => doc.href === currentHref);

	return {
		prev: currentIndex > 0 ? allDocs[currentIndex - 1] : null,
		next: currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null
	};
}

// Helper function to get the first doc item
export function getFirstDocItem(): DocItem | null {
	const firstSection = docsConfig[0];
	return firstSection?.items[0] || null;
}

// Helper function to filter docs by category
export function getDocsByCategory(category: 'public' | 'internal' | 'api'): DocItem[] {
	return getAllDocItems().filter(item => item.category === category);
}

// Helper function to search docs by tags
export function searchDocsByTags(tags: string[]): DocItem[] {
	return getAllDocItems().filter(item => 
		item.tags && tags.some(tag => item.tags?.includes(tag))
	);
}

// Export metadata for build-time processing
export const docsMetadata = {
	totalDocs: getAllDocItems().length,
	sections: docsConfig.map(s => ({ title: s.title, count: s.items.length })),
	categories: {
		public: getDocsByCategory('public').length,
		internal: getDocsByCategory('internal').length,
		api: getDocsByCategory('api').length
	}
};