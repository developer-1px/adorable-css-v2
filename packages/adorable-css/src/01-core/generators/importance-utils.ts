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
 * Layer system handles priority now, so this is a pass-through
 */
export const addImportanceToSelector = (selector: string): string => selector;