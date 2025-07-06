# AdorableCSS v2 - 디버깅 및 실패한 클래스 감지

AdorableCSS v2 CDN 패키지는 생성되지 않은 클래스를 자동으로 감지하고 로그로 표시하여 누락된 기능을 쉽게 파악할 수 있게 해줍니다.

## 기본 사용법

### 1. 디버그 모드 활성화

```html
<script src="./dist/index.global.js"></script>
<script>
  // 디버그 모드로 초기화
  AdorableCSSV2.init({ debug: true });
</script>
```

### 2. 브라우저 콘솔에서 실패한 클래스 확인

디버그 모드가 활성화되면 DOM에 새로운 클래스가 감지될 때마다 다음과 같은 로그를 볼 수 있습니다:

```
⚠️ AdorableCSS v2: Failed to generate CSS for classes: ["invalid-class", "unknown-utility"]
💡 These classes might need to be added to the core rules. Please report them!
✅ AdorableCSS v2: Updated styles for classes: ["hbox(pack)", "p(20)", "invalid-class", "unknown-utility"]
📊 Generated 4 classes, 2 failed
```

## 유틸리티 함수

### `checkFailedClasses(classes: string[]): string[]`

특정 클래스 배열에서 실패한 클래스들을 찾습니다.

```javascript
import { checkFailedClasses } from 'adorable-css-cdn';

const failed = checkFailedClasses([
  'hbox(pack)',      // ✅ 유효함
  'invalid-class',   // ❌ 실패
  'p(20)',          // ✅ 유효함
  'unknown-rule'    // ❌ 실패
]);

console.log(failed); // ['invalid-class', 'unknown-rule']
```

### `analyzeClasses(classes: string[]): AnalysisResult`

클래스 배열을 종합적으로 분석하여 상세한 결과를 제공합니다.

```javascript
import { analyzeClasses } from 'adorable-css-cdn';

const result = analyzeClasses([
  'hbox(pack)', 'invalid-class', 'p(20)', 'unknown-utility'
]);

console.log(result);
// {
//   total: 4,
//   successful: ['hbox(pack)', 'p(20)'],
//   failed: ['invalid-class', 'unknown-utility'],
//   successRate: '50%'
// }
```

### `generate(classes: string[], options?: { debug?: boolean }): string`

CSS 생성과 동시에 디버그 정보를 출력합니다.

```javascript
const css = AdorableCSSV2.generate([
  'hbox(pack)', 'invalid-class', 'p(20)'
], { debug: true });

// 콘솔에 실패한 클래스 정보가 출력됩니다
```

## 실시간 모니터링

### HTML 클래스 자동 감지

디버그 모드에서 DOM에 클래스가 추가되면 자동으로 분석됩니다:

```html
<!-- 이 요소가 DOM에 추가되면 자동으로 클래스를 분석 -->
<div class="vbox(pack) invalid-feature p(15) unknown-rule">
  Content
</div>
```

### MutationObserver 기반 추적

CDN은 MutationObserver를 사용하여 클래스 변경사항을 실시간으로 감지합니다:

```javascript
// 동적으로 클래스 추가
element.classList.add('new-invalid-class');
// 즉시 콘솔에 실패 정보가 표시됩니다
```

## 예시: 실시간 분석

```html
<!DOCTYPE html>
<html>
<head>
    <script src="./dist/index.global.js"></script>
</head>
<body>
    <div class="hbox(pack) p(20) invalid-class bg(blue)">
        Test Content
    </div>

    <script>
        AdorableCSSV2.init({ debug: true });
        
        // 수동으로 클래스 분석
        const analysis = AdorableCSSV2.analyze([
            'hbox(pack)', 'p(20)', 'invalid-class', 'bg(blue)'
        ]);
        
        console.log('Analysis:', analysis);
        // 성공률과 실패한 클래스 목록이 출력됩니다
    </script>
</body>
</html>
```

## 주의사항

1. **성능**: 디버그 모드는 개발 환경에서만 사용하세요
2. **로그**: 브라우저 콘솔을 확인하여 실패한 클래스 정보를 확인하세요
3. **피드백**: 실패한 클래스는 핵심 규칙에 추가가 필요할 수 있습니다

## 실패한 클래스 감지 기준

다음과 같은 경우 클래스가 "실패"로 분류됩니다:

1. CSS가 전혀 생성되지 않는 경우
2. 알 수 없는 클래스의 경우 (빈 CSS 규칙은 더 이상 생성되지 않음)

**v2.0.0-beta.1 이후 변경사항:**
- 빈 CSS 규칙 (예: `.invalid-class{}`)은 더 이상 생성되지 않습니다
- 실패한 클래스는 완전히 무시되고 CSS에 포함되지 않습니다

유효한 클래스만 실제 CSS 속성을 포함한 규칙을 생성합니다:
```css
.hbox\(pack\){display:flex;flex-direction:row;justify-content:center;align-items:center}
```

**예시:**
```javascript
generateCSS(['hbox(pack)', 'invalid-class', 'p(20)'])
// 결과: ".hbox\(pack\){...}\n.p\(20\){padding:20px}"
// 'invalid-class'는 완전히 제외됨
```