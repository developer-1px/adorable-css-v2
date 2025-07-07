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
pnpm check          # TypeScript type checking
pnpm lint           # Lint and fix all files
pnpm lint:check     # Lint check only

# Deployment
pnpm deploy         # Deploy homepage to GitHub Pages
pnpm deploy:quick   # Quick deploy (homepage-kit only)

# Maintenance
pnpm clean          # Clean dist and cache
pnpm knip           # Find unused exports
pnpm find-unused    # Compact unused report
pnpm depcheck       # Check dependencies
```

### Individual Package Commands
```bash
# adorable-css package
cd packages/adorable-css
pnpm test           # Run core tests
pnpm test:watch     # Watch mode
pnpm test:ui        # UI test runner
pnpm typecheck      # Type checking

# homepage-kit package
cd packages/homepage-kit
pnpm dev            # Development server (Port 5173)
pnpm build          # Build for production
pnpm preview        # Preview build
pnpm check          # Svelte type checking
pnpm build:gh-pages # Build with .nojekyll for GitHub Pages

# adorable-css-cdn package
cd packages/adorable-css-cdn
pnpm build          # Build CDN distribution
pnpm test           # Run tests
pnpm typecheck      # Type checking
```

## 🏗️ Architecture Overview

### Monorepo Structure
```
adorable-css-v2/
├── packages/
│   ├── adorable-css/        # Core CSS framework library
│   ├── homepage-kit/        # SvelteKit documentation/showcase site
│   └── adorable-css-cdn/    # CDN distribution package
├── docs/                    # Comprehensive documentation (PARA method)
│   ├── 1-projects/         # Active projects with deadlines
│   ├── 2-areas/            # Ongoing responsibilities
│   ├── 3-resources/        # Reference materials
│   └── 4-archive/          # Completed/deprecated items
└── Configuration Files
    ├── pnpm-workspace.yaml  # Monorepo workspace config
    ├── eslint.config.js     # ESLint with TypeScript & Svelte
    └── tsconfig.json        # TypeScript project references
```

### Core Package Architecture (packages/adorable-css)

**01-core/**: Foundation layer
- `parser/`: CSS class parsing and AST generation
  - `parser.ts`: Main parser implementation
  - `parser-utils.ts`: Utility functions
  - `cssEscape.ts`: CSS escaping utilities
- `generators/`: CSS generation and compilation
  - `generator.ts`: Main CSS generator
  - `css-object-generator.ts`: Object to CSS conversion
  - `breakpoints.ts`: Responsive breakpoint handling
  - `animation-handler.ts`: Animation generation
- `ast-utils/`: AST transformation utilities (NEW)
  - `rule2-helpers.ts`: Rule2 system helpers
  - `value-transform.ts`: Value transformations
- `values/`: Value processing (colors, positioning, etc.)
  - `makeValue.ts`: Main value processor
  - `makeColor.ts`: Color value handling
  - `makeBorder.ts`: Border value handling
  - `makePosition.ts`: Position value handling
  - `scaleUtilities.ts`: Scale calculation utilities

**02-design_tokens/**: Token system
- `design-system/`: Color palette, semantic colors, tokens
  - `colors/`: Complete color system (base, semantic, advanced)
  - `tokens/`: Token definitions
  - `semantic-system.ts`: Semantic token mapping
- `tokenRegistry.ts`: Token usage tracking
- `scaleFormulas.ts`: Mathematical scaling functions
- `dynamicTokens.ts`: Runtime token generation

**03-rules/**: CSS rule definitions (legacy)
- `layout/`: Flexbox, grid, spacing, sizing rules
- `text/`: Typography, font, text styling
- `style/`: Background, border, shadow, effects
- `interaction/`: Hover, focus, transitions
- `effects/`: Transforms, animations, elevation
- `position/`: Position utilities
- `utilities/`: Misc utilities

**03-rules2/**: Optimized rule system (NEW)
- Performance-optimized rule handlers
- Direct AST processing without string conversion
- Reduced memory allocations
- Currently migrating from 03-rules

**04-components/**: Component system
- `primitives/`: Basic UI components
  - `button.ts`, `card.ts`, `badge.ts`, `input.ts`
  - `typography/`: Text components (heading, body, etc.)
- `patterns/`: Layout patterns
  - `container.ts`, `hero.ts`, `section.ts`
  - `prose.ts`: Article/content styling
- `defineComponent.ts`: Component definition utilities
- `features/`: Special effects (glass, glow, figma)

**05-plugins/**: Extension system
- `animations/`: Animation keyframes and utilities
- `glassmorphism/`: Glassmorphism effects
- `responsive/`: Responsive decorator system

### Build Configuration
- **TypeScript**: ES2020 target, ESM/CJS output
- **Bundler**: tsup (esbuild based)
- **Testing**: Vitest with UI support
- **Linting**: ESLint 9 with TypeScript & Svelte support
- **Package Manager**: pnpm 10.8.0 (required)

### Key Design Principles
- **Figma-First**: Direct mapping of Figma concepts to CSS
- **CSS Native**: Use standard CSS syntax (scale(1.05), opacity(0.5))
- **No Margin Rule**: Use spacing tokens and layout components instead
- **Token-Based**: All values come from design tokens
- **Zero Runtime**: Build-time CSS generation
- **Performance First**: Minimize string operations and allocations

### File Organization Patterns
- Tests co-located with source in `__tests__/` directories
- Each module exports through `index.ts` files
- TypeScript definitions in separate `.d.ts` files
- Comprehensive test coverage with Vitest
- Documentation follows PARA method in `/docs`

## 🎯 Product Strategy & Vision

**Core Concept**: "Figma-first + Built-in Design System CSS Framework"

### Key Philosophy
- **CSS Native Values**: scale(1.05), opacity(0.5) - CSS 사양을 그대로 따름
- **Figma Auto Layout Mapping**: hbox(), vbox(), w(fill), w(hug) 등 직관적 매핑
- **Integration-First**: CSS Framework 한계를 인정하고 기존 생태계와 시너지 창출
- **Design Rules**: no margin, no font, no line-height, no color, just use components and semantic token
- **Memory**: margin을 쓰지 말라니까!
- **Memory**: no margin!
- **Memory**: 그래 이렇게 극단적으로 줄여서 더 줄일게 없을때 까지 줄이란 말야 rule은 cdn에 올라가니까 그래야 돼.
- **Memory**: 극단적으로 줄이돼 가독성은 남긴다. no minify, keep simple!

### Development Priorities
1. **Priority 1 (3개월)**: 상태 스타일링, Form 시스템, 의미론적 컴포넌트
2. **Priority 2 (3개월)**: CSS-only 인터랙션, 고급 애니메이션, 타이포그래피
3. **Priority 3 (3개월)**: 접근성, Print, 최신 CSS 기능

### 🚫 Common Mistakes
- **Memory**: `transform(scale-105)` 문법은 없음. CSS 표준 문법을 따라야 함

## 🚀 Performance Optimization - Rule2 System

### Overview
The Rule2 system is a performance-optimized rule processing system that eliminates unnecessary conversions:
- Passes AST directly to rule handlers (no string conversion)
- Returns CSS strings directly (no object intermediate)
- Significantly reduces parsing overhead and memory allocations
- Currently being migrated from Rule1 system

### Migration Status
- New rules should be implemented in Rule2 format when possible
- Existing rules are being gradually migrated
- Both systems coexist during the transition

## 🧪 Testing Guidelines

### Test Structure
```typescript
// Standard test file pattern
describe('RuleName', () => {
  it('should handle basic case', () => {
    expect(generator('rule(value)')).toContain('expected-css')
  })
  
  it('should handle token values', () => {
    expect(generator('rule(token-name)')).toContain('token-value')
  })
})
```

### Running Tests
```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test packages/adorable-css/src/__tests__/rules/text/font.test.ts

# Watch mode
pnpm test:watch

# UI test runner
pnpm test:ui

# Coverage report
pnpm test --coverage
```

### Test Categories
- **Unit Tests**: Individual rule handlers
- **Integration Tests**: Full parsing → generation flow
- **Component Tests**: Component definitions
- **Token Tests**: Design token validation
- **Performance Tests**: Cache and optimization

## 📦 Common Code Patterns

### Rule Definition Pattern (Rule1)
```typescript
// Rule handler signature
type RuleHandler = (value: string) => Record<string, string>

// Example rule
export const padding: RuleHandler = (value) => {
  const resolved = makeValue(value, 'spacing')
  return { padding: resolved }
}
```

### Rule2 Definition Pattern
```typescript
// Rule2 handler signature
type Rule2Handler = (node: ASTNode) => string

// Example Rule2
export const paddingRule2: Rule2Handler = (node) => {
  const value = extractValue(node)
  const resolved = makeValue(value, 'spacing')
  return `padding: ${resolved};`
}
```

### Component Definition Pattern
```typescript
defineComponent('button', {
  base: 'hbox(pack) px(md) py(sm) r(md) text(label/normal) font(medium)',
  variants: {
    primary: 'bg(primary) c(white)',
    secondary: 'bg(gray-100) c(gray-900)'
  }
})
```

### Token Usage Pattern
```typescript
// Direct token usage
'p(lg)'        // → padding: 16px
'c(primary)'   // → color: #FF6B6B

// Dynamic token creation
'p(24)'        // → padding: 24px (numeric value)
'p(1.5rem)'    // → padding: 1.5rem (unit value)
```

## 🚨 Important Notes

### Performance Considerations
- Avoid `pnpm dev` in root - it may hang
- Use `pnpm build` or individual package dev commands
- Rule2 system provides significant performance improvements

### CSS Syntax Rules
- Always use CSS-native syntax: `scale(1.05)` not `scale-105`
- Use dot notation for opacity: `bg(white.5)` not `bg(white/50)`
- No margin utilities - use gap and spacing components
- Prefer semantic tokens over raw values

### New AI-Friendly Typography Syntax (v2.0)
**Important Change**: AdorableCSS v2 has unified text handling for AI clarity:

The `text()` function is now a universal handler for:
- Typography (font-size, line-height, letter-spacing)
- Text properties (alignment, transform, decoration, white-space)
- Combined properties using `+` operator

**Examples:**
```css
/* Typography */
text(16px)           → font-size: 16px
text(lg)             → font-size: var(--font-lg)
text(16px/1.5)       → font-size: 16px; line-height: 1.5
text(lg/1.2/-2%)     → font-size: var(--font-lg); line-height: 1.2; letter-spacing: -0.02em

/* Responsive Typography with Clamp */
text(sm..6xl)        → font-size: clamp(var(--font-sm), 4vw, var(--font-6xl))
text(lg..32px)       → font-size: clamp(var(--font-lg), 4vw, 32px)
text(16px..4vw..48px) → font-size: clamp(16px, 4vw, 48px)

/* Text Properties */
text(center)         → text-align: center
text(uppercase)      → text-transform: uppercase
text(nowrap)         → white-space: nowrap
text(underline)      → text-decoration: underline

/* Combined Properties */
text(nowrap+center)  → white-space: nowrap; text-align: center
text(uppercase+underline) → text-transform: uppercase; text-decoration: underline

/* Mixed Usage */
text(lg/1.5/center)  → font-size: var(--font-lg); line-height: 1.5; text-align: center
text(16px/1.4/nowrap+right) → font-size: 16px; line-height: 1.4; white-space: nowrap; text-align: right
text(sm..2xl/1.5/tight) → font-size: clamp(var(--font-sm), 4vw, var(--font-2xl)); line-height: 1.5; letter-spacing: -0.025em

/* Font Weight (separate) */
font(600)            → font-weight: 600
font(bold)           → font-weight: 700
font(semibold)       → font-weight: 600
```

**Why this change?**
- AI systems can now use one intuitive function for all text needs
- `text()` handles everything text-related (size, spacing, alignment, etc.)
- `font()` is dedicated to font-weight only, reducing confusion
- The `+` operator allows combining multiple properties naturally
- Better alignment with how AI thinks about text styling

### Git Workflow
- Main branch is `main`
- Check git status regularly during development
- Follow conventional commit messages

### Documentation Updates
- Update docs in Korean (한글) as requested
- Follow PARA method for documentation organization
- Keep CLAUDE.md updated with new patterns

## 🔍 Debugging Tips

### Common Issues
1. **Token not found**: Check token registry and design system
2. **Rule not working**: Verify rule is exported in index.ts
3. **Test failing**: Check for token registration in tests
4. **Build errors**: Run `pnpm clean` and rebuild

### Debug Commands
```bash
# Check for unused exports
pnpm knip

# Find unused dependencies
pnpm depcheck

# Type checking
pnpm check

# Lint issues
pnpm lint:check
```

## 🎨 Design System Integration

### Color System
- OKLCH-based color system for perceptual uniformity
- Semantic colors mapped to design tokens
- Alpha support with dot notation: `bg(white.5)`

### Spacing System
- Base unit system with scale formulas
- Consistent spacing tokens (xs, sm, md, lg, xl, etc.)
- No margin - use gap-based layouts

### Typography System
- Font family tokens with fallbacks
- Size and line-height scales
- Weight variations (thin to black)

### Responsive System
- Breakpoint tokens (sm, md, lg, xl, 2xl)
- Responsive decorator syntax: `md:p(lg)`
- Mobile-first approach