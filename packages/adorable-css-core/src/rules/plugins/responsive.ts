import type { CSSRule, RuleHandler } from '../types';
import { px } from '../../values/makeValue';

// 반응형 폰트 크기
// font-responsive(min/max) - 뷰포트에 따른 폰트 크기 조절
// font-responsive(16/32) - 16px에서 32px까지 자동 조절
export const fontResponsive: RuleHandler = (args?: string): CSSRule => {
  if (!args) {
    return {
      'font-size': 'clamp(1rem, 4vw, 2rem)'
    };
  }

  const parts = args.split('/');
  if (parts.length === 2) {
    const minSize = parseFloat(parts[0]);
    const maxSize = parseFloat(parts[1]);
    const vwValue = Math.round((maxSize - minSize) / 20 * 100) / 100; // 20% viewport scaling
    
    return {
      'font-size': `clamp(${px(minSize)}, ${vwValue}vw, ${px(maxSize)})`
    };
  }
  
  // 단일 값인 경우 해당 크기 기준으로 자동 계산
  const baseSize = parseFloat(args);
  const minSize = baseSize * 0.75;
  const maxSize = baseSize * 1.5;
  const vwValue = Math.round((maxSize - minSize) / 20 * 100) / 100;
  
  return {
    'font-size': `clamp(${px(minSize)}, ${vwValue}vw, ${px(maxSize)})`
  };
};

// 반응형 간격
// gap-responsive(min/max) - 뷰포트에 따른 gap 조절
export const gapResponsive: RuleHandler = (args?: string): CSSRule => {
  if (!args) {
    return {
      gap: 'clamp(1rem, 4vw, 2rem)'
    };
  }

  const parts = args.split('/');
  if (parts.length === 2) {
    const minGap = parseFloat(parts[0]);
    const maxGap = parseFloat(parts[1]);
    const vwValue = Math.round((maxGap - minGap) / 20 * 100) / 100;
    
    return {
      gap: `clamp(${px(minGap)}, ${vwValue}vw, ${px(maxGap)})`
    };
  }
  
  const baseGap = parseFloat(args);
  const minGap = baseGap * 0.5;
  const maxGap = baseGap * 1.5;
  const vwValue = Math.round((maxGap - minGap) / 20 * 100) / 100;
  
  return {
    gap: `clamp(${px(minGap)}, ${vwValue}vw, ${px(maxGap)})`
  };
};

// 반응형 패딩
// p-responsive(min/max) - 뷰포트에 따른 패딩 조절
export const pResponsive: RuleHandler = (args?: string): CSSRule => {
  if (!args) {
    return {
      padding: 'clamp(1rem, 4vw, 2rem)'
    };
  }

  const parts = args.split('/');
  if (parts.length === 2) {
    const minPadding = parseFloat(parts[0]);
    const maxPadding = parseFloat(parts[1]);
    const vwValue = Math.round((maxPadding - minPadding) / 20 * 100) / 100;
    
    return {
      padding: `clamp(${px(minPadding)}, ${vwValue}vw, ${px(maxPadding)})`
    };
  }
  
  const basePadding = parseFloat(args);
  const minPadding = basePadding * 0.5;
  const maxPadding = basePadding * 1.5;
  const vwValue = Math.round((maxPadding - minPadding) / 20 * 100) / 100;
  
  return {
    padding: `clamp(${px(minPadding)}, ${vwValue}vw, ${px(maxPadding)})`
  };
};

// 반응형 컨테이너
// container-responsive() - 반응형 컨테이너
export const containerResponsive: RuleHandler = (args?: string): CSSRule => {
  const maxWidth = args ? px(parseFloat(args)) : '1200px';
  
  return {
    width: '100%',
    'max-width': `${maxWidth}`,
    'margin-left': 'auto',
    'margin-right': 'auto',
    'padding-left': 'clamp(1rem, 4vw, 2rem)',
    'padding-right': 'clamp(1rem, 4vw, 2rem)'
  };
};

// 반응형 그리드
// grid-responsive(cols) - 반응형 그리드
// grid-responsive(1/3) - 모바일 1열, 데스크톱 3열
export const gridResponsive: RuleHandler = (args?: string): CSSRule => {
  if (!args) {
    return {
      display: 'grid',
      'grid-template-columns': 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: 'clamp(1rem, 4vw, 2rem)'
    };
  }

  const parts = args.split('/');
  if (parts.length === 2) {
    const mobileCols = parseInt(parts[0]);
    const desktopCols = parseInt(parts[1]);
    
    return {
      display: 'grid',
      'grid-template-columns': `repeat(${mobileCols}, 1fr)`,
      gap: 'clamp(1rem, 4vw, 2rem)',
      '@media (min-width: 768px)': `grid-template-columns: repeat(${desktopCols}, 1fr)`
    };
  }
  
  const cols = parseInt(args);
  const minWidth = 300 / cols;
  
  return {
    display: 'grid',
    'grid-template-columns': `repeat(auto-fit, minmax(${minWidth}px, 1fr))`,
    gap: 'clamp(1rem, 4vw, 2rem)'
  };
};

export const responsiveRules = {
  'font-responsive': fontResponsive,
  'gap-responsive': gapResponsive,
  'p-responsive': pResponsive,
  'container-responsive': containerResponsive,
  'grid-responsive': gridResponsive
};