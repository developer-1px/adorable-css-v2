## Task 1: `packages/adorable-css/src/core/parser/parser.ts` - `CSSLiteral` 제거

**목표**: `CSSLiteral` 파싱 기능을 제거하여 파서의 복잡성을 대폭 줄이고 코드 라인 수를 감소시킵니다. AdorableCSS의 핵심은 유틸리티 클래스 기반이므로, 인라인 CSS 리터럴 파싱은 불필요한 복잡성을 추가합니다.

**문제점**:
`CSSLiteral` 함수는 인라인 CSS `{ prop: value; }`를 파싱하기 위해 복잡한 로직을 포함하고 있으며, 이는 AdorableCSS의 유틸리티 클래스 철학과 맞지 않아 불필요한 코드 라인을 발생시킵니다.

**관련 파일**:
*   `packages/adorable-css/src/core/parser/parser.ts`

**수정 제안**:
`CSSLiteral` 함수와 이를 참조하는 모든 부분을 제거합니다. 이는 파서의 코드 라인을 크게 줄이고 핵심 기능을 더욱 명확하게 합니다.

**수정 전 코드 (예상)**:
```typescript
// packages/adorable-css/src/core/parser/parser.ts
// ...
function SimpleSelector(): any {
  return options(
    () => Position(),
    () => CSSLiteral(), // <-- 이 부분 제거
    () => FunctionCall(),
    () => Range(),
    () => consume("(ident)"),
    () => consume("&")
  );
}

function CSSLiteral(): any {
  const value: any[] = [];

  consume("{");

  many(() => {
    optional(() => value.push(consume(";")));

    value.push(consume("(ident)"));
    value.push(consume(":"));

    value.push(
      ...many(() =>
        options(
          () => consume("(dimension)"),
          () => consume("(hexcolor)"),
          () => consume("(string)"),
          () => CSSFunc(),
          () => consume("(ident)")
        )
      )
    );

    optional(() => value.push(consume("!important")));
    optional(() => value.push(consume(";")));
  });

  consume("}");

  return {
    type: "css_literal",
    value,
    image:
      "{" +
      value
        .map((v: any) => v.image)
        .join("")
        .replace(/_/g, " ") +
      "}",
  };
}
// ...
```

**수정 후 코드 (예상)**:
```typescript
// packages/adorable-css/src/core/parser/parser.ts
// ...
function SimpleSelector(): any {
  return options(
    () => Position(),
    () => FunctionCall(),
    () => Range(),
    () => consume("(ident)"),
    () => consume("&")
  );
}

// CSSLiteral 함수는 완전히 삭제됨
// ...
```

**액션**:
1.  `packages/adorable-css/src/core/parser/parser.ts` 파일에서 `CSSLiteral` 함수 정의를 완전히 삭제합니다.
2.  `SimpleSelector` 함수 내에서 `() => CSSLiteral(),` 라인을 삭제합니다.

**검증**:
*   `pnpm test --filter adorable-css`를 실행하여 모든 테스트가 통과하는지 확인합니다. (만약 `CSSLiteral`을 사용하는 테스트가 있다면 제거하거나 수정해야 합니다.)
*   타입스크립트 컴파일 오류가 없는지 확인합니다.
*   `CSSLiteral` 기능이 더 이상 필요하지 않음을 문서화합니다.
