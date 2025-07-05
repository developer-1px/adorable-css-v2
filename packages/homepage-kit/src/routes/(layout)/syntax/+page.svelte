<script>
  import { onMount } from 'svelte';
  import { generateCSSFromAdorableCSS } from 'adorable-css';
  import Card from '$lib/components/ui/Card.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import Button from '$lib/components/ui/Button.svelte';

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
      { input: 'border(1/solid/mute-200)', description: 'Multiple slash values' },
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
      { input: 'border(1/mute-200.5)', description: 'Border with opacity' }
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
      { input: 'md:hover:bg(mute-100)', description: 'Responsive + state' },
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

<div class="bg(mute-50) min-h(screen)">
  <!-- Hero Section -->
  <section class="bg(white) py(6xl) border-b(1/mute-200)">
    <div class="container(5xl) mx(auto) px(2xl)">
      <div class="vbox gap(lg) text(center)">
        <Badge variant="outline">Parser Reference</Badge>
        <h1 class="heading(h1) c(mute-900)">Parser Syntax Test</h1>
        <p class="body(lg) c(mute-600) max-w(4xl) mx(auto)">
          Comprehensive test of AdorableCSS parser patterns and edge cases
        </p>
      </div>
    </div>
  </section>

  <div class="container(5xl) mx(auto) px(2xl) py(6xl)">
    <div class="vbox gap(4xl)">
      {#each Object.entries(syntaxPatterns) as [category, patterns]}
        <section>
          <h2 class="heading(h2) c(mute-900) mb(2xl)">{category}</h2>
          
          <Card variant="elevated">
            <div class="overflow(auto)">
              <table class="w(full) text(left)">
                <thead class="border-b(1/mute-200)">
                  <tr>
                    <th class="p(lg) text(center) w(80)">Parse</th>
                    <th class="p(lg) w(280)">Pattern</th>
                    <th class="p(lg) w(420)">Description</th>
                    <th class="p(lg)">CSS Output</th>
                  </tr>
                </thead>
                <tbody class="divide-y(1/mute-100)">
                  {#each patterns as pattern, i}
                    {@const result = results[category]?.[i]?.result}
                    <tr class="hover:bg(mute-50)">
                      <td class="p(lg) text(center)">
                        {#if result}
                          <span class="{result.parsed ? 'c(success)' : 'c(error)'} bold text(xl)">
                            {result.parsed ? '✓' : '✗'}
                          </span>
                        {:else}
                          <span class="c(mute-400)">...</span>
                        {/if}
                      </td>
                      <td class="p(lg)">
                        <code class="inline-block bg(primary/0.1) c(primary) px(sm) py(xs) r(sm) font(mono) text(sm)">{pattern.input}</code>
                      </td>
                      <td class="p(lg) body(sm) c(mute-700)">
                        {pattern.description}
                      </td>
                      <td class="p(lg)">
                        {#if result}
                          {#if result.parsed}
                            <code class="block code(minimal) c(mute-600) whitespace(pre-wrap)">{result.css}</code>
                          {:else}
                            <code class="block code(minimal) c(error)">{result.error}</code>
                          {/if}
                        {:else}
                          <span class="c(mute-400)">Loading...</span>
                        {/if}
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      {/each}
    </div>

    <!-- Parser Test Input -->
    <section class="mt(6xl)">
      <Card variant="interactive">
        <div class="p(3xl)">
          <h2 class="heading(h3) c(mute-900) mb(2xl)">Test Custom Pattern</h2>
          
          <div class="grid(2) gap(2xl)">
            <div class="vbox gap(sm)">
              <label class="label c(mute-700)">Enter pattern</label>
              <input 
                type="text" 
                placeholder="Enter any pattern to test..."
                class="w(full) p(md) border(1/mute-300) r(md) code(minimal) bg(white) focus:border(primary) focus:ring(2/primary/0.2)"
                bind:value={testInput}
                on:input={handleTestInput}
              />
            </div>
            
            <div>
              {#if testResult}
                <Card variant={testResult.parsed ? 'ghost' : 'outlined'}>
                  <div class="p(lg) {testResult.parsed ? 'bg(success/0.05) border(1/success/0.2)' : 'bg(error/0.05) border(1/error/0.2)'}">
                    <div class="label c({testResult.parsed ? 'success' : 'error'}) mb(sm)">
                      {testResult.parsed ? 'Parsed Successfully' : 'Parse Failed'}
                    </div>
                    {#if testResult.parsed}
                      <pre class="code(minimal) c(mute-700) whitespace(pre-wrap)">{testResult.css}</pre>
                    {:else}
                      <pre class="code(minimal) c(error)">{testResult.error}</pre>
                    {/if}
                  </div>
                </Card>
              {/if}
            </div>
          </div>
        </div>
      </Card>
    </section>

    <!-- Parser Rules Summary -->
    <section class="mt(6xl)">
      <h2 class="heading(h2) c(mute-900) mb(3xl)">Parser Rules</h2>
      
      <div class="grid(3) gap(2xl)">
        <Card>
          <div class="p(2xl)">
            <h3 class="heading(h4) c(mute-900) mb(lg)">Separators</h3>
            <div class="vbox gap(sm)">
              <div class="hbox gap(md)">
                <code class="inline-block code(inline)">/</code>
                <span class="body(sm) c(mute-600)">Multiple values</span>
              </div>
              <div class="hbox gap(md)">
                <code class="inline-block code(inline)">+</code>
                <span class="body(sm) c(mute-600)">Combined values</span>
              </div>
              <div class="hbox gap(md)">
                <code class="inline-block code(inline)">:</code>
                <span class="body(sm) c(mute-600)">Key-value pairs</span>
              </div>
              <div class="hbox gap(md)">
                <code class="inline-block code(inline)">..</code>
                <span class="body(sm) c(mute-600)">Ranges/gradients</span>
              </div>
              <div class="hbox gap(md)">
                <code class="inline-block code(inline)">.</code>
                <span class="body(sm) c(mute-600)">Opacity notation</span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div class="p(2xl)">
            <h3 class="heading(h4) c(mute-900) mb(lg)">Prefixes</h3>
            <div class="vbox gap(sm)">
              <div class="hbox gap(md)">
                <code class="inline-block code(inline)">hover:</code>
                <span class="body(sm) c(mute-600)">Hover state</span>
              </div>
              <div class="hbox gap(md)">
                <code class="inline-block code(inline)">md:</code>
                <span class="body(sm) c(mute-600)">Responsive</span>
              </div>
              <div class="hbox gap(md)">
                <code class="inline-block code(inline)">!</code>
                <span class="body(sm) c(mute-600)">Important</span>
              </div>
              <div class="hbox gap(md)">
                <code class="inline-block code(inline)">group-</code>
                <span class="body(sm) c(mute-600)">Group state</span>
              </div>
              <div class="hbox gap(md)">
                <code class="inline-block code(inline)">..</code>
                <span class="body(sm) c(mute-600)">Range prefix</span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div class="p(2xl)">
            <h3 class="heading(h4) c(mute-900) mb(lg)">Special Values</h3>
            <div class="vbox gap(sm)">
              <div class="hbox gap(md)">
                <code class="inline-block code(inline)">auto</code>
                <span class="body(sm) c(mute-600)">Auto keyword</span>
              </div>
              <div class="hbox gap(md)">
                <code class="inline-block code(inline)">none</code>
                <span class="body(sm) c(mute-600)">None keyword</span>
              </div>
              <div class="hbox gap(md)">
                <code class="inline-block code(inline)">full</code>
                <span class="body(sm) c(mute-600)">100% token</span>
              </div>
              <div class="hbox gap(md)">
                <code class="inline-block code(inline)">16:9</code>
                <span class="body(sm) c(mute-600)">Aspect ratio</span>
              </div>
              <div class="hbox gap(md)">
                <code class="inline-block code(inline)">100%-20</code>
                <span class="body(sm) c(mute-600)">Calc</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  </div>
</div>