import type { CSSRule, RuleHandler } from '../../rules/types';
import { makeColor, px } from '../../core/values/makeValue';

// gradient-text - 텍스트 그라디언트
// gradient-text(color1/color2) - 두 색상 그라디언트
// gradient-text(color1/color2/direction) - 방향 지정
export const gradientText: RuleHandler = (args?: string): CSSRule => {
  if (!args) {
    return {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      '-webkit-background-clip': 'text',
      'background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      'background-size': '100%'
    };
  }

  const parts = args.split('/');
  const color1 = makeColor(parts[0] || '#667eea');
  const color2 = makeColor(parts[1] || '#764ba2');
  const direction = parts[2] || '135deg';

  return {
    background: `linear-gradient(${direction}, ${color1}, ${color2})`,
    '-webkit-background-clip': 'text',
    'background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    'background-size': '100%'
  };
};

// backdrop-blur - 백드롭 블러
export const backdropBlur: RuleHandler = (args?: string): CSSRule => {
  const blurValue = args ? parseInt(args) : 10;
  return {
    'backdrop-filter': `blur(${px(blurValue)})`
  };
};

// morphism - 뉴모피즘 효과
// morphism() - 기본 뉴모피즘
// morphism(size) - 그림자 크기 조절
// morphism(size/intensity) - 그림자 강도 조절
export const morphism: RuleHandler = (args?: string): CSSRule => {
  const parts = args?.split('/') || [];
  const size = parts[0] ? parseInt(parts[0]) : 20;
  const intensity = parts[1] ? parseFloat(parts[1]) : 0.15;
  
  return {
    background: '#e0e0e0',
    'border-radius': `${size}px`,
    'box-shadow': `${size}px ${size}px ${size * 2}px rgba(0, 0, 0, ${intensity}), -${size}px -${size}px ${size * 2}px rgba(255, 255, 255, 0.7)`,
    border: 'none'
  };
};

// morphism-inset - 눌린 뉴모피즘
export const morphismInset: RuleHandler = (args?: string): CSSRule => {
  const parts = args?.split('/') || [];
  const size = parts[0] ? parseInt(parts[0]) : 20;
  const intensity = parts[1] ? parseFloat(parts[1]) : 0.15;
  
  return {
    background: '#e0e0e0',
    'border-radius': `${size}px`,
    'box-shadow': `inset ${size}px ${size}px ${size * 2}px rgba(0, 0, 0, ${intensity}), inset -${size}px -${size}px ${size * 2}px rgba(255, 255, 255, 0.7)`,
    border: 'none'
  };
};

// neon - 네온 효과
// neon(color) - 네온 색상 지정
export const neon: RuleHandler = (args?: string): CSSRule => {
  const color = makeColor(args || '#00ffff');
  
  return {
    color: color,
    'text-shadow': `0 0 5px ${color}, 0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color}`,
    animation: 'neon-flicker 1.5s infinite alternate'
  };
};

// float-animation - 플로팅 애니메이션
export const floatAnimation: RuleHandler = (args?: string): CSSRule => {
  const duration = args ? `${args}s` : '3s';
  const distance = args?.includes('/') ? args.split('/')[1] : '10';
  
  return {
    animation: `float-${distance} ${duration} ease-in-out infinite`
  };
};

// parallax - 패럴랙스 효과
export const parallax: RuleHandler = (args?: string): CSSRule => {
  const speed = args ? parseFloat(args) : 0.5;
  
  return {
    transform: `translate3d(0, calc(var(--scroll-y, 0) * ${speed}), 0)`,
    'will-change': 'transform'
  };
};

// sticky-header - 스티키 헤더
export const stickyHeader: RuleHandler = (args?: string): CSSRule => {
  const offset = args ? px(parseInt(args)) : '0px';
  
  return {
    position: 'sticky',
    top: `${offset}`,
    'z-index': '1000',
    'backdrop-filter': 'blur(10px)',
    background: 'rgba(255, 255, 255, 0.9)',
    'border-bottom': '1px solid rgba(0, 0, 0, 0.1)'
  };
};

// loading-spinner - 로딩 스피너
export const loadingSpinner: RuleHandler = (args?: string): CSSRule => {
  const size = args ? px(parseInt(args)) : '20px';
  const color = args?.includes('/') ? makeColor(args.split('/')[1]) : '#6366f1';
  
  return {
    width: `${size}`,
    height: `${size}`,
    border: `2px solid rgba(0, 0, 0, 0.1)`,
    'border-top': `2px solid ${color}`,
    'border-radius': '50%',
    animation: 'spin 1s linear infinite'
  };
};

// skeleton - 스켈레톤 로딩
export const skeleton: RuleHandler = (): CSSRule => {
  return {
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    'background-size': '200% 100%',
    animation: 'skeleton-loading 1.5s infinite',
    'border-radius': '4px'
  };
};

export const advancedRules = {
  'gradient-text': gradientText,
  'backdrop-blur': backdropBlur,
  morphism,
  'morphism-inset': morphismInset,
  neon,
  'float-animation': floatAnimation,
  parallax,
  'sticky-header': stickyHeader,
  'loading-spinner': loadingSpinner,
  skeleton
};