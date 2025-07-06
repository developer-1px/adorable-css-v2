## Task 3: `packages/adorable-css/src/core/parser/generator.ts` - `_generateCSSFromAdorableCSS` 오류 처리 간소화

**목표**: `_generateCSSFromAdorableCSS` 함수의 오류 처리 로직을 간소화하여 코드 라인 수를 줄이고, `parseAdorableCSS`에서 전달된 오류를 명확하게 처리합니다.

**문제점**:
`_generateCSSFromAdorableCSS` 함수는 `parseAdorableCSS` 호출 시 발생하는 오류를 `try-catch`로 잡아서 `console.warn`을 출력하고 빈 문자열을 반환합니다. 이는 오류 정보를 손실시키고, 불필요한 `try-catch` 블록으로 코드 라인을 증가시킵니다.

**관련 파일**:
*   `packages/adorable-css/src/core/parser/generator.ts`
*   `packages/adorable-css/src/core/parser/parser.ts` (Task 2에서 변경됨)

**수정 제안**:
`_generateCSSFromAdorableCSS` 함수에서 `parseAdorableCSS` 호출에 대한 `try-catch` 블록을 제거합니다. 대신, `parseAdorableCSS`에서 throw된 오류가 상위 호출자(`_generateCSS` 등)로 전파되도록 합니다. 이렇게 하면 오류 처리 로직이 한 곳으로 집중되어 코드 라인을 줄이고 오류 흐름을 명확하게 할 수 있습니다.

**수정 전 코드 (예상)**:
```typescript
// packages/adorable-css/src/core/parser/generator.ts
// ...
function _generateCSSFromAdorableCSS(value: string): string {
  // ...
  try {
    const result = parseAdorableCSS(value);
    // ...
  } catch (e) {
    console.warn(`❌ AdorableCSS: Failed to parse "${value}"`);
    console.warn(`   Error:`, e);
    return ""; // Fail gracefully
  }
}
// ...
```

**수정 후 코드 (예상)**:
```typescript
// packages/adorable-css/src/core/parser/generator.ts
// ...
function _generateCSSFromAdorableCSS(value: string): string {
  // ...
  const result = parseAdorableCSS(value); // try-catch 블록 제거
  // ...
  // 오류 발생 시 여기서 throw된 Error는 상위 호출자로 전파됨
}
// ...
```

**액션**:
1.  `packages/adorable-css/src/core/parser/generator.ts` 파일에서 `_generateCSSFromAdorableCSS` 함수 내의 `try-catch` 블록을 제거합니다.
2.  `_generateCSS` 함수 (또는 `_generateCSSFromAdorableCSS`를 호출하는 다른 함수)에서 `try-catch` 블록을 추가하여 파싱 오류를 처리하도록 합니다. 이 `try-catch` 블록은 더 상위 레벨에서 오류를 중앙 집중식으로 처리하는 역할을 합니다.

**검증**:
*   유효하지 않은 AdorableCSS 입력에 대해 `generateCSSFromAdorableCSS`를 호출했을 때 오류가 상위로 전파되는지 확인합니다.
*   `_generateCSS` 함수가 파싱 오류를 적절히 `catch`하고 처리하는지 확인합니다. (예: `console.error` 또는 사용자에게 오류 메시지 반환)
*   `pnpm test --filter adorable-css`를 실행하여 모든 테스트가 통과하는지 확인합니다.

**참고**:
이 변경은 오류 처리의 책임을 상위 호출자로 위임하여 코드의 흐름을 단순화합니다. `_generateCSS` 함수에서 오류를 처리하는 방식은 프로젝트의 오류 로깅 및 사용자 피드백 전략에 따라 달라질 수 있습니다.
