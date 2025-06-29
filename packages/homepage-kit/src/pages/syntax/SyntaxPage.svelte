<script lang="ts">
import { parseAdorableCSS, generateCSSFromAdorableCSS } from 'adorable-css';
import Code from '$lib/components/Code.svelte';
import { ChevronRight, Terminal, Zap, BookOpen, Code2, FileText } from 'lucide-svelte';

let input = 'hbox(pack) gap(lg) p(xl) bg(primary) r(lg) shadow(lg)';
let result: any = null;
let css = '';

$: {
  try {
    result = parseAdorableCSS(input);
    css = generateCSSFromAdorableCSS(input);
  } catch (e) {
    css = '';
  }
}

// Quick reference data
const syntaxReference = [
  { pattern: 'property(value)', desc: 'Basic syntax', example: 'w(300)', output: 'width: 300px' },
  { pattern: 'property(val1/val2)', desc: 'Multiple values', example: 'p(16/24)', output: 'padding: 16px 24px' },
  { pattern: 'prefix:property', desc: 'Responsive/State', example: 'hover:bg(primary)', output: '&:hover { background: var(--colors-primary) }' },
  { pattern: 'property!', desc: 'Important', example: 'hidden!', output: 'display: none !important' },
];

// Grammar tokens
const grammarTokens = [
  { name: 'ident', pattern: '[a-zA-Z-]+', desc: 'Identifier', examples: ['hidden', 'primary', 'Inter'] },
  { name: 'dimension', pattern: '[0-9]+[a-z%]*', desc: 'Number with unit', examples: ['300px', '50%', '1.5rem'] },
  { name: 'hexcolor', pattern: '#[0-9a-f]{3,8}', desc: 'Hex color', examples: ['#fff', '#ff0000', '#00ff0080'] },
  { name: 'range', pattern: 'val..val', desc: 'Min/Max range', examples: ['300..600', '100..', '..500'] },
];
</script>

<div class="syntax-page min-h(screen) bg(135deg/#f0f9ff..#e0f2fe..#f0f9ff) relative clip">
  <!-- Background Effects -->
  <div class="layer(fill) clip">
    <div class="gradient-orb gradient-orb-1"></div>
    <div class="gradient-orb gradient-orb-2"></div>
    <div class="gradient-orb gradient-orb-3"></div>
  </div>

  <div class="container(lg/px:lg) py(xl) relative z(10)">
    <!-- Page Header -->
    <header class="mb(2xl) text(center) animate-fade-up">
      <div class="mb(md)">
        <h1 class="bold font(4xl) c(135deg/#3b82f6..#8b5cf6)">Syntax Guide</h1>
        <div class="hbox(pack) gap(sm) mt(sm)">
          <span class="px(md) py(xs) bg(blue-500.1) c(blue-600) r(full) bold font(xs)">AdorableCSS v2</span>
          <span class="px(md) py(xs) bg(purple-500.1) c(purple-600) r(full) bold font(xs)">Parser Reference</span>
        </div>
      </div>
      <p class="font(lg) c(gray-600) container(md/px:0) leading(relaxed)">
        Master the elegant syntax of AdorableCSS. From basic utilities to advanced patterns, everything you need to build beautiful interfaces.
      </p>
    </header>

    <!-- Table of Contents -->
    <nav class="toc mb(2xl) animate-fade-up animation-delay-100">
      <h2 class="bold font(lg) c(gray-800) mb(md) text(center)">Quick Navigation</h2>
      <div class="hbox(pack) gap(xs) flex-wrap">
        <a href="#live-example" class="toc-item group">
          <div class="p(sm) bg(white) r(lg) shadow(sm) hover:shadow(md) transition b(1/gray-100) text(center) min-w(120px)">
            <div class="size(32) mx(auto) mb(xs) r(md) bg(blue-100..blue-200/to-br) hbox(pack)">
              <Terminal size={16} class="c(blue-600)" />
            </div>
            <h3 class="bold font(xs) c(gray-800) group-hover:c(blue-600) transition">Live Demo</h3>
          </div>
        </a>
        <a href="#quick-ref" class="toc-item group">
          <div class="p(sm) bg(white) r(lg) shadow(sm) hover:shadow(md) transition b(1/gray-100) text(center) min-w(120px)">
            <div class="size(32) mx(auto) mb(xs) r(md) bg(purple-100..purple-200/to-br) hbox(pack)">
              <Zap size={16} class="c(purple-600)" />
            </div>
            <h3 class="bold font(xs) c(gray-800) group-hover:c(purple-600) transition">Quick Ref</h3>
          </div>
        </a>
        <a href="#core-concepts" class="toc-item group">
          <div class="p(sm) bg(white) r(lg) shadow(sm) hover:shadow(md) transition b(1/gray-100) text(center) min-w(120px)">
            <div class="size(32) mx(auto) mb(xs) r(md) bg(green-100..green-200/to-br) hbox(pack)">
              <BookOpen size={16} class="c(green-600)" />
            </div>
            <h3 class="bold font(xs) c(gray-800) group-hover:c(green-600) transition">Concepts</h3>
          </div>
        </a>
        <a href="#patterns" class="toc-item group">
          <div class="p(sm) bg(white) r(lg) shadow(sm) hover:shadow(md) transition b(1/gray-100) text(center) min-w(120px)">
            <div class="size(32) mx(auto) mb(xs) r(md) bg(orange-100..orange-200/to-br) hbox(pack)">
              <Code2 size={16} class="c(orange-600)" />
            </div>
            <h3 class="bold font(xs) c(gray-800) group-hover:c(orange-600) transition">Patterns</h3>
          </div>
        </a>
        <a href="#grammar" class="toc-item group">
          <div class="p(sm) bg(white) r(lg) shadow(sm) hover:shadow(md) transition b(1/gray-100) text(center) min-w(120px)">
            <div class="size(32) mx(auto) mb(xs) r(md) bg(pink-100..pink-200/to-br) hbox(pack)">
              <FileText size={16} class="c(pink-600)" />
            </div>
            <h3 class="bold font(xs) c(gray-800) group-hover:c(pink-600) transition">Grammar</h3>
          </div>
        </a>
      </div>
    </nav>

    <!-- Live Example -->
    <section id="live-example" class="live-example mb(3xl) animate-fade-up animation-delay-200">
      <div class="section-card bg(white/90) backdrop-blur(md) r(2xl) shadow(xl) p(xl) b(1/gray-100)">
        <div class="section-title mb(lg)">
          <div class="hbox(pack) gap(sm) mb(sm)">
            <div class="w(48px) h(48px) r(lg) bg(blue-400..blue-600/to-br) hbox(pack) shadow(lg)">
              <Terminal size={24} class="c(white)" />
            </div>
          </div>
          <h2 class="bold font(xl) c(gray-900) text(center)">Try It Live</h2>
          <p class="font(sm) c(gray-600) text(center) mt(xs)">See AdorableCSS transform your utilities into CSS in real-time</p>
        </div>

        <div class="vbox gap(md)">
          <div>
            <label class="block font(xs) c(gray-600) mb(xs)">Input</label>
            <input
              bind:value={input}
              class="w(full) p(sm) font(sm) font-family(mono) bg(white) r(md) b(1/gray-300) focus:b(1/primary)"
              placeholder="Enter AdorableCSS syntax..."
            />
          </div>
          <div>
            <label class="block font(xs) c(gray-600) mb(xs)">Output CSS</label>
            <pre class="bg(gray-900) c(gray-100) p(sm) r(md) font(xs) font-family(mono) overflow(auto) min-h(80px)">{css || '/* CSS will appear here */'}</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Reference -->
    <section id="quick-ref" class="quick-ref mb(3xl) animate-fade-up animation-delay-300">
      <div class="section-card bg(white/90) backdrop-blur(md) r(2xl) shadow(xl) p(xl) b(1/gray-100)">
        <div class="section-title mb(lg)">
          <div class="hbox(pack) gap(sm) mb(sm)">
            <div class="w(48px) h(48px) r(lg) bg(purple-400..purple-600/to-br) hbox(pack) shadow(lg)">
              <Zap size={24} class="c(white)" />
            </div>
          </div>
          <h2 class="bold font(xl) c(gray-900) text(center)">Quick Reference</h2>
          <p class="font(sm) c(gray-600) text(center) mt(xs)">Essential syntax patterns at a glance</p>
        </div>
        <div class="overflow(auto) r(lg) b(1/gray-200) shadow(inner)">
          <table class="w(full) font(sm)">
            <thead>
            <tr class="bg(purple-50..blue-50/to-r) bb(2/purple-200)">
              <th class="text(left) p(md) 600 c(gray-800)">Pattern</th>
              <th class="text(left) p(md) 600 c(gray-800)">Description</th>
              <th class="text(left) p(md) 600 c(gray-800)">Example</th>
              <th class="text(left) p(md) 600 c(gray-800)">CSS Output</th>
            </tr>
            </thead>
            <tbody>
            {#each syntaxReference as item, i}
              <tr class="bb(1/gray-200) hover:bg(blue-50.5) transition {i % 2 === 0 ? 'bg(gray-50.3)' : ''}">
                <td class="p(md) font-family(mono) 600 c(135deg/#3b82f6..#8b5cf6)">{item.pattern}</td>
                <td class="p(md) c(gray-700)">{item.desc}</td>
                <td class="p(md)">
                  <code class="px(sm) py(xs) font-family(mono) c(blue-700) bg(blue-100) r(md) font(sm)">{item.example}</code>
                </td>
                <td class="p(md) font-family(mono) c(gray-600) font(xs)">{item.output}</td>
              </tr>
            {/each}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Core Concepts -->
    <section id="core-concepts" class="core-concepts mb(3xl) animate-fade-up animation-delay-500">
      <div class="section-card bg(white/90) backdrop-blur(md) r(2xl) shadow(xl) p(xl) b(1/gray-100)">
        <div class="section-title mb(lg)">
          <div class="hbox(pack) gap(sm) mb(sm)">
            <div class="w(48px) h(48px) r(lg) bg(green-400..green-600/to-br) hbox(pack) shadow(lg)">
              <BookOpen size={24} class="c(white)" />
            </div>
          </div>
          <h2 class="bold font(xl) c(gray-900) text(center)">Core Concepts</h2>
          <p class="font(sm) c(gray-600) text(center) mt(xs)">Fundamental principles of AdorableCSS syntax</p>
        </div>

        <!-- Basic Syntax -->
        <div class="concept-block mb(xl) p(lg) bg(blue-50..cyan-50/to-br) r(xl) b(1/blue-100)">
          <div class="hbox(middle) gap(sm) mb(md)">
            <div class="w(36px) h(36px) r(md) bg(blue-500.2) hbox(pack)">
              <Code2 size={18} class="c(blue-600)" />
            </div>
            <h3 class="bold font(md) c(gray-800)">1. Basic Syntax</h3>
          </div>
          <p class="font(sm) c(gray-600) mb(md)">
            AdorableCSS uses a function-like syntax where properties accept values in parentheses.
          </p>
          <div class="overflow(auto) r(lg) bg(white) shadow(sm) b(1/blue-200)">
            <table class="w(full) font(sm) mt(md)">
              <tbody>
              <tr class="bb(1/blue-100) hover:bg(blue-50) transition">
                <td class="p(md) font-family(mono) 600 c(blue-600) w(150px)">w(300)</td>
                <td class="p(md) c(blue-400)">→</td>
                <td class="p(md) font-family(mono) c(gray-700)">width: 300px</td>
              </tr>
              <tr class="bb(1/blue-100) hover:bg(blue-50) transition">
                <td class="p(md) font-family(mono) 600 c(blue-600)">bg(primary)</td>
                <td class="p(md) c(blue-400)">→</td>
                <td class="p(md) font-family(mono) c(gray-700)">background: var(--primary)</td>
              </tr>
              <tr class="bb(1/blue-100) hover:bg(blue-50) transition">
                <td class="p(md) font-family(mono) 600 c(blue-600)">hidden</td>
                <td class="p(md) c(blue-400)">→</td>
                <td class="p(md) font-family(mono) c(gray-700)">display: none</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Multiple Values -->
        <div class="concept-block mb(xl) p(lg) bg(purple-50..pink-50/to-br) r(xl) b(1/purple-100)">
          <div class="hbox(middle) gap(sm) mb(md)">
            <div class="w(36px) h(36px) r(md) bg(purple-500.2) hbox(pack)">
              <Zap size={18} class="c(purple-600)" />
            </div>
            <h3 class="bold font(md) c(gray-800)">2. Multiple Values</h3>
          </div>
          <p class="font(sm) c(gray-600) mb(md)">
            Use <code class="px(xs) py(1px) bg(gray-100) r(xs) font-family(mono)">/</code> to separate multiple values (replaces CSS spaces).
          </p>
          <table class="w(full) font(sm) mt(md)">
            <tbody>
            <tr class="bb(1/gray-200)">
              <td class="p(sm) font-family(mono) c(primary-600) w(150px)">p(16/24)</td>
              <td class="p(sm) c(gray-400)">→</td>
              <td class="p(sm) font-family(mono) c(gray-600)">padding: 16px 24px</td>
            </tr>
            <tr class="bb(1/gray-200)">
              <td class="p(sm) font-family(mono) c(primary-600)">m(8/16/8/16)</td>
              <td class="p(sm) c(gray-400)">→</td>
              <td class="p(sm) font-family(mono) c(gray-600)">margin: 8px 16px 8px 16px</td>
            </tr>
            </tbody>
          </table>
        </div>

        <!-- Prefixes -->
        <div class="concept-block mb(xl) p(lg) bg(orange-50..yellow-50/to-br) r(xl) b(1/orange-100)">
          <div class="hbox(middle) gap(sm) mb(md)">
            <div class="w(36px) h(36px) r(md) bg(orange-500.2) hbox(pack)">
              <Terminal size={18} class="c(orange-600)" />
            </div>
            <h3 class="bold font(md) c(gray-800)">3. Prefixes & Modifiers</h3>
          </div>
          <p class="font(sm) c(gray-600) mb(md)">
            Prefixes enable responsive design and state-based styling.
          </p>
          <table class="w(full) font(sm) mt(md)">
            <thead>
            <tr class="bb(1/gray-300)">
              <th class="text(left) p(sm) 600 c(gray-700)">Type</th>
              <th class="text(left) p(sm) 600 c(gray-700)">Examples</th>
              <th class="text(left) p(sm) 600 c(gray-700)">Description</th>
            </tr>
            </thead>
            <tbody>
            <tr class="bb(1/gray-200)">
              <td class="p(sm) 600 c(gray-700)">Responsive</td>
              <td class="p(sm) font-family(mono)">
                <code class="c(purple-600)">sm:</code>hidden<br/>
                <code class="c(purple-600)">md:</code>grid<br/>
                <code class="c(purple-600)">~lg:</code>vbox
              </td>
              <td class="p(sm) c(gray-600)">Breakpoint prefixes for responsive design</td>
            </tr>
            <tr class="bb(1/gray-200)">
              <td class="p(sm) 600 c(gray-700)">States</td>
              <td class="p(sm) font-family(mono)">
                <code class="c(orange-600)">hover:</code>bg(primary)<br/>
                <code class="c(orange-600)">focus:</code>ring(2)<br/>
                <code class="c(orange-600)">active:</code>scale(0.95)
              </td>
              <td class="p(sm) c(gray-600)">Pseudo-class prefixes for interactive states</td>
            </tr>
            </tbody>
          </table>
        </div>

        <!-- Layout System -->
        <div class="concept-block p(lg) bg(green-50..teal-50/to-br) r(xl) b(1/green-100)">
          <div class="hbox(middle) gap(sm) mb(md)">
            <div class="w(36px) h(36px) r(md) bg(green-500.2) hbox(pack)">
              <BookOpen size={18} class="c(green-600)" />
            </div>
            <h3 class="bold font(md) c(gray-800)">4. Figma-style Layout</h3>
          </div>
          <p class="font(sm) c(gray-600) mb(md)">
            Layout utilities match Figma's Auto Layout mental model.
          </p>
          <table class="w(full) font(sm) mt(md)">
            <thead>
            <tr class="bb(1/gray-300)">
              <th class="text(left) p(sm) 600 c(gray-700)">Utility</th>
              <th class="text(left) p(sm) 600 c(gray-700)">Description</th>
              <th class="text(left) p(sm) 600 c(gray-700)">CSS Output</th>
            </tr>
            </thead>
            <tbody>
            <tr class="bb(1/gray-200)">
              <td class="p(sm) font-family(mono) c(blue-700) bg(blue-50) r(sm)">hbox</td>
              <td class="p(sm) c(gray-600)">Horizontal flex layout</td>
              <td class="p(sm) font-family(mono) c(gray-600) font(xs)">display: flex; flex-direction: row</td>
            </tr>
            <tr class="bb(1/gray-200)">
              <td class="p(sm) font-family(mono) c(blue-700) bg(blue-50) r(sm)">vbox</td>
              <td class="p(sm) c(gray-600)">Vertical flex layout</td>
              <td class="p(sm) font-family(mono) c(gray-600) font(xs)">display: flex; flex-direction: column</td>
            </tr>
            <tr class="bb(1/gray-200)">
              <td class="p(sm) font-family(mono) c(blue-700) bg(blue-50) r(sm)">gap(lg)</td>
              <td class="p(sm) c(gray-600)">Spacing between items</td>
              <td class="p(sm) font-family(mono) c(gray-600) font(xs)">gap: 16px</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Common Patterns -->
    <section id="patterns" class="patterns mb(3xl) animate-fade-up animation-delay-600">
      <div class="section-card bg(white/90) backdrop-blur(md) r(2xl) shadow(xl) p(xl) b(1/gray-100)">
        <div class="section-title mb(lg)">
          <div class="hbox(pack) gap(sm) mb(sm)">
            <div class="w(48px) h(48px) r(lg) bg(orange-400..orange-600/to-br) hbox(pack) shadow(lg)">
              <Code2 size={24} class="c(white)" />
            </div>
          </div>
          <h2 class="bold font(xl) c(gray-900) text(center)">Common Patterns</h2>
          <p class="font(sm) c(gray-600) text(center) mt(xs)">Real-world examples you can use immediately</p>
        </div>
        <div class="grid grid-cols(1) gap(md)">
          <div class="pattern-item p(lg) bg(blue-50..purple-50/to-br) r(xl) b(1/blue-100) hover:shadow(lg) transition">
            <div class="hbox(middle) gap(sm) mb(sm)">
              <div class="w(32px) h(32px) r(md) bg(blue-500.2) hbox(pack)">
                <Code2 size={16} class="c(blue-600)" />
              </div>
              <h3 class="bold font(sm) c(gray-800)">Card Component</h3>
            </div>
            <code class="block p(md) bg(gray-900) c(gray-100) r(lg) font(xs) font-family(mono) shadow(inner)">
              bg(white) r(lg) p(xl) shadow(sm) hover:shadow(lg) transition
            </code>
          </div>
          <div class="pattern-item p(lg) bg(green-50..teal-50/to-br) r(xl) b(1/green-100) hover:shadow(lg) transition">
            <div class="hbox(middle) gap(sm) mb(sm)">
              <div class="w(32px) h(32px) r(md) bg(green-500.2) hbox(pack)">
                <Zap size={16} class="c(green-600)" />
              </div>
              <h3 class="bold font(sm) c(gray-800)">Button</h3>
            </div>
            <code class="block p(md) bg(gray-900) c(gray-100) r(lg) font(xs) font-family(mono) shadow(inner)">
              hbox(pack) px(lg) py(md) bg(primary) c(white) r(md) bold font(sm) hover:bg(primary-600) transition
            </code>
          </div>
          <div class="pattern-item p(lg) bg(purple-50..pink-50/to-br) r(xl) b(1/purple-100) hover:shadow(lg) transition">
            <div class="hbox(middle) gap(sm) mb(sm)">
              <div class="w(32px) h(32px) r(md) bg(purple-500.2) hbox(pack)">
                <Terminal size={16} class="c(purple-600)" />
              </div>
              <h3 class="bold font(sm) c(gray-800)">Responsive Grid</h3>
            </div>
            <code class="block p(md) bg(gray-900) c(gray-100) r(lg) font(xs) font-family(mono) shadow(inner)">
              grid grid-cols(1) sm:grid-cols(2) lg:grid-cols(3) gap(lg)
            </code>
          </div>
        </div>
      </div>
    </section>

    <!-- Grammar Reference -->
    <section id="grammar" class="grammar-ref mb(3xl) animate-fade-up animation-delay-700">
      <div class="section-card bg(white/90) backdrop-blur(md) r(2xl) shadow(xl) p(xl) b(1/gray-100)">
        <div class="section-title mb(lg)">
          <div class="hbox(pack) gap(sm) mb(sm)">
            <div class="w(48px) h(48px) r(lg) bg(pink-400..pink-600/to-br) hbox(pack) shadow(lg)">
              <FileText size={24} class="c(white)" />
            </div>
          </div>
          <h2 class="bold font(xl) c(gray-900) text(center)">Grammar Reference</h2>
          <p class="font(sm) c(gray-600) text(center) mt(xs)">Complete formal specification of AdorableCSS syntax</p>
        </div>

        <!-- Token Types -->
        <div class="mb(xl) p(lg) bg(gray-50..gray-100/to-br) r(xl) b(1/gray-200)">
          <div class="hbox(middle) gap(sm) mb(md)">
            <div class="w(36px) h(36px) r(md) bg(gray-500.2) hbox(pack)">
              <FileText size={18} class="c(gray-600)" />
            </div>
            <h3 class="bold font(md) c(gray-800)">Token Types</h3>
          </div>
          <div class="overflow(auto) r(lg) bg(white) shadow(sm) b(1/gray-300)">
            <table class="w(full) font(xs)">
              <thead>
              <tr class="bg(gray-100..gray-200/to-r) bb(2/gray-300)">
                <th class="text(left) p(md) 600 c(gray-800)">Token</th>
                <th class="text(left) p(md) 600 c(gray-800)">Pattern</th>
                <th class="text(left) p(md) 600 c(gray-800)">Description</th>
                <th class="text(left) p(md) 600 c(gray-800)">Examples</th>
              </tr>
              </thead>
              <tbody>
              {#each grammarTokens as token, i}
                <tr class="bb(1/gray-200) hover:bg(gray-100) transition {i % 2 === 0 ? 'bg(gray-50.5)' : ''}">
                  <td class="p(md) font-family(mono) 600 c(135deg/#3b82f6..#8b5cf6)">{token.name}</td>
                  <td class="p(md) font-family(mono) c(gray-700) bg(gray-100) r(sm)">{token.pattern}</td>
                  <td class="p(md) c(gray-700)">{token.desc}</td>
                  <td class="p(md)">
                    {#each token.examples as ex}
                      <code class="inline-block px(sm) py(xs) bg(purple-100..blue-100/to-br) r(md) font-family(mono) font(xs) mr(xs) mb(xs) c(purple-700) b(1/purple-200)">{ex}</code>
                    {/each}
                  </td>
                </tr>
              {/each}
              </tbody>
            </table>
          </div>
        </div>

        <!-- BNF Grammar -->
        <div>
          <h3 class="bold font(md) c(gray-800) mb(sm)">Formal Grammar (BNF)</h3>
          <pre class="p(lg) bg(gray-900..gray-800/to-br) c(gray-100) r(lg) font(xs) font-family(mono) overflow(auto) shadow(inner) b(1/gray-700)">{`selector     ::= [combinator] simpleSelector [important] [combinators]*
simpleSelector ::= ident | function | position | range | literal
function     ::= ident '(' [args] ')'
args         ::= arg ['/' arg]*
arg          ::= expr [':' expr] | keyValue
expr         ::= term [operator term]*
term         ::= ident | dimension | hexcolor | range | '(' args ')'
operator     ::= '+' | '-' | '*'
combinator   ::= ':' ident | '.' ident | breakpoint ':'
breakpoint   ::= '~'? ('xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl')
important    ::= '!'`}</pre>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="pt(xl) bt(1/gray-200) text(center) animate-fade-up animation-delay-700">
      <p class="font(sm) c(gray-600) mb(md)">Built with ❤️ for developers who love beautiful, maintainable CSS</p>
      <div class="hbox(pack) gap(lg)">
        <a href="#" class="c(gray-500) hover:c(blue-600) transition font(xs)">Documentation</a>
        <a href="#" class="c(gray-500) hover:c(blue-600) transition font(xs)">GitHub</a>
        <a href="#" class="c(gray-500) hover:c(blue-600) transition font(xs)">Discord</a>
      </div>
    </footer>
  </div>
</div>

<style>
  /* Syntax page styles */
  .syntax-page {
    font-family: system-ui, -apple-system, sans-serif;
    background: linear-gradient(to bottom, #f8fafc, #ffffff);
  }


  /* Animated gradient orbs */
  .gradient-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.4;
    animation: float 20s ease-in-out infinite;
  }

  .gradient-orb-1 {
    width: 600px;
    height: 600px;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    top: -200px;
    left: -200px;
    animation-delay: 0s;
  }

  .gradient-orb-2 {
    width: 500px;
    height: 500px;
    background: linear-gradient(135deg, #8b5cf6, #6366f1);
    bottom: -100px;
    right: -100px;
    animation-delay: 7s;
  }

  .gradient-orb-3 {
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, #06b6d4, #0891b2);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-delay: 14s;
  }

  @keyframes float {
    0%, 100% {
      transform: translate(0, 0) scale(1);
    }
    33% {
      transform: translate(30px, -30px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
  }


  .bg-clip\(text\) {
    -webkit-background-clip: text;
    background-clip: text;
  }

  .text-fill-color\(transparent\) {
    -webkit-text-fill-color: transparent;
  }

  /* Mesh gradient for headers */
  .bg\(gradient-mesh\) {
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #ddd6fe 50%, #fce7f3 75%, #fef3c7 100%);
  }

  /* Animations */
  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-up {
    animation: fade-up 0.6s ease-out forwards;
    opacity: 0;
  }

  .animation-delay-100 {
    animation-delay: 100ms;
  }

  .animation-delay-200 {
    animation-delay: 200ms;
  }

  .animation-delay-300 {
    animation-delay: 300ms;
  }

  .animation-delay-400 {
    animation-delay: 400ms;
  }

  .animation-delay-500 {
    animation-delay: 500ms;
  }

  .animation-delay-600 {
    animation-delay: 600ms;
  }

  .animation-delay-700 {
    animation-delay: 700ms;
  }

  /* Section cards */
  .section-card {
    transition: all 0.3s ease;
  }

  .section-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
  }

  /* Table of contents items */
  .toc-item > div {
    transition: all 0.3s ease;
  }

  .toc-item:hover > div {
    transform: translateY(-4px);
  }

  /* Smooth scrolling */
  :global(html) {
    scroll-behavior: smooth;
  }

  /* Section anchors */
  section[id] {
    scroll-margin-top: 40px;
  }

  /* Code blocks */
  pre {
    margin: 0;
    line-height: 1.4;
  }

  /* Smooth focus transitions */
  input {
    outline: none;
    transition: all 0.3s ease;
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }

  input:focus {
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  }

  /* Table styling */
  table {
    border-collapse: collapse;
  }

  tbody tr {
    transition: all 0.2s ease;
  }

  tbody tr:hover {
    background-color: var(--colors-gray-50);
    transform: scale(1.01);
  }

  /* Pattern items with gradient hover */
  .pattern-item {
    position: relative;
    overflow: hidden;
  }

  .pattern-item::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent, rgba(59, 130, 246, 0.05));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .pattern-item:hover::before {
    opacity: 1;
  }

  .pattern-item code {
    overflow-x: auto;
    white-space: pre;
    position: relative;
    z-index: 1;
  }
</style>