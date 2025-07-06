# 🚫 Tailwind 습관으로 인한 흔한 실수들

> Tailwind CSS에서 AdorableCSS로 넘어올 때 자주 발생하는 실수들과 올바른 사용법

## 📋 개요

AdorableCSS는 Tailwind와 유사하지만 다른 철학을 가지고 있습니다. Tailwind 사용자들이 가장 자주 하는 실수들을 정리했습니다.

---

## 1. 🚫 투명도 표기법 실수

### ❌ 잘못된 방법 (Tailwind 스타일)
```html
<!-- Tailwind 방식: 슬래시(/) 사용 -->
<div class="bg-white/50 text-gray-900/80">
<div class="opacity-50">
```

### ✅ 올바른 방법 (AdorableCSS)
```html
<!-- AdorableCSS 방식: 점(.) 표기법 -->
<div class="bg(white.5) c(gray-900.8)">
<div class="opacity(.5)">
```

**핵심**: AdorableCSS는 **점(.) 표기법**을 사용합니다. `/50` ❌ → `.5` ✅

---

## 2. 🚫 CSS 함수 값 표기 실수

### ❌ 잘못된 방법 (백분율 변환)
```html
<!-- Tailwind 사고방식: 숫자를 백분율로 변환 -->
<div class="scale-95 rotate-45">
<!-- 95 → 0.95, 45 → 45deg로 임의 변환 -->
```

### ✅ 올바른 방법 (CSS 네이티브 값)
```html
<!-- AdorableCSS: CSS 사양 그대로 -->
<div class="scale(.95) rotate(45deg)">
<!-- 실제 CSS 값과 동일 -->
```

**핵심**: AdorableCSS는 **CSS 네이티브 값**을 그대로 사용합니다.

---

## 3. 🚫 Margin 사용 실수

### ❌ 절대 금지! (Tailwind 습관)
```html
<!-- Tailwind에서 흔히 사용하는 방식 -->
<div class="mt-4 mb-6 ml-2 mr-3">
<div class="mx-auto my-8">
<div class="m-4">
```

### ✅ 올바른 방법 (Gap 기반 레이아웃)
```html
<!-- AdorableCSS: gap과 padding만 사용 -->
<div class="vbox gap(lg) p(xl)">
  <div class="hbox gap(md) px(lg)">
    <div>Content 1</div>
    <div>Content 2</div>
  </div>
</div>
```

**핵심**: AdorableCSS에서는 **margin을 절대 사용하지 않습니다**. `gap()`과 `p()`를 사용하세요.

---

## 4. 🚫 Flexbox 클래스 실수

### ❌ 잘못된 방법 (Tailwind 스타일)
```html
<!-- Tailwind의 복잡한 조합 -->
<div class="flex flex-col items-center justify-between gap-4">
<div class="flex items-center justify-center">
<div class="flex flex-row justify-start items-stretch">
```

### ✅ 올바른 방법 (AdorableCSS)
```html
<!-- AdorableCSS: 직관적인 Figma 매핑 -->
<div class="vbox(center/between) gap(lg)">
<div class="hbox(center/middle)">
<div class="hbox(start/stretch)">
```

**핵심**: `hbox()`, `vbox()` + **Figma Auto Layout 용어**를 사용합니다.

---

## 5. 🚫 색상 시스템 실수

### ❌ 잘못된 방법 (Tailwind 숫자 체계)
```html
<!-- Tailwind의 100-900 숫자 체계 -->
<div class="text-gray-500 bg-blue-600 border-red-400">
```

### ✅ 올바른 방법 (AdorableCSS 의미론적 체계)
```html
<!-- AdorableCSS: 의미론적 + 점 표기법 -->
<div class="c(gray-medium) bg(blue-primary) b(1/red-light)">
```

**핵심**: 숫자보다는 **의미론적 색상명**을 우선 사용합니다.

---

## 6. 🚫 반응형 문법 실수

### ❌ 잘못된 방법 (Tailwind 콜론 문법)
```html
<!-- Tailwind 방식: 콜론(:) 사용 -->
<div class="text-sm md:text-lg lg:text-xl">
<div class="hidden md:block lg:flex">
```

### ✅ 올바른 방법 (AdorableCSS)
```html
<!-- AdorableCSS: 동일한 콜론 문법 지원 -->
<div class="font(sm) md:font(lg) lg:font(xl)">
<div class="hidden md:block lg:flex">
```

**핵심**: 반응형 문법은 동일하지만, **함수형 표기법**을 함께 사용합니다.

---

## 7. 🚫 크기 단위 실수

### ❌ 잘못된 방법 (Tailwind 숫자 체계)
```html
<!-- Tailwind: 4 = 1rem, 8 = 2rem 등 -->
<div class="w-64 h-32 p-4">
<!-- 잠깐, 64가 몇 rem이었지? 🤔 -->
```

### ✅ 올바른 방법 (AdorableCSS)
```html
<!-- AdorableCSS: 직관적인 크기명 -->
<div class="w(2xl) h(xl) p(lg)">
<!-- xs, sm, md, lg, xl, 2xl... 직관적! -->
```

**핵심**: **의미론적 크기명**을 사용하여 더 직관적입니다.

---

## 8. 🚫 그라디언트 문법 실수

### ❌ 잘못된 방법 (Tailwind 복잡한 문법)
```html
<!-- Tailwind: bg-gradient-to-r from-blue-500 to-purple-600 -->
<div class="bg-gradient-to-r from-blue-500 to-purple-600">
```

### ✅ 올바른 방법 (AdorableCSS)
```html
<!-- AdorableCSS: 간결한 CSS 네이티브 -->
<div class="bg(to-r/blue-500..purple-600)">
```

**핵심**: **CSS 네이티브 그라디언트 문법**을 간소화했습니다.

---

## 9. 🚫 애니메이션 실수

### ❌ 잘못된 방법 (Tailwind 제한적 애니메이션)
```html
<!-- Tailwind: 제한된 애니메이션 -->
<div class="animate-pulse animate-bounce">
```

### ✅ 올바른 방법 (AdorableCSS)
```html
<!-- AdorableCSS: 풍부한 애니메이션 + 커스텀 가능 -->
<div class="fade-up(.8s/ease-out/delay:300ms)">
<div class="float(25s/ease-in-out/repeat:infinite)">
```

**핵심**: **파라미터 조정 가능**한 애니메이션 시스템입니다.

---

## 10. 🚫 컴포넌트 클래스명 실수

### ❌ 잘못된 방법 (Tailwind 유틸리티만)
```html
<!-- Tailwind: 모든 걸 유틸리티로 -->
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
```

### ✅ 올바른 방법 (AdorableCSS)
```html
<!-- AdorableCSS: 의미론적 컴포넌트 + 유틸리티 -->
<button class="button(primary/lg)">
<!-- 또는 유틸리티 조합 -->
<button class="bg(blue-500) hover:bg(blue-700) c(white) bold py(sm) px(lg) r(md)">
```

**핵심**: **의미론적 컴포넌트**를 우선 사용하고, 필요시 유틸리티로 커스터마이징합니다.

---

## 📚 빠른 변환 참고표

| Tailwind | AdorableCSS | 설명 |
|----------|-------------|------|
| `bg-white/50` | `bg(white.5)` | 투명도는 점 표기법 |
| `scale-95` | `scale(.95)` | CSS 네이티브 값 |
| `mt-4` | ❌ **사용금지** | margin 대신 gap 사용 |
| `flex flex-col items-center` | `vbox(center)` | Figma Auto Layout 매핑 |
| `text-gray-500` | `c(gray-medium)` | 의미론적 색상명 |
| `w-64` | `w(2xl)` | 직관적 크기명 |
| `bg-gradient-to-r from-blue-500 to-purple-600` | `bg(to-r/blue-500..purple-600)` | 간결한 그라디언트 |

---

## 🎯 핵심 원칙 요약

1. **점(.) 표기법**: `/50` ❌ → `.5` ✅
2. **CSS 네이티브**: `scale(95)` ❌ → `scale(.95)` ✅  
3. **No Margin**: `margin` ❌ → `gap()` + `p()` ✅
4. **Figma 매핑**: `flex items-center` ❌ → `hbox(center)` ✅
5. **의미론적**: `text-gray-500` ❌ → `c(gray-medium)` ✅

---

## 💡 마이그레이션 팁

### 1. 단계적 접근
```html
<!-- 1단계: 기본 변환 -->
<div class="flex items-center gap-4"> 
→ <div class="hbox(center) gap(lg)">

<!-- 2단계: 투명도 수정 -->
<div class="bg-white/50">
→ <div class="bg(white.5)">

<!-- 3단계: margin 제거 -->
<div class="mt-4 mb-6">
→ <div class="vbox gap(lg)"> <!-- 상위 컨테이너에서 -->
```

### 2. 자주 사용하는 변환 패턴
```html
<!-- Tailwind 카드 컴포넌트 -->
<div class="bg-white rounded-lg shadow-md p-6 mt-4">
  <h2 class="text-xl font-bold mb-4">Title</h2>
  <p class="text-gray-600">Content</p>
</div>

<!-- AdorableCSS 변환 -->
<div class="bg(white) r(lg) shadow(md) p(xl)"> <!-- mt-4는 상위에서 gap으로 -->
  <div class="vbox gap(lg)"> <!-- mb-4 대신 gap 사용 -->
    <h2 class="title(lg)">Title</h2> <!-- 의미론적 컴포넌트 -->
    <p class="body c(gray-medium)">Content</p>
  </div>
</div>
```

---

## 🔗 관련 문서

- [AdorableCSS 핵심 원칙](/docs/core-principles)
- [Tailwind 마이그레이션 가이드](/docs/migration-tailwind)
- [Figma-First CSS 개념](/docs/figma-first-css-utility)
- [Claude 온보딩 가이드](/docs/claude-onboarding)

---

**💡 기억하세요**: AdorableCSS는 Tailwind의 대체제가 아니라 **더 나은 접근 방식**입니다. CSS 네이티브 값과 Figma 디자인 워크플로우를 존중하는 프레임워크입니다!