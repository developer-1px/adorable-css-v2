import type { CSSRule, RuleHandler } from '../../rules/types';
import { px } from '../../../values/makeValue';

// tab-active - 활성 탭 스타일
export const tabActive: RuleHandler = (args?: string): CSSRule => {
  const variant = args || 'default';
  
  const variants = {
    default: {
      color: 'var(--colors-primary)',
      'background-color': 'rgba(14, 165, 233, 0.05)',
      'font-weight': '600',
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        height: '3px',
        'background-color': 'var(--colors-primary)',
        'border-radius': '3px 3px 0 0'
      }
    },
    minimal: {
      color: 'var(--colors-primary)',
      'font-weight': '600',
      'border-bottom': '2px solid var(--colors-primary)'
    },
    pill: {
      color: 'white',
      'background-color': 'var(--colors-primary)',
      'border-radius': '9999px',
      'font-weight': '500'
    }
  };
  
  return variants[variant as keyof typeof variants] || variants.default;
};

// tab-inactive - 비활성 탭 스타일
export const tabInactive: RuleHandler = (args?: string): CSSRule => {
  const variant = args || 'default';
  
  const variants = {
    default: {
      color: 'var(--colors-gray-600)',
      'background-color': 'transparent',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      '&:hover': {
        color: 'var(--colors-gray-900)',
        'background-color': 'rgba(0, 0, 0, 0.02)'
      }
    },
    minimal: {
      color: 'var(--colors-gray-600)',
      'border-bottom': '2px solid transparent',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      '&:hover': {
        color: 'var(--colors-gray-900)'
      }
    },
    pill: {
      color: 'var(--colors-gray-700)',
      'background-color': 'transparent',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      '&:hover': {
        'background-color': 'rgba(0, 0, 0, 0.05)'
      }
    }
  };
  
  return variants[variant as keyof typeof variants] || variants.default;
};

// tab-container - 탭 컨테이너 스타일
export const tabContainer: RuleHandler = (args?: string): CSSRule => {
  const variant = args || 'default';
  
  const variants = {
    default: {
      display: 'flex',
      gap: '0',
      'align-items': 'flex-end',
      height: '64px',
      'border-bottom': '1px solid var(--colors-gray-200)'
    },
    minimal: {
      display: 'flex',
      gap: '1rem',
      'align-items': 'center',
      'border-bottom': '1px solid var(--colors-gray-200)'
    },
    pill: {
      display: 'flex',
      gap: '0.5rem',
      'align-items': 'center',
      padding: '0.25rem',
      'background-color': 'var(--colors-gray-100)',
      'border-radius': '9999px'
    },
    vertical: {
      display: 'flex',
      'flex-direction': 'column',
      gap: '0.25rem',
      width: '200px'
    }
  };
  
  return variants[variant as keyof typeof variants] || variants.default;
};

// tab-item - 개별 탭 아이템 기본 스타일
export const tabItem: RuleHandler = (args?: string): CSSRule => {
  const padding = args || 'md';
  
  const paddings = {
    sm: '0.5rem 1rem',
    md: '0.75rem 1.5rem',
    lg: '1rem 2rem'
  };
  
  return {
    padding: paddings[padding as keyof typeof paddings] || paddings.md,
    border: 'none',
    background: 'none',
    'font-size': '0.875rem',
    'font-weight': '500',
    'white-space': 'nowrap',
    position: 'relative',
    transition: 'all 0.2s ease'
  };
};

// tab-panel - 탭 콘텐츠 패널
export const tabPanel: RuleHandler = (args?: string): CSSRule => {
  const padding = args || 'xl';
  
  const paddings = {
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem'
  };
  
  return {
    padding: paddings[padding as keyof typeof paddings] || paddings.xl,
    'animation': 'fadeIn 0.2s ease-in-out'
  };
};

export const tabSystemRules = {
  'tab-active': tabActive,
  'tab-inactive': tabInactive,
  'tab-container': tabContainer,
  'tab-item': tabItem,
  'tab-panel': tabPanel
};