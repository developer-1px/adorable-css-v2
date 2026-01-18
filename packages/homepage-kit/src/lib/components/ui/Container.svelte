<script lang="ts">
  export let size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'xl';
  let className = '';
  export { className as class };
  
  const maxWidths = {
    sm: 'max-w(640px)',
    md: 'max-w(768px)',
    lg: 'max-w(1024px)',
    xl: 'max-w(1280px)',
    full: 'max-w(full)'
  };
</script>

<div class="{maxWidths[size]} mx(auto) px(4xl) w(full) {className}">
  <slot />
</div>
