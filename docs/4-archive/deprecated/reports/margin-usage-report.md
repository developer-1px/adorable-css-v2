# Margin 사용 보고서

## 현재 margin 사용 현황

### 1. `mx(auto)` 사용 사례들

현재 컴포넌트 페이지에서 다음과 같은 경우에 `mx(auto)`를 사용하고 있습니다:

```css
/* 컨테이너 중앙 정렬 */
.container(6xl).mx(auto) {
  margin-left: auto;
  margin-right: auto;
}

/* 최대 너비 요소 중앙 정렬 */
.max-w(4xl).mx(auto) {
  margin-left: auto;
  margin-right: auto;
}

/* 최대 너비 요소 중앙 정렬 */
.max-w(3xl).mx(auto) {
  margin-left: auto;
  margin-right: auto;
}
```

### 2. margin이 필요한 이유

#### 2.1 컨테이너 중앙 정렬
- **문제**: 고정 너비 컨테이너를 부모 요소 내에서 수평 중앙 정렬해야 함
- **현재 해결책**: `mx(auto)` 사용
- **대안**: 부모에 `hbox(center)` 적용, 하지만 이 경우 자식 요소들도 영향을 받음

#### 2.2 텍스트 블록 중앙 정렬
- **문제**: `max-w(3xl)`과 같은 제한된 너비의 텍스트 블록을 중앙 정렬해야 함
- **현재 해결책**: `mx(auto)` 사용
- **대안**: 부모에 `text(center)` + `hbox(center)` 조합

### 3. 제안하는 새로운 규칙들

#### 3.1 `center()` 유틸리티
```css
.center() {
  margin-left: auto;
  margin-right: auto;
}
```

#### 3.2 `centerbox()` 레이아웃 유틸리티
```css
.centerbox() {
  display: flex;
  justify-content: center;
}
```

#### 3.3 `centertext()` 텍스트 중앙 정렬
```css
.centertext() {
  text-align: center;
  margin-left: auto;
  margin-right: right;
}
```

### 4. 권장 해결 방안

1. **컨테이너 중앙 정렬**: `center()` 유틸리티 생성
2. **레이아웃 중앙 정렬**: 부모에 `hbox(center)` 사용
3. **텍스트 중앙 정렬**: `text(center)` 사용

### 5. 마이그레이션 계획

현재 `mx(auto)` 사용을 다음과 같이 대체할 수 있습니다:

```html
<!-- 현재 -->
<div class="container(6xl) mx(auto)">...</div>

<!-- 제안 -->
<div class="container(6xl) center()">...</div>

<!-- 또는 -->
<div class="hbox(center)">
  <div class="container(6xl)">...</div>
</div>
```

## 결론

margin 사용을 최소화하면서도 중앙 정렬 기능을 유지하기 위해 새로운 유틸리티 클래스들을 도입하는 것이 필요합니다. 특히 `center()` 유틸리티는 가장 일반적인 margin 사용 사례를 대체할 수 있을 것입니다.