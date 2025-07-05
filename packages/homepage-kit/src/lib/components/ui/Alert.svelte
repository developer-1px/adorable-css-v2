<script lang="ts">
  export let variant: 'default' | 'destructive' | 'warning' = 'default'
  
  const variantClasses = {
    default: 'bg(mute-50) b(mute-200) c(mute-900)',
    destructive: 'bg(error-50) b(error-200) c(error-900)',
    warning: 'bg(warning-50) b(warning-200) c(warning-900)'
  }
  
  $: classes = `p(16) r(lg) ${variantClasses[variant]}`
</script>

<div class={classes}>
  <slot />
</div>