# 🚀 프로젝트 설정 가이드

> 새 프로젝트에서 AdorableCSS 시작하기

## 📋 프로젝트 설정 (Archived)

**알림**: 이 프로젝트는 아카이브 상태입니다. 신규 프로젝트 설정보다는 기존 프로젝트의 구조를 참고하는 용도로 확인해주세요.

## 📁 권장 프로젝트 구조 (참고용)
(아래 내용은 AdorableCSS를 사용하던 시점의 권장 구조입니다)

## 📁 권장 프로젝트 구조

```
my-adorable-project/
├── src/
│   ├── components/
│   │   ├── common/      # 공통 컴포넌트
│   │   ├── layout/      # 레이아웃 컴포넌트
│   │   └── features/    # 기능별 컴포넌트
│   ├── styles/
│   │   ├── adorable-overrides.css  # 커스텀 오버라이드
│   │   └── themes/      # 테마 파일들
│   └── utils/
│       └── adorable-helpers.js  # 유틸리티 함수
├── public/
├── docs/
│   └── ADORABLE_CONVENTIONS.md  # 팀 컨벤션
└── package.json
```

## 🎨 커스터마이징

### 1. CSS 변수로 테마 설정

```css
/* styles/adorable-overrides.css */
:root {
  /* 색상 오버라이드 */
  --adorable-primary: #667eea;
  --adorable-secondary: #f687b3;
  
  /* 간격 커스터마이징 */
  --adorable-space-md: 1.5rem;
  
  /* 그림자 커스터마이징 */
  --adorable-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* 다크 모드 */
[data-theme="dark"] {
  --adorable-bg-base: #1a202c;
  --adorable-text-base: #f7fafc;
}
```

### 2. 커스텀 유틸리티 추가

```css
/* 프로젝트 특화 유틸리티 */
@layer utilities {
  .gradient-brand {
    background: linear-gradient(135deg, var(--adorable-primary) 0%, var(--adorable-secondary) 100%);
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```

### 3. 컴포넌트 프리셋

```javascript
// utils/adorable-helpers.js
export const componentPresets = {
  // 버튼 프리셋
  button: {
    primary: 'btn bg(blue-500) c(white) hover:bg(blue-600)',
    secondary: 'btn ring(1/gray-300) hover:bg(gray-50)',
    danger: 'btn bg(red-500) c(white) hover:bg(red-600)'
  },
  
  // 카드 프리셋
  card: {
    default: 'card p(xl)',
    compact: 'card p(md)',
    interactive: 'card hover:shadow(xl) transition cursor(pointer)'
  }
}

// 사용 예
<button class={componentPresets.button.primary}>
  클릭하세요
</button>
```

## 🔌 도구 통합

### VS Code 설정

```json
// .vscode/settings.json
{
  "css.customData": [".vscode/adorable-css-data.json"],
  "editor.quickSuggestions": {
    "strings": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["class=\"([^\"]*)\"", "([a-zA-Z0-9\\-:()/.]+)"]
  ]
}
```

### ESLint 설정

```javascript
// .eslintrc.js
module.exports = {
  rules: {
    // 클래스명 정렬 규칙
    'adorable/class-order': ['warn', {
      order: ['layout', 'sizing', 'styling', 'state']
    }]
  }
}
```

### Prettier 설정

```javascript
// .prettierrc
{
  "plugins": ["prettier-plugin-organize-attributes"],
  "attributeGroups": [
    "^class$",
    "^(id|name)$",
    "$DEFAULT",
    "^aria-",
    "^data-"
  ]
}
```

## 📦 프로덕션 최적화

### 1. PurgeCSS 설정 (선택사항)

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/**/*.{js,jsx,ts,tsx,vue,svelte}'],
      safelist: {
        // 동적 클래스 보호
        deep: [/^hover:/, /^focus:/, /^group-/]
      }
    })
  ]
}
```

### 2. 빌드 최적화

```json
// package.json
{
  "scripts": {
    "build": "vite build",
    "build:analyze": "ANALYZE=true vite build",
    "build:prod": "NODE_ENV=production vite build --minify"
  }
}
```

### 3. CDN 캐싱

```html
<!-- 버전 고정 (권장) -->
<link rel="stylesheet" href="https://unpkg.com/adorable-css@2.0.0/dist/adorable.min.css">

<!-- 최신 버전 (개발용) -->
<link rel="stylesheet" href="https://unpkg.com/adorable-css/dist/adorable.css">
```

## 🧪 테스트 설정

### 컴포넌트 테스트

```javascript
// Button.test.jsx
import { render } from '@testing-library/react'
import { Button } from './Button'

test('renders with adorable classes', () => {
  const { container } = render(
    <Button variant="primary">Click me</Button>
  )
  
  expect(container.firstChild).toHaveClass(
    'btn', 'bg(blue-500)', 'c(white)'
  )
})
```

### 시각적 회귀 테스트

```javascript
// .storybook/preview.js
import 'adorable-css'

export const parameters = {
  backgrounds: {
    values: [
      { name: 'adorable-light', value: '#f7fafc' },
      { name: 'adorable-dark', value: '#1a202c' }
    ]
  }
}
```

## 📱 반응형 전략

### 모바일 우선 설정

```javascript
// adorable.config.js (계획 중)
export default {
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  },
  defaultBreakpoint: 'mobile-first'
}
```

### 반응형 컴포넌트 예시

```jsx
// ResponsiveLayout.jsx
export function ResponsiveLayout({ children }) {
  return (
    <div class="
      vbox                    // 모바일: 세로 정렬
      md:hbox                 // 태블릿: 가로 정렬
      gap(md)                 // 기본 간격
      lg:gap(xl)              // 데스크톱: 넓은 간격
      p(md)                   // 기본 패딩
      md:p(xl)                // 태블릿: 큰 패딩
    ">
      {children}
    </div>
  )
}
```

## ✅ 프로젝트 체크리스트

### 초기 설정
- [ ] AdorableCSS 설치
- [ ] 기본 import 설정
- [ ] 테마 변수 정의
- [ ] VS Code 설정

### 개발 환경
- [ ] 린터 규칙 설정
- [ ] 포맷터 설정
- [ ] Git hooks 설정
- [ ] 컴포넌트 라이브러리 구축

### 프로덕션 준비
- [ ] 빌드 최적화
- [ ] 번들 크기 분석
- [ ] 성능 테스트
- [ ] 배포 파이프라인

## 🔗 다음 단계

- [팀 온보딩 가이드](/docs/team-onboarding)
- [Best Practices](/docs/best-practices)
- [성능 최적화](https://github.com/developer-1px/adorable-css-v2/blob/main/packages/homepage-kit/docs/guides/performance.md)
- [트러블슈팅](/docs/troubleshooting)

---

**💡 Tip**: 프로젝트 초기에 충분한 시간을 투자하세요. 좋은 설정은 개발 속도를 2배로 만듭니다!