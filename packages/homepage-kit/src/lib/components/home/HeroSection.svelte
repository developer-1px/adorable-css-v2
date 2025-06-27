<script lang="ts">
  import { ArrowRight, Play, Copy, Check, Zap, Heart } from 'lucide-svelte';
  import CodeHighlighter from '../CodeHighlighter.svelte';
  
  // Live demo showcases
  let tailwindCode = `<!-- 😖 Tailwind -->
<div class="flex flex-col items-center justify-center gap-6 p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
  <h2 class="text-2xl font-bold text-gray-900">Dashboard</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
    <div class="flex flex-col items-center p-4 bg-blue-50 rounded-md">
      <span class="text-xl font-semibold text-blue-600">1,247</span>
      <span class="text-sm text-gray-600">Users</span>
    </div>
  </div>
</div>`;

  let adorableCode = `<!-- 😌 AdorableCSS -->
<div class="card() vbox(center) gap(lg) p(xl)">
  <h2 class="heading(lg)">Dashboard</h2>
  <div class="grid grid-cols(1) md:grid-cols(3) gap(md)">
    <div class="card(flat) vbox(center) p(md)">
      <span class="font(xl) 600 c(blue-600)">1,247</span>
      <span class="text(sm) c(gray-600)">Users</span>
    </div>
  </div>
</div>`;

  let currentDemo = 'tailwind';
  let isAnimating = false;
  let copied = false;
  
  function toggleDemo() {
    if (isAnimating) return;
    isAnimating = true;
    currentDemo = currentDemo === 'tailwind' ? 'adorable' : 'tailwind';
    setTimeout(() => isAnimating = false, 600);
  }
  
  function copyCode(code: string) {
    navigator.clipboard.writeText(code);
    copied = true;
    setTimeout(() => copied = false, 2000);
  }
</script>

<!-- Hero Section -->
<section class="section(hero) bg(white) relative clip">
  <!-- Subtle Background -->
  <div class="layer pointer-events(none)">
    <div class="absolute w(400px) h(400px) r(full) blur(100px) opacity(0.03) 
                bg(purple-500) top(-200px) right(-100px)"></div>
  </div>
  
  <div class="contain(wide) relative z(10)">
    <div class="content(hero) text(center)">
      
      <!-- Hero Badge -->
      <div class="hbox(pack) mb(xl)">
        <div class="hbox(middle) gap(sm) px(lg) py(sm) bg(primary/50) r(full) border(1/primary/200)">
          <Heart size="16" class="c(primary)" />
          <span class="font(sm) 600 c(primary/700)">The first CSS framework with a built-in design system</span>
        </div>
      </div>
      
      <!-- Main Heading -->
      <div class="stack(xl) mb(2xl)">
        <h1 class="heading(h1) max-w(800px) mx(auto)">
          <span class="c(text-primary)">Finally, CSS that</span>
          <span class="block c(primary)">makes sense</span>
        </h1>
        
        <p class="font(xl/1.6) c(text-secondary) max-w(600px) mx(auto)">
          Built-in design system means beautiful UIs even if you're not a designer.
          <strong class="c(text-primary)">Bootstrap's components + Tailwind's utilities + Actually intuitive syntax.</strong>
        </p>
      </div>
      
      <!-- Live Demo Toggle -->
      <div class="stack(lg) max-w(900px) mx(auto)">
        <div class="hbox(pack) gap(md)">
          <button 
            class="hbox(middle) gap(sm) px(lg) py(md) r(lg) border(2) transition"
            class:bg={currentDemo === 'tailwind' ? 'red-50' : 'white'}
            class:border={currentDemo === 'tailwind' ? 'red-200' : 'gray-200'}
            class:c={currentDemo === 'tailwind' ? 'red-700' : 'gray-500'}
            on:click={toggleDemo}
          >
            😖 Tailwind (112 chars)
          </button>
          
          <button class="p(sm) bg(purple-100) hover:bg(purple-200) r(full) transition" on:click={toggleDemo}>
            <Play size="20" class="c(purple-700)" />
          </button>
          
          <button 
            class="hbox(middle) gap(sm) px(lg) py(md) r(lg) border(2) transition"
            class:bg={currentDemo === 'adorable' ? 'green-50' : 'white'}
            class:border={currentDemo === 'adorable' ? 'green-200' : 'gray-200'}
            class:c={currentDemo === 'adorable' ? 'green-700' : 'gray-500'}
            on:click={toggleDemo}
          >
            😌 AdorableCSS (31 chars)
          </button>
        </div>
        
        <!-- Code Display -->
        <div class="bg(gray-900) r(lg) clip relative transition-all duration-500" class:opacity={isAnimating ? '50' : '100'}>
          <button 
            class="absolute top(md) right(md) p(sm) bg(gray-800) hover:bg(gray-700) r(md) transition z(10)"
            on:click={() => copyCode(currentDemo === 'tailwind' ? tailwindCode : adorableCode)}
          >
            {#if copied}
              <Check size="16" class="c(green-400)" />
            {:else}
              <Copy size="16" class="c(gray-300)" />
            {/if}
          </button>
          
          <CodeHighlighter 
            code={currentDemo === 'tailwind' ? tailwindCode : adorableCode}
            language="html" 
            className="font(sm/1.4)" 
          />
        </div>
        
        <!-- Result Preview -->
        <div class="bg(gray-50) r(lg) p(lg)">
          <div class="card() vbox(center) gap(lg) p(xl) bg(white)">
            <h2 class="heading(lg) c(gray-900)">Dashboard</h2>
            <div class="grid grid-cols(1) md:grid-cols(3) gap(md) w(full)">
              <div class="card(flat) vbox(center) p(md)">
                <span class="font(xl) 600 c(blue-600)">1,247</span>
                <span class="font(sm) c(gray-600)">Users</span>
              </div>
              <div class="card(flat) vbox(center) p(md)">
                <span class="font(xl) 600 c(green-600)">↗ 12.5%</span>
                <span class="font(sm) c(gray-600)">Growth</span>
              </div>
              <div class="card(flat) vbox(center) p(md)">
                <span class="font(xl) 600 c(purple-600)">$12.4k</span>
                <span class="font(sm) c(gray-600)">Revenue</span>
              </div>
            </div>
          </div>
          <p class="font(sm) c(gray-500) text(center) pt(md)">Same result, {currentDemo === 'adorable' ? '72% less code' : 'way more code'}</p>
        </div>
        
        <!-- Quick Action -->
        <div class="hbox(pack) gap(lg) pt(xl)">
          <button class="btn(primary/xl) hbox(middle) gap(md)">
            Try It Now
            <ArrowRight size="20" />
          </button>
          <button class="btn(secondary/xl)">
            See More Examples
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Why We Built This Section -->
<section class="section() bg(gray-50)">
  <div class="contain()">
    <div class="content(centered)">
      <h2 class="heading(h2) c(gray-900) max-w(600px)">Why We Built This</h2>
      
      <div class="stack(lg) max-w(700px) text(center)">
        <p class="font(lg) c(gray-700)">
          Tired of googling <code class="bg(red-100) px(sm) r(sm)">"justify-content vs align-items"</code> every time?
        </p>
        
        <p class="font(lg) c(gray-700)">
          Frustrated that <code class="bg(red-100) px(sm) r(sm)">w-4</code> means 16px, not 4px?
        </p>
        
        <div class="hbox(middle) gap(lg) pt(lg)">
          <div class="w(80px) h(1px) bg(gray-300)"></div>
          <p class="font(xl) 600 c(purple-600)">That's why we built this</p>
          <div class="w(80px) h(1px) bg(gray-300)"></div>
        </div>
        
        <div class="hbox(pack) gap(lg) pt(lg)">
          <code class="bg(green-100) px(lg) py(md) r(lg) c(green-700) font(lg)">hbox(top)</code>
          <code class="bg(green-100) px(lg) py(md) r(lg) c(green-700) font(lg)">hbox(right)</code>
          <span class="font(lg) 600 c(gray-900)">Done.</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Core Showcases -->
<section class="section() bg(white)">
  <div class="contain()">
    <div class="content(centered)">
      <h2 class="heading(h2) c(gray-900) max-w(600px)">See the Difference</h2>
      <p class="font(lg) c(gray-600) max-w(500px)">
        Code that actually reads like what you want to achieve.
      </p>
    </div>
    
    <div class="rhythm() contain(narrow)">

      <!-- Showcase A: Instantly Readable Code -->
      <div class="stack(lg)">
        <h3 class="heading(h3) text(center) c(purple-700)">Instantly Readable Code</h3>
        
        <div class="grid grid-cols(1) md:grid-cols(2) gap(lg)">
          <div class="stack(sm)">
            <h4 class="font(md) 600 c(text-subtle)">😖 Tailwind</h4>
            <div class="bg(gray-900) r(lg) clip">
              <CodeHighlighter 
                code={`<div class="flex flex-col items-center justify-center gap-6 p-8">`}
                language="html" 
                className="font(sm/1.4)" 
              />
            </div>
          </div>
          
          <div class="stack(sm)">
            <h4 class="font(md) 600 c(primary)">😌 AdorableCSS</h4>
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
        <h3 class="heading(h3) text(center) c(gray-900)">Complex Layouts Are Self-Documenting</h3>
        
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
        
        <p class="font(sm) c(text-secondary) text(center)">
          Read it once, understand it forever. No CSS property guessing games.
        </p>
      </div>
      
      <!-- Showcase C: Component Power -->
      <div class="stack(lg)">
        <h3 class="heading(h3) text(center) c(gray-900)">Built-in Components</h3>
        
        <div class="grid grid-cols(1) md:grid-cols(2) gap(lg)">
          <div class="stack(sm)">
            <h4 class="font(md) 600 c(gray-500)">Before: Rewrite styles every time</h4>
            <div class="bg(gray-900) r(lg) clip">
              <CodeHighlighter 
                code={`<div class="flex flex-col p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">`}
                language="html" 
                className="font(xs/1.3)" 
              />
            </div>
          </div>
          
          <div class="stack(sm)">
            <h4 class="font(md) 600 c(purple-600)">AdorableCSS: Just card()</h4>
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
        
        <div class="bg(purple-50) r(lg) p(lg)">
          <div class="vbox gap(lg) p(lg) bg(white) r(md) shadow(sm)">
            <div class="card() p(lg)">
              <h3 class="heading(lg) c(gray-900) mb(md)">Sample Card</h3>
              <p class="c(gray-600)">This looks professional automatically with built-in design tokens.</p>
            </div>
            <button class="btn(primary) mx(auto)">Submit</button>
          </div>
          <p class="font(sm) c(purple-700) text(center) pt(md) 600">
            ✨ Professional UI with zero design skills required
          </p>
        </div>
      </div>
      
      <!-- Showcase E: Real Project Comparison -->
      <div class="stack(lg)">
        <h3 class="heading(h3) text(center) c(gray-900)">Real Project Impact</h3>
        
        <div class="bg(gray-100) r(lg) p(lg) text(center)">
          <div class="hbox(pack) gap(2xl)">
            <div class="stack(sm)">
              <span class="font(3xl) 700 c(gray-500)">112</span>
              <span class="font(sm) c(gray-600)">Tailwind chars</span>
            </div>
            
            <div class="font(2xl) c(gray-400)">→</div>
            
            <div class="stack(sm)">
              <span class="font(3xl) 700 c(purple-600)">31</span>
              <span class="font(sm) c(gray-600)">AdorableCSS chars</span>
            </div>
          </div>
          
          <div class="pt(lg)">
            <span class="font(xl) 700 c(purple-700)">72% reduction</span>
            <p class="font(sm) c(gray-600)">Same component, instant comprehension</p>
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
      <h2 class="heading(h2) c(gray-900) max-w(600px)">Built-in Component System</h2>
      <p class="font(lg) c(gray-600) max-w(500px)">
        Mix freely with utilities. No conflicts, just consistent design.
      </p>
    </div>
    
    <div class="grid grid-cols(1) md:grid-cols(2) lg:grid-cols(3) gap(xl) max-w(1000px) mx(auto)">
      
      <!-- Buttons -->
      <div class="stack(md) bg(white) p(lg) r(lg) shadow(sm)">
        <h3 class="heading(h4) c(gray-900)">Buttons</h3>
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
          <button class="btn(primary/lg)">Primary Large</button>
          <button class="btn(secondary)">Secondary</button>
          <button class="btn(outline/sm)">Outline Small</button>
        </div>
      </div>
      
      <!-- Cards -->
      <div class="stack(md) bg(white) p(lg) r(lg) shadow(sm)">
        <h3 class="heading(h4) c(gray-900)">Cards</h3>
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
      
      <!-- Inputs -->
      <div class="stack(md) bg(white) p(lg) r(lg) shadow(sm)">
        <h3 class="heading(h4) c(gray-900)">Form Elements</h3>
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
          <div class="bg(purple-50) border(1/purple-200) px(md) py(sm) r(md)">
            <span class="font(sm) c(purple-700)">✓ Success message</span>
          </div>
          <span class="bg(purple-100) c(purple-700) px(sm) py(xs) r(full) font(xs) 600">NEW</span>
        </div>
      </div>
      
    </div>
    
    <!-- Mix with Utilities -->
    <div class="stack(lg) max-w(800px) mx(auto) pt(2xl)">
      <h3 class="heading(h3) text(center) c(gray-900)">Mix Freely with Utilities</h3>
      
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
      
      <div class="bg(white) r(lg) p(lg)">
        <div class="card() hover:scale(102) p(xl) transition">
          <h3 class="heading(h3) mb(md) c(gray-900)">Enhanced Card</h3>
          <p class="c(gray-600) mb(lg)">Components and utilities work together seamlessly</p>
          <button class="btn(primary)">Action</button>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Design Token System -->
<section class="section() bg(white)">
  <div class="contain()">
    <div class="content(centered)">
      <h2 class="heading(h2) c(gray-900) max-w(600px)">Consistent Design Tokens</h2>
      <p class="font(lg) c(gray-600) max-w(500px)">
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
        
        <div class="stack(md) bg(purple-50) r(lg) p(lg)">
          <h4 class="font(md) 600 c(purple-700)">Visual Scale</h4>
          <div class="hbox(middle) gap(md)">
            <div class="bg(purple-200) r(sm)" style="width: 8px; height: 8px;"></div>
            <span class="font(sm)">sm (8px)</span>
            <div class="bg(purple-300) r(sm)" style="width: 12px; height: 12px;"></div>
            <span class="font(sm)">md (12px)</span>
            <div class="bg(purple-400) r(sm)" style="width: 16px; height: 16px;"></div>
            <span class="font(sm)">lg (16px)</span>
            <div class="bg(purple-500) r(sm)" style="width: 20px; height: 20px;"></div>
            <span class="font(sm)">xl (20px)</span>
          </div>
        </div>
      </div>
      
      <!-- Colors -->
      <div class="stack(lg)">
        <h3 class="heading(h3) text(center) c(blue-700)">Colors: Automatic pastel/vivid variations</h3>
        
        <div class="bg(gray-900) r(lg) clip">
          <CodeHighlighter 
            code={`<!-- Smart color system -->
c(blue-500)         <!-- Standard blue -->
bg(blue-100)        <!-- Light blue background -->
border(1/blue-300)  <!-- Blue border -->

<!-- Alpha transparency -->
bg(white.9)         <!-- 90% white -->
c(gray-900.8)       <!-- 80% gray-900 -->`}
            language="css" 
            className="font(sm/1.4)" 
          />
        </div>
        
        <div class="stack(md) bg(blue-50) r(lg) p(lg)">
          <h4 class="font(md) 600 c(blue-700)">Color Palette Preview</h4>
          <div class="grid grid-cols(6) gap(sm)">
            <div class="w(40px) h(40px) bg(blue-100) r(md)"></div>
            <div class="w(40px) h(40px) bg(blue-200) r(md)"></div>
            <div class="w(40px) h(40px) bg(blue-300) r(md)"></div>
            <div class="w(40px) h(40px) bg(blue-400) r(md)"></div>
            <div class="w(40px) h(40px) bg(blue-500) r(md)"></div>
            <div class="w(40px) h(40px) bg(blue-600) r(md)"></div>
          </div>
          <p class="font(sm) c(blue-600)">blue-100 through blue-600 automatically generated</p>
        </div>
      </div>
      
      <!-- Token-Based Everything -->
      <div class="stack(lg)">
        <h3 class="heading(h3) text(center) c(green-700)">Everything Uses Tokens</h3>
        
        <div class="grid grid-cols(1) md:grid-cols(3) gap(lg)">
          <div class="stack(sm) bg(green-50) p(lg) r(lg)">
            <h4 class="font(md) 600 c(green-700)">Spacing</h4>
            <div class="font(sm) c(gray-600)">
              <div>gap() → Token-based</div>
              <div>p() → Token-based</div>
              <div>m() → Token-based</div>
            </div>
          </div>
          
          <div class="stack(sm) bg(purple-50) p(lg) r(lg)">
            <h4 class="font(md) 600 c(purple-700)">Typography</h4>
            <div class="font(sm) c(gray-600)">
              <div>heading() → Complete system</div>
              <div>font() → Size + line-height</div>
              <div>text() → Semantic styles</div>
            </div>
          </div>
          
          <div class="stack(sm) bg(orange-50) p(lg) r(lg)">
            <h4 class="font(md) 600 c(orange-700)">Components</h4>
            <div class="font(sm) c(gray-600)">
              <div>btn() → Design system</div>
              <div>card() → Consistent shadows</div>
              <div>input() → Unified styling</div>
            </div>
          </div>
        </div>
        
        <div class="bg(gray-100) r(lg) p(lg) text(center)">
          <p class="font(lg) 600 c(gray-900)">
            🎯 Result: <span class="c(green-600)">Consistent designs</span> without being a designer
          </p>
        </div>
      </div>
      
    </div>
  </div>
</section>

<!-- 60-Second Installation -->
<section class="section() bg(purple-50)">
  <div class="contain()">
    <div class="content(centered)">
      <h2 class="heading(h2) c(gray-900) max-w(600px)">60-Second Setup</h2>
      <p class="font(lg) c(gray-600) max-w(500px)">
        Get started instantly. No configuration, no complex setup.
      </p>
    </div>
    
    <div class="grid grid-cols(1) md:grid-cols(2) gap(2xl) max-w(900px) mx(auto)">
      
      <!-- CDN -->
      <div class="stack(lg) bg(white) p(xl) r(lg) shadow(sm)">
        <div class="hbox(middle) gap(md)">
          <div class="w(48px) h(48px) r(full) bg(purple-100) hbox(pack)">
            <Zap size="24" class="c(purple-600)" />
          </div>
          <h3 class="heading(h3) c(purple-700)">CDN (Instant)</h3>
        </div>
        
        <div class="bg(gray-900) r(lg) clip">
          <CodeHighlighter 
            code={`<!-- Just add this script tag -->
<script src="https://unpkg.com/adorable-css"></script>

<!-- Start using immediately -->
<div class="vbox(center) gap(lg) p(xl)">
  <h1 class="heading(h1)">Hello World</h1>
  <button class="btn(primary)">Get Started</button>
</div>`}
            language="html" 
            className="font(sm/1.4)" 
          />
        </div>
        
        <div class="hbox(middle) gap(sm) bg(green-50) p(md) r(md)">
          <Check size="16" class="c(green-600)" />
          <span class="font(sm) 600 c(green-700)">Ready in 10 seconds</span>
        </div>
      </div>
      
      <!-- NPM -->
      <div class="stack(lg) bg(white) p(xl) r(lg) shadow(sm)">
        <div class="hbox(middle) gap(md)">
          <div class="w(48px) h(48px) r(full) bg(blue-100) hbox(pack)">
            <Zap size="24" class="c(blue-600)" />
          </div>
          <h3 class="heading(h3) c(blue-700)">NPM (Build Tools)</h3>
        </div>
        
        <div class="bg(gray-900) r(lg) clip">
          <CodeHighlighter 
            code={`# Install
npm install adorable-css

# Import in your JS/CSS
import 'adorable-css'

# Or use with build tools
@import 'adorable-css/dist/adorable.css';`}
            language="bash" 
            className="font(sm/1.4)" 
          />
        </div>
        
        <div class="hbox(middle) gap(sm) bg(blue-50) p(md) r(md)">
          <Check size="16" class="c(blue-600)" />
          <span class="font(sm) 600 c(blue-700)">Works with any framework</span>
        </div>
      </div>
      
    </div>
    
    <!-- Quick Example -->
    <div class="stack(lg) max-w(800px) mx(auto) pt(2xl)">
      <h3 class="heading(h3) text(center) c(gray-900)">Your First AdorableCSS Component</h3>
      
      <div class="bg(gray-900) r(lg) clip">
        <CodeHighlighter 
          code={`<!-- Copy, paste, done! -->
<div class="card() vbox gap(lg) p(xl) max-w(400px) mx(auto)">
  <div class="hbox(middle) gap(md)">
    <div class="w(48px) h(48px) r(full) bg(purple-100) hbox(pack)">
      <span class="font(xl)">✨</span>
    </div>
    <h3 class="heading(h4) c(gray-900)">Welcome!</h3>
  </div>
  
  <p class="c(gray-600)">
    You just created a beautiful card with perfect spacing, 
    typography, and hover effects. Zero CSS written.
  </p>
  
  <button class="btn(primary) mt(md)">
    Get Started
  </button>
</div>`}
          language="html" 
          className="font(sm/1.4)" 
        />
      </div>
      
      <!-- Live Preview -->
      <div class="bg(gray-50) r(lg) p(xl)">
        <div class="card() vbox gap(lg) p(xl) max-w(400px) mx(auto) bg(white)">
          <div class="hbox(middle) gap(md)">
            <div class="w(48px) h(48px) r(full) bg(purple-100) hbox(pack)">
              <span class="font(xl)">✨</span>
            </div>
            <h3 class="heading(h4) c(gray-900)">Welcome!</h3>
          </div>
          
          <p class="c(gray-600)">
            You just created a beautiful card with perfect spacing, 
            typography, and hover effects. Zero CSS written.
          </p>
          
          <button class="btn(primary) mt(md)">
            Get Started
          </button>
        </div>
      </div>
      
      <div class="text(center) pt(lg)">
        <p class="font(lg) 600 c(purple-700)">
          Within 5 seconds, visitors should think "Oh, this IS easier!"
        </p>
      </div>
    </div>
  </div>
</section>