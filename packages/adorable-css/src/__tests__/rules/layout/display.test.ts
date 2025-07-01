import { describe, it, expect } from 'vitest';
import { 
  block, inline, inlineBlock, inlineFlex, none, hidden, grid,
  hbox, vbox, wrap, pack, flex, flexWrap, items, justify, shrink, grow
} from '../../../rules/layout/display';

describe('display rules', () => {
  describe('basic display utilities', () => {
    it('should apply display values', () => {
      expect(block()).toEqual({ display: 'block' });
      expect(inline()).toEqual({ display: 'inline' });
      expect(inlineBlock()).toEqual({ display: 'inline-block' });
      expect(inlineFlex()).toEqual({ display: 'inline-flex' });
      expect(none()).toEqual({ display: 'none' });
      expect(hidden()).toEqual({ display: 'none' });
      expect(grid()).toEqual({ display: 'grid' });
    });
  });

  describe('hbox (horizontal flexbox)', () => {
    it('should create horizontal flexbox with defaults', () => {
      expect(hbox()).toEqual({
        display: 'flex',
        'flex-direction': 'row',
        'align-items': 'center'
      });
    });

    it('should handle alignment options', () => {
      expect(hbox('top')).toEqual({
        display: 'flex',
        'flex-direction': 'row',
        'align-items': 'flex-start'
      });
      expect(hbox('middle')).toEqual({
        display: 'flex',
        'flex-direction': 'row',
        'align-items': 'center'
      });
      expect(hbox('bottom')).toEqual({
        display: 'flex',
        'flex-direction': 'row',
        'align-items': 'flex-end'
      });
      expect(hbox('fill')).toEqual({
        display: 'flex',
        'flex-direction': 'row',
        'align-items': 'stretch'
      });
    });

    it('should handle justification options', () => {
      expect(hbox('left')).toEqual({
        display: 'flex',
        'flex-direction': 'row',
        'align-items': 'center',
        'justify-content': 'flex-start'
      });
      expect(hbox('right')).toEqual({
        display: 'flex',
        'flex-direction': 'row',
        'align-items': 'center',
        'justify-content': 'flex-end'
      });
      expect(hbox('between')).toEqual({
        display: 'flex',
        'flex-direction': 'row',
        'align-items': 'center',
        'justify-content': 'space-between'
      });
    });

    it('should handle combined options', () => {
      expect(hbox('top+right')).toEqual({
        display: 'flex',
        'flex-direction': 'row',
        'align-items': 'flex-start',
        'justify-content': 'flex-end'
      });
      expect(hbox('middle/between')).toEqual({
        display: 'flex',
        'flex-direction': 'row',
        'align-items': 'center',
        'justify-content': 'space-between'
      });
    });

    it('should handle wrap and reverse modifiers', () => {
      expect(hbox('wrap')).toEqual({
        display: 'flex',
        'flex-direction': 'row',
        'align-items': 'center',
        'flex-wrap': 'wrap'
      });
      expect(hbox('reverse')).toEqual({
        display: 'flex',
        'flex-direction': 'row-reverse',
        'align-items': 'center'
      });
    });
  });

  describe('vbox (vertical flexbox)', () => {
    it('should create vertical flexbox with defaults', () => {
      expect(vbox()).toEqual({
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'stretch'
      });
    });

    it('should handle alignment options', () => {
      expect(vbox('left')).toEqual({
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'flex-start'
      });
      expect(vbox('center')).toEqual({
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'center'
      });
      expect(vbox('right')).toEqual({
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'flex-end'
      });
    });

    it('should handle justification options', () => {
      expect(vbox('top')).toEqual({
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'stretch',
        'justify-content': 'flex-start'
      });
      expect(vbox('middle')).toEqual({
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'stretch',
        'justify-content': 'center'
      });
      expect(vbox('bottom')).toEqual({
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'stretch',
        'justify-content': 'flex-end'
      });
    });

    it('should handle wrap and reverse modifiers', () => {
      expect(vbox('wrap')).toEqual({
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'stretch',
        'flex-wrap': 'wrap'
      });
      expect(vbox('reverse')).toEqual({
        display: 'flex',
        'flex-direction': 'column-reverse',
        'align-items': 'stretch'
      });
    });
  });

  describe('other flexbox utilities', () => {
    it('wrap should be alias for hbox', () => {
      expect(wrap('top+right')).toEqual(hbox('top+right'));
    });

    it('pack should center content', () => {
      expect(pack()).toEqual({
        display: 'flex',
        'flex-direction': 'row',
        'align-items': 'center',
        'justify-content': 'center'
      });
    });
  });

  describe('flex properties', () => {
    it('should handle flex shorthand', () => {
      expect(flex()).toEqual({ flex: '1 1 0%' });
      expect(flex('1')).toEqual({ flex: '1' });
      expect(flex('0 1 auto')).toEqual({ flex: '0 1 auto' });
    });

    it('should apply flex-wrap', () => {
      expect(flexWrap()).toEqual({ 'flex-wrap': 'wrap' });
    });

    it('should handle align-items', () => {
      expect(items('center')).toEqual({ 'align-items': 'center' });
      expect(items('top')).toEqual({ 'align-items': 'flex-start' });
      expect(items('bottom')).toEqual({ 'align-items': 'flex-end' });
      expect(items('fill')).toEqual({ 'align-items': 'stretch' });
      expect(items()).toEqual({});
    });

    it('should handle justify-content', () => {
      expect(justify('center')).toEqual({ 'justify-content': 'center' });
      expect(justify('between')).toEqual({ 'justify-content': 'space-between' });
      expect(justify('around')).toEqual({ 'justify-content': 'space-around' });
      expect(justify('evenly')).toEqual({ 'justify-content': 'space-evenly' });
      expect(justify()).toEqual({});
    });

    it('should handle flex-shrink and flex-grow', () => {
      expect(shrink('0')).toEqual({ 'flex-shrink': '0' });
      expect(shrink('2')).toEqual({ 'flex-shrink': '2' });
      expect(shrink()).toEqual({});
      
      expect(grow('1')).toEqual({ 'flex-grow': '1' });
      expect(grow('0')).toEqual({ 'flex-grow': '0' });
      expect(grow()).toEqual({});
    });
  });
});