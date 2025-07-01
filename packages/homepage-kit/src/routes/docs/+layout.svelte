<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { docsConfig, getDocNavigation, findDocByHref } from '$lib/docs-config';

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
      title: heading.textContent,
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
</script>

<div class="min-h(100vh) bg(gray-50)">
  <!-- Navigation Sidebar -->
  <nav class="fixed top(0) left(0) w(240px) h(100vh) bg(white) border-r(1/gray-200) scroll(y) z(40)">
    <!-- Navigation Header -->
    <div class="p(16) pb(12) border-b(1/gray-100)">
      <h2 class="title(sm) c(gray-900)">Documentation</h2>
      <p class="caption(xs) c(gray-500) mt(2)">AdorableCSS v2</p>
    </div>
    
    <!-- Navigation Items -->
    <div class="p(12) vbox gap(20)">
      {#each docsConfig as section}
        <div>
          <h3 class="caption(xs) c(gray-400) uppercase letter-spacing(widest) mb(8) px(12)">{section.title}</h3>
          <ul class="vbox gap(1)">
            {#each section.items as item}
              <li>
                <a 
                  href={item.href}
                  class="relative block py(6) px(12) r(6) transition-all duration(150)
                         {$page.url.pathname === item.href 
                           ? 'bg(purple-50) c(purple-700) bold(medium)' 
                           : 'c(gray-600) hover:bg(gray-50) hover:c(gray-900)'}"
                >
                  {#if $page.url.pathname === item.href}
                    <span class="absolute left(0) top(50%) translate-y(-50%) w(2px) h(16px) bg(purple-500) r(r-full)"></span>
                  {/if}
                  <div class="hbox(middle) gap(8)">
                    <span class="body(sm) flex(1)">{item.title}</span>
                    {#if item.badge}
                      <span class="w(6px) h(6px) r(full) 
                                   {item.badge === 'new' 
                                     ? 'bg(green-500)' 
                                     : item.badge === 'beta' 
                                       ? 'bg(amber-500)' 
                                       : 'bg(gray-400)'}"
                            title={item.badge}>
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

  <!-- Main Content Area -->
  <main class="ml(240px) min-h(100vh) bg(white)">
    <!-- Breadcrumb -->
    <div class="sticky top(0) z(30) bg(white.98) backdrop-blur(sm) px(40) py(16)">
      <div class="hbox(middle) gap(12) body(sm)">
        <a href="/" class="c(gray-600) hover:c(purple-600) transition-colors duration(200)">Home</a>
        <span class="c(gray-300)">/</span>
        <a href="/docs" class="c(gray-600) hover:c(purple-600) transition-colors duration(200)">Docs</a>
        {#if currentDoc}
          <span class="c(gray-300)">/</span>
          <span class="c(gray-900) bold(medium)">{currentDoc.title}</span>
        {/if}
      </div>
    </div>
    
    <!-- Content Container -->
    <div class="px(40) py(40) xl:pr(280)">
      <!-- Content -->
      <article class="prose max-w(3xl)">
        <slot />
      </article>
      
      <!-- Pagination -->
      <nav class="grid(2) gap(24) mt(80) pt(48) border-t(1/gray-100) max-w(3xl)">
        {#if navigation.prev}
          <a href={navigation.prev.href} 
             class="group p(24) r(12) border(1/gray-200) bg(white) 
                    hover:border(purple-200) hover:shadow(xl) hover:shadow(purple-100.3) 
                    transition-all duration(300)">
            <div class="vbox gap(8)">
              <span class="caption(sm) c(gray-500) group-hover:c(purple-600) transition-colors">← Previous</span>
              <span class="title(sm) c(gray-900) group-hover:c(purple-700) transition-colors">{navigation.prev.title}</span>
            </div>
          </a>
        {:else}
          <div></div>
        {/if}
        {#if navigation.next}
          <a href={navigation.next.href} 
             class="group p(24) r(12) border(1/gray-200) bg(white) 
                    hover:border(purple-200) hover:shadow(xl) hover:shadow(purple-100.3) 
                    transition-all duration(300) text(right)">
            <div class="vbox gap(8) items(end)">
              <span class="caption(sm) c(gray-500) group-hover:c(purple-600) transition-colors">Next →</span>
              <span class="title(sm) c(gray-900) group-hover:c(purple-700) transition-colors">{navigation.next.title}</span>
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
    <aside class="fixed right(32) top(120) w(220px) hidden xl:block">
      <div class="p(20) r(12) bg(white) border(1/gray-100) shadow(lg) shadow(gray-200.2)">
        <h4 class="label(sm) c(gray-500) uppercase letter-spacing(wider) mb(16)">On this page</h4>
        <nav class="vbox gap(8)">
          {#each tocItems as item, i}
            {#if item.level <= 2}
              <a 
                href="#{item.id}" 
                class="block py(4) transition-all duration(200)
                       {activeSection === item.id 
                         ? 'c(purple-600) bold(medium) transform scale(1.02)' 
                         : 'c(gray-600) hover:c(gray-900)'}
                       {item.level === 2 ? 'ml(16) pl(16) border-l(2) border-l(gray-100)' : ''}"
                on:click={(e) => scrollToSection(e, item.id)}
              >
                <span class="{item.level === 1 ? 'body(sm)' : 'caption(base)'}">
                  {item.title}
                </span>
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
                      class="block py(3) ml(32) pl(16) border-l(2) border-l(gray-100) transition-all duration(200) animate(fade-in)
                             {activeSection === subItem.id 
                               ? 'c(purple-600) bold(medium)' 
                               : 'c(gray-500) hover:c(gray-700)'}"
                      on:click={(e) => scrollToSection(e, subItem.id)}
                    >
                      <span class="caption(sm)">
                        {subItem.title}
                      </span>
                    </a>
                  {/if}
                {/each}
              {/if}
            {/if}
          {/each}
        </nav>
      </div>
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
</style>