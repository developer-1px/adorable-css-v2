/**
 * Simple memoization
 */
export function createMemo<T, K = any>(fn: (input: K) => T): (input: K) => T {
  const cache = new Map();
  
  return (input: K): T => {
    if (cache.has(input)) {
      return cache.get(input)!;
    }
    
    const result = fn(input);
    cache.set(input, result);
    return result;
  };
}