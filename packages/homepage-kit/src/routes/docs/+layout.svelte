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

<div class="docs(pattern) hbox(top) gap(5xl)">
  <!-- Navigation Sidebar -->
  <nav class="docs-nav(glass) fixed h(fill) scroll(y)">

    <!-- Navigation Items -->
    <div class="px(4) py(6) scroll(y) flex(1)">
      {#each docsConfig as section}
        <div class="mb(6)">
          <h3 class="docs-nav-section(gradient)">{section.title}</h3>
          <ul class="vbox gap(0.5)">
            {#each section.items as item}
              <li>
                <a 
                  href={item.href}
                  class="{$page.url.pathname === item.href ? 'docs-nav-link(active)' : 'docs-nav-link'}"
                >
                  <span class="hbox(middle) gap(2)">
                    <ChevronRight size="14" class="transition" />
                    {item.title}
                    {#if item.badge}
                      <span class="docs-badge({item.badge === 'new' ? 'success' : item.badge === 'beta' ? 'warning' : 'sm'})">
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
  <main class="docs-content scroll(y) pl(300)">
    <!-- Breadcrumb -->
    <div class="docs-breadcrumb(modern)">
      <a href="/" class="docs-breadcrumb-link(home)">Home</a>
      <span class="docs-breadcrumb(separator)">/</span>
      <a href="/docs" class="docs-breadcrumb-link">Docs</a>
      {#if currentDoc}
        <span class="docs-breadcrumb(separator)">/</span>
        <span class="docs-breadcrumb-link(current)">{currentDoc.title}</span>
      {/if}
    </div>
    
    <!-- Content -->
    <div class="prose">
      <slot />
    </div>
    
    <!-- Pagination -->
    <nav class="docs-pagination(cards)">
      {#if navigation.prev}
        <a href={navigation.prev.href} class="docs-pagination-item(prev)">
          <span class="docs-pagination-label">Previous</span>
          <span class="docs-pagination-title">{navigation.prev.title}</span>
        </a>
      {:else}
        <div></div>
      {/if}
      {#if navigation.next}
        <a href={navigation.next.href} class="docs-pagination-item(next)">
          <span class="docs-pagination-label">Next</span>
          <span class="docs-pagination-title">{navigation.next.title}</span>
        </a>
      {:else}
        <div></div>
      {/if}
    </nav>
  </main>
  
  <!-- Table of Contents -->
  <aside class="docs-toc(floating)">
    <div class="">
      <h4 class="docs-toc-header(gradient)">On this page</h4>
      <nav class="vbox gap(2)">
        {#each tocItems as item}
          <a 
            href="#{item.id}" 
            class="{activeSection === item.id ? 'docs-toc-link(active)' : 'docs-toc-link(progress)'} {item.level === 2 ? 'ml(4)' : ''} {item.level === 3 ? 'ml(8)' : ''}"
            on:click={(e) => scrollToSection(e, item.id)}
          >
            {item.title}
          </a>
        {/each}
      </nav>
    </div>
  </aside>
</div>