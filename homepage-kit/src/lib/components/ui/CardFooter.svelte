<script lang="ts">
  export let className = '';
  
  const baseClasses = 'hbox(middle) p(lg) pt(0)';
</script>

<div class="{baseClasses} {className}">
  <slot />
</div>