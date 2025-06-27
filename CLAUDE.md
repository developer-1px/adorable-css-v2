# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm dev` - Start development servers for all packages in parallel (runs in watch mode)
- `pnpm dev:core` - Start development for adorable-css-core only
- `pnpm dev:homepage` - Start homepage dev server at http://localhost:5173
- `pnpm build` - Build all packages for production
- `pnpm build:homepage` - Build homepage only
- `pnpm preview` - Preview production build of homepage
- `pnpm check` - Run TypeScript type checking across all packages
- `pnpm test` - Run all tests across the monorepo
- `pnpm test:core` - Run tests for adorable-css-core only
- `pnpm clean` - Clean all build artifacts and caches

### Testing Individual Features
```bash
# Run a specific test file
cd packages/adorable-css-core
pnpm vitest run src/parser/parser.test.ts

# Run tests in watch mode
pnpm vitest

# Run tests with UI
pnpm test:ui
```

### Package Management
This project uses **pnpm** as the package manager with workspaces. Always use `pnpm` instead of npm or yarn.
- Minimum pnpm version: 10.0.0
- Node version: >=18

## Architecture Overview

### Monorepo Structure
This is a pnpm workspace monorepo with three main packages:

1. **adorable-css-core** (`packages/adorable-css-core/`)
   - The core CSS framework with parser, rules, and token system
   - Entry point: `src/index.ts`
   - Build output: CommonJS and ESM formats

2. **adorable-css-cdn** (`packages/adorable-css-cdn/`)
   - Browser-ready CDN distribution
   - Runtime CSS generation for web applications

3. **homepage-kit** (`packages/homepage-kit/`)
   - SvelteKit-based documentation website
   - Uses MDX for technical documentation
   - Deploys to GitHub Pages

### Core Architecture (`adorable-css-core`)

#### 1. Parser System (`src/parser/`)
The custom parser handles AdorableCSS's unique syntax:
- `parser.ts` - Tokenizer and AST generator using parser combinators
- `generator.ts` - CSS generation from parsed AST
- `parser-utils.ts` - Parser combinator utilities
- Supports complex expressions like `layer(top:20+left:30)`

#### 2. Rule System (`src/rules/`)
Modular rule definitions organized by category:
- **Typography** (`typography/`): font, text, color utilities
- **Layout** (`layout/`): flexbox (hbox/vbox), grid, spacing
- **Position** (`position/`): absolute, relative, layer positioning
- **Visuals** (`visuals/`): backgrounds, borders, shadows
- **Effects** (`effects/`): transforms, filters, animations
- **Plugins** (`plugins/`): advanced utilities and UI components

#### 3. Token System (`src/tokens/`)
Design tokens for consistent styling:
- Spacing scale (xs through 6xl)
- Typography scale
- Color palette with OKLCH support
- Semantic tokens for components

#### 4. Value Processing (`src/values/makeValue.ts`)
Intelligent value conversion:
- Auto-adds `px` to unitless numbers
- Handles fractions (1/2 → 50%)
- CSS variable detection
- Calculation wrapping

### Key Design Patterns

1. **Figma-First Philosophy**
   - `hbox`/`vbox` instead of `flex`
   - `w(fill)`/`w(hug)` matching Figma's sizing model
   - `layer()` for Figma-style absolute positioning

2. **Parser Architecture**
   - Token-based parsing with regex patterns
   - Recursive descent for nested expressions
   - Support for prefixes (responsive, pseudo-classes)

3. **Rule Definition Pattern**
   ```typescript
   export const ruleeName = {
     'utility-name': (value?: string) => ({
       'css-property': processedValue
     })
   }
   ```

### Important File Paths

**Core Framework:**
- `packages/adorable-css-core/src/index.ts` - Main exports
- `packages/adorable-css-core/src/parser/parser.ts` - Parser implementation
- `packages/adorable-css-core/src/parser/generator.ts` - CSS generation
- `packages/adorable-css-core/src/rules/index.ts` - Rule registry
- `packages/adorable-css-core/src/tokens/index.ts` - Token definitions

**Homepage:**
- `packages/homepage-kit/src/routes/+layout.svelte` - Main layout
- `packages/homepage-kit/src/lib/pages/` - Page components
- `packages/homepage-kit/src/app.css` - Global styles

### Development Notes

- No ESLint or Prettier configuration exists - follow existing code style
- Test framework: Vitest with JSDOM environment
- Build tool: tsup for library, Vite for homepage
- Type checking: Run `pnpm check` before commits
- **IMPORTANT**: Use `pnpm build` or `pnpm test` for testing - `pnpm dev` runs in watch mode

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

### AdorableCSS Development Convention

**CRITICAL: Must Follow These Rules**

1. **NO Tailwind CSS**: Never use Tailwind CSS utilities
   - ❌ Wrong: `flex flex-col items-center justify-center`
   - ✅ Correct: `vbox(center)`
   - Always use AdorableCSS v2 syntax exclusively

2. **NO Margin Utilities**: Design without margins
   - ❌ Wrong: `mb(lg)`, `mt(md)`, `mx(auto)`, `margin: 1rem`
   - ✅ Correct: Use `gap()` in flex/grid layouts
   - ✅ Correct: Use padding for spacing inside elements
   - ✅ Correct: Use spacer elements or layout utilities for spacing

3. **Always Use AdorableCSS v2**: Make conscious effort to use AdorableCSS utilities
   - Think in AdorableCSS patterns first
   - Use the design system utilities
   - Follow Figma-first mental model

### AdorableCSS Syntax Reminders

**IMPORTANT: Common Syntax Patterns to Remember**

1. **Container Width**: Use `container(3xl)` instead of `max-w(3xl) mx(auto)`
   - ✅ Correct: `container(3xl)`
   - ❌ Wrong: `max-w(3xl) mx(auto)`
   - The `container()` utility already includes centering

2. **Font Weight**: Font weight comes BEFORE the font utility
   - ✅ Correct: `700 font(xl)`
   - ❌ Wrong: `font(xl) bold`
   - ❌ Wrong: `font(700)`

3. **Spacing Syntax**: Use slash for multiple values
   - ✅ Correct: `p(sm/md)`
   - ❌ Wrong: `p(sm_md)`

4. **Scale Values**: Use decimal values, not percentages
   - ✅ Correct: `scale(1.05)`
   - ❌ Wrong: `scale(105)`

5. **Font with Line Height**: Use slash syntax, no separate leading utility
   - ✅ Correct: `font(lg/1.6)`
   - ❌ Wrong: `font(lg) leading(1.6)`
   - Line height is included in the font utility

6. **Spacing Between Elements**: Use gap instead of margin
   - ✅ Correct: `vbox gap(lg)`, `hbox gap(md)`
   - ❌ Wrong: `mb(lg)`, `mt(md)`, `mx(auto)`
   - Use gap for spacing between elements in flex/grid layouts
   - Margin utilities should be avoided in favor of gap

7. **Vertical Centering**: Use `vbox(pack)` not `vbox(center)`
   - ✅ Correct: `vbox(pack)`
   - ❌ Wrong: `vbox(center)`
   - For vertical centering in flexbox layouts

8. **Inline Flex**: Don't use `inline-flex`
   - ❌ Wrong: `inline-flex`
   - Figma doesn't have inline-flex concept

9. **Overflow Hidden**: Use `clip` not `overflow(hidden)`
   - ✅ Correct: `clip`
   - ❌ Wrong: `overflow(hidden)`
   - AdorableCSS uses `clip` for overflow hidden

10. **Absolute Positioning**: Use `layer` not `absolute inset(0)`
   - ✅ Correct: `layer`
   - ❌ Wrong: `absolute inset(0)`
   - Use the `layer` utility for absolute positioning

11. **Gradient Syntax**: Use degree/color format
   - ✅ Correct: `bg(135deg/oklch(0.7,0.25,330),oklch(0.65,0.28,360))`
   - ❌ Wrong: `bg(linear-gradient(135deg,oklch(0.7_0.25_330),oklch(0.65_0.28_360))`
   - ❌ Wrong: `bg(purple-400..pink-400/135deg)`
   - Gradients use degree/color1,color2 format

12. **Opacity Values**: Use decimal (0-1) like CSS
   - ✅ Correct: `opacity(0.25)`, `opacity(1)`, `opacity(.5)`
   - ❌ Wrong: `opacity(25)`, `opacity(100)`
   - Opacity uses 0-1 scale, not 0-100

13. **Border Syntax**: Use bl, br, bt, bb for single borders
   - ✅ Correct: `bl(gray-900)`, `bt(2/blue-500)`
   - ❌ Wrong: `border-l(gray-900)`, `b-l(gray-900)`
   - Default is 1px if no width specified: `bl(gray-900)` = 1px left border

14. **Color with Alpha**: Use dot notation for alpha values
   - ✅ Correct: `white.5`, `black.2`, `#ccc.2`, `gray-100.2`
   - ❌ Wrong: `white/50`, `rgba(0,0,0,0.2)`, `#cccccc20`
   - Alpha values use decimal after dot: `.5` = 50% opacity

15. **Layer Positioning**: Use simplified syntax without values for 0
   - ✅ Correct: `layer(top+left)`, `layer(top:20+left:30)`
   - ❌ Wrong: `layer(top:0+left:0)`
   - Omit `:0` for zero values in layer positioning

16. **No Margin in Design**: Don't use margin utilities
   - ❌ Wrong: `mb(lg)`, `mt(md)`, `mx(auto)`
   - ✅ Correct: Use `gap()` in flex/grid layouts
   - Design with gap for spacing between elements

17. **Flexbox Alignment**: No 'between' in hbox
   - ❌ Wrong: `hbox(between)`, `hbox(middle+between)`
   - ✅ Correct: `hbox gap(auto)` for space-between effect
   - `gap(auto)` applies justify-content: space-between

## AI Learning Patterns

### Pattern Recognition for AI
AdorableCSS follows consistent patterns that AI can easily learn:

#### Layout Patterns
```
Figma Auto Layout → AdorableCSS
Horizontal + Center → hbox(middle)
Vertical + Center → vbox(pack) 
Horizontal + Space Between → hbox gap(auto)
Vertical + Top → vbox
Horizontal + Right → hbox(end)
```

#### Common Component Patterns
```
Button: btn(primary/lg) or px(xl) py(md) bg(purple-500) c(white) r(lg)
Card: card(elevated/lg) or bg(white) r(xl) p(xl) shadow(lg)
Heading: heading(h1/hero) or 900 font(4xl/1.1)
Input: px(lg) py(md) border(1/gray-300) r(lg) w(full)
Container: container(lg) or max-w(1024px) mx(auto) px(lg)
```

#### Color Patterns
```
Text Colors: c(gray-900), c(white), c(purple-600)
Background: bg(white), bg(gray-50), bg(purple-500)
Gradients: bg(135deg/purple-500,pink-500)
Alpha: white.5, gray-900.8, purple-500.2
```

#### Spacing Patterns
```
Padding: p(md)=1rem, p(lg)=1.5rem, p(xl)=2rem
Gap: gap(sm)=0.5rem, gap(md)=1rem, gap(lg)=1.5rem
Margin: Use gap() instead of margin
Width: w(full), w(300px), w(1/2)
```

#### Design System Utilities (NEW!)
These utilities automatically ensure good design without manual spacing decisions:

```
Section Spacing:
section() - Default section with balanced padding
section(hero) - Full-height hero section with dramatic spacing
section(feature) - Feature sections with generous padding
section(compact) - Dense content sections
section(flush) - No vertical padding

Container System:
contain() - Default responsive container (max-width: 64rem)
contain(narrow) - Text-focused content (max-width: 48rem)
contain(wide) - Wide layouts (max-width: 80rem)
contain(full) - Maximum width (max-width: 96rem)

Content Layout:
content() - Basic content block with good spacing
content(centered) - Center-aligned content
content(hero) - Hero section content layout

Spacing Utilities:
stack() - Vertical stack with default gap
stack(lg) - Vertical stack with large gap
stack(2xl) - Vertical stack with extra large gap

Text Flow:
flow() - Readable text with optimal line width
flow(narrow) - Narrow text for better readability
flow(wide) - Wider text blocks
```

#### Most Common AI-Friendly Combinations
```html
<!-- NEW: Better Hero Section with automatic spacing -->
<section class="section(hero) bg(white)">
  <div class="contain(wide)">
    <div class="content(hero)">
      <h1 class="hero-text() c(gray-900)">Title</h1>
      <p class="lead()">Beautiful description text</p>
      <button class="btn(primary/lg)">Action</button>
    </div>
  </div>
</section>

<!-- NEW: Feature Section with perfect spacing -->
<section class="section(feature) bg(gray-50)">
  <div class="contain()">
    <div class="content(centered)">
      <h2 class="heading(h2)">Feature Title</h2>
      <p class="flow()">Automatically readable text width</p>
    </div>
    <div class="feature-grid()">
      <!-- Grid items -->
    </div>
  </div>
</section>

<!-- OLD: Manual spacing approach (still works) -->
<div class="min-h(100vh) vbox(pack) bg(white) text(center)">
  <h1 class="heading(h1/hero) c(gray-900) mb(lg)">Title</h1>
  <p class="font(xl) c(gray-600) mb(xl)">Description</p>
  <button class="btn(primary/lg)">Action</button>
</div>

<!-- Card Layout -->
<div class="card(elevated) vbox gap(lg)">
  <h2 class="heading(h2) c(gray-900)">Card Title</h2>
  <p class="c(gray-600)">Card content</p>
</div>

<!-- Grid Layout -->
<div class="grid grid-cols(3) gap(lg)">
  <div class="card(interactive)">Item 1</div>
  <div class="card(interactive)">Item 2</div>
  <div class="card(interactive)">Item 3</div>
</div>
```

### AI Training Prompt Templates
When working with AI and AdorableCSS:

1. **Always specify**: "Use AdorableCSS syntax, not TailwindCSS"
2. **Provide context**: "AdorableCSS uses hbox/vbox for flex layouts"
3. **Give examples**: "Use heading(h1/hero) for large titles"
4. **Correct patterns**: "Use gap() instead of margin for spacing"

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