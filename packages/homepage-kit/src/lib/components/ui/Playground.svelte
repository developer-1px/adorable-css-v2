<script lang="ts">
  // Simple playground component for MDX testing
  export let title: string = 'Playground';
</script>

<div class="playground">
  <div class="playground-header">
    <h4>{title}</h4>
  </div>
  <div class="playground-content">
    <slot />
  </div>
</div>

<style>
  .playground {
    border: 1px solid rgb(229 231 235);
    border-radius: 0.5rem;
    margin: 1.5rem 0;
    overflow: hidden;
  }
  
  .playground-header {
    background-color: rgb(249 250 251);
    padding: 0.75rem 1rem;
    border-bottom: 1px solid rgb(229 231 235);
  }
  
  .playground-header h4 {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 600;
    color: rgb(75 85 99);
  }
  
  .playground-content {
    padding: 1.5rem;
    background-color: white;
  }
</style>