<script lang="ts">
  import { referenceData } from '$lib/referenceData';
  import { Search, Hash, Copy, Check, ChevronRight } from 'lucide-svelte';
  import { fade, fly } from 'svelte/transition';
  import { onDestroy } from 'svelte';

  let searchQuery = '';
  let activeCategory = '';
  let copiedSyntax: string | null = null;
  let observer: IntersectionObserver;

  onDestroy(() => {
    observer?.disconnect();
  });

  function spy(node: HTMLElement) {
    if (!observer) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const category = Object.keys(referenceData).find(k => toId(k) === id);
            if (category) activeCategory = category;
          }
        });
      }, {
        root: null, // Use viewport
        rootMargin: '-10% 0px -80% 0px',
        threshold: 0
      });
    }

    observer.observe(node);

    return {
      destroy() {
        observer?.unobserve(node);
      }
    };
  }

  // Search logic
  $: filteredData = Object.entries(referenceData).reduce((acc, [category, subcategories]) => {
    // If search is empty, show everything
    if (!searchQuery) {
      acc[category] = subcategories;
      return acc;
    }

    const query = searchQuery.toLowerCase();
    
    // Check if category matches
    if (category.toLowerCase().includes(query)) {
      acc[category] = subcategories;
      return acc;
    }

    // Filter subcategories and items
    const filteredSubcategories: typeof subcategories = {};
    let hasMatch = false;

    Object.entries(subcategories).forEach(([subKey, items]) => {
      // Check if subcategory matches
      if (subKey.toLowerCase().includes(query)) {
        filteredSubcategories[subKey] = items;
        hasMatch = true;
        return;
      }

      // Check items
      const filteredItems = items.filter(item => 
        item.property.toLowerCase().includes(query) || 
        item.syntax.some(s => s.toLowerCase().includes(query))
      );

      if (filteredItems.length > 0) {
        filteredSubcategories[subKey] = filteredItems;
        hasMatch = true;
      }
    });

    if (hasMatch) {
      acc[category] = filteredSubcategories;
    }

    return acc;
  }, {} as typeof referenceData);

  function toId(str: string) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    copiedSyntax = text;
    setTimeout(() => copiedSyntax = null, 2000);
  }

  function handleScroll(e: UIEvent) {
    // Simple scroll spy could be implemented here
  }
</script>

<div class="min-h(screen) bg(white)">
  <div class="max-w(1440) mx(auto) hbox(top)">
  
    <!-- Sidebar -->
    <aside class="hidden lg:block w(280) sticky top(88) h(calc(100vh-88px)) bg(white) border-r(1/gray-200) vbox shrink(0) z(10)">
      <!-- Search Header -->
      <div class="p(20) border-b(1/gray-100) bg(white) sticky top(0) z(10)">
        <div class="vbox gap(4) mb(16)">
          <h1 class="font(title-lg) bold(800) c(gray-900) tracking(tight)">Reference</h1>
          <p class="font(body-sm) c(gray-500)">AdorableCSS V2 API</p>
        </div>
        
        <div class="relative w(full)">
          <div class="absolute top(50%) left(12) translate-y(-50%) c(gray-400) pointer-events(none)">
            <Search size={16} />
          </div>
          <input 
            type="text" 
            bind:value={searchQuery}
            placeholder="Search properties..." 
            class="w(full) h(40) pl(38) pr(12) bg(gray-50) border(1/gray-200) r(lg) text(sm) outline(none) focus:border(indigo-500) focus:ring(2/indigo-500/0.1) transition placeholder:c(gray-400)"
          />
        </div>
      </div>

      <!-- Navigation List -->
      <nav class="flex(1) overflow-y(auto) p(12) vbox gap(2)">
        {#each Object.keys(referenceData) as category}
          {@const categoryName = category.split('(')[1]?.replace(')', '') || category}
          {@const isActive = activeCategory === category}
          
          <a 
            href="#{toId(category)}"
            class="group w(full) hbox(middle) gap(3) px(12) py(8) r(md) text(sm) font(medium) transition text(none)
              {isActive ? 'bg(indigo-50) c(indigo-700)' : 'c(gray-600) hover:bg(gray-50) hover:c(gray-900)'}"
          >
            <div class="size(6) r(full) {isActive ? 'bg(indigo-500)' : 'bg(gray-300) group-hover:bg(gray-400)'}"></div>
            <span>{categoryName}</span>
            {#if isActive}
              <div class="ml(auto)">
                <ChevronRight size={14} />
              </div>
            {/if}
          </a>
        {/each}
      </nav>

      <!-- Footer -->
      <div class="p(16) border-t(1/gray-100) text(xs) c(gray-400) text(center)">
        Press <code class="font(mono) px(4) py(2) bg(gray-100) r(4) c(gray-600)">Cmd+K</code> to search
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex(1) min-w(0) px(40) py(60)">
      <div class="vbox gap(64)">
        
        {#if Object.keys(filteredData).length === 0}
          <div class="vbox(center) py(100) gap(16)">
            <div class="size(48) r(full) bg(gray-100) hbox(center) c(gray-400)">
              <Search size={24} />
            </div>
            <p class="text(lg) c(gray-500)">No results found for "{searchQuery}"</p>
            <button 
              class="px(16) py(8) bg(white) border(1/gray-200) r(md) text(sm) font(medium) hover:bg(gray-50) hover:border(gray-300) transition"
              on:click={() => searchQuery = ''}
            >
              Clear Search
            </button>
          </div>
        {/if}

        {#each Object.entries(filteredData) as [category, subcategories]}
          {@const categoryTitle = category.split('(')[0].trim()}
          {@const categorySubtitle = category.split('(')[1]?.replace(')', '') || ''}

          <section id={toId(category)} class="scroll-mt(100)" use:spy>
            <!-- Category Header -->
            <div class="vbox gap(8) mb(32) pb(24) border-b(1/gray-100)">
              <div class="hbox(middle) gap(12)">
                <div class="p(8) bg(indigo-50) c(indigo-600) r(lg)">
                  <Hash size={24} />
                </div>
                <h2 class="font(display-sm) bold(800) c(gray-900) tracking(tight)">{categoryTitle}</h2>
              </div>
              {#if categorySubtitle}
                <p class="font(body) c(gray-500) pl(60)">{categorySubtitle}</p>
              {/if}
            </div>

            <!-- Subcategories -->
            <div class="vbox gap(40)">
              {#each Object.entries(subcategories) as [subcategory, items]}
                <div class="vbox gap(16)">
                  <h3 class="font(title-md) bold(700) c(gray-800) hbox(middle) gap(8)">
                    <div class="w(4) h(24) bg(indigo-500) r(full)"></div>
                    {subcategory}
                  </h3>

                  <!-- Props Table -->
                  <div class="w(full) border(1/gray-200) r(xl) overflow(hidden) shadow(sm)">
                    <table class="w(full) text(left) border-collapse">
                      <thead class="bg(gray-50/50) border-b(1/gray-200)">
                        <tr>
                          <th class="py(12) px(24) font(medium) text(xs) c(gray-500) uppercase tracking(wider) w(200)">Property</th>
                          <th class="py(12) px(24) font(medium) text(xs) c(gray-500) uppercase tracking(wider)">Syntax Examples</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y(1/gray-100) bg(white)">
                        {#each items as item}
                          <tr class="group hover:bg(gray-50/50) transition">
                            <td class="py(16) px(24) align(top)">
                              <code class="font(mono) text(sm) c(indigo-600) bg(indigo-50) px(6) py(2) r(md) bold(600)">
                                {item.property}
                              </code>
                            </td>
                            <td class="py(16) px(24)">
                              <div class="hbox flex-wrap gap(8)">
                                {#each item.syntax as syntax}
                                  <button
                                    class="hbox(middle) gap(6) px(10) py(6) r(md) bg(gray-100) hover:bg(gray-200) border(1/transparent) hover:border(gray-300) transition cursor(pointer) group/btn text(left)"
                                    on:click={() => copyToClipboard(syntax)}
                                    title="Click to copy"
                                  >
                                    <code class="font(mono) text(sm) c(gray-700)">{syntax}</code>
                                    {#if copiedSyntax === syntax}
                                      <span in:fade={{ duration: 150 }} class="c(green-600)">
                                        <Check size={12} />
                                      </span>
                                    {:else}
                                      <span class="opacity(0) group-hover/btn:opacity(100) transition c(gray-400)">
                                        <Copy size={12} />
                                      </span>
                                    {/if}
                                  </button>
                                {/each}
                              </div>
                            </td>
                          </tr>
                        {/each}
                      </tbody>
                    </table>
                  </div>
                </div>
              {/each}
            </div>
          </section>
        {/each}
        
        <div class="h(100)"></div>
      </div>
    </main>
  </div>
</div>

<style>
  /* Custom scrollbar for webkit */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #e5e7eb;
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #d1d5db;
  }
</style>
