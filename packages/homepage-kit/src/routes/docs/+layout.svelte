<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let mounted = false;
  onMount(() => mounted = true);
</script>

<div class="docs-layout">
  <nav class="docs-nav">
    <div class="docs-nav-section">
      <h3>Getting Started</h3>
      <ul>
        <li><a href="/docs/introduction" class:active={$page.route.id === '/docs/introduction'}>Introduction</a></li>
        <li><a href="/docs/getting-started" class:active={$page.route.id === '/docs/getting-started'}>Getting Started</a></li>
      </ul>
    </div>
    
    <div class="docs-nav-section">
      <h3>Core Concepts</h3>
      <ul>
        <li><a href="/docs/core-concepts" class:active={$page.route.id === '/docs/core-concepts'}>Core Concepts</a></li>
        <li><a href="/docs/design-tokens" class:active={$page.route.id === '/docs/design-tokens'}>Design Tokens</a></li>
        <li><a href="/docs/color-system" class:active={$page.route.id === '/docs/color-system'}>Color System</a></li>
      </ul>
    </div>
    
    <div class="docs-nav-section">
      <h3>Layout System</h3>
      <ul>
        <li><a href="/docs/layout-system" class:active={$page.route.id === '/docs/layout-system'}>Layout System</a></li>
        <li><a href="/docs/smart-containers" class:active={$page.route.id === '/docs/smart-containers'}>Smart Containers</a></li>
      </ul>
    </div>
    
    <div class="docs-nav-section">
      <h3>Typography</h3>
      <ul>
        <li><a href="/docs/typography" class:active={$page.route.id === '/docs/typography'}>Typography</a></li>
      </ul>
    </div>
  </nav>

  <main class="docs-content">
    <slot />
  </main>
</div>

<style>
  .docs-layout {
    display: grid;
    grid-template-columns: 250px 1fr;
    min-height: 100vh;
    gap: 2rem;
  }

  .docs-nav {
    padding: 2rem 1rem;
    border-right: 1px solid #e5e7eb;
    background: #fafafa;
  }

  .docs-nav-section {
    margin-bottom: 2rem;
  }

  .docs-nav-section h3 {
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .docs-nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .docs-nav li {
    margin-bottom: 0.25rem;
  }

  .docs-nav a {
    display: block;
    padding: 0.5rem 0.75rem;
    color: #6b7280;
    text-decoration: none;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    transition: all 0.15s ease;
  }

  .docs-nav a:hover {
    background: #e5e7eb;
    color: #374151;
  }

  .docs-nav a.active {
    background: #3b82f6;
    color: white;
  }

  .docs-content {
    padding: 2rem;
    max-width: 800px;
  }

  @media (max-width: 768px) {
    .docs-layout {
      grid-template-columns: 1fr;
    }
    
    .docs-nav {
      border-right: none;
      border-bottom: 1px solid #e5e7eb;
    }
  }
</style>