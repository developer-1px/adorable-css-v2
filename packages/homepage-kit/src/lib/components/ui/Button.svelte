<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let variant: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link' = 'default';
  export let size: 'default' | 'sm' | 'lg' | 'icon' = 'default';
  export let disabled = false;
  export let loading = false;
  export let asChild = false;
  export let href: string | undefined = undefined;
  
  const dispatch = createEventDispatcher();
  
  // Use AdorableCSS btn() component classes
  $: btnClass = size === 'icon' ? `icon-btn(${size})` : `btn(${variant}/${size})`;
  
  // Additional state classes
  $: stateClasses = [
    disabled && 'disabled:opacity(50) disabled:cursor(not-allowed)',
    loading && 'cursor(wait)'
  ].filter(Boolean).join(' ');
  
  function handleClick(event: MouseEvent) {
    if (!disabled && !loading) {
      dispatch('click', event);
    }
  }
</script>

{#if href && !disabled}
  <a 
    {href}
    class="{btnClass} {stateClasses}"
    on:click={handleClick}
    role="button"
    tabindex="0"
  >
    {#if loading}
      <div class="size(16) mr(xs) border(2/currentColor) border-t(2/transparent) r(full) animate(spin)"></div>
    {/if}
    <slot />
  </a>
{:else}
  <button
    type="button"
    class="{btnClass} {stateClasses}"
    disabled={disabled || loading}
    on:click={handleClick}
  >
    {#if loading}
      <div class="size(16) mr(xs) border(2/currentColor) border-t(2/transparent) r(full) animate(spin)"></div>
    {/if}
    <slot />
  </button>
{/if}

<style>
  /* Remove default button styles */
  :where(button) {
    border: none;
    background: none;
    font-family: inherit;
    cursor: pointer;
  }
  
  /* Remove default link styles */
  :where(a) {
    text-decoration: none;
    color: inherit;
  }
</style>