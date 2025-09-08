/**
 * Rule2 헬퍼 - 극단적으로 간결한 Rule2 작성을 위한 AST 기반 헬퍼들
 */

// AST Node Types
export interface ASTNode {
  selector?: {
    type: string;
    args?: ASTArg[];
    image?: string;
  };
}

export interface ASTArg {
  type?: string;
  image?: string;
  value?: string | number;
}

type ValueTransformer = (arg: string) => string;

/**
 * Rule2 handler를 생성하는 헬퍼
 * function 타입이면 빈 args라도 핸들러 호출, keyword는 args 필요
 */
export const rule2 = (fn: (args: ASTNode) => string) => (args: ASTNode) => {
  // Check if this is a keyword (ident) or function type
  const isKeyword = args.selector?.type === '(ident)';
  const isFunction = args.selector?.type === 'function';
  
  
  // keyword 타입이고 args가 있으면 빈 문자열 반환 (keyword는 args 불필요)
  if (isKeyword && args.selector?.args?.length) return '';
  
  // function 타입이거나 keyword 타입이면 핸들러 호출
  if (isFunction || isKeyword) {
    return fn(args);
  }
  
  return '';
};

/**
 * 단일 CSS property를 생성하는 헬퍼
 */
export const css = (prop: string, value: string) => 
  `${prop}:${value}`;

/**
 * 단일 property Rule2 handler 생성
 */
export const single = (prop: string, valueFn: ValueTransformer) => 
  rule2((astNode: ASTNode) => css(prop, valueFn(getFirstValue(astNode))));

/**
 * 여러 property를 조합하는 헬퍼
 */
export const multi = (...parts: string[]) => 
  parts.join(';');

/**
 * Side values (top/right/bottom/left) 처리를 위한 헬퍼
 * AST args를 직접 처리 (자동으로 '/' 구분자 제거)
 */
export const sideValues = (args: ASTArg[], valueFn: ValueTransformer): string => {
  const actualArgs = args.filter(arg => extractValue(arg) !== '/');
  const vals = actualArgs.map(arg => valueFn(extractValue(arg)));
  return vals.join(' ');
};

/**
 * Rule2 AST 노드에서 side values를 처리하는 편의 함수
 */
export const getSideValues = (astNode: ASTNode, valueFn: ValueTransformer): string => {
  return sideValues(getAllArgs(astNode), valueFn);
};

/**
 * CSS property를 안전하게 생성하는 헬퍼
 * values가 유효하지 않으면 빈 문자열 반환
 */
export const safeCss = (prop: string, values: string | null | undefined): string => {
  return values ? `${prop}:${values}` : '';
};

/**
 * AST 노드에서 실제 문자열 값을 추출하는 헬퍼
 */
export const extractValue = (node: ASTArg | string | number | null | undefined): string => {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (node && typeof node === 'object' && 'image' in node && node.image) return node.image;
  return String(node || '');
};

/**
 * Rule2 AST 노드에서 첫 번째 인자를 안전하게 추출하는 추상화 함수
 * AST 구조가 변경되어도 이 함수만 수정하면 됨
 * Handles both wrapped (astNode.selector.args) and direct (astNode.args) function cases
 */
export const getFirstArg = (astNode: ASTNode): ASTArg | undefined => {
  return astNode.selector?.args?.[0] || (astNode as any).args?.[0];
};

/**
 * Rule2 AST 노드에서 모든 인자를 안전하게 추출하는 추상화 함수
 * Handles both wrapped (astNode.selector.args) and direct (astNode.args) function cases
 */
export const getAllArgs = (astNode: ASTNode): ASTArg[] => {
  return astNode.selector?.args || (astNode as any).args || [];
};

/**
 * Rule2 AST 노드에서 첫 번째 인자의 값을 추출하는 편의 함수
 */
export const getFirstValue = (astNode: ASTNode): string => {
  return extractValue(getFirstArg(astNode));
};

/**
 * Rule2 AST 노드에서 모든 인자의 값을 추출하는 편의 함수
 */
export const getAllValues = (astNode: ASTNode): string[] => {
  return getAllArgs(astNode).map(extractValue);
};

/**
 * Check if selector has no arguments or empty arguments
 */
export const isVoid = (s: ASTNode): boolean => {
  const args = getAllArgs(s);
  return args.length === 0 || (args.length === 1 && extractValue(args[0]) === '');
};