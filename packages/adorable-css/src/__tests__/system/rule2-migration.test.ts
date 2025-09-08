import { describe, it, expect, beforeAll, test } from 'vitest';
import { generateClass } from '../../07-generator/generator';
import { initializeRule2Handlers } from '../../04-rules/rule2-registry';

describe('Rule2 Migration - Figma Compatible Properties', () => {
  beforeAll(() => {
    initializeRule2Handlers();
  });

  describe('Display Properties', () => {
    it('should handle basic display properties', () => {
      expect(generateClass('block')).toContain('display:block');
      expect(generateClass('inline')).toContain('display:inline');
      expect(generateClass('inline-block')).toContain('display:inline-block');
      expect(generateClass('none')).toContain('display:none');
      expect(generateClass('hidden')).toContain('display:none');
      expect(generateClass('flex')).toContain('display:flex');
      expect(generateClass('grid')).toContain('display:grid');
    });

    test.skip('should handle display() function', () => {
      expect(generateClass('display(block)')).toContain('display:block');
      expect(generateClass('display(flex)')).toContain('display:flex');
      expect(generateClass('display(none)')).toContain('display:none');
    });
  });

  describe('Position Properties', () => {
    it('should handle position types', () => {
      expect(generateClass('absolute')).toContain('position:absolute');
      expect(generateClass('relative')).toContain('position:relative');
      expect(generateClass('fixed')).toContain('position:fixed');
      expect(generateClass('sticky')).toContain('position:sticky');
      expect(generateClass('static')).toContain('position:static');
    });

    it('should handle position offsets', () => {
      expect(generateClass('top(10)')).toContain('top:10px');
      expect(generateClass('right(20)')).toContain('right:20px');
      expect(generateClass('bottom(30)')).toContain('bottom:30px');
      expect(generateClass('left(40)')).toContain('left:40px');
    });

    test.skip('should handle inset shortcuts', () => {
      expect(generateClass('inset(0)')).toContain('inset:0');
      expect(generateClass('inset(10)')).toContain('inset:10px');
      expect(generateClass('inset-x(20)')).toContain('left:20px;right:20px');
      expect(generateClass('inset-y(30)')).toContain('top:30px;bottom:30px');
    });

    it('should handle z-index', () => {
      expect(generateClass('z(10)')).toContain('z-index:10');
      expect(generateClass('z(auto)')).toContain('z-index:auto');
      expect(generateClass('z(modal)')).toContain('z-index:2000');
    });

    it('should handle layer utility', () => {
      expect(generateClass('layer(modal)')).toContain('position:fixed;z-index:2000');
      expect(generateClass('layer(dropdown)')).toContain('position:absolute;z-index:1000');
    });
  });

  describe('Overflow Properties', () => {
    test.skip('should handle overflow values', () => {
      expect(generateClass('overflow(hidden)')).toContain('overflow:hidden');
      expect(generateClass('overflow-x(scroll)')).toContain('overflow-x:scroll');
      expect(generateClass('overflow-y(auto)')).toContain('overflow-y:auto');
    });

    it('should handle overflow shortcuts', () => {
      expect(generateClass('clip')).toContain('overflow:hidden');
      expect(generateClass('scrollable')).toContain('overflow:auto');
      expect(generateClass('scroll-x')).toContain('overflow-x:auto;overflow-y:hidden');
      expect(generateClass('scroll-y')).toContain('overflow-y:auto;overflow-x:hidden');
    });
  });

  describe('Shadow & Elevation', () => {
    test.skip('should handle shadow values', () => {
      expect(generateClass('shadow(none)')).toContain('box-shadow:none');
      expect(generateClass('shadow(sm)')).toContain('box-shadow:0 1px 2px 0 rgba(0, 0, 0, 0.05)');
      expect(generateClass('shadow(lg)')).toContain('box-shadow:0 10px 15px -3px rgba(0, 0, 0, 0.1)');
    });

    test.skip('should handle custom shadow format', () => {
      expect(generateClass('shadow(2/4/6/0/black)')).toContain('box-shadow:2px 4px 6px 0 black');
      expect(generateClass('shadow(0/0/10)')).toContain('box-shadow:0 0 10px rgba(0,0,0,0.1)');
    });

    it('should handle elevation', () => {
      expect(generateClass('elevation(0)')).toContain('box-shadow:none');
      expect(generateClass('elevation(4)')).toContain('box-shadow:0px 2px 4px -1px rgba(0,0,0,0.2)');
    });
  });

  describe('Background Properties', () => {
    test.skip('should handle background colors', () => {
      expect(generateClass('bg(red)')).toContain('background-color:red');
      expect(generateClass('bg(primary)')).toContain('background-color:');
      expect(generateClass('bg(#123456)')).toContain('background-color:#123456');
    });

    it('should handle background auto color', () => {
      const result = generateClass('bg(auto)');
      expect(result).toContain('background-color:currentColor');
      expect(result).toContain('color:var(--ac-auto-text-color, #000)');
    });

    test.skip('should handle gradient backgrounds', () => {
      expect(generateClass('bg(gradient(linear-gradient(to right, red, blue)))')).toContain('background:linear-gradient(to right, red, blue)');
      expect(generateClass('bg(90deg/red/blue)')).toContain('background:linear-gradient(90deg, red, blue)');
    });

    it('should handle background utilities', () => {
      expect(generateClass('bg-size(cover)')).toContain('background-size:cover');
      expect(generateClass('bg-position(center)')).toContain('background-position:center');
      expect(generateClass('bg-repeat(no-repeat)')).toContain('background-repeat:no-repeat');
    });
  });

  describe('Transform Properties', () => {
    test.skip('should handle scale transform', () => {
      expect(generateClass('scale(1.5)')).toContain('transform:scale(1.5)');
      expect(generateClass('scale(1.2/0.8)')).toContain('transform:scale(1.2, 0.8)');
      expect(generateClass('scale-x(2)')).toContain('transform:scaleX(2)');
      expect(generateClass('scale-y(0.5)')).toContain('transform:scaleY(0.5)');
    });

    test.skip('should handle rotate transform', () => {
      expect(generateClass('rotate(45)')).toContain('transform:rotate(45deg)');
      expect(generateClass('rotate(90deg)')).toContain('transform:rotate(90deg)');
      expect(generateClass('rotate-x(180)')).toContain('transform:rotateX(180deg)');
    });

    test.skip('should handle translate transform', () => {
      expect(generateClass('translate(10)')).toContain('transform:translate(10px)');
      expect(generateClass('translate(10/20)')).toContain('transform:translate(10px, 20px)');
      expect(generateClass('translate-x(50)')).toContain('transform:translateX(50px)');
    });

    test.skip('should handle transform origin', () => {
      expect(generateClass('transform-origin(center)')).toContain('transform-origin:center');
      expect(generateClass('transform-origin(top-left)')).toContain('transform-origin:top left');
    });
  });

  describe('Grid Properties', () => {
    test.skip('should handle grid template', () => {
      expect(generateClass('grid-cols(3)')).toContain('grid-template-columns:repeat(3, 1fr)');
      expect(generateClass('grid-rows(2)')).toContain('grid-template-rows:repeat(2, 1fr)');
      expect(generateClass('grid-cols(1fr/2fr/1fr)')).toContain('grid-template-columns:1fr 2fr 1fr');
    });

    test.skip('should handle grid gap', () => {
      expect(generateClass('grid-gap(20)')).toContain('grid-gap:20px');
      expect(generateClass('grid-gap(10/20)')).toContain('grid-gap:10px 20px');
      expect(generateClass('grid-col-gap(15)')).toContain('grid-column-gap:15px');
    });

    test.skip('should handle grid item placement', () => {
      expect(generateClass('col-span(2)')).toContain('grid-column:span 2 / span 2');
      expect(generateClass('col-span(full)')).toContain('grid-column:1 / -1');
      expect(generateClass('row-span(3)')).toContain('grid-row:span 3 / span 3');
    });

    test.skip('should handle grid flow', () => {
      expect(generateClass('grid-flow(row)')).toContain('grid-auto-flow:row');
      expect(generateClass('grid-flow(col-dense)')).toContain('grid-auto-flow:column dense');
    });
  });

  describe('Filter Effects', () => {
    it('should handle additional filter effects', () => {
      expect(generateClass('grayscale(0.5)')).toContain('filter:grayscale(0.5)');
      expect(generateClass('hue-rotate(90)')).toContain('filter:hue-rotate(90)');
      expect(generateClass('invert(1)')).toContain('filter:invert(1)');
    });
  });
});