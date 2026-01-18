<script lang="ts">
</script>

<div class="w(320px) bg(white) r(lg) shadow(lg) b(gray-200) p(lg)">
  <div class="hbox(between+middle) mb(lg)">
    <button class="size(32) r(md) hover:bg(gray-100) hbox(pack) transition">←</button>
    <h3 class="font(md/medium)">December 2023</h3>
    <button class="size(32) r(md) hover:bg(gray-100) hbox(pack) transition">→</button>
  </div>
  <div class="grid(7x5) gap(xs) text-center">
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