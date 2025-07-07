# ESLint Plugin for AdorableCSS

AdorableCSS 프레임워크의 규칙과 베스트 프랙티스를 검증하는 ESLint 플러그인입니다.

## 설치

```bash
npm install --save-dev eslint-plugin-adorable-css
# 또는
pnpm add -D eslint-plugin-adorable-css
```

## 설정

### ESLint 설정 파일에 추가

```javascript
// eslint.config.js (ESLint 9+)
import adorableCss from 'eslint-plugin-adorable-css';

export default [
  {
    plugins: {
      'adorable-css': adorableCss
    },
    rules: {
      'adorable-css/no-margin': 'error',
      'adorable-css/css-native-syntax': 'error',
      'adorable-css/opacity-dot-syntax': 'error'
    }
  }
];

// 또는 권장 설정 사용
export default [
  adorableCss.configs.recommended
];
```

```json
// .eslintrc.json (ESLint 8)
{
  "plugins": ["adorable-css"],
  "extends": ["plugin:adorable-css/recommended"]
}
```

## 규칙

### 1. `no-margin` (권장)

margin 사용을 금지하고 gap 기반 레이아웃 사용을 강제합니다.

```jsx
// ❌ 잘못된 사용
<div className="mb(lg) mt(xl)">
  Content
</div>

// ✅ 올바른 사용  
<div className="vbox gap(lg)">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### 2. `css-native-syntax` (권장)

CSS 네이티브 문법 사용을 강제합니다.

```jsx
// ❌ 잘못된 사용
<div className="scale(105) opacity(80) rotate(45)">
  Content
</div>

// ❌ 하이픈 문법
<div className="scale-105 rotate-45">
  Content  
</div>

// ✅ 올바른 사용
<div className="scale(1.05) opacity(0.8) rotate(45deg)">
  Content
</div>
```

### 3. `opacity-dot-syntax` (권장)

AdorableCSS 점 표기법을 강제합니다.

```jsx
// ❌ Tailwind 스타일 슬래시 표기
<div className="bg(white/50) c(black/80)">
  Content
</div>

// ✅ AdorableCSS 점 표기
<div className="bg(white.5) c(black.8)">
  Content
</div>
```

## 설정 옵션

### `no-margin` 규칙 옵션

```javascript
{
  "adorable-css/no-margin": ["error", {
    "allowedMargins": ["mx(auto)"] // 예외적으로 허용할 margin 클래스들
  }]
}
```

## 사전 정의된 설정

### `recommended` (권장)
모든 규칙을 error 레벨로 설정합니다.

### `best-practices`  
엄격하지 않은 설정으로, 일부 규칙을 warning으로 설정합니다.

### `strict`
가장 엄격한 설정입니다 (recommended와 동일).

## 개발

```bash
# 의존성 설치
pnpm install

# 개발 모드
pnpm dev

# 테스트 실행
pnpm test

# 테스트 UI
pnpm test:ui

# 빌드
pnpm build

# 타입 체크
pnpm typecheck
```

## 기여

이슈나 PR은 언제든 환영합니다!

## 라이선스

MIT