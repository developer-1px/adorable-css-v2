// AdorableCSS v2 - CDN Entry Point
import { generateCSS, getDynamicStyleManager, initDynamicStyles, destroyDynamicStyles } from "adorable-css";

// Types for browser environment
interface AdorableCSSV2 {
  version: string;
  init: (options?: AdorableCSSOptions) => void;
  generate: (classes: string[], options?: { debug?: boolean }) => string;
  destroy: () => void;
}

interface AdorableCSSOptions {
  watch?: boolean;
  target?: HTMLElement | string;
  debug?: boolean;
}

// Create the main AdorableCSS v2 object
const AdorableCSSV2: AdorableCSSV2 = {
  version: "2.0.0-beta.1",

  init: (options: AdorableCSSOptions = {}) => {
    if (typeof window === "undefined") {
      console.warn("AdorableCSS v2 is intended for browser use only");
      return;
    }

    const { watch = true, debug = false } = options;

    // Initialize dynamic style manager
    initDynamicStyles({
      enabled: watch,
      debug: debug,
      watchInterval: 50 // Faster updates for CDN
    });

    if (debug) {
      console.log("AdorableCSS v2: Initialized with dynamic style management");
    }
  },

  generate: (classes: string[], options?: { debug?: boolean }) => {
    const css = generateCSS(classes);
    
    if (options?.debug) {
      // Check which classes failed to generate CSS
      const failedClasses = checkFailedClasses(classes);

      if (failedClasses.length > 0) {
        console.warn("AdorableCSS v2: Failed to generate CSS for classes:", failedClasses);
        console.log("These classes might need to be added to the 01-core 03-rules. Please report them!");
      }

      console.log(`Generated CSS for ${classes.length} classes, ${failedClasses.length} failed`);
    }
    
    return css;
  },

  destroy: () => {
    if (typeof window === "undefined") return;
    
    // Use the new destroy function
    destroyDynamicStyles();
  },
};

// Auto-initialize in browser environment
if (typeof window !== "undefined") {
  // Check if auto-init is disabled
  const script = document.currentScript as HTMLScriptElement;
  const autoInit = script?.getAttribute("data-auto-init") !== "false";

  if (autoInit) {
    // Initialize when DOM is ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        AdorableCSSV2.init();
      });
    } else {
      AdorableCSSV2.init();
    }
  }

  // Make available globally
  (window as any).AdorableCSSV2 = AdorableCSSV2;
}

// Utility function to check which classes fail to generate CSS
export function checkFailedClasses(classes: string[]): string[] {
  return classes.filter(className => {
    const css = generateCSS([className]);
    // Check if CSS is empty or only contains empty 03-rules (e.g., ".class{}")
    if (!css || css.trim() === '') return true;
    
    // Check if the CSS rule is empty (only contains selector with empty braces)
    const cssWithoutWhitespace = css.replace(/\s/g, '');
    const emptyRulePattern = /^\.[\w\\():-]+\{\}$/;
    return emptyRulePattern.test(cssWithoutWhitespace);
  });
}

// Utility function to analyze CSS generation results
export function analyzeClasses(classes: string[]): {
  total: number;
  successful: string[];
  failed: string[];
  successRate: string;
} {
  const failed = checkFailedClasses(classes);
  const successful = classes.filter(c => !failed.includes(c));
  const successRate = classes.length === 0 ? '100%' : `${Math.round((successful.length / classes.length) * 100)}%`;
  
  return {
    total: classes.length,
    successful,
    failed,
    successRate
  };
}

// Export for module systems
export default AdorableCSSV2;
export { generateCSS, generateCSS as generateCSSFromAdorableCSS };
export type { AdorableCSSOptions };
