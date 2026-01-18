import type { CSSRule, RuleHandler } from '../types';

export const overflow: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { overflow: 'auto' };

  // overflow(x) -> overflow-x: scroll
  if (args === 'x') return { 'overflow-x': 'scroll' };
  if (args === 'y') return { 'overflow-y': 'scroll' };

  // overflow(hidden), overflow(auto), overflow(clip), etc.
  const validValues = ['visible', 'hidden', 'scroll', 'auto', 'clip'];
  if (validValues.includes(args)) {
    return { overflow: args };
  }

  return {};
};

export const scroll: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { overflow: 'auto' };

  // scroll(x) -> overflow-x: auto, overflow-y: hidden
  if (args === 'x') return { 'overflow-x': 'auto', 'overflow-y': 'hidden' };

  // scroll(y) -> overflow-y: auto, overflow-x: hidden
  if (args === 'y') return { 'overflow-y': 'auto', 'overflow-x': 'hidden' };

  // scroll(smooth) -> scroll-behavior: smooth
  if (args === 'smooth' || args === 'auto') return { 'scroll-behavior': args };

  return { overflow: 'auto' };
};

export const clip: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { overflow: 'hidden' };
  if (args === 'none') return { overflow: 'visible' };
  return { overflow: 'hidden' };
};
// ... (keep overflowX/Y as mostly internally valid, but scroll() is the primary verb)
export const overflowX = (args?: string) => args ? { 'overflow-x': args } : { 'overflow-x': 'auto' };
export const overflowY = (args?: string) => args ? { 'overflow-y': args } : { 'overflow-y': 'auto' };

// Scrollbar utilities
export const scrollbar: RuleHandler = (args?: string): CSSRule => {
  if (args === 'hidden' || args === 'none') return { 'scrollbar-width': 'none', '-ms-overflow-style': 'none', '&::-webkit-scrollbar': { display: 'none' } };
  if (args === 'thin') return { 'scrollbar-width': 'thin' };
  if (args === 'auto') return { 'scrollbar-width': 'auto' };
  return {};
};

// Scroll Snap utilities
export const snap: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { 'scroll-snap-type': 'both mandatory' }; // "Default snap container"

  // snap(x) -> x mandatory (implied?) Spec says "Horizontal snap"
  if (args === 'x') return { 'scroll-snap-type': 'x mandatory' };
  if (args === 'y') return { 'scroll-snap-type': 'y mandatory' };

  // snap(hard) -> mandatory
  if (args === 'hard') return { 'scroll-snap-type': 'both mandatory' };
  // snap(soft) -> proximity
  if (args === 'soft') return { 'scroll-snap-type': 'both proximity' };

  return { 'scroll-snap-align': args }; // Fallback? Or maybe snap(start) -> scroll-snap-align
};

export const snapItem: RuleHandler = (args?: string): CSSRule => {
  return { 'scroll-snap-align': args || 'start' };
};

// ... keep overscrollBehavior
export const overscrollBehavior: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { 'overscroll-behavior': 'auto' };
  return { 'overscroll-behavior': args };
};

export const overflowRules = {
  overflow,
  'overflow-x': overflowX,
  'overflow-y': overflowY,
  scroll,
  clip,
  scrollbar,
  snap,
  'snap-item': snapItem,
  'overscroll-behavior': overscrollBehavior
};