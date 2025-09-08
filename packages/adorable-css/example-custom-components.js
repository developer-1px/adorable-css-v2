// Example of using defineComponent and registerComponents
import { defineComponent, registerComponents } from './dist/index.js';

// Define custom components
const myButton = defineComponent({
  base: 'hbox(pack) px(md) py(sm) r(md) font(medium) transition',
  variants: {
    primary: 'bg(blue-500) c(white) hover:bg(blue-600)',
    secondary: 'bg(gray-100) c(gray-900) hover:bg(gray-200)',
    danger: 'bg(red-500) c(white) hover:bg(red-600)'
  },
  sizes: {
    sm: 'text(sm) px(sm) py(xs)',
    md: 'text(base) px(md) py(sm)',
    lg: 'text(lg) px(lg) py(md)'
  },
  defaults: {
    variant: 'primary',
    size: 'md'
  }
});

const myCard = defineComponent({
  base: 'p(lg) r(lg) bg(white) shadow(md)',
  variants: {
    outlined: 'border(1/gray-200) shadow(none)',
    elevated: 'shadow(xl) hover:shadow(2xl) transition',
    flat: 'shadow(none) bg(gray-50)'
  }
});

// Register all custom components at once
registerComponents({
  'my-btn': myButton,
  'my-card': myCard
});

// Now you can use them in CSS generation:
// generateCSS(['my-btn(danger/lg)', 'my-card(elevated)'])