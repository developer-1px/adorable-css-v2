<script lang="ts">
  import { parseAdorableCSS } from '../myparser/parser';
  import { generateCSSFromAdorableCSS } from '../myparser/generator';
  
  let input = 'hbox(center) p(20) bg(#f0f0f0) hover:c(blue)';
  let result: any = null;
  let css = '';
  let error = '';
  let showTests = true;
  
  $: {
    try {
      error = '';
      result = parseAdorableCSS(input);
      css = generateCSSFromAdorableCSS(input);
    } catch (e: any) {
      error = e.message;
      result = null;
      css = '';
    }
  }
  
  // AdorableCSS 문법 가이드 - 순수 문법 학습
  const tutorialGroups = {
    '1. 기본 토큰 (Basic Tokens)': [
      { class: "flex", group: "1. 기본 토큰", subgroup: "(ident)", description: "식별자 형태의 키워드" },
      { class: "100", group: "1. 기본 토큰", subgroup: "(ident)", description: "숫자 키워드" },
    ],
    
    '2. 함수 호출 (Function Calls)': [
      { class: "w(100px)", group: "2. 함수 호출", subgroup: "(dimension)", description: "FunctionCall: (ident) + '(' + (dimension) + ')'" },
      { class: "h(50%)", group: "2. 함수 호출", subgroup: "(dimension)", description: "FunctionCall: 퍼센트 단위 (dimension) 토큰" },
      { class: "m(1.5rem)", group: "2. 함수 호출", subgroup: "(dimension)", description: "FunctionCall: 소수점 포함 (dimension) 토큰" },
      { class: "c(#ff0000)", group: "2. 함수 호출", subgroup: "(hexcolor)", description: "FunctionCall: 6자리 (hexcolor) 토큰" },
      { class: "bg(#f00)", group: "2. 함수 호출", subgroup: "(hexcolor)", description: "FunctionCall: 3자리 (hexcolor) 토큰" },
      { class: "font('Arial')", group: "2. 함수 호출", subgroup: "(string)", description: "FunctionCall: 단일 따옴표 (string) 토큰" },
      { class: "content(\"Hello\")", group: "2. 함수 호출", subgroup: "(string)", description: "FunctionCall: 이중 따옴표 (string) 토큰" },
      { class: "text(center)", group: "2. 함수 호출", subgroup: "(ident)", description: "FunctionCall: 인수로 (ident) 토큰 사용" },
    ],
    
    '3. 고급 인수 (Advanced Arguments)': [
      { class: "w(50px..)", group: "3. 고급 인수", subgroup: "Range", description: "Range: Term + (range) 구조" },
      { class: "w(..300px)", group: "3. 고급 인수", subgroup: "Range", description: "Range: (range) + Term 구조" },
      { class: "w(100px..200px)", group: "3. 고급 인수", subgroup: "Range", description: "Range: Term + (range) + Term 구조" },
      { class: "p(10px/20px)", group: "3. 고급 인수", subgroup: "Multiple Args", description: "many_sep: Arg + '/' + Arg 구조" },
      { class: "p(5px/10px/15px/20px)", group: "3. 고급 인수", subgroup: "Multiple Args", description: "many_sep: 4개 Arg를 '/' 구분자로 연결" },
      { class: "hbox(right+bottom)", group: "3. 고급 인수", subgroup: "Multiple Args", description: "many_sep: 4개 Arg를 '/' 구분자로 연결" },
      { class: "shadow(2px,4px,8px,#000)", group: "3. 고급 인수", subgroup: "Multiple Args", description: "many_sep: Arg를 ',' 구분자로 연결" },
      { class: "pos(top:10px,left:20px)", group: "3. 고급 인수", subgroup: "KeyValue", description: "KeyValue: (ident) + ':' + Expr 구조" },
      { class: "w(100px+50px)", group: "3. 고급 인수", subgroup: "Expression", description: "Expr: Term + '+' + Term 표현식" },
      { class: "h(100vh-20px)", group: "3. 고급 인수", subgroup: "Expression", description: "Expr: Term + '-' + Term 표현식" },
      { class: "transform(rotate(45deg))", group: "3. 고급 인수", subgroup: "Nested Function", description: "CSSFunc: (ident) + '(' + Expr + ')' 중첩" },
    ],
    
    '4. 조합자 (Combinators)': [
      { class: "hover:c(blue)", group: "4. 조합자", subgroup: "Pseudo-class", description: "CombinatorSelector: ':' + SimpleSelector" },
      { class: "focus:bg(yellow)", group: "4. 조합자", subgroup: "Pseudo-class", description: "':' 조합자로 가상 클래스 연결" },
      { class: "first:mt(0)", group: "4. 조합자", subgroup: "Pseudo-element", description: "':' 조합자 + (ident) + FunctionCall" },
      { class: ">div:p(10px)", group: "4. 조합자", subgroup: "Child Selector", description: "'>' 조합자로 자식 선택자 구성" },
      { class: "+span:ml(5px)", group: "4. 조합자", subgroup: "Adjacent Sibling", description: "'+' 조합자로 인접 형제 선택" },
      { class: ".dark:bg(black)", group: "4. 조합자", subgroup: "Class Selector", description: "'.' 조합자 + (ident) + ':' + FunctionCall" },
      { class: "#main:w(100%)", group: "4. 조합자", subgroup: "ID Selector", description: "'#' 조합자 + (ident) + ':' + FunctionCall" },
      { class: "hover:focus:opacity(80%)", group: "4. 조합자", subgroup: "Chained", description: "many() CombinatorSelector 연속 연결" },
      { class: "&", group: "4. 조합자", subgroup: "&", description: "& 토큰 - 부모 셀렉터 참조" },
    ],
    
    '5. CSS 리터럴 (CSS Literals)': [
      { class: "{display:flex}", group: "5. CSS 리터럴", subgroup: "Single Property", description: "CSSLiteral: '{' + (ident) + ':' + Term + '}'" },
      { class: "{color:red;font-size:16px}", group: "5. CSS 리터럴", subgroup: "Multiple Properties", description: "CSSLiteral: ';'로 구분된 다중 속성" },
      { class: "{border:1px_solid_black}", group: "5. CSS 리터럴", subgroup: "Complex Value", description: "CSSLiteral: '_'로 공백 대체한 백합 값" },
      { class: "hover:{transform:scale(1.05)}", group: "5. CSS 리터럴", subgroup: "With Combinator", description: "CombinatorSelector + CSSLiteral 조합" },
    ],
    
    '6. 중요도 및 다중 선택자': [
      { class: "w(100px)!", group: "6. 중요도 및 다중", subgroup: "Importance", description: "SingleSelector + '!' 중요도 플래그" },
      { class: "c(red)!!", group: "6. 중요도 및 다중", subgroup: "Importance", description: "many() 중요도 플래그 연속" },
      { class: "flex center", group: "6. 중요도 및 다중", subgroup: "Multiple Selectors", description: "SelectorList: 공백으로 구분된 다중 SimpleSelector" },
      { class: "w(100px) h(100px) bg(#f0f0f0)", group: "6. 중요도 및 다중", subgroup: "Multiple Selectors", description: "SelectorList: 3개 FunctionCall 연속" },
      { class: "hover:bg(blue) focus:ring(2px)", group: "6. 중요도 및 다중", subgroup: "Multiple Combinators", description: "SelectorList: 다중 CombinatorSelector" },
    ],
    
    '7. 오류 케이스 (Parse Errors)': [
      { class: "w(", group: "7. 오류", subgroup: "Syntax Error", description: "FunctionCall: 닫히지 않은 ')' 괄호" },
      { class: "bg(#xyz)", group: "7. 오류", subgroup: "Invalid Token", description: "(hexcolor) 토큰 규칙 위반" },
      { class: "hover:", group: "7. 오류", subgroup: "Incomplete", description: "CombinatorSelector: 누락된 SimpleSelector" },
      { class: "p()", group: "7. 오류", subgroup: "Empty Args", description: "FunctionCall: 비어있는 인수 목록" },
      { class: "{color:red", group: "7. 오류", subgroup: "Unclosed Block", description: "CSSLiteral: 닫히지 않은 '}' 괄호" },
    ]
  };
  
  // 모든 테스트 케이스를 하나의 배열로 결합
  const allTestCases = Object.values(tutorialGroups).flat();
  
  // 카테고리별로 그룹화하는 함수
  function categorizeTestCases(testCases) {
    return testCases.reduce((acc, testCase) => {
      if (!acc[testCase.subgroup]) acc[testCase.subgroup] = [];
      acc[testCase.subgroup].push(testCase);
      return acc;
    }, {});
  }
  
  function runParseTest(testInput: string) {
    try {
      const parseResult = parseAdorableCSS(testInput);
      let cssResult = '';
      try {
        cssResult = generateCSSFromAdorableCSS(testInput);
      } catch (genError) {
        cssResult = 'CSS generation failed';
      }
      
      return {
        success: true,
        parseResult: formatParseResult(parseResult),
        cssResult: cssResult,
        error: null
      };
    } catch (e: any) {
      return {
        success: false,
        parseResult: null,
        cssResult: null,
        error: e.message
      };
    }
  }
  
  function formatParseResult(result: any): string {
    if (!result) return 'null';
    
    if (result.type === 'selector' && result.value) {
      const items = result.value.map((item: any) => {
        // Extract just the selector part
        const selector = item.selector;
        if (!selector) return 'unknown';
        
        if (selector.type === 'function') {
          const args = selector.args?.map((arg: any) => arg.image).join(',') || '';
          return `${selector.name}(${args})`;
        } else if (selector.type === 'range') {
          return `${selector.min?.image || ''}${selector.range}${selector.max?.image || ''}`;
        } else if (selector.image) {
          return selector.image;
        } else if (selector.type) {
          return `[${selector.type}]`;
        }
        return 'unknown';
      });
      return items.join(' ');
    }
    
    // Handle single selector (not wrapped in SelectorList)
    if (result.type === 'function') {
      const args = result.args?.map((arg: any) => arg.image).join(',') || '';
      return `${result.name}(${args})`;
    }
    
    if (result.type === 'range') {
      return `${result.min?.image || ''}${result.range}${result.max?.image || ''}`;
    }
    
    if (result.image) {
      return result.image;
    }
    
    return `[${result.type || 'unknown'}]`;
  }
</script>

<div class="container">
  <h1>AdorableCSS Parser Tester</h1>
  
  <!-- 실시간 검증 -->
  <div class="live-test">
    <h3>🔍 Live Parser Test</h3>
    <input bind:value={input} placeholder="Enter AdorableCSS syntax..." />
    
    <div class="live-result">
      {#if error}
        <div class="live-error">
          <span class="status">❌ Parse Error</span>
          <span class="message">{error}</span>
        </div>
      {:else}
        <div class="live-success">
          <span class="status">✅ Success</span>
          <span class="result">{formatParseResult(result)}</span>
        </div>
        {#if css}
          <div class="live-css">
            <span class="css-label">CSS:</span>
            <code>{css}</code>
          </div>
        {/if}
      {/if}
    </div>
  </div>

  <!-- 컨트롤 -->
  <div class="controls">
    <label>
      <input type="checkbox" bind:checked={showTests} />
      AdorableCSS 학습 튜토리얼 보기
    </label>
  </div>

  <!-- 테스트 테이블 -->
  {#if showTests}
    <div class="tutorial-section">
      <h3>AdorableCSS 문법 가이드</h3>
      <p class="tutorial-intro">파서의 문법 규칙을 이해하기 위한 체계적인 학습 가이드입니다.<br>각 섹션은 토큰, 문법 규칙, 파싱 결과를 순서대로 설명합니다.</p>
      
      {#each Object.entries(tutorialGroups) as [groupName, testCases]}
        <div class="tutorial-group">
          <h4 class="group-title">{groupName}</h4>
          
          {#each Object.entries(categorizeTestCases(testCases)) as [category, cases]}
            <div class="category-section">
              <h5 class="category-title">{category}</h5>
              <div class="test-table">
                <div class="test-header">
                  <div class="col-input">AdorableCSS 입력</div>
                  <div class="col-description">문법 설명</div>
                  <div class="col-css">CSS 결과</div>
                </div>
                {#each cases as testCase}
                  {@const testResult = runParseTest(testCase.class)}
                  <div class="test-row {testResult.success ? 'success' : 'error'}">
                    <div class="col-input">
                      <code>{testCase.class}</code>
                    </div>
                    <div class="col-description">
                      <span class="description-text">{testCase.description}</span>
                    </div>
                    <div class="col-css">
                      {#if testResult.success && testResult.cssResult}
                        <code class="css-code">{testResult.cssResult}</code>
                      {:else if testResult.success}
                        <span class="no-css">No CSS</span>
                      {:else}
                        <span class="error-text">{testResult.error}</span>
                      {/if}
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem 1rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    font-size: 0.875rem;
    line-height: 1.5;
    color: #1a1a1a;
    background: #ffffff;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: #1a1a1a;
    font-size: 1.75rem;
    font-weight: 300;
    letter-spacing: -0.025em;
  }
  
  h3 {
    margin: 0 0 1rem 0;
    color: #374151;
    font-weight: 400;
    font-size: 1.125rem;
    letter-spacing: -0.025em;
  }
  
  /* 실시간 테스트 */
  .live-test {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .live-test input {
    width: 100%;
    padding: 0.875rem 1rem;
    font-size: 0.875rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    margin-bottom: 1rem;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
    background: #ffffff;
    transition: border-color 0.15s ease;
  }
  
  .live-test input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  .live-result {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    padding: 1rem;
  }
  
  .live-success, .live-error {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  .live-success:last-child, .live-error:last-child {
    margin-bottom: 0;
  }
  
  .status {
    font-weight: 600;
    font-size: 0.75rem;
  }
  
  .result {
    font-family: 'Fira Code', monospace;
    font-size: 0.75rem;
    color: #495057;
    flex: 1;
    word-break: break-all;
  }
  
  .message {
    color: #dc3545;
    font-size: 0.75rem;
    flex: 1;
  }
  
  .live-css {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid #e9ecef;
  }
  
  .css-label {
    font-weight: 600;
    font-size: 0.75rem;
    color: #6c757d;
  }
  
  .live-css code {
    font-family: 'Fira Code', monospace;
    font-size: 0.75rem;
    background: #f8f9fa;
    padding: 0.25rem 0.5rem;
    border-radius: 3px;
    flex: 1;
    word-break: break-all;
  }
  
  /* 컨트롤 */
  .controls {
    margin-bottom: 2rem;
    padding: 1rem;
    background: transparent;
    border-radius: 0;
    border: none;
  }
  
  .controls label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-weight: 400;
    font-size: 0.875rem;
    color: #374151;
    cursor: pointer;
  }
  
  /* 튜토리얼 섹션 */
  .tutorial-section {
    background: transparent;
    border-radius: 0;
    border: none;
    padding: 0;
    width: 100%;
    max-width: 1400px;
    margin: 0;
  }
  
  .tutorial-intro {
    color: #6b7280;
    font-size: 1rem;
    margin-bottom: 3rem;
    text-align: center;
    font-weight: 300;
    line-height: 1.6;
  }
  
  .tutorial-group {
    margin-bottom: 4rem;
  }
  
  .tutorial-group:last-child {
    margin-bottom: 0;
  }
  
  .category-section {
    margin-bottom: 2rem;
  }
  
  .category-section:last-child {
    margin-bottom: 0;
  }
  
  .category-title {
    background: #f3f4f6;
    color: #1f2937;
    padding: 0.5rem 0.75rem;
    margin: 0 0 0.75rem 0;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 500;
    border-left: 3px solid #6b7280;
  }
  
  .group-title {
    background: transparent;
    color: #1f2937;
    padding: 0;
    margin: 0 0 1.5rem 0;
    border-radius: 0;
    font-size: 1.25rem;
    font-weight: 500;
    text-align: left;
    box-shadow: none;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 0.75rem;
  }
  
  .test-table {
    background: transparent;
    border-radius: 0;
    overflow: hidden;
    border: none;
    width: 100%;
  }
  
  .test-header {
    display: grid;
    grid-template-columns: 180px 420px 340px;
    background: #f9fafb;
    color: #374151;
    font-weight: 500;
    font-size: 0.75rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .test-header > div {
    padding: 0.5rem 0.75rem;
    border-right: none;
  }
  
  
  .test-row {
    display: grid;
    grid-template-columns: 180px 420px 340px;
    border-bottom: 1px solid #f3f4f6;
    transition: background-color 0.15s ease;
    font-size: 0.75rem;
  }
  
  .test-row:hover {
    background: #f9fafb;
  }
  
  .test-row.success {
    border-left: none;
  }
  
  .test-row.error {
    border-left: none;
    background: #fef2f2;
  }
  
  .test-row > div {
    padding: 0.5rem 0.75rem;
    border-right: none;
    display: flex;
    align-items: center;
    min-height: auto;
    overflow: hidden;
  }
  
  
  .group-badge {
    background: linear-gradient(135deg, #6c757d, #495057);
    color: white;
    padding: 0.2rem 0.4rem;
    border-radius: 6px;
    font-size: 0.65rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
  
  .category-badge {
    background: #e5e7eb;
    color: #374151;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.7rem;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
  
  .description-text {
    color: #6b7280;
    font-size: 0.75rem;
    word-break: keep-all;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .col-input code {
    background: #f3f4f6;
    padding: 0.1rem 0.2rem;
    border-radius: 4px;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
    font-size: 0.75rem;
    border: 1px solid #e5e7eb;
    color: #1f2937;
  }
  
  .css-code {
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
    font-size: 0.6rem;
    color: #059669;
    background: #ecfdf5;
    padding: 0.125rem 0.25rem;
    border-radius: 3px;
    word-break: break-all;
    border: 1px solid #d1fae5;
  }
  
  .no-css {
    font-size: 0.6rem;
    color: #9ca3af;
    font-style: italic;
  }
  
  .error-text {
    color: #dc2626;
    font-size: 0.6rem;
    font-style: italic;
  }
  
  .status-success, .status-error {
    font-size: 0.9rem;
  }
  
  @media (max-width: 1200px) {
    .tutorial-section {
      max-width: 100%;
      overflow-x: auto;
    }
    
    .test-table {
      min-width: 940px;
    }
  }
  
  @media (max-width: 800px) {
    .container {
      padding: 0.5rem;
    }
    
    .test-header,
    .test-row {
      grid-template-columns: 1fr;
      gap: 1px;
      min-width: auto;
    }
    
    .test-table {
      min-width: auto;
    }
    
    .test-header > div,
    .test-row > div {
      border-right: none;
      border-bottom: 1px solid #e9ecef;
      padding: 0.4rem;
    }
    
    .test-header > div:last-child,
    .test-row > div:last-child {
      border-bottom: none;
    }
    
    .test-header > div::before {
      content: attr(data-label) ": ";
      font-weight: bold;
      display: inline-block;
      min-width: 80px;
    }
    
    .col-input::before { content: "입력"; }
    .col-description::before { content: "설명"; }
    .col-css::before { content: "CSS"; }
  }
</style>