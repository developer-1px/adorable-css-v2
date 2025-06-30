---
title: Container Tokens
description: Token system for container widths and heights
order: 26
category: Design System
---

import { CodeBlock } from '$lib/components/ui/CodeBlock.svelte';
import { Playground } from '$lib/components/ui/Playground.svelte';

# Container Tokens

AdorableCSS v2 introduces a dedicated container token system for width and height utilities, separate from the size tokens used for square elements and icons.

## Token Separation

We now have two distinct token systems:

### Size Tokens
Used exclusively with the `size()` utility for square elements:
- Icons: `size(sm)`, `size(lg)`
- Avatars: `size(64)`
- Square elements: `size(xl)`

### Container Tokens
Used with width/height utilities for content containers:
- `w(lg)`, `h(md)` - Width and height
- `max-w(4xl)`, `min-h(sm)` - Constraints
- `w(prose)` - Special reading width

## Container Token Scale

<div class="vbox gap(md)">
  {#each [
    ['xs', '20rem', '320px', 'Mobile content'],
    ['sm', '24rem', '384px', 'Small mobile'],
    ['md', '28rem', '448px', 'Large mobile'],
    ['lg', '32rem', '512px', 'Small tablet'],
    ['xl', '36rem', '576px', 'Tablet'],
    ['2xl', '42rem', '672px', 'Large tablet'],
    ['3xl', '48rem', '768px', 'Small desktop'],
    ['4xl', '56rem', '896px', 'Medium desktop'],
    ['5xl', '64rem', '1024px', 'Desktop'],
    ['6xl', '72rem', '1152px', 'Large desktop'],
    ['7xl', '80rem', '1280px', 'Extra large'],
    ['8xl', '90rem', '1440px', '2K displays'],
    ['9xl', '100rem', '1600px', 'Ultra wide']
  ] as [token, rem, px, usage]}
    <div class="hbox(between) p(sm) bg(gray-50) r(md)">
      <div class="hbox gap(lg)">
        <code class="font(mono) c(purple-600)">{token}</code>
        <span class="c(gray-600)">{rem}</span>
        <span class="c(gray-500)">{px}</span>
      </div>
      <span class="text(sm) c(gray-500)">{usage}</span>
    </div>
  {/each}
</div>

## Special Container Values

<CodeBlock language="css">
{`/* Special values work with container utilities */
w(auto)      /* width: auto */
w(full)      /* width: 100% */
w(screen)    /* width: 100vw */
w(min)       /* width: min-content */
w(max)       /* width: max-content */
w(fit)       /* width: fit-content */
w(prose)     /* width: 65ch (optimal reading) */`}
</CodeBlock>

## Usage Examples

### Content Containers

<Playground>
  <div class="vbox gap(lg) items(center)">
    <div class="w(sm) p(md) bg(white) r(lg) shadow(md)">
      <h3 class="font(lg) bold mb(sm)">Small Container</h3>
      <p class="c(gray-600)">w(sm) = 24rem = 384px</p>
    </div>
    
    <div class="w(lg) p(md) bg(white) r(lg) shadow(md)">
      <h3 class="font(lg) bold mb(sm)">Large Container</h3>
      <p class="c(gray-600)">w(lg) = 32rem = 512px</p>
    </div>
  </div>
</Playground>

### Max Width Constraints

<Playground>
  <article class="max-w(prose) mx(auto)">
    <h2 class="font(xl) bold mb(md)">Optimal Reading Width</h2>
    <p class="c(gray-700) mb(sm)">
      The `max-w(prose)` utility sets a maximum width of 65 characters, 
      which is considered optimal for reading comfort. This ensures your 
      text content remains readable even on very wide screens.
    </p>
    <p class="c(gray-700)">
      Container tokens make it easy to create consistent, responsive layouts 
      that work across all screen sizes while maintaining readability.
    </p>
  </article>
</Playground>

<CodeBlock language="html">
{`<!-- Article with reading width -->
<article class="max-w(prose) mx(auto)">
  <!-- Content stays at optimal reading width -->
</article>

<!-- Responsive container -->
<div class="w(full) max-w(4xl) mx(auto) px(md)">
  <!-- Full width on mobile, constrained on desktop -->
</div>

<!-- Card grid container -->
<div class="max-w(6xl) mx(auto) grid(1/md:2/lg:3) gap(lg)">
  <!-- Responsive grid within container -->
</div>`}
</CodeBlock>

## Migration Guide

### From Size Tokens
```css
/* Old (v1) - size tokens used for width */
w(3xl)  /* 20rem from size scale */

/* New (v2) - container tokens */
w(xs)   /* 20rem from container scale */
```

### Token Mapping
The container scale starts where the size scale transitions:
- Size tokens: `4xs` to `2xl` (icons/squares)
- Container tokens: `xs` to `9xl` (content widths)

### Backward Compatibility
Size tokens still work with width/height utilities for backward compatibility, but container tokens are preferred for semantic clarity.

## Common Patterns

### Page Layout
<CodeBlock language="html">
{`<!-- Main content wrapper -->
<main class="min-h(screen) max-w(5xl) mx(auto) px(lg)">
  <!-- Page content -->
</main>`}
</CodeBlock>

### Card Container
<CodeBlock language="html">
{`<!-- Card with constrained width -->
<div class="w(full) max-w(md) bg(white) p(lg) r(xl) shadow(lg)">
  <!-- Card content -->
</div>`}
</CodeBlock>

### Responsive Sidebar
<CodeBlock language="html">
{`<!-- Sidebar with responsive width -->
<aside class="w(full) md:w(xs) lg:w(sm) bg(gray-50)">
  <!-- Sidebar content -->
</aside>`}
</CodeBlock>

## Best Practices

1. **Use container tokens for content widths** - They're optimized for typical content containers
2. **Use size tokens for square elements** - Icons, avatars, and decorative squares
3. **Combine with max-width** - Ensure content doesn't stretch too wide on large screens
4. **Consider prose for text** - The `prose` token provides optimal reading width

## Token Reference

### Container Tokens
- Layout containers: `xs`, `sm`, `md`, `lg`, `xl`
- Page sections: `2xl`, `3xl`, `4xl`, `5xl`
- Wide layouts: `6xl`, `7xl`, `8xl`, `9xl`
- Reading width: `prose`

### Size Tokens (for comparison)
- Icons: `4xs`, `3xs`, `2xs`, `xs`, `sm`
- UI elements: `md`, `lg`, `xl`, `2xl`