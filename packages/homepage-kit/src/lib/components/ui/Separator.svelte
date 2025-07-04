<script lang="ts">
  export let orientation: 'horizontal' | 'vertical' = 'horizontal'
  
  $: classes = orientation === 'horizontal' 
    ? 'w(full) h(1) bg(gray-200)' 
    : 'h(full) w(1) bg(gray-200)'
</script>

<div class={classes}></div>