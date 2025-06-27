import type { CSSRule, RuleHandler } from '../../rules/types';

// interactive - 인터랙티브 요소 기본 스타일 (버튼, 링크, 카드 등)
export const interactive: RuleHandler = (args?: string): CSSRule => {
  const level = args ? parseInt(args) : 1;
  
  // 레벨별 인터랙션 강도
  const interactions = {
    1: { // subtle
      transition: 'all 0.15s ease',
      cursor: 'pointer',
      '&:hover': {
        opacity: '0.8'
      },
      '&:active': {
        opacity: '0.6'
      }
    },
    2: { // gentle
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      '&:hover': {
        transform: 'translateY(-1px)',
        'box-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)'
      },
      '&:active': {
        transform: 'translateY(0)',
        'box-shadow': 'none'
      }
    },
    3: { // moderate
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      '&:hover': {
        transform: 'translateY(-2px) scale(1.02)',
        'box-shadow': '0 4px 12px rgba(0, 0, 0, 0.15)'
      },
      '&:active': {
        transform: 'translateY(0) scale(0.98)'
      }
    },
    4: { // pronounced
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      '&:hover': {
        transform: 'translateY(-4px) scale(1.05)',
        'box-shadow': '0 8px 24px rgba(0, 0, 0, 0.2)'
      },
      '&:active': {
        transform: 'translateY(0) scale(0.95)'
      }
    },
    5: { // dramatic
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      'transform-style': 'preserve-3d',
      '&:hover': {
        transform: 'translateY(-6px) scale(1.08) rotateX(5deg)',
        'box-shadow': '0 16px 32px rgba(0, 0, 0, 0.25)'
      },
      '&:active': {
        transform: 'translateY(0) scale(0.92)'
      }
    }
  };
  
  return interactions[Math.min(Math.max(level, 1), 5) as keyof typeof interactions] || interactions[1];
};

// clickable - 클릭 가능한 요소 (더 심플한 버전)
export const clickable: RuleHandler = (): CSSRule => {
  return {
    cursor: 'pointer',
    'user-select': 'none',
    '-webkit-tap-highlight-color': 'transparent',
    'touch-action': 'manipulation'
  };
};

// hoverable - 호버 효과만 있는 요소
export const hoverable: RuleHandler = (args?: string): CSSRule => {
  const effect = args || 'opacity';
  
  const effects = {
    opacity: {
      transition: 'opacity 0.2s ease',
      '&:hover': {
        opacity: '0.7'
      }
    },
    lift: {
      transition: 'transform 0.2s ease',
      '&:hover': {
        transform: 'translateY(-2px)'
      }
    },
    scale: {
      transition: 'transform 0.2s ease',
      '&:hover': {
        transform: 'scale(1.05)'
      }
    },
    glow: {
      transition: 'box-shadow 0.2s ease',
      '&:hover': {
        'box-shadow': '0 0 20px rgba(0, 0, 0, 0.2)'
      }
    }
  };
  
  return {
    cursor: 'pointer',
    ...(effects[effect as keyof typeof effects] || effects.opacity)
  };
};

// pressable - 누르는 느낌이 있는 요소
export const pressable: RuleHandler = (): CSSRule => {
  return {
    cursor: 'pointer',
    transition: 'all 0.1s ease',
    'user-select': 'none',
    '&:active': {
      transform: 'scale(0.95)',
      opacity: '0.8'
    }
  };
};

// draggable - 드래그 가능한 요소
export const draggable: RuleHandler = (): CSSRule => {
  return {
    cursor: 'grab',
    'user-select': 'none',
    '&:active': {
      cursor: 'grabbing'
    }
  };
};

// selectable - 선택 가능한 요소 (체크박스, 라디오 등)
export const selectable: RuleHandler = (): CSSRule => {
  return {
    cursor: 'pointer',
    'user-select': 'none',
    transition: 'all 0.15s ease',
    '&:hover': {
      'background-color': 'rgba(0, 0, 0, 0.02)'
    },
    '&[data-selected="true"]': {
      'background-color': 'rgba(14, 165, 233, 0.1)',
      'border-color': 'var(--colors-primary)'
    }
  };
};

// focusable - 포커스 가능한 요소
export const focusable: RuleHandler = (): CSSRule => {
  return {
    outline: 'none',
    '&:focus': {
      'box-shadow': '0 0 0 3px rgba(14, 165, 233, 0.2)',
      'border-color': 'var(--colors-primary)'
    },
    '&:focus-visible': {
      'box-shadow': '0 0 0 3px rgba(14, 165, 233, 0.3)',
      'border-color': 'var(--colors-primary)'
    }
  };
};

export const interactiveRules = {
  interactive,
  clickable,
  hoverable,
  pressable,
  draggable,
  selectable,
  focusable
};