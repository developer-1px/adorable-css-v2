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
- **TypeScript**: Full type safety and IntelliSense
- **Declarative**: Clear, readable rule definitions
- **Extensible**: Easy to add custom rules and utilities

## Rule Categories

- **Typography**: `font()`, `c()`, `text()`, weights, styles
- **Layout**: Display, sizing, spacing, flexbox, grid
- **Visuals**: Background, borders, shadows, opacity
- **Position**: Absolute, relative, coordinates, z-index
- **Interaction**: Cursor, pointer events, user select

## License

MIT © developer-1px