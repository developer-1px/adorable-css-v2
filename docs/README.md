# 📚 AdorableCSS Documentation

## 디렉토리 구조

```
docs/
├── 1-projects/          # 진행 중인 프로젝트
├── 2-areas/             # 지속적 관리 영역
│   ├── community/       # 커뮤니티 및 온보딩
│   ├── design-system/   # 디자인 시스템
│   └── documentation/   # 문서 작성 가이드
├── 3-resources/         # 참조 자료
├── 4-archive/           # 보관함
└── 5-public/            # 공개 문서
    ├── mdx/             # MDX 문서
    └── guides/          # 가이드
```

## 문서 추가 방법

1. 적절한 폴더에 마크다운 파일 생성
2. `/docs/config/docs-config.ts`에 항목 추가

```typescript
{
  title: '문서 제목',
  href: '/docs/문서-경로',
  source: '/docs/폴더/파일.md',
  category: 'public',
  tags: ['tag1', 'tag2']
}
```

## 빠른 참조

- **시작하기**: `/docs/5-public/getting-started/`
- **가이드**: `/docs/5-public/guides/`
- **API**: `/docs/2-areas/documentation/REFERENCE.md`
- **온보딩**: `/docs/2-areas/community/onboarding/CLAUDE-ONBOARDING.md`
