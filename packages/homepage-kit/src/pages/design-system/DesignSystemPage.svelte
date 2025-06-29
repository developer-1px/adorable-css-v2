<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { 
    Palette, Type, Layout, Box, Sparkles, Grid, 
    ChevronRight, ArrowUp
  } from 'lucide-svelte';
  
  // Section components
  import OverviewSection from './sections/OverviewSection.svelte';
  import ColorSection from './sections/ColorSection.svelte';
  import TypographySection from './sections/TypographySection.svelte';
  import SpacingSection from './sections/SpacingSection.svelte';
  
  let mounted = false;
  let activeSection = 'overview';
  let showScrollTop = false;
  
  // Navigation items
  const navItems = [
    { id: 'overview', name: 'Overview', icon: Box },
    { id: 'colors', name: 'Colors', icon: Palette },
    { id: 'typography', name: 'Typography', icon: Type },
    { id: 'spacing', name: 'Spacing', icon: Layout },
    { id: 'components', name: 'Components', icon: Box },
    { id: 'effects', name: 'Effects', icon: Sparkles },
    { id: 'tokens', name: 'Tokens', icon: Grid }
  ];
  
  onMount(() => {
    mounted = true;
    
    // Handle scroll for active section detection
    const handleScroll = () => {
      const scrollY = window.scrollY;
      showScrollTop = scrollY > 300;
      
      // Find active section based on scroll position
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      })).filter(s => s.element);
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const rect = sections[i].element!.getBoundingClientRect();
        if (rect.top <= 100) {
          activeSection = sections[i].id;
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  });
  
  function scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const top = element.offsetTop - 80; // Account for sticky nav
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
  
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<div class="min-h(screen) bg(white)">
  <!-- Sticky Navigation -->
  <nav class="sticky top(0) z(90) bg(white.95) backdrop-blur(lg) border-b(1/gray-200) shadow(sm)">
    <div class="contain(wide)">
      <div class="hbox(middle) gap(2xl) h(64px) overflow-x(auto) scrollbar(none)">
        {#each navItems as item}
          <button
            class="hbox(middle) gap(sm) px(lg) py(sm) r(lg) transition shrink(0)
                   hover:bg(gray-100) {activeSection === item.id ? 'bg(purple-50) c(purple-600)' : 'c(gray-600)'}"
            on:click={() => scrollToSection(item.id)}
          >
            <svelte:component 
              this={item.icon} 
              size="18" 
              class="{activeSection === item.id ? 'c(purple-600)' : 'c(gray-400)'}" 
            />
            <span class="font(sm) bold">{item.name}</span>
            {#if activeSection === item.id}
              <ChevronRight size="16" class="c(purple-600)" />
            {/if}
          </button>
        {/each}
      </div>
    </div>
  </nav>

  <!-- Main Content -->
  <main class="relative">
    {#if mounted}
      <!-- Overview Section -->
      <div in:fade={{ duration: 300 }}>
        <OverviewSection />
      </div>
      
      <!-- Colors Section -->
      <div class="border-t(1/gray-100)" in:fade={{ duration: 300, delay: 100 }}>
        <ColorSection />
      </div>
      
      <!-- Typography Section -->
      <div class="border-t(1/gray-100)" in:fade={{ duration: 300, delay: 200 }}>
        <TypographySection />
      </div>
      
      <!-- Spacing Section -->
      <div class="border-t(1/gray-100)" in:fade={{ duration: 300, delay: 300 }}>
        <SpacingSection />
      </div>
      
      <!-- Components Section (Placeholder) -->
      <section id="components" class="section()">
        <div class="container() text(center)">
          <h2 class="heading()">Components</h2>
          <p class="prose() mb()">Coming soon...</p>
          <div class="grid() gap()">
            {#each ['Buttons', 'Cards', 'Forms'] as component}
              <div class="card()">
                <h3 class="heading()">{component}</h3>
                <p class="prose()">In development</p>
              </div>
            {/each}
          </div>
        </div>
      </section>
      
      <!-- Effects Section (Placeholder) -->
      <section id="effects" class="section()">
        <div class="container() text(center)">
          <h2 class="heading()">Effects</h2>
          <p class="prose()">Coming soon...</p>
        </div>
      </section>
      
      <!-- Tokens Section (Placeholder) -->
      <section id="tokens" class="section()">
        <div class="container() text(center)">
          <h2 class="heading()">Design Tokens</h2>
          <p class="prose()">Coming soon...</p>
        </div>
      </section>
    {/if}
  </main>

  <!-- Scroll to Top Button -->
  {#if showScrollTop}
    <button
      class="fixed bottom(2xl) right(2xl) w(48px) h(48px) bg(purple-600) hover:bg(purple-700) 
             c(white) r(full) shadow(xl) hbox(pack) transition hover:scale(1.1) z(80)"
      on:click={scrollToTop}
      in:fly={{ y: 20, duration: 200 }}
    >
      <ArrowUp size="24" />
    </button>
  {/if}
</div>

<style>
  /* Hide scrollbar but keep scroll functionality */
  .scrollbar\(none\) {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar\(none\)::-webkit-scrollbar {
    display: none;
  }
</style>