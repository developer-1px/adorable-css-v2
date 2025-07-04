<script lang="ts">
  export let variant: 'default' | 'secondary' | 'outline' | 'destructive' = 'default'
  export let size: 'xs' | 'sm' | 'default' | 'lg' = 'default'

  // Map Svelte props to AdorableCSS badge syntax
  const getVariantName = (variant: string) => {
    switch (variant) {
      case 'destructive': return 'error'
      case 'secondary': return 'muted'
      default: return variant
    }
  }

  $: badgeClass = size === 'default' 
    ? `badge(${getVariantName(variant)})`
    : `badge(${size}/${getVariantName(variant)})`
</script>

<span class={badgeClass}>
  <slot />
</span>