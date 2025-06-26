<script lang="ts">
  // Page imports - organized by folder
  import HomePage from './pages/home/HomePage.svelte';
  import SyntaxPage from './pages/syntax/SyntaxPage.svelte';
  import TokensPage from './pages/tokens/TokensPage.svelte';
  import ComponentsPage from './pages/components/ComponentsPage.svelte';
  import ReferencePage from './pages/reference/ReferencePage.svelte';
  import PlaygroundPage from './pages/playground/PlaygroundPage.svelte';
  import DashboardDemo from './pages/playground/DashboardDemo.svelte';
  import TutorialsPage from './pages/tutorials/TutorialsPage.svelte';
  import IntroTutorial from './pages/tutorials/lessons/IntroTutorial.svelte';
  import TypographyTutorial from './pages/tutorials/lessons/TypographyTutorial.svelte';
  import DocsPage from './pages/docs/DocsPage.svelte';
  
  // Keep legacy parser for now
  import ParserVisualizer from './lib/ParserVisualizer.svelte';
  
  import { Github, BookOpen, Sparkles, Menu, X } from 'lucide-svelte';
  
  let mobileMenuOpen = false;
  
  // Available routes
  type Route = 'home' | 'syntax' | 'tokens' | 'components' | 'reference' | 'playground' | 'dashboard-demo' | 'parser-old' | 'tutorials' | 'tutorials/intro' | 'tutorials/typography' | 'docs';
  
  let currentPage: Route = 'home';
  
  // Navigation configuration
  interface NavItem {
    route: Route;
    label: string;
    description?: string;
  }
  
  const navigation: NavItem[] = [
    { route: 'home', label: 'Home', description: 'AdorableCSS overview and features' },
    { route: 'tutorials', label: 'Tutorials', description: 'Interactive learning' },
    { route: 'syntax', label: 'Syntax Guide', description: 'Learn the AdorableCSS syntax' },
    { route: 'tokens', label: 'Design Tokens', description: 'Color, spacing, and typography tokens' },
    { route: 'components', label: 'Components', description: 'UI component examples' },
    { route: 'reference', label: 'Reference', description: 'Complete rule reference' },
    { route: 'playground', label: 'Playground', description: 'Experiment with AdorableCSS' }
  ];
  
  // Route configuration
  const routes: Record<string, Route> = {
    // Current routes
    'home': 'home',
    'tutorials': 'tutorials',
    'tutorials/intro': 'tutorials/intro',
    'tutorials/typography': 'tutorials/typography',
    'syntax': 'syntax',
    'tokens': 'tokens', 
    'components': 'components',
    'reference': 'reference',
    'playground': 'playground',
    'dashboard-demo': 'dashboard-demo',
    'parser-old': 'parser-old',
    
    // Legacy route mappings for backward compatibility
    'showcase': 'home',
    'parser': 'syntax',
    'showcase2': 'dashboard-demo',
    'test': 'playground',
    'rules': 'reference',
    '': 'home' // Default route
  };
  
  // Simple hash-based routing
  function updatePage() {
    const hash = window.location.hash.slice(1);
    currentPage = routes[hash] || 'home';
  }
  
  // Listen for hash changes
  if (typeof window !== 'undefined') {
    window.addEventListener('hashchange', updatePage);
    updatePage(); // Set initial page
  }
  
  function navigateTo(page: string) {
    window.location.hash = page;
  }
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
      <div class="nav-brand hbox(middle) gap(sm) cursor(pointer)" on:click={() => navigateTo('home')}>
        <div class="logo-wrapper p(sm) r(lg) bg(135deg/#8b5cf6,#ec4899) shadow(md) hover:scale(1.05) transition">
          <Sparkles size="20" class="c(white)" />
        </div>
        <div class="brand-info">
          <div class="brand-name 700 font(xl) bg(135deg/#8b5cf6,#ec4899)" style="-webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
            AdorableCSS
          </div>
          <div class="version-tag font(xs) c(gray-500) tracking(wide)">v2.0 - Design First</div>
        </div>
      </div>

      <!-- Navigation Links -->
      <div class="nav-links hbox(middle) gap(xs)">
        {#each navigation as navItem}
          <button 
            class="nav-link px(lg) py(sm) r(xl) 700 font(sm) transition(all/0.2s/ease-out) hbox(middle) gap(xs) relative
                   {currentPage === navItem.route 
                     ? 'bg(135deg/#8b5cf6,#ec4899) c(white) shadow(md)' 
                     : 'hover:bg(gray-50) c(gray-700) hover:c(gray-900)'}"
            on:click={() => navigateTo(navItem.route)}
            title={navItem.description}
          >
            {navItem.label}
            {#if currentPage === navItem.route}
              <div class="absolute top(full) left(50%) translate-x(-50%) w(6px) h(6px) bg(white) r(full) shadow(sm)"></div>
            {/if}
          </button>
        {/each}
      </div>

      <!-- Action Buttons -->
      <div class="nav-actions hbox(middle) gap(sm)">
        <!-- Desktop Actions -->
        <div class="desktop-actions hbox(middle) gap(sm)">
          <button class="action-btn px(lg) py(sm) hbox(middle) gap(sm) r(lg) bg(white) b(1/gray-200) c(gray-700) 700 font(sm) hover:shadow(md) hover:scale(1.02) transition">
            <BookOpen size="16" />
            <span>Docs</span>
          </button>
          <button class="action-btn px(lg) py(sm) hbox(middle) gap(sm) r(lg) bg(gray-900) c(white) 700 font(sm) hover:bg(gray-800) hover:scale(1.02) hover:shadow(lg) transition">
            <Github size="16" />
            <span>GitHub</span>
          </button>
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
    {#if currentPage === 'home'}
      <HomePage />
    {:else if currentPage === 'tutorials'}
      <TutorialsPage />
    {:else if currentPage === 'tutorials/intro'}
      <IntroTutorial />
    {:else if currentPage === 'tutorials/typography'}
      <TypographyTutorial />
    {:else if currentPage === 'syntax'}
      <SyntaxPage />
    {:else if currentPage === 'tokens'}
      <TokensPage />
    {:else if currentPage === 'components'}
      <ComponentsPage />
    {:else if currentPage === 'reference'}
      <ReferencePage />
    {:else if currentPage === 'playground'}
      <PlaygroundPage />
    {:else if currentPage === 'dashboard-demo'}
      <DashboardDemo />
    {:else if currentPage === 'parser-old'}
      <ParserVisualizer />
    {/if}
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
        <div class="menu-content flex-1 p(lg) vbox gap(sm)">
          {#each navigation as navItem}
            <button 
              class="mobile-nav-link p(lg) r(xl) w(full) text(left) 700 font(sm) transition
                     {currentPage === navItem.route 
                       ? 'bg(135deg/#8b5cf6,#ec4899) c(white) shadow(md)' 
                       : 'hover:bg(gray-50) c(gray-700)'}"
              on:click={() => {
                navigateTo(navItem.route);
                mobileMenuOpen = false;
              }}
            >
              <div class="font(medium)">{navItem.label}</div>
              {#if navItem.description}
                <div class="font(xs) {currentPage === navItem.route ? 'c(white.8)' : 'c(gray-500)'} mt(xs)">
                  {navItem.description}
                </div>
              {/if}
            </button>
          {/each}
        </div>
        
        <!-- Action Buttons -->
        <div class="menu-footer p(lg) border-t(1/gray-200) vbox gap(sm)">
          <button class="action-btn w(full) px(lg) py(md) hbox(center) gap(sm) r(lg) bg(white) b(1/gray-200) c(gray-700) 700 font(sm) hover:shadow(md) transition">
            <BookOpen size="16" />
            <span>Documentation</span>
          </button>
          <button class="action-btn w(full) px(lg) py(md) hbox(center) gap(sm) r(lg) bg(gray-900) c(white) 700 font(sm) hover:bg(gray-800) transition">
            <Github size="16" />
            <span>View on GitHub</span>
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>

