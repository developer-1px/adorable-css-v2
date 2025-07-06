# AdorableCSS 자주하는 실수들

AdorableCSS를 사용할 때 자주 발생하는 실수들을 정리한 문서입니다.

## 🔧 Transform 유틸리티 실수

### ❌ 잘못된 문법
```css
/* 잘못된 문법들 */
transform(scale-105)     /* 하이픈 사용 */
transform(scale-120)     /* 퍼센트를 하이픈으로 표현 */
scale-105                /* transform() 없이 사용 */
```

### ✅ 올바른 문법  
```css
/* 올바른 문법들 */
scale(1.05)              /* 소수점 사용 */
scale(1.2)               /* 소수점 사용 */
transform(scale(1.05))   /* transform() 안에 사용 */
hover:scale(1.05)        /* hover 상태에서 사용 */
```

### Transform 유틸리티 종류
- `scale(1.2)` - 크기 조절
- `rotate(45)` - 회전 (자동으로 deg 단위 추가)
- `translate-x(10px)` - X축 이동
- `translate-y(10px)` - Y축 이동
- `transform(scale(1.2)+rotate(45))` - 복합 transform

## 🏷️ 접근성 (Accessibility) 실수

### ❌ 잘못된 폼 라벨
```svelte
<!-- label이 control과 연결되지 않음 -->
<label>사용자 이름</label>
<input type="text" />

<!-- radio button 그룹에 잘못된 라벨 -->
<label>선택 옵션</label>
<input type="radio" name="option" value="a" />
<input type="radio" name="option" value="b" />
```

### ✅ 올바른 폼 라벨
```svelte
<!-- for와 id로 연결 -->
<label for="username">사용자 이름</label>
<input id="username" type="text" />

<!-- radio button 그룹은 fieldset/legend 사용 -->
<fieldset>
  <legend>선택 옵션</legend>
  <label><input type="radio" name="option" value="a" /> 옵션 A</label>
  <label><input type="radio" name="option" value="b" /> 옵션 B</label>
</fieldset>
```

## 🔄 Svelte Each 블록 실수

### ❌ key 없는 each 블록
```svelte
<!-- ESLint 오류: 키가 없음 -->
{#each items as item}
  <div>{item.name}</div>
{/each}

{#each Object.entries(data) as [key, value]}
  <div>{key}: {value}</div>
{/each}
```

### ✅ key가 있는 each 블록
```svelte
<!-- 고유한 키 사용 -->
{#each items as item (item.id)}
  <div>{item.name}</div>
{/each}

{#each Object.entries(data) as [key, value] (key)}
  <div>{key}: {value}</div>
{/each}
```

## 📏 크기 관련 실수

### ❌ 하드코딩된 크기
```css
/* 픽셀 하드코딩 */
w(200)    /* 200px 하드코딩 */
w(300)    /* 300px 하드코딩 */
h(48)     /* 48px 하드코딩 */
```

### ✅ 토큰 기반 크기
```css
/* AdorableCSS 토큰 사용 */
w(xs)     /* 동적 크기 토큰 */
w(sm)     /* 동적 크기 토큰 */
w(md)     /* 동적 크기 토큰 */
h(lg)     /* 동적 크기 토큰 */
```

## 🎨 스타일링 실수

### ❌ 하드코딩된 값들
```css
border-b(4/black)        /* 두께 하드코딩 */
focus:outline(0)         /* CSS 속성 직접 사용 */
transition-transform     /* CSS 속성 직접 사용 */
```

### ✅ AdorableCSS 토큰/유틸리티 사용
```css
border-b(sm/black)       /* 토큰 사용 */
outline(0)               /* AdorableCSS 유틸리티 */
transition(transform)    /* AdorableCSS 유틸리티 */
```

## 🚀 개발 팁

1. **토큰 우선**: 하드코딩 대신 항상 토큰(xs, sm, md, lg, xl, 2xl, 3xl...)을 사용하세요
2. **동적 계산**: AdorableCSS는 calc() 기반으로 동적으로 값을 계산합니다
3. **CSS 네이티브**: CSS 사양을 그대로 따르는 값들을 사용하세요 (scale(1.05), opacity(0.5) 등)
4. **접근성 고려**: 폼 요소는 항상 적절한 라벨과 연결하세요
5. **ESLint 규칙**: Svelte에서 each 블록에는 항상 고유한 키를 사용하세요

## 🔍 디버깅 방법

1. **개발자 도구**: 생성된 CSS를 확인하여 올바른 값이 적용되는지 확인
2. **토큰 확인**: `isToken()` 함수로 토큰이 올바르게 인식되는지 확인  
3. **빌드 로그**: 빌드 시 나오는 오류 메시지를 주의깊게 확인
4. **ESLint**: 코드 품질과 접근성 문제를 사전에 발견

이 문서는 AdorableCSS 사용 시 자주 발생하는 실수들을 정리한 것입니다. 새로운 실수 패턴이 발견되면 지속적으로 업데이트하겠습니다.