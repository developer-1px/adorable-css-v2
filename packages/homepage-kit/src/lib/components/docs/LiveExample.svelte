<script lang="ts">
  import { onMount } from 'svelte';
  import CodeHighlighter from '../CodeHighlighter.svelte';
  
  export let code: string = '';
  export let title: string = '';
  export let description: string = '';
  export let preview: boolean = true;
  export let language: string = 'html';
  
  let showCode = false;
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
</script>

<div class="live-example vbox gap(0) bg(white) r(xl) shadow(md) clip mb(2xl) {mounted ? 'mounted' : ''}">
  {#if title || description}
    <div class="p(xl) border-b(1/gray-100)">
      {#if title}
        <h4 class="font(lg) bold(600) c(gray-900) mb(sm)">{title}</h4>
      {/if}
      {#if description}
        <p class="font(sm) c(gray-600)">{description}</p>
      {/if}
    </div>
  {/if}
  
  {#if preview}
    <div class="preview-area p(2xl) bg(gray-50) border-b(1/gray-200)">
      <div class="preview-content">
        {@html code}
      </div>
    </div>
  {/if}
  
  <div class="toolbar hbox(between+middle) px(xl) py(md) bg(gray-50) border-b(1/gray-200)">
    <div class="hbox gap(sm)">
      <span class="font(xs) uppercase c(gray-500) tracking(wider)">{language}</span>
    </div>
    <button 
      class="hbox(middle) gap(xs) px(md) py(xs) r(md) font(sm) c(gray-600) hover:bg(white) hover:shadow(sm) transition"
      on:click={() => showCode = !showCode}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 12l3-3-3-3M10 4l-3 8"/>
      </svg>
      <span>{showCode ? 'Hide' : 'Show'} Code</span>
    </button>
  </div>
  
  {#if showCode}
    <div class="code-area bg(gray-900) transition-all" style="max-height: {showCode ? '400px' : '0'}; overflow: hidden;">
      <CodeHighlighter {code} {language} className="m(0)" />
    </div>
  {/if}
</div>

<style>
  .live-example {
    transition: all 0.3s ease;
  }
  
  .live-example.mounted {
    animation: slideUp 0.5s ease-out;
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .code-area {
    transition: max-height 0.3s ease;
  }
  
  :global(.preview-content > *:last-child) {
    margin-bottom: 0 !important;
  }
</style>