# Rules Reference

AdorableCSS의 모든 규칙과 유틸리티 클래스에 대한 완전한 레퍼런스입니다.

## 레이아웃 (Layout)

### Auto Layout (Flexbox)
```css
/* 기본 박스 */
hbox()              /* display: flex; flex-direction: row; align-items: center */
vbox()              /* display: flex; flex-direction: column */

/* 정렬 옵션 */
hbox(left)          /* justify-content: flex-start */
hbox(pack)        /* justify-content: center */
hbox(right)         /* justify-content: flex-end */
hbox(middle) gap(auto)       /* justify-content: space-between */
hbox(around)        /* justify-content: space-around */
hbox(evenly)        /* justify-content: space-evenly */

/* 교차축 정렬 */
hbox(top)           /* align-items: flex-start */
hbox(middle)        /* align-items: center */
hbox(bottom)        /* align-items: flex-end */
hbox(fill)          /* align-items: stretch */

/* 복합 정렬 */
hbox(center+middle) /* 완전 중앙 정렬 */
vbox(between+center)/* 위아래 끝 + 가로 중앙 */

/* Wrap */
wrap                /* flex-wrap: wrap */
nowrap              /* flex-wrap: nowrap */
wrap-reverse        /* flex-wrap: wrap-reverse */
```

### Grid
```css
/* 기본 그리드 */
grid                /* display: grid */
grid(3)             /* grid-template-columns: repeat(3, 1fr) */
grid(auto-fit)      /* repeat(auto-fit, minmax(200px, 1fr)) */

/* 커스텀 템플릿 */
grid-cols(200px_1fr_200px)  /* 사이드바 레이아웃 */
grid-rows(60px_1fr_100px)   /* 헤더-콘텐츠-푸터 */

/* 그리드 아이템 */
col-span(2)         /* grid-column: span 2 */
row-span(3)         /* grid-row: span 3 */
grid-area(header)   /* grid-area: header */
```

### 간격 (Gap)
```css
gap(16)             /* gap: 16px */
gap(sm)             /* gap: var(--spacing-sm) */
gap(auto)           /* justify-content: space-between */
gap-x(20)           /* column-gap: 20px */
gap-y(10)           /* row-gap: 10px */
```

## 크기 (Size)

### 너비 (Width)
```css
/* 고정 너비 */
w(320)              /* width: 320px */
w(50%)              /* width: 50% */
w(100vw)            /* width: 100vw */

/* 토큰 너비 */
w(sm)               /* width: var(--size-sm) */
w(container)        /* width: var(--container-lg) */

/* 특수 값 */
w(full)             /* width: 100% */
w(screen)           /* width: 100vw */
w(auto)             /* width: auto */
w(min)              /* width: min-content */
w(max)              /* width: max-content */
w(fit)              /* width: fit-content */

/* Figma 제약 */
w(fill)             /* width: 100%; flex: 1 */
w(hug)              /* width: fit-content */

/* 최소/최대 */
min-w(320)          /* min-width: 320px */
max-w(1200)         /* max-width: 1200px */
```

### 높이 (Height)
```css
/* 고정 높이 */
h(200)              /* height: 200px */
h(100vh)            /* height: 100vh */

/* 특수 값 */
h(full)             /* height: 100% */
h(screen)           /* height: 100vh */
h(auto)             /* height: auto */
h(fill)             /* height: 100%; flex: 1 */
h(hug)              /* height: fit-content */

/* 최소/최대 */
min-h(100)          /* min-height: 100px */
max-h(500)          /* max-height: 500px */
```

### Size 유틸리티
```css
size(64)            /* width: 64px; height: 64px */
size(16:9)          /* aspect-ratio: 16/9 */
size(320x200)       /* width: 320px; height: 200px */
size(text)          /* width: max-content; height: max-content */
```

## 간격 (Spacing)

### 패딩 (Padding)
```css
/* 전체 패딩 */
p(20)               /* padding: 20px */
p(sm)               /* padding: var(--spacing-sm) */

/* 축별 패딩 */
px(20)              /* padding-left: 20px; padding-right: 20px */
py(10)              /* padding-top: 10px; padding-bottom: 10px */

/* 개별 패딩 */
pt(10)              /* padding-top */
pr(20)              /* padding-right */
pb(30)              /* padding-bottom */
pl(40)              /* padding-left */
```

### 마진 (Margin)
```css
/* 전체 마진 */
m(20)               /* margin: 20px */
m(auto)             /* margin: auto */

/* 축별 마진 */
mx(auto)            /* margin-left: auto; margin-right: auto */
my(20)              /* margin-top: 20px; margin-bottom: 20px */

/* 개별 마진 */
mt(10)              /* margin-top */
mr(20)              /* margin-right */
mb(30)              /* margin-bottom */
ml(40)              /* margin-left */
```

## 포지션 (Position)

### Position 타입
```css
relative            /* position: relative */
absolute            /* position: absolute */
fixed               /* position: fixed */
sticky              /* position: sticky */
static              /* position: static */
```

### Layer 시스템
```css
/* 중앙 정렬 */
layer(center)       /* 완벽한 중앙 정렬 */

/* 모서리 정렬 */
layer(top-left)     /* 왼쪽 상단 */
layer(top-right)    /* 오른쪽 상단 */
layer(bottom-left)  /* 왼쪽 하단 */
layer(bottom-right) /* 오른쪽 하단 */

/* 복합 포지셔닝 */
layer(top:20/left:30)    /* top: 20px; left: 30px */
layer(center/top:20)     /* 가로 중앙, top: 20px */

/* Fill 포지셔닝 */
layer(fill)         /* inset: 0 */
layer(fill/20)      /* inset: 20px */
```

### 좌표 시스템
```css
(20,30)             /* left: 20px; top: 30px */
(center,top)        /* 가로 중앙, 상단 */
(100%-20,50%+10)    /* 계산식 포지셔닝 */
```

### 개별 위치
```css
top(20)             /* top: 20px */
right(0)            /* right: 0 */
bottom(auto)        /* bottom: auto */
left(50%)           /* left: 50% */
inset(20)           /* inset: 20px */
```

### Z-index
```css
z(10)               /* z-index: 10 */
z(modal)            /* z-index: var(--z-modal) */
z(dropdown)         /* z-index: var(--z-dropdown) */
```

## 색상 (Color)

### 텍스트 색상
```css
c(black)            /* color: black */
c(white)            /* color: white */
c(gray-500)         /* color: var(--gray-500) */
c(primary)          /* color: var(--primary) */

/* 투명도 */
c(black.5)          /* color: rgba(0,0,0,0.5) */
c(white.8)          /* color: rgba(255,255,255,0.8) */
c(blue-500.3)       /* 30% 투명도 */

/* 그라디언트 텍스트 */
c(45deg/purple-500..pink-500)
c(to-r/blue-500..green-500)
```

### 배경색
```css
bg(white)           /* background-color: white */
bg(gray-100)        /* background-color: var(--gray-100) */
bg(transparent)     /* background-color: transparent */

/* 투명도 */
bg(black.1)         /* 10% 투명 검정 */
bg(white.95)        /* 95% 불투명 흰색 */

/* 그라디언트 */
bg(purple-500..pink-500)           /* 기본 135deg */
bg(45deg/red-500..yellow-500)      /* 각도 지정 */
bg(to-br/blue-500..green-500)      /* 방향 키워드 */
bg(radial/purple-500..transparent)  /* 방사형 */
```

## 타이포그래피 (v2.0 - AI-친화적 통합 문법)

### text() 함수 - 모든 텍스트 관련 속성 (v2.0)

#### Typography (폰트 크기, 라인 높이, 자간)
```css
/* 기본 폰트 크기 */
text(16px)          /* font-size: 16px */
text(sm)            /* font-size: var(--font-sm) */
text(xl)            /* font-size: var(--font-xl) */

/* 라인 높이와 함께 */
text(16px/1.5)      /* font-size: 16px; line-height: 1.5 */
text(lg/1.2)        /* font-size: var(--font-lg); line-height: 1.2 */

/* 자간까지 포함 */
text(lg/1.2/-2%)    /* font-size + line-height + letter-spacing */
```

#### 반응형 Typography (클램프)
```css
/* 토큰 기반 반응형 */
text(sm..6xl)       /* clamp(var(--font-sm), 4vw, var(--font-6xl)) */
text(lg..32px)      /* clamp(var(--font-lg), 4vw, 32px) */

/* 완전한 클램프 설정 */
text(16px..4vw..48px) /* clamp(16px, 4vw, 48px) */
```

#### 텍스트 속성 (정렬, 변환, 장식, 공백)
```css
/* 텍스트 정렬 */
text(center)        /* text-align: center */
text(left)          /* text-align: left */
text(right)         /* text-align: right */
text(justify)       /* text-align: justify */

/* 텍스트 변환 */
text(uppercase)     /* text-transform: uppercase */
text(lowercase)     /* text-transform: lowercase */
text(capitalize)    /* text-transform: capitalize */

/* 텍스트 장식 */
text(underline)     /* text-decoration: underline */
text(line-through)  /* text-decoration: line-through */
text(no-underline)  /* text-decoration: none */

/* 공백 처리 */
text(nowrap)        /* white-space: nowrap */
text(pre-wrap)      /* white-space: pre-wrap */
text(pre)           /* white-space: pre */
```

#### 복합 속성 (+ 연산자)
```css
/* 여러 텍스트 속성 조합 */
text(nowrap+center)      /* white-space: nowrap; text-align: center */
text(uppercase+underline) /* text-transform: uppercase; text-decoration: underline */

/* Typography + 텍스트 속성 */
text(lg/1.5/center)      /* font-size + line-height + text-align */
text(16px/1.4/nowrap+right) /* 모든 속성 혼합 */

/* 반응형 + 복합 */
text(sm..2xl/1.5/tight)  /* 반응형 크기 + 라인 높이 + 자간 */
```

### font() 함수 - 폰트 굵기 전용 (v2.0)
```css
/* 숫자 굵기 */
font(600)           /* font-weight: 600 */
font(400)           /* font-weight: 400 (normal) */
font(300)           /* font-weight: 300 (light) */

/* 키워드 굵기 */
font(bold)          /* font-weight: 700 */
font(semibold)      /* font-weight: 600 */
font(medium)        /* font-weight: 500 */
font(light)         /* font-weight: 300 */
font(thin)          /* font-weight: 100 */
```

### 마이그레이션 가이드 (v1 → v2)
```css
/* 이전 (v1) → 새로운 (v2) */
font(lg)            → text(lg)
font(16/1.5)        → text(16px/1.5)
bold()              → font(bold)
bold(600)           → font(600)
center              → text(center)
uppercase           → text(uppercase)
underline           → text(underline)
line-through        → text(line-through)
nowrap              → text(nowrap)
```

### 실제 사용 예제
```css
/* 제목 */
text(2xl/1.2/center) font(bold)

/* 버튼 텍스트 */
text(sm/nowrap+center) font(medium)

/* 반응형 히어로 제목 */
text(lg..6xl/1.1/center+uppercase) font(black)

/* 본문 텍스트 */
text(base/1.6) font(400)
```

### 기타 텍스트 속성
```css
/* 폰트 스타일 */
italic              /* font-style: italic */

/* 특수 효과 */
truncate            /* 텍스트 말줄임 */
decoration(primary) /* text-decoration-color: var(--primary) */
```

## 테두리 (Border)

### 전체 테두리
```css
border(1)           /* border: 1px solid */
border(2/blue-500)  /* border: 2px solid var(--blue-500) */
border(1/gray-200.5)/* 50% 투명 테두리 */
border(none)        /* border: none */
```

### 개별 테두리
```css
bt(1/gray-200)      /* border-top */
br(2/primary)       /* border-right */
bb(1/transparent)   /* border-bottom */
bl(4/accent)        /* border-left */
```

### 테두리 반경
```css
r(8)                /* border-radius: 8px */
r(sm)               /* border-radius: var(--radius-sm) */
r(lg)               /* border-radius: var(--radius-lg) */
r(full)             /* border-radius: 9999px */

/* 개별 모서리 */
rtl(8)             /* border-top-left-radius */
rtr(8)             /* border-top-right-radius */
rbl(8)             /* border-bottom-left-radius */
rbr(8)             /* border-bottom-right-radius */
```

## 효과 (Effects)

### 그림자
```css
shadow(sm)          /* box-shadow: var(--shadow-sm) */
shadow(lg)          /* box-shadow: var(--shadow-lg) */
shadow(none)        /* box-shadow: none */
shadow(inner)       /* 내부 그림자 */
shadow(2xl/black.5) /* 커스텀 그림자 */
```

### 투명도
```css
opacity(0.5)        /* opacity: 0.5 */
opacity(0)          /* opacity: 0 (invisible) */
opacity(1)          /* opacity: 1 (visible) */
```

### 필터
```css
blur(4)             /* filter: blur(4px) */
blur(sm)            /* filter: blur(var(--blur-sm)) */
brightness(1.1)     /* filter: brightness(1.1) */
contrast(1.2)       /* filter: contrast(1.2) */
grayscale           /* filter: grayscale(1) */
```

### 백드롭 필터
```css
backdrop(8)         /* backdrop-filter: blur(8px) */
backdrop(lg)        /* backdrop-filter: blur(var(--blur-lg)) */
```

## 변환 (Transform)

### 크기 조절
```css
scale(1.05)         /* transform: scale(1.05) */
scale-x(1.2)        /* transform: scaleX(1.2) */
scale-y(0.8)        /* transform: scaleY(0.8) */
```

### 회전
```css
rotate(45)          /* transform: rotate(45deg) */
rotate(-90)         /* transform: rotate(-90deg) */
```

### 이동
```css
translate-x(10)     /* transform: translateX(10px) */
translate-y(-20)    /* transform: translateY(-20px) */
translate-x(50%)    /* transform: translateX(50%) */
```

### 기울이기
```css
skew-x(10)          /* transform: skewX(10deg) */
skew-y(-5)          /* transform: skewY(-5deg) */
```

## 애니메이션

### 트랜지션
```css
transition          /* transition: all 0.3s ease */
transition(300)     /* transition: all 300ms ease */
transition(all/500/ease-out)
transition(colors)  /* transition: background-color, color, border-color */
transition(none)    /* transition: none */
```

### 애니메이션
```css
animate(fade-in)    /* animation: fade-in 0.3s ease */
animate(slide-up/500)
animate(bounce/1s/infinite)
animate(spin/1s/linear/infinite)
```

## 상태 (States)

### 의사 클래스
```css
hover:scale(1.05)   /* :hover { transform: scale(1.05) } */
focus:ring(2)       /* :focus { box-shadow: ring } */
active:opacity(0.8) /* :active { opacity: 0.8 } */
disabled:opacity(0.5)
```

### 그룹 상태
```css
group               /* 부모 요소에 추가 */
group-hover:visible /* 부모 hover 시 표시 */
group-focus:opacity(1)
```

## 반응형

### 브레이크포인트
```css
sm:w(full)          /* @media (min-width: 640px) */
md:grid(2)          /* @media (min-width: 768px) */
lg:gap(xl)          /* @media (min-width: 1024px) */
xl:p(2xl)           /* @media (min-width: 1280px) */
```

## 유틸리티

### 표시/숨김
```css
hidden              /* display: none */
block               /* display: block */
inline              /* display: inline */
inline-block        /* display: inline-block */
flex                /* display: flex */
grid                /* display: grid */
```

### 오버플로우
```css
clip    /* overflow: hidden */
overflow(auto)      /* overflow: auto */
overflow(scroll)    /* overflow: scroll */
overflow-x(auto)    /* overflow-x: auto */
overflow-y(hidden)  /* overflow-y: hidden */
clip                /* overflow: hidden (단축) */
scrollable          /* overflow: auto (단축) */
```

### 커서
```css
cursor(pointer)     /* cursor: pointer */
cursor(default)     /* cursor: default */
cursor(not-allowed) /* cursor: not-allowed */
cursor(grab)        /* cursor: grab */
```

### 기타
```css
select(none)        /* user-select: none */
select(text)        /* user-select: text */
pointer-events(none)/* pointer-events: none */
resize(none)        /* resize: none */
```

## 컴포넌트

### 내장 컴포넌트
```css
btn()               /* 기본 버튼 */
btn(primary)        /* 주요 버튼 */
btn(secondary/lg)   /* 보조 대형 버튼 */

card()              /* 기본 카드 */
card(elevated)      /* 그림자 강조 카드 */
card(glass)         /* 글래스모피즘 카드 */

heading(h1)         /* h1 제목 */
heading(h2/gradient)/* 그라디언트 h2 제목 */

prose()             /* 문서 스타일 */
prose(docs)         /* 문서용 스타일 */

container()         /* 반응형 컨테이너 */
container(lg)       /* 대형 컨테이너 */
```

## 특수 효과

### Glass 효과
```css
glass()             /* 기본 글래스모피즘 */
glass(strong)       /* 강한 효과 */
glass(20/0.2/blue)  /* blur/opacity/tint */
```

### Interactive 효과
```css
interactive(1)      /* 미세한 효과 */
interactive(3)      /* 중간 효과 */
interactive(5)      /* 매우 강한 효과 */
clickable()         /* 클릭 가능 */
hoverable()         /* 호버 효과 */
```

### Glow 효과
```css
glow()              /* 기본 글로우 */
glow(primary)       /* 주요 색상 글로우 */
glow(lg)            /* 강한 글로우 */
```