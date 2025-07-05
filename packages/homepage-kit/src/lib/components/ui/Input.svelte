<script lang="ts">
  export let variant: 'default' | 'error' = 'default'
  export let placeholder = 'Enter text...'
  export let value = ''
  
  const variantClasses = {
    default: 'b(gray-300) focus:b(primary) focus:outline(none) focus:ring(2/primary/0.2)',
    error: 'b(red) focus:b(red) focus:outline(none) focus:ring(2/red/0.2)'
  }
  
  $: classes = `w(full) px(12) py(8) r(md) body(sm) transition ${variantClasses[variant]}`
</script>

<input 
  type="text" 
  class={classes}
  {placeholder}
  bind:value
  {...$$restProps}
/>