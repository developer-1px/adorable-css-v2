<script lang="ts">
</script>

<div class="w(320) bg(white) r(lg) shadow(lg) bd(1/solid/gray-200) p(16)">
  <div class="hbox(between+middle) mb(16)">
    <button class="size(32) r(md) hover:bg(gray-100) hbox(pack) transition">←</button>
    <h3 class="font(md/medium)">December 2023</h3>
    <button class="size(32) r(md) hover:bg(gray-100) hbox(pack) transition">→</button>
  </div>
  <div class="grid(7x5) gap(4) text-center">
    {#each ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as day}
      <div class="font(xs/medium) c(gray-500)">{day}</div>
    {/each}
    {#each Array(31) as _, i}
      <button class="size(36) r(md) font(sm) transition {i === 14 ? 'bg(primary) c(white) hover:bg(primary-600)' : 'hover:bg(gray-100)'}">
        {i + 1}
      </button>
    {/each}
  </div>
</div>