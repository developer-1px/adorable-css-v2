<script lang="ts">
  import ImpactHero from '../../components/home/ImpactHero.svelte';
  import CoreConcepts from '../../components/home/CoreConcepts.svelte';
  import BeforeAfter from '../../components/home/BeforeAfter.svelte';
  import QuickStart from '../../components/home/QuickStart.svelte';
  import { onMount } from 'svelte';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  });
</script>

<div class="homepage w(full) min-h(screen) relative bg(white) {mounted ? 'mounted' : ''}">
  <!-- Main Content Sections -->
  <div class="relative z(10)">
    <ImpactHero />
    <CoreConcepts />
    <BeforeAfter />
    <QuickStart />
  </div>
  
  <!-- Floating Action Button with Tooltip -->
  <button 
    class="fixed bottom(2xl) right(2xl) w(60px) h(60px) r(full) 
           bg(135deg/#8b5cf6,#ec4899) shadow(xl) 
           hover:shadow(2xl) hover:scale(1.1) transition 
           vbox(pack) z(100) group cursor(pointer)"
    on:click={() => window.location.hash = 'playground'}
  >
    <!-- Plus Icon -->
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="c(white)">
      <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
    
    <!-- Tooltip -->
    <div class="absolute bottom(calc(100%+12px)) right(0) 
                bg(gray-900.9) backdrop-blur(sm) c(white) 
                px(md) py(sm) r(lg) font(sm) nowrap 
                opacity(0) group-hover:opacity(1) 
                transition pointer-events(none) shadow(lg)">
      Try Playground
      <div class="absolute top(full) right(20px) w(0) h(0) 
                  border-l(6px/transparent) border-r(6px/transparent) 
                  border-t(6px/gray-900)"></div>
    </div>
  </button>
</div>

<style>
  @import '../../styles/brand.css';
  
  /* Global page settings */
  :global(html) {
    scroll-behavior: smooth;
  }
  
  :global(body) {
    overflow-x: hidden;
  }
  
  /* Entrance animations for sections */
  .homepage:not(.mounted) > :global(.relative) > :global(*) {
    opacity: 0;
    transform: translateY(30px);
  }
  
  .homepage.mounted > :global(.relative) > :global(*) {
    animation: fade-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  
  .homepage.mounted > :global(.relative) > :global(*:nth-child(1)) { animation-delay: 0.1s; }
  .homepage.mounted > :global(.relative) > :global(*:nth-child(2)) { animation-delay: 0.2s; }
  .homepage.mounted > :global(.relative) > :global(*:nth-child(3)) { animation-delay: 0.3s; }
  .homepage.mounted > :global(.relative) > :global(*:nth-child(4)) { animation-delay: 0.4s; }
  
  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>