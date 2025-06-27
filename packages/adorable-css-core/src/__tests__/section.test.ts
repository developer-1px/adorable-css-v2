import { describe, it, expect } from 'vitest';
import { sectionRules } from './section';

describe('Section Rules', () => {
  describe('section()', () => {
    const rule = sectionRules.section;
    
    it('should match section utility', () => {
      expect(rule.match.test('section')).toBe(true);
      expect(rule.match.test('section(hero)')).toBe(true);
      expect(rule.match.test('section(feature)')).toBe(true);
      expect(rule.match.test('section(compact)')).toBe(true);
    });
    
    it('should generate default section styles', () => {
      const match = 'section'.match(rule.match)!;
      const styles = rule.create(match);
      expect(styles).toContain('position: relative');
      expect(styles).toContain('width: 100%');
      expect(styles).toContain('padding-top: var(--spacing-3xl, 4rem)');
      expect(styles).toContain('padding-bottom: var(--spacing-3xl, 4rem)');
    });
    
    it('should generate hero section styles', () => {
      const match = 'section(hero)'.match(rule.match)!;
      const styles = rule.create(match);
      expect(styles).toContain('min-height: 100vh');
      expect(styles).toContain('display: flex');
      expect(styles).toContain('align-items: center');
      expect(styles).toContain('padding-top: var(--spacing-5xl, 8rem)');
    });
    
    it('should generate feature section styles', () => {
      const match = 'section(feature)'.match(rule.match)!;
      const styles = rule.create(match);
      expect(styles).toContain('padding-top: var(--spacing-4xl, 6rem)');
      expect(styles).toContain('padding-bottom: var(--spacing-4xl, 6rem)');
    });
    
    it('should generate compact section styles', () => {
      const match = 'section(compact)'.match(rule.match)!;
      const styles = rule.create(match);
      expect(styles).toContain('padding-top: var(--spacing-2xl, 3rem)');
      expect(styles).toContain('padding-bottom: var(--spacing-2xl, 3rem)');
    });
    
    it('should generate flush section styles', () => {
      const match = 'section(flush)'.match(rule.match)!;
      const styles = rule.create(match);
      expect(styles).toContain('padding-top: 0');
      expect(styles).toContain('padding-bottom: 0');
    });
  });
  
  describe('contain()', () => {
    const rule = sectionRules.contain;
    
    it('should match contain utility', () => {
      expect(rule.match.test('contain')).toBe(true);
      expect(rule.match.test('contain(narrow)')).toBe(true);
      expect(rule.match.test('contain(wide)')).toBe(true);
      expect(rule.match.test('contain(full)')).toBe(true);
    });
    
    it('should generate default container styles', () => {
      const match = 'contain'.match(rule.match)!;
      const styles = rule.create(match);
      expect(styles).toContain('width: 100%');
      expect(styles).toContain('margin-left: auto');
      expect(styles).toContain('margin-right: auto');
      expect(styles).toContain('max-width: 64rem');
      expect(styles).toContain('padding-left: max(var(--spacing-md), 5vw)');
    });
    
    it('should generate narrow container styles', () => {
      const match = 'contain(narrow)'.match(rule.match)!;
      const styles = rule.create(match);
      expect(styles).toContain('max-width: 48rem');
    });
    
    it('should generate wide container styles', () => {
      const match = 'contain(wide)'.match(rule.match)!;
      const styles = rule.create(match);
      expect(styles).toContain('max-width: 80rem');
    });
    
    it('should generate full container styles', () => {
      const match = 'contain(full)'.match(rule.match)!;
      const styles = rule.create(match);
      expect(styles).toContain('max-width: 96rem');
    });
  });
  
  describe('content()', () => {
    const rule = sectionRules.content;
    
    it('should match content utility', () => {
      expect(rule.match.test('content')).toBe(true);
      expect(rule.match.test('content(centered)')).toBe(true);
      expect(rule.match.test('content(hero)')).toBe(true);
    });
    
    it('should generate default content styles', () => {
      const match = 'content'.match(rule.match)!;
      const styles = rule.create(match);
      expect(styles).toContain('display: flex');
      expect(styles).toContain('flex-direction: column');
      expect(styles).toContain('gap: var(--spacing-lg)');
    });
    
    it('should generate centered content styles', () => {
      const match = 'content(centered)'.match(rule.match)!;
      const styles = rule.create(match);
      expect(styles).toContain('align-items: center');
      expect(styles).toContain('text-align: center');
      expect(styles).toContain('gap: var(--spacing-xl)');
    });
    
    it('should generate hero content styles', () => {
      const match = 'content(hero)'.match(rule.match)!;
      const styles = rule.create(match);
      expect(styles).toContain('align-items: center');
      expect(styles).toContain('text-align: center');
      expect(styles).toContain('gap: var(--spacing-2xl)');
      expect(styles).toContain('max-width: 48rem');
      expect(styles).toContain('margin: 0 auto');
    });
  });
  
  describe('stack()', () => {
    const rule = sectionRules.stack;
    
    it('should match stack utility', () => {
      expect(rule.match.test('stack')).toBe(true);
      expect(rule.match.test('stack(lg)')).toBe(true);
      expect(rule.match.test('stack(2xl)')).toBe(true);
    });
    
    it('should generate default stack styles', () => {
      const match = 'stack'.match(rule.match)!;
      const styles = rule.create(match);
      expect(styles).toContain('display: flex');
      expect(styles).toContain('flex-direction: column');
      expect(styles).toContain('gap: var(--spacing-lg)');
      expect(styles).toContain('width: 100%');
    });
    
    it('should generate stack with custom gap', () => {
      const match = 'stack(2xl)'.match(rule.match)!;
      const styles = rule.create(match);
      expect(styles).toContain('gap: var(--spacing-2xl)');
    });
  });
  
  describe('flow()', () => {
    const rule = sectionRules.flow;
    
    it('should match flow utility', () => {
      expect(rule.match.test('flow')).toBe(true);
      expect(rule.match.test('flow(narrow)')).toBe(true);
      expect(rule.match.test('flow(wide)')).toBe(true);
    });
    
    it('should generate default flow styles', () => {
      const match = 'flow'.match(rule.match)!;
      const styles = rule.create(match);
      expect(styles).toContain('line-height: 1.7');
      expect(styles).toContain('color: var(--gray-700)');
      expect(styles).toContain('max-width: 70ch');
    });
    
    it('should generate narrow flow styles', () => {
      const match = 'flow(narrow)'.match(rule.match)!;
      const styles = rule.create(match);
      expect(styles).toContain('max-width: 65ch');
    });
    
    it('should generate wide flow styles', () => {
      const match = 'flow(wide)'.match(rule.match)!;
      const styles = rule.create(match);
      expect(styles).toContain('max-width: 80ch');
    });
  });
});