<script lang="ts">
  import { page } from '$app/stores';
  import { Menu, X } from 'lucide-svelte';

  // Define Design System Navigation
  const designSystemNav = [
    {
      title: 'Foundation',
      items: [
         { title: 'Colors', href: '#colors' },
         { title: 'Typography', href: '#typography' },
         { title: 'Spacing', href: '#spacing' }
      ]
    },
    {
      title: 'Components',
      items: [
         { title: 'Buttons', href: '#buttons' },
         { title: 'Cards', href: '#cards' }
      ]
    }
  ];

  let showMobileNav = false;
</script>

<div class="min-h(screen) bg(white)">

  <!-- Mobile Floating Action Button -->
  <div class="lg:hidden fixed bottom(xl) right(xl) z(50)">
    <button 
      class="size(56) r(full) bg(gray-900) c(white) shadow(xl) hbox(center) hover:scale(1.05) transition"
      on:click={() => showMobileNav = !showMobileNav}
      aria-label="Menu"
    >
      <Menu size="24" />
    </button>
  </div>

  <!-- Mobile Navigation Drawer -->
  {#if showMobileNav}
    <div class="fixed inset(0) z(100) bg(black/20) backdrop-blur(sm)" on:click={() => showMobileNav = false}>
      <div class="absolute right(0) top(0) h(full) w(320px) bg(white) shadow(2xl) p(2xl) scroll(y) border-l(1/gray-100)" on:click|stopPropagation>
         <div class="hbox(between) mb(2xl)">
           <h2 class="font(bold) text(xl) c(gray-900)">Design System</h2>
           <button on:click={() => showMobileNav = false} class="p(2px) hover:bg(gray-100) r(md) c(gray-500)">
             <X size="20" />
           </button>
         </div>
         
         {#each designSystemNav as section}
           <div class="mb(xl)">
             <h3 class="text(xs) font(bold) uppercase c(gray-400) tracking(wider) mb(md)">{section.title}</h3>
             <ul class="vbox gap(xs)">
               {#each section.items as item}
                 <li>
                   <a 
                     href={item.href} 
                     class="block py(2px) px(sm) -mx(sm) r(md) text(sm) transition-colors c(gray-600) hover:bg(gray-50) hover:c(gray-900)" 
                     on:click={() => showMobileNav = false}
                   >
                     {item.title}
                   </a>
                 </li>
               {/each}
             </ul>
           </div>
         {/each}
      </div>
    </div>
  {/if}

  <div class="max-w(1440px) mx(auto) hbox(top)">
    
    <!-- Left Sidebar (Desktop) - IDENTICAL STRUCTURE TO DOCS -->
    <nav class="hidden lg:block sticky top(88px) w(280px) h(calc(100vh-88px)) scroll(y) py(3xl) pl(xl) pr(lg)">
      <div class="vbox gap(2xl)">
        {#each designSystemNav as section}
          <div>
            <h3 class="text(xs) font(bold) uppercase c(gray-900) tracking(widest) mb(lg) px(sm)">
              {section.title}
            </h3>
            <ul class="vbox gap(2px)">
              {#each section.items as item}
                <li>
                  <a 
                    href={item.href}
                    class="block py(sm) px(sm) r(md) text(sm) transition-colors c(gray-500) hover:c(gray-900) hover:bg(gray-100)"
                  >
                    <div class="hbox(between)">
                      <span>{item.title}</span>
                    </div>
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex(1) min-w(0) px(xl) lg:px(4xl) py(3xl) lg:py(5xl)">
      <div class="max-w(3xl) mx(auto)">
         <slot />
      </div>
    </main>
    
    <!-- Right Sidebar Placeholder (to match spacing if needed, or omit for wider content) -->
    <!-- Design System content is usually visual, so keeping it wider (no right sidebar) might be better -->
    <!-- But Docs has right sidebar (TOC). If we want EXACT match, we might need a spacer or TOC. -->
    <!-- For now, I'll align the Left Sidebar design and allow Main to take remaining width. -->

  </div>
</div>

<style>
  /* Custom Scrollbar for sidebars */
  nav::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  nav::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 4px;
  }
  nav:hover::-webkit-scrollbar-thumb {
    background: #e5e7eb;
  }
</style>
