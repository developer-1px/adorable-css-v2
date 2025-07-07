/* TODO: mb(lg)를 vbox gap()으로 변경 *//* TODO: mb(lg)를 vbox gap()으로 변경 *//* TODO: mb(lg)를 vbox gap()으로 변경 *//* TODO: mb(lg)를 vbox gap()으로 변경 *//* TODO: mb(lg)를 vbox gap()으로 변경 *//* TODO: mb(lg)를 vbox gap()으로 변경 *//* TODO: mb(lg)를 vbox gap()으로 변경 *//* TODO: mb(lg)를 vbox gap()으로 변경 *//* TODO: mb(lg)를 vbox gap()으로 변경 *//* TODO: mb(lg)를 vbox gap()으로 변경 *//* TODO: mb(lg)를 vbox gap()으로 변경 *//* TODO: mb(lg)를 vbox gap()으로 변경 *//* TODO: mb(lg)를 vbox gap()으로 변경 *//* TODO: mb(lg)를 vbox gap()으로 변경 *//* TODO: mb(lg)를 vbox gap()으로 변경 *//* TODO: mb(lg)를 vbox gap()으로 변경 *//* TODO: mb(lg)를 vbox gap()으로 변경 *//* TODO: mb(lg)를 vbox gap()으로 변경 *//* TODO: mb(lg)를 vbox gap()으로 변경 *//* TODO: mb(lg)를 vbox gap()으로 변경 */<script>
  import { onMount } from 'svelte';
  import { List, ChevronUp } from 'lucide-svelte';

  export let isOpen = false;
  export let tocItems = [];
  export let activeSection = '';
  export let activeParentSection = '';
  
  let mounted = false;
  let tocElement;
  
  onMount(() => {
    mounted = true;
    
    // Close TOC when clicking outside
    function handleClickOutside(event) {
      if (tocElement && !tocElement.contains(event.target) && isOpen) {
        isOpen = false;
      }
    }
    
    // Close TOC on escape key
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
  
  function toggleTOC() {
    isOpen = !isOpen;
  }
  
  function closeTOC() {
    isOpen = false;
  }
  
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

<!-- Only show if there are TOC items -->
{#if mounted && tocItems.length > 0}
  <!-- Toggle Button -->
  <button
    on:click={toggleTOC}
    class="fixed bottom(20) right(20) z(999) w(56) h(56) bg(white) shadow(xl) r(full) 
           border(2/gray-900) hbox(pack) hover:scale(1.05) transition
           xl:hidden"
    aria-label="Toggle table of contents"
  >
    {#if isOpen}
      <ChevronUp size="24" class="c(gray-900)" />
    {:else}
      <List size="24" class="c(gray-900)" />
    {/if}
  </button>

  <!-- Backdrop for mobile -->
  {#if isOpen}
    <div 
      class="fixed inset(0) bg(black.5) z(50) xl:hidden transition-opacity"
      on:click={closeTOC}
      aria-hidden="true"
    ></div>
  {/if}

  <!-- Floating TOC -->
  <aside 
    bind:this={tocElement}
    class="fixed bottom(20) right(20) w(320) max-h(calc(100vh-120px)) bg(white) shadow(2xl) 
           r(xl) border(2/gray-900) z(60) transition-transform duration(300)
           xl:sticky xl:top(100) xl:h(fit) xl:translate-y(0) xl:shadow(xl)
           {isOpen ? 'translate-y(0)' : 'translate-y(110%)'} xl:translate-y(0)"
    aria-hidden={!isOpen}
  >
    <div class="p(xl)">
      <!-- Header -->
      <div class="hbox(middle) gap(lg) pb(lg) bb(2/gray-900) mb(lg)">
        <h3 class="text(sm) text(black) uppercase c(gray-900) tracking(wider) flex(1)">
          On this page
        </h3>
        <button
          on:click={closeTOC}
          class="w(24) h(24) r(sm) hbox(pack) hover:bg(gray-100) transition xl:hidden"
          aria-label="Close table of contents"
        >
          <ChevronUp size="16" class="c(gray-600)" />
        </button>
      </div>
      
      <!-- TOC Content -->
      <nav class="max-h(calc(100vh-200px)) scroll(y) scrollbar(thin)">
        <ul class="vbox gap(sm)">
          {#each tocItems as item, i}
            {#if item.level === 2}
              <li>
                <a 
                  href="#{item.id}" 
                  class="block py(sm) pl(md) bl(2) transition text(medium)
                         {activeSection === item.id 
                           ? 'border-l(2/gray-900) c(gray-900) text(bold)'
                           : 'border-l(2/gray-200) c(gray-600) hover:c(gray-900) hover:border-l(2/gray-400)'}"
                  on:click={(e) => {
                    scrollToSection(e, item.id);
                    activeParentSection = item.id;
                    closeTOC();
                  }}>
                  <span class="text(sm)">{item.text}</span>
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
                                 ? 'c(gray-900) text(bold)'
                                 : 'c(gray-500) hover:c(gray-700)'}"
                        on:click={(e) => {
                          scrollToSection(e, subItem.id);
                          closeTOC();
                        }}
                      >
                        <span class="text(xs)">{subItem.text}</span>
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

  <!-- Desktop TOC (always visible on xl+) -->
  <aside class="hidden xl:block sticky top(100) h(fit) w(280) flex-shrink(0) my(lg)">
    <div class="bg(white) r(lg) border(2/gray-900) shadow(xl) p(xl)">
      <nav class="max-h(calc(100vh-200px)) scroll(y) scrollbar(thin)">
        <h3 class="text(sm) text(black) uppercase c(gray-900) tracking(wider) pb(lg) bb(2/gray-900) mb(lg)">
          On this page
        </h3>
        <ul class="vbox gap(sm)">
          {#each tocItems as item, i}
            {#if item.level === 2}
              <li>
                <a 
                  href="#{item.id}" 
                  class="block py(sm) pl(md) bl(2) transition text(medium)
                         {activeSection === item.id 
                           ? 'border-l(2/gray-900) c(gray-900) text(bold)'
                           : 'border-l(2/gray-200) c(gray-600) hover:c(gray-900) hover:border-l(2/gray-400)'}"
                  on:click={(e) => {
                    scrollToSection(e, item.id);
                    activeParentSection = item.id;
                  }}>
                  <span class="text(sm)">{item.text}</span>
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
                                 ? 'c(gray-900) text(bold)'
                                 : 'c(gray-500) hover:c(gray-700)'}"
                        on:click={(e) => scrollToSection(e, subItem.id)}
                      >
                        <span class="text(xs)">{subItem.text}</span>
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