<script lang="ts">
  import { onMount } from 'svelte';
  import Code from '../Code.svelte';
  import { Sparkles, ArrowDown } from 'lucide-svelte';
  
  let scrollY = 0;
  let innerHeight = 0;
  
  onMount(() => {
    const handleScroll = () => scrollY = window.scrollY;
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<svelte:window bind:scrollY bind:innerHeight />

<section class="hero relative w(fill) min-h(screen) vbox(pack) clip">
  <!-- Animated Background -->
  <div class="layer(fill) bg(purple-400..purple-600/135deg) opacity(20)"></div>
  
  <!-- Floating Shapes -->
  <div class="layer(fill) pointer(none)">
    <div 
      class="shape-1 layer(top:10%+left:10%) w(300px) h(300px) bg(primary) opacity(10) r(full) blur(100px)"
      style="transform: translateY({scrollY * 0.3}px)"
    ></div>
    <div 
      class="shape-2 layer(bottom:20%+right:15%) w(400px) h(400px) bg(accent) opacity(15) r(full) blur(120px)"
      style="transform: translateY({-scrollY * 0.2}px)"
    ></div>
  </div>
  
  <!-- Content -->
  <div class="relative z(10) container(xl) text(center)">
    <!-- Animated Badge -->
    <div class="mb(xl) animate-fade-in">
      <div class="inline-flex(middle) gap(sm) px(lg) py(sm) r(full) bg(white/20) backdrop-blur(md) b(1/white/30)">
        <Sparkles size="16" class="c(white)" />
        <span class="font(sm) semibold c(white)">Design-First CSS Framework</span>
      </div>
    </div>
    
    <!-- Title with Gradient -->
    <h1 class="font(6xl) bold mb(lg) leading(tight) animate-fade-up">
      <span class="bg(purple-400..pink-400/135deg) bg-clip(text) text-fill-color(transparent)">
        Beautiful CSS
      </span>
      <br />
      <span class="c(gray-800)">Made Simple</span>
    </h1>
    
    <!-- Subtitle -->
    <p class="font(xl) c(gray-600) mb(2xl) container(md/px:0) animate-fade-up animation-delay-200">
      Write CSS the way you think in Figma. Every utility is designed to create stunning visual effects with minimal code.
    </p>
    
    <!-- Interactive Demo -->
    <div class="demo-box p(2xl) bg(white) r(2xl) shadow(2xl) max-w(600px) mx(auto) mb(2xl) animate-fade-up animation-delay-400">
      <div class="demo-preview p(xl) bg(gradient-to-br/purple-50/pink-50) r(xl) mb(lg)">
        <div class="demo-element w(full) h(120px) bg(purple-400..pink-400/135deg) r(xl) shadow(lg) hover:scale(1.05) transition"></div>
      </div>
      <Code code={`<div class="
  bg(purple-400..pink-400/135deg)
  r(xl) shadow(lg)
  hover:scale(1.05) transition
">`} />
    </div>
    
    <!-- Scroll Indicator -->
    <div class="animate-bounce">
      <ArrowDown size="24" class="c(gray-400) mx(auto)" />
    </div>
  </div>
</section>

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
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
  
  .animate-fade-in {
    animation: fade-in 0.8s ease-out;
  }
  
  .animate-fade-up {
    animation: fade-up 1s ease-out backwards;
  }
  
  .animation-delay-200 {
    animation-delay: 0.2s;
  }
  
  .animation-delay-400 {
    animation-delay: 0.4s;
  }
  
  .animate-bounce {
    animation: bounce 2s infinite;
  }
  
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(10px);
    }
  }
</style>