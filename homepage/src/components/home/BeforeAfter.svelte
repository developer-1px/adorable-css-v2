<script lang="ts">
  import { Copy, Check, Zap } from 'lucide-svelte';
  
  let copiedIndex = -1;
  
  const comparisons = [
    {
      title: "Flexbox Layout",
      before: {
        title: "Traditional CSS",
        code: `.container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 1rem;\n}`,
        lines: 6
      },
      after: {
        title: "AdorableCSS",
        code: `vbox(center) gap(16)`,
        lines: 1
      },
      savings: "83% less code"
    },
    {
      title: "Card Component", 
      before: {
        title: "Traditional CSS",
        code: `.card {\n  padding: 1.5rem;\n  background: linear-gradient(\n    135deg,\n    #8b5cf6 0%,\n    #ec4899 100%\n  );\n  border-radius: 1rem;\n  box-shadow: 0 10px 15px -3px\n    rgba(0, 0, 0, 0.1);\n  transition: transform 0.2s;\n}\n.card:hover {\n  transform: scale(1.05);\n}`,
        lines: 14
      },
      after: {
        title: "AdorableCSS",
        code: `p(24) bg(purple-500..pink-500/135deg)\nr(16) shadow(lg)\nhover:scale(1.05) transition`,
        lines: 3
      },
      savings: "78% less code"
    },
    {
      title: "Responsive Grid",
      before: {
        title: "Traditional CSS", 
        code: `.grid {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 1rem;\n}\n@media (min-width: 768px) {\n  .grid {\n    grid-template-columns: \n      repeat(2, 1fr);\n  }\n}\n@media (min-width: 1024px) {\n  .grid {\n    grid-template-columns: \n      repeat(3, 1fr);\n  }\n}`,
        lines: 16
      },
      after: {
        title: "AdorableCSS",
        code: `grid grid-cols(1) md:grid-cols(2)\nlg:grid-cols(3) gap(16)`,
        lines: 2
      },
      savings: "87% less code"
    }
  ];
  
  function copyCode(code: string, index: number) {
    navigator.clipboard.writeText(code);
    copiedIndex = index;
    setTimeout(() => copiedIndex = -1, 2000);
  }
</script>

<section class="before-after py(6xl) bg(gradient-to-b/white/gray-50)">
  <div class="container(xl)">
    <!-- Section Header -->
    <div class="text(center) mb(5xl)">
      <div class="inline-block mb(xl)">
        <div class="px(xl) py(md) bg(green-500) r(full) shadow(lg) inline-flex(middle) gap(sm)">
          <Zap size="20" class="c(white)" />
          <span class="font(sm) 700 c(white) uppercase tracking(wider)">Code Comparison</span>
        </div>
      </div>
      
      <h2 class="font(6xl) 900 c(gray-900) mb(xl) leading(1.1)">
        See the <span class="bg(gradient-to-r/green-500/emerald-500) bg-clip(text) text-fill-color(transparent)">Difference</span>
      </h2>
      <p class="font(xl) c(gray-600) container(3xl/px:0) leading(1.6)">
        Real-world examples showing how AdorableCSS transforms verbose CSS into clean, intuitive code
      </p>
    </div>
    
    <!-- Comparisons Grid -->
    <div class="vbox gap(4xl)">
      {#each comparisons as comparison, i}
        <div class="glass-card p(3xl) r(2xl) relative overflow(hidden)">
          <!-- Comparison Title -->
          <div class="text(center) mb(3xl)">
            <h3 class="font(2xl) 700 c(gray-900) mb(md)">{comparison.title}</h3>
            <div class="inline-block px(lg) py(sm) bg(green-500/10) c(green-700) r(full) font(sm) 600">
              {comparison.savings}
            </div>
          </div>
          
          <div class="grid grid-cols(1) lg:grid-cols(2) gap(2xl) items(stretch)">
            <!-- Before -->
            <div class="order(1)">
              <div class="mb(lg)">
                <h4 class="font(lg) 700 c(red-600) mb(sm) hbox(middle) gap(sm)">
                  <span class="w(10px) h(10px) bg(red-500) r(full)"></span>
                  {comparison.before.title}
                </h4>
                <p class="font(sm) c(gray-600)">Verbose and complex</p>
              </div>
              
              <div class="bg(gray-900) r(lg) p(xl) relative group h(full) vbox">
                <pre class="font(sm) c(white) font-family(mono) leading(1.6) flex(1)"><code>{comparison.before.code}</code></pre>
                
                <div class="absolute top(sm) right(sm) hbox gap(sm)">
                  <div class="px(sm) py(xs) bg(red-500/20) r(md) font(xs) c(red-400) 600">
                    {comparison.before.lines} lines
                  </div>
                </div>
              </div>
            </div>
            
            <!-- After -->
            <div class="order(2)">
              <div class="mb(lg)">
                <h4 class="font(lg) 700 c(green-600) mb(sm) hbox(middle) gap(sm)">
                  <span class="w(10px) h(10px) bg(green-500) r(full)"></span>
                  {comparison.after.title}
                </h4>
                <p class="font(sm) c(gray-600)">Clean and intuitive</p>
              </div>
              
              <div class="bg(gray-900) r(lg) p(xl) relative group cursor(pointer h(full) vbox)" on:click={() => copyCode(comparison.after.code, i)}>
                <pre class="font(sm) c(white) font-family(mono) leading(1.6) flex(1)"><code>{comparison.after.code}</code></pre>
                
                <div class="absolute top(sm) right(sm) hbox gap(sm)">
                  <div class="px(sm) py(xs) bg(green-500/20) r(md) font(xs) c(green-400) 600">
                    {comparison.after.lines} line{comparison.after.lines > 1 ? 's' : ''}
                  </div>
                  
                  <button class="px(sm) py(xs) bg(white/20) backdrop-blur(sm) r(md) font(xs) c(white) 600 opacity(0) group-hover:opacity(100) transition hbox(middle) gap(xs)">
                    {#if copiedIndex === i}
                      <Check size="12" />
                      Copied!
                    {:else}
                      <Copy size="12" />
                      Copy
                    {/if}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Visual Improvement Indicator -->
          <div class="absolute top(50%) left(50%) transform(-50%/-50%) hidden lg:block">
            <div class="w(60px) h(60px) bg(gradient-to-r/green-500/emerald-500) r(full) vbox(center) shadow(xl) animate-pulse">
              <span class="font(2xl)">→</span>
            </div>
          </div>
        </div>
      {/each}
    </div>
    
    <!-- Bottom CTA -->
    <div class="text(center) mt(5xl) pt(4xl) bt(1/gray-200)">
      <h3 class="font(3xl) 700 c(gray-900) mb(lg)">Ready to Write 80% Less CSS?</h3>
      <p class="font(lg) c(gray-600) mb(2xl)">Join thousands of developers who've already made the switch</p>
      
      <div class="hbox(center) gap(lg) flex-wrap">
        <button class="px(2xl) py(lg) bg(gradient-to-r/green-500/emerald-500) c(white) r(xl) 600 shadow(lg) hover:shadow(xl) hover:scale(1.05) transition">
          Get Started Now
        </button>
        
        <button class="px(2xl) py(lg) glass-card c(gray-800) r(xl) 600 hover:shadow(lg) hover:scale(1.05) transition">
          View More Examples
        </button>
      </div>
    </div>
  </div>
</section>

<style>
  @import '../../styles/brand.css';
  
  pre {
    margin: 0;
    white-space: pre-wrap;
    word-break: break-word;
  }
  
  code {
    font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
  }
  
  .animate-pulse {
    animation: pulse 2s ease-in-out infinite;
  }
</style>