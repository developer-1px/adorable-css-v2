<script>
  import { onMount } from 'svelte';
  import { generateClass } from 'adorable-css';
  import { Copy, Check } from 'lucide-svelte';

  // 문법 패턴들을 카테고리별로 정리
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
      { input: 'layer(top:10/left:20)', description: 'Multiple key-value pairs' },
      { input: 'layer(fill/20)', description: 'Combined position and z-index' }
    ],
    'Gradients & Ranges': [
      { input: 'bg(red..blue)', description: 'Range/gradient syntax' },
      { input: 'bg(purple-500..pink-500)', description: 'Color gradient' },
      { input: 'bg(90deg/red..blue)', description: 'Directional gradient' },
      { input: 'bg(135deg/purple-500..pink-500)', description: 'Angle gradient' },
      { input: 'bg(to-tr/red..blue)', description: 'Keyword direction' },
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
      { input: 'xl:font(2xl)', description: 'Extra large breakpoint' },
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

  let copiedItems = new Set();
  
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      copiedItems.add(text);
      copiedItems = new Set(copiedItems);
      setTimeout(() => {
        copiedItems.delete(text);
        copiedItems = new Set(copiedItems);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
</script>

<svelte:head>
  <title>Syntax Cheat Sheet - AdorableCSS</title>
</svelte:head>

<div class="min-h(screen) bg(white)">
  <!-- Header -->
  <div class="bg(white) bb(2/gray-900) py(4xl)">
    <div class="container(5xl) mx(auto) px(3xl)">
      <h1 class="display(3xl) font(black) tracking(tight) c(gray-900) mb(md)">Syntax Cheat Sheet</h1>
      <p class="font(lg) c(gray-600) max-w(3xl)">Complete reference guide for AdorableCSS syntax patterns</p>
    </div>
  </div>

  <div class="container(5xl) mx(auto) px(3xl) py(4xl)">
    <div class="vbox gap(4xl)">
      {#each Object.entries(syntaxPatterns) as [category, patterns]}
        <section>
          <h2 class="display(xl) font(black) tracking(tight) c(gray-900) mb(xl) pb(sm) bb(2/gray-900)">{category}</h2>
          
          <!-- Table Format -->
          <div class="border(2/gray-900) bg(white) r(md) overflow(hidden)">
            <div class="hbox border-b(2/gray-900) bg(gray-50)">
              <div class="px(md) py(sm) font(xs) font(bold) tracking(wide) uppercase c(gray-900) w(200px)">Syntax</div>
              <div class="px(md) py(sm) font(xs) font(bold) tracking(wide) uppercase c(gray-900) flex(1) border-l(2/gray-900)">Description</div>
              <div class="px(md) py(sm) font(xs) font(bold) tracking(wide) uppercase c(gray-900) w(60px) border-l(2/gray-900) text(center)">Copy</div>
            </div>
            {#each patterns as pattern}
              <div class="hbox border-b(1/gray-200) hover:bg(gray-50) transition">
                <div class="px(md) py(md) w(200px) vbox(center/start)">
                  <code class="font(mono) font(xs) px(xs) py(2xs) bg(gray-100) c(gray-900) r(xs) break-all">{pattern.input}</code>
                </div>
                <div class="px(md) py(md) flex(1) border-l(1/gray-200) vbox(center/start)">
                  <span class="font(xs) c(gray-700) leading(relaxed)">{pattern.description}</span>
                </div>
                <div class="px(md) py(md) w(60px) border-l(1/gray-200) hbox(center/middle)">
                  <button 
                    class="p(xs) r(sm) border(1/gray-300) hover:bg(gray-100) transition hbox(center/middle)"
                    on:click={() => copyToClipboard(pattern.input)}
                    title="Copy to clipboard"
                  >
                    {#if copiedItems.has(pattern.input)}
                      <Check size="14" class="c(green-600)" />
                    {:else}
                      <Copy size="14" class="c(gray-600)" />
                    {/if}
                  </button>
                </div>
              </div>
            {/each}
          </div>
        </section>
      {/each}
    </div>

    <!-- Quick Reference Symbols -->
    <section class="bg(gray-50) border(2/gray-900) p(3xl)">
      <h2 class="display(xl) font(black) tracking(tight) c(gray-900) mb(xl)">Quick Reference</h2>
      
      <div class="grid(1) sm:grid(2) lg:grid(3) gap(xl)">
        <!-- Separators -->
        <div class="vbox gap(md)">
          <h3 class="font(base) font(bold) c(gray-900)">Separators</h3>
          <div class="vbox gap(xs)">
            <div class="hbox gap(sm) items(center)">
              <code class="font(mono) font(bold) px(xs) py(2xs) bg(gray-200) c(gray-900) r(xs) min-w(24px) text(center)">/</code>
              <span class="font(xs) c(gray-700)">Multiple values</span>
            </div>
            <div class="hbox gap(sm) items(center)">
              <code class="font(mono) font(bold) px(xs) py(2xs) bg(gray-200) c(gray-900) r(xs) min-w(24px) text(center)">+</code>
              <span class="font(xs) c(gray-700)">Combined values</span>
            </div>
            <div class="hbox gap(sm) items(center)">
              <code class="font(mono) font(bold) px(xs) py(2xs) bg(gray-200) c(gray-900) r(xs) min-w(24px) text(center)">:</code>
              <span class="font(xs) c(gray-700)">Key-value pairs</span>
            </div>
            <div class="hbox gap(sm) items(center)">
              <code class="font(mono) font(bold) px(xs) py(2xs) bg(gray-200) c(gray-900) r(xs) min-w(24px) text(center)">..</code>
              <span class="font(xs) c(gray-700)">Gradients/ranges</span>
            </div>
            <div class="hbox gap(sm) items(center)">
              <code class="font(mono) font(bold) px(xs) py(2xs) bg(gray-200) c(gray-900) r(xs) min-w(24px) text(center)">.</code>
              <span class="font(xs) c(gray-700)">Opacity notation</span>
            </div>
          </div>
        </div>

        <!-- Prefixes -->
        <div class="vbox gap(md)">
          <h3 class="font(base) font(bold) c(gray-900)">Prefixes</h3>
          <div class="vbox gap(xs)">
            <div class="hbox gap(sm) items(center)">
              <code class="font(mono) font(bold) px(xs) py(2xs) bg(gray-200) c(gray-900) r(xs) min-w(40px) text(center)">hover:</code>
              <span class="font(xs) c(gray-700)">Hover state</span>
            </div>
            <div class="hbox gap(sm) items(center)">
              <code class="font(mono) font(bold) px(xs) py(2xs) bg(gray-200) c(gray-900) r(xs) min-w(40px) text(center)">md:</code>
              <span class="font(xs) c(gray-700)">Responsive</span>
            </div>
            <div class="hbox gap(sm) items(center)">
              <code class="font(mono) font(bold) px(xs) py(2xs) bg(gray-200) c(gray-900) r(xs) min-w(40px) text(center)">group-</code>
              <span class="font(xs) c(gray-700)">Group state</span>
            </div>
            <div class="hbox gap(sm) items(center)">
              <code class="font(mono) font(bold) px(xs) py(2xs) bg(gray-200) c(gray-900) r(xs) min-w(40px) text(center)">peer-</code>
              <span class="font(xs) c(gray-700)">Peer state</span>
            </div>
            <div class="hbox gap(sm) items(center)">
              <code class="font(mono) font(bold) px(xs) py(2xs) bg(gray-200) c(gray-900) r(xs) min-w(40px) text(center)">!</code>
              <span class="font(xs) c(gray-700)">Important</span>
            </div>
          </div>
        </div>

        <!-- Special Values -->
        <div class="vbox gap(md)">
          <h3 class="font(base) font(bold) c(gray-900)">Special Values</h3>
          <div class="vbox gap(xs)">
            <div class="hbox gap(sm) items(center)">
              <code class="font(mono) font(bold) px(xs) py(2xs) bg(gray-200) c(gray-900) r(xs) min-w(36px) text(center)">auto</code>
              <span class="font(xs) c(gray-700)">Auto keyword</span>
            </div>
            <div class="hbox gap(sm) items(center)">
              <code class="font(mono) font(bold) px(xs) py(2xs) bg(gray-200) c(gray-900) r(xs) min-w(36px) text(center)">full</code>
              <span class="font(xs) c(gray-700)">100% token</span>
            </div>
            <div class="hbox gap(sm) items(center)">
              <code class="font(mono) font(bold) px(xs) py(2xs) bg(gray-200) c(gray-900) r(xs) min-w(36px) text(center)">16:9</code>
              <span class="font(xs) c(gray-700)">Aspect ratio</span>
            </div>
            <div class="hbox gap(sm) items(center)">
              <code class="font(mono) font(bold) px(xs) py(2xs) bg(gray-200) c(gray-900) r(xs) min-w(36px) text(center)">-10</code>
              <span class="font(xs) c(gray-700)">Negative value</span>
            </div>
            <div class="hbox gap(sm) items(center)">
              <code class="font(mono) font(bold) px(xs) py(2xs) bg(gray-200) c(gray-900) r(xs) min-w(36px) text(center)">calc()</code>
              <span class="font(xs) c(gray-700)">CSS calc</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>