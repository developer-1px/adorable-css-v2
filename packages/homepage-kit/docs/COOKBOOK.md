# 🍳 AdorableCSS Cookbook

> 실무에서 바로 쓰는 레시피 모음

## 📱 Form 패턴

### 로그인 폼

```html
<div class="hbox(pack) min-h(screen) bg(gray-50)">
  <form class="card w(400px) p(2xl)">
    <h2 class="heading(lg) text(center) mb(xl)">로그인</h2>
    
    <div class="vbox gap(lg)">
      <!-- 이메일 필드 -->
      <div class="vbox gap(sm)">
        <label class="label(sm) c(gray-700)">이메일</label>
        <input 
          type="email"
          class="w(full) px(md) py(sm) r(md) b(1/gray-300) 
                 focus:b(2/blue-500) transition"
          placeholder="your@email.com"
        />
      </div>
      
      <!-- 비밀번호 필드 -->
      <div class="vbox gap(sm)">
        <div class="hbox gap(auto)">
          <label class="label(sm) c(gray-700)">비밀번호</label>
          <a href="#" class="caption(sm) c(blue-600) hover:underline">
            비밀번호 찾기
          </a>
        </div>
        <input 
          type="password"
          class="w(full) px(md) py(sm) r(md) b(1/gray-300) 
                 focus:b(2/blue-500) transition"
        />
      </div>
      
      <!-- 체크박스 -->
      <label class="hbox gap(sm) cursor(pointer)">
        <input type="checkbox" class="accent-color(blue-500)">
        <span class="label(sm) c(gray-600)">로그인 상태 유지</span>
      </label>
      
      <!-- 제출 버튼 -->
      <button class="btn w(full) py(md) bg(blue-500) c(white) 
                     hover:bg(blue-600) active:scale(98)">
        로그인
      </button>
    </div>
    
    <!-- 구분선 -->
    <div class="hbox(middle) gap(md) my(xl)">
      <div class="h(1px) bg(gray-300) flex(1)"></div>
      <span class="caption(sm) c(gray-500)">또는</span>
      <div class="h(1px) bg(gray-300) flex(1)"></div>
    </div>
    
    <!-- 소셜 로그인 -->
    <button class="w(full) hbox(pack) gap(sm) py(md) b(1/gray-300) 
                   r(md) hover:bg(gray-50) transition">
      <icon>🔍</icon>
      <span class="label(md)">Google로 계속하기</span>
    </button>
  </form>
</div>
```

### 멀티 스텝 폼

```html
<div class="vbox gap(xl) max-w(600px) mx(auto) p(xl)">
  <!-- 진행 표시기 -->
  <div class="hbox gap(sm)">
    <div class="flex(1) h(2) bg(blue-500) r(full)"></div>
    <div class="flex(1) h(2) bg(blue-500) r(full)"></div>
    <div class="flex(1) h(2) bg(gray-300) r(full)"></div>
  </div>
  
  <!-- 폼 컨텐츠 -->
  <div class="card">
    <h3 class="heading(md) mb(lg)">기본 정보</h3>
    <!-- 폼 필드들... -->
  </div>
</div>
```

## 🖼 레이아웃 패턴

### 사이드바 레이아웃

```html
<div class="hbox min-h(screen)">
  <!-- 사이드바 -->
  <aside class="w(260px) bg(gray-900) p(lg) hidden lg:block">
    <nav class="vbox gap(sm)">
      <a class="hbox(middle) gap(md) px(md) py(sm) r(md) 
                c(white) hover:bg(white/0.1) transition">
        <icon>🏠</icon>
        <span>대시보드</span>
      </a>
      <!-- 더 많은 메뉴... -->
    </nav>
  </aside>
  
  <!-- 메인 컨텐츠 -->
  <main class="flex(1) bg(gray-50) p(xl)">
    <!-- 컨텐츠... -->
  </main>
</div>
```

### 고정 헤더 + 스크롤 컨텐츠

```html
<div class="vbox h(screen)">
  <!-- 고정 헤더 -->
  <header class="h(64px) bg(white) shadow(sm) px(xl) hbox(middle)">
    <h1 class="heading(md)">My App</h1>
  </header>
  
  <!-- 스크롤 가능한 컨텐츠 -->
  <main class="flex(1) overflow-y(auto) p(xl)">
    <!-- 긴 컨텐츠... -->
  </main>
</div>
```

## 🎴 카드 패턴

### 제품 카드

```html
<div class="card hover:shadow(xl) transition group cursor(pointer)">
  <!-- 이미지 -->
  <div class="relative size(4:3) clip r(xl)">
    <img 
      src="product.jpg" 
      class="w(full) h(full) object(cover) 
             group-hover:scale(110) transition duration(300)"
    />
    <div class="layer(top:12/right:12) px(sm) py(xs) 
                 bg(red-500) c(white) r(md) caption(sm) bold">
      -20%
    </div>
  </div>
  
  <!-- 정보 -->
  <div class="vbox gap(sm) p(lg)">
    <h3 class="title(lg) line-clamp(2)">상품명이 들어갑니다</h3>
    <div class="hbox(bottom) gap(sm)">
      <span class="font(xl) bold">₩29,900</span>
      <span class="font(sm) c(gray-500) line-through">₩39,900</span>
    </div>
    <div class="hbox gap(xs)">
      <span class="c(yellow-500)">★★★★☆</span>
      <span class="caption(sm) c(gray-600)">(128)</span>
    </div>
  </div>
</div>
```

### 통계 카드

```html
<div class="card hbox gap(auto)">
  <div class="vbox gap(sm)">
    <p class="label(sm) c(gray-600)">월 매출</p>
    <p class="font(2xl) bold">₩45,231,900</p>
    <div class="hbox(middle) gap(xs)">
      <span class="c(green-500)">↑</span>
      <span class="caption(sm) c(green-600)">
        12% 지난달 대비
      </span>
    </div>
  </div>
  <div class="size(56) bg(blue-100) r(xl) hbox(pack)">
    <icon class="font(2xl)">💰</icon>
  </div>
</div>
```

## 🎯 인터랙션 패턴

### 드롭다운 메뉴 (CSS only)

```html
<div class="relative group">
  <button class="btn hbox gap(sm)">
    옵션 <span class="transition group-hover:rotate(180)">▼</span>
  </button>
  
  <div class="layer(top:100%/left:0) mt(sm) w(200px) 
               bg(white) shadow(lg) r(lg) p(sm)
               opacity(0) invisible group-hover:opacity(100) 
               group-hover:visible transition">
    <a class="block px(md) py(sm) r(md) hover:bg(gray-100)">옵션 1</a>
    <a class="block px(md) py(sm) r(md) hover:bg(gray-100)">옵션 2</a>
    <a class="block px(md) py(sm) r(md) hover:bg(gray-100)">옵션 3</a>
  </div>
</div>
```

### 탭 인터페이스

```html
<div class="vbox">
  <!-- 탭 헤더 -->
  <div class="hbox b(b/1/gray-200)">
    <button class="px(lg) py(md) bb(2/blue-500) c(blue-600)">
      탭 1
    </button>
    <button class="px(lg) py(md) c(gray-600) hover:c(gray-900)">
      탭 2
    </button>
    <button class="px(lg) py(md) c(gray-600) hover:c(gray-900)">
      탭 3
    </button>
  </div>
  
  <!-- 탭 컨텐츠 -->
  <div class="p(xl)">
    탭 1 내용
  </div>
</div>
```

## 🎨 특수 효과

### 글래스모피즘 카드

```html
<div class="relative p(xl) bg(to-br/purple-500..pink-500)">
  <!-- 배경 장식 -->
  <div class="layer(top:20/left:20) size(200) bg(white/0.2) 
               r(full) blur(100)"></div>
  
  <!-- 글래스 카드 -->
  <div class="relative glass(20) p(xl) r(xl)">
    <h2 class="heading(lg) c(white) mb(md)">Glass Effect</h2>
    <p class="body c(white/0.8)">
      배경이 흐릿하게 보이는 글래스모피즘 효과
    </p>
  </div>
</div>
```

### 그라디언트 텍스트 버튼

```html
<button class="relative px(xl) py(md) r(full) clip group">
  <!-- 배경 그라디언트 -->
  <div class="layer(fill) bg(135deg/purple-500..pink-500) 
               group-hover:scale(110) transition"></div>
  
  <!-- 텍스트 -->
  <span class="relative font(lg) bold c(white)">
    Gradient Button
  </span>
</button>
```

## 🔄 애니메이션 패턴

### 스켈레톤 로딩

```html
<div class="card animate(pulse)">
  <div class="h(200) bg(gray-200) r(lg) mb(md)"></div>
  <div class="h(20) bg(gray-200) r(md) mb(sm)"></div>
  <div class="h(16) bg(gray-200) r(md) w(60%)"></div>
</div>
```

### 호버 카드 효과

```html
<div class="card group cursor(pointer) transition-all duration(300)
            hover:translate-y(-8) hover:shadow(2xl)">
  <div class="clip r(lg) mb(md)">
    <img class="w(full) transition duration(500) 
                group-hover:scale(110) group-hover:rotate(2)">
  </div>
  <!-- 컨텐츠 -->
</div>
```

## 💡 Pro Tips

### 1. 반복되는 패턴은 컴포넌트로

```javascript
// React/Vue/Svelte 컴포넌트
function Card({ children, hover = true }) {
  return (
    <div class={`card ${hover ? 'hover:shadow(xl)' : ''}`}>
      {children}
    </div>
  )
}
```

### 2. 테마 변수 활용

```css
:root {
  --primary: #667eea;
  --surface: white;
}

/* AdorableCSS에서 사용 */
.themed-button {
  @apply bg(--primary) c(--surface);
}
```

### 3. 조건부 스타일링

```javascript
// 클래스 조합 유틸리티
function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

// 사용
<div class={cx(
  'card',
  isActive && 'ring(2/blue-500)',
  isDisabled && 'opacity(50) cursor(not-allowed)'
)}>
```

---

**더 많은 레시피가 필요하신가요?**
- 🔗 [커뮤니티 레시피](https://github.com/adorablecss/recipes)
- 💬 [레시피 요청하기](https://github.com/adorablecss/adorable-css-v2/discussions)