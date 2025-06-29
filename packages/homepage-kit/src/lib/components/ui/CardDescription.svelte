<script lang="ts">
  export let className = '';
  
  const baseClasses = 'font(sm) c(gray-500)';
</script>

<p class="{baseClasses} {className}">
  <slot />
</p>