<script lang="ts">
  export let variant: 'default' | 'success' | 'error' | 'warning' = 'default'
</script>

<div class="hbox(middle) gap(12) min-w(320) p(16) r(lg) shadow(lg) bg(white) b(gray-200) animate(slideIn)">
  {#if variant === 'success'}
    <div class="size(20) r(full) bg(green) hbox(pack)">
      <svg class="size(12)" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  {:else if variant === 'error'}
    <div class="size(20) r(full) bg(red) hbox(pack)">
      <svg class="size(12)" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </div>
  {:else if variant === 'warning'}
    <div class="size(20) r(full) bg(yellow) hbox(pack)">
      <span class="c(white) font(sm/bold)">!</span>
    </div>
  {/if}
  <div class="vbox gap(4) flex-1">
    <slot />
  </div>
</div>