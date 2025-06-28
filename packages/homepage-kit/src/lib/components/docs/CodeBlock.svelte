<script lang="ts">
  import { onMount } from 'svelte';
  import hljs from 'highlight.js';
  
  export let code: string = '';
  export let language: string = '';
  export let showCopy: boolean = true;
  
  let codeElement: HTMLElement;
  let copied = false;
  
  onMount(() => {
    if (codeElement && code) {
      codeElement.textContent = code;
      if (language) {
        codeElement.className = `language-${language}`;
      }
      hljs.highlightElement(codeElement);
    }
  });
  
  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(code);
      copied = true;
      setTimeout(() => copied = false, 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  }
</script>

<div class="relative group">
  <pre class="prose-pre"><code bind:this={codeElement}></code></pre>
  
  {#if showCopy}
    <button
      on:click={copyToClipboard}
      class="absolute top(16) right(16) px(12) py(8) r(8) bg(white.1) hover:bg(white.2) 
             transition-all opacity(0) group-hover:opacity(100) backdrop(blur/10)
             hbox(middle) gap(6) font(12) c(white.8) hover:c(white)"
      title="Copy code"
    >
      {#if copied}
        <svg class="w(16) h(16)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span>Copied!</span>
      {:else}
        <svg class="w(16) h(16)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <span>Copy</span>
      {/if}
    </button>
  {/if}
</div>

<style>
  :global(.prose-pre) {
    background: #0d1117;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 24px;
    overflow-x: auto;
    margin: 32px 0;
    font-size: 14px;
    line-height: 1.6;
    color: #f0f6fc;
    position: relative;
  }
  
  :global(.prose-pre code) {
    background: none;
    padding: 0;
    font-size: inherit;
    color: inherit;
    font-family: 'SF Mono', Monaco, 'Courier New', monospace;
  }
</style>