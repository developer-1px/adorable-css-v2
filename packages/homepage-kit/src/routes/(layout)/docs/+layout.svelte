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
  <!-- Navigation Sidebar -->
  <nav class="hidden lg:block fixed top(60) left(0) h(calc(100vh-60px)) w(280) bg(white) b(1/neutral-100) scroll(y) z(40)">
      <!-- Navigation Header -->
      <div class="py(2xl) px(xl)">
        <h2 class="title(lg) c(primary)">Documentation</h2>
      </div>
      
      <!-- Navigation Items -->
      <div class="px(xl) pb(2xl) vbox gap(xl)">
      {#each docsConfig as section, sectionIndex}
        <div>
          {#if sectionIndex > 0}
            <div class="h(1px) bg(neutral-100) my(lg)"></div>
          {/if}
          <h3 class="caption uppercase c(neutral-500) bold(600) pb(md)">
            {section.title}
          </h3>
          <ul class="vbox gap(xs)">
            {#each section.items as item}
              <li>
                <a 
                  href={item.href}
                  class="block py(sm) px(md) r(md) transition
                         {$page.url.pathname === item.href 
                           ? 'bg(primary) c(white) bold(600)' 
                           : 'c(neutral-600) hover:c(primary) hover:bg(neutral-50)'}"
                >
                  <div class="hbox(middle) gap(sm)">
                    <span class="body(sm) flex(1)">{item.title}</span>
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
  <main class="min-h(screen) lg:pl(280)">
    <!-- Center Column Container -->
    <div class="hbox(center) min-h(screen)">
      <!-- Article Content -->
      <article class="max-w(4xl) w(full) px(2xl) py(4xl)">
          <!-- Breadcrumb -->
          <nav class="vbox gap(lg) pb(2xl)">
            <div class="hbox(middle) gap(sm) flex-wrap">
              <a href="/" class="body(sm) c(neutral-500) hover:c(primary) transition">Home</a>
              <ChevronRight size="14" class="c(neutral-400)" />
              <a href="/docs" class="body(sm) c(neutral-500) hover:c(primary) transition">Docs</a>
              {#if currentDoc}
                <ChevronRight size="14" class="c(neutral-400)" />
                <span class="body(sm) bold(600) c(primary)">{currentDoc.title}</span>
              {/if}
            </div>
          </nav>
          
        <!-- Article -->
        <div class="prose(docs)">
          <slot />
        </div>
      
        <!-- Pagination -->
        <nav class="grid(2) gap(lg) pt(4xl) bt(1/neutral-100)">
            {#if navigation.prev}
              <a href={navigation.prev.href} 
                 class="p(xl) r(lg) b(1/neutral-200)
                        hover:b(1/primary) hover:shadow(md) 
                        transition vbox gap(sm)">
                <span class="caption c(neutral-500)">← Previous</span>
                <span class="body(md) bold(600) c(primary)">{navigation.prev.title}</span>
              </a>
            {:else}
              <div></div>
            {/if}
            {#if navigation.next}
              <a href={navigation.next.href} 
                 class="p(xl) r(lg) b(1/neutral-200)
                        hover:b(1/primary) hover:shadow(md) 
                        transition vbox gap(sm) text(right)">
                <span class="caption c(neutral-500)">Next →</span>
                <span class="body(md) bold(600) c(primary)">{navigation.next.title}</span>
              </a>
            {:else}
              <div></div>
            {/if}
        </nav>
      </article>
      
      <!-- Table of Contents -->
      {#if mounted && tocItems.length > 0}
        <aside class="hidden xl:block sticky top(80) h(fit) w(280) ml(2xl)">
          <nav class="py(xl) max-h(calc(100vh-160px)) scroll(y)">
              <h3 class="body(md) bold(600) c(primary) pb(lg)">On this page</h3>
              <ul class="vbox gap(sm)">
          {#each tocItems as item, i}
            {#if item.level === 2}
              <li>
                  <a 
                    href="#{item.id}" 
                    class="block py(sm) pl(md) bl(2) transition
                           {activeSection === item.id 
                             ? 'b(1/primary) c(primary) bold(600)' 
                             : 'b(1/neutral-200) c(neutral-600) hover:c(primary) hover:b(1/neutral-400)'}"
                    on:click={(e) => {
                      scrollToSection(e, item.id);
                      activeParentSection = item.id;
                    }}>
                    <span class="body(sm)">{item.text}</span>
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
                                   ? 'c(primary) bold(600)' 
                                   : 'c(neutral-500) hover:c(neutral-700)'}"
                          on:click={(e) => scrollToSection(e, subItem.id)}
                        >
                          <span class="caption">{subItem.text}</span>
                        </a>
                    {/if}
                  {/each}
                {/if}
                </li>
              {/if}
            {/each}
          </ul>
        </nav>
      </aside>
      {/if}
    </div>
  </main>
</div>

