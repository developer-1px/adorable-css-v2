/**
 * Documentation configuration
 * This file defines the structure and order of documentation
 */

export interface DocSection {
	title: string;
	items: DocItem[];
}

export interface DocItem {
	title: string;
	href: string;
	description?: string;
	badge?: 'new' | 'beta' | 'deprecated';
	external?: boolean; // For external markdown files
	source?: string; // Path to external markdown file
}

export const docsConfig: DocSection[] = [
	{
		title: '시작하기',
		items: [
			{
				title: 'Background',
				href: '/docs/background',
				description: '디자인과 코드 사이의 영원한 숙제',
				source: '/docs/mdx/00-background.md',
				badge: 'new'
			},
			{
				title: 'Overview',
				href: '/docs/overview',
				description: 'AdorableCSS의 핵심 철학과 기본 개념',
				source: '/docs/mdx/01-overview.md'
			},
			{
				title: 'Getting Started',
				href: '/docs/getting-started',
				description: '설치와 첫 번째 컴포넌트',
				source: '/packages/homepage-kit/docs/QUICK_START.md'
			},
			{
				title: '문법 가이드',
				href: '/docs/syntax-guide',
				description: '완전한 문법 체계와 사용법',
				source: '/docs/mdx/11-syntax-guide.md'
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
				source: '/docs/mdx/02-figma-first-css-utility.md'
			},
			{
				title: 'Design Token',
				href: '/docs/design-token',
				description: '완전한 디자인 토큰 시스템',
				source: '/docs/mdx/03-design-token.md'
			},
			{
				title: 'Layout 시스템',
				href: '/docs/layout',
				description: 'Auto Layout, Grid, Position 등 레이아웃 시스템',
				source: '/docs/mdx/04-layout.md'
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
				source: '/docs/mdx/05-component.md'
			},
			{
				title: 'Design System 구축',
				href: '/docs/design-system',
				description: '완전한 디자인 시스템 구축 가이드',
				source: '/docs/mdx/06-design-system.md',
				badge: 'new'
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
				source: '/docs/mdx/07-technical-architecture.md'
			},
			{
				title: '색상 시스템',
				href: '/docs/color-system',
				description: 'OKLCH, Dot Notation, 그라디언트 시스템',
				source: '/docs/mdx/08-color-system.md'
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
				source: '/docs/mdx/09-rules-reference.md'
			},
			{
				title: 'JavaScript API',
				href: '/docs/javascript-api',
				description: '프로그래매틱 사용법',
				source: '/docs/mdx/10-javascript-api.md'
			}
		]
	},
	{
		title: 'Migration',
		items: [
			{
				title: 'From Tailwind',
				href: '/docs/migration/tailwind',
				description: 'Migrating from Tailwind CSS',
				source: '/docs/packages/homepage-kit/TAILWIND_CONVERSION_REPORT.md'
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
				source: '/packages/homepage-kit/docs/WHY_ADORABLECSS.md',
				badge: 'new'
			},
			{
				title: 'Cheat Sheet',
				href: '/docs/cheat-sheet',
				description: '한 장으로 보는 핵심 문법',
				source: '/packages/homepage-kit/docs/CHEAT_SHEET.md'
			},
			{
				title: 'Cookbook',
				href: '/docs/cookbook',
				description: '실무에서 바로 쓰는 레시피',
				source: '/packages/homepage-kit/docs/COOKBOOK.md'
			},
			{
				title: 'Troubleshooting',
				href: '/docs/troubleshooting',
				description: '문제 해결 가이드',
				source: '/packages/homepage-kit/docs/guides/troubleshooting.md'
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
				source: '/packages/homepage-kit/docs/TEAM_ONBOARDING.md',
				badge: 'new'
			},
			{
				title: '프로젝트 설정',
				href: '/docs/project-setup',
				description: '프로젝트 초기 설정 가이드',
				source: '/packages/homepage-kit/docs/PROJECT_SETUP.md'
			},
			{
				title: 'Best Practices',
				href: '/docs/best-practices',
				description: '대규모 프로젝트 모범 사례',
				source: '/packages/homepage-kit/docs/BEST_PRACTICES.md'
			},
			{
				title: '통합 가이드',
				href: '/docs/integration',
				description: '다른 도구들과의 통합',
				source: '/packages/homepage-kit/docs/INTEGRATION_GUIDE.md'
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
