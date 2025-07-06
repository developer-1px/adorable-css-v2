/**
 * Dynamic Style Manager
 * Unified system for auto-injecting CSS and 02-design_tokens dynamically
 */

import { generateCSS } from '../generators/generator';
import { generateUsedTokensCSS, clearTokenRegistry } from '../../02-design_tokens/tokenRegistry';
import { generateTokenCSS, defaultTokens } from '../../02-design_tokens/design-system/tokens/index';
import type { DesignTokens } from '../../02-design_tokens/design-system/tokens/index';

interface DynamicStyleManagerOptions {
  enabled?: boolean;
  tokens?: DesignTokens;
  watchInterval?: number;
  debug?: boolean;
}

// Module-level state
let enabled = true;
let tokens: DesignTokens = defaultTokens;
let styleElement: HTMLStyleElement | null = null;
let tokensElement: HTMLStyleElement | null = null;
let observer: MutationObserver | null = null;
const classCache: Set<string> = new Set();
let debug = false;
let updateTimer: number | null = null;
let watchInterval = 100; // ms

/**
 * Create style elements for CSS and tokens
 */
const createStyleElements = (): void => {
  const head = document.head;
  
  // Create tokens style element
  tokensElement = document.getElementById('adorable-css-02-design_tokens-dynamic') as HTMLStyleElement;
  if (!tokensElement) {
    tokensElement = document.createElement('style');
    tokensElement.id = 'adorable-css-02-design_tokens-dynamic';
    tokensElement.setAttribute('data-adorable-css', 'tokens');
    
    // Insert at the beginning of head
    if (head.firstChild) {
      head.insertBefore(tokensElement, head.firstChild);
    } else {
      head.appendChild(tokensElement);
    }
  }

  // Create main CSS style element
  styleElement = document.getElementById('adorable-css-styles-dynamic') as HTMLStyleElement;
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = 'adorable-css-styles-dynamic';
    styleElement.setAttribute('data-adorable-css', 'styles');
    
    // Insert after tokens
    if (tokensElement.nextSibling) {
      head.insertBefore(styleElement, tokensElement.nextSibling);
    } else {
      head.appendChild(styleElement);
    }
  }
};

/**
 * Scan element and its children for classes
 */
const scanElement = (element: Element): void => {
  // Process element's classes
  Array.from(element.classList).forEach((className) => {
    classCache.add(className);
  });

  // Process children
  element.querySelectorAll('*').forEach((child) => {
    Array.from(child.classList).forEach((className) => {
      classCache.add(className);
    });
  });
};

/**
 * Schedule an update with debouncing
 */
const scheduleUpdate = (): void => {
  if (updateTimer !== null) {
    clearTimeout(updateTimer);
  }

  updateTimer = window.setTimeout(() => {
    updateStyles();
    updateTimer = null;
  }, watchInterval);
};

/**
 * Setup mutation observer to watch for class changes
 */
const setupObserver = (): void => {
  observer = new MutationObserver((mutations) => {
    let hasChanges = false;

    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const element = mutation.target as Element;
        const classes = Array.from(element.classList);
        
        for (const className of classes) {
          if (!classCache.has(className)) {
            classCache.add(className);
            hasChanges = true;
          }
        }
      }

      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            scanElement(node as Element);
            hasChanges = true;
          }
        });
      }
    });

    if (hasChanges) {
      scheduleUpdate();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class'],
  });
};

/**
 * Update both CSS and tokens
 */
const updateStyles = (): void => {
  const classes = Array.from(classCache);
  
  if (classes.length === 0) return;

  // Generate CSS (which also registers tokens)
  const css = generateCSS(classes);
  
  // Update main CSS
  if (styleElement) {
    styleElement.textContent = css;
  }

  // Generate and update tokens
  const baseTokensCSS = generateTokenCSS(tokens);
  const usedTokensCSS = generateUsedTokensCSS();
  
  if (tokensElement) {
    tokensElement.textContent = baseTokensCSS + '\n\n' + usedTokensCSS;
  }

  if (debug) {
    console.log(`AdorableCSS: Updated ${classes.length} classes`);
  }

  // Dispatch event
  if (typeof CustomEvent !== 'undefined') {
    document.dispatchEvent(new CustomEvent('adorablecss:styles-updated', {
      detail: { 
        classCount: classes.length,
        hasTokens: !!usedTokensCSS
      }
    }));
  }
};

/**
 * Scan entire document and update styles
 */
const scanAndUpdate = (): void => {
  // Scan all elements
  document.querySelectorAll('*').forEach((element) => {
    Array.from(element.classList).forEach((className) => {
      classCache.add(className);
    });
  });

  updateStyles();
};

/**
 * Initialize the dynamic style manager
 */
const init = (): void => {
  if (!enabled || typeof document === 'undefined') return;

  // Create style elements
  createStyleElements();

  // Initial scan
  scanAndUpdate();

  // Setup mutation observer
  setupObserver();

  if (debug) {
    console.log('AdorableCSS: Dynamic Style Manager initialized');
  }
};

/**
 * Add classes manually
 */
const addClass = (...classes: string[]): void => {
  let hasNewClasses = false;
  
  for (const className of classes) {
    if (!classCache.has(className)) {
      classCache.add(className);
      hasNewClasses = true;
    }
  }

  if (hasNewClasses) {
    scheduleUpdate();
  }
};

/**
 * Get current class cache
 */
const getClasses = (): string[] => Array.from(classCache);

/**
 * Clear all styles and reset
 */
const clear = (): void => {
  classCache.clear();
  clearTokenRegistry();
  
  if (styleElement) {
    styleElement.textContent = '';
  }
  
  if (tokensElement) {
    tokensElement.textContent = '';
  }
};

/**
 * Destroy the style manager
 */
const destroy = (): void => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }

  if (updateTimer !== null) {
    clearTimeout(updateTimer);
    updateTimer = null;
  }

  if (styleElement?.parentNode) {
    styleElement.parentNode.removeChild(styleElement);
    styleElement = null;
  }

  if (tokensElement?.parentNode) {
    tokensElement.parentNode.removeChild(tokensElement);
    tokensElement = null;
  }

  classCache.clear();
};

/**
 * Check if manager is active
 */
const isActive = (): boolean => enabled && observer !== null;

/**
 * Update configuration
 */
const updateConfig = (options: Partial<DynamicStyleManagerOptions>): void => {
  if (options.enabled !== undefined) {
    enabled = options.enabled;
  }
  
  if (options.tokens !== undefined) {
    tokens = options.tokens;
  }
  
  if (options.debug !== undefined) {
    debug = options.debug;
  }
  
  if (options.watchInterval !== undefined) {
    watchInterval = options.watchInterval;
  }

  // Reinitialize if needed
  if (enabled && !isActive()) {
    init();
  } else if (!enabled && isActive()) {
    destroy();
  } else if (enabled && options.tokens) {
    // Update tokens if changed
    updateStyles();
  }
};

/**
 * Initialize configuration
 */
const initConfig = (options: DynamicStyleManagerOptions = {}): void => {
  enabled = options.enabled ?? true;
  tokens = options.tokens ?? defaultTokens;
  debug = options.debug ?? false;
  watchInterval = options.watchInterval ?? 100;
};

/**
 * Get or create the singleton instance (for backward compatibility)
 */
export function getDynamicStyleManager(options?: DynamicStyleManagerOptions) {
  if (options) {
    updateConfig(options);
  }
  
  return {
    init,
    addClass,
    getClasses,
    clear,
    destroy,
    isActive,
    updateConfig
  };
}

/**
 * Initialize dynamic style management
 */
export function initDynamicStyles(options?: DynamicStyleManagerOptions): void {
  if (options) {
    initConfig(options);
  }
  init();
}

/**
 * Add classes to be styled
 */
export function addDynamicClasses(...classes: string[]): void {
  addClass(...classes);
}

/**
 * Destroy dynamic style management
 */
export function destroyDynamicStyles(): void {
  destroy();
}

// Auto-initialize in browser environment
if (typeof document !== 'undefined') {
  const script = document.currentScript as HTMLScriptElement;
  const autoInit = script?.getAttribute('data-auto-init') !== 'false';
  
  if (autoInit) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => initDynamicStyles());
    } else {
      initDynamicStyles();
    }
  }
}

// Export types
export type { DynamicStyleManagerOptions };