/**
 * AST Node types and Visitor interface for AdorableCSS
 */

// Result type for CSS generation
export interface CSSResult {
  mainCSS: string;
  nestedCSS: string[];
  priority?: number;
}

// Base AST Node
export interface ASTNode {
  accept<T>(visitor: Visitor<T>): T;
}

// Selector Node (function calls like c(red), bg(blue), etc.)
export interface SelectorNode extends ASTNode {
  type: 'selector';
  name: string;
  functionType?: 'function' | 'ident';
  args?: string[];
}

// Position Node (absolute positioning like (10,20))
export interface PositionNode extends ASTNode {
  type: 'position';
  x: string;
  y: string;
}

// Combinator Node (pseudo-classes like :hover)
export interface CombinatorNode extends ASTNode {
  type: 'combinator';
  combinator: string;
  target: ASTNode;
  base: string;
}

// State Node (hover:c(red), focus:bg(blue))
export interface StateNode extends ASTNode {
  type: 'state';
  state: string;
  selector: string;
  isGroup?: boolean;
  originalClass: string;
}

// Responsive Node (md:w(100), lg:grid(3))
export interface ResponsiveNode extends ASTNode {
  type: 'responsive';
  breakpoint: string;
  selector: string;
  isMaxWidth?: boolean;
  originalClass: string;
}

// String Rule Node (component rules)
export interface StringRuleNode extends ASTNode {
  type: 'stringRule';
  name: string;
  args?: string;
}

// Visitor interface
export interface Visitor<T> {
  visitSelector(node: SelectorNode): T;
  visitPosition(node: PositionNode): T;
  visitCombinator(node: CombinatorNode): T;
  visitState(node: StateNode): T;
  visitResponsive(node: ResponsiveNode): T;
  visitStringRule(node: StringRuleNode): T;
}

// Context for visitor operations
export interface VisitorContext {
  parentSelector?: string;
  importanceLevel?: number;
  visited?: Set<string>;
  cache?: Map<string, any>;
}