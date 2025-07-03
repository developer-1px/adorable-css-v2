# Performance Guide

> AdorableCSS 성능 최적화 가이드

## 📊 성능 특성

### 번들 크기

| 항목 | 크기 | Gzipped |
|------|------|---------|
| Core Library | 250KB | 34KB |
| Runtime Only | 45KB | 12KB |
| CSS Output (평균) | 15-25KB | 3-5KB |

### 런타임 성능

- **파싱 속도**: ~0.1ms per class
- **LRU 캐시**: 1000개 항목 기본값
- **CSS 주입**: ~5ms (1000 클래스)

## 🚀 최적화 전략

### 1. 프로덕션 빌드

#### 정적 생성 (권장)

```javascript
// build.js
import { generateCSS } from 'adorable-css';
import { writeFileSync } from 'fs';

// HTML에서 클래스 추출
const classes = extractClassesFromHTML();

// CSS 생성
const css = generateCSS(classes);

// 파일로 저장
writeFileSync('./dist/adorable.css', css);
```

#### PostCSS 플러그인 (준비 중)

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    'adorable-css/postcss': {
      // PurgeCSS와 유사한 동작
      content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
      output: './dist/adorable.css'
    }
  }
};
```

### 2. 코드 분할

#### 레이어별 분할

```javascript
import { generateCSSByLayer } from 'adorable-css';

// 필수 레이어만 먼저 로드
const criticalCSS = generateCSSByLayer(['component', 'layout']);

// 나머지는 지연 로드
const utilityCSS = generateCSSByLayer(['utility', 'state']);
```

#### 라우트별 분할

```javascript
// pages/home.js
const homeClasses = ['hero', 'section', 'heading(xl)'];
const homeCSS = generateCSS(homeClasses);

// pages/about.js
const aboutClasses = ['container', 'prose', 'body(lg)'];
const aboutCSS = generateCSS(aboutClasses);
```

### 3. 캐싱 전략

#### 브라우저 캐싱

```html
<!-- 긴 캐시 기간 설정 -->
<link rel="stylesheet" href="/adorable.css?v=hash" 
      cache-control="public, max-age=31536000">
```

#### Service Worker

```javascript
// sw.js
self.addEventListener('fetch', event => {
  if (event.request.url.includes('adorable.css')) {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  }
});
```

### 4. 런타임 최적화

#### 캐시 크기 조정

```javascript
import { configure } from 'adorable-css';

configure({
  cache: {
    maxSize: 2000, // 기본값: 1000
    ttl: 3600000   // 1시간
  }
});
```

#### 선택적 기능 비활성화

```javascript
configure({
  features: {
    autoInject: false,    // 자동 주입 비활성화
    mutations: false,     // MutationObserver 비활성화
    preflight: false      // Reset CSS 비활성화
  }
});
```

## 📈 성능 측정

### 1. 번들 분석

```bash
# 번들 크기 분석
npx bundle-analyzer dist/

# 사용하지 않는 CSS 찾기
npx adorable-analyze --unused
```

### 2. 런타임 프로파일링

```javascript
// 성능 측정
console.time('adorable-parse');
const css = generateCSS(classes);
console.timeEnd('adorable-parse');

// 메모리 사용량
console.log('Cache size:', adorable.getCacheStats());
```

### 3. Chrome DevTools

1. **Performance 탭**
   - CSS 파싱 시간 측정
   - 레이아웃 리플로우 확인

2. **Coverage 탭**
   - 사용하지 않는 CSS 확인
   - 코드 커버리지 분석

## 🎯 모범 사례

### 1. 클래스 사용 최적화

```html
<!-- ❌ Bad: 중복된 유틸리티 -->
<div class="p(10) p(20) p(30)">

<!-- ✅ Good: 최종 값만 사용 -->
<div class="p(30)">

<!-- ❌ Bad: 불필요한 특이성 -->
<div class="hbox hbox(middle) hbox(center)">

<!-- ✅ Good: 간결한 표현 -->
<div class="hbox(pack)">
```

### 2. 컴포넌트 클래스 활용

```html
<!-- ❌ Bad: 반복적인 유틸리티 -->
<div class="bg(white) p(xl) r(lg) shadow(md) hover:shadow(lg) transition">
<div class="bg(white) p(xl) r(lg) shadow(md) hover:shadow(lg) transition">

<!-- ✅ Good: 컴포넌트 클래스 -->
<div class="card">
<div class="card">
```

### 3. 의미론적 클래스 우선

```html
<!-- ❌ Bad: 개별 스타일 -->
<h1 class="font(32) bold line-height(1.2) letter-spacing(-0.02)">

<!-- ✅ Good: 의미론적 클래스 -->
<h1 class="heading(xl)">
```

## 🔧 디버깅

### 성능 문제 진단

1. **느린 초기 로드**
   - 번들 크기 확인
   - 네트워크 waterfall 분석
   - Critical CSS 분리

2. **런타임 지연**
   - 캐시 히트율 확인
   - DOM 크기 최적화
   - MutationObserver 비활성화 고려

3. **메모리 누수**
   - 캐시 크기 제한
   - 이벤트 리스너 정리
   - 컴포넌트 언마운트 시 정리

### 성능 체크리스트

- [ ] 프로덕션 빌드 사용
- [ ] 정적 CSS 생성
- [ ] 적절한 캐싱 설정
- [ ] 불필요한 기능 비활성화
- [ ] 번들 크기 최적화
- [ ] Critical CSS 분리
- [ ] 지연 로딩 구현

## 📚 추가 리소스

