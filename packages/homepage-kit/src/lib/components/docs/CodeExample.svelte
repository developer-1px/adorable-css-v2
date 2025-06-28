<script lang="ts">
  import CodeBlock from './CodeBlock.svelte';
  
  export let title: string = '';
  export let language: string = 'html';
</script>

<div class="vbox gap(md) my(lg)">
  {#if title}
    <h5 class="font(sm) bold c(gray-700)">{title}</h5>
  {/if}
  <div class="code-example">
    <slot />
  </div>
</div>

<style>
  :global(.code-example pre) {
    margin: 0;
  }
</style>