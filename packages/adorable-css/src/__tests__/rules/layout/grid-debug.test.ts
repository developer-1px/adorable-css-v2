import { describe, it, expect } from "vitest";
import { generateCSS } from "../../../07-generator/generator";
import { gridCols } from "../../../04-rules/figma/layout/grid";
import { parseAdorableCSS } from "../../../01-core/parser/parser";

describe("Grid Debug", () => {
  it("should check actual AST structure", () => {
    // Parse grid-cols(3) to see actual AST structure
    const parsed = parseAdorableCSS("grid-cols(3)");
    const ast = parsed.value[0];
    console.log("Full parsed:", JSON.stringify(parsed, null, 2));
    console.log("AST structure:", JSON.stringify(ast, null, 2));
    
    // Check what the parser generates
    expect(ast.selector.name).toBe("grid-cols");
    expect(ast.selector.type).toBe("function");
  });

  it("should debug grid-cols handler with correct AST", () => {
    // Parse actual input to get correct AST structure
    const parsed = parseAdorableCSS("grid-cols(3)");
    const ast = parsed.value[0];
    
    console.log("AST selector type:", ast.selector?.type);
    console.log("AST args:", ast.selector?.args);
    
    // Test the gridCols handler directly with the parsed AST
    const result = gridCols(ast);
    console.log("Direct gridCols result:", result);
    
    // The handler expects the AST in a specific format
    expect(result).toContain("grid-template-columns");
  });

  it("should test with different grid-cols values", () => {
    const testCases = [
      "grid-cols(3)",
      "grid-cols(200px/1fr/200px)",
      "grid-cols(repeat(3,minmax(0,1fr)))"
    ];
    
    testCases.forEach(testCase => {
      const parsed = parseAdorableCSS(testCase);
      const ast = parsed.value[0];
      const result = gridCols(ast);
      console.log(`${testCase} -> ${result}`);
    });
  });
});