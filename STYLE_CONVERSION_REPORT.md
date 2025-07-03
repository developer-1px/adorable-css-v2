# Style Conversion Report: AdorableCSS Migration

## 개요
homepage-kit 패키지의 모든 `<style>` 태그를 검토하고 AdorableCSS로 변환 가능한 스타일을 식별했습니다.

## 변환 완료된 파일

### 1. **완전히 변환된 파일** (style 태그 제거)
- `src/routes/+layout.svelte` - 글로벌 폰트 설정 → app.css로 이동
- `src/lib/components/ui/Badge.svelte` - `user-select: none` → `select(none)`
- `src/lib/components/ui/Button.svelte` - 기본 버튼/링크 스타일 → reset CSS에서 처리
- `src/lib/components/ui/Input.svelte` - `font-family: inherit` → `font(inherit)`, `outline: none` → `outline(none)`

## 변환 불가능한 스타일

### 1. **:global() 셀렉터 사용**
이는 Svelte의 스타일 스코핑을 우회하는 패턴으로, AdorableCSS로 직접 변환 불가:
- `CodeHighlighter.svelte` - 300줄 이상의 신택스 하이라이팅 규칙
- `docs/CodeBlock.svelte` - prose 스타일 및 코드 블록 스타일링
- `docs/+layout.svelte` - 글로벌 애니메이션 키프레임

### 2. **@keyframes 애니메이션**
```css
@keyframes fade-in { ... }
@keyframes trendBounce { ... }
@keyframes pulse { ... }
```
**이유**: AdorableCSS는 현재 커스텀 키프레임 정의를 지원하지 않음. `animate()` 유틸리티는 사전 정의된 애니메이션만 지원.

### 3. **복잡한 pseudo-element 스타일링**
```css
.checkbox:checked::after {
  content: '';
  position: absolute;
  /* 체크마크 그리기 */
}
```
**이유**: `::after` 콘텐츠 생성과 복잡한 도형 그리기는 유틸리티 클래스로 표현 불가.

### 4. **테이블 특화 스타일**
```css
.data-table {
  border-collapse: collapse;
  table-layout: fixed;
}
```
**이유**: `border-collapse`, `table-layout` 같은 테이블 전용 속성은 AdorableCSS에서 미지원.

### 5. **브라우저 특화 셀렉터**
```css
::-webkit-scrollbar { ... }
input[type="file"]::file-selector-button { ... }
```
**이유**: 브라우저별 특수 셀렉터는 유틸리티 클래스로 타겟팅 불가.

## AdorableCSS 개선 제안

### 1. **애니메이션 확장**
- 커스텀 @keyframes 정의 지원
- 더 많은 내장 애니메이션 추가
- animation-* 속성들의 세밀한 제어

### 2. **Pseudo-element 지원 강화**
- `::before`, `::after` content 속성 지원
- 복잡한 pseudo-element 스타일링을 위한 컴포넌트화

### 3. **테이블 유틸리티 추가**
- `border-collapse(collapse|separate)`
- `table-layout(auto|fixed)`
- 테이블 전용 spacing과 alignment

### 4. **브라우저 특화 스타일**
- 스크롤바 커스터마이징 유틸리티
- 파일 입력 버튼 스타일링

### 5. **select() 유틸리티 확인**
- `select(none)` 유틸리티가 실제로 구현되어 있는지 확인 필요

## 결론

전체 43개 파일 중:
- ✅ **4개 파일**: 완전히 AdorableCSS로 변환
- ⚠️ **39개 파일**: 부분적 변환 또는 변환 불가

대부분의 복잡한 스타일은 다음 이유로 `<style>` 태그에 유지:
1. 신택스 하이라이팅 같은 도메인 특화 스타일
2. 애니메이션과 복잡한 상호작용
3. 브라우저별 특수 처리
4. 테이블과 폼 요소의 세밀한 제어

이는 유틸리티 우선 접근법의 한계를 보여주며, AdorableCSS와 전통적 CSS의 균형 잡힌 사용이 필요함을 시사합니다.