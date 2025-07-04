<script lang="ts">
  export let variant: 'text' | 'circular' | 'rectangular' = 'rectangular'
  export let width = '100%'
  export let height = '20px'
  
  const radiusClasses = {
    circular: 'r(full)',
    text: 'r(4)',
    rectangular: 'r(8)'
  }
  
  $: classes = `bg(gray-200) animate(pulse) ${radiusClasses[variant]}`
</script>

<div 
  class={classes}
  style="width: {width}; height: {height};"
></div>