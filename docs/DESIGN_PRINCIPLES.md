# Design Principles

AdorableCSS v2의 디자인 시스템은 Practical UI의 체계적인 접근 방식에서 영감을 받아 구축되었습니다.

## 🎯 핵심 원칙

### 1. 일관성 (Consistency)
- **동일한 디자인 언어**: 모든 컴포넌트와 패턴에서 동일한 시각적 언어 사용
- **예측 가능한 동작**: 사용자가 기대하는 방식으로 작동
- **통일된 간격**: 4px 기반의 spacing 시스템

### 2. 접근성 (Accessibility)
- **WCAG 2.1 AA 준수**: 모든 컴포넌트는 접근성 표준 준수
- **키보드 네비게이션**: 모든 인터랙티브 요소는 키보드로 접근 가능
- **충분한 색상 대비**: 텍스트와 배경 간 최소 4.5:1 대비

### 3. 확장성 (Scalability)
- **모듈화된 구조**: 독립적으로 사용 가능한 컴포넌트
- **테마 시스템**: 쉽게 커스터마이징 가능한 디자인 토큰
- **반응형 디자인**: 모든 화면 크기에서 최적화

### 4. 성능 (Performance)
- **최소한의 CSS**: 필요한 스타일만 생성
- **효율적인 애니메이션**: GPU 가속을 활용한 부드러운 전환
- **지연 로딩**: 필요한 시점에 리소스 로드

## 🎨 디자인 시스템 구조

### Color System
```css
/* Semantic Color Mapping */
--brand-primary: purple-500
--brand-secondary: pink-500
--ui-background: white
--ui-surface: gray-50
--text-primary: gray-900
--text-secondary: gray-700
```

### Typography Scale
- **Fluid Typography**: 뷰포트에 따라 자동으로 조정되는 타입 크기
- **Responsive Scale**: 모바일부터 데스크톱까지 최적화된 크기
- **Clear Hierarchy**: 명확한 시각적 계층 구조

### Spacing System
- **Base Unit**: 4px (0.25rem)
- **Scale**: xs(4px), sm(8px), md(12px), lg(16px), xl(24px), 2xl(32px)
- **Consistent Application**: 모든 컴포넌트에 동일하게 적용

### Component Architecture
```
Component
├── Base styles (기본 스타일)
├── Variants (변형)
├── States (상태)
└── Responsive (반응형)
```

## 🛠 구현 가이드라인

### 1. 컴포넌트 작성 시
- 기본 스타일을 먼저 정의
- 변형(variants)은 modifier로 추가
- 상태(states)는 pseudo-class 활용
- 반응형은 모바일 우선으로 설계

### 2. 색상 사용 시
- 시맨틱 색상 토큰 우선 사용
- 직접적인 색상값 사용 최소화
- 일관된 hover/active 상태 유지

### 3. 타이포그래피
- 역할 기반 클래스 사용 (display, heading, body, label)
- 직접적인 font-size 지정 피하기
- line-height와 letter-spacing 함께 고려

### 4. 인터랙션
- 모든 인터랙티브 요소에 hover 상태 추가
- focus 상태는 접근성을 위해 필수
- transition으로 부드러운 상태 변화

## 📋 체크리스트

새로운 컴포넌트를 만들 때:
- [ ] 시맨틱 색상 토큰 사용
- [ ] 4px 간격 시스템 준수
- [ ] 모든 상태(hover, active, focus, disabled) 구현
- [ ] 키보드 접근성 확인
- [ ] 반응형 동작 테스트
- [ ] 다크 모드 지원 (옵션)

## 🔗 참고 자료
- [Practical UI Design System](https://www.practical-ui.com/design-system/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Inclusive Components](https://inclusive-components.design/)