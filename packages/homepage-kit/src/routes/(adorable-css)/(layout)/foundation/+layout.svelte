<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  
  // Foundation navigation items
  const foundationPages = [
    { 
      name: 'Typography', 
      path: '/foundation/typography',
      description: 'Text styles, scales, and semantic hierarchy'
    },
    {
      name: 'Colors', 
      path: '/foundation/colors',
      description: 'Semantic color palette and usage guidelines'
    },
    {
      name: 'Spacing', 
      path: '/foundation/spacing',
      description: 'Layout grid system and spacing scale'
    },
    {
      name: 'Elevation', 
      path: '/foundation/elevation',
      description: 'Shadow system for depth and hierarchy'
    },
    {
      name: 'Motion', 
      path: '/foundation/motion',
      description: 'Animation timing and easing curves'
    },
    {
      name: 'Iconography', 
      path: '/foundation/iconography',
      description: 'Icon guidelines and usage principles'
    }
  ];
  
  // Get current page index
  $: currentIndex = foundationPages.findIndex(item => $page.url.pathname === item.path);
  $: prevPage = currentIndex > 0 ? foundationPages[currentIndex - 1] : null;
  $: nextPage = currentIndex < foundationPages.length - 1 ? foundationPages[currentIndex + 1] : null;
</script>

<div class="min-h(screen) bg(white)">
  <!-- Header Section -->
  <header class="bb(1/gray-200)">
    <div class="vbox(center) px(3xl) py(4xl)">
      <div class="max-w(6xl) vbox gap(3xl) text(center)">
        <div class="vbox gap(lg)">
          <h1 class="display(2xl) font(black) tracking(tight)">Foundation</h1>
          <p class="fonr(lg) c(gray-600) max-w(3xl)">
            Core design tokens and principles that form the foundation of consistent, 
            scalable interfaces across all platforms and products.
          </p>
        </div>
        
        <!-- Tab Navigation -->
        <nav class="hbox gap(0) border(2/gray-200) r(lg) overflow(hidden)">
          {#each foundationPages as item, index}
            <a 
              href={item.path}
              class="
                px(2xl) py(lg) font(medium) tracking(wide) uppercase transition-all border-r(1/gray-200)
                {$page.url.pathname === item.path 
                  ? 'bg(black) c(white)'
                  : 'hover:bg(gray-50) c(gray-700)'
                }
                {index === foundationPages.length - 1 ? 'border-r(0)' : ''}
              "
            >
              {item.name}
            </a>
          {/each}
        </nav>
      </div>
    </div>
  </header>
  
  <!-- Content Area -->
  <main>
    <slot />
  </main>
  
  <!-- Navigation Footer -->
  <footer class="border-t(1/gray-200)">
    <div class="vbox(center) px(3xl) py(4xl)">
      <div class="max-w(6xl) hbox gap(0) w(full)">
        <!-- Previous Button -->
        {#if prevPage}
          <a 
            href={prevPage.path}
            class="group flex(1) p(2xl) border-r(1/gray-200) hover:bg(gray-50) transition-all"
          >
            <div class="vbox gap(sm)">
              <div class="font(sm) c(gray-500) uppercase tracking(wide)">← Previous</div>
              <div class="title(lg) font(bold) group-hover:c(black) transition">{prevPage.name}</div>
              <div class="font(sm) c(gray-600)">{prevPage.description}</div>
            </div>
          </a>
        {:else}
          <div class="flex(1)"></div>
        {/if}
        
        <!-- Next Button -->
        {#if nextPage}
          <a 
            href={nextPage.path}
            class="group flex(1) p(2xl) hover:bg(gray-50) transition-all text(right)"
          >
            <div class="vbox gap(sm) items(end)">
              <div class="font(sm) c(gray-500) uppercase tracking(wide)">Next →</div>
              <div class="title(lg) font(bold) group-hover:c(black) transition">{nextPage.name}</div>
              <div class="font(sm) c(gray-600)">{nextPage.description}</div>
            </div>
          </a>
        {:else}
          <div class="flex(1)"></div>
        {/if}
      </div>
    </div>
  </footer>
</div>