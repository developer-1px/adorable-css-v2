## Task 6: `packages/adorable-css/src/tokens/tokenRegistry.ts` - `getTokenValue` 로직 간소화

**목표**: `getTokenValue` 함수 내의 토큰 값 계산 로직 중복을 제거하고, 공통 로직을 재사용하여 코드 라인 수를 줄이고 유지보수성을 높입니다.

**문제점**:
`getTokenValue` 함수는 `_generateFontVars`, `_generateSpacingVars`, `_generateSizeVars`, `_generateContainerVars` 함수들과 유사한 토큰 값 계산 로직을 중복해서 가지고 있습니다. 이는 코드 중복을 야기하고, 토큰 계산 로직 변경 시 여러 곳을 수정해야 하는 비효율성을 초래합니다.

**관련 파일**:
*   `packages/adorable-css/src/tokens/tokenRegistry.ts`

**수정 제안**:
토큰 카테고리별로 값을 계산하는 공통 헬퍼 함수를 만들고, `getTokenValue` 및 `_generate*Vars` 함수들이 이 헬퍼 함수를 재사용하도록 변경합니다. 이렇게 하면 코드 중복을 제거하고 라인 수를 줄일 수 있습니다.

**수정 전 코드 (예상)**:
```typescript
// packages/adorable-css/src/tokens/tokenRegistry.ts
// ...
function _generateFontVars(config: ScaleConfig, unit: 'rem' | 'px'): string[] { /* ... */ }
function _generateSpacingVars(config: ScaleConfig, unit: 'rem' | 'px'): string[] { /* ... */ }
function _generateSizeVars(config: ScaleConfig, unit: 'rem' | 'px'): string[] { /* ... */ }
function _generateContainerVars(_config: ScaleConfig, unit: 'rem' | 'px'): string[] { /* ... */ }

export function getTokenValue(category: 'font' | 'spacing' | 'size' | 'container', token: string, config: ScaleConfig = DEFAULT_SCALE_CONFIG): string {
  const unit = config.unit || 'px';
  let base: number;
  let tokenConfig: any;
  let step: number;
  let multiplier: number;
  let value: number;

  switch (category) {
    case 'font':
      base = unit === 'px' ? 16 : 1;
      tokenConfig = config.font || DEFAULT_SCALE_CONFIG.font;
      step = getTokenStep(token, 'font');
      multiplier = calculateMultiplier(step, tokenConfig, 'font');
      value = unit === 'px' ? Math.round(base * multiplier) : parseFloat((base * multiplier).toFixed(3));
      return `${value}${unit}`;
    case 'spacing':
      base = unit === 'px' ? 4 : 0.25;
      tokenConfig = config.spacing || DEFAULT_SCALE_CONFIG.spacing;
      step = getTokenStep(token, 'spacing');
      multiplier = calculateMultiplier(step, tokenConfig, 'spacing');
      value = unit === 'px' ? Math.round(base * multiplier) : parseFloat((base * multiplier).toFixed(3));
      return `${value}${unit}`;
    // ... 나머지 case들 ...
    default:
      return '';
  }
}
// ...
```

**수정 후 코드 (예상)**:
```typescript
// packages/adorable-css/src/tokens/tokenRegistry.ts
// ...

// 새로운 공통 헬퍼 함수
function _calculateTokenValue(category: 'font' | 'spacing' | 'size' | 'container', token: string, config: ScaleConfig, unit: 'rem' | 'px'): number | string {
  let base: number;
  let tokenConfig: any;
  let step: number;
  let multiplier: number;
  let pixels: number;

  switch (category) {
    case 'font':
      base = unit === 'px' ? 16 : 1;
      tokenConfig = config.font || DEFAULT_SCALE_CONFIG.font;
      step = getTokenStep(token, 'font');
      multiplier = calculateMultiplier(step, tokenConfig, 'font');
      return unit === 'px' ? Math.round(base * multiplier) : parseFloat((base * multiplier).toFixed(3));
    case 'spacing':
      base = unit === 'px' ? 4 : 0.25;
      tokenConfig = config.spacing || DEFAULT_SCALE_CONFIG.spacing;
      step = getTokenStep(token, 'spacing');
      multiplier = calculateMultiplier(step, tokenConfig, 'spacing');
      return unit === 'px' ? Math.round(base * multiplier) : parseFloat((base * multiplier).toFixed(3));
    case 'size':
      base = unit === 'px' ? 16 : 1;
      tokenConfig = config.size || DEFAULT_SCALE_CONFIG.size;
      step = getTokenStep(token, 'size');
      multiplier = calculateMultiplier(step, tokenConfig, 'size');
      return unit === 'px' ? Math.round(base * multiplier) : parseFloat((base * multiplier).toFixed(3));
    case 'container':
      const containerBreakpoints: Record<string, number> = { /* ... */ }; // 기존 정의 재사용
      pixels = containerBreakpoints[token];
      if (!pixels) { /* ... */ }
      return unit === 'px' ? pixels : (pixels / 16);
    default:
      return 0; // 또는 적절한 기본값
  }
}

function _generateFontVars(config: ScaleConfig, unit: 'rem' | 'px'): string[] {
  const vars: string[] = [];
  if (usedTokens.font.size > 0) {
    vars.push('\n  /* Font Tokens */');
    usedTokens.font.forEach(token => {
      const value = _calculateTokenValue('font', token, config, unit);
      vars.push(`  --font-${token}: ${formatMultiplier(value)}${unit};`);
    });
  }
  return vars;
}
// _generateSpacingVars, _generateSizeVars, _generateContainerVars도 유사하게 변경

export function getTokenValue(category: 'font' | 'spacing' | 'size' | 'container', token: string, config: ScaleConfig = DEFAULT_SCALE_CONFIG): string {
  const unit = config.unit || 'px';
  const value = _calculateTokenValue(category, token, config, unit);
  return `${formatMultiplier(value)}${unit}`;
}
// ...
```

**액션**:
1.  `packages/adorable-css/src/tokens/tokenRegistry.ts` 파일에 `_calculateTokenValue`와 같은 공통 헬퍼 함수를 정의합니다.
2.  `_generateFontVars`, `_generateSpacingVars`, `_generateSizeVars`, `_generateContainerVars` 함수들이 이 헬퍼 함수를 사용하여 토큰 값을 계산하도록 수정합니다.
3.  `getTokenValue` 함수도 이 헬퍼 함수를 호출하여 값을 반환하도록 수정합니다.

**검증**:
*   `pnpm test --filter adorable-css`를 실행하여 모든 테스트가 통과하는지 확인합니다.
*   특히 토큰 값을 사용하는 테스트 케이스가 올바른 값을 반환하는지 확인합니다.
*   타입스크립트 컴파일 오류가 없는지 확인합니다.

```