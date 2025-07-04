<script lang="ts">
  export let variant: 'default' | 'bordered' = 'default'
  
  $: classes = variant === 'bordered' 
    ? 'vbox w(full) gap(0) bd(1/solid/gray-200) r(lg) overflow(hidden)' 
    : 'vbox w(full) gap(0)'
</script>

<div class={classes}>
  <slot />
</div>