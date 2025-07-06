# AdorableCSS Features

> 이 문서는 AdorableCSS의 모든 기능을 추적하고 문서화합니다.

## 🎯 Core Features

### ✅ 완료된 기능

#### 1. **CSS @layer 시스템** 
- Native CSS @layer를 활용한 캐스케이드 관리
- 우선순위 기반 자동 레이어 할당
- `@layer component, layout, utility, state` 순서

#### 2. **Figma 스타일 레이아웃 시스템**
- `hbox()`, `vbox()` - Flexbox 기반 레이아웃
- `pack` - 중앙 정렬
- `gap()` - 간격 설정
- `w(fill)`, `w(hug)` - Figma Auto Layout 매핑

#### 3. **의미론적 타이포그래피**
- 역할 기반 타이포그래피: `display()`, `heading()`, `title()`, `body()`, `label()`, `caption()`
- 자동 반응형 스케일링
- 한글 최적화

#### 4. **OKLCH 색상 시스템**
- 지각적 균일성을 갖춘 색상 체계
- 자동 색조 생성 (50-950)
- 그라데이션 문법: `bg(135deg/#667eea..#764ba2)`
- 투명도 표기법: `c(blue-500.5)`

#### 5. **디자인 토큰 시스템**
- Spacing: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`
- Radius: `sm`, `md`, `lg`, `xl`, `full`
- Shadow: 고도 기반 그림자
- 자동 토큰 주입

#### 6. **컴포넌트 시스템**
- 사전 정의된 컴포넌트: `card`, `btn`, `heading`, `hero`, `section`
- 조합 가능한 primitive
- 확장 가능한 아키텍처

#### 7. **파서 시스템**
- 정규식 기반 효율적 파싱
- LRU 캐싱
- 확장 가능한 룰 시스템
- 런타임 CSS 생성

#### 8. **자동 주입 시스템**
- 브라우저 환경에서 자동 CSS 주입
- MutationObserver 기반 동적 업데이트
- 성능 최적화

### 🚧 개발 중인 기능

#### 1. **상태 스타일링** (Priority 1)
- 복합 상태: `hover:focus:scale(1.1)`
- 그룹 상태: `group-hover:opacity(1)`
- Peer 상태: `peer-checked:visible`
- 커스텀 상태 정의

#### 2. **Form 시스템** (Priority 1)
- Form 컴포넌트 프리셋
- 유효성 검사 스타일
- 접근성 고려
- 다크모드 지원

#### 3. **CSS-only 인터랙션** (Priority 2)
- Accordion, Tab, Modal 등
- JavaScript 없는 인터랙션
- 접근성 준수

#### 4. **고급 애니메이션** (Priority 2)
- 스프링 애니메이션
- 시퀀스 애니메이션
- 스크롤 트리거
- 성능 최적화

### 📋 계획된 기능

#### Priority 1 (3개월)
- [ ] 의미론적 컴포넌트 확장
- [ ] 다크모드 시스템
- [ ] RTL 지원
- [ ] 폼 컴포넌트 완성

#### Priority 2 (3개월)
- [ ] 고급 그리드 시스템
- [ ] 3D 변환 유틸리티
- [ ] 마스크/클립 유틸리티
- [ ] 인쇄 스타일 지원

#### Priority 3 (3개월)
- [ ] 접근성 검사 도구
- [ ] 성능 프로파일러
- [ ] 최신 CSS 기능 (Container Queries, Cascade Layers)
- [ ] 플러그인 생태계

## 📊 기능 통계

| 카테고리 | 완료 | 개발 중 | 계획됨 | 전체 |
|---------|------|---------|--------|------|
| 코어 시스템 | 8 | 0 | 0 | 8 |
| 레이아웃 | 15 | 2 | 3 | 20 |
| 스타일링 | 25 | 5 | 10 | 40 |
| 컴포넌트 | 12 | 8 | 15 | 35 |
| 도구 | 5 | 3 | 7 | 15 |

## 🔄 업데이트 기록

### 2024-12-27
- CSS @layer 시스템 완성
- Rules 페이지 @layer 기준 재구성
- Syntax 페이지 개선

### 2024-12-26
- Playground 페이지 완성
- 실시간 CSS 미리보기 구현
- Syntax highlighting 추가

### 2024-12-25
- 홈페이지 리뉴얼
- 문서 구조 개선
- 타이포그래피 시스템 완성

## 🎯 다음 마일스톤

### v2.0.0-beta.2 (2025년 1월)
- 상태 스타일링 완성
- Form 컴포넌트 시스템
- 다크모드 지원

### v2.0.0-rc.1 (2025년 2월)
- CSS-only 인터랙션
- 고급 애니메이션
- 성능 최적화

### v2.0.0 (2025년 3월)
- 정식 출시
- 완전한 문서화
- 마이그레이션 가이드