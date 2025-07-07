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

// Store current importance level for the class being processed
let currentImportanceLevel = 0;

/**
 * Set the current importance level
 */
export const setImportanceLevel = (level: number): void => {
  currentImportanceLevel = level;
};

/**
 * Add [class] specificity boost to selector based on importance level
 * Works with layer system to provide fine-grained control
 */
export const addImportanceToSelector = (selector: string): string => {
  if (currentImportanceLevel === 0) return selector;
  
  // Add :where() wrapper with attribute selectors for specificity boost
  // Each ! adds one attribute selector for incremental specificity
  const attributeSelectors = Array(currentImportanceLevel)
    .fill('[class]')
    .join('');
  
  return `${selector}${attributeSelectors}`;
};