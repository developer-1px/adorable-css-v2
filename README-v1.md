# AdorableCSS v1

> 🎨 Rapid On-Demand Atomic CSS framework

[![npm version](https://img.shields.io/npm/v/adorable-css.svg)](https://www.npmjs.com/package/adorable-css)
[![npm downloads](https://img.shields.io/npm/dm/adorable-css.svg)](https://www.npmjs.com/package/adorable-css)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 소개

AdorableCSS는 **Utility-First CSS Framework**로, 클래스명만으로 스타일을 즉시 적용할 수 있는 혁신적인 CSS 프레임워크입니다.

### 주요 특징

- ⚡️ **Zero Runtime** - 빌드 타임에 필요한 CSS만 생성
- 🎯 **Intuitive Syntax** - 직관적인 함수형 문법
- 📦 **Tiny Bundle** - 사용한 스타일만 포함
- 🔧 **Framework Agnostic** - React, Vue, Svelte 등 모든 프레임워크 지원
- 🎨 **Design System Ready** - 토큰 기반 디자인 시스템

## 빠른 시작

```bash
npm install adorable-css
```

```html
<div class="p(20) bg(#FFF) r(8) shadow(md)">
  <h1 class="font(24) bold c(#333)">Hello AdorableCSS!</h1>
  <p class="mt(10) c(#666)">Build beautiful UIs faster</p>
</div>
```

## 핵심 문법

### 1. 함수형 문법
```css
/* AdorableCSS */
p(20)              → padding: 20px
m(10/20)           → margin: 10px 20px
w(100%)            → width: 100%
h(50)              → height: 50px
```

### 2. 색상 시스템
```css
c(red)             → color: red
bg(#FF5733)        → background: #FF5733
c(red/50%)         → color: rgba(255, 0, 0, 0.5)
```

### 3. 반응형 디자인
```css
w(100%)~md         → width: 100% (mobile)
w(50%)@md          → width: 50% (desktop)
```

### 4. 상태 관리
```css
bg(blue):hover     → background: blue on hover
scale(1.1):hover   → transform: scale(1.1) on hover
```

## 왜 AdorableCSS인가?

### 1. **생산성 극대화**
클래스명을 고민할 필요 없이 바로 스타일 적용

### 2. **일관된 디자인**
토큰 기반으로 일관된 spacing, color, typography 유지

### 3. **최적화된 번들**
사용하지 않는 스타일은 번들에 포함되지 않음

### 4. **학습 곡선 최소화**
CSS 속성을 알면 바로 사용 가능

## 프로젝트 구조

```
adorable-css/
├── src/
│   ├── core/          # 핵심 파서 및 생성기
│   ├── rules/         # CSS 규칙 정의
│   ├── plugins/       # 플러그인 시스템
│   └── index.js       # 메인 진입점
├── dist/              # 빌드 결과물
└── examples/          # 예제 프로젝트
```

## 기여하기

AdorableCSS는 오픈소스 프로젝트입니다. 기여를 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 링크

- [Documentation](https://adorablecss.github.io)
- [GitHub](https://github.com/developer-1px/adorable-css)
- [NPM](https://www.npmjs.com/package/adorable-css)

---

Made with ❤️ by [developer-1px](https://github.com/developer-1px)