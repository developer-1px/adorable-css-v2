<script lang="ts">
  export let checked = false
  
  $: buttonClasses = checked 
    ? 'relative hbox h(24) w(44) r(full) bg(primary) transition cursor(pointer)' 
    : 'relative hbox h(24) w(44) r(full) bg(gray-200) transition cursor(pointer)'
    
  $: knobClasses = checked
    ? 'absolute top(2) left(22) size(20) r(full) bg(white) shadow(sm) transition'
    : 'absolute top(2) left(2) size(20) r(full) bg(white) shadow(sm) transition'
</script>

<button 
  class={buttonClasses}
  on:click={() => checked = !checked}
  role="switch"
  aria-checked={checked}
>
  <span class={knobClasses}></span>
</button>