import { 
  noMargin, 
  cssNativeSyntax, 
  opacityDotSyntax, 
  boxPackSyntax, 
  useLayerInsteadOfAbsoluteInset,
  invalidColorSyntax,
  invalidOpacitySyntax,
  unsupportedGradientSyntax,
  invalidBorderSyntax,
  unsupportedStrokeSyntax,
  useWidthHeightInsteadOfSize
} from './rules/index.js';

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
    'opacity-dot-syntax': opacityDotSyntax,
    'box-pack-syntax': boxPackSyntax,
    'use-layer-instead-of-absolute-inset': useLayerInsteadOfAbsoluteInset,
    'invalid-color-syntax': invalidColorSyntax,
    'invalid-opacity-syntax': invalidOpacitySyntax,
    'unsupported-gradient-syntax': unsupportedGradientSyntax,
    'invalid-border-syntax': invalidBorderSyntax,
    'unsupported-stroke-syntax': unsupportedStrokeSyntax,
    'use-width-height-instead-of-size': useWidthHeightInsteadOfSize
  },
  
  configs: {
    recommended: {
      plugins: ['adorable-css'],
      rules: {
        'adorable-css/no-margin': 'error',
        'adorable-css/css-native-syntax': 'error',
        'adorable-css/opacity-dot-syntax': 'error',
        'adorable-css/box-pack-syntax': 'warn',
        'adorable-css/use-layer-instead-of-absolute-inset': 'warn',
        'adorable-css/invalid-color-syntax': 'error',
        'adorable-css/invalid-opacity-syntax': 'error',
        'adorable-css/unsupported-gradient-syntax': 'warn',
        'adorable-css/invalid-border-syntax': 'error',
        'adorable-css/unsupported-stroke-syntax': 'warn',
        'adorable-css/use-width-height-instead-of-size': 'error'
      }
    },
    strict: {
      plugins: ['adorable-css'],
      rules: {
        'adorable-css/no-margin': 'error',
        'adorable-css/css-native-syntax': 'error',
        'adorable-css/opacity-dot-syntax': 'error',
        'adorable-css/box-pack-syntax': 'error',
        'adorable-css/use-layer-instead-of-absolute-inset': 'error',
        'adorable-css/invalid-color-syntax': 'error',
        'adorable-css/invalid-opacity-syntax': 'error',
        'adorable-css/unsupported-gradient-syntax': 'error',
        'adorable-css/invalid-border-syntax': 'error',
        'adorable-css/unsupported-stroke-syntax': 'error',
        'adorable-css/use-width-height-instead-of-size': 'error'
      }
    },
    'best-practices': {
      plugins: ['adorable-css'],
      rules: {
        'adorable-css/no-margin': 'warn',
        'adorable-css/css-native-syntax': 'error',
        'adorable-css/opacity-dot-syntax': 'warn',
        'adorable-css/box-pack-syntax': 'warn',
        'adorable-css/use-layer-instead-of-absolute-inset': 'warn',
        'adorable-css/invalid-color-syntax': 'error',
        'adorable-css/invalid-opacity-syntax': 'error',
        'adorable-css/unsupported-gradient-syntax': 'warn',
        'adorable-css/invalid-border-syntax': 'warn',
        'adorable-css/unsupported-stroke-syntax': 'warn',
        'adorable-css/use-width-height-instead-of-size': 'warn'
      }
    }
  }
};

// ESM 호환성  
export default plugin;