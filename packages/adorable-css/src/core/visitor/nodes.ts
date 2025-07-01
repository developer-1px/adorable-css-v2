/**
 * Concrete AST Node implementations
 */

import type { 
  ASTNode, 
  Visitor, 
  SelectorNode, 
  PositionNode, 
  CombinatorNode, 
  StateNode, 
  ResponsiveNode, 
  StringRuleNode 
} from './types';

// Selector Node Implementation
export class Selector implements SelectorNode {
  type = 'selector' as const;
  
  constructor(
    public name: string,
    public functionType: 'function' | 'ident' = 'ident',
    public args?: string[]
  ) {}
  
  accept<T>(visitor: Visitor<T>): T {
    return visitor.visitSelector(this);
  }
}

// Position Node Implementation
export class Position implements PositionNode {
  type = 'position' as const;
  
  constructor(
    public x: string,
    public y: string
  ) {}
  
  accept<T>(visitor: Visitor<T>): T {
    return visitor.visitPosition(this);
  }
}

// Combinator Node Implementation
export class Combinator implements CombinatorNode {
  type = 'combinator' as const;
  
  constructor(
    public combinator: string,
    public target: ASTNode,
    public base: string
  ) {}
  
  accept<T>(visitor: Visitor<T>): T {
    return visitor.visitCombinator(this);
  }
}

// State Node Implementation
export class State implements StateNode {
  type = 'state' as const;
  
  constructor(
    public state: string,
    public selector: string,
    public originalClass: string,
    public isGroup?: boolean
  ) {}
  
  accept<T>(visitor: Visitor<T>): T {
    return visitor.visitState(this);
  }
}

// Responsive Node Implementation
export class Responsive implements ResponsiveNode {
  type = 'responsive' as const;
  
  constructor(
    public breakpoint: string,
    public selector: string,
    public originalClass: string,
    public isMaxWidth?: boolean
  ) {}
  
  accept<T>(visitor: Visitor<T>): T {
    return visitor.visitResponsive(this);
  }
}

// String Rule Node Implementation
export class StringRule implements StringRuleNode {
  type = 'stringRule' as const;
  
  constructor(
    public name: string,
    public args?: string
  ) {}
  
  accept<T>(visitor: Visitor<T>): T {
    return visitor.visitStringRule(this);
  }
}