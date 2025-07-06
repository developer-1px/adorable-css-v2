## Task 2: `packages/adorable-css/src/core/parser/parser.ts` - `_parseAdorableCSS` 오류 처리 간소화

**목표**: `_parseAdorableCSS` 함수의 오류 처리 로직을 간소화하여 코드 라인 수를 줄이고 명확성을 높입니다. 현재의 `console.warn`과 빈 문자열 반환은 디버깅에 비효율적입니다.

**문제점**:
`_parseAdorableCSS` 함수는 파싱 실패 시 `console.warn`을 사용하고 빈 문자열을 반환합니다. 이는 오류를 명확하게 전달하지 못하고, 호출자 측에서 오류를 처리하기 어렵게 만듭니다. 또한, 불필요한 `try-catch` 블록이 코드 라인을 증가시킵니다.

**관련 파일**:
*   `packages/adorable-css/src/core/parser/parser.ts`

**수정 제안**:
파싱 실패 시 `Error` 객체를 직접 throw하도록 변경합니다. 이는 호출자에게 오류를 명확하게 전달하고, `try-catch` 블록을 제거하여 코드 라인을 줄일 수 있습니다. (Task 2.3, 2.4에서 제안했던 `ParseError` 클래스 구현은 이 Task의 목표인 '라인 수 감소'와는 상충되므로, 여기서는 기본 `Error` 객체를 사용합니다.)

**수정 전 코드 (예상)**:
```typescript
// packages/adorable-css/src/core/parser/parser.ts
// ...
function _parseAdorableCSS(input: string) {
  const tokens = tokenize(input);

  const { options, consume, many, many1, many_sep, many1_sep, optional, eof } =
    createParser(tokens);

  // ... 파싱 함수 정의 ...

  try {
    const r = SelectorList();
    eof(r);
    return r;
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
// packages/adorable-css/src/core/parser/parser.ts
// ...
function _parseAdorableCSS(input: string) {
  const tokens = tokenize(input);

  const { options, consume, many, many1, many_sep, many1_sep, optional, eof } =
    createParser(tokens);

  // ... 파싱 함수 정의 ...

  const r = SelectorList();
  eof(r);
  return r;
  // try-catch 블록 제거. 파싱 오류 발생 시 createParser 내부에서 Error를 throw하도록 함.
}
// ...
```

**액션**:
1.  `packages/adorable-css/src/core/parser/parser.ts` 파일에서 `_parseAdorableCSS` 함수 내의 `try-catch` 블록을 제거합니다.
2.  `createParser` 또는 `tokenize` 함수가 유효하지 않은 입력에 대해 적절한 `Error`를 throw하는지 확인합니다. (일반적으로 파서 생성 라이브러리는 기본적으로 오류를 throw합니다.)

**검증**:
*   유효하지 않은 AdorableCSS 입력에 대해 `parseAdorableCSS` 함수를 호출했을 때 `Error`가 throw되는지 확인합니다.
*   기존의 유효한 AdorableCSS 입력에 대해서는 파싱이 정상적으로 이루어지는지 확인합니다.
*   `pnpm test --filter adorable-css`를 실행하여 모든 테스트가 통과하는지 확인합니다.

**참고**:
이 변경은 `parseAdorableCSS`를 호출하는 상위 함수(`generator.ts`의 `_generateCSSFromAdorableCSS` 등)에서 오류를 적절히 `catch`하고 처리해야 함을 의미합니다. 이는 다음 Task에서 다룰 수 있습니다.
