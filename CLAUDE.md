# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🔧 Development Commands

### Build & Development
```bash
# Development (avoid pnpm dev - may hang)
pnpm build          # Build all packages
pnpm build:homepage # Build homepage only
pnpm build:all      # Build recursively
pnpm dev:core       # Develop core package
pnpm dev:homepage   # Develop homepage only

# Testing
pnpm test           # Run all tests
pnpm test:core      # Test core package only
pnpm test:watch     # Watch mode for tests
pnpm test:ui        # Vitest UI runner
pnpm check          # TypeScript type checking
pnpm lint           # Lint and fix all files
pnpm lint:check     # Lint check only

# Single test file
cd packages/adorable-css && pnpm test path/to/test.test.ts

# Deployment
pnpm deploy         # Deploy homepage to GitHub Pages
pnpm deploy:quick   # Quick deploy (homepage-kit only)

# Maintenance
pnpm clean          # Clean dist and cache
pnpm knip           # Find unused exports
pnpm find-unused    # Compact unused report
pnpm depcheck       # Check dependencies
```

## 🏗️ Architecture Overview

### Core Flow: Class → CSS Generation
```
"hbox w(fill) p(20)" → Parser → AST → Rule2 Handler → CSS Properties → Layered CSS Output
```

1. **Parser** (JavaScript): Tokenizes and parses class syntax into AST nodes
2. **Rule2 System**: Performance-optimized handlers transform AST to CSS
3. **Value Processing**: Tokens resolved, units inferred, special keywords handled
4. **Layer System**: CSS organized into `@layer base,components,composition,utilities`

### Parser Architecture (Critical to Understand)
- **Location**: `packages/adorable-css/src/01-core/parser/parser.js` (JavaScript, not TypeScript!)
- **Token Types**: Functions `scale(1.05)`, Ranges `16..20..24`, Literals, Expressions
- **AST Structure**: `{ type, image, ...specificProps }`
- **Key Features**: 
  - Recursive descent parsing
  - Support for nested functions and complex expressions
  - CSS-compatible escape sequences
  - Importance levels (`!`, `!!`, `!!!`)

### Rule2 System (Performance Core)
```typescript
// All rules are functions: (args: any) => string
const rule2Registry = {
  utilities: new Map<string, Rule2Handler>(),
  composition: new Map<string, Rule2Handler>(),
  components: new Map<string, Rule2Handler>()
}
```
- **Registration**: Rules and components register handlers at initialization
- **Lazy Loading**: Avoids circular dependencies
- **Memoization**: Heavy use of `createMemo` for performance
- **Component Expansion**: Component classes expanded to utilities during generation

### Value Processing Pipeline
1. **Token Check**: Values checked against token maps (spacing, text, color, etc.)
2. **Token Resolution**: `$spacing-4` → `var(--spacing-4)`
3. **Unit Inference**: Numbers without units → `px` (except for special properties)
4. **Keyword Handling**: `fill` → `flex: 1`, `hug` → `fit-content`
5. **Scale Processing**: Mathematical scales with configurable formulas

### Component System
```typescript
// Components defined with configuration
defineComponent({
  selector: '.button',
  sizes: { sm: 'h(32) text(14)', md: 'h(40) text(16)' },
  variants: { primary: 'bg(primary) c(white)' },
  defaultSize: 'md'
})

// Registered as Rule2 handlers via convertToRule2Handler
// Component classes are expanded during CSS generation
```

### Token System Architecture
- **Static Tokens**: Defined in token maps (spacing, radius, shadow)
- **Dynamic Tokens**: Generated at runtime (color scales, mathematical sequences)
- **Token Tracking**: Only used tokens included in CSS output
- **OKLCH Colors**: Modern color system with semantic mappings
- **Usage**: All values should come from tokens (no arbitrary values)

## 🎯 Core Design Philosophy

### Figma-First Approach
- `hbox()` / `vbox()` → Flexbox containers
- `w(fill)` / `h(fill)` → Flex: 1
- `w(hug)` / `h(hug)` → fit-content
- `layer()` → position: absolute
- Direct mapping of Figma auto-layout concepts

### CSS Native Syntax
```
✅ scale(1.05)      // CSS standard
✅ opacity(0.5)     // CSS standard
✅ rotate(45deg)    // CSS standard
❌ scale-105        // Not CSS standard
❌ opacity-50       // Not CSS standard
```

### No Margin Rule
- **Never**: `m(20)`, `mt(10)`, `margin: 20px`
- **Always**: Use gap in containers, padding for internal spacing
- **Why**: Predictable component composition, better Figma alignment

### Component-First Development
- Start with semantic components (button, card, heading)
- Components handle responsive behavior internally
- Utilities for one-off adjustments only

## 🚀 Performance Considerations

### Build-Time Optimization
- All CSS generated at build time (except CDN dynamic mode)
- Heavy memoization throughout the system
- Rule2 handlers minimize string operations
- Clean duplicate removal in final output

### Bundle Size Optimization
- Token tracking prevents unused CSS variables
- Component expansion allows tree-shaking
- Layer system enables selective CSS loading
- Minimal runtime for CDN version only

## 🔍 Development Workflow

### Adding New Rules
1. Create handler in appropriate `04-rules/` subdirectory
2. Register in `rule2-registry.ts` under correct layer
3. Add tests in `__tests__/rules/`
4. Update type definitions if needed

### Creating Components
1. Define in `05-components/` using `defineComponent`
2. Ensure registration in `register-components.ts`
3. Test complete CSS output, not just class generation
4. Document in homepage showcase

### Working with Tokens
1. Add to appropriate token map in `02-design_tokens/`
2. Consider if dynamic generation is needed
3. Update TypeScript types
4. Test token resolution and CSS variable generation

## ⚠️ Common Gotchas

### Parser is JavaScript
The parser (`parser.js`) is in JavaScript while most code is TypeScript. This is for performance reasons but means:
- No TypeScript type checking in parser
- Be careful with parser modifications
- Parser utilities are in separate TypeScript file

### Component Registration Order
Components must be registered after Rule2 system initialization. The order matters:
1. Rule2 registry setup
2. Rule registration
3. Component registration
4. Component-to-Rule2 conversion

### Token Usage Tracking
- Can be disabled for performance: `disableTokenTracking`
- Affects CSS variable output
- Important for bundle size optimization

### State and Responsive Handling
- Prefixes parsed separately from main class
- Handled by decorator pattern
- Media queries and selectors generated appropriately

## 📝 Recent Major Changes

### Unified Value Processing
All value transformations centralized in `03-values/` module for consistency

### Rule2 Migration
Complete migration from old rule system to Rule2 for 3x performance improvement

### Component as Rules
Components now registered as Rule2 handlers, enabling better tree-shaking

### OKLCH Color System
Modern perceptually-uniform color system with full semantic mapping support

### Parser Optimization
Parser rewritten in JavaScript with careful performance optimization