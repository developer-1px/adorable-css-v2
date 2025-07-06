# AdorableCSS v2 - Product Strategy & Development Roadmap

## 🎯 Core Vision

**"Figma-first + Built-in Design System CSS Framework"**

AdorableCSS v2는 단순한 유틸리티 CSS 프레임워크를 넘어, Figma의 디자인 개념과 1:1 매핑되는 최초의 디자인 시스템 내장형 CSS 프레임워크입니다.

### Key Differentiators
1. **Figma Auto Layout → CSS**: hbox(), vbox(), w(fill), w(hug) 등 직관적 매핑
2. **CSS Native Values**: scale(1.05), opacity(0.5) - CSS 사양을 그대로 따름
3. **OKLCH Color System**: 완벽한 그래디언트와 색상 관리
4. **Zero Learning Curve**: CSS 알면 바로 사용 가능

## 📊 Design System Components Analysis

### Universal Design System Elements

#### ✅ AdorableCSS v2 강점 영역
**Foundation (기초 요소)**
- Design Tokens (색상, 타이포그래피, 간격, 그림자, 반경)
- Visual Effects (그래디언트, 애니메이션, 필터)
- Layout & Structure (Grid, Flexbox, Position, Container)
- Spacing & Sizing (Margin, Padding, Width/Height constraints)

#### ⚠️ 강화 필요 영역
**Form Components**
- Input Elements: text, number, email, password, search
- Selection: checkboxes, radio, dropdown, multi-select, toggle, slider
- Form Structure: validation states, help text, field groups

**Navigation**
- Primary: header, sidebar, mobile menu, mega menu
- Secondary: tabs, breadcrumbs, pagination, steps
- Contextual: context menus, floating actions

**Feedback & Communication**
- Notifications: toast, alerts, snackbars, status indicators
- Interactive: tooltips, popovers, loading states, empty states
- Confirmation: modals, dialogs, drawer/sheet

**Data Display**
- Content: cards, lists, tables, accordions
- Media: images, avatars, carousels, galleries
- Visualization: charts integration, badges, timeline

## 🏗️ CSS Framework Strategy

### Core Philosophy: CSS-First Approach

**CSS Framework의 한계 인정:**
- JavaScript 로직 불가 (상태 관리, 이벤트 핸들링)
- 접근성 구현 한계 (ARIA, 키보드 내비게이션)
- 복잡한 인터랙션 패턴 불가

**CSS Framework의 강점 극대화:**
- 뛰어난 스타일링 시스템
- Design Token 관리
- Layout & Visual 패턴
- 애니메이션 & 트랜지션
- 반응형 디자인

### Integration-First 전략

**기존 생태계와의 결합:**
```tsx
// Headless UI + AdorableCSS
<Dialog className="layer(center) bg(white) r(2xl) p(6xl) shadow(2xl)">
  <Dialog.Panel className="vbox gap(lg)">
    <button className="btn(primary)">Confirm</button>
  </Dialog.Panel>
</Dialog>

// Radix UI + AdorableCSS
<Tooltip.Content className="
  bg(gray-900) c(white) p(sm/md) r(md) 
  font(sm) shadow(lg) animate(fadeIn)
">
```

**Partner Ecosystem 구축:**
- `@adorable-css/headless-ui`
- `@adorable-css/radix-ui`
- `@adorable-css/react-aria`
- `@adorable-css/shadcn`

## 🚀 CSS Framework 완결성 로드맵

### Priority 1: 기본 완결성 (3개월)

#### 1. 상태 스타일링 완성도
```css
/* 모든 상태의 완전한 커버리지 */
hover:scale(1.05)         /* CSS native: scale: 1.05 */
focus:ring(2/blue/offset-2)
active:scale(0.95)
disabled:opacity(0.5)     /* CSS native: opacity: 0.5 */
group-hover:translate-y(-2px)
peer-checked:bg(green)

/* Form 상태들 */
valid:border(green)
invalid:border(red)
placeholder-shown:text(gray)
autofill:bg(blue-50)
```

#### 2. Form 스타일링 시스템
```css
/* Input 스타일링 */
input()           /* 기본 input 스타일 */
input(error)      /* 에러 상태 */
input(success)    /* 성공 상태 */
input(disabled)   /* 비활성 상태 */

/* Custom form elements */
checkbox()        /* 커스텀 체크박스 */
radio()          /* 커스텀 라디오 */
switch()         /* 토글 스위치 */
range()          /* 슬라이더 */
select()         /* 셀렉트 박스 */
```

#### 3. 의미론적 컴포넌트 패턴
```css
/* 자주 사용되는 패턴을 컴포넌트화 */
card()           /* 기본 카드 */
card(elevated)   /* 부상 카드 */
card(interactive) /* 인터랙티브 카드 */

btn()            /* 기본 버튼 */
btn(primary)     /* 주요 버튼 */
btn(ghost)       /* 고스트 버튼 */
btn(icon)        /* 아이콘 버튼 */

badge()          /* 배지 */
chip()           /* 칩/태그 */
divider()        /* 구분선 */
```

### Priority 2: 고급 기능 (3개월)

#### 4. CSS-only 인터랙션 패턴
```css
/* Disclosure 패턴 - 아코디언/콜랩스 */
.details-open:checked ~ .content

/* Tab 패턴 - CSS-only 탭 */
.tab:checked ~ .tab-content

/* Modal 패턴 - CSS-only 모달 */
.modal-trigger:target

/* 드롭다운 패턴 */
.dropdown:focus-within .dropdown-menu
```

#### 5. 고급 애니메이션 시스템
```css
/* 트랜지션 프리셋 (CSS 네이티브 값) */
transition(bounce)        /* 바운스 효과 */
duration(0.3s)           /* 300ms */
delay(0.1s)              /* 100ms 지연 */
timing(ease-in-out)      /* cubic-bezier curve */

/* 키프레임 애니메이션 */
animate(fadeIn)          /* 페이드 인 */
animate(slideUp)         /* 슬라이드 업 */
animate(spin)            /* 회전 */
animate(pulse)           /* 펄스 */

/* 스크롤 기반 애니메이션 */
scroll-animate(fadeIn)   /* 스크롤 시 애니메이션 */
parallax(0.5)           /* 패럴랙스 효과 */
```

#### 6. 고급 타이포그래피
```css
/* 텍스트 처리 */
text-balance            /* 균형잡힌 텍스트 */
text-wrap(pretty)       /* 예쁜 줄바꿈 */
hanging-punctuation     /* 한글 처리 */

/* 고급 텍스트 효과 */
text-gradient(purple..pink) /* 그라디언트 텍스트 */
text-stroke(1/black)    /* 텍스트 외곽선 */
text-shadow(glow/blue)  /* 글로우 효과 */

/* 읽기 최적화 */
reading-flow()          /* 읽기 흐름 최적화 */
line-clamp(3)          /* 라인 제한 */
```

### Priority 3: 최신 CSS 기술 (3개월)

#### 7. 접근성 & Print
```css
/* 접근성 유틸리티 */
sr-only                 /* 스크린 리더 전용 */
focus-visible:ring(2)   /* 키보드 포커스만 */
reduced-motion:animate(none) /* 모션 감소 */
high-contrast:border(2) /* 고대비 모드 */

/* 인쇄 스타일 */
print:hidden           /* 인쇄시 숨김 */
print:text(black)      /* 인쇄시 검은색 */
print:page-break(before) /* 페이지 나누기 */
```

#### 8. 최신 CSS 기능 활용
```css
/* Container Queries */
@container(width>400px):grid(2)

/* View Transitions */
view-transition(slide)   /* 페이지 전환 */

/* Modern CSS (네이티브 값 유지) */
aspect-ratio(16/9)      /* aspect-ratio: 16/9 */
object-position(center_top) /* object-position: center top */
scroll-snap(x_mandatory) /* scroll-snap-type: x mandatory */
contain(layout_style)   /* contain: layout style */
```

## 🎨 CSS Native Values Philosophy

### Core Principle: "CSS를 더 쉽게, 하지만 CSS와 다르지 않게"

**올바른 CSS 네이티브 값 사용:**
```css
/* CSS 사양을 그대로 따름 */
scale(1.05)             /* scale: 1.05 (not 105%) */
opacity(0.5)            /* opacity: 0.5 (not 50%) */
rotate(45deg)           /* rotate: 45deg */
blur(10px)              /* filter: blur(10px) */
duration(0.2s)          /* transition-duration: 0.2s */
brightness(1.2)         /* filter: brightness(1.2) */
```

**장점:**
1. **제로 학습 곡선**: CSS 알면 바로 이해
2. **개발자 도구 완벽 매칭**: devtools 값과 동일
3. **CSS 사양 준수**: Working Group 사양 그대로
4. **확장성**: CSS 발전과 함께 자연스럽게 성장

## 📈 Product Roadmap

### Phase 1: Foundation Excellence (Q1 2025)
- CSS Framework 완결성 달성
- Form 스타일링 시스템 완성
- 의미론적 컴포넌트 20개 이상

### Phase 2: Integration Layer (Q2 2025)
- 주요 Headless Library 연동 패키지
- Migration 도구 (Tailwind → AdorableCSS)
- Storybook 애드온 개발

### Phase 3: Ecosystem Leadership (Q3 2025)
- Figma Plugin (Design Token 동기화)
- VS Code Extension (고급 IntelliSense)
- CLI 도구 (자동 최적화, 리포팅)

## 🎯 Success Metrics

**기술적 목표:**
- CSS Framework 완결성 95% 달성
- Integration Package 5개 이상 제공
- Performance: 12KB 평균 번들 사이즈 유지

**시장 목표:**
- "CSS 스타일링에서만큼은 세계 최고" 포지션 확립
- 기존 생태계와의 시너지로 더 큰 임팩트 창출
- Figma-to-Code 워크플로우의 새로운 표준 제시

---

*"Write CSS the way you think in Figma"* - AdorableCSS v2