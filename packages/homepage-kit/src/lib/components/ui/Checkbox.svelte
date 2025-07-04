<script lang="ts">
  export let checked = false
  
  $: checkboxClasses = checked 
    ? 'size(18) bd(2/solid/primary) r(4) bg(primary) transition' 
    : 'size(18) bd(2/solid/gray-300) r(4) bg(white) transition'
</script>

<label class="hbox(middle) gap(8) cursor(pointer)">
  <div class="relative">
    <input type="checkbox" bind:checked class="sr-only" />
    <div class={checkboxClasses}>
      {#if checked}
        <svg class="absolute inset(0) w(full) h(full) p(2)" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      {/if}
    </div>
  </div>
  <span class="font(sm) c(gray-900)">
    <slot />
  </span>
</label>