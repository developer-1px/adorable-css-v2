# Design Token 계산식 시스템 연구 보고서

## 1. 현재 상황 분석

### 1.1 AdorableCSS의 현재 토큰 시스템

현재 AdorableCSS는 font-size, spacing, sizing 등의 디자인 토큰을 하드코딩된 값으로 관리하고 있습니다.

#### Font Size 토큰 현황
```typescript
font: {
  '3xs': '0.5rem',   // 8px
  '2xs': '0.625rem', // 10px
  xs: '0.75rem',     // 12px
  sm: '0.875rem',    // 14px
  md: '1rem',        // 16px (base)
  lg: '1.125rem',    // 18px
  xl: '1.25rem',     // 20px
  '2xl': '1.5rem',   // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem',  // 36px
  '5xl': '3rem',     // 48px
  '6xl': '3.75rem',  // 60px
  '7xl': '4.5rem',   // 72px
  '8xl': '6rem',     // 96px
  '9xl': '8rem',     // 128px
}
```

주석에는 "Minor Third (1.2) ratio"를 사용한다고 되어 있지만, 실제 값들을 계산해보면:
- 10px → 12px = 1.2 ✓
- 12px → 14px = 1.167 ✗
- 14px → 16px = 1.143 ✗
- 16px → 18px = 1.125 ✗

일관된 수학적 비율을 따르지 않고 있습니다.

#### Spacing 토큰 현황
```typescript
spacing: {
  xs: '0.25rem',    // 4px (1x base)
  sm: '0.5rem',     // 8px (2x base)
  md: '0.75rem',    // 12px (3x base)
  lg: '1rem',       // 16px (4x base)
  xl: '1.25rem',    // 20px (5x base)
  '2xl': '1.5rem',  // 24px (6x base)
  '3xl': '2rem',    // 32px (8x base)
  '4xl': '2.5rem',  // 40px (10x base)
}
```

4px 그리드 시스템을 기반으로 하지만, 증가 패턴이 일정하지 않습니다:
- xs → sm: 2배
- sm → md: 1.5배
- md → lg: 1.33배

### 1.2 기존 알고리즘 구현 사례

AdorableCSS에는 이미 `elevation` 규칙에서 수학적 계산을 사용하는 선례가 있습니다:

```typescript
function calculateElevation(level: number) {
  // 자연스러운 그림자 성장을 위한 로그 진행
  const logLevel = Math.log(level + 1);
  
  // 주 그림자 계산
  const keyY = Math.round(level * 0.5 + logLevel * 0.5);
  const keyBlur = Math.round(level * 0.3 + logLevel * 2);
  const keyOpacity = Math.min(0.05 + level * 0.005, 0.15);
  
  // 주변 그림자 계산
  const ambientY = level;
  const ambientBlur = level * 2;
  const ambientOpacity = Math.max(0.12 - level * 0.004, 0.04);
  
  return { keyY, keyBlur, keyOpacity, ambientY, ambientBlur, ambientOpacity };
}
```

이는 AdorableCSS가 이미 수학적 계산 기반 시스템을 수용할 준비가 되어 있음을 보여줍니다.

## 2. 수학적 접근 방법 연구

### 2.1 Modular Scale (모듈러 스케일)

타이포그래피와 디자인에서 가장 널리 사용되는 수학적 시스템입니다.

#### 기본 공식
```
fontSize = baseSize × ratio^n
```

여기서:
- `baseSize`: 기준 크기 (보통 16px)
- `ratio`: 스케일 비율
- `n`: 단계 (md를 0으로 하여 음수/양수로 확장)

#### 주요 비율들

| 비율 이름 | 값 | 특징 | 사용 예시 |
|---------|-----|------|---------|
| Minor Second | 1.067 | 매우 미묘한 변화 | 본문 위주 |
| Major Second | 1.125 | 보수적 | 기업 사이트 |
| Minor Third | 1.2 | 균형잡힌 | AdorableCSS 목표 |
| Major Third | 1.25 | 클래식 | 전통적 디자인 |
| Perfect Fourth | 1.333 | 인기 있는 웹 스케일 | Medium, GitHub |
| Perfect Fifth | 1.5 | 극적인 대비 | 헤드라인 중심 |
| Golden Ratio | 1.618 | 자연스러운 느낌 | 예술적 디자인 |

### 2.2 Spacing 시스템

#### Grid 기반 접근
```
spacing = baseUnit × multiplier
```

여기서:
- `baseUnit`: 기본 단위 (4px 또는 8px)
- `multiplier`: 배수

#### 진보적 배수 시스템

IBM Carbon의 공식:
```
Xn = Xn-1 + {INT[(n-2)/4] + 1} * 2
```

이는 작은 크기에서는 촘촘하게, 큰 크기에서는 넓게 증가합니다:
- 0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48...

### 2.3 실제 구현 예시

#### Type Scale 생성기
```typescript
interface ScaleConfig {
  base: number;      // 기본 크기 (px)
  ratio: number;     // 스케일 비율
  steps: string[];   // ['xs', 'sm', 'md', 'lg', 'xl']
}

function generateTypeScale(config: ScaleConfig): Record<string, string> {
  const { base, ratio, steps } = config;
  const scale: Record<string, string> = {};
  const zeroIndex = steps.indexOf('md'); // md를 기준점(0)으로
  
  steps.forEach((step, i) => {
    const n = i - zeroIndex;
    const sizePx = base * Math.pow(ratio, n);
    const sizeRem = Math.round(sizePx * 100) / 100 / 16;
    scale[step] = `${sizeRem}rem`;
  });
  
  return scale;
}

// 사용 예시
const fontScale = generateTypeScale({
  base: 16,
  ratio: 1.2,  // Minor Third
  steps: ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']
});
```

#### Spacing Scale 생성기
```typescript
interface SpacingConfig {
  baseUnit: number;  // 4 또는 8
  pattern: 'linear' | 'fibonacci' | 'progressive' | 'custom';
  customMultipliers?: Record<string, number>;
}

function generateSpacingScale(config: SpacingConfig): Record<string, string> {
  const { baseUnit, pattern } = config;
  const scale: Record<string, string> = {};
  
  const multipliers = getMultipliers(pattern, config.customMultipliers);
  
  Object.entries(multipliers).forEach(([key, multiplier]) => {
    const valuePx = baseUnit * multiplier;
    const valueRem = valuePx / 16;
    scale[key] = `${valueRem}rem`;
  });
  
  return scale;
}

function getMultipliers(pattern: string, custom?: Record<string, number>) {
  switch (pattern) {
    case 'linear':
      return { xs: 1, sm: 2, md: 3, lg: 4, xl: 5, '2xl': 6, '3xl': 8, '4xl': 10 };
    case 'fibonacci':
      return { xs: 1, sm: 2, md: 3, lg: 5, xl: 8, '2xl': 13, '3xl': 21 };
    case 'progressive':
      // 작은 값에서는 촘촘하게, 큰 값에서는 넓게
      return { xs: 1, sm: 2, md: 3, lg: 4, xl: 6, '2xl': 8, '3xl': 12, '4xl': 16 };
    case 'custom':
      return custom || {};
    default:
      return {};
  }
}
```

## 3. 업계 사례 분석

### 3.1 Material Design

- **Type Scale**: 숫자 기반 (100, 200, 300...)
- **Spacing**: 4px 베이스라인 그리드
- **특징**: 디바이스 독립적 픽셀(dp) 사용

### 3.2 IBM Carbon Design System

- **Type Scale**: 고정된 px 값 사용
- **Spacing**: 독특한 수학 공식 사용
- **특징**: 접근성을 고려한 최소 크기 보장

### 3.3 Ant Design

- **Type Scale**: 황금비율 근사값 사용
- **Spacing**: 8px 그리드 시스템
- **특징**: 동아시아 텍스트 고려

## 4. AdorableCSS를 위한 제안

### 4.1 통합 토큰 생성 시스템

```typescript
interface TokenSystemConfig {
  type: {
    base: number;
    ratio: number;
    steps: string[];
  };
  spacing: {
    baseUnit: number;
    pattern: 'linear' | 'fibonacci' | 'progressive';
  };
  sizing: {
    base: number;
    ratio: number;
    steps: string[];
  };
}

class TokenSystem {
  private config: TokenSystemConfig;
  
  constructor(config: TokenSystemConfig) {
    this.config = config;
  }
  
  generateAll() {
    return {
      font: this.generateTypeScale(),
      spacing: this.generateSpacingScale(),
      size: this.generateSizeScale(),
      // 추가 토큰들...
    };
  }
  
  // Figma 플러그인과 연동 가능한 export
  exportToFigmaTokens() {
    const tokens = this.generateAll();
    // Figma Tokens 플러그인 형식으로 변환
    return transformToFigmaFormat(tokens);
  }
}
```

### 4.2 사용자 정의 가능한 시스템

```typescript
// adorable.config.ts
export default {
  tokens: {
    type: {
      base: 16,
      ratio: 1.2,  // Minor Third
      steps: ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']
    },
    spacing: {
      baseUnit: 4,
      pattern: 'progressive'
    }
  }
}
```

### 4.3 장점

1. **일관성**: 수학적 비율로 예측 가능한 시스템
2. **유연성**: 프로젝트별 커스터마이징 가능
3. **유지보수성**: 하나의 설정으로 전체 시스템 조정
4. **Figma 연동**: 동일한 수학적 시스템을 Figma에도 적용 가능
5. **테마 지원**: 다크모드 등 다양한 테마에 대응

### 4.4 구현 로드맵

1. **Phase 1**: 핵심 계산 엔진 구현
   - Type scale 생성기
   - Spacing scale 생성기
   - 기본 설정값 정의

2. **Phase 2**: 통합 및 마이그레이션
   - 기존 하드코딩 값과의 호환성 유지
   - 점진적 마이그레이션 전략

3. **Phase 3**: 확장 기능
   - Figma 플러그인 연동
   - 커스텀 비율 함수 지원
   - 시각적 미리보기 도구

## 5. 결론

현재 AdorableCSS의 하드코딩된 토큰 시스템을 수학적 계산 기반으로 전환하는 것은:

1. **기술적으로 가능**: 이미 elevation에서 선례 존재
2. **실용적 이점**: 일관성, 유지보수성, 확장성 향상
3. **Figma 철학과 일치**: 시스템적 디자인 접근

이러한 시스템은 AdorableCSS를 단순한 유틸리티 프레임워크에서 진정한 "디자인 시스템 프레임워크"로 진화시킬 수 있습니다.