/**
 * Rule2 Registry - Performance optimized rule handlers
 * These handlers receive parsed args directly and return CSS strings
 */

// CSS layer types
export type CSSLayer = 'base' | 'components' | 'composition' | 'utilities';

// Rule2 handler type - receives args directly, returns CSS string directly  
export type Rule2Handler = (args: any) => string;
export type Rule2Handlers = Record<string, Rule2Handler>;

// Rule2 handler definition with layer information
export interface Rule2Definition {
  handler: Rule2Handler;
  layer?: CSSLayer;
}

export type Rule2Definitions = Record<string, Rule2Definition>;

// Registry for Rule2 handlers with layer information
const rule2Registry = new Map<string, Rule2Definition>();

/**
 * Register Rule2 handler(s) - supports both individual and object registration with layer
 */
export function registerRule2(name: string, handler: Rule2Handler, layer?: CSSLayer): void;
export function registerRule2(name: string, definition: Rule2Definition): void;
export function registerRule2(handlers: Rule2Handlers, layer?: CSSLayer): void;
export function registerRule2(definitions: Rule2Definitions): void;
export function registerRule2(
  nameOrHandlers: string | Rule2Handlers | Rule2Definitions, 
  handlerOrLayer?: Rule2Handler | Rule2Definition | CSSLayer,
  layer?: CSSLayer
): void {
  if (typeof nameOrHandlers === 'string') {
    // Single handler registration
    if (typeof handlerOrLayer === 'function') {
      // registerRule2(name, handler, layer?)
      rule2Registry.set(nameOrHandlers, { 
        handler: handlerOrLayer as Rule2Handler, 
        layer: layer || 'utilities' 
      });
    } else if (typeof handlerOrLayer === 'object') {
      // registerRule2(name, definition)
      rule2Registry.set(nameOrHandlers, handlerOrLayer as Rule2Definition);
    }
  } else if (typeof nameOrHandlers === 'object') {
    // Bulk registration
    Object.entries(nameOrHandlers).forEach(([name, handlerOrDef]) => {
      if (typeof handlerOrDef === 'function') {
        // Rule2Handlers format
        rule2Registry.set(name, { 
          handler: handlerOrDef, 
          layer: (handlerOrLayer as CSSLayer) || 'utilities' 
        });
      } else {
        // Rule2Definitions format
        rule2Registry.set(name, handlerOrDef as Rule2Definition);
      }
    });
  }
}

/**
 * Get a Rule2 handler
 */
export function getRule2Handler(name: string): Rule2Handler | undefined {
  return rule2Registry.get(name)?.handler;
}

/**
 * Get a Rule2 definition (includes layer info)
 */
export function getRule2Definition(name: string): Rule2Definition | undefined {
  return rule2Registry.get(name);
}

/**
 * Get layer for a Rule2 handler
 */
export function getRule2Layer(name: string): CSSLayer | undefined {
  return rule2Registry.get(name)?.layer;
}


/**
 * Get all registered Rule2 handlers (only handlers)
 */
export function getAllRule2Handlers(): Map<string, Rule2Handler> {
  const handlers = new Map<string, Rule2Handler>();
  rule2Registry.forEach((def, name) => {
    handlers.set(name, def.handler);
  });
  return handlers;
}

/**
 * Get all registered Rule2 definitions (includes layer info)
 */
export function getAllRule2Definitions(): Map<string, Rule2Definition> {
  return new Map(rule2Registry);
}

/**
 * Clear all Rule2 handlers (mainly for testing)
 */
export function clearRule2Registry(): void {
  rule2Registry.clear();
}

/**
 * Debug function to get all registered handler names
 */
export function getRegisteredRule2HandlerNames(): string[] {
  return Array.from(rule2Registry.keys());
}