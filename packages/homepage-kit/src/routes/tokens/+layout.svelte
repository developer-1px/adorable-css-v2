<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  
  // Token navigation items
  const tokenPages = [
    { 
      name: 'Typography', 
      path: '/tokens/typography',
      icon: 'Type',
      description: '6-role typography system'
    },
    {
      name: 'Colors', 
      path: '/tokens/colors',
      icon: 'Palette',
      description: 'OKLCH color system'
    },
    {
      name: 'Spacing',
      path: '/tokens/spacing',
      icon: 'Space',
      description: 'Consistent spacing scale'
    },
    {
      name: 'Radius', 
      path: '/tokens/radius',
      icon: 'RoundedCorner',
      description: 'Corner radius tokens'
    },
    { 
      name: 'Shadows', 
      path: '/tokens/shadows',
      icon: 'Shadow',
      description: 'Box shadow presets'
    },
    {
      name: 'Effects', 
      path: '/tokens/effects',
      icon: 'Sparkles',
      description: 'Animation & transitions'
    }
  ];
  
  // Get current page index
  $: currentIndex = tokenPages.findIndex(item => $page.url.pathname === item.path);
  $: prevPage = currentIndex > 0 ? tokenPages[currentIndex - 1] : null;
  $: nextPage = currentIndex < tokenPages.length - 1 ? tokenPages[currentIndex + 1] : null;
</script>

<div class="min-h(screen) bg(gray-50)">
  <!-- Header Section -->
  <div class="bg(white) border-b(1/gray-200)">
    <div class="max-w(7xl) mx(auto) px(xl) py(2xl)">
      <div class="text(center) mb(2xl)">
        <h1 class="display(lg) gradient mb(lg)">Design Tokens</h1>
        <p class="body(lg) c(gray-600) max-w(3xl) mx(auto)">
          The foundation of AdorableCSS's design system. Consistent, scalable, and beautiful tokens
          for building cohesive interfaces.
        </p>
      </div>
      
      <!-- Tab Navigation -->
      <nav class="hbox(center) gap(xs) overflow(x-auto) pb(xs)" role="tablist">
        {#each tokenPages as item}
          <a 
            href={item.path}
            class="
              px(lg) py(md) r(lg) whitespace(nowrap) transition-all
              {$page.url.pathname === item.path 
                ? 'bg(purple-50) c(white) shadow(lg)'
                : 'hover:bg(gray-100) c(gray-700) hover:c(gray-900)'
              }
            "
            role="tab"
            aria-selected={$page.url.pathname === item.path}
          >
            <span class="label(button)">{item.name}</span>
          </a>
        {/each}
      </nav>
    </div>
  </div>
  
  <!-- Content Area -->
  <main class="max-w(7xl) mx(auto) px(xl) py(3xl)">
    <slot />
  </main>
  
  <!-- Previous/Next Navigation -->
  <nav class="max-w(7xl) mx(auto) px(xl) pb(3xl)">
    <div class="border-t(1/gray-200) pt(3xl)">
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
    </div>
  </nav>
</div>