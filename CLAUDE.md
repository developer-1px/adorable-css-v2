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
- **[docs/REFERENCE.md](./docs/REFERENCE.md)** - API 레퍼런스

## Architecture Overview

### Monorepo Structure
This is a **pnpm workspace** monorepo with three main packages:

- **`packages/adorable-css-core`** - Core CSS framework (published as `adorable-css`)
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
packages/adorable-css-core/src/
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

### Key Architectural Patterns

#### Priority-based CSS Generation
Rules are registered with priorities to ensure proper cascade order:
```typescript
enum RulePriority {
  COMPONENT = 100,    // Pre-built components (card, btn, heading)
  LAYOUT = 200,       // Layout utilities (hbox, vbox, grid)
  UTILITY = 300,      // General utilities (c, bg, p, m)
  STATE = 400,        // State modifiers (hover:, focus:, active:)
  RESPONSIVE = 500    // Responsive breakpoints (md:, lg:, xl:)
}
```

#### Plugin Architecture
- Rules can be regular CSS objects or string rules (AdorableCSS classes)
- Support for hybrid rules that return both CSS and class names
- Extensible system for custom rules, keyframes, and tokens

#### Smart Parsing
- Handles complex expressions like `layer(top:20+left:30)`
- Supports pseudo-class prefixes: `hover:scale(1.05)`, `focus:c(blue-500)`
- Responsive prefixes: `md:w(full)`, `lg:grid(3)`
- Gradient syntax: `bg(purple-500..pink-500/135deg)` or `bg(primary..accent/to-br)`

## Commands

### Critical Development Warning
⚠️ **DO NOT USE `pnpm dev`** - It can hang. Use specific dev commands instead:
- `pnpm dev:core` - Develop adorable-css-core only
- `pnpm dev:homepage` - Start homepage dev server at http://localhost:5173

### Build & Test
```bash
# Build all packages for production
pnpm build

# Build specific packages
pnpm build:all       # Build all packages recursively
pnpm build:homepage  # Build homepage only

# Testing
pnpm test           # Run all tests across monorepo
pnpm test:core      # Run tests for adorable-css-core only
pnpm test:watch     # Run tests in watch mode
pnpm test:ui        # Run tests with UI

# Type checking
pnpm check          # Run TypeScript type checking
```

### Testing Individual Features
```bash
# Run a specific test file
cd packages/adorable-css-core
pnpm vitest run src/parser/parser.test.ts

# Run tests in watch mode for development
pnpm vitest
```

### Homepage-Specific Commands
```bash
cd packages/homepage-kit
pnpm lint            # Run ESLint checks
pnpm format          # Format code with Prettier
pnpm check:watch     # Run svelte-check in watch mode
pnpm build:gh-pages  # Build for GitHub Pages deployment
```

### Release Management
```bash
pnpm changeset         # Create a new changeset for version bumps
pnpm version-packages  # Apply changesets to update package versions
pnpm publish-packages  # Publish packages to npm
pnpm release           # Build and publish all packages
```

### Utilities
```bash
pnpm clean           # Clean all build artifacts and caches
```

## Syntax Reference

### Color Specification (CRITICAL!)
- **AdorableCSS uses DOT notation for opacity**: `white.5`, `black.2`, `purple-500.8`
- **DO NOT use Tailwind's slash notation**: ❌ `white/50`, ❌ `black/20`, ❌ `gray-500/80`
- **Correct examples**: 
  - `c(white.5)` = 50% opacity white
  - `bg(black.1)` = 10% opacity black
  - `border(gray-200.5)` = 50% opacity gray border
- **Slash (`/`) is ONLY for gradients**: `bg(135deg/purple-500..pink-500)`
- **Gradient text**: Use `c(45deg/purple-500..pink-500)` directly (NOT `bg(clip-text)`)

### Typography System
- Font weight is handled by `bold()` utility: `bold` (default 700), `bold(600)`, `bold(semi)`
- DO NOT use numeric font weights directly like `600` or `700`
- Order should be: `font() bold() c()` - e.g., `font(xl) bold c(gray-900)`
- font() supports: `font(size)`, `font(size/line-height)`, `font(size/line-height/letter-spacing)`
- Letter-spacing supports percentages: `font(lg/1.5/-1%)` = `font-size: lg, line-height: 1.5, letter-spacing: -0.01em`
- **text() dual purpose**: 
  - Font size tokens: `text(xs)`, `text(sm)`, `text(lg)`, `text(2xl)` → `font-size: var(--font-*)`
  - Text alignment: `text(center)`, `text(left)`, `text(right)` → `text-align: *`
  - Can combine: `text(lg) text(center)` or use with font: `font(xl/1.5) text(center)`

### Layout Patterns
- **Figma Auto Layout**: `hbox()` (horizontal), `vbox()` (vertical)
- **Sizing**: `w(fill)`, `w(hug)`, `w(300)`, `w(300..600)` (min-max)
- **Smart Containers**: `64x64` creates a centered container with image optimization
- **Layer positioning**: `layer(center)`, `layer(top:20+left:30)`, `layer(fill/20)`

### Gradient Syntax
- Use `..` separator (NOT comma): `bg(purple-500..pink-500/135deg)`
- Direction support: `/135deg`, `/to-br`, `/to-right`

## Development Guidelines

### From User's Global CLAUDE.md
- 한번에 너무 많은걸 다 계획해서 하지말고 차근차근 되는거 하나씩 확인해가면서 개발
- 300라인이 넘어가면 리팩토링을 항상 고민
- 최대한 OCP와 plugable을 중심으로 코딩
- React 개발시 검증된 hook들을 많이 써서 추상화 벽이 잘 만들어지도록 작성

### Design Rules
- 디자인을 할때는 절대 margin을 쓰지마. mx(auto)만 허락함
- Figma에는 margin이 없어

### Testing Setup
- **Framework**: Vitest with jsdom environment
- **Test Files**: Co-located with source (`*.test.ts`) or in `__tests__/`
- **Coverage**: V8 provider with reports

### Build Tools
- **Library Build**: tsup with CJS/ESM outputs
- **Documentation Site**: Vite + SvelteKit 5
- **TypeScript**: v5.8.3 with ES2020 target
- **Package Manager**: pnpm@10.8.0 (locked version)

## Extension System
Create custom plugins by adding to `extensions/`:
```typescript
export const myExtension = {
  rules: {
    'my-utility': (value) => ({ /* CSS properties */ })
  },
  keyframes: {
    'my-animation': { /* keyframe definitions */ }
  }
}
```

## Important Memories
- **TailwindCSS Memory**: tailwindCSS와 제발 헷갈리지마 우리는 adorable-css-v2를 만들고 있어
- **Development Communication**: 항상 중간중간이라도 뭔가 보여줄 수 있는걸 먼저해줘
- **Page Design Commitment**: 지금부터 홈페이지의 모든 페이지 디자인은 adorable-css-v2 component만으로 만들거야.
- 언제나 내가 볼수 있는걸 먼저 세팅하고 조금씩 점진적으로 내가 볼 수 있도록 해줘 한번에 다 만들려고 하지 말고