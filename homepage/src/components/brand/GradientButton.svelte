<script lang="ts">
  import { ArrowRight } from 'lucide-svelte';
  
  export let variant: 'adorable' | 'ocean' | 'sunset' | 'forest' = 'adorable';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let arrow = false;
  export let onClick: (() => void) | undefined = undefined;
  
  const gradients = {
    adorable: 'bg(135deg/purple-400,pink-400)',
    ocean: 'bg(90deg/blue-400,teal-400)',
    sunset: 'bg(45deg/orange-400,rose-400)',
    forest: 'bg(120deg/green-400,emerald-400)'
  };
  
  const sizes = {
    sm: 'px(lg) py(sm) font(sm)',
    md: 'px(xl) py(md) font(md)',
    lg: 'px(2xl) py(lg) font(lg)'
  };
</script>

<button 
  class="gradient-button group {gradients[variant]} {sizes[size]} 
         c(white) r(xl) 600 shadow(lg) 
         hover:shadow(xl) hover:scale(1.05) transition 
         hbox(middle) gap(md) relative clip"
  on:click={onClick}
>
  <!-- Shimmer Effect -->
  <div class="layer bg(white.2) translate-x(-100%) group-hover:translate-x(100%) transition duration(700)"></div>
  
  <!-- Content -->
  <span class="relative"><slot /></span>
  {#if arrow}
    <ArrowRight size="20" class="relative group-hover:translate-x(4px) transition" />
  {/if}
</button>

<style>
  .gradient-button {
    position: relative;
    overflow: hidden;
    transform-style: preserve-3d;
  }
  
  .gradient-button::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  .gradient-button:hover::before {
    opacity: 1;
  }
</style>