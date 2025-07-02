import { defineComponent } from '../defineComponent-unified';

// Table component with AdorableCSS styling
export const { 
  rules: tableRules, 
  generateCSS: tableGenerateCSS 
} = defineComponent({
  name: 'table',
  defaultClass: 'table',
  rules: {
    // Base table styles
    table: {
      'width': '100%',
      'border-collapse': 'collapse',
      'font-size': 'var(--font-sm)',
      'background-color': 'white',
      'border-radius': 'var(--radius-lg)',
      'overflow': 'hidden',
      'box-shadow': 'var(--shadow-sm)'
    },
    
    // Table wrapper for responsive
    'table-wrapper': {
      'width': '100%',
      'overflow-x': 'auto',
      '-webkit-overflow-scrolling': 'touch'
    },
    
    // Table header
    'table thead': {
      'background-color': 'var(--color-gray-50)',
      'border-bottom': '2px solid var(--color-gray-200)'
    },
    
    'table th': {
      'padding': 'var(--spacing-md)',
      'text-align': 'left',
      'font-weight': '600',
      'color': 'var(--color-gray-700)',
      'white-space': 'nowrap'
    },
    
    // Table body
    'table tbody tr': {
      'border-bottom': '1px solid var(--color-gray-100)',
      'transition': 'background-color 0.15s ease'
    },
    
    'table tbody tr:hover': {
      'background-color': 'var(--color-gray-50)'
    },
    
    'table tbody tr:last-child': {
      'border-bottom': 'none'
    },
    
    'table td': {
      'padding': 'var(--spacing-md)',
      'color': 'var(--color-gray-600)'
    },
    
    // Variants
    'table-compact': {
      'font-size': 'var(--font-xs)'
    },
    
    'table-compact th': {
      'padding': 'var(--spacing-sm)'
    },
    
    'table-compact td': {
      'padding': 'var(--spacing-sm)'
    },
    
    'table-striped tbody tr:nth-child(even)': {
      'background-color': 'var(--color-gray-50)'
    },
    
    'table-bordered': {
      'border': '1px solid var(--color-gray-200)'
    },
    
    'table-bordered th': {
      'border': '1px solid var(--color-gray-200)'
    },
    
    'table-bordered td': {
      'border': '1px solid var(--color-gray-200)'
    },
    
    // Alignment helpers
    'table-center th': {
      'text-align': 'center'
    },
    
    'table-center td': {
      'text-align': 'center'
    },
    
    // Fixed layout
    'table-fixed': {
      'table-layout': 'fixed'
    },
    
    // Responsive table
    'table-responsive': {
      'display': 'block',
      'width': '100%',
      'overflow-x': 'auto',
      '-webkit-overflow-scrolling': 'touch'
    }
  }
});

export const table = tableRules;