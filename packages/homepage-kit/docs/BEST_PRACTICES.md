# 🏆 AdorableCSS Best Practices

> 대규모 프로젝트에서의 모범 사례

## 🎯 핵심 원칙

### 1. **의미론적 우선 (Semantic First)**
```html
<!-- ❌ 유틸리티 나열 -->
<h1 class="font(2xl) bold line-height(1.2) mb(lg) c(gray-900)">

<!-- ✅ 의미론적 클래스 -->
<h1 class="heading(xl)">
```

### 2. **컴포넌트 추상화 (Component Abstraction)**
```html
<!-- ❌ 반복되는 패턴 -->
<div class="bg(white) p(xl) r(lg) shadow(md)">
<div class="bg(white) p(xl) r(lg) shadow(md)">

<!-- ✅ 재사용 가능한 컴포넌트 -->
<div class="card">
```

### 3. **일관성 유지 (Consistency)**
```html
<!-- ❌ 혼재된 스타일 -->
<div style="margin: 20px" class="p(md)">
<div class="m(20px) p(md)">

<!-- ✅ 토큰 시스템 준수 -->
<div class="m(lg) p(md)">
```

## 📐 아키텍처 패턴

### 1. 레이어드 구조

```
🎨 Theme Layer (CSS Variables)
  ↓
📦 Component Layer (재사용 컴포넌트)
  ↓
🔧 Utility Layer (AdorableCSS 유틸리티)
  ↓
💻 Implementation Layer (실제 구현)
```

### 2. 컴포넌트 계층

```typescript
// 1. Base Components (atoms)
export const Button = ({ variant, size, children }) => (
  <button class={cx(
    'btn',
    variants[variant],
    sizes[size]
  )}>
    {children}
  </button>
)

// 2. Composite Components (molecules)
export const Card = ({ title, children }) => (
  <div class="card">
    {title && <h3 class="heading(md)">{title}</h3>}
    <div class="vbox gap(md)">
      {children}
    </div>
  </div>
)

// 3. Layout Components (organisms)
export const PageLayout = ({ sidebar, main }) => (
  <div class="hbox min-h(screen)">
    <aside class="w(260px) hidden lg:block">
      {sidebar}
    </aside>
    <main class="flex(1)">
      {main}
    </main>
  </div>
)
```

## 🎨 스타일링 전략

### 1. 클래스 구성 순서

```html
<div class="
  [1. 컴포넌트] card
  [2. 레이아웃] hbox(middle)
  [3. 크기] w(full) h(200)
  [4. 스타일] bg(white) shadow(md)
  [5. 상태] hover:shadow(lg)
  [6. 반응형] md:h(300)
">
```

### 2. 조건부 스타일링 패턴

```javascript
// 유틸리티 함수
const cls = (...classes) => classes.filter(Boolean).join(' ')

// 사용 예시
function Alert({ type, children }) {
  const styles = {
    info: 'bg(blue-50) bc(blue-200) c(blue-800)',
    warning: 'bg(yellow-50) bc(yellow-200) c(yellow-800)',
    error: 'bg(red-50) bc(red-200) c(red-800)'
  }
  
  return (
    <div class={cls(
      'p(md) r(md) b(1)',
      styles[type]
    )}>
      {children}
    </div>
  )
}
```

### 3. 테마 시스템

```css
/* themes/default.css */
:root {
  /* 색상 팔레트 */
  --color-primary: oklch(60% 0.15 250);
  --color-secondary: oklch(70% 0.1 350);
  
  /* 의미론적 색상 */
  --color-success: var(--adorable-green-500);
  --color-danger: var(--adorable-red-500);
  
  /* 컴포넌트 토큰 */
  --card-padding: var(--adorable-space-xl);
  --card-radius: var(--adorable-radius-lg);
}

/* 다크 테마 */
[data-theme="dark"] {
  --color-primary: oklch(70% 0.15 250);
  --card-bg: var(--adorable-gray-800);
}
```

## 🔄 상태 관리와 스타일

### 1. 데이터 속성 활용

```html
<!-- 컴포넌트 상태 -->
<div 
  class="tab-panel"
  data-state="active"
  data-orientation="horizontal"
>
  <!-- CSS에서 선택 -->
  <style>
    .tab-panel[data-state="active"] {
      @apply opacity(100) visible;
    }
  </style>
</div>
```

### 2. CSS 변수로 동적 스타일

```javascript
// 동적 진행률 바
function ProgressBar({ value }) {
  return (
    <div 
      class="h(8) bg(gray-200) r(full) clip"
      style={{ '--progress': `${value}%` }}
    >
      <div class="h(full) bg(blue-500) w(--progress) transition" />
    </div>
  )
}
```

## 📱 반응형 디자인

### 1. 모바일 우선 접근

```html
<!-- 기본: 모바일 → 점진적 향상 -->
<div class="
  grid(1)          /* 모바일: 1열 */
  sm:grid(2)       /* 작은 화면: 2열 */
  md:grid(3)       /* 중간 화면: 3열 */
  lg:grid(4)       /* 큰 화면: 4열 */
  gap(md)          /* 기본 간격 */
  lg:gap(xl)       /* 큰 화면: 넓은 간격 */
">
```

### 2. 컨테이너 쿼리 준비

```css
/* 미래 대비 */
.card-container {
  container-type: inline-size;
}

.card {
  @apply p(md);
  
  @container (min-width: 400px) {
    @apply p(xl) grid(2);
  }
}
```

## 🚀 성능 최적화

### 1. 클래스 재사용

```javascript
// ❌ 동적 클래스 생성
items.map(item => `p(${item.padding})`)

// ✅ 정적 클래스 매핑
const paddingMap = {
  small: 'p(sm)',
  medium: 'p(md)',
  large: 'p(lg)'
}
items.map(item => paddingMap[item.size])
```

### 2. 컴포넌트 메모이제이션

```javascript
// React 예시
const ExpensiveCard = memo(({ data }) => (
  <div class="card hover:shadow(xl) transition">
    {/* 복잡한 렌더링 */}
  </div>
))
```

### 3. 레이지 로딩

```javascript
// 대형 컴포넌트 지연 로딩
const HeavyComponent = lazy(() => import('./HeavyComponent'))

// 사용
<Suspense fallback={<div class="animate(pulse)">Loading...</div>}>
  <HeavyComponent />
</Suspense>
```

## 🧩 컴포넌트 라이브러리

### 1. 기본 구조

```
components/
├── primitives/         # 기본 요소
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.stories.tsx
│   │   └── Button.test.tsx
│   └── Input/
├── patterns/          # 조합 패턴
│   ├── Card/
│   └── Modal/
└── layouts/          # 레이아웃
    ├── Stack/
    └── Grid/
```

### 2. 컴포넌트 문서화

```typescript
interface ButtonProps {
  /** 버튼 변형 */
  variant?: 'primary' | 'secondary' | 'danger'
  /** 버튼 크기 */
  size?: 'sm' | 'md' | 'lg'
  /** 전체 너비 */
  fullWidth?: boolean
}

/**
 * 기본 버튼 컴포넌트
 * 
 * @example
 * <Button variant="primary" size="md">
 *   클릭하세요
 * </Button>
 */
export const Button: FC<ButtonProps> = ({ ... }) => { ... }
```

## 🔍 디버깅 전략

### 1. 개발 도구 활용

```javascript
// 개발 환경에서만 디버그 정보
if (process.env.NODE_ENV === 'development') {
  console.log('Applied classes:', element.className)
  console.log('Computed styles:', getComputedStyle(element))
}
```

### 2. 클래스 검증

```javascript
// 클래스 유효성 검사
function validateClasses(classes) {
  const invalid = classes.filter(cls => 
    !isValidAdorableClass(cls)
  )
  
  if (invalid.length > 0) {
    console.warn('Invalid classes:', invalid)
  }
}
```

## 📋 체크리스트

### 코드 리뷰 시
- [ ] 의미론적 클래스를 우선 사용했는가?
- [ ] 반복되는 패턴은 컴포넌트화 했는가?
- [ ] 토큰 시스템을 준수했는가?
- [ ] 반응형 디자인이 적용되었는가?
- [ ] 접근성을 고려했는가?

### 프로덕션 배포 전
- [ ] 불필요한 클래스는 제거했는가?
- [ ] 성능 프로파일링을 했는가?
- [ ] 크로스 브라우저 테스트를 했는가?
- [ ] 번들 크기를 확인했는가?

## 🚫 안티패턴

### 1. 인라인 스타일 남용
```html
<!-- ❌ -->
<div class="p(20px) m(30px) w(250px)">

<!-- ✅ -->
<div class="p(lg) m(xl) w(64)">
```

### 2. 과도한 중첩
```html
<!-- ❌ -->
<div class="hbox"><div class="hbox"><div class="hbox">

<!-- ✅ -->
<div class="grid grid-cols-3">
```

### 3. 불필요한 !important
```html
<!-- ❌ -->
<div class="bg(red)! c(white)! p(md)!">

<!-- ✅ Layer 시스템 활용 -->
<div class="error-message">
```

## 🎯 마무리

AdorableCSS는 **도구**입니다. 모든 상황에 맞는 만능 해결책은 아닙니다.

**핵심은:**
1. 팀과 일관된 규칙 유지
2. 의미 있는 추상화 만들기
3. 성능과 가독성의 균형
4. 지속적인 리팩토링

**"Write CSS the way you think"** - 생각하는 방식으로 CSS를 작성하되, 유지보수를 고려하세요.

---

### 참고 자료
- [팀 온보딩](./TEAM_ONBOARDING.md)
- [프로젝트 설정](./PROJECT_SETUP.md)
- [트러블슈팅](./guides/troubleshooting.md)
- [성능 가이드](./guides/performance.md)