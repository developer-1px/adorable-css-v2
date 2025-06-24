<script lang="ts">
  export let className = '';
  
  const baseClasses = 'font(sm) c(--colors-gray-500)';
</script>

<p class="{baseClasses} {className}">
  <slot />
</p>