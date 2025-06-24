# AdorableCSS Core

The core parsing and generation engine for AdorableCSS v2 - a Figma-first CSS utility framework.

## Installation

```bash
npm install adorable-css
# or
yarn add adorable-css
# or
pnpm add adorable-css
```

## Usage

### Basic Usage

```typescript
import { parseAdorableCSS, generateCSSFromAdorableCSS } from 'adorable-css'

// Parse AdorableCSS syntax
const parsed = parseAdorableCSS('hbox gap(16) p(20)')

// Generate CSS
const css = generateCSSFromAdorableCSS('hbox gap(16) p(20)')
// Result: .hbox{display:flex} .gap\(16\){gap:16px} .p\(20\){padding:20px}
```

### Advanced Usage

```typescript
import { rules, getRuleHandler } from 'adorable-css'

// Access individual rule handlers
const hboxHandler = getRuleHandler('hbox')
const gapHandler = getRuleHandler('gap')

// Generate CSS rules programmatically
const hboxCSS = hboxHandler() // { display: 'flex' }
const gapCSS = gapHandler('16') // { gap: '16px' }
```

## Features

- **Figma-first**: Designed to match Figma's mental model
- **Natural syntax**: `hbox`, `vbox`, `gap`, `w(fill)`, `h(hug)`
- **Design Tokens**: Built-in token system for consistent styling
- **TypeScript**: Full type safety and IntelliSense
- **Declarative**: Clear, readable rule definitions
- **Extensible**: Easy to add custom rules and utilities

## Rule Categories

- **Typography**: `font()`, `c()`, `text()`, weights, styles
- **Layout**: Display, sizing, spacing, flexbox, grid
- **Visuals**: Background, borders, shadows, opacity
- **Position**: Absolute, relative, coordinates, z-index
- **Interaction**: Cursor, pointer events, user select

## Design Token System

AdorableCSS v2 includes a powerful design token system for maintaining consistent styling across your application.

### Using Design Tokens

```typescript
import { injectTokens, defaultTokens } from 'adorable-css'

// Use default tokens
injectTokens()

// Or customize tokens
const customTokens = {
  ...defaultTokens,
  fontSize: {
    ...defaultTokens.fontSize,
    md: '1.125rem' // Override medium size
  }
}
injectTokens(customTokens)
```

### Token Usage in Classes

```html
<!-- Font sizes -->
<h1 class="font(2xl)">Heading</h1>
<p class="font(md)">Body text</p>

<!-- Spacing -->
<div class="p(lg) m(sm) gap(md)">Content</div>

<!-- Border radius -->
<button class="r(md)">Button</button>
<img class="r(full)" src="avatar.jpg" />

<!-- Shadows -->
<div class="shadow(lg)">Card</div>
```

### Available Tokens

#### Font Sizes
- `xs` through `5xl`

#### Spacing
- `xs` through `5xl`

#### Border Radius
- `none`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `full`

#### Shadows
- `none`, `sm`, `md`, `lg`, `xl`, `2xl`

### Advanced Font Syntax

```html
<!-- Token with modifiers -->
<p class="font(lg/relaxed)">Large text with relaxed line height</p>
<p class="font(sm/tight/semibold)">Small semibold text with tight line height</p>
<p class="font(Inter/md/normal/medium)">Inter font with all modifiers</p>
```

## License

MIT © developer-1px