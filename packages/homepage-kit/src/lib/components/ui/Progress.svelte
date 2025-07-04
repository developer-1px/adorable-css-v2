<script lang="ts">
  export let value = 0
  export let max = 100
</script>

<div class="w(full) h(8) bg(gray-200) r(full) clip">
  <div 
    class="h(full) bg(primary) transition-all duration(300)"
    style="width: {(value / max) * 100}%"
  ></div>
</div>