# 📚 AdorableCSS Documentation System

## 개요

AdorableCSS의 통합 문서 시스템입니다. PARA 정리법을 기반으로 구성되어 있으며, 홈페이지와 분리되어 있지만 유기적으로 연동됩니다.

## 디렉토리 구조

```
docs/
├── config/              # 문서 시스템 설정
│   ├── docs-config.ts   # 문서 구조 및 네비게이션 정의
│   └── index.ts         # 설정 export
│
├── 1-projects/          # 🎯 진행 중인 프로젝트
├── 2-areas/             # 🔄 지속적 관리 영역
│   ├── community/       # 커뮤니티 및 온보딩
│   ├── design-system/   # 디자인 시스템 문서
│   └── documentation/   # 문서 작성 가이드
│
├── 3-resources/         # 📖 참조 자료
│   ├── design/          # 디자인 리소스
│   ├── technical/       # 기술 참조
│   └── research/        # 연구 자료
│
├── 4-archive/           # 🗄️ 보관함
│
└── 5-public/            # 🌐 공개 문서
    ├── mdx/             # MDX 형식 문서
    └── guides/          # 가이드 문서
```

## 문서 통합 시스템

### 1. 중앙화된 설정 (`/docs/config/docs-config.ts`)

- 모든 문서의 구조와 메타데이터를 한 곳에서 관리
- 카테고리별 분류 (public, internal, api)
- 태그 기반 검색 지원
- 자동 네비게이션 생성

### 2. 홈페이지 연동

홈페이지는 `/packages/homepage-kit`에서 다음과 같이 문서를 참조합니다:

```typescript
import { docsConfig } from '../../../../../../docs/config';
```

### 3. 문서 카테고리

- **public**: 외부 공개용 문서 (사용자 가이드, API 문서)
- **internal**: 내부용 문서 (팀 온보딩, 개발 가이드)
- **api**: API 레퍼런스 문서

### 4. 문서 추가 방법

1. 적절한 폴더에 마크다운 파일 생성
2. `/docs/config/docs-config.ts`에 항목 추가:

```typescript
{
  title: '문서 제목',
  href: '/docs/문서-경로',
  description: '문서 설명',
  source: '/docs/폴더/파일.md',
  category: 'public',  // 또는 'internal', 'api'
  tags: ['tag1', 'tag2'],
  badge: 'new'  // 선택사항: 'new', 'beta', 'deprecated'
}
```

## 주요 기능

### 1. 자동 네비게이션
- 이전/다음 문서 자동 연결
- 섹션별 그룹화
- 뱃지 시스템 (new, beta, deprecated)

### 2. 검색 기능
- 태그 기반 검색
- 카테고리별 필터링
- 전체 문서 검색 (계획 중)

### 3. 빌드 시스템 통합
- 문서 유효성 검증
- 자동 TOC 생성
- 정적 사이트 생성 지원

## 모범 사례

1. **일관된 문서 구조 유지**
   - 제목은 H1으로 시작
   - 명확한 섹션 구분
   - 코드 예제 포함

2. **메타데이터 활용**
   - 적절한 태그 추가
   - 카테고리 올바르게 설정
   - 설명문 간결하게 작성

3. **PARA 원칙 준수**
   - Projects: 마감일이 있는 작업
   - Areas: 지속적 책임 영역
   - Resources: 참조 자료
   - Archive: 완료/폐기 항목

## 문서 작성 가이드

- [문서 작성 스타일 가이드](/docs/2-areas/documentation/STYLE_GUIDE.md)
- [마크다운 작성법](/docs/2-areas/documentation/MARKDOWN_GUIDE.md)
- [MDX 활용법](/docs/2-areas/documentation/MDX_GUIDE.md)

## 기여 방법

1. 문서 개선사항 발견 시 PR 생성
2. 새 문서 추가 시 `docs-config.ts` 업데이트
3. 태그와 카테고리 적절히 설정
4. 문서 미리보기 확인 후 제출