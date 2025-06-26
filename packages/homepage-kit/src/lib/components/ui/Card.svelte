<script lang="ts">
  import { setContext } from 'svelte';
  
  // Card root component props
  export let className = '';
  
  const baseClasses = 'r(lg) border(1/--colors-gray-200) bg(--colors-white) c(--colors-gray-950) shadow(sm)';
  
  // Set context for child components to access card styling
  setContext('card', {
    variant: 'default'
  });
</script>

<div class="{baseClasses} {className}">
  <slot />
</div>

<style>
  /* Card hover effect */
  div:hover {
    box-shadow: var(--shadow-md);
    transition: box-shadow var(--duration-normal) var(--ease-out);
  }
</style>