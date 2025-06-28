<script>
  import { onMount } from 'svelte';
  // import { configureSemanticColors } from 'adorable-css-core';
  
  // Test semantic color configuration
  onMount(() => {
    // You can test different configurations here
    // configureSemanticColors({
    //   primary: "blue-500",
    //   secondary: "gray-500",
    //   accent: "sky-400",
    //   mute: "gray-400",
    //   brand: "#8b5cf6..#ec4899",
    //   success: "green-500",
    //   warning: "amber-500",
    //   error: "red-500",
    //   info: "cyan-500"
    // });
  });
</script>

<main class="bg(gray-50) c(gray-800) font(sans)">

<header class="sticky top(0) z(100) bg(white.9) backdrop-blur(16px) border-b(gray-200)">
  <div class="contain(wide) hbox(middle+between) h(72px)">
    <a href="/" class="hbox(middle) gap(md) no-underline">
      <div class="logo-mark() w(36px) h(36px) bg(brand) r(lg) shadow(md)"></div>
      <span class="font(xl) bold(800) c(gray-900)">AdorableCSS</span>
    </a>
    <nav class="hbox(middle) gap(sm) ..md:hidden">
      <a href="#features" class="nav-link()">Features</a>
      <a href="#compare" class="nav-link()">Compare</a>
      <a href="https://github.com/..." target="_blank" class="nav-link()">GitHub</a>
    </nav>
    <a href="#start" class="btn(primary) ..md:hidden">Get Started</a>
    <button class="btn(icon) md:hidden">
    </button>
  </div>
</header>

<main>
  <section class="contain(wide) py(6xl) vbox(center) gap(2xl) text(center)">
    <h1 class="font(6xl/1.2) md:font(7xl/1.2) bold(900) max-w(800px)">
      <span class="c(brand) tracking(-2px)">Figma에서 생각하고,</span><br>
      <span class="c(gray-800) tracking(-3px)">코드로 그리세요.</span>
    </h1>
    <p class="font(xl/1.7) c(gray-600) max-w(600px)">
      디자인과 코드 사이의 '번역'을 멈추세요. AdorableCSS는 당신의 생각을 동기화합니다.
    </p>

    <div class="grid(1) lg:grid(3) gap(xl) w(full) mt(2xl)">
      <div class="panel(figma) vbox gap(lg) p(xl) text(left)">
        <div class="prop-group()">
          <label>Auto Layout</label>
          <div class="hbox gap(sm)">
            <button class="btn(tool/active)">V</button>
            <button class="btn(tool)">H</button>
          </div>
        </div>
        <div class="prop-group()">
          <label>Gap</label>
          <input type="text" value="16px" class="input(prop)">
        </div>
        <div class="prop-group()">
          <label>Padding</label>
          <input type="text" value="24px" class="input(prop)">
        </div>
        <div class="prop-group()">
          <label>Fill</label>
          <div class="color-swatch() bg(white)"></div>
        </div>
        <div class="prop-group()">
          <label>Stroke</label>
          <div class="color-swatch() bg(gray-200)"></div>
        </div>
      </div>

      <div class="panel(code) p(xl) bg(gray-900) r(xl) font(mono) text(sm) text(left)">
          <pre><code class="c(white)">
&lt;div class="
  <span class="hl(prop)">vbox</span>
  <span class="hl(prop)">gap(md)</span>
  <span class="hl(prop)">p(xl)</span>
  <span class="hl(bg)">bg(white)</span>
  <span class="hl(border)">border(1/gray-200)</span>
  r(xl)
  shadow(lg)
"&gt;
  ...
&lt;/div&gt;
          </code></pre>
      </div>

      <div class="panel(preview) vbox(pack) p(xl) bg(gray-200) r(xl)">
        <div class="vbox gap(md) p(xl) bg(white) border(1/gray-200) r(xl) shadow(lg) w(full)">
          <div class="w(full) h(48px) bg(gray-100) r(md)"></div>
          <div class="w(full) h(24px) bg(gray-100) r(md)"></div>
        </div>
      </div>
    </div>
  </section>

  <section id="features" class="py(5xl) bg(white)">
    <div class="contain(wide) vbox(center) gap(3xl)">
      <div class="title-group() text(center)">
        <h2 class="heading(h2)">생산성을 위한 설계</h2>
        <p class="heading(sub)">AdorableCSS는 단순한 유틸리티가 아닌, 생각의 프레임워크입니다.</p>
      </div>
      <div class="grid(1) md:grid(2) lg:grid(4) gap(xl)">
        <div class="feature-card()">
          <div class="icon-wrapper()"><i data-lucide="figma"></i></div>
          <h3 class="font(lg) bold(700)">Figma의 멘탈 모델</h3>
          <p>오토 레이아웃, 패딩, 갭. 익숙한 그 방식 그대로 코딩하세요.</p>
        </div>
        <div class="feature-card()">
          <div class="icon-wrapper()"><i data-lucide="zap"></i></div>
          <h3 class="font(lg) bold(700)">압도적인 간결함</h3>
          <p>20줄의 유틸리티가 아닌, `card(interactive)` 한 줄로 끝내세요.</p>
        </div>
        <div class="feature-card()">
          <div class="icon-wrapper()"><i data-lucide="package"></i></div>
          <h3 class="font(lg) bold(700)">컴포넌트 내장</h3>
          <p>버튼, 카드, 폼. 바로 사용 가능한 컴포넌트로 시간을 절약하세요.</p>
        </div>
        <div class="feature-card()">
          <div class="icon-wrapper()"><i data-lucide="wand-2"></i></div>
          <h3 class="font(lg) bold(700)">마법같은 문법</h3>
          <p>복잡한 그라데이션, 필터 효과도 한 줄의 클래스로 표현됩니다.</p>
        </div>
      </div>
    </div>
  </section>

  <section id="compare" class="py(5xl) bg(gray-900) c(white)">
    <div class="contain(wide) vbox(center) gap(3xl)">
      <div class="title-group() text(center)">
        <h2 class="heading(h2) c(white)">차이는 극명합니다</h2>
        <p class="heading(sub) c(gray-400)">어떤 코드를 작성하고 싶으신가요? 직접 선택해보세요.</p>
      </div>

      <div class="toggle-switch() p(sm) bg(gray-800) r(full) hbox gap(sm)">
        <button class="btn(toggle)">Tailwind Hell</button>
        <button class="btn(toggle/active)">Adorable Heaven</button>
      </div>

      <div class="relative w(full) max-w(800px) h(400px)">
        <div class="code-block(tailwind) absolute inset(0) opacity(0)">...</div>
        <div class="code-block(adorable) absolute inset(0) opacity(100)">...</div>
      </div>
    </div>
  </section>

  <section class="py(5xl)">
    <div class="contain(narrow)">
      <div class="hbox gap(xl) bg(white) r(2xl) p(2xl) shadow(xl) items(center) ..md:vbox">
        <img src="your-avatar.png" class="w(120px) h(120px) r(full) shadow(md)">
        <div class="vbox gap(md)">
          <p class="font(lg/1.6) c(gray-700)">
            "저는 디자인 시스템을 코드로 '번역'하는 데 지쳐있었습니다. Figma에서 클릭 몇 번으로 하던 일을 수십 개의 클래스로 옮기는 작업은 창의성을 갉아먹었죠. AdorableCSS는 그 고통을 해결하기 위해, 저 자신을 위해 만든 프로젝트입니다. 이 즐거운 경험을 당신과도 나누고 싶습니다."
          </p>
          <div class="hbox(middle) gap(sm)">
            <span class="font(md) bold(600) c(gray-900)">Your Name</span>
            <span class="c(gray-500)">/ Creator of AdorableCSS</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Brand Token Test Section -->
  <section class="py(4xl) bg(gray-100)">
    <div class="contain(wide) vbox gap(3xl)">
      <h2 class="font(3xl) bold c(gray-900) text(center)">Brand Token Test</h2>
      
      <div class="grid(2) lg:grid(4) gap(xl)">
        <!-- Background brand gradient -->
        <div class="vbox gap(md) text(center)">
          <div class="h(120px) bg(brand) r(xl) shadow(lg)"></div>
          <code class="font(sm) c(gray-600)">bg(brand)</code>
        </div>
        
        <!-- Text brand gradient -->
        <div class="vbox gap(md) text(center)">
          <div class="h(120px) bg(white) r(xl) shadow(sm) vbox(middle)">
            <h3 class="c(brand) font(2xl) bold">Brand Text</h3>
          </div>
          <code class="font(sm) c(gray-600)">c(brand)</code>
        </div>
        
        <!-- Brand button -->
        <div class="vbox gap(md) text(center)">
          <div class="h(120px) bg(white) r(xl) shadow(sm) vbox(middle)">
            <button class="bg(brand) c(white) px(xl) py(md) r(lg) shadow(md) hover:shadow(lg) transition">
              Brand Button
            </button>
          </div>
          <code class="font(sm) c(gray-600)">bg(brand) c(white)</code>
        </div>
        
        <!-- Other semantic colors -->
        <div class="vbox gap(md) text(center)">
          <div class="h(120px) bg(white) r(xl) shadow(sm) vbox gap(sm) p(md)">
            <div class="h(20px) bg(primary) r(sm)"></div>
            <div class="h(20px) bg(secondary) r(sm)"></div>
            <div class="h(20px) bg(accent) r(sm)"></div>
            <div class="h(20px) bg(mute) r(sm)"></div>
          </div>
          <code class="font(sm) c(gray-600)">Semantic Colors</code>
        </div>
      </div>
      
      <div class="vbox gap(lg) bg(white) p(xl) r(xl) shadow(md)">
        <h3 class="font(xl) bold c(gray-900)">Semantic Color Configuration</h3>
        <pre class="bg(gray-50) p(lg) r(lg) overflow-x(auto)"><code class="font(sm)">{`configureSemanticColors({
  primary: "blue-500",
  secondary: "gray-500",
  accent: "sky-400",
  mute: "gray-400",
  brand: "#8b5cf6..#ec4899",  // Gradient syntax
  success: "green-500",
  warning: "amber-500",
  error: "red-500",
  info: "cyan-500"
});`}</code></pre>
      </div>
    </div>
  </section>

</main>

<footer class="bg(gray-900) c(gray-400) py(4xl) text(sm)">
  <div class="contain(wide) vbox gap(2xl)">
    <div class="grid(1) md:grid(4) gap(xl)">
      <div class="vbox gap(md) md:col-span(2)">
        <h3 class="font(lg) bold(700) c(white)">AdorableCSS</h3>
        <p>The Figma-First CSS Framework. <br> Released under the MIT License.</p>
      </div>
      <div class="vbox gap(md)">
        <h4 class="c(white) bold">Docs</h4>
        <a href="#" class="footer-link()">Quick Start</a>
        <a href="#" class="footer-link()">Core Concepts</a>
        <a href="#" class="footer-link()">API</a>
      </div>
      <div class="vbox gap(md)">
        <h4 class="c(white) bold">Community</h4>
        <a href="#" class="footer-link()">GitHub</a>
        <a href="#" class="footer-link()">Join Discord</a>
        <a href="#" class="footer-link()">Twitter</a>
      </div>
    </div>
    <div class="border-t(1/gray-800) pt(xl) hbox(between) ..sm:vbox gap(md)">
      <p>© 2025 AdorableCSS. All rights reserved.</p>
      <p>Made with ❤️ by the community.</p>
    </div>
  </div>
</footer>
</main>