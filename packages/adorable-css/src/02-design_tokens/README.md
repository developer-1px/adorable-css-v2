# AdorableCSS Token Scale System

## 개요

AdorableCSS의 토큰 시스템은 하드코딩된 값 대신 수학적 계산을 통해 일관된 디자인 스케일을 생성합니다.

## 핵심 원칙

### 공통 표기법
- `md`가 기준점 (base value)
- 작은 값: `sm` → `xs` → `2xs` → `3xs` → `4xs`
- 큰 값: `lg` → `xl` → `2xl` → `3xl` → `4xl`

```
4xs  3xs  2xs  xs   sm   md   lg   xl   2xl  3xl  4xl
 ←    ←    ←    ←    ←    0    →    →    →    →    →
                      (base)
```

### 수학적 스케일

#### Typography (Modular Scale)
```typescript
fontSize = base × ratio^n
```
- `base`: 16px (1rem)
- `ratio`: 1.2 (Minor Third)
- `n`: md로부터의 거리

예시:
- `md`: 16px × 1.2^0 = 16px
- `lg`: 16px × 1.2^1 = 19.2px
- `xl`: 16px × 1.2^2 = 23.04px
- `sm`: 16px × 1.2^-1 = 13.33px

#### Spacing (Progressive Scale)
작은 크기에서는 촘촘하게, 큰 크기에서는 넓게 증가:
```
4xs: 1px   (0.25 × 4px)
3xs: 2px   (0.5 × 4px)
2xs: 3px   (0.75 × 4px)
xs:  4px   (1 × 4px)
sm:  5px   (1.25 × 4px)
md:  6px   (1.5 × 4px)
lg:  8px   (2 × 4px)
xl:  10px  (2.5 × 4px)
2xl: 12px  (3 × 4px)
3xl: 16px  (4 × 4px)
4xl: 20px  (5 × 4px)
```

## 사용 방법

### 기본 사용
```typescript
import { generateTokenSystem, SCALE_RATIOS } from '@adorable-css/02-design_tokens';

const tokens = generateTokenSystem({
  typography: {
    base: 16,
    ratio: SCALE_RATIOS.MINOR_THIRD
  },
  spacing: {
    baseUnit: 4,
    scale: 'progressive'
  }
});
```

### 커스텀 설정
```typescript
// adorable.config.ts
export default {
  tokens: generateTokenSystem({
    typography: {
      base: 18,  // 더 큰 기본 크기
      ratio: 1.25, // Major Third
      clamp: {
        min: 12,   // 최소 12px
        max: 96    // 최대 96px
      }
    },
    spacing: {
      baseUnit: 8,  // 8px 그리드
      scale: [0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16, 24] // 커스텀 배수
    }
  })
}
```

### 사전 정의된 프리셋
```typescript
import { SCALE_PRESETS } from '@adorable-css/02-design_tokens';

// Compact UI
const compactTokens = generateTokenSystem({
  typography: SCALE_PRESETS.typography.compact,
  spacing: SCALE_PRESETS.spacing.tight
});

// Marketing Site
const marketingTokens = generateTokenSystem({
  typography: SCALE_PRESETS.typography.marketing,
  spacing: SCALE_PRESETS.spacing.loose
});
```

## Scale Ratios

| Ratio | Value | 특징 | 사용 케이스 |
|-------|-------|------|------------|
| Minor Second | 1.067 | 매우 미묘한 변화 | 밀도 높은 UI |
| Major Second | 1.125 | 부드러운 변화 | 본문 위주 |
| **Minor Third** | **1.2** | **균형잡힌** | **AdorableCSS 기본** |
| Major Third | 1.25 | 명확한 계층 | 기업 사이트 |
| Perfect Fourth | 1.333 | 강한 대비 | 모던 웹 |
| Perfect Fifth | 1.5 | 극적인 변화 | 마케팅 |
| Golden Ratio | 1.618 | 자연스러운 | 아트/갤러리 |

## 장점

1. **일관성**: 수학적 관계로 예측 가능한 스케일
2. **유연성**: 프로젝트별 커스터마이징 가능
3. **유지보수성**: 하나의 설정으로 전체 시스템 조정
4. **Figma 호환**: 동일한 스케일을 디자인 도구에서도 사용 가능

## 마이그레이션

기존 하드코딩된 토큰에서 마이그레이션:

```typescript
// Before
const fontSize = {
  sm: '0.875rem',  // 14px
  md: '1rem',      // 16px
  lg: '1.125rem'   // 18px
};

// After
const { fontSize } = generateTokenSystem({
  typography: {
    base: 16,
    ratio: 1.2
  }
});
// 자동으로 생성됨: sm: 0.833rem, md: 1rem, lg: 1.2rem
```

## Figma 연동

생성된 토큰을 Figma Tokens 플러그인 형식으로 export:

```typescript
const tokens = generateTokenSystem({...});
const figmaTokens = exportToFigmaFormat(tokens);
// Figma Tokens 플러그인에서 import 가능한 JSON 생성
```