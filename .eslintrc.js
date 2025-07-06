module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
  ],
  env: {
    node: true,
    es2020: true,
  },
  ignorePatterns: [
    'node_modules/**',
    'dist/**',
    'build/**',
    '.svelte-kit/**',
    'coverage/**',
    '*.config.js',
    '*.config.ts',
    'test-*.js',
    '.eslintrc.js',
  ],
  overrides: [
    // TypeScript files
    {
      files: ['**/*.ts', '**/*.tsx'],
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': ['error', { 
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
    // Svelte files (for homepage-kit)
    {
      files: ['**/*.svelte'],
      processor: 'svelte/svelte',
    },
  ],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'eqeqeq': ['error', 'always'],
  },
};