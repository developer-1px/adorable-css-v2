# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎯 Product Strategy & Vision

**Core Concept**: "Figma-first + Built-in Design System CSS Framework"

### Key Philosophy
- **CSS Native Values**: scale(1.05), opacity(0.5) - CSS 사양을 그대로 따름
- **Figma Auto Layout Mapping**: hbox(), vbox(), w(fill), w(hug) 등 직관적 매핑
- **Integration-First**: CSS Framework 한계를 인정하고 기존 생태계와 시너지 창출

### Development Priorities
1. **Priority 1 (3개월)**: 상태 스타일링, Form 시스템, 의미론적 컴포넌트
2. **Priority 2 (3개월)**: CSS-only 인터랙션, 고급 애니메이션, 타이포그래피
3. **Priority 3 (3개월)**: 접근성, Print, 최신 CSS 기능

### 📚 Documentation Structure
- **[docs/INDEX.md](./docs/INDEX.md)** - 전체 문서 구조 가이드
- **[docs/PRODUCT_STRATEGY.md](./docs/PRODUCT_STRATEGY.md)** - 메인 전략 문서  
- **[docs/REFERENCE.md](/docs/reference)** - API 레퍼런스
- **[docs/development/ADORABLE_CSS_MISTAKES.md](./docs/development/ADORABLE_CSS_MISTAKES.md)** - 개발 시 주의사항

## Architecture Overview

### Technology Stack & Requirements
- **Node.js**: v18+ required
- **Package Manager**: pnpm v10.8.0+ (strict - only pnpm allowed)
- **TypeScript**: v5.8.3
- **Framework**: SvelteKit 5 (for documentation)
- **Testing**: Vitest
- **Build Tools**: tsup (library), Vite (development)
- **Published Package**: `adorable-css` on npm

### Monorepo Structure
This is a **pnpm workspace** monorepo with three main packages:

- **`packages/adorable-css`** - Core CSS framework (published as `adorable-css`)
  - Parser system with custom tokenizer and AST
  - Rule system with priority-based registration
  - Design token system with auto-injection
  - Extension/plugin architecture
  
- **`packages/adorable-css-cdn`** - Browser-ready CDN distribution
  - Depends on core package
  - Provides UMD builds for direct browser usage
  
- **`packages/homepage-kit`** - Documentation site (private)
  - Built with SvelteKit 5
  - MDX support for documentation
  - Interactive playground and demos

### Core Library Architecture
```
packages/adorable-css/src/
├── core/           # Core parsing and runtime
│   ├── parser/     # Tokenizer and CSS generation
│   ├── runtime/    # Auto-injection system
│   └── values/     # Value transformation utilities
├── rules/          # CSS rule definitions
│   ├── layout/     # Display, grid, flexbox, spacing
│   ├── style/      # Colors, typography, borders
│   ├── position/   # Positioning and layer system
│   ├── interaction/# Cursor, transitions, animations
│   └── effects/    # Transforms, filters, backdrop
├── design-system/  # Design tokens and themes
│   ├── colors/     # OKLCH-based color system
│   ├── tokens/     # Spacing, typography, shadows
│   └── keyframes/  # Animation definitions
├── extensions/     # Plugin system
│   ├── animations/ # Animation utilities
│   └── responsive/ # Responsive utilities
└── components/     # Pre-built patterns
    ├── primitives/ # Button, card, heading
    ├── patterns/   # Container, prose, section
    └── features/   # Glass, glow, interactive
```

## Common Development Commands

### Development
```bash
# Start all packages in parallel
pnpm dev

# Development for specific packages
pnpm dev:core        # Core library only
pnpm dev:homepage    # Documentation site only

# Testing (IMPORTANT: avoid 'pnpm dev' for testing due to hang issues)
pnpm test            # Run all tests
pnpm test:core       # Core library tests only
pnpm test:watch      # Watch mode
pnpm test:ui         # Vitest UI

# Building
pnpm build           # Build all packages
pnpm build:homepage  # Build documentation site only

# Type checking
pnpm check           # Check all packages

# Linting
pnpm lint            # Lint all packages
pnpm lint:fix        # Auto-fix lint issues

# Deployment
pnpm deploy          # Build and deploy docs to GitHub Pages
pnpm deploy:quick    # Deploy without rebuild
```

### Testing a Single File
```bash
# Run specific test file
pnpm --filter adorable-css test src/__tests__/parser/parser.test.ts

# Run tests matching pattern
pnpm --filter adorable-css test -t "parser"

# Debug with Vitest UI
pnpm --filter adorable-css test:ui
```

### Package Management
```bash
# Clean build artifacts
pnpm clean

# Release workflow
pnpm changeset       # Create changeset
pnpm version-packages # Version packages
pnpm publish-packages # Publish to npm
```

## Parser System Architecture

The parser follows a multi-stage architecture:

1. **Input Processing** → Tokenization → AST Generation
2. **Rule Matching** → Priority Resolution → CSS Generation
3. **Value Transformation** → Token Injection → Output

Key concepts:
- **Priority System**: Rules have priorities (0-10) for specificity control
- **Token System**: Design tokens are auto-injected during parsing
- **Cache Layer**: LRU cache for performance optimization
- **Extension Points**: Plugins can hook into parser stages

## Important Development Notes

- **TailwindCSS Memory**: 이 프로젝트는 AdorableCSS v2입니다. TailwindCSS와 혼동하지 마세요.
- **Progressive Development**: 한번에 모든 것을 만들려고 하지 말고, 점진적으로 동작하는 것을 보여주면서 개발하세요.
- **Component-First**: 홈페이지의 모든 페이지는 adorable-css 컴포넌트만으로 구성됩니다.
- **Code Simplicity**: 코드를 간결하고 simple하게 유지하며, 코드량을 줄이는 방향으로 작업하세요.
- **Design Consistency**: 디자인은 정의된 컴포넌트와 타이포그래피 시스템만 사용하세요.
- **Performance Testing**: `pnpm dev`는 hang 이슈가 있으므로 테스트 시 `pnpm build` 또는 `pnpm test` 사용하세요.
- **Documentation Language**: 문서는 한글로 작성합니다.

## Extension System

To add new CSS rules or features:

1. **Add Rule**: Create in `src/rules/[category]/[name].ts`
2. **Register Rule**: Import in `src/rules/index.ts`
3. **Add Tests**: Create `src/__tests__/rules/[category]/[name].test.ts`
4. **Update Types**: Ensure TypeScript definitions are updated

Example rule structure:
```typescript
export const myRule: Rule = {
  name: 'my-rule',
  match: /^my-rule\((.*)\)$/,
  priority: 5,
  generate: (value: string) => ({
    'css-property': value
  })
}
```

## Design Token System

Tokens are defined in `src/design-system/tokens/`:
- **Spacing**: xs, sm, md, lg, xl, 2xl, 3xl
- **Colors**: OKLCH-based with automatic shade generation
- **Typography**: Role-based system (display, heading, title, body, label, caption)
- **Shadows**: Elevation-based (sm, md, lg, xl)
- **Radii**: Corner radius tokens

## Debugging Tips

1. **Parser Issues**: Enable debug mode with `DEBUG=adorable:*`
2. **Performance**: Check cache hit rates in console
3. **Rule Conflicts**: Use priority system to resolve
4. **Token Resolution**: Verify in `design-system/tokens/`

## Integration Points

- **React/Next.js**: Direct import `import 'adorable-css'`
- **CDN Usage**: `https://unpkg.com/adorable-css/dist/adorable.css`
- **Build Tools**: Compatible with Vite, Webpack, Parcel
- **PostCSS**: Can be used as PostCSS plugin

## Common AdorableCSS Syntax Mistakes

Based on [docs/development/ADORABLE_CSS_MISTAKES.md](./docs/development/ADORABLE_CSS_MISTAKES.md):

### Layout & Spacing
- ❌ **Never use margin**: `mb(20)`, `mt(10)` → ✅ Use gap-based layout: `gap(20)`
- ❌ **Implicit flexbox alignment**: `hbox` → ✅ Always specify: `hbox(middle)`, `vbox(center)`
- ❌ **Wrong order syntax**: `hbox(middle/center)` → ✅ Use `+` for combination: `hbox(middle+center)`

### Styling
- ❌ **Wrong gradient syntax**: `bg(gradient-to-br/color1/color2)` → ✅ Use: `bg(135deg/color1..color2)`
- ❌ **Long border names**: `border-l()`, `border-top()` → ✅ Use: `bl()`, `bt()`, `br()`, `bb()`
- ❌ **Wrong overflow**: `overflow(hidden)` → ✅ Use: `clip`
- ❌ **Wrong scroll**: `overflow(x-auto)` → ✅ Use: `scroll(x/auto)`

### Testing Guidelines
- **Framework**: Vitest with jsdom environment
- **Test Pattern**: `src/**/*.{test,spec}.{js,ts}`
- **Coverage**: 60+ test files covering parser, rules, components
- **Before Commits**: Always run `pnpm test`
- **Debugging**: Use `pnpm test:ui` for visual debugging

## Code Quality Tools

### Prettier Configuration
- Tabs for indentation
- Single quotes
- No trailing commas
- 100 character line width

### ESLint
- Configured for TypeScript and Svelte
- Run `pnpm lint` before commits
- Auto-fix with `pnpm lint:fix`

## Contribution Workflow

1. Create feature branch from `main`
2. Add tests for new functionality
3. Run `pnpm test` to ensure all tests pass
4. Run `pnpm lint` to check code style
5. Update documentation if needed
6. Create changeset with `pnpm changeset`
7. Submit PR with clear description

## Deployment Notes

- **Automatic**: GitHub Pages deploys on push to `main` branch
- **Manual**: Use `pnpm deploy` for full build and deploy
- **Quick Deploy**: Use `pnpm deploy:quick` to deploy without rebuild
- **Important**: Never commit `dist/` or `build/` directories