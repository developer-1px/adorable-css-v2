import { describe, expect, test } from 'vitest';
import { grid } from '../rules/layout/grid';

describe('grid rule', () => {
  test('grid() returns default grid', () => {
    expect(grid()).toEqual({ 
      display: 'grid',
      'grid-template-columns': 'repeat(auto-fit, minmax(300px, 1fr))',
      'gap': 'var(--spacing-lg, 1rem)'
    });
  });

  test('grid(2) returns 2 column grid', () => {
    expect(grid('2')).toEqual({
      display: 'grid',
      'grid-template-columns': 'repeat(2, minmax(0, 1fr))',
      'gap': 'var(--spacing-lg, 1rem)'
    });
  });

  test('grid(3) returns 3 column grid', () => {
    expect(grid('3')).toEqual({
      display: 'grid',
      'grid-template-columns': 'repeat(3, minmax(0, 1fr))',
      'gap': 'var(--spacing-lg, 1rem)'
    });
  });

  test('grid(4) returns 4 column grid', () => {
    expect(grid('4')).toEqual({
      display: 'grid',
      'grid-template-columns': 'repeat(4, minmax(0, 1fr))',
      'gap': 'var(--spacing-lg, 1rem)'
    });
  });

  test('grid(3x2) returns 3 columns by 2 rows grid', () => {
    expect(grid('3x2')).toEqual({
      display: 'grid',
      'grid-template-columns': 'repeat(3, minmax(0, 1fr))',
      'grid-template-rows': 'repeat(2, minmax(0, 1fr))',
      'gap': 'var(--spacing-lg, 1rem)'
    });
  });

  test('grid(4x3) returns 4 columns by 3 rows grid', () => {
    expect(grid('4x3')).toEqual({
      display: 'grid',
      'grid-template-columns': 'repeat(4, minmax(0, 1fr))',
      'grid-template-rows': 'repeat(3, minmax(0, 1fr))',
      'gap': 'var(--spacing-lg, 1rem)'
    });
  });

  test('grid with custom template', () => {
    expect(grid('200px 1fr 200px')).toEqual({
      display: 'grid',
      'grid-template-columns': '200px 1fr 200px',
      'gap': 'var(--spacing-lg, 1rem)'
    });
  });

  test('grid(auto-fit) returns auto-fit', () => {
    expect(grid('auto-fit')).toEqual({
      display: 'grid',
      'grid-template-columns': 'auto-fit',
      'gap': 'var(--spacing-lg, 1rem)'
    });
  });
});