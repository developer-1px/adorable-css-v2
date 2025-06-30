---
title: Position Coordinates
description: Intuitive coordinate-based positioning system for precise element placement
order: 15
category: Layout
---

import { CodeBlock } from '$lib/components/ui/CodeBlock.svelte';
import { Playground } from '$lib/components/ui/Playground.svelte';

# Position Coordinates

AdorableCSS v2 introduces an innovative coordinate-based positioning syntax that makes element positioning more intuitive and concise. Instead of writing multiple position properties, you can now use a single coordinate expression.

## Basic Syntax

Use parentheses with comma-separated x,y coordinates to position elements:

<Playground>
  <div class="relative h(200) bg(gray-100) r(lg)">
    <div class="absolute (0,0) bg(purple-500) c(white) p(sm) r(md)">
      Top Left
    </div>
    <div class="absolute (right,0) bg(blue-500) c(white) p(sm) r(md)">
      Top Right
    </div>
    <div class="absolute (0,bottom) bg(green-500) c(white) p(sm) r(md)">
      Bottom Left
    </div>
    <div class="absolute (right,bottom) bg(red-500) c(white) p(sm) r(md)">
      Bottom Right
    </div>
  </div>
</Playground>

<CodeBlock language="html">
{`<!-- Basic coordinates -->
<div class="absolute (0,0)">Top Left</div>
<div class="absolute (100px,50px)">Specific pixels</div>
<div class="absolute (50%,100%)">Percentage values</div>`}
</CodeBlock>

## Center Positioning

The `center` keyword automatically handles the transform calculations needed for perfect centering:

<Playground>
  <div class="relative h(200) bg(gray-100) r(lg)">
    <div class="absolute (center,center) bg(purple-500) c(white) p(md) r(md) shadow(lg)">
      Perfectly Centered
    </div>
  </div>
</Playground>

<CodeBlock language="css">
{`/* Using center keyword */
(center,center)    /* Both axes centered */
(center,top)       /* Horizontally centered, top aligned */
(left,center)      /* Left aligned, vertically centered */

/* Generated CSS for (center,center) */
position: absolute;
left: 50%;
top: 50%;
transform: translateX(-50%) translateY(-50%);`}
</CodeBlock>

## Edge Keywords

Use semantic keywords for common positions:

<Playground>
  <div class="relative h(200) bg(gray-100) r(lg)">
    <div class="absolute (left,top) bg(blue-500) c(white) p(xs) r(sm) m(sm)">
      left,top
    </div>
    <div class="absolute (right,top) bg(green-500) c(white) p(xs) r(sm) m(sm)">
      right,top
    </div>
    <div class="absolute (center,bottom) bg(purple-500) c(white) p(xs) r(sm) mb(sm)">
      center,bottom
    </div>
  </div>
</Playground>

### Available Keywords:
- **X-axis**: `left`, `center`, `right`, `start`, `end`
- **Y-axis**: `top`, `center`, `bottom`, `start`, `end`

## Arithmetic Expressions

Combine keywords with offsets using `+` and `-` operators:

<Playground>
  <div class="relative h(200) bg(gray-100) r(lg)">
    <div class="absolute (center+20,top+20) bg(purple-500) c(white) p(sm) r(md)">
      center+20, top+20
    </div>
    <div class="absolute (right-xs,bottom-xs) bg(blue-500) c(white) p(sm) r(md)">
      right-xs, bottom-xs
    </div>
    <div class="absolute (100%-40,center) bg(green-500) c(white) p(sm) r(md)">
      100%-40, center
    </div>
  </div>
</Playground>

<CodeBlock language="css">
{`/* Offset from center */
(center+20,top)         /* 20px right of center */
(center-xs,center)      /* xs spacing left of center */

/* Offset from edges */
(left+sm,bottom-10)     /* sm from left, 10px up from bottom */
(right-20,top+lg)       /* 20px in from right, lg down from top */

/* Percentage with offsets */
(100%-20,50%+xs)        /* 20px from right edge, xs below middle */`}
</CodeBlock>

## Token Support

All spacing and size tokens work seamlessly with position coordinates:

<CodeBlock language="css">
{`/* Using spacing tokens */
(sm,lg)                 /* left: var(--spacing-sm); top: var(--spacing-lg); */
(left+xl,top+xs)        /* Combines keywords with tokens */
(center-md,bottom-sm)   /* Center offset by medium spacing */`}
</CodeBlock>

## Real-World Examples

### Tooltip Positioning

<Playground>
  <div class="relative inline-block">
    <button class="btn-primary">
      Hover me
    </button>
    <div class="absolute (center,100%+xs) bg(gray-900) c(white) p(xs/sm) r(md) text(sm) w(max-content) opacity(0) hover(opacity(100)) transition(opacity)">
      Tooltip text
    </div>
  </div>
</Playground>

<CodeBlock language="html">
{`<!-- Tooltip below element -->
<div class="relative">
  <button>Hover me</button>
  <div class="absolute (center,100%+xs)">
    Tooltip text
  </div>
</div>`}
</CodeBlock>

### Notification Badge

<Playground>
  <div class="relative inline-block">
    <div class="size(48) bg(gray-200) r(lg) hstack">
      <span class="text(2xl)">🔔</span>
    </div>
    <div class="absolute (100%-xs,-xs) size(20) bg(red-500) c(white) r(full) hstack text(xs) bold">
      3
    </div>
  </div>
</Playground>

<CodeBlock language="html">
{`<!-- Badge in top-right corner -->
<div class="relative">
  <div class="icon">🔔</div>
  <div class="absolute (100%-xs,-xs)">
    3
  </div>
</div>`}
</CodeBlock>

### Dropdown Menu

<Playground>
  <div class="relative inline-block">
    <button class="btn-secondary">
      Options ▼
    </button>
    <div class="absolute (right,100%+xs) bg(white) shadow(lg) r(lg) p(sm) min-w(200)">
      <div class="vbox gap(xs)">
        <div class="p(xs/sm) hover(bg(gray-100)) r(md) cursor(pointer)">Edit</div>
        <div class="p(xs/sm) hover(bg(gray-100)) r(md) cursor(pointer)">Delete</div>
        <div class="p(xs/sm) hover(bg(gray-100)) r(md) cursor(pointer)">Share</div>
      </div>
    </div>
  </div>
</Playground>

<CodeBlock language="html">
{`<!-- Dropdown aligned to right edge -->
<div class="relative">
  <button>Options</button>
  <div class="absolute (right,100%+xs)">
    <!-- Dropdown content -->
  </div>
</div>`}
</CodeBlock>

### Modal Centering

<CodeBlock language="html">
{`<!-- Centered modal -->
<div class="fixed (center,center) bg(white) p(xl) r(xl) shadow(2xl)">
  <h2>Modal Title</h2>
  <p>Modal content goes here...</p>
</div>

<!-- Full-screen overlay -->
<div class="fixed (0,0) w(full) h(full) bg(black.5)"></div>`}
</CodeBlock>

## Advanced Patterns

### Card with Floating Action

<Playground>
  <div class="relative bg(white) p(lg) r(lg) shadow(md) max-w(300)">
    <h3 class="font(lg) bold mb(sm)">Card Title</h3>
    <p class="c(gray-600) mb(md)">Some card content that explains what this card is about.</p>
    <div class="absolute (right-sm,bottom-sm)">
      <button class="size(40) r(full) bg(purple-500) c(white) shadow(md) hover(shadow(lg)) transition hstack">
        ➕
      </button>
    </div>
  </div>
</Playground>

### Image with Caption Overlay

<Playground>
  <div class="relative w(full) max-w(400)">
    <img src="https://picsum.photos/400/300" class="w(full) r(lg)" alt="Demo" />
    <div class="absolute (0,bottom) w(full) bg(to-top/transparent..black.8) p(md) r(0/0/lg/lg)">
      <h4 class="c(white) font(lg) bold">Beautiful Sunset</h4>
      <p class="c(white.8) text(sm)">Captured at golden hour</p>
    </div>
  </div>
</Playground>

## Combining with Other Utilities

Position coordinates work seamlessly with all position utilities:

<CodeBlock language="css">
{`/* With position utilities */
absolute (center,center)
fixed (0,0)
sticky (0,top)
relative (10,10)

/* With responsive modifiers */
md:absolute md:(right,top)
lg:(center,center)

/* With state modifiers */
hover:(center+10,center)
focus:(left,top)`}
</CodeBlock>

## Migration Guide

Transitioning from traditional positioning:

<CodeBlock language="css">
{`/* Old way */
absolute top(100%) left(50%) transform(translateX(-50%))

/* New way */
absolute (center,100%)

/* Old way */
absolute top(0) right(0)

/* New way */
absolute (right,top)

/* Old way */
absolute top(50%) left(50%) transform(translate(-50%,-50%))

/* New way */
absolute (center,center)`}
</CodeBlock>

## Browser Support

Position coordinates compile to standard CSS properties and work in all modern browsers. The transform calculations for centering are handled automatically, ensuring consistent behavior across browsers.

## Performance Notes

- Coordinates are parsed at build time, no runtime overhead
- Transform properties are only added when necessary (center keyword)
- Combines multiple properties into efficient CSS output