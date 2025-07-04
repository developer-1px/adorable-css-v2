<script lang="ts">
  export let size: 'sm' | 'md' | 'lg' = 'md'
  
  const sizeClasses = {
    sm: 'size(32) caption(xs)',
    md: 'size(40) caption(sm)',
    lg: 'size(48) body(md)'
  }
  
  $: classes = `hbox(pack) r(full) bg(mute-200) c(mute-700) semibold select-none ${sizeClasses[size]}`
</script>

<div class={classes}>
  <slot />
</div>