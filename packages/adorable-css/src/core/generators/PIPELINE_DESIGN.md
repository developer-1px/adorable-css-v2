# Pipeline Architecture Design

## 문제점
현재 generator.ts의 순환 참조 구조:
```
generateCSSFromAdorableCSS 
  → generateCSSFromSelector 
    → resolveStringRule 
      → generateCSSFromAdorableCSS (순환!)
```

## 해결 방안: Pipeline Architecture

### 핵심 개념
1. **Context 객체**: 모든 상태를 담는 불변 객체
2. **Processor 인터페이스**: 각 단계별 처리기
3. **Pipeline**: 프로세서들을 순차적으로 실행

### 구조 설계

```typescript
// Context - 처리 중인 모든 상태를 담음
interface PipelineContext {
  input: string;
  parsed?: ParsedResult;
  selector?: ParsedSelector;
  css?: CSSResult;
  cache: Map<string, any>;
  visited: Set<string>;
}

// Processor 인터페이스
interface Processor {
  name: string;
  canProcess(context: PipelineContext): boolean;
  process(context: PipelineContext): PipelineContext;
}

// Pipeline
class CSSPipeline {
  private processors: Processor[] = [];
  
  add(processor: Processor): this {
    this.processors.push(processor);
    return this;
  }
  
  execute(input: string): string {
    let context: PipelineContext = {
      input,
      cache: new Map(),
      visited: new Set()
    };
    
    for (const processor of this.processors) {
      if (processor.canProcess(context)) {
        context = processor.process(context);
      }
    }
    
    return context.css?.result || '';
  }
}
```

### 프로세서 구현 예시

```typescript
// 1. Cache Processor
class CacheProcessor implements Processor {
  name = 'cache';
  
  canProcess(ctx: PipelineContext): boolean {
    return cssGeneratorCache.has(ctx.input);
  }
  
  process(ctx: PipelineContext): PipelineContext {
    return {
      ...ctx,
      css: { result: cssGeneratorCache.get(ctx.input)! }
    };
  }
}

// 2. State Processor (hover:, focus: 등)
class StateProcessor implements Processor {
  name = 'state';
  
  canProcess(ctx: PipelineContext): boolean {
    return isStateClass(ctx.input);
  }
  
  process(ctx: PipelineContext): PipelineContext {
    const css = generateStateCSS(ctx.input);
    return { ...ctx, css: { result: css } };
  }
}

// 3. Responsive Processor (md:, lg: 등)
class ResponsiveProcessor implements Processor {
  name = 'responsive';
  
  canProcess(ctx: PipelineContext): boolean {
    return isResponsiveClass(ctx.input);
  }
  
  process(ctx: PipelineContext): PipelineContext {
    const css = generateResponsiveCSS(ctx.input);
    return { ...ctx, css: { result: css } };
  }
}

// 4. Parser Processor
class ParserProcessor implements Processor {
  name = 'parser';
  
  canProcess(ctx: PipelineContext): boolean {
    return !ctx.parsed && !!ctx.input;
  }
  
  process(ctx: PipelineContext): PipelineContext {
    const parsed = parseAdorableCSS(ctx.input);
    return { ...ctx, parsed };
  }
}

// 5. String Rule Processor
class StringRuleProcessor implements Processor {
  name = 'stringRule';
  
  canProcess(ctx: PipelineContext): boolean {
    if (!ctx.parsed) return false;
    const selector = ctx.parsed.value[0]?.selector;
    return priorityRegistry.hasString(selector?.name || selector?.image);
  }
  
  process(ctx: PipelineContext): PipelineContext {
    // String rule을 처리하되, 재귀 대신 새로운 Pipeline 실행
    // 순환 참조 방지: visited Set 활용
  }
}
```

### 장점
1. **순환 참조 해결**: 각 프로세서가 독립적으로 동작
2. **확장성**: 새로운 프로세서 추가가 쉬움
3. **테스트 용이성**: 각 프로세서를 개별적으로 테스트 가능
4. **가독성**: 처리 흐름이 명확함

### 구현 순서
1. Pipeline 기본 구조 구현
2. 기존 로직을 프로세서로 분리
3. 순환 참조 부분을 Pipeline 호출로 대체
4. 테스트 및 검증