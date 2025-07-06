# AdorableCSS Core - Folder Structure Analysis Report

## 현재 구조 분석

### 1. 전체 구조 개요

```
src/
├── core/           # 핵심 런타임 기능 (auto-injection)
├── parser/         # 파싱 엔진 및 CSS 생성
├── tokens/         # 디자인 토큰 시스템
├── values/         # 값 변환 유틸리티
├── keyframes/      # 애니메이션 키프레임 정의
├── plugins/        # 최상위 플러그인 (색상, 토큰)
└── rules/          # 모든 CSS 규칙 정의
    ├── typography/     # 폰트, 텍스트, 색상 유틸리티
    ├── layout/        # Flexbox, grid, spacing, sizing
    ├── visuals/       # 배경, 테두리, 그림자
    ├── position/      # 위치 관련 유틸리티
    ├── effects/       # 변형, 필터, perspective
    ├── interaction/   # 커서, 이벤트
    ├── utilities/     # 일반 유틸리티 (focus, transforms, transitions)
    └── plugins/       # 고급 기능 및 UI 컴포넌트
        ├── ui/            # UI 전용 컴포넌트
        └── interactive/   # 인터랙티브 기능
```

### 2. 발견된 주요 문제점

#### 2.1 중복된 기능

1. **Token Injection**
   - `tokens/index.ts`와 `plugins/tokens.ts`에 `injectTokens` 중복 존재

2. **Heading 규칙**
   - `rules/plugins/heading.ts` 
   - `rules/plugins/ui/heading.ts`
   - 동일한 기능이 두 위치에 분산

3. **Card 컴포넌트**
   - `rules/plugins/card.ts`
   - `rules/plugins/ui/card.ts`
   - 중복된 구현

4. **Transform 유틸리티**
   - `effects/transforms.ts`
   - `utilities/transforms.ts`
   - 비슷한 기능이 다른 위치에 존재

5. **Semantic Colors**
   - `tokens/semantic-colors.ts`
   - `rules/semantic-colors.ts`
   - 동일한 개념이 두 곳에 구현

#### 2.2 잘못된 위치의 파일들

1. **색상 관련 플러그인**
   - `src/plugins/colors.ts`
   - `src/plugins/oklch-colors.ts`
   - `src/plugins/advanced-colors.ts`
   - → 규칙으로 import되는데 plugins 폴더에 위치

2. **개발/디버그 파일**
   - `rules/debug-parser.ts`
   - `rules/debug-test.ts`
   - `rules/manual-test.ts`
   - → 프로덕션 코드와 섞여 있음

3. **테스트 파일**
   - 소스 파일과 같은 디렉토리에 혼재
   - 별도의 테스트 디렉토리 필요

#### 2.3 모호한 계층 구조

1. **"Plugin" 용어의 중복 사용**
   - `src/plugins/` - 색상 시스템, 토큰 주입
   - `rules/plugins/` - UI 컴포넌트, 고급 기능
   - 서로 다른 개념에 같은 용어 사용

2. **Utilities의 분산**
   - `rules/utilities/`
   - `rules/` 직속의 `utilities.ts`
   - 개별 카테고리 내의 유틸리티들

### 3. 현재 구조의 강점

1. **Parser 시스템**: 명확한 관심사 분리
2. **Token 시스템**: 깔끔한 디자인 토큰 구조
3. **Rule 카테고리**: 대체로 관심사별로 잘 구성됨
4. **Value Processing**: 독립적이고 명확한 역할

### 4. 제안하는 새로운 구조

```
src/
├── core/               # 핵심 시스템
│   ├── parser/         # 파싱 엔진
│   ├── generator/      # CSS 생성
│   ├── runtime/        # 런타임 기능 (auto-inject)
│   └── values/         # 값 변환 시스템
│
├── design-system/      # 디자인 시스템
│   ├── tokens/         # 디자인 토큰
│   ├── colors/         # 색상 시스템 (oklch, semantic)
│   └── keyframes/      # 애니메이션 정의
│
├── rules/              # CSS 규칙 (Figma 멘탈 모델)
│   ├── layout/         # 레이아웃 (hbox, vbox, grid, spacing)
│   ├── style/          # 스타일 (colors, typography, backgrounds)
│   ├── effects/        # 효과 (shadows, transforms, filters)
│   ├── position/       # 위치 (layer, absolute, relative)
│   └── interaction/    # 인터랙션 (cursor, events, focus)
│
├── components/         # 디자인 시스템 컴포넌트
│   ├── primitives/     # 기본 컴포넌트 (button, card, heading)
│   ├── patterns/       # 고급 패턴 (section, container, prose)
│   └── features/       # 기능성 컴포넌트 (tabs, glass, glow)
│
├── extensions/         # 확장 기능
│   ├── responsive/     # 반응형 시스템
│   ├── animations/     # 애니메이션 시스템
│   └── advanced/       # 고급 기능
│
└── __tests__/          # 모든 테스트 파일
    └── (미러링된 구조)
```

### 5. 리팩토링 우선순위

#### Phase 1: 중복 제거
1. Heading, Card 컴포넌트 통합
2. Transform 유틸리티 통합
3. Semantic colors 통합
4. Token injection 통합

#### Phase 2: 파일 재배치
1. 색상 플러그인을 design-system/colors로 이동
2. 개발/디버그 파일을 별도 폴더로 분리
3. 테스트 파일을 __tests__로 이동

#### Phase 3: 구조 개선
1. plugins 폴더명을 명확하게 변경
2. components와 extensions 분리
3. core 기능 재구성

### 6. 멘탈 모델 정렬

**Figma-First 원칙에 따른 구조**:
- **Layout**: Auto Layout 개념 (hbox, vbox, gap)
- **Style**: Fill, Stroke, Effects
- **Components**: 재사용 가능한 디자인 시스템 요소
- **Extensions**: 코드 특화 기능 (responsive, animations)

이 구조는 디자이너와 개발자 모두가 이해하기 쉬운 멘탈 모델을 제공합니다.