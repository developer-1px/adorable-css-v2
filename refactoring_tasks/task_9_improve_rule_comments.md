## Task 9: `packages/adorable-css/src/rules/rule-definitions.ts` - 규칙 그룹/서브그룹 주석 개선

**목표**: `rule-definitions.ts` 파일 내의 규칙 그룹 및 서브그룹에 대한 설명 주석을 추가하여 코드 이해도를 높이고, 문서화의 일관성을 유지합니다.

**문제점**:
현재 `RULE_GROUPS` (또는 통합 후 `ALL_RULE_GROUPS`) 내의 각 그룹 및 서브그룹에 대한 설명이 부족하여, 새로운 개발자가 규칙의 목적과 분류 기준을 이해하기 어렵습니다.

**관련 파일**:
*   `packages/adorable-css/src/rules/rule-definitions.ts`

**수정 제안**:
각 `RuleGroupDefinition` 및 `RuleSubgroup` 객체 위에 해당 그룹/서브그룹이 어떤 종류의 CSS 규칙을 포함하는지, 어떤 목적을 가지는지 설명하는 상세한 주석을 추가합니다. 이는 코드 라인 수를 직접적으로 줄이지는 않지만, 코드의 가독성과 유지보수성을 크게 향상시킵니다.

**수정 전 코드 (예상)**:
```typescript
// packages/adorable-css/src/rules/rule-definitions.ts
// ...
export const RULE_GROUPS: RuleDefinitions = {
  text: {
    name: 'Text',
    priority: RulePriority.UTILITY,
    subgroups: {
      typography: {
        name: 'Typography',
        rules: typographyRules,
      },
      layout: {
        name: 'Text Layout',
        rules: {
          text: typographyRules.text
        },
      }
    }
  },
  // ...
};
```

**수정 후 코드 (예상)**:
```typescript
// packages/adorable-css/src/rules/rule-definitions.ts
// ...
export const ALL_RULE_GROUPS: RuleDefinitions = {
  /**
   * @group Text
   * @description Figma의 텍스트 속성 패널에 해당하는 규칙들을 정의합니다.
   * 폰트 크기, 굵기, 색상, 정렬 등 텍스트 스타일링과 관련된 유틸리티를 포함합니다.
   */
  text: {
    name: 'Text',
    priority: RulePriority.UTILITY,
    type: 'css',
    subgroups: {
      /**
       * @subgroup Typography
       * @description 일반적인 폰트 및 텍스트 스타일링 규칙입니다.
       */
      typography: {
        name: 'Typography',
        rules: typographyRules,
      },
      /**
       * @subgroup Text Layout
       * @description 텍스트의 레이아웃(예: 줄바꿈, 자르기)과 관련된 규칙입니다.
       */
      layout: {
        name: 'Text Layout',
        rules: {
          text: typographyRules.text
        },
      }
    }
  },
  /**
   * @group Position
   * @description Figma의 위치(X, Y) 속성 패널에 해당하는 규칙들을 정의합니다.
   * 요소의 위치 지정 방식(absolute, relative 등)과 좌표를 제어합니다.
   */
  position: {
    name: 'Position',
    priority: RulePriority.LAYOUT,
    type: 'css',
    subgroups: {
      /**
       * @subgroup Position & Layer
       * @description 요소의 위치와 z-index를 제어하는 규칙입니다.
       */
      position: {
        name: 'Position & Layer',
        rules: positionCategoryRules,
      }
    }
  },
  // ... 나머지 그룹들도 유사하게 주석 추가 ...
};
```

**액션**:
1.  `packages/adorable-css/src/rules/rule-definitions.ts` 파일을 엽니다.
2.  `ALL_RULE_GROUPS` (또는 기존 `RULE_GROUPS`) 객체 내의 각 최상위 그룹(예: `text`, `position`, `autoLayout` 등) 위에 해당 그룹의 목적과 포함하는 규칙의 종류를 설명하는 JSDoc 스타일의 주석을 추가합니다.
3.  각 그룹 내의 `subgroups`에도 유사하게 상세한 주석을 추가합니다.

**검증**:
*   타입스크립트 컴파일 오류가 없는지 확인합니다.
*   코드 에디터에서 해당 파일의 주석이 올바르게 파싱되어 정보가 표시되는지 확인합니다.
*   `rule-definitions.ts` 파일의 가독성이 향상되었는지 시각적으로 확인합니다.
