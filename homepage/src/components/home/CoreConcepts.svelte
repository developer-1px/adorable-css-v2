<script lang="ts">
  import { Layers, Palette, Zap, Target, ArrowRight } from 'lucide-svelte';
  import GlassCard from '../brand/GlassCard.svelte';
  
  let activeDemo = 0;
  
  const concepts = [
    {
      icon: Layers,
      title: "Figma Mental Model",
      description: "Write CSS the way you think in Figma",
      color: "purple",
      demos: [
        {
          figma: "Auto Layout → Horizontal",
          code: "hbox()",
          result: "Flexbox horizontal layout"
        },
        {
          figma: "Auto Layout → Vertical", 
          code: "vbox()",
          result: "Flexbox vertical layout"
        },
        {
          figma: "Width → Fill container",
          code: "w(fill)",
          result: "width: 100%"
        },
        {
          figma: "Width → Hug contents",
          code: "w(hug)",
          result: "width: fit-content"
        }
      ]
    },
    {
      icon: Target,
      title: "Constraint Positioning",
      description: "Position elements like Figma constraints",
      color: "blue",
      demos: [
        {
          figma: "Pin to top-left corner",
          code: "layer(top:20+left:30)",
          result: "Absolute positioning with constraints"
        },
        {
          figma: "Center in parent",
          code: "layer(center)",
          result: "Perfect center alignment"
        },
        {
          figma: "Fill parent with padding",
          code: "layer(fill/20)",
          result: "Cover parent with 20px margin"
        }
      ]
    },
    {
      icon: Palette,
      title: "OKLCH Colors",
      description: "Beautiful gradients every time",
      color: "pink",
      demos: [
        {
          figma: "Perfect gradient",
          code: "bg(purple-400..pink-400/135deg)",
          result: "Smooth, vibrant gradient"
        },
        {
          figma: "Multiple color stops",
          code: "bg(blue-500..purple-500..pink-500/90deg)",
          result: "Three-color gradient"
        },
        {
          figma: "Radial gradient",
          code: "bg(purple-500..pink-500/radial)",
          result: "Circular gradient"
        }
      ]
    },
    {
      icon: Zap,
      title: "Zero Runtime",
      description: "Pure CSS output, no JavaScript overhead",
      color: "green",
      demos: [
        {
          figma: "Build time compilation",
          code: "AdorableCSS → Pure CSS",
          result: "No runtime bundle"
        },
        {
          figma: "Tree-shakable",
          code: "Only used styles included",
          result: "Minimal bundle size"
        },
        {
          figma: "Framework agnostic",
          code: "Works with React, Vue, Svelte",
          result: "Universal compatibility"
        }
      ]
    }
  ];
  
  function nextDemo() {
    activeDemo = (activeDemo + 1) % concepts[0].demos.length;
  }
  
  import { onMount } from 'svelte';
  onMount(() => {
    const interval = setInterval(nextDemo, 3000);
    return () => clearInterval(interval);
  });
</script>

<section class="core-concepts py(6xl) bg(gradient-to-b/white/purple-50/5)">
  <div class="container(xl)">
    <!-- Section Header -->
    <div class="text(center) mb(5xl)">
      <div class="inline-block mb(xl)">
        <div class="px(xl) py(md) bg(gradient-adorable) r(full) shadow(lg) inline-flex(middle) gap(sm)">
          <Target size="20" class="c(white)" />
          <span class="font(sm) 700 c(white) uppercase tracking(wider)">Core Concepts</span>
        </div>
      </div>
      
      <h2 class="font(6xl) 900 c(gray-900) mb(xl) leading(1.1)">
        Revolutionary <span class="gradient-text">Principles</span>
      </h2>
      <p class="font(xl) c(gray-600) container(3xl/px:0) leading(1.6)">
        Four fundamental concepts that make AdorableCSS the most intuitive CSS framework ever created
      </p>
    </div>
    
    <!-- Concepts Grid -->
    <div class="grid grid-cols(1) md:grid-cols(2) gap(2xl) mb(5xl)">
      {#each concepts as concept, i}
        <GlassCard hover padding="2xl">
          <div class="vbox gap(xl) h(full)">
            <!-- Icon & Title -->
            <div class="hbox(middle) gap(lg)">
              <div class="w(60px) h(60px) bg({concept.color}-500) r(xl) vbox(center) shadow(lg)">
                <svelte:component this={concept.icon} size="28" class="c(white)" />
              </div>
              <div class="flex(1)">
                <h3 class="font(xl) 700 c(gray-900) mb(xs)">{concept.title}</h3>
                <p class="font(sm) c(gray-600)">{concept.description}</p>
              </div>
            </div>
            
            <!-- Interactive Demo -->
            <div class="flex(1) vbox gap(md)">
              {#each concept.demos as demo, demoIndex}
                <div class="bg(gray-50) r(lg) p(lg) border(1/gray-200) {demoIndex === activeDemo ? 'border(' + concept.color + '-300) bg(' + concept.color + '-50/50)' : ''}">
                  <div class="hbox(middle+between) mb(sm)">
                    <span class="font(sm) 600 c(gray-700)">{demo.figma}</span>
                    <ArrowRight size="14" class="c(gray-400)" />
                  </div>
                  <code class="font(sm) c({concept.color}-600) font-family(mono) block mb(xs)">{demo.code}</code>
                  <p class="font(xs) c(gray-600)">{demo.result}</p>
                </div>
              {/each}
            </div>
            
            <!-- Progress Indicator -->
            <div class="hbox gap(xs)">
              {#each concept.demos as _, demoIndex}
                <div class="flex(1) h(3px) bg(gray-200) r(full) overflow(hidden)">
                  {#if demoIndex === activeDemo}
                    <div class="w(full) h(full) bg({concept.color}-500) animate-slide-right"></div>
                  {/if}
                </div>
              {/each}
            </div>
          </div>
        </GlassCard>
      {/each}
    </div>
    
    <!-- Interactive Playground Preview -->
    <div class="text(center)">
      <GlassCard padding="3xl">
        <div class="mb(2xl)">
          <h3 class="font(2xl) 700 c(gray-900) mb(lg)">Experience the Power</h3>
          <p class="font(lg) c(gray-600) container(3xl/px:0)">
            Try these concepts yourself in our interactive playground
          </p>
        </div>
        
        <!-- Mini Playground -->
        <div class="bg(gray-900) r(xl) p(2xl) mb(2xl)">
          <div class="text(left)">
            <div class="font(sm) c(gray-500) font-family(mono) mb(md)">
              &lt;div class="
            </div>
            <div class="font(sm) c(cyan-400) font-family(mono) leading(1.8)">
              vbox(center) gap(lg) p(2xl)<br/>
              bg(purple-400..pink-400/135deg)<br/>
              r(xl) shadow(xl)<br/>
              hover:scale(1.05) transition
            </div>
            <div class="font(sm) c(gray-500) font-family(mono) mt(md)">
              "&gt;<br/>
              &nbsp;&nbsp;Beautiful Component<br/>
              &lt;/div&gt;
            </div>
          </div>
        </div>
        
        <!-- CTA -->
        <div class="hbox(center) gap(lg) flex-wrap">
          <button class="px(2xl) py(lg) bg(gradient-adorable) c(white) r(xl) 600 shadow(lg) hover:shadow(xl) hover:scale(1.05) transition">
            Try Interactive Playground
          </button>
          
          <button class="px(2xl) py(lg) glass-card c(gray-800) r(xl) 600 hover:shadow(lg) hover:scale(1.05) transition">
            View Complete Documentation
          </button>
        </div>
      </GlassCard>
    </div>
  </div>
</section>

<style>
  @import '../../styles/brand.css';
  
  @keyframes slide-right {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }
  
  .animate-slide-right {
    animation: slide-right 3s ease-in-out;
  }
  
  code {
    font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  }
</style>