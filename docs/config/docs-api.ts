/**
 * Documentation API
 * Provides programmatic access to documentation system
 */

import type { DocsConfig } from './docs-config';

// Check if we're in a server environment
const isServer = typeof process !== 'undefined' && process.versions?.node;

// Lazy import functions for Node.js modules
async function getNodeModules() {
  if (!isServer) {
    throw new Error('Node.js modules are only available on the server');
  }
  
  const [fs, path] = await Promise.all([
    import('fs'),
    import('path')
  ]);
  
  return {
    readFileSync: fs.readFileSync,
    existsSync: fs.existsSync,
    join: path.join,
    resolve: path.resolve
  };
}

export interface DocContent {
  title: string;
  description?: string;
  content: string;
  frontmatter?: Record<string, unknown>;
  path: string;
  category?: 'public' | 'internal' | 'api';
  tags?: string[];
}

export interface DocSearchResult {
  item: DocsConfig;
  score: number;
  highlights: string[];
}

/**
 * Get all doc items (avoiding circular dependency)
 */
function getAllDocItems(): DocsConfig[] {
  // Import here to avoid circular dependency
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { docsConfig } = require('./docs-config');
  return docsConfig;
}

/**
 * Get document content by href
 */
export async function getDocContent(href: string): Promise<DocContent | null> {
  const docItem = getAllDocItems().find(item => item.href === href);
  
  if (!docItem || !docItem.source) {
    return null;
  }
  
  try {
    const { readFileSync, existsSync, join, resolve } = await getNodeModules();
    
    const monorepoRoot = resolve(process.cwd(), '../..');
    const filePath = docItem.source.startsWith('/')
      ? join(monorepoRoot, docItem.source)
      : resolve(process.cwd(), docItem.source);
    
    if (!existsSync(filePath)) {
      console.error(`Document file not found: ${filePath}`);
      return null;
    }
    
    const content = readFileSync(filePath, 'utf-8');
    
    // Extract frontmatter if exists
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    const frontmatter = frontmatterMatch 
      ? parseFrontmatter(frontmatterMatch[1])
      : {};
    
    const mainContent = frontmatterMatch
      ? content.slice(frontmatterMatch[0].length).trim()
      : content;
    
    return {
      title: frontmatter.title || docItem.title,
      description: frontmatter.description || docItem.description,
      content: mainContent,
      frontmatter,
      path: docItem.source,
      category: docItem.category,
      tags: docItem.tags
    };
  } catch (error) {
    console.error(`Error reading document: ${error}`);
    return null;
  }
}

/**
 * Search documents by query
 */
export function searchDocs(query: string, options?: {
  category?: 'public' | 'internal' | 'api';
  tags?: string[];
  limit?: number;
}): DocSearchResult[] {
  const queryLower = query.toLowerCase();
  const words = queryLower.split(/\s+/).filter(Boolean);
  
  let items = getAllDocItems();
  
  // Filter by category
  if (options?.category) {
    items = items.filter(item => item.category === options.category);
  }
  
  // Filter by tags
  if (options?.tags && options.tags.length > 0) {
    items = items.filter(item => 
      item.tags && options.tags!.some(tag => item.tags?.includes(tag))
    );
  }
  
  // Score and sort results
  const results: DocSearchResult[] = items
    .map(item => {
      let score = 0;
      const highlights: string[] = [];
      
      // Title matching (highest weight)
      const titleLower = item.title.toLowerCase();
      if (titleLower === queryLower) {
        score += 100;
        highlights.push(item.title);
      } else if (titleLower.includes(queryLower)) {
        score += 50;
        highlights.push(item.title);
      } else {
        words.forEach(word => {
          if (titleLower.includes(word)) {
            score += 20;
          }
        });
      }
      
      // Description matching (medium weight)
      if (item.description) {
        const descLower = item.description.toLowerCase();
        if (descLower.includes(queryLower)) {
          score += 30;
          highlights.push(item.description);
        } else {
          words.forEach(word => {
            if (descLower.includes(word)) {
              score += 10;
            }
          });
        }
      }
      
      // Tag matching (lower weight)
      if (item.tags) {
        item.tags.forEach(tag => {
          if (tag.toLowerCase().includes(queryLower)) {
            score += 15;
            highlights.push(`Tag: ${tag}`);
          }
        });
      }
      
      return { item, score, highlights };
    })
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score);
  
  // Apply limit
  if (options?.limit) {
    return results.slice(0, options.limit);
  }
  
  return results;
}

/**
 * Get documentation structure as tree
 */
export function getDocTree(): DocsConfig[] {
  return getAllDocItems();
}

/**
 * Get documentation statistics
 */
export function getDocStats() {
  const allDocs = getAllDocItems();
  const byCategory = {
    public: 0,
    internal: 0,
    api: 0,
    uncategorized: 0
  };
  
  const bySection: Record<string, number> = {};
  const allTags = new Set<string>();
  
  allDocs.forEach(doc => {
    // Count by category
    if (doc.category) {
      byCategory[doc.category]++;
    } else {
      byCategory.uncategorized++;
    }
    
    // Count by section
    bySection[doc.section] = (bySection[doc.section] || 0) + 1;
    
    // Collect tags
    if (doc.tags) {
      doc.tags.forEach(tag => allTags.add(tag));
    }
  });
  
  return {
    total: allDocs.length,
    byCategory,
    bySection,
    tags: Array.from(allTags).sort(),
    sections: getAllDocItems().map(s => s.title)
  };
}

/**
 * Validate documentation structure
 */
export async function validateDocs(): Promise<{
  valid: boolean;
  errors: string[];
  warnings: string[];
}> {
  const errors: string[] = [];
  const warnings: string[] = [];
  const allDocs = getAllDocItems();
  const seenHrefs = new Set<string>();
  const seenSources = new Set<string>();
  
  for (const doc of allDocs) {
    // Check for duplicate hrefs
    if (seenHrefs.has(doc.href)) {
      errors.push(`Duplicate href: ${doc.href}`);
    }
    seenHrefs.add(doc.href);
    
    // Check for duplicate sources
    if (doc.source) {
      if (seenSources.has(doc.source)) {
        warnings.push(`Duplicate source file: ${doc.source}`);
      }
      seenSources.add(doc.source);
      
      // Check if source file exists (server-side only)
      try {
        const { existsSync, join, resolve } = await getNodeModules();
        const monorepoRoot = resolve(process.cwd(), '../..');
        const filePath = doc.source.startsWith('/')
          ? join(monorepoRoot, doc.source)
          : resolve(process.cwd(), doc.source);
        
        if (!existsSync(filePath)) {
          errors.push(`Missing source file: ${doc.source} (${doc.title})`);
        }
      } catch (_error) {
        warnings.push(`Cannot validate file existence on client: ${doc.source}`);
      }
    }
    
    // Check for missing category
    if (!doc.category) {
      warnings.push(`Missing category for: ${doc.title}`);
    }
    
    // Check for missing tags
    if (!doc.tags || doc.tags.length === 0) {
      warnings.push(`Missing tags for: ${doc.title}`);
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

// Helper function to parse frontmatter
function parseFrontmatter(content: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const lines = content.split('\n');
  
  for (const line of lines) {
    const match = line.match(/^(\w+):\s*(.+)$/);
    if (match) {
      const [, key, value] = match;
      // Handle boolean values
      if (value === 'true') result[key] = true;
      else if (value === 'false') result[key] = false;
      // Handle numbers
      else if (/^\d+$/.test(value)) result[key] = parseInt(value);
      else if (/^\d+\.\d+$/.test(value)) result[key] = parseFloat(value);
      // Handle arrays (simple comma-separated)
      else if (value.includes(',')) result[key] = value.split(',').map(s => s.trim());
      // Otherwise string
      else result[key] = value.trim();
    }
  }
  
  return result;
}