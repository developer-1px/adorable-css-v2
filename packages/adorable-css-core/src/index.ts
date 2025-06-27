// AdorableCSS Core - Main entry point

// Auto-inject tokens on import (can be disabled via configureAutoInject)
import "./core/auto-inject";

export * from "./parser";
export * from "./rules";
export * from "./values/makeValue";
export * from "./tokens";
export * from "./plugins/tokens";
export * from "./rules/plugins";
export * from "./core/auto-inject";

// Re-export main functions for convenience
export { parseAdorableCSS } from "./parser/parser";
export { generateCSS, generateCSSFromAdorableCSS, generateCSSWithTokens } from "./parser/generator";
export type { GenerateCSSOptions } from "./parser/generator";
export { getRuleHandler, rules, groupedRules } from "./rules";
export { defaultTokens, generateTokenCSS, isToken, getTokenVar } from "./tokens";
export { createTokensPlugin, injectTokens, tokensPlugin } from "./plugins/tokens";

// Export auto-injection utilities
export { 
  autoInjectTokens, 
  configureAutoInject, 
  isTokensInjected, 
  getAutoInjectConfig 
} from "./core/auto-inject";

// Export color palette and plugin
export { colorPalette, themes, setTheme, getCurrentTheme, getAvailableThemes, colorsPlugin } from "./plugins/colors";

// Export animation plugin
export { animationsPlugin, animationKeyframes, getAllKeyframes } from "./rules/plugins/animations";
