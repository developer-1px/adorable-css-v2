import { describe, it, expect } from "vitest";
import { generateClass } from "../../07-generator/generator";

describe("Grid Rules", () => {
  describe("grid-cols", () => {
    it("should handle grid-cols with number", () => {
      const css = generateClass("grid-cols(3)");
      expect(css).toContain("grid-template-columns:repeat(3, 1fr)");
    });

    it("should handle grid-cols with custom value", () => {
      const css = generateClass("grid-cols(200px/1fr/200px)");
      // Match the actual output with multiple spaces
      expect(css).toMatch(/grid-template-columns:200px\s+1fr\s+200px/);
    });

    it("should handle grid-cols with repeat function", () => {
      const css = generateClass("grid-cols(repeat(3,minmax(0,1fr)))");
      expect(css).toContain("grid-template-columns:repeat(3,minmax(0,1fr))");
    });

    it("should handle grid-cols(1) from showroom7", () => {
      const css = generateClass("grid-cols(1)");
      expect(css).toContain("grid-template-columns:repeat(1, 1fr)");
    });

    it("should handle responsive grid-cols", () => {
      const css = generateClass("md:grid-cols(3)");
      expect(css).toContain("grid-template-columns:repeat(3, 1fr)");
    });
  });

  describe("grid display", () => {
    it("should handle grid display", () => {
      const css = generateClass("grid");
      expect(css).toContain("display:grid");
    });
  });

  describe("grid gap", () => {
    it("should handle grid-gap", () => {
      const css = generateClass("grid-gap(16)");
      expect(css).toContain("grid-gap:16px");
    });

    it("should handle gap with two values", () => {
      const css = generateClass("gap(16/24)");
      expect(css).toContain("gap:16px 24px");
    });
  });
});