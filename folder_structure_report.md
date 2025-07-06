## AdorableCSS 폴더 구조 분석 및 리팩토링 보고서

### 1. 개요

이 보고서는 `adorable-css-v2` 프로젝트의 현재 폴더 구조를 "의존성(Coupling)"과 "멘탈 모델(Mental Model)"의 관점에서 분석하고, 코드의 단순성, 가독성, 유지보수성 및 확장성을 향상시키기 위한 변경 제안을 제시합니다.

### 2. 현재 폴더 구조 분석

```
/Users/user/Desktop/adorable-css-v2/
└───packages/
    ├───adorable-css/ (핵심 라이브러리)
    │   ├───src/
    │   │   ├───index.ts (메인 진입점)
    │   │   ├───__tests__/
    │   │   ├───components/ (UI 컴포넌트 정의)
    │   │   │   ├───patterns/
    │   │   │   ├───primitives/
    │   │   │   └───defineComponent.ts
    │   │   ├───config/
    │   │   ├───core/ (핵심 로직: 파서, 제너레이터, 런타임, 유틸리티)
    │   │   │   ├───generators/
    │   │   │   ├───parser/
    │   │   │   ├───runtime/
    │   │   │   └───utils/
    │   │   ├───design-system/ (디자인 토큰, 색상)
    │   │   │   ├───colors/
    │   │   │   └───tokens/
    │   │   ├───extensions/ (플러그인/확장 기능: 애니메이션, 글래스모피즘)
    │   │   ├───rules/ (CSS 규칙 정의: 레이아웃, 스타일 등)
    │   │   │   ├───effects/
    │   │   │   ├───interaction/
    │   │   │   ├───layout/
    │   │   │   ├───position/
    │   │   │   ├───style/
    │   │   │   ├───text/
    │   │   │   └───utilities/
    │   │   └───tokens/ (토큰 레지스트리, 스케일 설정/공식)
    ├───adorable-css-cdn/ (CDN 특정 빌드/로직)
    ├───homepage-kit/ (웹사이트/문서화)
```

#### 2.1. 잘된 부분 (Good Practices)

*   **모노레포 구조 (`packages/`)**: `adorable-css` (핵심 라이브러리), `adorable-css-cdn` (배포), `homepage-kit` (문서/웹사이트)를 `packages/` 디렉토리 아래에 분리한 것은 매우 훌륭합니다. 이는 각 프로젝트의 책임과 목적을 명확히 하고, 독립적인 개발 및 배포를 가능하게 합니다.
*   **`adorable-css/src/core/`**: `parser`, `generator`, `runtime`, `utils`와 같이 라이브러리의 가장 기본적인 기능을 `core` 아래에 묶은 것은 응집도가 높고 잘 구성되어 있습니다. 파서와 제너레이터는 밀접하게 관련되어 있어 함께 두는 것이 합리적입니다.
*   **`adorable-css/src/rules/`**: CSS 규칙을 `layout`, `style`, `effects` 등 카테고리별로 분류한 것은 규칙의 양이 많아질수록 관리 및 탐색에 용이합니다.

#### 2.2. 개선이 필요한 부분 (Areas for Improvement)

**1. `adorable-css/src/design-system/`와 `adorable-css/src/tokens/`의 중복 및 모호성**

*   **문제점**: `src/tokens/` (예: `tokenRegistry.ts`, `scaleConfig.ts`)와 `src/design-system/tokens/` (예: `index.ts`, `createTokensPlugin`)가 모두 토큰 관련 로직을 포함하고 있습니다. `design-system/colors/colors.ts`도 사실상 색상 토큰을 정의합니다. 이로 인해 토큰 관련 로직이 여러 곳에 분산되어 있어, 어디에서 어떤 토큰 관련 기능을 찾아야 할지 혼란스럽습니다.
*   **의존성**: `design-system/tokens/index.ts`가 `tokens/tokenRegistry.ts`를 임포트하는 등, 하위 디렉토리가 상위 디렉토리의 내용을 임포트하는 듯한 역전 현상이 발생할 수 있습니다.
*   **멘탈 모델**: "tokens"와 "design-system"이라는 두 가지 유사한 개념이 분리되어 있어, 토큰 관리의 단일 책임 원칙이 모호해집니다.

**2. `adorable-css/src/components/`의 위치 및 의존성**

*   **문제점**: `components/` (패턴, 프리미티브)가 `core`, `rules`, `tokens`와 같은 라이브러리 엔진의 핵심 부분과 동일한 레벨에 위치하고 있습니다. 컴포넌트는 일반적으로 라이브러리의 *사용 예시*이거나, 라이브러리 위에 구축된 *고수준의 추상화*입니다.
*   **의존성**: `rule-definitions.ts` (라이브러리의 핵심 규칙 정의)가 `components/patterns` 및 `components/primitives`에서 규칙을 직접 임포트하고 있습니다. 이는 라이브러리의 핵심 엔진이 특정 UI 컴포넌트 구현에 강하게 결합되어 있음을 의미하며, 이는 바람직하지 않은 강한 결합(tight coupling)입니다. 라이브러리 엔진은 컴포넌트의 존재를 몰라야 합니다.
*   **멘탈 모델**: 라이브러리의 "엔진"과 "엔진을 사용하는 예시/고수준 추상화" 간의 경계가 모호합니다.

**3. `adorable-css/src/extensions/`의 위치 및 의존성**

*   **문제점**: `extensions/` (플러그인)도 `core`와 동일한 레벨에 위치하고 있습니다. 확장 기능은 라이브러리의 핵심 기능을 *확장*하는 것이므로, 핵심 기능과 동일한 레벨에 두는 것보다 별도의 플러그인/모듈 디렉토리로 분리하는 것이 더 명확합니다.
*   **의존성**: `rule-definitions.ts`가 `extensions`에서 규칙을 임포트합니다. 이는 `components`만큼 심각하지는 않지만, 핵심 규칙 정의가 특정 확장 기능에 직접적으로 의존하게 만듭니다.

### 3. 변경 제안 (Proposed Folder Structure)

다음은 의존성을 줄이고 멘탈 모델을 명확히 하며 코드 라인 수를 간결하게 유지하는 데 도움이 되는 제안된 폴더 구조입니다.

```
/Users/user/Desktop/adorable-css-v2/
└───packages/
    ├───adorable-css/
    │   ├───src/
    │   │   ├───core/
    │   │   │   ├───parser/      (토큰화, 파싱, AST 생성)
    │   │   │   ├───generator/   (AST로부터 CSS 생성)
    │   │   │   ├───runtime/     (자동 주입, 전역 설정 등 런타임 관련)
    │   │   │   └───utils/       (범용 유틸리티 함수)
    │   │   │
    │   │   ├───rules/
    │   │   │   ├───definitions/ (중앙 규칙 정의: rule-definitions.ts)
    │   │   │   ├───categories/  (CSS 속성 카테고리별 규칙 구현: layout, style, effects, interaction, text, position, utilities)
    │   │   │   └───types.ts     (규칙 관련 타입 정의)
    │   │   │
    │   │   ├───design-tokens/   (모든 디자인 토큰 관련 로직 통합)
    │   │   │   ├───registry.ts  (사용된 토큰 추적/등록)
    │   │   │   ├───scales.ts    (스케일 설정, 공식, 값 계산)
    │   │   │   ├───colors.ts    (색상 팔레트, 시맨틱 색상 정의)
    │   │   │   └───index.ts     (디자인 토큰의 공용 API)
    │   │   │
    │   │   ├───plugins/         (라이브러리 핵심 기능을 확장하는 모듈/플러그인)
    │   │   │   ├───animations/
    │   │   │   ├───glassmorphism/
    │   │   │   ├───responsive/
    │   │   │   └───index.ts     (플러그인 등록/내보내기)
    │   │   │
    │   │   ├───components/      (라이브러리 위에 구축된 고수준 컴포넌트. 만약 라이브러리 자체의 공용 API라면 여기에 유지)
    │   │   │   ├───primitives/
    │   │   │   ├───patterns/
    │   │   │   └───index.ts     (컴포넌트 등록/내보내기)
    │   │   │
    │   │   ├───index.ts         (라이브러리의 메인 진입점, 핵심 모듈들을 통합하고 내보냄)
    │   │   └───__tests__/
    │   │
    │   └───examples/            (만약 `components`가 라이브러리 사용 예시라면 이리로 이동)
    │
    ├───adorable-css-cdn/
    ├───homepage-kit/
```

#### 3.1. 변경 제안 상세 및 이유

**1. `design-tokens/` 디렉토리 통합 및 재구성**

*   **액션**:
    *   기존 `packages/adorable-css/src/tokens/`와 `packages/adorable-css/src/design-system/` 디렉토리를 `packages/adorable-css/src/design-tokens/`로 통합합니다.
    *   `tokenRegistry.ts`는 `design-tokens/registry.ts`로 이동합니다.
    *   `scaleConfig.ts`, `scaleFormulas.ts` 등 스케일 관련 로직은 `design-tokens/scales.ts`로 통합합니다.
    *   `colors.ts`는 `design-tokens/colors.ts`로 이동합니다.
    *   `design-tokens/index.ts`를 생성하여 모든 토큰 관련 공용 API를 내보냅니다.
*   **이유**: 모든 디자인 토큰 관련 로직을 한 곳에 집중시켜 멘탈 모델을 명확히 하고, 코드 탐색 및 유지보수를 용이하게 합니다. 중복된 개념의 디렉토리를 제거하여 코드 라인 수를 간접적으로 줄입니다.

**2. `components/` 디렉토리 역할 재정의 또는 이동**

*   **액션**:
    *   **옵션 A (권장 - 단순성 극대화)**: 만약 `components/`가 AdorableCSS 라이브러리 자체의 핵심 기능이 아니라, 라이브러리를 사용하여 구축된 UI 컴포넌트의 *예시* 또는 *레시피*라면, `packages/adorable-css/src/components/` 디렉토리를 `packages/adorable-css/examples/`와 같은 최상위 레벨 디렉토리로 이동합니다.
        *   이 경우, `rule-definitions.ts`에서 `components` 관련 규칙을 직접 임포트하는 것을 중단하고, 컴포넌트가 자체적으로 규칙을 등록하거나, 컴포넌트가 라이브러리의 규칙을 사용하는 방식으로 변경합니다.
    *   **옵션 B (라이브러리 공용 API의 일부인 경우)**: 만약 `components/`가 라이브러리 자체의 공용 API로 제공되어야 한다면, 현재 위치를 유지하되, `rule-definitions.ts`가 컴포넌트 구현에 직접 의존하지 않도록 의존성을 역전시킵니다.
        *   예를 들어, 컴포넌트가 초기화 시점에 자신의 규칙을 라이브러리의 규칙 레지스트리에 등록하는 플러그인 방식(Service Locator 또는 Dependency Injection 패턴)을 고려합니다.
*   **이유**: 라이브러리의 "엔진"과 "엔진을 사용하는 애플리케이션/예시" 간의 명확한 경계를 설정하여 핵심 라이브러리의 응집도를 높이고 결합도를 낮춥니다. 이는 코드 라인 수를 직접 줄이지는 않지만, 코드베이스의 복잡성을 줄여줍니다.

**3. `plugins/` 디렉토리 도입 (기존 `extensions/` 대체)**

*   **액션**:
    *   `packages/adorable-css/src/extensions/` 디렉토리를 `packages/adorable-css/src/plugins/`로 이름을 변경합니다.
    *   플러그인들이 `rule-definitions.ts`에 직접 규칙을 주입하는 대신, 플러그인 자체 내에서 규칙을 정의하고, `index.ts` 또는 별도의 플러그인 등록 메커니즘을 통해 라이브러리에 통합되도록 합니다.
*   **이유**: "plugins"라는 용어가 "extensions"보다 더 일반적이고 명확합니다. 또한, 핵심 규칙 정의와 플러그인 구현 간의 결합도를 낮춰, 플러그인을 선택적으로 포함하거나 제거하기 쉽게 만듭니다.

**4. `rules/` 디렉토리 구조 강화**

*   **액션**:
    *   `packages/adorable-css/src/rules/definitions/` 디렉토리를 생성하고, `rule-definitions.ts`를 이 안으로 이동합니다.
    *   기존의 `rules/layout`, `rules/style` 등은 `packages/adorable-css/src/rules/categories/` 아래로 이동합니다.
*   **이유**: 규칙의 "정의"와 "구현"을 명확히 분리하여 멘탈 모델을 강화합니다. `rule-definitions.ts`는 규칙의 메타데이터를 관리하고, `categories`는 실제 CSS 속성 변환 로직을 담당합니다.

### 4. 결론

제안된 폴더 구조는 `adorable-css` 라이브러리의 핵심 엔진과 그 위에 구축된 기능 및 사용 예시 간의 명확한 분리를 목표로 합니다. 이는 각 모듈의 책임과 의존성을 명확히 하여 코드의 응집도를 높이고 결합도를 낮춥니다. 결과적으로, 코드 라인 수의 직접적인 감소뿐만 아니라, 코드베이스의 전반적인 단순성, 가독성, 유지보수성 및 미래 확장성을 크게 향상시킬 것입니다.
