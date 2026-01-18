<script lang="ts">
  import { page } from '$app/stores';
  import { onMount, tick } from 'svelte';
  import { docsConfig, getDocNavigation, findDocByHref } from '@docs/config';
  import { ChevronRight, Menu, X, List } from 'lucide-svelte';

  let mounted = false;
  
  interface TocItem {
    id: string;
    text: string | null;
    level: number;
  }

  let tocItems: TocItem[] = [];
  let activeSection = '';
  let activeParentSection = '';
  let showMobileNav = false;
  let showMobileToc = false;
  
  $: currentDoc = findDocByHref($page.url.pathname);
  $: navigation = getDocNavigation($page.url.pathname);
  
  // Find parent h2 for current active h3
  $: {
    if (activeSection) {
      const activeItem = tocItems.find(item => item.id === activeSection);
      if (activeItem && activeItem.level === 3) {
        const index = tocItems.indexOf(activeItem);
        // Look backwards for the parent h2
        for (let i = index - 1; i >= 0; i--) {
          if (tocItems[i].level === 2) {
            activeParentSection = tocItems[i].id;
            break;
          }
        }
      } else if (activeItem && activeItem.level === 2) {
        activeParentSection = activeItem.id;
      } else {
        activeParentSection = '';
      }
    }
  }
  
  onMount(async () => {
    // Wait for content to render
    await tick();
    mounted = true;
    
    // Generate TOC from headings
    const headings = document.querySelectorAll('main h2, main h3');
    tocItems = Array.from(headings).map(heading => {
      const text = heading.textContent || '';
      const id = heading.id || text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      return {
        id,
        text,
        level: parseInt(heading.tagName[1])
      };
    });

    // Ensure IDs exist on the actual DOM elements
    headings.forEach((heading, i) => {
      if (!heading.id && tocItems[i]) {
        heading.id = tocItems[i].id;
      }
    });
    
    // Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            activeSection = entry.target.id;
          }
        });
      },
      { rootMargin: '-10% 0px -80% 0px' }
    );
    
    headings.forEach(heading => observer.observe(heading));
    return () => observer.disconnect();
  });
  
  function scrollToSection(e: Event, id: string) {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // height of sticky header + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      history.pushState(null, '', `#${id}`);
      activeSection = id; // Immediate feedback
      showMobileToc = false;
    }
  }
  
  function getBadgeColor(badge: string | undefined) {
    switch(badge) {
      case 'new': return 'bg(emerald-100) c(emerald-700) ring(1/emerald-200)';
      case 'beta': return 'bg(amber-100) c(amber-700) ring(1/amber-200)';
      case 'updated': return 'bg(indigo-100) c(indigo-700) ring(1/indigo-200)';
      default: return 'bg(gray-100) c(gray-700) ring(1/gray-200)';
    }
  }
</script>


<div class="min-h(screen) bg(white)">

  <!-- Mobile Floating Action Buttons -->
  <div class="lg:hidden fixed bottom(xl) right(xl) z(50) vbox gap(sm)">
    <button 
      class="size(56) r(full) bg(white) c(gray-700) hover:c(indigo-600) shadow(lg) border(1/gray-200) hbox(center) transition"
      on:click={() => showMobileToc = !showMobileToc}
      aria-label="Table of Contents"
    >
      <List size="24" />
    </button>
    
    <button 
      class="size(56) r(full) bg(gray-900) c(white) shadow(xl) hbox(center) hover:scale(1.05) transition"
      on:click={() => showMobileNav = !showMobileNav}
      aria-label="Menu"
    >
      <Menu size="24" />
    </button>
  </div>

  <!-- Mobile Navigation Drawer -->
  {#if showMobileNav}
    <div class="fixed inset(0) z(100) bg(black/20) backdrop-blur(sm)" on:click={() => showMobileNav = false}>
      <div class="absolute right(0) top(0) h(full) w(320) bg(white) shadow(2xl) p(2xl) scroll(y) border-l(1/gray-100)" on:click|stopPropagation>
         <div class="hbox(between) mb(2xl)">
           <h2 class="font(bold) text(xl) c(gray-900)">Documentation</h2>
           <button on:click={() => showMobileNav = false} class="p(2) hover:bg(gray-100) r(md) c(gray-500)">
             <X size="20" />
           </button>
         </div>
         
         {#each docsConfig as section}
           <div class="mb(xl)">
             <h3 class="text(xs) font(bold) uppercase c(gray-400) tracking(wider) mb(md)">{section.title}</h3>
             <ul class="vbox gap(xs)">
               {#each section.items as item}
                 <li>
                   <a 
                     href={item.href} 
                     class="block py(2) px(sm) -mx(sm) r(md) text(sm) transition-colors
                           {$page.url.pathname === item.href 
                             ? 'bg(indigo-50) c(indigo-700) font(semibold)' 
                             : 'c(gray-600) hover:bg(gray-50) hover:c(gray-900)'}" 
                     on:click={() => showMobileNav = false}
                   >
                     {item.title}
                   </a>
                 </li>
               {/each}
             </ul>
           </div>
         {/each}
      </div>
    </div>
  {/if}

  <!-- Mobile TOC Drawer -->
  {#if showMobileToc}
    <div class="fixed inset(0) z(100) bg(black/20) backdrop-blur(sm)" on:click={() => showMobileToc = false}>
      <div class="absolute right(0) top(0) h(full) w(320) bg(white) shadow(2xl) p(2xl) scroll(y) border-l(1/gray-100)" on:click|stopPropagation>
         <div class="hbox(between) mb(2xl)">
           <h2 class="font(bold) text(xl) c(gray-900)">On this page</h2>
           <button on:click={() => showMobileToc = false} class="p(2) hover:bg(gray-100) r(md) c(gray-500)">
             <X size="20" />
           </button>
         </div>
         
         <ul class="vbox gap(md) border-l(2/gray-100) pl(lg)">
           {#each tocItems as item}
             <li class="{item.level === 3 ? 'pl(md)' : ''}">
               <a 
                 href="#{item.id}"
                 on:click={(e) => scrollToSection(e, item.id)}
                 class="block text(sm) leading(1.4) transition-colors
                       {activeSection === item.id 
                         ? 'c(indigo-600) font(semibold)' 
                         : 'c(gray-600) hover:c(gray-900)'}"
               >
                 {item.text}
               </a>
             </li>
           {/each}
         </ul>
      </div>
    </div>
  {/if}

  <div class="max-w(1440) mx(auto) hbox(top)">
    
    <!-- Left Sidebar (Desktop) -->
    <nav class="hidden lg:block sticky top(88) w(280) h(calc(100vh-88px)) scroll(y) py(3xl) pl(xl) pr(lg)">
      <div class="vbox gap(2xl)">
        {#each docsConfig as section}
          <div>
            <h3 class="text(xs) font(bold) uppercase c(gray-900) tracking(widest) mb(lg) px(sm)">
              {section.title}
            </h3>
            <ul class="vbox gap(2px)">
              {#each section.items as item}
                <li>
                  <a 
                    href={item.href}
                    class="block py(sm) px(sm) r(md) text(sm) transition-colors
                           {$page.url.pathname === item.href 
                             ? 'c(indigo-600) font(semibold) bg(indigo-50)' 
                             : 'c(gray-500) hover:c(gray-900) hover:bg(gray-100)'}"
                  >
                    <div class="hbox(between)">
                      <span>{item.title}</span>
                      {#if item.badge}
                        <span class="text(9px) px(1.5) py(0.5) r(full) font(bold) uppercase {getBadgeColor(item.badge)}">
                          {item.badge}
                        </span>
                      {/if}
                    </div>
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex(1) min-w(0) px(xl) lg:px(4xl) py(3xl) lg:py(5xl)">
      <div class="max-w(3xl) mx(auto)">
        
        <!-- Breadcrumbs -->
        <nav class="hbox gap(sm) mb(2xl) text(sm) c(gray-500)">
          <a href="/" class="hover:c(gray-900)">Home</a>
          <ChevronRight size="14" />
          <span class="c(gray-900)">Documentation</span>
          {#if currentDoc}
            <ChevronRight size="14" />
            <span class="font(medium) c(indigo-600)">{currentDoc.title}</span>
          {/if}
        </nav>

        <!-- Article -->
        <article class="prose prose-slate max-w(none)">
           <!-- Slot for +page.svelte content -->
           <slot />
        </article>

        <!-- Pagination -->
        <div class="mt(5xl) pt(3xl) border-t(1/gray-200) grid(1) md:grid(2) gap(xl)">
          {#if navigation.prev}
            <a href={navigation.prev.href} class="group block p(xl) r(xl) border(1/gray-200) hover:border(indigo-200) hover:ring(4/indigo-50) transition-all">
              <div class="text(xs) c(gray-500) mb(xs)">Previous</div>
              <div class="text(lg) font(semibold) c(indigo-600) group-hover:c(indigo-700)">
                 ← {navigation.prev.title}
              </div>
            </a>
          {:else}
             <div></div>
          {/if}
          
          {#if navigation.next}
            <a href={navigation.next.href} class="group block p(xl) r(xl) border(1/gray-200) hover:border(indigo-200) hover:ring(4/indigo-50) transition-all text(right)">
              <div class="text(xs) c(gray-500) mb(xs)">Next</div>
              <div class="text(lg) font(semibold) c(indigo-600) group-hover:c(indigo-700)">
                 {navigation.next.title} →
              </div>
            </a>
          {/if}
        </div>

      </div>
    </main>
    
    <!-- Right Sidebar (TOC) -->
    <aside class="hidden xl:block sticky top(88) w(240) h(calc(100vh-88px)) py(5xl) pr(xl) overflow-y-auto">
      {#if mounted && tocItems.length > 0}
        <div class="vbox gap(lg)">
           <h4 class="text(xs) font(bold) uppercase c(gray-900) tracking(widest) pl(lg)">On this page</h4>
           <div class="relative">
             <!-- Active Indicator Line -->
             <div class="absolute left(0) top(0) bottom(0) w(2px) bg(gray-100)"></div>
             
             <ul class="vbox">
               {#each tocItems as item}
                 {#if item.level === 2}
                   <li class="relative">
                     <a 
                       href="#{item.id}" 
                       on:click={(e) => scrollToSection(e, item.id)}
                       class="block py(xs) pl(lg) pr(sm) text(sm) leading(1.5) transition-colors border-l(2px) -ml(2px)
                              {activeSection === item.id 
                                ? 'border-indigo-600 c(indigo-600) font(medium)' 
                                : 'border-transparent c(gray-500) hover:c(gray-900) hover:border-gray-300'}"
                     >
                       {item.text}
                     </a>
                   </li>
                   <!-- Sub-items h3 -->
                   {#if activeParentSection === item.id || activeSection === item.id}
                     {#each tocItems.filter(t => t.level === 3) as subItem}
                        <!-- Simplified logic for subitems rendering would go here if we tracked parent relationship fully in the array -->
                     {/each}
                   {/if}
                 {/if}
               {/each}
             </ul>
           </div>
        </div>
      {/if}
    </aside>

  </div>
</div>

<style>
  /* Custom Scrollbar for sidebars */
  nav::-webkit-scrollbar, aside::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  nav::-webkit-scrollbar-thumb, aside::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 4px;
  }
  nav:hover::-webkit-scrollbar-thumb, aside:hover::-webkit-scrollbar-thumb {
    background: #e5e7eb;
  }
</style>

