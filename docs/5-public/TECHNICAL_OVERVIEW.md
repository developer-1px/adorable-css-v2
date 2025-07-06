# 기술 아키텍처 및 색상 시스템 개요

## 기술 아키텍처

AdorableCSS의 내부 아키텍처와 파서 시스템, 규칙 엔진에 대한 심층 분석입니다.

### 파서 시스템

#### 개요
AdorableCSS의 핵심은 복잡한 CSS 표현식을 이해하는 커스텀 파서입니다. 전통적인 유틸리티 프레임워크가 단순한 클래스명을 사용하는 것과 달리, 우리는 함수형 문법을 지원합니다:

```css
/* AdorableCSS가 파싱하는 표현식들 */
layer(top:20+left:30)              /* 복잡한 포지셔닝 */
font(Inter/16/1.5/medium)          /* 다중 매개변수 */
hover:md:scale(1.1)                /* 중첩된 prefix */
bg(45deg/blue-500..purple-500)     /* 그라디언트 문법 */
```

#### 파서 아키텍처

##### 1단계: 토큰화 (Tokenization)
입력 문자열을 의미 있는 토큰으로 분해:

```typescript
// 토큰 타입 정의
type TokenType = 
  | '(dimension-pair)'    // 64x64
  | '(hexcolor)'         // #ff0000
  | '(color-opacity)'    // white.8, blue-500.5
  | '(string)'           // "quoted text"
  | '(range)'            // 100..500
  | '(gradient)'         // blue..red
  | 'PREFIX'             // hover:, md:
  | 'IDENTIFIER'         // scale, bg, etc
  | 'OPERATOR'           // +, -, / ,

// 토크나이저 사용
const tokenizer = createTokenizer("hover:scale(1.1)");
const tokens = tokenizer.tokenize();
// [
//   { type: 'PREFIX', value: 'hover' },
//   { type: 'IDENTIFIER', value: 'scale' },
//   { type: 'LPAREN', value: '(' },
//   { type: 'NUMBER', value: '1.1' },
//   { type: 'RPAREN', value: ')' }
// ]
```

##### 2단계: AST 생성
토큰을 Abstract Syntax Tree로 변환:

```typescript
```typescript
interface AdorableNode {
  type: 'utility';
  prefixes: string[];      // ['hover', 'md']
  property: string;        // 'scale'
  args: ArgumentNode[];    // 파싱된 인자들
  important: boolean;      // ! 플래그
}

// 파서 사용
const ast = parseAdorableCSS("hover:md:scale(1.1)!");
// {
//   type: 'utility',
//   prefixes: ['hover', 'md'],
//   property: 'scale',
//   args: [{ type: 'value', value: '1.1' }],
//   important: true
// }
```
```

##### 3단계: CSS 생성
AST를 실제 CSS로 변환:

```typescript
// 규칙 핸들러 조회
const handler = getRuleHandler('scale');
const css = handler('1.1');
// { transform: 'scale(1.1)' }

// prefix 적용
const finalCSS = applyPrefixes(css, ['hover', 'md']);
// @media (min-width: 768px) {
//   .hover\\:md\\:scale\\(1\\.1\\):hover {
//     transform: scale(1.1);
//   }
// }
```

### 토큰 패턴 매칭

AdorableCSS는 정교한 패턴 매칭으로 다양한 값 형식을 인식:

```typescript
// 색상 + 투명도
/([a-zA-Z]+(?:-[0-9]+)*\.[0-9]+)/  // white.8, blue-500.5

// 치수 쌍
/(\d+x\d+)/                        // 320x200

// 그라디언트
/([^,]+)\.\.([^,)]+)/              // blue-500..purple-500

// 계산식
/((?:top|bottom|left|right)(?:[+-]\d+)?)/  // top+20, left-30
```

## 규칙 시스템

### 우선순위 기반 아키텍처

CSS 특정성을 자동으로 관리하는 5단계 우선순위 시스템:

```typescript
enum RulePriority {
  RESET = 0,          // 리셋 스타일
  COMPONENT = 100,    // card, btn, heading
  LAYOUT = 200,       // hbox, vbox, grid
  UTILITY = 300,      // c, bg, p, m
  STATE = 400,        // hover:, focus:, active:
  RESPONSIVE = 500    // sm:, md:, lg:, xl:
}
```

높은 우선순위의 규칙이 자동으로 낮은 우선순위를 덮어씁니다:

```html
<!-- component < utility < state -->
<div class="card() bg(blue-500) hover:bg(blue-600)">
  <!-- hover 시 blue-600이 적용됨 -->
</div>
```

### 규칙 등록 시스템

```typescript
// 단순 규칙
registry.register('opacity', (value) => ({
  opacity: value
}), RulePriority.UTILITY);

// 복잡한 규칙
registry.register('layer', (args) => {
  const positions = parseLayerPositions(args);
  return {
    position: 'absolute',
    ...positions
  };
}, RulePriority.LAYOUT);

// 하이브리드 규칙 (CSS + 클래스)
registry.register('container', (size) => {
  return [
    { maxWidth: `var(--container-${size})` },
    'mx-auto px-containerPadding'
  ];
}, RulePriority.COMPONENT);
```

## 값 변환 시스템

### 스마트 단위 변환

AdorableCSS는 값을 자동으로 적절한 CSS 단위로 변환:

```typescript
function processValue(value: string, property: string): string {
  // 숫자만 → px 추가
  if (/^\d+$/.test(value)) {
    return value + 'px';
  }
  
  // 단위가 있으면 그대로
  if (/\d+(px|rem|em|%|vh|vw)$/.test(value)) {
    return value;
  }
  
  // 토큰 확인
  if (isToken(value)) {
    return `var(--${property}-${value})`;
  }
  
  // 특수 값
  if (value === 'fill') return '100%';
  if (value === 'hug') return 'fit-content';
  
  return value;
}
```

### 색상 처리

```typescript
// 색상 + 투명도 파싱
function parseColorWithOpacity(input: string) {
  const match = input.match(/(.+)\.(\d+)/);
  if (!match) return input;
  
  const [, color, opacity] = match;
  const alpha = parseInt(opacity) / 10;
  
  // 토큰 색상
  if (isColorToken(color)) {
    return `color-mix(in srgb, var(--${color}) ${alpha * 100}%, transparent)`;
  }
  
  // hex 색상
  if (color.startsWith('#')) {
    return hexToRgba(color, alpha);
  }
  
  // 기본 색상
  return `rgba(${colorToRgb(color)}, ${alpha})`;
}
```

## 메모이제이션

성능 최적화를 위한 간단한 메모 시스템:

```typescript
export function createMemo<T>(fn: (input: string) => T): (input: string) => T {
  const cache = new Map<string, T>();
  
  return (input: string): T => {
    if (cache.has(input)) {
      return cache.get(input)!;
    }
    
    const result = fn(input);
    cache.set(input, result);
    
    return result;
  };
}

// 적용
export const parseAdorableCSS = createMemo(_parseAdorableCSS);
export const generateCSS = createMemo(generateCSS);
```

## 컴포넌트 시스템 통합

파서는 컴포넌트 정의와도 원활하게 통합:

```typescript
// 컴포넌트 정의
const button = defineComponent({
  base: 'inline-flex items(center) px(16) h(40)',
  variants: {
    primary: 'bg(primary) c(white)',
    secondary: 'bg(gray-100) c(gray-900)'
  }
});

// 파서가 btn(primary/lg)를 만나면:
// 1. btn 컴포넌트 조회
// 2. primary variant + lg size 적용
// 3. 모든 클래스를 파싱하여 CSS 생성
```

## 확장성

### 커스텀 규칙 추가

```typescript
// 새로운 유틸리티 추가
import { registry, RulePriority } from 'adorable-css';

registry.register('glow', (value = '10') => ({
  boxShadow: `0 0 ${value}px currentColor`,
  filter: 'brightness(1.1)'
}), RulePriority.UTILITY);

// 사용
<div class="glow(20) c(blue-500)">
  빛나는 텍스트
</div>
```

### 커스텀 토큰 패턴

```typescript
// 새로운 토큰 패턴 추가
tokenizer.addPattern('emoji', /:([\w-]+):/);

// 사용
<div class="icon(:heart:)">
  // 파서가 :heart:를 인식
</div>
```

## 성능 최적화

1. **파싱 캐싱**: 동일한 클래스는 한 번만 파싱
2. **CSS 중복 제거**: 동일한 스타일은 한 번만 생성
3. **트리 쉐이킹**: 사용하지 않는 규칙은 번들에서 제외
4. **빌드 타임 최적화**: 가능한 모든 처리를 빌드 시점에

## 마무리

AdorableCSS의 파서 시스템은 단순한 문자열 매칭을 넘어 진정한 DSL(Domain Specific Language)을 구현합니다. 이를 통해 Figma의 디자인 개념을 코드로 자연스럽게 표현할 수 있으며, 확장 가능하고 성능이 뛰어난 CSS 프레임워크를 만들 수 있었습니다.

## 색상 시스템

AdorableCSS의 과학적이고 혁신적인 색상 시스템에 대한 완전한 가이드입니다.

### OKLCH 색상 공간

#### 왜 OKLCH인가?

전통적인 RGB나 HSL 색상 공간의 한계를 극복하고, 인간의 시각 시스템에 맞춰 설계된 색상 공간입니다.

##### RGB/HSL의 문제점
```css
/* RGB: 수학적으로 동일한 차이, 시각적으로는 다른 차이 */
#ff0000 → #ff3300  /* 빨강에서 약간 밝은 빨강 (거의 차이 없음) */
#000000 → #330000  /* 검정에서 어두운 빨강 (큰 차이로 인지) */

/* HSL: 명도가 같아도 실제 밝기는 다름 */
hsl(60, 100%, 50%)   /* 노랑 - 매우 밝게 인지 */
hsl(240, 100%, 50%)  /* 파랑 - 상대적으로 어둡게 인지 */
```

##### OKLCH의 혁신
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
.bg\\(white\\.5\\) {
  background: color-mix(in srgb, white 50%, transparent);
}

.c\\(blue-500\\.8\\) {
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
