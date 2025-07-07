/**
 * Token checker interface to avoid circular dependencies
 * This allows 01-core to check tokens without importing from 02-design_tokens
 */

// Token checker function type
export type TokenChecker = (value: string, category: string) => boolean;

// Global token checker instance
let tokenChecker: TokenChecker | null = null;

/**
 * Register a token checker function
 * This will be called by 02-design_tokens to provide the implementation
 */
export function registerTokenChecker(checker: TokenChecker): void {
  tokenChecker = checker;
}

/**
 * Check if a value is a token
 * Returns false if no checker is registered
 */
export function checkIsToken(value: string, category: string): boolean {
  if (!tokenChecker) {
    // Default behavior when no checker is registered
    // This allows 01-core to work without 02-design_tokens
    return false;
  }
  return tokenChecker(value, category);
}