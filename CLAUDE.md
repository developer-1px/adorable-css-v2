# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🔧 Development Commands

### Build & Development
```bash
# Development (avoid pnpm dev - may hang)
pnpm build          # Build all packages
pnpm build:homepage # Build homepage only
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
pnpm dev            # Development server
pnpm build          # Build for production
pnpm preview        # Preview build
pnpm check          # Svelte type checking
```

## 🏗️ Architecture Overview

### Monorepo Structure
- **packages/adorable-css**: Core CSS framework library
- **packages/homepage-kit**: SvelteKit documentation/showcase site
- **packages/adorable-css-cdn**: CDN distribution package
- **docs/**: Comprehensive documentation and guides

### Core Package Architecture (packages/adorable-css)

**01-core/**: Foundation layer
- `parser/`: CSS class parsing and AST generation
- `generators/`: CSS generation and compilation
- `runtime/`: Auto-injection and dynamic style management
- `values/`: Value processing (colors, positioning, etc.)

**02-design_tokens/**: Token system
- `design-system/`: Color palette, semantic colors, tokens
- `tokenRegistry.ts`: Token usage tracking
- `scaleFormulas.ts`: Mathematical scaling functions

**03-rules/**: CSS rule definitions
- `layout/`: Flexbox, grid, spacing, sizing rules
- `text/`: Typography, font, text styling
- `style/`: Background, border, shadow, effects
- `interaction/`: Hover, focus, transitions
- `effects/`: Transforms, animations, elevation

**04-components/**: Component system
- `primitives/`: Basic UI components (button, card, etc.)
- `patterns/`: Layout patterns (container, hero, etc.)
- `defineComponent.ts`: Component definition utilities

**05-plugins/**: Extension system
- `animations/`: Animation keyframes and utilities
- `glassmorphism/`: Glassmorphism effects

### Key Design Principles
- **Figma-First**: Direct mapping of Figma concepts to CSS
- **CSS Native**: Use standard CSS syntax (scale(1.05), opacity(0.5))
- **No Margin Rule**: Use spacing tokens and layout components instead
- **Token-Based**: All values come from design tokens
- **Zero Runtime**: Build-time CSS generation

### File Organization Patterns
- Tests co-located with source in `__tests__/` directories
- Each module exports through `index.ts` files
- TypeScript definitions in separate `.d.ts` files
- Comprehensive test coverage with Vitest

## 🎯 Product Strategy & Vision

**Core Concept**: "Figma-first + Built-in Design System CSS Framework"

### Key Philosophy
- **CSS Native Values**: scale(1.05), opacity(0.5) - CSS 사양을 그대로 따름
- **Figma Auto Layout Mapping**: hbox(), vbox(), w(fill), w(hug) 등 직관적 매핑
- **Integration-First**: CSS Framework 한계를 인정하고 기존 생태계와 시너지 창출
- **Design Rules**: no margin, no font, no line-height, no color, just use components and semantic token
- **Memory**: margin을 쓰지 말라니까!
- **Memory**: no margin!

### Development Priorities
1. **Priority 1 (3개월)**: 상태 스타일링, Form 시스템, 의미론적 컴포넌트
2. **Priority 2 (3개월)**: CSS-only 인터랙션, 고급 애니메이션, 타이포그래피
3. **Priority 3 (3개월)**: 접근성, Print, 최신 CSS 기능

### 🚫 Common Mistakes
- **Memory**: `transform(scale-105)` 문법은 없음. CSS 표준 문법을 따라야 함