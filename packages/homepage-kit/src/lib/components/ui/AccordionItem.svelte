<script lang="ts">
</script>

<div class="vbox w(full) bd-b(1/solid/gray-200) last:bd-b(0)">
  <button class="hbox(between+middle) w(full) px(24) py(16) bg(transparent) hover:bg(gray-50) transition">
    <span class="font(sm/medium) c(gray-900)">
      <slot name="trigger" />
    </span>
    <svg class="w(16) h(16) c(gray-500) transition rotate(0)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  </button>
  <div class="px(24) pb(16)">
    <slot name="content" />
  </div>
</div>