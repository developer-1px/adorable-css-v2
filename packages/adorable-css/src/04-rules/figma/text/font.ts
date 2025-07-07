import { rule2, font as fontTransform, getAllValues, getFirstValue } from '../../../01-core/ast-utils';

const WEIGHTS = {thin:'100',extralight:'200',light:'300',regular:'400',normal:'400',medium:'500',semi:'600',semibold:'600',bold:'700',extra:'800',black:'900'};
const FAMILIES = {mono:'monospace',serif:'serif',sans:'sans-serif'};
const LINE_HEIGHTS = {none:'1',tight:'1.25',snug:'1.375',normal:'1.5',relaxed:'1.625',loose:'2'};
const LETTER_SPACINGS = {tighter:'-0.05em',tight:'-0.025em',normal:'0',wide:'0.025em',wider:'0.05em',widest:'0.1em'};

export const font = rule2((s) => {
  const parts = getAllValues(s).join('').split('/');
  const css = [];
  
  // Process first part - could be font-size or a contextual keyword
  if (parts[0]) {
    const firstPart = parts[0].trim();
    
    // Check if first part is a contextual keyword
    if (FAMILIES[firstPart as keyof typeof FAMILIES]) {
      css.push(`font-family:${FAMILIES[firstPart as keyof typeof FAMILIES]}`);
    } else if (WEIGHTS[firstPart as keyof typeof WEIGHTS]) {
      css.push(`font-weight:${WEIGHTS[firstPart as keyof typeof WEIGHTS]}`);
    } else {
      // Otherwise treat as font-size
      const fs = fontTransform(firstPart);
      if (fs) css.push(`font-size:${fs}`);
    }
  }
  
  // Process remaining parts contextually by keyword type
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i].trim();
    
    // Line height keywords (check first to prioritize 'normal' as line-height)
    if (LINE_HEIGHTS[part as keyof typeof LINE_HEIGHTS]) {
      css.push(`line-height:${LINE_HEIGHTS[part as keyof typeof LINE_HEIGHTS]}`);
    }
    // Font weight keywords
    else if (WEIGHTS[part as keyof typeof WEIGHTS]) {
      css.push(`font-weight:${WEIGHTS[part as keyof typeof WEIGHTS]}`);
    }
    // Font family keywords  
    else if (FAMILIES[part as keyof typeof FAMILIES]) {
      css.push(`font-family:${FAMILIES[part as keyof typeof FAMILIES]}`);
    }
    // Letter spacing keywords
    else if (LETTER_SPACINGS[part as keyof typeof LETTER_SPACINGS]) {
      css.push(`letter-spacing:${LETTER_SPACINGS[part as keyof typeof LETTER_SPACINGS]}`);
    }
    // Numeric line-height (1.2, 1.5, etc)
    else if (/^\d+(\.\d+)?$/.test(part) && +part <= 4) {
      css.push(`line-height:${part}`);
    }
    // Pixel line-height (20px, etc)
    else if (part.endsWith('px')) {
      css.push(`line-height:${part}`);
    }
    // Percentage letter-spacing
    else if (part.includes('%')) {
      const value = +part.replace('%', '') / 100;
      css.push(`letter-spacing:${value}em`);
    }
  }
  
  return css.join(';');
});

export const bold = rule2((s) => { const v = getFirstValue(s); return `font-weight:${WEIGHTS[v as keyof typeof WEIGHTS] || v || '700'}`; });
export const italic = rule2(() => 'font-style:italic');
