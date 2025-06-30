# AdorableCSS v2 Features

## Core Features

### 🎯 Position Coordinates (NEW)
Intuitive coordinate-based positioning system for precise element placement.

```css
/* Center positioning with automatic transforms */
(center,center)    /* Perfect centering */
(center,top)       /* Horizontally centered */

/* Edge positioning */
(left,top)         /* Top-left corner */
(right,bottom)     /* Bottom-right corner */

/* Arithmetic expressions */
(center+20,top)    /* 20px right of center */
(100%-xs,bottom-sm) /* xs from right, sm from bottom */

/* Real-world examples */
absolute (center,100%+xs)  /* Tooltip below element */
fixed (center,center)      /* Centered modal */
absolute (right-xs,top-xs) /* Notification badge */
```

### 📐 Size Utility
Unified sizing utility with multiple patterns:

```css
size(64)          /* 64x64 square */
size(sm)          /* Token-based sizing */
size(16:9)        /* Aspect ratio */
size(320x200)     /* Explicit dimensions */
size(text)        /* Size to content */
```

### 🎨 OKLCH Color System
Modern perceptually uniform color space with 300+ colors:

```css
c(purple-500)     /* OKLCH color */
bg(gray-100.5)    /* 50% opacity */
c(45deg/purple-500..pink-500) /* Gradient text */
```

### 📦 Figma Auto Layout
Direct mapping to Figma's layout concepts:

```css
hbox()            /* Horizontal layout */
vbox()            /* Vertical layout */
w(fill)           /* Fill container */
w(hug)            /* Hug contents */
gap(md)           /* Spacing between items */
```

### 🚀 Zero Runtime Overhead
- All styles computed at build time
- No JavaScript required for styling
- Minimal CSS output with efficient rule generation

### 🔌 Extensible Architecture
- Plugin system for custom rules
- Design token customization
- Framework-agnostic core

### ⚡ Importance (!) Feature
Fine-grained specificity control without !important:

```css
/* Single ! adds one [class] selector */
p(16)!    → [class].p\(16\)\!     /* specificity: 0-1-1 */

/* Double !! adds two [class] selectors */
p(16)!!   → [class][class].p\(16\)\!\!  /* specificity: 0-2-1 */

/* Works with all features */
hover:bg(blue)!    → [class].hover\:bg\(blue\)\!:hover
md:w(full)!        → @media (min-width: 768px) { [class].md\:w\(full\)\! }
```

## Recent Updates

### v2.0.0-beta (Current)
- ✅ Position coordinate syntax
- ✅ Enhanced size() utility
- ✅ OKLCH color system integration
- ✅ Improved TypeScript support
- ✅ Monorepo architecture
- ✅ Importance (!) feature for specificity control
- ✅ Border color with default 1px width

### Coming Soon
- 🔜 Range/clamp syntax for responsive constraints
- 🔜 Advanced animation utilities
- 🔜 Form component system
- 🔜 Print media utilities