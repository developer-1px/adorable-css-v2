<script lang="ts">
  export let src: string;
  export let alt: string = '';
  export let className = '';
  
  let imageLoaded = false;
  let imageError = false;
  
  const baseClasses = 'aspect(1/1) h(full) w(full) object(cover)';
  
  function handleLoad() {
    imageLoaded = true;
  }
  
  function handleError() {
    imageError = true;
  }
</script>

{#if !imageError}
  <img 
    {src} 
    {alt}
    class="{baseClasses} {className}"
    on:load={handleLoad}
    on:error={handleError}
  />
{/if}