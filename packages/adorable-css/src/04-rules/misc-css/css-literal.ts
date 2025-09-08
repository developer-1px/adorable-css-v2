/**
 * CSS Literal Rule2 Handler
 * Handles CSS literal syntax like {padding:0_10px} and {&>a{color:red}}
 */
import type { Rule2Handler } from '../rule2-registry';

/**
 * CSS Literal handler for Rule2 system
 * Processes parsed CSS literal nodes and returns raw CSS
 */
export const cssLiteralRule2: Rule2Handler = (node: any): string => {
  // Handle css_literal type from parser
  if (node.selector?.type === 'css_literal' || node.type === 'css_literal') {
    const literal = node.selector || node;
    
    // Extract the image which already has underscores converted to spaces
    let cssContent = literal.image;
    
    // Remove the outer braces since we just want the content
    if (cssContent.startsWith('{') && cssContent.endsWith('}')) {
      cssContent = cssContent.slice(1, -1);
    }
    
    // Convert the content to proper CSS format
    // The parser already converts underscores to spaces in the image
    return cssContent;
  }
  
  return '';
};

/**
 * CSS Nested Literal handler for Rule2 system
 * Processes {{selector{properties}}} syntax and returns nested CSS
 */
export const cssNestedLiteralRule2: Rule2Handler = (node: any): string => {
  // Handle css_nested_literal type from parser
  if (node.selector?.type === 'css_nested_literal' || node.type === 'css_nested_literal') {
    const literal = node.selector || node;
    
    // Extract selector and properties
    const selector = literal.selector || '';
    const properties = literal.properties || '';
    
    // Return nested CSS format
    return `${selector}{${properties}}`;
  }
  
  return '';
};

/**
 * Alternative approach: Process CSS literal from raw tokens
 */
export const processCSSLiteralTokens = (tokens: any[]): string => {
  const cssProps: string[] = [];
  let currentProp = '';
  
  for (const token of tokens) {
    if (token.type === '(ident)') {
      if (currentProp && !currentProp.includes(':')) {
        // This is a property name
        currentProp = token.image;
      } else {
        // This is a value
        currentProp += token.image.replace(/_/g, ' ');
      }
    } else if (token.type === '(operator)' && token.image === ':') {
      currentProp += ':';
    } else if (token.type === '(operator)' && token.image === ';') {
      if (currentProp) {
        cssProps.push(currentProp);
        currentProp = '';
      }
    } else if (token.type === '(dimension)' || token.type === '(hexcolor)') {
      currentProp += token.image;
    } else if (token.type === 'css_function') {
      currentProp += token.image;
    }
  }
  
  // Add the last property if it doesn't end with semicolon
  if (currentProp) {
    cssProps.push(currentProp);
  }
  
  return cssProps.join(';');
};

// Export handlers with proper naming convention
export const cssLiteral = cssLiteralRule2;
export const cssNestedLiteral = cssNestedLiteralRule2;