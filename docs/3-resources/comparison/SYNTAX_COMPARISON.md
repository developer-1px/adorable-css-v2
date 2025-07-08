# Tailwind CSS vs AdorableCSS 문법 비교 가이드

> 실제 사용자를 위한 상세 문법 비교

## 🎯 기본 레이아웃

### Flexbox 레이아웃

| 설명 | Tailwind CSS | AdorableCSS |
|------|--------------|-------------|
| **수평 정렬** | `flex items-center` | `hbox()` |
| **수직 정렬** | `flex flex-col items-center` | `vbox()` |
| **중앙 정렬** | `flex items-center justify-center` | `hbox(pack)` |
| **양끝 정렬** | `flex items-center justify-between` | `hbox(between)` |
| **간격 추가** | `flex gap-4` | `hbox gap(md)` |
| **세로 중앙** | `flex flex-col justify-center` | `vbox(middle)` |

#### 실제 예제
```html
<!-- Tailwind CSS -->
<div class="flex items-center justify-between gap-4 p-6">
  <span>로고</span>
  <nav class="flex gap-6">메뉴</nav>
</div>

<!-- AdorableCSS -->
<div class="hbox(between) gap(md) p(xl)">
  <span>로고</span>
  <nav class="hbox gap(lg)">메뉴</nav>
</div>
```

### Grid 레이아웃

| 설명 | Tailwind CSS | AdorableCSS |
|------|--------------|-------------|
| **3열 그리드** | `grid grid-cols-3` | `grid(3)` |
| **반응형 그리드** | `grid grid-cols-1 md:grid-cols-3` | `grid(1) md:grid(3)` |
| **간격 있는 그리드** | `grid grid-cols-3 gap-4` | `grid(3) gap(md)` |
| **자동 채우기** | `grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))]` | `grid(fill/200)` |

## 📏 크기 조절

### 너비(Width)

| 설명 | Tailwind CSS | AdorableCSS | 비고 |
|------|--------------|-------------|------|
| **전체 너비** | `w-full` | `w(fill)` | Figma Fill |
| **콘텐츠에 맞춤** | `w-fit` | `w(hug)` | Figma Hug |
| **고정 너비** | `w-64` (16rem) | `w(256)` | 픽셀 직접 지정 |
| **최대 너비** | `max-w-lg` | `w(..lg)` | 제약 조건 |
| **최소 너비** | `min-w-[200px]` | `w(200..)` | 제약 조건 |
| **범위 지정** | `min-w-[200px] max-w-[400px]` | `w(200..400)` | 단일 표현 |

### 높이(Height)

| 설명 | Tailwind CSS | AdorableCSS |
|------|--------------|-------------|
| **전체 높이** | `h-full` | `h(fill)` |
| **화면 높이** | `h-screen` | `h(screen)` |
| **콘텐츠 높이** | `h-fit` | `h(hug)` |
| **고정 높이** | `h-16` (4rem) | `h(64)` |

### 정사각형 크기

| 설명 | Tailwind CSS | AdorableCSS |
|------|--------------|-------------|
| **정사각형** | `w-12 h-12` | `size(48)` |
| **원형 아바타** | `w-12 h-12 rounded-full` | `size(48) r(full)` |
| **종횡비** | `aspect-video` | `size(16:9)` |

## 🎨 색상 시스템

### 텍스트 색상

| 설명 | Tailwind CSS | AdorableCSS |
|------|--------------|-------------|
| **기본 색상** | `text-blue-500` | `c(blue-500)` |
| **투명도 포함** | `text-black/50` | `c(black.5)` |
| **흰색 텍스트** | `text-white` | `c(white)` |
| **CSS 변수** | `text-[var(--primary)]` | `c(--primary)` |

### 배경 색상

| 설명 | Tailwind CSS | AdorableCSS |
|------|--------------|-------------|
| **단색 배경** | `bg-gray-100` | `bg(gray-100)` |
| **투명 배경** | `bg-white/80` | `bg(white.8)` |
| **그라디언트** | `bg-gradient-to-r from-blue-500 to-purple-600` | `bg(to-r/blue-500..purple-600)` |
| **대각선 그라디언트** | `bg-gradient-to-br from-red-500 to-yellow-500` | `bg(to-br/red-500..yellow-500)` |

### 테두리 색상

| 설명 | Tailwind CSS | AdorableCSS |
|------|--------------|-------------|
| **테두리 색** | `border-gray-300` | `bc(gray-300)` |
| **테두리 스타일** | `border-2 border-solid` | `bw(2) bs(solid)` |
| **한쪽만** | `border-b-2 border-gray-200` | `bb(2) bc(gray-200)` |

## 📝 타이포그래피

### 텍스트 크기와 스타일

| 설명 | Tailwind CSS | AdorableCSS v2 |
|------|--------------|----------------|
| **크기만** | `text-lg` | `text(lg)` |
| **크기 + 행간** | `text-lg leading-relaxed` | `text(lg/1.5)` |
| **크기 + 행간 + 자간** | `text-lg leading-relaxed tracking-tight` | `text(lg/1.5/-2%)` |
| **반응형 크기** | `text-sm md:text-lg lg:text-2xl` | `text(sm..2xl)` |
| **정렬** | `text-center` | `text(center)` |
| **변형** | `uppercase` | `text(uppercase)` |
| **정렬 + 변형** | `text-center uppercase` | `text(center+uppercase)` |

### 폰트 굵기

| 설명 | Tailwind CSS | AdorableCSS |
|------|--------------|-------------|
| **일반** | `font-normal` | `font(normal)` |
| **중간** | `font-medium` | `font(medium)` |
| **굵게** | `font-bold` | `font(bold)` |
| **숫자로** | `font-[600]` | `font(600)` |

### 의미론적 타이포그래피

| 설명 | Tailwind CSS | AdorableCSS |
|------|--------------|-------------|
| **제목** | 클래스 조합 필요 | `heading(h1)` |
| **본문** | 클래스 조합 필요 | `body(md)` |
| **레이블** | 클래스 조합 필요 | `label(sm)` |
| **캡션** | 클래스 조합 필요 | `caption(xs)` |

## 🔲 간격 (Spacing)

### Padding

| 설명 | Tailwind CSS | AdorableCSS |
|------|--------------|-------------|
| **전체** | `p-4` | `p(md)` |
| **가로** | `px-6` | `px(lg)` |
| **세로** | `py-2` | `py(sm)` |
| **개별** | `pt-4 pr-6 pb-4 pl-6` | `pt(md) pr(lg) pb(md) pl(lg)` |

### Margin

| 설명 | Tailwind CSS | AdorableCSS |
|------|--------------|-------------|
| **전체** | `m-4` | `m(md)` |
| **자동 중앙** | `mx-auto` | `mx(auto)` |
| **음수 마진** | `-mt-2` | `mt(-8)` |

### Gap (Flexbox/Grid)

| 설명 | Tailwind CSS | AdorableCSS |
|------|--------------|-------------|
| **균등 간격** | `gap-4` | `gap(md)` |
| **다른 간격** | `gap-x-4 gap-y-6` | `gap(md/lg)` |

## 🎭 상태 관리

### Hover 상태

| 설명 | Tailwind CSS | AdorableCSS |
|------|--------------|-------------|
| **배경 변경** | `hover:bg-blue-600` | `hover:bg(blue-600)` |
| **크기 변경** | `hover:scale-105` | `hover:scale(105)` |
| **그림자** | `hover:shadow-lg` | `hover:shadow(lg)` |

### Focus 상태

| 설명 | Tailwind CSS | AdorableCSS |
|------|--------------|-------------|
| **링 효과** | `focus:ring-2 focus:ring-blue-500` | `focus:ring(2/blue-500)` |
| **아웃라인** | `focus:outline-none` | `focus:outline(none)` |

### 기타 상태

| 설명 | Tailwind CSS | AdorableCSS |
|------|--------------|-------------|
| **활성 상태** | `active:scale-95` | `active:scale(95)` |
| **비활성화** | `disabled:opacity-50` | `disabled:opacity(50)` |
| **체크됨** | `checked:bg-blue-500` | `checked:bg(blue-500)` |

## 📱 반응형 디자인

### 브레이크포인트

| 크기 | Tailwind CSS | AdorableCSS | 픽셀 |
|------|--------------|-------------|------|
| Small | `sm:` | `sm:` | 640px |
| Medium | `md:` | `md:` | 768px |
| Large | `lg:` | `lg:` | 1024px |
| XLarge | `xl:` | `xl:` | 1280px |
| 2XLarge | `2xl:` | `2xl:` | 1536px |

### 반응형 예제

```html
<!-- Tailwind CSS -->
<div class="w-full md:w-1/2 lg:w-1/3 p-4 md:p-6 lg:p-8">
  <h2 class="text-lg md:text-xl lg:text-2xl">제목</h2>
</div>

<!-- AdorableCSS -->
<div class="w(fill) md:w(50%) lg:w(33%) p(md) md:p(lg) lg:p(xl)">
  <h2 class="text(lg) md:text(xl) lg:text(2xl)">제목</h2>
</div>
```

## 🎬 애니메이션과 전환

### Transition

| 설명 | Tailwind CSS | AdorableCSS |
|------|--------------|-------------|
| **기본 전환** | `transition` | `transition` |
| **시간 지정** | `transition duration-300` | `transition(300)` |
| **이징** | `ease-in-out` | `ease-in-out` |

### Transform

| 설명 | Tailwind CSS | AdorableCSS |
|------|--------------|-------------|
| **크기 조절** | `scale-110` | `scale(110)` |
| **회전** | `rotate-45` | `rotate(45)` |
| **이동** | `translate-x-4` | `translate-x(16)` |

## 🎨 효과

### 그림자

| 설명 | Tailwind CSS | AdorableCSS |
|------|--------------|-------------|
| **작은 그림자** | `shadow-sm` | `shadow(sm)` |
| **중간 그림자** | `shadow-md` | `shadow(md)` |
| **큰 그림자** | `shadow-lg` | `shadow(lg)` |
| **없음** | `shadow-none` | `shadow(none)` |

### 모서리 둥글기

| 설명 | Tailwind CSS | AdorableCSS |
|------|--------------|-------------|
| **작게** | `rounded` | `r(4)` |
| **중간** | `rounded-md` | `r(md)` |
| **크게** | `rounded-lg` | `r(lg)` |
| **원형** | `rounded-full` | `r(full)` |
| **한쪽만** | `rounded-t-lg` | `rt(lg)` |

## 💡 실전 컴포넌트 예제

### 버튼 컴포넌트

```html
<!-- Tailwind CSS -->
<button class="px-4 py-2 bg-blue-500 text-white rounded-md 
               hover:bg-blue-600 active:scale-95 transition 
               focus:outline-none focus:ring-2 focus:ring-blue-500">
  클릭하세요
</button>

<!-- AdorableCSS -->
<button class="px(md) py(sm) bg(blue-500) c(white) r(md) 
               hover:bg(blue-600) active:scale(95) transition 
               focus:outline(none) focus:ring(2/blue-500)">
  클릭하세요
</button>
```

### 카드 컴포넌트

```html
<!-- Tailwind CSS -->
<div class="max-w-sm rounded-lg shadow-lg overflow-hidden">
  <img class="w-full h-48 object-cover" src="..." />
  <div class="p-6">
    <h3 class="text-xl font-bold mb-2">카드 제목</h3>
    <p class="text-gray-600">카드 내용...</p>
  </div>
</div>

<!-- AdorableCSS -->
<div class="w(..sm) r(lg) shadow(lg) clip">
  <img class="w(fill) h(192) object(cover)" src="..." />
  <div class="p(xl)">
    <h3 class="text(xl) font(bold) mb(sm)">카드 제목</h3>
    <p class="c(gray-600)">카드 내용...</p>
  </div>
</div>
```

## 🔍 핵심 차이점 요약

### AdorableCSS 장점
1. **함수형 문법**: `bg(blue-500)` vs `bg-blue-500`
2. **복합 속성**: `text(lg/1.5/-2%)` vs 여러 클래스
3. **Figma 용어**: `w(fill)`, `w(hug)` vs `w-full`, `w-fit`
4. **간결한 표현**: `size(48)` vs `w-12 h-12`
5. **통합 문법**: `ring(2/blue-500)` vs `ring-2 ring-blue-500`

### Tailwind CSS 장점
1. **방대한 생태계**: 플러그인, 도구, 템플릿
2. **표준화된 문법**: 널리 알려진 관례
3. **상세한 문서**: 모든 케이스 문서화
4. **커뮤니티 지원**: 풍부한 예제와 해결책

---

*이 가이드는 실제 사용자가 두 프레임워크 간 전환 시 참고할 수 있도록 작성되었습니다.*