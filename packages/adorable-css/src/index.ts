// AdorableCSS Core - Main entry point

// Import color system FIRST to initialize colorPalette before auto-inject
import "./02-design_tokens/design-system/colors/colors";

// Initialize Rule2 handlers
import { initializeRule2Handlers } from "./04-rules/index";
initializeRule2Handlers();

// Note: Auto-inject functionality moved to CDN package for browser-specific features

export * from "./01-core/parser/index";
export * from "./03-values/makeValue";
export * from "./03-values/scaleUtilities";
export * from "./02-design_tokens/index";
export * from "./02-design_tokens/design-system/tokens/index";
export * from "./02-design_tokens/design-system/colors/index";
export * from "./06-plugins/index";

// Re-export main functions for convenience
export { parseAdorableCSS } from "./01-core/parser/parser";
export { generateCSS, generateCSSWithTokens, generateClass } from "./07-generator/generator";
export { getRule2Definition } from "./04-rules/rule2-registry";
export { resetCSS, getResetCSS } from "./07-generator/reset";
export { defaultTokens, generateTokenCSS, isToken, getTokenVar } from "./02-design_tokens/design-system/tokens/index";
export { createTokensPlugin, injectTokens, tokensPlugin } from "./02-design_tokens/design-system/tokens";


// Export token registry utilities
export { 
  startTokenCollection,
  stopTokenCollection,
  registerToken,
  getUsedTokens,
  clearTokenRegistry,
  generateUsedTokensCSS
} from "./02-design_tokens/tokenRegistry";

// Export color palette and plugin
export { colorPalette, themes, setTheme, getCurrentTheme, getAvailableThemes, colorsPlugin, configureSemanticColors } from "./02-design_tokens/design-system/colors/colors";

// Export animation plugin
export { animationsPlugin, animationKeyframes, getAllKeyframes } from "./06-plugins/animations/animations";

// Export 04-components and defineComponent utilities
export * from "./05-components/primitives/index";
export { defineComponent, defineThemedComponent, getComponentDefinition } from "./05-components/defineComponent";
export type { ComponentDefinition, ComponentOptions } from "./05-components/defineComponent";
