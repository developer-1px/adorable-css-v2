---
title: Range 문법 총정리
description: AdorableCSS의 다양한 range(..) 문법 완벽 가이드
order: 4
category: Core Concepts
---

# Range 문법 총정리

AdorableCSS의 `..` (range) 문법은 반응형 값을 간결하게 표현하는 강력한 기능입니다. CSS의 `clamp()` 함수를 직관적으로 사용할 수 있게 해줍니다.

## 기본 Range 문법

### 1. 이중 Range (min..max)
최소값과 최대값을 지정하면 중간값은 자동으로 계산됩니다.

```css
/* 토큰 사용 */
font(sm..lg)    → clamp(0.875rem, ~2vw, 1.125rem)
w(xs..xl)       → clamp(var(--spacing-xs), ~5vw, var(--spacing-xl))

/* 직접 값 사용 */
font(1rem..2rem)   → clamp(1rem, ~3vw, 2rem)
p(20px..40px)      → clamp(20px, ~5vw, 40px)
```

### 2. 삼중 Range (min..preferred..max)
최소값, 선호값, 최대값을 모두 지정할 수 있습니다.

```css
font(sm..4vw..lg)       → clamp(0.875rem, 4vw, 1.125rem)
w(100px..50%..500px)    → clamp(100px, 50%, 500px)
h(xs..10vh..xl)         → clamp(var(--spacing-xs), 10vh, var(--spacing-xl))
```

## 새로운 Fluid Range 문법 (v2)

### 1. Scale Up To (..max)
작은 값에서 시작해 최대값까지 확대됩니다.

```css
/* 토큰 사용 */
font(..5xl)    → clamp(2.4rem, 4.8vw, 3rem)     // 80% 최소값
font(..lg)     → clamp(0.9rem, 1.8vw, 1.125rem)
w(..4xl)       → clamp(~, ~, var(--spacing-4xl))

/* 직접 값 사용 */
font(..3)      → clamp(2.4rem, 4.8vw, 3rem)
p(..40)        → clamp(32px, 64vw, 40px)
```

**계산 공식:**
- 최소값 = 최대값 × 0.8
- 중간값(vw) = 최대값 × 1.6

### 2. Scale From (min..)
최소값에서 시작해 더 큰 값으로 확대됩니다.

```css
/* 토큰 사용 */
font(3xl..)    → clamp(1.875rem, 3.38vw, 2.813rem)  // 150% 최대값
font(base..)   → clamp(1rem, 1.8vw, 1.5rem)
w(sm..)        → clamp(var(--spacing-sm), ~, ~)

/* 직접 값 사용 */
font(2..)      → clamp(2rem, 3.6vw, 3rem)
m(20..)        → clamp(20px, 36vw, 30px)
```

**계산 공식:**
- 최대값 = 최소값 × 1.5
- 중간값(vw) = 최대값 × 1.2

## 지원되는 속성들

### Typography
```css
font(..5xl)              // font-size
font(..5xl/tight)        // + line-height
font(..5xl/1.2/-2%)      // + line-height + letter-spacing
```

### Spacing
```css
p(xs..xl)        // padding
m(..2xl)         // margin
gap(sm..)        // gap
space(..lg)      // space-between items
```

### Sizing
```css
w(..full)        // width
h(sm..xl)        // height
size(..64)       // width + height
max-w(..4xl)     // max-width
min-h(xs..)      // min-height
```

### Effects
```css
blur(..20)       // filter: blur()
r(xs..xl)        // border-radius
shadow(sm..2xl)  // box-shadow with tokens
```

## 실전 예제

### 반응형 타이포그래피
```css
/* 모바일에서 작게, 데스크톱에서 크게 */
heading(h1) → font(..5xl/1.1/-3%)

/* 기본 크기에서 시작해서 확대 */
text(lg) → font(lg..)
```

### 반응형 레이아웃
```css
/* 컨테이너 너비 */
container → max-w(xs..7xl) mx(auto) px(sm..xl)

/* 반응형 간격 */
section → py(lg..3xl) px(md..2xl)
```

### 반응형 컴포넌트
```css
/* 버튼 크기 조절 */
btn → px(sm..lg) py(xs..md) font(..lg)

/* 카드 패딩 조절 */
card → p(md..2xl) r(lg..2xl) shadow(sm..xl)
```

## 브레이크포인트와 함께 사용

Range 문법은 브레이크포인트와 함께 사용할 수 있습니다:

```css
/* 모바일에서는 고정, 태블릿부터 fluid */
md:font(..3xl) lg:font(..5xl)

/* 크기별 다른 range */
w(full) md:w(sm..md) lg:w(md..lg) xl:w(lg..xl)
```

## 주의사항

1. **토큰 우선 사용**: 일관성을 위해 토큰을 우선 사용하세요
   ```css
   ✅ font(sm..lg)
   ❌ font(14px..18px)
   ```

2. **적절한 비율**: 너무 극단적인 비율은 피하세요
   ```css
   ✅ font(..2xl)     // 80% ~ 100%
   ❌ font(xs..9xl)   // 너무 큰 차이
   ```

3. **성능 고려**: 복잡한 계산은 CSS 변수로 저장
   ```css
   /* CSS 변수로 저장 */
   --fluid-heading: clamp(1.5rem, 4vw, 3rem);
   
   /* 재사용 */
   font(var(--fluid-heading))
   ```

## 브라우저 지원

`clamp()` 함수를 사용하므로 다음 브라우저에서 지원됩니다:
- Chrome/Edge 79+
- Firefox 75+
- Safari 13.1+

구형 브라우저를 위한 폴백:
```css
/* 폴백 값 제공 */
font(lg)         /* 폴백 */
font(sm..lg)     /* 모던 브라우저 */
```