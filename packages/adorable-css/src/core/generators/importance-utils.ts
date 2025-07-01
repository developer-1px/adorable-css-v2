/**
 * Utilities for handling importance marks (!)
 */

export interface ImportanceInfo {
  level: number;
  className: string;
}

/**
 * Extract importance level from class name
 * Example: "hover:scale(1.05)!!" returns { level: 2, className: "hover:scale(1.05)" }
 */
export function extractImportanceLevel(className: string): ImportanceInfo {
  const importanceMatch = className.match(/(!+)$/);
  const level = importanceMatch ? importanceMatch[1].length : 0;
  
  return {
    level,
    className: level > 0 ? className.slice(0, -level) : className
  };
}

/**
 * Add [class] specificity boost to selector based on importance level
 */
export function addImportanceToSelector(selector: string, importanceLevel: number): string {
  if (importanceLevel <= 0) {
    return selector;
  }
  
  return '[class]'.repeat(importanceLevel) + selector;
}

/**
 * Add importance to CSS rule
 */
export function addImportanceToCSS(css: string, importanceLevel: number): string {
  if (importanceLevel <= 0 || !css) {
    return css;
  }
  
  // Add [class] at the beginning of the selector
  return css.replace(/^(\.[^{]+)(\{)/, `${`[class]`.repeat(importanceLevel)}$1$2`);
}