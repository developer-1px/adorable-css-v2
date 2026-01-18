<script lang="ts">
  export let active = false
  
  $: classes = active 
    ? 'px(md) py(6px) r(md) label(sm) bg(white) c(gray-900) shadow(sm) transition' 
    : 'px(md) py(6px) r(md) label(sm) c(gray-600) hover:c(gray-900) transition'
</script>

<button class={classes}>
  <slot />
</button>