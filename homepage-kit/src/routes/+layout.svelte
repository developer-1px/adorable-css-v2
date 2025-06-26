<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import { Github, BookOpen, Sparkles, Menu, X } from 'lucide-svelte';
  
  let mobileMenuOpen = false;
  
  // Navigation configuration
  interface NavItem {
    href: string;
    label: string;
    description?: string;
  }
  
  const navigation: NavItem[] = [
    { href: '/', label: 'Home', description: 'AdorableCSS overview and features' },
    { href: '/tutorials', label: 'Tutorials', description: 'Interactive learning' },
    { href: '/syntax', label: 'Syntax Guide', description: 'Learn the AdorableCSS syntax' },
    { href: '/tokens', label: 'Design Tokens', description: 'Color, spacing, and typography tokens' },
    { href: '/components', label: 'Components', description: 'UI component examples' },
    { href: '/reference', label: 'Reference', description: 'Complete rule reference' },
    { href: '/playground', label: 'Playground', description: 'Experiment with AdorableCSS' },
    { href: '/docs', label: 'Docs', description: 'Technical documentation' }
  ];
  
  $: currentPath = $page.url.pathname;
</script>

<div class="app relative min-h(screen) bg(white)">
  <!-- Background Gradient Orbs -->
  <div class="fixed layer pointer-events(none) z(0) clip">
    <div class="absolute w(600px) h(600px) r(full) blur(150px) opacity(0.2) bg(135deg/#8b5cf6,#ec4899) top(-200px) left(-100px) float(30s/ease-in-out/repeat:infinite)"></div>
    <div class="absolute w(500px) h(500px) r(full) blur(120px) opacity(0.15) bg(135deg/#3b82f6,#06b6d4) bottom(-150px) right(-150px) float(25s/ease-in-out/repeat:infinite/delay:10s)"></div>
  </div>

  <nav class="navigation sticky top(0) z(100) bg(white.8) backdrop-blur(24px) border-b(1/gray-200) shadow(sm)">
    <div class="container(7xl) hbox(middle+between) py(md) px(lg)">
      <!-- Logo & Brand -->
      <a href="{base}/" class="nav-brand hbox(middle) gap(sm) no-underline">
        <div class="logo-wrapper p(sm) r(lg) bg(135deg/#8b5cf6,#ec4899) shadow(md) hover:scale(1.05) transition">
          <Sparkles size="20" class="c(white)" />
        </div>
        <div class="brand-info">
          <div class="brand-name 700 font(xl) bg(135deg/#8b5cf6,#ec4899)" style="-webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
            AdorableCSS
          </div>
          <div class="version-tag font(xs) c(gray-500) tracking(wide)">v2.0 - Design First</div>
        </div>
      </a>

      <!-- Navigation Links -->
      <div class="nav-links hbox(middle) gap(xs) ~md:hidden">
        {#each navigation as navItem}
          <a 
            href="{base}{navItem.href}"
            class="nav-link px(lg) py(sm) r(xl) 700 font(sm) transition(all/0.2s/ease-out) hbox(middle) gap(xs) relative no-underline
                   {currentPath === navItem.href || (navItem.href !== '/' && currentPath.startsWith(navItem.href))
                     ? 'bg(135deg/#8b5cf6,#ec4899) c(white) shadow(md)' 
                     : 'hover:bg(gray-50) c(gray-700) hover:c(gray-900)'}"
            title={navItem.description}
          >
            {navItem.label}
            {#if currentPath === navItem.href || (navItem.href !== '/' && currentPath.startsWith(navItem.href))}
              <div class="absolute top(full) left(50%) translate-x(-50%) w(6px) h(6px) bg(white) r(full) shadow(sm)"></div>
            {/if}
          </a>
        {/each}
      </div>

      <!-- Action Buttons -->
      <div class="nav-actions hbox(middle) gap(sm)">
        <!-- Desktop Actions -->
        <div class="desktop-actions hbox(middle) gap(sm) ~md:hidden">
          <a href="{base}/docs" class="action-btn px(lg) py(sm) hbox(middle) gap(sm) r(lg) bg(white) b(1/gray-200) c(gray-700) 700 font(sm) hover:shadow(md) hover:scale(1.02) transition no-underline">
            <BookOpen size="16" />
            <span>Docs</span>
          </a>
          <a href="https://github.com/developer-1px/adorable-css-v2" target="_blank" rel="noopener noreferrer" class="action-btn px(lg) py(sm) hbox(middle) gap(sm) r(lg) bg(gray-900) c(white) 700 font(sm) hover:bg(gray-800) hover:scale(1.02) hover:shadow(lg) transition no-underline">
            <Github size="16" />
            <span>GitHub</span>
          </a>
        </div>
        
        <!-- Mobile Menu Button -->
        <button 
          class="mobile-menu-btn p(sm) r(lg) hover:bg(gray-100) transition md:hidden"
          on:click={() => mobileMenuOpen = !mobileMenuOpen}
        >
          {#if mobileMenuOpen}
            <X size="20" class="c(gray-700)" />
          {:else}
            <Menu size="20" class="c(gray-700)" />
          {/if}
        </button>
      </div>
    </div>
  </nav>
  
  <main class="main-content relative z(10)">
    <slot />
  </main>

  <!-- Mobile Navigation Menu -->
  {#if mobileMenuOpen}
    <div class="mobile-nav fixed layer z(99) md:hidden">
      <!-- Backdrop -->
      <div 
        class="backdrop layer bg(black.5) backdrop-blur(sm)"
        on:click={() => mobileMenuOpen = false}
      ></div>
      
      <!-- Menu Panel -->
      <div class="menu-panel absolute top(0) right(0) w(280px) h(full) bg(white) shadow(2xl) vbox">
        <!-- Header -->
        <div class="menu-header p(lg) border-b(1/gray-200)">
          <div class="hbox(middle+between)">
            <div class="700 font(lg) c(gray-900)">Menu</div>
            <button 
              class="p(xs) r(lg) hover:bg(gray-100) transition"
              on:click={() => mobileMenuOpen = false}
            >
              <X size="20" class="c(gray-700)" />
            </button>
          </div>
        </div>
        
        <!-- Navigation Links -->
        <div class="menu-content flex-1 p(lg) vbox gap(sm) overflow-y(auto)">
          {#each navigation as navItem}
            <a 
              href="{base}{navItem.href}"
              class="mobile-nav-link p(lg) r(xl) w(full) text(left) 700 font(sm) transition no-underline
                     {currentPath === navItem.href || (navItem.href !== '/' && currentPath.startsWith(navItem.href))
                       ? 'bg(135deg/#8b5cf6,#ec4899) c(white) shadow(md)' 
                       : 'hover:bg(gray-50) c(gray-700)'}"
              on:click={() => mobileMenuOpen = false}
            >
              <div class="font(medium)">{navItem.label}</div>
              {#if navItem.description}
                <div class="font(xs) {currentPath === navItem.href || (navItem.href !== '/' && currentPath.startsWith(navItem.href)) ? 'c(white.8)' : 'c(gray-500)'} mt(xs)">
                  {navItem.description}
                </div>
              {/if}
            </a>
          {/each}
        </div>
        
        <!-- Action Buttons -->
        <div class="menu-footer p(lg) border-t(1/gray-200) vbox gap(sm)">
          <a href="{base}/docs" class="action-btn w(full) px(lg) py(md) hbox(center) gap(sm) r(lg) bg(white) b(1/gray-200) c(gray-700) 700 font(sm) hover:shadow(md) transition no-underline" on:click={() => mobileMenuOpen = false}>
            <BookOpen size="16" />
            <span>Documentation</span>
          </a>
          <a href="https://github.com/developer-1px/adorable-css-v2" target="_blank" rel="noopener noreferrer" class="action-btn w(full) px(lg) py(md) hbox(center) gap(sm) r(lg) bg(gray-900) c(white) 700 font(sm) hover:bg(gray-800) transition no-underline">
            <Github size="16" />
            <span>View on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  :global(html) {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
  }
</style>