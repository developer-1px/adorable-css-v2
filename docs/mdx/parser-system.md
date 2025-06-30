---
title: Deep Dive - Building a CSS Parser from Scratch
description: Explore the internals of AdorableCSS's parser system and how we built a parser that understands complex CSS utility expressions
order: 51
category: Technical Deep Dive
---

# Deep Dive: Building a CSS Parser from Scratch

This article explores the internals of AdorableCSS's parser system—how we built a parser that understands complex CSS utility expressions while maintaining excellent performance.

## The Challenge

Traditional utility CSS frameworks use simple class names like `w-64` or `bg-blue-500`. But AdorableCSS needed something more powerful:

```css
/* We wanted to support */
layer(top:20+left:30)
font(Inter/16/1.5/medium)
hover:md:scale(1.1)
bg(45deg/blue-500,purple-500)
```

This required building a custom parser that could handle:
- Function-like syntax with arguments
- Multiple prefixes (pseudo-classes, media queries)
- Complex value expressions
- Nested parentheses and special characters

## Parser Architecture

### Phase 1: Tokenization

The tokenizer breaks input into meaningful tokens:

```typescript
function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let current = 0;
  
  while (current < input.length) {
    const char = input[current];
    
    // Handle prefixes (hover:, md:, etc.)
    if (char === ':' && isPrefix(input, current)) {
      const prefix = extractPrefix(input, current);
      tokens.push({ type: 'PREFIX', value: prefix });
      current += prefix.length + 1;
      continue;
    }
    
    // Handle parentheses
    if (char === '(') {
      tokens.push({ type: 'LPAREN', value: '(' });
      current++;
      continue;
    }
    
    if (char === ')') {
      tokens.push({ type: 'RPAREN', value: ')' });
      current++;
      continue;
    }
    
    // Handle operators
    if ('+-*/,'.includes(char)) {
      tokens.push({ type: 'OPERATOR', value: char });
      current++;
      continue;
    }
    
    // Handle identifiers and values
    const match = extractIdentifier(input, current);
    if (match) {
      tokens.push({ type: 'IDENTIFIER', value: match });
      current += match.length;
      continue;
    }
    
    current++;
  }
  
  return tokens;
}
```

### Phase 2: AST Generation

The parser converts tokens into an Abstract Syntax Tree:

```typescript
interface ASTNode {
  type: 'UTILITY';
  prefixes: string[];
  property: string;
  args: ArgumentNode[];
  important: boolean;
}

interface ArgumentNode {
  type: 'VALUE' | 'EXPRESSION';
  value: string | ExpressionNode;
}

function parse(tokens: Token[]): ASTNode {
  const prefixes: string[] = [];
  let current = 0;
  
  // Extract prefixes
  while (tokens[current]?.type === 'PREFIX') {
    prefixes.push(tokens[current].value);
    current++;
  }
  
  // Extract property name
  const property = tokens[current].value;
  current++;
  
  // Parse arguments if present
  const args: ArgumentNode[] = [];
  if (tokens[current]?.type === 'LPAREN') {
    current++; // Skip opening paren
    args.push(...parseArguments(tokens, current));
  }
  
  // Check for important flag
  const important = tokens[tokens.length - 1]?.value === '!';
  
  return {
    type: 'UTILITY',
    prefixes,
    property,
    args,
    important
  };
}
```

### Phase 3: Expression Parsing

Complex expressions require recursive parsing:

```typescript
function parseExpression(tokens: Token[], start: number): ExpressionNode {
  const node: ExpressionNode = {
    type: 'EXPRESSION',
    operator: null,
    left: null,
    right: null
  };
  
  // Handle compound expressions like "top:20+left:30"
  let current = start;
  const parts: any[] = [];
  
  while (current < tokens.length && tokens[current].type !== 'RPAREN') {
    if (tokens[current].type === 'IDENTIFIER') {
      const identifier = tokens[current].value;
      
      // Check for key:value pattern
      if (tokens[current + 1]?.value === ':') {
        const key = identifier;
        const value = tokens[current + 2].value;
        parts.push({ key, value });
        current += 3;
        
        // Check for operators
        if (tokens[current]?.value === '+') {
          current++; // Skip operator
        }
      } else {
        parts.push({ value: identifier });
        current++;
      }
    } else {
      current++;
    }
  }
  
  return { type: 'EXPRESSION', parts };
}
```

## Handling Special Cases

### 1. Nested Parentheses

For expressions like `shadow(0/4/8/rgba(0,0,0,0.1))`:

```typescript
function parseNestedParens(tokens: Token[], start: number): string {
  let depth = 1;
  let current = start;
  const result: string[] = [];
  
  while (current < tokens.length && depth > 0) {
    const token = tokens[current];
    
    if (token.type === 'LPAREN') depth++;
    if (token.type === 'RPAREN') depth--;
    
    if (depth > 0) {
      result.push(token.value);
    }
    
    current++;
  }
  
  return result.join('');
}
```

### 2. Range Values

For constraint-based sizing like `w(300..500)`:

```typescript
function parseRange(value: string): RangeValue {
  const match = value.match(/^(\d*)\.\.(\\d*)$/);
  if (!match) return null;
  
  const [, min, max] = match;
  return {
    type: 'RANGE',
    min: min || null,
    max: max || null
  };
}
```

### 3. Color Values with Alpha

For colors like `white.5` or `#ccc.8`:

```typescript
function parseColorWithAlpha(value: string): ColorValue {
  const match = value.match(/^(.+)\.(\d+(?:\.\d+)?)$/);
  if (!match) return null;
  
  const [, color, alpha] = match;
  return {
    type: 'COLOR_ALPHA',
    color,
    alpha: parseFloat(alpha)
  };
}
```

## Performance Optimizations

### 1. Memoization

Cache parsed results for repeated utilities:

```typescript
const parseCache = new Map<string, ASTNode>();

function parseCached(input: string): ASTNode {
  if (parseCache.has(input)) {
    return parseCache.get(input);
  }
  
  const tokens = tokenize(input);
  const ast = parse(tokens);
  parseCache.set(input, ast);
  
  return ast;
}
```

### 2. Fast Path Detection

Skip complex parsing for simple utilities:

```typescript
function fastPath(input: string): CSSRule | null {
  // Direct property mapping
  const directMap = {
    'hidden': { display: 'none' },
    'block': { display: 'block' },
    'flex': { flex: '1' },
    'absolute': { position: 'absolute' }
  };
  
  if (directMap[input]) {
    return directMap[input];
  }
  
  // Simple value utilities
  const simpleMatch = input.match(/^([a-z]+)\(([^)]+)\)$/);
  if (simpleMatch && !simpleMatch[2].includes(',')) {
    return quickGenerate(simpleMatch[1], simpleMatch[2]);
  }
  
  return null;
}
```

### 3. Streaming Parser

For large files, use a streaming approach:

```typescript
class StreamingParser {
  private buffer: string = '';
  private inClass: boolean = false;
  
  write(chunk: string): string[] {
    this.buffer += chunk;
    const utilities: string[] = [];
    
    let match;
    const classRegex = /class="([^"]*)"/g;
    
    while ((match = classRegex.exec(this.buffer)) !== null) {
      const classes = match[1].split(/\s+/);
      utilities.push(...classes);
      
      // Clear processed portion
      this.buffer = this.buffer.slice(match.index + match[0].length);
      classRegex.lastIndex = 0;
    }
    
    return utilities;
  }
}
```

## Error Handling

### 1. Graceful Degradation

Invalid syntax falls back to safe defaults:

```typescript
function safeParse(input: string): ASTNode | null {
  try {
    return parse(tokenize(input));
  } catch (error) {
    console.warn(`Failed to parse: ${input}`, error);
    
    // Try to extract something useful
    const fallbackMatch = input.match(/^(\w+)/);
    if (fallbackMatch) {
      return {
        type: 'UTILITY',
        prefixes: [],
        property: fallbackMatch[1],
        args: [],
        important: false
      };
    }
    
    return null;
  }
}
```

### 2. Developer-Friendly Errors

Provide helpful error messages:

```typescript
class ParseError extends Error {
  constructor(
    message: string,
    public input: string,
    public position: number
  ) {
    super(message);
    this.name = 'ParseError';
  }
  
  toString(): string {
    const pointer = ' '.repeat(this.position) + '^';
    return `
${this.message}
  ${this.input}
  ${pointer}
    `.trim();
  }
}

// Usage
throw new ParseError(
  'Unexpected token ")"',
  'w(300))',
  6
);
// Output:
// Unexpected token ")"
//   w(300))
//        ^
```

## Real-World Examples

### Complex Layout Utility

```typescript
// Input: layer(top:20+left:30+z:10)
const ast = parse(tokenize('layer(top:20+left:30+z:10)'));

// AST:
{
  type: 'UTILITY',
  property: 'layer',
  args: [{
    type: 'EXPRESSION',
    parts: [
      { key: 'top', value: '20' },
      { key: 'left', value: '30' },
      { key: 'z', value: '10' }
    ]
  }]
}

// Generated CSS:
{
  position: 'absolute',
  top: '20px',
  left: '30px',
  'z-index': '10'
}
```

### Responsive Gradient

```typescript
// Input: md:bg(135deg/purple-500,pink-500)
const ast = parse(tokenize('md:bg(135deg/purple-500,pink-500)'));

// AST:
{
  type: 'UTILITY',
  prefixes: ['md'],
  property: 'bg',
  args: [
    { type: 'VALUE', value: '135deg' },
    { type: 'VALUE', value: 'purple-500' },
    { type: 'VALUE', value: 'pink-500' }
  ]
}

// Generated CSS:
@media (min-width: 768px) {
  .md\:bg\(135deg\/purple-500\,pink-500\) {
    background: linear-gradient(135deg, #8b5cf6, #ec4899);
  }
}
```

## Testing Strategy

### 1. Unit Tests

Test each parser phase independently:

```typescript
describe('Tokenizer', () => {
  it('tokenizes simple utilities', () => {
    expect(tokenize('w(300)')).toEqual([
      { type: 'IDENTIFIER', value: 'w' },
      { type: 'LPAREN', value: '(' },
      { type: 'IDENTIFIER', value: '300' },
      { type: 'RPAREN', value: ')' }
    ]);
  });
  
  it('handles prefixes', () => {
    expect(tokenize('hover:bg(blue)')).toEqual([
      { type: 'PREFIX', value: 'hover' },
      { type: 'IDENTIFIER', value: 'bg' },
      { type: 'LPAREN', value: '(' },
      { type: 'IDENTIFIER', value: 'blue' },
      { type: 'RPAREN', value: ')' }
    ]);
  });
});
```

### 2. Property-Based Testing

Use property-based testing for robustness:

```typescript
import fc from 'fast-check';

describe('Parser robustness', () => {
  it('never crashes on random input', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        expect(() => safeParse(input)).not.toThrow();
      })
    );
  });
  
  it('round-trips valid utilities', () => {
    fc.assert(
      fc.property(validUtilityArbitrary(), (utility) => {
        const ast = parse(tokenize(utility));
        const regenerated = serialize(ast);
        expect(regenerated).toBe(utility);
      })
    );
  });
});
```

## Conclusion

Building a parser from scratch was crucial for AdorableCSS's success. It allowed us to:

1. **Create intuitive syntax** that matches how designers think
2. **Handle complex expressions** that would be impossible with regex alone
3. **Provide excellent error messages** for developer experience
4. **Optimize performance** through caching and fast paths

The key lesson: **Don't be afraid to build custom parsers when existing solutions don't fit your needs**. The initial investment pays off through better user experience and more possibilities.

<Warning>
Parser development is iterative. Start simple, add features gradually, and always prioritize error handling and performance.
</Warning>

---

*Interested in parser development? Check out our [parser source code](https://github.com/adorable-css/parser) or read about [building your own parser](https://craftinginterpreters.com/).*