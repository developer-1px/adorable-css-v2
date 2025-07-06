## Task 5: `packages/adorable-css/src/tokens/tokenRegistry.ts` - 불필요한 토큰 컬렉션 함수 제거

**목표**: 현재 아무런 동작도 하지 않는 `startTokenCollection` 및 `stopTokenCollection` 함수를 제거하여 코드 라인 수를 줄이고 코드베이스를 간결하게 만듭니다.

**문제점**:
`startTokenCollection` 및 `stopTokenCollection` 함수는 주석에 명시된 대로 현재 아무런 기능도 수행하지 않습니다. 이러한 불필요한 함수는 코드베이스의 복잡성을 증가시키고 혼란을 야기할 수 있습니다.

**관련 파일**:
*   `packages/adorable-css/src/tokens/tokenRegistry.ts`

**수정 제안**:
두 함수를 완전히 제거합니다. 이는 코드 라인 수를 직접적으로 줄이고, 코드의 의도를 명확하게 합니다.

**수정 전 코드 (예상)**:
```typescript
// packages/adorable-css/src/tokens/tokenRegistry.ts
// ...
/**
 * Start collecting used tokens
 */
export function startTokenCollection(): void {
  // Collection is now always active for lazy generation
  // DO NOT clear existing tokens - we want to accumulate them
  // for proper lazy generation across multiple generateCSS calls
}

/**
 * Stop collecting tokens
 */
export function stopTokenCollection(): void {
  // Collection is now always active for lazy generation
}
// ...
```

**수정 후 코드 (예상)**:
```typescript
// packages/adorable-css/src/tokens/tokenRegistry.ts
// ...
// (startTokenCollection 및 stopTokenCollection 함수는 완전히 삭제됨)
// ...
```

**액션**:
1.  `packages/adorable-css/src/tokens/tokenRegistry.ts` 파일에서 `startTokenCollection` 함수와 `stopTokenCollection` 함수 정의를 완전히 삭제합니다.

**검증**:
*   `pnpm test --filter adorable-css`를 실행하여 모든 테스트가 통과하는지 확인합니다. (이 함수들을 직접 호출하는 테스트가 있다면 제거하거나 수정해야 합니다.)
*   타입스크립트 컴파일 오류가 없는지 확인합니다.
*   코드베이스 전체에서 이 함수들을 참조하는 곳이 없는지 확인합니다. (만약 있다면 해당 참조도 제거해야 합니다.)
