// AdorableCSS Core - Main entry point
export * from "./parser";
export * from "./rules";
export * from "./values/makeValue";
export * from "./tokens";
export * from "./plugins/tokens";
export * from "./rules/plugins";

// Re-export main functions for convenience
export { parseAdorableCSS } from "./parser/parser";
export { generateCSS, generateCSSFromAdorableCSS } from "./parser/generator";
export { getRuleHandler, rules, groupedRules } from "./rules";
export { defaultTokens, generateTokenCSS, isToken, getTokenVar } from "./tokens";
export { createTokensPlugin, injectTokens, tokensPlugin } from "./plugins/tokens";

// Export color palette and plugin
export { colorPalette, themes, setTheme, getCurrentTheme, getAvailableThemes, colorsPlugin } from "./plugins/colors";

// Export animation plugin
export { animationsPlugin, animationKeyframes, getAllKeyframes } from "./rules/plugins/animations";
