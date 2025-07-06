<script lang="ts">
  import { onMount } from 'svelte';
  import Prism from 'prismjs';
  
  // Import 01-core languages
  import 'prismjs/components/prism-javascript';
  import 'prismjs/components/prism-typescript';
  import 'prismjs/components/prism-css';
  import 'prismjs/components/prism-markup'; // HTML
  import 'prismjs/components/prism-bash';
  
  export let code: string = '';
  export let className: string = '';
  export let language: string = 'adorable'; // 'adorable' | 'css' | 'javascript' | 'html' | 'bash'
  
  let codeElement: HTMLElement;
  
  // Ensure code is always a string and trimmed
  $: codeString = String(code || '').trim();
  
  // Custom AdorableCSS grammar for Prism
  const adorableCSSGrammar = {
    'comment': /\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->/,
    'adorable-class': {
      pattern: /\b([a-z]+:)?([a-z-]+)(\([^)]*\))?/,
      inside: {
        'prefix': /^[a-z]+:/,
        'utility': /[a-z-]+/,
        'punctuation': /[()]/,
        'value': /[^()]+(?=\))/
      }
    },
    'string': /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
    'punctuation': /[{}[\],]/
  };
  
  // Register AdorableCSS language
  if (typeof window !== 'undefined') {
    Prism.languages.adorable = adorableCSSGrammar;
  }
  
  // Map our language names to Prism language names
  const languageMap: Record<string, string> = {
    'adorable': 'adorable',
    'html': 'markup',
    'css': 'css',
    'javascript': 'javascript',
    'typescript': 'typescript',
    'bash': 'bash'
  };
  
  function highlightCode() {
    if (!codeElement) return;
    
    const prismLanguage = languageMap[language] || 'markup';
    
    // Clear existing content
    codeElement.innerHTML = '';
    
    if (language === 'adorable') {
      // Custom highlighting for AdorableCSS
      highlightAdorableCSS();
    } else {
      // Use Prism for other languages
      const highlighted = Prism.highlight(
        codeString,
        Prism.languages[prismLanguage] || Prism.languages.markup,
        prismLanguage
      );
      codeElement.innerHTML = highlighted;
    }
  }
  
  function highlightAdorableCSS() {
    if (!codeElement) return;
    
    // Split by lines and preserve line breaks
    const lines = codeString.split('\n');
    
    lines.forEach((line, lineIndex) => {
      if (lineIndex > 0) {
        codeElement.appendChild(document.createTextNode('\n'));
      }
      
      // Check if this line contains HTML with class attributes
      const htmlWithClassRegex = /<[^>]*\sclass=["']([^"']*)["'][^>]*>/g;
      let lastIndex = 0;
      let match;
      
      while ((match = htmlWithClassRegex.exec(line)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          const beforeText = line.slice(lastIndex, match.index);
          addHighlightedHTML(beforeText);
        }
        
        // Process the HTML tag with special class highlighting
        const fullMatch = match[0];
        const classContent = match[1];
        const beforeClass = fullMatch.slice(0, fullMatch.indexOf('class=') + 6);
        const afterClass = fullMatch.slice(fullMatch.indexOf(classContent) + classContent.length);
        
        // Add the HTML part before class content
        addHighlightedHTML(beforeClass);
        
        // Add the class content with AdorableCSS highlighting
        const classSpan = document.createElement('span');
        classSpan.className = 'token string';
        
        const quote = fullMatch.includes('class="') ? '"' : "'";
        classSpan.appendChild(document.createTextNode(quote));
        
        const classContentSpan = document.createElement('span');
        classContentSpan.className = 'adorable-classes';
        classContentSpan.innerHTML = highlightClassContent(classContent);
        classSpan.appendChild(classContentSpan);
        
        classSpan.appendChild(document.createTextNode(quote));
        codeElement.appendChild(classSpan);
        
        // Add the HTML part after class content
        addHighlightedHTML(afterClass);
        
        lastIndex = match.index + fullMatch.length;
      }
      
      // Add remaining text
      if (lastIndex < line.length) {
        const remainingText = line.slice(lastIndex);
        if (htmlWithClassRegex.test(line)) {
          addHighlightedHTML(remainingText);
        } else {
          // Pure AdorableCSS classes
          const highlighted = highlightClassContent(remainingText);
          const span = document.createElement('span');
          span.innerHTML = highlighted;
          codeElement.appendChild(span);
        }
      }
    });
  }
  
  function addHighlightedHTML(htmlText: string) {
    if (!htmlText.trim()) {
      codeElement.appendChild(document.createTextNode(htmlText));
      return;
    }
    
    // Use Prism to highlight HTML
    const highlighted = Prism.highlight(
      htmlText,
      Prism.languages.markup,
      'markup'
    );
    
    const span = document.createElement('span');
    span.innerHTML = highlighted;
    codeElement.appendChild(span);
  }
  
  function highlightClassContent(classString: string): string {
    const classes = classString.trim().split(/\s+/);
    
    return classes.map(cls => {
      if (!cls.trim()) return cls;
      
      // Check if it's a valid AdorableCSS class by trying patterns
      const adorablePatterns = [
        /^(~?[a-z]+:)?(hover:|focus:|active:|disabled:|group-hover:|group-focus:)?[a-z-]+(\([^)]*\))?$/,
        /^[a-z-]+$/,
        /^[a-z-]+\([^)]*\)$/
      ];
      
      const isAdorableCSS = adorablePatterns.some(pattern => pattern.test(cls));
      
      if (isAdorableCSS) {
        return highlightSingleAdorableClass(cls);
      } else {
        return `<span class="regular-class">${cls}</span>`;
      }
    }).join(' ');
  }
  
  function highlightSingleAdorableClass(className: string): string {
    let result = '';
    let remaining = className;
    
    // Handle responsive prefixes (sm:, md:, ~lg:, etc.)
    const responsiveMatch = remaining.match(/^(~?)([a-z]+):/);
    if (responsiveMatch) {
      result += `<span class="adorable-prefix">${responsiveMatch[0]}</span>`;
      remaining = remaining.substring(responsiveMatch[0].length);
    }
    
    // Handle pseudo-class prefixes
    const pseudoMatch = remaining.match(/^(hover|focus|active|disabled|group-hover|group-focus):/);
    if (pseudoMatch) {
      result += `<span class="adorable-pseudo">${pseudoMatch[0]}</span>`;
      remaining = remaining.substring(pseudoMatch[0].length);
    }
    
    // Handle utility and value
    const utilityMatch = remaining.match(/^([a-zA-Z-]+)(\([^)]*\))?$/);
    if (utilityMatch) {
      result += `<span class="adorable-utility">${utilityMatch[1]}</span>`;
      if (utilityMatch[2]) {
        const valueContent = utilityMatch[2].slice(1, -1);
        result += `<span class="adorable-separator">(</span><span class="adorable-value">${valueContent}</span><span class="adorable-separator">)</span>`;
      }
    } else {
      result += `<span class="adorable-utility">${remaining}</span>`;
    }
    
    return result;
  }
  
  onMount(() => {
    highlightCode();
  });
  
  // Re-highlight when code or language changes
  $: if (codeElement && (codeString || language)) {
    highlightCode();
  }
</script>

<div class="code-highlighter {className}">
  <pre class="language-{languageMap[language] || 'markup'}"><code bind:this={codeElement}></code></pre>
</div>

<style>
  .code-highlighter {
    overflow-x: auto;
  }
  
  pre {
    margin: 0;
    padding: 0;
    background: transparent;
    border-radius: 0;
  }
  
  code {
    display: block;
    color: white !important;
    text-align: left;
    word-break: break-all;
    white-space: pre-wrap;
    line-height: 1.5;
    font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
    background: transparent;
    font-size: inherit;
    padding: 1rem;
  }
  
  /* Override Prism default colors with white text */
  :global(.code-highlighter .token.comment),
  :global(.code-highlighter .token.prolog),
  :global(.code-highlighter .token.doctype),
  :global(.code-highlighter .token.cdata) {
    color: #6b7280 !important;
    font-style: italic;
  }
  
  :global(.code-highlighter .token.punctuation) {
    color: #9ca3af !important;
  }
  
  :global(.code-highlighter .token.property),
  :global(.code-highlighter .token.tag),
  :global(.code-highlighter .token.boolean),
  :global(.code-highlighter .token.number),
  :global(.code-highlighter .token.constant),
  :global(.code-highlighter .token.symbol),
  :global(.code-highlighter .token.deleted) {
    color: #f59e0b !important;
  }
  
  :global(.code-highlighter .token.selector),
  :global(.code-highlighter .token.attr-name),
  :global(.code-highlighter .token.string),
  :global(.code-highlighter .token.char),
  :global(.code-highlighter .token.builtin),
  :global(.code-highlighter .token.inserted) {
    color: #10b981 !important;
  }
  
  :global(.code-highlighter .token.operator),
  :global(.code-highlighter .token.entity),
  :global(.code-highlighter .token.url),
  :global(.code-highlighter .language-css .token.string),
  :global(.code-highlighter .style .token.string) {
    color: #9ca3af !important;
  }
  
  :global(.code-highlighter .token.atrule),
  :global(.code-highlighter .token.attr-value),
  :global(.code-highlighter .token.keyword) {
    color: #8b5cf6 !important;
    font-weight: 600;
  }
  
  :global(.code-highlighter .token.function),
  :global(.code-highlighter .token.class-name) {
    color: #0ea5e9 !important;
  }
  
  :global(.code-highlighter .token.regex),
  :global(.code-highlighter .token.important),
  :global(.code-highlighter .token.variable) {
    color: #ef4444 !important;
  }
  
  /* AdorableCSS specific highlighting */
  :global(.adorable-classes) { 
    background: rgba(139, 92, 246, 0.1) !important; 
    padding: 0 2px !important; 
    border-radius: 2px !important; 
  }
  
  :global(.adorable-utility) { 
    color: #8b5cf6 !important; 
    font-weight: 600 !important; 
  }
  
  :global(.adorable-value) { 
    color: #10b981 !important; 
    font-weight: 500 !important; 
  }
  
  :global(.adorable-prefix) { 
    color: #f59e0b !important; 
    font-weight: 600 !important; 
  }
  
  :global(.adorable-pseudo) { 
    color: #ef4444 !important; 
    font-weight: 500 !important; 
  }
  
  :global(.adorable-separator) { 
    color: #6b7280 !important; 
  }
  
  :global(.regular-class) { 
    color: #9ca3af !important; 
  }
  
  /* Make sure all text is white by default */
  :global(.code-highlighter *) {
    color: inherit;
  }
</style>