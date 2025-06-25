<script lang="ts">
  import { Palette, Layout, Sparkles, Layers } from 'lucide-svelte';
  import GlassCard from '../brand/GlassCard.svelte';
  import FloatingOrb from '../brand/FloatingOrb.svelte';
  
  const features = [
    {
      icon: Palette,
      title: 'OKLCH Colors',
      description: 'Perceptually uniform colors with stunning gradients',
      gradient: 'adorable',
      demo: 'bg(purple-400..pink-400/135deg)'
    },
    {
      icon: Layout,
      title: 'Figma-like Layout',
      description: 'Auto Layout concepts translated to CSS',
      gradient: 'ocean',
      demo: 'hbox(middle+between) gap(lg)'
    },
    {
      icon: Sparkles,
      title: 'Modern Effects',
      description: 'Glassmorphism, shadows, and animations built-in',
      gradient: 'sunset',
      demo: 'backdrop-blur(lg) shadow(xl)'
    },
    {
      icon: Layers,
      title: 'Layer System',
      description: 'Position elements like Figma constraints',
      gradient: 'forest',
      demo: 'layer(center) z(10)'
    }
  ];
</script>

<section class="design-showcase relative py(5xl) overflow(hidden)">
  <!-- Background Elements -->
  <div class="absolute inset(0) pointer-events(none)">
    <FloatingOrb size={300} gradient="ocean" opacity={20} blur={80} position={{ top: '10%', left: '-5%' }} />
    <FloatingOrb size={400} gradient="sunset" opacity={15} blur={100} position={{ bottom: '20%', right: '-10%' }} animationDelay={-10} />
  </div>
  
  <div class="container(xl) relative z(10)">
    <!-- Section Header -->
    <div class="text(center) mb(4xl)">
      <h2 class="brand-heading font(5xl) mb(lg) c(gray-900)">
        Design <span class="gradient-text">Superpowers</span>
      </h2>
      <p class="font(xl) c(gray-600) container(2xl/px:0)">
        Everything you need to build beautiful interfaces, inspired by modern design tools
      </p>
    </div>
    
    <!-- Features Grid -->
    <div class="grid grid-cols(1) md:grid-cols(2) gap(2xl)">
      {#each features as feature, i}
        <div class="opacity(0)" style="animation: slide-up 0.6s var(--ease-out-expo) {0.1 + i * 0.1}s forwards">
          <GlassCard hover glow>
            <div class="vbox gap(xl)">
              <!-- Icon with gradient background -->
              <div class="relative">
                <div class="w(80px) h(80px) r(xl) bg(gradient-{feature.gradient}) opacity(10) absolute -top(10px) -left(10px) blur(30px)"></div>
                <div class="w(60px) h(60px) r(xl) bg(gradient-{feature.gradient}) vbox(center) relative">
                  <svelte:component this={feature.icon} size="28" class="c(white)" />
                </div>
              </div>
              
              <!-- Content -->
              <div class="vbox gap(md)">
                <h3 class="font(2xl) 700 c(gray-900)">{feature.title}</h3>
                <p class="c(gray-600) leading(relaxed)">{feature.description}</p>
              </div>
              
              <!-- Code Example -->
              <div class="mt(auto)">
                <div class="px(lg) py(md) bg(gray-900) r(lg) overflow(hidden) relative group cursor(pointer)">
                  <code class="font(sm) c(white) font-family(mono) block">
                    {feature.demo}
                  </code>
                  <div class="absolute inset(0) bg(white/10) translate-x(-100%) group-hover:translate-x(0) transition duration(500)"></div>
                </div>
              </div>
              
              <!-- Live Preview -->
              <div class="p(xl) bg(gray-50) r(xl) relative overflow(hidden)">
                {#if feature.gradient === 'adorable'}
                  <div class="w(full) h(60px) bg(purple-400..pink-400/135deg) r(lg) shadow(lg)"></div>
                {:else if feature.gradient === 'ocean'}
                  <div class="hbox(middle+between) gap(lg) p(lg) bg(white) r(lg) shadow(md)">
                    <div class="w(60px) h(40px) bg(blue-400) r(md)"></div>
                    <div class="w(60px) h(40px) bg(teal-400) r(md)"></div>
                    <div class="w(60px) h(40px) bg(blue-500) r(md)"></div>
                  </div>
                {:else if feature.gradient === 'sunset'}
                  <div class="glass-card p(lg) backdrop-blur(lg) shadow(xl) r(lg)">
                    <div class="w(full) h(40px) bg(orange-400..rose-400/45deg) r(md)"></div>
                  </div>
                {:else}
                  <div class="layer(center) w(120px) h(80px) bg(green-400..emerald-400/120deg) r(lg) shadow(lg) c(white) 600 text(center)">
                    Centered
                  </div>
                {/if}
              </div>
            </div>
          </GlassCard>
        </div>
      {/each}
    </div>
    
    <!-- Bottom CTA -->
    <div class="text(center) mt(4xl)">
      <p class="font(lg) c(gray-600) mb(xl)">
        Ready to experience the future of CSS?
      </p>
      <button class="px(2xl) py(lg) bg(gradient-adorable) c(white) r(xl) 600 shadow(lg) hover:shadow(xl) hover:scale(1.05) transition">
        Explore All Features
      </button>
    </div>
  </div>
</section>

<style>
  @import '../../styles/brand.css';
</style>