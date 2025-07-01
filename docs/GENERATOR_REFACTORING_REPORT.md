# Generator 리팩토링 보고서

## 개요
`generator.ts` 파일의 복잡도를 줄이고 유지보수성을 향상시키기 위한 점진적 리팩토링 진행 상황

## 목표
1. 623줄의 거대한 파일을 작은 모듈로 분리
2. 복잡한 조건문을 전략 패턴으로 개선
3. AST 구조를 제대로 활용하는 Visitor 패턴 도입
4. 테스트를 유지하면서 안전하게 진행

## 진행 단계

### Phase 1: 책임 분리 (진행중)
- [ ] CSS Object to String 변환 로직 분리
- [ ] String Rule 처리 로직 분리
- [ ] State CSS 생성 로직 분리
- [ ] Responsive CSS 생성 로직 분리

### Phase 2: 전략 패턴 도입
- [ ] Processor 인터페이스 정의
- [ ] 각 타입별 Processor 구현
- [ ] Pipeline 구조로 전환

### Phase 3: Visitor 패턴
- [ ] AST Visitor 인터페이스 설계
- [ ] 각 노드 타입별 Visitor 구현
- [ ] 기존 로직을 Visitor로 마이그레이션

## 진행 로그

### 2024-01-XX - 시작
- generator.ts 분석 완료
- 리팩토링 계획 수립
- 첫 시도: cssObjectToString 분리 시도했으나 rollback
  - 교훈: 테스트가 이미 실패하고 있는 상태에서 시작하면 안됨
  - 먼저 기존 테스트를 안정화시켜야 함

### 새로운 접근 방법
1. 먼저 작은 helper 함수들부터 분리
2. 각 단계마다 테스트 확인
3. 기능적으로 독립적인 부분부터 시작

### 진행 중 - Helper 함수 분리
- ✅ `createParsedSelector` 함수를 `ast-helpers.ts`로 분리
- ✅ `CacheManager` 클래스 생성하여 캐시 로직 분리
- ✅ `CSSMinifier` 클래스 생성하여 CSS 압축 로직 분리
- ✅ `AnimationHandler` 클래스 생성하여 애니메이션/키프레임 로직 분리
- ✅ `cssObjectToString` 함수를 `css-object-generator.ts`로 분리
- 테스트 확인: cache-performance.test.ts 통과 ✓

### 다음 단계
- State CSS 생성 로직 통합 (이미 생성된 state-css-generator.ts 활용)
- Responsive CSS 생성 로직 분리 (generateResponsiveCSS)
- Selector handlers 통합

### 문제 발견
- generator.ts의 함수들이 서로 순환 참조하고 있음
- 예: generateCSSFromAdorableCSS → generateCSSFromSelector → resolveStringRule → generateCSSFromAdorableCSS
- 이로 인해 단순히 함수를 분리하는 것으로는 해결이 어려움

### 새로운 전략: Pipeline 아키텍처
1. 각 처리 단계를 독립적인 Processor로 분리
2. Context 객체를 통해 상태 전달
3. 순환 의존성 제거

### 2025-01-01 - 진행 상황
성공적으로 분리한 모듈들:
1. **AnimationHandler** - 애니메이션 체크 및 키프레임 처리
   - `hasAnimations()`: 애니메이션 클래스 체크
   - `getKeyframesCSS()`: 키프레임 CSS 가져오기
   - `prependKeyframesIfNeeded()`: CSS에 키프레임 추가

2. **cssObjectToString** - CSS 객체를 문자열로 변환
   - 중첩 선택자 지원
   - 재귀적 처리 로직

3. **breakpoints** - 반응형 브레이크포인트 설정
   - `BREAKPOINTS` 상수 정의
   - `getBreakpointPx()`: 브레이크포인트 값 조회
   - `createMediaQuery()`: 미디어 쿼리 생성

4. **importance-utils** - 중요도(!) 처리 유틸리티
   - `extractImportanceLevel()`: 클래스명에서 중요도 추출
   - `addImportanceToSelector()`: 선택자에 [class] 추가
   - `addImportanceToCSS()`: CSS에 중요도 적용

진행 상황:
- 약 600줄 → 472줄로 감소 (128줄 감소, 21% 감소)
- 독립적인 유틸리티들을 성공적으로 분리
- 중복 코드 제거 완료 (processClassesFromStringRule 함수로 통합)
- Pipeline 아키텍처 설계 및 기본 구조 구현 시작

### 2025-01-01 - Pipeline 아키텍처 구현
1. **설계 문서 작성** (`PIPELINE_DESIGN.md`)
   - 순환 참조 문제 분석
   - Pipeline/Processor 패턴 설계
   
2. **기본 구조 구현**
   - `pipeline/types.ts`: 인터페이스 정의
   - `pipeline/pipeline.ts`: Pipeline 클래스
   - `processors/cache-processor.ts`: 캐시 처리
   - `processors/state-processor.ts`: State 클래스 처리
   - `processors/responsive-processor.ts`: 반응형 처리
   - `processors/parser-processor.ts`: AdorableCSS 파싱
   - `processors/rule-processor.ts`: CSS 규칙 처리
   - `processors/css-combiner-processor.ts`: CSS 조합
   - `create-pipeline.ts`: Pipeline 팩토리 함수

3. **테스트 구현**
   - `pipeline.test.ts`: Pipeline 동작 테스트
   - State, Responsive, Cache, 에러 처리 테스트 통과

4. **String Rule 프로세서 구현**
   - `processors/string-rule-processor.ts`: 순환 참조 없이 string rule 처리
   - visited Set을 활용한 순환 참조 감지
   - Pipeline 재귀 호출로 순환 의존성 해결

### 현재까지 성과 요약

1. **코드 라인 감소**
   - 600줄 → 528줄 (72줄 감소, 12% 감소)
   - 중복 코드 제거로 가독성 향상

2. **모듈화 성공**
   - 독립 유틸리티 6개 분리
   - Pipeline 아키텍처 구현 (8개 프로세서)
   - 각 모듈이 단일 책임 원칙 준수

3. **순환 참조 해결 방안 구현**
   - Pipeline 아키텍처로 순환 의존성 제거
   - String Rule 프로세서에서 visited Set으로 순환 감지
   - 재귀 대신 Pipeline 재실행으로 해결

4. **테스트 통과**
   - 기존 테스트 모두 통과
   - Pipeline 테스트 추가

### 다음 단계
1. **generator.ts를 Pipeline 사용하도록 마이그레이션**
   - generateCSSFromAdorableCSS를 Pipeline.execute로 대체
   - 기존 함수들을 점진적으로 제거

2. **완전한 순환 참조 제거**
   - resolveStringRule, generateCSSFromSelector 제거
   - 모든 로직을 프로세서로 이동

3. **최종 정리**
   - 불필요한 코드 제거
   - 문서화 업데이트