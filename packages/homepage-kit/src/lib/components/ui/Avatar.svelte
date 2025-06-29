<script lang="ts">
  import { setContext } from 'svelte';
  
  export let className = '';
  export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  
  const sizeClasses = {
    sm: 'size(32)',
    md: 'size(40)', 
    lg: 'size(48)',
    xl: 'size(64)'
  };
  
  const baseClasses = 'relative flex shrink(0) clip r(full)';
  
  // Set context for child components
  setContext('avatar', {
    size
  });
</script>

<span class="{baseClasses} {sizeClasses[size]} {className}">
  <slot />
</span>