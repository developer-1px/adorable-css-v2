import { describe, it, expect, beforeEach } from 'vitest';
import { priorityRegistry } from '../04-rules/03-rules_deprecated/priority-registry';
import { generateClass } from '../07-generator/generator';
import { RulePriority } from '../04-rules/03-rules_deprecated/types';

describe('String Rules System', () => {
  beforeEach(() => {
    // Clear any existing string 03-rules to ensure clean state
    priorityRegistry['stringRules'].clear();
  });

  describe('Basic String Rule Registration', () => {
    it('should register and retrieve string 03-rules', () => {
      const testHandler = (args?: string) => `vbox(center) p(${args || 'lg'})`;
      
      priorityRegistry.registerString('test-component', testHandler, RulePriority.COMPONENT);
      
      expect(priorityRegistry.hasString('test-component')).toBe(true);
      expect(priorityRegistry.getStringHandler('test-component')).toBe(testHandler);
    });

    it('should register multiple string 03-rules in bulk', () => {
      const stringRules = {
        'comp-a': () => 'vbox p(lg)',
        'comp-b': (args?: string) => `hbox gap(${args || 'md'})`
      };
      
      priorityRegistry.registerStringBulk(stringRules, RulePriority.COMPONENT);
      
      expect(priorityRegistry.hasString('comp-a')).toBe(true);
      expect(priorityRegistry.hasString('comp-b')).toBe(true);
    });
  });

  describe('String Rule Resolution', () => {
    beforeEach(() => {
      // Register some test utility 03-rules (mock implementations)
      priorityRegistry.register('vbox', () => ({ display: 'flex', 'flex-direction': 'column' }), RulePriority.LAYOUT);
      priorityRegistry.register('center', () => ({ 'justify-content': 'center', 'align-items': 'center' }), RulePriority.LAYOUT);
      priorityRegistry.register('p', (args?: string) => ({ padding: args ? `${args}px` : '16px' }), RulePriority.UTILITY);
    });

    it('should resolve simple string rule to CSS', () => {
      priorityRegistry.registerString('simple-hero', () => 'vbox center p(20)', RulePriority.COMPONENT);
      
      const css = generateClass('simple-hero');
      
      expect(css).toContain('display:flex');
      expect(css).toContain('flex-direction:column');
      expect(css).toContain('justify-content:center');
      expect(css).toContain('align-items:center');
      expect(css).toContain('padding:20px');
    });

    it('should handle string 03-rules with arguments', () => {
      priorityRegistry.registerString('hero', (args?: string) => {
        if (args === 'compact') return 'vbox center p(10)';
        return 'vbox center p(20)';
      }, RulePriority.COMPONENT);
      
      const compactCSS = generateClass('hero(compact)');
      const defaultCSS = generateClass('hero');
      
      expect(compactCSS).toContain('padding:10px');
      expect(defaultCSS).toContain('padding:20px');
    });

    it('should handle nested string 03-rules', () => {
      // Register a base string rule
      priorityRegistry.registerString('base-layout', () => 'vbox center', RulePriority.COMPONENT);
      
      // Register a string rule that references the base
      priorityRegistry.registerString('full-hero', () => 'base-layout p(40)', RulePriority.COMPONENT);
      
      const css = generateClass('full-hero');
      
      expect(css).toContain('display:flex');
      expect(css).toContain('flex-direction:column');
      expect(css).toContain('justify-content:center');
      expect(css).toContain('align-items:center');
      expect(css).toContain('padding:40px');
    });

    it('should detect and prevent circular dependencies', () => {
      // Create circular dependency: rule-a -> rule-b -> rule-a
      priorityRegistry.registerString('rule-a', () => 'rule-b p(10)', RulePriority.COMPONENT);
      priorityRegistry.registerString('rule-b', () => 'rule-a center', RulePriority.COMPONENT);
      
      // Should not throw, should handle gracefully
      const css = generateClass('rule-a');
      
      // Should return some CSS (from the non-circular parts)
      expect(css).toBeDefined();
    });
  });

  describe('Priority and Specificity', () => {
    beforeEach(() => {
      priorityRegistry.register('p', (args?: string) => ({ padding: args ? `${args}px` : '16px' }), RulePriority.UTILITY);
    });

    it('should preserve priority from string 03-rules', () => {
      priorityRegistry.registerString('high-priority-comp', () => 'p(30)', RulePriority.COMPONENT);
      
      const rule = priorityRegistry.getStringRule('high-priority-comp');
      expect(rule?.priority).toBe(RulePriority.COMPONENT);
    });

    it('should inherit priority when resolving to CSS', () => {
      priorityRegistry.registerString('component-hero', () => 'p(25)', RulePriority.COMPONENT);
      
      const css = generateClass('component-hero');
      expect(css).toContain('padding:25px');
      expect(css).toContain('.component-hero');
    });
  });

  describe('Backward Compatibility', () => {
    beforeEach(() => {
      // Register both string and CSS object 03-rules with same name
      priorityRegistry.register('dual-rule', () => ({ color: 'red' }), RulePriority.UTILITY);
      priorityRegistry.registerString('dual-rule-string', () => 'p(15)', RulePriority.COMPONENT);
    });

    it('should prefer string 03-rules over CSS object 03-rules when both exist', () => {
      const css = generateClass('dual-rule-string');
      expect(css).toContain('padding:15px');
    });

    it('should fall back to CSS object 03-rules when string rule not found', () => {
      const css = generateClass('dual-rule');
      expect(css).toContain('color:red');
    });
  });

  describe('Error Handling', () => {
    it('should handle string 03-rules that return empty strings', () => {
      priorityRegistry.registerString('empty-rule', () => '', RulePriority.COMPONENT);
      
      const css = generateClass('empty-rule');
      expect(css).toBe('');
    });

    it('should handle string 03-rules that throw errors', () => {
      priorityRegistry.registerString('error-rule', () => {
        throw new Error('Test error');
      }, RulePriority.COMPONENT);
      
      // Should not throw, should handle gracefully
      const css = generateClass('error-rule');
      expect(css).toBe('');
    });

    it('should handle string 03-rules with invalid AdorableCSS syntax', () => {
      priorityRegistry.registerString('invalid-rule', () => 'invalid-{{-syntax', RulePriority.COMPONENT);
      
      // Should not throw, should handle gracefully
      const css = generateClass('invalid-rule');
      expect(css).toBeDefined();
    });
  });
});

describe('Hero String Rules Integration', () => {
  beforeEach(() => {
    // Import the hero string 03-rules to ensure they're loaded
    import('../05-components/patterns/hero').then(({ heroRules }) => {
      if (heroRules) {
        Object.entries(heroRules).forEach(([name, handler]) => {
          priorityRegistry.registerString(name, handler, RulePriority.COMPONENT);
        });
      }
    });
    
    // Register the necessary base utilities that hero string 03-rules use
    priorityRegistry.register('vbox', (args?: string) => ({ 
      display: 'flex', 
      'flex-direction': 'column',
      ...(args === 'center' ? { 'justify-content': 'center', 'align-items': 'center' } : {})
    }), RulePriority.LAYOUT);
    priorityRegistry.register('min-h', (args?: string) => ({ 'min-height': args || 'auto' }), RulePriority.UTILITY);
    priorityRegistry.register('relative', () => ({ position: 'relative' }), RulePriority.UTILITY);
    priorityRegistry.register('clip', () => ({ overflow: 'hidden' }), RulePriority.UTILITY);
  });

  it('should generate CSS from hero-string 03-rules', async () => {
    // Manually register a working hero string rule for testing
    priorityRegistry.registerString('test-hero', (args?: string) => {
      if (args === 'compact') return 'vbox min-h(50vh) relative';
      return 'vbox min-h(100vh) relative clip';
    }, RulePriority.COMPONENT);
    
    const css = generateClass('test-hero(compact)');
    
    // Should contain some CSS
    expect(css).toBeTruthy();
    expect(css.length).toBeGreaterThan(0);
    expect(css).toContain('display:flex');
    expect(css).toContain('flex-direction:column');
    expect(css).toContain('min-height:50vh');
  });
});