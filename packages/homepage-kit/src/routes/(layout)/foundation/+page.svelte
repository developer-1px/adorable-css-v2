<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  
  // Redirect to typography page by default
  onMount(() => {
    goto('/foundation/typography', { replaceState: true });
  });
</script>

<div class="text(center) py(4xl)">
  <p class="body(lg) c(gray-600)">Loading foundation...</p>
</div>