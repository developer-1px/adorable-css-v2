# AdorableCSS Design System

> ⚠️ **DEPRECATED**: This document contains outdated syntax and is kept for historical reference only.  
> For current design system guide, see [DESIGN_SYSTEM_OVERVIEW.md](../DESIGN_SYSTEM_OVERVIEW.md)

The AdorableCSS Design System provides a comprehensive set of utilities that ensure consistent, beautiful designs without manual effort. It includes layout utilities, typography systems, components, and visual utilities.

## 📐 Layout System

### Section Utilities
Consistent page sections with automatic spacing:

```html
<!-- Default section with balanced padding -->
<section class="section()">

<!-- Hero section with full height -->
<section class="section(hero)">

<!-- Feature section with generous padding -->
<section class="section(feature)">

<!-- Compact section for dense content -->
<section class="section(compact)">

<!-- Flush section with no vertical padding -->
<section class="section(flush)">
```

### Container System
Responsive containers with consistent max-widths:

```html
<!-- Default container (max-width: 64rem) -->
<div class="contain()">

<!-- Narrow container for text (max-width: 48rem) -->
<div class="contain(narrow)">

<!-- Wide container (max-width: 80rem) -->
<div class="contain(wide)">

<!-- Full width container (max-width: 96rem) -->
<div class="contain(full)">
```

### Content Layout
Structured content blocks:

```html
<!-- Basic content block -->
<div class="content()">

<!-- Centered content -->
<div class="content(centered)">

<!-- Hero content layout -->
<div class="content(hero)">
```

### Stack & Flow
Vertical layouts and text flow:

```html
<!-- Vertical stack with consistent gaps -->
<div class="stack()">     <!-- default gap: md -->
<div class="stack(lg)">   <!-- large gap -->
<div class="stack(2xl)">  <!-- extra large gap -->

<!-- Text flow with optimal line width -->
<p class="flow()">        <!-- max-width: 65ch -->
<p class="flow(narrow)">  <!-- max-width: 45ch -->
<p class="flow(wide)">    <!-- max-width: 75ch -->
```

## 📝 Typography System

### Special Text Styles

```html
<!-- Hero text with responsive sizing -->
<h1 class="hero-text()">Big Title</h1>

<!-- Lead paragraph text -->
<p class="lead()">Introduction text with larger size</p>

<!-- Small caption text -->
<p class="caption()">Photo credit or small note</p>

<!-- Label text (uppercase, small) -->
<span class="label()">Category</span>
```

## 🎨 Component System

### Cards
Multiple card styles with hover effects:

```html
<!-- Base card style -->
<div class="card-base()">

<!-- Card with hover effect -->
<div class="card-base() card-hover()">

<!-- Card with gradient background -->
<div class="card-gradient(135deg/purple-500,pink-500)">
```

### Buttons
Consistent button styling:

```html
<!-- Button base (combine with variants) -->
<button class="btn-base() btn-primary()">Primary Action</button>
<button class="btn-base() btn-secondary()">Secondary</button>
<button class="btn-base() btn-ghost()">Ghost Button</button>
```

### Badges
Labels and status indicators:

```html
<!-- Default badge -->
<span class="badge()">New</span>

<!-- Colored badges -->
<span class="badge(success)">Active</span>
<span class="badge(warning)">Pending</span>
<span class="badge(error)">Failed</span>
<span class="badge(info)">Info</span>
```

### Alerts
Notification messages:

```html
<!-- Default alert -->
<div class="alert()">Default message</div>

<!-- Colored alerts -->
<div class="alert(success)">Success! Your changes were saved.</div>
<div class="alert(warning)">Warning: Please review your input.</div>
<div class="alert(error)">Error: Something went wrong.</div>
<div class="alert(info)">Info: New features available.</div>
```

## 🔲 Grid System

### Feature Grid
Auto-responsive grid for features:

```html
<!-- Automatically responsive feature grid -->
<div class="feature-grid()">
  <div>Feature 1</div>
  <div>Feature 2</div>
  <div>Feature 3</div>
</div>

<!-- Card grid with different sizing -->
<div class="card-grid()">
  <div class="card()">Card 1</div>
  <div class="card()">Card 2</div>
</div>
```

## ✨ Visual Utilities

### Dividers
Visual separation elements:

```html
<!-- Horizontal divider -->
<hr class="divider()">

<!-- Vertical divider -->
<div class="divider(vertical)">

<!-- Thick divider -->
<hr class="divider(thick)">

<!-- Dashed divider -->
<hr class="divider(dashed)">
```

### Highlights
Text emphasis:

```html
<!-- Colored highlights -->
<span class="highlight()">Default pink highlight</span>
<span class="highlight(yellow)">Yellow highlight</span>
<span class="highlight(green)">Green highlight</span>
<span class="highlight(blue)">Blue highlight</span>
```

## 🎯 Usage Examples

### Complete Hero Section
```html
<section class="section(hero) bg(white)">
  <div class="contain(wide)">
    <div class="content(hero)">
      <h1 class="hero-text() c(gray-900)">Welcome to AdorableCSS</h1>
      <p class="lead()">Build beautiful UIs with our design system</p>
      <button class="btn-base() btn-primary()">Get Started</button>
    </div>
  </div>
</section>
```

### Feature Section
```html
<section class="section(feature) bg(gray-50)">
  <div class="contain()">
    <div class="content(centered)">
      <h2 class="heading(h2)">Our Features</h2>
      <p class="flow()">Everything you need to build amazing products</p>
    </div>
    <div class="feature-grid()">
      <div class="card-base() card-hover()">
        <h3 class="heading(h3)">Feature 1</h3>
        <p>Description of the feature</p>
      </div>
      <!-- More feature cards -->
    </div>
  </div>
</section>
```

### Content Article
```html
<article class="contain(narrow) rhythm()">
  <h1 class="heading(h1)">Article Title</h1>
  <p class="lead()">Introduction paragraph with larger text</p>
  
  <p class="flow()">
    Regular paragraph text that maintains optimal line length for readability.
  </p>
  
  <div class="alert(info)">
    Important note about the content
  </div>
  
  <hr class="divider()">
  
  <p class="caption()">Published on December 26, 2024</p>
</article>
```

## 🔄 Combining with Utilities

The design system utilities work seamlessly with regular AdorableCSS utilities:

```html
<!-- Card with custom spacing and colors -->
<div class="card-base() p(2xl) hover:scale(1.02) transition">
  <h3 class="heading(h3) mb(md) c(purple-600)">Custom Card</h3>
  <p class="c(gray-600)">Mix design system with utilities</p>
</div>

<!-- Button with custom colors -->
<button class="btn-base() bg(gradient-purple) hover:shadow(xl)">
  Gradient Button
</button>
```

## 📱 Responsive Design

All design system utilities are responsive-ready:

```html
<!-- Different padding on mobile vs desktop -->
<section class="section(compact) md:section(feature)">
  <div class="contain() md:contain(wide)">
    <div class="stack() md:hbox(middle) gap(lg)">
      <!-- Content adapts to screen size -->
    </div>
  </div>
</section>
```