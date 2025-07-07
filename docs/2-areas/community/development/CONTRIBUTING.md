# Contributing to AdorableCSS

> AdorableCSS에 기여해주셔서 감사합니다! 이 가이드는 프로젝트에 기여하는 방법을 안내합니다.

## 📋 목차

1. [시작하기](#시작하기)
2. [개발 환경 설정](#개발-환경-설정)
3. [코드 스타일](#코드-스타일)
4. [커밋 규칙](#커밋-규칙)
5. [PR 프로세스](#pr-프로세스)
6. [테스트](#테스트)
7. [문서화](#문서화)

## 🚀 시작하기

### Prerequisites

- Node.js 18+
- pnpm 8+
- Git

### Fork & Clone

```bash
# 1. GitHub에서 Fork
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/adorable-css-v2.git
cd adorable-css-v2

# 3. Add upstream remote
git remote add upstream https://github.com/adorablecss/adorable-css-v2.git

# 4. Install dependencies
pnpm install
```

## 🛠 개발 환경 설정

### 개발 서버 시작

```bash
# 모든 패키지 동시 개발
pnpm dev

# 특정 패키지만 개발
pnpm dev:core      # Core library only
pnpm dev:homepage  # Documentation site only
```

### 빌드

```bash
# 전체 빌드
pnpm build

# 개별 패키지 빌드
pnpm --filter adorable-css build
pnpm --filter homepage-kit build
```

### 테스트

```bash
# 모든 테스트 실행
pnpm test

# Watch mode
pnpm test:watch

# UI mode
pnpm test:ui
```

## 📝 코드 스타일

### TypeScript

```typescript
// ✅ Good: 명확한 타입 정의
export interface Rule {
  name: string;
  priority: number;
  generate: (value: string) => CSSProperties;
}

// ❌ Bad: any 타입 사용
export function parseRule(rule: any) { }
```

### 네이밍 규칙

- **파일명**: kebab-case (`color-system.ts`)
- **컴포넌트**: PascalCase (`TokenCard.svelte`)
- **함수/변수**: camelCase (`generateCSS()`)
- **상수**: UPPER_SNAKE_CASE (`DEFAULT_BREAKPOINTS`)

### CSS 클래스

```html
<!-- ✅ Good: AdorableCSS 문법 사용 -->
<div class="hbox(middle) gap(md) p(lg)">

<!-- ❌ Bad: 인라인 스타일 -->
<div style="display: flex; align-items: center;">
```

## 📦 커밋 규칙

### 커밋 메시지 형식

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅
- `refactor`: 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드, 설정 등

### 예시

```bash
feat(parser): add support for calc() expressions

- Implement calc() value parser
- Add unit tests for calc expressions
- Update documentation

Closes #123
```

## 🔄 PR 프로세스

### 1. 브랜치 생성

```bash
git checkout -b feat/your-feature-name
```

### 2. 변경사항 커밋

```bash
git add .
git commit -m "feat: add awesome feature"
```

### 3. Push & PR 생성

```bash
git push origin feat/your-feature-name
```

### PR 체크리스트

- [ ] 모든 테스트 통과
- [ ] 문서 업데이트
- [ ] CHANGELOG 업데이트
- [ ] 타입 정의 추가
- [ ] 예제 코드 추가

## 🧪 테스트

### 단위 테스트

```typescript
// src/__tests__/rules/spacing/padding.test.ts
describe('padding rule', () => {
  it('should generate correct CSS', () => {
    const css = generateClass('p(20)');
    expect(css).toBe('.p\\(20\\) { padding: 20px; }');
  });
});
```

### 통합 테스트

```typescript
// 여러 룰의 조합 테스트
it('should handle multiple rules', () => {
  const css = generateCSS(['p(lg)', 'hbox', 'gap(md)']);
  expect(css).toContain('padding: var(--spacing-lg)');
  expect(css).toContain('display: flex');
});
```

## 📚 문서화

### 새로운 기능 문서화

1. **API Reference 업데이트** (`/docs/reference`)
2. **예제 추가** (문서에 예제 코드 추가)
3. **Features 업데이트** (`docs/features.md`)
4. **TypeScript 정의** 추가

### 문서 작성 가이드

```markdown
## 기능명

### 설명
기능에 대한 간단한 설명

### 문법
`rule(value)`

### 예제
\```css
.example {
  /* CSS output */
}
\```

### 매개변수
- `value`: 설명

### 참고사항
- 주의사항
- 팁
```

## 🏗 아키텍처 기여

### 새로운 룰 추가

1. **룰 정의** (`src/rules/category/rule-name.ts`)

```typescript
export const myRule: Rule = {
  name: 'my-rule',
  match: /^my-rule\((.*)\)$/,
  priority: 5,
  generate: (value: string) => ({
    'css-property': value
  })
};
```

2. **룰 등록** (`src/rules/index.ts`)
3. **테스트 작성** (`src/__tests__/rules/`)
4. **문서 추가**

### 새로운 컴포넌트 추가

1. **컴포넌트 정의** (`src/components/`)
2. **스토리 작성**
3. **문서화**

## 🤝 행동 강령

- 서로 존중하고 배려합니다
- 건설적인 피드백을 제공합니다
- 다양성을 존중합니다
- 커뮤니티 가이드라인을 준수합니다

## 💬 도움 요청

- [GitHub Issues](https://github.com/adorablecss/adorable-css-v2/issues)
- [Discussions](https://github.com/adorablecss/adorable-css-v2/discussions)
- Discord 커뮤니티 (준비 중)

## 📄 라이선스

기여하신 모든 코드는 프로젝트의 MIT 라이선스를 따릅니다.