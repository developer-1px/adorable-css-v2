<script>
  import { onMount } from 'svelte';
  import { generateCSSFromAdorableCSS } from 'adorable-css';

  // 파서 문법 패턴들을 카테고리별로 정리
  const syntaxPatterns = {
    'Basic Syntax': [
      { input: 'relative', description: 'Keyword rule without arguments' },
      { input: 'w(full)', description: 'Single value' },
      { input: 'p(10)', description: 'Numeric value' },
      { input: 'w(100px)', description: 'Value with unit' },
      { input: 'p(md)', description: 'Token reference' },
      { input: 'btn-primary', description: 'Hyphenated rule name' },
      { input: 'inline_block', description: 'Underscored rule name' }
    ],
    'Multiple Values': [
      { input: 'p(10/20)', description: 'Slash separator' },
      { input: 'border(1/solid/gray-200)', description: 'Multiple slash values' },
      { input: 'p(10/20/30/40)', description: 'Four values' },
      { input: 'font(16/1.5)', description: 'Numeric slash values' },
      { input: 'font(lg/1.6/-1%)', description: 'Token slash values' }
    ],
    'Complex Values': [
      { input: 'hbox(top+left)', description: 'Plus operator (combine values)' },
      { input: 'layer(top:20)', description: 'Colon separator (key:value)' },
      { input: 'layer(center)', description: 'Single position value' },
      { input: 'layer(top:10/left:20)', description: 'Multiple key-value pairs (slash separated)' },
      { input: 'layer(fill/20)', description: 'Combined position and z-index' }
    ],
    'Gradients & Ranges': [
      { input: 'bg(red..blue)', description: 'Range/gradient syntax' },
      { input: 'bg(purple-500..pink-500)', description: 'Color gradient' },
      { input: 'bg(90deg/red..blue)', description: 'Directional gradient' },
      { input: 'bg(135deg/purple-500..pink-500)', description: 'Angle gradient' },
      { input: 'bg(to-tr/red..blue)', description: 'Keyword direction gradient' },
      { input: 'c(45deg/purple-500..pink-500)', description: 'Text gradient' }
    ],
    'Opacity Notation': [
      { input: 'c(red.5)', description: 'Dot opacity (50%)' },
      { input: 'bg(black.1)', description: 'Dot opacity (10%)' },
      { input: 'c(blue-500.05)', description: 'Dot opacity (5%)' },
      { input: 'bg(primary.8)', description: 'Token with opacity' },
      { input: 'border(1/gray-200.5)', description: 'Border with opacity' }
    ],
    'Calculations': [
      { input: 'w(100%-20)', description: 'Percentage minus pixels' },
      { input: 'h(50%+10)', description: 'Percentage plus pixels' },
      { input: 'w(full-20)', description: 'Token with calculation' },
      { input: 'h(100vh-60)', description: 'Viewport units calculation' }
    ],
    'State Prefixes': [
      { input: 'hover:scale(1.05)', description: 'Hover state' },
      { input: 'focus:ring(2/blue-500)', description: 'Focus state' },
      { input: 'active:scale(0.95)', description: 'Active state' },
      { input: 'disabled:opacity(0.5)', description: 'Disabled state' },
      { input: 'checked:bg(blue-500)', description: 'Checked state' },
      { input: 'hover:focus:c(blue-700)', description: 'Multiple states' }
    ],
    'Responsive Prefixes': [
      { input: 'sm:hidden', description: 'Small breakpoint' },
      { input: 'md:w(full)', description: 'Medium breakpoint' },
      { input: 'lg:grid(4)', description: 'Large breakpoint' },
      { input: 'xl:text(2xl)', description: 'Extra large breakpoint' },
      { input: '..md:hidden', description: 'Up to medium' },
      { input: 'md..lg:block', description: 'Between medium and large' }
    ],
    'Special Syntax': [
      { input: 'size(16:9)', description: 'Aspect ratio' },
      { input: 'size(320x200)', description: 'Dimensions' },
      { input: 'w(auto)', description: 'Auto keyword' },
      { input: 'display(none)', description: 'None keyword' },
      { input: 'c(inherit)', description: 'Inherit keyword' },
      { input: 'bg(red)!', description: 'Important modifier' }
    ],
    'Nested & Combined': [
      { input: 'hover:md:scale(1.1)', description: 'State + responsive' },
      { input: 'md:hover:bg(gray-100)', description: 'Responsive + state' },
      { input: 'group-hover:opacity(1)', description: 'Group hover' },
      { input: 'peer-focus:ring(2)', description: 'Peer focus' },
      { input: 'w(full)!', description: 'Rule with important' }
    ],
    'Edge Cases': [
      { input: 'p()', description: 'Empty parentheses' },
      { input: 'p( )', description: 'Whitespace in parentheses' },
      { input: 'p(0)', description: 'Zero value' },
      { input: 'mt(-10)', description: 'Negative value' },
      { input: 'c(--custom-var)', description: 'CSS variable' },
      { input: 'w(calc(100%-20px))', description: 'CSS calc function' }
    ]
  };

  let results = {};
  let testInput = '';
  let testResult = null;

  // CSS 생성 함수 - 파서 동작 확인용
  function parseAndGenerate(input) {
    try {
      const css = generateCSSFromAdorableCSS(input);
      
      if (!css || css.trim() === '') {
        return {
          parsed: false,
          css: '',
          error: 'No CSS generated'
        };
      }
      
      return {
        parsed: true,
        css: css
      };
    } catch (error) {
      return {
        parsed: false,
        css: '',
        error: error.message || 'Parse error'
      };
    }
  }

  onMount(async () => {
    // 디버깅: generateCSSFromAdorableCSS 함수 확인
    console.log('generateCSSFromAdorableCSS:', typeof generateCSSFromAdorableCSS);
    
    // 몇 가지 간단한 테스트
    try {
      console.log('Test 1 - relative:', generateCSSFromAdorableCSS('relative'));
      console.log('Test 2 - w(full):', generateCSSFromAdorableCSS('w(full)'));
      console.log('Test 3 - p(10):', generateCSSFromAdorableCSS('p(10)'));
    } catch (e) {
      console.error('Test error:', e);
    }
    
    // 모든 패턴의 파싱 결과 생성
    Object.keys(syntaxPatterns).forEach(category => {
      results[category] = syntaxPatterns[category].map(pattern => ({
        ...pattern,
        result: parseAndGenerate(pattern.input)
      }));
    });
    results = { ...results };
  });

  function handleTestInput() {
    if (testInput) {
      testResult = parseAndGenerate(testInput);
    } else {
      testResult = null;
    }
  }
</script>

<svelte:head>
  <title>Parser Syntax Test - AdorableCSS</title>
</svelte:head>

<div class="section(xl) p(5xl)">
  <div class="">
    <header class="prose prose(center) mb(xl)">
      <h1 class="heading heading(lg)">Parser Syntax Test</h1>
      <p class="body c(gray-600)">
        Comprehensive test of AdorableCSS parser patterns and edge cases
      </p>
    </header>

    <div class="vbox gap(2xl)">
      {#each Object.entries(syntaxPatterns) as [category, patterns]}
        <section>
          <h2 class="heading heading(md) mb(lg)">{category}</h2>
          
          <div class="table-wrapper">
            <table class="table table-fixed">
              <thead>
                <tr>
                  <th class="text(center) w(60)">Parse</th>
                  <th class="w(250)">Pattern</th>
                  <th class="w(400)">Description</th>
                  <th>CSS Output</th>
                </tr>
              </thead>
              <tbody>
                {#each patterns as pattern, i}
                  {@const result = results[category]?.[i]?.result}
                  <tr>
                    <td class="text(center)">
                      {#if result}
                        <span class="{result.parsed ? 'c(green-600)' : 'c(red-600)'} bold text(lg)">
                          {result.parsed ? '✓' : '✗'}
                        </span>
                      {:else}
                        <span class="c(gray-400)">...</span>
                      {/if}
                    </td>
                    <td class="font(mono)">
                      <code class="c(purple-700) bg(purple-50) px(xs) py(1) radius(sm)">{pattern.input}</code>
                    </td>
                    <td>
                      {pattern.description}
                    </td>
                    <td class="font(mono) text(xs)">
                      {#if result}
                        {#if result.parsed}
                          <code class="c(gray-600) break(all)">{result.css}</code>
                        {:else}
                          <code class="c(red-600)">{result.error}</code>
                        {/if}
                      {:else}
                        <span class="c(gray-400)">Loading...</span>
                      {/if}
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </section>
      {/each}
    </div>

    <!-- Parser Test Input -->
    <section class="card mt(2xl)">
      <h2 class="heading heading(md) mb(lg)">Test Custom Pattern</h2>
      
      <div class="hbox gap(lg)">
        <input 
          type="text" 
          placeholder="Enter any pattern to test..."
          class="flex(1) p(md) border(1/gray-300) radius(md) font(mono)"
          bind:value={testInput}
          on:input={handleTestInput}
        />
        
        <div class="flex(1)">
          {#if testResult}
            <div class="p(md) radius(md) border(1/{testResult.parsed ? 'green-200' : 'red-200'}) bg({testResult.parsed ? 'green-50' : 'red-50'})">
              <div class="label c({testResult.parsed ? 'green-700' : 'red-700'}) mb(sm)">
                {testResult.parsed ? 'Parsed Successfully' : 'Parse Failed'}
              </div>
              {#if testResult.parsed}
                <pre class="font(mono) text(xs) c(gray-700) whitespace(pre-wrap)">{testResult.css}</pre>
              {:else}
                <pre class="font(mono) text(xs) c(red-600)">{testResult.error}</pre>
              {/if}
            </div>
          {/if}
        </div>
      </div>
    </section>

    <!-- Parser Rules Summary -->
    <section class="prose mt(2xl)">
      <h2 class="heading heading(md)">Parser Rules</h2>
      
      <div class="grid(1) md:grid(3) gap(lg) mt(lg)">
        <div class="card">
          <h3 class="label mb(sm)">Separators</h3>
          <ul class="vbox gap(xs) text(sm)">
            <li><code class="font(mono) bg(gray-100) px(xs)">/</code> - Multiple values</li>
            <li><code class="font(mono) bg(gray-100) px(xs)">+</code> - Combined values</li>
            <li><code class="font(mono) bg(gray-100) px(xs)">:</code> - Key-value pairs</li>
            <li><code class="font(mono) bg(gray-100) px(xs)">..</code> - Ranges/gradients</li>
            <li><code class="font(mono) bg(gray-100) px(xs)">.</code> - Opacity notation</li>
          </ul>
        </div>

        <div class="card">
          <h3 class="label mb(sm)">Prefixes</h3>
          <ul class="vbox gap(xs) text(sm)">
            <li><code class="font(mono) bg(gray-100) px(xs)">hover:</code> - Hover state</li>
            <li><code class="font(mono) bg(gray-100) px(xs)">md:</code> - Responsive</li>
            <li><code class="font(mono) bg(gray-100) px(xs)">!</code> - Important</li>
            <li><code class="font(mono) bg(gray-100) px(xs)">group-</code> - Group state</li>
            <li><code class="font(mono) bg(gray-100) px(xs)">..</code> - Range prefix</li>
          </ul>
        </div>

        <div class="card">
          <h3 class="label mb(sm)">Special Values</h3>
          <ul class="vbox gap(xs) text(sm)">
            <li><code class="font(mono) bg(gray-100) px(xs)">auto</code> - Auto keyword</li>
            <li><code class="font(mono) bg(gray-100) px(xs)">none</code> - None keyword</li>
            <li><code class="font(mono) bg(gray-100) px(xs)">full</code> - 100% token</li>
            <li><code class="font(mono) bg(gray-100) px(xs)">16:9</code> - Aspect ratio</li>
            <li><code class="font(mono) bg(gray-100) px(xs)">100%-20</code> - Calc</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</div>