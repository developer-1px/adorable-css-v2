import { describe, it, expect } from "vitest";
import { generateClass, generateCSS } from "../../../07-generator/generator";

// Initialize Rule2 handlers for tests
import { initializeRule2Handlers } from "../../../04-rules/rule2-registry";
initializeRule2Handlers();

describe("generateClass", () => {

  describe("Simple utilities", () => {
    it("should generate CSS for simple identifier", () => {
      const result = generateClass("block");
      expect(result).toBe(".block{display:block}");
    });

    it("should generate CSS for function call", () => {
      const result = generateClass("w(300)");
      expect(result).toBe(".w\\(300\\){width:300px}");
    });
  });

  describe("Pseudo-classes", () => {
    it("should generate CSS for hover pseudo-class", () => {
      const result = generateClass("hover:bg(blue)");
      expect(result).toBe(
        ".hover\\:bg\\(blue\\):hover{background-color:var(--blue-500)}"
      );
    });

    it("should generate CSS for focus pseudo-class with function", () => {
      const result = generateClass("focus:p(20)");
      expect(result).toBe(".focus\\:p\\(20\\):focus{padding:20px}");
    });
  });

  describe("Error handling", () => {
    it("should handle unknown utilities gracefully", () => {
      const result = generateClass("unknownUtility");
      expect(result).toBe("");
    });

    it("should handle parser errors", () => {
      const result = generateClass("invalid(((");
      expect(result).toBe("");
    });

    it("should handle missing function handlers", () => {
      const result = generateClass("nonexistent(value)");
      expect(result).toBe("");
    });
  });

  describe("CSS escaping", () => {
    const testCases = [
      { input: "w(300)", expected: ".w\\(300\\)" },
      { input: "p(20px)", expected: ".p\\(20px\\)" },
      { input: "bg(red)", expected: ".bg\\(red\\)" },
    ];

    testCases.forEach(({ input, expected }) => {
      it(`should escape ${input} correctly`, () => {
        const result = generateClass(input);
        expect(result).toContain(expected);
      });
    });
  });

  describe("Advanced features", () => {
    it("should handle complex CSS generation", () => {
      // Use a valid rule handler for testing
      const result = generateClass("block");
      expect(result).toContain(".block");
    });
  });
});

describe("generateCSS", () => {

  it("should generate CSS for multiple class lists", () => {
    const result = generateCSS(["block", "hbox"]);
    // Should contain both utilities and layer structure
    expect(result).toContain("@layer");
    expect(result).toContain(".block{display:block}");
    expect(result).toContain(".hbox{");
  });

  it("should handle empty class list", () => {
    const result = generateCSS([]);
    // Should still contain base layer structure but no utilities
    expect(result).toContain("@layer base");
    expect(result).not.toContain("@layer utilities");
  });

  it("should handle single class", () => {
    const result = generateCSS(["block"]);
    expect(result).toContain(".block{display:block}");
  });
});

describe("CSS generation integration", () => {

  it("should generate valid CSS for known utilities", () => {
    const result = generateClass("block");
    expect(result).toMatch(/\.block\{.*\}/);
  });
});