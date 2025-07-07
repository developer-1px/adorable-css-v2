import { RuleTester } from 'eslint';
import useLayerInsteadOfAbsoluteInset from '../src/rules/use-layer-instead-of-absolute-inset';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run('use-layer-instead-of-absolute-inset', useLayerInsteadOfAbsoluteInset, {
  valid: [
    {
      code: `<div className="layer" />`,
    },
    {
      code: `<div className="absolute top(0) left(0)" />`,
    },
    {
      code: `<div className="relative inset(0)" />`,
    },
    {
      code: `<div className="absolute inset(10)" />`,
    },
    {
      code: `<div className="fixed inset(0)" />`,
    },
    {
      code: `const classes = "flex items-center"`,
    },
  ],
  invalid: [
    {
      code: `<div className="absolute inset(0)" />`,
      errors: [{ messageId: 'useLayer' }],
      output: `<div className="layer" />`,
    },
    {
      code: `<div className="absolute inset(0) z(10)" />`,
      errors: [{ messageId: 'useLayer' }],
      output: `<div className="layer z(10)" />`,
    },
    {
      code: `<div className="inset(0) absolute" />`,
      errors: [{ messageId: 'useLayer' }],
      output: `<div className="layer" />`,
    },
    {
      code: `<div className="bg(white) absolute inset(0) opacity(0.5)" />`,
      errors: [{ messageId: 'useLayer' }],
      output: `<div className="bg(white) layer opacity(0.5)" />`,
    },
    {
      code: `const overlay = "absolute inset(0) bg(black.5)"`,
      errors: [{ messageId: 'useLayer' }],
      output: `const overlay = "layer bg(black.5)"`,
    },
    {
      code: `const classes = "p(20) inset(0) absolute z(100)"`,
      errors: [{ messageId: 'useLayer' }],
      output: `const classes = "p(20) layer z(100)"`,
    },
  ],
});