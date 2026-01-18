# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎯 Project Overview

**AdorableCSS v2** - TailwindCSS의 가독성을 개선한 CSS 유틸리티 프레임워크

### Core Philosophy
- **Improved Readability**: Tailwind보다 읽기 쉬운 문법
- **CSS Native Values**: CSS 표준 값 그대로 사용 (e.g., `scale(1.05)`, `opacity(0.5)`)
- **Dot Notation**: `.5` for opacity instead of `/50`
- **Design Rules**:
  - ❌ No margin (use padding and gap)
  - ❌ No slash opacity (use dot notation)
  - ✅ CSS standard values

### Common Syntax
- **Wrong**: `bg(white/50)` → **Correct**: `bg(white.5)`
- **Wrong**: `scale(105)` → **Correct**: `scale(1.05)`
- **Wrong**: Using `margin` → **Correct**: Use `gap` and `padding`

## 📦 Monorepo Structure

```
packages/
├── adorable-css/          # Core CSS framework
├── adorable-css-cdn/      # CDN build
└── homepage-kit/          # Documentation site (SvelteKit)
```

## 🛠 Development Commands

### Package Manager
Uses **pnpm >= 10.0.0**

### Core Package (adorable-css)
```bash
pnpm --filter adorable-css dev          # Watch mode
pnpm --filter adorable-css build        # Build
pnpm --filter adorable-css test         # Run tests
pnpm --filter adorable-css typecheck    # Type check
```

### Homepage
```bash
pnpm --filter homepage-kit dev          # Dev server
pnpm --filter homepage-kit build        # Build
pnpm --filter homepage-kit deploy:gh-pages  # Deploy
```

### Root-level
```bash
pnpm dev             # Run all packages in dev mode
pnpm build           # Build all packages
pnpm test            # Run all tests
pnpm check           # TypeScript check all
pnpm lint            # ESLint with auto-fix
```

## 🏗 Architecture

### adorable-css Package Structure

```
src/
├── 01-core/              # Parser and generator
│   ├── parser/           # CSS class parser
│   ├── generators/       # CSS generator
│   ├── values/           # Value parsing
│   └── runtime/          # Auto-injection
│
├── 02-design_tokens/     # Design tokens
│   ├── design-system/    # Built-in tokens
│   └── scales.ts         # Dynamic calc() system
│
├── 03-rules/             # CSS rule handlers
│   ├── layout/           # Layout (hbox, vbox, gap, etc.)
│   ├── style/            # Colors, borders
│   ├── text/             # Typography
│   └── interaction/      # States & animation
│
└── 04-components/        # Pre-built components
```

### Key Concepts

#### Parser → Generator Pipeline
```typescript
parseAdorableCSS(input)  // → Parsed tokens
  ↓
generateCSS(tokens)       // → CSS output
```

#### Rule System
Rules organized by function (not alphabetical):
1. Layout (hbox, vbox, gap)
2. Style (bg, c, border)
3. Text (font, text-align)
4. Effects (shadow, blur)
5. Interaction (hover, focus)

Example locations:
- `hbox()` → `src/03-rules/layout/display.ts`
- `bg()` → `src/02-design_tokens/design-system/colors/colors.ts`
- `font()` → `src/03-rules/text/font.ts`

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run specific test
pnpm --filter adorable-css test src/__tests__/rules/layout/display.test.ts

# Watch mode
pnpm --filter adorable-css test:ui
```

## 📝 Documentation

Documentation lives in `/docs` folder:
- PARA method organization (Projects/Areas/Resources/Archive)
- MDX files in `/docs/5-public/mdx/`
- Configuration in `/docs/config/docs-config.ts`

## 💡 Development Notes

### When Adding New Rules

1. Create rule handler in `03-rules/[category]/`
2. Export from category index
3. Add to `RULE_GROUPS` in `rule-definitions.ts`
4. Write tests in `__tests__/rules/[category]/`

### CSS Layer System

4 CSS layers (in order):
1. `base` - Reset and base styles
2. `components` - Component-level styles
3. `composition` - Layout composition
4. `utilities` - Utility classes (highest priority)

## 🔧 Build Configuration

- **Build tool**: tsup (esbuild-based)
- **Output formats**: CommonJS + ESM
- **Path alias**: `@/*` maps to `./src/*`
