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
	external?: boolean;
	source?: string;
	category?: 'public' | 'internal' | 'api';
	tags?: string[];
}

export const docsConfig: DocSection[] = [
	{
		title: '시작하기',
		items: [
			{
				title: 'Overview',
				href: '/docs/overview',
				description: 'AdorableCSS 소개와 기본 사용법',
				source: '/docs/5-public/mdx/01-overview.md',
				category: 'public',
				tags: ['intro', 'core']
			},
			{
				title: 'Getting Started',
				href: '/docs/getting-started',
				description: '설치와 기본 사용법',
				source: '/docs/5-public/getting-started/QUICK_START.md',
				category: 'public',
				tags: ['setup', 'tutorial']
			},
			{
				title: '문법 가이드',
				href: '/docs/syntax-guide',
				description: 'CSS 문법 참고',
				source: '/docs/5-public/mdx/11-syntax-guide.md',
				category: 'public',
				tags: ['syntax', 'reference']
			}
		]
	},
	{
		title: '기술 문서',
		items: [
			{
				title: '기술 아키텍처',
				href: '/docs/technical-architecture',
				description: '파서와 규칙 엔진',
				source: '/docs/5-public/mdx/07-technical-architecture.md',
				category: 'public',
				tags: ['architecture', 'technical']
			},
			{
				title: '색상 시스템',
				href: '/docs/color-system',
				description: 'OKLCH 색상 시스템',
				source: '/docs/5-public/mdx/08-color-system.md',
				category: 'public',
				tags: ['color', 'oklch']
			}
		]
	},
	{
		title: 'API Reference',
		items: [
			{
				title: 'Rules Reference',
				href: '/docs/rules-reference',
				description: '유틸리티 클래스 목록',
				source: '/docs/5-public/mdx/09-rules-reference.md',
				category: 'api',
				tags: ['api', 'reference']
			},
			{
				title: 'JavaScript API',
				href: '/docs/javascript-api',
				description: 'JS에서 사용하기',
				source: '/docs/5-public/mdx/10-javascript-api.md',
				category: 'api',
				tags: ['api', 'javascript']
			}
		]
	},
	{
		title: 'Tailwind 사용자',
		items: [
			{
				title: 'Tailwind와의 차이점',
				href: '/docs/common-mistakes-tailwind',
				description: 'Tailwind에서 자주 하는 실수',
				source: '/docs/5-public/guides/COMMON_MISTAKES_FROM_TAILWIND.md',
				category: 'public',
				tags: ['tailwind', 'mistakes']
			}
		]
	},
	{
		title: '가이드',
		items: [
			{
				title: 'Cheat Sheet',
				href: '/docs/cheat-sheet',
				description: '빠른 참조',
				source: '/docs/5-public/reference/CHEAT_SHEET.md',
				category: 'public',
				tags: ['cheatsheet', 'reference']
			},
			{
				title: 'Cookbook',
				href: '/docs/cookbook',
				description: '예제 모음',
				source: '/docs/5-public/examples/COOKBOOK.md',
				category: 'public',
				tags: ['cookbook', 'examples']
			}
		]
	}
];

// Helper functions
export function getAllDocItems(): (DocItem & { section: string })[] {
	return docsConfig.flatMap((section) =>
		section.items.map((item) => ({ ...item, section: section.title }))
	);
}

export function findDocByHref(href: string): (DocItem & { section: string }) | undefined {
	return getAllDocItems().find((item) => item.href === href);
}

export function getDocNavigation(currentHref: string) {
	const allDocs = getAllDocItems();
	const currentIndex = allDocs.findIndex((doc) => doc.href === currentHref);

	return {
		prev: currentIndex > 0 ? allDocs[currentIndex - 1] : null,
		next: currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null
	};
}

export function getFirstDocItem(): DocItem | null {
	const firstSection = docsConfig[0];
	return firstSection?.items[0] || null;
}

export function getDocsByCategory(category: 'public' | 'internal' | 'api'): DocItem[] {
	return getAllDocItems().filter(item => item.category === category);
}

export function searchDocsByTags(tags: string[]): DocItem[] {
	return getAllDocItems().filter(item =>
		item.tags && tags.some(tag => item.tags?.includes(tag))
	);
}

export const docsMetadata = {
	totalDocs: getAllDocItems().length,
	sections: docsConfig.map(s => ({ title: s.title, count: s.items.length })),
	categories: {
		public: getDocsByCategory('public').length,
		internal: getDocsByCategory('internal').length,
		api: getDocsByCategory('api').length
	}
};
