## Task 4: `packages/adorable-css/src/core/parser/generator.ts` - 레이어 분류 로직 간소화

**목표**: `_generateCSS` 함수 내의 하드코딩된 레이어 분류 로직을 간소화하고, `rule-definitions.ts`의 규칙 정의를 활용하여 코드 라인 수를 줄이고 유지보수성을 높입니다.

**문제점**:
`_generateCSS` 함수는 하드코딩된 정규식 패턴을 사용하여 CSS 레이어를 분류합니다. 이는 새로운 컴포넌트나 패턴이 추가될 때마다 코드를 수정해야 하는 비효율적인 방식이며, 코드 라인 수를 증가시킵니다.

**관련 파일**:
*   `packages/adorable-css/src/core/parser/generator.ts`
*   `packages/adorable-css/src/rules/rule-definitions.ts`

**수정 제안**:
`rule-definitions.ts`에 각 규칙의 레이어 정보를 명시하고, `_generateCSS`에서는 이 정보를 조회하여 동적으로 레이어를 결정하도록 변경합니다. 이렇게 하면 `if/else if` 체인을 제거하여 코드 라인을 줄일 수 있습니다.

**수정 전 코드 (예상)**:
```typescript
// packages/adorable-css/src/core/parser/generator.ts
// ...
function _generateCSS(classList: string[]): string {
  // ...
  uniqueClasses.forEach(className => {
    const css = generateCSSFromAdorableCSS(className);
    if (!css || css.trim() === "") return;
    
    // Determine layer based on class pattern
    if (/^(body|heading|title|label|caption|button|card|container|section|prose|glass|glow|interactive)\(/.test(className)) {
      layers.components.push(css);
    } else if (/^(hbox|vbox|grid|layer|stack|center|between|around|evenly)\(/.test(className)) {
      layers.composition.push(css);
    } else {
      layers.utilities.push(css);
    }
  });
  // ...
}
// ...
```

**수정 후 코드 (예상)**:
```typescript
// packages/adorable-css/src/core/parser/generator.ts
import { getRuleWithPriority } from "../../rules"; // getRuleWithPriority 임포트
// ...
function _generateCSS(classList: string[]): string {
  // ...
  uniqueClasses.forEach(className => {
    const css = generateCSSFromAdorableCSS(className);
    if (!css || css.trim() === "") return;
    
    // 규칙 이름 추출 (예: "c(red)" -> "c")
    const ruleNameMatch = className.match(/^([a-zA-Z0-9-]+)\(/);
    const ruleName = ruleNameMatch ? ruleNameMatch[1] : className.split('(')[0];

    const ruleInfo = getRuleWithPriority(ruleName);
    const layer = ruleInfo?.layer || 'utilities'; // rule-definitions.ts에서 layer 정보를 가져옴

    // 동적으로 레이어에 CSS 추가
    if (layers[layer]) {
      layers[layer].push(css);
    } else {
      layers.utilities.push(css); // 기본값으로 utilities에 추가
    }
  });
  // ...
}
// ...
```

**액션**:
1.  `packages/adorable-css/src/rules/rule-definitions.ts` 파일의 `RuleGroupDefinition` 인터페이스에 `layer?: 'base' | 'components' | 'composition' | 'utilities';` 속성을 추가합니다.
2.  `rule-definitions.ts`의 `RULE_GROUPS` 객체 내 각 최상위 규칙 그룹(예: `text`, `position`, `autoLayout`, `visual`, `css`, `interaction`, `utilities`, `components`)에 적절한 `layer` 값을 할당합니다. (예: `components` 그룹에는 `layer: 'components'`, `autoLayout`에는 `layer: 'composition'`)
3.  `packages/adorable-css/src/core/parser/generator.ts` 파일에서 `_generateCSS` 함수 내의 `if/else if` 레이어 분류 로직을 `getRuleWithPriority`를 사용하여 동적으로 레이어를 결정하는 방식으로 변경합니다.
4.  `getLayerFromPriority` 함수가 더 이상 필요 없다면 제거하거나, `ruleInfo?.layer`를 반환하도록 수정합니다.

**검증**:
*   `pnpm test --filter adorable-css`를 실행하여 모든 테스트가 통과하는지 확인합니다.
*   다양한 AdorableCSS 클래스에 대해 생성된 CSS 파일에서 `@layer` 규칙이 올바르게 적용되는지 수동으로 확인합니다.
*   타입스크립트 컴파일 오류가 없는지 확인합니다.

**참고**:
이 변경은 `rule-definitions.ts`의 규칙 정의에 `layer` 속성을 추가하는 선행 작업이 필요합니다. (Task 5.3과 연계될 수 있습니다.)
