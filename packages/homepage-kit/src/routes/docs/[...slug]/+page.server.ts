import { error } from '@sveltejs/kit';
import { readFile } from 'fs/promises';
import { join, resolve } from 'path';
import { docsConfig } from '$lib/docs-config';
import { processMDX, processMarkdown } from '$lib/mdx/simple-processor.js';

export async function load({ params }) {
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : (params.slug || 'introduction');
  const href = `/docs/${slug}`;
  
  console.log('Loading docs page:', { slug, href, params });
  
  // Find the doc item in config
  const docItem = docsConfig
    .flatMap(section => section.items)
    .find(item => item.href === href);
    
  if (!docItem) {
    throw error(404, 'Document not found');
  }
  
  // If there's a source file, read it
  if (docItem.source) {
    try {
      // Resolve the path relative to the monorepo root
      // Current working directory is packages/homepage-kit
      const monorepoRoot = resolve(process.cwd(), '../..');
      const filePath = docItem.source.startsWith('/')
        ? join(monorepoRoot, docItem.source)
        : resolve(process.cwd(), docItem.source);
      
      console.log('Loading document:', {
        source: docItem.source,
        cwd: process.cwd(),
        monorepoRoot,
        filePath
      });
      
      const content = await readFile(filePath, 'utf-8');
      
      // Check if it's MDX or MD
      const isMdx = docItem.source.endsWith('.mdx');
      
      let result;
      
      if (isMdx) {
        // Use our enhanced MDX processor
        result = await processMDX(content);
      } else {
        // Use simple markdown processor
        result = processMarkdown(content);
      }
      
      return {
        title: result.frontmatter?.title || docItem.title,
        description: result.frontmatter?.description || docItem.description,
        html: result.html,
        frontmatter: result.frontmatter,
        componentImports: result.componentImports || [],
        source: docItem.source,
        isMdx
      };
      
    } catch (err) {
      console.error(`Error reading file ${docItem.source}:`, err);
      const message = err instanceof Error ? err.message : 'Unknown error';
      throw error(500, `Failed to load document: ${message}`);
    }
  }
  
  // If no source file, return basic info
  return {
    title: docItem.title,
    description: docItem.description,
    html: `<h1>${docItem.title}</h1><p>${docItem.description || 'Content coming soon...'}</p>`,
    frontmatter: {},
    componentImports: [],
    isMdx: false
  };
}