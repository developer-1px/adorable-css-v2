# AdorableCSS v2 - CSS 생성 오류 분석 보고서

## 🚨 주요 오작동 패턴들

### 1. **Border 문법 오류** (심각)
```css
/* 잘못된 출력 */
.border-b\(1\/neutral-200\){border-bottom:1px neutral-200 currentColor}
.border-b\(1\/gray-200\){border-bottom:1px gray-200 currentColor}
.border-r\(1\/gray-200\){border-right:1px gray-200 currentColor}
.border-t\(1\/gray-200\){border-top:1px gray-200 currentColor}

/* 올바른 출력이어야 함 */
.border-b\(1\/neutral-200\){border-bottom:1px solid var(--neutral-200)}
```
**문제**: `solid` 키워드 누락, 색상이 CSS 변수가 아닌 일반 텍스트로 출력

### 2. **Font 값 처리 오류** (심각)
```css
/* 잘못된 출력 */
.font\(sm\/semibold\){font-size:var(--font-sm);line-height:semiboldpx}
.font\(sm\/medium\){font-size:var(--font-sm);line-height:mediumpx}
.font\(mono\){font-size:mono}
.font\(black\){font-size:black}
.font\(bold\){font-size:bold}
.font\(medium\){font-size:medium}

/* 올바른 출력이어야 함 */
.font\(sm\/semibold\){font-size:var(--font-sm);font-weight:600}
.font\(mono\){font-family:monospace}
.font\(black\){font-weight:900}
```
**문제**: font-weight, font-family가 font-size로 잘못 매핑됨

### 3. **Padding/Margin 토큰 오류** (중간)
```css
/* 잘못된 출력 */
.py\(xxs\){padding-block:xxs}

/* 올바른 출력이어야 함 */
.py\(xxs\){padding-block:var(--spacing-xxs)} /* 또는 4px */
```
**문제**: 존재하지 않는 토큰이 그대로 출력됨

### 4. **Transform 문법 오류** (중간)
```css
/* 잘못된 출력 */
.translate-y\(-1\/2\){transform:translateY(-1)}
.top\(1\/2\){top:1px}

/* 올바른 출력이어야 함 */
.translate-y\(-1\/2\){transform:translateY(-50%)}
.top\(1\/2\){top:50%}
```
**문제**: 분수(`1/2`) 처리가 잘못됨

### 5. **Overflow 값 오류** (중간)
```css
/* 잘못된 출력 */
.overflow\(hidden\){overflow:visible}

/* 올바른 출력이어야 함 */
.overflow\(hidden\){overflow:hidden}
```
**문제**: 완전히 반대 값 출력

### 6. **Inset 처리 오류** (중간)
```css
/* 잘못된 출력 */
.inset\(3\){inset:0}

/* 올바른 출력이어야 함 */
.inset\(3\){inset:3px}
```
**문제**: 값이 무시되고 0으로 설정됨

### 7. **Color Mix 문법 오류** (경미)
```css
/* 잘못된 출력 */
.border-l\(4\/accent\.30\){border-left:4px accent.30 currentColor}
.border-b\(2\/mute\.10\){border-bottom:2px mute.10 currentColor}

/* 올바른 출력이어야 함 */
.border-l\(4\/accent\.30\){border-left:4px solid color-mix(in srgb,var(--accent-500) 30%,transparent)}
```
**문제**: color-mix 구문이 올바르게 처리되지 않음

### 8. **Blur 단위 오류** (경미)
```css
/* 잘못된 출력 */
.blur\(3xl\){filter:blur(3xl)}

/* 올바른 출력이어야 함 */
.blur\(3xl\){filter:blur(var(--spacing-3xl))} /* 또는 blur(28px) */
```
**문제**: 토큰이 해석되지 않음

## 📊 문제 우선순위

### 🔴 High Priority (즉시 수정 필요)
1. **Border 문법** - CSS 문법 위반으로 스타일이 적용되지 않음
2. **Font 속성 매핑** - 완전히 잘못된 CSS 속성으로 매핑

### 🟡 Medium Priority (중요)
3. **Transform 분수 처리** - 레이아웃에 직접적 영향
4. **Overflow 값 반전** - 의도와 정반대 동작
5. **Inset 값 무시** - 포지셔닝 오류

### 🟢 Low Priority (개선 필요)
6. **존재하지 않는 토큰 처리** - fallback 필요
7. **Color-mix 구문** - 고급 기능
8. **Blur 토큰 해석** - 특수 케이스

## 🔧 수정 방향

### 1. Border Rule 수정 필요
```typescript
// 현재 (잘못됨)
border: `${width} ${color} currentColor`

// 수정해야 함
border: `${width} solid ${resolveColor(color)}`
```

### 2. Font 속성 분리 필요
```typescript
// font(sm/semibold) 케이스
if (value.includes('/')) {
  const [size, weight] = value.split('/');
  return {
    'font-size': resolveSize(size),
    'font-weight': resolveWeight(weight)
  };
}
```

### 3. Transform 분수 처리 개선
```typescript
// 1/2 같은 분수를 50%로 변환
const fractionToPercent = (value) => {
  if (value.includes('/')) {
    const [num, den] = value.split('/');
    return `${(parseFloat(num) / parseFloat(den)) * 100}%`;
  }
  return value;
};
```

## 💡 권장 사항

1. **Unit Test 추가**: 각 rule별로 예상 출력과 실제 출력 비교
2. **Token Validation**: 존재하지 않는 토큰에 대한 fallback 로직 
3. **CSS Validation**: 생성된 CSS가 유효한지 검증하는 단계 추가
4. **Rule 분리**: 복잡한 규칙을 더 작은 단위로 분해

## 🎯 다음 액션 아이템

1. `makeBorder.ts` - border 문법 수정
2. `font` rule - 속성 매핑 수정  
3. `transform` rule - 분수 처리 개선
4. `overflow` rule - 값 매핑 수정
5. Token resolver에 validation 로직 추가