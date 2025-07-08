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
  
  // Component class definitions
  const docs_layout = "min-h(screen) hbox";
  const docs_sidebar = "hidden lg:vbox w(280) bg(background) border-r sticky top(60) h(calc(100vh-60px)) overflow-y(auto) z(40)";
  const docs_sidebar_header = "p(xl) border-b";
  const docs_nav = "p(lg) stack(lg) flex(1)";
  const docs_nav_section = "stack(md)";
  const docs_nav_divider = "h(1px) bg(border) my(lg)";
  const docs_nav_title = "label(sm) uppercase tracking(wide) c(muted)";
  const docs_nav_list = "stack(xs)";
  const docs_nav_link = "block p(sm) r(md) transition body(sm)";
  const docs_nav_link_active = "bg(primary) c(primary-foreground) font(medium)";
  const docs_nav_link_inactive = "c(muted) hover:c(foreground) hover:bg(muted/50)";
  
  const docs_main = "flex(1) bg(muted/30)";
  const docs_content_wrapper = "w(full) hbox(top) gap(xl) p(lg) lg:p(xl)";
  const docs_article = "flex(1) card() p(xl) lg:p(3xl) max-w(none)";
  const docs_article_header = "stack(lg) pb(xl) border-b mb(xl)";
  const docs_article_footer = "pt(3xl) border-t mt(3xl)";
  
  const breadcrumb = "hbox(middle) gap(sm) flex-wrap";
  const breadcrumb_link = "body(sm) c(muted) hover:c(foreground) transition";
  const breadcrumb_current = "body(sm) font(medium) c(foreground)";
  
  const docs_pagination = "grid(2fr) gap(lg)";
  const docs_pagination_item = "card(interactive) p(lg) stack(xs) transition";
  const docs_pagination_label = "caption() c(muted)";
  const docs_pagination_title = "body(md) font(medium) c(foreground)";
  
  const docs_toc = "hidden xl:block w(280) flex-shrink(0)";
  const docs_toc_container = "sticky top(100) card() p(lg)";
  const docs_toc_nav = "max-h(calc(100vh-200px)) overflow-y(auto)";
  const docs_toc_title = "label(sm) uppercase tracking(wide) c(muted) pb(md) border-b mb(md)";
  const docs_toc_list = "stack(xs)";
  const docs_toc_link = "block py(sm) pl(md) border-l(2) transition body(sm)";
  const docs_toc_link_active = "border(primary) c(primary) font(medium)";
  const docs_toc_link_inactive = "border(border) c(muted) hover:c(foreground) hover:border(muted)";
  const docs_toc_sublink = "block py(xs) pl(xl) transition caption()";
  const docs_toc_sublink_active = "c(primary) font(medium)";
  const docs_toc_sublink_inactive = "c(muted) hover:c(foreground)";
  
  // Find parent h2 for current active h3
  $: {
    if (activeSection) {
      const activeItem = tocItems.find(item => item.id === activeSection);
      if (activeItem && activeItem.level === 3) {
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
    
    const headings = document.querySelectorAll('main h1, main h2, main h3');
    tocItems = Array.from(headings).map(heading => ({
      id: heading.id || heading.textContent.toLowerCase().replace(/\s+/g, '-'),
      text: heading.textContent,
      level: parseInt(heading.tagName[1])
    }));
    
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
      history.pushState(null, '', `#${id}`);
    }
  }
  
  function getBadgeColor(badge) {
    switch(badge) {
      case 'new': return 'success';
      case 'beta': return 'warning';
      case 'updated': return 'primary';
      default: return 'neutral';
    }
  }
</script>

<!-- Documentation Layout -->
<div class={docs_layout}>
  <!-- Navigation Sidebar -->
  <nav class={docs_sidebar}>
    <!-- Navigation Header -->
    <div class={docs_sidebar_header}>
      <h2 class="title(xl) bold">DOCS</h2>
    </div>
    
    <!-- Navigation Content -->
    <div class={docs_nav}>
      {#each docsConfig as section, sectionIndex}
        <div class={docs_nav_section}>
          {#if sectionIndex > 0}
            <div class={docs_nav_divider}></div>
          {/if}
          
          <h3 class={docs_nav_title}>{section.title}</h3>
          
          <ul class={docs_nav_list}>
            {#each section.items as item}
              <li>
                <a 
                  href={item.href}
                  class="{docs_nav_link} {$page.url.pathname === item.href 
                    ? docs_nav_link_active 
                    : docs_nav_link_inactive}"
                >
                  <div class="hbox(middle) gap(sm)">
                    <span class="flex(1)">{item.title}</span>
                    {#if item.badge}
                      <span class="badge({getBadgeColor(item.badge)}/sm)"></span>
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

  <!-- Main Content Layout -->
  <main class={docs_main}>
    <div class={docs_content_wrapper}>
      <!-- Article Content -->
      <article class={docs_article}>
        <!-- Article Header -->
        <header class={docs_article_header}>
          <!-- Breadcrumb -->
          <nav class={breadcrumb}>
            <a href="/" class={breadcrumb_link}>Home</a>
            <ChevronRight size="14" />
            <a href="/docs" class={breadcrumb_link}>Docs</a>
            {#if currentDoc}
              <ChevronRight size="14" />
              <span class={breadcrumb_current}>{currentDoc.title}</span>
            {/if}
          </nav>
        </header>
      
        <!-- Article Content -->
        <div class="prose(docs)">
          <slot />
        </div>

        <!-- Article Footer -->
        <footer class={docs_article_footer}>
          <!-- Pagination -->
          <nav class={docs_pagination}>
            {#if navigation.prev}
              <a href={navigation.prev.href} class="{docs_pagination_item} text(left)">
                <span class={docs_pagination_label}>← Previous</span>
                <span class={docs_pagination_title}>{navigation.prev.title}</span>
              </a>
            {:else}
              <div></div>
            {/if}
            
            {#if navigation.next}
              <a href={navigation.next.href} class="{docs_pagination_item} text(right)">
                <span class={docs_pagination_label}>Next →</span>
                <span class={docs_pagination_title}>{navigation.next.title}</span>
              </a>
            {:else}
              <div></div>
            {/if}
          </nav>
        </footer>
      </article>
      
      <!-- Table of Contents -->
      {#if mounted && tocItems.length > 0}
        <aside class={docs_toc}>
          <div class={docs_toc_container}>
            <nav class={docs_toc_nav}>
              <h3 class={docs_toc_title}>On this page</h3>
              
              <ul class={docs_toc_list}>
                {#each tocItems as item, i}
                  {#if item.level === 2}
                    <li>
                      <a 
                        href="#{item.id}" 
                        class="{docs_toc_link} {activeSection === item.id 
                          ? docs_toc_link_active 
                          : docs_toc_link_inactive}"
                        on:click={(e) => {
                          scrollToSection(e, item.id);
                          activeParentSection = item.id;
                        }}
                      >
                        {item.text}
                      </a>
                    
                      <!-- Sub-items (h3) -->
                      {#if item.level === 2 && activeParentSection === item.id}
                        {@const startIdx = i + 1}
                        {@const endIdx = tocItems.findIndex((t, idx) => idx > i && t.level <= 2)}
                        {@const subItems = endIdx === -1 ? tocItems.slice(startIdx) : tocItems.slice(startIdx, endIdx)}
                        {#each subItems as subItem}
                          {#if subItem.level === 3}
                            <a 
                              href="#{subItem.id}" 
                              class="{docs_toc_sublink} {activeSection === subItem.id 
                                ? docs_toc_sublink_active 
                                : docs_toc_sublink_inactive}"
                              on:click={(e) => scrollToSection(e, subItem.id)}
                            >
                              {subItem.text}
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
  </main>
</div>