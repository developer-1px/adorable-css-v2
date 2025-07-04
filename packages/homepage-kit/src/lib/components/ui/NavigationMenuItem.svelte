<script lang="ts">
  export let active = false
  export let href = '#'
  
  $: classes = active 
    ? 'font(sm/medium) c(primary) hover:c(primary) transition relative pb(2)' 
    : 'font(sm/medium) c(gray-700) hover:c(primary) transition relative pb(2)'
</script>

<a {href} class={classes}>
  <slot />
  {#if active}
    <div class="absolute bottom(0) left(0) right(0) h(2) bg(primary) r(full)"></div>
  {/if}
</a>