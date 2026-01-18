<script lang="ts">
  import { referenceData } from '$lib/referenceData';
  import { Search, Hash, Copy, Check, ChevronRight } from 'lucide-svelte';
  import { fade, fly } from 'svelte/transition';
  import { onDestroy } from 'svelte';
  import { generateCSS } from 'adorable-css';

  // Helper to get CSS content
  function getGeneratedCSS(syntax: string): string {
    try {
      const css = generateCSS([syntax]);
      
      // 1. Simulate CSS escaping (match how AdorableCSS generates class names)
      //    It adds a backslash before any non-alphanumeric character (except hyphen)
      const cssClass = "." + syntax.replace(/([^a-zA-Z0-9-])/g, '\\$1');

      // 2. Escape valid CSS class string for Regex usage
      //    Escape characters that have special meaning in regex: \ ^ $ . * + ? ( ) [ ] { } |
      const regexSource = cssClass.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      
      // 3. Match the class name followed by the content inside braces
      //    [^\{]* matches spaces or other chars before the brace
      //    \{([^\}]+)\} captures the content inside braces
      const regex = new RegExp(regexSource + "[^\\{]*\\{([^\\}]+)\\}");

      const match = css.match(regex);
      return match ? match[1].trim() : '';
    } catch (e) {
      return '';
    }
  }

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
  <div class="max-w(1440px) mx(auto) hbox(top)">
  
    <!-- Sidebar -->
    <aside class="hidden lg:block w(280px) sticky top(88px) h(calc(100vh-88px)) bg(white) border-r(1px/gray-200) vbox shrink(0) z(10)">
      <!-- Search Header -->
      <div class="p(xl) border-b(1px/gray-100) bg(white) sticky top(0) z(10)">
        <div class="vbox gap(xs) mb(lg)">
          <h1 class="font(title-lg) bold(800) c(gray-900) tracking(tight)">Reference</h1>
          <p class="font(body-sm) c(gray-500)">AdorableCSS V2 API</p>
        </div>
        
        <div class="relative w(full)">
          <div class="absolute top(50%) left(md) translate-y(-50%) c(gray-400) pointer-events(none)">
            <Search size={16} />
          </div>
          <input 
            type="text" 
            bind:value={searchQuery}
            placeholder="Search properties..." 
            class="w(full) h(40px) pl(38px) pr(md) bg(gray-50) border(1px/gray-200) r(lg) text(sm) outline(none) focus:border(indigo-500) focus:ring(2px/indigo-500/0.1) transition placeholder:c(gray-400)"
          />
        </div>
      </div>

      <!-- Navigation List -->
      <nav class="flex(1) overflow-y(auto) p(md) vbox gap(2px)">
        {#each Object.keys(referenceData) as category}
          {@const categoryName = category.split('(')[1]?.replace(')', '') || category}
          {@const isActive = activeCategory === category}
          
          <a 
            href="#{toId(category)}"
            class="group w(full) hbox(middle) gap(3px) px(md) py(sm) r(md) text(sm) font(medium) transition text(none)
              {isActive ? 'bg(indigo-50) c(indigo-700)' : 'c(gray-600) hover:bg(gray-50) hover:c(gray-900)'}"
          >
            <div class="size(6px) r(full) {isActive ? 'bg(indigo-500)' : 'bg(gray-300) group-hover:bg(gray-400)'}"></div>
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
      <div class="p(lg) border-t(1px/gray-100) text(xs) c(gray-400) text(center)">
        Press <code class="font(mono) px(xs) py(2px) bg(gray-100) r(4px) c(gray-600)">Cmd+K</code> to search
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex(1) min-w(0) px(xl) py(2xl) lg:px(2xl) lg:py(4xl)">
      <div class="vbox gap(2xl)">
        
        {#if Object.keys(filteredData).length === 0}
          <div class="vbox(center) py(6xl) gap(xl)">
            <div class="size(48px) r(full) bg(gray-100) hbox(center) c(gray-400)">
              <Search size={24} />
            </div>
            <p class="text(lg) c(gray-500)">No results found for "{searchQuery}"</p>
            <button 
              class="px(lg) py(sm) bg(white) border(1px/gray-200) r(md) text(sm) font(medium) hover:bg(gray-50) hover:border(gray-300) transition"
              on:click={() => searchQuery = ''}
            >
              Clear Search
            </button>
          </div>
        {/if}

        {#each Object.entries(filteredData) as [category, subcategories]}
          {@const categoryTitle = category.split('(')[0].trim()}
          {@const categorySubtitle = category.split('(')[1]?.replace(')', '') || ''}

          <section id={toId(category)} class="scroll-mt(100px)" use:spy>
            <!-- Category Header -->
            <div class="vbox gap(xs) mb(xl) pb(lg) border-b(1px/gray-100)">
              <div class="hbox(middle) gap(sm)">
                <div class="p(xs) bg(indigo-50) c(indigo-600) r(md)">
                  <Hash size={18} />
                </div>
                <h2 class="font(title-sm) bold(700) c(gray-900) tracking(tight)">{categoryTitle}</h2>
                {#if categorySubtitle}
                  <span class="font(body-sm) c(gray-400)">{categorySubtitle}</span>
                {/if}
              </div>
            </div>

            <!-- Subcategories -->
            <div class="vbox gap(xl)">
              {#each Object.entries(subcategories) as [subcategory, items]}
                <div class="vbox gap(md)">
                  <h3 class="font(body-sm) bold(600) c(gray-700) hbox(middle) gap(xs)">
                    <div class="size(4px) bg(indigo-500) r(full)"></div>
                    {subcategory}
                  </h3>

                  <!-- Props Grid -->
                  <div class="grid(cols-1) sm:grid(cols-2) xl:grid(cols-3) gap(md)">
                    {#each items as item}
                      <div class="vbox gap(sm) p(md) r(lg) bg(gray-50/50) hover:bg(gray-50) transition group">
                        <!-- Property Name -->
                        <div class="hbox(middle) gap(sm)">
                          <code class="font(mono) text(xs) c(indigo-600) bg(indigo-50) px(xs) py(2px) r(md) bold(600)">
                            {item.property}
                          </code>
                          <div class="h(1px) flex(1) bg(gray-200/50)"></div>
                        </div>

                        <!-- Syntax Items -->
                        <div class="vbox gap(2px)">
                          {#each item.syntax as syntax}
                             {@const css = getGeneratedCSS(syntax)}
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <div 
                              class="hbox(top) gap(sm) p(sm) r(md) hover:bg(white) hover:shadow(sm) border(1px/transparent) hover:border(gray-200) transition cursor(pointer) relative"
                              on:click={() => copyToClipboard(syntax)}
                              role="button"
                              tabindex="0"
                            >
                              <div class="vbox gap(2px) flex(1) min-w(0)">
                                <code class="font(mono) text(sm) c(gray-700)">{syntax}</code>
                                <code class="font(mono) text(xs) c(gray-400) break-all">{css}</code>
                              </div>

                              {#if copiedSyntax === syntax}
                                <span in:fade={{ duration: 150 }} class="c(green-600) absolute top(sm) right(sm)">
                                  <Check size={14} />
                                </span>
                              {/if}
                            </div>
                          {/each}
                        </div>
                      </div>
                    {/each}
                  </div>
                </div>
              {/each}
            </div>
          </section>
        {/each}
        
        <div class="h(100px)"></div>
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
