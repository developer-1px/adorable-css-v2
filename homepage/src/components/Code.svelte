<script lang="ts">
  import CodeHighlighter from './CodeHighlighter.svelte';
  
  export let children: string = '';
  export let language: string = 'adorable';
  export let className: string = '';
  export let inline: boolean = false;
  
  // Support both children prop and slot content
  let codeContent = children;
</script>

{#if inline}
  <code class="inline-code {className}">
    <CodeHighlighter code={codeContent} {language} />
  </code>
{:else}
  <div class="code-block {className}">
    <CodeHighlighter code={codeContent} {language} />
  </div>
{/if}

<style>
  .inline-code {
    display: inline;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    background: var(--colors-gray-100);
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
    font-size: 0.875em;
  }
  
  .code-block {
    display: block;
    padding: 0.75rem;
    border-radius: 0.5rem;
    background: var(--colors-gray-50);
    border: 1px solid var(--colors-gray-200);
    overflow-x: auto;
  }
  
  /* Override CodeHighlighter styles for inline usage */
  .inline-code :global(.code-highlighter) {
    font-size: inherit;
    line-height: inherit;
  }
  
  .inline-code :global(.token:hover) {
    background: none;
    padding: 0;
    margin: 0;
    border-radius: 0;
  }
  
  /* Dark background support for code blocks */
  .code-block :global(.code-highlighter) {
    background: transparent;
  }
</style>