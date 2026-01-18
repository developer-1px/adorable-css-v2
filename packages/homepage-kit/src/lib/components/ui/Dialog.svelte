<script lang="ts">
  export let open = false
</script>

{#if open}
  <div class="fixed inset(0) z(overlay) bg(black.5) backdrop-blur(sm) animate(fadeIn)">
    <div class="fixed center bg(white) r(lg) shadow(xl) p(2xl) max-w(480px) w(90vw) animate(scaleIn)">
      <slot />
    </div>
  </div>
{/if}