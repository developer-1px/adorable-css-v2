<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { ChevronLeft, ChevronRight, Home } from 'lucide-svelte';

  let mounted = false;
  let isNavigating = false;

  // Showroom pages configuration
  const showrooms = [
    { path: '/showroom', label: '1', title: 'Showroom 1' },
    { path: '/showroom2', label: '2', title: 'Showroom 2' },
    { path: '/showroom3', label: '3', title: 'Showroom 3' },
    { path: '/showroom4', label: '4', title: 'Showroom 4' },
    { path: '/showroom5', label: '5', title: 'Showroom 5' }
  ];

  // Get current showroom index
  $: currentIndex = showrooms.findIndex(room => $page.url.pathname === room.path);
  $: currentShowroom = showrooms[currentIndex];

  async function navigateToShowroom(index) {
    if (index >= 0 && index < showrooms.length && !isNavigating) {
      isNavigating = true;
      try {
        await goto(showrooms[index].path);
      } finally {
        setTimeout(() => {
          isNavigating = false;
        }, 300);
      }
    }
  }

  function handleKeydown(event) {
    if (!mounted) return;
    
    // Don't intercept keys when user is typing in an input
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.contentEditable === 'true') {
      return;
    }
    
    switch(event.key) {
      case 'Escape':
        event.preventDefault();
        goto('/');
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (currentIndex > 0) {
          navigateToShowroom(currentIndex - 1);
        }
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (currentIndex < showrooms.length - 1) {
          navigateToShowroom(currentIndex + 1);
        }
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
        event.preventDefault();
        {
          const index = parseInt(event.key) - 1;
          if (index >= 0 && index < showrooms.length) {
            navigateToShowroom(index);
          }
        }
        break;
    }
  }

  onMount(() => {
    mounted = true;
    
    // Add keyboard event listener
    window.addEventListener('keydown', handleKeydown);
    
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

<svelte:head>
  {#if currentShowroom}
    <title>{currentShowroom.title}</title>
  {/if}
</svelte:head>

<!-- Main Content -->
<slot />

<!-- Fixed Showroom Navigation -->
<nav class="fixed bottom(lg) left(lg) z(50) {isNavigating ? 'animate-pulse' : ''}">
  <div class="hbox gap(sm) p(md) bg(white) r(xl) border(2/gray-900) shadow(2xl) backdrop-blur(md) 
              transition-all duration(300) {isNavigating ? 'scale(1.05)' : ''}">
    <!-- Home Button -->
    <a
      href="/packages/homepage-kit/static"
      class="size(32px) r(md) border(1/gray-300) bg(white) hover:bg(gray-50) 
             transition hbox(center/middle)"
      title="Home (ESC)"
    >
      <Home size="16" class="c(gray-600)" />
    </a>

    <!-- Previous Button -->
    <button 
      class="size(32px) r(md) border(1/gray-300) bg(white) hover:bg(gray-50) 
             transition hbox(center/middle) {currentIndex === 0 ? 'opacity(50) cursor(not-allowed)' : ''}"
      on:click={() => navigateToShowroom(currentIndex - 1)}
      disabled={currentIndex === 0}
      title="Previous showroom (←)"
    >
      <ChevronLeft size="16" class="c(gray-600)" />
    </button>

    <!-- Showroom Numbers -->
    <div class="hbox gap(xs)">
      {#each showrooms as room, index (room.path)}
        <button
          class="size(32px) r(md) transition hbox(center/middle) font(sm) font(bold)
                 {index === currentIndex 
                   ? 'bg(gray-900) c(white)' 
                   : 'bg(gray-100) c(gray-600) hover:bg(gray-200)'}"
          on:click={() => navigateToShowroom(index)}
          title={room.title}
        >
          {room.label}
        </button>
      {/each}
    </div>

    <!-- Next Button -->
    <button 
      class="size(32px) r(md) border(1/gray-300) bg(white) hover:bg(gray-50) 
             transition hbox(center/middle) {currentIndex === showrooms.length - 1 ? 'opacity(50) cursor(not-allowed)' : ''}"
      on:click={() => navigateToShowroom(currentIndex + 1)}
      disabled={currentIndex === showrooms.length - 1}
      title="Next showroom (→)"
    >
      <ChevronRight size="16" class="c(gray-600)" />
    </button>
  </div>

  <!-- Keyboard Hint -->
  <div class="mt(sm) text(center)">
    <div class="inline-block px(sm) py(xs) bg(black.8) c(white) r(sm) font(xs) backdrop-blur(md)">
      ESC: Home | ← → or 1,2,3,4,5 to navigate
    </div>
  </div>
</nav>