<script lang="ts">
  import Code from '../Code.svelte';
  import { Palette, Layers, Sparkles, Zap } from 'lucide-svelte';
  
  const showcases = [
    {
      title: 'Stunning Gradients',
      icon: Palette,
      color: 'purple',
      examples: [
        { code: 'bg(blue-400..purple-600/135deg)', desc: 'Diagonal gradient' },
        { code: 'bg(primary..accent..warning/to-r)', desc: 'Multi-color gradient' },
        { code: 'bg(gradient-to-br/pink-400/purple-600)', desc: 'Tailwind-style gradient' }
      ]
    },
    {
      title: 'Beautiful Shadows',
      icon: Layers,
      color: 'blue',
      examples: [
        { code: 'shadow(xl)', desc: 'Elegant shadow' },
        { code: 'shadow(0/10/30/rgba(0,0,0,0.2))', desc: 'Custom shadow' },
        { code: 'shadow(inset/0/2/4/rgba(0,0,0,0.1))', desc: 'Inset shadow' }
      ]
    },
    {
      title: 'Smooth Animations',
      icon: Sparkles,
      color: 'pink',
      examples: [
        { code: 'hover:scale(1.05) transition', desc: 'Hover scale' },
        { code: 'hover:rotate(3) transition(300ms)', desc: 'Hover rotate' },
        { code: 'hover:shadow(2xl) transition', desc: 'Hover shadow' }
      ]
    },
    {
      title: 'Visual Effects',
      icon: Zap,
      color: 'yellow',
      examples: [
        { code: 'backdrop-blur(md)', desc: 'Glassmorphism' },
        { code: 'filter(saturate(1.5))', desc: 'Color enhancement' },
        { code: 'mix-blend(multiply)', desc: 'Blend modes' }
      ]
    }
  ];
</script>

<section class="design-showcase w(fill) py(5xl) bg(gray-50)">
  <div class="container(xl)">
    <!-- Section Header -->
    <div class="text(center) mb(4xl)">
      <h2 class="font(5xl) bold c(gray-900) mb(lg)">
        Design That Delights
      </h2>
      <p class="font(xl) c(gray-600) container(md/px:0)">
        Create stunning visual effects with simple, intuitive utilities
      </p>
    </div>
    
    <!-- Showcase Grid -->
    <div class="grid grid-cols(2) gap(3xl)">
      {#each showcases as showcase}
        <div class="showcase-card p(3xl) bg(white) r(2xl) shadow(lg) hover:shadow(2xl) transition">
          <!-- Header -->
          <div class="hbox(middle) gap(lg) mb(2xl)">
            <div class="w(4xl) h(4xl) bg({showcase.color}-100) r(xl) vbox(pack)">
              <svelte:component this={showcase.icon} size="24" class="c({showcase.color}-600)" />
            </div>
            <h3 class="font(2xl) bold c(gray-900)">{showcase.title}</h3>
          </div>
          
          <!-- Examples -->
          <div class="vbox gap(xl)">
            {#each showcase.examples as example}
              <div class="example-item">
                <div class="mb(sm)">
                  <Code code={example.code} />
                </div>
                <p class="font(sm) c(gray-500)">{example.desc}</p>
                
                <!-- Visual Preview -->
                <div class="preview mt(lg) p(xl) bg(gray-50) r(lg)">
                  {#if showcase.title === 'Stunning Gradients'}
                    <div class="w(full) h(80px) r(lg) {example.code}"></div>
                  {:else if showcase.title === 'Beautiful Shadows'}
                    <div class="w(120px) h(120px) bg(white) r(lg) {example.code} mx(auto)"></div>
                  {:else if showcase.title === 'Smooth Animations'}
                    <div class="w(120px) h(120px) bg(purple-500) r(lg) mx(auto) {example.code} c(white) vbox(pack) font(sm) semibold">
                      Hover me
                    </div>
                  {:else if showcase.title === 'Visual Effects'}
                    <div class="relative">
                      {#if example.code.includes('backdrop-blur')}
                        <div class="w(full) h(80px) bg(gradient-to-r/blue-400/purple-600) r(lg)"></div>
                        <div class="layer(center) w(200px) h(60px) bg(white/30) {example.code} r(lg) vbox(pack) font(sm) semibold c(white)">
                          Glassmorphism
                        </div>
                      {:else}
                        <div class="w(full) h(80px) bg(gradient-to-r/pink-400/yellow-400) r(lg) {example.code}"></div>
                      {/if}
                    </div>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .showcase-card {
    transition: all 0.3s ease;
  }
  
  .showcase-card:hover {
    transform: translateY(-4px);
  }
  
  .preview > div {
    transition: all 0.3s ease;
  }
</style>