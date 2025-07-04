<script lang="ts">
  export let open = false
  export let side: 'left' | 'right' = 'right'
</script>

{#if open}
  <div class="fixed inset(0) z(overlay)">
    <div class="absolute inset(0) bg(black.5) backdrop-blur(sm) animate(fadeIn)"></div>
    <div class="absolute {side === 'right' ? 'right(0)' : 'left(0)'} inset-y(0) w(400) bg(white) shadow(xl) animate(slideIn{side === 'right' ? 'Right' : 'Left'})">
      <slot />
    </div>
  </div>
{/if}