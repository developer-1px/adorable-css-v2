// AdorableCSS Core - Main entry point

// Import color system is no longer needed with minimal token system

// Initialize Rule2 handlers
import { initializeRule2Handlers } from './04-rules/rule2-registry'
initializeRule2Handlers()

// Register components after Rule2 handlers are initialized
import { registerComponentsAsRule2 } from './05-components/register-components'
registerComponentsAsRule2()

// Note: Auto-inject functionality moved to CDN package for browser-specific features

// Parser exports are included in the convenience exports below
export * from './03-values/makeValue'
// Design tokens exports
export { textTokens, TEXT_TOKEN_MAP, type TextTokenSize } from './02-design_tokens/text-tokens';
export { spacingTokens, SPACING_TOKEN_MAP, type SpacingTokenSize } from './02-design_tokens/spacing-tokens';
export { containerTokens, CONTAINER_TOKEN_MAP, type ContainerTokenSize } from './02-design_tokens/container-tokens';
export { radiusTokens, RADIUS_TOKEN_MAP, type RadiusTokenSize } from './02-design_tokens/radius-tokens';
export { shadowTokens, SHADOW_TOKEN_MAP, type ShadowTokenSize } from './02-design_tokens/shadow-tokens';
export { colorTokens, COLOR_TOKEN_MAP } from './02-design_tokens/color-tokens';
export { fontTokens, FONT_TOKEN_MAP } from './02-design_tokens/font-tokens';
export { isToken, getTokenVar, resolveSizeToken, resolveContainerToken, resolveRadiusToken, resolveShadowToken } from './02-design_tokens/token-resolver';
export { clearUsedTokens, generateUsedTokensCSS } from './02-design_tokens/used-tokens';
export { allTokens, getTokenEntries, getAllTokenCategories } from './02-design_tokens/all-tokens';
// Plugin exports
export { animationsPlugin, animationKeyframes, getAllKeyframes, animationRules } from './06-plugins/animations/animations';
export { glassmorphismPlugin, glassmorphismRules } from './06-plugins/glassmorphism/glassmorphism';
// Component features
export { glowRules } from './05-components/features/glow';
export { glassRules } from './05-components/features/glass';
export { figmaComponents } from './05-components/features/figma';
export { containerRules } from './05-components/patterns/container';
export { proseRules } from './05-components/patterns/prose';

// Re-export main functions for convenience
export { parseAdorableCSS } from './01-core/parser/parser'
export { generateCSS, generateCSSWithTokens, generateClass } from './07-generator/generator'
export { getRule2Definition, getAllRule2Handlers } from './04-rules/rule2-registry'
export { resetCSS, getResetCSS } from './07-generator/reset'
// Removed: now directly exported above

// Export token registry utilities
export {
  registerToken,
} from './02-design_tokens/tokenRegistry'

// Color palette exports removed - using minimal token system

// Export 04-components and defineComponent utilities
// Component exports
export { cardRules, cardDefinition, cardString } from './05-components/primitives/card';
export { buttonRules, buttonDefinition, iconButtonDefinition, btnString, iconBtnString } from './05-components/primitives/button';
export { headingRules, headingDefinition, headingString } from './05-components/primitives/typography/heading';
export { displayTextRules, displayDefinition, displayString } from './05-components/primitives/typography/display';
export { titleRules, titleDefinition, titleString } from './05-components/primitives/typography/title';
export { bodyRules, bodyDefinition, bodyString } from './05-components/primitives/typography/body';
export { labelRules, labelDefinition, labelString } from './05-components/primitives/typography/label';
export { captionRules, captionDefinition, captionString } from './05-components/primitives/typography/caption';
export { codeRule, codeString } from './05-components/primitives/typography/code';
export { inputRules, inputDefinition, textareaDefinition, inputString, textareaString } from './05-components/primitives/input';
export { badgeRules, badgeDefinition, badgeString } from './05-components/primitives/badge';
export { iconBoxRules } from './05-components/primitives/icon-box';
export { codeBlockRules } from './05-components/primitives/code-block';
export { menuRules, menuDefinition, menuString } from './05-components/primitives/menu';
export { menuItemRules, menuItemDefinition, menuItemString } from './05-components/primitives/menu-item';
export { tableRules } from './05-components/primitives/table';
export { defineComponent, defineThemedComponent } from './05-components/defineComponent'
export type { ComponentDefinition, ComponentOptions } from './05-components/defineComponent'
export { registerComponents } from './05-components/register-components'
