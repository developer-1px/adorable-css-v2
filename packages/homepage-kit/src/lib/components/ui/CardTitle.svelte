<script lang="ts">
  export let className = '';
  export let level: 1 | 2 | 3 | 4 | 5 | 6 = 3;
  
  const baseClasses = '600 font(lg/1/-0.025em) c(gray-900)';
</script>

{#if level === 1}
  <h1 class="{baseClasses} {className}">
    <slot />
  </h1>
{:else if level === 2}
  <h2 class="{baseClasses} {className}">
    <slot />
  </h2>
{:else if level === 3}
  <h3 class="{baseClasses} {className}">
    <slot />
  </h3>
{:else if level === 4}
  <h4 class="{baseClasses} {className}">
    <slot />
  </h4>
{:else if level === 5}
  <h5 class="{baseClasses} {className}">
    <slot />
  </h5>
{:else}
  <h6 class="{baseClasses} {className}">
    <slot />
  </h6>
{/if}