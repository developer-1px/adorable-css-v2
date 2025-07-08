/**
 * Token registry for tracking token usage
 */

const usedTokens = new Set<string>();

/**
 * Register a token as used
 */
export function registerToken(type: string, token: string): void {
  usedTokens.add(`${type}:${token}`);
}

/**
 * Get all used tokens
 */
export function getUsedTokens(): Set<string> {
  return new Set(usedTokens);
}

/**
 * Clear the token registry
 */
export function clearTokenRegistry(): void {
  usedTokens.clear();
}