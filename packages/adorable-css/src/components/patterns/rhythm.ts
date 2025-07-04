import type { Rule } from "../../../types";

// Visual rhythm system for automatic beautiful spacing
// This ensures consistent visual flow throughout the design

// Rhythm utility for consistent spacing between sections
// Usage: rhythm(), rhythm(tight), rhythm(loose)
export const rhythmRule: Rule = {
  name: "rhythm",
  match: /^rhythm(?:\(([\w\s,]+)\))?$/,
  create(match) {
    const variant = match[1] || "default";
    const styles: string[] = [];
    
    // Create consistent rhythm between child sections
    styles.push("display: flex");
    styles.push("flex-direction: column");
    
    switch (variant) {
      case "tight":
        styles.push("gap: var(--spacing-2xl)");
        break;
      case "loose":
        styles.push("gap: var(--spacing-5xl)");
        break;
      case "varied":
        // Use CSS :nth-child for varied rhythm
        styles.push("gap: var(--spacing-3xl)");
        break;
      default:
        styles.push("gap: var(--spacing-4xl)");
    }
    
    return styles.join("; ");
  }
};

// Hero text utility for automatic text hierarchy
// Usage: hero-text(), hero-text(dramatic)
export const heroTextRule: Rule = {
  name: "hero-text",
  match: /^hero-text(?:\(([\w\s,]+)\))?$/,
  create(match) {
    const variant = match[1] || "default";
    const styles: string[] = [];
    
    switch (variant) {
      case "dramatic":
        styles.push("font-size: clamp(2.5rem, 8vw, 5rem)");
        styles.push("line-height: 1.05");
        styles.push("letter-spacing: -0.03em");
        break;
      default:
        styles.push("font-size: clamp(2rem, 6vw, 4rem)");
        styles.push("line-height: 1.1");
        styles.push("letter-spacing: -0.02em");
    }
    
    styles.push("font-weight: 900");
    
    return styles.join("; ");
  }
};

// Eyebrow text for small labels above headings
// Usage: eyebrow()
export const eyebrowRule: Rule = {
  name: "eyebrow",
  match: /^eyebrow$/,
  create() {
    return [
      "font-size: var(--font-sm)",
      "font-weight: 600",
      "letter-spacing: 0.05em",
      "text-transform: uppercase",
      "color: var(--purple-600)",
      "margin-bottom: var(--spacing-sm)"
    ].join("; ");
  }
};

// Lead text for introductory paragraphs
// Usage: lead()
export const leadRule: Rule = {
  name: "lead",
  match: /^lead$/,
  create() {
    return [
      "font-size: var(--font-lg)",
      "line-height: 1.7",
      "color: var(--gray-600)",
      "max-width: 65ch",
      "margin: 0 auto"
    ].join("; ");
  }
};

// Feature grid for automatic responsive layouts
// Usage: feature-grid(), feature-grid(3), feature-grid(4)
export const featureGridRule: Rule = {
  name: "feature-grid",
  match: /^feature-grid(?:\(([\w\s,]+)\))?$/,
  create(match) {
    return [
      "display: grid",
      `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`,
      "gap: var(--spacing-xl)",
      "width: 100%"
    ].join("; ");
  }
};

// Visual break for section separation
// Usage: break(), break(gradient)
export const breakRule: Rule = {
  name: "break",
  match: /^break(?:\(([\w\s,]+)\))?$/,
  create(match) {
    const variant = match[1] || "default";
    const styles: string[] = [];
    
    styles.push("width: 100%");
    styles.push("height: 1px");
    styles.push("margin: var(--spacing-3xl) auto");
    styles.push("max-width: 200px");
    
    switch (variant) {
      case "gradient":
        styles.push("background: linear-gradient(90deg, transparent, var(--purple-300), transparent)");
        break;
      case "dots":
        styles.push("height: 4px");
        styles.push("background-image: radial-gradient(circle, var(--gray-400) 1px, transparent 1px)");
        styles.push("background-size: 8px 4px");
        break;
      default:
        styles.push("background: var(--gray-200)");
    }
    
    return styles.join("; ");
  }
};