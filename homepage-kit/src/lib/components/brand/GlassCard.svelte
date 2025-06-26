<script lang="ts">
  export let hover = true;
  export let glow = false;
  export let padding = '2xl';
  export let radius = '2xl';
</script>

<div 
  class="glass-card-component r({radius}) p({padding}) 
         {hover ? 'hover-lift' : ''} 
         {glow ? 'hover-glow' : ''}"
>
  <slot />
</div>

<style>
  @import '../../styles/brand.css';
  
  .glass-card-component {
    background: var(--glass-bg-solid);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    box-shadow: var(--shadow-lg);
    transition: var(--transition-smooth);
  }
</style>