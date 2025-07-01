<script lang="ts">
import {page} from '$app/stores'
import {Github, Menu, X, Search} from 'lucide-svelte'

let menuOpen = false

$: currentPath = $page.url.pathname
$: isTokensActive = currentPath.startsWith('/tokens')

const navItems = [
  {href: '/docs', label: 'Docs'},
  {href: '/rules', label: 'Rules'},
  {href: '/tokens', label: 'Tokens'},
  {href: '/components', label: 'Components'},
  {href: '/playground', label: 'Playground'}
]
</script>

<nav class="fixed! layer(top) z(50) bg(white) border-b(1/gray-200)">
  <div class="hbox(between) h(60) px(24) lg:px(32) max-w(1400px) mx(auto)">
    <!-- Logo -->
    <a href="/" class="hbox(middle) gap(8) c(gray-900) hover:c(gray-700) transition">
      <svg viewBox="0 0 32 32" class="size(28) c(purple-600)" fill="currentColor">
        <rect x="4" y="4" width="10" height="10" rx="2"/>
        <rect x="18" y="4" width="10" height="10" rx="2"/>
        <rect x="4" y="18" width="10" height="10" rx="2"/>
        <rect x="18" y="18" width="10" height="10" rx="2"/>
      </svg>
      <span class="font(lg) bold(600) c(gray-900)">AdorableCSS</span>
    </a>

    <!-- Desktop Navigation -->
    <div class="hbox(middle) gap(40) ..lg:hidden">
      <!-- Nav Links -->
      <div class="hbox gap(32)">
        {#each navItems as item}
          <a
            href={item.href}
            class="font(sm/1.5) c(gray-600) hover:c(gray-900) transition py(4)"
            class:c(gray-900)={item.href === '/tokens' ? isTokensActive : currentPath.startsWith(item.href)}
            class:bold(600)={item.href === '/tokens' ? isTokensActive : currentPath.startsWith(item.href)}
          >
            {item.label}
          </a>
        {/each}
      </div>

      <!-- Actions -->
      <div class="hbox(middle) gap(20)">
        <button class="p(8) hover:bg(gray-100) r(8) transition">
          <Search size="20" class="c(gray-600)"/>
        </button>
        <a
          href="https://github.com/adorablecss/adorable-css"
          target="_blank"
          rel="noopener"
          class="p(8) hover:bg(gray-100) r(8) transition"
        >
          <Github size="20" class="c(gray-600)"/>
        </a>
        <div class="w(1px) h(24) bg(gray-200)"></div>
        <a href="/docs/getting-started" class="px(16) py(8) r(8) bg(gray-900) c(white) font(sm/1.5) hover:bg(gray-800) transition">
          Get Started
        </a>
      </div>
    </div>

    <!-- Mobile Menu Button -->
    <button
      class="p(8) hover:bg(gray-100) r(8) transition lg:hidden"
      on:click={() => menuOpen = !menuOpen}
    >
      {#if menuOpen}
        <X size="20" class="c(gray-600)" />
      {:else}
        <Menu size="20" class="c(gray-600)" />
      {/if}
    </button>
  </div>

  <!-- Mobile Navigation -->
  {#if menuOpen}
    <div class="absolute top(60) left(0) right(0) bg(white) border-b(1/gray-200) shadow(lg) lg:hidden">
      <div class="vbox p(16)">
        {#each navItems as item}
          <a
            href={item.href}
            class="px(16) py(12) font(sm/1.5) c(gray-600) hover:bg(gray-50) hover:c(gray-900) r(8) transition"
            class:c(gray-900)={item.href === '/tokens' ? isTokensActive : currentPath.startsWith(item.href)}
            class:bold(600)={item.href === '/tokens' ? isTokensActive : currentPath.startsWith(item.href)}
            on:click={() => menuOpen = false}
          >
            {item.label}
          </a>
        {/each}
        <div class="mt(16) pt(16) border-t(1/gray-100)">
          <a href="/docs/getting-started" class="block w(full) px(16) py(8) r(8) bg(gray-900) c(white) text(center) font(sm/1.5) hover:bg(gray-800) transition">
            Get Started
          </a>
        </div>
      </div>
    </div>
  {/if}
</nav>