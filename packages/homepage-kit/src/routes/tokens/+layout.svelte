<script lang="ts">
  import { page } from '$app/stores';
  import ContentWrapper from '$lib/components/layout/ContentWrapper.svelte';
  
  // Token navigation items
  const tokenPages = [
    { 
      name: 'Typography', 
      path: '/tokens/typography',
      description: '6-role typography system'
    },
    {
      name: 'Colors', 
      path: '/tokens/colors',
      description: 'OKLCH color system'
    },
    {
      name: 'Spacing',
      path: '/tokens/spacing',
      description: 'Consistent spacing scale'
    },
    {
      name: 'Radius', 
      path: '/tokens/radius',
      description: 'Corner radius tokens'
    },
    { 
      name: 'Shadows', 
      path: '/tokens/shadows',
      description: 'Box shadow presets'
    },
    {
      name: 'Effects', 
      path: '/tokens/effects',
      description: 'Animation & transitions'
    }
  ];
  
  // Get current page index
  $: currentIndex = tokenPages.findIndex(item => $page.url.pathname === item.path);
  $: prevPage = currentIndex > 0 ? tokenPages[currentIndex - 1] : null;
  $: nextPage = currentIndex < tokenPages.length - 1 ? tokenPages[currentIndex + 1] : null;
</script>

<ContentWrapper variant="wide">
  <!-- Header Section -->
  <div class="mb(3xl) text(center)">
    <h1 class="display(lg) gradient mb(lg)">Design Tokens</h1>
    <p class="body(lg) c(gray-600) max-w(3xl) mx(auto)">
      The foundation of AdorableCSS's design system. Consistent, scalable, and beautiful tokens
      for building cohesive interfaces.
    </p>
  </div>
  
  <!-- Content -->
  <slot />
  
  <!-- Previous/Next Navigation -->
  <nav class="mt(3xl) pt(3xl) border-t(1/gray-200)">
    <div class="grid(2) gap(xl)">
      <!-- Previous Button -->
      {#if prevPage}
        <a 
          href={prevPage.path}
          class="group p(2xl) r(xl) bg(white) border(2/gray-200) hover:border(purple-300) hover:shadow(xl) transition-all"
        >
          <div class="hbox(start) gap(md) mb(sm)">
            <div class="c(gray-400) group-hover:c(purple-600) transition">
              ← Previous
            </div>
          </div>
          <div class="title(base) c(gray-900) group-hover:c(purple-600) transition">
            {prevPage.name}
          </div>
          <div class="caption(base) c(gray-500) mt(xs)">
            {prevPage.description}
          </div>
        </a>
      {:else}
        <div></div>
      {/if}
      
      <!-- Next Button -->
      {#if nextPage}
        <a 
          href={nextPage.path}
          class="group p(2xl) r(xl) bg(white) border(2/gray-200) hover:border(purple-300) hover:shadow(xl) transition-all text(right)"
        >
          <div class="hbox(end) gap(md) mb(sm)">
            <div class="c(gray-400) group-hover:c(purple-600) transition">
              Next →
            </div>
          </div>
          <div class="title(base) c(gray-900) group-hover:c(purple-600) transition">
            {nextPage.name}
          </div>
          <div class="caption(base) c(gray-500) mt(xs)">
            {nextPage.description}
          </div>
        </a>
      {:else}
        <div></div>
      {/if}
    </div>
  </nav>
</ContentWrapper>