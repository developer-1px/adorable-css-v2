<script lang="ts">
  import { onMount } from 'svelte';
  import TypographyTokens from './widgets/TypographyTokens.svelte';
  import SpacingTokens from './widgets/SpacingTokens.svelte';
  import ColorPalette from '../../components/ui/ColorPalette.svelte';
  import RadiusTokens from './widgets/RadiusTokens.svelte';
  import ShadowTokens from './widgets/ShadowTokens.svelte';
  import EffectsTokens from './widgets/EffectsTokens.svelte';
  
  // Import Lucide icons
  import { 
    Type as TextIcon,
    Palette as ColorSwatchIcon,
    RectangleHorizontal as BorderRadiusIcon,
    Zap as Shadow01Icon,
    Sparkles,
    Ruler as RulerIcon,
    ChevronRight
  } from 'lucide-svelte';
  
  let activeSection = 'typography';
  let scrollContainer: HTMLElement;
  
  const sections = [
    { id: 'typography', name: 'Typography', icon: TextIcon },
    { id: 'spacing', name: 'Spacing', icon: RulerIcon },
    { id: 'colors', name: 'Colors', icon: ColorSwatchIcon },
    { id: 'radius', name: 'Border Radius', icon: BorderRadiusIcon },
    { id: 'shadows', name: 'Shadows', icon: Shadow01Icon },
    { id: 'effects', name: 'Effects', icon: Sparkles }
  ];
  
  function scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
  // Update active section based on scroll position
  function handleScroll() {
    const scrollPosition = scrollContainer?.scrollTop || window.scrollY;
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const element = document.getElementById(section.id);
      if (element && element.offsetTop - 100 <= scrollPosition) {
        activeSection = section.id;
        break;
      }
    }
  }
  
  onMount(() => {
    scrollContainer = document.querySelector('.scroll-container');
    const container = scrollContainer || window;
    container.addEventListener('scroll', handleScroll);
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<div class="tokens-page min-h(screen) bg(135deg/#f0f9ff_0%,#e0f2fe_25%,#f3e8ff_50%,#fdf2f8_75%,#fef3c7_100%) relative clip">
  <!-- Background Effects -->
  <div class="layer(fill) clip pointer-events(none)">
    <div class="absolute w(700px) h(700px) r(50%) blur(100px) opacity(0.3) bg(135deg/#3b82f6,#8b5cf6) top(-300px) left(-300px) float(25s/ease-in-out/repeat:infinite)"></div>
    <div class="absolute w(600px) h(600px) r(50%) blur(100px) opacity(0.3) bg(135deg/#ec4899,#f43f5e) bottom(-200px) right(-200px) float(25s/ease-in-out/repeat:infinite/delay:8s)"></div>
    <div class="absolute w(500px) h(500px) r(50%) blur(100px) opacity(0.3) bg(135deg/#10b981,#06b6d4) top(40%) left(60%) float(25s/ease-in-out/repeat:infinite/delay:16s)"></div>
    <div class="absolute w(400px) h(400px) r(50%) blur(100px) opacity(0.3) bg(135deg/#f59e0b,#ef4444) top(20%) right(30%) float(25s/ease-in-out/repeat:infinite/delay:20s)"></div>
  </div>
  
  <!-- Header -->
  <div class="header-section py(2xl) relative z(10) fade-up(0.8s/ease-out)">
    <div class="container(2xl/px:lg)">
      <div class="vbox gap(lg) text(center)">
        <div class="hbox(pack) gap(sm)">
          <span class="px(md) py(xs) bg(purple-500.1) c(purple-600) r(full) 700 font(xs)" style="backdrop-filter: blur(4px);">Design System</span>
          <span class="px(md) py(xs) bg(blue-500.1) c(blue-600) r(full) 700 font(xs)" style="backdrop-filter: blur(4px);">v2.0</span>
        </div>
        <h1 class="700 font(5xl/1.1/-0.02em) bg(135deg/#3b82f6,#8b5cf6)" style="-webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
          Design Tokens
        </h1>
        <p class="font(xl/1.6) c(gray-700) container(3xl/px:0)">
          A comprehensive collection of design tokens that power AdorableCSS. 
          Explore typography, colors, spacing, and more with live examples.
        </p>
      </div>
    </div>
  </div>
  
  <!-- Fixed Navigation -->
  <div class="sticky top(0) bg(white.8) z(sticky) shadow(md) fade-up(0.8s/ease-out/delay:100ms)" style="backdrop-filter: blur(24px);">
    <div class="container(7xl/px:lg) py(md)">
      <div class="hbox gap(sm) overflow-x(auto)">
        {#each sections as section}
          <button
            class="px(lg) py(sm) r(xl) 500 font(sm) nowrap transition(all/0.2s/ease-out) hbox(middle) gap(xs)
                   {activeSection === section.id 
                     ? 'bg(to-right/#3b82f6,#a855f7) c(white) shadow(md)' 
                     : 'bg(white) hover:bg(gray-50) c(gray-700) b(1/gray-200) hover:shadow(sm)'}"
            on:click={() => scrollToSection(section.id)}
          >
            <svelte:component this={section.icon} size="16" />
            <span>{section.name}</span>
          </button>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Main Content -->
  <div class="container(xl) py(xl) relative z(10) mx(auto)">
    <div class="scroll-container" bind:this={scrollContainer}>
      <!-- Typography Section -->
      <section id="typography" class="mb(2xl) scroll-mt(4rem) fade-up(0.8s/ease-out/delay:200ms)">
        <TypographyTokens />
      </section>
      
      <!-- Spacing Section -->
      <section id="spacing" class="mb(2xl) scroll-mt(4rem) fade-up(0.8s/ease-out/delay:300ms)">
        <SpacingTokens />
      </section>
      
      <!-- Colors Section -->
      <section id="colors" class="mb(2xl) scroll-mt(4rem) fade-up(0.8s/ease-out/delay:400ms)">
        <ColorPalette />
      </section>
      
      <!-- Border Radius Section -->
      <section id="radius" class="mb(2xl) scroll-mt(4rem) fade-up(0.8s/ease-out/delay:500ms)">
        <RadiusTokens />
      </section>
      
      <!-- Shadows Section -->
      <section id="shadows" class="mb(2xl) scroll-mt(4rem) fade-up(0.8s/ease-out/delay:600ms)">
        <ShadowTokens />
      </section>
      
      <!-- Effects Section -->
      <section id="effects" class="scroll-mt(4rem) fade-up(0.8s/ease-out/delay:700ms)">
        <EffectsTokens />
      </section>
    </div>
  </div>
</div>

<style>
  /* Only keep necessary animations and styles that can't be expressed in AdorableCSS */
  @keyframes float {
    0%, 100% {
      transform: translate(0, 0) scale(1);
    }
    25% {
      transform: translate(40px, -60px) scale(1.1);
    }
    50% {
      transform: translate(-30px, 40px) scale(0.9);
    }
    75% {
      transform: translate(50px, 20px) scale(1.05);
    }
  }
  
  /* Smooth scrolling */
  :global(html) {
    scroll-behavior: smooth;
  }
</style>