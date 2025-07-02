# Position Coordinate Syntax

AdorableCSS v2 introduces a powerful coordinate-based positioning syntax that makes element positioning more intuitive and concise.

## Basic Syntax

Use parentheses with comma-separated x,y coordinates:

```css
/* Basic positioning */
(0,0)              /* top: 0; left: 0; */
(100px,50px)       /* top: 50px; left: 100px; */
(50%,100%)         /* top: 100%; left: 50%; */
```

## Special Keywords

### Edge Keywords
- `left`, `right`, `top`, `bottom`
- `start`, `end` (aliases for left/top and right/bottom)

```css
(left,top)         /* top: 0; left: 0; */
(right,bottom)     /* bottom: 0; right: 0; */
(center,top)       /* top: 0; left: 50%; transform: translateX(-50%); */
```

### Center Keyword
The `center` keyword automatically adds the appropriate transform:

```css
(center,center)    /* Perfectly centered with transforms */
/* Generates:
   position: absolute;
   left: 50%;
   top: 50%;
   transform: translateX(-50%) translateY(-50%);
*/
```

## Arithmetic Expressions

You can use `+` and `-` operators with keywords:

```css
/* Center with offsets */
(center+20,top)         /* 20px right of center */
(center-xs,center)      /* xs spacing left of center */

/* Edge with offsets */
(left+sm,bottom-10)     /* sm spacing from left, 10px up from bottom */
(right-20,top+lg)       /* 20px in from right, lg spacing down from top */

/* Percentage with offsets */
(100%-20,50%+xs)        /* 20px from right edge, xs below middle */
```

## Token Support

Spacing and size tokens work seamlessly:

```css
(sm,lg)            /* Uses spacing tokens */
(left+xl,top+xs)   /* Combines keywords with tokens */
```

## Usage Examples

### Tooltip Below Element
```html
<!-- Old way -->
<div class="absolute top(100%) left(50%) translate(-50%,0)">

<!-- New way -->
<div class="absolute (center,100%)">
```

### Dropdown Menu
```html
<!-- Positioned below and aligned to the right -->
<div class="absolute (right,100%+xs)">
```

### Modal Centered
```html
<!-- Perfect center -->
<div class="fixed (center,center)">
```

### Notification Badge
```html
<!-- Top-right corner with slight offset -->
<div class="absolute (100%-xs,-xs)">
```

## Combining with Position Utilities

The coordinate syntax works with all position utilities:

```css
absolute (center,center)
fixed (0,0)
relative (10,10)
```

## Future Enhancements

Coming soon:
- Range/clamp syntax: `(..0,10..20)` for responsive constraints
- More arithmetic operations
- Viewport-relative positioning