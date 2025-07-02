# AdorableCSS v2 Reference

## Positioning

### Layer Utility (Recommended)
- `layer()` or `layer(fill)` - Covers entire parent (position: absolute, all sides 0)
- `layer(center)` - Centers element (top: 50%, left: 50%, transform: translate(-50%, -50%))
- `layer(top:20)` - Positioned from top
- `layer(top:20+left:30)` - Multiple positions
- `layer(top:20+outside)` - Outside positioning (bottom: calc(100% + 20px))
- `layer(top:-20+right:-40)` - Negative positioning

### Legacy Positioning
- `absolute`, `relative`, `fixed`, `sticky`, `static`
- `top(10)`, `right(10)`, `bottom(10)`, `left(10)`
- `z(10)`, `z(top)` - Z-index (z(top) = 9999)

## Layout

### Flexbox (v2 Enhanced)
- `hbox()` - Horizontal flex (align-items: center by default)
- `vbox()` - Vertical flex (align-items: stretch by default)
- `hbox(pack)` or `vbox(pack)` - Center all (justify-content: center, align-items: center)

#### Horizontal Box (hbox) Alignment
- `hbox(top)` - Align top (align-items: flex-start)
- `hbox(middle)` - Align middle (align-items: center) [default]
- `hbox(bottom)` - Align bottom (align-items: flex-end)
- `hbox(fill)` - Stretch items (align-items: stretch)

#### Horizontal Box (hbox) Justification
- `hbox(left)` - Justify left (justify-content: flex-start)
- `hbox(center)` - Justify center (justify-content: center)
- `hbox(right)` - Justify right (justify-content: flex-end)

#### Vertical Box (vbox) Alignment
- `vbox(left)` - Align left (align-items: flex-start)
- `vbox(center)` - Align center (align-items: center)
- `vbox(right)` - Align right (align-items: flex-end)
- `vbox(fill)` - Stretch items (align-items: stretch) [default]

#### Vertical Box (vbox) Justification
- `vbox(top)` - Justify top (justify-content: flex-start)
- `vbox(middle)` - Justify middle (justify-content: center)
- `vbox(bottom)` - Justify bottom (justify-content: flex-end)

#### Combined Modifiers
- `hbox(center+middle)` - Center horizontally and vertically
- `hbox(right+bottom)` - Right bottom alignment
- `hbox(left+middle+reverse)` - Flex-direction: row-reverse
- `hbox(center+wrap)` - With flex-wrap

#### Special Cases
- `gap(auto)` - Space between items (justify-content: space-between)
- `gap(16)` - Gap between items
- `pack()` - Shorthand for hbox(center+middle)
- `wrap()` - hbox with flex-wrap

### Container Utility (New)
- `container()` - Default container (max-width: 1280px, auto margins, responsive padding)
- `container(sm)` - Small container (640px)
- `container(md)` - Medium container (768px)
- `container(lg)` - Large container (1024px)
- `container(xl)` - Extra large container (1280px)
- `container(2xl)` - 2x large container (1536px)
- `container(7xl)` - 7x large container (4480px)
- `container(full)` - Full width container
- `container(narrow)` - Narrow container (600px)
- `container(wide)` - Wide container (1600px)

#### Container with Padding
- `container(xl/px:0)` - No padding
- `container(xl/px:sm)` - Small padding (0.5rem)
- `container(xl/px:lg)` - Large padding (1.5rem)
- `container(xl/px:lg+md)` - Asymmetric padding (left: 1.5rem, right: 1rem)

### Sizing
- `w(100)`, `h(100)` - Fixed size
- `w(fill)`, `h(fill)` - 100%
- `w(hug)`, `h(hug)` - Fit content
- `w(200..400)` - Min/max constraints
- `w(100~200~300)` - Min/preferred/max
- `min-w(100)`, `max-w(400)`, `min-h(50)`, `max-h(200)`

### Grid
- `grid` - Display grid
- `grid-cols(3)` - 3 columns
- `grid-rows(2)` - 2 rows

## Typography

### Font Utility
- `font(16)` - Font size only
- `font(Inter/16/1.5/0.05em)` - Family/size/line-height/letter-spacing
- `font(3xl)` - Token size (3xl = 1.875rem)
- `font-family(Inter)` - Font family only

### Font Weights
- `thin` (200), `light` (300), `regular` (normal)
- `medium` (500), `semibold` (600), `bold` (bold), `heavy` (900)
- `100` to `900` - Numeric weights

### Text Utilities
- `text(center)`, `text(left)`, `text(right)`, `text(justify)`
- `uppercase`, `lowercase`, `capitalize`
- `italic`, `underline`, `line-through`, `no-underline`
- `truncate` - Text overflow ellipsis
- `nowrap`, `pre`, `pre-wrap`
- `line-height(1.5)` or `line-height(relaxed)`
- `letter-spacing(0.05em)` or `letter-spacing(wide)`
- `underline-offset(4)`

### Gradient Text (New)
- `bg-clip(text)` - Background clip for gradient text
- `text-fill-color(transparent)` - Make text transparent
- Usage: `bg(linear-gradient(...)) bg-clip(text) text-fill-color(transparent)`

## Colors

### Text Color
- `c(#000)` - Hex color
- `c(#000/50)` - With opacity (50%)
- `c(red)`, `c(blue-500)` - Named/token colors
- `c(--custom-var)` - CSS variable

### Background
- `bg(#fff)` - Solid color
- `bg(#000/50)` - With opacity
- `bg(linear-gradient(to_right,#667eea,#764ba2))` - Linear gradient
- `bg(linear-gradient(135deg,#667eea_0%,#764ba2_100%))` - With stops
- `bg(radial-gradient(circle,#667eea,#764ba2))` - Radial gradient

### Border Color (New)
- `bc(gray-200)` - All borders
- `btc(red)` - Top border color
- `brc(blue)` - Right border color
- `bbc(green)` - Bottom border color
- `blc(purple)` - Left border color

## Spacing

### Padding/Margin
- `p(16)` - All sides
- `px(16)` - Horizontal (left & right)
- `py(16)` - Vertical (top & bottom)
- `pt(16)`, `pr(16)`, `pb(16)`, `pl(16)` - Individual sides
- `p(16/24)` - Vertical/horizontal
- `p(10/20/30/40)` - Top/right/bottom/left
- Same patterns for margin: `m()`, `mx()`, `my()`, etc.

## Borders & Radius

### Border
- `b(1/gray-200)` - Width/color
- `bt(2/blue-500)` - Top border
- `br(1/red)` - Right border
- `bb(1/green)` - Bottom border
- `bl(1/purple)` - Left border
- `bx(1/gray)` - Horizontal borders
- `by(1/gray)` - Vertical borders
- `b(2/dashed/black)` - Width/style/color

### Border Radius
- `r(8)` - All corners 8px
- `r(lg)` - Large radius (token)
- `r(full)` - Fully rounded (9999px)
- `r(8/16)` - Top/bottom different
- `r(8/16/24/32)` - All corners different
- `rt(8)`, `rr(8)`, `rb(8)`, `rl(8)` - Individual sides

## Effects

### Shadow
- `shadow(sm)`, `shadow(md)`, `shadow(lg)`, `shadow(xl)`, `shadow(2xl)`
- `shadow(0_4px_6px_rgba(0,0,0,0.1))` - Custom shadow
- `shadow(inset_0_2px_4px_rgba(0,0,0,0.2))` - Inset shadow

### Filters
- `blur(10)` - Blur filter
- `backdrop-blur(10)` - Backdrop blur
- `opacity(50)` - Opacity 50%
- `saturate(150)` - Saturation
- `brightness(90)` - Brightness
- `contrast(120)` - Contrast

### Transform
- `scale(1.05)` - Scale 1.05
- `scale-x(110)`, `scale-y(90)` - Directional scale
- `translate-x(10)`, `translate-y(-20)` - Translation
- `rotate(45)`, `rotate(-15)` - Rotation
- `skew-x(10)`, `skew-y(5)` - Skew
- `transform(rotate(45)+scale(1.1))` - Combined transforms
- `transform-origin(center)`, `transform-origin(top_left)`

### 3D Transforms (New)
- `perspective(1000)` - Perspective
- `transform-style(preserve-3d)` - 3D transform style
- `rotate-x(45)`, `rotate-y(45)`, `rotate-z(45)` - 3D rotations
- `translate-z(10)` - Z translation

## Animation

### Transition
- `transition` - Default all 150ms
- `transition(300)` - Custom duration
- `transition(opacity_300ms_ease-in-out)` - Specific property
- `duration(200)` - Transition duration
- `ease-in`, `ease-out`, `ease-in-out`, `ease-linear`

### Animation
- `animate(spin)` - Spin animation
- `animate(ping)` - Ping animation
- `animate(pulse)` - Pulse animation
- `animate(bounce)` - Bounce animation
- `animation-delay(100)` - Delay
- `animation-duration(2s)` - Duration

## Display & Visibility

### Display
- `hidden` - display: none
- `block`, `inline`, `inline-block`
- `flex`, `inline-flex` - Display flex
- `flex(1)` - flex: 1 1 0%
- `grid`, `inline-grid` - Display grid

### Visibility
- `visible`, `invisible` - Visibility
- `opacity(0)` to `opacity(100)` - Opacity levels

## Overflow & Scrolling

### Overflow
- `overflow(hidden)`, `overflow(auto)`, `overflow(visible)`, `overflow(scroll)`
- `overflow-x(auto)`, `overflow-y(hidden)` - Directional
- `clip` - Shorthand for overflow(hidden)
- `scroll` - Shorthand for overflow(auto)
- `scroll(x)` - overflow-x: auto
- `scroll(y)` - overflow-y: auto

### Scroll Margin (New)
- `scroll-mt(20)` - Scroll margin top
- `scroll-mb(20)` - Scroll margin bottom
- `scroll-ml(20)` - Scroll margin left
- `scroll-mr(20)` - Scroll margin right
- `scroll-m(20)` - All sides

## Interactivity

### Cursor
- `cursor(pointer)`, `cursor(default)`, `cursor(not-allowed)`
- `cursor(grab)`, `cursor(grabbing)`
- `cursor(wait)`, `cursor(text)`, `cursor(move)`

### Pointer Events
- `pointer-events(none)` - Disable pointer events
- `pointer-events(auto)` - Enable pointer events

### User Select
- `select(none)` - Disable selection
- `select(text)` - Text selection only
- `select(all)` - Select all on click
- `select(auto)` - Default behavior

### Resize
- `resize(none)`, `resize(both)`
- `resize(horizontal)`, `resize(vertical)`

## Pseudo Classes & States

Prefix any utility:
- `hover:bg(blue-500)` - Hover state
- `focus:ring(2/blue-500)` - Focus state
- `active:scale(0.95)` - Active state
- `disabled:opacity(50)` - Disabled state
- `group-hover:opacity(100)` - Group hover
- `peer-checked:bg(green-500)` - Peer states
- `first:mt(0)` - First child
- `last:mb(0)` - Last child
- `odd:bg(gray-50)` - Odd children
- `even:bg(white)` - Even children

## Responsive Design

### Breakpoint Prefixes
- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up
- `2xl:` - 1536px and up

### Max-width Breakpoints
- `~sm:` - Below 640px
- `~md:` - Below 768px
- `~lg:` - Below 1024px
- `~xl:` - Below 1280px

### Examples
- `hidden md:block` - Hidden on mobile, visible on desktop
- `grid(1) md:grid(2) lg:grid(3)` - Responsive grid
- `font(sm) lg:font(lg)` - Responsive typography

## Special Utilities

### Aspect Ratio
- `aspect(16/9)` - 16:9 aspect ratio
- `aspect(1/1)` - Square
- `aspect(4/3)` - 4:3 ratio

### Object Fit
- `object(cover)`, `object(contain)`
- `object(fill)`, `object(none)`, `object(scale-down)`

### Screen Reader
- `sr-only` - Visually hidden but accessible
- `not-sr-only` - Undo sr-only

## Plugins

### Glass Effect
- `glass()` - Basic glassmorphism
- `glass(20)` - Custom blur amount
- `glass(20/0.2)` - Blur/opacity
- `glass(20/0.2/white)` - Blur/opacity/color

### Glow Effect
- `glow()` - Default glow
- `glow(blue)` - Colored glow
- `glow(20/blue)` - Size/color
- `glow(10/20/blue)` - X/Y/color

### Card Styles
- `card()` - Basic card
- `card(elevated)` - Elevated card
- `card(outlined)` - Outlined card
- `card(interactive)` - Interactive card

## Design Tokens

AdorableCSS v2 includes comprehensive design tokens for:
- **Colors**: Full color palette with 11 shades per color
- **Spacing**: Consistent spacing scale (xs to 3xl)
- **Typography**: Font sizes, line heights, letter spacing
- **Shadows**: Elevation system (sm to 2xl)
- **Radius**: Border radius scale
- **Breakpoints**: Responsive design breakpoints

Access tokens via their names in utilities:
- `bg(blue-500)` - Color token
- `p(lg)` - Spacing token
- `font(2xl)` - Typography token
- `shadow(md)` - Shadow token
- `r(lg)` - Radius token