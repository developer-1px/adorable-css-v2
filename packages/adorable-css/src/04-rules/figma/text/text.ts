import { rule2, font as fontTransform, getAllValues } from '../../../01-core/ast-utils';

// Typography constants
const WEIGHTS = {thin:'100',extralight:'200',light:'300',regular:'400',normal:'400',medium:'500',semi:'600',semibold:'600',bold:'700',extra:'800',black:'900'};
const FAMILIES = {mono:'monospace',serif:'serif',sans:'sans-serif'};
const LINE_HEIGHTS = {none:'1',tight:'1.25',snug:'1.375',normal:'1.5',relaxed:'1.625',loose:'2'};
const LETTER_SPACINGS = {tighter:'-0.05em',tight:'-0.025em',normal:'0',wide:'0.025em',wider:'0.05em',widest:'0.1em'};

// Simple clamp functionality to avoid circular dependencies
function makeSimpleClamp(value: string): string {
  // Handle double range syntax: xl..30px (min..max with smart preferred)
  const doubleRangeMatch = value.match(/^([^.]+)\.\.([^.]+)$/);
  if (doubleRangeMatch) {
    const [, min, max] = doubleRangeMatch;
    
    // Transform font tokens to CSS variables
    const fontTokens = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'];
    const transformToken = (token: string) => {
      if (fontTokens.includes(token) || /^\d+xl$/.test(token)) {
        return `var(--font-${token})`;
      }
      return token;
    };
    
    const transformedMin = transformToken(min);
    const transformedMax = transformToken(max);
    
    // Generate smart preferred value
    const preferred = '4vw'; // Simple default
    
    return `clamp(${transformedMin}, ${preferred}, ${transformedMax})`;
  }
  
  // Handle triple range syntax: xl..8vh..sm (min..preferred..max)
  const tripleRangeMatch = value.match(/^([^.]+)\.\.([^.]+)\.\.([^.]+)$/);
  if (tripleRangeMatch) {
    const [, min, preferred, max] = tripleRangeMatch;
    return `clamp(${min}, ${preferred}, ${max})`;
  }
  
  return value;
}

// Text properties constants
const TEXT_PROPERTIES = {
  // Text alignment
  left:'text-align:left',center:'text-align:center',right:'text-align:right',justify:'text-align:justify',start:'text-align:start',end:'text-align:end',
  // Text transform
  uppercase:'text-transform:uppercase',lowercase:'text-transform:lowercase',capitalize:'text-transform:capitalize',
  // Text decoration
  underline:'text-decoration:underline',overline:'text-decoration:overline',strike:'text-decoration:line-through',
  // White space
  nowrap:'white-space:nowrap',wrap:'white-space:normal',pre:'white-space:pre','pre-wrap':'white-space:pre-wrap','pre-line':'white-space:pre-line',
  // Vertical alignment (flex-based)
  top:'display:flex;flex-direction:column;justify-content:flex-start',
  middle:'display:flex;flex-direction:column;justify-content:center',
  bottom:'display:flex;flex-direction:column;justify-content:flex-end',
  pack:'display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center'
};

/**
 * Unified text handler that combines typography and text properties
 * Examples:
 * - text(lg) → font-size
 * - text(center) → text-align
 * - text(lg/1.5) → font-size + line-height
 * - text(nowrap+center) → white-space + text-align
 * - text(lg/1.5/tight) → font-size + line-height + letter-spacing
 */
export const text = rule2((s) => {
  const rawValue = getAllValues(s).join('');
  const css = [];
  
  // First check if it's a simple text property (no slash)
  if (!rawValue.includes('/')) {
    // Check for combined properties with +
    if (rawValue.includes('+')) {
      const properties = rawValue.split('+');
      properties.forEach(prop => {
        const trimmedProp = prop.trim();
        if (TEXT_PROPERTIES[trimmedProp as keyof typeof TEXT_PROPERTIES]) {
          css.push(TEXT_PROPERTIES[trimmedProp as keyof typeof TEXT_PROPERTIES]);
        }
      });
      return css.join(';');
    }
    
    // Single text property
    const trimmedValue = rawValue.trim();
    if (TEXT_PROPERTIES[trimmedValue as keyof typeof TEXT_PROPERTIES]) {
      return TEXT_PROPERTIES[trimmedValue as keyof typeof TEXT_PROPERTIES];
    }
  }
  
  // Typography handling (with slashes)
  const parts = rawValue.split('/');
  
  // Process first part - could be font-size or a contextual keyword
  if (parts[0]) {
    const firstPart = parts[0].trim();
    
    // Check if first part has combined properties
    if (firstPart.includes('+')) {
      const props = firstPart.split('+');
      props.forEach(prop => {
        const trimmedProp = prop.trim();
        if (TEXT_PROPERTIES[trimmedProp as keyof typeof TEXT_PROPERTIES]) {
          css.push(TEXT_PROPERTIES[trimmedProp as keyof typeof TEXT_PROPERTIES]);
        }
      });
    }
    // Check if first part is a text property
    else if (TEXT_PROPERTIES[firstPart as keyof typeof TEXT_PROPERTIES]) {
      css.push(TEXT_PROPERTIES[firstPart as keyof typeof TEXT_PROPERTIES]);
    }
    // Check if first part is a contextual keyword
    else if (FAMILIES[firstPart as keyof typeof FAMILIES]) {
      css.push(`font-family:${FAMILIES[firstPart as keyof typeof FAMILIES]}`);
    } else if (WEIGHTS[firstPart as keyof typeof WEIGHTS]) {
      css.push(`font-weight:${WEIGHTS[firstPart as keyof typeof WEIGHTS]}`);
    } else {
      // Otherwise treat as font-size
      // Check for clamp/range syntax
      if (firstPart.includes('..')) {
        const clampValue = makeSimpleClamp(firstPart);
        css.push(`font-size:${clampValue}`);
      } else {
        const fs = fontTransform(firstPart);
        if (fs) css.push(`font-size:${fs}`);
      }
    }
  }
  
  // Process remaining parts contextually by keyword type
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i].trim();
    
    // Check for combined properties with +
    if (part.includes('+')) {
      const props = part.split('+');
      props.forEach(prop => {
        const trimmedProp = prop.trim();
        if (TEXT_PROPERTIES[trimmedProp as keyof typeof TEXT_PROPERTIES]) {
          css.push(TEXT_PROPERTIES[trimmedProp as keyof typeof TEXT_PROPERTIES]);
        }
      });
      continue;
    }
    
    // Text properties
    if (TEXT_PROPERTIES[part as keyof typeof TEXT_PROPERTIES]) {
      css.push(TEXT_PROPERTIES[part as keyof typeof TEXT_PROPERTIES]);
    }
    // Letter spacing keywords (check before line-height to prioritize letter-spacing)
    else if (LETTER_SPACINGS[part as keyof typeof LETTER_SPACINGS]) {
      css.push(`letter-spacing:${LETTER_SPACINGS[part as keyof typeof LETTER_SPACINGS]}`);
    }
    // Line height keywords
    else if (LINE_HEIGHTS[part as keyof typeof LINE_HEIGHTS]) {
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

// Keep font() for explicit font-weight only
export const font = rule2((s) => { 
  const v = getAllValues(s).join(''); 
  return `font-weight:${WEIGHTS[v as keyof typeof WEIGHTS] || v || '700'}`; 
});

// Export other text utilities
export const italic = rule2(() => 'font-style:italic');
export const nowrap = rule2(() => 'white-space:nowrap');
export const wrap = rule2(() => 'white-space:normal');
export const pre = rule2(() => 'white-space:pre');
export const preWrap = rule2(() => 'white-space:pre-wrap');
export const preLine = rule2(() => 'white-space:pre-line');
export const uppercase = rule2(() => 'text-transform:uppercase');
export const lowercase = rule2(() => 'text-transform:lowercase');
export const capitalize = rule2(() => 'text-transform:capitalize');
export const underline = rule2(() => 'text-decoration:underline');
export const overline = rule2(() => 'text-decoration:overline');
export const strike = rule2(() => 'text-decoration:line-through');