# AdorableCSS v2 프로젝트 분석 요약

## 개요
AdorableCSS v2 프로젝트는 Figma 디자인과 웹 코드 간의 완벽한 동기화를 목표로 하는 차세대 CSS 프레임워크입니다. pnpm 워크스페이스를 활용한 모노레포 구조로, 핵심 CSS 프레임워크(`adorable-css`), CDN 배포용 패키지(`adorable-css-cdn`), 그리고 공식 홈페이지/문서 사이트(`homepage-kit`)로 구성되어 있습니다.

## 주요 구성 요소 및 기술 스택

### 1. `adorable-css` (핵심 프레임워크)
- **역할**: Figma-First CSS 철학을 기반으로 한 CSS 유틸리티 프레임워크의 핵심 로직을 담당합니다. 자연어와 유사한 문법으로 CSS를 생성하며, 디자인 토큰 시스템을 내장하고 있습니다.
- **기술 스택**: TypeScript
- **빌드/테스트**: `tsup`을 사용하여 TypeScript 코드를 빌드하고, `vitest`로 단위 테스트를 수행합니다.
- **모듈 구조**: `core`, `rules`, `tokens`, `design-system` 등 기능별로 잘 분리된 디렉토리 구조를 가지고 있어 확장성과 유지보수성이 높아 보입니다. `parser`와 `rules` 모듈을 별도로 export하여 유연성을 제공합니다.

### 2. `adorable-css-cdn` (CDN 배포)
- **역할**: `adorable-css`를 의존성으로 사용하여 브라우저에서 직접 사용할 수 있는 CDN 버전을 빌드합니다.
- **기술 스택**: TypeScript
- **빌드/테스트**: `tsup`, `vitest`

### 3. `homepage-kit` (공식 홈페이지 및 문서)
- **역할**: AdorableCSS v2의 공식 홈페이지이자 상세 문서를 제공하는 웹사이트입니다. 프레임워크의 사용 예제, 가이드, API 레퍼런스 등을 포함합니다.
- **기술 스택**: SvelteKit (프론트엔드 프레임워크), TypeScript
- **배포**: `gh-pages`를 사용하여 GitHub Pages에 배포됩니다.
- **특징**: `adorable-css`와 `adorable-css-cdn`을 직접 사용하여 프레임워크의 기능을 시연하고 있습니다.

## 개발 환경 및 도구
- **모노레포 관리**: pnpm 워크스페이스
- **타입스크립트**: `tsconfig.app.json` (애플리케이션 코드) 및 `tsconfig.node.json` (Node.js 환경 설정 파일)으로 분리된 TypeScript 설정. `noEmit: true`로 설정되어 번들러가 최종 JavaScript 파일을 생성합니다.
- **린팅**: ESLint (TypeScript, Svelte, Prettier 통합)
- **테스팅**: Vitest (단위 테스트)
- **코드 포맷팅**: Prettier
- **문서화**: `docs/` 디렉토리는 PARA 방법론에 따라 체계적으로 구성되어 있으며, 프로젝트의 철학, 디자인 시스템, 기술 사양 등 다양한 정보를 담고 있습니다.

## 전반적인 소감
AdorableCSS v2 프로젝트는 현대적인 웹 개발 스택과 모범 사례를 잘 따르고 있는 것으로 보입니다. 특히 Figma-First CSS라는 명확한 목표와 이를 달성하기 위한 체계적인 디자인 토큰 시스템, 타입 세이프티, 제로 런타임 오버헤드 등의 특징이 인상적입니다. 모노레포 구조와 잘 정의된 빌드/테스트/린팅 파이프라인은 프로젝트의 확장성과 유지보수성을 높이는 데 기여할 것입니다. 문서화 또한 PARA 방법론을 적용하여 매우 체계적이고 사용자 친화적으로 구성되어 있어, 새로운 기여자가 프로젝트를 이해하고 참여하는 데 큰 도움이 될 것으로 예상됩니다.
