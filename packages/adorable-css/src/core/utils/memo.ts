/**
 * Create a memoized function that takes a single string argument
 * @param fn Function to memoize
 * @returns Memoized function
 */
export function createMemo<T>(fn: (input: string) => T): (input: string) => T {
  const cache = new Map<string, T>();
  
  return (input: string): T => {
    if (cache.has(input)) {
      return cache.get(input)!;
    }
    
    const result = fn(input);
    cache.set(input, result);
    
    return result;
  };
}