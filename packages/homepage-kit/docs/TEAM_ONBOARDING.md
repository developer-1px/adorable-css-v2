# 👥 AdorableCSS 팀 온보딩 가이드

> 새로운 팀원을 위한 1일차 가이드

## 🎯 목표

**이 문서를 읽고 나면:**
- AdorableCSS의 핵심 개념을 이해합니다
- 기본적인 컴포넌트를 만들 수 있습니다
- 팀의 코딩 컨벤션을 따를 수 있습니다

## 📅 Day 1: 첫날 체크리스트

### 오전 (2시간)

#### 1. 환경 설정 (30분)
```bash
# 프로젝트 클론
git clone [your-project-repo]
cd [project-name]

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

#### 2. 첫 체험 (30분)
```html
<!-- playground에서 직접 해보기 -->
<div class="hbox(pack) min-h(screen) bg(gray-50)">
  <div class="card p(xl)">
    <h1 class="heading(xl)">안녕하세요! 👋</h1>
    <p class="body">AdorableCSS에 오신 것을 환영합니다.</p>
  </div>
</div>
```

#### 3. 핵심 개념 학습 (1시간)
- [ ] [Why AdorableCSS](./WHY_ADORABLECSS.md) 읽기 (15분)
- [ ] [Cheat Sheet](./CHEAT_SHEET.md) 훑어보기 (15분)
- [ ] Playground에서 예제 따라하기 (30분)

### 오후 (3시간)

#### 4. 실전 연습 (2시간)

**미니 프로젝트: 프로필 카드 만들기**

```html
<!-- 목표: 이런 카드를 만들어보세요 -->
<div class="card w(320px) p(xl)">
  <!-- 프로필 이미지 -->
  <div class="hbox(pack) mb(lg)">
    <img 
      src="avatar.jpg" 
      class="size(80) r(full) ring(2/white) shadow(lg)"
    />
  </div>
  
  <!-- 정보 -->
  <div class="vbox(middle) gap(sm) text(center)">
    <h3 class="heading(md)">김개발</h3>
    <p class="label(sm) c(gray-600)">Frontend Developer</p>
    <p class="body(sm) c(gray-700)">
      AdorableCSS로 아름다운 UI를 만들어요
    </p>
  </div>
  
  <!-- 버튼 -->
  <div class="hbox(pack) gap(md) mt(xl)">
    <button class="btn btn(sm) bg(blue-500) c(white)">
      팔로우
    </button>
    <button class="btn btn(sm) ring(1/gray-300)">
      메시지
    </button>
  </div>
</div>
```

#### 5. 코드 리뷰 준비 (1시간)
- 만든 컴포넌트를 PR로 제출
- 팀 컨벤션 문서 읽기
- 질문 리스트 작성

## 💡 팀 컨벤션

### 1. 클래스 순서
```html
<!-- 추천 순서 -->
<div class="
  [레이아웃] hbox(pack) 
  [크기] w(full) h(screen)
  [스타일] bg(white) shadow(md)
  [상태] hover:shadow(lg)
">
```

### 2. 컴포넌트 구조
```html
<!-- 컨테이너 → 레이아웃 → 콘텐츠 -->
<article class="card">                    <!-- 컨테이너 -->
  <div class="hbox gap(lg)">             <!-- 레이아웃 -->
    <img class="size(48) r(md)">        <!-- 콘텐츠 -->
    <div class="vbox">
      <h3 class="heading(sm)">Title</h3>
      <p class="body(sm)">Content</p>
    </div>
  </div>
</article>
```

### 3. 반응형 우선
```html
<!-- 모바일 → 데스크톱 순서 -->
<div class="
  grid(1)        <!-- 모바일: 1열 -->
  md:grid(2)     <!-- 태블릿: 2열 -->
  lg:grid(3)     <!-- 데스크톱: 3열 -->
">
```

### 4. 의미론적 컴포넌트 활용
```html
<!-- ❌ 매번 스타일 정의 -->
<h1 class="font(2xl) bold mb(md)">

<!-- ✅ 의미론적 클래스 -->
<h1 class="heading(xl)">
```

## 🎓 학습 리소스

### 필수 문서 (Day 1)
1. [Quick Start](./QUICK_START.md) - 기본 사용법
2. [Cheat Sheet](./CHEAT_SHEET.md) - 문법 참고
3. [Troubleshooting](./guides/troubleshooting.md) - 문제 해결

### 심화 학습 (Week 1)
1. [COOKBOOK](./COOKBOOK.md) - 실전 패턴
2. [API Reference](../REFERENCE.md) - 전체 API
3. [Performance](./guides/performance.md) - 최적화

### 프로젝트별 문서
```
/docs
  /team
    - conventions.md      # 팀 컨벤션
    - components.md       # 공통 컴포넌트
    - patterns.md         # 디자인 패턴
```

## 🤝 도움 받기

### 1. 빠른 질문
- Slack: #adorablecss 채널
- 페어 프로그래밍: 팀원과 30분 세션

### 2. 기술 이슈
- GitHub Issues 확인
- 팀 위키 검색
- Tech Lead에게 문의

### 3. 디자인 관련
- Figma 파일 확인
- 디자이너와 15분 싱크
- 디자인 시스템 문서

## ✅ 첫 주 목표

### Day 1-2: 기초
- [ ] 기본 문법 익히기
- [ ] 간단한 컴포넌트 만들기
- [ ] 팀 코드 읽고 이해하기

### Day 3-4: 실전
- [ ] 실제 태스크 수행
- [ ] PR 제출 및 리뷰
- [ ] 디버깅 경험

### Day 5: 정착
- [ ] 독립적으로 작업 가능
- [ ] 팀 컨벤션 준수
- [ ] 생산성 도구 활용

## 💭 자주 하는 실수들

### 1. Tailwind 습관
```html
<!-- ❌ Tailwind 스타일 -->
<div class="flex items-center justify-center">

<!-- ✅ AdorableCSS -->
<div class="hbox(pack)">
```

### 2. 과도한 인라인
```html
<!-- ❌ 너무 많은 클래스 -->
<div class="hbox(middle+between) p(md) m(lg) bg(white) r(lg) shadow(md) b(1/gray-200) hover:shadow(lg) transition">

<!-- ✅ 컴포넌트 활용 -->
<div class="card hbox(middle+between)">
```

### 3. 토큰 무시
```html
<!-- ❌ 하드코딩 -->
<div class="p(16px) gap(24px)">

<!-- ✅ 토큰 사용 -->
<div class="p(md) gap(lg)">
```

## 🎉 환영합니다!

**첫 주는 학습 기간입니다.** 실수해도 괜찮아요!

질문하는 것을 두려워하지 마세요. 우리 모두 처음엔 초보자였습니다. 

**Pro Tip**: 매일 작은 성취를 기록하세요. 일주일 후 놀라운 성장을 발견할 거예요! 📈

---

### 다음 단계
- [ ] 팀 멘토와 1:1 미팅
- [ ] 첫 PR 제출
- [ ] 팀 회고 참여
- [ ] 개선 아이디어 공유