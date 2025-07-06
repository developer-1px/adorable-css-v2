import type { StringRuleHandler, CSSRule } from '../../03-rules/types';

// String-based hero 04-components (new approach)
export const heroString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  // shadcn/ui inspired hero with sophisticated styling
  if (!args) {
    // Default hero: modern minimal with subtle gradient
    return [
      'vbox(center) min-h(100vh) relative clip bg(white) px(24) py(32)',
      {
        // Subtle background gradient for depth
        'background': 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120, 119, 198, 0.3), rgba(255, 255, 255, 0))',
        // Smooth transitions
        '&::before': {
          'content': '""',
          'position': 'absolute',
          'inset': '0',
          'background': 'radial-gradient(circle at 20% 80%, transparent 0%, rgba(255, 255, 255, 0.8) 50%)',
          'pointer-events': 'none'
        }
      }
    ];
  }
  
  const heroVariants: Record<string, (string | CSSRule)[]> = {
    // Full hero with modern gradient
    full: [
      'vbox(center) min-h(100vh) relative clip bg(white) px(24) py(32)',
      {
        'background': 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120, 119, 198, 0.3), rgba(255, 255, 255, 0))',
        '&::before': {
          'content': '""',
          'position': 'absolute',
          'inset': '0',
          'background': 'radial-gradient(circle at 20% 80%, transparent 0%, rgba(255, 255, 255, 0.8) 50%)',
          'pointer-events': 'none'
        }
      }
    ],
    
    // Gradient hero - more prominent gradient
    gradient: [
      'vbox(center) min-h(100vh) relative clip px(24) py(32)',
      {
        'background': 'linear-gradient(to bottom right, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
        'position': 'relative',
        '&::after': {
          'content': '""',
          'position': 'absolute',
          'inset': '0',
          'background': 'radial-gradient(circle at 70% 40%, transparent 0%, rgba(255, 255, 255, 0.5) 50%)',
          'pointer-events': 'none'
        }
      }
    ],
    
    // Split hero (text + visual)
    split: [
      'grid grid(1fr_1fr) items(center) gap(48) min-h(80vh) px(24) py(32)',
      {
        '@media (max-width: 768px)': {
          'grid-template-columns': '1fr',
          'text-align': 'center',
          'gap': '2rem'
        }
      }
    ],
    
    // Compact hero
    compact: [
      'vbox(center) min-h(50vh) relative px(24) py(clamp(3rem,8vw,6rem))',
      {
        'background': 'linear-gradient(to bottom, var(--gray-50), transparent)'
      }
    ],
    
    // Dark hero - shadcn style dark mode
    dark: [
      'vbox(center) min-h(100vh) relative clip bg(gray-900) c(white) px(24) py(32)',
      {
        'background': 'radial-gradient(circle at 25% 0%, #1a1a2e 0%, #09090b 50%)',
        '&::before': {
          'content': '""',
          'position': 'absolute',
          'inset': '0',
          'background': 'radial-gradient(ellipse at top, rgba(120, 119, 198, 0.2), transparent 50%)',
          'pointer-events': 'none'
        }
      }
    ],
    
    // Minimal hero
    minimal: 'vbox(center) min-h(60vh) px(24) py(clamp(4rem,10vw,8rem)) bg(white)'
  };
  
  return heroVariants[args] || heroVariants.full;
};

export const heroContentString: StringRuleHandler = (): string | (string | CSSRule)[] => {
  return [
    'relative z(10) max-w(5xl) mx(auto) text(center)',
    {
      'animation': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      // 'opacity': '0',
      '@keyframes fadeInUp': {
        'to': {
          'opacity': '1',
          'transform': 'translateY(0)'
        },
        'from': {
          'opacity': '0',
          'transform': 'translateY(20px)'
        }
      }
    }
  ];
};

export const heroBackgroundString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const backgrounds: Record<string, (string | CSSRule)[]> = {
    // Modern gradient mesh
    gradient: [
      'absolute inset(0) z(0)',
      {
        'background': `
          radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 1) 0px, transparent 0%),
          radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 1) 0px, transparent 50%),
          radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 1) 0px, transparent 50%),
          radial-gradient(at 10% 29%, hsla(256, 96%, 67%, 1) 0px, transparent 50%),
          radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 1) 0px, transparent 50%),
          radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 1) 0px, transparent 50%),
          radial-gradient(at 79% 53%, hsla(343, 68%, 79%, 1) 0px, transparent 50%)`,
        'filter': 'blur(100px) saturate(150%)',
        'opacity': '0.15'
      }
    ],
    
    // Subtle dots pattern
    dots: [
      'absolute inset(0) z(0)',
      {
        'background-image': `radial-gradient(circle at 1px 1px, var(--gray-400) 1px, transparent 1px)`,
        'background-size': '40px 40px',
        'opacity': '0.4',
        'mask-image': 'radial-gradient(ellipse at center, black 40%, transparent 70%)'
      }
    ],
    
    // Grid pattern
    grid: [
      'absolute inset(0) z(0)',
      {
        'background-image': `
          linear-gradient(var(--gray-200) 1px, transparent 1px),
          linear-gradient(90deg, var(--gray-200) 1px, transparent 1px)`,
        'background-size': '50px 50px',
        'opacity': '0.5',
        'mask-image': 'radial-gradient(ellipse at center, black 40%, transparent 70%)'
      }
    ],
    
    // Noise texture
    noise: [
      'absolute inset(0) z(0)',
      {
        'opacity': '0.03',
        'background': `
          url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        'filter': 'contrast(2)'
      }
    ]
  };
  
  return backgrounds[args || 'gradient'] || backgrounds.gradient;
};

// Export string-based 03-rules
export const heroRules = {
  'hero': heroString,
  'hero-content': heroContentString,
  'hero-bg': heroBackgroundString
};