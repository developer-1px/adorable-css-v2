<script lang="ts">
import {page} from '$app/stores'
import {Github, Menu, X, Search} from 'lucide-svelte'

let menuOpen = false

$: currentPath = $page.url.pathname
$: isTokensActive = currentPath.startsWith('/tokens')
$: isFoundationActive = currentPath.startsWith('/foundation')

const navItems = [
  {href: '/docs', label: 'Docs'},
  {href: '/reference', label: 'Reference'},
  {href: '/playground', label: 'Playground'},
]
</script>

<nav class="sticky top(0) z(100) w(full) bg(white/80) backdrop-blur(20px) border-b(1/gray-200/50)">
  <div class="hbox(between) h(64) px(xl) max-w(1400px) mx(auto)">
    <!-- Logo -->
    <a href="/" class="hbox(middle) gap(sm) c(gray-900) hover:c(black) transition text(none)">
      <div class="size(32) bg(indigo-600) r(8px) hbox(center)">
        <span class="c(white) font(bold) text(lg)">A</span>
      </div>
      <span class="text(lg) bold c(gray-900)">AdorableCSS</span>
    </a>

    <!-- Desktop Navigation -->
    <div class="hbox(middle) gap(xl) ..lg:hidden">
      <!-- Nav Links -->
      <div class="hbox(middle) gap(lg)">
        {#each navItems as item}
          <a
            href={item.href}
            class="text(sm) font(medium) c(gray-600) hover:c(gray-900) transition text(none)"
            class:selected={currentPath.startsWith(item.href)}
          >
            {item.label}
          </a>
        {/each}
      </div>

      <!-- Actions -->
      <div class="hbox(middle) gap(md)">
        <div class="w(1px) h(20px) bg(gray-200)"></div>
        
        <a
          href="https://github.com/adorablecss/adorable-css"
          target="_blank"
          rel="noopener"
          class="size(36) hbox(center) hover:bg(gray-100) r(full) c(gray-500) hover:c(gray-900) transition"
        >
          <Github size="20" />
        </a>

        <a 
          href="/docs/getting-started" 
          class="px(lg) py(2) r(full) bg(indigo-600) c(white) text(sm) font(bold) hover:bg(indigo-700) hover:scale(1.05) transition text(none)"
        >
          Get Started
        </a>
      </div>
    </div>

    <!-- Mobile Menu Button -->
    <button
      class="size(40) hbox(center) hover:bg(gray-100) r(md) transition lg:hidden c(gray-600)"
      on:click={() => menuOpen = !menuOpen}
    >
      {#if menuOpen}
        <X size="24" />
      {:else}
        <Menu size="24" />
      {/if}
    </button>
  </div>

  <!-- Mobile Navigation -->
  {#if menuOpen}
    <div class="absolute top(full) left(0) right(0) bg(white) border-b(1/gray-200) shadow(xl) lg:hidden p(xl) vbox gap(lg)">
      {#each navItems as item}
        <a
          href={item.href}
          class="text(lg) font(medium) c(gray-600) hover:c(gray-900) text(none)"
          on:click={() => menuOpen = false}
        >
          {item.label}
        </a>
      {/each}
      <div class="w(full) h(1px) bg(gray-100)"></div>
       <a 
          href="/docs/getting-started" 
          class="w(full) py(3) r(lg) bg(indigo-600) c(white) text(center) font(bold)"
        >
          Get Started
        </a>
    </div>
  {/if}
</nav>

<style>
  .selected {
    color: var(--c-indigo-600);
  }
</style>