<script lang="ts">
  import { Terminal, Download, Code2, Sparkles, Play, Zap, Copy, Check, ArrowRight, Github } from 'lucide-svelte';
  import CodeHighlighter from '../CodeHighlighter.svelte';
  
  let copied = false;
  let activeStep = 1;
  
  const installCode = `npm install adorable-css`;
  const importCode = `import 'adorable-css'`;
  const exampleCode = `<div class="vbox(pack) gap(lg) p(2xl)
     bg(135deg/purple-500..pink-500)
     r(xl) shadow(xl)
     hover:scale(1.05) transition">
  <h2 class="heading(h3) c(white)">
    Hello AdorableCSS! ✨
  </h2>
  <p class="c(white.8) font(lg)">
    Beautiful by default
  </p>
  <button class="btn(secondary) c(white) border(1/white.3)">
    Get Started
  </button>
</div>`;

  const cdnCode = `<script src="https://unpkg.com/adorable-css-cdn@latest/dist/index.global.js"><\/script>`;
  
  function copyCode(code: string) {
    navigator.clipboard.writeText(code);
    copied = true;
    setTimeout(() => copied = false, 2000);
  }
  
  const frameworks = [
    { name: 'React', logo: '⚛️', color: 'blue' },
    { name: 'Vue', logo: '💚', color: 'green' },
    { name: 'Svelte', logo: '🧡', color: 'orange' },
    { name: 'Angular', logo: '🅰️', color: 'red' },
    { name: 'HTML', logo: '🌐', color: 'purple' }
  ];
</script>

<section class="getting-started py(4xl) bg(gray-50)">
  <div class="contain(wide) px(lg) vbox gap(3xl)">
    
    <!-- Section Header -->
    <div class="vbox(center) text(center) gap(lg)">
      <div class="hbox(pack) mb(md)">
        <div class="hbox(middle) gap(sm) px(lg) py(sm) bg(green-50) r(full) border(1/green-200)">
          <Zap size="16" class="c(green-600)" />
          <span class="font(sm) 600 c(green-700)">60 Second Setup</span>
        </div>
      </div>
      
      <h2 class="heading(h1) max-w(700px) mx(auto)">
        Start Building in
        <span class="bg(135deg/#059669..#10b981)" style="-webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
          60 Seconds
        </span>
      </h2>
      
      <p class="font(xl) c(gray-600) max-w(600px) mx(auto) leading(relaxed)">
        <strong class="c(gray-900)">Zero config. Zero learning curve.</strong> 
        If you can use Figma, you already know AdorableCSS.
        <strong class="c(gray-900)">Start building in 60 seconds.</strong>
      </p>
    </div>
    
    <!-- Quick Options -->
    <div class="grid grid-cols(1) md:grid-cols(2) gap(xl)">
      
      <!-- CDN Option -->
      <div class="card(elevated) p(xl) vbox gap(lg) hover:scale(1.02) transition group">
        <div class="hbox(middle+between)">
          <div class="hbox(middle) gap(sm)">
            <div class="w(40px) h(40px) r(full) bg(purple-100) hbox(pack)">
              <Download size="20" class="c(purple-600)" />
            </div>
            <h3 class="heading(h4)">CDN (Instant)</h3>
          </div>
          <span class="px(sm) py(xs) bg(purple-100) c(purple-700) r(full) font(xs) 600">⚡ Fastest</span>
        </div>
        
        <p class="font(md) c(gray-600)">
          Just add this script to your HTML. Auto-detects classes and generates CSS on-the-fly.
        </p>
        
        <div class="bg(gray-900) r(lg) p(lg) relative">
          <button 
            class="absolute top(sm) right(sm) p(xs) bg(gray-800) hover:bg(gray-700) r(md) opacity(0) group-hover:opacity(100) transition"
            on:click={() => copyCode(cdnCode)}
          >
            {#if copied}
              <Check size="14" class="c(green-400)" />
            {:else}
              <Copy size="14" class="c(gray-300)" />
            {/if}
          </button>
          <CodeHighlighter 
            code={cdnCode} 
            language="html" 
            className="font(sm/1.4)" 
          />
        </div>
        
        <div class="hbox gap(md)">
          <button class="btn(primary) flex(1) hbox(middle) gap(sm)">
            <Play size="16" />
            Try Now
          </button>
          <button class="btn(secondary) px(md)">
            <Code2 size="16" />
          </button>
        </div>
      </div>
      
      <!-- NPM Option -->
      <div class="card(elevated) p(xl) vbox gap(lg) hover:scale(1.02) transition">
        <div class="hbox(middle+between)">
          <div class="hbox(middle) gap(sm)">
            <div class="w(40px) h(40px) r(full) bg(blue-100) hbox(pack)">
              <Terminal size="20" class="c(blue-600)" />
            </div>
            <h3 class="heading(h4)">NPM Package</h3>
          </div>
          <span class="px(sm) py(xs) bg(blue-100) c(blue-700) r(full) font(xs) 600">🚀 Production</span>
        </div>
        
        <p class="font(md) c(gray-600)">
          Install via npm for production builds. Works with Vite, Webpack, and all modern bundlers.
        </p>
        
        <div class="vbox gap(sm)">
          <div class="bg(gray-900) r(lg) p(lg)">
            <CodeHighlighter 
              code={installCode} 
              language="bash" 
              className="font(sm/1.4)" 
            />
          </div>
          <div class="bg(gray-900) r(lg) p(lg)">
            <CodeHighlighter 
              code={importCode} 
              language="javascript" 
              className="font(sm/1.4)" 
            />
          </div>
        </div>
        
        <div class="hbox gap(md)">
          <button class="btn(secondary) flex(1) hbox(middle) gap(sm)">
            <Download size="16" />
            Install
          </button>
          <button class="btn(secondary) px(md)">
            <Github size="16" />
          </button>
        </div>
      </div>
      
    </div>
    
    <!-- Live Example -->
    <div class="card(elevated) p(2xl) vbox gap(xl) bg(white)">
      <div class="text(center)">
        <h3 class="heading(h3) mb(sm)">Your First Component</h3>
        <p class="font(lg) c(gray-600)">Copy, paste, and see the magic happen ✨</p>
      </div>
      
      <div class="grid grid-cols(1) lg:grid-cols(2) gap(2xl) items(start)">
        
        <!-- Code Side -->
        <div class="vbox gap(md)">
          <div class="hbox(middle+between)">
            <span class="font(sm) 600 c(gray-700)">AdorableCSS Code</span>
            <button 
              class="btn(sm) hbox(middle) gap(xs) hover:scale(1.05) transition"
              on:click={() => copyCode(exampleCode)}
            >
              {#if copied}
                <Check size="14" class="c(green-600)" />
                <span class="font(xs) c(green-600)">Copied!</span>
              {:else}
                <Copy size="14" />
                <span class="font(xs)">Copy</span>
              {/if}
            </button>
          </div>
          
          <div class="bg(gray-900) r(lg) p(lg) clip">
            <CodeHighlighter 
              code={exampleCode} 
              language="adorable" 
              className="font(sm/1.4)" 
            />
          </div>
          
          <div class="hbox gap(md) pt(md)">
            <div class="hbox(middle) gap(xs) text(sm) c(gray-500)">
              <div class="w(6px) h(6px) r(full) bg(purple-400)"></div>
              <span>Layout: vbox(pack)</span>
            </div>
            <div class="hbox(middle) gap(xs) text(sm) c(gray-500)">
              <div class="w(6px) h(6px) r(full) bg(pink-400)"></div>
              <span>Gradient: 135deg</span>
            </div>
            <div class="hbox(middle) gap(xs) text(sm) c(gray-500)">
              <div class="w(6px) h(6px) r(full) bg(blue-400)"></div>
              <span>Spacing: gap(lg)</span>
            </div>
          </div>
        </div>
        
        <!-- Preview Side -->
        <div class="vbox gap(md)">
          <span class="font(sm) 600 c(gray-700)">Live Result</span>
          
          <div class="vbox(pack) gap(lg) p(2xl) bg(135deg/purple-500..pink-500) 
                      r(xl) shadow(xl) hover:scale(1.05) transition cursor(pointer) group">
            <h2 class="heading(h3) c(white) group-hover:scale(1.1) transition">
              Hello AdorableCSS! ✨
            </h2>
            <p class="c(white.8) font(lg) group-hover:opacity(100) transition">
              Beautiful by default
            </p>
            <button class="btn(secondary) c(white) border(1/white.3) hover:bg(white.2) transition">
              Get Started
            </button>
          </div>
          
          <div class="grid grid-cols(3) gap(xs) pt(md)">
            <div class="p(sm) bg(purple-50) r(md) text(center)">
              <div class="font(xs) 700 c(purple-600)">Design Tokens</div>
            </div>
            <div class="p(sm) bg(pink-50) r(md) text(center)">
              <div class="font(xs) 700 c(pink-600)">Auto Gradients</div>
            </div>
            <div class="p(sm) bg(blue-50) r(md) text(center)">
              <div class="font(xs) 700 c(blue-600)">Smart Spacing</div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    
    <!-- Framework Support -->
    <div class="vbox(center) text(center) gap(xl)">
      <div class="vbox gap(md)">
        <h3 class="heading(h3)">Works With Everything You Love</h3>
        <p class="font(lg) c(gray-600) max-w(500px) mx(auto)">
          AdorableCSS is framework-agnostic and works with any modern frontend stack
        </p>
      </div>
      
      <div class="hbox(center) gap(lg) flex-wrap">
        {#each frameworks as framework}
          <div class="card(interactive) px(xl) py(lg) hover:scale(1.05) transition group">
            <div class="vbox(center) gap(sm)">
              <div class="font(2xl) group-hover:scale(1.2) transition">{framework.logo}</div>
              <div class="font(md) 600 c(gray-700) group-hover:c({framework.color}-600) transition">{framework.name}</div>
            </div>
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Final CTA -->
    <div class="card(elevated) p(2xl) vbox(center) text(center) gap(xl) bg(135deg/purple-500..pink-500) c(white)">
      <div class="vbox gap(md)">
        <h3 class="heading(h2) opacity(0.95)">Ready to Build Something Amazing?</h3>
        <p class="font(xl) opacity(0.8) max-w(600px) mx(auto)">
          Join thousands of developers who are building beautiful UIs with AdorableCSS
        </p>
      </div>
      
      <div class="hbox(pack) gap(lg) flex-wrap">
        <button class="btn(lg) bg(white) c(purple-600) hover:scale(1.05) transition shadow(lg)">
          <Play size="20" />
          Start Building Now
          <ArrowRight size="20" />
        </button>
        
        <button class="btn(lg) border(2/white.3) c(white) hover:bg(white.1) transition">
          <Github size="20" />
          View on GitHub
        </button>
      </div>
      
      <div class="hbox(pack) gap(xl) pt(lg) font(sm) opacity(0.7)">
        <span>✨ Free & Open Source</span>
        <span>📝 MIT License</span>
        <span>⚡ Zero Runtime</span>
      </div>
    </div>
    
  </div>
</section>