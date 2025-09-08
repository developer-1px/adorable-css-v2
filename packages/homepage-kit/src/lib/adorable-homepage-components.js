// AdorableCSS Homepage Components
// No-margin version using gap-based layout

import { defineComponent } from 'adorable-css';

// Layout Components
export const pageLayout = defineComponent({
  base: 'vbox flex(1) gap(4rem) min-h(screen)',
  states: {
    'mobile': 'gap(2rem)'
  }
});

export const container = defineComponent({
  base: 'vbox w(full) max-w(1200px) mx(auto) px(2rem) z(1) gap(4rem)',
  states: {
    'mobile': 'px(1rem) gap(2rem)'
  }
});

// Typography Components
export const logo = defineComponent({
  base: 'font(caveat) text(4rem..7xl) font(700) tracking(-0.02em) rotate(-2deg) transition',
  states: {
    hover: 'rotate(2deg) scale(1.05)'
  }
});

export const tagline = defineComponent({
  base: 'font(kalam) text(1.8rem) font(300) c(warm-gray) rotate(1deg)'
});

// Sketch Effects Components
export const sketchUnderline = defineComponent({
  base: 'relative inline-block',
  // Would need pseudo element support
  selectors: {
    '&::after': 'content("") absolute bottom(-5px) left(-5px) right(-5px) h(15px) bg(accent-yellow) rotate(-1deg) z(-1) opacity(0.8)'
  }
});

export const sketchCircle = defineComponent({
  base: 'relative inline-block',
  selectors: {
    '&::before': 'content("") absolute top(50%) left(50%) w(120%) h(120%) border(3px/accent-coral) r(full) translate(-50%,-50%) rotate(-5deg) z(-1)'
  }
});

// Hero Components  
export const heroSection = defineComponent({
  base: 'bg(white) border(2px/soft-black) r(20px) p(3rem) relative rotate(-0.5deg) shadow(8px/8px/0/soft-black)',
  selectors: {
    '&::before': 'content("FIGMA → CODE") absolute top(-15px) left(30px) bg(accent-coral) c(white) font(space-mono) font(700) text(0.9rem) px(1rem) py(0.5rem) rotate(-3deg)'
  },
  states: {
    mobile: 'p(2rem) rotate(0)'
  }
});

export const heroContent = defineComponent({
  base: 'vbox gap(2rem) text(1.3rem/1.8) max-w(800px) mx(auto) text(center) font(400)'
});

export const codeExample = defineComponent({
  base: 'vbox gap(0.5rem) font(space-mono) bg(soft-black) c(accent-yellow) p(2rem) r(10px) text(1rem) overflow-x(auto) relative',
  selectors: {
    '&::before': 'content("// adorable.css") absolute top(10px) left(20px) c(warm-gray) text(0.85rem)'
  }
});

export const codeLine = defineComponent({
  base: 'pl(2rem)'
});

// Feature Components
export const featuresGrid = defineComponent({
  base: 'grid grid-cols(repeat(auto-fit,minmax(300px,1fr))) gap(3rem)',
  states: {
    mobile: 'gap(2rem)'
  }
});

export const featureCard = defineComponent({
  base: 'vbox gap(1rem) bg(white) border(2px/soft-black) p(2rem) relative transition',
  variants: {
    first: 'rotate(1deg) r(30px/15px/30px/15px)',
    second: 'rotate(-1deg) r(15px/30px/15px/30px)',
    third: 'rotate(0.5deg) r(20px)'
  },
  states: {
    hover: 'rotate(0) translate-y(-5px) shadow(10px/10px/0/accent-blue)',
    mobile: 'rotate(0)!'
  }
});

export const featureNumber = defineComponent({
  base: 'font(caveat) text(3rem) font(700) c(accent-coral) absolute top(-20px) left(20px)'
});

export const featureTitle = defineComponent({
  base: 'font(kalam) text(2rem) font(700) pt(1rem)'
});

export const featureDescription = defineComponent({
  base: 'text(1.1rem/1.6) c(charcoal)'
});

// CTA Components
export const ctaSection = defineComponent({
  base: 'vbox items(center) gap(2rem) text(center) py(6rem) relative',
  states: {
    mobile: 'py(3rem)'
  }
});

export const ctaSketch = defineComponent({
  base: 'font(caveat) text(1.5rem) c(warm-gray) rotate(-10deg)'
});

export const ctaButton = defineComponent({
  base: 'inline-block font(space-mono) font(700) text(1.4rem) c(soft-black) bg(accent-yellow) px(3rem) py(1.5rem) no-underline border(3px/soft-black) r(50px) relative transition rotate(-1deg)',
  states: {
    hover: 'rotate(1deg) translate-y(-3px) shadow(5px/5px/0/soft-black)'
  }
});

// Doodle Components
export const doodleBg = defineComponent({
  base: 'fixed inset(0) pointer-events(none) opacity(0.03)',
  // Background patterns would need custom CSS
});

export const doodle = defineComponent({
  base: 'absolute font(caveat) text(2rem) c(warm-gray) opacity(0.5) pointer-events(none)',
  variants: {
    1: 'top(10%) left(5%) rotate(-15deg)',
    2: 'top(20%) right(10%) text(1.5rem) rotate(20deg)', 
    3: 'bottom(30%) left(8%) rotate(-10deg)',
    4: 'bottom(20%) right(5%) text(3rem) rotate(15deg)'
  }
});

// Export all components
export default {
  pageLayout,
  container,
  logo,
  tagline,
  sketchUnderline,
  sketchCircle,
  heroSection,
  heroContent,
  codeExample,
  codeLine,
  featuresGrid,
  featureCard,
  featureNumber,
  featureTitle,
  featureDescription,
  ctaSection,
  ctaSketch,
  ctaButton,
  doodleBg,
  doodle
};