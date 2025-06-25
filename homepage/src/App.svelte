<script lang="ts">
  // Page imports - organized by folder
  import HomePage from './pages/home/HomePage.svelte';
  import SyntaxPage from './pages/syntax/SyntaxPage.svelte';
  import TokensPage from './pages/tokens/TokensPage.svelte';
  import ComponentsPage from './pages/components/ComponentsPage.svelte';
  import ReferencePage from './pages/reference/ReferencePage.svelte';
  import PlaygroundPage from './pages/playground/PlaygroundPage.svelte';
  import DashboardDemo from './pages/playground/DashboardDemo.svelte';
  
  // Keep legacy parser for now
  import ParserVisualizer from './lib/ParserVisualizer.svelte';
  
  import { Github, BookOpen, Sparkles } from 'lucide-svelte';
  
  // Available routes
  type Route = 'home' | 'syntax' | 'tokens' | 'components' | 'reference' | 'playground' | 'dashboard-demo' | 'parser-old';
  
  let currentPage: Route = 'home';
  
  // Navigation configuration
  interface NavItem {
    route: Route;
    label: string;
    description?: string;
  }
  
  const navigation: NavItem[] = [
    { route: 'home', label: 'Home', description: 'AdorableCSS overview and features' },
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

<div class="app">
  <nav class="navigation">
    <div class="nav-container">
      <!-- Logo & Brand -->
      <div class="nav-brand">
        <div class="logo">
          <Sparkles size="24" class="logo-icon" />
          <span class="brand-name">AdorableCSS</span>
          <span class="version-badge">v2.0</span>
        </div>
      </div>

      <!-- Navigation Links -->
      <div class="nav-links">
        {#each navigation as navItem}
          <button 
            class="nav-link {currentPage === navItem.route ? 'active' : ''}"
            on:click={() => navigateTo(navItem.route)}
            title={navItem.description}
          >
            {navItem.label}
          </button>
        {/each}
      </div>

      <!-- Action Buttons -->
      <div class="nav-actions">
        <button class="action-btn docs-btn">
          <BookOpen size="18" />
          <span>Docs</span>
        </button>
        <button class="action-btn github-btn">
          <Github size="18" />
          <span>GitHub</span>
        </button>
      </div>
    </div>
  </nav>
  
  <main class="main-content">
    {#if currentPage === 'home'}
      <HomePage />
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
</div>

<style>
  .app {
    min-height: 100vh;
    background: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
  }
  
  .navigation {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(229, 231, 235, 0.8);
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }
  
  .nav-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4.5rem;
  }
  
  /* Logo & Brand */
  .nav-brand {
    flex-shrink: 0;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .logo-icon {
    color: #0ea5e9;
  }
  
  .brand-name {
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #0ea5e9, #0d99ff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }
  
  .version-badge {
    background: #0ea5e9;
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    margin-left: 0.5rem;
  }
  
  /* Navigation Links */
  .nav-links {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    flex: 1;
    justify-content: center;
  }
  
  .nav-link {
    padding: 0.625rem 1rem;
    background: transparent;
    border: none;
    border-radius: 0.5rem;
    color: #64748b;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
  }
  
  .nav-link:hover {
    color: #334155;
    background: rgba(14, 165, 233, 0.08);
  }
  
  .nav-link.active {
    color: #0ea5e9;
    background: rgba(14, 165, 233, 0.1);
    font-weight: 600;
  }
  
  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 2px;
    background: #0ea5e9;
    border-radius: 1px;
  }
  
  /* Action Buttons */
  .nav-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-shrink: 0;
  }
  
  .action-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    background: white;
    color: #475569;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .action-btn:hover {
    border-color: #cbd5e1;
    background: #f8fafc;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .github-btn {
    background: #1f2937;
    border-color: #1f2937;
    color: white;
  }
  
  .github-btn:hover {
    background: #111827;
    border-color: #111827;
  }
  
  /* Main Content */
  .main-content {
    min-height: calc(100vh - 4.5rem);
  }
  
  /* Mobile Responsive */
  @media (max-width: 1024px) {
    .nav-container {
      padding: 0 1rem;
    }
    
    .nav-actions {
      gap: 0.5rem;
    }
    
    .action-btn span {
      display: none;
    }
    
    .action-btn {
      padding: 0.5rem;
    }
  }
  
  @media (max-width: 768px) {
    .nav-container {
      flex-direction: column;
      height: auto;
      padding: 1rem;
      gap: 1rem;
    }
    
    .nav-brand {
      align-self: stretch;
      text-align: center;
    }
    
    .nav-links {
      width: 100%;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .nav-link {
      flex: 1;
      min-width: 120px;
      text-align: center;
    }
    
    .nav-actions {
      justify-content: center;
    }
    
    .action-btn span {
      display: inline;
    }
    
    .action-btn {
      padding: 0.5rem 1rem;
    }
  }
  
  @media (max-width: 480px) {
    .nav-links {
      flex-direction: column;
      width: 100%;
    }
    
    .nav-link {
      width: 100%;
      flex: none;
    }
  }
</style>
