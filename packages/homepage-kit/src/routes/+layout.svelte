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

<!-- Alpha Version Ribbon -->
<div class="fixed top(0) left(0) z(100) w(100) h(100) clip pointer-events(none)">
  <div class="absolute top(20) left(-35) w(120) bg(orange-500) py(4) text(center) shadow(sm) rotate(-45) pointer-events(auto)">
    <span class="caption(xs) c(white) bold uppercase">Alpha</span>
  </div>
</div>

<Navbar />

<div class="min-h(screen) vbox pt(60)">
  <main class="flex(1)">
    <slot />
  </main>
</div>

{#if !currentPath.startsWith('/docs')}
  <Footer />
{/if}

<!-- Global Class Inspector -->
<ClassInspector />

