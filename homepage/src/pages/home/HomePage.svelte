<script lang="ts">
  import ImpactHero from '../../components/home/ImpactHero.svelte';
  import BeforeAfter from '../../components/home/BeforeAfter.svelte';
  import InstantDemo from '../../components/home/InstantDemo.svelte';
  import CoreConcepts from '../../components/home/CoreConcepts.svelte';
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

<div class="homepage {mounted ? 'mounted' : ''}">
  <!-- Background -->
  <div class="absolute inset(0) pointer-events(none) z(-1)">
    <div class="gradient-orb w(600px) h(600px) bg(purple-400/10) r(full) blur(120px) layer(top:-200px+left:-200px) animate-float"></div>
    <div class="gradient-orb w(400px) h(400px) bg(pink-400/10) r(full) blur(100px) layer(bottom:-200px+right:-200px) animate-float" style="animation-delay: 2s"></div>
  </div>
  
  <!-- Main Content -->
  <div class="relative z(1)">
    <ImpactHero />
    <BeforeAfter />
    <InstantDemo />
    <CoreConcepts />
    <QuickStart />
  </div>
  
  <!-- Floating Action Button -->
  <button class="fixed bottom(2xl) right(2xl) w(60px) h(60px) r(full) bg(gradient-adorable) shadow(xl) hover:shadow(2xl) hover:scale(1.1) transition vbox(center) z(100) group">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="c(white)">
      <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
    <div class="absolute bottom(calc(100%+10px)) right(0) bg(gray-900) c(white) px(md) py(sm) r(lg) font(sm) nowrap opacity(0) group-hover:opacity(100) transition pointer-events(none)">
      Try Playground
    </div>
  </button>
</div>

<style>
  @import '../../styles/brand.css';
  
  :global(body) {
    overflow-x: hidden;
    background: #ffffff;
  }
  
  :global(html) {
    scroll-behavior: smooth;
  }
  
  .homepage {
    width: 100%;
    min-height: 100vh;
    position: relative;
    background: #ffffff;
  }
  
  /* Entrance Animations */
  .homepage:not(.mounted) > :global(*) {
    opacity: 0;
  }
  
  .homepage.mounted > :global(.relative) > :global(*) {
    animation: slide-up 0.8s var(--ease-out-expo) forwards;
  }
  
  .homepage.mounted > :global(.relative) > :global(*:nth-child(1)) {
    animation-delay: 0.1s;
  }
  
  .homepage.mounted > :global(.relative) > :global(*:nth-child(2)) {
    animation-delay: 0.2s;
  }
  
  .homepage.mounted > :global(.relative) > :global(*:nth-child(3)) {
    animation-delay: 0.3s;
  }
  
  .homepage.mounted > :global(.relative) > :global(*:nth-child(4)) {
    animation-delay: 0.4s;
  }
  
  .homepage.mounted > :global(.relative) > :global(*:nth-child(5)) {
    animation-delay: 0.5s;
  }
  
  /* Floating Animation */
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-20px) rotate(1deg); }
    66% { transform: translateY(10px) rotate(-1deg); }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  /* Smooth section transitions */
  :global(section) {
    position: relative;
  }
</style>