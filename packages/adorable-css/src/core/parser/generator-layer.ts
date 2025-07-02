/**
 * Layer-based CSS Generator for AdorableCSS v2
 * Uses CSS @layer instead of specificity hacks
 */

import { parseAdorableCSS } from './parser';
import { cssObjectToCssText } from '../generators/css-object-generator';
import { makeValue } from '../values/makeValue';
import type { CSSRule } from '../../rules/types';
import { layerRegistry, CSSLayer } from '../../rules/layer-registry';
import { 
  ResponsiveSelector, 
  StateSelector, 
  isResponsiveClass, 
  isStateClass, 
  createStateCSS 
} from '../../extensions/responsive/responsive-decorator';
import { AnimationHandler } from '../generators/animation-handler';
import { memoize } from '../utils/memo';

// Helper type for CSS generation results
interface CSSResult {
  mainCSS: string;
  nestedCSS: string[];
  layer?: CSSLayer;
}

// Cache for parsed results
const _generateCSSFromAdorableCSS = memoize((value: string): string => {
  const result = parseAdorableCSS(value);

  // Handle parse errors
  if (result.type === "error") {
    console.warn(`⚠️  AdorableCSS: Invalid AdorableCSS syntax: ${value}`);
    return "";
  }

  const actualSelector = `.${result.escapedSelector}`;
  const allCSSResults: CSSResult[] = [];
  let hasValidRules = false;

  // Process each parsed value
  result.value.forEach((v) => {
    const cssResult = handleRegularSelector(v, result.rawSelector);
    
    allCSSResults.push(cssResult);
    if (cssResult.mainCSS || cssResult.nestedCSS.length > 0) {
      hasValidRules = true;
    }
  });

  // Warn about parsed but empty rules
  if (!hasValidRules && result.value.length > 0) {
    console.warn(`⚠️  AdorableCSS: Class "${value}" parsed successfully but generated no CSS`);
  }
  
  // Don't generate empty CSS rules
  if (allCSSResults.every(r => !r.mainCSS && r.nestedCSS.length === 0)) {
    return "";
  }

  // Group CSS by layer
  const cssPartsByLayer = new Map<CSSLayer | undefined, string[]>();
  
  allCSSResults.forEach(result => {
    if (result.mainCSS || result.nestedCSS.length > 0) {
      const layer = result.layer;
      
      if (!cssPartsByLayer.has(layer)) {
        cssPartsByLayer.set(layer, []);
      }
      
      const parts = cssPartsByLayer.get(layer)!;
      
      // Add main CSS
      if (result.mainCSS) {
        parts.push(`${actualSelector}{${result.mainCSS}}`);
      }
      
      // Add nested CSS
      parts.push(...result.nestedCSS);
    }
  });

  // Build final CSS with layers
  const finalCSS: string[] = [];
  
  // Add CSS for each layer
  cssPartsByLayer.forEach((parts, layer) => {
    if (parts.length === 0) return;
    
    const cssContent = parts.join('');
    
    if (layer) {
      // Wrap in @layer
      finalCSS.push(`@layer ${layer}{${cssContent}}`);
    } else {
      // No layer (for backwards compatibility)
      finalCSS.push(cssContent);
    }
  });

  return finalCSS.join('');
});

// Handle regular selector processing
function handleRegularSelector(v: any, rawSelector: string): CSSResult {
  const result: CSSResult = {
    mainCSS: '',
    nestedCSS: []
  };

  if (v.type === "utility") {
    const name = v.name;
    const args = v.args as string | undefined;
    
    // Check CSS object rules
    const handler = layerRegistry.getHandler(name);
    if (handler) {
      const ruleInfo = layerRegistry.getRule(name);
      const generatedCSS = typeof handler === 'function' 
        ? (args !== undefined ? handler(args) : (handler as any)())
        : {};
      
      const { mainCSS, nestedCSS } = processCSSObject(generatedCSS, `.${rawSelector}`);
      result.mainCSS = mainCSS;
      result.nestedCSS = nestedCSS;
      result.layer = ruleInfo?.layer;
      return result;
    }
    
    // Check string rules
    const stringHandler = layerRegistry.getStringHandler(name);
    if (stringHandler) {
      const ruleInfo = layerRegistry.getRule(name);
      const output = typeof stringHandler === 'function'
        ? (args !== undefined ? stringHandler(args) : (stringHandler as any)())
        : '';
      
      const processedResult = processStringRuleOutput(output, rawSelector);
      result.mainCSS = processedResult.mainCSS;
      result.nestedCSS = processedResult.nestedCSS;
      result.layer = ruleInfo?.layer;
      return result;
    }
    
    console.warn(`⚠️  AdorableCSS: Rule handler not found for "${name}"`);
  }
  
  return result;
}

// Process CSS object to extract main and nested CSS
function processCSSObject(cssObject: CSSRule, selector: string): { mainCSS: string; nestedCSS: string[] } {
  const mainProps: Record<string, string> = {};
  const nestedCSS: string[] = [];
  
  Object.entries(cssObject).forEach(([key, value]) => {
    if (value === undefined) return;
    
    if (key.startsWith('@') || key.startsWith(':')) {
      // Nested rule
      if (typeof value === 'object') {
        const nestedContent = cssObjectToCssText(value);
        if (nestedContent) {
          nestedCSS.push(`${key}{${selector}{${nestedContent}}}`);
        }
      }
    } else if (typeof value === 'object') {
      // Nested selector
      const nestedContent = cssObjectToCssText(value);
      if (nestedContent) {
        nestedCSS.push(`${key}{${nestedContent}}`);
      }
    } else {
      // Regular property
      mainProps[key] = String(value);
    }
  });
  
  const mainCSS = Object.entries(mainProps)
    .map(([prop, val]) => `${prop}:${val}`)
    .join(';');
  
  return { mainCSS, nestedCSS };
}

// Process string rule output
function processStringRuleOutput(output: string | (string | CSSRule)[], rawSelector: string): { mainCSS: string; nestedCSS: string[] } {
  const mainProps: Record<string, string> = {};
  const nestedCSS: string[] = [];
  
  // Handle array output (mixed string/CSSRule)
  if (Array.isArray(output)) {
    output.forEach(item => {
      if (typeof item === 'string') {
        // Process string as AdorableCSS classes
        const css = generateCSSFromSelector(item);
        if (css) {
          nestedCSS.push(css);
        }
      } else if (typeof item === 'object') {
        // Process as CSS object
        const { mainCSS, nestedCSS: nested } = processCSSObject(item, `.${rawSelector}`);
        if (mainCSS) {
          const props = mainCSS.split(';').filter(Boolean);
          props.forEach(prop => {
            const [key, value] = prop.split(':').map(s => s.trim());
            if (key && value) {
              mainProps[key] = value;
            }
          });
        }
        nestedCSS.push(...nested);
      }
    });
  } else if (typeof output === 'string' && output) {
    // Process string output as AdorableCSS classes
    const classes = output.split(/\s+/).filter(Boolean);
    classes.forEach(cls => {
      const css = generateCSSFromSelector(cls);
      if (css) {
        nestedCSS.push(css);
      }
    });
  }
  
  const mainCSS = Object.entries(mainProps)
    .map(([prop, val]) => `${prop}:${val}`)
    .join(';');
  
  return { mainCSS, nestedCSS };
}

// Generate CSS from a single selector
export function generateCSSFromSelector(selector: string): string {
  // Handle responsive patterns
  if (isResponsiveClass(selector)) {
    const responsivePattern = ResponsiveSelector.analyze(selector);
    if (responsivePattern) {
      const baseClass = responsivePattern.selector;
      const baseCss = _generateCSSFromAdorableCSS(baseClass);
      
      if (baseCss) {
        const breakpoint = responsivePattern.isMaxWidth 
          ? `@media (max-width: ${getBreakpointValue(responsivePattern.breakpoint)})`
          : `@media (min-width: ${getBreakpointValue(responsivePattern.breakpoint)})`;
        
        return `${breakpoint}{${baseCss}}`;
      }
    }
  }
  
  // Handle state patterns
  if (isStateClass(selector)) {
    const statePattern = StateSelector.analyze(selector);
    if (statePattern) {
      const baseClass = statePattern.selector;
      const baseCss = _generateCSSFromAdorableCSS(baseClass);
      
      if (baseCss) {
        // Extract the base selector from the CSS
        const match = baseCss.match(/^([^{]+)\{(.+)\}$/);
        if (match) {
          const [, , cssContent] = match;
          const stateCSS = createStateCSS(
            { [cssContent.split(':')[0]]: cssContent.split(':')[1] },
            statePattern,
            `.${selector.replace(/:/g, '\\:')}`
          );
          
          return cssObjectToCssText(stateCSS);
        }
      }
    }
  }
  
  // Handle animations
  const animHandler = AnimationHandler.getInstance();
  if (animHandler.isAnimationClass(selector)) {
    const keyframes = animHandler.getKeyframesForSelector(selector);
    const css = _generateCSSFromAdorableCSS(selector);
    return keyframes + css;
  }
  
  // Regular selector
  return _generateCSSFromAdorableCSS(selector);
}

// Get breakpoint value (simplified for now)
function getBreakpointValue(breakpoint: string): string {
  const breakpoints: Record<string, string> = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  };
  return breakpoints[breakpoint] || '768px';
}

// Main export function
export function generateCSS(classNames: string[]): string {
  // Add layer definition at the start
  const layerDef = layerRegistry.getLayerDefinition();
  const cssRules = classNames.map(generateCSSFromSelector).filter(Boolean);
  
  if (cssRules.length === 0) return '';
  
  return layerDef + cssRules.join('');
}