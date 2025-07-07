# AdorableCSS v2

**Figma와 코드의 완벽한 동기화를 위한 차세대 CSS 프레임워크**

<div align="center">
  <img src="https://raw.githubusercontent.com/adorablecss/adorable-css/main/logo.svg" alt="AdorableCSS Logo" width="200" />
  
  [![npm version](https://img.shields.io/npm/v/adorable-css.svg)](https://www.npmjs.com/package/adorable-css)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
</div>

## 🎯 AdorableCSS란?

AdorableCSS는 **Figma-First CSS**를 지향하는 CSS 프레임워크입니다. Figma 디자인과 웹 코드 간의 완벽한 양방향 동기화와 디자인 시스템의 일관성을 코드 레벨에서 보장합니다.

### 핵심 철학

```css
/* 🎨 Figma에서 디자인한 그대로 */
hbox(pack) gap(16) p(24) r(12) bg(white) shadow(md)

/* 🔄 코드에서 수정하면 Figma에 반영 */
/* 🚀 디자인 토큰 자동 동기화 */
```

## ✨ 왜 AdorableCSS인가?

### 1. **Figma 네이티브 문법**
```css
/* Figma Auto Layout 그대로 */
hbox(between+middle)  /* 수평 정렬, 양끝 정렬 + 중앙 정렬 */
vbox(center+fill)     /* 수직 정렬, 중앙 정렬 + 전체 너비 */

/* Figma 크기 옵션 그대로 */
w(fill)   /* Fill container */
w(hug)    /* Hug contents */
w(320)    /* Fixed width */
```

### 2. **포괄적인 디자인 토큰 시스템**
```css
/* 15개 토큰 카테고리 - 모든 디자인 결정을 커버 */
p(lg)        → 16px    /* spacing 토큰 */
size(lg)     → 48px    /* size 토큰 */
w(lg)        → 512px   /* width 토큰 */
shadow(lg)   → 깊은 그림자
r(lg)        → 12px 라운드
```

### 3. **타입 세이프 & 자동 완성**
```typescript
// TypeScript 완벽 지원
<div className={css`
  ${hbox('center')}     // ✅ 자동 완성
  ${p('lg')}            // ✅ 타입 체크
  ${bg('primary')}      // ✅ 토큰 검증
`} />
```

### 4. **제로 런타임 오버헤드**
- 빌드 타임에 순수 CSS로 변환
- 불필요한 JavaScript 없음
- 초경량 번들 사이즈

## 🚀 빠른 시작

### 설치

```bash
# npm
npm install adorable-css

# yarn  
yarn add adorable-css

# pnpm
pnpm add adorable-css
```

### 기본 사용법

```html
<!-- CDN -->
<link rel="stylesheet" href="https://unpkg.com/adorable-css/dist/adorable.css">

<!-- HTML에서 바로 사용 -->
<div class="hbox(pack) gap(16) p(24) r(12) bg(white) shadow(md)">
  <img class="size(48) r(full)" src="avatar.jpg" />
  <div class="vbox gap(4)">
    <h3 class="text(title/lg) c(gray-900)">김철수</h3>
    <p class="text(body/sm) c(gray-600)">프론트엔드 개발자</p>
  </div>
</div>
```

### React/Next.js

```jsx
import 'adorable-css'

function Card({ title, description }) {
  return (
    <div className="vbox w(fill) p(xl) r(lg) bg(white) shadow(md) gap(lg)">
      <h3 className="text(title/lg) c(gray-900)">{title}</h3>
      <p className="text(body/base) c(gray-600)">{description}</p>
      <button className="hbox(pack) h(md) px(lg) r(md) bg(primary) c(white) hover:bg(primary-600)">
        자세히 보기
      </button>
    </div>
  )
}
```

## 📚 핵심 기능

### 레이아웃 - Figma Auto Layout

```css
/* Flexbox 레이아웃 */
hbox              /* 수평 배치 */
vbox              /* 수직 배치 */
hbox(pack)      /* 중앙 정렬 */
vbox(between)     /* 양끝 정렬 */

/* 간격 */
gap(16)           /* 아이템 간격 */
gap(16/24)        /* 행/열 간격 다르게 */
```

### 크기 - Figma 크기 모드

```css
/* 너비 */
w(fill)           /* 컨테이너 채우기 */
w(hug)            /* 콘텐츠에 맞추기 */
w(320)            /* 고정 너비 */
w(sm)             /* 토큰 사용 */

/* 제약 조건 */
w(320..)          /* 최소 너비 */
w(..768)          /* 최대 너비 */
w(320..768)       /* 최소-최대 */
```

### 타이포그래피 - 역할 기반 시스템

```css
/* 6가지 타이포그래피 역할 */
text(display/lg)  /* 디스플레이 텍스트 */
text(heading/h2)  /* 제목 */
text(title/lg)    /* UI 타이틀 */
text(body/base)   /* 본문 */
text(label/sm)    /* 레이블 */
text(caption/xs)  /* 캡션 */

/* 통합 문법 */
text(lg/1.5/-2%)  /* 크기/행간/자간 */
```

### 색상 - OKLCH 기반

```css
/* 색상 팔레트 */
c(gray-900)       /* 텍스트 색상 */
bg(primary)       /* 배경색 */
border(gray-200)  /* 테두리 색상 */

/* 투명도 */
c(black.5)        /* 50% 투명도 */
bg(white.8)       /* 80% 투명도 */

/* 그라디언트 */
bg(primary..accent/45deg)
```

### 효과

```css
/* 그림자 */
shadow(sm)        /* 작은 그림자 */
shadow(md)        /* 중간 그림자 */
shadow(lg)        /* 큰 그림자 */

/* 라운드 */
r(8)              /* 8px 라운드 */
r(lg)             /* 토큰 사용 */
r(full)           /* 완전히 둥글게 */

/* 기타 효과 */
blur(8)           /* 블러 효과 */
opacity(50)       /* 투명도 */
```

### 반응형 디자인

```css
/* 브레이크포인트 접두사 */
md:w(768)         /* 태블릿 이상 */
lg:grid(3)        /* 데스크톱 이상 */
xl:p(48)          /* 와이드 스크린 */

/* 모바일 우선 */
w(full) md:w(768) lg:w(1024)
```

### 상태 관리

```css
/* 의사 클래스 */
hover:bg(gray-100)
focus:ring(2/primary)
active:scale(0.95)

/* 다크 모드 */
dark:bg(gray-900)
dark:c(white)
```

## 🎨 실제 사용 예제

### 카드 컴포넌트

```html
<article class="vbox w(fill) bg(white) r(xl) shadow(lg) clip">
  <img class="w(fill) h(200) object(cover)" src="..." />
  <div class="vbox p(xl) gap(md)">
    <h3 class="text(title/lg) c(gray-900)">카드 제목</h3>
    <p class="text(body/base) c(gray-600) line-clamp(3)">
      카드 설명 텍스트가 들어갑니다...
    </p>
    <button class="hbox(pack) w(hug) px(lg) py(sm) r(md) bg(primary) c(white) hover:bg(primary-600) transition">
      더보기
    </button>
  </div>
</article>
```

### 네비게이션 바

```html
<nav class="hbox(between+middle) w(fill) h(64) px(xl) bg(white) shadow(sm)">
  <a class="text(title/lg) c(gray-900) bold">로고</a>
  <ul class="hbox gap(xl) hidden md:flex">
    <li><a class="c(gray-600) hover:c(primary) transition">홈</a></li>
    <li><a class="c(gray-600) hover:c(primary) transition">소개</a></li>
    <li><a class="c(gray-600) hover:c(primary) transition">문의</a></li>
  </ul>
  <button class="size(40) r(md) bg(primary) c(white)">
    시작하기
  </button>
</nav>
```

## 🛠 고급 기능

### 커스텀 토큰 정의

```javascript
import { defineTokens } from 'adorable-css'

defineTokens({
  colors: {
    brand: '#FF6B6B',
    'brand-dark': '#FF5252'
  },
  spacing: {
    'section': '80px'
  }
})
```

### 플러그인 시스템

```javascript
import { addPlugin } from 'adorable-css'

addPlugin({
  name: 'glassmorphism',
  rules: {
    glass: (value) => ({
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    })
  }
})
```

## 📖 전체 문서

상세한 문서는 [adorable-css.com](https://adorable-css.com)에서 확인하세요:

- [시작하기](https://adorable-css.com/docs/getting-started)
- [레이아웃 시스템](https://adorable-css.com/docs/layout)
- [타이포그래피](https://adorable-css.com/docs/typography)
- [디자인 토큰](https://adorable-css.com/docs/tokens)
- [Figma 플러그인](https://adorable-css.com/docs/figma-plugin)

## 🤝 기여하기

AdorableCSS는 오픈소스 프로젝트입니다. 기여를 환영합니다!

1. 이슈를 생성하여 아이디어를 공유하세요
2. PR을 제출하여 개선사항을 제안하세요
3. 문서 개선에 참여하세요
4. 버그를 발견하면 제보해주세요

## 📄 라이선스

MIT License - 자유롭게 사용하세요!

---

<div align="center">
  <strong>Figma와 코드의 간극을 없애는 AdorableCSS v2</strong><br>
  디자인 시스템의 새로운 패러다임을 경험하세요
</div>