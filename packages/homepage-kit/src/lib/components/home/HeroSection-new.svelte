<script lang="ts">
  import { ArrowRight, Sparkles, Code2, Zap } from 'lucide-svelte';
  import CodeHighlighter from '../CodeHighlighter.svelte';
  
  // Master CSS 스타일의 미니멀한 코드 예제
  const adorableExample = `<div class="vbox(pack) h(screen)">
  <h1 class="font(6xl/1) 900">
    CSS that finally
    <span class="c(purple-600)">makes sense</span>
  </h1>
  <p class="font(xl) c(gray-600) mt(xl)">
    Write less. Ship more. Love CSS again.
  </p>
  <button class="btn(primary/lg) mt(2xl)">
    Get Started →
  </button>
</div>`;

  const tailwindExample = `<div class="flex flex-col items-center justify-center min-h-screen">
  <h1 class="text-6xl font-black leading-none">
    CSS that finally
    <span class="text-purple-600">makes sense</span>
  </h1>
  <p class="text-xl text-gray-600 mt-6">
    Write less. Ship more. Love CSS again.
  </p>
  <button class="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition mt-8">
    Get Started →
  </button>
</div>`;

  let showComparison = false;
  let codeDemo = 'adorable';
</script>

<!-- Master CSS 스타일의 미니멀한 히어로 섹션 -->
<section class="min-h(100vh) vbox(pack) bg(white) relative">
  
  <!-- 은은한 배경 효과 -->
  <div class="layer pointer-events(none) opacity(0.02)">
    <div class="absolute top(-200px) left(-200px) w(600px) h(600px) bg(purple-400) blur(200px) r(full)"></div>
    <div class="absolute bottom(-300px) right(-300px) w(800px) h(800px) bg(blue-400) blur(300px) r(full)"></div>
  </div>

  <div class="contain() w(full) relative z(10)">
    <div class="vbox(center) gap(3xl) text(center)">
      
      <!-- 작고 세련된 배지 -->
      <div class="hbox(pack)">
        <div class="hbox(middle) gap(sm) px(md) py(xs) bg(gray-100) r(full)">
          <Sparkles size="14" class="c(purple-600)" />
          <span class="font(sm) c(gray-700)">v2.0 – Completely reimagined</span>
        </div>
      </div>

      <!-- 대담한 타이포그래피 -->
      <div class="vbox gap(xl)">
        <h1 class="font(7xl/1) 900 c(gray-900) max-w(900px)">
          CSS that finally
          <span class="block c(purple-600)">makes sense</span>
        </h1>
        
        <p class="font(2xl/1.4) c(gray-600) max-w(600px) mx(auto)">
          No more memorizing arbitrary class names. 
          Write CSS the way you think.
        </p>
      </div>

      <!-- 코드가 곧 디자인 -->
      <div class="vbox gap(2xl) max-w(800px) w(full)">
        <!-- 미니멀한 코드 블록 -->
        <div class="bg(gray-50) r(xl) p(2xl) border(1/gray-200)">
          <div class="font(mono) font(lg) c(gray-800)">
            <span class="c(purple-600)">vbox(center)</span>
            <span class="c(gray-500) mx(md)">→</span>
            <span class="c(gray-600)">vertical, centered</span>
          </div>
          <div class="font(mono) font(lg) c(gray-800) mt(md)">
            <span class="c(purple-600)">gap(xl)</span>
            <span class="c(gray-500) mx(md)">→</span>
            <span class="c(gray-600)">20px spacing</span>
          </div>
          <div class="font(mono) font(lg) c(gray-800) mt(md)">
            <span class="c(purple-600)">p(2xl)</span>
            <span class="c(gray-500) mx(md)">→</span>
            <span class="c(gray-600)">32px padding</span>
          </div>
        </div>

        <!-- CTA -->
        <div class="hbox(pack) gap(lg)">
          <button class="hbox(middle) gap(md) px(2xl) py(lg) bg(gray-900) c(white) r(lg) hover:scale(105) transition">
            <Zap size="20" />
            <span class="font(lg) 600">Start Building</span>
          </button>
          
          <button 
            class="px(2xl) py(lg) border(2/gray-300) r(lg) hover:border(gray-400) transition c(gray-700) font(lg)"
            on:click={() => showComparison = !showComparison}
          >
            See Comparison
          </button>
        </div>
      </div>

      <!-- 비교 섹션 (토글) -->
      {#if showComparison}
        <div class="vbox gap(xl) w(full) max-w(1200px) animate(fade-in)">
          <h2 class="font(3xl) 700 c(gray-900)">Same result. 72% less code.</h2>
          
          <div class="grid grid-cols(1) lg:grid-cols(2) gap(xl)">
            <!-- AdorableCSS -->
            <div class="vbox gap(lg)">
              <div class="hbox(middle) gap(md)">
                <div class="w(10px) h(10px) bg(green-500) r(full)"></div>
                <h3 class="font(xl) 600 c(gray-900)">AdorableCSS</h3>
                <span class="font(sm) c(green-600) bg(green-50) px(sm) py(xs) r(full)">31 chars</span>
              </div>
              <div class="bg(gray-900) r(lg) p(lg) clip">
                <CodeHighlighter 
                  code={adorableExample}
                  language="html" 
                  className="font(sm/1.6)" 
                />
              </div>
            </div>

            <!-- Tailwind -->
            <div class="vbox gap(lg)">
              <div class="hbox(middle) gap(md)">
                <div class="w(10px) h(10px) bg(red-500) r(full)"></div>
                <h3 class="font(xl) 600 c(gray-900)">TailwindCSS</h3>
                <span class="font(sm) c(red-600) bg(red-50) px(sm) py(xs) r(full)">112 chars</span>
              </div>
              <div class="bg(gray-900) r(lg) p(lg) clip">
                <CodeHighlighter 
                  code={tailwindExample}
                  language="html" 
                  className="font(sm/1.6)" 
                />
              </div>
            </div>
          </div>
        </div>
      {/if}

      <!-- 강력한 증명 포인트 -->
      <div class="hbox(pack) gap(3xl) pt(2xl)">
        <div class="vbox(center) gap(sm)">
          <span class="font(4xl) 900 c(purple-600)">72%</span>
          <span class="font(sm) c(gray-600)">less code</span>
        </div>
        <div class="vbox(center) gap(sm)">
          <span class="font(4xl) 900 c(purple-600)">0</span>
          <span class="font(sm) c(gray-600)">learning curve</span>
        </div>
        <div class="vbox(center) gap(sm)">
          <span class="font(4xl) 900 c(purple-600)">∞</span>
          <span class="font(sm) c(gray-600)">possibilities</span>
        </div>
      </div>

    </div>
  </div>

  <!-- 하단 스크롤 인디케이터 -->
  <div class="absolute bottom(2xl) left(50%) transform(-50%/0)">
    <div class="w(1px) h(60px) bg(gray-300) animate(pulse)"></div>
  </div>
</section>

<!-- 추가 섹션: 왜 AdorableCSS인가? -->
<section class="section() bg(gray-50)">
  <div class="contain()">
    <div class="vbox(center) gap(3xl) text(center)">
      
      <h2 class="font(5xl) 900 c(gray-900)">
        Finally, CSS that speaks your language
      </h2>

      <!-- 3가지 핵심 특징 -->
      <div class="grid grid-cols(1) md:grid-cols(3) gap(2xl) w(full)">
        
        <!-- Intuitive -->
        <div class="vbox gap(lg)">
          <div class="font(6xl)">🧠</div>
          <h3 class="font(2xl) 700 c(gray-900)">Intuitive</h3>
          <p class="c(gray-600)">
            <code class="bg(purple-100) px(sm) r(sm)">hbox(middle)</code> means horizontal box, middle aligned. That's it.
          </p>
        </div>

        <!-- Powerful -->
        <div class="vbox gap(lg)">
          <div class="font(6xl)">⚡</div>
          <h3 class="font(2xl) 700 c(gray-900)">Powerful</h3>
          <p class="c(gray-600)">
            Built-in design system. <code class="bg(purple-100) px(sm) r(sm)">btn(primary)</code> gives you a perfect button.
          </p>
        </div>

        <!-- Minimal -->
        <div class="vbox gap(lg)">
          <div class="font(6xl)">✨</div>
          <h3 class="font(2xl) 700 c(gray-900)">Minimal</h3>
          <p class="c(gray-600)">
            Write 72% less code. Ship faster. Maintain easier.
          </p>
        </div>

      </div>

      <!-- 간단한 예제 -->
      <div class="vbox gap(xl) max-w(600px)">
        <h3 class="font(2xl) 700 c(gray-900)">See the difference</h3>
        
        <div class="bg(white) r(lg) p(xl) shadow(sm)">
          <div class="font(mono) text(left)">
            <div class="c(gray-500)">&lt;!-- 이렇게 생각하면 --&gt;</div>
            <div class="mt(md)">horizontal box, middle aligned, with gap</div>
            <div class="mt(lg) c(gray-500)">&lt;!-- 이렇게 쓰세요 --&gt;</div>
            <div class="mt(md) font(lg) c(purple-600)">hbox(middle) gap(lg)</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- Core Showcases -->
<section class="section() bg(white)">
  <div class="contain()">
    <div class="content(centered)">
      <h2 class="heading(h2)">See the Difference</h2>
      <p class="lead()">
        Code that actually reads like what you want to achieve.
      </p>
    </div>
    
    <div class="rhythm() contain(narrow)">
      
      <!-- Showcase A: Instantly Readable Code -->
      <div class="stack(lg)">
        <h3 class="heading(h3) text(center) c(purple-700)">Instantly Readable Code</h3>
        
        <div class="grid grid-cols(1) md:grid-cols(2) gap(lg)">
          <div class="stack(sm)">
            <h4 class="label() c(text-subtle)">😖 Tailwind</h4>
            <div class="bg(gray-900) r(lg) clip">
              <CodeHighlighter 
                code={`<div class="flex flex-col items-center justify-center gap-6 p-8">`}
                language="html" 
                className="font(sm/1.4)" 
              />
            </div>
          </div>
          
          <div class="stack(sm)">
            <h4 class="label() c(primary)">😌 AdorableCSS</h4>
            <div class="bg(gray-900) r(lg) clip">
              <CodeHighlighter 
                code={`<div class="vbox(center) gap(lg) p(xl)">`}
                language="html" 
                className="font(sm/1.4)" 
              />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Showcase B: Layout Clarity -->
      <div class="stack(lg)">
        <h3 class="heading(h3) text(center)">Complex Layouts Are Self-Documenting</h3>
        
        <div class="bg(gray-900) r(lg) clip">
          <CodeHighlighter 
            code={`<!-- Complex layouts are self-documenting -->
<div class="vbox h(screen)">
  <header class="hbox(middle+between) p(md)">
    <logo />
    <nav class="hbox gap(lg)" />
  </header>
  <main class="vbox(center) flex(1)">
    <!-- content -->
  </main>
</div>`}
            language="html" 
            className="font(sm/1.4)" 
          />
        </div>
        
        <p class="caption() text(center)">
          Read it once, understand it forever. No CSS property guessing games.
        </p>
      </div>
      
      <!-- Showcase C: Component Power -->
      <div class="stack(lg)">
        <h3 class="heading(h3) text(center)">Built-in Components</h3>
        
        <div class="grid grid-cols(1) md:grid-cols(2) gap(lg)">
          <div class="stack(sm)">
            <h4 class="label() c(gray-500)">Before: Rewrite styles every time</h4>
            <div class="bg(gray-900) r(lg) clip">
              <CodeHighlighter 
                code={`<div class="flex flex-col p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">`}
                language="html" 
                className="font(xs/1.3)" 
              />
            </div>
          </div>
          
          <div class="stack(sm)">
            <h4 class="label() c(purple-600)">AdorableCSS: Just card()</h4>
            <div class="bg(gray-900) r(lg) clip">
              <CodeHighlighter 
                code={`<div class="card()">`}
                language="html" 
                className="font(xs/1.3)" 
              />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Showcase D: Design System Magic -->
      <div class="stack(lg)">
        <h3 class="heading(h3) text(center) c(purple-700)">Design System Magic</h3>
        
        <div class="bg(gray-900) r(lg) clip">
          <CodeHighlighter 
            code={`<!-- Even beginners create consistent designs -->
<div class="vbox gap(lg) p(xl)">
  <div class="card()">
    <h2 class="heading(lg)">Title</h2>
    <p class="text(body)">Content</p>
  </div>
  <button class="btn(primary)">Submit</button>
</div>
<!-- Result: Professional-looking UI automatically -->`}
            language="html" 
            className="font(sm/1.4)" 
          />
        </div>
        
        <div class="card-base() bg(purple-50)">
          <div class="vbox gap(lg) card-base()">
            <div class="card()">
              <h3 class="heading(lg) mb(md)">Sample Card</h3>
              <p class="c(gray-600)">This looks professional automatically with built-in design tokens.</p>
            </div>
            <button class="btn-base() btn-primary() mx(auto)">Submit</button>
          </div>
          <p class="caption() text(center) pt(md) c(purple-700) 600">
            ✨ Professional UI with zero design skills required
          </p>
        </div>
      </div>
      
      <!-- Showcase E: Real Project Comparison -->
      <div class="stack(lg)">
        <h3 class="heading(h3) text(center)">Real Project Impact</h3>
        
        <div class="card-base() bg(gray-100) text(center)">
          <div class="hbox(pack) gap(2xl)">
            <div class="stack(sm)">
              <span class="font(3xl) 700 c(gray-500)">112</span>
              <span class="caption()">Tailwind chars</span>
            </div>
            
            <div class="font(2xl) c(gray-400)">→</div>
            
            <div class="stack(sm)">
              <span class="font(3xl) 700 c(purple-600)">31</span>
              <span class="caption()">AdorableCSS chars</span>
            </div>
          </div>
          
          <div class="pt(lg)">
            <span class="font(xl) 700 c(purple-700)">72% reduction</span>
            <p class="caption()">Same component, instant comprehension</p>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</section>

<!-- Component System -->
<section class="section() bg(gray-50)">
  <div class="contain()">
    <div class="content(centered)">
      <h2 class="heading(h2)">Built-in Component System</h2>
      <p class="lead()">
        Mix freely with utilities. No conflicts, just consistent design.
      </p>
    </div>
    
    <div class="feature-grid()">
      
      <!-- Buttons -->
      <div class="card-base() stack(md)">
        <h3 class="heading(h4)">Buttons</h3>
        <div class="bg(gray-900) r(md) clip">
          <CodeHighlighter 
            code={`button(primary/lg)
button(secondary)
button(outline/sm)`}
            language="css" 
            className="font(xs/1.3)" 
          />
        </div>
        <div class="stack(sm)">
          <button class="btn-base() btn-primary()">Primary Large</button>
          <button class="btn-base() btn-secondary()">Secondary</button>
          <button class="btn-base() btn-ghost() font(sm) px(md) py(sm)">Outline Small</button>
        </div>
      </div>
      
      <!-- Cards -->
      <div class="card-base() stack(md)">
        <h3 class="heading(h4)">Cards</h3>
        <div class="bg(gray-900) r(md) clip">
          <CodeHighlighter 
            code={`card(elevated)
card(flat)
card(interactive)`}
            language="css" 
            className="font(xs/1.3)" 
          />
        </div>
        <div class="stack(xs)">
          <div class="card(elevated) p(sm) text(center)">
            <span class="font(sm)">Elevated</span>
          </div>
          <div class="card(flat) p(sm) text(center)">
            <span class="font(sm)">Flat</span>
          </div>
          <div class="card(interactive) p(sm) text(center)">
            <span class="font(sm)">Interactive</span>
          </div>
        </div>
      </div>
      
      <!-- Form Elements -->
      <div class="card-base() stack(md)">
        <h3 class="heading(h4)">Form Elements</h3>
        <div class="bg(gray-900) r(md) clip">
          <CodeHighlighter 
            code={`input(error)
alert(success)
badge(new)`}
            language="css" 
            className="font(xs/1.3)" 
          />
        </div>
        <div class="stack(sm)">
          <input class="input() border(2/gray-400)" placeholder="Input field" />
          <div class="alert(success)">
            ✓ Success message
          </div>
          <span class="badge() w(fit-content)">NEW</span>
        </div>
      </div>
      
    </div>
    
    <!-- Mix with Utilities -->
    <div class="stack(lg) pt(2xl)">
      <h3 class="heading(h3) text(center)">Mix Freely with Utilities</h3>
      
      <div class="bg(gray-900) r(lg) clip">
        <CodeHighlighter 
          code={`<!-- Built-in components -->
button(primary/lg)
card(elevated)
input(error)
alert(success)
badge(new)

<!-- Mix freely with utilities -->
<div class="card() hover:scale(102) p(xl)">
  <h3 class="heading(h3) mb(md)">Enhanced Card</h3>
  <button class="btn(primary) mt(lg)">Action</button>
</div>`}
          language="html" 
          className="font(sm/1.4)" 
        />
      </div>
      
      <div class="card-base()">
        <div class="card() hover:scale(102) p(xl) transition">
          <h3 class="heading(h3) mb(md)">Enhanced Card</h3>
          <p class="c(gray-600) mb(lg)">Components and utilities work together seamlessly</p>
          <button class="btn-base() btn-primary()">Action</button>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Design Token System -->
<section class="section() bg(white)">
  <div class="contain()">
    <div class="content(centered)">
      <h2 class="heading(h2)">Consistent Design Tokens</h2>
      <p class="lead()">
        All spacing, colors, and typography follow a unified scale. Perfect consistency, zero effort.
      </p>
    </div>
    
    <div class="rhythm() contain(narrow)">
      
      <!-- Sizes Scale -->
      <div class="stack(lg)">
        <h3 class="heading(h3) text(center) c(purple-700)">Sizes: sm, md, lg, xl (consistent scale)</h3>
        
        <div class="bg(gray-900) r(lg) clip">
          <CodeHighlighter 
            code={`<!-- All use the same token scale -->
gap(sm)     <!-- 8px -->
gap(md)     <!-- 12px -->  
gap(lg)     <!-- 16px -->
gap(xl)     <!-- 20px -->

p(sm)       <!-- 8px padding -->
p(md)       <!-- 12px padding -->
p(lg)       <!-- 16px padding -->
p(xl)       <!-- 20px padding -->`}
            language="css" 
            className="font(sm/1.4)" 
          />
        </div>
        
        <div class="card-base() bg(purple-50) stack(md)">
          <h4 class="label() c(purple-700)">Visual Scale</h4>
          <div class="hbox(middle) gap(md)">
            <div class="bg(purple-200) r(sm)" style="width: 8px; height: 8px;"></div>
            <span class="caption()">sm (8px)</span>
            <div class="bg(purple-300) r(sm)" style="width: 12px; height: 12px;"></div>
            <span class="caption()">md (12px)</span>
            <div class="bg(purple-400) r(sm)" style="width: 16px; height: 16px;"></div>
            <span class="caption()">lg (16px)</span>
            <div class="bg(purple-500) r(sm)" style="width: 20px; height: 20px;"></div>
            <span class="caption()">xl (20px)</span>
          </div>
        </div>
      </div>
      
      <!-- Token-Based Everything -->
      <div class="stack(lg)">
        <h3 class="heading(h3) text(center) c(green-700)">Everything Uses Tokens</h3>
        
        <div class="grid grid-cols(1) md:grid-cols(3) gap(lg)">
          <div class="card-base() bg(green-50) stack(sm)">
            <h4 class="label() c(green-700)">Spacing</h4>
            <div class="caption()">
              <div>gap() → Token-based</div>
              <div>p() → Token-based</div>
              <div>m() → Token-based</div>
            </div>
          </div>
          
          <div class="card-base() bg(purple-50) stack(sm)">
            <h4 class="label() c(purple-700)">Typography</h4>
            <div class="caption()">
              <div>heading() → Complete system</div>
              <div>font() → Size + line-height</div>
              <div>text() → Semantic styles</div>
            </div>
          </div>
          
          <div class="card-base() bg(orange-50) stack(sm)">
            <h4 class="label() c(orange-700)">Components</h4>
            <div class="caption()">
              <div>btn() → Design system</div>
              <div>card() → Consistent shadows</div>
              <div>input() → Unified styling</div>
            </div>
          </div>
        </div>
        
        <div class="card-base() bg(gray-100) text(center)">
          <p class="font(lg) 600">
            🎯 Result: <span class="c(green-600)">Consistent designs</span> without being a designer
          </p>
        </div>
      </div>
      
    </div>
  </div>
</section>

<!-- 60-Second Installation -->
<section class="section() bg(gradient-to-br from-purple-50 to-blue-50)">
  <div class="contain()">
    <div class="vbox(center) gap(3xl) text(center)">
      <h2 class="font(5xl) 900 c(gray-900)">Get Started in 60 Seconds</h2>
      
      <div class="grid grid-cols(1) md:grid-cols(2) gap(xl) max-w(800px)">
        
        <!-- CDN -->
        <div class="bg(white) p(2xl) r(xl) shadow(md) vbox gap(xl)">
          <div class="hbox(middle) gap(md)">
            <Zap size="24" class="c(purple-600)" />
            <h3 class="font(xl) 700 c(gray-900)">CDN</h3>
          </div>
          
          <div class="bg(gray-900) r(lg) p(lg) clip">
            <code class="font(mono) font(sm) c(white)">
              &lt;script src="https://unpkg.com/adorable-css"&gt;&lt;/script&gt;
            </code>
          </div>
          
          <span class="font(sm) c(green-600)">✓ Ready in 10 seconds</span>
        </div>
        
        <!-- NPM -->
        <div class="bg(white) p(2xl) r(xl) shadow(md) vbox gap(xl)">
          <div class="hbox(middle) gap(md)">
            <Code2 size="24" class="c(blue-600)" />
            <h3 class="font(xl) 700 c(gray-900)">NPM</h3>
          </div>
          
          <div class="bg(gray-900) r(lg) p(lg) clip">
            <code class="font(mono) font(sm) c(white)">
              npm install adorable-css
            </code>
          </div>
          
          <span class="font(sm) c(blue-600)">✓ Works everywhere</span>
        </div>
        
      </div>
      
      <!-- CTA -->
      <button class="px(3xl) py(xl) bg(gray-900) c(white) r(lg) font(lg) 600 hover:scale(105) transition">
        Start Building Now →
      </button>
    </div>
  </div>
</section>

<style>
  /* 페이드인 애니메이션 */
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate\(fade-in\) {
    animation: fade-in 0.5s ease-out;
  }
</style>