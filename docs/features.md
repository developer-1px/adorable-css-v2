# AdorableCSS v2 Features

## 핵심 기능

### 1. Figma-first 디자인 시스템
- Figma Auto Layout과 1:1 매핑되는 API
- `hbox()`, `vbox()` 레이아웃 시스템
- `w(fill)`, `w(hug)` 크기 지정
- `gap()` 기반 spacing

### 2. 수학적 스케일 시스템
- 폰트 크기: 1.2 비율 기반 스케일
- 간격: 선형 진행 스케일
- 모든 스케일은 수학 공식으로 생성

### 3. 의미론적 컴포넌트
- `body()`, `heading()`, `display()` 등 타이포그래피 컴포넌트
- `button()`, `card()`, `container()` 등 UI 컴포넌트
- 디자인 시스템 규칙이 내장된 컴포넌트

### 4. 반응형 디자인
- `sm:`, `md:`, `lg:` 등 breakpoint 프리픽스
- `..sm:`, `..md:` 등 max-width 쿼리
- Fluid typography with clamp()

### 5. 상태 관리
- `hover:`, `focus:`, `active:` 등 상태 프리픽스
- `group-hover:`, `peer-focus:` 등 그룹 상태
- 조합 가능한 상태 시스템

### 6. CSS 레이어 시스템
- `@layer` 기반 우선순위 관리
- base, components, composition, utilities 레이어
- 예측 가능한 CSS 캐스케이딩

### 7. 동적 토큰 시스템
- 사용된 토큰만 CSS 변수로 생성
- 런타임에 필요한 토큰 자동 감지
- 최적화된 CSS 번들 크기

### 8. 플러그인 시스템
- 색상, 애니메이션, 토큰 플러그인
- 확장 가능한 아키텍처
- 커스텀 플러그인 지원

### 9. 자동 CSS 주입
- import만으로 자동 스타일 적용
- 브라우저 환경 자동 감지
- 설정 가능한 주입 옵션

### 10. TypeScript 지원
- 완전한 타입 정의
- IntelliSense 지원
- 타입 안전한 API

## 최신 업데이트 (2025-01-07)

### 동적 스타일 매니저 통합
- `auto-inject`와 `rule generation`이 하나로 통합됨
- 클래스 사용 시 실시간으로 CSS와 토큰이 함께 생성
- MutationObserver로 DOM 변경 감지하여 자동 업데이트
- 더 이상 수동으로 토큰을 등록할 필요 없음

### 새로운 API
```typescript
// 동적 스타일 초기화
initDynamicStyles(options?: DynamicStyleManagerOptions);

// 클래스 동적 추가
addDynamicClasses(...classes: string[]);

// 동적 스타일 매니저 접근
getDynamicStyleManager();

// 정리
destroyDynamicStyles();
```

### 장점
- 토큰이 필요한 시점에 자동 생성
- CSS와 토큰이 동기화되어 항상 일치
- 더 나은 성능과 메모리 효율성
- CDN 버전도 동일한 시스템 사용

## 로드맵

### 단기 (1-3개월)
- [ ] CSS-only 인터랙션 컴포넌트
- [ ] 고급 애니메이션 시스템
- [ ] 폼 컴포넌트 시스템

### 중기 (3-6개월)
- [ ] 접근성 향상
- [ ] Print 스타일 지원
- [ ] 최신 CSS 기능 활용

### 장기 (6개월+)
- [ ] Figma 플러그인
- [ ] VS Code 확장
- [ ] 온라인 플레이그라운드