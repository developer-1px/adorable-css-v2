# Migration Guide

> TailwindCSS, CSS-in-JS, 또는 기존 CSS에서 AdorableCSS로 마이그레이션하는 가이드

## 📋 목차

1. [TailwindCSS에서 마이그레이션](#-tailwindcss에서-마이그레이션)
2. [CSS-in-JS에서 마이그레이션](#-css-in-js에서-마이그레이션)
3. [Vanilla CSS에서 마이그레이션](#-vanilla-css에서-마이그레이션)
4. [점진적 마이그레이션 전략](#-점진적-마이그레이션-전략)
5. [도구 및 자동화](#-도구-및-자동화)

## 🔄 TailwindCSS에서 마이그레이션

### 🎯 핵심 차이점 (10초 요약)

| 하고 싶은 것 | TailwindCSS | AdorableCSS |
|-------------|-------------|-------------|
| 수평 중앙 정렬 | `flex items-center justify-center` | `hbox(pack)` |
| 수직 중앙 정렬 | `flex flex-col items-center justify-center` | `vbox(pack)` |
| 간격 추가 | `gap-4` | `gap(md)` |
| 전체 너비 | `w-full` | `w(fill)` |
| 컨테이너 | `container mx-auto px-4` | `container(xl)` |
| 텍스트 색상 | `text-blue-500` | `c(blue-500)` |
| 그라데이션 | `bg-gradient-to-r from-purple-500 to-pink-500` | `bg(to-r/purple-500..pink-500)` |
| 투명도 | `text-blue-500/50` | `c(blue-500.5)` |
| 호버 스케일 | `hover:scale-105` | `hover:scale(105)` |
| 반응형 그리드 | `md:grid-cols-2` | `md:grid(2)` |
| 포커스 링 | `focus:ring-2 focus:ring-blue-500` | `focus:ring(2/blue-500)` |

### 🚫 Tailwind 습관으로 인한 흔한 실수들

Tailwind CSS에서 AdorableCSS로 넘어올 때 자주 발생하는 실수들과 올바른 사용법을 숙지하는 것이 중요합니다.

#### 1. 투명도 표기법 실수
-   **❌ 잘못된 방법 (Tailwind 스타일)**:
    ```html
    <div class="bg-white/50 text-gray-900/80">
    <div class="opacity-50">
    ```
-   **✅ 올바른 방법 (AdorableCSS)**:
    ```html
    <div class="bg(white.5) c(gray-900.8)">
    <div class="opacity(.5)">
    ```
    **핵심**: AdorableCSS는 **점(.) 표기법**을 사용합니다. `/50` ❌ → `.5` ✅

#### 2. CSS 함수 값 표기 실수
-   **❌ 잘못된 방법 (백분율 변환)**:
    ```html
    <div class="scale-95 rotate-45">
    ```
-   **✅ 올바른 방법 (CSS 네이티브 값)**:
    ```html
    <div class="scale(.95) rotate(45deg)">
    ```
    **핵심**: AdorableCSS는 **CSS 네이티브 값**을 그대로 사용합니다.

#### 3. Margin 사용 실수
-   **❌ 절대 금지! (Tailwind 습관)**:
    ```html
    <div class="mt-4 mb-6 ml-2 mr-3">
    ```
-   **✅ 올바른 방법 (Gap 기반 레이아웃)**:
    ```html
    <div class="vbox gap(lg) p(xl)">
      <div>Content 1</div>
      <div>Content 2</div>
    </div>
    ```
    **핵심**: AdorableCSS에서는 **margin을 절대 사용하지 않습니다**. `gap()`과 `p()`를 사용하세요.

#### 4. Flexbox 클래스 실수
-   **❌ 잘못된 방법 (Tailwind 스타일)**:
    ```html
    <div class="flex flex-col items-center justify-between gap-4">
    ```
-   **✅ 올바른 방법 (AdorableCSS)**:
    ```html
    <div class="vbox(center/between) gap(lg)">
    ```
    **핵심**: `hbox()`, `vbox()` + **Figma Auto Layout 용어**를 사용합니다.

#### 5. 색상 시스템 실수
-   **❌ 잘못된 방법 (Tailwind 숫자 체계)**:
    ```html
    <div class="text-gray-500 bg-blue-600 border-red-400">
    ```
-   **✅ 올바른 방법 (AdorableCSS 의미론적 체계)**:
    ```html
    <div class="c(gray-medium) bg(blue-primary) b(1/red-light)">
    ```
    **핵심**: 숫자보다는 **의미론적 색상명**을 우선 사용합니다.

#### 6. 크기 단위 실수
-   **❌ 잘못된 방법 (Tailwind 숫자 체계)**:
    ```html
    <div class="w-64 h-32 p-4">
    ```
-   **✅ 올바른 방법 (AdorableCSS)**:
    ```html
    <div class="w(2xl) h(xl) p(lg)">
    ```
    **핵심**: **의미론적 크기명**을 사용하여 더 직관적입니다.

#### 7. 그라디언트 문법 실수
-   **❌ 잘못된 방법 (Tailwind 복잡한 문법)**:
    ```html
    <div class="bg-gradient-to-r from-blue-500 to-purple-600">
    ```
-   **✅ 올바른 방법 (AdorableCSS)**:
    ```html
    <div class="bg(to-r/blue-500..purple-600)">
    ```
    **핵심**: **CSS 네이티브 그라디언트 문법**을 간소화했습니다.

#### 8. 애니메이션 실수
-   **❌ 잘못된 방법 (Tailwind 제한적 애니메이션)**:
    ```html
    <div class="animate-pulse animate-bounce">
    ```
-   **✅ 올바른 방법 (AdorableCSS)**:
    ```html
    <div class="fade-up(.8s/ease-out/delay:300ms)">
    <div class="float(25s/ease-in-out/repeat:infinite)">
    ```
    **핵심**: **파라미터 조정 가능**한 애니메이션 시스템입니다.

#### 9. 컴포넌트 클래스명 실수
-   **❌ 잘못된 방법 (Tailwind 유틸리티만)**:
    ```html
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    ```
-   **✅ 올바른 방법 (AdorableCSS)**:
    ```html
    <button class="button(primary/lg)">
    ```
    **핵심**: **의미론적 컴포넌트**를 우선 사용하고, 필요시 유틸리티로 커스터마이징합니다.

### 💡 Tailwind 개발자가 좋아할 기능

1.  **더 짧은 클래스명**
    -   `p-6` → `p(lg)`
    -   `rounded-lg` → `r(lg)`
    -   `shadow-md` → `shadow(md)`
2.  **일관된 함수형 문법**
    -   모든 유틸리티가 `name(value)` 형식
    -   예측 가능한 패턴
3.  **CSS @layer 자동 관리**
    -   특이성 지옥에서 해방
    -   `!important` 거의 불필요

### 🎁 보너스: Tailwind에는 없는 것들

```html
<!-- 글래스모피즘 한 방에 -->
<div class="glass(20)">

<!-- 그라디언트 텍스트 -->
<h1 class="font(4xl) bold bg-clip(text) c(135deg/#667eea..#764ba2)">

<!-- 자동 다크모드 (준비 중) -->
<div class="bg(white) dark:bg(gray-900)">
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

- [API Reference](/docs/reference)
- [Cookbook 예제](/docs/cookbook)
- [Playground](/playground)
- [커뮤니티 포럼](https://github.com/adorablecss/adorable-css-v2/discussions)

## 💬 도움이 필요하신가요?

마이그레이션 중 문제가 발생하면:

1. [GitHub Issues](https://github.com/adorablecss/adorable-css-v2/issues)에 문의
2. [Discord 커뮤니티](준비 중) 참여
3. [마이그레이션 가이드 개선 제안](https://github.com/developer-1px/adorable-css-v2/blob/main/CONTRIBUTING.md)