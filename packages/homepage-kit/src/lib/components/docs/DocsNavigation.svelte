<script lang="ts">
  import { page } from '$app/stores';
  import { getPageNavigation } from '$lib/docs/navigation';
  
  $: navigation = getPageNavigation($page.url.pathname);
</script>

{#if navigation.prev || navigation.next}
  <nav class="hbox(between) gap(xl) my(3xl) pt(2xl) border-t(1/gray-200)">
    {#if navigation.prev}
      <a 
        href={navigation.prev.path} 
        class="group vbox gap(sm) flex(1) p(lg) r(lg) hover:bg(gray-50) transition"
      >
        <span class="font(sm) c(gray-500)">이전</span>
        <div class="hbox gap(sm) items(center)">
          <svg class="size(20) c(gray-400) group-hover:translate-x(-4) transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span class="font(lg) bold c(gray-900) group-hover:c(primary) transition">
            {navigation.prev.title}
          </span>
        </div>
      </a>
    {:else}
      <div class="flex(1)"></div>
    {/if}
    
    {#if navigation.next}
      <a 
        href={navigation.next.path} 
        class="group vbox gap(sm) flex(1) p(lg) r(lg) hover:bg(gray-50) transition text(right)"
      >
        <span class="font(sm) c(gray-500)">다음</span>
        <div class="hbox gap(sm) items(center) justify(end)">
          <span class="font(lg) bold c(gray-900) group-hover:c(primary) transition">
            {navigation.next.title}
          </span>
          <svg class="size(20) c(gray-400) group-hover:translate-x(4) transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </a>
    {:else}
      <div class="flex(1)"></div>
    {/if}
  </nav>
{/if}