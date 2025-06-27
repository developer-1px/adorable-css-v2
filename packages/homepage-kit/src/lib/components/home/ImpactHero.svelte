<script lang="ts">
  import { ArrowRight, Sparkles, Heart, Star, Zap } from 'lucide-svelte';
  import GradientButton from '../brand/GradientButton.svelte';
  
  let isHovering = false;
  
  // Live preview states
  let selectedBg = 'purple-400..pink-400';
  let selectedRadius = '2xl';
  let selectedShadow = '2xl';
  
  const bgOptions = [
    { value: 'purple-400..pink-400', label: '💜 Purple', color: 'bg(135deg/purple-400,pink-400)' },
    { value: 'blue-400..teal-400', label: '💙 Ocean', color: 'bg(135deg/blue-400,teal-400)' },
    { value: 'orange-400..rose-400', label: '🧡 Sunset', color: 'bg(135deg/orange-400,rose-400)' },
    { value: 'green-400..emerald-400', label: '💚 Nature', color: 'bg(135deg/green-400,emerald-400)' }
  ];
  
  $: liveCode = `vbox(pack) gap(lg) p(2xl)\nbg(${selectedBg}/135deg)\nr(${selectedRadius}) shadow(${selectedShadow})\nhover:scale(1.05) transition`;
  $: liveClasses = `vbox(pack) gap(lg) p(2xl) bg(${selectedBg}/135deg) r(${selectedRadius}) shadow(${selectedShadow}) hover:scale(1.05) transition cursor(pointer)`;
</script>

<section class="hero relative min-h(100vh) vbox(pack) clip bg(white)">
  <!-- Playful Background -->
  <div class="layer pointer-events(none)">
    <!-- Floating shapes -->
    <div class="absolute w(300px) h(300px) r(full) blur(100px) opacity(0.1) 
                bg(135deg/oklch(0.7,0.25,330),oklch(0.65,0.28,360)) 
                top(-150px) right(-50px) animate-float"></div>
    <div class="absolute w(200px) h(200px) r(full) blur(80px) opacity(0.1) 
                bg(135deg/oklch(0.65,0.25,220),oklch(0.7,0.2,250)) 
                bottom(-100px) left(-50px) animate-float-delayed"></div>
  </div>
  
  <div class="container(5xl) relative z(10) px(lg) vbox gap(4xl)">
    <div class="grid grid-cols(1) lg:grid-cols(2) gap(4xl) items(center)">
      <!-- Left: Messaging -->
      <div class="vbox gap(2xl)">
        <!-- Cute Badge -->
        <div class="hbox">
          <div class="px(lg) py(sm) bg(purple-50) r(full) border(1/purple-200) 
                      hbox(center) gap(sm) hover:bg(purple-100) transition group">
            <Heart size="16" class="c(purple-600) group-hover:animate-pulse" fill="currentColor" />
            <span class="font(sm) 600 c(purple-700)">Made with Love & Magic</span>
          </div>
        </div>
        
        <!-- Main Content -->
        <div class="vbox gap(xl)">
          <h1 class="900 font(5xl/1.1) c(gray-900)">
            CSS That Makes You
            <span class="block text(transparent) bg(135deg/oklch(0.65,0.28,295),oklch(0.7,0.25,330)) bg-clip(text)">
              Smile 😊
            </span>
          </h1>
          
          <p class="font(xl/1.6) c(gray-600)">
            Finally, a CSS framework that's as delightful to write as the UIs you create. 
            <strong class="c(gray-900)">Figma-like syntax</strong> that just makes sense.
          </p>
        </div>
        
        <!-- Quick Stats -->
        <div class="hbox gap(2xl)">
          <div class="vbox gap(xs)">
            <div class="hbox(middle) gap(xs)">
              <Zap size="20" class="c(orange-500)" fill="currentColor" />
              <span class="font(2xl) 900 c(gray-900)">96%</span>
            </div>
            <span class="font(sm) c(gray-600)">Less Code</span>
          </div>
          <div class="vbox gap(xs)">
            <div class="hbox(middle) gap(xs)">
              <Star size="20" class="c(yellow-500)" fill="currentColor" />
              <span class="font(2xl) 900 c(gray-900)">12KB</span>
            </div>
            <span class="font(sm) c(gray-600)">Total Size</span>
          </div>
          <div class="vbox gap(xs)">
            <div class="hbox(middle) gap(xs)">
              <Heart size="20" class="c(pink-500)" fill="currentColor" />
              <span class="font(2xl) 900 c(gray-900)">10K+</span>
            </div>
            <span class="font(sm) c(gray-600)">Happy Devs</span>
          </div>
        </div>
        
        <!-- CTA -->
        <div class="hbox gap(lg)">
          <GradientButton variant="adorable" size="lg" arrow>
            Start Building
          </GradientButton>
          
          <button class="px(xl) py(lg) bg(white) border(1/gray-200) r(lg) 
                         c(gray-700) 600 hover:bg(gray-50) hover:shadow(sm) transition">
            npm install adorable-css
          </button>
        </div>
      </div>
      
      <!-- Right: Live Interactive Demo -->
      <div class="relative">
        <div class="absolute -top(lg) -right(lg) px(md) py(sm) bg(green-100) r(full) 
                    border(1/green-200) font(xs) 600 c(green-700) hbox(center) gap(xs)">
          <div class="w(6px) h(6px) bg(green-500) r(full) animate-pulse"></div>
          Live Editor
        </div>
        
        <div class="p(xl) bg(gray-50) r(2xl) border(1/gray-200) vbox gap(lg)">
          <!-- Live Controls -->
          <div class="vbox gap(md)">
            <h3 class="font(md) 700 c(gray-900)">✨ Try it yourself!</h3>
            
            <!-- Background Selector -->
            <div class="grid grid-cols(2) gap(sm)">
              {#each bgOptions as option}
                <button
                  class="p(sm) r(lg) border(1/gray-200) hbox(center) gap(sm) transition
                         {selectedBg === option.value 
                           ? 'bg(white) shadow(md) border(1/purple-400)' 
                           : 'bg(white.5) hover:bg(white) hover:shadow(sm)'}"
                  on:click={() => selectedBg = option.value}
                >
                  <span class="font(sm) 600">{option.label}</span>
                </button>
              {/each}
            </div>
            
            <!-- Other Controls -->
            <div class="hbox gap(md)">
              <div class="flex-1 vbox gap(xs)">
                <label class="font(xs) c(gray-600)">Radius</label>
                <select 
                  bind:value={selectedRadius}
                  class="w(full) px(sm) py(xs) r(md) border(1/gray-200) font(sm) bg(white)"
                >
                  <option value="lg">lg - Subtle</option>
                  <option value="xl">xl - Smooth</option>
                  <option value="2xl">2xl - Rounded</option>
                  <option value="full">full - Pill</option>
                </select>
              </div>
              
              <div class="flex-1 vbox gap(xs)">
                <label class="font(xs) c(gray-600)">Shadow</label>
                <select 
                  bind:value={selectedShadow}
                  class="w(full) px(sm) py(xs) r(md) border(1/gray-200) font(sm) bg(white)"
                >
                  <option value="md">md - Subtle</option>
                  <option value="lg">lg - Lifted</option>
                  <option value="xl">xl - Floating</option>
                  <option value="2xl">2xl - High</option>
                </select>
              </div>
            </div>
          </div>
          
          <!-- Code Display -->
          <div class="bg(gray-900) r(lg) p(lg) vbox gap(sm)">
            <div class="font(xs) c(gray-500)">Your AdorableCSS code:</div>
            <pre class="font(sm/1.5) c(white) font-family(mono)"><code class="language-html">{`<div class="${liveCode.split('\n').join(' ')}">`}</code></pre>
          </div>
          
          <!-- Live Preview -->
          <div class="vbox(center) text(center) gap(md)">
            <div class="font(xs) c(gray-500)">Result (hover me!):</div>
            <div 
              class={liveClasses}
              on:mouseenter={() => isHovering = true}
              on:mouseleave={() => isHovering = false}
            >
              <div class="w(60px) h(60px) bg(white.2) r(full) vbox(pack) backdrop-blur(sm)">
                {#if isHovering}
                  <Heart size="30" class="c(white) animate-bounce" fill="currentColor" />
                {:else}
                  <Sparkles size="30" class="c(white)" />
                {/if}
              </div>
              <h3 class="700 font(lg) c(white)">Beautiful Component</h3>
              <p class="font(sm) c(white.8)">Hover to see the magic ✨</p>
            </div>
          </div>
        </div>
        
        <!-- Fun decoration -->
        <div class="absolute -bottom(md) -left(md) font(2xl)">🎨</div>
        <div class="absolute -top(md) -left(md) font(2xl) animate-bounce">✨</div>
      </div>
    </div>
    
    <!-- Bottom Trust -->
    <div class="text(center) pt(3xl) bt(1/gray-100) vbox gap(md)">
      <p class="font(sm) c(gray-500)">Loved by developers at</p>
      <div class="hbox(center) gap(3xl) opacity(0.3)">
        <div class="font(lg) 700 c(gray-700)">Vercel</div>
        <div class="font(lg) 700 c(gray-700)">Linear</div>
        <div class="font(lg) 700 c(gray-700)">Figma</div>
      </div>
    </div>
  </div>
</section>

<style>
  @keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(30px, -30px) scale(1.1); }
  }
  
  @keyframes float-delayed {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-30px, 30px) scale(0.9); }
  }
  
  .animate-float {
    animation: float 20s ease-in-out infinite;
  }
  
  .animate-float-delayed {
    animation: float-delayed 20s ease-in-out infinite;
    animation-delay: -10s;
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