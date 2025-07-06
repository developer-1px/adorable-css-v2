# ❌✅ AdorableCSS: 잘못된 vs 올바른 사용법

> 실제 코드 예제로 보는 AdorableCSS의 올바른 사용법

## 🎯 이 문서의 목적

AI 도구들이 AdorableCSS를 사용할 때 자주 하는 실수들을 방지하고, 올바른 패턴을 학습할 수 있도록 실제 코드 예제를 제공합니다.

---

## 🚫 가장 흔한 실수들

### 1. **Margin 사용 실수**

#### ❌ 잘못된 방법 (Tailwind 습관)
```html
<!-- 각 요소가 자신의 margin을 관리 -->
<div class="container">
  <header class="mb(xl)">Header</header>
  <main class="mb(lg)">
    <section class="mb(2xl)">
      <h2 class="mb(md)">Section Title</h2>
      <p class="mb(sm)">Paragraph 1</p>
      <p class="mb(sm)">Paragraph 2</p>
    </section>
  </main>
  <footer class="mt(xl)">Footer</footer>
</div>
```

#### ✅ 올바른 방법 (AdorableCSS)
```html
<!-- 부모가 자식들의 간격을 관리 -->
<div class="container vbox gap(xl)">
  <header>Header</header>
  
  <main>
    <section class="vbox gap(2xl)">
      <div class="vbox gap(md)">
        <h2>Section Title</h2>
        <div class="vbox gap(sm)">
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
        </div>
      </div>
    </section>
  </main>
  
  <footer>Footer</footer>
</div>
```

**차이점**: 각 요소는 자신의 외부 간격을 모르며, 부모 컨테이너가 모든 간격을 제어합니다.

---

### 2. **투명도 표기 실수**

#### ❌ 잘못된 방법 (Tailwind 스타일)
```html
<!-- 슬래시 사용 -->
<div class="bg(white/50) c(black/80) border(gray-200/30)">
  <div class="shadow(lg/black/20)">
    <img class="opacity(70)" src="image.jpg">
  </div>
</div>
```

#### ✅ 올바른 방법 (AdorableCSS Dot Notation)
```html
<!-- 점 사용 -->
<div class="bg(white.5) c(black.8) border(gray-200.3)">
  <div class="shadow(lg)">
    <img class="opacity(0.7)" src="image.jpg">
  </div>
</div>
```

**차이점**: `/` 대신 `.`을 사용하고, CSS 네이티브 값(0.7)을 사용합니다.

---

### 3. **변환 값 실수**

#### ❌ 잘못된 방법 (백분율로 변환)
```html
<!-- 백분율이나 정수로 변환 -->
<div class="scale(105) opacity(80) rotate(90)">
  <div class="blur(5) brightness(120)">
    Transform effects
  </div>
</div>
```

#### ✅ 올바른 방법 (CSS 네이티브 값)
```html
<!-- CSS 사양의 값 그대로 사용 -->
<div class="scale(1.05) opacity(0.8) rotate(90deg)">
  <div class="blur(5px) brightness(1.2)">
    Transform effects
  </div>
</div>
```

**차이점**: CSS 개발자 도구에서 보이는 값과 정확히 일치하는 값을 사용합니다.

---

## 🎨 실제 컴포넌트 비교

### **Button 컴포넌트**

#### ❌ 잘못된 Tailwind 스타일
```html
<button class="
  px-4 py-2 mr-2 mb-4
  bg-blue-500/90 text-white/95
  rounded-md font-medium
  hover:bg-blue-600/90 hover:scale-105
  active:scale-95
  transition-all duration-200
">
  Submit
</button>
```

#### ✅ 올바른 AdorableCSS 스타일  
```html
<!-- 버튼 자체에는 외부 간격 없음 -->
<button class="
  px(lg) py(sm)
  bg(blue-500.9) c(white.95)
  r(md) font(md) 500
  hover:bg(blue-600.9) hover:scale(1.05)
  active:scale(0.95)
  transition duration(0.2s)
">
  Submit
</button>

<!-- 버튼들의 간격은 부모가 관리 -->
<div class="hbox gap(sm)">
  <button class="btn-primary">Submit</button>
  <button class="btn-secondary">Cancel</button>
</div>
```

---

### **Card 컴포넌트**

#### ❌ 잘못된 방법
```html
<div class="
  p-6 mb-6 mx-auto
  bg-white/95 border border-gray-200/50
  rounded-xl shadow-lg/30
  hover:scale-102 hover:shadow-xl/40
  max-w-sm
">
  <img class="w-full h-48 mb-4 rounded-lg" src="image.jpg">
  <h3 class="text-xl font-semibold mb-2">Card Title</h3>
  <p class="text-gray-600/80 mb-4 leading-relaxed">
    Card description text
  </p>
  <button class="w-full bg-blue-500/90 text-white py-2 rounded-md">
    Action
  </button>
</div>
```

#### ✅ 올바른 방법
```html
<!-- 카드 자체는 외부 간격에 대해 알지 못함 -->
<div class="
  vbox gap(lg) p(xl)
  bg(white.95) border(1/gray-200.5)
  r(xl) shadow(lg)
  hover:scale(1.02) hover:shadow(xl)
  w(320)
">
  <img class="w(fill) h(192) r(lg)" src="image.jpg">
  <div class="vbox gap(sm)">
    <h3 class="font(xl) 600">Card Title</h3>
    <p class="c(gray-600.8) leading(relaxed)">
      Card description text
    </p>
  </div>
  <button class="w(fill) bg(blue-500.9) c(white) py(sm) r(md)">
    Action
  </button>
</div>

<!-- 카드들의 간격과 배치는 부모가 관리 -->
<div class="vbox gap(xl) w(fill)">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>
```

---

### **Form 컴포넌트**

#### ❌ 잘못된 방법
```html
<form class="max-w-md mx-auto p-6">
  <div class="mb-4">
    <label class="block text-sm font-medium mb-2">Email</label>
    <input class="w-full px-3 py-2 border border-gray-300/60 rounded-md" 
           type="email">
  </div>
  
  <div class="mb-6">
    <label class="block text-sm font-medium mb-2">Password</label>
    <input class="w-full px-3 py-2 border border-gray-300/60 rounded-md" 
           type="password">
  </div>
  
  <button class="w-full bg-blue-500/90 text-white py-2 rounded-md">
    Sign In
  </button>
</form>
```

#### ✅ 올바른 방법
```html
<!-- 폼은 최대 너비와 중앙 정렬 -->
<div class="hbox(center) w(fill)">
  <form class="vbox gap(lg) p(xl) w(320)">
    
    <div class="vbox gap(sm)">
      <label class="font(sm) 500">Email</label>
      <input class="
        w(fill) px(md) py(sm)
        border(1/gray-300.6) r(md)
        focus:border(blue-500) focus:ring(2/blue-500.2)
      " type="email">
    </div>
    
    <div class="vbox gap(sm)">
      <label class="font(sm) 500">Password</label>
      <input class="
        w(fill) px(md) py(sm)
        border(1/gray-300.6) r(md)
        focus:border(blue-500) focus:ring(2/blue-500.2)
      " type="password">
    </div>
    
    <button class="
      w(fill) py(sm)
      bg(blue-500.9) c(white) r(md)
      hover:bg(blue-600) active:scale(0.98)
    ">
      Sign In
    </button>
    
  </form>
</div>
```

---

## 🎯 레이아웃 패턴 비교

### **페이지 레이아웃**

#### ❌ 잘못된 방법
```html
<div class="min-h-screen">
  <header class="bg-white shadow-sm mb-8">
    <nav class="max-w-6xl mx-auto px-4 py-4">
      <!-- navigation content -->
    </nav>
  </header>
  
  <main class="max-w-4xl mx-auto px-4">
    <section class="mb-12">
      <!-- hero section -->
    </section>
    
    <section class="mb-12">
      <!-- features section -->  
    </section>
  </main>
  
  <footer class="bg-gray-900 text-white mt-16 py-12">
    <!-- footer content -->
  </footer>
</div>
```

#### ✅ 올바른 방법  
```html
<div class="vbox min-h(100vh)">
  
  <header class="bg(white) shadow(sm)">
    <nav class="hbox(center) w(fill)">
      <div class="hbox(pack) w(1200) px(lg) py(lg)">
        <!-- navigation content -->
      </div>
    </nav>
  </header>
  
  <main class="vbox gap(3xl) flex(1)">
    <div class="hbox(center) w(fill)">
      <div class="w(800) px(lg)">
        
        <section>
          <!-- hero section -->
        </section>
        
        <section>
          <!-- features section -->
        </section>
        
      </div>
    </div>
  </main>
  
  <footer class="bg(gray-900) c(white)">
    <div class="hbox(center) w(fill) py(3xl)">
      <div class="w(1200) px(lg)">
        <!-- footer content -->
      </div>
    </div>
  </footer>
  
</div>
```

---

## 📋 Quick 체크리스트

코드를 작성할 때 다음을 확인하세요:

### ❌ 이런 것들이 있으면 잘못된 것
- [ ] `mb(...)`, `mt(...)`, `mx(...)` 같은 margin 클래스
- [ ] `bg(color/50)`, `c(white/80)` 같은 슬래시 투명도  
- [ ] `scale(105)`, `opacity(80)` 같은 백분율 변환 값
- [ ] `max-w-xl mx-auto` 같은 Tailwind 패턴

### ✅ 이런 것들을 사용해야 함
- [ ] `vbox gap(...)`, `hbox gap(...)` 같은 gap 기반 간격
- [ ] `bg(color.5)`, `c(white.8)` 같은 점 투명도
- [ ] `scale(1.05)`, `opacity(0.8)` 같은 CSS 네이티브 값  
- [ ] `w(fill)`, `h(hug)` 같은 Figma 스타일 크기

---

**🎯 핵심**: AdorableCSS는 Tailwind가 아닙니다! Figma의 사고방식으로 접근하고, CSS 네이티브 값을 사용하며, gap 기반 레이아웃을 구축하세요.