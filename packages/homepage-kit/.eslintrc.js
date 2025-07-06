module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    extraFileExtensions: ['.svelte'],
  },
  plugins: ['@typescript-eslint', 'svelte'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:svelte/recommended',
  ],
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  ],
  rules: {
    // TypeScript specific 03-rules
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_|\\$\\$' // $$Props, $$Slots 등을 위해 추가
    }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    
    // General 03-rules
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'eqeqeq': ['error', 'always'],
    'curly': ['error', 'all'],
    
    // Svelte specific 03-rules
    'svelte/no-unused-svelte-ignore': 'error',
    'svelte/no-dupe-else-if-blocks': 'error',
    'svelte/no-dupe-style-properties': 'error',
    'svelte/no-inner-declarations': 'error',
    'svelte/valid-compile': 'error',
  },
  ignorePatterns: [
    'dist/**',
    'build/**',
    '.svelte-kit/**',
    'node_modules/**',
    '*.test.ts',
    '*.test.js',
    'test-*.js',
    'vite.config.ts',
    'svelte.config.js',
    'postcss.config.js',
    'tailwind.config.js',
  ],
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
};