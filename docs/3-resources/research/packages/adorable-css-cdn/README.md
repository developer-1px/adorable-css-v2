# AdorableCSS CDN

Browser-ready distribution of AdorableCSS v2 for direct use via CDN.

## Installation

### Via CDN

```html
<!-- Auto-initialize (recommended) -->
<script src="https://unpkg.com/adorable-css-cdn@latest/dist/index.global.js"></script>

<!-- Manual initialization -->
<script src="https://unpkg.com/adorable-css-cdn@latest/dist/index.global.js" data-auto-init="false"></script>
<script>
  AdorableCSSV2.init({ debug: true })
</script>
```

### Via NPM

```bash
npm install adorable-css-cdn
```

```javascript
import AdorableCSSV2 from 'adorable-css-cdn'

AdorableCSSV2.init({
  watch: true,
  debug: false
})
```

## Usage

Once loaded, AdorableCSS automatically scans your HTML for utility classes and generates the corresponding CSS:

```html
<div class="hbox gap(16) p(20) bg(#f0f0f0)">
  <div class="w(fill) h(200) bg(blue) r(8)">Content 1</div>
  <div class="w(300) h(200) bg(red) r(8)">Content 2</div>
</div>
```

## API

### `AdorableCSSV2.init(options)`

Initialize AdorableCSS with optional configuration:

```javascript
AdorableCSSV2.init({
  watch: true,        // Auto-watch for class changes
  target: document.body,  // Target element to watch
  debug: false        // Enable debug logging
})
```

### `AdorableCSSV2.generate(classes)`

Generate CSS for specific classes:

```javascript
const css = AdorableCSSV2.generate(['hbox', 'gap(16)', 'p(20)'])
```

### `AdorableCSSV2.destroy()`

Clean up and remove AdorableCSS:

```javascript
AdorableCSSV2.destroy()
```

## Features

- **Zero configuration**: Just include the script and use
- **Auto-watching**: Automatically detects new classes
- **Lightweight**: Optimized for browser performance
- **TypeScript**: Full type definitions included

## License

MIT © developer-1px