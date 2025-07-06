# 레이아웃 시스템: Figma처럼 생각하고 코딩하기

> "Margin이 없는 세상을 상상해보세요. Figma가 바로 그렇습니다. AdorableCSS는 이 Figma의 레이아웃 철학을 코드에 그대로 구현합니다."

AdorableCSS의 레이아웃 철학은 매우 단순하고 직관적입니다: **Gap-based Layout**. CSS의 복잡한 `margin` 속성을 버리고, Figma에서 Auto Layout을 사용하는 것처럼 요소 간의 간격을 명확하게 제어합니다.

## No Margin Rule: 왜 Margin을 사용하지 않는가?

### Margin의 근본적인 문제점

전통적인 CSS에서 `margin`은 요소의 외부 여백을 제어하는 데 사용되지만, 다음과 같은 예측 불가능하고 복잡한 동작으로 인해 많은 개발자에게 혼란을 야기합니다.

1.  **Margin Collapse (마진 상쇄)**: 인접한 두 요소의 수직 `margin`이 겹칠 때, 더 큰 `margin` 값으로 합쳐지는 현상입니다. 이는 의도치 않은 간격을 만들고 레이아웃을 예측하기 어렵게 만듭니다.
    ```css
    /* 예시: 위 요소 margin-bottom: 20px, 아래 요소 margin-top: 30px */
    /* 실제 간격은 30px (더 큰 값으로 상쇄) */
    .element-a { margin-bottom: 20px; }
    .element-b { margin-top: 30px; }
    ```

2.  **음수 Margin의 복잡성**: 음수 `margin`은 요소를 겹치게 하거나 공간을 줄이는 데 사용되지만, 이는 레이아웃을 매우 복잡하게 만들고 디버깅을 어렵게 합니다. 종종 특정 레이아웃을 '해킹'하는 용도로 사용되곤 합니다.

3.  **외부/내부 간격의 혼재**: `margin`은 요소의 '외부' 간격을, `padding`은 '내부' 간격을 제어합니다. 이 두 개념이 혼재되어 사용될 때, 특히 컴포넌트 재사용 시 예상치 못한 간격 문제가 발생하기 쉽습니다.

### Gap의 명확하고 직관적인 장점

AdorableCSS는 `margin` 대신 `gap` 속성을 적극적으로 활용하여 이러한 문제들을 해결합니다. `gap`은 Flexbox나 Grid 컨테이너의 자식 요소들 사이에 일관된 간격을 부여하며, `margin`과 같은 복잡한 동작이 없습니다.

1.  **예측 가능성**: `gap`은 항상 설정한 값 그대로 요소들 사이에 간격을 만듭니다. 마진 상쇄와 같은 현상이 없어 레이아웃을 정확하게 예측할 수 있습니다.
2.  **간결함**: 부모 컨테이너가 자식 요소들 간의 간격을 일괄적으로 관리하므로, 각 자식 요소에 개별적으로 `margin`을 부여할 필요가 없어 코드가 훨씬 간결해집니다.
3.  **Figma와의 완벽한 일치**: Figma의 Auto Layout은 `margin` 개념 없이 `gap`과 `padding`만으로 모든 간격을 제어합니다. AdorableCSS는 이 Figma의 철학을 그대로 코드에 반영하여, 디자이너와 개발자가 동일한 멘탈 모델로 레이아웃을 구성할 수 있게 합니다.

```html
<!-- ❌ 전통적 방식: margin으로 간격 조절 (예측 불가능) -->
<div class="mb-4">요소 A</div>
<div class="mt-6">요소 B</div>  <!-- 실제 간격은 24px이 아닌 24px (더 큰 값) -->

<!-- ✅ AdorableCSS: gap으로 명확한 간격 (예측 가능) -->
<div class="vbox gap(20)">
  <div>요소 A</div>
  <div>요소 B</div>  <!-- 요소 A와 B 사이의 간격: 정확히 20px -->
</div>
```

이러한 `No Margin Rule`은 AdorableCSS를 통해 더욱 안정적이고 예측 가능한 레이아웃을 구축하고, 디자인과 개발 간의 협업을 강화하는 핵심적인 기반이 됩니다.

## Auto Layout 매핑: Figma의 레이아웃 개념을 코드로

Figma의 Auto Layout은 요소를 정렬하고 간격을 제어하는 강력한 기능입니다. AdorableCSS는 이 Auto Layout의 핵심 개념을 `hbox()`와 `vbox()` 유틸리티로 직관적으로 매핑하여, 디자이너가 Figma에서 생각하는 방식 그대로 코드를 작성할 수 있게 합니다.

### 1. 기본 박스 모델: `hbox`와 `vbox`

Figma의 Frame과 Auto Layout은 요소를 그룹화하고 정렬하는 기본 단위입니다. AdorableCSS는 이 개념을 `hbox()` (Horizontal Box)와 `vbox()` (Vertical Box) 유틸리티로 구현하여, Flexbox의 복잡한 속성들을 추상화하고 디자인 의도를 직관적으로 표현할 수 있게 합니다.

#### `hbox()` (Horizontal Auto Layout): 가로 방향 요소 배치

`hbox()`는 요소를 가로 방향으로 배치하며, `display: flex; flex-direction: row;`를 기본으로 합니다. Figma의 Auto Layout에서 가로 방향으로 요소를 정렬하는 것과 동일한 방식으로 작동합니다.

```css
/* Main Axis (가로 정렬 - justify-content) */
hbox()                      /* 기본: 왼쪽 정렬 (justify-content: flex-start) */
hbox(pack)                  /* 가운데 정렬 (justify-content: center) */
hbox(right)                 /* 오른쪽 정렬 (justify-content: flex-end) */
hbox(between)               /* 양쪽 끝 정렬 (justify-content: space-between) */
hbox(around)                /* 균등 분배 (justify-content: space-around) */
hbox(evenly)                /* 완전 균등 분배 (justify-content: space-evenly) */

/* Cross Axis (세로 정렬 - align-items) */
hbox(top)                   /* 상단 정렬 (align-items: flex-start) */
hbox(middle)                /* 세로 중앙 정렬 (align-items: center) */
hbox(bottom)                /* 하단 정렬 (align-items: flex-end) */
hbox(fill)                  /* 세로 채우기 (align-items: stretch) */

/* 복합 정렬: Main Axis와 Cross Axis 정렬을 동시에 적용 */
hbox(center+middle)         /* 가로/세로 완전 중앙 정렬 */
hbox(between+middle)        /* 양쪽 끝 정렬 + 세로 중앙 정렬 */
hbox(right+bottom)          /* 오른쪽 하단 정렬 */
```

#### `vbox()` (Vertical Auto Layout): 세로 방향 요소 배치

`vbox()`는 요소를 세로 방향으로 배치하며, `display: flex; flex-direction: column;`을 기본으로 합니다. Figma의 Auto Layout에서 세로 방향으로 요소를 정렬하는 것과 동일한 방식으로 작동합니다.

```css
/* Main Axis (세로 정렬 - justify-content) */
vbox()                      /* 기본: 위쪽 정렬 (justify-content: flex-start) */
vbox(pack)                  /* 세로 가운데 정렬 (justify-content: center) */
vbox(bottom)                /* 아래쪽 정렬 (justify-content: flex-end) */
vbox(between)               /* 위아래 끝 정렬 (justify-content: space-between) */
vbox(around)                /* 균등 분배 (justify-content: space-around) */
vbox(evenly)                /* 완전 균등 분배 (justify-content: space-evenly) */

/* Cross Axis (가로 정렬 - align-items) */
vbox(left)                  /* 왼쪽 정렬 (align-items: flex-start) */
vbox(center)                /* 가로 중앙 정렬 (align-items: center) */
vbox(right)                 /* 오른쪽 정렬 (align-items: flex-end) */
vbox(fill)                  /* 가로 채우기 (align-items: stretch - 기본값) */

/* 복합 정렬: Main Axis와 Cross Axis 정렬을 동시에 적용 */
vbox(middle+center)         /* 세로/가로 완전 중앙 정렬 */
vbox(between+center)        /* 위아래 끝 정렬 + 가로 중앙 정렬 */
```

### 2. 간격 시스템 (`gap`): Figma의 Item Spacing 구현

`gap` 유틸리티는 Figma의 Auto Layout에서 'Item Spacing'과 동일한 역할을 합니다. 부모 컨테이너에 `gap`을 적용하여 자식 요소들 간의 간격을 일관되게 제어할 수 있습니다. 이는 각 요소에 개별적으로 `margin`을 부여하는 것보다 훨씬 간결하고 예측 가능합니다.

```css
/* 고정 간격: 픽셀 또는 디자인 토큰 기반 간격 */
gap(16)             /* gap: 16px (가로/세로 아이템 간 16px 간격) */
gap(sm)             /* gap: var(--spacing-sm); (디자인 토큰 `--spacing-sm` 값 사용) */
gap(md)             /* gap: var(--spacing-md); (디자인 토큰 `--spacing-md` 값 사용) */

/* 자동 간격 (Space Between): 남은 공간을 균등하게 분배 */
gap(auto)           /* gap: auto; (Flexbox의 justify-content: space-between과 유사하게 작동) */

/* 방향별 간격: 가로 또는 세로 방향으로만 간격 적용 */
gap-x(20)           /* column-gap: 20px (가로 방향 아이템 간 20px 간격) */
gap-y(10)           /* row-gap: 10px (세로 방향 아이템 간 10px 간격) */
```

### 3. 패딩 시스템 (`p`): Figma의 Padding 완벽 구현

`p` 유틸리티는 Figma의 Padding 개념을 코드에 그대로 반영합니다. 요소의 내부 여백을 제어하여 콘텐츠와 테두리 사이의 공간을 확보합니다.

```css
/* 전체 패딩: 상하좌우 모든 방향에 동일한 패딩 적용 */
p(20)               /* padding: 20px; */
p(sm)               /* padding: var(--spacing-sm); (디자인 토큰 `--spacing-sm` 값 사용) */

/* 축별 패딩: 가로 (x) 또는 세로 (y) 축에 패딩 적용 */
px(20)              /* padding-left: 20px; padding-right: 20px; */
py(10)              /* padding-top: 10px; padding-bottom: 10px; */

/* 개별 패딩: 특정 방향에만 패딩 적용 */
pt(10)              /* padding-top: 10px; */
pr(20)              /* padding-right: 20px; */
pb(30)              /* padding-bottom: 30px; */
pl(40)              /* padding-left: 40px; */

/* 반응형 패딩: 브레이크포인트에 따라 패딩 값 변경 */
p(sm) md:p(md) lg:p(lg) /* 모바일: sm 패딩, md 브레이크포인트 이상: md 패딩, lg 브레이크포인트 이상: lg 패딩 */
```

## 크기 시스템: Figma의 Constraints를 코드로

Figma에서 요소의 크기를 제어하는 방식은 'Fill container', 'Hug contents', 'Fixed size'와 같은 제약 조건(Constraints)을 기반으로 합니다. AdorableCSS는 이러한 Figma의 크기 제어 방식을 `w()` (width)와 `h()` (height) 유틸리티로 완벽하게 매핑하여, 반응형 디자인과 유연한 레이아웃을 직관적으로 구현할 수 있게 합니다.

### 1. 너비 (`w`): 가로 크기 제어

`w()` 유틸리티는 요소의 너비를 설정하며, Figma의 Width 속성과 동일한 개념으로 작동합니다.

```css
/* 고정 너비 (Fixed Width): 특정 픽셀, 백분율, 뷰포트 단위 등으로 너비 설정 */
w(320)              /* width: 320px */
w(50%)              /* width: 50% (부모 너비의 50%) */
w(100vw)            /* width: 100vw (뷰포트 너비의 100%) */

/* 토큰 너비: 디자인 토큰에 정의된 크기 사용 */
w(sm)               /* width: var(--size-sm); (디자인 토큰 `--size-sm` 값 사용) */
w(container)        /* width: var(--container-lg); (컨테이너 토큰 `--container-lg` 값 사용) */

/* 특수 값: CSS의 내장 키워드를 활용한 유연한 너비 */
w(full)             /* width: 100%; (부모의 사용 가능한 공간을 꽉 채움) */
w(screen)           /* width: 100vw; (뷰포트 너비를 꽉 채움) */
w(auto)             /* width: auto; (콘텐츠에 따라 자동으로 너비 조절) */
w(min)              /* width: min-content; (콘텐츠의 최소 너비) */
w(max)              /* width: max-content; (콘텐츠의 최대 너비) */
w(fit)              /* width: fit-content; (콘텐츠에 맞춰 너비 조절, min/max-content 사이) */

/* Figma Constraints 매핑 */
w(fill)             /* width: 100%; flex: 1; (Figma의 Fill Container와 동일, Flexbox 컨테이너 내에서 남은 공간을 채움) */
w(hug)              /* width: fit-content; (Figma의 Hug Contents와 동일, 내용물 크기에 맞춰 너비 조절) */
```

### 2. 높이 (`h`): 세로 크기 제어

`h()` 유틸리티는 요소의 높이를 설정하며, Figma의 Height 속성과 동일한 개념으로 작동합니다.

```css
/* 고정 높이 (Fixed Height): 특정 픽셀, 뷰포트 단위 등으로 높이 설정 */
h(200)              /* height: 200px */
h(100vh)            /* height: 100vh (뷰포트 높이의 100%) */

/* 특수 값: CSS의 내장 키워드를 활용한 유연한 높이 */
h(full)             /* height: 100%; (부모의 사용 가능한 공간을 꽉 채움) */
h(screen)           /* height: 100vh; (뷰포트 높이를 꽉 채움) */
h(auto)             /* height: auto; (콘텐츠에 따라 자동으로 높이 조절) */

/* 최소/최대 높이 제약 */
min-h(100)          /* min-height: 100px */
max-h(500)          /* max-height: 500px */
```

### 3. 종횡비 (`size`): 비율 기반 크기 제어

`size()` 유틸리티는 요소의 너비와 높이를 동시에 제어하거나, `aspect-ratio` 속성을 사용하여 요소의 종횡비를 유지하도록 합니다. 이는 특히 이미지, 비디오, 임베드된 콘텐츠 등 비율 유지가 중요한 요소에 유용합니다.

```css
/* 일반 비율: aspect-ratio 속성을 사용하여 요소의 종횡비 유지 */
size(16:9)          /* aspect-ratio: 16 / 9; (가로:세로 비율 16:9 유지) */
size(4:3)           /* aspect-ratio: 4 / 3; */
size(1:1)           /* aspect-ratio: 1 / 1; (정사각형 유지) */

/* size() 유틸리티로 고정 크기와 비율 동시 설정 */
size(200)           /* width: 200px; height: 200px; (정사각형 고정 크기) */
size(320x200)       /* width: 320px; height: 200px; (고정 너비와 높이) */
```

## Grid 시스템: 복잡한 2차원 레이아웃의 간결한 구현

CSS Grid는 2차원 레이아웃을 위한 강력한 도구입니다. AdorableCSS는 이 Grid 시스템을 직관적인 유틸리티로 제공하여, 복잡한 그리드 레이아웃을 쉽게 정의하고 반응형으로 제어할 수 있게 합니다.

### 1. 기본 그리드: 빠르고 쉬운 그리드 정의

`grid` 유틸리티는 `display: grid;`를 설정하고, 컬럼 수를 간단하게 정의할 수 있도록 돕습니다.

```css
/* 자동 그리드: 콘텐츠에 맞춰 자동으로 컬럼을 배치 */
grid                /* display: grid; (기본 그리드 컨테이너 설정) */
grid(3)             /* grid-template-columns: repeat(3, 1fr); (3개의 동일한 너비 컬럼 생성) */
grid(4)             /* grid-template-columns: repeat(4, 1fr); (4개의 동일한 너비 컬럼 생성) */

/* 반응형 그리드: 브레이크포인트에 따라 컬럼 수 변경 */
grid(1) md:grid(2) lg:grid(3) xl:grid(4) /* 모바일: 1열, md 이상: 2열, lg 이상: 3열, xl 이상: 4열 */

/* 그리드 간격: grid-gap 또는 gap 속성 사용 */
grid(3) gap(20)     /* 3열 그리드에 가로/세로 20px 간격 적용 */
```

### 2. 고급 그리드: 커스텀 템플릿 및 영역 제어

`grid-cols`와 `grid-area` 유틸리티를 사용하여 더욱 복잡하고 커스터마이징된 그리드 레이아웃을 구현할 수 있습니다.

```css
/* 커스텀 그리드 템플릿: grid-template-columns 속성 직접 정의 */
grid-cols(200px_1fr_200px)   /* grid-template-columns: 200px 1fr 200px; (사이드바-메인-사이드바 레이아웃) */
grid-cols(repeat(auto-fit,minmax(300px,1fr))) /* grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); (반응형 자동 채움 그리드) */

/* 그리드 영역: grid-area 속성을 사용하여 요소 배치 */
grid-area(header)   /* grid-area: header; (명명된 그리드 영역에 요소 배치) */
col-span(2)         /* grid-column: span 2; (현재 요소가 2개의 컬럼을 차지) */
row-span(3)         /* grid-row: span 3; (현재 요소가 3개의 로우를 차지) */
```

## Position 시스템: 요소의 배치와 깊이 제어

AdorableCSS는 CSS의 `position` 속성을 추상화하여, 요소를 화면에 배치하고 겹치는 순서(z-index)를 직관적으로 제어할 수 있는 시스템을 제공합니다. 특히 Figma의 레이어 개념을 코드에 반영한 독창적인 `layer()` 유틸리티는 복잡한 포지셔닝을 간결하게 만듭니다.

### 1. Layer 포지셔닝 (`layer()`): Figma의 Constraints를 확장한 강력한 배치

`layer()` 유틸리티는 Figma의 Constraints 개념을 확장하여, 요소를 부모 컨테이너나 뷰포트 내에서 특정 위치에 배치하는 것을 매우 쉽게 만듭니다. `position: absolute`와 `transform`을 조합하는 복잡한 계산 없이, 디자인 의도를 그대로 표현할 수 있습니다.

```css
/* 중앙 정렬: 부모 요소의 정중앙에 완벽하게 배치 */
layer(center)       /* position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); */

/* 모서리 정렬: 특정 모서리에 배치 */
layer(top-left)     /* position: absolute; top: 0; left: 0; */
layer(top-right)    /* position: absolute; top: 0; right: 0; */
layer(bottom-left)  /* position: absolute; bottom: 0; left: 0; */
layer(bottom-right) /* position: absolute; bottom: 0; right: 0; */

/* 복합 포지셔닝: 여러 위치 속성을 조합하여 배치 */
layer(top:20+left:30)    /* position: absolute; top: 20px; left: 30px; */
layer(center+top:20)     /* position: absolute; top: 20px; left: 50%; transform: translateX(-50%); (가로 중앙, 상단에서 20px) */

/* Fill 포지셔닝: 부모 요소를 꽉 채우기 */
layer(fill)         /* position: absolute; inset: 0; (부모 요소를 꽉 채움) */
layer(fill/20)      /* position: absolute; inset: 20px; (모든 방향으로 20px의 여백을 두고 꽉 채움) */
```

### 2. 좌표 시스템: 직관적인 위치 값 표현

AdorableCSS는 `layer()` 유틸리티 내에서 CSS의 `calc()` 함수를 직접 사용하지 않고도, 직관적인 연산자를 통해 좌표 값을 표현할 수 있게 합니다. 이는 특히 동적인 위치 계산이 필요할 때 유용합니다.

```css
/* 절대 좌표: 픽셀 단위로 정확한 위치 지정 */
(20,30)             /* left: 20px; top: 30px; (layer() 내에서 사용) */
(center,top)        /* left: 50%; transform: translateX(-50%); top: 0; (layer() 내에서 가로 중앙, 상단에 배치) */

/* 계산식: 간단한 사칙연산으로 위치 계산 */
(100%-20,50%+10)    /* left: calc(100% - 20px); top: calc(50% + 10px); */

/* 토큰 사용: 디자인 토큰을 활용한 위치 지정 */
(left+sm,top+md)    /* left: calc(left + var(--spacing-sm)); top: calc(top + var(--spacing-md)); */
```

### 3. Position 유틸리티: 기본 CSS `position` 속성 제어

필요한 경우, CSS의 기본 `position` 속성과 관련된 유틸리티를 직접 사용할 수도 있습니다.

```css
/* 포지션 타입: 요소의 포지셔닝 방식 설정 */
relative            /* position: relative; */
absolute            /* position: absolute; */
fixed               /* position: fixed; */
sticky              /* position: sticky; */

/* 개별 위치: top, right, bottom, left 속성 제어 */
top(20)             /* top: 20px; */
right(0)            /* right: 0; */
bottom(auto)        /* bottom: auto; */
left(50%)           /* left: 50%; */

/* Z-index: 요소의 쌓임 순서 제어 */
z(10)               /* z-index: 10; */
z(modal)            /* z-index: var(--z-modal); (디자인 토큰 사용) */
```

## Container 시스템

### 1. 반응형 컨테이너
```css
/* 기본 컨테이너 */
container           /* 중앙 정렬, 반응형 패딩 */
container(lg)       /* max-width: var(--container-lg) */
container(xl)       /* max-width: var(--container-xl) */

/* 읽기 최적화 컨테이너 */
container(prose)    /* max-width: 65ch */
```

### 2. 컨테이너 쿼리
```css
/* 컨테이너 기반 반응형 */
@container (min-width: 400px) {
  /* 스타일 */
}
```

## Flexbox 고급 기능

### 1. Flex 속성
```css
/* Flex 증가/축소 */
flex(1)             /* flex: 1 1 0% */
flex(auto)          /* flex: 1 1 auto */
flex(initial)       /* flex: 0 1 auto */
flex(none)          /* flex: none */

/* 개별 속성 */
grow                /* flex-grow: 1 */
grow(2)             /* flex-grow: 2 */
shrink(0)           /* flex-shrink: 0 */
basis(200)          /* flex-basis: 200px */
```

### 2. 정렬 옵션
```css
/* Justify Content */
pack                /* justify-content: center */
between             /* justify-content: space-between */
around              /* justify-content: space-around */
evenly              /* justify-content: space-evenly */

/* Align Items */
items(start)        /* align-items: flex-start */
items(center)       /* align-items: center */
items(end)          /* align-items: flex-end */
items(fill)         /* align-items: stretch */

/* Wrap */
wrap                /* flex-wrap: wrap */
nowrap              /* flex-wrap: nowrap */
wrap-reverse        /* flex-wrap: wrap-reverse */
```

## Overflow 제어

```css
/* 기본 overflow */
clip    /* overflow: hidden */
overflow(auto)      /* overflow: auto */
overflow(scroll)    /* overflow: scroll */
overflow(visible)   /* overflow: visible */

/* 축별 overflow */
overflow-x(auto)    /* overflow-x: auto */
overflow-y(hidden)  /* overflow-y: hidden */

/* 단축어 */
clip                /* overflow: hidden */
scrollable          /* overflow: auto */
```

## 실전 레이아웃 패턴

### 1. The Holy Grail Layout
전통적으로 가장 어려운 레이아웃을 AdorableCSS로:

```html
<!-- 전통적 CSS: 50+ 줄 -->
<!-- AdorableCSS: 5줄 -->
<div class="vbox h(screen)">
  <header class="hbox(middle) gap(auto) px(xl) py(md) bg(white) shadow(sm)">
    <div class="hbox gap(lg)">
      <img class="w(40) h(40)" src="logo.png" />
      <nav class="hbox gap(md)">
        <a class="c(gray-700) hover:c(primary)">홈</a>
        <a class="c(gray-700) hover:c(primary)">소개</a>
        <a class="c(gray-700) hover:c(primary)">문서</a>
      </nav>
    </div>
    <button class="btn(primary)">시작하기</button>
  </header>
  
  <div class="hbox flex(1) clip">
    <aside class="w(240) bg(gray-50) p(lg) overflow-y(auto)">
      <!-- 사이드바 -->
    </aside>
    
    <main class="flex(1) p(xl) overflow-y(auto)">
      <!-- 메인 컨텐츠 -->
    </main>
  </div>
  
  <footer class="px(xl) py(md) bg(gray-900) c(white)">
    © 2024 AdorableCSS
  </footer>
</div>
```

### 2. 카드 그리드
```html
<div class="container grid(1) md:grid(2) lg:grid(3) gap(lg)">
  <div class="card() p(lg)">
    <h3 class="heading(h3) mb(sm)">카드 제목</h3>
    <p class="text(gray-600)">카드 내용...</p>
  </div>
  <!-- 더 많은 카드들... -->
</div>
```

### 3. 사이드바 레이아웃
```html
<div class="hbox h(screen)">
  <aside class="w(280) vbox p(lg) bg(gray-50)">
    <!-- 사이드바 내용 -->
  </aside>
  <main class="flex(1) p(xl) overflow-y(auto)">
    <!-- 메인 컨텐츠 -->
  </main>
</div>
```

### 4. 모달 오버레이 (중앙 정렬의 진수)
```html
<!-- 전통적 방식: position + transform 헤킹 -->
<div style="
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
">

<!-- AdorableCSS: 직관적 -->
<div class="layer(fill) bg(black.5) z(modal)">
  <div class="layer(center) card() w(480) max-h(80vh) overflow-y(auto)">
    <h2 class="heading(h3) mb(md)">모달 제목</h2>
    <p class="text(gray-600) mb(lg)">모달 내용...</p>
    <div class="hbox(right) gap(sm)">
      <button class="btn(ghost)">취소</button>
      <button class="btn(primary)">확인</button>
    </div>
  </div>
</div>
```

### 5. 비율 기반 레이아웃
```html
<!-- 16:9 비디오 컨테이너 -->
<div class="size(16:9) bg(black) r(lg) clip">
  <video class="w(full) h(full) object(cover)" />
</div>

<!-- 1:1 프로필 이미지 -->
<div class="size(120) r(full) clip">
  <img class="w(full) h(full) object(cover)" />
</div>
```

## 성능 최적화 팁

### 1. 레이아웃 시프트 방지
```css
/* 고정 크기 지정 */
w(320) h(200)      /* 레이아웃 시프트 방지 */

/* 종횡비 유지 */
size(16:9)         /* 이미지 로드 전 공간 확보 */
```

### 2. 하드웨어 가속
```css
/* transform 사용 */
layer(center)       /* transform 기반 중앙 정렬 */
translate-x(50%)    /* GPU 가속 */
```

### 3. 컨테이너 쿼리 활용
부모 크기 기반 반응형으로 더 효율적인 레이아웃 구성

## Layout의 철학: Constraints over Positioning

### 전통적 CSS
"요소를 어디에 배치할까?" (position, top, left...)

### AdorableCSS
"요소가 어떤 제약을 가져야 할까?" (fill, hug, constraints)

이것이 Figma가 레이아웃을 생각하는 방식이고, AdorableCSS가 추구하는 방향입니다.

```html
<!-- 예시: 반응형 카드 그리드 -->
<div class="container grid(1) sm:grid(2) lg:grid(3) xl:grid(4) gap(lg)">
  <!-- 카드들은 컨테이너의 제약에 따라 배치됨 -->
</div>
```

## 다음 단계

- [Component](/docs/component) - 레이아웃 기반 컴포넌트 구축
- [Design System](/docs/design-system) - 완전한 디자인 시스템 구축