## AdorableCSS 코드 단순성 리팩토링 보고서

### 개요

이 보고서는 `adorable-css` 패키지의 주요 코드베이스를 분석하여 코드의 단순성, 가독성 및 유지보수성을 평가하고 개선을 위한 리팩토링 제안을 제공합니다. 목표는 불필요한 복잡성을 줄이고, 명확한 책임 분리를 통해 코드를 더 이해하기 쉽게 만드는 것입니다.

### 분석 대상 파일

*   `packages/adorable-css/src/index.ts`
*   `packages/adorable-css/src/core/parser/parser.ts`
*   `packages/adorable-css/src/core/parser/generator.ts`
*   `packages/adorable-css/src/tokens/tokenRegistry.ts`
*   `packages/adorable-css/src/rules/rule-definitions.ts`

### 1. `packages/adorable-css/src/index.ts`

**평가:** 이 파일은 패키지의 주요 진입점 역할을 하며, 다양한 모듈을 내보내고 있습니다. 전반적으로 잘 구성되어 있으며, 각 모듈의 역할을 명확히 보여줍니다. `auto-inject`와 `colorPalette` 초기화가 임포트 시점에 발생하는 점은 명시적 호출로 변경하는 것을 고려해볼 수 있으나, 현재로서는 큰 복잡성을 야기하지 않습니다.

**개선 제안:**
*   **명시적 초기화**: `auto-inject` 및 `colorPalette`와 같은 전역 상태를 변경하는 작업은 임포트 시점보다는 명시적인 초기화 함수를 통해 수행하는 것이 좋습니다. 이는 사이드 이펙트를 줄이고 코드의 예측 가능성을 높입니다.
    *   `import "./design-system/colors/colors";` 및 `import "./core/runtime/auto-inject";` 부분을 제거하고, 필요한 경우 `configureAutoInject()`나 `initializeColorPalette()`와 같은 함수를 외부에 노출하여 사용자가 직접 호출하도록 변경합니다.

### 2. `packages/adorable-css/src/core/parser/parser.ts`

**평가:** 이 파일은 AdorableCSS 구문을 토큰화하고 파싱하는 핵심 로직을 담고 있습니다. `createParser`와 `createTokenizer`를 사용하여 파서 생성 로직을 추상화한 점은 좋습니다. 그러나 파싱 함수(`_parseAdorableCSS`) 내부의 재귀 하향식 파싱 로직은 다소 복잡하며, 특히 `options`, `many`, `many_sep` 등의 헬퍼 함수 사용이 중첩되어 가독성을 저해하는 부분이 있습니다. `CSSLiteral` 파싱 로직은 CSS 구문을 직접 파싱하는 방식으로, 유연성이 떨어지고 오류 처리 및 확장성이 제한될 수 있습니다.

**개선 제안:**
*   **파서 가독성 향상**:
    *   `SelectorList`, `SingleSelector`, `SimpleSelector` 등의 함수에서 `options`, `many`, `optional` 등의 중첩 사용을 줄이고, 각 파싱 규칙을 더 명확하게 분리하여 가독성을 높입니다.
    *   각 파싱 함수의 역할을 주석으로 명확히 설명합니다.
*   **`CSSLiteral` 파싱 개선**: 현재 `CSSLiteral`은 `{ prop: value; }` 형태의 CSS를 직접 파싱하고 있습니다. 이는 AdorableCSS의 핵심 목적(유틸리티 클래스 생성)과 다소 거리가 있으며, 일반적인 CSS 파서의 역할을 중복합니다.
    *   만약 인라인 CSS 리터럴을 지원해야 한다면, 이를 별도의 모듈로 분리하거나, 더 견고한 CSS 파싱 라이브러리를 활용하는 것을 고려합니다.
    *   혹은, AdorableCSS의 철학에 맞게 `CSSLiteral` 대신 유틸리티 클래스 조합을 유도하는 방향으로 가이드라인을 강화합니다.
*   **오류 처리 개선**: 현재 오류 발생 시 `console.warn`만 출력하고 빈 문자열을 반환하는데, 더 구체적인 오류 메시지나 오류 타입을 반환하여 디버깅을 용이하게 합니다.

### 3. `packages/adorable-css/src/core/parser/generator.ts`

**평가:** 이 파일은 파싱된 AdorableCSS 구문으로부터 실제 CSS를 생성하는 핵심 로직을 담당합니다. `_generateCSSFromAdorableCSS`와 `_generateCSS` 함수가 주요 역할을 합니다. `isStateClass` 및 `isResponsiveClass`를 통한 상태/반응형 클래스 분기 처리는 명확합니다. 그러나 `processClassesFromStringRule` 및 `resolveStringRule`의 재귀적 호출과 `allCSSResults`를 통한 결과 병합 로직은 다소 복잡합니다. 레이어 분류 로직(`if (/^(body|heading|...)/.test(className))`)은 하드코딩된 문자열 패턴에 의존하여 유지보수 및 확장이 어렵습니다.

**개선 제안:**
*   **`resolveStringRule` 단순화**: 재귀 호출과 `allCSSResults` 병합 로직을 더 명확한 단계로 분리하거나, 각 단계의 역할을 명확히 설명하는 주석을 추가합니다. 가능하면 재귀 깊이를 줄이거나 반복문으로 대체하는 방법을 모색합니다.
*   **레이어 분류 로직 개선**: 현재 하드코딩된 정규식 패턴으로 레이어를 분류하는 방식은 새로운 컴포넌트나 패턴이 추가될 때마다 코드를 수정해야 하는 단점이 있습니다.
    *   `rule-definitions.ts`의 `RULE_GROUPS` 또는 `STRING_RULE_GROUPS`에 레이어 정보를 추가하고, 이를 기반으로 동적으로 레이어를 결정하도록 변경합니다. 예를 들어, 각 규칙 정의에 `layer: 'component' | 'composition' | 'utility'` 속성을 추가하고, `getLayerFromPriority` 함수를 확장하여 이 정보를 활용합니다.
    *   `getLayerFromPriority` 함수는 현재 `RulePriority`에 따라 레이어를 결정하는데, 이는 우선순위와 레이어가 항상 일치하지 않을 수 있으므로, 명시적인 레이어 정의를 따르는 것이 더 정확합니다.
*   **`generateStateCSS` 및 `generateResponsiveCSS` 통합 또는 추상화**: 두 함수는 `extractCSSProperties`를 호출하고 CSS를 생성하는 유사한 패턴을 가지고 있습니다. 이 공통 로직을 추상화하여 중복을 줄일 수 있습니다.
*   **오류 처리 개선**: `console.warn` 대신 더 구조화된 로깅 또는 오류 처리 메커니즘을 도입합니다.

### 4. `packages/adorable-css/src/tokens/tokenRegistry.ts`

**평가:** 이 파일은 사용된 토큰을 추적하고 CSS 변수를 생성하는 역할을 합니다. `usedTokens` 객체를 통해 토큰을 관리하고, 각 카테고리별로 CSS 변수를 생성하는 헬퍼 함수(`_generateFontVars`, `_generateSpacingVars` 등)를 분리한 점은 좋습니다. `startTokenCollection` 및 `stopTokenCollection` 함수가 현재는 아무런 동작도 하지 않는다는 주석이 있는데, 이는 혼란을 줄 수 있으므로 제거하거나 실제 기능을 추가해야 합니다. `getTokenValue` 함수는 테스트 용도로 보이지만, 프로덕션 코드에서 직접 토큰 값을 계산하는 로직이 중복되어 있습니다.

**개선 제안:**
*   **불필요한 함수 제거 또는 명확화**: `startTokenCollection` 및 `stopTokenCollection` 함수가 현재 기능이 없다면 제거하거나, 향후 사용될 계획이 있다면 주석을 업데이트하여 명확히 합니다.
*   **`getTokenValue` 역할 재정의**: `getTokenValue`는 주로 테스트를 위한 것으로 보입니다. 만약 프로덕션 코드에서 토큰 값을 직접 계산해야 한다면, `generateUsedTokensCSS`에서 사용하는 계산 로직을 재사용하도록 리팩토링하여 중복을 제거합니다.
*   **토큰 등록 방식 개선**: `registerToken` 함수가 `getTokenVar` 내부에서 호출되는 방식은 암묵적인 동작이므로, 토큰 사용을 더 명시적으로 등록하는 방법을 고려할 수 있습니다. (예: `useToken('font', 'sm')`과 같은 명시적 호출)

### 5. `packages/adorable-css/src/rules/rule-definitions.ts`

**평가:** 이 파일은 모든 CSS 규칙 정의의 중앙 집중식 소스 역할을 합니다. `RULE_GROUPS`와 `STRING_RULE_GROUPS`를 통해 규칙을 그룹화하고 우선순위를 부여한 점은 잘 되어 있습니다. Figma 디자인 패널 순서에 따라 규칙을 분류한 점도 흥미롭습니다. 그러나 각 규칙 모듈을 개별적으로 임포트하는 방식은 규칙의 수가 많아질수록 임포트 목록이 길어지고 관리하기 어려워질 수 있습니다. `flattenRuleGroups` 헬퍼 함수는 유용합니다.

**개선 제안:**
*   **규칙 임포트 자동화 또는 간소화**:
    *   모든 규칙 파일을 수동으로 임포트하는 대신, 특정 디렉토리(`rules/layout`, `rules/style` 등)에서 규칙을 동적으로 로드하는 메커니즘을 고려할 수 있습니다. 이는 번들링 도구의 지원 여부에 따라 달라질 수 있습니다.
    *   또는, 각 규칙 그룹의 `index.ts` 파일에서 해당 그룹의 모든 규칙을 내보내고, `rule-definitions.ts`에서는 그룹 `index.ts` 파일만 임포트하도록 하여 임포트 목록을 간소화합니다.
*   **규칙 정의의 일관성**: `RULE_GROUPS`와 `STRING_RULE_GROUPS`가 분리되어 있는데, 가능하다면 단일화된 구조로 관리하여 규칙 조회 및 처리를 단순화할 수 있습니다. `type: 'css' | 'string'` 속성을 활용하여 단일 `RULE_GROUPS` 내에서 두 가지 유형의 규칙을 모두 관리하는 것을 고려합니다.
*   **주석 개선**: 각 규칙 그룹 및 서브그룹에 대한 설명 주석을 더 상세하게 추가하여 코드 이해도를 높입니다.

### 전반적인 단순성 및 리팩토링 방향

`adorable-css`는 CSS 유틸리티 클래스를 생성하는 강력한 도구이지만, 내부 구현의 일부 복잡성은 유지보수성을 저해할 수 있습니다. 전반적인 단순성 향상을 위한 리팩토링 방향은 다음과 같습니다.

1.  **책임 분리 및 모듈화 강화**: 각 파일/모듈이 단일 책임을 가지도록 명확히 분리합니다. 예를 들어, 파싱, CSS 생성, 토큰 관리, 규칙 정의 등 핵심 기능을 더 독립적인 모듈로 만듭니다.
2.  **명시적인 코드 흐름**: 암묵적인 동작(예: 임포트 시점의 전역 상태 변경)을 줄이고, 코드의 실행 흐름을 더 명시적으로 만듭니다.
3.  **데이터 기반 설정**: 하드코딩된 로직(예: 레이어 분류 정규식)을 데이터 기반 설정(예: 규칙 정의에 레이어 속성 추가)으로 변경하여 유연성과 확장성을 높입니다.
4.  **가독성 향상**: 복잡한 재귀나 중첩된 로직은 헬퍼 함수, 명확한 변수명, 상세한 주석 등을 통해 가독성을 높입니다.
5.  **견고한 오류 처리**: 개발자가 문제를 쉽게 진단할 수 있도록 더 구체적이고 유용한 오류 메시지를 제공합니다.

이 보고서의 제안 사항들을 통해 `adorable-css`의 코드베이스를 더욱 단순하고 유지보수하기 쉬운 형태로 발전시킬 수 있을 것입니다.
