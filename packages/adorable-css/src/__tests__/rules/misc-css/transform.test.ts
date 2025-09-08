import { describe, it, expect } from "vitest";
import { generateClass } from "../../07-generator/generator";

describe("Transform Rules", () => {
  describe("rotate", () => {
    it("should handle rotate with deg unit", () => {
      const css = generateClass("rotate(45deg)");
      expect(css).toContain("transform:rotate(45deg)");
    });

    it("should add deg unit when missing", () => {
      const css = generateClass("rotate(45)");
      expect(css).toContain("transform:rotate(45deg)");
    });

    it("should handle negative rotation", () => {
      const css = generateClass("rotate(-15)");
      expect(css).toContain("transform:rotate(-15deg)");
    });

    it("should handle decimal rotation", () => {
      const css = generateClass("rotate(0.5)");
      expect(css).toContain("transform:rotate(0.5deg)");
    });

    it("should handle responsive rotation", () => {
      const css = generateClass("md:rotate(90)");
      expect(css).toContain("@media");
      expect(css).toContain("transform:rotate(90deg)");
    });

    it("should handle hover state", () => {
      const css = generateClass("hover:rotate(2)");
      expect(css).toContain(":hover");
      expect(css).toContain("transform:rotate(2deg)");
    });
  });

  describe("translate", () => {
    it("should handle translate with single value", () => {
      const css = generateClass("translate(10px)");
      expect(css).toContain("transform:translate(10px)");
    });

    it("should handle translate with two values", () => {
      const css = generateClass("translate(10px,20px)");
      expect(css).toContain("transform:translate(10px,20px)");
    });

    it("should handle translate with percentage", () => {
      const css = generateClass("translate(50%)");
      expect(css).toContain("transform:translate(50%)");
    });

    it("should handle translate with negative values", () => {
      const css = generateClass("translate(-50%,-50%)");
      expect(css).toContain("transform:translate(-50%,-50%)");
    });

    it("should handle translateX", () => {
      const css = generateClass("translate-x(100px)");
      expect(css).toContain("transform:translateX(100px)");
    });

    it("should handle translateY", () => {
      const css = generateClass("translate-y(50%)");
      expect(css).toContain("transform:translateY(50%)");
    });

    it("should handle responsive translate", () => {
      const css = generateClass("lg:translate(0,-10px)");
      expect(css).toContain("@media");
      expect(css).toContain("transform:translate(0,-10px)");
    });

    it("should handle hover translate", () => {
      const css = generateClass("hover:translate-y(-5px)");
      expect(css).toContain(":hover");
      expect(css).toContain("transform:translateY(-5px)");
    });
  });

  describe("scale", () => {
    it("should handle scale", () => {
      const css = generateClass("scale(1.05)");
      expect(css).toContain("transform:scale(1.05)");
    });

    it("should handle hover scale", () => {
      const css = generateClass("hover:scale(0.95)");
      expect(css).toContain(":hover");
      expect(css).toContain("transform:scale(0.95)");
    });
  });

  describe("combined transforms in showroom", () => {
    it("should handle multiple transform classes", () => {
      // These classes from showroom7
      const classes = [
        "rotate(-2)",
        "hover:rotate(2)",
        "rotate(1)", 
        "rotate(-1)",
        "rotate(0.5)",
        "rotate(-0.5)",
        "translate-x(-50%)",
        "hover:translate-y(-5)",
        "hover:translate-y(-3)"
      ];
      
      classes.forEach(className => {
        const css = generateClass(className);
        expect(css).toContain("transform:");
      });
    });
  });
});