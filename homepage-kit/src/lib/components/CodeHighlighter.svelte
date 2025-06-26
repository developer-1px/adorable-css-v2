<script lang="ts">
  import { parseAdorableCSS } from 'adorable-css';
  
  export let code: string = '';
  export let className: string = '';
  export let language: string = 'adorable'; // 'adorable' | 'css' | 'javascript'
  
  // Ensure code is always a string
  $: codeString = String(code || '');
  
  interface Token {
    type: 'utility' | 'value' | 'prefix' | 'pseudo' | 'separator' | 'text';
    value: string;
    original?: string;
  }
  
  function tokenizeAdorableCSS(input: string): Token[] {
    const tokens: Token[] = [];
    // Ensure input is a string
    const inputStr = String(input || '');
    const classes = inputStr.trim().split(/\s+/);
    
    for (let i = 0; i < classes.length; i++) {
      const className = classes[i];
      
      try {
        // Try to parse the class with AdorableCSS parser
        const parsed = parseAdorableCSS(className);
        
        if (parsed && parsed.type === 'stylesheet' && parsed.value && parsed.value.length > 0) {
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
      // Highlight comments first
      .replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>')
      // Highlight selectors with pseudo-classes
      .replace(/([.#]?[\w-:[\]()>+~\s]+)\s*{/g, (match, selector) => {
        const highlighted = selector
          .replace(/(:[a-z-]+)/g, '<span class="pseudo">$1</span>')
          .replace(/(\.[a-z-]+)/g, '<span class="class-name">$1</span>')
          .replace(/(#[a-z-]+)/g, '<span class="id">$1</span>');
        return `<span class="selector">${highlighted}</span> <span class="brace">{</span>`;
      })
      // Highlight properties
      .replace(/([\w-]+)(\s*):/g, '<span class="property">$1</span>$2:')
      // Highlight values with better detection
      .replace(/:\s*([^;{]+)/g, (match, value) => {
        const highlighted = value
          .replace(/(\d+(?:\.\d+)?)(px|rem|em|%|vh|vw|deg|s|ms)/g, '<span class="number">$1</span><span class="unit">$2</span>')
          .replace(/(#[0-9a-fA-F]{3,8})/g, '<span class="color">$1</span>')
          .replace(/\b(rgba?|hsla?|var|calc|linear-gradient|radial-gradient)\(/g, '<span class="function">$1</span>(')
          .replace(/(!important)/g, '<span class="important">$1</span>');
        return `: <span class="css-value">${highlighted}</span>`;
      })
      .replace(/;/g, '<span class="punctuation">;</span>')
      .replace(/}/g, '<span class="brace">}</span>');
  }
  
  function highlightJavaScript(code: string): string {
    return code
      // Comments
      .replace(/\/\/.*$/gm, '<span class="comment">$&</span>')
      .replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>')
      // Strings (must come before keywords to avoid matching inside strings)
      .replace(/(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="string">$1$2$1</span>')
      // Keywords
      .replace(/\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|class|extends|import|export|from|default|async|await|try|catch|finally|throw|new|this|super|typeof|instanceof|in|of|void|delete)\b/g, '<span class="keyword">$1</span>')
      // Booleans and null/undefined
      .replace(/\b(true|false|null|undefined)\b/g, '<span class="literal">$1</span>')
      // Numbers
      .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="number">$1</span>')
      // Functions (basic detection)
      .replace(/\b([a-zA-Z_$][\w$]*)\s*\(/g, '<span class="function">$1</span>(')
      // Operators
      .replace(/(===?|!==?|<=?|>=?|&&|\|\||[+\-*/%=!<>?:])/g, '<span class="operator">$1</span>');
  }
  
  $: tokens = language === 'adorable' ? tokenizeAdorableCSS(codeString) : [];
  $: highlightedCSS = language === 'css' ? highlightCSS(codeString) : '';
  $: highlightedJS = language === 'javascript' ? highlightJavaScript(codeString) : '';
</script>

<div class="code-highlighter {className}">
  {#if language === 'adorable'}
    <code class="adorable-code block font-family(mono)">
      {#each tokens as token}
        <span class="token token-{token.type}" title="{token.original || token.value}">
          {token.value}
        </span>
      {/each}
    </code>
  {:else if language === 'css'}
    <code class="css-code block font-family(mono) c(gray-200)">
      {@html highlightedCSS}
    </code>
  {:else if language === 'javascript'}
    <code class="js-code block font-family(mono) c(gray-300)">
      {@html highlightedJS}
    </code>
  {:else}
    <code class="plain-code block font-family(mono) c(gray-700)">
      {code}
    </code>
  {/if}
</div>

