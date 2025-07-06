<script>
  import { onMount } from 'svelte';
  import { generateCSSFromAdorableCSS } from 'adorable-css';
  import Card from '$lib/components/ui/Card.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { writable } from 'svelte/store'; // For toast messages

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

  // Toast message store (for copy feedback)
  const toastMessage = writable('');
  let toastTimeout;

  function showToast(message) {
    clearTimeout(toastTimeout);
    toastMessage.set(message);
    toastTimeout = setTimeout(() => toastMessage.set(''), 2000);
  }

  // CSS 생성 함수 - 파서 동작 확인용
  function parseAndGenerate(input) {
    try {
      const css = generateCSSFromAdorableCSS(input);
      
      // For this page, we only care if it parses without error, not the actual CSS output
      return {
        parsed: true,
        css: css // Keep css for potential future use or debugging, but not displayed
      };
    } catch (error) {
      return {
        parsed: false,
        css: '',
        error: error.message || 'Parse error'
      };
    }
  }

  // Function to copy text to clipboard
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      showToast('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      showToast('Failed to copy!');
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

  function handleTestButtonClick() {
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

<div class="bg(mute-50) min-h(screen) pb(6xl)">
  <!-- Hero Section -->
  <section class="bg(white) py(8xl) border-b(1/mute-200)">
    <div class="container(6xl) mx(auto) px(3xl) text(center)">
      <Badge variant="outline" class="mb(lg)">Parser Reference</Badge>
      <h1 class="heading(h1) c(mute-900) mb(md)">AdorableCSS Syntax Playground</h1>
      <p class="body(xl) c(mute-600) max-w(5xl) mx(auto)">
        Explore and test AdorableCSS syntax patterns. See how your input translates into CSS in real-time.
      </p>
    </div>
  </section>

  <div class="container(6xl) mx(auto) px(3xl) py(6xl)">
    <div class="vbox gap(6xl)">
      {#each Object.entries(syntaxPatterns) as [category, patterns]}
        <section>
          <h2 class="heading(h2) c(mute-900) mb(3xl)">{category}</h2>
          
          <div class="grid(1) md:grid(2) lg:grid(3) gap(2xl)">
            {#each patterns as pattern, i}
              {@const result = results[category]?.[i]?.result}
              <div class="bg(white) p(lg) r(md) shadow(sm) vbox gap(md)">
                <div class="hbox items(center) gap(md)">
                  {#if result}
                    <span class="{result.parsed ? 'c(success)' : 'c(error)'} bold text(xl)">
                      {result.parsed ? '✓' : '✗'}
                    </span>
                  {:else}
                    <span class="c(mute-400) text(xl)">...</span>
                  {/if}
                  <code class="inline-block bg(primary/0.1) c(primary) px(sm) py(xs) r(sm) font(mono) text(sm) flex-grow">{pattern.input}</code>
                </div>
                <p class="body(sm) c(mute-700)">
                  {pattern.description}
                </p>
              </div>
            {/each}
          </div>
        </section>
      {/each}
    </div>

    <!-- Parser Test Input -->
    <section class="mt(6xl)">
      <h2 class="heading(h2) c(mute-900) mb(3xl)">Test Your Own Pattern</h2>
      <Card variant="interactive">
        <div class="p(3xl) grid(1) md:grid(2) gap(2xl) items(start)">
          <div class="vbox gap(sm)">
            <label for="test-input" class="label c(mute-700)">Enter AdorableCSS pattern</label>
            <input 
              id="test-input"
              type="text" 
              placeholder="e.g., hbox(center) p(20) bg(blue-500)"
              class="w(full) p(md) border(1/mute-300) r(md) code(minimal) bg(white) focus:border(primary) focus:ring(2/primary/0.2)"
              bind:value={testInput}
            />
            <Button variant="primary" class="mt(md)" on:click={handleTestButtonClick}>
              Test Pattern
            </Button>
          </div>
          
          <div>
            {#if testResult}
              <Card variant={testResult.parsed ? 'ghost' : 'outlined'} class="{testResult.parsed ? 'bg(success/0.05) border(1/success/0.2)' : 'bg(error/0.05) border(1/error/0.2)'}">
                <div class="p(lg)">
                  <div class="label c({testResult.parsed ? 'success' : 'error'}) mb(sm)">
                    {testResult.parsed ? 'Parsed Successfully' : 'Parse Failed'}
                  </div>
                  {#if testResult.parsed}
                    <pre class="code(minimal) c(mute-700) whitespace(pre-wrap) max-h(150) overflow(auto)">{testResult.css}</pre>
                    <Button variant="ghost" size="sm" class="mt(md)" on:click={() => copyToClipboard(testResult.css)}>
                      Copy Result
                    </Button>
                  {:else}
                    <pre class="code(minimal) c(error) max-h(150) overflow(auto)">{testResult.error}</pre>
                  {/if}
                </div>
              </Card>
            {:else if testInput}
              <Card variant="ghost">
                <div class="p(lg) c(mute-500)">Enter a pattern and click "Test Pattern" to see results.</div>
              </Card>
            {/if}
          </div>
        </div>
      </Card>
    </section>

    <!-- Parser Rules Summary -->
    <section class="mt(6xl)">
      <h2 class="heading(h2) c(mute-900) mb(3xl)">Key Parser Rules & Syntax</h2>
      
      <div class="grid(1) md:grid(2) lg:grid(3) gap(2xl)">
        <Card variant="elevated">
          <div class="p(2xl)">
            <h3 class="heading(h4) c(mute-900) mb(lg)">Separators</h3>
            <div class="vbox gap(md)">
              <div class="hbox gap(md) items(center)">
                <code class="inline-block code(inline) bg(mute-200) px(sm) py(xs) r(sm)">/</code>
                <span class="body(sm) c(mute-600)">Multiple values (e.g., `p(10/20)`)</span>
              </div>
              <div class="hbox gap(md) items(center)">
                <code class="inline-block code(inline) bg(mute-200) px(sm) py(xs) r(sm)">+</code>
                <span class="body(sm) c(mute-600)">Combined values (e.g., `hbox(top+left)`)</span>
              </div>
              <div class="hbox gap(md) items(center)">
                <code class="inline-block code(inline) bg(mute-200) px(sm) py(xs) r(sm)">:</code>
                <span class="body(sm) c(mute-600)">Key-value pairs (e.g., `layer(top:20)`)</span>
              </div>
              <div class="hbox gap(md) items(center)">
                <code class="inline-block code(inline) bg(mute-200) px(sm) py(xs) r(sm)">..</code>
                <span class="body(sm) c(mute-600)">Ranges/gradients (e.g., `bg(red..blue)`)</span>
              </div>
              <div class="hbox gap(md) items(center)">
                <code class="inline-block code(inline) bg(mute-200) px(sm) py(xs) r(sm)">.</code>
                <span class="body(sm) c(mute-600)">Opacity notation (e.g., `c(red.5)`)</span>
              </div>
            </div>
          </div>
        </Card>

        <Card variant="elevated">
          <div class="p(2xl)">
            <h3 class="heading(h4) c(mute-900) mb(lg)">Prefixes</h3>
            <div class="vbox gap(md)">
              <div class="hbox gap(md) items(center)">
                <code class="inline-block code(inline) bg(mute-200) px(sm) py(xs) r(sm)">hover:</code>
                <span class="body(sm) c(mute-600)">Hover state (e.g., `hover:scale(1.05)`)</span>
              </div>
              <div class="hbox gap(md) items(center)">
                <code class="inline-block code(inline) bg(mute-200) px(sm) py(xs) r(sm)">md:</code>
                <span class="body(sm) c(mute-600)">Responsive breakpoint (e.g., `md:w(full)`)</span>
              </div>
              <div class="hbox gap(md) items(center)">
                <code class="inline-block code(inline) bg(mute-200) px(sm) py(xs) r(sm)">!</code>
                <span class="body(sm) c(mute-600)">Important modifier (e.g., `bg(red)!`)</span>
              </div>
              <div class="hbox gap(md) items(center)">
                <code class="inline-block code(inline) bg(mute-200) px(sm) py(xs) r(sm)">group-</code>
                <span class="body(sm) c(mute-600)">Group state (e.g., `group-hover:opacity(1)`)</span>
              </div>
              <div class="hbox gap(md) items(center)">
                <code class="inline-block code(inline) bg(mute-200) px(sm) py(xs) r(sm)">peer-</code>
                <span class="body(sm) c(mute-600)">Peer state (e.g., `peer-focus:ring(2)`)</span>
              </div>
            </div>
          </div>
        </Card>

        <Card variant="elevated">
          <div class="p(2xl)">
            <h3 class="heading(h4) c(mute-900) mb(lg)">Special Values</h3>
            <div class="vbox gap(md)">
              <div class="hbox gap(md) items(center)">
                <code class="inline-block code(inline) bg(mute-200) px(sm) py(xs) r(sm)">auto</code>
                <span class="body(sm) c(mute-600)">Auto keyword</span>
              </div>
              <div class="hbox gap(md) items(center)">
                <code class="inline-block code(inline) bg(mute-200) px(sm) py(xs) r(sm)">none</code>
                <span class="body(sm) c(mute-600)">None keyword</span>
              </div>
              <div class="hbox gap(md) items(center)">
                <code class="inline-block code(inline) bg(mute-200) px(sm) py(xs) r(sm)">full</code>
                <span class="body(sm) c(mute-600)">100% token</span>
              </div>
              <div class="hbox gap(md) items(center)">
                <code class="inline-block code(inline) bg(mute-200) px(sm) py(xs) r(sm)">16:9</code>
                <span class="body(sm) c(mute-600)">Aspect ratio</span>
              </div>
              <div class="hbox gap(md) items(center)">
                <code class="inline-block code(inline) bg(mute-200) px(sm) py(xs) r(sm)">100%-20</code>
                <span class="body(sm) c(mute-600)">Calc (e.g., `w(100%-20)`)</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  </div>

  <!-- Toast Message -->
  {#if $toastMessage}
    <div class="fixed bottom(lg) right(lg) bg(primary) c(white) px(md) py(sm) r(md) shadow(lg) z(50)">
      {$toastMessage}
    </div>
  {/if}
</div>