import type { ParsedSelector } from "../../rules/types";

/**
 * AST 노드를 ParsedSelector로 변환하는 헬퍼 함수들
 */

/**
 * Create ParsedSelector from AST node
 */
export function createParsedSelector(node: any): ParsedSelector {
  return {
    type: node.name ? "function" : "keyword",
    name: node.name || node.image,
    args: node.args?.map((arg: any) => {
      // Handle triple-range syntax: convert to string format handlers expect
      if (arg.type === 'triple-range') {
        return `${arg.min.image}..${arg.preferred.image}..${arg.max.image}`;
      }
      // Handle double-range syntax
      if (arg.type === 'range') {
        const minPart = arg.min ? arg.min.image : '';
        const maxPart = arg.max ? arg.max.image : '';
        return `${minPart}..${maxPart}`;
      }
      return arg.image;
    }),
  };
}