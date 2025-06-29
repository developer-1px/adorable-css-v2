import { compile } from '@mdx-js/mdx';
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';

/**
 * Process MDX content and return HTML + frontmatter
 * @param {string} content - Raw MDX content
 * @param {object} options - Processing options
 * @returns {Promise<{html: string, frontmatter: object}>}
 */
export async function processMDX(content, options = {}) {
  try {
    // Extract frontmatter first
    const { data: frontmatter, content: mdxContent } = matter(content);
    
    // Define component mappings for MDX
    const componentMap = {
      // Import statements for components
      CodeBlock: `import { CodeBlock } from '$lib/components/ui/CodeBlock.svelte';`,
      Playground: `import { Playground } from '$lib/components/ui/Playground.svelte';`,
      // Add more component imports as needed
    };
    
    // Find all component usage in content
    const usedComponents = new Set();
    Object.keys(componentMap).forEach(comp => {
      if (mdxContent.includes(`<${comp}`)) {
        usedComponents.add(comp);
      }
    });
    
    // Create import statements
    const imports = Array.from(usedComponents)
      .map(comp => componentMap[comp])
      .join('\n');
    
    // Compile MDX to JavaScript
    const compiled = await compile(mdxContent, {
      remarkPlugins: [
        remarkGfm,
        remarkFrontmatter
      ],
      development: false,
      format: 'mdx'
    });
    
    // Convert JSX to HTML-like structure that Svelte can handle
    let jsCode = String(compiled);
    
    // Replace JSX syntax with Svelte-compatible syntax
    jsCode = jsCode
      // Replace className with class
      .replace(/className=/g, 'class=')
      // Handle self-closing tags
      .replace(/<([A-Z][A-Za-z0-9]*)\s*\/>/g, '<$1></$1>')
      // Convert component props to Svelte format
      .replace(/(\w+)={([^}]+)}/g, '$1={$2}');
    
    // Extract just the content part (remove module exports, etc.)
    const contentMatch = jsCode.match(/return\s*\(([^;]+)\);/s);
    let htmlContent = contentMatch ? contentMatch[1].trim() : jsCode;
    
    // Clean up the content
    htmlContent = htmlContent
      .replace(/^jsx\(/, '')
      .replace(/\)$/, '')
      .replace(/React\.Fragment/g, 'div')
      .replace(/\/\*#__PURE__\*\//g, '');
    
    return {
      html: htmlContent,
      frontmatter,
      imports: Array.from(usedComponents)
    };
    
  } catch (error) {
    console.error('MDX processing error:', error);
    
    // Fallback: treat as markdown with frontmatter
    const { data: frontmatter, content: markdownContent } = matter(content);
    
    // Simple markdown to HTML conversion
    let html = markdownContent
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(.+)$/gm, '<p>$1</p>')
      .replace(/<p><h/g, '<h')
      .replace(/<\/h(\d)><\/p>/g, '</h$1>');
    
    return {
      html,
      frontmatter,
      imports: []
    };
  }
}

/**
 * Simple markdown processor as fallback
 * @param {string} content - Markdown content
 * @returns {Promise<{html: string, frontmatter: object}>}
 */
export async function processMarkdown(content) {
  const { data: frontmatter, content: markdownContent } = matter(content);
  
  // Basic markdown to HTML conversion
  let html = markdownContent
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^##### (.+)$/gm, '<h5>$1</h5>')
    .replace(/^###### (.+)$/gm, '<h6>$1</h6>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/gm, '<p>$1</p>')
    .replace(/<p><h/g, '<h')
    .replace(/<\/h(\d)><\/p>/g, '</h$1>')
    .replace(/<p><pre>/g, '<pre>')
    .replace(/<\/pre><\/p>/g, '</pre>');
  
  return {
    html,
    frontmatter
  };
}