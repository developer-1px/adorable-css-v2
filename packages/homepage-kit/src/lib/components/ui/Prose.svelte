<script lang="ts">
  // Prose wrapper for essay-like content
</script>

<div class="prose">
  <slot />
</div>

<style>
  .prose :global(code) {
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
    font-size: 0.9em;
    background-color: rgba(238, 242, 255, 0.7); /* indigo-50 with some transparency */
    color: #4338ca; /* indigo-700 */
    padding: 0.1em 0.3em;
    border-radius: 4px;
    font-weight: 500;
    vertical-align: middle;
  }
</style>
