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
export const extractImportanceLevel = (className: string): ImportanceInfo => {
  const importanceMatch = className.match(/(!+)$/);
  const level = importanceMatch ? importanceMatch[1].length : 0;
  
  return {
    level,
    className: level > 0 ? className.slice(0, -level) : className
  };
};

/**
 * Add [class] specificity boost to selector based on importance level
 * Works with layer system to provide fine-grained control
 */
export const addImportanceToSelector = (selector: string, level = 0): string => {
  if (level === 0) return selector;
  
  // Add attribute selectors before the main selector for specificity boost
  // Each ! adds one attribute selector for incremental specificity
  const attributeSelectors = Array(level)
    .fill('[class]')
    .join('');
  
  return `${attributeSelectors}${selector}`;
};