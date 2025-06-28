import type { StringRuleHandler, CSSRule } from '../../rules/types';

// String-based badge component with size and color variants
export const badgeString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  if (!args) {
    // Default badge - neutral/gray style
    return [
      'inline-flex items(center) justify(center) px(sm) text(xs) bold(medium) r(full)',
      {
        'background': 'var(--gray-100)',
        'color': 'var(--gray-700)',
        'border': '1px solid var(--gray-200)',
        'transition': 'all 0.2s ease'
      }
    ];
  }

  // Parse arguments to handle both single and combined variants (e.g., "success", "lg", "success/lg")
  const parts = args.split('/');
  let variant = 'default';
  let size = 'default';
  
  // Determine what each part represents
  parts.forEach(part => {
    if (['sm', 'lg'].includes(part)) {
      size = part;
    } else {
      variant = part;
    }
  });
  
  // Base badge classes that are always applied
  const baseClasses = 'inline-flex items(center) justify(center) bold(medium) r(full)';
  
  // Size variants
  const sizeClasses: Record<string, string> = {
    'default': 'px(md) py(xs) text(sm)',
    'sm': 'px(sm) text(xs)',
    'lg': 'px(md) py(sm) text(sm)'
  };
  
  // Variant definitions with mixed AdorableCSS + raw CSS
  const variantDefinitions: Record<string, (string | CSSRule)[]> = {
    // Default (neutral) badge
    default: [
      '',
      {
        'background': 'var(--gray-100)',
        'color': 'var(--gray-700)',
        'border': '1px solid var(--gray-200)',
        'transition': 'all 0.2s ease'
      }
    ],
    
    // Success badge - green family
    success: [
      'bg(success-100) c(success-700) border(1/success-200)'
    ],
    
    // Warning badge - amber family
    warning: [
      'bg(warning-100) c(warning-700) border(1/warning-200)'
    ],
    
    // Error badge - red family
    error: [
      'bg(error-100) c(error-700) border(1/error-200)'
    ],
    
    // Info badge - blue family
    info: [
      'bg(info-100) c(info-700) border(1/info-200)'
    ],
    
    // Primary badge - purple family (filled style)
    primary: [
      'bg(primary) c(white) border(1/transparent)'
    ],
    
    // Secondary badge - gray family
    secondary: [
      'bg(secondary-100) c(secondary-700) border(1/secondary-200)'
    ],
    
    // Accent badge - pink family (filled style)
    accent: [
      'bg(accent) c(white) border(1/transparent)'
    ],
    
    // Mute badge - gray family (subtle)
    mute: [
      'bg(mute-50) c(mute-600) border(1/mute-100)'
    ],
    
    // Outline badge
    outline: [
      '',
      {
        'background': 'transparent',
        'color': 'var(--gray-700)',
        'border': '1px solid var(--gray-300)',
        'transition': 'all 0.2s ease'
      }
    ]
  };
  
  const sizeClass = sizeClasses[size] || sizeClasses.default;
  const variantData = variantDefinitions[variant] || variantDefinitions.default;
  
  // Return mixed array: base classes, size classes, and variant data
  const variantClasses = variantData[0] || '';
  const fullClasses = `${baseClasses} ${sizeClass} ${variantClasses}`.trim();
  
  return fullClasses;
};

// Export string-based rules
export const badgeRules = {
  'badge': badgeString
};