export interface DocPage {
  title: string;
  path: string;
  description?: string;
}

export interface DocSection {
  title: string;
  items: DocPage[];
}

export const docsNavigation: DocSection[] = [
  {
    title: '소개',
    items: [
      { 
        title: '왜 AdorableCSS인가?', 
        path: '/docs/introduction/why',
        description: 'AdorableCSS가 해결하는 문제와 철학'
      },
      { 
        title: '시작하기', 
        path: '/docs/introduction/getting-started',
        description: '설치 및 기본 설정'
      },
      { 
        title: '첫 번째 컴포넌트', 
        path: '/docs/introduction/first-component',
        description: '간단한 카드 컴포넌트 만들기'
      },
      { 
        title: 'Tailwind CSS와의 차이', 
        path: '/docs/introduction/vs-tailwind',
        description: '철학과 접근 방식의 차이점'
      }
    ]
  },
  {
    title: '핵심 개념',
    items: [
      { 
        title: 'Figma-First 워크플로우', 
        path: '/docs/core-concepts/figma-first',
        description: '디자인 도구의 사고방식을 코드로'
      },
      { 
        title: '생성형 시스템', 
        path: '/docs/core-concepts/generative-system',
        description: '결과물이 아닌 시스템을 생성하는 철학'
      },
      { 
        title: '통합 문법', 
        path: '/docs/core-concepts/unified-syntax',
        description: '일관된 문법 체계'
      },
      { 
        title: '반응형 디자인', 
        path: '/docs/core-concepts/responsive',
        description: '모바일 우선 반응형 시스템'
      },
      { 
        title: '상태 관리', 
        path: '/docs/core-concepts/states',
        description: 'hover, focus 등 상태 처리'
      }
    ]
  },
  {
    title: '디자인 시스템',
    items: [
      { 
        title: '컬러 시스템', 
        path: '/docs/design-system/colors',
        description: 'OKLCH 기반 컬러 팔레트'
      },
      { 
        title: '타이포그래피', 
        path: '/docs/design-system/typography',
        description: '리드미컬한 텍스트 시스템'
      },
      { 
        title: '간격과 크기', 
        path: '/docs/design-system/spacing',
        description: '4pt 그리드 기반 간격 시스템'
      },
      { 
        title: '그림자와 효과', 
        path: '/docs/design-system/shadows',
        description: '깊이감 있는 UI 효과'
      },
      { 
        title: '애니메이션', 
        path: '/docs/design-system/animations',
        description: '부드러운 전환과 움직임'
      }
    ]
  },
  {
    title: '레이아웃',
    items: [
      { 
        title: '레이아웃 기초', 
        path: '/docs/layout/primitives',
        description: 'hbox, vbox, grid 등 기본 도구'
      },
      { 
        title: '스택 레이아웃', 
        path: '/docs/layout/stacking',
        description: '자동 간격 처리를 위한 스택'
      },
      { 
        title: '페이지 구조', 
        path: '/docs/layout/structure',
        description: 'section, container 등 구조적 요소'
      },
      { 
        title: '히어로 섹션', 
        path: '/docs/layout/hero',
        description: '다양한 히어로 레이아웃 패턴'
      }
    ]
  },
  {
    title: '컴포넌트',
    items: [
      { title: '버튼', path: '/docs/components/button' },
      { title: '카드', path: '/docs/components/card' },
      { title: '배지', path: '/docs/components/badge' },
      { title: '입력 필드', path: '/docs/components/input' },
      { title: '패널', path: '/docs/components/panel' },
      { title: '탭', path: '/docs/components/tabs' },
      { title: '모달', path: '/docs/components/modal' },
      { title: '툴팁', path: '/docs/components/tooltip' }
    ]
  },
  {
    title: '테마와 생성',
    items: [
      { 
        title: 'Theme Forge 사용법', 
        path: '/docs/theming/theme-forge',
        description: '시각적 도구로 테마 생성하기'
      },
      { 
        title: '설정 파일', 
        path: '/docs/theming/configuration',
        description: 'adorable.config.js 커스터마이징'
      },
      { 
        title: '커스텀 컴포넌트', 
        path: '/docs/theming/custom-components',
        description: '나만의 컴포넌트 만들기'
      }
    ]
  },
  {
    title: '가이드',
    items: [
      { title: '네비게이션 바 만들기', path: '/docs/guides/navigation' },
      { title: '가격 페이지 구성하기', path: '/docs/guides/pricing-page' },
      { title: '블로그 포스트 스타일링', path: '/docs/guides/blog-post' },
      { title: 'React와 함께 사용하기', path: '/docs/guides/with-react' }
    ]
  }
];

// 현재 페이지의 이전/다음 페이지를 찾는 함수
export function getPageNavigation(currentPath: string): { prev?: DocPage; next?: DocPage } {
  const allPages: DocPage[] = [];
  
  // 모든 페이지를 순서대로 평탄화
  docsNavigation.forEach(section => {
    allPages.push(...section.items);
  });
  
  const currentIndex = allPages.findIndex(page => page.path === currentPath);
  
  if (currentIndex === -1) {
    return {};
  }
  
  return {
    prev: currentIndex > 0 ? allPages[currentIndex - 1] : undefined,
    next: currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : undefined
  };
}

// 현재 섹션 찾기
export function getCurrentSection(currentPath: string): DocSection | undefined {
  return docsNavigation.find(section => 
    section.items.some(item => item.path === currentPath)
  );
}