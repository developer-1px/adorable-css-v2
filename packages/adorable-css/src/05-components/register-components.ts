/**
 * Register all components to Rule2 system
 */

import { registerRule2 } from '../04-rules/rule2-registry';
import { rule2 } from '../01-core/ast-utils';
import { parseAdorableCSS } from '../01-core/parser/parser';
import { getRule2Definition } from '../04-rules/rule2-registry';

// Import all component rules
import { buttonRules } from './primitives/button';
import { cardRules } from './primitives/card';
import { badgeRules } from './primitives/badge';
import { inputRules } from './primitives/input';
import { headingRules } from './primitives/typography/heading';
import { displayTextRules } from './primitives/typography/display';
import { titleRules } from './primitives/typography/title';
import { bodyRules } from './primitives/typography/body';
import { labelRules } from './primitives/typography/label';
import { captionRules } from './primitives/typography/caption';
import { codeRule } from './primitives/typography/code';
import { menuRules } from './primitives/menu';
import { menuItemRules } from './primitives/menu-item';
import { iconBoxRules } from './primitives/icon-box';
import { codeBlockRules } from './primitives/code-block';
import { tableRules } from './primitives/table';
import { proseRules } from './patterns/prose';
import { containerRules } from './patterns/container';
import { sectionRules } from './patterns/section';

/**
 * Expand utility classes into actual CSS properties using main generator
 */
function expandUtilityClasses(classes: string): string {
  if (!classes) return '';
  
  try {
    // Use the main CSS generator to process the classes
    const classNames = classes.trim().split(/\s+/).filter(Boolean);
    const css = generateCSS(classNames);
    
    // Extract just the CSS properties from the generated CSS
    // Find the class definition and extract the properties
    const match = css.match(/\{([^}]+)\}/);
    if (match && match[1]) {
      // Clean up the CSS properties
      return match[1]
        .replace(/\s*;\s*/g, '; ')
        .replace(/^\s+|\s+$/g, '')
        .replace(/;\s*$/, '');
    }
  } catch (e) {
    console.warn('Failed to expand utility classes:', classes, e);
  }
  
  return '';
}

/**
 * Convert CSS rule object to CSS string with proper selector replacement
 */
function cssRuleToString(cssRule: Record<string, any>, parentClassName: string): string {
  const cssChunks: string[] = [];
  
  for (const [selector, properties] of Object.entries(cssRule)) {
    if (typeof properties === 'object' && properties !== null) {
      const propertyStrings = Object.entries(properties)
        .map(([prop, value]) => `${prop}: ${value}`)
        .join('; ');
      
      if (propertyStrings) {
        // Replace & with the actual parent class name
        const processedSelector = selector.replace(/^&\s*/, `.${parentClassName} `);
        cssChunks.push(`${processedSelector} { ${propertyStrings}; }`);
      }
    }
  }
  
  return cssChunks.join('\n');
}

/**
 * Convert string-based component handler to Rule2 handler
 * Components return expanded class strings that are compiled into CSS
 */
function convertToRule2Handler(name: string, componentHandler: (args?: string) => string | any): (args: any) => string {
  return rule2((node) => {
    // Extract arguments from AST node - check both node.args and node.selector.args
    const argsArray = node.args || node.selector?.args || [];
    const args = argsArray.map((arg: any) => arg.image || arg).join('') || '';
    
    // Call the component handler to get expanded classes
    const result = componentHandler(args);
    
    // Handle different result types
    if (typeof result === 'string') {
      // Simple string result - expand utility classes
      return expandUtilityClasses(result);
    } else if (Array.isArray(result)) {
      // Array result - first element is classes, second might be CSS rule object
      const [classes, cssRule] = result;
      let css = '';
      
      // Expand utility classes from the first element
      if (typeof classes === 'string') {
        css += expandUtilityClasses(classes);
      }
      
      // Add CSS rules from the second element (for selectors)
      if (cssRule && typeof cssRule === 'object') {
        const selectorCSS = cssRuleToString(cssRule, name + '\\(' + args + '\\)');
        if (selectorCSS) {
          css += (css ? '\n' : '') + selectorCSS;
        }
      }
      
      return css;
    }
    
    // Fallback for other types
    return '';
  });
}

/**
 * Register all components as Rule2 handlers
 */
export function registerComponentsAsRule2(): void {
  // Convert and register each component
  const componentDefinitions: Record<string, any> = {
    // Button components
    ...buttonRules,
    
    // Card component
    ...cardRules,
    
    // Badge component
    ...badgeRules,
    
    // Input components
    ...inputRules,
    
    // Typography components
    ...headingRules,
    ...displayTextRules,
    ...titleRules,
    ...bodyRules,
    ...labelRules,
    ...captionRules,
    ...codeRule,
    
    // Menu components
    ...menuRules,
    ...menuItemRules,
    
    // Other primitives
    ...iconBoxRules,
    ...codeBlockRules,
    ...tableRules,
    
    // Pattern components
    ...proseRules,
    ...containerRules,
    ...sectionRules,
  };
  
  // Convert each component to Rule2 handler and register
  Object.entries(componentDefinitions).forEach(([name, handler]) => {
    if (typeof handler === 'function') {
      registerRule2(name, convertToRule2Handler(name, handler), 'components');
    }
  });
}