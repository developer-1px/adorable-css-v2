<script lang="ts">
  import { parseAdorableCSS } from 'adorable-css';
  
  export let code: string = '';
  export let className: string = '';
  export let language: string = 'adorable'; // 'adorable' | 'css' | 'javascript'
  
  interface Token {
    type: 'utility' | 'value' | 'prefix' | 'pseudo' | 'separator' | 'text';
    value: string;
    original?: string;
  }
  
  function tokenizeAdorableCSS(input: string): Token[] {
    const tokens: Token[] = [];
    const classes = input.trim().split(/\s+/);
    
    for (let i = 0; i < classes.length; i++) {
      const className = classes[i];
      
      try {
        // Try to parse the class with AdorableCSS parser
        const parsed = parseAdorableCSS([className]);
        
        if (parsed && parsed.length > 0) {
          // Successfully parsed - it's a valid AdorableCSS class
          const parts = analyzeClassName(className);
          tokens.push(...parts);
        } else {
          // Not a valid AdorableCSS class - treat as regular text
          tokens.push({ type: 'text', value: className });
        }
      } catch (error) {
        // Parsing failed - treat as regular text
        tokens.push({ type: 'text', value: className });
      }
      
      // Add space between classes (except for the last one)
      if (i < classes.length - 1) {
        tokens.push({ type: 'separator', value: ' ' });
      }
    }
    
    return tokens;
  }
  
  function analyzeClassName(className: string): Token[] {
    const tokens: Token[] = [];
    
    // Check for responsive prefixes (sm:, md:, lg:, xl:, ~sm:, etc.)
    const responsiveMatch = className.match(/^(~?)([a-z]+):/);
    if (responsiveMatch) {
      tokens.push({ 
        type: 'prefix', 
        value: responsiveMatch[0],
        original: className 
      });
      className = className.substring(responsiveMatch[0].length);
    }
    
    // Check for pseudo-class prefixes (hover:, focus:, active:, etc.)
    const pseudoMatch = className.match(/^(hover|focus|active|disabled|group-hover|group-focus):/);
    if (pseudoMatch) {
      tokens.push({ 
        type: 'pseudo', 
        value: pseudoMatch[0],
        original: className 
      });
      className = className.substring(pseudoMatch[0].length);
    }
    
    // Parse utility and value
    const utilityMatch = className.match(/^([a-zA-Z-]+)(\([^)]*\))?$/);
    if (utilityMatch) {
      // Utility name
      tokens.push({ 
        type: 'utility', 
        value: utilityMatch[1],
        original: className 
      });
      
      // Value in parentheses
      if (utilityMatch[2]) {
        const valueContent = utilityMatch[2].slice(1, -1); // Remove parentheses
        tokens.push({ type: 'separator', value: '(' });
        tokens.push({ 
          type: 'value', 
          value: valueContent,
          original: className 
        });
        tokens.push({ type: 'separator', value: ')' });
      }
    } else {
      // Fallback - treat as utility
      tokens.push({ type: 'utility', value: className, original: className });
    }
    
    return tokens;
  }
  
  function highlightCSS(code: string): string {
    return code
      .replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>')
      .replace(/([.#][\w-]+)/g, '<span class="selector">$1</span>')
      .replace(/([\w-]+)(\s*):/g, '<span class="property">$1</span>$2:')
      .replace(/:\s*([^;]+)/g, ': <span class="css-value">$1</span>')
      .replace(/([{}])/g, '<span class="brace">$1</span>');
  }
  
  function highlightJavaScript(code: string): string {
    return code
      .replace(/\/\/.*$/gm, '<span class="comment">$&</span>')
      .replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>')
      .replace(/\b(const|let|var|function|return|if|else|for|while|class|import|export|from)\b/g, '<span class="keyword">$1</span>')
      .replace(/(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="string">$1$2$1</span>');
  }
  
  $: tokens = language === 'adorable' ? tokenizeAdorableCSS(code) : [];
  $: highlightedCSS = language === 'css' ? highlightCSS(code) : '';
  $: highlightedJS = language === 'javascript' ? highlightJavaScript(code) : '';
</script>

<div class="code-highlighter {className}">
  {#if language === 'adorable'}
    <code class="adorable-code">
      {#each tokens as token}
        <span class="token token-{token.type}" title="{token.original || token.value}">
          {token.value}
        </span>
      {/each}
    </code>
  {:else if language === 'css'}
    <code class="css-code">
      {@html highlightedCSS}
    </code>
  {:else if language === 'javascript'}
    <code class="js-code">
      {@html highlightedJS}
    </code>
  {:else}
    <code class="plain-code">
      {code}
    </code>
  {/if}
</div>

<style>
  .code-highlighter {
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
    font-size: 0.875rem;
    line-height: 1.6;
  }
  
  code {
    display: block;
    white-space: pre-wrap;
    word-break: break-word;
  }
  
  /* AdorableCSS Syntax Highlighting */
  .token-utility {
    color: #0ea5e9; /* Primary blue */
    font-weight: 600;
  }
  
  .token-value {
    color: #10b981; /* Success green */
    font-weight: 500;
  }
  
  .token-prefix {
    color: #8b5cf6; /* Purple for responsive prefixes */
    font-weight: 600;
  }
  
  .token-pseudo {
    color: #f59e0b; /* Warning orange for pseudo classes */
    font-weight: 600;
  }
  
  .token-separator {
    color: #64748b; /* Gray for parentheses and spaces */
  }
  
  .token-text {
    color: #475569; /* Regular text color */
  }
  
  /* CSS Syntax Highlighting */
  .css-code .selector {
    color: #0ea5e9;
    font-weight: 600;
  }
  
  .css-code .property {
    color: #8b5cf6;
    font-weight: 500;
  }
  
  .css-code .css-value {
    color: #10b981;
  }
  
  .css-code .brace {
    color: #64748b;
    font-weight: 600;
  }
  
  .css-code .comment {
    color: #9ca3af;
    font-style: italic;
  }
  
  /* JavaScript Syntax Highlighting */
  .js-code .keyword {
    color: #8b5cf6;
    font-weight: 600;
  }
  
  .js-code .string {
    color: #10b981;
  }
  
  .js-code .comment {
    color: #9ca3af;
    font-style: italic;
  }
  
  /* Hover effects */
  .token:hover {
    background: rgba(14, 165, 233, 0.1);
    border-radius: 3px;
    padding: 1px 2px;
    margin: -1px -2px;
  }
  
  /* Dark theme support */
  @media (prefers-color-scheme: dark) {
    .token-utility {
      color: #38bdf8;
    }
    
    .token-value {
      color: #34d399;
    }
    
    .token-prefix {
      color: #a78bfa;
    }
    
    .token-pseudo {
      color: #fbbf24;
    }
    
    .token-separator {
      color: #94a3b8;
    }
    
    .token-text {
      color: #e2e8f0;
    }
  }
</style>