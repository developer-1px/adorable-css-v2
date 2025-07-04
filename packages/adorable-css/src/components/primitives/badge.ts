import { defineComponent } from '../defineComponent-unified';
import type { ComponentDefinition } from '../defineComponent-unified';

// Badge component definition
export const badgeDefinition: ComponentDefinition = {
  base: 'hbox(pack) bold(medium) r(sm) py(2) transition',
  
  sizes: {
    xs: 'px(xs) py(1) text(2xs)',
    sm: 'px(sm) text(xs)',
    default: 'px(md) py(xs) text(sm)',
    lg: 'px(lg) py(sm) text(sm)'
  },
  
  variants: {
    default: 'bg(neutral-100) c(neutral-700) b(1/neutral-200)',
    primary: 'bg(primary) c(white) hover:bg(primary-700)',
    secondary: 'bg(neutral-100) c(neutral-700) b(1/neutral-200) hover:bg(neutral-200)',
    success: 'bg(success-100) c(success-800) b(1/success-200) hover:bg(success-200)',
    warning: 'bg(warning-100) c(warning-800) b(1/warning-200) hover:bg(warning-200)',
    error: 'bg(error-100) c(error-800) b(1/error-200) hover:bg(error-200)',
    info: 'bg(primary-100) c(primary-800) b(1/primary-200) hover:bg(primary-200)',
    accent: 'bg(primary-600) c(white) hover:bg(primary-700)',
    muted: 'bg(neutral-100) c(neutral-600) b(1/neutral-200)',
    outline: 'bg(transparent) c(neutral-700) b(1/neutral-300) hover:b(1/neutral-400)'
  }
};

// Badge component using unified defineComponent helper
export const badgeString = defineComponent(badgeDefinition, {
  sizeOptions: ['xs', 'sm', 'default', 'lg'],
  defaultSize: 'default',
  defaultVariant: 'default'
});

// Export badge rules
export const badgeRules = {
  'badge': badgeString
};