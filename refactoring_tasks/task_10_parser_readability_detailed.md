## Task 10: `packages/adorable-css/src/core/parser/parser.ts` - 파싱 규칙 함수 가독성 개선 (세부)

**목표**: `_parseAdorableCSS` 내의 파싱 규칙 함수들(`SelectorList`, `SingleSelector`, `SimpleSelector`, `Range`, `FunctionCall`, `Arg`, `KeyValue`, `Expr`, `Term`, `CSSFunc`)의 가독성을 높이고, `options` 헬퍼 함수의 사용을 최소화하여 코드 라인 수를 줄입니다.

**문제점**:
`parser.ts` 파일의 파싱 로직은 `createParser`에서 제공하는 `options`, `many`, `optional` 등의 헬퍼 함수를 과도하게 사용하여 중첩이 심하고, 코드의 흐름을 한눈에 파악하기 어렵습니다. 이는 코드 라인 수를 증가시키고 유지보수를 어렵게 만듭니다.

**관련 파일**:
*   `packages/adorable-css/src/core/parser/parser.ts`
*   `packages/adorable-css/src/core/parser/parser-utils.ts` (필요시 `peek` 함수 추가)

**수정 제안**:
`options` 헬퍼 함수 대신 `if/else if` 또는 `switch` 문을 사용하여 각 파싱 시도를 명시적으로 만듭니다. 이를 위해 `parser-utils.ts`에 `peek` 함수를 추가하여 다음 토큰을 미리 확인하는 기능을 활용합니다. 각 파싱 함수 내의 불필요한 중첩을 제거하고, 명확한 변수명과 주석을 사용하여 코드의 의도를 명확히 합니다.

**`parser-utils.ts`에 `peek` 함수 추가 (필요시)**:
```typescript
// packages/adorable-css/src/core/parser/parser-utils.ts
// ...
export function createParser(tokens: Token[]) {
  let cursor = 0;

  const peek = (checkFn: () => any, offset: number = 0): boolean => {
    const originalCursor = cursor;
    cursor += offset; // 임시로 커서 이동
    try {
      checkFn();
      return true;
    } catch (e) {
      return false;
    } finally {
      cursor = originalCursor; // 커서 원상 복구
    }
  };

  // ... 기존 consume, many, optional 등 ...

  return { options, consume, many, many1, many_sep, many1_sep, optional, eof, peek };
}
```

**수정 전 코드 (예시: `SimpleSelector`)**:
```typescript
// packages/adorable-css/src/core/parser/parser.ts
function SimpleSelector(): any {
  return options(
    () => Position(),
    () => CSSLiteral(), // Task 1에서 제거됨
    () => FunctionCall(),
    () => Range(),
    () => consume("(ident)"),
    () => consume("&")
  );
}
```

**수정 후 코드 (예시: `SimpleSelector`)**:
```typescript
// packages/adorable-css/src/core/parser/parser.ts
// ...
function SimpleSelector(): any {
  // 괄호로 시작하면 Position 또는 FunctionCall
  if (peek(() => consume("("))) {
    // Position은 (x,y) 형태, FunctionCall은 name(args) 형태
    // 여기서는 더 정교한 peek 로직이 필요할 수 있음
    // 예를 들어, 괄호 안에 숫자가 오면 Position, 식별자가 오면 FunctionCall
    if (peek(() => consume("(dimension)"), 1)) { // (숫자) 형태 예상
      return Position();
    } else if (peek(() => consume("(ident)"), 1)) { // (식별자) 형태 예상
      return FunctionCall();
    }
  }

  // Range (10..20, ..10, 10..) 또는 Dimension-pair (64x64) 또는 Dimension (10px)
  // Term() 함수가 이들을 처리하므로 Term()을 먼저 시도
  if (peek(() => Term())) {
    const term = Term();
    // Term이 Range 타입인지 확인 (Range는 Term의 한 종류)
    if (term.type === "range" || term.type === "triple-range") {
      return term;
    }
    // Term이 FunctionCall 타입인지 확인
    if (term.type === "function") {
      return term;
    }
    // Term이 Dimension-pair 타입인지 확인
    if (term.type === "dimension-pair") {
      return term;
    }
    // Term이 Ident 타입인지 확인 (일반 식별자)
    if (term.type === "ident") {
      return term;
    }
    // Term이 ColorValue 타입인지 확인
    if (term.type === "color-value") {
      return term;
    }
    // Term이 String 타입인지 확인
    if (term.type === "string") {
      return term;
    }
  }

  // 일반 식별자 (ident)
  if (peek(() => consume("(ident)"))) {
    return consume("(ident)");
  }

  // 앰퍼샌드 (&)
  if (peek(() => consume("&"))) {
    return consume("&");
  }

  // 일치하는 것이 없으면 오류
  throw new Error("Unexpected token in SimpleSelector");
}
// ...
```

**액션**:
1.  **`parser-utils.ts`에 `peek` 함수 추가**: `createParser` 함수 내부에 `peek` 헬퍼 함수를 구현하고 `return` 객체에 포함시킵니다. (위 예시 참조)
2.  **`parser.ts`의 파싱 함수들 리팩토링**: `_parseAdorableCSS` 함수 내의 모든 파싱 함수(`SelectorList`, `SingleSelector`, `SimpleSelector`, `Range`, `FunctionCall`, `Arg`, `KeyValue`, `Expr`, `Term`, `CSSFunc`)를 검토하고, `options` 헬퍼 함수 사용을 `if/else if` 또는 `switch` 문으로 대체합니다. 각 분기에서 `peek` 함수를 사용하여 다음 토큰을 미리 확인하고 적절한 파싱 로직을 호출합니다.
3.  **불필요한 `optional` 제거**: `optional`로 감싸진 단일 `consume` 호출이 많은 경우, `peek`을 사용하여 조건부로 `consume`를 호출하는 방식으로 변경하여 `optional` 사용을 줄입니다.
4.  **명확한 주석 추가**: 각 파싱 로직 블록 위에 해당 블록이 어떤 구문 요소를 파싱하는지 설명하는 간결한 주석을 추가합니다.

**검증**:
*   `pnpm test --filter adorable-css`를 실행하여 파서의 기존 테스트 케이스가 모두 통과하는지 확인합니다.
*   특히, 파싱 로직이 변경된 부분에 대한 테스트 커버리지를 확인하고, 필요하다면 추가 테스트 케이스를 작성합니다.
*   타입스크립트 컴파일 오류가 없는지 확인합니다.
*   `parser.ts` 파일의 코드 라인 수가 감소하고 가독성이 향상되었는지 시각적으로 확인합니다.

**참고**:
이 Task는 파서의 핵심 로직을 건드리는 작업이므로, 매우 신중하게 접근해야 합니다. 변경 후에는 철저한 테스트가 필수적입니다. `peek` 함수의 구현은 파서의 견고성에 큰 영향을 미치므로, 정확하게 구현해야 합니다.
