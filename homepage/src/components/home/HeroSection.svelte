<script lang="ts">
  import { onMount } from 'svelte';
  import Code from '../Code.svelte';
  import { Sparkles, ArrowRight, Zap, Heart, Star } from 'lucide-svelte';
  
  let scrollY = 0;
  let innerHeight = 0;
  let mouseX = 0;
  let mouseY = 0;
  
  onMount(() => {
    const handleScroll = () => scrollY = window.scrollY;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  });
  
  // Interactive demo states
  let isHovering = false;
  let selectedGradient = 'adorable';
  
  const gradients = {
    adorable: 'bg(purple-400..pink-400/135deg)',
    ocean: 'bg(blue-400..teal-400/90deg)',
    sunset: 'bg(orange-400..rose-400/45deg)',
    forest: 'bg(green-400..emerald-400/120deg)'
  };
</script>

<svelte:window bind:scrollY bind:innerHeight />

<section class="hero relative w(fill) min-h(100vh) vbox(center) overflow(hidden)">
  <!-- Dynamic Gradient Background -->
  <div class="layer(fixed) inset(0) z(0)">
    <div class="w(full) h(full) bg(gradient-to-br/gray-50/purple-50/5/pink-50/5)"></div>
  </div>
  
  <!-- Parallax Orbs -->
  <div class="layer(fixed) inset(0) pointer-events(none) z(1)" style="transform: translate({mouseX}px, {mouseY}px)">
    <div class="gradient-orb gradient-orb-1" style="transform: translateY({scrollY * 0.3}px)"></div>
    <div class="gradient-orb gradient-orb-2" style="transform: translateY({-scrollY * 0.2}px)"></div>
    <div class="gradient-orb gradient-orb-3" style="transform: translateY({scrollY * 0.25}px)"></div>
  </div>
  
  <!-- Main Content -->
  <div class="relative z(10) container(xl) text(center) py(4xl)">
    <!-- Floating Badge -->
    <div class="mb(2xl) opacity(0)" style="animation: slide-up 0.8s var(--ease-out-expo) forwards">
      <div class="inline-flex(middle) gap(sm) px(xl) py(md) r(full) glass-card hover-lift cursor(pointer) group">
        <div class="w(32px) h(32px) r(full) bg(gradient-adorable) vbox(center) group-hover:rotate(360deg) transition duration(700)">
          <Sparkles size="16" class="c(white)" />
        </div>
        <span class="font(sm) 600 c(gray-800)">Figma-First CSS Framework</span>
        <span class="px(md) py(xs) bg(gradient-adorable) c(white) r(full) font(xs) 700">v2.0</span>
      </div>
    </div>
    
    <!-- Main Title -->
    <h1 class="brand-heading font(7xl) mb(xl) opacity(0)" style="animation: slide-up 0.8s var(--ease-out-expo) 0.1s forwards">
      <span class="gradient-text inline-block hover:scale(1.05) transition">
        Delightfully
      </span>
      <br />
      <span class="c(gray-900)">Intuitive CSS</span>
    </h1>
    
    <!-- Subtitle with typing effect -->
    <p class="font(xl) c(gray-600) mb(3xl) container(2xl/px:0) leading(relaxed) opacity(0)" 
       style="animation: slide-up 0.8s var(--ease-out-expo) 0.2s forwards">
      Write CSS that reads like <span class="gradient-text 600">natural language</span>. 
      Create stunning interfaces with the <span class="gradient-text 600">joy of Figma</span> 
      and the <span class="gradient-text 600">power of code</span>.
    </p>
    
    <!-- CTA Buttons -->
    <div class="hbox(center) gap(lg) mb(4xl) flex-wrap opacity(0)" 
         style="animation: slide-up 0.8s var(--ease-out-expo) 0.3s forwards">
      <button class="group px(2xl) py(lg) bg(gradient-adorable) c(white) r(xl) font(md) 600 shadow(lg) hover:shadow(xl) hover:scale(1.05) transition hbox(middle) gap(md)">
        <span>Start Building</span>
        <ArrowRight size="20" class="group-hover:translate-x(4px) transition" />
      </button>
      
      <button class="px(2xl) py(lg) glass-card c(gray-800) r(xl) font(md) 600 hover:shadow(lg) hover:scale(1.05) transition backdrop-blur(xl) b(1/gray-200) hover:b(1/purple-200)">
        View on GitHub
      </button>
    </div>
    
    <!-- Interactive Demo Card -->
    <div class="relative max-w(800px) mx(auto) opacity(0)" 
         style="animation: slide-up 0.8s var(--ease-out-expo) 0.4s forwards">
      <!-- Card -->
      <div class="glass-card r(2xl) p(2xl) shadow(2xl) hover:shadow(3xl) transition bg(white/80) backdrop-blur(xl) b(1/white/50)">
        <!-- Gradient Selector -->
        <div class="hbox(center) gap(sm) mb(xl)">
          <span class="font(sm) c(gray-600) 500">Choose gradient:</span>
          {#each Object.entries(gradients) as [name, _]}
            <button 
              class="px(md) py(xs) r(full) font(xs) 600 transition
                {selectedGradient === name 
                  ? 'bg(gray-900) c(white)' 
                  : 'bg(gray-100) c(gray-600) hover:bg(gray-200)'}"
              on:click={() => selectedGradient = name}
            >
              {name}
            </button>
          {/each}
        </div>
        
        <!-- Preview Area -->
        <div class="relative p(2xl) bg(gray-50) r(xl) mb(xl) overflow(hidden)">
          <!-- Grid Pattern -->
          <div class="absolute inset(0) opacity(30)" 
               style="background-image: radial-gradient(circle, #ddd 1px, transparent 1px); background-size: 20px 20px;"></div>
          
          <!-- Demo Element -->
          <div 
            class="relative w(full) h(150px) {gradients[selectedGradient]} r(xl) shadow(xl) transition duration(500) cursor(pointer)
                   {isHovering ? 'scale(1.05) rotate(1deg)' : ''}"
            on:mouseenter={() => isHovering = true}
            on:mouseleave={() => isHovering = false}
          >
            <!-- Inner Content -->
            <div class="layer(center) vbox(center) gap(md)">
              <div class="hbox(center) gap(sm)">
                <Heart size="24" class="c(white) {isHovering ? 'animate-pulse' : ''}" fill="white" />
                <Star size="24" class="c(white) {isHovering ? 'animate-pulse animation-delay-100' : ''}" fill="white" />
                <Zap size="24" class="c(white) {isHovering ? 'animate-pulse animation-delay-200' : ''}" fill="white" />
              </div>
              <p class="c(white) font(lg) 600">Hover me!</p>
            </div>
          </div>
        </div>
        
        <!-- Code Display -->
        <div class="relative">
          <div class="absolute top(sm) right(sm) px(md) py(xs) bg(green-500) c(white) r(md) font(xs) 600">
            Live Code
          </div>
          <Code code={`<div class="
  ${gradients[selectedGradient]}
  r(xl) shadow(xl)
  hover:scale(1.05) hover:rotate(1deg)
  transition duration(500)
">`} />
        </div>
      </div>
      
      <!-- Floating Elements -->
      <div class="absolute -top(20px) -right(20px) w(60px) h(60px) bg(gradient-ocean) r(full) opacity(60) blur(20px) animate-pulse"></div>
      <div class="absolute -bottom(20px) -left(20px) w(80px) h(80px) bg(gradient-sunset) r(full) opacity(60) blur(20px) animate-pulse animation-delay-500"></div>
    </div>
    
    <!-- Features Preview -->
    <div class="grid grid-cols(3) gap(xl) mt(4xl) opacity(0)" 
         style="animation: slide-up 0.8s var(--ease-out-expo) 0.5s forwards">
      <div class="text(center) group cursor(pointer)">
        <div class="w(80px) h(80px) mx(auto) mb(md) r(xl) bg(gradient-adorable) opacity(10) group-hover:opacity(20) transition vbox(center)">
          <span class="font(2xl) gradient-text 800">50+</span>
        </div>
        <h3 class="font(md) 600 c(gray-800)">Gradient Presets</h3>
      </div>
      
      <div class="text(center) group cursor(pointer)">
        <div class="w(80px) h(80px) mx(auto) mb(md) r(xl) bg(gradient-ocean) opacity(10) group-hover:opacity(20) transition vbox(center)">
          <span class="font(2xl) gradient-text 800">∞</span>
        </div>
        <h3 class="font(md) 600 c(gray-800)">Possibilities</h3>
      </div>
      
      <div class="text(center) group cursor(pointer)">
        <div class="w(80px) h(80px) mx(auto) mb(md) r(xl) bg(gradient-sunset) opacity(10) group-hover:opacity(20) transition vbox(center)">
          <span class="font(2xl) gradient-text 800">0</span>
        </div>
        <h3 class="font(md) 600 c(gray-800)">Setup Time</h3>
      </div>
    </div>
  </div>
  
  <!-- Scroll Indicator -->
  <div class="absolute bottom(2xl) left(50%) translate-x(-50%) opacity(0)" 
       style="animation: slide-up 0.8s var(--ease-out-expo) 0.6s forwards">
    <div class="vbox(center) gap(sm) c(gray-400) animate-bounce">
      <span class="font(xs) uppercase tracking(widest)">Scroll to explore</span>
      <div class="w(1px) h(40px) bg(gradient-to-b/transparent/gray-400/transparent)"></div>
    </div>
  </div>
</section>

<style>
  @import '../../styles/brand.css';
  
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.1);
    }
  }
  
  .animation-delay-100 {
    animation-delay: 0.1s;
  }
  
  .animation-delay-200 {
    animation-delay: 0.2s;
  }
  
  .animation-delay-500 {
    animation-delay: 0.5s;
  }
  
  /* Enhance gradient orbs */
  :global(.gradient-orb) {
    transition: transform 0.3s ease-out;
  }
</style>