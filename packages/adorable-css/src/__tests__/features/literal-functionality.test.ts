import { describe, it, expect } from "vitest";
import { parseAdorableCSS } from "../../01-core/parser/parser";
import { generateCSS, generateClass } from "../../07-generator/generator";

describe("CSS Literal Functionality", () => {
  it("should parse simple CSS literal", () => {
    const result = parseAdorableCSS("{padding:0_10px}");
    expect(result).toBeDefined();
    expect(result.value).toHaveLength(1);
    expect(result.value[0].selector.type).toBe("css_literal");
    expect(result.value[0].selector.image).toBe("{padding:0 10px}");
  });

  it("should parse CSS literal with multiple properties", () => {
    const result = parseAdorableCSS("{padding:0_10px;margin:5px_0}");
    expect(result).toBeDefined();
    expect(result.value[0].selector.type).toBe("css_literal");
    expect(result.value[0].selector.image).toBe("{padding:0 10px;margin:5px 0}");
  });

  it("should parse nested selector CSS literal with new syntax", () => {
    const result = parseAdorableCSS("{{h1{color:red}}}");
    expect(result).toBeDefined();
    expect(result.value).toHaveLength(1);
    expect(result.value[0].selector.type).toBe("css_nested_literal");
    expect(result.value[0].selector.selector).toBe("h1");
    expect(result.value[0].selector.properties).toBe("color:red");
  });

  it("should parse CSS literal with hex colors", () => {
    const result = parseAdorableCSS("{color:#ff0000}");
    expect(result).toBeDefined();
    expect(result.value[0].selector.type).toBe("css_literal");
    expect(result.value[0].selector.image).toBe("{color:#ff0000}");
  });

  it("should parse CSS literal with CSS functions", () => {
    const result = parseAdorableCSS("{background:linear-gradient(to_right,red,blue)}");
    expect(result).toBeDefined();
    expect(result.value[0].selector.type).toBe("css_literal");
    expect(result.value[0].selector.image).toBe("{background:linear-gradient(to right,red,blue)}");
  });

  it("should parse CSS literal with !important", () => {
    const result = parseAdorableCSS("{color:red!important}");
    expect(result).toBeDefined();
    expect(result.value[0].selector.type).toBe("css_literal");
    expect(result.value[0].selector.image).toBe("{color:red!important}");
  });

  it("should generate CSS from CSS literal", () => {
    const css = generateClass("{padding:0_10px}");
    expect(css).toContain("padding:0 10px");
  });

  it("should generate CSS from nested selector literal", () => {
    const css = generateClass("{{h1{color:red}}}");
    expect(css).toContain("h1{color:red}");
  });

  it("should generate CSS from complex CSS literal", () => {
    const css = generateClass("{padding:0_10px;margin:5px_0;color:#ff0000}");
    expect(css).toContain("padding:0 10px");
    expect(css).toContain("margin:5px 0");
    expect(css).toContain("color:#ff0000");
  });

  it("should handle mixed CSS literal and regular classes", () => {
    const css = generateCSS(["p(lg)", "{color:red}", "m(sm)"]);
    expect(css).toContain("padding:");
    expect(css).toContain("color:red");
    expect(css).toContain("margin:");
  });

  it("should parse complex nested CSS literal with child selectors", () => {
    const result = parseAdorableCSS("{{.card>h2{font-size:24px;color:blue}}}");
    expect(result).toBeDefined();
    expect(result.value[0].selector.type).toBe("css_nested_literal");
    expect(result.value[0].selector.selector).toBe(".card>h2");
    expect(result.value[0].selector.properties).toBe("font-size:24px;color:blue");
  });

  it("should parse nested CSS literal with pseudo-classes", () => {
    const result = parseAdorableCSS("{{button:hover{background:blue}}}");
    expect(result).toBeDefined();
    expect(result.value[0].selector.type).toBe("css_nested_literal");
    expect(result.value[0].selector.selector).toBe("button:hover");
    expect(result.value[0].selector.properties).toBe("background:blue");
  });

  it("should generate CSS from complex nested selectors", () => {
    const css = generateClass("{{.card>h2{font-size:24px;color:blue}}}");
    expect(css).toContain(".card>h2{font-size:24px;color:blue}");
  });

  it("should handle mixed nested and regular CSS literals", () => {
    const css = generateCSS(["{margin:0}", "{{h1{color:red}}}", "p(lg)"]);
    expect(css).toContain("margin:0");
    expect(css).toContain("h1{color:red}");
    expect(css).toContain("padding:");
  });
});