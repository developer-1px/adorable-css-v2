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

## Modern CSS Library Design Principles

### Core Design Philosophy

#### 1. **Utility-First Architecture**
- Embrace atomic CSS principles with single-purpose classes
- Prioritize composability over premade components
- Keep specificity low to avoid cascade conflicts
- Example: `bg(purple-400)` instead of `.btn-primary-background`

#### 2. **Perceptually Uniform Color System (OKLCH)**
- Use OKLCH color space for consistent visual perception
- Lightness (L): 0-1, maintains consistent brightness across hues
- Chroma (C): 0-0.37, controls color intensity uniformly
- Hue (H): 0-360, circular color wheel
- Benefits: Better gradients, predictable color mixing, improved accessibility

#### 3. **Design Tokens as Foundation**
- Define visual properties as reusable variables
- Categories: Colors, typography, spacing, shadows, animations
- Enable cross-platform consistency
- Support theming and dynamic customization
- Example: `--spacing-lg: 24px`, `--color-primary-500: oklch(0.65 0.25 295)`

#### 4. **Mobile-First & Responsive Design**
- Start with mobile breakpoints and scale up
- Use container queries for component-based responsiveness
- Provide intuitive responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`
- Support both min-width and max-width variants: `~sm:` for max-width

#### 5. **Developer Experience (DX) First**
- Intuitive, memorable syntax that mirrors mental models
- Excellent IDE support with autocomplete
- Comprehensive documentation with live examples
- Minimal configuration and setup
- Fast build times and small bundle sizes

### Technical Implementation Principles

#### 1. **Performance Optimization**
- Tree-shakable architecture - only include used styles
- Minimize runtime calculations
- Use CSS custom properties for dynamic values
- Leverage modern CSS features (Grid, Flexbox, Layers)
- Aim for sub-10KB gzipped core

#### 2. **Modularity & Extensibility**
- Plugin-based architecture for custom rules
- Separate core from optional features
- Allow partial imports: `import { colors } from 'adorable-css'`
- Support custom themes and configurations

#### 3. **Type Safety**
- Full TypeScript support with accurate types
- IDE autocomplete for all utilities
- Type-safe configuration files
- Compile-time validation where possible

#### 4. **Framework Agnostic**
- Pure CSS output compatible with any framework
- Optional framework-specific integrations
- Support for component libraries
- Work in SSR and SSG environments

### Visual Design Principles

#### 1. **Consistent Spacing Scale**
- Use mathematical ratios (1.5x, 2x, etc.)
- Limited, memorable set of values
- Support both fixed and fluid spacing
- Example: 4, 8, 12, 16, 24, 32, 48, 64, 96

#### 2. **Typography System**
- Modular scale for font sizes
- Consistent line-height ratios
- Support for fluid typography
- Web font optimization strategies

#### 3. **Elevation & Depth**
- Consistent shadow scale
- Support for both drop shadows and inner shadows
- Consider dark mode shadows
- Layer-based z-index management

#### 4. **Motion & Animation**
- Predefined timing functions
- Consistent duration scale
- Respect prefers-reduced-motion
- Performance-optimized animations

### Best Practices for CSS Library Design

#### 1. **Naming Conventions**
- Be descriptive but concise
- Use consistent patterns
- Avoid abbreviations that aren't universal
- Consider international developers

#### 2. **Documentation Standards**
- Start with "Getting Started" guide
- Provide interactive examples
- Include migration guides
- Document browser support
- Show real-world use cases

#### 3. **Testing & Quality**
- Visual regression testing
- Cross-browser testing
- Performance benchmarks
- Accessibility audits
- Bundle size monitoring

#### 4. **Community & Ecosystem**
- Open source with clear contribution guidelines
- Regular release cycles
- Responsive to issues and PRs
- Plugin/extension ecosystem
- Integration with popular tools

### Future-Proofing Considerations

#### 1. **Emerging CSS Features**
- Container queries for component responsiveness
- CSS Layers for cascade management
- Subgrid for complex layouts
- New color spaces (OKLCH, Display P3)
- CSS Houdini for custom properties

#### 2. **Accessibility First**
- WCAG compliance built-in
- Color contrast utilities
- Focus management helpers
- Screen reader utilities
- Reduced motion support

#### 3. **Sustainability**
- Minimize HTTP requests
- Optimize for Core Web Vitals
- Support incremental adoption
- Provide migration tools
- Maintain backward compatibility

### AdorableCSS-Specific Principles

1. **Figma-First Philosophy**: Design decisions should mirror Figma's mental model
2. **No Conflicts**: Avoid naming conflicts with other popular frameworks
3. **Intuitive Syntax**: `hbox(middle+around)` reads like natural language
4. **Progressive Enhancement**: Start simple, add complexity as needed
5. **Real-World Focused**: Solve actual developer pain points, not theoretical ones

## Brand Design Concept

### Core Identity: "Delightfully Intuitive"
AdorableCSS aims to make CSS development **joyful**. The brand embodies playfulness, modernity, and elegance while remaining accessible to all developers.

### Visual Language
1. **Gradient Paradise**: Vibrant OKLCH gradients as the primary visual element
   - Signature: `bg(purple-400..pink-400/135deg)`
   - Ocean: `bg(blue-400..teal-400/90deg)`
   - Sunset: `bg(orange-400..rose-400/45deg)`

2. **Glassmorphism & Depth**: Subtle glass effects with backdrop blur
3. **Micro-animations**: Delightful interactions at every touchpoint
4. **Breathing Space**: Generous spacing for visual comfort

### Design Implementation
- **Show, Don't Tell**: Interactive examples over lengthy explanations
- **Delight in Details**: Thoughtful micro-interactions and easter eggs
- **Progressive Disclosure**: Simple for beginners, powerful for experts
- **Consistency**: Unified visual language across all touchpoints

For detailed brand guidelines, see `BRAND_DESIGN_CONCEPT.md`