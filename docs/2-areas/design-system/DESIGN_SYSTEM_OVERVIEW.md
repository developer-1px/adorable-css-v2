# AdorableCSS 디자인 시스템 가이드

AdorableCSS v2 디자인 시스템은 [Practical UI](https://www.practical-ui.com/design-system/)의 체계적이고 확장 가능한 접근 방식에서 영감을 받아 구축되었습니다.

> 💡 **디자인 철학**: [DESIGN_PHILOSOPHY.md](./DESIGN_PHILOSOPHY.md)에서 AdorableCSS의 핵심 철학과 차별화 포인트를 확인하세요.
> 📋 **전체 전략**: [PRODUCT_STRATEGY.md](./PRODUCT_STRATEGY.md)에서 제품 로드맵과 개발 전략을 확인하세요.

## 🚀 주요 특징

### 1. **Semantic Design Tokens**
- 의미론적 색상 시스템 (primary, secondary, success, warning, error)
- 계층적 텍스트/배경 시스템
- OKLCH 기반 색상 팔레트

### 2. **Responsive Typography**
- Fluid typography with clamp()
- Mobile-first responsive scales
- 역할 기반 타이포그래피 (display, heading, body, label, caption)

### 3. **Systematic Spacing**
- 4px 기반 간격 시스템
- 일관된 spacing scale (xs → 6xl)
- 컴포넌트 간 조화로운 레이아웃

### 4. **Component Library**
- 버튼, 카드, 폼 요소, 알림 등
- 다양한 변형(variants)과 크기
- 모든 상태 지원 (hover, active, focus, disabled)

## 📁 파일 구조

```
adorable-css/
├── src/
│   ├── design-system/
│   │   ├── semantic-system.ts      # 시맨틱 디자인 시스템 정의
│   │   └── tokens/
│   │       └── index.ts           # 디자인 토큰 설정
│   └── rules/
│       └── style/
│           └── responsive-typography.ts  # 반응형 타이포그래피
│
homepage-kit/
├── src/routes/
│   ├── design-system/             # 디자인 시스템 페이지
│   │   ├── +page.svelte          # 메인 디자인 시스템 페이지
│   │   └── components/
│   │       └── +page.svelte      # 컴포넌트 쇼케이스
│   └── showroom/
│       └── +page.svelte          # IT 제품 랜딩 페이지 예제
│
docs/
├── DESIGN_PRINCIPLES.md          # 디자인 원칙 문서
└── DESIGN_SYSTEM_OVERVIEW.md     # 이 파일
```

## 🎨 새로운 기능들

### 1. Semantic Color System
```css
/* 브랜드 색상 */
c(brand-primary)    /* purple-500 */
c(brand-secondary)  /* pink-500 */

/* UI 색상 */
bg(ui-surface)      /* gray-50 */
border(ui-border)   /* gray-200 */

/* 텍스트 색상 */
c(text-primary)     /* gray-900 */
c(text-secondary)   /* gray-700 */
c(text-muted)       /* gray-500 */

/* 상태 색상 */
bg(state-success)   /* green-600 */
bg(state-error)     /* red-600 */
```

### 2. Responsive Typography
```css
/* Fluid 타이포그래피 */
text-fluid(lg)      /* clamp(1.125rem, 1rem + 0.625vw, 1.375rem) */

/* 반응형 텍스트 */
text-responsive(xl)  /* 모바일: 20px, 태블릿: 24px, 데스크톱: 28px */

/* 타이포그래피 프리셋 */
typography(hero)         /* 히어로 텍스트 */
typography(page-title)   /* 페이지 제목 */
typography(section-heading) /* 섹션 제목 */
```

### 3. Interactive System
```css
/* 5단계 인터랙션 시스템 */
interactive(1)  /* 미묘한 피드백 */
interactive(2)  /* 가벼운 변환 */
interactive(3)  /* 눈에 띄는 피드백 */
interactive(4)  /* 강한 피드백 */
interactive(5)  /* 극적인 피드백 */
```

### 4. Enhanced Ring Utility
```css
/* 링 유틸리티 (border 스타일) */
ring(2)           /* 2px 링 */
ring(2/blue)      /* 2px 파란색 링 */
ring(2/4/blue)    /* 2px 링, 4px 오프셋, 파란색 */
```

## 🔧 사용 방법

### 1. 디자인 시스템 페이지 접속
```
/design-system
```

### 2. 컴포넌트 쇼케이스 확인
```
/design-system/components
```

### 3. 실제 구현 예제 (Showroom)
```
/showroom
```

## 🎯 Best Practices

1. **시맨틱 토큰 우선 사용**
   - 직접적인 색상값 대신 시맨틱 토큰 사용
   - 예: `c(primary)` not `c(purple-500)`

2. **반응형 우선 설계**
   - 모바일 우선 접근
   - Fluid typography 활용

3. **일관된 간격**
   - 4px 기반 spacing 시스템 준수
   - 디자인 토큰 사용

4. **접근성 고려**
   - 모든 인터랙티브 요소에 focus 상태
   - 충분한 색상 대비
   - 키보드 네비게이션 지원

## 🚀 다음 단계

1. **다크 모드 지원** - 시맨틱 색상 시스템 활용
2. **애니메이션 시스템** - 일관된 모션 디자인
3. **더 많은 컴포넌트** - 테이블, 모달, 드롭다운 등
4. **Figma 플러그인** - 디자인-개발 동기화

## 📚 참고 자료

- [Practical UI Design System](https://www.practical-ui.com/design-system/)
- [AdorableCSS Documentation](/docs)
- [Component Showcase](/design-system/components)