<script lang="ts">
</script>

<div class="relative inline-block">
  <slot name="trigger" />
  <div class="absolute bottom(full) left(1/2) translate-x(-1/2) mb(8) px(12) py(8) bg(gray-900) c(white) r(md) caption(xs) whitespace-nowrap opacity(0) hover:opacity(100) transition pointer-events-none">
    <slot name="content" />
    <div class="absolute top(full) left(1/2) translate-x(-1/2) w(0) h(0) border-t(6/solid/gray-900) border-x(6/solid/transparent)"></div>
  </div>
</div>