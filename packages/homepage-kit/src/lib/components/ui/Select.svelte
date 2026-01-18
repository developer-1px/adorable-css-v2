<script lang="ts">
  export let value = ''
</script>

<div class="relative">
  <select 
    class="w(full) px(3) py(2) pr(10) r(md) body(sm) b(gray-300) focus:b(primary) focus:outline(none) focus:ring(2/primary/0.2) appearance-none cursor(pointer) transition"
    bind:value
    {...$$restProps}
  >
    <slot />
  </select>
  <svg class="absolute right(12) top(1/2) translate-y(-1/2) size(16) c(gray-500) pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
</div>