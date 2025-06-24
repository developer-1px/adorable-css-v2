# AdorableCSS v2 Reference

## Positioning

### Absolute Positioning
- `y(center)` - Centers vertically (top: 50%, transform: translateY(-50%))
- `x(center)` - Centers horizontally (left: 50%, transform: translateX(-50%))
- `xy(center)` - Centers both axes
- `inset(0)` - All sides 0
- `inset(10)` - All sides 10px
- `inset-x(20)` - Left & right 20px
- `inset-y(20)` - Top & bottom 20px

### Position Values
- `absolute`, `relative`, `fixed`, `sticky`
- `top(10)`, `right(10)`, `bottom(10)`, `left(10)`
- `layer(top:10+left:20)` - Combined positioning

## Layout

### Flexbox
- `hbox` - Horizontal flex container
- `vbox` - Vertical flex container
- `hbox(center)` - Align items center
- `hbox(pack)` - Center both axes (justify-content: center, align-items: center)
- `gap(auto)` - Auto spacing between flexbox items
- `vbox(end)` - Align to end
- `gap(16)` - Gap between items

### Sizing
- `w(100)`, `h(100)` - Fixed size
- `w(fill)`, `h(fill)` - 100%
- `w(hug)`, `h(hug)` - Fit content
- `w(100..400)` - Min/max constraints

## Typography

### Font Utility
- `font(14)` - Font size 14px
- `font(Inter/16/1.5/-2%)` - Family/size/line-height/letter-spacing
- Weight modifiers: `thin`, `light`, `regular`, `medium`, `semibold`, `bold`, `heavy`
- `100` to `900` - Numeric weights

### Text Utilities
- `text(center)`, `text(left)`, `text(right)`
- `uppercase`, `lowercase`, `capitalize`
- `italic`, `underline`, `line-through`
- `truncate` - Text overflow ellipsis
- `nowrap`, `pre`, `pre-wrap`
- `tracking(.05em)` - Letter spacing

## Colors

### Text Color
- `c(#000)` - Hex color
- `c(#000.5)` - With opacity
- `c(red)` - Named colors
- `c(red..blue)` - Gradient text

### Background
- `bg(#fff)`
- `bg(#000.5)` - With opacity
- `bg(gradient/135deg/#667eea/#764ba2)` - Gradient
- `bg(radial/#667eea/#764ba2)` - Radial gradient

## Spacing

### Padding/Margin
- `p(16)` - All sides
- `px(16)` - Horizontal
- `py(16)` - Vertical
- `pt(16)`, `pr(16)`, `pb(16)`, `pl(16)` - Individual
- `p(16/24)` - Vertical/horizontal
- `p(10/20/30/40)` - Top/right/bottom/left

## Borders & Radius

### Border
- `border(1/#e5e5e5)` - Width/color
- `border-top(1/#000)`
- `border(2/dashed/#000)` - Width/style/color

### Border Radius
- `r(8)` - All corners
- `r(8/8/0/0)` - Individual corners
- `r()` - Circle (50%)

## Effects

### Shadow
- `shadow(sm)`, `shadow(md)`, `shadow(lg)`
- `shadow(0/4px/6px/#0000001a)` - Custom shadow
- `shadow(inset/0/2px/4px/#000.2)` - Inset shadow

### Filters
- `blur(10)` - Blur filter
- `backdrop(blur/10)` - Backdrop filter
- `opacity(.5)` - Opacity

## Animation

### Transition
- `transition` - Default transition
- `transition-all` - All properties
- `duration(200)` - Duration

### Transform
- `scale(1.05)`
- `translate(10/20)` - X/Y
- `rotate(45)`

## Display

- `hidden` - display: none
- `block`, `inline`, `inline-block`
- `flex` - flex: 1
- `grid(3)` - 3 columns
- `grid(1/3)` - Responsive grid

## Utilities

### Overflow
- `clip` - overflow: hidden
- `clip(none)` - overflow: visible
- `scroll(x)` - overflow-x: auto
- `scroll(y)` - overflow-y: auto
- `scroll` - overflow: auto

### Cursor
- `cursor(pointer)`, `cursor(not-allowed)`

### Pointer Events
- `pointer(none)` - pointer-events: none

### User Select
- `select(none)` - user-select: none
- `select(all)` - user-select: all
- `select(text)` - user-select: text

### Z-index
- `z(10)`, `z(50)`, `z(auto)`

### Appearance
- `appearance(none)` - Remove native styling

## Pseudo Classes

Prefix any utility:
- `hover:bg(#000)`
- `focus:border(1/#000)`
- `active:scale(0.98)`
- `disabled:opacity(.5)`

## Responsive

Prefix any utility:
- `sm:hidden` - Hidden on small+
- `md:grid(2)` - 2 columns on medium+
- `lg:font(20)` - Font 20 on large+
- `~sm:hidden` - Hidden below small