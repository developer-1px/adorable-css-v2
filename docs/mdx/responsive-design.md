---
title: Responsive Design
description: Master responsive design in AdorableCSS with intuitive breakpoint prefixes for creating adaptive layouts.
---

# Responsive Design

AdorableCSS provides a powerful and intuitive system for building responsive layouts that adapt to any screen size. Instead of complex media query syntax, you can use simple prefixes on any utility class.

## Breakpoint Prefixes

To apply a utility at a specific breakpoint, just add a prefix like `md:` or `lg:`. This applies the style from that breakpoint and up (min-width).

For example, `w(1/2)` sets an element's width to 50%. To apply this only on medium screens and larger, you would use `md:w(1/2)`.

```html
<div class="w(full) md:w(1/2) lg:w(1/3)">
  <!-- 
    - full width by default
    - 50% width on medium screens (>= 768px)
    - 33.3% width on large screens (>= 1024px)
  -->
</div>
```

## Max-width Prefixes

Sometimes you need to apply styles _up to_ a certain breakpoint (max-width). For this, AdorableCSS uses a `..` prefix. For example, `..md:hidden` will hide an element on screens smaller than the medium breakpoint.

This is useful for mobile-first designs where you define mobile styles by default and override them on larger screens.

```html
<div class="vbox ..md:hidden">
  <!-- This element is a vertical flex container by default, but hidden on screens smaller than 768px -->
</div>
```

## Available Breakpoints

Here are the default breakpoints available in AdorableCSS. You can customize them in your configuration.

| Prefix | Breakpoint | CSS                          |
| ------ | ---------- | ---------------------------- |
| `sm`   | 640px      | `@media (min-width: 640px)`  |
| `md`   | 768px      | `@media (min-width: 768px)`  |
| `lg`   | 1024px     | `@media (min-width: 1024px)` |
| `xl`   | 1280px     | `@media (min-width: 1280px)` |
| `2xl`  | 1536px     | `@media (min-width: 1536px)` |
| `3xl`  | 1920px     | `@media (min-width: 1920px)` |
| `4xl`  | 2560px     | `@media (min-width: 2560px)` |
| `5xl`  | 3200px     | `@media (min-width: 3200px)` |
| `6xl`  | 3840px     | `@media (min-width: 3840px)` |
| `7xl`  | 4096px     | `@media (min-width: 4096px)` |

## Practical Example: Responsive Card

Let's build a card component that changes its layout from vertical on mobile to horizontal on larger screens.

```html
<div class="bg(white) r(lg) shadow(md) overflow(hidden) md:hbox">
  <div class="w(full) h(48) md:w(48) md:h(auto)">
    <img
      class="w(full) h(full) object(cover)"
      src="/path/to/image.jpg"
      alt=""
    />
  </div>
  <div class="p(6) vbox gap(2)">
    <h3 class="font(lg) bold">Card Title</h3>
    <p class="c(gray-600)">
      This is a description of the card. It is quite long and will wrap to
      multiple lines.
    </p>
  </div>
</div>
```

**Breakdown:**

1.  **`md:hbox`**: The card is a standard block element by default. On medium screens (`md:`) and up, it becomes a horizontal flex container (`hbox`).
2.  **Image Sizing**:
    - On mobile, the image container is `w(full) h(48)`.
    - On `md` screens, it becomes `md:w(48) md:h(auto)` to fit the horizontal layout.
3.  **No other changes needed**: The text content area with `p(6) vbox gap(2)` works perfectly on all screen sizes.

This example shows how easily you can create fully responsive components by adding a few prefixes.
