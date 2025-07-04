// AdorableCSS Core - Main entry point

// Import color system FIRST to initialize colorPalette before auto-inject
import "./design-system/colors/colors";

// Auto-inject tokens on import (can be disabled via configureAutoInject)
import "./core/runtime/auto-inject";

export * from "./core/parser";
export * from "./rules";
export * from "./core/values/makeValue";
export * from "./design-system/tokens/index";
export * from "./design-system/colors";
export * from "./extensions";
export * from "./core/runtime/auto-inject";

// Re-export main functions for convenience
export { parseAdorableCSS } from "./core/parser/parser";
export { generateCSS, generateCSSFromAdorableCSS, generateCSSWithTokens } from "./core/parser/generator";
export type { GenerateCSSOptions } from "./core/parser/generator";
export { resetCSS, getResetCSS } from "./core/reset";
export { getRuleHandler, rules, RULE_GROUPS } from "./rules";
export { defaultTokens, generateTokenCSS, isToken, getTokenVar } from "./design-system/tokens/index";
export { createTokensPlugin, injectTokens, tokensPlugin } from "./design-system/tokens";

// Export auto-injection utilities
export { 
  autoInjectTokens, 
  configureAutoInject, 
  isTokensInjected, 
  getAutoInjectConfig 
} from "./core/runtime/auto-inject";

// Export color palette and plugin
export { colorPalette, themes, setTheme, getCurrentTheme, getAvailableThemes, colorsPlugin, configureSemanticColors } from "./design-system/colors/colors";

// Export animation plugin
export { animationsPlugin, animationKeyframes, getAllKeyframes } from "./extensions/animations/animations";

// Export components and defineComponent utilities
export * from "./components/primitives";
export { defineComponent, defineThemedComponent, getComponentDefinition } from "./components/defineComponent";
export type { ComponentDefinition, ComponentOptions } from "./components/defineComponent";
