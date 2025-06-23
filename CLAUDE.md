# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm dev` - Start development server at http://localhost:5173
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm check` - Run type checking with svelte-check and TypeScript

### Package Management
This project uses **pnpm** as the package manager. Always use `pnpm` instead of npm or yarn.

## Architecture Overview

### Project Structure
AdorableCSS v2 is a Figma-first CSS utility framework built with:
- **Svelte 5** + **TypeScript** + **Vite**
- Custom CSS parser and code generator
- Figma plugin for bidirectional design-code sync
- UnoCSS integration for cross-framework compatibility

### Core Concepts

#### 1. Figma-First Design Philosophy
Unlike traditional CSS frameworks, AdorableCSS v2 is designed to match Figma's mental model:
- Direct mapping with Figma Auto Layout (`hbox`, `vbox`, `gap`)
- Figma-style sizing (`w(hug)`, `w(fill)`, `w(200..400)`)
- Layer-based positioning matching Figma constraints

#### 2. Parser System (`/src/myparser/`)
The framework uses a custom parser to process AdorableCSS syntax:
- `parser.ts` - Tokenizes and parses utility classes
- `generator.ts` - Converts parsed AST to CSS
- Supports prefixes for responsive design and pseudo-classes

#### 3. Rule System (`/src/rules/`)
CSS rules are organized by category:
- **Layout**: `hbox/vbox` (flexbox), `gap`, sizing with constraints
- **Typography**: Combined `font()` utility, weights, styles
- **Position**: `layer()` utility for complex positioning
- **Display**: All display types plus screen reader utilities
- **Core**: Colors, backgrounds, borders, transforms, filters

Key patterns:
- Simple utilities: `absolute`, `hidden`
- Value utilities: `w(300)`, `p(16)`
- Complex utilities: `font(Inter/16/1.5)`, `layer(top:20+left:30)`

#### 4. Figma Plugin (`/src/figma-to-code/`)
Generates code from Figma designs:
- Supports both AdorableCSS and TailwindCSS output
- Analyzes Figma nodes and converts to utility classes
- Handles Auto Layout, constraints, and styling

### Key Design Patterns

1. **Value Processing**: The `makeValue()` system intelligently handles:
   - Unit conversion (numbers → px)
   - Fractions (1/2 → 50%)
   - CSS variables (--var → var(--var))
   - Calculations (auto calc() wrapping)

2. **Prefix System**:
   - Responsive: `sm:`, `md:`, `lg:`, `xl:` (and max-width variants `~sm:`)
   - Pseudo-classes: `hover:`, `focus:`, `group-hover:`
   - Combinable for complex selectors

3. **No-Conflict Design**: Avoids conflicts with TailwindCSS:
   - `flex` means `flex: 1` (not `display: flex`)
   - Different naming conventions where overlap exists

### Important Files

- `/src/rules/rules.ts` - Main rule definitions and exports
- `/src/myparser/parser.ts` - Core parsing logic
- `/src/values/makeValue.ts` - Value processing utilities
- `/src/figma-to-code/codegen/adorableCSS.ts` - Figma to AdorableCSS conversion

### Development Notes

- No ESLint or Prettier configuration exists - follow existing code style
- No test framework configured - manual testing required
- Type checking via `pnpm check` before commits
- The project is designed as a UnoCSS plugin for framework compatibility

### Code Convention

**CRITICAL: Declarative Code Convention**
- **Write code that matches requirements exactly**
- Code should be self-documenting and readable
- Avoid clever abstractions that make code hard to understand
- Requirements and code implementation should be 1:1 mapping
- Choose clarity over brevity when they conflict
- This convention is mandatory for all rule implementations

**Example**: Instead of complex loops, write clear conditional logic that matches the specification:
```typescript
// Good: Clear and matches requirements
if (isNaN(+part) && !part.includes('%')) {
  result['font-family'] = String(cssvar(part));
}

// Bad: Clever but unclear
processors[getPropertyIndex(part)](part);
```