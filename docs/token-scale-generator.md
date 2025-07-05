# Token Scale Generator

AdorableCSS v2에는 수학적으로 완벽한 디자인 토큰 스케일을 생성하는 강력한 시스템이 포함되어 있습니다.

## 개요

토큰 스케일 생성기는 기본값(base), 비율(ratio), 단계(steps)를 기반으로 일관된 디자인 토큰을 생성합니다. 이를 통해:

- 타이포그래피 스케일
- 스페이싱 시스템
- 컨테이너 크기
- 아이콘/아바타 크기

등을 수학적으로 완벽하게 생성할 수 있습니다.

## 사용 방법

### 기본 사용법

```typescript
import { createTokens, SCALE_RATIOS } from 'adorable-css';

// 기본 설정으로 토큰 생성
const tokens = createTokens();
```

### 커스텀 설정

```typescript
const customTokens = createTokens({
  typography: {
    base: 18,                       // 기본 폰트 크기 (px)
    ratio: SCALE_RATIOS.MAJOR_THIRD, // 1.25 비율
    steps: 15,                      // 생성할 단계 수
  },
  spacing: {
    base: 4,                        // 기본 스페이싱 단위 (px)
    ratio: SCALE_RATIOS.COMFORTABLE, // 1.5 비율
    steps: 13,
  },
  container: {
    base: 320,                      // 최소 컨테이너 너비
    ratio: SCALE_RATIOS.GOLDEN_RATIO, // 1.618 비율
    steps: 13,
  },
  size: {
    base: 16,                       // 최소 아이콘 크기
    ratio: SCALE_RATIOS.MAJOR_THIRD, // 1.25 비율
    steps: 9,
  },
});
```

## 사용 가능한 비율

### 음악적 비율
- `MINOR_SECOND`: 1.067 - 미묘한 진행
- `MAJOR_SECOND`: 1.125 - 부드러운 진행
- `MINOR_THIRD`: 1.2 - 편안한 대비 (기본값)
- `MAJOR_THIRD`: 1.25 - 뚜렷한 대비
- `PERFECT_FOURTH`: 1.333 - 강한 계층
- `PERFECT_FIFTH`: 1.5 - 매우 강한 계층

### 자연 비율
- `GOLDEN_RATIO`: 1.618 - 황금비
- `FIBONACCI`: 1.618 - 피보나치 수열

### 실용적 비율
- `TIGHT`: 1.25 - 촘촘한 간격
- `COMFORTABLE`: 1.5 - 편안한 간격
- `SPACIOUS`: 2 - 넓은 간격
- `DOUBLE`: 2 - 두 배씩 증가
- `TRIPLE`: 3 - 세 배씩 증가
- `QUADRUPLE`: 4 - 네 배씩 증가

## UnoCSS와 통합

```javascript
import { defineConfig } from 'unocss';
import { presetAdorable } from 'adorable-css/unocss';
import { createTokens, SCALE_RATIOS } from 'adorable-css';

const customTokens = createTokens({
  typography: {
    base: 16,
    ratio: SCALE_RATIOS.MINOR_THIRD,
    steps: 15,
  },
  // ... 다른 설정
});

export default defineConfig({
  presets: [
    presetAdorable({
      tokens: customTokens
    })
  ]
});
```

## 개별 스케일 생성

특정 스케일만 생성하고 싶다면:

```typescript
import { 
  generateTypographyScale,
  generateSpacingScale,
  SCALE_RATIOS 
} from 'adorable-css';

// 타이포그래피 스케일만 생성
const fontScale = generateTypographyScale(
  16,                          // base
  SCALE_RATIOS.MINOR_THIRD,    // ratio
  15                           // steps
);

// 스페이싱 스케일만 생성
const spacingScale = generateSpacingScale(
  4,                           // base
  SCALE_RATIOS.COMFORTABLE,    // ratio
  13                           // steps
);
```

## 인터랙티브 생성기

AdorableCSS 홈페이지의 [Token Generator](/tokens/generator) 페이지에서 실시간으로 스케일을 생성하고 미리보기할 수 있습니다.

## 마이그레이션 가이드

기존의 하드코딩된 토큰에서 생성된 토큰으로 마이그레이션하려면:

1. 현재 사용 중인 토큰 값을 확인
2. 생성기 설정을 조정하여 비슷한 값 생성
3. `createTokens()`로 새 토큰 생성
4. 프로젝트에 적용 및 테스트

생성된 값은 기존 AdorableCSS 토큰과 완전히 호환되므로 점진적인 마이그레이션이 가능합니다.