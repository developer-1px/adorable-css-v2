<script lang="ts">
  import { onMount } from 'svelte';
  
  export let title: string = '';
  
  let container: HTMLDivElement;
  
  onMount(() => {
    // AdorableCSS가 로드되어 있다면 처리
    if (typeof window !== 'undefined' && (window as any).AdorableCSSV2) {
      (window as any).AdorableCSSV2.processElement(container);
    }
  });
</script>

<div class="vbox gap(lg) my(xl)">
  {#if title}
    <h4 class="font(md) bold c(gray-700)">{title}</h4>
  {/if}
  
  <div bind:this={container} class="panel() p(xl) bg(white) border(1/gray-200) r(lg) shadow(sm)">
    <slot />
  </div>
</div>

<style>
  /* 추가 스타일이 필요한 경우 여기에 작성 */
</style>