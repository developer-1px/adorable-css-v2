import matter from 'gray-matter';

/**
 * Simple but effective MDX processor for SvelteKit
 * Converts MDX to HTML while preserving component syntax for Svelte
 */

/**
 * Extract Svelte each block and its data
 */
function extractEachBlock(lines, startIndex) {
  // Handle multi-line each statements
  let eachStatement = lines[startIndex];
  let currentIndex = startIndex;
  
  // If the each statement spans multiple lines, collect them
  while (!eachStatement.includes('] as ') && currentIndex < lines.length - 1) {
    currentIndex++;
    eachStatement += lines[currentIndex];
  }
  
  // Parse the each statement to extract data
  const eachMatch = eachStatement.match(/\{#each\s+(\[[\s\S]*?\])\s+as\s+(.+?)\}/);
  if (!eachMatch) return null;
  
  const arrayData = eachMatch[1];
  const itemPattern = eachMatch[2];
  
  // Find the end of the each block
  let depth = 1;
  let endIndex = currentIndex + 1;
  const blockLines = [];
  
  while (endIndex < lines.length && depth > 0) {
    const line = lines[endIndex];
    if (line.trim().startsWith('{#each')) depth++;
    else if (line.trim() === '{/each}') depth--;
    
    if (depth > 0) {
      blockLines.push(line);
    }
    endIndex++;
  }
  
  return {
    data: arrayData,
    itemPattern,
    block: blockLines,
    endIndex: endIndex - 1
  };
}

/**
 * Close any open table tags
 */
function closeOpenTables(html) {
  // Count open and close table tags
  const openTables = (html.match(/<table[^>]*>/g) || []).length;
  const closeTables = (html.match(/<\/table>/g) || []).length;
  const openTbodies = (html.match(/<tbody>/g) || []).length;
  const closeTbodies = (html.match(/<\/tbody>/g) || []).length;
  
  let result = html;
  
  // Close any open tbody tags
  if (openTbodies > closeTbodies) {
    for (let i = 0; i < openTbodies - closeTbodies; i++) {
      result += '\n</tbody>';
    }
  }
  
  // Close any open table tags
  if (openTables > closeTables) {
    for (let i = 0; i < openTables - closeTables; i++) {
      result += '\n</table>';
    }
  }
  
  return result;
}

/**
 * Process Svelte each block into static HTML
 */
function processSvelteEach(blockLines, arrayData) {
  try {
    // Convert JS array to JSON-compatible format and parse safely
    const cleanArrayData = arrayData
      .replace(/'/g, '"')  // Convert single quotes to double quotes
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
    
    const data = JSON.parse(cleanArrayData);
    
    let html = '';
    
    data.forEach(item => {
      // Process each line in the block
      blockLines.forEach(line => {
        let processedLine = line;
        
        // Handle array destructuring like [token, rem, px, usage]
        if (Array.isArray(item)) {
          // Replace template variables with array values
          processedLine = processedLine
            .replace(/\{token\}/g, item[0] || '')
            .replace(/\{rem\}/g, item[1] || '')
            .replace(/\{px\}/g, item[2] || '')
            .replace(/\{usage\}/g, item[3] || '')
            // Handle any other array indices
            .replace(/\{(\d+)\}/g, (match, index) => item[parseInt(index)] || '');
        }
        
        html += processedLine + '\n';
      });
    });
    
    return html;
  } catch (error) {
    console.error('Error processing Svelte each block:', error);
    console.error('Array data:', arrayData);
    return '<div class="component-placeholder">❌ Each block processing failed: ' + error.message + '</div>';
  }
}

export async function processMDX(content) {
  try {
    // Extract frontmatter
    const { data: frontmatter, content: mdxContent } = matter(content);
    
    // Process the content line by line
    const lines = mdxContent.split('\n');
    const processedLines = [];
    let inCodeBlock = false;
    let codeBlockLanguage = '';
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      
      // Handle code blocks
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          codeBlockLanguage = line.trim().substring(3);
          inCodeBlock = true;
          processedLines.push(`<CodeBlock language="${codeBlockLanguage}">`);
          processedLines.push('{`');
          continue;
        } else {
          inCodeBlock = false;
          processedLines.push('`}');
          processedLines.push('</CodeBlock>');
          continue;
        }
      }
      
      if (inCodeBlock) {
        processedLines.push(line);
        continue;
      }
      
      // Handle headers
      if (line.match(/^#{1,6}\s/)) {
        const level = line.match(/^(#{1,6})/)[1].length;
        const text = line.replace(/^#{1,6}\s/, '');
        line = `<h${level}>${text}</h${level}>`;
      }
      
      // Handle bold and italic
      line = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      line = line.replace(/\*(.+?)\*/g, '<em>$1</em>');
      
      // Handle inline code
      line = line.replace(/`(.+?)`/g, '<code>$1</code>');
      
      // Handle links
      line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
      
      // Handle tables
      if (line.includes('|') && !inCodeBlock) {
        // Check if this might be a table row
        const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
        if (cells.length >= 2) {
          // Check if next line is a separator line (|---|---|)
          const nextLine = i < lines.length - 1 ? lines[i + 1] : '';
          const isSeparatorNext = nextLine.match(/^\s*\|[\s\-\|]+\|\s*$/);
          
          if (isSeparatorNext) {
            // This is a table header
            const headerCells = cells.map(cell => `<th>${cell}</th>`).join('');
            processedLines.push('<table class="docs-table">');
            processedLines.push('<thead>');
            processedLines.push(`<tr>${headerCells}</tr>`);
            processedLines.push('</thead>');
            processedLines.push('<tbody>');
            i++; // Skip the separator line
            continue;
          } else {
            // Check if we're already in a table (previous lines had table content)
            const prevLine = i > 0 ? processedLines[processedLines.length - 1] : '';
            if (prevLine.includes('<tbody>') || prevLine.includes('</tr>')) {
              // This is a table data row
              const dataCells = cells.map(cell => `<td>${cell}</td>`).join('');
              processedLines.push(`<tr>${dataCells}</tr>`);
              continue;
            }
          }
        }
      }
      
      // Handle component tags - convert to placeholders or remove
      if (line.trim().match(/^<[A-Z]/) || line.trim().match(/^<\/[A-Z]/)) {
        const componentMatch = line.trim().match(/^<\/?([A-Z][a-zA-Z]*)/);
        if (componentMatch) {
          const componentName = componentMatch[1];
          const isClosing = line.trim().startsWith('</');
          
          if (componentName === 'LivePreview') {
            if (isClosing) {
              processedLines.push('</div>');
            } else {
              // Opening LivePreview tag
              processedLines.push('<div class="live-preview-wrapper">');
            }
          } else if (componentName === 'ColorPalette') {
            if (!isClosing) {
              processedLines.push('<div class="color-palette-placeholder">🎨 Color Palette (Component not available in static mode)</div>');
            }
            // Skip closing tag
          } else {
            // Other components - add placeholder only for opening tags
            if (!isClosing) {
              processedLines.push(`<div class="component-placeholder">📦 ${componentName} Component (Not available in static render)</div>`);
            }
            // Skip all other component tags
          }
        }
        continue;
      }
      
      // Handle import statements (remove for static rendering)
      if (line.trim().startsWith('import ') || line.trim().startsWith('export ')) {
        // Skip import/export statements in static rendering
        continue;
      }
      
      // Handle Svelte each blocks - convert to static HTML
      if (line.trim().startsWith('{#each')) {
        const eachContent = extractEachBlock(lines, i);
        if (eachContent) {
          const staticHtml = processSvelteEach(eachContent.block, eachContent.data);
          processedLines.push(staticHtml);
          i = eachContent.endIndex; // Skip to end of each block
          continue;
        }
      }
      
      // Handle empty lines
      if (line.trim() === '') {
        processedLines.push('');
        continue;
      }
      
      // Regular paragraphs
      if (line.trim() && !line.match(/^<[h1-6|div|p|ul|ol|li]/)) {
        line = `<p>${line}</p>`;
      }
      
      processedLines.push(line);
    }
    
    let html = processedLines.join('\n');
    
    // Clean up extra paragraph tags
    html = html.replace(/<p><h(\d)>/g, '<h$1>');
    html = html.replace(/<\/h(\d)><\/p>/g, '</h$1>');
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p>\s*<\/p>/g, '');
    
    // Close any open tables
    html = closeOpenTables(html);
    
    // Extract component imports
    const componentImports = [];
    const importRegex = /import\s+\{\s*([^}]+)\s*\}\s+from\s+['"]([^'"]+)['"]/g;
    let match;
    
    while ((match = importRegex.exec(html)) !== null) {
      const components = match[1].split(',').map(c => c.trim());
      componentImports.push(...components);
    }
    
    return {
      html,
      frontmatter,
      componentImports: [...new Set(componentImports)] // Remove duplicates
    };
    
  } catch (error) {
    console.error('Simple MDX processing error:', error);
    return processMarkdown(content);
  }
}

/**
 * Fallback markdown processor
 */
export function processMarkdown(content) {
  const { data: frontmatter, content: markdownContent } = matter(content);
  
  let html = markdownContent
    // Headers
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^##### (.+)$/gm, '<h5>$1</h5>')
    .replace(/^###### (.+)$/gm, '<h6>$1</h6>')
    
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<CodeBlock language="$1">{`$2`}</CodeBlock>')
    
    // Inline formatting
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    
    // Paragraphs
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/gm, '<p>$1</p>')
    
    // Clean up
    .replace(/<p><h/g, '<h')
    .replace(/<\/h(\d)><\/p>/g, '</h$1>')
    .replace(/<p><CodeBlock/g, '<CodeBlock')
    .replace(/<\/CodeBlock><\/p>/g, '</CodeBlock>')
    .replace(/<p><\/p>/g, '');
  
  return {
    html,
    frontmatter,
    componentImports: []
  };
}