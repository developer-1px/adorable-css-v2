## AdorableCSS 단순성 리팩토링 Task 보고서 (세분화)

### 1. 개요

이 보고서는 `adorable-css` 패키지의 코드 단순성, 가독성 및 유지보수성을 향상시키기 위한 구체적이고 세분화된 리팩토링 Task를 정의합니다. 각 Task는 독립적으로 수행 가능하며, 변경의 영향을 최소화하고 점진적인 개선을 목표로 합니다.

### 2. 리팩토링 원칙

*   **점진적 변경**: 각 Task는 작고 관리 가능한 단위로 수행됩니다.
*   **테스트 우선**: 변경 전 관련 테스트를 확인하고, 변경 후에는 반드시 테스트를 실행하여 기능 검증을 수행합니다.
*   **버전 관리**: 각 주요 Task 완료 후에는 명확한 커밋 메시지와 함께 변경 사항을 커밋합니다.

### 3. Task 상세 내역

---

#### **Task 1: `packages/adorable-css/src/index.ts` - 암묵적 초기화 제거**

**목표**: 임포트 시점에 발생하는 전역 상태 변경을 명시적 초기화 함수 호출로 전환하여 사이드 이펙트를 제거합니다.

*   **Task 1.1: 암묵적 임포트 제거**
    *   **목표**: `index.ts`에서 전역 상태를 변경하는 암묵적 임포트를 제거합니다.
    *   **위치**: `packages/adorable-css/src/index.ts`
    *   **액션**: 다음 두 줄을 삭제합니다.
        ```typescript
        import "./design-system/colors/colors";
        import "./core/runtime/auto-inject";
        ```
    *   **검증**: 파일에서 해당 임포트가 제거되었는지 확인합니다. (이 단계에서는 컴파일 오류가 발생할 수 있습니다. 다음 Task에서 해결됩니다.)

*   **Task 1.2: `colorPalette` 명시적 초기화 함수 생성**
    *   **목표**: `colorPalette` 초기화 로직을 명시적인 함수로 래핑하고 내보냅니다.
    *   **위치**: `packages/adorable-css/src/design-system/colors/colors.ts`
    *   **액션**: 
        1.  `colorPalette` 초기화 로직(예: `colorPalette` 변수 선언 및 초기화)을 `initializeColorPalette()`와 같은 함수 내부에 배치합니다.
        2.  `initializeColorPalette()` 함수를 `export` 합니다.
        3.  `index.ts`에서 `initializeColorPalette`를 임포트하고, 필요에 따라 호출하도록 변경합니다. (이 부분은 패키지 외부 사용 코드에 영향을 미치므로, 당장은 `index.ts` 내에서 호출하는 것으로 처리하고, 향후 사용자가 직접 호출하도록 가이드라인을 제공할 수 있습니다.)
    *   **검증**: `colorPalette`가 정상적으로 초기화되는지 확인하는 테스트를 실행하거나, 관련 기능을 사용하는 애플리케이션에서 색상이 올바르게 적용되는지 확인합니다.

*   **Task 1.3: `auto-inject` 명시적 초기화 함수 생성**
    *   **목표**: `auto-inject` 로직을 명시적인 함수로 래핑하고 내보냅니다.
    *   **위치**: `packages/adorable-css/src/core/runtime/auto-inject.ts`
    *   **액션**: 
        1.  `auto-inject` 관련 로직(예: DOMContentLoaded 이벤트 리스너 등록)을 `configureAutoInject()`와 같은 함수 내부에 배치합니다.
        2.  `configureAutoInject()` 함수를 `export` 합니다.
        3.  `index.ts`에서 `configureAutoInject`를 임포트하고, 필요에 따라 호출하도록 변경합니다.
    *   **검증**: `auto-inject` 기능이 정상적으로 동작하는지 확인하는 테스트를 실행하거나, 관련 기능을 사용하는 애플리케이션에서 CSS가 자동으로 주입되는지 확인합니다.

---

#### **Task 2: `packages/adorable-css/src/core/parser/parser.ts` - 파서 가독성 향상 및 오류 처리 개선**

**목표**: 파싱 로직의 가독성을 높이고, 오류 발생 시 더 유용한 정보를 제공합니다.

*   **Task 2.1: 파싱 규칙 함수 가독성 개선 (일반)**
    *   **목표**: `_parseAdorableCSS` 내의 파싱 규칙 함수들(`SelectorList`, `SingleSelector`, `SimpleSelector`, `Range`, `FunctionCall`, `Arg`, `KeyValue`, `Expr`, `Term`, `CSSFunc`)의 가독성을 높입니다.
    *   **위치**: `packages/adorable-css/src/core/parser/parser.ts` 내의 각 파싱 함수.
    *   **액션**: 
        1.  각 파싱 함수 내에서 `options` 체인이 너무 길거나 중첩된 부분을 식별합니다.
        2.  이를 `if/else if` 구조로 재구성하거나, 더 작은 내부 헬퍼 함수로 분리하여 각 분기의 의미를 명확히 합니다.
        3.  각 `consume` 또는 `options` 블록 위에 해당 코드 블록이 어떤 구문 요소를 파싱하는지 설명하는 간결한 주석을 추가합니다.
    *   **검증**: 파서의 기존 테스트 케이스가 모두 통과하는지 확인합니다.

*   **Task 2.2: `CSSLiteral` 파싱 재고 및 처리**
    *   **목표**: `CSSLiteral` 파싱 로직의 필요성을 재평가하고, 적절한 조치를 취합니다.
    *   **위치**: `packages/adorable-css/src/core/parser/parser.ts`의 `CSSLiteral` 함수.
    *   **액션**: 
        1.  **옵션 A (제거):** 만약 인라인 CSS 리터럴 지원이 AdorableCSS의 핵심 목적과 맞지 않다고 판단되면, `CSSLiteral` 함수를 완전히 제거하고, 이를 참조하는 모든 코드(예: `SimpleSelector`의 `options` 체인)를 업데이트합니다.
        2.  **옵션 B (분리/외부 라이브러리):** 만약 유지가 필요하다면, `CSSLiteral` 함수를 별도의 파일(예: `packages/adorable-css/src/core/parser/cssLiteralParser.ts`)로 분리하고, `parser.ts`에서는 이를 임포트하여 사용합니다. 장기적으로는 더 견고한 외부 CSS 파싱 라이브러리 통합을 고려합니다.
    *   **검증**: `CSSLiteral` 관련 기능이 제거되었거나, 분리 후에도 기존 기능이 정상 동작하는지 확인합니다.

*   **Task 2.3: 사용자 정의 `ParseError` 클래스 구현**
    *   **목표**: 파싱 오류 발생 시 더 구체적인 정보를 담는 사용자 정의 오류 클래스를 만듭니다.
    *   **위치**: `packages/adorable-css/src/core/errors/ParseError.ts` (새 파일 생성)
    *   **액션**: 
        1.  `ParseError`라는 새 클래스를 정의하고 `Error`를 상속받습니다.
        2.  생성자에 `message`, `inputString`, `position` (줄 번호, 컬럼 등)과 같은 속성을 포함하도록 합니다.
    *   **검증**: 파일이 성공적으로 생성되고, 다른 파일에서 임포트 가능한지 확인합니다.

*   **Task 2.4: `_parseAdorableCSS`에 `ParseError` 적용**
    *   **목표**: `_parseAdorableCSS` 함수가 오류 발생 시 `ParseError`를 throw하도록 변경합니다.
    *   **위치**: `packages/adorable-css/src/core/parser/parser.ts`의 `_parseAdorableCSS` 함수.
    *   **액션**: 
        1.  `ParseError`를 임포트합니다.
        2.  `try-catch` 블록 내에서 `console.warn` 대신 `throw new ParseError(...)`를 사용하여 더 상세한 오류 정보를 포함하도록 합니다.
    *   **검증**: 유효하지 않은 AdorableCSS 입력에 대해 `_parseAdorableCSS`가 `ParseError`를 throw하는지, 그리고 오류 메시지에 유용한 정보가 포함되어 있는지 테스트합니다.

---

#### **Task 3: `packages/adorable-css/src/core/parser/generator.ts` - 레이어 분류 로직 개선 및 중복 제거**

**목표**: 하드코딩된 레이어 분류 로직을 데이터 기반으로 전환하고, 중복 코드를 제거하여 유지보수성을 높입니다.

*   **Task 3.1: `RuleGroupDefinition` 인터페이스에 `layer` 속성 추가**
    *   **목표**: 규칙 그룹 정의에 레이어 정보를 명시할 수 있도록 인터페이스를 확장합니다.
    *   **위치**: `packages/adorable-css/src/rules/rule-definitions.ts`
    *   **액션**: `RuleGroupDefinition` 인터페이스에 `layer?: 'base' | 'components' | 'composition' | 'utilities';` 속성을 추가합니다.
    *   **검증**: 타입스크립트 컴파일 오류가 없는지 확인합니다.

*   **Task 3.2: 규칙 그룹에 `layer` 속성 할당**
    *   **목표**: `rule-definitions.ts`의 각 규칙 그룹에 적절한 `layer` 속성을 할당합니다.
    *   **위치**: `packages/adorable-css/src/rules/rule-definitions.ts`의 `RULE_GROUPS` 객체.
    *   **액션**: 각 최상위 규칙 그룹(예: `text`, `position`, `autoLayout`, `visual`, `css`, `interaction`, `utilities`, `components`)에 적절한 `layer` 값을 추가합니다. (예: `components` 그룹에는 `layer: 'components'`, `autoLayout`에는 `layer: 'composition'` 등)
    *   **검증**: `rule-definitions.ts` 파일에 타입 오류가 없는지 확인합니다.

*   **Task 3.3: `_generateCSS` 레이어 분류 로직 수정**
    *   **목표**: `_generateCSS` 함수가 하드코딩된 정규식 대신 규칙 정의의 `layer` 속성을 사용하도록 변경합니다.
    *   **위치**: `packages/adorable-css/src/core/parser/generator.ts`의 `_generateCSS` 함수.
    *   **액션**: 
        1.  `uniqueClasses.forEach` 루프 내에서 `getRuleWithPriority(ruleName)`를 사용하여 해당 클래스에 대한 규칙 정보를 가져옵니다.
        2.  가져온 규칙 정보에 `layer` 속성이 있다면, 해당 `layer`를 사용하여 CSS를 분류합니다.
        3.  기존의 하드코딩된 정규식(`if (/^(body|heading|...)/.test(className))`)을 제거합니다.
        4.  `getLayerFromPriority` 함수를 업데이트하여, 규칙 정의에 `layer` 속성이 명시되어 있다면 해당 값을 반환하고, 그렇지 않다면 기존의 `RulePriority` 기반 로직을 사용하도록 합니다.
    *   **검증**: `_generateCSS` 함수를 사용하는 테스트 케이스가 모두 통과하는지 확인하고, 생성된 CSS 파일에서 `@layer` 규칙이 올바르게 적용되는지 수동으로 확인합니다.

*   **Task 3.4: `resolveStringRule` 로직 단순화**
    *   **목표**: `resolveStringRule` 함수 내의 재귀 호출 및 결과 병합 로직의 가독성을 높입니다.
    *   **위치**: `packages/adorable-css/src/core/parser/generator.ts`의 `resolveStringRule` 함수.
    *   **액션**: 
        1.  `processClassesFromStringRule` 함수를 `resolveStringRule` 내부에서 직접 호출하는 대신, `result` 배열을 처리하는 별도의 헬퍼 함수를 추출합니다.
        2.  `allCSSResults`에 결과를 누적하는 대신, 각 재귀 호출이 자신의 결과를 반환하고, 상위 호출자가 이를 조합하는 방식을 고려하여 로직 흐름을 명확히 합니다.
        3.  복잡한 로직 블록 위에 해당 블록이 수행하는 작업을 설명하는 주석을 추가합니다.
    *   **검증**: `resolveStringRule`을 사용하는 테스트 케이스가 모두 통과하는지 확인합니다.

*   **Task 3.5: CSS 속성 추출 및 조립 로직 공통화**
    *   **목표**: `generateStateCSS`와 `generateResponsiveCSS` 간의 중복 코드를 제거합니다.
    *   **위치**: `packages/adorable-css/src/core/parser/generator.ts`의 `generateStateCSS` 및 `generateResponsiveCSS` 함수.
    *   **액션**: 
        1.  `extractCSSProperties` 호출 이후의 CSS 속성 객체 생성 및 CSS 문자열 조립 로직을 `assembleCSSRule(cssProperties: string, selector: string, importanceLevel: number)`와 같은 재사용 가능한 헬퍼 함수로 추출합니다.
        2.  `generateStateCSS`와 `generateResponsiveCSS`에서 이 헬퍼 함수를 호출하도록 변경합니다.
    *   **검증**: 상태 및 반응형 클래스가 정상적으로 CSS를 생성하는지 테스트합니다.

---

#### **Task 4: `packages/adorable-css/src/tokens/tokenRegistry.ts` - 토큰 레지스트리 명확화**

**목표**: 불필요한 함수를 제거하거나 명확히 하고, 토큰 값 계산 로직의 중복을 제거합니다.

*   **Task 4.1: 불필요한 토큰 컬렉션 함수 처리**
    *   **목표**: 현재 동작하지 않는 `startTokenCollection` 및 `stopTokenCollection` 함수를 적절히 처리합니다.
    *   **위치**: `packages/adorable-css/src/tokens/tokenRegistry.ts`
    *   **액션**: 
        1.  두 함수를 완전히 제거합니다.
        2.  만약 향후 특정 시나리오(예: 빌드 시점에만 토큰 수집 활성화)를 위해 남겨둘 계획이라면, 주석을 업데이트하여 현재 동작하지 않는 이유와 향후 사용 계획을 명확히 설명합니다. (이 경우, `// Collection is now always active for lazy generation` 주석도 함께 업데이트해야 합니다.)
    *   **검증**: 해당 함수를 참조하는 코드가 없는지 확인하고, 토큰 레지스트리 관련 테스트가 여전히 통과하는지 확인합니다.

*   **Task 4.2: `getTokenValue` 로직 리팩토링**
    *   **목표**: `getTokenValue` 함수 내의 토큰 값 계산 로직 중복을 제거하고, 공통 로직을 재사용합니다.
    *   **위치**: `packages/adorable-css/src/tokens/tokenRegistry.ts`의 `getTokenValue` 함수.
    *   **액션**: 
        1.  `_generateFontVars`, `_generateSpacingVars`, `_generateSizeVars`, `_generateContainerVars` 함수들이 토큰 값을 계산하는 방식과 유사하게, 각 카테고리별 토큰 값 계산을 위한 내부 헬퍼 함수(예: `_calculateTokenValue(category, token, config, base, tokenConfig)`)를 만듭니다.
        2.  `getTokenValue` 함수가 이 헬퍼 함수를 호출하여 값을 반환하도록 변경합니다.
    *   **검증**: `getTokenValue`를 사용하는 테스트 케이스가 모두 통과하는지 확인합니다.

*   **Task 4.3: `registerToken` 암묵적 호출 재고 (선택 사항)**
    *   **목표**: `getTokenVar` 내부의 암묵적인 `registerToken` 호출을 더 명시적인 방식으로 전환할지 평가합니다.
    *   **위치**: `packages/adorable-css/src/tokens/tokenRegistry.ts`의 `getTokenVar` 함수.
    *   **액션**: (이 Task는 패키지 사용 방식에 영향을 줄 수 있으므로, 신중하게 접근하거나 다음 단계에서 고려할 수 있습니다.)
        1.  `getTokenVar`에서 `registerToken` 호출을 제거합니다.
        2.  토큰 사용을 추적해야 하는 모든 곳에서 `trackTokenUsage(category, token)`와 같은 명시적인 API를 호출하도록 변경합니다.
    *   **검증**: 토큰 사용 추적 및 CSS 변수 생성이 여전히 올바르게 동작하는지 확인합니다.

---

#### **Task 5: `packages/adorable-css/src/rules/rule-definitions.ts` - 규칙 정의 구조 개선**

**목표**: 규칙 임포트 방식을 간소화하고, `RULE_GROUPS`와 `STRING_RULE_GROUPS`를 통합하여 규칙 관리의 일관성을 높입니다.

*   **Task 5.1: 규칙 카테고리별 `index.ts` 파일 생성**
    *   **목표**: 각 규칙 카테고리(예: `layout`, `style`, `effects`, `components/primitives`, `components/patterns`) 내에 `index.ts` 파일을 생성하여 해당 카테고리의 모든 규칙을 내보냅니다.
    *   **위치**: 
        *   `packages/adorable-css/src/rules/layout/`
        *   `packages/adorable-css/src/rules/style/`
        *   `packages/adorable-css/src/rules/effects/`
        *   `packages/adorable-css/src/rules/interaction/`
        *   `packages/adorable-css/src/rules/text/`
        *   `packages/adorable-css/src/rules/position/`
        *   `packages/adorable-css/src/rules/utilities/`
        *   `packages/adorable-css/src/extensions/` (관련 규칙들)
        *   `packages/adorable-css/src/components/patterns/`
        *   `packages/adorable-css/src/components/primitives/`
    *   **액션**: 각 디렉토리에 `index.ts` 파일을 생성하고, 해당 디렉토리 내의 모든 규칙 모듈을 `export * from './moduleName';` 형태로 내보냅니다.
    *   **검증**: 새로 생성된 `index.ts` 파일에 타입 오류가 없는지 확인합니다.

*   **Task 5.2: `rule-definitions.ts` 임포트 경로 업데이트**
    *   **목표**: `rule-definitions.ts`가 개별 규칙 파일 대신 카테고리별 `index.ts` 파일을 임포트하도록 변경합니다.
    *   **위치**: `packages/adorable-css/src/rules/rule-definitions.ts` 파일 상단의 `import` 문.
    *   **액션**: 기존의 긴 임포트 목록을 `import { displayRules, sizeRules, ... } from './layout';`와 같이 간소화된 형태로 변경합니다.
    *   **검증**: `rule-definitions.ts` 파일에 임포트 관련 오류가 없는지 확인합니다.

*   **Task 5.3: `RULE_GROUPS`와 `STRING_RULE_GROUPS` 통합**
    *   **목표**: 두 규칙 그룹을 단일 객체로 통합하여 관리의 일관성을 높입니다.
    *   **위치**: `packages/adorable-css/src/rules/rule-definitions.ts`
    *   **액션**: 
        1.  `STRING_RULE_GROUPS` 객체를 제거합니다.
        2.  `RULE_GROUPS` 객체의 이름을 `ALL_RULE_GROUPS` (또는 적절한 이름)으로 변경합니다.
        3.  `ALL_RULE_GROUPS` 내에 `STRING_RULE_GROUPS`에 있던 규칙들을 새로운 최상위 그룹으로 추가하고, `type: 'string'` 속성을 명시합니다. (예: `hero: { rules: heroRules, priority: RulePriority.COMPONENT, type: 'string' }`)
        4.  `RuleGroupDefinition` 인터페이스에 `type: 'css' | 'string';` 속성이 추가되었는지 다시 확인합니다.
    *   **검증**: `rule-definitions.ts` 파일에 타입 오류가 없는지 확인합니다.

*   **Task 5.4: 통합된 규칙 그룹 참조 업데이트**
    *   **목표**: `STRING_RULE_GROUPS`를 참조하던 모든 코드를 통합된 규칙 그룹을 사용하도록 업데이트합니다.
    *   **위치**: 프로젝트 전체 (특히 `packages/adorable-css/src/core/parser/generator.ts`).
    *   **액션**: `STRING_RULE_GROUPS`를 검색하여 `ALL_RULE_GROUPS` (또는 변경된 이름)를 사용하도록 변경합니다. 규칙의 `type` 속성을 활용하여 CSS 규칙과 문자열 규칙을 구분합니다.
    *   **검증**: 모든 규칙이 정상적으로 파싱되고 CSS가 생성되는지, 특히 기존에 문자열 규칙이었던 것들이 올바르게 처리되는지 테스트합니다.

*   **Task 5.5: 규칙 그룹/서브그룹 주석 개선**
    *   **목표**: 규칙 그룹 및 서브그룹에 대한 설명 주석을 추가하여 코드 이해도를 높입니다.
    *   **위치**: `packages/adorable-css/src/rules/rule-definitions.ts`의 `RULE_GROUPS` (또는 `ALL_RULE_GROUPS`) 및 각 `subgroups` 정의.
    *   **액션**: 각 `RuleGroupDefinition` 및 `RuleSubgroup` 객체 위에 해당 그룹/서브그룹이 어떤 종류의 CSS 규칙을 포함하는지, 어떤 목적을 가지는지 설명하는 상세한 주석을 추가합니다.
    *   **검증**: 주석이 추가되었는지 확인합니다.

---

### 4. 일반적인 검증 단계

각 Task를 완료한 후에는 다음 단계를 수행하여 변경 사항을 검증합니다.

1.  **로컬 테스트 실행**:
    ```bash
    pnpm test --filter adorable-css
    ```
    또는 해당 패키지의 테스트 명령어를 실행하여 모든 테스트가 통과하는지 확인합니다.
2.  **린트 및 타입 체크**:
    ```bash
    pnpm lint --filter adorable-css
    pnpm tsc --filter adorable-css
    ```
    프로젝트의 린트 및 타입 체크 명령어를 실행하여 코드 스타일 및 타입 오류가 없는지 확인합니다.
3.  **수동 확인**: 가능하다면, 변경된 기능과 관련된 예제나 데모를 실행하여 시각적으로도 문제가 없는지 확인합니다.

### 5. 커밋 전략

각 Task 또는 주요 Sub-Task가 완료되고 검증되면, 해당 변경 사항을 하나의 논리적인 커밋으로 묶어 커밋합니다. 커밋 메시지는 해당 Task의 목표와 주요 변경 내용을 명확하게 설명해야 합니다.

예시 커밋 메시지:
```
feat(parser): Refactor parser for improved readability

- Simplified nested options in SelectorList and SingleSelector.
- Added detailed comments to parsing rule functions.
```
