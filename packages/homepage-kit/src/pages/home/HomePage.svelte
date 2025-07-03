<script lang="ts">
  import HeroSection from '../../components/home/HeroSection.svelte';
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
  <div class="rhythm() z(10)">
    <HeroSection />
    <QuickStart />
  </div>
  
  <!-- Floating Action Button with Tooltip -->
  <button 
    class="fixed bottom(2xl) right(2xl) size(60) r(full) 
           bg(135deg/#8b5cf6..#ec4899) shadow(xl)
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
                bg(neutral-900.9) backdrop-blur(sm) c(white) 
                px(md) py(sm) r(lg) font(sm) nowrap 
                opacity(0) group-hover:opacity(1) 
                transition pointer-events(none) shadow(lg)">
      Try Playground
      <div class="absolute top(full) right(20px) w(0) h(0) 
                  bl(6px/transparent) br(6px/transparent) 
                  bt(6px/neutral-900)"></div>
    </div>
  </button>
</div>

