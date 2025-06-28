<script lang="ts" context="module">
  import LiveExample from '$lib/components/docs/LiveExample.svelte';
  import CodeHighlighter from '$lib/components/CodeHighlighter.svelte';
  
  // Export components for use in MDX
  export { LiveExample, CodeHighlighter };
</script>

<script lang="ts">
  // Component instance
</script>

<!-- This layout wraps all MDX content -->
<slot />