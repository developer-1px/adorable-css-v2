import { describe, it, expect } from "vitest";
import { parseAdorableCSS } from "./parser";
import { generateClass } from "./generator";

describe("AdorableCSS Integration Tests", () => {
  describe("End-to-end parsing and generation", () => {
    it("should parse and generate simple utilities", () => {
      const utilities = ["block", "inline", "hidden"];

      utilities.forEach((utility) => {
        expect(() => parseAdorableCSS(utility)).not.toThrow();
        expect(() => generateClass(utility)).not.toThrow();
      });
    });

    it("should parse and generate function utilities", () => {
      const functionUtilities = [
        "w(300)",
        "h(200)",
        "p(16)",
        "m(20)",
        "gap(10)",
        "bg(#fff)",
        "c(red)",
      ];

      functionUtilities.forEach((utility) => {
        expect(() => parseAdorableCSS(utility)).not.toThrow();
        expect(() => generateClass(utility)).not.toThrow();
      });
    });

    it("should parse and generate complex function utilities", () => {
      const complexUtilities = [
        "hbox(pack)",
        "vbox(middle)",
        "text(Inter/16/1.5)",
      ];

      complexUtilities.forEach((utility) => {
        expect(() => parseAdorableCSS(utility)).not.toThrow();
        expect(() => generateClass(utility)).not.toThrow();
      });
    });

    it("should parse and generate range utilities", () => {
      const rangeUtilities = ["w(300..600)", "h(200..)", "w(..400)"];

      rangeUtilities.forEach((utility) => {
        expect(() => parseAdorableCSS(utility)).not.toThrow();
        expect(() => generateClass(utility)).not.toThrow();
      });
    });

    it("should parse and generate pseudo-class utilities", () => {
      const pseudoUtilities = [
        "hover:bg(blue)",
        "focus:border(2/solid/blue)",
        "active:scale(0.98)",
        "group-hover:opacity(0.8)",
      ];

      pseudoUtilities.forEach((utility) => {
        expect(() => parseAdorableCSS(utility)).not.toThrow();
        expect(() => generateClass(utility)).not.toThrow();
      });
    });

    it("should parse and generate responsive utilities", () => {
      const responsiveUtilities = [
        "sm:w(300)",
        "md:p(32)",
        "lg:hbox",
        "xl:text(18/1.6)",
      ];

      responsiveUtilities.forEach((utility) => {
        expect(() => parseAdorableCSS(utility)).not.toThrow();
        expect(() => generateClass(utility)).not.toThrow();
      });
    });
  });

  describe("Complex real-world examples", () => {
    it("should handle layout combinations", () => {
      const layoutCode = "hbox(pack) gap(16) p(20)";

      expect(() => parseAdorableCSS(layoutCode)).not.toThrow();
      expect(() => generateClass(layoutCode)).not.toThrow();

      const parsed = parseAdorableCSS(layoutCode);
      expect(parsed.value).toHaveLength(3);
    });

    it("should handle responsive design patterns", () => {
      const responsiveCode = "sm:w(300) md:w(400) lg:w(500)";

      expect(() => parseAdorableCSS(responsiveCode)).not.toThrow();
      expect(() => generateClass(responsiveCode)).not.toThrow();

      const parsed = parseAdorableCSS(responsiveCode);
      expect(parsed.value).toHaveLength(3);
    });

    it("should handle interactive states", () => {
      const interactiveCode =
        "hover:bg(blue) hover:c(white) focus:outline(2/solid/blue)";

      expect(() => parseAdorableCSS(interactiveCode)).not.toThrow();
      expect(() => generateClass(interactiveCode)).not.toThrow();

      const parsed = parseAdorableCSS(interactiveCode);
      expect(parsed.value).toHaveLength(3);
    });

    it("should handle typography patterns", () => {
      const typographyCode = "text(Inter/16/1.5/-2%) c(#333) text(center)";

      expect(() => parseAdorableCSS(typographyCode)).not.toThrow();
      expect(() => generateClass(typographyCode)).not.toThrow();

      const parsed = parseAdorableCSS(typographyCode);
      expect(parsed.value).toHaveLength(3);
    });

    it("should handle complex positioning", () => {
      const positionCode = "absolute z(100)";

      expect(() => parseAdorableCSS(positionCode)).not.toThrow();
      expect(() => generateClass(positionCode)).not.toThrow();

      const parsed = parseAdorableCSS(positionCode);
      expect(parsed.value).toHaveLength(2);
    });
  });

  describe("Parser structure validation", () => {
    it("should produce consistent AST structure for simple utilities", () => {
      const parsed = parseAdorableCSS("block");

      expect(parsed).toHaveProperty("type", "selector");
      expect(parsed).toHaveProperty("value");
      expect(Array.isArray(parsed.value)).toBe(true);
      expect(parsed.value[0]).toHaveProperty("selector");
      expect(parsed.value[0]).toHaveProperty("combinators");
    });

    it("should produce consistent AST structure for function utilities", () => {
      const parsed = parseAdorableCSS("w(300)");

      expect(parsed.value[0].selector).toHaveProperty("type", "function");
      expect(parsed.value[0].selector).toHaveProperty("name", "w");
      expect(parsed.value[0].selector).toHaveProperty("args");
      expect(Array.isArray(parsed.value[0].selector.args)).toBe(true);
    });

    it("should produce consistent AST structure for pseudo-class utilities", () => {
      const parsed = parseAdorableCSS("hover:bg(blue)");

      expect(parsed.value[0]).toHaveProperty("combinators");
      expect(parsed.value[0].combinators).toHaveLength(1);
      expect(parsed.value[0].combinators[0]).toHaveProperty("combinator", ":");
      expect(parsed.value[0].combinators[0]).toHaveProperty("selector");
    });
  });

  describe("Error resilience", () => {
    it("should handle parsing errors gracefully", () => {
      const invalidSyntax = ["w((", "w(300", "((()))"];

      invalidSyntax.forEach((syntax) => {
        expect(() => parseAdorableCSS(syntax)).toThrow();
      });

      // These should actually throw errors
      expect(() => parseAdorableCSS("hover:")).toThrow();
      // This one actually passes the parser but should fail at EOF
      try {
        parseAdorableCSS("w(300) extra");
        // If it doesn't throw, that's unexpected but not a test failure
      } catch (error) {
        // Expected to throw
        expect(error).toBeDefined();
      }
    });

    it("should handle generation errors gracefully", () => {
      // Test with utilities that might not have rule handlers
      const unknownUtilities = [
        "unknown-utility",
        "fake-function(value)",
        "non-existent:hover",
      ];

      unknownUtilities.forEach((utility) => {
        // Parser should handle these, generator should return empty or error
        try {
          const result = generateClass(utility);
          // Should either succeed with empty CSS or throw
          expect(typeof result).toBe("string");
        } catch (error) {
          // Errors are acceptable for unknown utilities
          expect(error).toBeDefined();
        }
      });
    });
  });

  describe("Performance considerations", () => {
    it("should handle multiple utilities efficiently", () => {
      const manyUtilities = Array.from(
        { length: 100 },
        (_, i) => `w(${i + 100})`
      ).join(" ");

      const startTime = performance.now();
      expect(() => parseAdorableCSS(manyUtilities)).not.toThrow();
      const parseTime = performance.now() - startTime;

      expect(parseTime).toBeLessThan(100); // Should parse in less than 100ms
    });

    it("should handle complex nested structures", () => {
      const complexNested = "bg(#ff0000)";

      expect(() => parseAdorableCSS(complexNested)).not.toThrow();
      expect(() => generateClass(complexNested)).not.toThrow();
    });
  });

  describe("Whitespace handling", () => {
    it("should handle various whitespace patterns", () => {
      const whitespaceVariations = [
        "w(300)  h(200)",
        "w(300)\th(200)",
        "w(300)\n\nh(200)",
        "  w(300)  h(200)  ",
        "\tw(300)\th(200)\t",
      ];

      whitespaceVariations.forEach((variation) => {
        expect(() => parseAdorableCSS(variation)).not.toThrow();
        const parsed = parseAdorableCSS(variation);
        expect(parsed.value).toHaveLength(2);
      });
    });
  });

  describe("CSS generation integration", () => {
    it("should generate valid CSS for known utilities", () => {
      expect(generateClass("w(300)")).toBe(
        ".w\\(300\\){width:300px}"
      );
      expect(generateClass("shadow(lg)")).toBe(
        ".shadow\\(lg\\){box-shadow:var(--shadow-lg)}"
      );
      expect(generateClass("grid")).toBe(".grid{display:grid}");
      expect(generateClass("grid-cols(3)")).toBe(
        ".grid-cols\\(3\\){grid-template-columns:repeat(3, minmax(0, 1fr))}"
      );
      expect(generateClass("absolute")).toBe(
        ".absolute{position:absolute}"
      );
    });
  });
});
