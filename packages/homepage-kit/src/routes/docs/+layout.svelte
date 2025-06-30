<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { ChevronRight } from 'lucide-svelte';
  import { docsConfig, getDocNavigation, findDocByHref } from '$lib/docs-config';

  let mounted = false;
  let tocItems = [];
  let activeSection = '';
  
  $: currentDoc = findDocByHref($page.url.pathname);
  $: navigation = getDocNavigation($page.url.pathname);
  
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

<div class="min-h(100vh) bg(white)">
  <!-- Navigation Sidebar -->
  <nav class="fixed top(0) left(0) w(240px) h(100vh) bg(gray-50) border-r(1/gray-200) overflow-y(auto) z(40)">
    <!-- Navigation Header -->
    <div class="p(20) border-b(1/gray-200)">
      <h2 class="title(base)">Documentation</h2>
      <p class="caption(xs) mt(2)">Learn AdorableCSS v2</p>
    </div>
    
    <!-- Navigation Items -->
    <div class="p(16) vbox gap(24)">
      {#each docsConfig as section}
        <div>
          <h3 class="label(xs) mb(8)">{section.title}</h3>
          <ul class="vbox gap(2)">
            {#each section.items as item}
              <li>
                <a 
                  href={item.href}
                  class="group relative block px(12) py(8) r(8) body(sm) hover:bg(white) transition-all
                         {$page.url.pathname === item.href ? 'bg(white) c(purple-700) bold shadow(sm)' : ''}"
                >
                  <span class="hbox(middle) gap(8)">
                    {#if $page.url.pathname === item.href}
                      <span class="absolute left(0) top(50%) translate-y(-50%) w(3px) h(16px) bg(purple-500) r(r-full)"></span>
                    {/if}
                    <ChevronRight size="14" class="c(gray-400) transition transform {$page.url.pathname === item.href ? 'rotate(90deg) c(purple-500)' : ''}" />
                    <span>{item.title}</span>
                    {#if item.badge}
                      <span class="ml(auto) badge(xs/{item.badge === 'new' ? 'success' : item.badge === 'beta' ? 'warning' : 'muted'})">
                        {item.badge}
                      </span>
                    {/if}
                  </span>
                </a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </nav>

  <!-- Main Content Area -->
  <main class="ml(240px) min-h(100vh)">
    <!-- Breadcrumb -->
    <div class="sticky top(0) z(30) bg(white) border-b(1/gray-200) px(48) py(12)">
      <div class="hbox(middle) gap(8) caption(sm)">
        <a href="/" class="c(gray-500) hover:c(gray-700) transition">Home</a>
        <span class="c(gray-400)">/</span>
        <a href="/docs" class="c(gray-500) hover:c(gray-700) transition">Docs</a>
        {#if currentDoc}
          <span class="c(gray-400)">/</span>
          <span class="c(gray-900) bold">{currentDoc.title}</span>
        {/if}
      </div>
    </div>
    
    <!-- Content Container -->
    <div class="px(48) py(48)">
      <!-- Content -->
      <div class="prose max-w(3xl)">
        <slot />
      </div>
      
      <!-- Pagination -->
      <nav class="grid(2) gap(24) mt(80) pt(48) border-t(1/gray-200) max-w(3xl)">
        {#if navigation.prev}
          <a href={navigation.prev.href} class="group p(24) r(16) border(1/gray-200) hover:border(purple-300) hover:shadow(lg) transition-all">
            <div class="vbox gap(8)">
              <span class="label(xs)">← Previous</span>
              <span class="title(sm) group-hover:c(purple-600) transition">{navigation.prev.title}</span>
            </div>
          </a>
        {:else}
          <div></div>
        {/if}
        {#if navigation.next}
          <a href={navigation.next.href} class="group p(24) r(16) border(1/gray-200) hover:border(purple-300) hover:shadow(lg) transition-all text(right)">
            <div class="vbox gap(8)">
              <span class="label(xs)">Next →</span>
              <span class="title(sm) group-hover:c(purple-600) transition">{navigation.next.title}</span>
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
    <aside class="fixed right(32) top(100) w(200px) hidden xl:block">
      <div class="p(16) r(12) bg(gray-50) border(1/gray-200)">
        <h4 class="label(xs) mb(12)">On this page</h4>
        <nav class="vbox gap(4)">
          {#each tocItems as item}
            <a 
              href="#{item.id}" 
              class="caption(xs) hover:c(purple-600) transition-all block
                     {activeSection === item.id ? 'c(purple-600) bold pl(8) border-l(2/purple-500)' : ''}
                     {item.level === 2 ? 'ml(12)' : ''}
                     {item.level === 3 ? 'ml(24)' : ''}"
              on:click={(e) => scrollToSection(e, item.id)}
            >
              {item.title}
            </a>
          {/each}
        </nav>
      </div>
    </aside>
  {/if}
</div>