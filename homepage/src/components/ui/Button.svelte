<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' = 'default';
  export let size: 'default' | 'sm' | 'lg' | 'icon' = 'default';
  export let disabled = false;
  export let loading = false;
  export let asChild = false;
  export let href: string | undefined = undefined;
  
  const dispatch = createEventDispatcher();
  
  // shadcn/ui inspired button variants using Class Variance Authority pattern
  const buttonVariants = {
    variant: {
      default: 'bg(--colors-primary-600) c(--colors-primary-50) hover:bg(--colors-primary-700) active:bg(--colors-primary-800) shadow(sm) hover:shadow(md)',
      destructive: 'bg(--colors-error-600) c(--colors-error-50) hover:bg(--colors-error-700) active:bg(--colors-error-800) shadow(sm) hover:shadow(md)',
      outline: 'border(1/--colors-gray-300) bg(transparent) c(--colors-gray-900) hover:bg(--colors-gray-100) hover:c(--colors-gray-900) active:bg(--colors-gray-200)',
      secondary: 'bg(--colors-gray-100) c(--colors-gray-900) hover:bg(--colors-gray-200) active:bg(--colors-gray-300)',
      ghost: 'c(--colors-gray-700) hover:bg(--colors-gray-100) hover:c(--colors-gray-900) active:bg(--colors-gray-200)',
      link: 'c(--colors-primary-600) underline-offset(4) hover:underline hover:c(--colors-primary-700) active:c(--colors-primary-800) bg(transparent)'
    },
    size: {
      default: 'h(2xl) px(md) py(xs) font(sm)',
      sm: 'h(2xl) px(sm) py(xs) font(sm) r(md)',
      lg: 'h(3xl) px(xl) py(sm) font(md)',
      icon: 'h(2xl) w(2xl) p(0)'
    }
  };
  
  // Get variant and size classes
  $: variantClass = buttonVariants.variant[variant];
  $: sizeClass = buttonVariants.size[size];
  
  // Base classes shared across all variants
  const baseClasses = `
    inline-flex items(center) justify(center) nowrap r(md) 
    medium ring-offset(--colors-white) transition-colors duration(150) ease(out)
    focus-visible:outline(none) focus-visible:ring(2/--colors-primary-500) focus-visible:ring-offset(2)
    disabled:pointer-events(none) disabled:opacity(50)
    active:scale(98%) transition-transform
  `.replace(/\s+/g, ' ').trim();
  
  function handleClick(event: MouseEvent) {
    if (!disabled && !loading) {
      dispatch('click', event);
    }
  }
</script>

{#if href && !disabled}
  <a 
    {href}
    class="{baseClasses} {variantClass} {sizeClass}"
    on:click={handleClick}
    role="button"
    tabindex="0"
  >
    {#if loading}
      <div class="loading-spinner w(md) h(md) mr(xs) border(2/currentColor) border-t(2/transparent) r(full) animate(spin)"></div>
    {/if}
    <slot />
  </a>
{:else}
  <button
    type="button"
    class="{baseClasses} {variantClass} {sizeClass}"
    disabled={disabled || loading}
    on:click={handleClick}
  >
    {#if loading}
      <div class="loading-spinner w(md) h(md) mr(xs) border(2/currentColor) border-t(2/transparent) r(full) animate(spin)"></div>
    {/if}
    <slot />
  </button>
{/if}

<style>
  /* Loading spinner animation */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  
  /* Enhanced focus ring for accessibility */
  button:focus-visible,
  a:focus-visible {
    outline: 2px solid var(--colors-primary-500);
    outline-offset: 2px;
  }
  
  /* Subtle pressed state */
  button:active,
  a:active {
    transform: scale(0.98);
    transition-duration: 75ms;
  }
  
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
  
  /* Loading state improvements */
  .loading-spinner {
    border-color: currentColor transparent transparent transparent;
  }
</style>