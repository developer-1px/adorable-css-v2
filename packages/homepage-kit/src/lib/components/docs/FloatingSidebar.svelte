/* TODO: mt(sm)를 vbox gap()으로 변경 *//* TODO: mt(sm)를 vbox gap()으로 변경 *//* TODO: mt(sm)를 vbox gap()으로 변경 *//* TODO: mt(sm)를 vbox gap()으로 변경 *//* TODO: mt(sm)를 vbox gap()으로 변경 *//* TODO: mt(sm)를 vbox gap()으로 변경 *//* TODO: mt(sm)를 vbox gap()으로 변경 *//* TODO: mt(sm)를 vbox gap()으로 변경 *//* TODO: mt(sm)를 vbox gap()으로 변경 *//* TODO: mt(sm)를 vbox gap()으로 변경 */<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { docsConfig, findDocByHref } from '@docs/config';
  import { Menu, X, ChevronRight } from 'lucide-svelte';

  export let isOpen = false;
  
  let mounted = false;
  let sidebarElement;
  
  $: currentDoc = findDocByHref($page.url.pathname);
  
  onMount(() => {
    mounted = true;
    
    // Close sidebar when clicking outside
    function handleClickOutside(event) {
      if (sidebarElement && !sidebarElement.contains(event.target) && isOpen) {
        isOpen = false;
      }
    }
    
    // Close sidebar on escape key
    function handleKeydown(event) {
      if (event.key === 'Escape' && isOpen) {
        isOpen = false;
      }
    }
    
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeydown);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeydown);
    };
  });
  
  function toggleSidebar() {
    isOpen = !isOpen;
  }
  
  function closeSidebar() {
    isOpen = false;
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

<!-- Toggle Button (Always visible) -->
<button
  on:click={toggleSidebar}
  class="fixed top(20) left(20) z(999) w(48) h(48) bg(white) shadow(xl) r(full) 
         border(2/gray-900) hbox(pack) hover:scale(1.05) transition
         lg:hidden"
  aria-label="Toggle sidebar"
>
  {#if isOpen}
    <X size="20" class="c(gray-900)" />
  {:else}
    <Menu size="20" class="c(gray-900)" />
  {/if}
</button>

<!-- Backdrop for mobile -->
{#if isOpen}
  <div 
    class="fixed inset(0) bg(black.5) z(50) lg:hidden transition-opacity"
    on:click={closeSidebar}
    aria-hidden="true"
  ></div>
{/if}

<!-- Floating Sidebar -->
<nav 
  bind:this={sidebarElement}
  class="fixed top(20) left(20) h(calc(100vh-40px)) w(320) bg(white) shadow(2xl) 
         r(xl) border(2/gray-900) z(60) transition-transform duration(300)
         {isOpen ? 'translate-x(0)' : 'translate-x(-110%)'}"
  aria-hidden={!isOpen}
>
  <!-- Sidebar Header -->
  <div class="hbox(middle) gap(lg) p(xl) bb(2/gray-900)">
    <div class="flex(1)">
      <h2 class="display(lg) text(black) tracking(tight) c(gray-900)">DOCS</h2>
      {#if currentDoc}
        <div class="mt(sm) hbox(middle) gap(xs) text(xs) c(gray-600)">
          <span>Docs</span>
          <ChevronRight size="12" />
          <span class="text(bold) c(gray-900)">{currentDoc.title}</span>
        </div>
      {/if}
    </div>
    <button
      on:click={closeSidebar}
      class="w(32) h(32) r(md) border(1/gray-300) hbox(pack) hover:bg(gray-50) transition lg:hidden"
      aria-label="Close sidebar"
    >
      <X size="16" class="c(gray-600)" />
    </button>
  </div>
  
  <!-- Navigation Content -->
  <div class="h(calc(100%-80px)) scroll(y) scrollbar(thin)">
    <div class="p(xl) vbox gap(xl)">
      {#each docsConfig as section, sectionIndex}
        <div>
          {#if sectionIndex > 0}
            <div class="h(2px) bg(gray-900) my(lg)"></div>
          {/if}
          <h3 class="text(sm) text(black) uppercase c(gray-900) tracking(wider) pb(md)">
            {section.title}
          </h3>
          <ul class="vbox gap(xs)">
            {#each section.items as item}
              <li>
                <a 
                  href={item.href}
                  on:click={closeSidebar}
                  class="block py(sm) px(md) r(md) transition text(medium)
                         {$page.url.pathname === item.href 
                           ? 'bg(gray-900) c(white) text(bold)'
                           : 'c(gray-600) hover:c(gray-900) hover:bg(gray-50)'}"
                >
                  <div class="hbox(middle) gap(sm)">
                    <span class="text(sm) flex(1)">{item.title}</span>
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
  </div>
</nav>

<style>
  .scrollbar\(thin\)::-webkit-scrollbar {
    width: 6px;
  }
  
  .scrollbar\(thin\)::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .scrollbar\(thin\)::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;
  }
  
  .scrollbar\(thin\)::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
</style>