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
7. **Typography (v2.0)**: Use `text()` for all text properties, `font()` only for font-weight
8. **Responsive Typography**: Use `text(min..max)` for clamp() functionality
9. **Combined Properties**: Use `+` in `text()` for multiple properties: `text(center+uppercase)`

### 7. Typography Syntax (v2.0 - Major Update)
- **Old**: `font()` for font-size, `bold()` for font-weight, separate alignment utilities
- **New**: `text()` for all text properties, `font()` only for font-weight
- **Breaking Changes**:
  - `font(lg)` → `text(lg)`
  - `font(16/1.5)` → `text(16px/1.5)`
  - `bold()` → `font(bold)`
  - `bold(600)` → `font(600)`
  - `center` → `text(center)`
  - `uppercase` → `text(uppercase)`
  - `underline` → `text(underline)`
  - `nowrap` → `text(nowrap)`

#### New `text()` Capabilities:
- **Typography**: `text(lg)`, `text(16px/1.5/-2%)`
- **Responsive Typography**: `text(sm..6xl)`, `text(16px..4vw..48px)`
- **Text Properties**: `text(center)`, `text(uppercase)`, `text(underline)`, `text(nowrap)`
- **Combined Properties**: `text(nowrap+center)`, `text(uppercase+underline)`
- **Mixed Usage**: `text(lg/1.5/center)`, `text(16px/1.4/nowrap+right)`

#### New `font()` Function:
- **Font Weight Only**: `font(bold)`, `font(600)`, `font(semibold)`, `font(light)`

#### Migration Examples:
```css
/* Before (v1) */
font(2xl) bold center uppercase

/* After (v2) */
text(2xl/center+uppercase) font(bold)

/* Before (v1) */
font(16/1.5) bold(600) nowrap

/* After (v2) */
text(16px/1.5/nowrap) font(600)

/* New Responsive Capability (v2) */
text(sm..4xl/1.2/center) font(bold)
```

**Files Updated**: 5 core documentation files updated with new syntax