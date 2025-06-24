<script lang="ts">
  export let className = '';
  
  const baseClasses = 'hbox items(center) p(lg) pt(0)';
</script>

<div class="{baseClasses} {className}">
  <slot />
</div>