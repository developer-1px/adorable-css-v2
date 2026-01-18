<script lang="ts">
  export let orientation: 'horizontal' | 'vertical' = 'horizontal'
  
  $: classes = orientation === 'horizontal' 
    ? 'w(full) h(1px) bg(gray-200)' 
    : 'h(full) w(1px) bg(gray-200)'
</script>

<div class={classes}></div>