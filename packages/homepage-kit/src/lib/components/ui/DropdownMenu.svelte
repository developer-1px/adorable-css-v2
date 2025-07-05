<script lang="ts">
</script>

<div class="relative">
  <slot name="trigger" />
  <div class="absolute top(full) right(0) mt(8) min-w(180) bg(white) r(lg) shadow(lg) b(gray-200) p(4) vbox gap(2)">
    <slot name="content" />
  </div>
</div>