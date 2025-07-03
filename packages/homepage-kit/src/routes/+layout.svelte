<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import Navbar from '$lib/components/home/Navbar.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import Sidebar from '$lib/components/layout/Sidebar.svelte';
  import ClassInspector from '$lib/components/debug/ClassInspector.svelte';
  
  // AdorableCSS is automatically initialized via CSS import
  onMount(() => {
    // Additional initialization if needed
    console.log('Layout initialized');
  });
  
  $: currentPath = $page.url.pathname;
  
  // Determine layout type based on current path
  $: layoutType = getLayoutType(currentPath);
  $: layoutClass = getLayoutClass(currentPath);
  $: showSidebar = shouldShowSidebar(currentPath);
  $: showFooter = shouldShowFooter(currentPath);
  
  function getLayoutType(path: string): 'docs' | 'tokens' | 'components' | 'default' {
    if (path.startsWith('/docs')) return 'docs';
    if (path.startsWith('/tokens')) return 'tokens';
    if (path.startsWith('/components')) return 'components';
    return 'default';
  }
  
  function getLayoutClass(path: string): string {
    if (path === '/') return 'layout-home';
    if (path.startsWith('/docs')) return 'layout-docs';
    if (path.startsWith('/tokens')) return 'layout-tokens';
    if (path.startsWith('/components')) return 'layout-components';
    if (path.startsWith('/playground')) return 'layout-playground';
    return 'layout-default';
  }
  
  function shouldShowSidebar(path: string): boolean {
    return path.startsWith('/docs') || path.startsWith('/tokens') || path.startsWith('/components');
  }
  
  function shouldShowFooter(path: string): boolean {
    return !path.startsWith('/docs') && !path.startsWith('/playground');
  }
</script>

<!-- Alpha Version Ribbon -->
<div class="fixed top(0) left(0) z(100) w(100) h(100) clip pointer-events(none)">
  <div class="absolute top(20) left(-35) w(120) bg(orange-500) py(4) text(center) shadow(sm) rotate(-45) pointer-events(auto)">
    <span class="caption(xs) c(white) bold uppercase">Alpha</span>
  </div>
</div>

<div class="app-grid {layoutClass}">
  <!-- Header -->
  <header class="app-header">
    <Navbar />
  </header>

  <!-- Sidebar (conditionally rendered) -->
  {#if showSidebar}
    <Sidebar layoutType={layoutType === 'docs' ? 'docs' : layoutType === 'tokens' ? 'tokens' : 'components'} />
  {/if}

  <!-- Main Content -->
  <main class="app-main">
    <slot />
  </main>

  <!-- Footer (conditionally rendered) -->
  {#if showFooter}
    <footer class="app-footer">
      <Footer />
    </footer>
  {/if}
</div>

<!-- Global Class Inspector -->
<ClassInspector />

