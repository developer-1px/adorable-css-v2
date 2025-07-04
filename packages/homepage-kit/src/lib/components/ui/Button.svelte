<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let variant: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link' = 'default';
  export let size: 'default' | 'sm' | 'lg' | 'icon' = 'default';
  export let disabled = false;
  export let loading = false;
  export let asChild = false;
  export let href: string | undefined = undefined;
  
  const dispatch = createEventDispatcher();
  
  // Map Svelte props to AdorableCSS btn syntax
  const getVariantName = (variant: string) => {
    switch (variant) {
      case 'destructive': return 'destructive'
      default: return variant
    }
  }

  const disabledClasses = disabled ? 'opacity(50) cursor(not-allowed) pointer-events-none' : ''
  
  $: btnClass = size === 'default' 
    ? `btn(${getVariantName(variant)})`
    : `btn(${getVariantName(variant)}/${size})`
    
  $: classes = `${btnClass} ${disabledClasses}`
  
  function handleClick(event: MouseEvent) {
    if (!disabled && !loading) {
      dispatch('click', event);
    }
  }
</script>

{#if href && !disabled}
  <a 
    {href}
    class={classes}
    on:click={handleClick}
    role="button"
    tabindex="0"
  >
    {#if loading}
      <div class="size(16) mr(xs) bd(2/solid/currentColor) bt(2/solid/transparent) r(full) animate(spin)"></div>
    {/if}
    <slot />
  </a>
{:else}
  <button
    type="button"
    class={classes}
    disabled={disabled || loading}
    on:click={handleClick}
  >
    {#if loading}
      <div class="size(16) mr(xs) bd(2/solid/currentColor) bt(2/solid/transparent) r(full) animate(spin)"></div>
    {/if}
    <slot />
  </button>
{/if}

