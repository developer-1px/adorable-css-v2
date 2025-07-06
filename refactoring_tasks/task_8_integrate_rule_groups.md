## Task 8: `packages/adorable-css/src/rules/rule-definitions.ts` - 규칙 그룹 통합

**목표**: `RULE_GROUPS`와 `STRING_RULE_GROUPS`를 단일 객체로 통합하여 규칙 관리의 일관성을 높이고, 코드 중복을 줄입니다.

**문제점**:
현재 `RULE_GROUPS`와 `STRING_RULE_GROUPS`라는 두 개의 별도 객체로 규칙이 관리되고 있습니다. 이는 규칙 조회 로직을 복잡하게 만들고, 새로운 규칙 유형 추가 시 두 곳을 모두 고려해야 하는 비효율성을 초래합니다.

**관련 파일**:
*   `packages/adorable-css/src/rules/rule-definitions.ts`
*   `packages/adorable-css/src/core/parser/generator.ts` (규칙 그룹을 참조하는 주요 파일)

**수정 제안**:
`STRING_RULE_GROUPS`의 내용을 `RULE_GROUPS`에 통합하고, 각 규칙 그룹에 `type: 'css' | 'string'` 속성을 추가하여 규칙의 종류를 명시합니다. 이렇게 하면 단일 진입점에서 모든 규칙을 관리할 수 있어 코드 라인 수를 줄이고 유지보수성을 향상시킬 수 있습니다.

**수정 전 코드 (예상)**:
```typescript
// packages/adorable-css/src/rules/rule-definitions.ts
// ...
export const RULE_GROUPS: RuleDefinitions = { /* ... */ };

export const STRING_RULE_GROUPS = {
  hero: { rules: heroRules, priority: RulePriority.COMPONENT },
  section: { rules: sectionRules, priority: RulePriority.COMPONENT },
  // ...
};
// ...
```

**수정 후 코드 (예상)**:
```typescript
// packages/adorable-css/src/rules/rule-definitions.ts
// ...
export interface RuleGroupDefinition {
  name: string;
  priority: RulePriority;
  subgroups: Record<string, RuleSubgroup>;
  type: 'css' | 'string'; // <-- type 속성 추가
}

export const ALL_RULE_GROUPS: RuleDefinitions = { // <-- 이름 변경
  // ... 기존 RULE_GROUPS 내용 ...
  text: {
    name: 'Text',
    priority: RulePriority.UTILITY,
    type: 'css', // <-- type 명시
    subgroups: { /* ... */ }
  },
  // ...
  // STRING_RULE_GROUPS의 내용을 여기에 통합
  hero: {
    name: 'Hero',
    priority: RulePriority.COMPONENT,
    type: 'string',
    subgroups: {
      hero: {
        name: 'Hero Component',
        rules: heroRules,
      }
    }
  },
  section: {
    name: 'Section',
    priority: RulePriority.COMPONENT,
    type: 'string',
    subgroups: {
      section: {
        name: 'Section Component',
        rules: sectionRules,
      }
    }
  },
  // ... 나머지 STRING_RULE_GROUPS 항목들 ...
};

// STRING_RULE_GROUPS는 제거됨
// ...
```

**액션**:
1.  `packages/adorable-css/src/rules/rule-definitions.ts` 파일에서 `RuleGroupDefinition` 인터페이스에 `type: 'css' | 'string';` 속성을 추가합니다.
2.  `STRING_RULE_GROUPS` 객체를 삭제합니다.
3.  `RULE_GROUPS` 객체의 이름을 `ALL_RULE_GROUPS` (또는 적절한 이름)으로 변경합니다.
4.  `ALL_RULE_GROUPS` 내에 `STRING_RULE_GROUPS`에 있던 모든 규칙 그룹을 추가하고, `type: 'string'` 속성을 명시합니다. 기존 `RULE_GROUPS`의 항목들에는 `type: 'css'`를 명시합니다.
5.  프로젝트 전체에서 `STRING_RULE_GROUPS`를 참조하는 모든 코드를 `ALL_RULE_GROUPS`를 사용하도록 업데이트합니다. 특히 `packages/adorable-css/src/core/parser/generator.ts` 파일에서 `resolveStringRule` 함수가 `priorityRegistry.getStringRule` 대신 `ALL_RULE_GROUPS`를 참조하도록 수정해야 합니다.

**검증**:
*   `pnpm test --filter adorable-css`를 실행하여 모든 테스트가 통과하는지 확인합니다.
*   특히 기존에 문자열 규칙이었던 것들이 올바르게 처리되고 CSS가 생성되는지 확인합니다.
*   타입스크립트 컴파일 오류가 없는지 확인합니다.
*   `rule-definitions.ts` 파일에서 `STRING_RULE_GROUPS`가 완전히 제거되었는지 확인합니다.
