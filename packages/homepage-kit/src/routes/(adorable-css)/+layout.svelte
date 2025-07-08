<script lang="ts">
import '../app.css'
import {onMount} from 'svelte'
import AdorableCSSV2 from 'adorable-css-cdn'

// Initialize AdorableCSS CDN in browser
onMount(() => {
  // Initialize with auto-detection
  AdorableCSSV2.init({
    watch: true,
    debug: false
  });
});
</script>

<slot/>