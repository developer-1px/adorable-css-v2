# AdorableCSS AI 가이드

## 🚫 절대 금지: NO MARGIN
```css
/* ❌ 절대 금지 */
margin, m(), mt(), mr(), mb(), ml()

/* ✅ 대신 사용 */
gap(md)    /* 요소 간 간격 */
p(md)      /* 내부 여백 */
```

## 📝 핵심 원칙

### 1. 컴포넌트 우선
```css
button(primary)     /* ✅ 컴포넌트 */
card(elevated)      /* ✅ 컴포넌트 */
bg(blue) p(md)      /* ❌ 유틸리티 조합 */
```

### 2. Figma 매핑
```css
hbox()          /* Figma 수평 레이아웃 */
vbox()          /* Figma 수직 레이아웃 */
w(fill)         /* Figma Fill */
w(hug)          /* Figma Hug */
gap(md)         /* Figma Gap */
```

### 3. CSS 네이티브 문법
```css
/* ✅ 표준 CSS */
scale(1.05)
opacity(0.5)
rotate(45deg)

/* ❌ TailwindCSS 비표준 */
scale-105
opacity-50
rotate-45
```

## 🎯 핵심 문법

**레이아웃**
```css
hbox()              /* 수평 */
hbox(center)        /* 가운데 정렬 */
hbox(pack)          /* 양쪽 정렬 */
vbox()              /* 수직 */
vbox(center)        /* 가운데 정렬 */
grid(2)             /* 2열 그리드 */
```

**크기 & 간격**
```css
w(fill)             /* width: 100% */
w(hug)              /* width: fit-content */
gap(md)             /* 간격 */
p(lg)               /* 패딩 */
```

**텍스트**
```css
text(lg)            /* 크기 */
text(lg/1.5)        /* 크기 + 줄높이 */
text(center)        /* 정렬 */
font(bold)          /* 굵기 */
```

**색상**
```css
bg(primary)         /* 배경 */
bg(primary.5)       /* 반투명 */
c(text)             /* 텍스트 색상 */
```

## 💡 실전 예시

**버튼**
```html
<button class="button(primary)">버튼</button>
```

**카드**
```html
<div class="card(elevated) vbox() gap(md)">
  <h3 class="heading(h3)">제목</h3>
  <p class="body()">내용</p>
</div>
```

**네비게이션**
```html
<nav class="hbox(pack) p(md)">
  <span class="label(large)">로고</span>
  <div class="hbox() gap(sm)">
    <a class="button(ghost)">메뉴</a>
    <a class="button(primary)">로그인</a>
  </div>
</nav>
```

## 🔧 작업 순서
1. 컴포넌트 확인
2. hbox/vbox/grid 레이아웃 
3. gap/padding 간격
4. 토큰 기반 스타일링
5. **NO MARGIN 재확인**

**기억: NO MARGIN + 컴포넌트 우선 + Figma 매핑**