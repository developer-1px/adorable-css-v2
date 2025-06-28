import type { CSSRule, RuleHandler } from '../../rules/types';

export const figmaFrame: RuleHandler = (): CSSRule => ({
  'position': 'relative',
  'border': '1px dashed #5e5ad2',
  'background': '#ffffff',
  'box-shadow': '0 0 0 0.5px #e0e0e0',
  '&::before': {
    'content': '""',
    'position': 'absolute',
    'top': '-6px',
    'left': '-6px',
    'width': '6px',
    'height': '6px',
    'background': '#5e5ad2',
    'border-radius': '1px'
  },
  '&::after': {
    'content': '""',
    'position': 'absolute',
    'top': '-6px',
    'right': '-6px',
    'width': '6px',
    'height': '6px',
    'background': '#5e5ad2',
    'border-radius': '1px'
  }
});

export const figmaSelected: RuleHandler = (): CSSRule => ({
  'position': 'relative',
  'outline': '2px solid #0c8ce9',
  'outline-offset': '2px',
  '&::before': {
    'content': '""',
    'position': 'absolute',
    'inset': '-8px',
    'border': '1px solid #0c8ce9',
    'pointer-events': 'none'
  }
});

export const figmaAutolayout: RuleHandler = (): CSSRule => ({
  'position': 'relative',
  'background': 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(94, 90, 210, 0.04) 10px, rgba(94, 90, 210, 0.04) 20px)',
  '&::before': {
    'content': '"Auto"',
    'position': 'absolute',
    'top': '4px',
    'left': '4px',
    'font-size': '10px',
    'font-weight': '600',
    'color': '#5e5ad2',
    'background': '#f5f5ff',
    'padding': '2px 6px',
    'border-radius': '3px',
    'line-height': '1'
  }
});

export const figmaComponent: RuleHandler = (): CSSRule => ({
  'position': 'relative',
  '&::before': {
    'content': '"◈"',
    'position': 'absolute',
    'top': '-8px',
    'left': '8px',
    'color': '#7b61ff',
    'font-size': '14px',
    'background': 'white',
    'padding': '0 4px',
    'line-height': '1'
  }
});

export const figmaLayer: RuleHandler = (): CSSRule => ({
  'transition': 'all 0.2s ease',
  '&:hover': {
    'box-shadow': '0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.05)'
  }
});

export const figmaComponents = {
  'figma-frame': figmaFrame,
  'figma-selected': figmaSelected,
  'figma-autolayout': figmaAutolayout,
  'figma-component': figmaComponent,
  'figma-layer': figmaLayer
};