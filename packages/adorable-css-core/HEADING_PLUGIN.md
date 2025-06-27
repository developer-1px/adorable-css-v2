# Heading Plugin Documentation

## Overview

The heading plugin provides a comprehensive typography system for headings with built-in design tokens, perfect font scaling, and semantic hierarchy. Instead of manually specifying font-size, font-weight, line-height, and letter-spacing, you can use a single `heading()` utility that applies the entire typographic style.

## Usage

```html
<!-- Size-based headings (follows font scale) -->
<h1 class="heading(xs)">Small heading</h1>
<h2 class="heading(lg)">Large heading</h2>
<h3 class="heading(2xl)">Extra large heading</h3>
<h4 class="heading(4xl)">Huge heading</h4>

<!-- Semantic headings (recommended for HTML structure) -->
<h1 class="heading(h1)">Main page title</h1>
<h2 class="heading(h2)">Section heading</h2>
<h3 class="heading(h3)">Subsection heading</h3>
<h4 class="heading(h4)">Content heading</h4>
<h5 class="heading(h5)">Minor heading</h5>
<h6 class="heading(h6)">Small heading</h6>
```

## Available Styles

### Size-based Headings
Based on the Major Third (1.25) font scale with optimal typography settings:

- `heading(xs)` - 600 weight, font-sm, normal line-height
- `heading(sm)` - 600 weight, font-md, normal line-height  
- `heading(md)` - 600 weight, font-lg, snug line-height, tight letter-spacing
- `heading(lg)` - 600 weight, font-xl, snug line-height, tight letter-spacing
- `heading(xl)` - 700 weight, font-2xl, snug line-height, tight letter-spacing
- `heading(2xl)` - 700 weight, font-3xl, snug line-height, tight letter-spacing
- `heading(3xl)` - 700 weight, font-4xl, tight line-height, tighter letter-spacing
- `heading(4xl)` - 700 weight, font-5xl, tight line-height, tighter letter-spacing
- `heading(5xl)` - 800 weight, font-6xl, tight line-height, tighter letter-spacing
- `heading(6xl)` - 800 weight, font-7xl, tight line-height, tighter letter-spacing
- `heading(7xl)` - 900 weight, font-8xl, tight line-height, tighter letter-spacing
- `heading(8xl)` - 900 weight, font-9xl, tight line-height, tighter letter-spacing

### Semantic Headings
Optimized for HTML semantic structure:

- `heading(h1)` - Hero titles (76.29px) - 700 weight, font-6xl, tight line-height
- `heading(h2)` - Section titles (61.04px) - 700 weight, font-5xl, tight line-height
- `heading(h3)` - Subsection titles (48.83px) - 600 weight, font-4xl, snug line-height
- `heading(h4)` - Content headings (39.06px) - 600 weight, font-3xl, snug line-height
- `heading(h5)` - Minor headings (31.25px) - 600 weight, font-2xl, snug line-height
- `heading(h6)` - Small headings (25px) - 600 weight, font-xl, normal line-height

## Generated CSS Properties

Each heading style generates:

```css
.heading\(h1\) {
  font-weight: 700;
  font-size: var(--font-6xl);
  line-height: var(--lineHeight-tight);
  letter-spacing: var(--letterSpacing-tighter);
  margin-top: 0;
  margin-bottom: 0.75rem;
}
```

## Features

### 🎯 **Complete Typography System**
- Font weight, size, line-height, and letter-spacing all optimized together
- No need to manually balance typography properties

### 📐 **Mathematical Precision** 
- Based on Major Third (1.25) scale for perfect visual hierarchy
- Each size is mathematically related to create visual harmony

### 🎨 **Design Token Integration**
- Uses CSS custom properties for easy theming
- Automatically inherits from your design system

### ♿ **Accessibility**
- Proper margin reset (margin-top: 0)
- Consistent bottom margins for rhythm
- Optimal contrast ratios with proper font weights

### 🧹 **Clean Markup**
- Single class replaces 4-6 individual utility classes
- More readable HTML structure

## Before vs After

### Before (Traditional utilities):
```html
<h1 class="text-6xl font-bold leading-tight tracking-tighter mt-0 mb-3">
  Hero Title
</h1>
```

### After (Heading plugin):
```html
<h1 class="heading(h1)">
  Hero Title  
</h1>
```

## Design Philosophy

The heading plugin embodies AdorableCSS's core principle: **encode design intelligence into the utilities themselves**. Instead of providing raw CSS properties, it provides meaningful typographic intentions that automatically apply best practices.

## Browser Support

Works in all modern browsers that support CSS custom properties (IE11+).

## Integration with Other Utilities

Heading styles can be combined with other AdorableCSS utilities:

```html
<h1 class="heading(h1) c(purple-600) text(center)">
  Centered Purple Title
</h1>

<h2 class="heading(h2) c(gray-800) mb(xl)">
  Section with Custom Margin
</h2>
```

The heading utility handles all typography concerns, while other utilities handle color, alignment, and spacing overrides.