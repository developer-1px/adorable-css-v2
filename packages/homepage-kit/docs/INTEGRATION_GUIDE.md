# 🔌 통합 가이드

> AdorableCSS와 다른 도구들의 조화로운 공존

## 🎯 Overview

AdorableCSS는 독립적으로도 훌륭하지만, 기존 도구들과 함께 사용할 때 더욱 강력해집니다.

## 🛠 빌드 도구 통합

### Webpack

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  // AdorableCSS PostCSS 플러그인 (개발 중)
                  require('adorable-css/postcss')
                ]
              }
            }
          }
        ]
      }
    ]
  }
}
```

### Vite

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import { adorableCSS } from 'adorable-css/vite'

export default defineConfig({
  plugins: [
    adorableCSS({
      // 옵션
      purge: process.env.NODE_ENV === 'production',
      themes: ['light', 'dark']
    })
  ],
  css: {
    modules: {
      // CSS Modules와 함께 사용
      localsConvention: 'camelCase'
    }
  }
})
```

### Parcel

```json
// package.json
{
  "adorable-css": {
    "purge": true,
    "themes": ["light", "dark"]
  }
}
```

```javascript
// .parcelrc
{
  "extends": "@parcel/config-default",
  "transformers": {
    "*.css": ["@parcel/transformer-css", "adorable-css/parcel"]
  }
}
```

## 🎨 CSS 프레임워크 공존

### TailwindCSS와 함께

```javascript
// tailwind.config.js
module.exports = {
  prefix: 'tw-',  // Tailwind 클래스에 prefix 추가
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // AdorableCSS 토큰 재사용
      colors: {
        primary: 'var(--adorable-primary)',
        secondary: 'var(--adorable-secondary)'
      }
    }
  }
}
```

```html
<!-- 혼용 예시 -->
<div class="
  card                    <!-- AdorableCSS -->
  tw-backdrop-blur-lg     <!-- TailwindCSS -->
  hbox(pack)              <!-- AdorableCSS -->
">
  <h1 class="heading(xl) tw-tracking-tight">
    두 프레임워크의 장점 활용
  </h1>
</div>
```

### Bootstrap과 함께

```scss
// custom-bootstrap.scss
// Bootstrap 변수를 AdorableCSS 토큰으로 오버라이드
$primary: var(--adorable-blue-500);
$secondary: var(--adorable-gray-500);
$border-radius: var(--adorable-radius-md);

@import 'bootstrap/scss/bootstrap';
```

```html
<!-- 클래스 네임스페이스 분리 -->
<div class="container">          <!-- Bootstrap -->
  <div class="hbox(pack) gap(lg)">  <!-- AdorableCSS -->
    <button class="btn btn-primary">Bootstrap 버튼</button>
    <button class="btn bg(blue-500) c(white)">AdorableCSS 버튼</button>
  </div>
</div>
```

## 🔧 PostCSS 생태계

### PostCSS 플러그인 체인

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    // 1. Import 처리
    require('postcss-import'),
    
    // 2. AdorableCSS 처리
    require('adorable-css/postcss'),
    
    // 3. 중첩 해제
    require('postcss-nested'),
    
    // 4. 자동 프리픽서
    require('autoprefixer'),
    
    // 5. 최적화 (프로덕션)
    process.env.NODE_ENV === 'production' && require('cssnano')
  ].filter(Boolean)
}
```

### 커스텀 PostCSS 플러그인

```javascript
// postcss-adorable-custom.js
module.exports = (opts = {}) => {
  return {
    postcssPlugin: 'postcss-adorable-custom',
    Once(root, { result }) {
      // AdorableCSS 클래스를 감지하고 변환
      root.walkRules(rule => {
        if (rule.selector.includes('hbox(')) {
          // 커스텀 로직
        }
      })
    }
  }
}
module.exports.postcss = true
```

## 🎯 CSS-in-JS 라이브러리

### Styled Components

```javascript
import styled from 'styled-components'
import { cx } from 'adorable-css'

// AdorableCSS 클래스를 styled components에 적용
const Card = styled.div.attrs(props => ({
  className: cx('card', props.interactive && 'hover:shadow(xl)')
}))`
  /* 추가 스타일 */
  ${props => props.featured && `
    border: 2px solid var(--adorable-blue-500);
  `}
`

// 사용
<Card interactive featured>
  <h2 class="heading(md)">하이브리드 접근</h2>
</Card>
```

### Emotion

```javascript
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const cardStyles = css`
  /* Emotion 스타일 */
  &:hover {
    transform: translateY(-2px);
  }
`

function Card({ children }) {
  return (
    <div 
      css={cardStyles}
      className="card p(xl)"  // AdorableCSS
    >
      {children}
    </div>
  )
}
```

## 🖼 디자인 도구 연동

### Figma 플러그인 (개발 중)

```javascript
// Figma → AdorableCSS 자동 변환
{
  "Auto Layout": {
    "direction": "horizontal",
    "gap": 16,
    "padding": 24,
    "alignItems": "center",
    "justifyContent": "space-between"
  }
}

// ↓ 자동 생성

<div class="hbox(middle+between) gap(md) p(lg)">
```

### Storybook

```javascript
// .storybook/preview.js
import 'adorable-css'

export const parameters = {
  // AdorableCSS 토큰을 Storybook 컨트롤로
  controls: {
    matchers: {
      color: /(background|color)$/i,
      spacing: /(padding|margin|gap)$/i,
    },
  },
}

// 데코레이터로 테마 전환
export const decorators = [
  (Story, context) => (
    <div data-theme={context.globals.theme}>
      <Story />
    </div>
  ),
]
```

## 📊 개발자 도구

### Chrome DevTools 확장 (계획 중)

```javascript
// AdorableCSS 클래스 미리보기
// 호버 시 생성되는 CSS 표시
// 토큰 값 실시간 확인
```

### VS Code 통합

```json
// .vscode/adorable.code-snippets
{
  "AdorableCSS Button": {
    "prefix": "acss-button",
    "body": [
      "<button class=\"btn ${1|primary,secondary,danger|} ${2|sm,md,lg|}\">",
      "  ${3:Button Text}",
      "</button>"
    ]
  },
  "AdorableCSS Card": {
    "prefix": "acss-card",
    "body": [
      "<div class=\"card${1: hover:shadow(xl)}\">",
      "  $0",
      "</div>"
    ]
  }
}
```

## 🧪 테스트 도구

### Jest 설정

```javascript
// jest.config.js
module.exports = {
  moduleNameMapper: {
    // CSS 모듈 모킹
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // AdorableCSS 유틸리티
    'adorable-css': '<rootDir>/__mocks__/adorable-css.js'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
}

// jest.setup.js
import '@testing-library/jest-dom'
import 'adorable-css/jest-matchers'

// 커스텀 매처
expect.extend({
  toHaveAdorableClass(element, className) {
    const hasClass = element.classList.contains(className)
    return {
      pass: hasClass,
      message: () => 
        `Expected element ${hasClass ? 'not ' : ''}to have AdorableCSS class "${className}"`
    }
  }
})
```

### Cypress 통합

```javascript
// cypress/support/commands.js
Cypress.Commands.add('getByAdorable', (adorableClass) => {
  return cy.get(`[class*="${adorableClass}"]`)
})

// 사용
cy.getByAdorable('hbox(pack)').should('be.visible')
cy.getByAdorable('card').first().click()
```

## 🚀 CI/CD 파이프라인

### GitHub Actions

```yaml
# .github/workflows/adorable-css.yml
name: AdorableCSS Validation

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: pnpm install
        
      - name: Validate AdorableCSS classes
        run: pnpm adorable:validate
        
      - name: Check bundle size
        run: pnpm adorable:size
        
      - name: Visual regression test
        run: pnpm test:visual
```

## 📦 패키지 매니저

### PNPM Workspace

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
  
# 공유 의존성
shamefully-hoist:
  - 'adorable-css'
```

### Monorepo 설정

```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false
    },
    "adorable:generate": {
      "outputs": ["src/generated/**"]
    }
  }
}
```

## 🔍 문제 해결

### 클래스 충돌

```javascript
// adorable.config.js
export default {
  // 프리픽스 추가
  prefix: 'ac-',
  
  // 특정 클래스 제외
  blocklist: ['container', 'btn'],
  
  // 안전 모드
  safeMode: true
}
```

### 스타일 우선순위

```css
/* 레이어 순서 조정 */
@layer reset, libraries, adorable, components, utilities;

@import 'other-library.css' layer(libraries);
@import 'adorable-css' layer(adorable);
```

## 📚 추가 리소스

- [마이그레이션 가이드](/docs/migration-guide)
- [트러블슈팅](/docs/troubleshooting)

---

**💡 핵심**: AdorableCSS는 기존 도구를 대체하는 것이 아니라 **보완**합니다. 각 도구의 장점을 활용하여 최고의 개발 경험을 만드세요!