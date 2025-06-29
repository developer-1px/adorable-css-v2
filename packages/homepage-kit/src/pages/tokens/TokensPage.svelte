<script lang="ts">
  import { onMount } from 'svelte';
  import TypographyTokens from './widgets/TypographyTokens.svelte';
  import SpacingTokens from './widgets/SpacingTokens.svelte';
  import ColorTokens from './widgets/ColorTokens.svelte';
  import RadiusTokens from './widgets/RadiusTokens.svelte';
  import ShadowTokens from './widgets/ShadowTokens.svelte';
  import ElevationTokens from './widgets/ElevationTokens.svelte';
  import EffectsTokens from './widgets/EffectsTokens.svelte';
  
  // Import Lucide icons
  import { 
    Type,
    Palette,
    Circle,
    Sun,
    Layers,
    Sparkles,
    Ruler,
    ChevronRight
  } from 'lucide-svelte';
  
  let activeSection = 'typography';
  let scrollContainer: HTMLElement;
  
  const sections = [
    { id: 'typography', name: 'Typography', icon: Type },
    { id: 'spacing', name: 'Spacing', icon: Ruler },
    { id: 'colors', name: 'Colors', icon: Palette },
    { id: 'radius', name: 'Radius', icon: Circle },
    { id: 'shadows', name: 'Shadows', icon: Sun },
    { id: 'elevation', name: 'Elevation', icon: Layers },
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
    const container = scrollContainer || window;
    container.addEventListener('scroll', handleScroll);
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<div class="min-h(screen) bg(gray-50) relative">
  <!-- Premium Background Pattern -->
  <div class="layer(fill) clip pointer-events(none) opacity(0.4)">
    <!-- Gradient mesh background -->
    <div class="absolute inset(0) bg(to-br/indigo-50..transparent_40%..purple-50)"></div>
    <div class="absolute inset(0) bg(to-tl/pink-50..transparent_60%..amber-50)"></div>
    
    <!-- Floating orbs for depth -->
    <div class="absolute w(600px) h(600px) r(full) bg(radial-gradient/indigo-200.3..transparent) blur(3xl) top(-200px) left(-200px)"></div>
    <div class="absolute w(500px) h(500px) r(full) bg(radial-gradient/purple-200.3..transparent) blur(3xl) bottom(-150px) right(-150px)"></div>
    <div class="absolute w(400px) h(400px) r(full) bg(radial-gradient/pink-200.3..transparent) blur(3xl) top(50%) left(50%) translate(-50%,-50%)"></div>
  </div>
  
  <!-- Header with refined design -->
  <header class="relative z(10) pt(4xl) pb(3xl) px(xl) overflow(hidden)">
    <div class="container(7xl) mx(auto)">
      <!-- Decorative element -->
      <div class="hbox(center) gap(xs) mb(xl)">
        <span class="inline-block w(40px) h(1px) bg(to-r/transparent..indigo-400)"></span>
        <span class="text(xs) uppercase tracking(0.2em) c(indigo-600) font(medium)">Design System</span>
        <span class="inline-block w(40px) h(1px) bg(to-l/transparent..indigo-400)"></span>
      </div>
      
      <h1 class="font(4xl) bold(800) text(center) letter-spacing(-0.035em) c(gray-900) mb(lg)">
        Design Tokens
      </h1>
      
      <p class="text(xl) text(center) c(gray-600) max-w(2xl) mx(auto)">
        The foundation of AdorableCSS — meticulously crafted tokens that bring 
        consistency and beauty to every interface
      </p>
    </div>
  </header>
  
  <!-- Navigation with glass morphism -->
  <nav class="sticky top(0) z(50) bg(white.85) backdrop-blur(xl) border-b(1px/gray-200.5)">
    <div class="container(7xl) mx(auto) px(xl)">
      <div class="hbox gap(xs) py(md) overflow-x(auto) scrollbar-none">
        {#each sections as section}
          <button
            class="px(xl) py(sm) r(lg) font(medium) text(sm) transition-all whitespace-nowrap hbox(middle) gap(xs)
                   {activeSection === section.id 
                     ? 'bg(indigo-600) c(white) shadow(lg) shadow(indigo-200)' 
                     : 'hover:bg(gray-100) c(gray-700) hover:c(gray-900)'}"
            on:click={() => scrollToSection(section.id)}
          >
            <svelte:component this={section.icon} size="16" />
            <span>{section.name}</span>
          </button>
        {/each}
      </div>
    </div>
  </nav>
  
  <!-- Main Content -->
  <main class="relative z(10)" bind:this={scrollContainer}>
    <div class="container(7xl) mx(auto) px(xl) py(3xl)">
      <!-- Typography Section -->
      <section id="typography" class="mb(6xl) scroll-mt(100px)">
        <TypographyTokens />
      </section>
      
      <!-- Spacing Section -->
      <section id="spacing" class="mb(6xl) scroll-mt(100px)">
        <SpacingTokens />
      </section>
      
      <!-- Colors Section -->
      <section id="colors" class="mb(6xl) scroll-mt(100px)">
        <ColorTokens />
      </section>
      
      <!-- Border Radius Section -->
      <section id="radius" class="mb(6xl) scroll-mt(100px)">
        <RadiusTokens />
      </section>
      
      <!-- Shadows Section -->
      <section id="shadows" class="mb(6xl) scroll-mt(100px)">
        <ShadowTokens />
      </section>
      
      <!-- Elevation Section -->
      <section id="elevation" class="mb(6xl) scroll-mt(100px)">
        <ElevationTokens />
      </section>
      
      <!-- Effects Section -->
      <section id="effects" class="scroll-mt(100px)">
        <EffectsTokens />
      </section>
    </div>
  </main>
</div>

<style>
  /* Smooth scrolling */
  :global(html) {
    scroll-behavior: smooth;
  }
  
  /* Hide scrollbar but keep functionality */
  :global(.scrollbar-none) {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  :global(.scrollbar-none::-webkit-scrollbar) {
    display: none;
  }
</style>