# 🎓 AdorableCSS 온보딩

> 새로운 사용자와 AI 도구들을 위한 체계적인 학습 가이드

## 📚 학습 순서

### 1. **[🤖 Claude 온보딩 가이드](CLAUDE-ONBOARDING.md)**
**대상**: Claude Code, GitHub Copilot 등 AI 도구들  
**목적**: AI가 AdorableCSS를 Tailwind와 혼동하지 않도록 하는 핵심 가이드

**핵심 내용**:
- 절대 하지 말아야 할 것들 (No Margin Rule)
- AdorableCSS만의 고유한 문법 (.5 not /50)
- 실제 사용 예제와 체크리스트

### 2. **[🎯 핵심 원칙](CORE-PRINCIPLES.md)**  
**대상**: 모든 AdorableCSS 사용자  
**목적**: AdorableCSS의 기본 철학과 필수 문법 규칙 이해

**핵심 내용**:
- Figma-First 사고방식
- Gap 기반 레이아웃 원칙  
- CSS 네이티브 값 사용법
- 컴포넌트 격리 원칙

### 3. **[❌✅ 잘못된 vs 올바른 사용법](WRONG-VS-RIGHT.md)**
**대상**: 실전 코드를 작성하는 개발자들  
**목적**: 실제 예제를 통한 올바른 패턴 학습

**핵심 내용**:
- 실제 컴포넌트 Before/After 비교
- 흔한 실수와 해결 방법
- 레이아웃 패턴 모범 사례

---

## 🎯 빠른 참조

### **금지 사항** 
```html
❌ mb(xl) mt(lg) mx(auto)     <!-- Margin 사용 금지 -->
❌ bg(white/50) c(black/80)   <!-- 슬래시 투명도 금지 -->  
❌ scale(105) opacity(80)     <!-- 백분율 변환 금지 -->
```

### **올바른 사용법**
```html
✅ vbox gap(xl)               <!-- Gap 기반 간격 -->
✅ bg(white.5) c(black.8)     <!-- 점 투명도 -->
✅ scale(1.05) opacity(0.8)   <!-- CSS 네이티브 값 -->
```

### **Figma 매핑**
```html
Auto Layout Vertical    → vbox gap(16)
Auto Layout Horizontal  → hbox gap(16)  
Fill Container         → w(fill) h(fill)
Hug Contents           → w(hug) h(hug)
Center Constraint      → layer(center)
```

---

## 🤖 AI 도구 특별 지침

### **Claude Code 사용자**
1. **[Claude 온보딩 가이드](CLAUDE-ONBOARDING.md)** 먼저 읽기
2. 코드 작성 전 체크리스트 확인
3. Tailwind 습관 의식적으로 배제

### **GitHub Copilot 사용자**  
1. AdorableCSS 주석으로 명확한 의도 표현
2. 예제 코드를 먼저 작성하여 패턴 학습 유도
3. 생성된 코드 검토 시 온보딩 가이드 참조

### **기타 AI 도구**
1. 프롬프트에 "AdorableCSS 문법 사용" 명시
2. Tailwind가 아님을 강조  
3. 핵심 원칙 문서를 참조 자료로 제공

---

## 📋 온보딩 체크리스트

### **기본 이해**
- [ ] AdorableCSS ≠ Tailwind 차이점 이해
- [ ] Figma-First 사고방식 습득
- [ ] No Margin Rule 이해

### **문법 숙지**  
- [ ] Dot notation 투명도 (`.5` not `/50`)
- [ ] CSS 네이티브 값 (`1.05` not `105`)
- [ ] Gap 기반 레이아웃 (`vbox gap()`)

### **실전 적용**
- [ ] 컴포넌트 격리 원칙 적용
- [ ] 올바른 레이아웃 패턴 사용
- [ ] 코드 리뷰 시 가이드 참조

---

## 🔄 지속적 학습

### **정기 복습**
- 월 1회 핵심 원칙 재검토
- 새로운 프로젝트 시작 시 가이드 재확인
- 팀원 온보딩 시 문서 공유

### **업데이트 반영**
- AdorableCSS 버전 업그레이드 시 가이드 확인
- 새로운 문법 추가 시 온보딩 자료 업데이트
- 커뮤니티 피드백 반영

---

**🎯 목표**: 모든 사용자(인간과 AI 모두)가 AdorableCSS의 철학을 이해하고 올바른 문법으로 코드를 작성할 수 있도록 하는 것