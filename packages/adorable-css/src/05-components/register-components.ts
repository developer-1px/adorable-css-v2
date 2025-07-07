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

/**
 * Expand utility classes into actual CSS properties
 */
function expandUtilityClasses(classes: string): string {
  if (!classes) return '';
  
  const cssProperties: string[] = [];
  const classNames = classes.trim().split(/\s+/);
  
  for (const className of classNames) {
    if (!className) continue;
    
    try {
      // Parse each utility class
      const parsed = parseAdorableCSS(className);
      
      parsed.value.forEach((node: any) => {
        const selector = node.selector || node;
        const ruleName = selector.type === 'function' ? selector.name : selector.image;
        
        // Skip pseudo-classes for now (hover:, focus:, etc.)
        if (className.includes(':')) return;
        
        const rule2Definition = getRule2Definition(ruleName);
        if (rule2Definition) {
          const css = rule2Definition.handler(node);
          if (css) {
            cssProperties.push(css);
          }
        }
      });
    } catch (e) {
      // Skip invalid classes
    }
  }
  
  return cssProperties.join(';');
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
    
    // Get the class string
    let classes = '';
    if (typeof result === 'string') {
      classes = result;
    } else if (Array.isArray(result) && result.length >= 1) {
      classes = result[0];
    }
    
    // Expand utility classes into CSS properties
    return expandUtilityClasses(classes);
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
  };
  
  // Convert each component to Rule2 handler and register
  Object.entries(componentDefinitions).forEach(([name, handler]) => {
    if (typeof handler === 'function') {
      registerRule2(name, convertToRule2Handler(name, handler), 'components');
    }
  });
}