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
- 테스트 확인: cache-performance.test.ts 통과 ✓

### 다음 단계
- State CSS 생성 로직 분리 (generateStateCSS)
- Responsive CSS 생성 로직 분리 (generateResponsiveCSS)