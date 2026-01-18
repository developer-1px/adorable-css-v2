<script lang="ts">
  export let checked = false
  export let name = ''
  export let value = ''
  
  $: radioClasses = checked 
    ? 'size(18) bd(2/solid/primary) r(full) bg(white) transition' 
    : 'size(18) bd(2/solid/gray-300) r(full) bg(white) transition'
</script>

<label class="hbox(middle) gap(sm) cursor(pointer)">
  <div class="relative">
    <input type="radio" bind:group={value} {name} {checked} class="sr-only" />
    <div class={radioClasses}>
      {#if checked}
        <div class="absolute inset(3) bg(primary) r(full)"></div>
      {/if}
    </div>
  </div>
  <span class="font(sm) c(gray-900)">
    <slot />
  </span>
</label>