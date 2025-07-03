# 🔧 Troubleshooting Guide

> "왜 안 되지?" 싶을 때 보는 가이드

## 🚨 자주 발생하는 문제들

### 1. CSS가 적용되지 않아요

#### 증상
```html
<div class="hbox(pack)">적용 안 됨</div>
```

#### 원인 & 해결

**✅ AdorableCSS가 로드되었나요?**
```javascript
// 개발자 도구 콘솔에서 확인
console.log(window.AdorableCSS) // undefined면 문제!

// 해결: import 확인
import 'adorable-css'
```

**✅ 오타는 없나요?**
```html
<!-- ❌ 흔한 실수들 -->
<div class="hbox[pack]">     <!-- 대괄호 X -->
<div class="hbox (pack)">    <!-- 공백 X -->
<div class="h-box(pack)">    <!-- 하이픈 X -->

<!-- ✅ 올바른 문법 -->
<div class="hbox(pack)">
```

**✅ 캐시 문제일 수도**
- 브라우저 캐시 강제 새로고침: `Ctrl+Shift+R` (또는 `Cmd+Shift+R`)
- 개발자 도구 > Network > Disable cache 체크

### 2. 특정 클래스만 작동하지 않아요

#### 디버깅 방법

```javascript
// 1. 콘솔에서 직접 테스트
import { generateCSSFromAdorableCSS } from 'adorable-css'
console.log(generateCSSFromAdorableCSS('your-class'))

// 2. 파서 결과 확인
// 빈 문자열이 반환되면 파싱 실패
```

#### 흔한 원인들

**❌ 잘못된 값**
```html
<!-- 숫자 단위 -->
<div class="w(100px)">    <!-- ❌ px 붙이면 안 됨 -->
<div class="w(100)">      <!-- ✅ 숫자만 -->

<!-- 색상 -->
<div class="c(#blue)">    <!-- ❌ # + 이름 -->
<div class="c(blue)">     <!-- ✅ 이름만 -->
<div class="c(#0000ff)">  <!-- ✅ 또는 hex -->
```

**❌ 존재하지 않는 토큰**
```html
<div class="p(huge)">     <!-- ❌ huge 토큰 없음 -->
<div class="p(3xl)">      <!-- ✅ 정의된 토큰 -->
```

### 3. 그라데이션이 안 보여요

```html
<!-- ❌ 문법 오류 -->
<div class="bg(linear-gradient(red, blue))">
<div class="bg(red to blue)">

<!-- ✅ 올바른 문법 -->
<div class="bg(to-r/red..blue)">
<div class="bg(135deg/red..blue)">
```

### 4. 반응형이 작동하지 않아요

```html
<!-- ❌ 콜론 위치 주의 -->
<div class="md:w(full)">     <!-- 잘못된 위치 -->
<div class="md:(w(full))">   <!-- 괄호 불필요 -->

<!-- ✅ 올바른 사용 -->
<div class="w(full) md:w(auto)">
```

### 5. hover/focus 효과가 없어요

```html
<!-- ❌ 띄어쓰기 금지 -->
<div class="hover: bg(blue)">

<!-- ✅ 붙여쓰기 -->
<div class="hover:bg(blue)">

<!-- 💡 복잡한 상태는 개별로 -->
<div class="hover:bg(blue) hover:scale(105)">
```

## 🛠 디버깅 도구

### 1. 브라우저 개발자 도구

```javascript
// Elements 탭에서 계산된 스타일 확인
// 클래스가 있는데 스타일이 없다면 파싱 실패

// Console에서 직접 테스트
document.querySelector('.my-element').classList.add('hbox(pack)')
```

### 2. AdorableCSS DevTools (준비 중)

```javascript
// 파싱 결과 실시간 확인
AdorableCSS.debug = true

// 캐시 상태 확인
AdorableCSS.cache.stats()
```

### 3. VS Code Extension (준비 중)

- 자동 완성
- 문법 검증
- 호버 시 CSS 미리보기

## 💡 성능 문제

### 증상: 페이지가 느려요

**✅ 체크리스트**
1. 동적으로 너무 많은 클래스 생성?
   ```javascript
   // ❌ 루프에서 동적 생성
   items.map(i => `p(${i})`)
   
   // ✅ 정적 클래스 사용
   items.map(i => 'p(md)')
   ```

2. 프로덕션 빌드 사용 중?
   ```javascript
   // 개발 모드는 느림
   NODE_ENV=production npm run build
   ```

3. 캐시 크기 조정
   ```javascript
   AdorableCSS.configure({
     cache: { maxSize: 2000 }
   })
   ```

## 🆘 그래도 안 된다면?

### 1. 최소 재현 코드 만들기

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/adorable-css/dist/adorable.css">
</head>
<body>
  <div class="문제가되는클래스">
    테스트
  </div>
</body>
</html>
```

### 2. 도움 요청하기

**GitHub Issues**
```markdown
### 문제 설명
[무엇이 작동하지 않는지]

### 예상 동작
[어떻게 작동해야 하는지]

### 실제 동작
[실제로 어떻게 되는지]

### 재현 방법
1. ...
2. ...

### 환경
- AdorableCSS 버전: 
- 브라우저: 
- 프레임워크:
```

**Discord 커뮤니티** (준비 중)
- #help 채널에서 실시간 도움

### 3. 임시 해결책

```html
<!-- AdorableCSS가 파싱 못하면 인라인 스타일 -->
<div class="복잡한클래스" style="fallback-styles">

<!-- 또는 별도 CSS -->
<style>
  .my-custom-class {
    /* AdorableCSS와 함께 사용 가능 */
  }
</style>
```

## 📚 추가 리소스

- [일반적인 패턴과 해결책](/docs/cookbook)
- [성능 최적화 가이드](https://github.com/developer-1px/adorable-css-v2/blob/main/packages/homepage-kit/docs/guides/performance.md)
- [마이그레이션 가이드](/docs/migration-guide)
- [API Reference](/docs/reference)

---

**💬 Tip**: 문제를 해결했다면 다른 사람을 위해 공유해주세요!