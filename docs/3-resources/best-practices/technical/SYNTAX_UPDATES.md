# AdorableCSS v2 Syntax Updates

## Summary of Changes Made

### 1. Overflow Syntax
- **Old**: `overflow(hidden)`
- **New**: `clip`
- **Files Updated**: 7 files across components and pages

### 2. Border Syntax
- **Correct**: `bt()`, `br()`, `bb()`, `bl()`
- **Incorrect**: `b-t()`, `b-r()`, `b-b()`, `b-l()`
- **Status**: No incorrect usage found, syntax already correct

### 3. Gradient Syntax
- **Old**: `bg(linear-gradient/135deg/color1/color2)`
- **New**: `bg(color1..color2/135deg)`
- **Examples**:
  - `bg(#fff..#ccc/to-bottom)`
  - `bg(#667eea..#764ba2/135deg)`
  - `bg(#ff6b6b..#4ecdc4..#45b7d1/to-right)`
- **Files Updated**: 5 files with gradient conversions

### 4. Container Utility
- **Old**: `max-w(xl) mx(auto)`
- **New**: `container(xl)`
- **Fixed**: `container(full/px:0)` now properly applies 0 padding

### 5. Positioning with Layer
- **Old**: `absolute top(10) left(20)`
- **New**: `layer(top:10/left:20)`
- **Special Cases**:
  - `layer(fill)` - All sides 0
  - `layer(center)` - Centered positioning
  - `layer(top:20+outside)` - Outside positioning
- **Files Updated**: 4 files with positioning conversions

### 6. Flexbox Alignment
- **hbox()** - Default align-items: center
- **vbox()** - Default align-items: fill (CSS: stretch)
- **Pack Utility**: `hbox(pack)` or `vbox(pack)` centers everything
- **Status**: Already correctly implemented

## Key Conventions to Remember

1. **Use `clip` instead of `overflow(hidden)`**
2. **Border shortcuts are `bt`, `br`, `bb`, `bl` (no hyphens)**
3. **Gradients use `..` syntax: `bg(#color1..#color2/direction)`**
4. **Use `container()` for centered containers with max-width**
5. **Use `layer()` for absolute positioning**
6. **`hbox()` centers vertically by default**