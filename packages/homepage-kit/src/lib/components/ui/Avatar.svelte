<script lang="ts">
  import { setContext } from 'svelte';
  
  export let className = '';
  export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  
  const sizeClasses = {
    sm: '1280x1280',
    md: '1536x1536', 
    lg: '1920x1920',
    xl: '2560x2560'
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