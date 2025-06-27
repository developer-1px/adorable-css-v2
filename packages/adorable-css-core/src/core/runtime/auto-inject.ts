// Auto-inject tokens when AdorableCSS is imported
import { defaultTokens, generateTokenCSS } from '../../design-system/tokens/index';
import type { DesignTokens } from '../../design-system/tokens/index';

let isInjected = false;

/**
 * Configuration for auto-injection
 */
export interface AutoInjectConfig {
  enabled: boolean;
  tokens?: DesignTokens;
  injectTo?: 'head' | 'body';
  priority?: number;
}

const defaultConfig: AutoInjectConfig = {
  enabled: true,
  tokens: defaultTokens,
  injectTo: 'head',
  priority: 0,
};

let config = { ...defaultConfig };

/**
 * Configure auto-injection behavior
 */
export function configureAutoInject(options: Partial<AutoInjectConfig>) {
  config = { ...config, ...options };
  
  // Re-inject if already injected and config changed
  if (isInjected && config.enabled) {
    removeInjectedTokens();
    autoInjectTokens();
  } else if (!config.enabled) {
    removeInjectedTokens();
  }
}

/**
 * Remove injected tokens from DOM
 */
function removeInjectedTokens() {
  if (typeof document === 'undefined') return;
  
  const existingStyle = document.getElementById('adorable-css-tokens-auto');
  if (existingStyle) {
    existingStyle.remove();
    isInjected = false;
  }
}

/**
 * Reset injection state (for testing)
 */
export function resetInjectionState() {
  removeInjectedTokens();
  isInjected = false;
}

/**
 * Automatically inject tokens into the DOM
 */
export function autoInjectTokens() {
  if (!config.enabled || typeof document === 'undefined' || isInjected) {
    return;
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInjectTokens);
    return;
  }

  try {
    const style = document.createElement('style');
    style.id = 'adorable-css-tokens-auto';
    style.setAttribute('data-adorable-css', 'tokens');
    
    // Add priority attribute for better control
    if (config.priority) {
      style.setAttribute('data-priority', config.priority.toString());
    }
    
    // Generate and set CSS content
    style.textContent = generateTokenCSS(config.tokens || defaultTokens);
    
    // Inject to specified location
    const target = config.injectTo === 'body' ? document.body : document.head;
    
    // Insert at the beginning to allow overrides
    if (target.firstChild) {
      target.insertBefore(style, target.firstChild);
    } else {
      target.appendChild(style);
    }
    
    isInjected = true;
    
    // Dispatch event for debugging/monitoring
    if (typeof CustomEvent !== 'undefined') {
      document.dispatchEvent(new CustomEvent('adorablecss:tokens-injected', {
        detail: { config }
      }));
    }
  } catch (error) {
    console.error('AdorableCSS: Failed to auto-inject tokens', error);
  }
}

/**
 * Get current injection status
 */
export function isTokensInjected(): boolean {
  return isInjected;
}

/**
 * Get current auto-inject configuration
 */
export function getAutoInjectConfig(): Readonly<AutoInjectConfig> {
  return { ...config };
}

// Auto-inject on import if in browser environment
// Note: This runs when the module is imported, not when functions are called
if (typeof document !== 'undefined' && config.enabled) {
  autoInjectTokens();
}