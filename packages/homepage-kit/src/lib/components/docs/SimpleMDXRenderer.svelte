<script lang="ts">
  export let html: string;
  export let isMdx: boolean = false;
  
  // Simple component mapping
  function replaceComponents(htmlContent: string): string {
    if (!isMdx) return htmlContent;
    
    // Replace CodeBlock syntax
    return htmlContent.replace(
      /<CodeBlock\s+language="([^"]*)">\s*\{\`([^`]*)\`\}\s*<\/CodeBlock>/gs,
      (match, language, code) => {
        // Decode and clean the code
        const cleanCode = code
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .trim();
        
        return `<pre><code class="codeblock-wrapper" data-language="${language}">${cleanCode}</code></pre>`;
      }
    );
  }
  
  $: processedHtml = replaceComponents(html);
</script>

<div class="mdx-content prose">
  {@html processedHtml}
</div>

