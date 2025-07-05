<script lang="ts">
  export let variant: 'default' | 'bordered' = 'default'
  
  $: classes = variant === 'bordered' 
    ? 'vbox w(full) gap(0) b(gray-200) r(lg) overflow(hidden)'
    : 'vbox w(full) gap(0)'
</script>

<div class={classes}>
  <slot />
</div>