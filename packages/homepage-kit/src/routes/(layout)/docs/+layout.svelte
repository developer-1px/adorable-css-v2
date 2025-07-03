<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { docsConfig, getDocNavigation, findDocByHref } from '$lib/docs-config.js';
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
      case 'new': return 'green-500';
      case 'beta': return 'amber-500';
      case 'updated': return 'blue-500';
      default: return 'gray-400';
    }
  }
</script>

<div class="min-h(100vh) bg(white)">
  <!-- Navigation Sidebar -->
  <nav class="hidden lg:block fixed top(60) left(0) w(260) h(calc(100vh-60px)) bg(white) border-r(1/gray-200) scroll(y) overscroll-behavior(contain) z(40)">
    <!-- Navigation Header -->
    <div class="pt(32) px(24) pb(24)">
      <h2 class="font(base/1.5) bold(600) c(gray-900)">Documentation</h2>
    </div>
    
    <!-- Navigation Items -->
    <div class="px(24) pb(32) vbox gap(32)">
      {#each docsConfig as section, sectionIndex}
        <div>
          {#if sectionIndex > 0}
            <div class="mb(24) h(1px) bg(gray-100)"></div>
          {/if}
          <h3 class="font(xs/1.5) bold(600) c(gray-400) uppercase letter-spacing(wide) mb(12)">
            {section.title}
          </h3>
          <ul class="vbox gap(2)">
            {#each section.items as item}
              <li>
                <a 
                  href={item.href}
                  class="relative block py(8) px(12) -mx(12) r(6) transition
                         {$page.url.pathname === item.href 
                           ? 'bg(gray-100) c(gray-900) bold(600)' 
                           : 'c(gray-600) hover:c(gray-900)'}"
                >
                  <div class="hbox(middle) gap(8)">
                    <span class="font(sm/1.5) flex(1)">{item.title}</span>
                    {#if item.badge}
                      <span class="w(6px) h(6px) r(full) bg({getBadgeColor(item.badge)})"></span>
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
  <main class="ml(0) lg:ml(260) min-h(100vh)">
    <!-- Breadcrumb -->
    <div class="sticky top(60) z(30) bg(white) border-b(1/gray-100) px(32) lg:px(48) py(16)">
      <div class="hbox(middle) gap(6) font(sm/1.5)">
        <a href="/packages/homepage-kit/static" class="c(gray-600) hover:c(gray-900) transition">Home</a>
        <ChevronRight size="14" class="c(gray-400)" />
        <a href="/docs" class="c(gray-600) hover:c(gray-900) transition">Docs</a>
        {#if currentDoc}
          <ChevronRight size="14" class="c(gray-400)" />
          <span class="c(gray-900)">{currentDoc.title}</span>
        {/if}
      </div>
    </div>
    
    <!-- Content Container -->
    <div class="px(32) lg:px(48) py(40) xl:pr(320)">
      <!-- Content -->
      <article class="prose max-w(3xl)">
        <slot />
      </article>
      
      <!-- Pagination -->
      <nav class="grid(2) gap(24) mt(80) pt(48) border-t(1/gray-100) max-w(3xl)">
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
    </div>
  </main>
  
  <!-- Table of Contents -->
  {#if mounted && tocItems.length > 0}
    <aside class="hidden xl:block fixed top(160) right(40) w(240) z(20)">
      <nav class="pr(24) scroll(y) max-h(calc(100vh-200px)) overscroll-behavior(contain)">
        <h3 class="font(sm/1.5) bold(600) c(gray-900) mb(16)">On this page</h3>
        <ul class="vbox gap(4)">
          {#each tocItems as item, i}
            {#if item.level === 2}
              <li>
                <a 
                  href="#{item.id}" 
                  class="block py(6) pl(12) pr(8) border-l(2) transition
                         {activeSection === item.id 
                           ? 'border-l(gray-900) c(gray-900) bold(600)' 
                           : 'border-l(gray-200) c(gray-600) hover:c(gray-900) hover:border-l(gray-400)'}"
                  on:click={(e) => {
                    scrollToSection(e, item.id);
                    activeParentSection = item.id;
                  }}>
                  <span class="font(sm/1.5)">{item.text}</span>
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
                        class="block py(4) ml(28) pl(12) transition animate(fade-in)
                               {activeSection === subItem.id 
                                 ? 'c(gray-900) bold(600)' 
                                 : 'c(gray-500) hover:c(gray-700)'}"
                        on:click={(e) => scrollToSection(e, subItem.id)}
                      >
                        <span class="font(sm/1.5)">{subItem.text}</span>
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