## Task 7: `packages/adorable-css/src/rules/rule-definitions.ts` - 규칙 임포트 간소화

**목표**: `rule-definitions.ts` 파일의 임포트 문 수를 대폭 줄여 코드 라인 수를 감소시키고 가독성을 높입니다.

**문제점**:
`rule-definitions.ts` 파일은 모든 개별 규칙 모듈을 직접 임포트하고 있어, 임포트 목록이 매우 길고 새로운 규칙이 추가될 때마다 이 파일을 수정해야 하는 비효율성이 있습니다.

**관련 파일**:
*   `packages/adorable-css/src/rules/rule-definitions.ts`
*   `packages/adorable-css/src/rules/layout/` (및 다른 모든 규칙 카테고리 디렉토리)

**수정 제안**:
각 규칙 카테고리 디렉토리(예: `layout`, `style`, `effects` 등)에 `index.ts` 파일을 생성하여 해당 카테고리의 모든 규칙을 내보내도록 합니다. 그런 다음, `rule-definitions.ts`에서는 개별 규칙 대신 이 `index.ts` 파일들만 임포트하도록 변경합니다. 이는 임포트 라인 수를 크게 줄여줍니다.

**수정 전 코드 (예상)**:
```typescript
// packages/adorable-css/src/rules/rule-definitions.ts
// ...
import { displayRules } from './layout/display';
import { sizeRules } from './layout/size';
import { spacingRules } from './layout/spacing';
import { gridRules } from './layout/grid';
import { overflowRules } from './layout/overflow';
import { insetRules } from './layout/inset';
import { scrollMt, scrollMb, scrollMl, scrollMr, scrollM } from './layout/scroll-margin';

import { typographyRules } from './style';
import { visualRules } from './style';
// ... 수많은 import 문 ...
```

**수정 후 코드 (예상)**:
```typescript
// packages/adorable-css/src/rules/rule-definitions.ts
// ...
// 각 카테고리별 index.ts에서 모든 규칙을 임포트
import { displayRules, sizeRules, spacingRules, gridRules, overflowRules, insetRules, scrollMt, scrollMb, scrollMl, scrollMr, scrollM } from './layout';
import { typographyRules, visualRules } from './style';
// ... 훨씬 적은 import 문 ...
```

**새로운 `index.ts` 파일 예시 (예: `packages/adorable-css/src/rules/layout/index.ts`)**:
```typescript
// packages/adorable-css/src/rules/layout/index.ts
export * from './display';
export * from './size';
export * from './spacing';
export * from './grid';
export * from './overflow';
export * from './inset';
export * from './scroll-margin';
// ... 해당 카테고리의 모든 규칙 파일 export ...
```

**액션**:
1.  **규칙 카테고리별 `index.ts` 파일 생성**: 다음 디렉토리 각각에 `index.ts` 파일을 생성하고, 해당 디렉토리 내의 모든 규칙 모듈을 `export * from './moduleName';` 형태로 내보냅니다.
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
2.  **`packages/adorable-css/src/rules/rule-definitions.ts` 파일 수정**: 파일 상단의 모든 개별 규칙 `import` 문을 삭제하고, 대신 각 카테고리의 `index.ts` 파일에서 필요한 규칙들을 임포트하도록 변경합니다.

**검증**:
*   `pnpm test --filter adorable-css`를 실행하여 모든 테스트가 통과하는지 확인합니다.
*   타입스크립트 컴파일 오류가 없는지 확인합니다.
*   `rule-definitions.ts` 파일의 임포트 섹션이 훨씬 간결해졌는지 시각적으로 확인합니다.
