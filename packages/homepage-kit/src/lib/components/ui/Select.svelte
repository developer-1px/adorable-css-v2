<script lang="ts">
  export let value = ''
</script>

<div class="relative">
  <select 
    class="w(full) px(12) py(8) pr(32) r(md) body(sm) bd(1/solid/gray-300) focus:bd(1/solid/primary) focus:outline(none) focus:ring(2/primary/0.2) appearance-none cursor(pointer) transition"
    bind:value
    {...$$restProps}
  >
    <slot />
  </select>
  <svg class="absolute right(12) top(1/2) translate-y(-1/2) size(16) c(gray-500) pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
</div>