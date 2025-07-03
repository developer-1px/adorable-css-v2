# Migration Guide

> TailwindCSS, CSS-in-JS, 또는 기존 CSS에서 AdorableCSS로 마이그레이션하는 가이드

## 📋 목차

1. [TailwindCSS에서 마이그레이션](#tailwindcss에서-마이그레이션)
2. [CSS-in-JS에서 마이그레이션](#css-in-js에서-마이그레이션)
3. [Vanilla CSS에서 마이그레이션](#vanilla-css에서-마이그레이션)
4. [점진적 마이그레이션 전략](#점진적-마이그레이션-전략)
5. [도구 및 자동화](#도구-및-자동화)

## 🔄 TailwindCSS에서 마이그레이션

### 주요 차이점

| TailwindCSS | AdorableCSS | 설명 |
|-------------|-------------|------|
| `flex` | `hbox` | 수평 flexbox |
| `flex-col` | `vbox` | 수직 flexbox |
| `items-center justify-center` | `hbox(pack)` | 중앙 정렬 |
| `gap-4` | `gap(md)` | 간격 설정 |
| `p-4` | `p(md)` | 패딩 |
| `text-blue-500` | `c(blue-500)` | 텍스트 색상 |
| `bg-gradient-to-r from-purple-500 to-pink-500` | `bg(to-r/purple-500..pink-500)` | 그라데이션 |
| `w-full` | `w(full)` | 너비 100% |
| `text-2xl font-bold` | `heading(lg)` | 의미론적 타이포그래피 |

### 일반적인 패턴 변환

#### 1. 레이아웃

```html
<!-- TailwindCSS -->
<div class="flex items-center justify-between gap-4 p-6">
  <div class="flex-1">Content</div>
  <button class="px-4 py-2">Action</button>
</div>

<!-- AdorableCSS -->
<div class="hbox(middle) gap(md) p(lg) justify(between)">
  <div class="flex(1)">Content</div>
  <button class="px(md) py(sm)">Action</button>
</div>
```

#### 2. 카드 컴포넌트

```html
<!-- TailwindCSS -->
<div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
  <h3 class="text-xl font-bold mb-2">Title</h3>
  <p class="text-gray-600">Description</p>
</div>

<!-- AdorableCSS -->
<div class="card">
  <h3 class="heading(md) mb(sm)">Title</h3>
  <p class="body c(gray-600)">Description</p>
</div>
```

#### 3. 반응형 디자인

```html
<!-- TailwindCSS -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

<!-- AdorableCSS -->
<div class="grid(1) md:grid(2) lg:grid(3) gap(md)">
```

### 설정 파일 변환

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#667eea'
      }
    }
  }
}

// adorable.config.js (준비 중)
export default {
  tokens: {
    colors: {
      primary: '#667eea'
    }
  }
}
```

## 💅 CSS-in-JS에서 마이그레이션

### Styled Components / Emotion

#### Before (CSS-in-JS)

```jsx
const Button = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 9999px;
  font-weight: 600;
  transition: all 0.2s;
  
  &:hover {
    transform: scale(1.05);
  }
`;
```

#### After (AdorableCSS)

```jsx
function Button({ children }) {
  return (
    <button class="inline-flex items(center) px(xl) py(md) 
                   bg(135deg/#667eea..#764ba2) c(white) r(full) 
                   bold(semi) transition hover:scale(1.05)">
      {children}
    </button>
  );
}
```

### 동적 스타일링

#### Before

```jsx
const Box = styled.div`
  padding: ${props => props.spacing}px;
  background: ${props => props.bg};
`;
```

#### After

```jsx
function Box({ spacing, bg, children }) {
  return (
    <div class={`p(${spacing}) bg(${bg})`}>
      {children}
    </div>
  );
}
```

## 🎨 Vanilla CSS에서 마이그레이션

### 기존 CSS 유지하며 점진적 전환

```css
/* 기존 CSS */
.header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: white;
}

/* AdorableCSS와 혼용 */
.header {
  /* 기존 스타일 유지 */
}

/* 새로운 요소는 AdorableCSS 사용 */
.header-new {
  /* AdorableCSS 클래스 사용 */
}
```

```html
<header class="header hbox(middle) gap(md)">
  <!-- 기존 CSS + AdorableCSS 혼용 -->
</header>
```

## 📈 점진적 마이그레이션 전략

### 1단계: 설치 및 설정

```bash
npm install adorable-css
```

```javascript
// main.js
import 'adorable-css';
```

### 2단계: 새 컴포넌트부터 시작

- 새로 만드는 컴포넌트는 AdorableCSS 사용
- 기존 컴포넌트는 유지

### 3단계: 유틸리티부터 교체

1. 간단한 유틸리티 클래스부터 교체
   - `margin`, `padding` → `m()`, `p()`
   - `display: flex` → `hbox`, `vbox`

2. 색상 시스템 통일
   - 기존 색상을 AdorableCSS 토큰으로 매핑

### 4단계: 컴포넌트 리팩토링

```html
<!-- Phase 1: 혼용 -->
<div class="old-card hbox gap(md)">

<!-- Phase 2: 완전 전환 -->
<div class="card">
```

### 5단계: 기존 CSS 제거

- 사용하지 않는 CSS 점진적 제거
- 번들 크기 최적화

## 🛠 도구 및 자동화

### 변환 스크립트 (예정)

```bash
# TailwindCSS → AdorableCSS
npx adorable-migrate tailwind

# 커스텀 매핑
npx adorable-migrate --config migration.config.js
```

### VS Code Extension (예정)

- 자동 완성
- 클래스 이름 변환
- 미리보기

### ESLint Plugin (예정)

```javascript
// .eslintrc.js
module.exports = {
  plugins: ['adorable-css'],
  rules: {
    'adorable-css/no-tailwind-classes': 'warn',
    'adorable-css/prefer-semantic': 'warn'
  }
};
```

## 🎯 모범 사례

### Do's ✅

1. **의미론적 클래스 우선 사용**
   ```html
   <!-- Good -->
   <h1 class="heading(xl)">
   
   <!-- Avoid -->
   <h1 class="font(32) bold">
   ```

2. **컴포넌트 클래스 활용**
   ```html
   <!-- Good -->
   <div class="card">
   
   <!-- Avoid -->
   <div class="bg(white) p(xl) r(lg) shadow(md)">
   ```

3. **토큰 시스템 활용**
   ```html
   <!-- Good -->
   <div class="p(lg) c(primary)">
   
   <!-- Avoid -->
   <div class="p(24) c(#667eea)">
   ```

### Don'ts ❌

1. **인라인 스타일 사용 금지**
2. **!important 남용 금지**
3. **깊은 선택자 체인 금지**

## 📚 추가 리소스

- [API Reference](./REFERENCE.md)
- [예제 코드](./mdx/)
- [Playground](/playground)
- [커뮤니티 포럼](https://github.com/adorablecss/adorable-css-v2/discussions)

## 💬 도움이 필요하신가요?

마이그레이션 중 문제가 발생하면:

1. [GitHub Issues](https://github.com/adorablecss/adorable-css-v2/issues)에 문의
2. [Discord 커뮤니티](준비 중) 참여
3. [마이그레이션 가이드 개선 제안](./CONTRIBUTING.md)