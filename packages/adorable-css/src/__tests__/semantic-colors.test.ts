import { describe, it, expect, beforeAll } from "vitest";
import { generateTokenCSS, semanticColors, buildSemanticColors } from "../design-system/tokens/index";
import { generateColorPalette } from "../design-system/colors/colors";

describe("Semantic Color CSS Variable Generation", () => {
  beforeAll(() => {
    // Initialize color palette
    generateColorPalette();
  });

  it("should generate CSS variables for semantic color variations", () => {
    const css = generateTokenCSS();
    
    // Check if accent color variations are generated
    expect(css).toContain("--accent-50:");
    expect(css).toContain("--accent-100:");
    expect(css).toContain("--accent-200:");
    expect(css).toContain("--accent-300:");
    expect(css).toContain("--accent-400:");
    expect(css).toContain("--accent-500:");
    expect(css).toContain("--accent-600:");
    expect(css).toContain("--accent-700:");
    expect(css).toContain("--accent-800:");
    expect(css).toContain("--accent-900:");
  });

  it("should generate CSS variables for primary color variations", () => {
    const css = generateTokenCSS();
    
    // Check if primary color variations are generated
    expect(css).toContain("--primary-50:");
    expect(css).toContain("--primary-100:");
    expect(css).toContain("--primary-200:");
    expect(css).toContain("--primary-300:");
    expect(css).toContain("--primary-400:");
    expect(css).toContain("--primary-500:");
    expect(css).toContain("--primary-600:");
    expect(css).toContain("--primary-700:");
    expect(css).toContain("--primary-800:");
    expect(css).toContain("--primary-900:");
  });

  it("should have actual OKLCH values for semantic colors", () => {
    const css = generateTokenCSS();
    
    // Extract the accent-500 line
    const lines = css.split('\n');
    const accent500Line = lines.find(line => line.includes('--accent-500:'));
    
    expect(accent500Line).toBeTruthy();
    expect(accent500Line).toContain('oklch(');
    
    // Should not be a CSS variable reference
    expect(accent500Line).not.toContain('var(--');
  });

  it("should include semantic color variations in buildSemanticColors", () => {
    const semanticColorVariations = buildSemanticColors(semanticColors);
    
    // Check that accent variations are built
    expect(semanticColorVariations['accent-50']).toBeTruthy();
    expect(semanticColorVariations['accent-100']).toBeTruthy();
    expect(semanticColorVariations['accent-500']).toBeTruthy();
    expect(semanticColorVariations['accent-900']).toBeTruthy();
    
    // Should have OKLCH values
    expect(semanticColorVariations['accent-500']).toContain('oklch(');
  });
});