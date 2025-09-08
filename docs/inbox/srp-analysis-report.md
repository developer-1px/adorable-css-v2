# AdorableCSS 단일책임원칙(SRP) 분석 보고서

## 1. 개요

이 보고서는 AdorableCSS의 `/packages/adorable-css/src` 디렉토리에 대한 단일책임원칙(SRP) 분석 결과를 정리한 것입니다. 각 파일과 클래스가 하나의 책임만을 가지고 있는지 확인하고, SRP 위반 사례와 리팩토링 제안사항을 제시합니다.

## 2. 디렉토리 구조 분석

### 2.1 현재 아키텍처
```
src/
├── 01-core/           # 핵심 기능 (파서, 유틸리티)
├── 02-design_tokens/  # 디자인 토큰 시스템
├── 03-values/         # 값 변환 처리
├── 04-rules/          # CSS 룰 정의
├── 05-components/     # 컴포넌트 정의
├── 06-plugins/        # 플러그인 시스템
├── 07-generator/      # CSS 생성기
└── __tests__/         # 테스트 파일
```

### 2.2 책임 분리 현황
- **양호함**: 각 디렉토리가 명확한 책임을 가지고 있음
- **문제점**: 일부 파일에서 여러 책임을 동시에 처리하는 경우 발견

## 3. 파일별 책임 분석

### 3.1 01-core/ 디렉토리

#### 3.1.1 parser/parser.js
**책임**: CSS 클래스 파싱
- **현재 상태**: ✅ 양호
- **단일 책임**: 파싱만 담당
- **문제점**: 280줄로 길지만, 모든 기능이 파싱과 관련됨

#### 3.1.2 utils/memo.ts
**책임**: 메모이제이션 유틸리티
- **현재 상태**: ✅ 양호
- **단일 책임**: 메모화 기능만 제공

### 3.2 02-design_tokens/ 디렉토리

#### 3.2.1 tokenRegistry.ts
**책임**: 토큰 추적 및 관리
- **현재 상태**: ✅ 양호
- **단일 책임**: 토큰 등록과 추적만 담당
- **라인 수**: 26줄로 매우 간결

#### 3.2.2 token-resolver.ts (추정)
**책임**: 토큰 해석 및 변환
- **현재 상태**: ✅ 양호
- **단일 책임**: 토큰 값 해석에만 집중

### 3.3 03-values/ 디렉토리

#### 3.3.1 makeValue.ts
**책임**: 값 변환 메인 진입점
- **현재 상태**: ✅ 양호
- **단일 책임**: 레거시 호환성 유지 및 재수출
- **라인 수**: 14줄로 매우 간결

#### 3.3.2 value-utils.ts
**책임**: 값 변환 유틸리티 함수들
- **현재 상태**: ⚠️ 주의 필요
- **문제점**: 여러 종류의 값 변환 로직을 포함 (88줄)
- **포함 기능**:
  - CSS 변수 처리
  - 문자열 처리
  - 숫자 처리
  - 비율 계산
  - 단위 변환 (px, deg)

### 3.4 04-rules/ 디렉토리

#### 3.4.1 rule2-registry.ts
**책임**: Rule2 시스템 등록 및 관리
- **현재 상태**: ❌ SRP 위반 심각
- **문제점**: 315줄의 대용량 파일
- **여러 책임**:
  - 핸들러 등록
  - 핸들러 조회
  - 초기화 로직
  - 모든 룰 정의 포함

#### 3.4.2 figma/layout/size.ts
**책임**: 크기 관련 CSS 룰
- **현재 상태**: ✅ 양호
- **단일 책임**: 크기 속성 처리만 담당
- **라인 수**: 14줄로 매우 간결

#### 3.4.3 figma/layout/size-utils.ts
**책임**: 크기 처리 유틸리티
- **현재 상태**: ⚠️ 주의 필요
- **문제점**: 여러 크기 처리 로직을 포함 (70줄)
- **포함 기능**:
  - 단일 크기 처리
  - 이중 크기 처리
  - 종횡비 처리
  - 제약 조건 처리

### 3.5 05-components/ 디렉토리

#### 3.5.1 defineComponent.ts
**책임**: 컴포넌트 정의 시스템
- **현재 상태**: ❌ SRP 위반 심각
- **문제점**: 230줄의 대용량 파일
- **여러 책임**:
  - 인수 파싱
  - 상태 적용
  - 복합 변형 처리
  - 컴포넌트 생성
  - 테마 컴포넌트 처리

### 3.6 07-generator/ 디렉토리

#### 3.6.1 generator.ts
**책임**: CSS 생성 엔진
- **현재 상태**: ❌ SRP 위반 심각
- **문제점**: 218줄의 대용량 파일
- **여러 책임**:
  - 파싱 결과 처리
  - 레이어 관리
  - 상태 클래스 처리
  - CSS 생성
  - 토큰 처리

## 4. SRP 위반 사례들

### 4.1 심각한 위반 사례

#### 4.1.1 rule2-registry.ts
**위반 내용**:
- 핸들러 등록 로직
- 핸들러 조회 로직
- 초기화 로직
- 모든 룰 정의 포함

**문제점**:
- 315줄의 대용량 파일
- 변경 사유가 4개 이상
- 테스트 복잡도 높음

#### 4.1.2 generator.ts
**위반 내용**:
- CSS 생성 로직
- 레이어 관리
- 상태 처리
- 토큰 처리

**문제점**:
- 218줄의 대용량 파일
- 여러 외부 의존성
- 복잡한 제어 흐름

#### 4.1.3 defineComponent.ts
**위반 내용**:
- 컴포넌트 정의
- 인수 파싱
- 상태 관리
- 테마 처리

**문제점**:
- 230줄의 대용량 파일
- 복잡한 조건 로직
- 여러 관심사 혼재

### 4.2 중간 위반 사례

#### 4.2.1 value-utils.ts
**위반 내용**:
- CSS 변수 처리
- 문자열 처리
- 숫자 처리
- 단위 변환

**문제점**:
- 88줄로 제한선 근접
- 여러 변환 로직 포함

#### 4.2.2 size-utils.ts
**위반 내용**:
- 단일 크기 처리
- 이중 크기 처리
- 종횡비 처리

**문제점**:
- 70줄로 적절한 수준
- 관련성이 높은 기능들

## 5. 리팩토링 제안사항

### 5.1 고우선순위 리팩토링

#### 5.1.1 rule2-registry.ts 분리
```typescript
// 제안 구조
src/04-rules/
├── registry/
│   ├── rule2-registry.ts        # 핵심 등록 로직만
│   ├── rule2-initializer.ts     # 초기화 로직
│   ├── rule2-definitions.ts     # 룰 정의들
│   └── rule2-layers.ts          # 레이어 관리
```

**분리 기준**:
- `rule2-registry.ts`: 등록/조회 로직만 (50줄 이하)
- `rule2-initializer.ts`: 초기화 로직 (100줄 이하)
- `rule2-definitions.ts`: 룰 정의들 (200줄 이하)
- `rule2-layers.ts`: 레이어 관리 (50줄 이하)

#### 5.1.2 generator.ts 분리
```typescript
// 제안 구조
src/07-generator/
├── core/
│   ├── css-generator.ts         # 핵심 CSS 생성
│   ├── layer-manager.ts         # 레이어 관리
│   ├── state-processor.ts       # 상태 처리
│   └── token-processor.ts       # 토큰 처리
└── generator.ts                 # 메인 진입점
```

**분리 기준**:
- `css-generator.ts`: 순수 CSS 생성 로직 (80줄 이하)
- `layer-manager.ts`: 레이어 관리 로직 (60줄 이하)
- `state-processor.ts`: 상태 클래스 처리 (80줄 이하)
- `token-processor.ts`: 토큰 처리 로직 (40줄 이하)

#### 5.1.3 defineComponent.ts 분리
```typescript
// 제안 구조
src/05-components/
├── core/
│   ├── component-parser.ts      # 인수 파싱
│   ├── state-applier.ts         # 상태 적용
│   ├── compound-processor.ts    # 복합 변형 처리
│   └── theme-processor.ts       # 테마 처리
└── defineComponent.ts           # 메인 진입점
```

**분리 기준**:
- `component-parser.ts`: 인수 파싱 로직 (50줄 이하)
- `state-applier.ts`: 상태 적용 로직 (30줄 이하)
- `compound-processor.ts`: 복합 변형 처리 (80줄 이하)
- `theme-processor.ts`: 테마 처리 로직 (60줄 이하)

### 5.2 중우선순위 리팩토링

#### 5.2.1 value-utils.ts 분리
```typescript
// 제안 구조
src/03-values/
├── processors/
│   ├── css-var-processor.ts     # CSS 변수 처리
│   ├── string-processor.ts      # 문자열 처리
│   ├── number-processor.ts      # 숫자 처리
│   └── unit-processor.ts        # 단위 변환
└── value-utils.ts               # 메인 진입점
```

#### 5.2.2 size-utils.ts 분리 (선택적)
```typescript
// 제안 구조
src/04-rules/figma/layout/
├── size-processors/
│   ├── single-size.ts           # 단일 크기 처리
│   ├── double-size.ts           # 이중 크기 처리
│   └── aspect-ratio.ts          # 종횡비 처리
└── size-utils.ts                # 메인 진입점
```

### 5.3 저우선순위 리팩토링

#### 5.3.1 parser.js 개선
- 현재 280줄이지만 모든 기능이 파싱과 관련됨
- 함수 단위로 분리하여 가독성 향상
- TypeScript 마이그레이션 고려

## 6. 아키텍처 개선 방안

### 6.1 레이어 아키텍처 강화

#### 6.1.1 현재 구조
```
07-generator → 04-rules → 03-values → 02-design_tokens → 01-core
```

#### 6.1.2 개선된 구조
```
07-generator/
├── core/           # 핵심 생성 로직
├── processors/     # 특화 처리기들
└── interfaces/     # 인터페이스 정의

04-rules/
├── registry/       # 등록 시스템
├── handlers/       # 핸들러들
└── definitions/    # 룰 정의들

03-values/
├── processors/     # 값 처리기들
├── transformers/   # 변환기들
└── validators/     # 검증기들
```

### 6.2 의존성 역전 원칙 적용

#### 6.2.1 현재 문제점
- 구체적인 클래스에 의존
- 테스트 어려움
- 확장성 부족

#### 6.2.2 개선 방안
```typescript
// 인터페이스 정의
interface CSSGenerator {
  generate(classes: string[]): string;
}

interface RuleHandler {
  handle(rule: Rule): string;
}

interface TokenResolver {
  resolve(token: string): string;
}

// 구현체는 인터페이스에 의존
class LayerManager implements CSSGenerator {
  constructor(
    private ruleHandler: RuleHandler,
    private tokenResolver: TokenResolver
  ) {}
}
```

### 6.3 팩토리 패턴 도입

#### 6.3.1 현재 문제점
- 객체 생성 로직 분산
- 초기화 복잡도 증가

#### 6.3.2 개선 방안
```typescript
// 팩토리 클래스
class GeneratorFactory {
  static create(): CSSGenerator {
    const tokenResolver = new TokenResolver();
    const ruleHandler = new RuleHandler(tokenResolver);
    const layerManager = new LayerManager(ruleHandler, tokenResolver);
    
    return new CSSGenerator(layerManager);
  }
}
```

### 6.4 전략 패턴 적용

#### 6.4.1 현재 문제점
- 조건부 로직 많음
- 새로운 전략 추가 어려움

#### 6.4.2 개선 방안
```typescript
// 전략 인터페이스
interface ProcessingStrategy {
  process(value: string): string;
}

// 구체적인 전략들
class SingleSizeStrategy implements ProcessingStrategy {
  process(value: string): string {
    // 단일 크기 처리 로직
  }
}

class DoubleSizeStrategy implements ProcessingStrategy {
  process(value: string): string {
    // 이중 크기 처리 로직
  }
}

// 컨텍스트
class SizeProcessor {
  constructor(private strategy: ProcessingStrategy) {}
  
  process(value: string): string {
    return this.strategy.process(value);
  }
}
```

## 7. 마이그레이션 계획

### 7.1 1단계: 고우선순위 리팩토링 (2주)
1. `rule2-registry.ts` 분리
2. `generator.ts` 분리
3. `defineComponent.ts` 분리
4. 테스트 코드 업데이트

### 7.2 2단계: 중우선순위 리팩토링 (1주)
1. `value-utils.ts` 분리
2. `size-utils.ts` 분리 (선택적)
3. 테스트 코드 업데이트

### 7.3 3단계: 아키텍처 개선 (2주)
1. 인터페이스 정의
2. 의존성 역전 적용
3. 팩토리 패턴 도입
4. 전략 패턴 적용

### 7.4 4단계: 검증 및 최적화 (1주)
1. 성능 테스트
2. 코드 품질 검증
3. 문서화 업데이트

## 8. 예상 효과

### 8.1 코드 품질 개선
- **가독성 향상**: 파일당 평균 라인 수 50% 감소
- **유지보수성 증가**: 변경 영향 범위 최소화
- **테스트 용이성**: 단위 테스트 작성 용이

### 8.2 개발 생산성 향상
- **기능 추가 용이**: 새로운 룰/컴포넌트 추가 간편
- **버그 수정 용이**: 책임 범위 명확화
- **코드 재사용성**: 모듈화된 컴포넌트 재사용

### 8.3 성능 개선
- **번들 크기 감소**: 트리 셰이킹 최적화
- **메모리 사용량 감소**: 불필요한 의존성 제거
- **컴파일 시간 단축**: 점진적 컴파일 가능

## 9. 결론

AdorableCSS의 현재 코드베이스는 전반적으로 잘 구조화되어 있지만, 몇 가지 핵심 파일에서 SRP 위반이 발견되었습니다. 특히 `rule2-registry.ts`, `generator.ts`, `defineComponent.ts`는 즉시 리팩토링이 필요한 상태입니다.

제안된 리팩토링 계획을 통해 코드의 가독성, 유지보수성, 테스트 용이성을 크게 향상시킬 수 있을 것으로 예상됩니다. 특히 300줄 이상의 대용량 파일들을 50-100줄 단위의 작은 모듈로 분리하면 각각이 명확한 단일 책임을 가지게 될 것입니다.

점진적인 마이그레이션을 통해 기존 기능을 유지하면서도 코드 품질을 향상시킬 수 있으며, 이는 향후 기능 확장과 성능 최적화에 큰 도움이 될 것입니다.