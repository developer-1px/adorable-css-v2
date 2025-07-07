// Type definitions
type CSSRule = Record<string, string | Record<string, any>>;
export type RuleHandler = (args: string) => CSSRule;
export type KeywordRuleHandler = () => CSSRule;
import type { StringRuleHandler } from '../defineComponent-unified';
// Table component handler
export const table: StringRuleHandler = () => {
  return [
    'w(fill)',
    'border-collapse(collapse)',
    'text(sm)',
    'bg(white)',
    'r(lg)',
    'overflow(hidden)',
    'shadow(sm)',
    
    // Additional CSS for complex selectors
    {
      '& thead': {
        'background-color': 'var(--colors-gray-50)',
        'border-bottom': '2px solid var(--colors-gray-200)'
      },
      '& th': {
        'padding': 'var(--spacing-md)',
        'text-align': 'left',
        'font-weight': '600',
        'color': 'var(--colors-gray-700)',
        'white-space': 'nowrap'
      },
      '& tbody tr': {
        'border-bottom': '1px solid var(--colors-gray-100)',
        'transition': 'background-color 0.15s ease'
      },
      '& tbody tr:hover': {
        'background-color': 'var(--colors-gray-50)'
      },
      '& tbody tr:last-child': {
        'border-bottom': 'none'
      },
      '& td': {
        'padding': 'var(--spacing-md)',
        'color': 'var(--colors-gray-600)'
      }
    }
  ];
};

// Table wrapper for responsive
export const tableWrapper: StringRuleHandler = () => {
  return [
    'w(fill)',
    'overflow-x(auto)',
    {
      '-webkit-overflow-scrolling': 'touch'
    }
  ];
};

// Table variants
export const tableCompact: StringRuleHandler = () => {
  return [
    'text(xs)',
    {
      '& th, & td': {
        'padding': 'var(--spacing-sm)'
      }
    }
  ];
};

export const tableStriped: StringRuleHandler = () => {
  return [
    {
      '& tbody tr:nth-child(even)': {
        'background-color': 'var(--colors-gray-50)'
      }
    }
  ];
};

export const tableBordered: StringRuleHandler = () => {
  return [
    'ring(1/gray-200)',
    {
      '& th, & td': {
        'border': '1px solid var(--colors-gray-200)'
      }
    }
  ];
};

export const tableFixed: StringRuleHandler = () => {
  return [
    {
      'table-layout': 'fixed'
    }
  ];
};

export const tableRules = {
  table,
  'table-wrapper': tableWrapper,
  'table-compact': tableCompact,
  'table-striped': tableStriped,
  'table-bordered': tableBordered,
  'table-fixed': tableFixed
};