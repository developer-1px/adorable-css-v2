# 🔤 AdorableCSS Typography System

> 계층적이고 의미론적인 타이포그래피 컴포넌트 시스템

## 📋 개요

AdorableCSS의 타이포그래피 시스템은 **7가지 의미론적 컴포넌트**로 구성되어 있으며, 각각 명확한 용도와 시각적 계층을 가지고 있습니다.

### 타이포그래피 계층 구조

```
display  → 최대 시각적 임팩트 (히어로, 배너)
  ↓
heading  → 구조적 제목 (h1~h6)
  ↓
title    → 컴포넌트 제목 (카드, 모달)
  ↓
body     → 본문 텍스트 (읽기 최적화)
  ↓
label    → UI 레이블 (폼, 버튼)
  ↓
caption  → 보조 설명 (힌트, 타임스탬프)
  ↓
code     → 코드 스니펫 (인라인, 블록)
```

---

## 🎯 각 컴포넌트 상세

### 1. **display** - 최대 시각적 임팩트

**용도**: 히어로 섹션, 랜딩 페이지의 주요 메시지

```html
<!-- 기본 사용 -->
<h1 class="display">Big Bold Statement</h1>

<!-- 크기 변형 -->
<h1 class="display(xs)">작은 디스플레이</h1>    <!-- 3xl -->
<h1 class="display(hero)">히어로 텍스트</h1>    <!-- 동적 크기 -->
<h1 class="display(banner)">배너 텍스트</h1>    <!-- 더 큰 크기 -->
<h1 class="display(splash)">스플래시</h1>      <!-- 최대 크기 -->

<!-- 스타일 변형 -->
<h1 class="display(gradient)">그라디언트</h1>
<h1 class="display(rainbow)">무지개</h1>
<h1 class="display(chrome)">크롬 효과</h1>
<h1 class="display(outline)">외곽선</h1>
<h1 class="display(glow)">글로우</h1>
```

**특징**:
- 매우 큰 폰트 크기 (3xl ~ 9xl)
- 타이트한 line-height (1.0 ~ 1.2)
- 강한 letter-spacing (-1% ~ -4%)
- 호버 시 scale 애니메이션

---

### 2. **heading** - 구조적 제목

**용도**: 문서의 계층 구조를 나타내는 제목

```html
<!-- 시맨틱 HTML 스타일 -->
<h1 class="heading(h1)">제목 1</h1>
<h2 class="heading(h2)">제목 2</h2>
<h3 class="heading(h3)">제목 3</h3>
<h4 class="heading(h4)">제목 4</h4>
<h5 class="heading(h5)">제목 5</h5>
<h6 class="heading(h6)">제목 6</h6>

<!-- 색상 변형 -->
<h2 class="heading(h2/muted)">차분한 제목</h2>
<h2 class="heading(h2/primary)">주요 제목</h2>
<h2 class="heading(h2/gradient)">그라디언트 제목</h2>

<!-- 스타일 변형 -->
<h2 class="heading(h2/serif)">세리프체</h2>
<h2 class="heading(h2/mono)">고정폭</h2>
<h2 class="heading(h2/underline)">언더라인</h2>
```

**특징**:
- VitePress 스타일 타이포그래피
- h1~h6 각각 최적화된 크기와 굵기
- 색상 transition 효과
- 반응형 letter-spacing

---

### 3. **title** - 컴포넌트 제목

**용도**: 카드, 모달, 섹션 등 컴포넌트의 제목

```html
<!-- 기본 사용 -->
<h3 class="title">카드 제목</h3>

<!-- 컨텍스트별 크기 -->
<h3 class="title(card)">카드 제목</h3>      <!-- 자동 여백 -->
<h2 class="title(modal)">모달 제목</h2>     <!-- 중앙 정렬 -->
<h1 class="title(section)">섹션 제목</h1>   <!-- 큰 여백 -->

<!-- 텍스트 처리 -->
<h3 class="title(truncate)">아주 긴 제목이 잘립니다...</h3>
<h3 class="title(clamp)">여러 줄 제목이
2줄까지만 표시됩니다...</h3>

<!-- 스타일 -->
<h3 class="title(gradient)">그라디언트</h3>
<h3 class="title(underline)">언더라인</h3>
```

**특징**:
- 컴포넌트에 최적화된 크기
- 자동 truncation 옵션
- 컨텍스트별 자동 스타일링
- 적절한 기본 여백

---

### 4. **body** - 본문 텍스트

**용도**: 읽기에 최적화된 본문 콘텐츠

```html
<!-- 기본 사용 -->
<p class="body">일반 본문 텍스트</p>

<!-- 읽기 최적화 -->
<p class="body(article)">기사 본문</p>      <!-- max-width 제한 -->
<p class="body(prose)">긴 글 본문</p>       <!-- 향상된 타이포그래피 -->
<p class="body(compact)">컴팩트 본문</p>    <!-- 좁은 line-height -->
<p class="body(relaxed)">여유로운 본문</p>  <!-- 넓은 line-height -->

<!-- 스타일 변형 -->
<p class="body(lead)">리드 문단</p>         <!-- 강조된 첫 문단 -->
<p class="body(quote)">인용문</p>          <!-- 왼쪽 보더 + italic -->
<p class="body(highlight)">하이라이트</p>   <!-- 노란 배경 -->

<!-- 타입 변형 -->
<p class="body(serif)">세리프 본문</p>
<p class="body(mono)">코드 스타일</p>       <!-- 회색 배경 포함 -->
```

**특징**:
- 최적화된 line-height (1.6 ~ 1.8)
- 읽기 편한 색상 (gray-800)
- max-width 제한 옵션
- text-wrap(pretty) 옵션

---

### 5. **label** - UI 레이블

**용도**: 폼 레이블, 버튼 텍스트, 탭, 배지 등

```html
<!-- 폼 레이블 -->
<label class="label(input)">이메일 주소</label>
<label class="label(input/required)">필수 입력</label>
<label class="label(input/optional)">선택 사항</label>

<!-- UI 컴포넌트 -->
<span class="label(button)">버튼 텍스트</span>
<span class="label(tab)">탭 레이블</span>
<span class="label(badge)">NEW</span>        <!-- 자동 대문자 -->

<!-- 기능적 변형 -->
<span class="label(helper)">도움말 텍스트</span>
<span class="label(clickable)">클릭 가능</span>

<!-- 스타일 -->
<span class="label(uppercase)">대문자</span>
<span class="label(strong)">강조</span>
<span class="label(subtle)">약하게</span>
```

**특징**:
- UI에 최적화된 작은 크기
- 명확한 가독성 (semi-bold)
- 인터랙션 상태 지원
- 기능적 변형 (required, optional)

---

### 6. **caption** - 보조 설명

**용도**: 이미지 캡션, 테이블 설명, 폼 힌트, 타임스탬프

```html
<!-- 컨텍스트별 사용 -->
<figcaption class="caption(figure)">이미지 설명</figcaption>
<caption class="caption(table)">테이블 제목</caption>
<small class="caption(form)">8자 이상 입력하세요</small>
<time class="caption(timestamp)">2025-07-05</time>

<!-- 기능적 변형 -->
<span class="caption(error)">⚠️ 오류 메시지</span>
<span class="caption(help)">ℹ️ 도움말</span>
<span class="caption(note)">💡 참고사항</span>

<!-- 위치 변형 -->
<span class="caption(inline)">인라인 캡션</span>
<span class="caption(block)">블록 캡션</span>
<span class="caption(floating)">플로팅 캡션</span>
```

**특징**:
- 가장 작은 텍스트 크기
- 차분한 색상 (gray-500)
- 컨텍스트별 자동 위치
- 아이콘과 함께 사용 최적화

---

### 7. **code** - 코드 스니펫

**용도**: 인라인 코드, 코드 블록

```html
<!-- 인라인 코드 -->
<code class="code">const adorable = true</code>
<code class="code(inline)">npm install</code>

<!-- 코드 블록 -->
<pre class="code(block)">
function hello() {
  console.log("AdorableCSS");
}
</pre>

<!-- 색상 변형 -->
<code class="code(primary)">primary</code>
<code class="code(success)">success</code>
<code class="code(warning)">warning</code>
<code class="code(error)">error</code>

<!-- 크기 변형 -->
<code class="code(xs)">아주 작은</code>
<code class="code(lg)">큰 코드</code>
```

**특징**:
- 고정폭 폰트 (monospace)
- 배경색과 padding
- 인라인/블록 자동 스타일
- 색상 변형으로 의미 전달

---

## 🎨 조합 예제

### 기사 레이아웃
```html
<article class="vbox gap(xl)">
  <header class="vbox gap(md)">
    <h1 class="display(lg)">놀라운 발견</h1>
    <p class="body(lead)">과학자들이 새로운 사실을 발견했습니다.</p>
    <time class="caption(timestamp)">2025년 7월 5일</time>
  </header>
  
  <div class="body(prose) vbox gap(lg)">
    <p>본문 내용이 여기에...</p>
    <blockquote class="body(quote)">
      "인용문은 이렇게 표시됩니다"
    </blockquote>
  </div>
</article>
```

### 카드 컴포넌트
```html
<div class="vbox gap(md) p(lg) bg(white) r(lg)">
  <span class="label(badge/primary)">NEW</span>
  <h3 class="title(card)">카드 제목</h3>
  <p class="body(sm)">카드 설명 텍스트</p>
  <div class="caption(help)">
    ℹ️ 추가 정보가 필요하신가요?
  </div>
</div>
```

### 폼 요소
```html
<div class="vbox gap(sm)">
  <label class="label(input/required)">이메일</label>
  <input type="email" class="input">
  <span class="caption(form/error)">
    올바른 이메일 형식이 아닙니다
  </span>
</div>
```

---

## 📏 디자인 원칙

### 1. **의미론적 선택**
- 시각적 크기가 아닌 **의미**로 컴포넌트 선택
- `display`는 큰 제목이 아니라 **최대 임팩트**가 필요할 때
- `caption`은 작은 텍스트가 아니라 **보조 정보**일 때

### 2. **일관된 계층**
- 명확한 시각적 계층 구조 유지
- 각 레벨 간 충분한 대비
- 예측 가능한 크기 시스템

### 3. **컨텍스트 인식**
- 같은 컴포넌트도 사용 위치에 따라 다른 스타일
- `title(card)` vs `title(modal)` vs `title(section)`
- 자동으로 적절한 여백과 정렬 적용

### 4. **접근성 우선**
- 충분한 색상 대비
- 명확한 크기 차이
- 시맨틱 HTML 권장

---

## 🔧 고급 사용법

### 커스텀 조합
```html
<!-- 복합 스타일링 -->
<h1 class="display(lg/gradient) hover:scale(1.02) transition">
  호버 효과가 있는 그라디언트 디스플레이
</h1>

<!-- 반응형 타이포그래피 -->
<h2 class="heading(h3) md:heading(h2) lg:heading(h1)">
  화면 크기에 따라 변하는 제목
</h2>

<!-- 상태별 변화 -->
<span class="label(clickable) hover:label(strong)">
  호버 시 강조되는 레이블
</span>
```

### 다크 모드 대응
```html
<p class="body dark:body(light)">
  다크 모드에서 밝은 색상
</p>

<h2 class="heading(h2) dark:heading(h2/muted)">
  다크 모드에서 차분한 제목
</h2>
```

---

## 📋 Quick Reference

| 컴포넌트 | 기본 용도 | 주요 크기 | 특징 |
|---------|----------|----------|------|
| `display` | 히어로, 배너 | 3xl~9xl | 최대 임팩트, 애니메이션 |
| `heading` | 문서 구조 | h1~h6 | 시맨틱, VitePress 스타일 |
| `title` | 컴포넌트 제목 | sm~3xl | 컨텍스트 인식, truncate |
| `body` | 본문 콘텐츠 | xs~xl | 읽기 최적화, prose |
| `label` | UI 텍스트 | xs~lg | 기능적, 인터랙션 |
| `caption` | 보조 설명 | xs~lg | 차분한 색상, 작은 크기 |
| `code` | 코드 표시 | xs~lg | 고정폭, 배경색 |

---

**💡 팁**: 타이포그래피는 디자인의 목소리입니다. AdorableCSS의 타이포그래피 시스템을 통해 명확하고 일관된 시각적 언어를 구축하세요.