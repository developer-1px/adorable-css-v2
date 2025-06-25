import type { CSSRule, RuleHandler } from '../types';
import { makeColor, px } from '../../values/makeValue';

// card() - 기본 카드 스타일
// card(elevation) - 그림자 강도 조절 (1-5)
// card(elevation/radius) - 그림자와 라운드 조절
export const card: RuleHandler = (args?: string): CSSRule => {
  if (!args) {
    return {
      background: 'white',
      'border-radius': '12px',
      'box-shadow': '0 4px 16px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      overflow: 'hidden'
    };
  }

  const parts = args.split('/');
  const elevation = parts[0] ? parseInt(parts[0]) : 2;
  const radius = parts[1] ? parseInt(parts[1]) : 12;
  
  // 그림자 레벨에 따른 설정
  const shadows = {
    1: '0 1px 3px rgba(0, 0, 0, 0.1)',
    2: '0 4px 16px rgba(0, 0, 0, 0.1)',
    3: '0 8px 24px rgba(0, 0, 0, 0.15)',
    4: '0 16px 32px rgba(0, 0, 0, 0.2)',
    5: '0 24px 48px rgba(0, 0, 0, 0.25)'
  };
  
  const shadow = shadows[Math.min(Math.max(elevation, 1), 5) as keyof typeof shadows] || shadows[2];
  
  return {
    background: 'white',
    'border-radius': String(px(radius)),
    'box-shadow': shadow,
    border: '1px solid rgba(0, 0, 0, 0.05)',
    overflow: 'hidden'
  };
};

// card-hover - 호버 효과가 있는 카드
export const cardHover: RuleHandler = (args?: string): CSSRule => {
  const cardStyles = card(args);
  return {
    ...cardStyles,
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': '{ transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15); }'
  };
};

// card-dark - 다크 테마 카드
export const cardDark: RuleHandler = (args?: string): CSSRule => {
  const parts = args?.split('/') || [];
  const elevation = parts[0] ? parseInt(parts[0]) : 2;
  const radius = parts[1] ? parseInt(parts[1]) : 12;
  
  const shadows = {
    1: '0 1px 3px rgba(0, 0, 0, 0.3)',
    2: '0 4px 16px rgba(0, 0, 0, 0.4)',
    3: '0 8px 24px rgba(0, 0, 0, 0.5)',
    4: '0 16px 32px rgba(0, 0, 0, 0.6)',
    5: '0 24px 48px rgba(0, 0, 0, 0.7)'
  };
  
  const shadow = shadows[Math.min(Math.max(elevation, 1), 5) as keyof typeof shadows] || shadows[2];
  
  return {
    background: '#1a1a1a',
    'border-radius': String(px(radius)),
    'box-shadow': shadow,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    overflow: 'hidden'
  };
};

// card-gradient - 그라디언트 카드
export const cardGradient: RuleHandler = (args?: string): CSSRule => {
  const parts = args?.split('/') || [];
  const color1 = parts[0] || '#667eea';
  const color2 = parts[1] || '#764ba2';
  const direction = parts[2] || '135deg';
  const elevation = parts[3] ? parseInt(parts[3]) : 2;
  
  const baseCard = card(`${elevation}`);
  
  return {
    ...baseCard,
    background: `linear-gradient(${direction}, ${makeColor(color1)}, ${makeColor(color2)})`,
    border: 'none',
    color: 'white'
  };
};

// card-minimal - 미니멀 카드 (보더만)
export const cardMinimal: RuleHandler = (args?: string): CSSRule => {
  const radius = args ? parseInt(args) : 8;
  
  return {
    background: 'transparent',
    'border-radius': String(px(radius)),
    border: '1px solid rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  };
};

export const cardRules = {
  card,
  'card-hover': cardHover,
  'card-dark': cardDark,
  'card-gradient': cardGradient,
  'card-minimal': cardMinimal
};