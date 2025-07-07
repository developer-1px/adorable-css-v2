// Type definitions
type CSSRule = Record<string, string | Record<string, any>>;
export type RuleHandler = (args: string) => CSSRule;
export type KeywordRuleHandler = () => CSSRule;
import { makeColor, px } from '../../03-values/makeValue';

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
    return {
      'box-shadow': '0 0 20px rgba(99, 102, 241, 0.5)',
      filter: 'drop-shadow(0 0 10px rgba(99, 102, 241, 0.3))'
    };
  }
  
  const glowColor = makeColor(color);
  const shadowSize = px(size);
  const dropShadowSize = px(size / 2);
  
  // RGB 값 추출을 위한 간단한 로직
  let rgbaColor = glowColor;
  if (glowColor.startsWith('#')) {
    // hex to rgba 변환
    const hex = glowColor.slice(1);
    let r, g, b;
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    } else {
      r = 99; g = 102; b = 241; // fallback
    }
    rgbaColor = `rgba(${r}, ${g}, ${b}, ${intensity})`;
  } else if (glowColor.includes('rgba')) {
    // 이미 rgba인 경우 intensity로 조정
    rgbaColor = glowColor.replace(/[\d.]+\)$/, `${intensity})`);
  } else {
    // 다른 색상 포맷인 경우 기본값 사용
    rgbaColor = `rgba(99, 102, 241, ${intensity})`;
  }

  const dropShadowRgba = rgbaColor.replace(/[\d.]+\)$/, `${intensity * 0.6})`);

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
    return {
      'box-shadow': '0 0 0 4px rgba(99, 102, 241, 0.3), 0 0 20px rgba(99, 102, 241, 0.4)',
      outline: 'none'
    };
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