# 🔄 TailwindCSS 사용자를 위한 10초 가이드

> "아, 이거구나!" 순간 이해하는 변환 가이드

## 🎯 핵심 차이점 (10초)

```html
<!-- TailwindCSS -->
<div class="flex items-center justify-center gap-4 p-6">

<!-- AdorableCSS -->
<div class="hbox(pack) gap(md) p(lg)">
```

**핵심**: `hbox(pack)` = `flex items-center justify-center` 🎉

## 📊 즉시 변환표

### 레이아웃

| 하고 싶은 것 | TailwindCSS | AdorableCSS | 
|-------------|-------------|-------------|
| 수평 중앙 정렬 | `flex items-center justify-center` | `hbox(pack)` |
| 수직 중앙 정렬 | `flex flex-col items-center justify-center` | `vbox(pack)` |
| 간격 추가 | `gap-4` | `gap(md)` |
| 전체 너비 | `w-full` | `w(fill)` |
| 컨테이너 | `container mx-auto px-4` | `container(xl)` |

### 색상

| TailwindCSS | AdorableCSS | 더 나은 점 |
|-------------|-------------|-----------|
| `text-blue-500` | `c(blue-500)` | 더 짧음 ✨ |
| `bg-gradient-to-r from-purple-500 to-pink-500` | `bg(to-r/purple-500..pink-500)` | 한 번에! 🎨 |
| `text-blue-500/50` | `c(blue-500.5)` | 직관적인 투명도 |

### 상태 & 반응형

| TailwindCSS | AdorableCSS |
|-------------|-------------|
| `hover:scale-105` | `hover:scale(105)` |
| `md:grid-cols-2` | `md:grid(2)` |
| `focus:ring-2 focus:ring-blue-500` | `focus:ring(2/blue-500)` |

## 🤯 "와, 이건 몰랐네!" 기능들

### 1. Figma처럼 레이아웃 잡기

```html
<!-- Figma의 Frame처럼 -->
<div class="hbox(fill) gap(auto)">
  <div>왼쪽에 붙음</div>
  <div>오른쪽에 붙음</div>
</div>
```

### 2. 의미론적 타이포그래피

```html
<!-- TailwindCSS: 매번 같은 클래스 조합 -->
<h1 class="text-4xl font-bold tracking-tight">

<!-- AdorableCSS: 역할 기반 -->
<h1 class="heading(xl)">
```

### 3. 레이어로 절대 위치 잡기

```html
<!-- TailwindCSS -->
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

<!-- AdorableCSS -->
<div class="layer(center)">
```

## 🚀 30초 마이그레이션 체크리스트

```javascript
// 1. 설치
npm install adorable-css

// 2. import (Tailwind와 공존 가능!)
import 'adorable-css'

// 3. 점진적 전환
// ✅ 새 컴포넌트는 AdorableCSS로
// ✅ 기존 코드는 천천히 마이그레이션
```

## 💡 Tailwind 개발자가 좋아할 기능

### 1. 더 짧은 클래스명
- `p-6` → `p(lg)`
- `rounded-lg` → `r(lg)`
- `shadow-md` → `shadow(md)`

### 2. 일관된 함수형 문법
- 모든 유틸리티가 `name(value)` 형식
- 예측 가능한 패턴

### 3. CSS @layer 자동 관리
- 특이성 지옥에서 해방
- `!important` 거의 불필요

## 🎁 보너스: Tailwind에는 없는 것들

```html
<!-- 글래스모피즘 한 방에 -->
<div class="glass(20)">

<!-- 그라디언트 텍스트 -->
<h1 class="font(4xl) bold bg-clip(text) c(135deg/#667eea..#764ba2)">

<!-- 자동 다크모드 (준비 중) -->
<div class="bg(white) dark:bg(gray-900)">
```

## 🤝 같이 쓰기

```html
<!-- Tailwind와 AdorableCSS 혼용 가능! -->
<div class="flex items-center p(lg) hover:scale(105)">
  점진적 마이그레이션 가능
</div>
```

---

**준비되셨나요?** 

- 🎮 [Playground에서 바로 실험하기](/playground)
- 📖 [전체 변환 가이드](/docs/migration-guide)
- 💬 [커뮤니티에서 질문하기](https://github.com/adorablecss/adorable-css-v2/discussions)