# Semantic Color System

AdorableCSS의 Semantic Color System은 동적으로 색상 팔레트를 생성하고 관리하는 모듈입니다.

## 개요

하드코딩된 색상 매핑 대신, 기본 색상 계열(color family)을 선택하면 자동으로 모든 shade가 생성됩니다.

## 사용법

### 1. 기본 사용법

```typescript
import { getColorScheme } from 'adorable-css/design-system/colors/semantic-color-system';

// 사전 정의된 색상 스킴 사용
const colorScheme = getColorScheme('default');
// 결과: {
//   primary: 'indigo-600',
//   secondary: 'slate-600',
//   accent: 'violet-500',
//   mute: 'gray-500',
//   success: 'emerald-600',
//   warning: 'amber-500',
//   error: 'red-600',
//   info: 'sky-500',
//   brand: 'indigo-600..violet-500'
// }
```

### 2. Primary 색상으로부터 자동 생성

```typescript
import { createFromPrimaryColor } from 'adorable-css/design-system/colors/semantic-color-system';

// primary 색상만 지정하면 나머지는 자동 계산
const myScheme = createFromPrimaryColor('teal-600');
// 결과: teal 기반의 완전한 색상 스킴이 생성됨

// 옵션으로 secondary와 accent 계열 지정 가능
const customScheme = createFromPrimaryColor('blue-600', {
  secondaryFamily: 'gray',
  accentFamily: 'purple'
});
```

### 3. 사전 정의된 색상 스킴

```typescript
// 사용 가능한 스킴들:
// - default: Indigo 기반 (기본값)
// - professional: Blue 기반
// - creative: Purple 기반  
// - nature: Green 기반
// - monochrome: Gray 기반

const professionalScheme = getColorScheme('professional');
const creativeScheme = getColorScheme('creative');
```

### 4. CSS 변수 생성

```typescript
import { generateSemanticColorVariables } from 'adorable-css/design-system/colors/semantic-color-system';

const cssVariables = generateSemanticColorVariables({
  primary: 'indigo-600',
  secondary: 'slate-600',
  accent: 'violet-500',
  mute: 'gray-500'
});

// 결과:
// --primary: var(--indigo-600);
// --primary-50: var(--indigo-50);
// --primary-100: var(--indigo-100);
// ... (모든 shade 자동 생성)
// --secondary: var(--slate-600);
// --secondary-50: var(--slate-50);
// ... (각 semantic color별로 모든 shade 생성)
```

## 생성되는 Shade

각 semantic color에 대해 다음 shade들이 자동 생성됩니다:
- 25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950

예시:
- `primary: 'indigo-600'` 지정 시
  - `primary-25`, `primary-50`, ... `primary-950` 모두 생성

## 커스텀 색상 스킴 만들기

```typescript
import type { SemanticColorSystemConfig } from 'adorable-css/design-system/colors/semantic-color-system';

const myBrandColors: SemanticColorSystemConfig = {
  primary: 'blue-700',      // 진한 파랑
  secondary: 'gray-600',    // 중성 회색
  accent: 'orange-500',     // 포인트 주황
  mute: 'gray-400',         // 연한 회색
  success: 'green-600',     
  warning: 'yellow-500',    
  error: 'red-600',        
  info: 'blue-500',
  brand: 'blue-700..orange-500'  // 그라디언트
};

// CSS 변수로 변환
const cssVars = generateSemanticColorVariables(myBrandColors);
```

## 통합 예시

```typescript
// 02-design_tokens/index.ts에서
import { getColorScheme, generateSemanticColorVariables } from '../colors/semantic-color-system';

export function generateTokenCSS(tokens: DesignTokens = defaultTokens): string {
  // ... 기존 토큰 처리
  
  // Semantic color 동적 생성
  const colorScheme = getColorScheme('default'); // 또는 설정에서 읽기
  const semanticColorVars = generateSemanticColorVariables(colorScheme);
  
  // CSS 변수로 출력
  return `:root {
    ${otherTokens}
    ${semanticColorVars}
  }`;
}
```

## 장점

1. **일관성**: 한 번의 색상 선택으로 모든 shade가 자동 생성
2. **유연성**: 다양한 사전 정의 스킴 제공 및 커스텀 가능
3. **유지보수**: 하드코딩 대신 동적 생성으로 변경 용이
4. **확장성**: 새로운 semantic color 추가 시 자동으로 모든 shade 생성

## Migration Guide

기존 하드코딩 방식:
```typescript
// Before
--primary-50: var(--indigo-50);
--primary-100: var(--indigo-100);
// ... 수십 줄의 하드코딩
```

새로운 방식:
```typescript
// After
const scheme = { primary: 'indigo-600' };
const vars = generateSemanticColorVariables(scheme);
// 모든 shade 자동 생성!
```