import { describe, it, expect } from 'vitest';
import { designSystemRules } from './design-system';

describe('Design System Rules', () => {
  describe('Layout System', () => {
    it('should generate section styles', () => {
      const defaultSection = designSystemRules.section();
      expect(defaultSection['padding-top']).toBeDefined();
      expect(defaultSection['padding-bottom']).toBeDefined();
      
      const heroSection = designSystemRules.section('hero');
      expect(heroSection).toMatchObject({
        'min-height': '100vh',
        'display': 'flex',
        'align-items': 'center'
      });
    });

    it('should generate container styles', () => {
      expect(designSystemRules.contain()).toMatchObject({
        'width': '100%',
        'margin-left': 'auto',
        'margin-right': 'auto',
        'max-width': '64rem'
      });
      
      expect(designSystemRules.contain('narrow')).toMatchObject({
        'max-width': '48rem'
      });
    });

    it('should generate content styles', () => {
      const defaultContent = designSystemRules.content();
      expect(defaultContent).toMatchObject({
        'display': 'flex',
        'flex-direction': 'column'
      });
      expect(defaultContent.gap).toBeDefined();
      
      expect(designSystemRules.content('centered')).toMatchObject({
        'align-items': 'center',
        'text-align': 'center'
      });
    });

    it('should generate stack styles', () => {
      const defaultStack = designSystemRules.stack();
      expect(defaultStack).toMatchObject({
        'display': 'flex',
        'flex-direction': 'column'
      });
      expect(defaultStack.gap).toBeDefined();
      
      const stackLg = designSystemRules.stack('lg');
      expect(stackLg.gap).toBeDefined();
    });
  });

  describe('Typography System', () => {
    it('should generate hero text styles', () => {
      expect(designSystemRules['hero-text']()).toMatchObject({
        'font-size': 'clamp(2.5rem, 5vw, 4rem)',
        'font-weight': '900',
        'line-height': '1.1'
      });
    });

    it('should generate lead text styles', () => {
      const leadStyles = designSystemRules.lead();
      expect(leadStyles['font-size']).toBeDefined();
      expect(leadStyles).toMatchObject({
        'line-height': '1.6',
        'opacity': '0.8'
      });
    });
  });

  describe('Component System', () => {
    it('should generate button base styles', () => {
      expect(designSystemRules['btn-base']()).toMatchObject({
        'display': 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center',
        'cursor': 'pointer'
      });
    });

    it('should generate badge styles', () => {
      const defaultBadge = designSystemRules.badge();
      expect(defaultBadge).toMatchObject({
        'display': 'inline-flex',
        'align-items': 'center',
        'font-weight': '600'
      });
      expect(defaultBadge['border-radius']).toBeDefined();
      
      expect(designSystemRules.badge('success')).toMatchObject({
        'background': 'rgb(34 197 94 / 0.1)',
        'color': 'rgb(34 197 94)'
      });
    });

    it('should generate alert styles', () => {
      expect(designSystemRules.alert()).toMatchObject({
        'border-width': '1px',
        'border-style': 'solid'
      });
      
      expect(designSystemRules.alert('error')).toMatchObject({
        'background': 'rgb(239 68 68 / 0.05)',
        'color': 'rgb(127 29 29)'
      });
    });
  });

  describe('Grid System', () => {
    it('should generate feature grid styles', () => {
      expect(designSystemRules['feature-grid']()).toMatchObject({
        'display': 'grid',
        'grid-template-columns': 'repeat(auto-fit, minmax(280px, 1fr))'
      });
    });
  });

  describe('Visual Utilities', () => {
    it('should generate divider styles', () => {
      expect(designSystemRules.divider()).toMatchObject({
        'height': '1px',
        'border': 'none'
      });
      
      expect(designSystemRules.divider('vertical')).toMatchObject({
        'width': '1px',
        'height': 'auto'
      });
    });

    it('should generate highlight styles', () => {
      expect(designSystemRules.highlight()).toMatchObject({
        'padding': '0 0.2em'
      });
      
      expect(designSystemRules.highlight('yellow')).toMatchObject({
        'background': 'linear-gradient(to bottom, transparent 50%, rgb(254 240 138) 50%)'
      });
    });
  });
});