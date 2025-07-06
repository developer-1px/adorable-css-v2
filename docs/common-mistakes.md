# AdorableCSS 자주하는 실수들: 원인과 해결책

AdorableCSS를 사용할 때 개발자들이 자주 겪는 실수들을 정리하고, 각 실수가 발생하는 원인과 올바른 해결책을 제시하여 더욱 효율적인 개발을 돕습니다.

## 🔧 Transform 유틸리티 실수: 왜 하이픈 대신 소수점을 사용해야 할까요?

AdorableCSS의 `transform` 유틸리티는 CSS `transform` 속성과 직접적으로 매핑됩니다. CSS `transform` 함수들은 인자로 숫자(소수점 포함)나 단위(px, %, deg 등)를 받으며, 하이픈으로 연결된 문자열을 직접적으로 해석하지 않습니다.

### ❌ 잘못된 문법: AdorableCSS의 의도를 벗어난 사용

```css
/* 잘못된 문법들 */
transform(scale-105)
transform(scale-120)
scale-105
```

### ✅ 올바른 문법: CSS Native 문법과 AdorableCSS의 조화

AdorableCSS의 `scale()` 유틸리티는 내부적으로 CSS `scale()` 함수를 생성합니다. 따라서 CSS `scale()` 함수가 요구하는 숫자(소수점 포함) 형태의 인자를 전달해야 합니다.

```css
/* 올바른 문법들 */
scale(1.05)
scale(1.2)
transform(scale(1.05))
hover:scale(1.05)
```

### Transform 유틸리티 종류 및 사용법

AdorableCSS는 다양한 `transform` 관련 유틸리티를 제공하여 복잡한 변형 효과를 쉽게 적용할 수 있도록 돕습니다.

-   `scale(1.2)`: 요소의 크기를 조절합니다. (예: 1.2배 확대)
-   `rotate(45)`: 요소를 회전시킵니다. (자동으로 `deg` 단위가 추가됩니다.)
-   `translate-x(10px)`: 요소를 X축으로 이동시킵니다.
-   `translate-y(10px)`: 요소를 Y축으로 이동시킵니다.
-   `transform(scale(1.2)+rotate(45))`: 여러 `transform` 함수를 `+`로 연결하여 복합 변형을 적용합니다.

## 🏷️ 접근성 (Accessibility) 실수: 사용자 경험의 기본

폼 요소의 라벨은 사용자, 특히 스크린 리더 사용자에게 해당 입력 필드의 목적을 명확히 전달하는 중요한 역할을 합니다. 라벨과 입력 필드를 올바르게 연결하지 않으면 접근성이 크게 저하됩니다.

### ❌ 잘못된 폼 라벨: 정보의 단절

```svelte
<!-- label이 control과 연결되지 않음 -->
<label>사용자 이름</label>
<input type="text" />

<!-- radio button 그룹에 잘못된 라벨 -->
<label>선택 옵션</label>
<input type="radio" name="option" value="a" />
<input type="radio" name="option" value="b" />
```

### ✅ 올바른 폼 라벨: 명확한 정보 전달과 접근성 향상

`for` 속성과 `id` 속성을 사용하여 라벨과 입력 필드를 명시적으로 연결하거나, `fieldset`과 `legend`를 사용하여 관련 폼 요소들을 그룹화해야 합니다.

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

## 🔄 Svelte Each 블록 실수: 성능과 안정성의 핵심

Svelte의 `#each` 블록에서 `key`를 사용하지 않으면, 리스트의 항목이 변경될 때 Svelte가 어떤 항목이 추가, 제거, 또는 순서가 변경되었는지 효율적으로 추적하기 어렵습니다. 이는 불필요한 DOM 조작으로 이어져 성능 저하를 유발하고, 때로는 예상치 못한 UI 버그를 발생시킬 수 있습니다. 

### ❌ 잘못된 each 블록: 비효율적인 DOM 업데이트

```svelte
<!-- ESLint 오류: 키가 없음 -->
{#each items as item}
  <div>{item.name}</div>
{/each}

{#each Object.entries(data) as [key, value]}
  <div>{key}: {value}</div>
{/each}
```

### ✅ key가 있는 each 블록: 최적화된 DOM 관리

고유한 `key`를 제공하면 Svelte는 리스트 항목의 변화를 정확히 감지하고, 최소한의 DOM 조작으로 UI를 업데이트하여 성능을 최적화하고 안정성을 높입니다.

```svelte
<!-- 고유한 키 사용 -->
{#each items as item (item.id)}
  <div>{item.name}</div>
{/each}

{#each Object.entries(data) as [key, value] (key)}
  <div>{key}: {value}</div>
{/each}
```

## 📏 크기 관련 실수: 디자인 시스템의 일관성 유지

AdorableCSS는 수학적 스케일 시스템을 기반으로 디자인 토큰을 제공합니다. 픽셀 값을 직접 하드코딩하는 것은 이러한 디자인 시스템의 일관성을 깨뜨리고, 추후 디자인 변경 시 모든 값을 수동으로 수정해야 하는 비효율성을 초래합니다.

### ❌ 하드코딩된 크기: 깨지기 쉬운 디자인 일관성

```css
/* 픽셀 하드코딩 */
w(200)
w(300)
h(48)
```

### ✅ 토큰 기반 크기: 유연하고 확장 가능한 디자인

AdorableCSS의 토큰을 사용하면 디자인 시스템의 스케일에 맞춰 크기가 동적으로 계산됩니다. 이는 디자인 일관성을 유지하고, 전역적인 디자인 변경 시에도 코드 수정 없이 자동으로 반영되도록 합니다.

```css
/* AdorableCSS 토큰 사용 */
w(xs)
w(sm)
w(md)
h(lg)
```

## 🎨 스타일링 실수: AdorableCSS의 강력함 활용하기

AdorableCSS는 CSS 속성을 직접 사용하는 대신, 추상화된 유틸리티와 토큰을 통해 스타일링을 권장합니다. 이는 코드의 가독성을 높이고, 디자인 시스템과의 연동을 강화하며, 불필요한 CSS 속성 중복을 줄여줍니다.

### ❌ 하드코딩된 값들: AdorableCSS의 장점을 놓치다

```css
border-b(4/black)
focus:outline(0)
transition-transform
```

### ✅ AdorableCSS 토큰/유틸리티 사용: 간결하고 강력한 스타일링

AdorableCSS의 유틸리티와 토큰을 사용하면 코드가 더 간결해지고, 디자인 시스템의 변경 사항이 자동으로 반영되며, CSS 파일 크기를 최적화할 수 있습니다.

```css
border-b(sm/black)
outline(0)
transition(transform)
```

## 🚀 개발 팁: AdorableCSS를 100% 활용하는 방법

1.  **토큰 우선**: 픽셀 값이나 하드코딩된 문자열 대신 항상 AdorableCSS 토큰(xs, sm, md, lg, xl, 2xl, 3xl...)을 사용하세요. 이는 디자인 일관성을 유지하고 유지보수를 용이하게 합니다.
2.  **동적 계산**: AdorableCSS는 `calc()` 기반으로 동적으로 값을 계산합니다. 이는 다양한 화면 크기와 해상도에 유연하게 대응하는 반응형 디자인을 가능하게 합니다.
3.  **CSS 네이티브**: AdorableCSS는 CSS 사양을 그대로 따르는 값들을 사용합니다. `scale(1.05)`, `opacity(0.5)`와 같이 CSS Native 문법을 이해하고 활용하면 AdorableCSS의 강력함을 온전히 사용할 수 있습니다.
4.  **접근성 고려**: 폼 요소는 항상 `for`와 `id` 속성을 사용하여 적절한 라벨과 연결하거나, `fieldset`과 `legend`로 그룹화하여 모든 사용자가 웹 콘텐츠에 동등하게 접근할 수 있도록 합니다.
5.  **ESLint 규칙**: Svelte에서 `#each` 블록에는 항상 고유한 `key`를 사용하세요. 이는 리스트 렌더링 성능을 최적화하고 UI 버그를 방지하는 데 필수적입니다.

## 🔍 디버깅 방법: 문제 해결을 위한 도구

1.  **개발자 도구**: 브라우저의 개발자 도구를 사용하여 생성된 CSS를 확인하고, 원하는 스타일이 올바른 우선순위로 적용되는지 검사합니다.
2.  **토큰 확인**: `isToken()` 함수를 사용하여 특정 값이 AdorableCSS 토큰으로 올바르게 인식되는지 확인합니다.
3.  **빌드 로그**: 프로젝트 빌드 시 출력되는 로그 메시지를 주의 깊게 확인하여 잠재적인 오류나 경고를 파악합니다.
4.  **ESLint**: 코드 에디터의 ESLint 경고 및 오류를 통해 코드 품질과 잠재적인 접근성 문제를 사전에 발견하고 수정합니다.

이 문서는 AdorableCSS 사용 시 자주 발생하는 실수들을 정리하고, 그 원인과 해결책을 제시하여 여러분의 개발 경험을 향상시키는 데 목적이 있습니다.