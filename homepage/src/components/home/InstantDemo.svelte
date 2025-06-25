<script lang="ts">
  import { Play, Pause, RotateCcw, Code2 } from 'lucide-svelte';
  
  let isPlaying = false;
  let currentStep = 0;
  
  const buildSteps = [
    {
      code: '',
      description: 'Start with empty div',
      result: 'empty-div'
    },
    {
      code: 'vbox(center)',
      description: 'Add vertical layout',
      result: 'step-1'
    },
    {
      code: 'vbox(center) gap(xl)',
      description: 'Add spacing',
      result: 'step-2'
    },
    {
      code: 'vbox(center) gap(xl) p(3xl)',
      description: 'Add padding',
      result: 'step-3'
    },
    {
      code: 'vbox(center) gap(xl) p(3xl) bg(purple-500..pink-500/135deg)',
      description: 'Add gradient background',
      result: 'step-4'
    },
    {
      code: 'vbox(center) gap(xl) p(3xl) bg(purple-500..pink-500/135deg) r(2xl)',
      description: 'Add border radius',
      result: 'step-5'
    },
    {
      code: 'vbox(center) gap(xl) p(3xl) bg(purple-500..pink-500/135deg) r(2xl) shadow(2xl)',
      description: 'Add shadow',
      result: 'step-6'
    },
    {
      code: 'vbox(center) gap(xl) p(3xl) bg(purple-500..pink-500/135deg) r(2xl) shadow(2xl) hover:scale(1.05) transition',
      description: 'Add hover effect',
      result: 'step-7'
    }
  ];
  
  function play() {
    if (isPlaying) return;
    isPlaying = true;
    
    const interval = setInterval(() => {
      if (currentStep < buildSteps.length - 1) {
        currentStep++;
      } else {
        isPlaying = false;
        clearInterval(interval);
      }
    }, 1500);
  }
  
  function pause() {
    isPlaying = false;
  }
  
  function reset() {
    currentStep = 0;
    isPlaying = false;
  }
  
  function jumpToStep(step: number) {
    currentStep = step;
    isPlaying = false;
  }
</script>

<section class="instant-demo py(6xl) bg(gradient-to-b/gray-50/white)">
  <div class="container(xl)">
    <!-- Section Header -->
    <div class="text(center) mb(5xl)">
      <div class="inline-block mb(xl)">
        <div class="px(xl) py(md) bg(blue-500) r(full) shadow(lg) inline-flex(middle) gap(sm)">
          <Code2 size="20" class="c(white)" />
          <span class="font(sm) 700 c(white) uppercase tracking(wider)">Live Demo</span>
        </div>
      </div>
      
      <h2 class="font(6xl) 900 c(gray-900) mb(xl) leading(1.1)">
        Build in <span class="bg(gradient-to-r/blue-500/cyan-500) bg-clip(text) text-fill-color(transparent)">Real-Time</span>
      </h2>
      <p class="font(xl) c(gray-600) container(3xl/px:0) leading(1.6)">
        Watch a beautiful component come to life with every keystroke
      </p>
    </div>
    
    <div class="grid grid-cols(1) lg:grid-cols(2) gap(3xl) items(start)">
      <!-- Code Editor -->
      <div class="order(2) lg:order(1)">
        <div class="mb(lg)">
          <div class="hbox(middle+between) mb(md)">
            <h3 class="font(lg) 700 c(gray-900)">AdorableCSS Code</h3>
            
            <!-- Playback Controls -->
            <div class="hbox gap(sm)">
              <button 
                class="w(40px) h(40px) r(lg) bg(blue-500) c(white) vbox(center) hover:bg(blue-600) transition disabled:opacity(50)"
                on:click={play}
                disabled={isPlaying || currentStep === buildSteps.length - 1}
              >
                <Play size="16" />
              </button>
              
              <button 
                class="w(40px) h(40px) r(lg) bg(gray-500) c(white) vbox(center) hover:bg(gray-600) transition"
                on:click={pause}
              >
                <Pause size="16" />
              </button>
              
              <button 
                class="w(40px) h(40px) r(lg) bg(orange-500) c(white) vbox(center) hover:bg(orange-600) transition"
                on:click={reset}
              >
                <RotateCcw size="16" />
              </button>
            </div>
          </div>
          
          <p class="font(sm) c(gray-600)">
            Step {currentStep + 1} of {buildSteps.length}: {buildSteps[currentStep].description}
          </p>
        </div>
        
        <!-- Code Display -->
        <div class="bg(gray-900) r(lg) p(xl) relative">
          <div class="font(sm) c(gray-500) font-family(mono) mb(md)">
            &lt;div class="
          </div>
          
          <div class="font(sm) c(white) font-family(mono) leading(1.8) min-h(120px)">
            {#if buildSteps[currentStep].code}
              <span class="c(cyan-400)">{buildSteps[currentStep].code}</span>
            {:else}
              <span class="c(gray-600) italic">// Your code will appear here...</span>
            {/if}
          </div>
          
          <div class="font(sm) c(gray-500) font-family(mono)">
            "&gt;
          </div>
          
          <!-- Progress Indicator -->
          <div class="absolute bottom(sm) right(sm)">
            <div class="px(md) py(sm) bg(blue-500/20) r(md) font(xs) c(blue-400) 600">
              {Math.round((currentStep / (buildSteps.length - 1)) * 100)}% complete
            </div>
          </div>
        </div>
        
        <!-- Step Timeline -->
        <div class="mt(lg)">
          <div class="hbox gap(xs) overflow(x-auto) pb(sm)">
            {#each buildSteps as step, i}
              <button 
                class="flex-shrink-0 px(md) py(sm) r(md) font(xs) transition {i <= currentStep ? 'bg(blue-500) c(white)' : 'bg(gray-200) c(gray-600)'} {i === currentStep ? 'ring(2/blue-300)' : ''}"
                on:click={() => jumpToStep(i)}
              >
                {i + 1}
              </button>
            {/each}
          </div>
        </div>
      </div>
      
      <!-- Live Preview -->
      <div class="order(1) lg:order(2)">
        <div class="mb(lg)">
          <h3 class="font(lg) 700 c(gray-900) mb(md)">Live Preview</h3>
          <p class="font(sm) c(gray-600)">Watch the component transform in real-time</p>
        </div>
        
        <div class="bg(white) r(lg) p(3xl) shadow(lg) min-h(400px) vbox(center) relative overflow(hidden)">
          <!-- Background Grid -->
          <div class="absolute inset(0) opacity(5)" style="background-image: radial-gradient(circle, #000 1px, transparent 1px); background-size: 20px 20px;"></div>
          
          <!-- Demo Component -->
          <div class="relative z(10) w(full) vbox(center)">
            {#if currentStep === 0}
              <!-- Empty state -->
              <div class="w(200px) h(100px) border(2/dashed/gray-300) r(lg) vbox(center)">
                <span class="font(sm) c(gray-400)">Empty div</span>
              </div>
            {:else}
              <!-- Progressive build -->
              <div class="demo-component {buildSteps[currentStep].result}">
                <div class="font(2xl) 700 c(white) text(center)">
                  ✨ Beautiful
                </div>
                <div class="font(md) c(white/80) text(center)">
                  Component Built Live
                </div>
                <button class="px(xl) py(md) bg(white/20) r(full) c(white) 600 hover:bg(white/30) transition">
                  Click Me
                </button>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
    
    <!-- Feature Highlights -->
    <div class="mt(5xl) pt(4xl) bt(1/gray-200)">
      <h3 class="font(2xl) 700 c(gray-900) mb(2xl) text(center)">Why Developers Love AdorableCSS</h3>
      
      <div class="grid grid-cols(1) md:grid-cols(3) gap(xl)">
        <div class="text(center) p(xl)">
          <div class="w(60px) h(60px) bg(green-500) r(full) vbox(center) mx(auto) mb(lg)">
            <span class="font(2xl)">⚡</span>
          </div>
          <h4 class="font(lg) 700 c(gray-900) mb(md)">Instant Results</h4>
          <p class="font(sm) c(gray-600)">See changes immediately as you type. No compilation delays.</p>
        </div>
        
        <div class="text(center) p(xl)">
          <div class="w(60px) h(60px) bg(blue-500) r(full) vbox(center) mx(auto) mb(lg)">
            <span class="font(2xl)">🧠</span>
          </div>
          <h4 class="font(lg) 700 c(gray-900) mb(md)">Zero Learning Curve</h4>
          <p class="font(sm) c(gray-600)">If you know Figma, you already know AdorableCSS.</p>
        </div>
        
        <div class="text(center) p(xl)">
          <div class="w(60px) h(60px) bg(purple-500) r(full) vbox(center) mx(auto) mb(lg)">
            <span class="font(2xl)">🎯</span>
          </div>
          <h4 class="font(lg) 700 c(gray-900) mb(md)">Perfect Precision</h4>
          <p class="font(sm) c(gray-600)">Get pixel-perfect results that match your designs.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  @import '../../styles/brand.css';
  
  .demo-component {
    transition: all 0.5s ease;
    min-width: 200px;
    min-height: 150px;
  }
  
  .empty-div {
    border: 2px dashed #d1d5db;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9ca3af;
  }
  
  .step-1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0;
    padding: 0;
    background: transparent;
  }
  
  .step-2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    padding: 0;
    background: transparent;
  }
  
  .step-3 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    padding: 3rem;
    background: transparent;
  }
  
  .step-4 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    padding: 3rem;
    background: linear-gradient(135deg, #8b5cf6, #ec4899);
    border-radius: 0;
  }
  
  .step-5 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    padding: 3rem;
    background: linear-gradient(135deg, #8b5cf6, #ec4899);
    border-radius: 1.5rem;
  }
  
  .step-6 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    padding: 3rem;
    background: linear-gradient(135deg, #8b5cf6, #ec4899);
    border-radius: 1.5rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
  
  .step-7 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    padding: 3rem;
    background: linear-gradient(135deg, #8b5cf6, #ec4899);
    border-radius: 1.5rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    transition: transform 0.2s ease;
  }
  
  .step-7:hover {
    transform: scale(1.05);
  }
  
  code {
    font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  }
</style>