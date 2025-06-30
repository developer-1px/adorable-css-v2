<script lang="ts">
import {page} from '$app/stores'
import {Github, Menu, X} from 'lucide-svelte'

let menuOpen = false

$: currentPath = $page.url.pathname
$: isTokensActive = currentPath.startsWith('/tokens')

const navItems = [
  {href: '/', label: 'Home'},
  {href: '/docs', label: 'Docs'},
  {href: '/rules', label: 'Rules'},
  {href: '/tokens', label: 'Tokens'},
  {href: '/components', label: 'Components'},
  {href: '/showcase', label: 'Showcase'},
  {href: '/playground', label: 'Playground'}
]
</script>

<nav class="fixed! layer(top) z(50) bg(white) elevation(1)">
  <div class="hbox(between) h(64) px(24) max-w(7xl) mx(auto)">
    <!-- Logo -->
    <a href="/" class="hbox(middle) gap(12) c(gray-900) hover:c(purple-600) transition group">
      <div class="size(36) r(lg) bg(135deg/purple-500..pink-500) shadow(md/purple-500.3) group-hover:shadow(lg/purple-500.4) group-hover:rotate(180deg) transition(all/0.5s/cubic-bezier(0.68,-0.55,0.265,1.55)) relative overflow(hidden)">
        <!-- Shine effect -->
        <div class="absolute layer(fill) bg(45deg/white.3..transparent) translate-x(-100%) group-hover:translate-x(100%) transition(transform/0.6s)"></div>
      </div>
      <span class="font(xl) bold bg(clip-text) c(90deg/purple-600..pink-600)">AdorableCSS</span>
    </a>

    <!-- Desktop Navigation -->
    <div class="hbox(middle) gap(32) ..md:hidden">
      <!-- Nav Links -->
      <div class="hbox gap(24)">
        {#each navItems as item}
          <a
            href={item.href}
            class="font(sm) bold(medium) c(gray-600) hover:c(purple-600) transition relative py(8)"
            class:c(purple-600)={item.href === '/tokens' ? isTokensActive : currentPath === item.href}
          >
            {item.label}
            {#if item.href === '/tokens' ? isTokensActive : currentPath === item.href}
              <span class="absolute bottom(0) left(0) right(0) h(2) bg(purple-600) r(full) animate(slide-in)"></span>
            {/if}
          </a>
        {/each}
      </div>

      <!-- Actions -->
      <div class="hbox(middle) gap(16)">
        <a
          href="https://github.com/adorablecss/adorable-css"
          target="_blank"
          rel="noopener"
          class="size(40) r(lg) hbox(center) bg(gray-100) hover:bg(gray-200) hover:shadow(md) transition group"
        >
          <Github size="20" class="c(gray-700) group-hover:c(gray-900) transition"/>
        </a>
        <a href="/docs/getting-started" class="px(20) py(10) r(lg) bg(purple-500..pink-500) c(white) font(sm) bold(medium) shadow(md) hover:shadow(lg) hover:translate-y(-1) active:translate-y(0) transition relative overflow(hidden) group">
          <span class="relative z(10)">Get Started</span>
          <span class="absolute layer(fill) bg(white.2) translate-y(100%) group-hover:translate-y(0) transition(transform/0.3s)"></span>
        </a>
      </div>
    </div>

    <!-- Mobile Menu Button -->
    <button
      class="size(40) r(lg) hbox(center) bg(purple-100) hover:bg(purple-200) transition md:hidden relative"
      on:click={() => menuOpen = !menuOpen}
    >
      <div class="relative w(24) h(24)">
        <Menu size="24" class="absolute layer(center) c(purple-700) transition-opacity {menuOpen ? 'opacity(0)' : 'opacity(100)'}" />
        <X size="24" class="absolute layer(center) c(purple-700) transition-opacity {menuOpen ? 'opacity(100)' : 'opacity(0)'}" />
      </div>
    </button>
  </div>

  <!-- Mobile Navigation -->
  {#if menuOpen}
    <div class="vbox gap(4) p(24) glass(16/0.95) animate(slide-down) md:hidden">
      {#each navItems as item}
        <a
          href={item.href}
          class="block px(16) py(12) r(lg) font(sm) bold(medium) c(gray-700) hover:bg(purple-50) hover:c(purple-700) transition relative"
          class:bg(purple-100)={item.href === '/tokens' ? isTokensActive : currentPath === item.href}
          class:c(purple-700)={item.href === '/tokens' ? isTokensActive : currentPath === item.href}
          on:click={() => menuOpen = false}
        >
          {item.label}
          {#if item.href === '/tokens' ? isTokensActive : currentPath === item.href}
            <span class="absolute left(4) top(50%) h(16) w(3) bg(purple-600) r(full) translate-y(-50%)"></span>
          {/if}
        </a>
      {/each}
      <div class="mt(16) pt(16) border-t(1/purple-200.3)">
        <a href="/docs/getting-started" class="block w(full) px(20) py(12) r(lg) bg(purple-500..pink-500) c(white) text(center) font(sm) bold(medium) shadow(md) hover:shadow(lg) transition">
          Get Started
        </a>
      </div>
    </div>
  {/if}
</nav>