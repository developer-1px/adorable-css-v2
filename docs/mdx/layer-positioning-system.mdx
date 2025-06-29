---
title: Layer 포지셔닝 시스템 - Figma 스타일 절대 위치 지정
description: AdorableCSS v2의 혁신적인 layer() 포지셔닝 시스템과 Figma 스타일 절대 위치 지정
order: 14
category: Layout
---

# Layer 포지셔닝 시스템: Figma 스타일 절대 위치 지정

AdorableCSS v2의 **Layer 포지셔닝 시스템**은 CSS 포지셔닝의 복잡성을 완전히 해결한 혁신적인 기능입니다. Figma의 직관적인 레이어 개념을 CSS로 완벽하게 구현하여, 복잡한 position 속성들을 단 하나의 유틸리티로 처리할 수 있습니다.

## 기존 CSS 포지셔닝의 복잡성

### 전통적인 CSS 절대 위치 지정

```css
/* 기존 CSS - 중앙 정렬하나 만들기도 복잡 */
.centered-modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 전체 화면 오버레이 */
.overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

/* 모서리 배치 */
.top-right-badge {
  position: absolute;
  top: 8px;
  right: 8px;
}
```

### 다른 프레임워크들의 한계

```css
/* Tailwind CSS - 여전히 복잡 */
absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2

/* 간단한 모서리 배치도 여러 클래스 */
absolute top-2 right-2
```

**문제점:**
- 중앙 정렬에 4개의 속성 필요
- transform 계산의 복잡성
- 수학적 계산 필요 (50% - 자기 크기의 50%)
- 반복적이고 기억하기 어려운 패턴

## AdorableCSS Layer 시스템 혁명

### 1. 직관적인 layer() 유틸리티

```html
<!-- 완벽한 중앙 정렬 - 단 하나의 클래스 -->
<div class="layer(center) bg(white) p(32) r(xl) shadow(2xl)">
  <h2>Perfectly Centered Modal</h2>
</div>

<!-- 전체 화면 채우기 -->
<div class="layer(fill) bg(black.5)">
  Full screen overlay
</div>

<!-- 특정 위치 배치 -->
<div class="layer(top:20+right:20) bg(red-500) c(white) px(12) py(6) r(full)">
  Notification Badge
</div>
```

### 2. 산술 연산이 가능한 포지셔닝

```html
<!-- 중앙에서 조금 위로 -->
<div class="layer(center) transform(translateY(-20))">
  Slightly above center
</div>

<!-- 특정 위치에서 토큰만큼 이동 -->
<div class="layer(top:lg+left:xl)">
  Using design tokens for positioning
</div>

<!-- 퍼센트 기반 계산 -->
<div class="layer(top:25%+left:25%) w(50%) h(50%)">
  Quarter positioned, half size
</div>
```

### 3. 패딩이 있는 fill

```html
<!-- 20px 패딩을 가진 전체 채우기 -->
<div class="layer(fill/20) bg(blue-500.1) border(blue-500) r(lg)">
  <div class="h(full) pack c(blue-700)">
    <span>20px 안쪽 여백을 가진 전체 채우기</span>
  </div>
</div>

<!-- 다양한 패딩 값 -->
<div class="layer(fill/40) bg(green-500.1)">40px 패딩</div>
<div class="layer(fill/sm) bg(red-500.1)">sm 토큰 패딩</div>
```

## 완전한 문법 가이드

### 기본 layer() 패턴

#### 1. 전체 채우기 (fill)

```html
<!-- 기본 전체 채우기 -->
<div class="layer(fill)">
  <!-- position: absolute; inset: 0; -->
  전체 화면 채우기
</div>

<!-- 기본값 (layer() == layer(fill)) -->
<div class="layer()">기본값은 fill</div>
```

#### 2. 완벽한 중앙 정렬 (center)

```html
<!-- 완벽한 중앙 정렬 -->
<div class="layer(center)">
  <!-- position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); -->
  Perfect center
</div>
```

#### 3. 특정 위치 지정

```html
<!-- 모서리 배치 -->
<div class="layer(top:0+right:0)">오른쪽 위</div>
<div class="layer(bottom:0+left:0)">왼쪽 아래</div>
<div class="layer(top:0+left:50%)">위쪽 중앙</div>

<!-- 픽셀 단위 정밀 배치 -->
<div class="layer(top:20+left:30)">20px 아래, 30px 오른쪽</div>

<!-- 토큰을 사용한 일관된 간격 -->
<div class="layer(top:lg+right:md)">토큰 기반 위치</div>
```

### 고급 포지셔닝: position() 유틸리티

AdorableCSS는 더욱 강력한 `position()` 유틸리티도 제공합니다:

```html
<!-- (x,y) 좌표 시스템 -->
<div class="(center,center)">완벽한 중앙</div>
<div class="(left,top)">왼쪽 위</div>
<div class="(right+20,bottom-10)">오른쪽에서 20px, 아래에서 10px 위</div>

<!-- 복잡한 산술 연산 -->
<div class="(center+30,top+50%)">중앙에서 30px 오른쪽, 위에서 50% 아래</div>
<div class="(100%-sm,center-lg)">오른쪽 끝에서 sm만큼 왼쪽, 중앙에서 lg만큼 위</div>
```

## 실전 활용 패턴

### 1. 모달과 오버레이

```html
<!-- 기본 모달 -->
<div class="layer(fill) bg(black.5) pack">
  <div class="bg(white) p(32) r(xl) shadow(2xl) max-w(500)">
    <h2 class="font(xl) bold mb(16)">Modal Title</h2>
    <p class="c(gray-600) mb(24)">Modal content goes here...</p>
    <div class="hbox(right) gap(12)">
      <button class="px(20) py(10) border(gray-300) r(md)">Cancel</button>
      <button class="px(20) py(10) bg(blue-500) c(white) r(md)">Confirm</button>
    </div>
  </div>
</div>

<!-- 슬라이드 인 모달 -->
<div class="layer(fill) bg(black.3)">
  <div class="layer(right:0+top:0) bg(white) w(400) h(full) shadow(xl) p(24)">
    <h2>Side Panel</h2>
    <p>Slide-in modal content</p>
  </div>
</div>

<!-- 바텀 시트 -->
<div class="layer(fill) bg(black.3)">
  <div class="layer(bottom:0+left:0) bg(white) w(full) r(t-xl) p(24)">
    <h3>Bottom Sheet</h3>
    <p>Mobile-friendly bottom modal</p>
  </div>
</div>
```

### 2. 알림과 배지

```html
<!-- 알림 배지 -->
<div class="relative">
  <button class="size(48) bg(blue-500) r(lg) pack">
    <svg class="size(24) c(white)"><!-- 벨 아이콘 --></svg>
  </button>
  <div class="layer(top:-8+right:-8) size(20) bg(red-500) r(full) pack">
    <span class="c(white) font(xs) bold">3</span>
  </div>
</div>

<!-- 상태 인디케이터 -->
<div class="relative">
  <img src="avatar.jpg" class="size(64) r(full)" />
  <div class="layer(bottom:4+right:4) size(16) bg(green-400) r(full) border(2/white)"></div>
</div>

<!-- 플로팅 액션 버튼 -->
<div class="layer(bottom:24+right:24) size(56) bg(blue-500) r(full) shadow(lg) pack">
  <svg class="size(24) c(white)"><!-- 플러스 아이콘 --></svg>
</div>
```

### 3. 이미지 오버레이

```html
<!-- 이미지 위 텍스트 오버레이 -->
<div class="relative">
  <img src="hero-image.jpg" class="w(full) h(400) object(cover) r(xl)" />
  
  <!-- 그라디언트 오버레이 -->
  <div class="layer(fill) bg(0deg/transparent..black.7) r(xl)"></div>
  
  <!-- 텍스트 콘텐츠 -->
  <div class="layer(bottom:24+left:24) c(white)">
    <h2 class="font(2xl) bold mb(8)">Hero Title</h2>
    <p class="c(white.9)">Hero description text</p>
  </div>
  
  <!-- 플레이 버튼 -->
  <div class="layer(center) size(80) bg(white.2) r(full) pack backdrop(blur-sm)">
    <svg class="size(32) c(white)"><!-- 플레이 아이콘 --></svg>
  </div>
</div>
```

### 4. 복잡한 레이아웃 패턴

```html
<!-- 카드 위 액션 버튼들 -->
<div class="relative bg(white) r(xl) shadow(md) overflow(hidden)">
  <!-- 메인 콘텐츠 -->
  <img src="product.jpg" class="w(full) h(200) object(cover)" />
  <div class="p(24)">
    <h3 class="font(lg) bold">Product Name</h3>
    <p class="c(gray-600)">Product description</p>
  </div>
  
  <!-- 좋아요 버튼 -->
  <div class="layer(top:16+right:16) size(36) bg(white.9) r(full) pack shadow(md)">
    <svg class="size(18) c(red-500)"><!-- 하트 아이콘 --></svg>
  </div>
  
  <!-- 할인 배지 -->
  <div class="layer(top:16+left:16) bg(red-500) c(white) px(8) py(4) r(md) font(xs) bold">
    -20%
  </div>
</div>

<!-- 네비게이션 인디케이터 -->
<div class="relative">
  <!-- 슬라이더 콘텐츠 -->
  <div class="h(300) bg(blue-500) r(xl)"></div>
  
  <!-- 페이지 인디케이터 -->
  <div class="layer(bottom:16+center) hbox gap(8)">
    <div class="size(8) bg(white) r(full)"></div>
    <div class="size(8) bg(white.5) r(full)"></div>
    <div class="size(8) bg(white.5) r(full)"></div>
  </div>
  
  <!-- 네비게이션 화살표 -->
  <div class="layer(left:16+center) size(40) bg(white.8) r(full) pack">
    <svg class="size(20)"><!-- 왼쪽 화살표 --></svg>
  </div>
  <div class="layer(right:16+center) size(40) bg(white.8) r(full) pack">
    <svg class="size(20)"><!-- 오른쪽 화살표 --></svg>
  </div>
</div>
```

### 5. outside 포지셔닝

```html
<!-- 툴팁 (요소 밖으로 배치) -->
<div class="relative inline-block">
  <button class="px(16) py(8) bg(blue-500) c(white) r(md)">
    Hover me
  </button>
  
  <!-- 툴팁을 버튼 위쪽 밖으로 배치 -->
  <div class="layer(top:0+outside+center) bg(gray-900) c(white) px(12) py(6) r(md) font(sm) whitespace(nowrap)">
    This is a tooltip
    <!-- 화살표 -->
    <div class="layer(bottom:-4+center) w(0) h(0) border(t-4/gray-900) border(x-4/transparent)"></div>
  </div>
</div>

<!-- 드롭다운 메뉴 -->
<div class="relative">
  <button class="px(16) py(8) bg(gray-100) r(md) hbox(center) gap(8)">
    Menu
    <svg class="size(16)"><!-- 화살표 --></svg>
  </button>
  
  <!-- 메뉴를 버튼 아래쪽 밖으로 배치 -->
  <div class="layer(bottom:0+outside+left:0) bg(white) shadow(lg) r(md) border(gray-200) py(8) w(200)">
    <a href="#" class="block px(16) py(8) hover:bg(gray-50)">Option 1</a>
    <a href="#" class="block px(16) py(8) hover:bg(gray-50)">Option 2</a>
    <a href="#" class="block px(16) py(8) hover:bg(gray-50)">Option 3</a>
  </div>
</div>
```

## 기술적 구현의 정교함

### 스마트한 transform 계산

```typescript
// center 포지셔닝의 실제 구현
if (value === "center") {
  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  };
}
```

### 산술 연산 파싱

```typescript
// center+20, bottom-xs 같은 복잡한 표현 파싱
const arithmeticMatch = value.match(/^(center|top|bottom|left|right|[\d.]+%?)([+-])(.+)$/);

if (base === 'center') {
  result.left = operator === '+' 
    ? `calc(50% + ${offsetValue})`
    : `calc(50% - ${offsetValue})`;
  result.transform = 'translateX(-50%)';
}
```

### outside 포지셔닝 로직

```typescript
// outside 키워드 처리 - 요소를 부모 밖으로 배치
if (outside) {
  const revert = (b: string, a: string) => {
    pos[a] = pos[b] === "0" ? "100%" : `calc(100% + ${px(pos[b])})`;
    delete pos[b];
  };
  // top:0+outside → bottom: 100%
}
```

### 토큰 시스템 통합

```html
<!-- 디자인 토큰과 완벽 통합 -->
<div class="layer(top:xs+left:sm)">xs/sm 토큰 사용</div>
<div class="layer(top:lg+right:xl)">lg/xl 토큰 사용</div>

<!-- 생성되는 CSS -->
.layer\(top\:xs\+left\:sm\) {
  position: absolute;
  top: var(--spacing-xs);
  left: var(--spacing-sm);
}
```

## 성능과 호환성

### 최적화된 CSS 출력

```css
/* 효율적인 CSS 생성 */
.layer\(center\) {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.layer\(fill\) {
  position: absolute;
  inset: 0;
}

.layer\(fill\/20\) {
  position: absolute;
  inset: 20px;
}
```

### 브라우저 호환성

```css
/* 구형 브라우저 지원 */
.layer\(fill\) {
  position: absolute;
  top: 0;    /* IE 11 호환 */
  right: 0;
  bottom: 0;
  left: 0;
  inset: 0;  /* 현대 브라우저 */
}
```

## 반응형 layer 포지셔닝

```html
<!-- 반응형 레이어 배치 -->
<div class="layer(top:16+right:16) md:layer(top:24+right:24) lg:layer(top:32+right:32)">
  반응형 포지셔닝
</div>

<!-- 모바일에서는 바텀 시트, 데스크톱에서는 모달 -->
<div class="layer(bottom:0+left:0) md:layer(center) w(full) md:w(500) h(auto) md:h(auto)">
  반응형 모달/바텀시트
</div>

<!-- 모바일 메뉴 -->
<div class="layer(top:60+left:0) md:layer(top:60+right:20) w(full) md:w(300)">
  반응형 드롭다운
</div>
```

## 모범 사례

### 1. 일관된 z-index 관리

```html
<!-- z-index와 layer 조합 -->
<div class="layer(fill) bg(black.5) z(modal)">Modal overlay</div>
<div class="layer(center) z(modal+1)">Modal content</div>
<div class="layer(top:20+right:20) z(notification)">Notification</div>
```

### 2. 접근성 고려

```html
<!-- 포커스 트랩이 가능한 모달 구조 -->
<div class="layer(fill) bg(black.5)" aria-modal="true" role="dialog">
  <div class="layer(center) bg(white) p(32) r(xl)" tabindex="-1">
    <h2 id="modal-title">Modal Title</h2>
    <!-- 모달 콘텐츠 -->
  </div>
</div>
```

### 3. 성능 최적화

```html
<!-- GPU 가속을 위한 will-change 활용 -->
<div class="layer(center) will-change(transform)">
  Animation ready element
</div>

<!-- 스크롤 성능을 위한 contain -->
<div class="layer(fill) contain(layout style paint)">
  Optimized overlay
</div>
```

## 결론: 포지셔닝의 새로운 패러다임

AdorableCSS v2의 Layer 포지셔닝 시스템은:

- ✅ **직관적**: Figma의 레이어 개념을 그대로 구현
- ✅ **간결함**: 복잡한 포지셔닝을 단일 유틸리티로 해결
- ✅ **강력함**: 산술 연산과 토큰 시스템 완벽 지원
- ✅ **유연함**: fill, center, outside 등 모든 시나리오 커버
- ✅ **효율적**: 최적화된 CSS 생성과 브라우저 호환성

이제 CSS 포지셔닝은 더 이상 **복잡한 수학 계산이나 기억해야 할 속성들의 집합이 아닌**, **직관적이고 표현력 있는 디자인 언어**가 되었습니다.

`layer(center)`로 완벽한 중앙 정렬을, `layer(top:20+right:20)`으로 정밀한 배치를, `layer(fill/20)`으로 패딩이 있는 전체 채우기를 구현할 수 있습니다. **이것이 AdorableCSS가 꿈꾸는 미래입니다.**