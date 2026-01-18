<script lang="ts">
  export let checked = false
  
  $: buttonClasses = checked 
    ? 'relative hbox h(2xl) w(44px) r(full) bg(primary) transition cursor(pointer)' 
    : 'relative hbox h(2xl) w(44px) r(full) bg(gray-200) transition cursor(pointer)'
    
  $: knobClasses = checked
    ? 'absolute top(2px) left(22px) size(20) r(full) bg(white) shadow(sm) transition'
    : 'absolute top(2px) left(2px) size(20) r(full) bg(white) shadow(sm) transition'
</script>

<button 
  class={buttonClasses}
  on:click={() => checked = !checked}
  role="switch"
  aria-checked={checked}
>
  <span class={knobClasses}></span>
</button>