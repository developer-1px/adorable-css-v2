<script lang="ts">
</script>

<div class="relative">
  <slot name="trigger" />
  <div class="absolute top(full) right(0) mt(sm) min-w(180px) bg(white) r(lg) shadow(lg) b(gray-200) p(xs) vbox gap(2px)">
    <slot name="content" />
  </div>
</div>