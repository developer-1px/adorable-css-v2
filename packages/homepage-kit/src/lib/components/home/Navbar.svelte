<script lang="ts">
  import { page } from '$app/stores';
  import { Github, Menu, X } from 'lucide-svelte';
  
  let menuOpen = false;
  
  $: currentPath = $page.url.pathname;
  
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/docs', label: 'Docs' },
    { href: '/components', label: 'Components' },
    { href: '/rules', label: 'Rules' },
    { href: '/playground', label: 'Playground' }
  ];
</script>

<nav class="sticky top(0) z(50) bg(white.95) backdrop-blur(md) border-b(1/gray-200)">
  <div class="container max-w(7xl) mx(auto)">
    <div class="hbox(between) h(64) px(24)">
      <!-- Logo -->
      <a href="/" class="hbox(middle) gap(12) c(gray-900) hover:c(purple-600) transition">
        <div class="32x32 r(lg) bg(purple-500..pink-500/135deg) shadow(sm)"></div>
        <span class="font(xl) bold">AdorableCSS</span>
      </a>
      
      <!-- Desktop Navigation -->
      <div class="hbox(middle) gap(32) ..md:hidden">
        <!-- Nav Links -->
        <div class="hbox gap(24)">
          {#each navItems as item}
            <a 
              href={item.href} 
              class="font(sm) bold(medium) c(gray-600) hover:c(purple-600) transition"
              class:c(purple-600)={currentPath === item.href}
            >
              {item.label}
            </a>
          {/each}
        </div>
        
        <!-- Actions -->
        <div class="hbox(middle) gap(16)">
          <a 
            href="https://github.com/adorablecss/adorable-css" 
            target="_blank"
            rel="noopener"
            class="icon-btn hover:bg(gray-100)"
          >
            <Github size="20" />
          </a>
          <a href="/docs/getting-started" class="btn(secondary/sm)">
            Get Started
          </a>
        </div>
      </div>
      
      <!-- Mobile Menu Button -->
      <button 
        class="icon-btn md:hidden"
        on:click={() => menuOpen = !menuOpen}
      >
        {#if menuOpen}
          <X size="24" />
        {:else}
          <Menu size="24" />
        {/if}
      </button>
    </div>
    
    <!-- Mobile Navigation -->
    {#if menuOpen}
      <div class="vbox gap(8) p(24) border-t(1/gray-200) md:hidden">
        {#each navItems as item}
          <a 
            href={item.href} 
            class="block py(12) font(sm) bold(medium) c(gray-600) hover:c(purple-600) transition"
            class:c(purple-600)={currentPath === item.href}
            on:click={() => menuOpen = false}
          >
            {item.label}
          </a>
        {/each}
        <div class="mt(16) pt(16) border-t(1/gray-200)">
          <a href="/docs/getting-started" class="btn(secondary) w(full)">
            Get Started
          </a>
        </div>
      </div>
    {/if}
  </div>
</nav>