import { describe, it, expect } from 'vitest';
import { cursor } from '../../../03-rules/interaction/cursor';

describe('cursor rule', () => {
  it('should handle common cursor values', () => {
    expect(cursor('pointer')).toEqual({ cursor: 'pointer' });
    expect(cursor('default')).toEqual({ cursor: 'default' });
    expect(cursor('move')).toEqual({ cursor: 'move' });
    expect(cursor('not-allowed')).toEqual({ cursor: 'not-allowed' });
    expect(cursor('wait')).toEqual({ cursor: 'wait' });
    expect(cursor('text')).toEqual({ cursor: 'text' });
    expect(cursor('help')).toEqual({ cursor: 'help' });
    expect(cursor('crosshair')).toEqual({ cursor: 'crosshair' });
  });

  it('should handle resize cursor values', () => {
    expect(cursor('n-resize')).toEqual({ cursor: 'n-resize' });
    expect(cursor('e-resize')).toEqual({ cursor: 'e-resize' });
    expect(cursor('s-resize')).toEqual({ cursor: 's-resize' });
    expect(cursor('w-resize')).toEqual({ cursor: 'w-resize' });
    expect(cursor('ne-resize')).toEqual({ cursor: 'ne-resize' });
    expect(cursor('nw-resize')).toEqual({ cursor: 'nw-resize' });
    expect(cursor('se-resize')).toEqual({ cursor: 'se-resize' });
    expect(cursor('sw-resize')).toEqual({ cursor: 'sw-resize' });
  });

  it('should handle special cursor values', () => {
    expect(cursor('none')).toEqual({ cursor: 'none' });
    expect(cursor('auto')).toEqual({ cursor: 'auto' });
    expect(cursor('grab')).toEqual({ cursor: 'grab' });
    expect(cursor('grabbing')).toEqual({ cursor: 'grabbing' });
    expect(cursor('zoom-in')).toEqual({ cursor: 'zoom-in' });
    expect(cursor('zoom-out')).toEqual({ cursor: 'zoom-out' });
  });

  it('should return empty object for no value', () => {
    expect(cursor()).toEqual({});
  });
});