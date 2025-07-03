<script>
  import { page } from '$app/stores';
  import { ChevronRight } from 'lucide-svelte';
  import ContentWrapper from '$lib/components/layout/ContentWrapper.svelte';
  import { getDocNavigation, findDocByHref } from '$lib/docs-config';
  
  $: currentDoc = findDocByHref($page.url.pathname);
  $: navigation = getDocNavigation($page.url.pathname);
</script>

<ContentWrapper variant="docs">
  <!-- Breadcrumb -->
  <div class="mb(32) pb(16) border-b(1/gray-100)">
    <div class="hbox(middle) gap(6) font(sm/1.5)">
      <a href="/" class="c(gray-600) hover:c(gray-900) transition">Home</a>
      <ChevronRight size="14" class="c(gray-400)" />
      <a href="/docs" class="c(gray-600) hover:c(gray-900) transition">Docs</a>
      {#if currentDoc}
        <ChevronRight size="14" class="c(gray-400)" />
        <span class="c(gray-900)">{currentDoc.title}</span>
      {/if}
    </div>
  </div>
  
  <!-- Content -->
  <article class="prose max-w(none)">
    <slot />
  </article>
  
  <!-- Pagination -->
  <nav class="grid(2) gap(24) mt(80) pt(48) border-t(1/gray-100)">
    {#if navigation.prev}
      <a href={navigation.prev.href} 
         class="group p(20) r(8) border(1/gray-200)  
                hover:border(gray-300) hover:shadow(md) 
                transition">
        <div class="vbox gap(4)">
          <span class="font(xs/1.5) c(gray-500) group-hover:c(gray-700) transition">← Previous</span>
          <span class="font(sm/1.5) bold(600) c(gray-900)">{navigation.prev.title}</span>
        </div>
      </a>
    {:else}
      <div></div>
    {/if}
    {#if navigation.next}
      <a href={navigation.next.href} 
         class="group p(20) r(8) border(1/gray-200) 
                hover:border(gray-300) hover:shadow(md) 
                transition text(right)">
        <div class="vbox gap(4) items(end)">
          <span class="font(xs/1.5) c(gray-500) group-hover:c(gray-700) transition">Next →</span>
          <span class="font(sm/1.5) bold(600) c(gray-900)">{navigation.next.title}</span>
        </div>
      </a>
    {:else}
      <div></div>
    {/if}
  </nav>
</ContentWrapper>

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  :global(.animate\(fade-in\)) {
    animation: fade-in 0.2s ease-out;
  }
  
  /* Custom scrollbar for sidebar */
  nav::-webkit-scrollbar {
    width: 6px;
  }
  
  nav::-webkit-scrollbar-track {
    background: transparent;
  }
  
  nav::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }
  
  nav::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.2);
  }
</style>