# AdorableCSS Testing Guide

This document provides an overview of the comprehensive unit testing environment for the AdorableCSS parser system.

## Testing Framework

We use **Vitest** as our testing framework, which provides:
- Fast execution with native ES modules support
- TypeScript support out of the box
- Jest-compatible API
- Built-in mocking capabilities
- Coverage reporting

## Test Structure

### Test Files Overview

1. **`parser-utils.test.ts`** - Tests for tokenizer and parser combinators
2. **`parser.test.ts`** - Tests for the main AdorableCSS parser
3. **`generator.test.ts`** - Tests for CSS generation functionality
4. **`rules.test.ts`** - Tests for rule system integrity
5. **`integration.test.ts`** - End-to-end integration tests

### Coverage Areas

#### 1. Tokenizer Tests (`parser-utils.test.ts`)
- **Token Recognition**: Tests all token types (identifiers, dimensions, colors, operators)
- **Complex Patterns**: Multi-character operators, hex colors with alpha, ranges
- **Edge Cases**: Whitespace handling, special characters, escaped strings

#### 2. Parser Tests (`parser.test.ts`)
- **Basic Utilities**: Simple identifiers, multiple utilities, important modifiers
- **Function Calls**: Simple and complex function parsing, nested structures
- **Ranges**: Min-max, min-only, and max-only range syntax
- **Pseudo-classes**: Hover, focus, responsive prefixes, group states
- **Key-Value Pairs**: Single and multiple key-value parsing
- **Data Types**: Dimensions with units, hex colors, negative values, special values
- **Error Handling**: Invalid syntax, unclosed parentheses, unexpected tokens

#### 3. Generator Tests (`generator.test.ts`)
- **CSS Generation**: Simple and complex CSS output generation
- **Pseudo-classes**: Proper selector generation for interactive states
- **Error Handling**: Unknown utilities, parser errors, missing handlers
- **CSS Escaping**: Special character escaping in selectors
- **Edge Cases**: Null/undefined values, complex CSS objects

#### 4. Rules Tests (`rules.test.ts`)
- **Rule Existence**: Verification that all expected rules are defined
- **Function Arity**: Correct parameter counts for keyword vs function utilities
- **Rule Categories**: Layout, sizing, spacing, typography, visual utilities
- **Consistency**: No undefined rules, proper function types

#### 5. Integration Tests (`integration.test.ts`)
- **End-to-End**: Full parsing and generation pipeline
- **Real-world Examples**: Layout combinations, responsive patterns, interactive states
- **Performance**: Large utility lists, complex nested structures
- **Error Resilience**: Graceful handling of invalid input
- **Whitespace Handling**: Various whitespace patterns

## Running Tests

### Available Commands

```bash
# Run all tests once
pnpm test:run

# Run tests in watch mode
pnpm test:watch

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

### Test Configuration

Tests are configured via `vitest.config.ts`:
- **Environment**: Node.js
- **Globals**: Enabled for convenient test writing
- **Coverage**: V8 provider with comprehensive file inclusion/exclusion
- **File Patterns**: `src/**/*.test.ts` and `src/**/*.spec.ts`

## Test Categories

### ✅ Unit Tests
- Individual function and component testing
- Isolated functionality verification
- Mock-based testing for dependencies

### ✅ Integration Tests
- End-to-end parser to CSS generation
- Real-world usage scenarios
- Performance validation

### ✅ Error Handling Tests
- Invalid syntax handling
- Edge case management
- Graceful degradation

## Test Examples

### Basic Parser Test
```typescript
it('should parse simple function calls', () => {
  const result = parseAdorableCSS('w(300)')
  expect(result.value[0].selector.type).toBe('function')
  expect(result.value[0].selector.name).toBe('w')
  expect(result.value[0].selector.args).toHaveLength(1)
})
```

### Generator Test
```typescript
it('should generate CSS for hover pseudo-class', () => {
  const result = generateCSSFromAdorableCSS('hover:bg(blue)')
  expect(result).toBe('.hover\\:bg\\(blue\\):hover{background-color: blue}')
})
```

### Integration Test
```typescript
it('should handle layout combinations', () => {
  const layoutCode = 'hbox(center) gap(16) p(20)'
  expect(() => parseAdorableCSS(layoutCode)).not.toThrow()
  expect(() => generateCSSFromAdorableCSS(layoutCode)).not.toThrow()
  
  const parsed = parseAdorableCSS(layoutCode)
  expect(parsed.value).toHaveLength(3)
})
```

## Current Test Status

- **Total Test Files**: 5
- **Total Tests**: 116
- **Passing**: 116 (100%)
- **Coverage**: Comprehensive coverage of parser, generator, and rules

## Key Testing Achievements

1. **Comprehensive Token Coverage**: All token types tested including edge cases
2. **Parser Robustness**: Complex syntax patterns and error conditions covered
3. **Generator Reliability**: CSS output validation and escaping verification
4. **Integration Validation**: End-to-end functionality confirmation
5. **Performance Verification**: Large input handling and execution time validation

## Best Practices

1. **Test Structure**: Clear describe/it hierarchy with descriptive names
2. **Test Isolation**: Each test is independent and can run in any order
3. **Mock Usage**: Strategic mocking to isolate units under test
4. **Error Testing**: Both positive and negative test cases
5. **Real-world Examples**: Tests based on actual usage patterns

## Future Enhancements

- Visual regression testing for generated CSS
- Property-based testing for random input validation
- Benchmark testing for performance tracking
- Browser compatibility testing for generated CSS