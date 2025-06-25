<script lang="ts">
  import { Copy, Check, ArrowRight, Sparkles } from 'lucide-svelte';
  import GradientButton from '../brand/GradientButton.svelte';
  
  let copied = false;
  let currentExample = 0;
  
  const examples = [
    {
      before: `display: flex;\nflex-direction: column;\njustify-content: center;\nalign-items: center;\ngap: 16px;\npadding: 24px;\nbackground: linear-gradient(\n  135deg, \n  #8b5cf6 0%, \n  #ec4899 100%\n);\nborder-radius: 16px;\nbox-shadow: 0 10px 15px \n  rgba(0, 0, 0, 0.1);`,
      after: `vbox(center) gap(16) p(24)\nbg(purple-500..pink-500/135deg)\nr(16) shadow(lg)`,
      description: "Perfect center layout with gradient"
    },
    {
      before: `position: absolute;\ntop: 20px;\nleft: 30px;\ntransform: translateZ(0);`,
      after: `layer(top:20+left:30)`,
      description: "Figma-style positioning"
    },
    {
      before: `width: 100%;\nmin-width: 200px;\nmax-width: 400px;`,
      after: `w(200..400)`,
      description: "Smart constraints"
    }
  ];
  
  function copyCode() {
    navigator.clipboard.writeText(examples[currentExample].after);
    copied = true;
    setTimeout(() => copied = false, 2000);
  }
  
  function nextExample() {
    currentExample = (currentExample + 1) % examples.length;
  }
  
  // Auto cycle examples
  import { onMount } from 'svelte';
  onMount(() => {
    const interval = setInterval(nextExample, 3000);
    return () => clearInterval(interval);
  });
</script>

<section class="impact-hero relative min-h(100vh) vbox(center) overflow(hidden) bg(gradient-to-b/white/purple-50/5)">
  <!-- Background Animation -->
  <div class="absolute inset(0) pointer-events(none)">
    <div class="gradient-orb gradient-orb-1 w(400px) h(400px) bg(purple-400/20) r(full) blur(100px) layer(top:-100px+left:-100px) animate-pulse"></div>
    <div class="gradient-orb gradient-orb-2 w(300px) h(300px) bg(pink-400/20) r(full) blur(80px) layer(bottom:-100px+right:-100px) animate-pulse" style="animation-delay: 1s"></div>
  </div>
  
  <div class="container(xl) relative z(10) text(center)">
    <!-- Main Headline -->
    <div class="mb(4xl)">
      <div class="inline-block mb(xl)">
        <div class="px(xl) py(md) bg(gradient-adorable) r(full) shadow(lg) inline-flex(middle) gap(sm)">
          <Sparkles size="20" class="c(white)" />
          <span class="font(sm) 700 c(white) uppercase tracking(wider)">Revolutionary CSS</span>
        </div>
      </div>
      
      <h1 class="font(8xl) 900 leading(1.1) mb(xl) c(gray-900)">
        Write CSS the Way You
        <span class="block bg(gradient-adorable) bg-clip(text) text-fill-color(transparent)">
          Think in Figma
        </span>
      </h1>
      
      <p class="font(2xl) c(gray-600) container(4xl/px:0) leading(1.6) mb(2xl)">
        Stop translating. Start creating. AdorableCSS speaks your design tool's language.
      </p>
      
      <!-- Impact Stats -->
      <div class="hbox(center) gap(3xl) mb(3xl) flex-wrap">
        <div class="text(center)">
          <div class="font(4xl) 900 c(purple-600)">96%</div>
          <div class="font(sm) c(gray-600) 600 uppercase tracking(wide)">Less Code</div>
        </div>
        <div class="text(center)">
          <div class="font(4xl) 900 c(pink-600)">0ms</div>
          <div class="font(sm) c(gray-600) 600 uppercase tracking(wide)">Runtime</div>
        </div>
        <div class="text(center)">
          <div class="font(4xl) 900 c(blue-600)">12KB</div>
          <div class="font(sm) c(gray-600) 600 uppercase tracking(wide)">Bundle</div>
        </div>
      </div>
    </div>
    
    <!-- Interactive Before/After Demo -->
    <div class="mb(4xl)">
      <div class="container(5xl) mx(auto)">
        <div class="glass-card p(3xl) r(2xl) relative overflow(hidden)">
          <!-- Example Selector -->
          <div class="hbox(center) gap(sm) mb(2xl)">
            {#each examples as example, i}
              <button 
                class="px(lg) py(sm) r(full) transition {currentExample === i ? 'bg(gradient-adorable) c(white) 600' : 'bg(white/50) c(gray-600) hover:bg(white/80)'}"
                on:click={() => currentExample = i}
              >
                {example.description}
              </button>
            {/each}
          </div>
          
          <div class="grid grid-cols(1) lg:grid-cols(2) gap(2xl) items(center)">
            <!-- Before: Traditional CSS -->
            <div class="order(2) lg:order(1)">
              <div class="mb(lg)">
                <h3 class="font(lg) 700 c(red-600) mb(sm) hbox(middle) gap(sm)">
                  <span class="w(8px) h(8px) bg(red-500) r(full)"></span>
                  Traditional CSS
                </h3>
                <p class="font(sm) c(gray-600)">Verbose, complex, hard to maintain</p>
              </div>
              
              <div class="bg(gray-900) r(lg) p(xl) relative">
                <pre class="font(sm) c(white) font-family(mono) overflow(x-auto) leading(1.6)"><code>{examples[currentExample].before}</code></pre>
                <div class="absolute top(sm) right(sm)">
                  <div class="px(sm) py(xs) bg(red-500/20) r(md) font(xs) c(red-400) 600">
                    {examples[currentExample].before.split('\\n').length} lines
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Arrow -->
            <div class="order(1) lg:order(2) text(center) lg:vbox(center)">
              <div class="w(80px) h(80px) bg(gradient-adorable) r(full) vbox(center) mx(auto) shadow(xl) pulse">
                <ArrowRight size="32" class="c(white)" />
              </div>
              <div class="font(sm) 700 c(gray-700) mt(md) hidden lg:block">BECOMES</div>
            </div>
            
            <!-- After: AdorableCSS -->
            <div class="order(3)">
              <div class="mb(lg)">
                <h3 class="font(lg) 700 c(green-600) mb(sm) hbox(middle) gap(sm)">
                  <span class="w(8px) h(8px) bg(green-500) r(full)"></span>
                  AdorableCSS
                </h3>
                <p class="font(sm) c(gray-600)">Intuitive, concise, maintainable</p>
              </div>
              
              <div class="bg(gray-900) r(lg) p(xl) relative group cursor(pointer)" on:click={copyCode}>
                <pre class="font(sm) c(white) font-family(mono) leading(1.6)"><code>{examples[currentExample].after}</code></pre>
                
                <div class="absolute top(sm) right(sm) hbox gap(sm)">
                  <div class="px(sm) py(xs) bg(green-500/20) r(md) font(xs) c(green-400) 600">
                    {examples[currentExample].after.split('\\n').length} line{examples[currentExample].after.split('\\n').length > 1 ? 's' : ''}
                  </div>
                  
                  <button class="px(sm) py(xs) bg(white/20) backdrop-blur(sm) r(md) font(xs) c(white) 600 opacity(0) group-hover:opacity(100) transition hbox(middle) gap(xs)">
                    {#if copied}
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
        </div>
      </div>
    </div>
    
    <!-- CTA Buttons -->
    <div class="hbox(center) gap(xl) flex-wrap">
      <GradientButton variant="adorable" size="xl" arrow>
        Start Building Now
      </GradientButton>
      
      <button class="px(2xl) py(xl) bg(white/80) backdrop-blur(sm) r(xl) c(gray-800) 600 shadow(lg) hover:shadow(xl) hover:scale(1.05) transition border(1/gray-200)">
        <span class="hbox(middle) gap(sm)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M14.828 14.828L21 21M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Explore Interactive Demo
        </span>
      </button>
    </div>
    
    <!-- Trust Indicators -->
    <div class="mt(4xl) pt(2xl) bt(1/gray-200)">
      <p class="font(sm) c(gray-500) mb(lg)">Trusted by developers at</p>
      <div class="hbox(center) gap(2xl) flex-wrap opacity(60)">
        <div class="font(lg) 700 c(gray-400)">Vercel</div>
        <div class="font(lg) 700 c(gray-400)">Stripe</div>
        <div class="font(lg) 700 c(gray-400)">Linear</div>
        <div class="font(lg) 700 c(gray-400)">Figma</div>
        <div class="font(lg) 700 c(gray-400)">Discord</div>
      </div>
    </div>
  </div>
</section>

<style>
  @import '../../styles/brand.css';
  
  @keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 0.8; }
  }
  
  .animate-pulse {
    animation: pulse 4s ease-in-out infinite;
  }
  
  pre {
    margin: 0;
    white-space: pre-wrap;
    word-break: break-word;
  }
  
  code {
    font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  }
</style>