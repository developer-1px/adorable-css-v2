<script lang="ts">
  import { setContext } from 'svelte';
  
  export let className = '';
  export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  
  const sizeClasses = {
    sm: 'h(xl) w(xl)',
    md: 'h(2xl) w(2xl)', 
    lg: 'h(3xl) w(3xl)',
    xl: 'h(4xl) w(4xl)'
  };
  
  const baseClasses = 'relative flex shrink(0) overflow(hidden) r(full)';
  
  // Set context for child components
  setContext('avatar', {
    size
  });
</script>

<span class="{baseClasses} {sizeClasses[size]} {className}">
  <slot />
</span>