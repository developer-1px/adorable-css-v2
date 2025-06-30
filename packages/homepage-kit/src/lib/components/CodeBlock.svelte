<script lang="ts">
  import { onMount } from 'svelte';
  
  export let code: string = '';
  export let lang: string = 'text';
  export let title: string = '';
  export let lineNumbers: boolean = true;
  export let highlight: number[] = [];
  
  let copied = false;
  let codeElement: HTMLElement;
  
  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code.trim());
      copied = true;
      setTimeout(() => copied = false, 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  }
  
  onMount(() => {
    // 하이라이트된 라인에 클래스 추가
    if (highlight.length > 0 && codeElement) {
      const lines = codeElement.querySelectorAll('.line');
      highlight.forEach(lineNum => {
        if (lines[lineNum - 1]) {
          lines[lineNum - 1].classList.add('highlighted');
        }
      });
    }
  });
</script>

<div class="code-block relative group my(xl) r(lg) overflow(hidden) bg(gray-900) border(1/gray-800)">
  {#if title}
    <div class="px(lg) py(sm) border-b(1/gray-800) bg(gray-900.5)">
      <div class="hbox justify(between) items(center)">
        <span class="font(mono) text(sm) c(gray-400)">{title}</span>
        <span class="text(xs) c(gray-500) uppercase">{lang}</span>
      </div>
    </div>
  {/if}
  
  <div class="relative">
    <pre class="p(lg) overflow(auto) text(sm) leading(relaxed)"
         bind:this={codeElement}><code class="language-{lang}">{code}</code></pre>
    
    <button
      on:click={copyCode}
      class="absolute top(md) right(md) btn(sm/ghost) opacity(0) group-hover:opacity(100) 
             transition(opacity/200ms) bg(gray-800) hover:bg(gray-700) c(gray-300)"
      title="코드 복사"
    >
      {#if copied}
        <svg class="w(16) h(16)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      {:else}
        <svg class="w(16) h(16)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      {/if}
    </button>
  </div>
</div>

<style>
  /* 라인 하이라이트 */
  :global(.code-block .line.highlighted) {
    background-color: rgba(59, 130, 246, 0.1);
    display: block;
    margin: 0 -1rem;
    padding: 0 1rem;
    border-left: 4px solid rgb(59, 130, 246);
  }
  
  /* 스크롤바 스타일링 */
  :global(.code-block pre::-webkit-scrollbar) {
    height: 8px;
    width: 8px;
  }
  
  :global(.code-block pre::-webkit-scrollbar-track) {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }
  
  :global(.code-block pre::-webkit-scrollbar-thumb) {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
  
  :global(.code-block pre::-webkit-scrollbar-thumb:hover) {
    background: rgba(255, 255, 255, 0.3);
  }
</style>