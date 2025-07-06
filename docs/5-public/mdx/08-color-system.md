# 색상 시스템

AdorableCSS의 과학적이고 혁신적인 색상 시스템에 대한 완전한 가이드입니다.

## OKLCH 색상 공간

### 왜 OKLCH인가?

전통적인 RGB나 HSL 색상 공간의 한계를 극복하고, 인간의 시각 시스템에 맞춰 설계된 색상 공간입니다.

#### RGB/HSL의 문제점
```css
/* RGB: 수학적으로 동일한 차이, 시각적으로는 다른 차이 */
#ff0000 → #ff3300  /* 빨강에서 약간 밝은 빨강 (거의 차이 없음) */
#000000 → #330000  /* 검정에서 어두운 빨강 (큰 차이로 인지) */

/* HSL: 명도가 같아도 실제 밝기는 다름 */
hsl(60, 100%, 50%)   /* 노랑 - 매우 밝게 인지 */
hsl(240, 100%, 50%)  /* 파랑 - 상대적으로 어둡게 인지 */
```

#### OKLCH의 혁신
- **L (Lightness)**: 인지되는 밝기와 정확히 일치
- **C (Chroma)**: 색상의 순수도/채도
- **H (Hue)**: 색조

```css
/* AdorableCSS: 지각적으로 균등한 색상 변화 */
oklch(50% 0.15 0)     /* 중간 밝기 빨강 */
oklch(60% 0.15 0)     /* 10% 더 밝은 빨강 - 정확히 10% 밝게 인지됨 */
oklch(70% 0.15 0)     /* 20% 더 밝은 빨강 - 정확히 20% 밝게 인지됨 */
```

### 지각적 균형 색상 팔레트

AdorableCSS는 각 색상에 대해 지각적으로 균등한 명도 단계를 생성합니다:

```css
/* AdorableCSS OKLCH - 균등한 시각적 차이 */
--red-50: oklch(97% 0.015 12);   /* 매우 연한 빨강 */
--red-100: oklch(93% 0.035 12);  /* 연한 빨강 */
--red-200: oklch(87% 0.055 12);  /* 중간 연한 빨강 */
--red-300: oklch(78% 0.075 12);  /* 보통 빨강 */
--red-400: oklch(68% 0.090 12);  /* 진한 빨강 */
/* ... 각 단계가 동일하게 인지됨 */
```

## Dot Notation 투명도

### 직관적인 투명도 표현

AdorableCSS는 Tailwind의 혼란스러운 `/` 방식 대신, 수학과 프로그래밍에서 친숙한 `.` 표기법을 사용합니다.

#### 기본 사용법
```html
<!-- 정수 퍼센트 -->
<div class="bg(white.5)">50% 투명도 흰색 배경</div>
<div class="c(black.2)">20% 투명도 검정 텍스트</div>
<div class="border(gray-400.8)">80% 투명도 회색 테두리</div>

<!-- 정밀한 소수점 -->
<div class="bg(blue-500.85)">85% 투명도</div>
<div class="c(white.05)">5% 투명도</div>
```

#### 장점
- ✅ 수학적 직관과 완벽 일치 (.5 = 0.5 = 50%)
- ✅ 그라디언트 방향(`/`)과 명확히 구분
- ✅ 간결하고 읽기 쉬운 문법

### CSS 구현

내부적으로 `color-mix()` 함수를 활용하여 정확한 색상 보간:

```css
/* 생성되는 CSS */
.bg\(white\.5\) {
  background: color-mix(in srgb, white 50%, transparent);
}

.c\(blue-500\.8\) {
  color: color-mix(in srgb, var(--blue-500) 80%, transparent);
}
```

## 고급 그라디언트

### 방향-우선 문법

AdorableCSS는 방향을 먼저, 색상을 나중에 지정하는 직관적인 문법을 제공합니다.

#### 선형 그라디언트
```html
<!-- 각도 지정 -->
<div class="bg(135deg/purple-500..pink-500)">
  135도 각도 그라디언트
</div>

<!-- 방향 키워드 -->
<div class="bg(to-br/blue-500..green-500)">
  오른쪽 아래 방향 그라디언트
</div>

<!-- 다중 색상 -->
<div class="bg(to-r/red-500..yellow-500..green-500)">
  무지개 그라디언트
</div>

<!-- 방향 생략시 기본값 (135deg) -->
<div class="bg(purple-500..pink-500)">
  기본 각도 그라디언트
</div>
```

#### 방향 키워드
- `to-t` / `to-top`: 위쪽
- `to-tr` / `to-top-right`: 오른쪽 위
- `to-r` / `to-right`: 오른쪽
- `to-br` / `to-bottom-right`: 오른쪽 아래
- `to-b` / `to-bottom`: 아래쪽
- `to-bl` / `to-bottom-left`: 왼쪽 아래
- `to-l` / `to-left`: 왼쪽
- `to-tl` / `to-top-left`: 왼쪽 위

### 텍스트 그라디언트

텍스트에도 동일한 문법으로 그라디언트 적용:

```html
<!-- 선형 텍스트 그라디언트 -->
<h1 class="c(135deg/purple-500..pink-500) font(4xl) bold">
  그라디언트 제목
</h1>

<!-- 다중 색상 텍스트 -->
<p class="c(to-r/blue-500..green-500..yellow-500) font(xl)">
  무지개 색상 텍스트
</p>

<!-- 래디얼 텍스트 그라디언트 -->
<h2 class="c(radial/yellow-400..red-500) font(3xl)">
  Radial Text
</h2>
```

### 래디얼 그라디언트

원형 및 타원형 그라디언트:

```html
<!-- 기본 원형 -->
<div class="bg(radial/purple-500..pink-500)">
  원형 그라디언트
</div>

<!-- 타원형 -->
<div class="bg(radial-gradient/ellipse/blue-500..transparent)">
  타원형 그라디언트
</div>
```

### 투명도가 있는 그라디언트

색상에 투명도 적용:

```html
<!-- 투명도 그라디언트 -->
<div class="bg(to-r/blue-500.8..transparent)">
  80% 투명도에서 투명으로
</div>

<!-- 양쪽 투명도 -->
<div class="bg(45deg/purple-500.5..pink-500.5)">
  50% 투명도 그라디언트
</div>
```

## 색상 토큰 시스템

### 의미론적 색상

```css
/* 의미론적 색상 토큰 */
--primary: var(--blue-600);
--secondary: var(--gray-600);
--accent: var(--purple-600);
--success: var(--green-600);
--warning: var(--amber-600);
--error: var(--red-600);
--info: var(--blue-500);
```

### 브랜드 색상

```css
/* 브랜드 색상 */
--brand: linear-gradient(135deg, var(--blue-600), var(--purple-600));
--brand-start: var(--blue-600);
--brand-end: var(--purple-600);
```

### 다크 모드

```html
<!-- 자동 다크 모드 대응 -->
<div class="bg(white) dark:bg(gray-900)">
  <h1 class="c(gray-900) dark:c(white)">
    다크 모드 지원
  </h1>
</div>
```

## 색상 테마

### 테마 설정
```javascript
import { setTheme } from 'adorable-css';

// 사용 가능한 테마
setTheme('default');     // 기본 테마
setTheme('vibrant');     // 선명한 테마
setTheme('pastel');      // 파스텔 테마
setTheme('dark');        // 다크 테마
```

### 커스텀 테마
```javascript
import { createCustomTheme } from 'adorable-css';

// 커스텀 테마 생성
createCustomTheme('my-theme', {
  temperature: 0.8,    // 따뜻함 (0-1)
  saturation: 1.2,     // 채도 (0.5-1.5)
  lightness: 0.9       // 밝기 (0.5-1.5)
});

// 사용
setTheme('my-theme');
```

## 실전 예제

### 그라디언트 버튼
```html
<button class="
  px(24) py(12)
  bg(135deg/purple-500..pink-500)
  hover:bg(135deg/purple-600..pink-600)
  c(white) font(medium)
  r(lg) shadow(lg)
  transition
">
  Gradient Button
</button>
```

### 글래스모피즘 카드
```html
<div class="
  p(24) r(xl)
  bg(white.1) backdrop(12)
  border(1/white.2)
  shadow(xl/black.1)
">
  <h3 class="c(white) font(xl)">Glass Card</h3>
  <p class="c(white.8)">투명도가 적용된 카드</p>
</div>
```

### 그라디언트 텍스트 배너
```html
<div class="vbox(center) p(48) bg(gray-900)">
  <h1 class="
    c(to-r/blue-400..purple-400..pink-400)
    font(6xl/1.1/-2%)
    bold text(center)
  ">
    Gradient Text Banner
  </h1>
  <p class="c(gray-400) mt(16)">
    AdorableCSS로 만든 아름다운 그라디언트
  </p>
</div>
```

## 성능 최적화

1. **색상 캐싱**: 동일한 색상 변환은 한 번만 수행
2. **CSS 변수 활용**: 토큰은 CSS 변수로 저장되어 재사용
3. **브라우저 최적화**: `color-mix()`와 같은 네이티브 함수 활용

## 마무리

AdorableCSS의 색상 시스템은 과학적 정확성과 개발자 경험을 모두 만족시킵니다. OKLCH 색상 공간, 직관적인 투명도 표기법, 강력한 그라디언트 파서를 통해 디자이너가 상상하는 모든 색상 표현을 코드로 쉽게 구현할 수 있습니다.