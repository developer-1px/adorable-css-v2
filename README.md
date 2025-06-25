# AdorableCSS v2

A Figma-first CSS utility framework that bridges the gap between design and code. Write CSS the way you think in Figma.

## Core Philosophy

AdorableCSS v2 is built on a simple principle: **Your CSS should match your design tool's mental model**. 

```css
/* Traditional CSS */
.card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* AdorableCSS - Think like Figma */
<div class="vbox gap(16) p(24) w(fill) bg(primary..accent/135deg)">
```

## Key Features

### 1. Figma Auto Layout → CSS
```html
<!-- Figma: Auto Layout, Vertical, Gap: 16 -->
<div class="vbox gap(16)">

<!-- Figma: Auto Layout, Horizontal, Pack: Center -->
<div class="hbox(pack)">

<!-- Figma: Width: Fill, Height: Hug -->
<div class="w(fill) h(hug)">
```

### 2. Constraint-Based Sizing
```html
<!-- Fixed width -->
<div class="w(300)">

<!-- Min-max constraints like Figma -->
<div class="w(300..600)">

<!-- Fill parent -->
<div class="w(fill)">

<!-- Hug content -->
<div class="w(hug)">
```

### 3. Layer Positioning
```html
<!-- Figma: Absolute position with constraints -->
<div class="layer(top:20+left:30)">

<!-- Fill parent with padding -->
<div class="layer(fill/20)">

<!-- Center in parent -->
<div class="layer(center)">
```

### 4. Visual Effects
```html
<!-- Gradients -->
<div class="bg(primary..accent/135deg)">

<!-- With color palette -->
<div class="bg(purple-400..purple-600/to-br)">

<!-- Shadows and effects -->
<div class="shadow(lg) backdrop-blur(md) r(xl)">
```

### 5. Typography System
```html
<!-- All-in-one font utility -->
<h1 class="font(Inter/32/1.2/medium)">

<!-- Semantic headings -->
<h1 class="heading(h1)">

<!-- With color -->
<p class="font(16) c(gray-600)">
```

## Installation

```bash
npm install adorable-css
# or
pnpm add adorable-css
```

## Quick Start

```javascript
// vite.config.ts
import { adorableCSSPlugin } from 'adorable-css/vite'

export default {
  plugins: [adorableCSSPlugin()]
}
```

## Parser Architecture

AdorableCSS uses a custom parser that understands:
- Function-style utilities: `w(300)`, `p(16/24)`
- Range constraints: `w(100..200)`
- Complex expressions: `layer(top:20+left:30)`
- Pseudo-class prefixes: `hover:scale(1.05)`
- Responsive prefixes: `md:w(full)`

## Plugin System

### Core Plugins
- **Layout**: hbox, vbox, grid, layer
- **Typography**: font, heading, text utilities
- **Colors**: OKLCH-based color palette with themes
- **Effects**: shadows, filters, transforms

### Creating Custom Plugins
```typescript
export const myPlugin = {
  rules: {
    'glow': (value) => ({
      'box-shadow': `0 0 ${value}px currentColor`
    })
  }
}
```

## Figma Plugin

Generate AdorableCSS code directly from your Figma designs:
1. Install the Figma plugin
2. Select any frame or component
3. Generate production-ready code

## Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Type checking
pnpm check
```

## Architecture

- **Parser**: Custom tokenizer and AST generator
- **Rule System**: Modular, extensible CSS generation
- **Value Processing**: Smart unit conversion and calculations
- **Build Integration**: Zero-runtime, compile-time optimization

## Why AdorableCSS?

1. **Design-Development Unity**: Same mental model as Figma
2. **No Learning Curve**: If you know Figma, you know AdorableCSS
3. **Performance**: 12KB typical production bundle
4. **Type Safety**: Full TypeScript support with IntelliSense
5. **Framework Agnostic**: Works with React, Vue, Svelte, or vanilla HTML

## Documentation

Visit [adorablecss.com](https://adorablecss.com) for:
- Complete API reference
- Interactive playground
- Migration guides
- Video tutorials

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup and guidelines.

## License

MIT License - see [LICENSE](./LICENSE) for details.