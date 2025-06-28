<script lang="ts">
  import { base } from '$app/paths';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { Home, BookOpen, Sparkles, Code, Palette, Play, Layers, FileText, Zap, Bug } from 'lucide-svelte';

  interface RouteInfo {
    path: string;
    title: string;
    description: string;
    icon: any;
    status: 'ready' | 'beta' | 'experimental';
    category: string;
  }

  const routes: RouteInfo[] = [
    {
      path: '/',
      title: 'Home',
      description: 'AdorableCSS overview, features, and getting started guide',
      icon: Home,
      status: 'ready',
      category: 'Main'
    },
    {
      path: '/tutorials',
      title: 'Tutorials',
      description: 'Interactive learning experiences and step-by-step guides',
      icon: BookOpen,
      status: 'ready',
      category: 'Learning'
    },
    {
      path: '/design-system',
      title: 'Design System',
      description: 'Complete UI design system with components and patterns',
      icon: Layers,
      status: 'ready',
      category: 'System'
    },
    {
      path: '/debug-reference',
      title: 'Debug Reference',
      description: 'Function source code inspector and CSS output debugger',
      icon: Bug,
      status: 'beta',
      category: 'Development'
    },
    {
      path: '/tokens',
      title: 'Design Tokens',
      description: 'Color palette, spacing scale, typography, and design tokens',
      icon: Palette,
      status: 'ready',
      category: 'System'
    },
    {
      path: '/playground',
      title: 'Playground',
      description: 'Interactive editor to experiment with AdorableCSS',
      icon: Play,
      status: 'ready',
      category: 'Tools'
    },
    {
      path: '/components',
      title: 'Components',
      description: 'UI component examples and implementation patterns',
      icon: Layers,
      status: 'ready',
      category: 'System'
    },
    {
      path: '/syntax',
      title: 'Syntax Guide',
      description: 'Complete syntax reference and pattern examples',
      icon: Code,
      status: 'ready',
      category: 'Learning'
    },
    {
      path: '/docs',
      title: 'Documentation',
      description: 'Technical documentation, API reference, and guides',
      icon: FileText,
      status: 'ready',
      category: 'Learning'
    },
    {
      path: '/routes',
      title: 'All Routes',
      description: 'Complete list of all available pages and routes',
      icon: Zap,
      status: 'ready',
      category: 'Development'
    }
  ];

  const categories = ['Main', 'Learning', 'System', 'Tools', 'Development'];
  
  $: currentPath = $page.url.pathname;
  
  function getStatusColor(status: string) {
    switch (status) {
      case 'ready': return 'bg(green-100) c(green-800)';
      case 'beta': return 'bg(yellow-100) c(yellow-800)';
      case 'experimental': return 'bg(purple-100) c(purple-800)';
      default: return 'bg(gray-100) c(gray-800)';
    }
  }
  
  function getCategoryColor(category: string) {
    switch (category) {
      case 'Main': return 'bg(blue-500)';
      case 'Learning': return 'bg(green-500)';
      case 'System': return 'bg(purple-500)';
      case 'Tools': return 'bg(orange-500)';
      case 'Development': return 'bg(red-500)';
      default: return 'bg(gray-500)';
    }
  }
</script>

<div class="routes-page min-h(screen) bg(gray-50)">
  <!-- Hero Section -->
  <div class="hero-section bg(white) border-b(gray-200)">
    <div class="container(xl) py(3xl)">
      <div class="text(center) vbox gap(lg)">
        <div class="vbox gap(md)">
          <h1 class="hero-title 900 font(4xl/1.1) c(gray-900)">
            All Routes & Pages
          </h1>
          <p class="hero-description font(xl) c(gray-600) max-w(3xl) mx(auto)">
            Complete overview of all available pages in the AdorableCSS documentation and tools
          </p>
        </div>
        
        <!-- Stats -->
        <div class="stats hbox(center) gap(xl) mt(lg)">
          <div class="stat text(center)">
            <div class="font(3xl) bold c(purple-600)">{routes.length}</div>
            <div class="font(sm) c(gray-500) uppercase tracking(wide)">Total Routes</div>
          </div>
          <div class="stat text(center)">
            <div class="font(3xl) bold c(blue-600)">{categories.length}</div>
            <div class="font(sm) c(gray-500) uppercase tracking(wide)">Categories</div>
          </div>
          <div class="stat text(center)">
            <div class="font(3xl) bold c(green-600)">{routes.filter(r => r.status === 'ready').length}</div>
            <div class="font(sm) c(gray-500) uppercase tracking(wide)">Ready</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Routes Grid -->
  <div class="routes-content py(3xl)">
    <div class="container(xl)">
      {#each categories as category}
        {@const categoryRoutes = routes.filter(r => r.category === category)}
        {#if categoryRoutes.length > 0}
          <div class="category-section mb(3xl)">
            <!-- Category Header -->
            <div class="category-header mb(xl)">
              <div class="hbox(middle) gap(md)">
                <div class="w(4px) h(32px) r(full) {getCategoryColor(category)}"></div>
                <div class="vbox">
                  <h2 class="category-title 700 font(2xl) c(gray-900)">{category}</h2>
                  <p class="font(sm) c(gray-600)">{categoryRoutes.length} routes</p>
                </div>
              </div>
            </div>
            
            <!-- Routes Grid -->
            <div class="routes-grid grid grid-cols(1) md:grid-cols(2) lg:grid-cols(3) gap(lg)">
              {#each categoryRoutes as route}
                <a 
                  href="{base}{route.path}"
                  class="route-card bg(white) r(xl) p(xl) shadow(sm) hover:shadow(lg) border(gray-200) hover:border(gray-300) transition no-underline group relative
                         {currentPath === route.path ? 'ring(2/purple-500) bg(purple-50)' : ''}"
                >
                  <!-- Route Header -->
                  <div class="route-header hbox(middle+between) mb(md)">
                    <div class="route-icon 40x40 r(lg) bg(gray-100) group-hover:bg(purple-100) transition">
                      <svelte:component this={route.icon} size="20" class="c(gray-600) group-hover:c(purple-600) transition" />
                    </div>
                    <div class="route-status px(sm) py(xs) r(full) font(xs) 600 uppercase tracking(wide) {getStatusColor(route.status)}">
                      {route.status}
                    </div>
                  </div>
                  
                  <!-- Route Content -->
                  <div class="route-content vbox gap(sm)">
                    <h3 class="route-title 700 font(lg) c(gray-900) group-hover:c(purple-700) transition">
                      {route.title}
                    </h3>
                    <p class="route-description font(sm) c(gray-600) leading(relaxed)">
                      {route.description}
                    </p>
                  </div>
                  
                  <!-- Route Path -->
                  <div class="route-path mt(md) pt(md) border-t(gray-200)">
                    <code class="font(xs) c(purple-600) bg(purple-50) px(sm) py(xs) r(md) font-family(mono)">
                      {route.path || '/'}
                    </code>
                  </div>
                  
                  <!-- Current Page Indicator -->
                  {#if currentPath === route.path}
                    <div class="current-indicator absolute top(md) right(md) w(8px) h(8px) bg(purple-500) r(full)"></div>
                  {/if}
                </a>
              {/each}
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>

  <!-- Quick Links -->
  <div class="quick-links-section bg(white) border-t(gray-200)">
    <div class="container(xl) py(xl)">
      <div class="text(center) vbox gap(lg)">
        <h2 class="700 font(xl) c(gray-900)">Quick Access</h2>
        <div class="quick-links hbox(center) gap(sm) flex-wrap">
          <a href="{base}/" class="quick-link px(md) py(sm) r(lg) bg(gray-100) hover:bg(purple-100) c(gray-700) hover:c(purple-700) 600 font(sm) transition no-underline">
            Home
          </a>
          <a href="{base}/playground" class="quick-link px(md) py(sm) r(lg) bg(purple-100) hover:bg(purple-200) c(purple-700) hover:c(purple-800) 600 font(sm) transition no-underline">
            Playground
          </a>
          <a href="{base}/debug-reference" class="quick-link px(md) py(sm) r(lg) bg(blue-100) hover:bg(blue-200) c(blue-700) hover:c(blue-800) 600 font(sm) transition no-underline">
            Debug Reference
          </a>
          <a href="{base}/design-system" class="quick-link px(md) py(sm) r(lg) bg(green-100) hover:bg(green-200) c(green-700) hover:c(green-800) 600 font(sm) transition no-underline">
            Design System
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .tracking-wide {
    letter-spacing: 0.1em;
  }
</style>