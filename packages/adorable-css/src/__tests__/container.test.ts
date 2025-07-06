import { generateCSS } from '../01-core/generators/generator';

describe('Container and max-w 02-design_tokens', () => {
  it('should generate container with token sizes', () => {
    const css = generateCSS(['container(sm)']);
    console.log('container(sm):', css);
    expect(css).toContain('max-width:var(--container-sm');
  });

  it('should generate container with multiple token sizes', () => {
    const testCases = [
      { input: 'container(xs)', expected: 'max-width:var(--container-xs' },
      { input: 'container(md)', expected: 'max-width:var(--container-md' },
      { input: 'container(lg)', expected: 'max-width:var(--container-lg' },
      { input: 'container(xl)', expected: 'max-width:var(--container-xl' },
      { input: 'container(2xl)', expected: 'max-width:var(--container-2xl' },
      { input: 'container(3xl)', expected: 'max-width:var(--container-3xl' },
    ];

    testCases.forEach(({ input, expected }) => {
      const css = generateCSS([input]);
      console.log(`${input}:`, css);
      expect(css).toContain(expected);
    });
  });

  it('should generate max-w with container 02-design_tokens', () => {
    const testCases = [
      { input: 'max-w(sm)', expected: 'max-width:var(--container-sm' },
      { input: 'max-w(md)', expected: 'max-width:var(--container-md' },
      { input: 'max-w(lg)', expected: 'max-width:var(--container-lg' },
      { input: 'max-w(xl)', expected: 'max-width:var(--container-xl' },
      { input: 'max-w(2xl)', expected: 'max-width:var(--container-2xl' },
    ];

    testCases.forEach(({ input, expected }) => {
      const css = generateCSS([input]);
      console.log(`${input}:`, css);
      expect(css).toContain(expected);
    });
  });

  it('should generate max-w with size 02-design_tokens as fallback', () => {
    // Tokens that might not be recognized as container 02-design_tokens
    const css = generateCSS(['max-w(4xs)']);
    console.log('max-w(4xs):', css);
    // Should fall back to size token
    expect(css).toMatch(/max-width:var\(--(?:container|size)-4xs/);
  });

  it('should generate max-w with pixel values', () => {
    const css = generateCSS(['max-w(960)']);
    console.log('max-w(960):', css);
    expect(css).toContain('max-width:960px');
  });

  it('should generate max-w with special values', () => {
    const testCases = [
      { input: 'max-w(full)', expected: 'max-width:100%' },
      { input: 'max-w(screen)', expected: 'max-width:100vw' },
      { input: 'max-w(none)', expected: 'max-width:none' },
    ];

    testCases.forEach(({ input, expected }) => {
      const css = generateCSS([input]);
      console.log(`${input}:`, css);
      expect(css).toContain(expected);
    });
  });

  it('should use container 02-design_tokens with correct CSS variable references', () => {
    // Test that container and max-w use CSS variables with fallback calc values
    const css1 = generateCSS(['container(lg)']);
    expect(css1).toContain('max-width:var(--container-lg, calc(20rem * 1.3300))');
    
    const css2 = generateCSS(['max-w(xl)']);
    expect(css2).toContain('max-width:var(--container-xl, calc(20rem * 1.7689))');
    
    // Test that smaller sizes use division
    const css3 = generateCSS(['container(xs)']);
    expect(css3).toContain('max-width:var(--container-xs, calc(20rem / 1.7689))');
    
    console.log('Container token usage verified with CSS variables and fallback calc() values');
  });
});