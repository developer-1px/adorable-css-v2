# 🔍 사용하지 않는 파일 찾기 가이드

## 설치된 도구

### 1. **Knip** - 사용하지 않는 파일, exports, dependencies 찾기
```bash
# 기본 실행
pnpm knip

# 간단한 리포트
pnpm find-unused

# 자동 수정 (주의해서 사용)
pnpm knip:fix
```

### 2. **Depcheck** - 사용하지 않는 dependencies 찾기
```bash
# 루트에서 실행
pnpm depcheck

# 모든 패키지에서 실행
pnpm depcheck:all
```

## 사용 방법

### 🎯 사용하지 않는 파일 찾기
```bash
pnpm find-unused
```

출력 예시:
```
Unused files (10)
packages/homepage-kit/src/lib/old-component.svelte
packages/adorable-css/src/utils/deprecated.ts
...
```

### 📦 사용하지 않는 패키지 찾기
```bash
pnpm depcheck
```

출력 예시:
```
Unused dependencies
* unused-package
* @types/unused

Missing dependencies
* actually-used-package
```

## ⚠️ 주의사항

### Knip 사용 시
1. **UI 컴포넌트**: `src/lib/components/ui/` 폴더는 무시하도록 설정됨
2. **예제 파일**: `src/examples/` 폴더는 무시하도록 설정됨
3. **설정 파일**: 일부 설정 파일은 런타임에만 사용되므로 false positive 가능

### Depcheck 사용 시
1. **DevDependencies**: 빌드 도구들은 사용 중이어도 미사용으로 표시될 수 있음
2. **Peer Dependencies**: 실제로 필요하지만 미사용으로 표시될 수 있음
3. **Dynamic Imports**: 동적으로 import하는 패키지는 감지 못할 수 있음

## 🛠️ 설정 파일

### knip.json
```json
{
  "entry": ["packages/*/src/index.ts"],
  "ignore": [
    "**/__tests__/**",
    "**/dist/**",
    "docs/config/**"
  ]
}
```

### .depcheckrc (필요시 생성)
```json
{
  "ignoreMatches": [
    "eslint-*",
    "@types/*",
    "vitest"
  ]
}
```

## 💡 권장 워크플로우

1. **정기적으로 실행**: 주 1회 정도 실행하여 불필요한 코드 축적 방지
2. **PR 전 확인**: 큰 변경사항 PR 전에 실행
3. **수동 검토**: 자동 삭제보다는 수동으로 확인 후 삭제 권장

## 🔧 문제 해결

### False Positives가 많을 때
1. `knip.json`의 `ignore` 패턴 추가
2. 특정 폴더나 파일 패턴 제외

### 실제 사용 중인 파일이 미사용으로 표시될 때
1. `entry` 포인트 확인
2. Dynamic imports 확인
3. Svelte 파일의 경우 `svelte.config.js` 경로 확인