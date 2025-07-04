<script lang="ts">
  export let variant: 'default' | 'gradient' | 'ghost' | 'elevated' | 'interactive' | 'feature' | 'glass' | 'outlined' = 'default';
  export let size: 'sm' | 'default' | 'lg' | 'xl' = 'default';
  export let className = '';
  
  $: cardClass = size === 'default' 
    ? `card(${variant})`
    : `card(${variant}/${size})`
    
  $: classes = `${cardClass} ${className}`
</script>

<div class={classes}>
  <slot />
</div>