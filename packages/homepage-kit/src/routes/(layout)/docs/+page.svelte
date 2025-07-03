<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { getFirstDocItem } from '$lib/docs-config.js';
  
  onMount(() => {
    // Redirect to the first item in docs config
    const firstDoc = getFirstDocItem();
    
    if (firstDoc?.href) {
      goto(firstDoc.href, { replaceState: true });
    }
  });
</script>

<div class="vbox(center/middle) min-h(60vh)">
  <p class="body(md) c(neutral-500)">Redirecting to documentation...</p>
</div>