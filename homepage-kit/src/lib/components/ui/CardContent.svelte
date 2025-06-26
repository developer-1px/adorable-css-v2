<script lang="ts">
  export let className = '';
  
  const baseClasses = 'p(lg) pt(0)';
</script>

<div class="{baseClasses} {className}">
  <slot />
</div>