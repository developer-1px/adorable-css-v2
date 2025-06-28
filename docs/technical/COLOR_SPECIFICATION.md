# AdorableCSS Color Specification

## Core Philosophy
AdorableCSS uses a **dot notation** for color opacity, distinct from Tailwind's slash notation. This provides a cleaner, more consistent syntax that aligns with CSS custom properties.

## Color Opacity Syntax

### ✅ Correct AdorableCSS Syntax
```css
/* Basic colors with opacity */
c(white.5)      /* rgba(255,255,255,0.5) */
c(black.2)      /* rgba(0,0,0,0.2) */
c(white.05)     /* rgba(255,255,255,0.05) */

/* Color tokens with opacity */
c(purple-500.8)  /* color-mix(in srgb, var(--purple-500) 80%, transparent) */
c(gray-900.95)   /* color-mix(in srgb, var(--gray-900) 95%, transparent) */

/* Background colors */
bg(white.1)      /* background with 10% opacity */
bg(black.05)     /* background with 5% opacity */
```

### ❌ Incorrect Syntax (Tailwind-style)
```css
/* DO NOT USE - This is Tailwind syntax */
c(white/50)      /* Wrong */
bg(white/10)     /* Wrong */
c(black/20)      /* Wrong */
bg(purple-500/80) /* Wrong */
```

## Why Dot Notation?

1. **Clarity**: The dot clearly indicates a property of the color (its opacity)
2. **No Conflicts**: Slash is reserved for other uses (gradients, directions)
3. **Consistency**: Aligns with JavaScript property access syntax
4. **Simplicity**: Easier to parse and less ambiguous

## Opacity Values

- **Decimal format**: `0.1` to `0.9` (written as `.1` to `.9`)
- **Percentage format**: `0.05` for 5%, `0.95` for 95%
- **No percentage sign**: Just use the decimal value

### Examples:
```css
.1   = 10% opacity
.5   = 50% opacity  
.05  = 5% opacity
.95  = 95% opacity
```

## Special Cases

### Gradients
Gradients continue to use slash for direction:
```css
bg(135deg/purple-500..pink-500)  /* Gradient direction uses slash */
bg(to-br/primary..accent)         /* Named directions with slash */
```

### Complex Colors
```css
/* Semantic colors with opacity */
c(primary.8)         /* 80% opacity primary color */
c(text-primary.9)    /* 90% opacity text color */

/* Border colors */
border(gray-200.5)   /* 50% opacity border */
```

## Implementation Details

The `makeColor` function in `core/values/makeValue.ts` handles the dot notation:
- Splits on `.` to extract color and alpha
- Converts basic colors to rgba
- Uses `color-mix()` for CSS variables (modern browsers)

## Migration Guide

When converting from Tailwind or legacy syntax:
1. Replace `/` with `.` for opacity
2. Convert percentage values to decimals
3. Remove `%` symbols

```diff
- bg(white/10)
+ bg(white.1)

- c(black/50)
+ c(black.5)

- border(gray-500/20)
+ border(gray-500.2)
```

## Consistency Rules

1. **Always use dot notation** for color opacity
2. **Never mix syntaxes** in the same project
3. **Document any exceptions** clearly
4. **Enforce through linting** where possible

---

This is the official AdorableCSS color specification. All new code should follow this standard.