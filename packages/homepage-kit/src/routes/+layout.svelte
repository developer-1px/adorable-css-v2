<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import { Github, BookOpen, Sparkles, Menu, X } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  
  let mobileMenuOpen = false;
  
  // Initialize AdorableCSS CDN in browser
  onMount(async () => {
    if (typeof window !== 'undefined') {
      const AdorableCSSModule = await import('adorable-css-cdn');
      const AdorableCSSV2 = AdorableCSSModule.default;
      
      // Initialize with auto-detection
      AdorableCSSV2.init({
        watch: true,
        debug: false
      });
    }
  });
  
  // Navigation configuration
  interface NavItem {
    href: string;
    label: string;
    description?: string;
  }
  
  const navigation: NavItem[] = [
    { href: '/', label: 'Home', description: 'AdorableCSS overview and features' },
    { href: '/tutorials', label: 'Tutorials', description: 'Interactive learning' },
    { href: '/design-system', label: 'Design System', description: 'Complete UI design system' },
    { href: '/reference', label: 'Reference', description: 'Complete rule reference' },
    { href: '/tokens', label: 'Design Tokens', description: 'Color, spacing, and typography tokens' },
    { href: '/playground', label: 'Playground', description: 'Experiment with AdorableCSS' },
    { href: '/components', label: 'Components', description: 'UI component examples' },
    { href: '/syntax', label: 'Syntax Guide', description: 'Learn the AdorableCSS syntax' },
    { href: '/docs', label: 'Docs', description: 'Technical documentation' }
  ];
  
  $: currentPath = $page.url.pathname;
</script>

<div class="app relative min-h(screen) bg(white)">
  <!-- Background Gradient Orbs -->
  <div class="fixed layer pointer-events(none) z(0) clip">
    <div class="absolute w(600px) h(600px) r(full) blur(150px) opacity(0.2) bg(135deg/#8b5cf6..#ec4899) top(-200px) left(-100px) float(30s/ease-in-out/repeat:infinite)"></div>
    <div class="absolute w(500px) h(500px) r(full) blur(120px) opacity(0.15) bg(135deg/#3b82f6..#06b6d4) bottom(-150px) right(-150px) float(25s/ease-in-out/repeat:infinite/delay:10s)"></div>
  </div>

  <!-- Header Navigation -->
  <header class="sticky top(0) z(100) bg(white.95) backdrop-blur(16px) border-b(gray-200) shadow(sm)">
    <div class="container(6xl) hbox(middle+between) py(md) px(lg)">
      <!-- Logo & Brand -->
      <a href="{base}/" class="brand hbox(middle) gap(md) no-underline group">
        <div class="logo w(40px) h(40px) r(12px) bg(135deg/#8b5cf6..#ec4899) vbox(pack) shadow(md) group-hover:scale(1.05) transition">
          <Sparkles size="20" class="c(white)" />
        </div>
        <div class="brand-text vbox">
          <div class="brand-name 800 font(lg/1) bg(135deg/#8b5cf6..#ec4899)" style="-webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
            AdorableCSS
          </div>
          <div class="version font(xs) c(gray-500) 500">v2.0 Beta</div>
        </div>
      </a>

      <!-- Main Navigation -->
      <nav class="main-nav hbox(middle) gap(xs) ..lg:hidden">
        {#each navigation.slice(0, 5) as navItem}
          <a 
            href="{base}{navItem.href}"
            class="nav-link px(md) py(sm) r(md) 600 font(sm) transition no-underline relative
                   {currentPath === navItem.href || (navItem.href !== '/' && currentPath.startsWith(navItem.href))
                     ? 'c(purple-600) bg(purple-50)' 
                     : 'c(gray-700) hover:c(gray-900) hover:bg(gray-50)'}"
          >
            {navItem.label}
            {#if currentPath === navItem.href || (navItem.href !== '/' && currentPath.startsWith(navItem.href))}
              <div class="absolute bottom(0) left(50%) translate-x(-50%) w(4px) h(4px) bg(purple-600) r(full)"></div>
            {/if}
          </a>
        {/each}
      </nav>

      <!-- Actions -->
      <div class="actions hbox(middle) gap(sm)">
        <!-- Desktop CTA -->
        <div class="desktop-actions hbox(middle) gap(sm) ..lg:hidden">
          <a href="https://github.com/developer-1px/adorable-css-v2" target="_blank" rel="noopener noreferrer" 
             class="github-btn px(md) py(sm) hbox(middle) gap(sm) r(md) border(gray-300) bg(white) c(gray-700) 600 font(sm) hover:border(gray-400) hover:shadow(md) transition no-underline">
            <Github size="16" />
            <span>GitHub</span>
          </a>
          <a href="{base}/playground" 
             class="cta-btn px(lg) py(sm) r(md) bg(135deg/#8b5cf6..#ec4899) c(white) 600 font(sm) hover:shadow(lg) hover:scale(1.02) transition no-underline">
            Try Playground
          </a>
        </div>
        
        <!-- Mobile Menu -->
        <button 
          class="mobile-btn p(xs) r(md) border(gray-300) bg(white) hover:bg(gray-50) transition ..lg:block"
          on:click={() => mobileMenuOpen = !mobileMenuOpen}
        >
          {#if mobileMenuOpen}
            <X size="18" class="c(gray-700)" />
          {:else}
            <Menu size="18" class="c(gray-700)" />
          {/if}
        </button>
      </div>
    </div>
  </header>
  
  <main class="main-content relative z(10)">
    <slot />
  </main>
  
  <!-- Footer -->
  <Footer />

  <!-- Mobile Navigation -->
  {#if mobileMenuOpen}
    <div class="mobile-overlay fixed layer z(99) ..lg:block">
      <!-- Backdrop -->
      <div 
        class="backdrop layer bg(black.4) backdrop-blur(4px)"
        on:click={() => mobileMenuOpen = false}
      ></div>
      
      <!-- Mobile Menu Panel -->
      <div class="mobile-panel absolute top(0) right(0) w(320px) h(full) bg(white) shadow(2xl) vbox animate-slide-in-right">
        <!-- Mobile Header -->
        <div class="mobile-header p(md) border-b(gray-200)">
          <div class="hbox(middle+between)">
            <div class="mobile-brand hbox(middle) gap(sm)">
              <div class="w(32px) h(32px) r(8px) bg(135deg/#8b5cf6..#ec4899) vbox(pack)">
                <Sparkles size="16" class="c(white)" />
              </div>
              <div class="700 font(lg) c(gray-900)">AdorableCSS</div>
            </div>
            <button 
              class="close-btn p(sm) r(lg) hover:bg(gray-100) transition"
              on:click={() => mobileMenuOpen = false}
            >
              <X size="20" class="c(gray-600)" />
            </button>
          </div>
        </div>
        
        <!-- Mobile Navigation -->
        <div class="mobile-nav-content flex(1) p(md) vbox gap(xs) overflow-y(auto)">
          {#each navigation as navItem}
            <a 
              href="{base}{navItem.href}"
              class="mobile-nav-item p(sm) r(md) vbox gap(xs) transition no-underline
                     {currentPath === navItem.href || (navItem.href !== '/' && currentPath.startsWith(navItem.href))
                       ? 'bg(purple-50) border-l(purple-600)' 
                       : 'hover:bg(gray-50) border-l(transparent)'}"
              on:click={() => mobileMenuOpen = false}
            >
              <div class="600 font(md) {currentPath === navItem.href || (navItem.href !== '/' && currentPath.startsWith(navItem.href)) ? 'c(purple-700)' : 'c(gray-900)'}">
                {navItem.label}
              </div>
              {#if navItem.description}
                <div class="font(sm) c(gray-600)">
                  {navItem.description}
                </div>
              {/if}
            </a>
          {/each}
        </div>
        
        <!-- Mobile Actions -->
        <div class="mobile-actions p(md) border-t(gray-200) vbox gap(sm)">
          <a href="{base}/playground" 
             class="w(full) px(md) py(sm) r(md) bg(135deg/#8b5cf6..#ec4899) c(white) 600 font(md) text(center) hover:shadow(lg) transition no-underline"
             on:click={() => mobileMenuOpen = false}>
            Try Playground
          </a>
          <a href="https://github.com/developer-1px/adorable-css-v2" target="_blank" rel="noopener noreferrer" 
             class="w(full) px(md) py(sm) r(md) border(gray-300) bg(white) c(gray-700) 600 font(md) text(center) hbox(center) gap(xs) hover:border(gray-400) transition no-underline">
            <Github size="18" />
            <span>GitHub</span>
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