# 📚 AdorableCSS Documentation

> **PARA 정리법**을 적용한 행동 지향적 문서 체계

## 🚀 빠른 시작

### 🆕 처음 시작하는 분
1. **[🎨 디자인 철학](2-areas/design-system/DESIGN_PHILOSOPHY.md)** - AdorableCSS가 해결하는 문제
2. **[📖 디자인 시스템 가이드](2-areas/design-system/DESIGN_SYSTEM_OVERVIEW.md)** - 실사용 방법
3. **[📚 API 레퍼런스](2-areas/documentation/REFERENCE.md)** - 완전한 문법 가이드

### 🔄 마이그레이션 하는 분
- **[제품 전략](1-projects/planning/PRODUCT_STRATEGY.md)** - 로드맵과 비전
- **[기술 사양](3-resources/best-practices/technical/)** - 구현 세부사항

---

## 📋 PARA 체계별 문서 구성

### 🎯 [1-projects/](1-projects/) - 진행 중인 프로젝트
> 명확한 마감일과 결과물이 있는 작업들

#### 🚧 Active (현재 진행)
- **[mdx/](5-public/mdx/)** - 웹사이트용 문서 시스템

#### 📋 Planning (계획 단계)
- **[PRODUCT_STRATEGY.md](1-projects/planning/PRODUCT_STRATEGY.md)** - 제품 전략 및 로드맵
- **[strategy/](1-projects/planning/strategy/)** - 마케팅 & 기술 메시징

### 🏠 [2-areas/](2-areas/) - 지속 관리 영역
> 지속적으로 관리해야 하는 책임 영역들

#### 🎨 Design System
- **[DESIGN_PHILOSOPHY.md](2-areas/design-system/DESIGN_PHILOSOPHY.md)** - 핵심 철학 & 원칙
- **[DESIGN_SYSTEM_OVERVIEW.md](2-areas/design-system/DESIGN_SYSTEM_OVERVIEW.md)** - 실사용 가이드

#### 📖 Documentation  
- **[REFERENCE.md](2-areas/documentation/REFERENCE.md)** - 완전한 API 레퍼런스

#### 👥 Community
- **[development/](2-areas/community/development/)** - 개발 프로세스 & 실수 분석
- **[onboarding/](2-areas/community/onboarding/)** - 신규 사용자 & AI 도구 온보딩

### 📚 [3-resources/](3-resources/) - 참고 자료
> 미래에 참고할 수 있는 지식과 정보

#### 🔬 Research
- **[background-figma-compatibility.md](3-resources/research/background-figma-compatibility.md)** - Figma 호환성 철학
- **[token-scale-generator.md](3-resources/research/token-scale-generator.md)** - 토큰 스케일 연구
- **[프로젝트 분석 요약](3-resources/research/project-analysis-summary.md)** - AdorableCSS v2 프로젝트 분석

#### 🎓 Best Practices
- **[technical/](3-resources/best-practices/technical/)** - 기술 사양 & 모범 사례

### 📦 [4-archive/](4-archive/) - 보관함
> 완료되었거나 더 이상 관련 없는 항목들

#### ✅ Completed Projects
- **[CLEANUP_SUMMARY.md](4-archive/completed-projects/CLEANUP_SUMMARY.md)** - 문서 정리 완료

#### 🗂 Deprecated
- 구버전 문서들 및 레거시 시스템

---

## 🧭 사용자별 네비게이션

### 👨‍💻 개발자
1. **시작**: [디자인 철학](2-areas/design-system/DESIGN_PHILOSOPHY.md)
2. **구현**: [API 레퍼런스](2-areas/documentation/REFERENCE.md)
3. **고급**: [기술 사양](3-resources/best-practices/technical/)

### 🎨 디자이너
1. **철학**: [Figma 호환성](3-resources/research/background-figma-compatibility.md)
2. **가이드**: [디자인 시스템](2-areas/design-system/DESIGN_SYSTEM_OVERVIEW.md)

### 👥 팀 리더
1. **전략**: [제품 로드맵](1-projects/planning/PRODUCT_STRATEGY.md)
2. **관리**: [진행 중인 프로젝트](1-projects/)

### 🤝 기여자
1. **온보딩**: [신규 사용자 가이드](2-areas/community/onboarding/)
2. **프로세스**: [개발 가이드](2-areas/community/development/)
3. **표준**: [모범 사례](3-resources/best-practices/)

### 🤖 AI 도구 (Claude, Copilot 등)
1. **필수**: [Claude 온보딩](2-areas/community/onboarding/CLAUDE-ONBOARDING.md)
2. **원칙**: [핵심 원칙](2-areas/community/onboarding/CORE-PRINCIPLES.md)
3. **예제**: [올바른 사용법](2-areas/community/onboarding/WRONG-VS-RIGHT.md)

---

## 🔍 검색 가이드

### 문서 유형별
- **📋 정책/전략** → 1-projects/planning/
- **📖 사용법** → 2-areas/documentation/  
- **🎨 디자인** → 2-areas/design-system/
- **🔬 연구** → 3-resources/research/
- **📚 과거자료** → 4-archive/

### 긴급도별
- **🚨 지금 필요** → 2-areas/ (Areas)
- **📅 곧 필요** → 1-projects/ (Projects)  
- **💡 나중에 참고** → 3-resources/ (Resources)
- **📜 역사적 가치** → 4-archive/ (Archive)

---

## 🔄 PARA 관리 프로세스

### 정기 리뷰 일정
- **Projects**: 매주 금요일
- **Areas**: 매월 첫째 주
- **Resources**: 분기별
- **Archive**: 반기별 (6월, 12월)

### 문서 생애주기
```
Ideas → Projects → Areas → Resources → Archive
```

### 분류 기준
- **"이것이 특정 결과물로 이어지는가?"** → Projects
- **"이것을 지속적으로 관리해야 하는가?"** → Areas  
- **"나중에 참고할 가치가 있는가?"** → Resources
- **"더 이상 활성화된 관심사가 아닌가?"** → Archive

---

## 📊 문서 현황 대시보드

| 카테고리 | 문서 수 | 최근 업데이트 | 담당자 |
|----------|---------|---------------|--------|
| 1-projects | 3개 | 2025-07-05 | 개발팀 |
| 2-areas | 4개 | 2025-07-05 | 전체팀 |
| 3-resources | 5개 | 2025-07-05 | 연구팀 |
| 4-archive | 다수 | - | - |

---

**Last Updated**: 2025-07-05  
**Next Review**: 2025-07-12 (Projects)  
**Documentation System**: PARA Method by Tiago Forte

---

> 💡 **PARA 철학**: 모든 정보는 행동 가능성에 따라 분류됩니다. 당장 행동해야 할 것부터 미래에 참고할 것까지, 명확한 우선순위를 제공합니다.