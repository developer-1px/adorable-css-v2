<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { docsConfig, getDocNavigation, findDocByHref } from '@docs/config';
  import { ChevronRight } from 'lucide-svelte';

  let mounted = false;
  let tocItems = [];
  let activeSection = '';
  let activeParentSection = '';
  
  $: currentDoc = findDocByHref($page.url.pathname);
  $: navigation = getDocNavigation($page.url.pathname);
  
  // Find parent h2 for current active h3
  $: {
    if (activeSection) {
      const activeItem = tocItems.find(item => item.id === activeSection);
      if (activeItem && activeItem.level === 3) {
        // Find the closest h2 before this h3
        const index = tocItems.indexOf(activeItem);
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
  
  onMount(() => {
    mounted = true;
    
    // Generate TOC from headings in the content
    const headings = document.querySelectorAll('main h1, main h2, main h3');
    tocItems = Array.from(headings).map(heading => ({
      id: heading.id || heading.textContent.toLowerCase().replace(/\s+/g, '-'),
      text: heading.textContent,
      level: parseInt(heading.tagName[1])
    }));
    
    // Set up intersection observer for active section highlighting
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            activeSection = entry.target.id;
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    
    headings.forEach(heading => {
      if (heading.id) observer.observe(heading);
    });
    
    return () => observer.disconnect();
  });
  
  function scrollToSection(e, id) {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update URL without triggering navigation
      history.pushState(null, '', `#${id}`);
    }
  }
  
  function getBadgeColor(badge) {
    switch(badge) {
      case 'new': return 'success';
      case 'beta': return 'warning';
      case 'updated': return 'primary';
      default: return 'neutral-400';
    }
  }
</script>

<div class="min-h(screen) bg(white)">
  <!-- Mobile Navigation Toggle (for future enhancement) -->
  <!-- TODO: Add mobile navigation drawer -->
  
  <!-- Navigation Sidebar -->
  <nav class="hidden lg:block fixed top(60) left(0) h(calc(100vh-60px)) w(280) bg(white) border-r(2/gray-900) scroll(y) z(40)">
      <!-- Navigation Header -->
      <div class="py(2xl) px(xl) bb(2/gray-900)">
        <h2 class="display(lg) font(black) tracking(tight) c(gray-900)">DOCS</h2>
      </div>
      
      <!-- Navigation Items -->
      <div class="px(xl) pb(2xl) vbox gap(xl)">
      {#each docsConfig as section, sectionIndex}
        <div>
          {#if sectionIndex > 0}
            <div class="h(2px) bg(gray-900) my(lg)"></div>
          {/if}
          <h3 class="font(sm) font(black) uppercase c(gray-900) tracking(wider) pb(md)">
            {section.title}
          </h3>
          <ul class="vbox gap(xs)">
            {#each section.items as item}
              <li>
                <a 
                  href={item.href}
                  class="block py(sm) px(md) r(md) transition font(medium)
                         {$page.url.pathname === item.href 
                           ? 'bg(gray-900) c(white) font(bold)' 
                           : 'c(gray-600) hover:c(gray-900) hover:bg(gray-50)'}"
                >
                  <div class="hbox(middle) gap(sm)">
                    <span class="font(sm) flex(1)">{item.title}</span>
                    {#if item.badge}
                      <span class="size(6) r(full) bg({getBadgeColor(item.badge)})"></span>
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

  <!-- Main Content Area -->
  <main class="min-h(screen) lg:pl(280) bg(gray-50)">
    <!-- Main Layout Container with proper top alignment -->
    <div class="hbox(center/top) min-h(screen)">
      <!-- Article Container with TOC space consideration -->
      <div class="max-w(6xl) w(full) hbox(top) gap(4xl) px(lg) lg:px(2xl)">
        <!-- Article Content -->
        <article class="flex(1) bg(white) r(lg) border(2/gray-900) shadow(xl) p(2xl) lg:p(4xl) my(lg) lg:my(2xl)">
            <!-- Content Container with Optimal Reading Width -->
            <div class="max-w(680) mx(auto)">
              <!-- Breadcrumb -->
              <nav class="vbox gap(lg) pb(2xl) bb(2/gray-900) mb(2xl)">
                <div class="hbox(middle) gap(sm) flex-wrap">
                  <a href="/" class="font(sm) c(gray-600) hover:c(gray-900) transition">Home</a>
                  <ChevronRight size="14" class="c(gray-400)" />
                  <a href="/docs" class="font(sm) c(gray-600) hover:c(gray-900) transition">Docs</a>
                  {#if currentDoc}
                    <ChevronRight size="14" class="c(gray-400)" />
                    <span class="font(sm) font(bold) c(gray-900)">{currentDoc.title}</span>
                  {/if}
                </div>
              </nav>
            
              <!-- Article Content -->
              <div class="prose(docs)">
                <slot />
              </div>
        
              <!-- Pagination -->
              <nav class="grid(2) gap(lg) pt(4xl) bt(2/gray-900)">
                {#if navigation.prev}
                  <a href={navigation.prev.href} 
                     class="p(xl) r(lg) border(2/gray-900)
                            hover:shadow(xl) hover:scale(1.02)
                            transition vbox gap(sm)">
                    <span class="font(sm) c(gray-600)">← Previous</span>
                    <span class="font(md) font(bold) c(gray-900)">{navigation.prev.title}</span>
                  </a>
                {:else}
                  <div></div>
                {/if}
                {#if navigation.next}
                  <a href={navigation.next.href} 
                     class="p(xl) r(lg) border(2/gray-900)
                            hover:shadow(xl) hover:scale(1.02)
                            transition vbox gap(sm) text(right)">
                    <span class="font(sm) c(gray-600)">Next →</span>
                    <span class="font(md) font(bold) c(gray-900)">{navigation.next.title}</span>
                  </a>
                {:else}
                  <div></div>
                {/if}
              </nav>
            </div>
        </article>
        
        <!-- Table of Contents -->
        {#if mounted && tocItems.length > 0}
          <aside class="hidden xl:block sticky top(100) h(fit) w(280) flex-shrink(0)">
            <div class="bg(white) r(lg) border(2/gray-900) shadow(xl) p(xl) my(lg)">
              <nav class="max-h(calc(100vh-200px)) scroll(y)">
                <h3 class="font(sm) font(black) uppercase c(gray-900) tracking(wider) pb(lg) bb(2/gray-900) mb(lg)">On this page</h3>
              <ul class="vbox gap(sm)">
          {#each tocItems as item, i}
            {#if item.level === 2}
              <li>
                  <a 
                    href="#{item.id}" 
                    class="block py(sm) pl(md) bl(2) transition font(medium)
                           {activeSection === item.id 
                             ? 'border-l(2/gray-900) c(gray-900) font(bold)' 
                             : 'border-l(2/gray-200) c(gray-600) hover:c(gray-900) hover:border-l(2/gray-400)'}"
                    on:click={(e) => {
                      scrollToSection(e, item.id);
                      activeParentSection = item.id;
                    }}>
                    <span class="font(sm)">{item.text}</span>
                  </a>
                
                <!-- Show h3 items under this h2 if it's the active parent -->
                {#if item.level === 2 && activeParentSection === item.id}
                  {@const startIdx = i + 1}
                  {@const endIdx = tocItems.findIndex((t, idx) => idx > i && t.level <= 2)}
                  {@const subItems = endIdx === -1 ? tocItems.slice(startIdx) : tocItems.slice(startIdx, endIdx)}
                  {#each subItems as subItem}
                    {#if subItem.level === 3}
                        <a 
                          href="#{subItem.id}" 
                          class="block py(xs) pl(3xl) transition
                                 {activeSection === subItem.id 
                                   ? 'c(gray-900) font(bold)' 
                                   : 'c(gray-500) hover:c(gray-700)'}"
                          on:click={(e) => scrollToSection(e, subItem.id)}
                        >
                          <span class="font(xs)">{subItem.text}</span>
                        </a>
                    {/if}
                  {/each}
                {/if}
                </li>
              {/if}
            {/each}
          </ul>
              </nav>
            </div>
          </aside>
        {/if}
      </div>
    </div>
  </main>
</div>

