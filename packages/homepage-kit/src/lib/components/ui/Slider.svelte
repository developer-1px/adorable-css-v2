<script lang="ts">
  export let value = 50
</script>

<div class="relative w(full) h(6)">
  <div class="absolute inset-y(0) w(full) h(2) bg(gray-200) r(full) top(50%) translate-y(-1/2)"></div>
  <div class="absolute inset-y(0) h(2) bg(primary) r(full) top(50%) translate-y(-1/2)" style="width: {value}%"></div>
  <div class="absolute size(20) bg(primary) r(full) shadow(md) top(50%) translate-y(-1/2) cursor(grab)" style="left: {value}%"></div>
</div>