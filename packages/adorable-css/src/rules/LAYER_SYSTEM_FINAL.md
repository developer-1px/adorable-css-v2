# CSS @layer System - Final Implementation

## Overview

AdorableCSS v2 now uses native CSS `@layer` for cascade management instead of specificity hacks.

## How It Works

### 1. Layer Definition
Every CSS output starts with:
```css
@layer component, layout, utility, state;
```

This defines the cascade order - later layers win over earlier ones.

### 2. Layer Mapping
- **Component rules** (priority 100) → `@layer component`
- **Layout rules** (priority 200) → `@layer layout`
- **Utility rules** (priority 300) → `@layer utility`
- **State rules** (priority 400) → `@layer state`

### 3. Clean Output Structure
```css
@layer component, layout, utility, state;

@layer component {
  .card { /* component styles */ }
  .btn { /* component styles */ }
}

@layer layout {
  .hbox { /* flexbox layout */ }
  .p(24) { padding: 24px; }
}

@layer utility {
  .c(red) { color: red; }
  .bg(white) { background: white; }
}

/* Media queries come after layers */
@media (min-width: 768px) {
  .md\:hidden { display: none; }
}
```

## Benefits

1. **No Specificity Hacks**: No more `.c(red).c(red)` doubled selectors
2. **Predictable Cascade**: Layer order determines precedence, not selector complexity
3. **Better Performance**: Cleaner CSS, smaller file size
4. **Native CSS Feature**: Works with browser DevTools
5. **Future-Proof**: Aligns with CSS standards

## Technical Details

### What Changed
1. `priority-registry.ts`: Added layer mapping, removed specificity boosting
2. `generator.ts`: Groups CSS by layers, handles media queries separately
3. All rules maintain single selectors - no doubling

### Remaining Issues to Fix
1. Better formatting of `:where()` selectors
2. Improved media query grouping
3. State selectors could be moved to state layer consistently

## Migration Impact

**Zero Breaking Changes** - The API remains identical. Only the CSS output format has changed, using modern CSS layers instead of specificity hacks.