// Token injection plugin
import { defaultTokens, generateTokenCSS } from '../tokens';
import type { DesignTokens } from '../tokens';

// For browser environments - inject tokens into the document
export function injectTokens(tokens: DesignTokens = defaultTokens): void {
  if (typeof document === 'undefined') {
    console.warn('injectTokens: document is not available, skipping token injection');
    return;
  }

  const styleId = 'adorable-css-tokens';
  let styleElement = document.getElementById(styleId) as HTMLStyleElement;
  
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = styleId;
    document.head.appendChild(styleElement);
  }
  
  styleElement.textContent = generateTokenCSS(tokens);
}

// For UnoCSS/build-time environments
export function createTokensPlugin(tokens: DesignTokens = defaultTokens) {
  return {
    name: 'adorable-css-tokens',
    // Add tokens to preflights
    preflights: [
      {
        getCSS: () => generateTokenCSS(tokens),
      },
    ],
  };
}

// Default plugin instance
export const tokensPlugin = createTokensPlugin();