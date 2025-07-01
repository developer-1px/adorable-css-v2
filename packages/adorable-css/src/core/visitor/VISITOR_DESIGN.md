# Visitor Pattern Design for AdorableCSS

## 현재 문제점
- generator.ts에서 AST 노드 타입을 직접 체크하고 처리
- 복잡한 조건문과 중첩된 로직
- 새로운 노드 타입 추가 시 여러 곳 수정 필요

## Visitor 패턴 장점
1. **Open/Closed Principle**: 새로운 연산 추가가 쉬움
2. **Single Responsibility**: 각 visitor가 하나의 책임만 가짐
3. **Type Safety**: 타입스크립트로 강타입 보장
4. **Extensibility**: 새로운 visitor 추가가 용이

## AST 노드 타입 분석
```typescript
// 현재 코드에서 파악된 노드 타입들
- Selector (function, ident, position, dimension-pair)
- Combinator (pseudo-class ':')
- State (hover:, focus:, group-hover:)
- Responsive (md:, lg:, xl:)
- StringRule (컴포넌트 규칙)
```

## Visitor 인터페이스 설계

```typescript
// AST Node 타입들
interface ASTNode {
  accept<T>(visitor: Visitor<T>): T;
}

interface SelectorNode extends ASTNode {
  type: 'selector';
  name: string;
  args?: string[];
}

interface CombinatorNode extends ASTNode {
  type: 'combinator';
  combinator: string;
  selector: ASTNode;
}

interface StateNode extends ASTNode {
  type: 'state';
  state: string;
  selector: string;
  isGroup?: boolean;
}

interface ResponsiveNode extends ASTNode {
  type: 'responsive';
  breakpoint: string;
  selector: string;
  isMaxWidth?: boolean;
}

// Visitor 인터페이스
interface Visitor<T> {
  visitSelector(node: SelectorNode): T;
  visitCombinator(node: CombinatorNode): T;
  visitState(node: StateNode): T;
  visitResponsive(node: ResponsiveNode): T;
}

// CSS 생성 Visitor
class CSSGeneratorVisitor implements Visitor<CSSResult> {
  visitSelector(node: SelectorNode): CSSResult {
    // 기존 generateCSSFromSelector 로직
  }
  
  visitCombinator(node: CombinatorNode): CSSResult {
    // 기존 handlePseudoClass 로직
  }
  
  visitState(node: StateNode): CSSResult {
    // 기존 generateStateCSS 로직
  }
  
  visitResponsive(node: ResponsiveNode): CSSResult {
    // 기존 generateResponsiveCSS 로직
  }
}

// 사용 예시
const visitor = new CSSGeneratorVisitor();
const result = astNode.accept(visitor);
```

## 구현 단계
1. AST Node 클래스들 정의
2. Visitor 인터페이스 정의
3. CSSGeneratorVisitor 구현
4. 기존 generator.ts 로직을 visitor로 마이그레이션
5. 테스트 및 검증

## 예상 효과
- generator.ts가 100줄 이하로 줄어들 것
- 각 visitor method가 20-30줄 정도로 간결해질 것
- 새로운 노드 타입 추가가 매우 쉬워질 것