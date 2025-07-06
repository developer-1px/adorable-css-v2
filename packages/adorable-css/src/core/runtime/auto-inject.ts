/**
 * Auto-inject module - now uses the unified Dynamic Style Manager
 */
import { getDynamicStyleManager, initDynamicStyles } from './dynamic-style-manager';
import type { DynamicStyleManagerOptions } from './dynamic-style-manager';
import { defaultTokens } from '../../design-system/tokens/index';
import type { DesignTokens } from '../../design-system/tokens/index';

/**
 * Configuration for auto-injection (for backwards compatibility)
 */
export interface AutoInjectConfig {
  enabled: boolean;
  tokens?: DesignTokens;
  injectTo?: 'head' | 'body';
  priority?: number;
}

/**
 * Configure auto-injection behavior
 */
export function configureAutoInject(options: Partial<AutoInjectConfig>) {
  const managerOptions: DynamicStyleManagerOptions = {
    enabled: options.enabled,
    tokens: options.tokens,
    debug: false
  };
  
  const manager = getDynamicStyleManager(managerOptions);
  
  if (options.enabled && !manager.isActive()) {
    manager.init();
  } else if (!options.enabled && manager.isActive()) {
    manager.destroy();
  }
}

/**
 * Reset injection state (for testing)
 */
export function resetInjectionState() {
  const manager = getDynamicStyleManager();
  manager.clear();
}

/**
 * Automatically inject tokens into the DOM
 */
export function autoInjectTokens() {
  initDynamicStyles();
}

/**
 * Get current injection status
 */
export function isTokensInjected(): boolean {
  const manager = getDynamicStyleManager();
  return manager.isActive();
}

/**
 * Get current auto-inject configuration
 */
export function getAutoInjectConfig(): Readonly<AutoInjectConfig> {
  return {
    enabled: getDynamicStyleManager().isActive(),
    tokens: defaultTokens,
    injectTo: 'head',
    priority: 0
  };
}

// Export for manual token generation
export { generateUsedTokensCSS } from '../../tokens/tokenRegistry';

// Re-export new dynamic style functions
export { 
  initDynamicStyles,
  addDynamicClasses,
  destroyDynamicStyles,
  getDynamicStyleManager
} from './dynamic-style-manager';