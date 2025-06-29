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

<div class="docs-layout">
  <!-- Navigation Sidebar -->
  <nav class="docs-nav">

    <!-- Navigation Items -->
    <div class="px(4) py(6) overflow-y(auto) flex(1)">
      {#each docsConfig as section}
        <div class="mb(6)">
          <h3 class="px(3) text(xs) font(semibold) uppercase tracking(wider) c(gray-500) mb(3)">{section.title}</h3>
          <ul class="vbox gap(0.5)">
            {#each section.items as item}
              <li>
                <a 
                  href={item.href}
                  class:active={$page.url.pathname === item.href}
                  class="nav-link"
                >
                  <span class="hbox(middle) gap(2)">
                    <ChevronRight size="14" class="transition" />
                    {item.title}
                    {#if item.badge}
                      <span class="text(2xs) px(2) py(0.5) r(sm) uppercase {item.badge === 'new' ? 'bg(green-100) c(green-700)' : item.badge === 'beta' ? 'bg(amber-100) c(amber-700)' : 'bg(gray-100) c(gray-700)'}">
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
  <main class="docs-main">
    <!-- Breadcrumb -->
    <div class="docs-breadcrumb">
      <a href="/" class="c(gray-500) hover:c(gray-700) transition">Home</a>
      <span class="c(gray-400)">/</span>
      <a href="/docs" class="c(gray-500) hover:c(gray-700) transition">Docs</a>
      {#if currentDoc}
        <span class="c(gray-400)">/</span>
        <span class="c(gray-900) font(medium)">{currentDoc.title}</span>
      {/if}
    </div>
    
    <!-- Content -->
    <div class="docs-layout-content">
      <slot />
    </div>
    
    <!-- Pagination -->
    <nav class="docs-pagination">
      {#if navigation.prev}
        <a href={navigation.prev.href} class="pagination-link prev">
          <span class="text(sm) c(gray-500)">Previous</span>
          <span class="font(medium)">{navigation.prev.title}</span>
        </a>
      {:else}
        <div></div>
      {/if}
      {#if navigation.next}
        <a href={navigation.next.href} class="pagination-link next">
          <span class="text(sm) c(gray-500)">Next</span>
          <span class="font(medium)">{navigation.next.title}</span>
        </a>
      {:else}
        <div></div>
      {/if}
    </nav>
  </main>
  
  <!-- Table of Contents -->
  <aside class="docs-toc">
    <div class="sticky top(20) p(6)">
      <h4 class="text(sm) font(semibold) c(gray-900) mb(4)">On this page</h4>
      <nav class="vbox gap(2)">
        {#each tocItems as item}
          <a 
            href="#{item.id}" 
            class="toc-link {item.level === 2 ? 'pl(4)' : ''} {item.level === 3 ? 'pl(8)' : ''}"
            class:active={activeSection === item.id}
            on:click={(e) => scrollToSection(e, item.id)}
          >
            {item.title}
          </a>
        {/each}
      </nav>
    </div>
  </aside>
</div>

<style>
  /* Layout Structure */
  .docs-layout {
    display: grid;
    grid-template-columns: 280px 1fr 250px;
    min-height: 100vh;
    background: #ffffff;
  }
  
  /* Navigation Sidebar */
  .docs-nav {
    background: #fafbfc;
    border-right: 1px solid #e5e7eb;
    height: 100vh;
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
  }
  
  /* Navigation Links */
  .nav-link {
    display: block;
    padding: 0.5rem 0.75rem;
    margin: 0 0.25rem;
    border-radius: 0.375rem;
    color: #4b5563;
    font-size: 0.875rem;
    transition: all 0.15s ease;
  }
  
  .nav-link:hover {
    background: #e5e7eb;
    color: #111827;
  }
  
  .nav-link.active {
    background: #4f46e5;
    color: white;
    font-weight: 500;
  }
  
  .nav-link.active :global(svg) {
    transform: rotate(90deg);
  }
  
  /* Main Content */
  .docs-main {
    padding: 2rem 3rem;
    max-width: 52rem;
    margin: 0 auto;
  }
  
  /* Breadcrumb */
  .docs-breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
    font-size: 0.875rem;
  }
  
  /* Pagination */
  .docs-pagination {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 4rem;
    padding-top: 3rem;
    border-top: 1px solid #e5e7eb;
  }
  
  .pagination-link {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    transition: all 0.15s ease;
  }
  
  .pagination-link:hover {
    border-color: #4f46e5;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  }
  
  .pagination-link.next {
    text-align: right;
    align-items: flex-end;
  }
  
  /* Table of Contents */
  .docs-toc {
    border-left: 1px solid #e5e7eb;
    background: #fafbfc;
  }
  
  .toc-link {
    display: block;
    padding: 0.375rem 0;
    color: #6b7280;
    font-size: 0.875rem;
    transition: color 0.15s ease;
    border-left: 2px solid transparent;
    margin-left: -1px;
  }
  
  .toc-link:hover {
    color: #111827;
  }
  
  .toc-link.active {
    color: #4f46e5;
    font-weight: 500;
    border-left-color: #4f46e5;
  }
  
  /* Mobile Responsive */
  @media (max-width: 1024px) {
    .docs-layout {
      grid-template-columns: 280px 1fr;
    }
    
    .docs-toc {
      display: none;
    }
  }
  
  @media (max-width: 768px) {
    .docs-layout {
      grid-template-columns: 1fr;
    }
    
    .docs-nav {
      display: none;
    }
    
    .docs-main {
      padding: 1.5rem;
    }
  }
</style>