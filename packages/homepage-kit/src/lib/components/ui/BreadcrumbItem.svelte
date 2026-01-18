<script lang="ts">
  export let current = false
  export let href = '#'
  
  $: linkClasses = current 
    ? 'c(gray-900) font(medium) transition' 
    : 'c(gray-600) hover:c(gray-900) transition'
</script>

<div class="hbox gap(sm)">
  <a class={linkClasses} {href}>
    <slot />
  </a>
  {#if !current}
    <span class="c(gray-400)">/</span>
  {/if}
</div>