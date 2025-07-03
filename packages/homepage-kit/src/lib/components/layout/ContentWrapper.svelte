<script lang="ts">
  export let variant: 'default' | 'wide' | 'full' | 'docs' = 'default';
  export let padding: boolean = true;
  
  $: wrapperClass = getWrapperClass(variant, padding);
  
  function getWrapperClass(variant: string, padding: boolean): string {
    const baseClass = padding ? '' : 'p(0)';
    
    switch (variant) {
      case 'wide':
        return `content-area-wide ${baseClass}`;
      case 'full':
        return `content-area-full ${baseClass}`;
      case 'docs':
        return `content-area max-w(4xl) ${baseClass}`;
      default:
        return `content-area ${baseClass}`;
    }
  }
</script>

<div class={wrapperClass}>
  <slot />
</div> 