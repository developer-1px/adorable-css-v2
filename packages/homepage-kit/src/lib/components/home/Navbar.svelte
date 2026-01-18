<script lang="ts">
import {page} from '$app/stores'
import {Github, Menu, X} from 'lucide-svelte'
import Logo from '$lib/components/ui/Logo.svelte'

let menuOpen = false

$: currentPath = $page.url.pathname

const navItems = [
  {href: '/docs', label: 'Docs'},
  {href: '/reference', label: 'Reference'},
  {href: '/design-system', label: 'Design System'},
  {href: '/showcase/gitbook', label: 'Showcase'},
  {href: '/playground', label: 'Playground'},
]
</script>

<nav class="sticky top(0) z(100) w(full)">
  <!-- Glass Background -->
  <div class="absolute inset(0) bg(white/80) backdrop-blur(20px) border-b(1/gray-200/50)"></div>

  <div class="relative hbox(between) h(72px) px(xl) max-w(1440px) mx(auto)">
    <!-- Logo & Brand -->
    <a href="/" class="hbox(middle) gap(sm) text(none) group">
      <div class="relative transition-transform duration(300) group-hover:scale(1.1) group-hover:rotate(-5deg)">
        <Logo size={36} filled />
      </div>
      <span class="text(xl) font(800) tracking(tight) c(gray-900)">
        Adorable<span class="c(indigo-600)">CSS</span>
      </span>
    </a>

    <!-- Desktop Navigation -->
    <div class="hbox(middle) gap(lg) ..lg:hidden">
      <!-- Nav Links -->
      <div class="hbox(middle) bg(gray-100/50) p(4px) r(full) border(1/gray-200/50)">
        {#each navItems as item}
          <a
            href={item.href}
            class="px(lg) py(6px) r(full) text(sm) font(medium) transition-all duration(200) text(none)
                   {currentPath.startsWith(item.href) 
                     ? 'bg(white) c(indigo-600) shadow(sm) font(bold)' 
                     : 'c(gray-600) hover:c(gray-900) hover:bg(gray-200/50)'}"
          >
            {item.label}
          </a>
        {/each}
      </div>

      <!-- Actions -->
      <div class="hbox(middle) gap(md) pl(md) border-l(1/gray-200)">
        <a
          href="https://github.com/adorablecss/adorable-css"
          target="_blank"
          class="size(40) hbox(center) r(full) c(gray-500) hover:bg(gray-100) hover:c(black) transition"
        >
          <Github size="20" />
        </a>

        <a 
          href="/docs/getting-started" 
          class="h(4xl) px(xl) hbox(center) r(full) bg(gray-900) c(white) text(sm) font(bold) hover:bg(black) hover:scale(1.05) transition shadow(lg) shadow(indigo-500/20) text(none)"
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
    <div class="absolute top(full) left(0) right(0) h(calc(100vh-72px)) bg(white) border-t(1/gray-200) lg:hidden p(2xl) vbox gap(xl) overflow-y-auto">
      {#each navItems as item}
        <a
          href={item.href}
          class="text(2xl) font(bold) c(gray-900) hover:c(indigo-600) text(none)"
          on:click={() => menuOpen = false}
        >
          {item.label}
        </a>
      {/each}
      <div class="w(full) h(1px) bg(gray-100)"></div>
      <a 
        href="/docs/getting-started" 
        class="w(full) py(lg) r(lg) bg(indigo-600) c(white) text(center) font(bold) text(lg)"
        on:click={() => menuOpen = false}
      >
        Get Started
      </a>
    </div>
  {/if}
</nav>