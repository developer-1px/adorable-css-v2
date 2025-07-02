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
  // Simply return the selector without any modification
  // Layer system handles priority now
  return selector;
}

/**
 * Add importance to CSS rule
 */
export function addImportanceToCSS(css: string, importanceLevel: number): string {
  // Simply return the css without modification
  // Layer system handles priority now
  return css;
}