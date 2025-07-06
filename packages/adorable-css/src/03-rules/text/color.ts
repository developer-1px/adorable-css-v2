import type { CSSRule, RuleHandler } from "../types";
import { makeColor } from '../../01-core/values/makeValue';

export const c: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};

  if (args === "current") return { color: "currentColor" };

  // c(135deg/color1..color2..color3) - full gradient syntax matching bg() utility  
  if (args.includes('/') && args.includes('..')) {
    const [angleOrDirection, colors] = args.split('/');
    
    // Handle direction/angle (do NOT apply makeColor to this part!)
    let gradientDirection = '90deg';
    if (angleOrDirection) {
      if (angleOrDirection.includes('deg')) {
        gradientDirection = angleOrDirection;
      } else {
        const directionMap: Record<string, string> = {
          // Short direction names
          'to-r': 'to right',
          'to-l': 'to left', 
          'to-t': 'to top',
          'to-b': 'to bottom',
          'to-tr': 'to top right',
          'to-tl': 'to top left',
          'to-br': 'to bottom right',
          'to-bl': 'to bottom left',
          // Full direction names
          'to-top': 'to top',
          'to-right': 'to right', 
          'to-bottom': 'to bottom',
          'to-left': 'to left',
          'to-top-right': 'to top right',
          'to-top-left': 'to top left',
          'to-bottom-right': 'to bottom right',
          'to-bottom-left': 'to bottom left'
        };
        gradientDirection = directionMap[angleOrDirection] || angleOrDirection;
        
        // If it's a number, add 'deg'
        if (!isNaN(Number(angleOrDirection))) {
          gradientDirection = angleOrDirection + 'deg';
        }
      }
    }

    // Process ONLY colors with .. separator (AdorableCSS v2 spec)
    const colorList = colors ? colors.split('..').map(color => makeColor(color.trim())).join(', ') : '';
    
    return {
      background: `linear-gradient(${gradientDirection}, ${colorList})`,
      "-webkit-background-clip": "text",
      "background-clip": "text", 
      "-webkit-text-fill-color": "transparent",
    };
  }

  // c(red..blue) - simple text gradient with .. syntax
  if (args.includes('..')) {
    const [start, end] = args.split('..');
    const startColor = makeColor(start);
    const endColor = makeColor(end);
    return {
      background: `linear-gradient(90deg, ${startColor}, ${endColor})`,
      "-webkit-background-clip": "text",
      "background-clip": "text",
      "-webkit-text-fill-color": "transparent",
    };
  }

  if (
    args.startsWith("linear-gradient") ||
    args.startsWith("radial-gradient")
  ) {
    return {
      background: args.replace(/\//g, " "),
      "-webkit-background-clip": "text",
      "background-clip": "text",
      "-webkit-text-fill-color": "transparent",
    };
  }

  // Handle special semantic values
  if (args === 'gradient') {
    // Use brand gradient from palette
    const brandGradient = makeColor('brand-gradient-text');
    if (brandGradient && brandGradient !== 'brand-gradient-text') {
      // Parse the gradient value and extract colors
      const gradientMatch = brandGradient.match(/linear-gradient\([^,]+,\s*(.+)\)/);
      if (gradientMatch) {
        return {
          background: `linear-gradient(90deg, ${gradientMatch[1]})`,
          "-webkit-background-clip": "text",
          "background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        };
      }
    }
    // Fallback gradient
    return {
      background: `linear-gradient(135deg, oklch(0.35 0.30 264) 0%, oklch(0.45 0.25 280) 50%, oklch(0.40 0.28 250) 100%)`,
      "-webkit-background-clip": "text",
      "background-clip": "text",
      "-webkit-text-fill-color": "transparent",
    };
  }

  // Handle semantic colors by delegating to makeColor
  // This ensures they resolve through the color palette system
  const semanticMappings: Record<string, string> = {
    'muted': 'mute',        // Map 'muted' to 'mute' semantic color
    'surface': 'surface-base',
    'surface-alt': 'surface-subtle',
    'text': 'text-primary',
    'text-muted': 'text-subtle',
  };

  if (semanticMappings[args]) {
    const processedColor = makeColor(semanticMappings[args]);
    return { color: processedColor };
  }

  // Handle all colors including opacity syntax (white.8, black.2)
  const processedColor = makeColor(args);
  return { color: processedColor };
};