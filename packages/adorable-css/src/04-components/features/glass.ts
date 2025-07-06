import type { CSSRule, RuleHandler } from '../../03-rules/types';
import { makeColor, px } from '../../01-core/values/makeValue';

// glass() - 기본 glassmorphism
// glass(blur) - 블러 강도 조절
// glass(blur/opacity) - 블러와 투명도 조절
// glass(blur/opacity/color) - 모든 값 커스터마이징
export const glass: RuleHandler = (args?: string): CSSRule => {
  if (!args) {
    return {
      background: 'rgba(255, 255, 255, 0.1)',
      'backdrop-filter': 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      'border-radius': '12px'
    };
  }

  const parts = args.split('/');
  const blurValue = parts[0] ? parseInt(parts[0]) || 10 : 10;
  const opacity = parts[1] ? parseFloat(parts[1]) || 0.1 : 0.1;
  const color = parts[2] || 'white';
  
  // Validate parsed values
  if (isNaN(blurValue) || isNaN(opacity)) {
    console.warn('⚠️  AdorableCSS: Invalid glass values, using defaults');
    return glass();
  }
  
  const blur = px(blurValue);
  const baseColor = makeColor(color);
  
  // 색상에서 RGB 값 추출 및 투명도 적용
  let backgroundColor = `rgba(255, 255, 255, ${opacity})`;
  let borderColor = `rgba(255, 255, 255, ${opacity * 2})`;
  
  if (baseColor.startsWith('#')) {
    const hex = baseColor.slice(1);
    let r, g, b;
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else {
      r = parseInt(hex.substr(0, 2), 16);
      g = parseInt(hex.substr(2, 2), 16);
      b = parseInt(hex.substr(4, 2), 16);
    }
    backgroundColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
    borderColor = `rgba(${r}, ${g}, ${b}, ${opacity * 2})`;
  } else if (baseColor === 'black') {
    backgroundColor = `rgba(0, 0, 0, ${opacity})`;
    borderColor = `rgba(255, 255, 255, ${opacity * 0.5})`;
  }

  return {
    background: backgroundColor,
    'backdrop-filter': `blur(${blur})`,
    border: `1px solid ${borderColor}`,
    'border-radius': '12px'
  };
};

// glass-card - 카드 형태의 glass
export const glassCard: RuleHandler = (args?: string): CSSRule => {
  const glassStyles = glass(args);
  return {
    ...glassStyles,
    padding: '24px',
    'box-shadow': '0 8px 32px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    position: 'relative'
  };
};

// glass-nav - 네비게이션용 glass
export const glassNav: RuleHandler = (args?: string): CSSRule => {
  const glassStyles = glass(args || '16/0.08');
  return {
    ...glassStyles,
    'border-radius': '0',
    'border-left': 'none',
    'border-right': 'none',
    'backdrop-filter': `${glassStyles['backdrop-filter']} saturate(180%)`
  };
};

// glass-dark - 다크 테마용 glass
export const glassDark: RuleHandler = (args?: string): CSSRule => {
  const parts = args?.split('/') || [];
  const blurValue = parts[0] ? parseInt(parts[0]) || 10 : 10;
  const opacity = parts[1] ? parseFloat(parts[1]) || 0.1 : 0.1;
  
  // Validate parsed values
  if (isNaN(blurValue) || isNaN(opacity)) {
    console.warn('⚠️  AdorableCSS: Invalid glass-dark values, using defaults');
    return glassDark();
  }
  
  return {
    background: `rgba(0, 0, 0, ${opacity})`,
    'backdrop-filter': `blur(${px(blurValue)})`,
    border: `1px solid rgba(255, 255, 255, ${opacity})`,
    'border-radius': '12px'
  };
};

export const glassRules = {
  glass,
  'glass-card': glassCard,
  'glass-nav': glassNav,
  'glass-dark': glassDark
};