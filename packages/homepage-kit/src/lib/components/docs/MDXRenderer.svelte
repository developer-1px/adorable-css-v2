<script lang="ts">
  import { onMount } from 'svelte';
  import CodeBlock from '$lib/components/ui/CodeBlock.svelte';
  
  // Define props
  export let html: string;
  export let componentImports: string[] = [];
  export let isMdx: boolean = false;
  
  // Component mapping for MDX content
  const componentMap = {
    CodeBlock,
    // Add more components as needed
    // Playground: () => import('$lib/components/ui/Playground.svelte'),
  };
  
  let contentContainer: HTMLElement;
  
  // Process HTML content to handle dynamic components
  function processContent(htmlContent: string): string {
    if (!isMdx) return htmlContent;
    
    // Replace component syntax to make it Svelte-compatible
    let processed = htmlContent;
    
    // Handle CodeBlock components specifically
    processed = processed.replace(
      /<CodeBlock\s+language="([^"]*)">\s*\{\`([^`]*)\`\}\s*<\/CodeBlock>/gs,
      (match, language, code) => {
        // Create a unique ID for this code block
        const id = Math.random().toString(36).substr(2, 9);
        return `<div class="codeblock-${id}" data-language="${language}" data-code="${encodeURIComponent(code)}"></div>`;
      }
    );
    
    return processed;
  }
  
  // After mounting, replace placeholder divs with actual Svelte components
  onMount(() => {
    if (!contentContainer || !isMdx) return;
    
    // Find and replace CodeBlock placeholders
    const codeBlocks = contentContainer.querySelectorAll('[class*="codeblock-"]');
    
    codeBlocks.forEach((placeholder) => {
      const language = placeholder.getAttribute('data-language') || '';
      const code = decodeURIComponent(placeholder.getAttribute('data-code') || '');
      
      // Create and mount CodeBlock component
      const codeBlockComponent = new CodeBlock({
        target: placeholder,
        props: {
          language,
          code
        }
      });
      
      // Store component reference for cleanup
      placeholder.setAttribute('data-component', 'mounted');
    });
  });
  
  $: processedHtml = processContent(html);
</script>

<div bind:this={contentContainer} class="prose prose-lg max-w-none">
  {@html processedHtml}
</div>

<style>
  :global(.prose) {
    color: rgb(55 65 81);
    max-width: none;
  }
  
  :global(.prose h1) {
    color: rgb(17 24 39);
    font-weight: 800;
    font-size: 2.25rem;
    margin-top: 0;
    margin-bottom: 2rem;
    line-height: 1.1;
  }
  
  :global(.prose h2) {
    color: rgb(17 24 39);
    font-weight: 700;
    font-size: 1.875rem;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    line-height: 1.2;
  }
  
  :global(.prose h3) {
    color: rgb(17 24 39);
    font-weight: 600;
    font-size: 1.5rem;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    line-height: 1.25;
  }
  
  :global(.prose h4) {
    color: rgb(17 24 39);
    font-weight: 600;
    font-size: 1.25rem;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
    line-height: 1.3;
  }
  
  :global(.prose p) {
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    line-height: 1.7;
  }
  
  :global(.prose code) {
    color: rgb(139 92 246);
    background-color: rgb(248 250 252);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  :global(.prose pre) {
    background-color: rgb(15 23 42);
    color: rgb(226 232 240);
    overflow-x: auto;
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin: 1.5rem 0;
  }
  
  :global(.prose pre code) {
    background-color: transparent;
    color: inherit;
    padding: 0;
    border-radius: 0;
    font-size: 0.875rem;
  }
  
  :global(.prose a) {
    color: rgb(59 130 246);
    text-decoration: underline;
    font-weight: 500;
  }
  
  :global(.prose a:hover) {
    color: rgb(37 99 235);
  }
  
  :global(.prose strong) {
    color: rgb(17 24 39);
    font-weight: 600;
  }
  
  :global(.prose ul) {
    list-style-type: disc;
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    padding-left: 1.625rem;
  }
  
  :global(.prose ol) {
    list-style-type: decimal;
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    padding-left: 1.625rem;
  }
  
  :global(.prose li) {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  :global(.prose blockquote) {
    font-weight: 500;
    font-style: italic;
    color: rgb(17 24 39);
    border-left-width: 0.25rem;
    border-left-color: rgb(229 231 235);
    quotes: "\\201C""\\201D""\\2018""\\2019";
    margin-top: 1.6rem;
    margin-bottom: 1.6rem;
    padding-left: 1rem;
  }
</style>