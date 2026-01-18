import type { CSSRule, RuleHandler } from '../../03-rules/types';
import { makeColor, px } from '../../01-core/values/makeValue';
import { hexToRgba, adjustRgbaAlpha } from '../../01-core/utils/color-utils';

// glow(color) - 기본 glow 효과
// glow(color/size) - 크기 조절
// glow(color/size/intensity) - 강도 조절
export const glow: RuleHandler = (args?: string): CSSRule => {
  if (!args) {
    return {
      'box-shadow': '0 0 20px rgba(99, 102, 241, 0.5)',
      filter: 'drop-shadow(0 0 10px rgba(99, 102, 241, 0.3))'
    };
  }

  const parts = args.split('/');
  const color = parts[0] || '#6366f1';
  const size = parts[1] ? parseInt(parts[1]) || 20 : 20;
  const intensity = parts[2] ? parseFloat(parts[2]) || 0.5 : 0.5;
  
  // Validate parsed values
  if (isNaN(size) || isNaN(intensity)) {
    console.warn('⚠️  AdorableCSS: Invalid glow values, using defaults');
    return glow();
  }
  
  const glowColor = makeColor(color);
  const shadowSize = px(size);
  const dropShadowSize = px(size / 2);

  // Convert color to rgba with intensity
  let rgbaColor: string;
  if (glowColor.startsWith('#')) {
    rgbaColor = hexToRgba(glowColor, intensity);
  } else if (glowColor.includes('rgba')) {
    rgbaColor = adjustRgbaAlpha(glowColor, intensity);
  } else {
    // Fallback for other color formats
    rgbaColor = `rgba(99, 102, 241, ${intensity})`;
  }

  const dropShadowRgba = adjustRgbaAlpha(rgbaColor, intensity * 0.6);

  return {
    'box-shadow': `0 0 ${shadowSize} ${rgbaColor}`,
    filter: `drop-shadow(0 0 ${dropShadowSize} ${dropShadowRgba})`
  };
};

// glow-pulse - 펄스 애니메이션이 있는 glow
export const glowPulse: RuleHandler = (args?: string): CSSRule => {
  const glowStyles = glow(args);
  return {
    ...glowStyles,
    animation: 'glow-pulse 2s ease-in-out infinite alternate'
  };
};

// glow-ring - 링 형태의 glow
export const glowRing: RuleHandler = (args?: string): CSSRule => {
  const parts = args?.split('/') || [];
  const color = parts[0] || '#6366f1';
  const size = parts[1] ? parseInt(parts[1]) || 4 : 4;
  
  // Validate parsed values
  if (isNaN(size)) {
    console.warn('⚠️  AdorableCSS: Invalid glow-ring values, using defaults');
    return glowRing();
  }
  
  const glowColor = makeColor(color);
  const ringSize = px(size);
  
  return {
    'box-shadow': `0 0 0 ${ringSize} ${glowColor.includes('rgba') ? glowColor : glowColor + '40'}`,
    outline: 'none'
  };
};

export const glowRules = {
  glow,
  'glow-pulse': glowPulse,
  'glow-ring': glowRing
};