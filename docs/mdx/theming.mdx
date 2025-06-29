---
title: Theming & Customization
description: Learn how to customize your design system by overriding default design tokens for colors, spacing, fonts, and more.
---

# Theming & Customization

AdorableCSS is built on a robust design token system that allows for deep customization. You can easily modify the default theme to match your brand's identity by providing your own token configuration.

## Understanding Design Tokens

Design tokens are the central source of truth for all your design-related values. They are stored in a JavaScript object and converted into CSS custom properties, which are then used by all utility classes.

Here's a simplified look at the structure of the default tokens object:

```javascript
import { defaultTokens } from "@adorable-css/core";

console.log(defaultTokens);
/*
{
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    // ...
  },
  fontSize: {
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    // ...
  },
  colors: {
    primary: '#a855f7', // Resolved from purple-500
    secondary: '#6b7280', // Resolved from gray-500
    // ...and the entire OKLCH color palette
  },
  radius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    full: '9999px',
  },
  // ... and many more
}
*/
```

## Customizing Tokens at Runtime

The easiest way to customize the theme is at runtime, directly in your application's entry point. This is perfect for single-page applications or sites where you have a main JavaScript file.

The process involves three steps:

1.  Import `defaultTokens` and `injectTokens`.
2.  Create a new object with your custom values, using `defaultTokens` as a base.
3.  Call `injectTokens()` with your custom configuration.

Here's how you could change the primary color and spacing scale:

```javascript
// In your main app.js or similar entry file

import { defaultTokens, injectTokens } from "@adorable-css/core";
import { deepMerge } from "@adorable-css/core/utils"; // Helper for merging nested objects

// 1. Define your custom tokens
const myTheme = {
  colors: {
    primary: "#ff5733", // A nice orange
    accent: "#33ff57", // A vibrant green
  },
  spacing: {
    // Let's create a more dramatic spacing scale
    xs: "0.2rem",
    sm: "0.4rem",
    md: "0.8rem",
    lg: "1.6rem",
    xl: "3.2rem",
  },
};

// 2. Merge your theme with the defaults
// deepMerge ensures that you only override what you need
const customTokens = deepMerge(defaultTokens, myTheme);

// 3. Inject the new tokens into the document
// AdorableCSS will create a <style> tag with your new CSS variables.
injectTokens(customTokens);
```

Now, any utility that uses these tokens will automatically reflect your changes. For example, `p(md)` will use `0.8rem` of padding, and `bg(primary)` will use the color `#ff5733`.

## Using Tokens in your CSS

While AdorableCSS utilities automatically use tokens, you can also access them directly in your own custom CSS using the `var()` function.

```css
.my-custom-component {
  padding: var(--spacing-lg);
  background-color: var(--primary);
  border-radius: var(--radius-full);
  font-family: var(--font-sans);
}
```

This ensures your custom components remain consistent with the rest of your UI.
