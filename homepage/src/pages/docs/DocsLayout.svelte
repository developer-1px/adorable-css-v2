<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  
  export let children: any;
  
  // Docs navigation structure
  const navigation = [
    {
      title: 'Getting Started',
      items: [
        { name: 'Introduction', href: '/docs' },
        { name: 'Installation', href: '/docs/installation' },
        { name: 'Quick Start', href: '/docs/quick-start' }
      ]
    },
    {
      title: 'Core Concepts',
      items: [
        { name: 'Architecture', href: '/docs/architecture' },
        { name: 'Figma-First Design', href: '/docs/figma-first' },
        { name: 'Parser System', href: '/docs/parser' },
        { name: 'Rule System', href: '/docs/rules' }
      ]
    },
    {
      title: 'Technical Articles',
      items: [
        { name: 'Building a CSS Framework', href: '/docs/articles/building-css-framework' },
        { name: 'Parser Deep Dive', href: '/docs/articles/parser-deep-dive' },
        { name: 'Figma Integration', href: '/docs/articles/figma-integration' }
      ]
    }
  ];
  
  let activeHeadings: string[] = [];
  let currentSection = '';
  
  onMount(() => {
    // Set up intersection observer for table of contents
    const headings = document.querySelectorAll('.mdx-article h2, .mdx-article h3');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            currentSection = entry.target.id;
          }
        });
      },
      { rootMargin: '-100px 0px -70% 0px' }
    );
    
    headings.forEach(heading => observer.observe(heading));
    
    return () => {
      headings.forEach(heading => observer.unobserve(heading));
    };
  });
</script>

<div class="min-h(100vh) hbox bg(gray-50)">
  <!-- Sidebar -->
  <aside class="w(280) h(100vh) sticky top layer bg(white) bl(gray-200) p(xl) vbox gap(xl) overflow-y(auto)">
    <div class="vbox gap(xs)">
      <a href="/" class="hbox(middle) gap(sm) c(gray-900) hover:c(purple-600) transition">
        <span class="700 font(lg)">AdorableCSS</span>
        <span class="bg(purple-100) c(purple-600) px(sm) py(xs) r(full) font(xs) 600">v2</span>
      </a>
    </div>
    
    <nav class="vbox gap(lg)">
      {#each navigation as section}
        <div class="vbox gap(sm)">
          <h4 class="600 font(sm) c(gray-500) uppercase tracking(wider)">{section.title}</h4>
          <ul class="vbox gap(xs)">
            {#each section.items as item}
              <li>
                <a 
                  href={item.href}
                  class="block py(xs) px(sm) r(md) c(gray-700) hover:bg(gray-100) hover:c(gray-900) transition {$page.url.pathname === item.href ? 'bg(purple-50) c(purple-600) 600' : ''}"
                >
                  {item.name}
                </a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </nav>
  </aside>
  
  <!-- Main content -->
  <main class="flex-1 w(full) max-w(1200) mx(auto) p(xl)">
    <article class="mdx(article) prose max-w(none)">
      {@render children()}
    </article>
  </main>
  
  <!-- Table of Contents (for article pages) -->
  {#if $page.url.pathname.includes('/articles/')}
    <aside class="w(260) h(fit) sticky top(xl) p(xl)">
      <div class="mdx-toc">
        <h4 class="mdx-toc-title">On this page</h4>
        <ul>
          {#each activeHeadings as heading}
            <li>
              <a 
                href="#{heading}"
                data-active={currentSection === heading}
              >
                {heading.replace(/-/g, ' ')}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </aside>
  {/if}
</div>

<style>
  :global(.mdx-article) {
    @apply mdx(article);
  }
  
  :global(.mdx-article pre) {
    margin: 2rem 0;
  }
  
  :global(.mdx-article .mdx-info),
  :global(.mdx-article .mdx-warning),
  :global(.mdx-article .mdx-error) {
    margin: 1.5rem 0;
  }
  
  :global(.mdx-article h2) {
    scroll-margin-top: 5rem;
  }
  
  :global(.mdx-article h3) {
    scroll-margin-top: 5rem;
  }
</style>