# 🚀 AdorableCSS Quick Start

> 5분 안에 첫 번째 컴포넌트 만들기

## 1. 설치 (30초)

```bash
# npm
npm install adorable-css

# pnpm
pnpm add adorable-css

# yarn
yarn add adorable-css
```

## 2. 프로젝트에 추가 (30초)

```javascript
// main.js 또는 index.js
import 'adorable-css'

// 또는 HTML에서
<link rel="stylesheet" href="https://unpkg.com/adorable-css/dist/adorable.css">
```

## 3. 첫 번째 버튼 만들기 (1분)

```html
<button class="btn">
  기본 버튼
</button>

<button class="btn px(xl) py(md) bg(purple-500) c(white) hover:bg(purple-600)">
  커스텀 버튼
</button>
```

## 4. 레이아웃 구성하기 (2분)

```html
<!-- 중앙 정렬 컨테이너 -->
<div class="hbox(fill) min-h(screen)">
  <div class="card w(400px)">
    <h1 class="heading(lg) mb(md)">환영합니다!</h1>
    <p class="body c(gray-600) mb(lg)">
      AdorableCSS로 아름다운 UI를 만들어보세요.
    </p>
    <button class="btn w(full)">시작하기</button>
  </div>
</div>
```

## 5. 반응형 디자인 (1분)

```html
<!-- 모바일 우선 반응형 그리드 -->
<div class="grid(1) md:grid(2) lg:grid(3) gap(lg) p(xl)">
  <div class="card">카드 1</div>
  <div class="card">카드 2</div>
  <div class="card">카드 3</div>
</div>
```

## 🎉 완성! 

축하합니다! 이제 AdorableCSS의 기본을 익히셨습니다.

### 다음 단계

1. **[인터랙티브 Playground](/playground)** - 실시간으로 실험해보세요
2. **[컴포넌트 갤러리](/components)** - 더 많은 예제 확인
3. **[API Reference](/docs/reference)** - 전체 기능 탐색

### 핵심 개념 요약

| 개념 | 예시 | 설명 |
|------|------|------|
| **함수형 문법** | `p(lg)` | 괄호로 값 전달 |
| **토큰 시스템** | `bg(purple-500)` | 일관된 디자인 토큰 |
| **상태 관리** | `hover:scale(105)` | 콜론으로 상태 표현 |
| **반응형** | `md:grid(2)` | 브레이크포인트 접두사 |

### 💡 Pro Tip

```html
<!-- Figma의 Auto Layout처럼 사용하기 -->
<div class="vbox gap(md) p(lg)">
  <div class="hbox(middle) gap(sm)">
    <icon>📧</icon>
    <span>이메일</span>
  </div>
  <input class="w(fill)" placeholder="your@email.com">
</div>
```

준비되셨나요? [다음 튜토리얼로 →](/docs/layout)