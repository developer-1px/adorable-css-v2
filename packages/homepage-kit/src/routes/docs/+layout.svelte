<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let mounted = false;
  onMount(() => mounted = true);
</script>

<div class="docs">
  <nav class="docs-nav px(6) py(8)">
    <div class="mb(8)">
      <h3 class="text(xs) font(mono) uppercase tracking(wider) c(gray-500) mb(4)">Getting Started</h3>
      <ul class="vbox gap(1)">
        <li>
          <a 
            href="/docs/introduction" 
            class:active={$page.route.id === '/docs/introduction'}
            class="block px(4) py(2) r(md) transition hover:bg(gray-100) c(gray-700)"
          >
            Introduction
          </a>
        </li>
        <li>
          <a 
            href="/docs/getting-started" 
            class:active={$page.route.id === '/docs/getting-started'}
            class="block px(4) py(2) r(md) transition hover:bg(gray-100) c(gray-700)"
          >
            Getting Started
          </a>
        </li>
      </ul>
    </div>
    
    <div class="mb(8)">
      <h3 class="text(xs) font(mono) uppercase tracking(wider) c(gray-500) mb(4)">Core Concepts</h3>
      <ul class="vbox gap(1)">
        <li>
          <a 
            href="/docs/core-concepts" 
            class:active={$page.route.id === '/docs/core-concepts'}
            class="block px(4) py(2) r(md) transition hover:bg(gray-100) c(gray-700)"
          >
            Core Concepts
          </a>
        </li>
        <li>
          <a 
            href="/docs/design-tokens" 
            class:active={$page.route.id === '/docs/design-tokens'}
            class="block px(4) py(2) r(md) transition hover:bg(gray-100) c(gray-700)"
          >
            Design Tokens
          </a>
        </li>
        <li>
          <a 
            href="/docs/color-system" 
            class:active={$page.route.id === '/docs/color-system'}
            class="block px(4) py(2) r(md) transition hover:bg(gray-100) c(gray-700)"
          >
            Color System
          </a>
        </li>
      </ul>
    </div>
    
    <div class="mb(8)">
      <h3 class="text(xs) font(mono) uppercase tracking(wider) c(gray-500) mb(4)">Layout System</h3>
      <ul class="vbox gap(1)">
        <li>
          <a 
            href="/docs/layout-system" 
            class:active={$page.route.id === '/docs/layout-system'}
            class="block px(4) py(2) r(md) transition hover:bg(gray-100) c(gray-700)"
          >
            Layout System
          </a>
        </li>
        <li>
          <a 
            href="/docs/smart-containers" 
            class:active={$page.route.id === '/docs/smart-containers'}
            class="block px(4) py(2) r(md) transition hover:bg(gray-100) c(gray-700)"
          >
            Smart Containers
          </a>
        </li>
      </ul>
    </div>
    
    <div class="mb(8)">
      <h3 class="text(xs) font(mono) uppercase tracking(wider) c(gray-500) mb(4)">Typography</h3>
      <ul class="vbox gap(1)">
        <li>
          <a 
            href="/docs/typography" 
            class:active={$page.route.id === '/docs/typography'}
            class="block px(4) py(2) r(md) transition hover:bg(gray-100) c(gray-700)"
          >
            Typography
          </a>
        </li>
      </ul>
    </div>
  </nav>

  <main class="docs-main">
    <article class="prose">
      <slot />
    </article>
  </main>
</div>

<style>
  .active {
    background-color: #dbeafe !important;
    color: #2563eb !important;
    font-weight: 700 !important;
  }
</style>