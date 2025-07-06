# 기술 아키텍처

AdorableCSS의 내부 아키텍처와 파서 시스템, 규칙 엔진에 대한 심층 분석입니다.

## 파서 시스템

### 개요
AdorableCSS의 핵심은 복잡한 CSS 표현식을 이해하는 커스텀 파서입니다. 전통적인 유틸리티 프레임워크가 단순한 클래스명을 사용하는 것과 달리, 우리는 함수형 문법을 지원합니다:

```css
/* AdorableCSS가 파싱하는 표현식들 */
layer(top:20+left:30)              /* 복잡한 포지셔닝 */
font(Inter/16/1.5/medium)          /* 다중 매개변수 */
hover:md:scale(1.1)                /* 중첩된 prefix */
bg(45deg/blue-500..purple-500)     /* 그라디언트 문법 */
```

### 파서 아키텍처

#### 1단계: 토큰화 (Tokenization)
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

#### 2단계: AST 생성
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

#### 3단계: CSS 생성
AST를 실제 CSS로 변환:

```typescript
// 규칙 핸들러 조회
const handler = getRuleHandler('scale');
const css = handler('1.1');
// { transform: 'scale(1.1)' }

// prefix 적용
const finalCSS = applyPrefixes(css, ['hover', 'md']);
// @media (min-width: 768px) {
//   .hover\:md\:scale\(1\.1\):hover {
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
export const generateCSS = createMemo(_generateCSS);
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