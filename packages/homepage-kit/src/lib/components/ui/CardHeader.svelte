<script lang="ts">
  export let className = '';
  
  const baseClasses = 'vbox gap(xs) p(lg)';
</script>

<div class="{baseClasses} {className}">
  <slot />
</div>