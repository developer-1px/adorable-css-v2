# AdorableCSS Pure HTML/CSS 프롬프트 가이드

## 🎯 핵심 프롬프트

```
순수 HTML/CSS로 작성하되, 다음 AdorableCSS 문법 규칙을 반드시 따라주세요:

1. 모든 클래스명은 괄호()를 포함해야 합니다
2. CSS에서는 백슬래시(\)로 괄호를 이스케이프 처리합니다
3. HTML에서는 괄호를 그대로 사용합니다
4. 하이픈(-) 대신 괄호 문법만 사용합니다
```

## 📝 상세 규칙

### CSS 작성 규칙
```css
/* ❌ 잘못된 방식 */
.hbox { }
.p-lg { }
.bg-coral { }

/* ✅ 올바른 방식 */
.hbox\(\) { }
.p\(lg\) { }
.bg\(coral\) { }
```

### HTML 작성 규칙
```html
<!-- ❌ 잘못된 방식 -->
<div class="hbox gap-md p-lg">
<button class="button primary">

<!-- ✅ 올바른 방식 -->
<div class="hbox() gap(md) p(lg)">
<button class="button(primary)">
```

## 🔧 구체적인 프롬프트 예시

### 1. 기본 프롬프트
```
순수 HTML/CSS로 페이지를 만들어주세요. 
단, 모든 클래스명은 AdorableCSS 문법인 괄호()를 사용해야 합니다.
CSS에서는 \(\)로 이스케이프하고, HTML에서는 그대로 ()를 사용하세요.
```

### 2. 컴포넌트 요청 프롬프트
```
다음 컴포넌트를 순수 HTML/CSS로 만들어주세요:
- 카드 컴포넌트: card()
- 버튼: button(), button(primary)
- 레이아웃: hbox(), vbox(), gap(md)
- 타이포그래피: display(), heading(), title(), body()

CSS 클래스 정의시 반드시 괄호를 이스케이프(\)해서 사용하세요.
```

### 3. 변환 프롬프트
```
이 HTML을 AdorableCSS 문법으로 변환해주세요:
- class="flex" → class="hbox()"
- class="p-4" → class="p(md)"
- class="bg-blue-500" → class="bg(blue)"
- class="text-lg" → class="text(lg)"

CSS에서는 .클래스명\(\) 형식으로 정의하세요.
```

## 💡 필수 포함 요소

### 1. 레이아웃 시스템
```
- hbox(): horizontal flexbox
- vbox(): vertical flexbox
- hbox(center): 중앙 정렬
- hbox(pack): space-between
- gap(xs|sm|md|lg|xl): 간격
```

### 2. 타이포그래피
```
- display(): 대형 제목
- heading(), heading(h1), heading(h2)
- title(): 카드 제목
- body(), body(lg), body(sm)
- label(): 라벨 텍스트
- caption(): 설명 텍스트
```

### 3. 스타일링
```
- p(xs|sm|md|lg|xl): padding
- m(xs|sm|md|lg|xl): margin
- r(sm|md|lg|full): border-radius
- bg(color): background
- c(color): text color
```

### 4. 컴포넌트
```
- button(): 기본 버튼
- button(primary): 주요 버튼
- card(): 카드 컨테이너
- input(): 입력 필드
```

## 🚫 금지 사항

```
다음 패턴은 사용하지 마세요:
- 하이픈 기반: class="p-lg", class="bg-coral"
- BEM: class="card__title", class="button--primary"
- 일반 CSS: class="padding-large", class="background-coral"
```

## 📋 체크리스트 프롬프트

```
AdorableCSS 문법 체크리스트:
□ 모든 클래스명에 괄호가 있는가?
□ CSS에서 괄호를 이스케이프(\)했는가?
□ 하이픈(-) 대신 괄호()를 사용했는가?
□ 매개변수가 있을 때 괄호 안에 넣었는가? (예: gap(md))
□ 매개변수가 없어도 빈 괄호를 사용했는가? (예: hbox())
```

## 🎨 전체 예시 프롬프트

```
AdorableCSS 문법을 사용한 랜딩 페이지를 만들어주세요.

요구사항:
1. 순수 HTML/CSS만 사용
2. 모든 클래스는 괄호() 문법 사용
3. CSS에서는 \로 괄호 이스케이프
4. 다음 컴포넌트 포함:
   - 헤더: hbox(pack) 사용
   - 히어로 섹션: display() 타이포그래피
   - 카드 그리드: grid(), card() 컴포넌트
   - 버튼: button(), button(primary)

스타일:
- 색상: bg(coral), c(white), bg(blue)
- 간격: gap(md), p(lg), m(xl)
- 반응형: 미디어 쿼리로 처리

절대 하이픈 기반 클래스명을 사용하지 마세요.
```

## 🔍 검증 프롬프트

```
다음 코드가 AdorableCSS 문법을 올바르게 따르고 있는지 검증해주세요:
1. 모든 클래스명에 괄호가 있는가?
2. CSS 이스케이프가 올바른가?
3. 하이픈 기반 클래스가 없는가?

잘못된 부분이 있다면 수정해주세요.
```