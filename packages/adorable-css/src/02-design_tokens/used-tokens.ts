/**
 * Simple used token tracker
 */

// Map to track used tokens
export const usedTokens = new Map<string, string>();

/**
 * Register a used token
 */
export function registerUsedToken(varName: string, value: string): void {
  usedTokens.set(varName, value);
}

/**
 * Clear used tokens
 */
export function clearUsedTokens(): void {
  usedTokens.clear();
}

/**
 * Generate CSS for used tokens only
 */
export function generateUsedTokensCSS(): string {
  if (usedTokens.size === 0) return '';
  
  const lines = [':root {'];
  usedTokens.forEach((value, varName) => {
    lines.push(`  ${varName}: ${value};`);
  });
  lines.push('}');
  
  return lines.join('\n');
}