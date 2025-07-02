# Getting Started

AdorableCSS를 시작하는 가장 빠른 방법을 안내합니다.

## 설치

### NPM/PNPM 패키지
```bash
npm install adorable-css
# 또는
pnpm add adorable-css
# 또는  
yarn add adorable-css
```

### CDN (프로토타이핑용)
```html
<script src="https://unpkg.com/adorable-css/dist/adorable.min.js"></script>
```

## 첫 번째 컴포넌트

### 1. Import
```javascript
import 'adorable-css';  // 자동으로 토큰 주입
```

### 2. Figma 스타일로 코딩하기
```html
<div class="vbox gap(lg) p(xl) bg(white) r(xl) shadow(lg)">
  <!-- 프로필 헤더 -->
  <div class="hbox gap(md)">
    <div class="size(64) r(full) bg(gradient-adorable)"></div>
    <div class="vbox gap(xs) flex(1)">
      <h3 class="font(xl) bold c(gray-900)">김개발</h3>
      <p class="font(sm) c(gray-600)">Frontend Developer</p>
    </div>
  </div>
  
  <!-- 구분선 -->
  <div class="h(1) bg(gray-200)"></div>
  
  <!-- 액션 버튼 -->
  <div class="hbox gap(sm)">
    <button class="btn(primary) flex(1)">Follow</button>
    <button class="btn(secondary) flex(1)">Message</button>
  </div>
</div>
```

### 3. 결과
위 코드는 Figma에서 디자인한 것과 동일한 프로필 카드를 만듭니다!

## 핵심 개념 이해하기

### Figma Auto Layout = hbox/vbox
```css
hbox()      /* Horizontal Auto Layout */
vbox()      /* Vertical Auto Layout */
gap(16)     /* Item spacing */
```

### Figma Constraints = w/h
```css
w(fill)     /* Fill Container */
w(hug)      /* Hug Contents */
w(320)      /* Fixed Width */
```

### Figma Effects = 직관적 함수
```css
shadow(lg)  /* Drop Shadow */
blur(8)     /* Layer Blur */
r(xl)       /* Corner Radius */
```

## 개발 환경 설정

### React
```jsx
import 'adorable-css';

function App() {
  return (
    <div className="vbox(center) gap(xl) p(2xl) min-h(screen)">
      <h1 className="heading(h1/gradient)">
        Welcome to AdorableCSS
      </h1>
      <p className="text(lg) c(gray-600) text(center) max-w(prose)">
        Figma와 같은 방식으로 UI를 구축하세요
      </p>
      <button className="btn(primary/lg)">
        시작하기
      </button>
    </div>
  );
}
```

### Vue
```vue
<template>
  <div class="container(lg) py(xl)">
    <article class="prose(lg)">
      <h1>{{ title }}</h1>
      <p>{{ content }}</p>
    </article>
  </div>
</template>

<script setup>
import 'adorable-css';

const title = 'AdorableCSS with Vue';
const content = 'Vue와 완벽하게 호환됩니다.';
</script>
```

### 바닐라 JavaScript
```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/adorable-css/dist/adorable.min.js"></script>
</head>
<body>
  <div class="vbox(center) gap(xl) p(xl) min-h(screen)">
    <div class="card() p(xl)">
      <h2 class="heading(h2) mb(md)">Pure HTML</h2>
      <p class="c(gray-600)">
        프레임워크 없이도 사용 가능합니다
      </p>
    </div>
  </div>
</body>
</html>
```

## VS Code 설정 (권장)

### 1. 자동완성
```json
{
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "tailwindCSS.experimental.classRegex": [
    ["class[Nn]ame\\s*=\\s*[\"']([^\"']*)[\"']", "([^\"']*)"]
  ]
}
```

### 2. 문법 하이라이팅
AdorableCSS Language Support 확장 설치 (개발 중)

## 디버깅 팁

### 1. 클래스 확인
브라우저 개발자 도구에서 생성된 클래스명 확인:
```html
<!-- 입력 -->
<div class="hbox gap(lg)">

<!-- 생성된 HTML -->
<div class="hbox gap(lg)">
```

### 2. CSS 확인
생성된 CSS 규칙 확인:
```css
.hbox {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.gap\(lg\) {
  gap: var(--spacing-lg);
}
```

## 다음 단계

기본을 익혔다면 더 깊이 탐색해보세요:

1. **[Figma-First CSS Utility](./02-figma-first-css-utility.md)**  
   Figma 개념이 어떻게 CSS로 매핑되는지 상세히 알아보기

2. **[Design Token](./03-design-token.md)**  
   Figma Variables와 동기화되는 토큰 시스템

3. **[Layout](./04-layout.md)**  
   Auto Layout, Grid, Positioning 마스터하기

4. **[Component](./05-component.md)**  
   내장 컴포넌트와 커스텀 컴포넌트 만들기

## 도움이 필요하신가요?

- 📚 [전체 문서](./01-overview.md)
- 💬 [GitHub Discussions](https://github.com/adorable-css/adorable-css/discussions)
- 🐛 [Issue 리포트](https://github.com/adorable-css/adorable-css/issues)
- 🎮 [Interactive Playground](https://adorablecss.com/playground)