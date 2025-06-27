/**
 * Semantic Color System for AdorableCSS
 * Using primary/neutral pattern for consistency
 */

export const semanticColors = {
  // Primary brand colors (purple)
  'primary-50': 'var(--purple-50, #faf5ff)',
  'primary-100': 'var(--purple-100, #f3e8ff)', 
  'primary-200': 'var(--purple-200, #e9d5ff)',
  'primary-300': 'var(--purple-300, #d8b4fe)',
  'primary-400': 'var(--purple-400, #c084fc)',
  'primary-500': 'var(--purple-500, #a855f7)',
  'primary-600': 'var(--purple-600, #9333ea)',
  'primary-700': 'var(--purple-700, #7c3aed)',
  'primary-800': 'var(--purple-800, #6b21a8)',
  'primary-900': 'var(--purple-900, #581c87)',
  
  // Neutral colors (gray)
  'neutral-50': 'var(--gray-50, #f9fafb)',
  'neutral-100': 'var(--gray-100, #f3f4f6)',
  'neutral-200': 'var(--gray-200, #e5e7eb)',
  'neutral-300': 'var(--gray-300, #d1d5db)',
  'neutral-400': 'var(--gray-400, #9ca3af)',
  'neutral-500': 'var(--gray-500, #6b7280)',
  'neutral-600': 'var(--gray-600, #4b5563)',
  'neutral-700': 'var(--gray-700, #374151)',
  'neutral-800': 'var(--gray-800, #1f2937)',
  'neutral-900': 'var(--gray-900, #111827)',
  
  // Surface colors (for backgrounds)
  'surface-base': 'var(--white, #ffffff)',
  'surface-subtle': 'var(--gray-50, #f9fafb)',
  'surface-accent': 'var(--purple-50, #faf5ff)',
  'surface-inverse': 'var(--gray-900, #111827)',
  
  // Text colors
  'text-primary': 'var(--gray-900, #111827)',
  'text-secondary': 'var(--gray-600, #4b5563)',
  'text-subtle': 'var(--gray-500, #6b7280)',
  'text-accent': 'var(--purple-600, #9333ea)',
  'text-inverse': 'var(--white, #ffffff)',
  
  // Border colors
  'border-default': 'var(--gray-200, #e5e7eb)',
  'border-accent': 'var(--purple-200, #e9d5ff)',
  'border-subtle': 'var(--gray-100, #f3f4f6)',
  
  // Semantic states (minimal)
  'success': 'var(--green-600, #16a34a)',
  'error': 'var(--red-600, #dc2626)',
  'warning': 'var(--yellow-600, #ca8a04)',
  'info': 'var(--blue-600, #2563eb)'
};

// CSS generation helper
export function generateSemanticColorCSS(): string {
  return Object.entries(semanticColors)
    .map(([name, value]) => `  --${name}: ${value};`)
    .join('\n');
}