<script lang="ts">
  import { setContext } from 'svelte';
  
  // Card root component props
  export let variant: 'default' | 'gradient' | 'ghost' = 'default';
  export let className = '';
  
  // Use AdorableCSS card component
  $: cardClass = variant === 'gradient' ? 'card-gradient' : variant === 'ghost' ? 'card-ghost' : 'card';
  
  // Set context for child components to access card styling
  setContext('card', {
    variant
  });
</script>

<div class="{cardClass} {className}">
  <slot />
</div>