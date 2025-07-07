import { noMargin, cssNativeSyntax, opacityDotSyntax } from './rules/index.js';

/**
 * ESLint plugin for AdorableCSS framework
 */
const plugin = {
  meta: {
    name: 'eslint-plugin-adorable-css',
    version: '0.1.0'
  },
  
  rules: {
    'no-margin': noMargin,
    'css-native-syntax': cssNativeSyntax,
    'opacity-dot-syntax': opacityDotSyntax
  },
  
  configs: {
    recommended: {
      plugins: ['adorable-css'],
      rules: {
        'adorable-css/no-margin': 'error',
        'adorable-css/css-native-syntax': 'error',
        'adorable-css/opacity-dot-syntax': 'error'
      }
    },
    strict: {
      plugins: ['adorable-css'],
      rules: {
        'adorable-css/no-margin': 'error',
        'adorable-css/css-native-syntax': 'error',
        'adorable-css/opacity-dot-syntax': 'error'
      }
    },
    'best-practices': {
      plugins: ['adorable-css'],
      rules: {
        'adorable-css/no-margin': 'warn',
        'adorable-css/css-native-syntax': 'error',
        'adorable-css/opacity-dot-syntax': 'warn'
      }
    }
  }
};

// ESM 호환성  
export default plugin;