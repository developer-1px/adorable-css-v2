<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  const showrooms = [
    { path: '/showroom', title: 'Modern SaaS Landing' },
    { path: '/showroom2', title: 'Dashboard & Components' },
    { path: '/showroom3', title: 'E-Commerce Showcase' },
    { path: '/showroom4', title: 'Blog & Content' },
    { path: '/showroom5', title: 'Creative Portfolio' },
    { path: '/showroom6', title: 'Netflix Clone Interface' }
  ];

  let hoveredIndex: number | null = null;

  function handleKeydown(event: KeyboardEvent) {
    if (event.target instanceof HTMLInputElement || 
        event.target instanceof HTMLTextAreaElement) {
      return;
    }

    const key = event.key;
    if (key >= '1' && key <= '6') {
      event.preventDefault();
      const index = parseInt(key) - 1;
      if (index >= 0 && index < showrooms.length) {
        goto(showrooms[index].path);
      }
    } else if (key === 'Escape') {
      event.preventDefault();
      goto('/');
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

<div class="min-h(screen) bg(black) c(white) relative overflow(hidden)">
  <!-- Animated gradient background -->
  <div class="absolute inset(0)">
    <div class="absolute w(200%) h(200%) top(-50%) left(-50%) animate(gradient-shift)">
      <div class="absolute inset(0) bg(radial-gradient/primary.2..transparent_50%) opacity(0.5)"></div>
      <div class="absolute inset(0) bg(radial-gradient/purple.2..transparent_50%) translate(50%,50%) opacity(0.5)"></div>
    </div>
  </div>

  <!-- Main content -->
  <div class="relative z(10) min-h(screen) vbox(middle/center)">
    <!-- Title -->
    <h1 class="display(hero) font(black) mb(6xl) relative">
      <span class="relative z(10)">SHOWROOM</span>
      <div class="absolute inset(0) bg(gradient-to-r) from(primary) via(purple) to(pink) opacity(0.3) blur(2xl)"></div>
    </h1>

    <!-- Number grid -->
    <div class="hbox gap(4xl)">
      {#each showrooms as room, index}
        <a
          href={room.path}
          class="group relative cursor(pointer)"
          on:mouseenter={() => hoveredIndex = index}
          on:mouseleave={() => hoveredIndex = null}
        >
          <!-- Number -->
          <div class="relative">
            <span class="display(hero) font(black) transition-all duration(300)
                         {hoveredIndex === index ? 'scale(120%) c(primary)' : 'c(white)'}">
              {index + 1}
            </span>
            
            <!-- Glow effect on hover -->
            {#if hoveredIndex === index}
              <div class="absolute inset(0) bg(primary) opacity(0.2) blur(3xl) animate(pulse)"></div>
            {/if}
          </div>

          <!-- Title (appears on hover) -->
          <div class="absolute top(120%) left(50%) translate(-50%,0) whitespace-nowrap
                      transition-all duration(300) pointer-events(none)
                      {hoveredIndex === index ? 'opacity(100) translate(-50%,0)' : 'opacity(0) translate(-50%,10px)'}">
            <p class="text(sm) font(medium) c(gray-400)">{room.title}</p>
          </div>
        </a>
      {/each}
    </div>

    <!-- Keyboard hint -->
    <div class="absolute bottom(2xl) left(50%) translate(-50%,0)">
      <p class="text(xs) c(gray-600) text(center)">
        Press <kbd class="px(xs) py(1) bg(white.1) r(xs) font(mono)">1</kbd> - 
        <kbd class="px(xs) py(1) bg(white.1) r(xs) font(mono)">6</kbd> to navigate
      </p>
    </div>
  </div>
</div>

<style>
  @keyframes gradient-shift {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(-10%, 10%) rotate(90deg); }
    50% { transform: translate(10%, -10%) rotate(180deg); }
    75% { transform: translate(-10%, -10%) rotate(270deg); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.2; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(1.2); }
  }

  :global(.animate\(gradient-shift\)) {
    animation: gradient-shift 20s ease-in-out infinite;
  }

  :global(.animate\(pulse\)) {
    animation: pulse 2s ease-in-out infinite;
  }
</style>