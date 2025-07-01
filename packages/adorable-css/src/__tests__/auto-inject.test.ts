import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { 
  autoInjectTokens, 
  configureAutoInject, 
  isTokensInjected,
  getAutoInjectConfig,
  resetInjectionState
} from '../core/runtime/auto-inject';
import { defaultTokens } from '../design-system/tokens';

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
  });

  it('should inject tokens automatically', () => {
    autoInjectTokens();
    
    const style = document.getElementById('adorable-css-tokens-auto');
    expect(style).toBeTruthy();
    expect(style?.textContent).toContain(':root {');
    expect(style?.textContent).toContain('--spacing-xs: 0.25rem');
    expect(style?.textContent).toContain('--spacing-lg: 1rem');
  });

  it('should not inject twice', () => {
    autoInjectTokens();
    const firstStyle = document.getElementById('adorable-css-tokens-auto');
    
    autoInjectTokens();
    const secondStyle = document.getElementById('adorable-css-tokens-auto');
    
    expect(firstStyle).toBe(secondStyle);
  });

  it('should respect enabled config', () => {
    configureAutoInject({ enabled: false });
    autoInjectTokens();
    
    const style = document.getElementById('adorable-css-tokens-auto');
    expect(style).toBeFalsy();
  });

  it('should use custom tokens', () => {
    // Create custom tokens with a custom spacing value
    const customTokens = {
      spacing: {
        custom: '999px'
      }
    };
    
    configureAutoInject({ tokens: customTokens });
    autoInjectTokens();
    
    const style = document.getElementById('adorable-css-tokens-auto');
    expect(style?.textContent).toContain('--spacing-custom: 999px');
  });

  it('should inject to head by default', () => {
    autoInjectTokens();
    
    const style = document.getElementById('adorable-css-tokens-auto');
    expect(style?.parentElement).toBe(document.head);
  });

  it('should inject to body when configured', () => {
    configureAutoInject({ injectTo: 'body' });
    autoInjectTokens();
    
    const style = document.getElementById('adorable-css-tokens-auto');
    expect(style?.parentElement).toBe(document.body);
  });

  it('should report injection status correctly', () => {
    expect(isTokensInjected()).toBe(false);
    
    autoInjectTokens();
    expect(isTokensInjected()).toBe(true);
  });

  it('should return current config', () => {
    // Make sure we're using the reset config
    configureAutoInject({ enabled: true, injectTo: 'head', priority: 0 });
    
    const config = getAutoInjectConfig();
    expect(config.enabled).toBe(true);
    expect(config.injectTo).toBe('head');
    expect(config.priority).toBe(0);
  });

  it('should dispatch custom event', () => {
    const handler = vi.fn();
    document.addEventListener('adorablecss:tokens-injected', handler);
    
    autoInjectTokens();
    
    expect(handler).toHaveBeenCalled();
    
    document.removeEventListener('adorablecss:tokens-injected', handler);
  });

  it('should handle DOM ready state', () => {
    // Mock document ready state
    Object.defineProperty(document, 'readyState', {
      configurable: true,
      get() { return 'loading'; }
    });
    
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    autoInjectTokens();
    
    expect(addEventListenerSpy).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function));
    
    // Reset
    Object.defineProperty(document, 'readyState', {
      configurable: true,
      get() { return 'complete'; }
    });
  });
});