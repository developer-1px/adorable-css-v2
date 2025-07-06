import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { 
  autoInjectTokens, 
  configureAutoInject, 
  isTokensInjected,
  getAutoInjectConfig,
  resetInjectionState
} from '../01-core/runtime/auto-inject';

describe('Auto-inject Tokens', () => {
  beforeEach(() => {
    // Reset injection state completely
    resetInjectionState();
    
    // Reset to default config
    configureAutoInject({ enabled: true, injectTo: 'head', priority: 0 });
  });

  afterEach(() => {
    // Cleanup
    resetInjectionState();
    // Ensure the style element is removed from the DOM after each test
    const style = document.getElementById('adorable-css-02-design_tokens-auto');
    if (style) {
      style.remove();
    }
  });

  it('should inject design tokens automatically', () => { // Changed '02-design_tokens' to 'design tokens' for readability
    autoInjectTokens();
    
    const style = document.getElementById('adorable-css-02-design_tokens-auto');
    expect(style).toBeTruthy();
    expect(style?.textContent).toContain(':root {');
    expect(style?.textContent).toContain('--spacing-xs: 0.25rem');
    expect(style?.textContent).toContain('--spacing-lg: 1rem');
    expect(style?.parentElement).toBe(document.head); // Added explicit check for default parent
  });

  it('should not inject twice', () => {
    autoInjectTokens();
    const firstStyle = document.getElementById('adorable-css-02-design_tokens-auto');
    
    autoInjectTokens(); // Call again
    const secondStyle = document.getElementById('adorable-css-02-design_tokens-auto');
    
    expect(firstStyle).toBe(secondStyle); // Should be the same element
    expect(document.querySelectorAll('#adorable-css-02-design_tokens-auto').length).toBe(1); // Ensure only one element exists
  });

  it('should respect enabled config', () => {
    configureAutoInject({ enabled: false });
    autoInjectTokens();
    
    const style = document.getElementById('adorable-css-02-design_tokens-auto');
    expect(style).toBeFalsy(); // Should not be injected
    expect(isTokensInjected()).toBe(false); // Status should reflect disabled state
  });

  it('should use custom design tokens', () => { // Changed '02-design_tokens' to 'design tokens'
    // Create custom tokens with a custom spacing value
    const customTokens = {
      spacing: {
        custom: '999px'
      }
    };
    
    configureAutoInject({ tokens: customTokens });
    autoInjectTokens();
    
    const style = document.getElementById('adorable-css-02-design_tokens-auto');
    expect(style).toBeTruthy(); // Ensure it's injected
    expect(style?.textContent).toContain('--spacing-custom: 999px');
    expect(style?.textContent).not.toContain('--spacing-xs'); // Ensure default tokens are not present
  });

  it('should inject to head by default', () => {
    autoInjectTokens();
    
    const style = document.getElementById('adorable-css-02-design_tokens-auto');
    expect(style).toBeTruthy();
    expect(style?.parentElement).toBe(document.head);
  });

  it('should inject to body when configured', () => {
    configureAutoInject({ injectTo: 'body' });
    autoInjectTokens();
    
    const style = document.getElementById('adorable-css-02-design_tokens-auto');
    expect(style).toBeTruthy();
    expect(style?.parentElement).toBe(document.body);
  });

  it('should report injection status correctly', () => {
    expect(isTokensInjected()).toBe(false);
    
    autoInjectTokens();
    expect(isTokensInjected()).toBe(true);
    
    // Test after cleanup
    resetInjectionState();
    expect(isTokensInjected()).toBe(false);
  });

  it('should return current config', () => {
    // Make sure we're using the reset config
    configureAutoInject({ enabled: true, injectTo: 'head', priority: 0 });
    
    const config = getAutoInjectConfig();
    expect(config.enabled).toBe(true);
    expect(config.injectTo).toBe('head');
    expect(config.priority).toBe(0);
    expect(config.tokens).toBeUndefined(); // Default tokens are not part of the config object unless explicitly set
  });

  it('should dispatch custom event on injection', () => { // Clarified test name
    const handler = vi.fn();
    document.addEventListener('adorablecss:design-tokens-injected', handler); // Changed event name for consistency
    
    autoInjectTokens();
    
    expect(handler).toHaveBeenCalledTimes(1); // Ensure it's called exactly once
    
    document.removeEventListener('adorablecss:design-tokens-injected', handler);
  });

  it('should handle DOM ready state', async () => { // Added async for potential microtask queue
    // Mock document ready state
    Object.defineProperty(document, 'readyState', {
      configurable: true,
      get: () => 'loading'
    });
    
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    autoInjectTokens();
    
    // Expect addEventListener to be called for 'DOMContentLoaded'
    expect(addEventListenerSpy).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function));
    
    // Manually trigger DOMContentLoaded to simulate browser behavior
    const domContentLoadedEvent = new Event('DOMContentLoaded');
    document.dispatchEvent(domContentLoadedEvent);
    
    // After dispatching, the tokens should be injected
    const style = document.getElementById('adorable-css-02-design_tokens-auto');
    expect(style).toBeTruthy();
    
    // Reset readyState and spy
    Object.defineProperty(document, 'readyState', {
      configurable: true,
      get: () => 'complete'
    });
    addEventListenerSpy.mockRestore();
  });

  it('should not inject if already injected and DOMContentLoaded fires', () => {
    // First, inject tokens normally
    autoInjectTokens();
    const initialStyle = document.getElementById('adorable-css-02-design_tokens-auto');
    expect(initialStyle).toBeTruthy();

    // Mock readyState to 'loading' and then dispatch DOMContentLoaded
    Object.defineProperty(document, 'readyState', {
      configurable: true,
      get: () => 'loading'
    });
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    
    // Call autoInjectTokens again, it should add the listener but not inject immediately
    autoInjectTokens();
    expect(addEventListenerSpy).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function));
    
    // Dispatch DOMContentLoaded
    const domContentLoadedEvent = new Event('DOMContentLoaded');
    document.dispatchEvent(domContentLoadedEvent);

    // Ensure no new style element was added
    expect(document.querySelectorAll('#adorable-css-02-design_tokens-auto').length).toBe(1);
    expect(document.getElementById('adorable-css-02-design_tokens-auto')).toBe(initialStyle);

    // Reset
    Object.defineProperty(document, 'readyState', {
      configurable: true,
      get: () => 'complete'
    });
    addEventListenerSpy.mockRestore();
  });
});
