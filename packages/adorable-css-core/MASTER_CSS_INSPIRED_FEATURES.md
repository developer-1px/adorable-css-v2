# Master CSS에서 영감받은 AdorableCSS v2 신규 기능 제안

## ✅ 이미 지원하는 기능들

### 1. 비율(Aspect Ratio) 유틸리티 
**이미 구현됨**: `aspect(16/9)`, `aspect(4/3)` 등 지원

### 2. Transform 단축 문법
**이미 구현됨**: 
- `scale(1.2)` - transform scale
- `rotate(45)` - 자동으로 deg 추가  
- `translate(10/20)` - x/y 변환

---

## 🆕 실제로 추가할 수 있는 새로운 기능들

## 2. 블렌드 모드(Blend Mode) 유틸리티
이미지나 요소 합성을 위한 블렌드 모드

### 제안 문법:
```css
/* 기본 블렌드 모드 */
blend(multiply)    → mix-blend-mode: multiply;
blend(screen)      → mix-blend-mode: screen;
blend(overlay)     → mix-blend-mode: overlay;
blend(darken)      → mix-blend-mode: darken;
blend(lighten)     → mix-blend-mode: lighten;

/* 배경 블렌드 모드 */
bg-blend(multiply) → background-blend-mode: multiply;
bg-blend(screen)   → background-blend-mode: screen;
```

## 3. 고급 Transform 단축 문법
Master CSS처럼 더 간결한 transform 문법

### 현재 AdorableCSS:
```css
transform(scale(1.2)+rotate(45deg))
```

### 제안하는 새 문법:
```css
scale(1.2)         → transform: scale(1.2);
scale(1.2/0.8)     → transform: scale(1.2, 0.8);
rotate(45)         → transform: rotate(45deg);
rotate(-90)        → transform: rotate(-90deg);
skew(10)           → transform: skew(10deg);
skew(10/20)        → transform: skew(10deg, 20deg);

/* 복합 transform */
transform(scale:1.2+rotate:45) → transform: scale(1.2) rotate(45deg);
```

## 4. 마스크(Mask) 유틸리티
그라디언트 마스크와 이미지 마스크

### 제안 문법:
```css
/* 그라디언트 마스크 */
mask(linear/top)      → mask-image: linear-gradient(to bottom, black, transparent);
mask(linear/bottom)   → mask-image: linear-gradient(to top, black, transparent);
mask(radial)          → mask-image: radial-gradient(circle, black, transparent);

/* 마스크 사이즈 */
mask-size(cover)      → mask-size: cover;
mask-size(contain)    → mask-size: contain;
```

## 5. 그룹 상호작용 유틸리티
부모-자식 간 상호작용을 위한 그룹 기능

### 제안 문법:
```css
/* 그룹 호버 */
group                           /* 부모에 적용 */
group-hover:scale(1.1)         /* 자식에 적용: 부모 호버시 자식 스케일 */
group-hover:opacity(100)       /* 부모 호버시 자식 불투명도 변경 */

/* 그룹 포커스 */
group-focus:ring(2/blue-500)   /* 부모 포커스시 자식에 링 효과 */

/* 피어 상호작용 (형제 요소) */
peer                           /* 형제 요소 표시 */
peer-hover:c(blue-500)        /* 형제 호버시 색상 변경 */
peer-checked:opacity(100)     /* 체크박스 체크시 효과 */
```

## 6. 애니메이션 유틸리티 개선

### 제안 문법:
```css
/* 프리셋 애니메이션 */
animate(fade-in)       → animation: fade-in 0.3s ease-out;
animate(slide-up)      → animation: slide-up 0.3s ease-out;
animate(bounce)        → animation: bounce 1s ease-in-out infinite;
animate(pulse)         → animation: pulse 2s ease-in-out infinite;
animate(spin)          → animation: spin 1s linear infinite;

/* 커스텀 duration */
animate(fade-in/0.5s)  → animation: fade-in 0.5s ease-out;
animate(slide-up/1s)   → animation: slide-up 1s ease-out;

/* 커스텀 easing */
animate(fade-in/0.3s/ease-in) → animation: fade-in 0.3s ease-in;

/* 애니메이션 제어 */
animation-delay(0.2s)  → animation-delay: 0.2s;
animation-fill(both)   → animation-fill-mode: both;
animation-play(paused) → animation-play-state: paused;
```

## 7. 스크롤 스냅 유틸리티
모던 스크롤 경험을 위한 스크롤 스냅

### 제안 문법:
```css
/* 컨테이너 (부모) */
scroll-snap(x)         → scroll-snap-type: x mandatory;
scroll-snap(y)         → scroll-snap-type: y mandatory;
scroll-snap(both)      → scroll-snap-type: both mandatory;
scroll-snap(x/proximity) → scroll-snap-type: x proximity;

/* 아이템 (자식) */
snap(start)            → scroll-snap-align: start;
snap(center)           → scroll-snap-align: center;
snap(end)              → scroll-snap-align: end;
```

## 8. 컨테이너 쿼리 지원
반응형 컴포넌트를 위한 컨테이너 쿼리

### 제안 문법:
```css
/* 컨테이너 정의 */
container              → container-type: inline-size;
container(size)        → container-type: size;
container-name(card)   → container-name: card;

/* 컨테이너 쿼리 사용 */
@container:w(300)      /* 컨테이너 너비 300px 이상 */
@container:w(..500)    /* 컨테이너 너비 500px 이하 */
@container(card):w(400) /* 특정 컨테이너 타겟 */
```

## 9. 논리적 속성 지원
국제화를 위한 논리적 속성

### 제안 문법:
```css
/* 논리적 margin/padding */
mis(2xl)              → margin-inline-start: var(--spacing-2xl);
mie(2xl)              → margin-inline-end: var(--spacing-2xl);
pbs(lg)               → padding-block-start: var(--spacing-lg);
pbe(lg)               → padding-block-end: var(--spacing-lg);

/* 논리적 크기 */
inline-size(300px)    → inline-size: 300px;
block-size(200px)     → block-size: 200px;

/* 논리적 border */
border-bs(2/gray-300) → border-block-start: 2px solid var(--gray-300);
border-ie(1/gray-200) → border-inline-end: 1px solid var(--gray-200);
```

## 10. 성능 최적화 유틸리티
GPU 가속과 성능 최적화를 위한 유틸리티

### 제안 문법:
```css
/* GPU 가속 */
accelerate            → transform: translateZ(0);
will-change(transform) → will-change: transform;
will-change(opacity)  → will-change: opacity;

/* 렌더링 최적화 */
contain(layout)       → contain: layout;
contain(paint)        → contain: paint;
contain(strict)       → contain: strict;

/* 터치 최적화 */
touch(manipulation)   → touch-action: manipulation;
touch(none)          → touch-action: none;
```

## 구현 우선순위

### 높음 (바로 구현 가능):
1. Aspect Ratio - 모던 브라우저 지원 좋음
2. Transform 단축 문법 - 기존 시스템 활용 가능
3. 그룹 상호작용 - 많이 사용되는 패턴
4. 애니메이션 프리셋 - 개발 생산성 향상

### 중간:
5. 블렌드 모드 - 특수 효과용
6. 스크롤 스냅 - UX 개선
7. 마스크 유틸리티 - 고급 시각 효과

### 낮음 (추후 고려):
8. 컨테이너 쿼리 - 아직 실험적
9. 논리적 속성 - 국제화 필요시
10. 성능 최적화 - 특수 상황용

## 기대 효과
- 더 직관적이고 간결한 문법
- Master CSS의 장점을 AdorableCSS 스타일로 재해석
- 모던 CSS 기능 적극 활용
- 개발자 경험 향상