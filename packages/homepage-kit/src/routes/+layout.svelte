<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import Navbar from '$lib/components/home/Navbar.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import ClassInspector from '$lib/components/debug/ClassInspector.svelte';
  
  // Initialize AdorableCSS CDN in browser
  onMount(async () => {
    if (typeof window !== 'undefined') {
      const AdorableCSSModule = await import('adorable-css-cdn');
      const AdorableCSSV2 = AdorableCSSModule.default;
      
      // Initialize with auto-detection
      AdorableCSSV2.init({
        watch: true,
        debug: false
      });
    }
  });
  
  $: currentPath = $page.url.pathname;
</script>

<div class="min-h(screen) vbox">
  <Navbar />
  
  <main class="flex(1)">
    <slot />
  </main>
</div>

{#if !currentPath.startsWith('/docs')}
  <Footer />
{/if}

<!-- Global Class Inspector -->
<ClassInspector />

<style>
  :global(html) {
    font-family: system-ui, -apple-system, sans-serif;
  }
  
  :global(body) {
    margin: 0;
  }
</style>