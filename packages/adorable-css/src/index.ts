// AdorableCSS Core - Main entry point

// Import color system FIRST to initialize colorPalette before auto-inject
import "./02-design_tokens/design-system/colors/colors";

// Auto-inject 02-design_tokens on import (can be disabled via configureAutoInject)
import "./01-core/runtime/auto-inject";

export * from "./01-core/parser";
export * from "./03-rules";
export * from "./01-core/values/makeValue";
export * from "./01-core/values/scaleUtilities";
export * from "./02-design_tokens";
export * from "./02-design_tokens/design-system/tokens/index";
export * from "./02-design_tokens/design-system/colors";
export * from "./05-plugins";
export * from "./01-core/runtime/auto-inject";

// Re-export main functions for convenience
export { parseAdorableCSS } from "./01-core/parser/parser";
export { generateCSS, generateCSSFromAdorableCSS, generateCSSWithTokens } from "./01-core/generators/generator";
export type { GenerateCSSOptions } from "./01-core/generators/generator";
export { resetCSS, getResetCSS } from "./01-core/reset";
export { getRuleHandler, rules, RULE_GROUPS } from "./03-rules";
export { defaultTokens, generateTokenCSS, isToken, getTokenVar } from "./02-design_tokens/design-system/tokens/index";
export { createTokensPlugin, injectTokens, tokensPlugin } from "./02-design_tokens/design-system/tokens";

// Export auto-injection utilities
export { 
  autoInjectTokens, 
  configureAutoInject, 
  isTokensInjected, 
  getAutoInjectConfig,
  generateUsedTokensCSS,
  initDynamicStyles,
  addDynamicClasses,
  destroyDynamicStyles,
  getDynamicStyleManager
} from "./01-core/runtime/auto-inject";

// Export token registry utilities
export { 
  startTokenCollection,
  stopTokenCollection,
  registerToken,
  getUsedTokens,
  clearTokenRegistry
} from "./02-design_tokens/tokenRegistry";

// Export color palette and plugin
export { colorPalette, themes, setTheme, getCurrentTheme, getAvailableThemes, colorsPlugin, configureSemanticColors } from "./02-design_tokens/design-system/colors/colors";

// Export animation plugin
export { animationsPlugin, animationKeyframes, getAllKeyframes } from "./05-plugins/animations/animations";

// Export 04-components and defineComponent utilities
export * from "./04-components/primitives";
export { defineComponent, defineThemedComponent, getComponentDefinition } from "./04-components/defineComponent";
export type { ComponentDefinition, ComponentOptions } from "./04-components/defineComponent";
