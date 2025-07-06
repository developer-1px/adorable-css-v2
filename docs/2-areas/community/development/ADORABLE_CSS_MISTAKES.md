# AdorableCSS 문법 실수 기록

이 문서는 홈페이지 제작 중 발견한 AdorableCSS 문법 실수들을 기록합니다.

## 발견된 실수들

### 1. Margin 사용 (❌ 가장 흔한 실수)
```css
❌ Wrong: mb(4xl), mt(lg), mx(auto)
✅ Correct: vbox gap(4xl), 구조적 spacing 사용
```
**이유**: AdorableCSS는 gap 기반 레이아웃을 사용. margin은 사용하지 않음.

### 2. Flexbox 정렬 불완전
```css
❌ Wrong: hbox px(md) py(sm)
✅ Correct: hbox(middle) px(md) py(sm)
```
**이유**: hbox만 쓰면 정렬이 명시되지 않음. middle, center, pack 등 명시 필요.

### 3. 그리드 컬럼 문법 확인 필요
```css
❓ 확인 필요: xl:col(2) 
✅ 정확한 문법 확인 후 수정
```

### 4. Scroll/Overflow 속성 문법 실수
```css
❌ Wrong: overflow(x-auto), overflow(hidden)
✅ Correct: scroll(x/auto), clip
```
**이유**: AdorableCSS는 scroll(x/auto) 문법 사용. overflow hidden은 clip.

### 5. Border 단축 문법 실수
```css
❌ Wrong: border-l(6px/transparent), border-t(1/gray-200)
✅ Correct: bl(6px/transparent), bt(1/gray-200)
```
**이유**: AdorableCSS는 bl, br, bt, bb 단축 문법 사용.

### 6. Text Gradient 문법
```css
✅ Correct: text(transparent) bg(135deg/color1,color2) bg-clip(text)
```
**참고**: 이 문법은 올바름. 텍스트 그라디언트 적용 시 사용.

## 수정 원칙

1. **No Margin Rule**: 모든 margin → gap 또는 padding으로 변경
2. **Explicit Alignment**: hbox, vbox에는 항상 정렬 방식 명시  
3. **Design Token First**: 하드코딩된 값보다 토큰 사용
4. **Component Usage**: 반복되는 패턴은 컴포넌트화

### 7. Gradient 문법 실수
```css
❌ Wrong: bg(to-br/purple-500/pink-500)
✅ Correct: bg(135deg/purple-500..pink-500)
```
**이유**: AdorableCSS는 degree/color1..color2 문법 사용.

### 8. 반복된 Margin 남용
```css
❌ Wrong: mb(4xl), mb(lg), mb(md), mb(sm) 등 반복 사용
✅ Correct: vbox gap(4xl) 등 구조적 spacing
```
**이유**: AdorableCSS는 margin을 사용하지 않고 gap 기반 레이아웃 사용.

## 수정 완료

- [x] BeforeAfter.svelte - margin 제거, flexbox 정렬 명시, card() 컴포넌트 사용
- [x] HomePage.svelte - border 문법 수정 (bl, br, bt)  
- [x] QuickStart.svelte - margin 제거, gradient 문법 수정, heading()/card()/btn() 컴포넌트 적용

## 주요 개선 사항

### 1. 완전한 No-Margin 설계
- 모든 `mb()`, `mt()`, `mx()` 제거
- `vbox gap()`, `hbox gap()` 기반 구조적 spacing으로 전환
- 더 일관된 레이아웃 시스템

### 2. Apple 품질 컴포넌트 시스템 적용
- `heading()` - Apple 타이포그래피 스케일 적용
- `card()` - 정교한 그림자와 상호작용 효과
- `btn()` - Apple 시스템 컬러와 터치 타겟

### 3. 정확한 AdorableCSS 문법 적용
- Gradient: `bg(135deg/purple-500..pink-500)` ✓
- Border: `bl()`, `br()`, `bt()` ✓ 
- Scroll: `scroll(x/auto)` ✓
- Flexbox: `hbox(middle)`, `vbox(pack)` ✓

## 다음 개발 목표

- [ ] 추가 UI 컴포넌트 개발 (input, select, modal 등)
- [ ] Design Token 시스템 확장
- [ ] 플러그인 시스템 구축