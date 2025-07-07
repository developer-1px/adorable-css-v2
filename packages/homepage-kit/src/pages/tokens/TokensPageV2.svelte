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

<div class="min-h(screen) bg(gray-50)">
  <!-- Hero Section -->
  <section class="section(large) relative overflow(hidden)">
    <!-- Premium gradient mesh background -->
    <div class="layer(fill) clip pointer-events(none)">
      <div class="absolute inset(0) bg(to-br/primary-100..transparent_40%..purple-100) opacity(0.5)"></div>
      <div class="absolute inset(0) bg(to-tl/secondary-100..transparent_60%..amber-100) opacity(0.3)"></div>
      
      <!-- Animated gradient orbs -->
      <div class="absolute w(120%) h(120%) top(-10%) left(-10%)">
        <div class="absolute w(6xl) h(6xl) r(full) bg(radial-gradient/primary-200.4..transparent) blur(3xl) animate(float-slow)"></div>
        <div class="absolute w(5xl) h(5xl) r(full) bg(radial-gradient/purple-200.4..transparent) blur(3xl) right(0) animate(float-slower)"></div>
        <div class="absolute w(4xl) h(4xl) r(full) bg(radial-gradient/pink-200.4..transparent) blur(3xl) bottom(0) animate(float)"></div>
      </div>
    </div>
    
    <div class="section(text) relative z(10)">
      <div class="content(hero) text(center)">
        <!-- Label -->
        <div class="badge(lg/primary.10) inline-flex items(center) gap(xs)">
          <Sparkles size="16" />
          <span>Design System Foundation</span>
        </div>
        
        <!-- Title -->
        <h1 class="display(hero) font(black) gradient">
          Design Tokens
        </h1>
        
        <!-- Description -->
        <p class="body(prose) c(gray-700) max-w(3xl)">
          The atomic building blocks of AdorableCSS. Every color, spacing unit, and shadow is 
          meticulously crafted to create harmonious, accessible, and beautiful interfaces.
        </p>
        
        <!-- Quick Actions -->
        <div class="hbox(pack) gap(md) flex-wrap">
          <button 
            class="button(lg/primary) hbox(middle) gap(xs)"
            on:click={() => scrollToSection('colors')}
          >
            <Palette size="20" />
            <span>Explore Colors</span>
          </button>
          <button 
            class="button(lg/secondary) hbox(middle) gap(xs)"
            on:click={() => scrollToSection('typography')}
          >
            <Type size="20" />
            <span>View Typography</span>
          </button>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Sticky Navigation -->
  <nav class="sticky top(0) z(100) bg(white.95) backdrop-blur(2xl) bb(xs/gray-200.3) shadow(sm)">
    <div class="section(wide)">
      <div class="hbox gap(0) overflow-x(auto) scrollbar-none relative">
        <!-- Navigation Items -->
        {#each sections as section, i}
          <button
            class="relative px(xl) py(lg) font(medium) text(sm) transition-all whitespace-nowrap hbox(middle) gap(xs)
                   {activeSection === section.id 
                     ? 'c(primary-600)' 
                     : 'c(gray-600) hover:c(gray-900)'}"
            on:click={() => scrollToSection(section.id)}
          >
            <svelte:component 
              this={section.icon} 
              size="18" 
              class="{activeSection === section.id ? 'c(primary-600)' : 'c(gray-400)'}"
            />
            <span>{section.name}</span>
            
            <!-- Active Indicator -->
            {#if activeSection === section.id}
              <div class="absolute bottom(0) left(0) right(0) h(xs) bg(primary-600) r(full)"></div>
            {/if}
          </button>
          
          {#if i < sections.length - 1}
            <div class="w(px) h(50%) bg(gray-200) self(center)"></div>
          {/if}
        {/each}
      </div>
    </div>
  </nav>
  
  <!-- Main Content -->
  <main class="relative" bind:this={scrollContainer}>
    <!-- Typography Section -->
    <section id="typography" class="section(large) bg(white) scroll-mt(6xl)">
      <div class="section(breakout)">
        <TypographyTokens />
      </div>
    </section>
    
    <!-- Spacing Section -->
    <section id="spacing" class="section(large) bg(gradient-subtle) scroll-mt(6xl)">
      <div class="section(wide)">
        <SpacingTokens />
      </div>
    </section>
    
    <!-- Colors Section -->
    <section id="colors" class="section(large) bg(white) scroll-mt(6xl)">
      <div class="section(full)">
        <ColorTokens />
      </div>
    </section>
    
    <!-- Border Radius Section -->
    <section id="radius" class="section(large) bg(gray-50) scroll-mt(6xl)">
      <div class="section(wide)">
        <RadiusTokens />
      </div>
    </section>
    
    <!-- Shadows Section -->
    <section id="shadows" class="section(large) bg(white) scroll-mt(6xl)">
      <div class="section(wide)">
        <ShadowTokens />
      </div>
    </section>
    
    <!-- Elevation Section -->
    <section id="elevation" class="section(large) bg(gradient-subtle) scroll-mt(6xl)">
      <div class="section(wide)">
        <ElevationTokens />
      </div>
    </section>
    
    <!-- Effects Section -->
    <section id="effects" class="section(large) bg(gray-900) c(white) scroll-mt(6xl)">
      <div class="section(breakout)">
        <EffectsTokens />
      </div>
    </section>
    
    <!-- Footer CTA -->
    <section class="section(feature) bg(primary-600) c(white) relative overflow(hidden)">
      <!-- Background Pattern -->
      <div class="layer(fill) opacity(0.1)">
        <div class="absolute inset(0) bg(pattern-dots) opacity(0.3)"></div>
      </div>
      
      <div class="section(medium) relative z(10)">
        <div class="content(hero)">
          <h2 class="display(lg) font(black) c(white)">
            Ready to Build?
          </h2>
          <p class="body(lg) c(white.9) max-w(2xl)">
            Start using these design tokens in your project today. 
            AdorableCSS makes it easy to create consistent, beautiful interfaces.
          </p>
          <div class="hbox(pack) gap(md)">
            <a href="/docs" class="button(lg/white) c(primary-600) hover:c(primary-700)">
              Get Started
            </a>
            <a href="/playground" class="button(lg/white.20) c(white) hover:bg(white.30)">
              Try Playground
            </a>
          </div>
        </div>
      </div>
    </section>
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
  
  /* Gradient backgrounds */
  :global(.bg\(gradient-subtle\)) {
    background: linear-gradient(to bottom right, 
      var(--color-gray-50) 0%, 
      var(--color-primary-50) 25%, 
      var(--color-gray-50) 50%, 
      var(--color-purple-50) 75%, 
      var(--color-gray-50) 100%);
  }
  
  /* Float animations */
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    33% { transform: translateY(-20px) rotate(1deg); }
    66% { transform: translateY(10px) rotate(-1deg); }
  }
  
  @keyframes float-slow {
    0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
    25% { transform: translateY(-30px) translateX(10px) rotate(1deg); }
    50% { transform: translateY(0) translateX(-10px) rotate(-1deg); }
    75% { transform: translateY(20px) translateX(5px) rotate(0.5deg); }
  }
  
  @keyframes float-slower {
    0%, 100% { transform: translateY(0) translateX(0); }
    50% { transform: translateY(-40px) translateX(-20px); }
  }
  
  :global(.animate\(float\)) {
    animation: float 6s ease-in-out infinite;
  }
  
  :global(.animate\(float-slow\)) {
    animation: float-slow 8s ease-in-out infinite;
  }
  
  :global(.animate\(float-slower\)) {
    animation: float-slower 10s ease-in-out infinite;
  }
</style>