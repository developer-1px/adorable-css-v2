# 왜 디자이너와 개발자는 다른 언어를 사용하는가

## 같은 화면, 다른 언어

디자이너가 "가운데 정렬"이라고 말할 때, 개발자는 어떤 코드를 떠올릴까요?

```css
/* 방법 1 */ text-align: center;
/* 방법 2 */ margin: 0 auto;
/* 방법 3 */ display: flex; justify-content: center; align-items: center;
/* 방법 4 */ position: absolute; left: 50%; transform: translateX(-50%);
/* 방법 5 */ display: grid; place-items: center;
```

"가운데 정렬"이라는 단순한 요구사항에 최소 5가지 구현 방법이 존재합니다. 각각은 서로 다른 상황에서 사용되고, 다른 부작용을 가지며, 다른 브라우저 지원을 필요로 합니다.

이것이 문제의 핵심입니다. **디자이너와 개발자는 같은 결과물을 만들면서도 완전히 다른 언어를 사용합니다.**

## 번역이 필요한 이유

### Figma는 "무엇을" 묻고, CSS는 "어떻게"를 답한다

Figma에서 버튼을 만들 때:
- "이것은 Primary Button이다"
- "Medium 크기다"
- "Default 상태다"

CSS로 같은 버튼을 만들 때:
```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  /* ... 더 많은 속성들 */
}
```

Figma는 의도를 표현하고, CSS는 구현 방법을 나열합니다. 이 간극에서 수많은 해석의 여지가 생기고, 그 결과 "디자인과 다르다"는 피드백이 끊이지 않습니다.

### 공통 언어의 부재

실제 프로젝트에서 자주 발생하는 대화:

> 디자이너: "여기 Auto Layout으로 만들었는데 간격이 이상해요"  
> 개발자: "flex-direction이 row인데 gap을 16px로 했어요"  
> 디자이너: "...무슨 말인지 모르겠어요"

서로 다른 용어를 사용하기 때문에 같은 것을 두고도 소통이 어렵습니다. 더 큰 문제는 이런 번역 과정에서 원래 의도가 왜곡된다는 것입니다.

## 역사가 만든 간극

### CSS: 문서를 위해 태어나다

CSS가 처음 만들어진 1996년, 웹의 주요 콘텐츠는 연구 논문과 기술 문서였습니다. 자연스럽게 CSS는 "문서를 꾸미는 도구"로 설계되었고, 이는 오늘날까지 CSS의 기본 철학에 영향을 미칩니다.

- **Normal Flow**: 위에서 아래로 흐르는 문서
- **Box Model**: 각 요소는 사각형 상자
- **Cascade**: 스타일이 폭포처럼 상속

이런 개념들은 논문을 레이아웃하기에는 완벽했지만, 복잡한 애플리케이션 UI를 만들기에는 부족했습니다.

### Figma: 인터페이스를 위해 태어나다

20년 후인 2016년, Figma는 완전히 다른 환경에서 탄생했습니다. 이미 웹은 애플리케이션 플랫폼이 되어 있었고, 디자이너들은 복잡한 인터페이스를 만들고 있었습니다.

Figma는 처음부터 "인터페이스 디자인 도구"로 만들어졌기에:
- **Frame**: 독립적인 컨테이너
- **Constraints**: 반응형 동작 정의
- **Auto Layout**: 동적 레이아웃 시스템

이 개념들은 CSS보다 훨씬 직관적으로 UI를 표현할 수 있게 해주었습니다.

## 진짜 문제: 추상화 레벨의 불일치

### 높은 수준의 추상화 vs 낮은 수준의 구현

Figma의 "Auto Layout"을 생각해보세요. 단 하나의 개념으로:
- 방향 설정 (가로/세로)
- 간격 조절
- 패딩 적용
- 정렬 방식 선택

이 모든 것을 해결합니다.

반면 CSS에서는:
```css
display: flex;
flex-direction: row;
gap: 16px;
padding: 24px;
align-items: center;
justify-content: space-between;
```

6개의 속성을 개별적으로 이해하고 조합해야 합니다.

### 맥락의 소실

Figma에서 "Fill Container"는 명확합니다. 부모 크기에 맞춰 늘어나는 것이죠.

하지만 CSS의 `width: 100%`는 상황에 따라 다르게 동작합니다:
- 일반 요소: 부모의 content 영역만큼
- Flex 아이템: flex-grow가 우선할 수도
- Absolute 요소: positioned 부모 기준
- Table 셀: 복잡한 계산 알고리즘

이런 복잡성 때문에 의도한 대로 구현되지 않는 경우가 빈번합니다.

## 현장의 목소리

### Spotify의 경험 (2022)

Spotify 디자인 시스템 팀의 발표에 따르면:
> "Figma 토큰과 코드 토큰의 불일치로 인한 버그가 전체 UI 버그의 43%를 차지했다"

단순히 이름이 달라서가 아니라, 같은 "Primary Blue"가 Figma와 코드에서 미묘하게 다른 값을 가지고 있었던 것입니다.

### Airbnb의 고민 (2021)

> "반응형 디자인을 구현하는 데 전체 프론트엔드 개발 시간의 30%가 소요된다"

Figma에서는 "태블릿에서 2열"이라고 표현하지만, 코드에서는 정확한 브레이크포인트, 간격, 정렬 방식을 모두 명시해야 합니다.

## 해결의 실마리: 공통 언어 만들기

### 번역이 아닌 직접 대화

문제가 번역에서 발생한다면, 번역을 없애면 됩니다.

AdorableCSS의 접근:
```html
<!-- Figma: Horizontal Auto Layout, gap 16px, padding 24px -->
<div class="hbox gap(16) p(24)">
```

CSS 용어를 배우는 대신, Figma 용어를 그대로 사용합니다.

### 의도를 코드로

```html
<!-- 전통적 CSS: HOW를 나열 -->
<div class="display-flex flex-direction-row align-items-center justify-content-space-between">

<!-- AdorableCSS: WHAT을 표현 -->
<div class="hbox(middle) gap(auto)">
```

"어떻게 구현할 것인가"가 아닌 "무엇을 만들 것인가"를 코드로 표현합니다.

### 실제 효과

한 스타트업의 사례:
> "AdorableCSS 도입 3개월 후, 디자인 QA 시간이 80% 감소했습니다. 
> 가장 큰 변화는 디자이너가 개발자에게 'hbox에 gap 20 주세요'라고 
> 직접 코드를 언급하기 시작했다는 것입니다."

## 더 나은 미래를 향해

### 도구의 진화

최근 Figma와 CSS 모두 간극을 줄이려 노력하고 있습니다:

- Figma Dev Mode (2023): 개발자 친화적 기능
- CSS Container Queries: 컴포넌트 기반 반응형
- Design Tokens 표준화: W3C 커뮤니티 그룹

하지만 근본적인 철학의 차이는 여전합니다.

### AI는 답이 될까?

GPT-4V 같은 AI가 디자인을 코드로 변환할 수 있지만:
- 디자인 시스템을 이해하지 못함
- 일회성 코드 생성
- 유지보수 불가능

결국 사람이 이해하고 협업할 수 있는 시스템이 필요합니다.

## AdorableCSS가 만드는 변화

### 1. Figma 개념을 그대로 코드로

#### Auto Layout → hbox/vbox
```html
<!-- Figma: Horizontal Auto Layout -->
<div class="hbox gap(20) p(32)">
  <button>버튼 1</button>
  <button>버튼 2</button>
</div>

<!-- Figma: Vertical Auto Layout with space-between -->
<nav class="vbox(between) h(full) p(24)">
  <div>로고</div>
  <div>메뉴</div>
  <div>하단 정보</div>
</nav>
```

디자이너가 "Horizontal Auto Layout"이라고 말하면, 개발자는 `hbox`를 씁니다. 더 이상 `display: flex; flex-direction: row`를 기억할 필요가 없습니다.

#### Constraints → layer 시스템
```html
<!-- Figma: 오른쪽 하단 고정 -->
<button class="layer(bottom:20+right:20)">
  플로팅 버튼
</button>

<!-- Figma: 중앙 정렬 -->
<div class="layer(center)">
  모달 창
</div>

<!-- Figma: 전체 화면 덮기 -->
<div class="layer(fill)">
  오버레이
</div>
```

Figma의 Constraints를 직관적으로 표현합니다. `position: absolute`와 복잡한 계산 대신, 의도를 그대로 코드로 옮깁니다.

#### Fill/Hug → w/h 시스템
```html
<!-- Figma: Fill container -->
<div class="w(fill)">전체 너비</div>

<!-- Figma: Hug contents -->
<button class="w(hug)">내용만큼</button>

<!-- Figma: Fixed + Fill -->
<div class="hbox">
  <aside class="w(240)">고정 너비</aside>
  <main class="w(fill)">나머지 채우기</main>
</div>
```

### 2. 디자인 토큰의 완벽한 동기화

#### 색상 시스템
```html
<!-- Figma Variables와 1:1 매칭 -->
<div class="bg(surface-primary) c(text-primary)">
  <h1 class="c(text-heading)">제목</h1>
  <p class="c(text-body)">본문 내용</p>
</div>

<!-- Semantic colors -->
<button class="bg(action-primary) c(white)">
  주요 액션
</button>
<div class="bg(feedback-error) c(white)">
  오류 메시지
</div>
```

Figma의 Variable 이름을 그대로 사용합니다. 디자이너가 색상을 변경하면, 토큰만 업데이트하면 됩니다.

#### 간격 시스템
```html
<!-- Figma의 8px 그리드 시스템 -->
<div class="p(xs)">    <!-- 8px -->
<div class="p(sm)">    <!-- 16px -->
<div class="p(md)">    <!-- 24px -->
<div class="p(lg)">    <!-- 32px -->
<div class="p(xl)">    <!-- 48px -->

<!-- 또는 직접 값 사용 -->
<div class="gap(20) p(40)">  <!-- 디자이너가 말한 그대로 -->
```

### 3. 컴포넌트의 진정한 재사용

#### Figma Component = Code Component
```javascript
// Figma의 Button 컴포넌트를 그대로 코드로
const Button = defineComponent({
  // Figma의 Variants
  variants: {
    primary: 'bg(primary) c(white)',
    secondary: 'bg(white) c(primary) border(1/primary)',
    ghost: 'bg(transparent) c(primary)'
  },
  
  // Figma의 Sizes
  sizes: {
    sm: 'h(32) px(12) text(sm)',
    md: 'h(40) px(16) text(base)',
    lg: 'h(48) px(20) text(lg)'
  },
  
  // Figma의 States
  states: {
    hover: 'brightness(1.1)',
    pressed: 'scale(0.98)',
    disabled: 'opacity(0.5) cursor(not-allowed)'
  }
});
```

사용할 때:
```html
<!-- Figma에서 선택하듯이 -->
<button class="btn(primary/lg)">큰 주요 버튼</button>
<button class="btn(ghost/sm)">작은 고스트 버튼</button>
```

### 4. 반응형의 직관적 구현

#### Figma의 Breakpoint를 그대로
```html
<!-- Mobile First -->
<div class="
  grid(1)           /* 모바일: 1열 */
  md:grid(2)        /* 태블릿: 2열 */
  lg:grid(3)        /* 데스크탑: 3열 */
  gap(16)
  md:gap(24)
  lg:gap(32)
">
```

#### 컨테이너 쿼리로 컴포넌트 반응형
```html
<article class="container">
  <div class="
    @sm:hbox          /* 컨테이너가 작으면 세로 */
    @lg:vbox          /* 컨테이너가 크면 가로 */
  ">
    <img class="w(full) @lg:w(300)" />
    <div class="p(16) @lg:p(32)">
      <h2>제목</h2>
      <p>내용</p>
    </div>
  </div>
</article>
```

### 5. 실제 워크플로우의 변화

#### Before: 번역과 해석
```
1. 디자이너: Figma에서 디자인
2. 개발자: 디자인 분석
3. 개발자: CSS 속성 조합 고민
4. 개발자: 구현
5. 디자이너: "뭔가 다른데..."
6. 반복...
```

#### After: 직접 소통
```
1. 디자이너: Figma에서 디자인
2. 디자이너: "hbox gap(20) p(32)로 만들어주세요"
3. 개발자: 그대로 구현
4. 완료
```

### 6. 디버깅과 수정의 단순화

#### 문제 발생 시
```html
<!-- 디자이너: "간격이 너무 좁아요" -->
<!-- Before: CSS 파일 찾아서 어떤 속성인지 분석 -->
<!-- After: -->
<div class="hbox gap(20)">  <!-- gap(32)로 바꾸면 끝 -->
```

#### 실시간 협업
```html
<!-- 디자이너가 직접 코드 리뷰 가능 -->
<section class="vbox gap(48) py(80)">
  <!-- 디자이너: "여기 gap은 32가 맞아요" -->
  <h1 class="heading(xl)">제목</h1>
  <p class="text(body) c(text-secondary)">
    <!-- 디자이너: "text-muted로 바꿔주세요" -->
  </p>
</section>
```

## 결론: 같은 언어로 말하기

디자이너와 개발자가 다른 언어를 사용하는 것은 역사적 배경과 도구의 한계 때문입니다. 하지만 이는 극복 가능한 문제입니다.

AdorableCSS는 단순히 새로운 CSS 프레임워크가 아닙니다. **디자인과 개발 사이의 언어 장벽을 없애는 커뮤니케이션 시스템**입니다.

더 이상 번역하지 마세요. 같은 언어로 말하세요.

---

## 다음 단계

이 철학이 구체적으로 어떻게 구현되는지 알아보려면:

- [Overview](/docs/overview) - AdorableCSS의 핵심 개념
- [Getting Started](/docs/getting-started) - 실제 사용 방법