# CSS @layer Migration Guide

## Overview

The AdorableCSS v2 CSS generation system has been migrated from a priority-based specificity hack system to use native CSS `@layer` for cascade management.

## What Changed

### Before (Priority-based with Specificity Hacks)
```css
/* Component rule (priority 100) */
.card { color: white; }

/* Utility rule (priority 300) - doubled selector for higher specificity */
.c\(red\).c\(red\) { color: red; }
```

### After (Layer-based)
```css
@layer component, layout, utility, state;

@layer component {
  .card { color: white; }
}

@layer utility {
  .c\(red\) { color: red; }
}
```

## Benefits

1. **No Specificity Hacks**: Clean, single selectors instead of doubled selectors
2. **Native CSS Feature**: Uses standard CSS `@layer` for predictable cascade
3. **Better DevTools**: Layers are visible and debuggable in browser DevTools
4. **Simpler Code**: Removed complex specificity calculation logic
5. **Better Performance**: Less CSS output, cleaner selectors

## Layer Mapping

The priority system maps to layers as follows:

- `RulePriority.COMPONENT (100)` → `@layer component`
- `RulePriority.LAYOUT (200)` → `@layer layout`  
- `RulePriority.UTILITY (300)` → `@layer utility`
- `RulePriority.STATE (400)` → `@layer state`

## Implementation Details

### Changes Made

1. **Updated `priority-registry.ts`**:
   - Added `getLayerFromPriority()` method
   - Simplified `getSpecificitySelector()` to return base selector
   - Modified `generateCSS()` to wrap rules in `@layer`

2. **Updated `generator.ts`**:
   - Added layer definition at start of CSS output
   - Modified CSS generation to group rules by layer
   - Removed specificity boosting logic

3. **Backward Compatibility**:
   - All existing APIs remain unchanged
   - Priority values still used internally, mapped to layers
   - No breaking changes for users

## Example Output

Input:
```html
<div class="card hbox c(red) p(24) hover:bg(gray-100)">
```

Output:
```css
@layer component, layout, utility, state;

@layer component {
  .card { /* card styles */ }
}

@layer layout {
  .hbox { /* flexbox styles */ }
  .p\(24\) { padding: 24px; }
}

@layer utility {
  .c\(red\) { color: red; }
}

@layer state {
  .hover\:bg\(gray-100\):hover { background-color: var(--gray-100); }
}
```

## Notes

- Padding (`p`) is classified as a layout rule, not utility (following Figma's Auto Layout model)
- State selectors (hover, focus) need additional handling for proper layer assignment
- The layer order ensures utilities always override components, maintaining expected behavior