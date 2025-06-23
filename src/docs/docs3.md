# AdorableCSS v2 - 전체 레퍼런스 (Full Reference)
지금까지의 논의를 바탕으로, AdorableCSS v2의 모든 속성을 포함한 최종 레퍼런스 문서를 작성했습니다. 피그마의 디자인 개념을 기반으로 웹 환경에 필수적인 기능들을 보강하고, 일관성 있는 문법 체계 안에서 모든 것을 제어할 수 있도록 설계되었습니다.
### 기본 원칙
| **구분** | **문법** | **설명** |
|---|---|---|
| **기본 형태** | property(value) | 속성과 값을 지정하는 가장 일반적인 형태입니다. |
| **단축 형태** | property | 값이 고정된 속성을 키워드만으로 사용합니다. |
| **복수 값** | prop(val1/val2) | 띄어쓰기 대신 /로 여러 값을 구분합니다. |
| **조건부 적용** | selector:prop(val) | hover:, sm: 등 특정 조건에서 스타일을 적용합니다. |
| **중요도** | prop(val)! | CSS의 !important에 해당합니다. |

### 1. 레이아웃 (Layout)
| **기능** | **문법 (Syntax)** | **CSS 대응 (CSS Equivalent)** |
|---|---|---|
| **Display** | block, inline-block, inline, none | display: block; 등 |
|  | hbox, vbox | display: flex; (flex-direction: row 또는 column) |
|  | grid | display: grid; |
| **Flexbox** | wrap, nowrap | flex-wrap: wrap; 등 |
|  | hbox(between), vbox(around) | justify-content: space-between; 등 |
|  | hbox(stretch), vbox(middle) | align-items: stretch; 등 |
| **Grid** | grid-cols(3), grid-rows(2) | grid-template-columns: repeat(3, 1fr); 등 |
|  | col-span(2), row-span(3) | grid-column: span 2; 등 |
|  | col-start(2), row-end(4) | grid-column-start: 2; 등 |
| **Position** | static, relative, absolute, fixed, sticky | position: static; 등 |
|  | (0,0) | position: absolute; top: 0; left: 0; |
|  | (..0,..0) | position: absolute; bottom: 0; right: 0; |
|  | (10..20, 30..40) | left: 10px; right: 20px; top: 30px; bottom: 40px; |
|  | layer | position: absolute; inset: 0; |
| **Spacing** | p(16) | padding: 16px; |
|  | pt(16), pr(16), pb(16), pl(16) | padding-top: 16px; 등 |
|  | px(16), py(16) | padding-left: 16px; padding-right: 16px; 등 |
|  | m(16) | margin: 16px; |
|  | mt(16), mx(auto) | margin-top: 16px;, margin-left: auto; 등 |
|  | gap(16) | gap: 16px; |
|  | gap(16/24) | row-gap: 16px; column-gap: 24px; |
### 2. 크기 및 제한 (Size & Constraints)
| **기능** | **문법 (Syntax)** | **CSS 대응 (CSS Equivalent)** |
|---|---|---|
| **Width** | w(300) | width: 300px; |
|  | w(fill) | width: 100%; |
|  | w(hug) | width: fit-content; |
|  | w(auto) | width: auto; |
| **Height** | h(200) | height: 200px; |
|  | h(fill) | height: 100%; |
|  | h(hug) | height: fit-content; |
|  | h(screen) | height: 100vh; |
| **Size** | 300x200 | width: 300px; height: 200px; |
| **Min/Max Size** | w(300..) | min-width: 300px; |
|  | h(..600) | max-height: 600px; |
|  | w(300..600) | min-width: 300px; max-width: 600px; |
| **Aspect Ratio** | 16:9, 1:1, 4:3 | aspect-ratio: 16 / 9; 등 |
### 3. 시각적 속성 (Visuals)
| **기능** | **문법 (Syntax)** | **CSS 대응 (CSS Equivalent)** |
|---|---|---|
| **Background** | bg(#fff) bg(#000.5) | background-color: #ffffff; 등 |
|  | bg(transparent) | background-color: transparent; |
|  | bg(linear/45deg/#f00/#00f) | background-image: linear-gradient(...); |
|  | bg(radial/circle/#f00/#00f) | background-image: radial-gradient(...); |
|  | bg-image(url) | background-image: url(...); |
| **Border** | b(1/#000/solid) | border: 1px solid #000; |
|  | bt(1/#000), bx(1/#000) | border-top: 1px solid #000; 등 |
| **Radius** | r(8) | border-radius: 8px; |
|  | r(8/0) | border-radius: 8px 0; |
|  | r(8/0/16/0) | border-radius: 8px 0 16px 0; |
|  | r() | border-radius: 9999px; |
| **Shadow** | shadow(md), shadow(lg) | box-shadow: (pre-defined); |
|  | shadow(0/4/16/#000.1) | box-shadow: 0 4px 16px rgba(0,0,0,0.1); |
|  | shadow(inner/...) | box-shadow: inset ...; |
| **Opacity** | opacity(.5) | opacity: 0.5; |
| **Filters** | blur(4), brightness(.8), contrast(1.2) | filter: blur(4px); 등 |
|  | grayscale, sepia, saturate(1.5) | filter: grayscale(100%); 등 |
| **Blend Mode** | mix-blend(multiply), bg-blend(screen) | mix-blend-mode: multiply; 등 |
### 4. 타이포그래피 (Typography)
| **기능** | **문법 (Syntax)** | **CSS 대응 (CSS Equivalent)** |
|---|---|---|
| **Font** | font(Inter) | font-family: Inter; |
|  | font(16) font(1rem) | font-size: 16px; |
|  | font(bold), font(500) | font-weight: 700; |
|  | font(16/24) | font-size: 16px; line-height: 24px; |
|  | font(16/24/-2%) | ...; letter-spacing: -0.02em; |
|  | font(Inter/16/24/-2%/500) | 모든 속성 종합 |
| **Color** | c(#000), c(#000.5) | color: #000000; 등 |
| **Alignment** | text(left), text(center), text(right) | text-align: left; 등 |
| **Decoration** | underline, strike, no-underline | text-decoration: underline; 등 |
| **Transform** | uppercase, lowercase, capitalize | text-transform: uppercase; 등 |
| **Style** | italic, not-italic | font-style: italic; 등 |
| **Whitespace** | nowrap, pre, pre-wrap | white-space: nowrap; 등 |
| **Overflow** | truncate | overflow: hidden; text-overflow: ellipsis; ... |
|  | max-lines(3) | -webkit-line-clamp: 3; |
| **Word Break** | break(all), break(word) | word-break: break-all; 등 |
| **List Style** | list(disc), list(decimal), list(none) | list-style-type: disc; 등 |
### 5. 인터랙션 제어 (Interaction Control)
| **기능** | **문법 (Syntax)** | **CSS 대응 (CSS Equivalent)** |
|---|---|---|
| **Cursor** | cursor(pointer), cursor(not-allowed) | cursor: pointer; 등 |
| **Pointer Events** | pointer(none), pointer(auto) | pointer-events: none; 등 |
| **User Select** | select(none), select(text), select(all) | user-select: none; 등 |
| **Resize** | resize, resize(x), resize(y), resize-none | resize: both; 등 |
| **Appearance** | appearance(none) | appearance: none; |
| **Inert** | inert | inert HTML 속성 적용 |
### 6. 상태, 전환, 애니메이션 (States, Transitions & Animations)
| **기능** | **문법 (Syntax)** | **CSS 대응 (CSS Equivalent)** |
|---|---|---|
| **State** | hover:bg(blue), active:scale(.98) | :hover { ... } |
|  | focus:b(blue), disabled:opacity(.5) | :focus { ... } |
|  | checked:bg(blue), first:r(0), last:r(0) | :checked, :first-child, :last-child |
|  | group-hover:c(#fff) | .group:hover .selector { ... } |
|  | peer-checked:b(blue) | .peer:checked ~ .selector { ... } |
| **Responsive** | sm:vbox, md:p(32), lg:hbox | @media (min-width: ...) { ... } |
| **Dark Mode** | .dark:bg(#000) | .dark .selector { ... } |
| **Transition** | transition, transition(colors) | transition: all ...;, transition: color, bg-color... |
|  | duration(300), delay(100) | transition-duration: 300ms; 등 |
|  | ease(in-out), ease(linear) | transition-timing-function: ...; |
| **Animation** | animate(spin), animate(ping) | animation: spin 1s linear infinite; 등 |
| **Transform** | scale(1.1), rotate(45), translate(10/20) | transform: scale(1.1); 등 |
|  | skew(x/12), skew(y/12) | transform: skewX(12deg); 등 |
|  | origin(center), origin(top+left) | transform-origin: center; 등 |
### 7. 고급 및 유틸리티 (Advanced & Utilities)
| **기능** | **문법 (Syntax)** | **CSS 대응 (CSS Equivalent)** |
|---|---|---|
| **Stacking** | z(0), z(10), z(auto), z(top) | z-index: 0; (top: 9999) |
| **Scroll** | scroll, scroll(x), scroll(y) | overflow: auto; 등 |
|  | clip | overflow: hidden; |
|  | scrollbar(none), scrollbar(thin) | 스크롤바 스타일링 |
|  | scroll(smooth) | scroll-behavior: smooth; |
|  | snap, snap(x), snap-item | 스크롤 스냅 관련 속성 |
| **Accessibility** | sr-only | 시각적으로 숨김 (스크린 리더에서는 읽힘) |
| **SVG** | fill(currentColor), stroke(1/#fff) | fill: currentColor; 등 |
| **Object Fit** | object(cover), object(contain) | object-fit: cover; 등 |
|  | object(top), object(center) | object-position: top; 등 |
