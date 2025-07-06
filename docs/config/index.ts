/**
 * Documentation Configuration Index
 * Central export point for all documentation configuration (client-safe)
 */

export * from './docs-config';

// Re-export common functions for convenience (client-safe)
export { 
  docsConfig,
  getAllDocItems,
  findDocByHref,
  getDocNavigation,
  getFirstDocItem,
  getDocsByCategory,
  searchDocsByTags,
  docsMetadata
} from './docs-config';

// Export type definitions
export type { DocSection, DocItem } from './docs-config';

// Server-only exports are not included here to avoid Node.js dependencies in client
// Import them directly from './docs-api' in server-side code if needed