<script lang="ts">
  export let placeholder = 'Enter your message...'
  export let value = ''
</script>

<textarea 
  class="w(full) px(12) py(8) r(md) body(sm) b(gray-300) focus:b(primary) focus:outline(none) focus:ring(2/primary/0.2) min-h(120) resize-y transition"
  {placeholder}
  bind:value
  {...$$restProps}
></textarea>