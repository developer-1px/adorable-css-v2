# JavaScript API

AdorableCSS를 프로그래매틱하게 사용하기 위한 JavaScript API 가이드입니다.

### 기본 사용법

#### CSS 생성

```javascript
import { generateCSS } from 'adorable-css';

// 클래스 배열에서 CSS 생성
const css = generateCSS(['hbox', 'gap(16)', 'p(24)', 'bg(white)']);
console.log(css);
// 출력: .hbox{display:flex;flex-direction:row;align-items:center} ...

// 단일 클래스
const singleCSS = generateCSS(['hover:scale(1.05)']);
```

#### 파싱

```javascript
import { parseAdorableCSS } from 'adorable-css';

// AdorableCSS 문법 파싱
const ast = parseAdorableCSS('hover:md:scale(1.1)');
console.log(ast);
// {
//   type: 'utility',
//   prefixes: ['hover', 'md'],
//   property: 'scale',
//   args: [{ type: 'value', value: '1.1' }],
//   important: false
// }
```

#### 규칙 조회

```javascript
import { getRuleHandler } from 'adorable-css';

// 특정 규칙 핸들러 가져오기
const scaleHandler = getRuleHandler('scale');
if (scaleHandler) {
  const css = scaleHandler('1.05');
  console.log(css); // { transform: 'scale(1.05)' }
}
```

### 브라우저 환경

#### 자동 스타일 주입

```javascript
import { injectGlobal } from 'adorable-css';

// DOM에 자동으로 스타일 주입 (개발용)
if (typeof window !== 'undefined') {
  injectGlobal();
}

// 이제 HTML에서 직접 사용 가능
// <div class="hbox gap(lg) p(xl)">...</div>
```

#### CDN 사용

```html
<script src="https://unpkg.com/adorable-css/dist/adorable.min.js"></script>
<script>
  // 전역 AdorableCSS 객체 사용
  const css = AdorableCSS.generateCSS(['card()', 'p(lg)', 'shadow(md)']);
  
  // 자동 주입
  AdorableCSS.injectGlobal();
</script>
```

### 디자인 토큰

#### 토큰 접근

```javascript
import { defaultTokens } from 'adorable-css';

// 토큰 값 사용
const spacing = defaultTokens.spacing.md;  // "1rem"
const fontSize = defaultTokens.font.lg;     // "1.125rem"
const color = defaultTokens.colors.blue[500]; // "oklch(...)"
```

#### 토큰 설정

```javascript
import { setTokenContext, generateTokenCSS } from 'adorable-css';

// 커스텀 토큰 설정
const customTokens = {
  ...defaultTokens,
  spacing: {
    ...defaultTokens.spacing,
    xxl: '4rem'  // 추가 간격
  },
  colors: {
    ...defaultTokens.colors,
    brand: '#FF6B6B'  // 브랜드 색상
  }
};

setTokenContext(customTokens);

// 토큰 CSS 생성
const tokenCSS = generateTokenCSS();
```

#### 토큰 자동 주입

```javascript
import { autoInjectTokens, configureAutoInject, isTokensInjected } from 'adorable-css';

// 자동 주입 비활성화
configureAutoInject({ enabled: false });

// 수동 주입
if (!isTokensInjected()) {
  autoInjectTokens();
}
```

### 색상 시스템

#### 테마 설정

```javascript
import { setTheme, getCurrentTheme } from 'adorable-css';

// 테마 변경
setTheme('vibrant');  // 'default', 'vibrant', 'pastel', 'dark', 'warm', 'cool'

// 현재 테마 확인
const theme = getCurrentTheme();
console.log(theme); // 'vibrant'
```

#### 의미론적 색상

```javascript
import { configureSemanticColors } from 'adorable-css';

// 의미론적 색상 커스터마이징
configureSemanticColors({
  primary: 'indigo-600',
  secondary: 'pink-500',
  accent: 'purple-600',
  success: 'green-500',
  warning: 'yellow-500',
  error: 'red-600'
});
```

#### 커스텀 테마

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

### 컴포넌트 시스템

#### 컴포넌트 정의

```javascript
import { defineComponent } from 'adorable-css';

// 커스텀 컴포넌트 정의
const myButton = defineComponent({
  base: 'inline-flex items(center) px(16) h(40) r(md) transition',
  
  sizes: {
    sm: 'h(32) px(12) text(sm)',
    md: 'h(40) px(16) text(md)',
    lg: 'h(48) px(20) text(lg)'
  },
  
  variants: {
    primary: 'bg(primary) c(white) hover:bg(primary-700)',
    secondary: 'bg(gray-100) c(gray-900) hover:bg(gray-200)',
    danger: 'bg(red-500) c(white) hover:bg(red-600)'
  },
  
  compounds: [
    {
      variant: 'primary',
      size: 'lg',
      class: 'font-weight(bold)'
    }
  ],
  
  defaults: {
    size: 'md',
    variant: 'primary'
  }
});

// 컴포넌트 등록
import { registerComponent } from 'adorable-css';
registerComponent('my-btn', myButton);
```

#### 테마 지원 컴포넌트

```javascript
import { defineThemedComponent } from 'adorable-css';

const themedCard = defineThemedComponent({
  light: {
    base: 'bg(white) c(gray-900) shadow(md)',
    variants: {
      elevated: 'shadow(xl)',
      flat: 'shadow(none) border(1/gray-200)'
    }
  },
  dark: {
    base: 'bg(gray-800) c(white) shadow(xl/black.3)',
    variants: {
      elevated: 'shadow(2xl/black.5)',
      flat: 'shadow(none) border(1/gray-700)'
    }
  }
});
```

### 확장성

#### 커스텀 규칙 추가

```javascript
import { priorityRegistry, RulePriority } from 'adorable-css';

// 새로운 유틸리티 추가
priorityRegistry.register('glow', (value = '10') => ({
  boxShadow: `0 0 ${value}px currentColor`,
  filter: 'brightness(1.1)'
}), RulePriority.UTILITY);

// 사용
const css = generateCSS(['glow(20)', 'c(blue-500)']);
```

#### 커스텀 키프레임

```javascript
import { registerKeyframes } from 'adorable-css';

// 키프레임 추가
registerKeyframes('slide-in', {
  from: {
    transform: 'translateX(-100%)',
    opacity: '0'
  },
  to: {
    transform: 'translateX(0)',
    opacity: '1'
  }
});

// 사용
const css = generateCSS(['animate(slide-in/500/ease-out)']);
```

#### 플러그인 시스템

```javascript
import { createPlugin } from 'adorable-css';

const myPlugin = createPlugin({
  name: 'my-plugin',
  
  rules: {
    'my-utility': (value) => ({
      // CSS 속성
    })
  },
  
  keyframes: {
    // 키프레임 정의
  },
  
  tokens: {
    // 추가 토큰
  }
});

// 플러그인 등록
import { registerPlugin } from 'adorable-css';
registerPlugin(myPlugin);
```

### 성능 최적화

#### 캐싱

```javascript
import { createMemo } from 'adorable-css';

// 메모이제이션된 함수 생성
const memoizedGenerate = createMemo((classes) => {
  return generateCSS(classes);
});

// 동일한 입력에 대해 캐시된 결과 반환
const css1 = memoizedGenerate(['hbox', 'gap(lg)']);
const css2 = memoizedGenerate(['hbox', 'gap(lg)']); // 캐시에서 반환
```

#### 선택적 Import

```javascript
// 필요한 것만 import
import { generateCSS } from 'adorable-css/core';
import { btn, card } from 'adorable-css/components';
import { hbox, vbox } from 'adorable-css/layout';
```

### 타입스크립트

#### 타입 정의

```typescript
import type {
  CSSRule,
  DesignTokens,
  RuleHandler,
  ComponentDefinition
} from 'adorable-css';

// 타입 안전한 규칙 정의
const myRule: RuleHandler = (value?: string): CSSRule => {
  return {
    display: 'flex',
    gap: value || '1rem'
  };
};

// 타입 안전한 토큰
const tokens: DesignTokens = {
  spacing: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem'
  }
};
```

### 디버깅

#### 디버그 모드

```javascript
import { enableDebugMode } from 'adorable-css';

// 디버그 모드 활성화
enableDebugMode();

// 이제 파싱 과정과 CSS 생성 과정이 콘솔에 출력됨
```

#### 에러 처리

```javascript
try {
  const css = generateCSS(['invalid(syntax']);
} catch (error) {
  if (error instanceof AdorableCSSError) {
    console.error('Parsing error:', error.message);
    console.error('At position:', error.position);
  }
}
```

### 마이그레이션

#### v1에서 v2로

```javascript
// v1
import adorable from 'adorable-css';
adorable.parse('w-100 h-100');

// v2
import { generateCSS } from 'adorable-css';
generateCSS(['w(100)', 'h(100)']);
```

## 마무리

AdorableCSS의 JavaScript API는 강력하고 유연하며, 타입스크립트 지원을 통해 안전한 개발 경험을 제공합니다. 이를 통해 AdorableCSS를 빌드 시스템에 통합하거나, 런타임에 동적으로 스타일을 생성하는 등 다양한 방식으로 활용할 수 있습니다.
