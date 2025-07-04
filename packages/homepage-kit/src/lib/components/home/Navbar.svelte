<script lang="ts">
import {page} from '$app/stores'
import {Github, Menu, X, Search} from 'lucide-svelte'

let menuOpen = false

$: currentPath = $page.url.pathname
$: isTokensActive = currentPath.startsWith('/tokens')

const navItems = [
  {href: '/docs', label: 'Docs'},
  {href: '/syntax', label: 'Syntax'},
  {href: '/rules', label: 'Rules'},
  {href: '/tokens', label: 'Tokens'},
  {href: '/components', label: 'Components'},
  {href: '/design-system', label: 'Design System'},
  {href: '/playground', label: 'Playground'},
  {href: '/showroom', label: 'Showroom'}
]
</script>

<nav class="fixed! layer(top) z(50) bg(white) border-b(1/neutral-200)">
  <div class="hbox(middle) gap(auto) h(60) px(24) lg:px(32) max-w(1400px) mx(auto)">
    <!-- Logo -->
    <a href="/" class="hbox(middle) gap(8) c(neutral-900) hover:c(neutral-700) transition">
      <svg viewBox="0 0 32 32" class="size(28) c(primary)" fill="currentColor">
        <rect x="4" y="4" width="10" height="10" rx="2"/>
        <rect x="18" y="4" width="10" height="10" rx="2"/>
        <rect x="4" y="18" width="10" height="10" rx="2"/>
        <rect x="18" y="18" width="10" height="10" rx="2"/>
      </svg>
      <span class="title(lg) bold(600) c(neutral-900)">AdorableCSS</span>
    </a>

    <!-- Desktop Navigation -->
    <div class="hbox(middle) gap(40) ..lg:hidden">
      <!-- Nav Links -->
      <div class="hbox gap(32)">
        {#each navItems as item}
          <a
            href={item.href}
            class="body(sm) c(neutral-600) hover:c(neutral-900) transition py(4)"
            class:c(neutral-900)={item.href === '/tokens' ? isTokensActive : currentPath.startsWith(item.href)}
            class:bold(600)={item.href === '/tokens' ? isTokensActive : currentPath.startsWith(item.href)}
          >
            {item.label}
          </a>
        {/each}
      </div>

      <!-- Actions -->
      <div class="hbox(middle) gap(20)">
        <button class="p(8) hover:bg(neutral-100) r(8) transition">
          <Search size="20" class="c(neutral-600)"/>
        </button>
        <a
          href="https://github.com/adorablecss/adorable-css"
          target="_blank"
          rel="noopener"
          class="p(8) hover:bg(neutral-100) r(8) transition"
        >
          <Github size="20" class="c(neutral-600)"/>
        </a>
        <div class="w(1px) h(24) bg(neutral-200)"></div>
        <a href="/packages/homepage-kit/src/routes/(layout)/docs/getting-started" class="px(16) py(8) r(8) bg(neutral-900) c(white) label(button) hover:bg(neutral-800) transition">
          Get Started
        </a>
      </div>
    </div>

    <!-- Mobile Menu Button -->
    <button
      class="p(8) hover:bg(neutral-100) r(8) transition lg:hidden"
      on:click={() => menuOpen = !menuOpen}
    >
      {#if menuOpen}
        <X size="20" class="c(neutral-600)" />
      {:else}
        <Menu size="20" class="c(neutral-600)" />
      {/if}
    </button>
  </div>

  <!-- Mobile Navigation -->
  {#if menuOpen}
    <div class="absolute top(60) left(0) right(0) bg(white) border-b(1/neutral-200) shadow(lg) lg:hidden">
      <div class="vbox p(16)">
        {#each navItems as item}
          <a
            href={item.href}
            class="px(16) py(12) body(sm) c(neutral-600) hover:bg(neutral-50) hover:c(neutral-900) r(8) transition"
            class:c(neutral-900)={item.href === '/tokens' ? isTokensActive : currentPath.startsWith(item.href)}
            class:bold(600)={item.href === '/tokens' ? isTokensActive : currentPath.startsWith(item.href)}
            on:click={() => menuOpen = false}
          >
            {item.label}
          </a>
        {/each}
        <div class="mt(16) pt(16) border-t(1/neutral-100)">
          <a href="/packages/homepage-kit/src/routes/(layout)/docs/getting-started" class="block w(full) px(16) py(8) r(8) bg(neutral-900) c(white) text(center) label(button) hover:bg(neutral-800) transition">
            Get Started
          </a>
        </div>
      </div>
    </div>
  {/if}
</nav>