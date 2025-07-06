import type { CSSRule, RuleHandler } from '../types';

const clipValues: Record<string, string> = {
  'text': 'text',
  'border': 'border-box',
  'padding': 'padding-box',
  'content': 'content-box'
};

export const bgClip: RuleHandler = (v?: string): CSSRule => {
  if (!v) return {};
  
  const value = clipValues[v] || v;
  
  return {
    'background-clip': value,
    '-webkit-background-clip': value,
    // For text clipping, we need transparent text color
    ...(v === 'text' ? { 
      '-webkit-text-fill-color': 'transparent',
      'color': 'transparent' 
    } : {})
  };
};

// Alias for convenience
export const backgroundClip = bgClip;

export const backgroundClipRules = {
  'bg-clip': bgClip,
  'background-clip': backgroundClip
};