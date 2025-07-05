# Figma와 CSS 사이의 간극, 그리고 AdorableCSS의 탄생

## 매일 반복되는 번역 작업

오늘도 수천 명의 개발자들이 Figma 디자인을 받아들고 CSS로 번역하는 작업을 하고 있습니다. 디자이너가 Figma에서 "Auto Layout, Horizontal, Gap 16"으로 설정한 컴포넌트를 받으면, 개발자는 이를 `display: flex; flex-direction: row; gap: 16px;`로 번역합니다. 

단순해 보이지만, 이런 번역이 하루에 수백 번 반복됩니다. 더 복잡한 문제는 "Fill container"를 만났을 때 시작됩니다. 이것이 `width: 100%`인지, `flex: 1`인지, 아니면 `flex-grow: 1`인지는 상황에 따라 다릅니다. "Hug contents"는 또 어떻게 번역해야 할까요? `width: fit-content`? `width: auto`? 

이것은 단순한 도구의 차이가 아닙니다. 1996년에 만들어진 CSS는 문서를 꾸미기 위한 언어였고, 2016년에 등장한 Figma는 인터페이스를 디자인하기 위한 도구였습니다. 20년의 시간 차이는 곧 패러다임의 차이입니다.

## 코드베이스가 말해주는 진실

AdorableCSS의 `size.ts` 파일을 보면 이 문제를 해결하려는 흔적이 명확합니다:

```typescript
// Special Figma-style values first
if (args === 'fill') return { flex: '1' };  // Figma's "Fill container"
if (args === 'hug') return { width: 'fit-content' };  // Figma's "Hug contents"
```

주석에서 알 수 있듯이, AdorableCSS는 처음부터 Figma의 개념을 직접 지원하도록 설계되었습니다. `w(fill)`이라고 쓰면 Figma의 "Fill container"가 되고, `w(hug)`라고 쓰면 "Hug contents"가 됩니다. 번역이 필요 없습니다.

## hbox와 vbox: 단순한 이름 변경이 아닌 사고의 전환

`display.ts` 파일에는 AdorableCSS의 핵심 철학이 담겨 있습니다:

```typescript
hbox: createLayoutHandler('row'),
vbox: createLayoutHandler('column'),
```

왜 `flex-row`나 `flex-col`이 아니라 `hbox`와 `vbox`일까요? 이것은 Figma의 사고방식을 그대로 코드로 옮긴 것입니다. Figma에서는 "Auto Layout"을 켜고 방향을 설정합니다. CSS의 flexbox가 아니라 Figma의 Auto Layout이 출발점입니다.

실제로 프로젝트의 튜토리얼 파일에는 이런 설명이 있습니다:
- `hbox` = "Auto Layout Horizontal" ✨
- `vbox` = "Auto Layout Vertical" ✨

## margin 없는 세상

AdorableCSS의 가장 독특한 결정 중 하나는 margin을 사용하지 않는 것입니다. `ADORABLE_CSS_MISTAKES.md` 문서에는 이렇게 명시되어 있습니다:

```
### 1. Margin 사용 (❌ 가장 흔한 실수)
❌ Wrong: mb(4xl), mt(lg), mx(auto)
✅ Correct: vbox gap(4xl), 구조적 spacing 사용
**이유**: AdorableCSS는 gap 기반 레이아웃을 사용. margin은 사용하지 않음.
```

왜 이런 결정을 했을까요? Figma에는 margin이 없습니다. Figma에서 요소 간의 간격은 부모 컨테이너의 gap으로 관리됩니다. 개별 요소가 자신만의 margin을 갖는 것이 아니라, 부모가 자식들 사이의 간격을 통제합니다.

이 철학은 `CLAUDE.md`의 디자인 규칙에도 명확히 나타납니다:
> "no margin, no font, no line-height, no color, just use components and semantic token"

## 실제 문제 해결 사례

### 1. 중앙 정렬의 악몽

CSS에서 요소를 가운데 정렬하는 방법은 최소 5가지가 넘습니다. `margin: 0 auto`, `text-align: center`, `display: flex; justify-content: center; align-items: center`, `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)`, `display: grid; place-items: center`...

AdorableCSS의 해결책은 단순합니다. `position.ts`에서:

```typescript
layer(center)  // Figma처럼 한 번에 중앙 정렬
```

이것은 Figma에서 레이어를 선택하고 "Center"를 클릭하는 것과 동일한 경험을 제공합니다.

### 2. 숫자 체계의 통일

Tailwind CSS를 사용하면 Figma의 16px이 `gap-4`가 됩니다. 왜냐하면 Tailwind는 4px 단위 시스템을 사용하기 때문입니다. 매번 4로 나누는 계산을 해야 합니다.

AdorableCSS는 이 문제를 근본적으로 해결했습니다:
- Figma: gap 16px
- AdorableCSS: `gap(16)`
- CSS 출력: `gap: 16px`

변환도, 계산도 필요 없습니다. 디자이너가 설정한 값이 그대로 코드가 됩니다.

### 3. 컴포넌트 중심 사고

`TECH_PITCH.md`에서 보여주는 before/after 비교는 인상적입니다:

**Before (Traditional CSS):**
```css
.nav-wrapper {
  background-color: #1a1a1a;
}
.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 20px;
}
.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 24px;
  font-weight: bold;
  color: white;
}
```

**After (AdorableCSS):**
```html
<nav class="bg(#1a1a1a)">
  <div class="container hbox(pack) p(16/20)">
    <a class="hbox(middle) gap(8) font(24) bold c(white)">
      <Logo/> <span>AdorableCSS</span>
    </a>
  </div>
</nav>
```

19줄이 5줄로 줄었습니다. 더 중요한 것은 HTML을 읽는 것만으로도 레이아웃이 머릿속에 그려진다는 점입니다.

## 실무에서의 영향

`WHY_ADORABLECSS.md` 문서는 구체적인 비즈니스 가치를 제시합니다:
- 디자이너-개발자 커뮤니케이션 시간 50% 감소
- Figma-to-code 번역 시간 70% 감소
- 스타일 관련 버그 60% 감소

이는 과장이 아닙니다. 실제로 `hbox gap(16)`이라는 코드를 보면, 디자이너도 개발자도 동일하게 "아, 가로로 배치하고 간격은 16px"이라고 이해합니다.

## 타협과 현실

물론 AdorableCSS도 완벽하지는 않습니다. 코드베이스를 보면 현실적인 타협의 흔적들이 있습니다:

### 1. 브라우저 호환성

일부 Figma 기능은 최신 CSS로만 구현 가능합니다. 예를 들어, `gap` 속성은 오래된 브라우저에서 지원되지 않습니다. 

### 2. 동적 상태 처리

Figma는 정적 디자인 도구입니다. hover, focus 같은 동적 상태를 표현하려면 별도의 프레임을 만들어야 합니다. AdorableCSS는 이를 위해 pseudo-class 지원을 추가했습니다:

```html
<button class="bg(blue) hover:bg(blue-dark) active:scale(0.98)">
```

### 3. 반응형 디자인

Figma와 웹의 반응형은 근본적으로 다릅니다. Figma는 여러 프레임으로 각 화면을 디자인하지만, 웹은 하나의 코드로 모든 화면에 대응해야 합니다.

## 코드베이스가 보여주는 철학

AdorableCSS의 모든 결정에는 일관된 철학이 있습니다:

1. **CSS Native Values**: `scale(1.05)`, `opacity(0.5)` 같은 CSS 값을 그대로 사용
2. **Figma Auto Layout Mapping**: `hbox()`, `vbox()`, `w(fill)`, `w(hug)` 직접 매핑
3. **Integration-First**: 기존 도구들을 대체하지 않고 함께 사용
4. **Design Rules**: margin 금지, 의미론적 토큰 사용 강제

`text.ts` 파일의 주석에는 이런 내용도 있습니다:
> "Helper function inspired by Figma"

이는 AdorableCSS가 단순히 Figma를 흉내 내는 것이 아니라, Figma의 사고방식을 깊이 이해하고 웹 환경에 맞게 재해석했음을 보여줍니다.

## 진짜 문제와 진짜 해결책

AdorableCSS가 해결하려는 문제는 명확합니다. 매일 수천 명의 개발자가 겪는 "Figma to CSS 번역 작업"을 없애는 것입니다. 

코드베이스를 통해 본 AdorableCSS의 노력은:
- Figma 용어를 그대로 사용 (`fill`, `hug`, `Auto Layout`)
- 숫자 변환 없이 직접 매핑 (16px = 16)
- margin 없는 gap 기반 레이아웃
- 컴포넌트 중심의 사고

이 모든 것이 하나의 목표를 향합니다: **"Write CSS the way you think in Figma"**

디자이너와 개발자가 같은 언어로 대화할 수 있게 하는 것. 그것이 AdorableCSS의 진정한 가치입니다.