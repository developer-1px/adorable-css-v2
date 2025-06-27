import type { CSSRule, RuleHandler } from "../types";
import { makeColor } from '../../core/values/makeValue';

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
      } else if (['to-r', 'to-l', 'to-t', 'to-b', 'to-tr', 'to-tl', 'to-br', 'to-bl'].includes(angleOrDirection)) {
        const directionMap: Record<string, string> = {
          'to-r': 'to right',
          'to-l': 'to left', 
          'to-t': 'to top',
          'to-b': 'to bottom',
          'to-tr': 'to top right',
          'to-tl': 'to top left',
          'to-br': 'to bottom right',
          'to-bl': 'to bottom left'
        };
        gradientDirection = directionMap[angleOrDirection] || '90deg';
      } else if (!isNaN(Number(angleOrDirection))) {
        gradientDirection = angleOrDirection + 'deg';
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

  // Handle all colors including opacity syntax (white.8, black.2)
  const processedColor = makeColor(args);
  return { color: processedColor };
};
