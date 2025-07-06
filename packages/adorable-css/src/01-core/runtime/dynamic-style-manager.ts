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

class DynamicStyleManager {
  private enabled: boolean = true;
  private tokens: DesignTokens;
  private styleElement: HTMLStyleElement | null = null;
  private tokensElement: HTMLStyleElement | null = null;
  private observer: MutationObserver | null = null;
  private classCache: Set<string> = new Set();
  private debug: boolean = false;
  private updateTimer: number | null = null;
  private watchInterval: number = 100; // ms

  constructor(options: DynamicStyleManagerOptions = {}) {
    this.enabled = options.enabled ?? true;
    this.tokens = options.tokens ?? defaultTokens;
    this.debug = options.debug ?? false;
    this.watchInterval = options.watchInterval ?? 100;
  }

  /**
   * Initialize the dynamic style manager
   */
  init(): void {
    if (!this.enabled || typeof document === 'undefined') return;

    // Create style elements
    this.createStyleElements();

    // Initial scan
    this.scanAndUpdate();

    // Setup mutation observer
    this.setupObserver();

    if (this.debug) {
      console.log('AdorableCSS: Dynamic Style Manager initialized');
    }
  }

  /**
   * Create style elements for CSS and 02-design_tokens
   */
  private createStyleElements(): void {
    const head = document.head;
    
    // Create 02-design_tokens style element
    this.tokensElement = document.getElementById('adorable-css-02-design_tokens-dynamic') as HTMLStyleElement;
    if (!this.tokensElement) {
      this.tokensElement = document.createElement('style');
      this.tokensElement.id = 'adorable-css-02-design_tokens-dynamic';
      this.tokensElement.setAttribute('data-adorable-css', 'tokens');
      
      // Insert at the beginning of head
      if (head.firstChild) {
        head.insertBefore(this.tokensElement, head.firstChild);
      } else {
        head.appendChild(this.tokensElement);
      }
    }

    // Create main CSS style element
    this.styleElement = document.getElementById('adorable-css-styles-dynamic') as HTMLStyleElement;
    if (!this.styleElement) {
      this.styleElement = document.createElement('style');
      this.styleElement.id = 'adorable-css-styles-dynamic';
      this.styleElement.setAttribute('data-adorable-css', 'styles');
      
      // Insert after 02-design_tokens
      if (this.tokensElement.nextSibling) {
        head.insertBefore(this.styleElement, this.tokensElement.nextSibling);
      } else {
        head.appendChild(this.styleElement);
      }
    }
  }

  /**
   * Setup mutation observer to watch for class changes
   */
  private setupObserver(): void {
    this.observer = new MutationObserver((mutations) => {
      let hasChanges = false;

      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const element = mutation.target as Element;
          const classes = Array.from(element.classList);
          
          for (const className of classes) {
            if (!this.classCache.has(className)) {
              this.classCache.add(className);
              hasChanges = true;
            }
          }
        }

        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              this.scanElement(node as Element);
              hasChanges = true;
            }
          });
        }
      });

      if (hasChanges) {
        this.scheduleUpdate();
      }
    });

    this.observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  /**
   * Scan element and its children for classes
   */
  private scanElement(element: Element): void {
    // Process element's classes
    Array.from(element.classList).forEach((className) => {
      this.classCache.add(className);
    });

    // Process children
    element.querySelectorAll('*').forEach((child) => {
      Array.from(child.classList).forEach((className) => {
        this.classCache.add(className);
      });
    });
  }

  /**
   * Scan entire document and update styles
   */
  private scanAndUpdate(): void {
    // Scan all elements
    document.querySelectorAll('*').forEach((element) => {
      Array.from(element.classList).forEach((className) => {
        this.classCache.add(className);
      });
    });

    this.updateStyles();
  }

  /**
   * Schedule an update with debouncing
   */
  private scheduleUpdate(): void {
    if (this.updateTimer !== null) {
      clearTimeout(this.updateTimer);
    }

    this.updateTimer = window.setTimeout(() => {
      this.updateStyles();
      this.updateTimer = null;
    }, this.watchInterval);
  }

  /**
   * Update both CSS and 02-design_tokens
   */
  private updateStyles(): void {
    const classes = Array.from(this.classCache);
    
    if (classes.length === 0) return;

    // Generate CSS (which also registers 02-design_tokens)
    const css = generateCSS(classes);
    
    // Update main CSS
    if (this.styleElement) {
      this.styleElement.textContent = css;
    }

    // Generate and update 02-design_tokens
    const baseTokensCSS = generateTokenCSS(this.tokens);
    const usedTokensCSS = generateUsedTokensCSS();
    
    if (this.tokensElement) {
      this.tokensElement.textContent = baseTokensCSS + '\n\n' + usedTokensCSS;
    }

    if (this.debug) {
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
  }

  /**
   * Add classes manually
   */
  addClass(...classes: string[]): void {
    let hasNewClasses = false;
    
    for (const className of classes) {
      if (!this.classCache.has(className)) {
        this.classCache.add(className);
        hasNewClasses = true;
      }
    }

    if (hasNewClasses) {
      this.scheduleUpdate();
    }
  }

  /**
   * Get current class cache
   */
  getClasses(): string[] {
    return Array.from(this.classCache);
  }

  /**
   * Clear all styles and reset
   */
  clear(): void {
    this.classCache.clear();
    clearTokenRegistry();
    
    if (this.styleElement) {
      this.styleElement.textContent = '';
    }
    
    if (this.tokensElement) {
      this.tokensElement.textContent = '';
    }
  }

  /**
   * Destroy the style manager
   */
  destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    if (this.updateTimer !== null) {
      clearTimeout(this.updateTimer);
      this.updateTimer = null;
    }

    if (this.styleElement?.parentNode) {
      this.styleElement.parentNode.removeChild(this.styleElement);
      this.styleElement = null;
    }

    if (this.tokensElement?.parentNode) {
      this.tokensElement.parentNode.removeChild(this.tokensElement);
      this.tokensElement = null;
    }

    this.classCache.clear();
  }

  /**
   * Check if manager is active
   */
  isActive(): boolean {
    return this.enabled && this.observer !== null;
  }

  /**
   * Update configuration
   */
  updateConfig(options: Partial<DynamicStyleManagerOptions>): void {
    if (options.enabled !== undefined) {
      this.enabled = options.enabled;
    }
    
    if (options.tokens !== undefined) {
      this.tokens = options.tokens;
    }
    
    if (options.debug !== undefined) {
      this.debug = options.debug;
    }
    
    if (options.watchInterval !== undefined) {
      this.watchInterval = options.watchInterval;
    }

    // Reinitialize if needed
    if (this.enabled && !this.isActive()) {
      this.init();
    } else if (!this.enabled && this.isActive()) {
      this.destroy();
    } else if (this.enabled && options.tokens) {
      // Update 02-design_tokens if changed
      this.updateStyles();
    }
  }
}

// Singleton instance
let instance: DynamicStyleManager | null = null;

/**
 * Get or create the singleton instance
 */
export function getDynamicStyleManager(options?: DynamicStyleManagerOptions): DynamicStyleManager {
  if (!instance) {
    instance = new DynamicStyleManager(options);
  } else if (options) {
    instance.updateConfig(options);
  }
  
  return instance;
}

/**
 * Initialize dynamic style management
 */
export function initDynamicStyles(options?: DynamicStyleManagerOptions): void {
  const manager = getDynamicStyleManager(options);
  manager.init();
}

/**
 * Add classes to be styled
 */
export function addDynamicClasses(...classes: string[]): void {
  const manager = getDynamicStyleManager();
  manager.addClass(...classes);
}

/**
 * Destroy dynamic style management
 */
export function destroyDynamicStyles(): void {
  if (instance) {
    instance.destroy();
    instance = null;
  }
}

// Auto-initialize in browser environment
if (typeof document !== 'undefined') {
  // Check if auto-init is disabled
  const script = document.currentScript as HTMLScriptElement;
  const autoInit = script?.getAttribute('data-auto-init') !== 'false';
  
  if (autoInit) {
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initDynamicStyles();
      });
    } else {
      initDynamicStyles();
    }
  }
}

// Export types
export type { DynamicStyleManagerOptions };