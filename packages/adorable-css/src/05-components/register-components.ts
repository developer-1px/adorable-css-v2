/**
 * Register all components as Rule2 handlers
 * This allows components to be used as CSS rules like: body(sm), btn(primary/lg), etc.
 */

import { registerRule2 } from '../04-rules/rule2-registry';

// Import all component rules
import { cardRules } from './primitives/card';
import { buttonRules } from './primitives/button';
import { headingRules } from './primitives/typography/heading';
import { displayTextRules } from './primitives/typography/display';
import { titleRules } from './primitives/typography/title';
import { bodyRules } from './primitives/typography/body';
import { labelRules } from './primitives/typography/label';
import { captionRules } from './primitives/typography/caption';
import { inputRules } from './primitives/input';
import { badgeRules } from './primitives/badge';
import { iconBoxRules } from './primitives/icon-box';
import { codeBlockRules } from './primitives/code-block';
import { codeRule } from './primitives/typography/code';
import { menuRules } from './primitives/menu';
import { menuItemRules } from './primitives/menu-item';
import { tableRules } from './primitives/table';

// Import pattern rules
import { sectionRules } from './patterns/section';
import { proseRules } from './patterns/prose';

// Import chat component rules
// import { simpleSlackRules } from './chat/simple-components'; // Commented out - file doesn't exist
import { containerRules } from './patterns/container';
import { heroRules } from './patterns/hero';

// Import parser and generator for expanding component classes
import { parseAdorableCSS } from '../01-core/parser/parser';
import { getRule2Definition } from '../04-rules/rule2-registry';

// Helper function to expand component classes into CSS
function expandComponentClasses(classes: string): string {
  const classList = classes.split(/\s+/).filter(Boolean);
  const cssProperties: string[] = [];
  
  for (const className of classList) {
    try {
      // Parse the class
      const parseResult = parseAdorableCSS(className);
      
      // Process each node in the parse result
      for (const node of parseResult.value) {
        const actualSelector = node.selector || node;
        
        // Determine rule name
        const ruleName = actualSelector.type === 'position' 
          ? '__positionType' 
          : actualSelector.type === 'function' 
            ? actualSelector.name 
            : (node.image || actualSelector.image || node.name);
        
        // Get the rule definition
        const rule2Definition = getRule2Definition(ruleName);
        if (rule2Definition) {
          const css = rule2Definition.handler(node);
          if (css) {
            cssProperties.push(css);
          }
        }
      }
    } catch (e) {
      // Skip unparseable classes
      console.warn(`Failed to parse component class: ${className}`, e);
    }
  }
  
  return cssProperties.join(';');
}

// Helper function to convert StringRuleHandler to Rule2Handler
function convertToRule2Handler(stringHandler: any) {
  return (args: any) => {
    // Convert args to string format that component expects
    let argString = '';
    
    // Handle different AST node structures
    if (typeof args === 'string') {
      argString = args;
    } else if (args?.selector?.args && args.selector.args.length > 0) {
      // Function with arguments - extract all arg values
      argString = args.selector.args
        .map((arg: any) => arg.image || arg.value || '')
        .filter((v: string) => v && v !== '/')
        .join('/');
    } else if (args?.image) {
      argString = args.image;
    } else if (args?.value?.[0]?.image) {
      argString = args.value[0].image;
    }
    
    const result = stringHandler(argString);
    
    // If result is a string, expand the component classes into CSS
    if (typeof result === 'string') {
      return expandComponentClasses(result);
    }
    
    // If result is an array, join strings and handle CSS objects
    if (Array.isArray(result)) {
      const cssStrings: string[] = [];
      const cssObjects: Record<string, any>[] = [];
      
      for (const item of result) {
        if (typeof item === 'string') {
          cssStrings.push(item);
        } else {
          // TODO: Handle CSS objects properly for selectors
          cssObjects.push(item);
        }
      }
      
      // Expand all string parts into CSS
      const combinedClasses = cssStrings.join(' ');
      return expandComponentClasses(combinedClasses);
    }
    
    return '';
  };
}

// Export the converter function so it can be used externally
export { convertToRule2Handler };

// Register components with the Rule2 system
export function registerComponents(components: Record<string, any>): void {
  try {
    let count = 0;
    
    // Convert and register each component
    for (const [componentName, componentHandler] of Object.entries(components)) {
      if (componentHandler && typeof componentHandler === 'function') {
        const rule2Handler = convertToRule2Handler(componentHandler);
        registerRule2(componentName, rule2Handler, 'components');
        count++;
      }
    }
    
    if (typeof console !== 'undefined' && count > 0) {
      console.log(`AdorableCSS: Registered ${count} components`);
    }
  } catch (error) {
    if (typeof console !== 'undefined') {
      console.error('AdorableCSS: Failed to register components:', error);
    }
  }
}

// Register all built-in component rules
export function registerComponentsAsRule2(): void {
  try {
    // Register primitive component rules
    const allRules = {
      ...cardRules,
      ...buttonRules,
      ...headingRules,
      ...displayTextRules,
      ...titleRules,
      ...bodyRules,
      ...labelRules,
      ...captionRules,
      ...inputRules,
      ...badgeRules,
      ...iconBoxRules,
      ...codeBlockRules,
      ...codeRule,
      ...menuRules,
      ...menuItemRules,
      ...tableRules,
      
      // Register pattern rules
      ...sectionRules,
      ...proseRules,
      ...containerRules,
      ...heroRules,
      
      // Register chat component rules
      // ...simpleSlackRules // Commented out - file doesn't exist
    };
    
    registerComponents(allRules);
  } catch (error) {
    if (typeof console !== 'undefined') {
      console.error('AdorableCSS: Failed to register built-in components:', error);
    }
  }
}