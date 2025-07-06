import type { ParsedSelector } from "../../03-rules/types";

/**
 * Create ParsedSelector from AST node
 */
export const createParsedSelector = (node: any): ParsedSelector => ({
  type: node.name ? "function" : "keyword",
  name: node.name || node.image,
  args: node.args?.map((arg: any) => {
    if (arg.type === 'triple-range') {
      return `${arg.min.image}..${arg.preferred.image}..${arg.max.image}`;
    }
    if (arg.type === 'range') {
      const minPart = arg.min ? arg.min.image : '';
      const maxPart = arg.max ? arg.max.image : '';
      return `${minPart}..${maxPart}`;
    }
    return arg.image;
  })
});