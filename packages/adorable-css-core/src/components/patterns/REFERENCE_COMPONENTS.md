# Reference Components

This document describes the new reference components added to AdorableCSS for creating documentation pages, especially rules reference pages.

## Available Components

### 1. Page Header (`page-header`)

For main page headers with title and description.

**Variants:**
- `page-header` - Default with border bottom
- `page-header(compact)` - Smaller spacing, no border
- `page-header(hero)` - Centered with gradient background

**Usage:**
```html
<div class="page-header">
  <h1 class="heading(h1)">Rules Reference</h1>
  <p class="heading(lead)">Complete reference for all AdorableCSS rules</p>
</div>
```

### 2. Category Section (`category-section`)

Groups related content with consistent spacing.

**Variants:**
- `category-section` - Default with border between sections
- `category-section(compact)` - Smaller spacing
- `category-section(card)` - Card-style with background

**Usage:**
```html
<div class="category-section">
  <div class="category-header">
    <h2>Layout Rules</h2>
  </div>
  <!-- content -->
</div>
```

### 3. Category Header (`category-header`)

Headers for content sections.

**Variants:**
- `category-header` - Default with border bottom
- `category-header(minimal)` - No border
- `category-header(accent)` - Colored border accent

**Usage:**
```html
<div class="category-header(accent)">
  <h2 class="heading(h2)">Styling Rules</h2>
  <div class="info-card(neutral)">18 rules</div>
</div>
```

### 4. Rules Table (`rules-table`)

Specialized tables for displaying rule documentation.

**Variants:**
- `rules-table` - Default with borders and hover effects
- `rules-table(minimal)` - Clean without borders
- `rules-table(striped)` - Alternating row colors

**Features:**
- Responsive design
- Syntax highlighting for code
- Hover effects
- Consistent spacing

**Usage:**
```html
<div class="rules-table">
  <table>
    <thead>
      <tr>
        <th>Rule</th>
        <th>Description</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code class="code-block(inline)">w(100)</code></td>
        <td>Sets width to 100px</td>
        <td><div class="w(100) h(20) bg(blue-200)"></div></td>
      </tr>
    </tbody>
  </table>
</div>
```

### 5. Code Block (`code-block`)

Enhanced code display with multiple styles.

**Variants:**
- `code-block` - Default dark theme code block
- `code-block(inline)` - Inline code styling
- `code-block(light)` - Light theme code block
- `code-block(terminal)` - Terminal/console style

**Usage:**
```html
<!-- Block code -->
<div class="code-block">
  <code>
    .my-class {
      display: flex;
      gap: 1rem;
    }
  </code>
</div>

<!-- Inline code -->
<code class="code-block(inline)">w(100)</code>
```

### 6. Info Card (`info-card`)

Highlighted information boxes with semantic colors.

**Variants:**
- `info-card` - Default blue info card
- `info-card(warning)` - Amber warning card
- `info-card(success)` - Green success card
- `info-card(error)` - Red error card
- `info-card(neutral)` - Gray neutral card

**Usage:**
```html
<div class="info-card(warning)">
  <strong>Warning:</strong> This is important information to note.
</div>
```

### 7. Rule Example (`rule-example`)

Complex examples with preview and code.

**Variants:**
- `rule-example` - Default with preview and code sections
- `rule-example(inline)` - Compact inline example
- `rule-example(grid)` - Grid layout for multiple examples

**Usage:**
```html
<div class="rule-example">
  <div class="example-preview">
    <!-- Live example here -->
    <div class="hbox gap(lg)">...</div>
  </div>
  <div class="example-code">
    <code>&lt;div class="hbox gap(lg)"&gt;...&lt;/div&gt;</code>
  </div>
</div>
```

## Design System Integration

All reference components:

- ✅ Use AdorableCSS design tokens
- ✅ Support dark mode (when implemented)
- ✅ Follow consistent spacing system
- ✅ Use semantic color names
- ✅ Include responsive behaviors
- ✅ Support accessibility features

## Best Practices

1. **Structure**: Always use `page-header` at the top of documentation pages
2. **Organization**: Group related rules in `category-section` components
3. **Consistency**: Use `rules-table` for systematic rule documentation
4. **Clarity**: Use `info-card` variants to highlight important information
5. **Examples**: Show both code and preview using `rule-example`

## Complete Example

```html
<div class="contain(wide) py(3xl)">
  <!-- Page header -->
  <div class="page-header">
    <h1 class="heading(h1)">Rules Reference</h1>
    <p class="heading(lead)">Complete documentation</p>
  </div>
  
  <!-- Category section -->
  <div class="category-section">
    <div class="category-header(accent)">
      <h2 class="heading(h2)">Layout Rules</h2>
    </div>
    
    <!-- Rules table -->
    <div class="rules-table">
      <table>
        <!-- table content -->
      </table>
    </div>
    
    <!-- Info card -->
    <div class="info-card">
      <strong>Tip:</strong> Use these rules for layout.
    </div>
  </div>
</div>
```

This creates a complete, professional documentation page following AdorableCSS principles and design patterns.