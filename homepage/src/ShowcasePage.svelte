<script lang="ts">
  import { onMount } from 'svelte';
  
  let heroVisible = false;
  
  onMount(() => {
    heroVisible = true;
  });
</script>

<div class="showcase-page vbox w(fill) h(fill) bg(#000) scroll(y)">
  <!-- Hero Section with Animated Background -->
  <section class="hero relative w(fill) h(screen) vbox(pack) gap(32) bg(gradient/135deg/#0a0a0a/#1a1a2e) clip">
    <!-- Multiple animated background layers -->
    <div class="hero-bg-grid absolute w(fill) h(fill) opacity(.05) z(1) animate(float/20s/ease-in-out/infinite)"></div>
    <div class="hero-bg-glow1 absolute w(600) h(600) r() bg(radial/#667eea/#764ba2) blur(120) z(2) animate(pulse/4s/ease-in-out/infinite)" style="opacity: 0.15;"></div>
    <div class="hero-bg-glow2 absolute w(400) h(400) r() bg(radial/#10b981/#059669) blur(80) z(2) animate(pulse/6s/ease-in-out/infinite)" style="opacity: 0.1;"></div>
    <div class="hero-bg-glow3 absolute w(300) h(300) r() bg(radial/#f59e0b/#d97706) blur(60) z(2) animate(pulse/8s/ease-in-out/infinite)" style="opacity: 0.1;"></div>
    
    <!-- Floating particles -->
    <div class="particle particle-1 absolute w(4) h(4) r() bg(white) z(3) animate(float/12s/ease-in-out/infinite)" style="opacity: 0.3;"></div>
    <div class="particle particle-2 absolute w(6) h(6) r() bg(#667eea) z(3) animate(float/15s/ease-in-out/infinite)" style="opacity: 0.4;"></div>
    <div class="particle particle-3 absolute w(3) h(3) r() bg(#10b981) z(3) animate(float/18s/ease-in-out/infinite)" style="opacity: 0.5;"></div>
    
    <!-- Hero content with enhanced typography -->
    <div class="hero-content relative z(10) vbox(pack) gap(40) text(center) p(40)">
      <div class="hero-badge hbox(pack) p(8/20) r() bg(rgba(102,126,234,0.1)) backdrop(blur/10) b(1/rgba(102,126,234,0.2)) animate(fade/2s/ease-in-out)">
        <span class="font(12) c(#667eea) font-family(mono) uppercase">✨ Now Available</span>
      </div>
      
      <div class="hero-title vbox gap(16)">
        <h1 class="font(72/1.1) bold c(white..#e0e7ff) text-shadow(0/4px/8px/rgba(0,0,0,0.3)) animate(fade/2s/ease-in-out)">
          AdorableCSS v2
        </h1>
        <div class="hero-subtitle font(24/1.4) c(#94a3b8..#cbd5e1) text-shadow(0/2px/4px/rgba(0,0,0,0.2))">
          세상에서 가장 <span class="c(#667eea..#764ba2) bold">Figma스러운</span> CSS 프레임워크
        </div>
      </div>
      
      <p class="font(18/1.6) c(#64748b..#94a3b8) max-w(700) text(center) animate(fade/2.5s/ease-in-out)">
        디자이너와 개발자 간의 완벽한 동기화를 위한 혁신적인 CSS 프레임워크.<br>
        <span class="c(#10b981) font(16) italic">Figma Auto Layout을 코드로 그대로 구현</span>
      </p>
      
      <!-- Enhanced CTA Buttons -->
      <div class="hero-cta hbox(center) gap(20) pt(32) animate(fade/3s/ease-in-out)">
        <button class="cta-primary hbox(pack) gap(8) p(18/36) r(12) bg(#667eea..#764ba2) c(white) font(16) bold shadow(0/8px/32px/rgba(102,126,234,0.3)) transition hover:scale(1.05) hover:shadow(0/12px/40px/rgba(102,126,234,0.4)) active:scale(0.98) backdrop(blur/10)">
          <span>🚀</span>
          <span>Get Started</span>
        </button>
        <button class="cta-secondary hbox(pack) gap(8) p(18/36) r(12) b(1/#334155) c(#94a3b8) font(16) bg(rgba(15,15,15,0.8)) backdrop(blur/10) transition hover:bg(rgba(30,41,59,0.8)) hover:c(white) hover:b(1/#667eea)">
          <span>📖</span>
          <span>Documentation</span>
        </button>
        <button class="cta-github hbox(pack) gap(8) p(18/36) r(12) bg(#1a1a1a) b(1/#333) c(#e5e7eb) font(16) transition hover:bg(#2a2a2a) hover:scale(1.02)">
          <span>⭐</span>
          <span>GitHub</span>
        </button>
      </div>
      
      <!-- Live code preview -->
      <div class="hero-preview vbox gap(16) p(24) r(16) bg(rgba(10,10,10,0.8)) backdrop(blur/20) b(1/rgba(51,65,85,0.3)) max-w(600) animate(fade/3.5s/ease-in-out)">
        <div class="hbox(between+center) gap(16)">
          <span class="font(12) c(#10b981) font-family(mono) uppercase">Live Preview</span>
          <div class="hbox gap(4)">
            <div class="w(8) h(8) r() bg(#ef4444)"></div>
            <div class="w(8) h(8) r() bg(#f59e0b)"></div>
            <div class="w(8) h(8) r() bg(#10b981)"></div>
          </div>
        </div>
        <code class="font(14/1.6) c(#fbbf24) font-family(mono) text(left)">
          vbox(pack) gap(16) p(24) r(12)<br>
          bg(#667eea..#764ba2) shadow(lg)<br>
          hover:scale(1.05) transition
        </code>
      </div>
    </div>
    
    <!-- Enhanced scroll indicator -->
    <div class="scroll-indicator absolute bottom(40) left(50%) translate(-50%/0) vbox(pack) gap(12) opacity(.7) animate(bounce/2s/ease-in-out/infinite)">
      <div class="scroll-text font(12) c(#94a3b8) font-family(mono) uppercase tracking(.1em)">Scroll</div>
      <div class="scroll-arrow vbox gap(4)">
        <div class="w(2) h(20) r(1) bg(#94a3b8..#667eea)"></div>
        <div class="w(1) h(8) r() bg(#667eea)"></div>
      </div>
    </div>
  </section>

  <!-- Enhanced Features Grid with Animations -->
  <section class="features w(fill) p(100/40) bg(#0f0f0f)">
    <div class="container max-w(1400) mx(auto) vbox gap(80)">
      <div class="section-header vbox(pack) gap(24) text(center)">
        <div class="section-badge hbox(pack) p(6/16) r() bg(rgba(16,185,129,0.1)) b(1/rgba(16,185,129,0.2))">
          <span class="font(11) c(#10b981) font-family(mono) uppercase tracking(.1em)">Features</span>
        </div>
        <h2 class="font(56/1.2) bold c(white..#e0e7ff) text-shadow(0/2px/4px/rgba(0,0,0,0.3))">
          Figma-First Design Philosophy
        </h2>
        <p class="font(20/1.6) c(#64748b..#94a3b8) max-w(800)">
          Figma의 디자인 시스템을 코드로 완벽하게 재현하는 혁신적인 접근법으로<br>
          <span class="c(#667eea) italic">디자이너와 개발자 간의 완벽한 동기화</span>를 실현합니다
        </p>
      </div>
      
      <div class="features-grid grid-cols(3) gap(40)">
        <!-- Auto Layout Feature -->
        <div class="feature-card vbox gap(28) p(36) r(20) bg(linear/135deg/#1a1a1a/#2a2a2a) b(1/#334155.5) shadow(0/8px/32px/rgba(0,0,0,0.3)) transition hover:translate(0/-12) hover:shadow(0/16px/48px/rgba(102,126,234,0.2)) hover:b(1/#667eea.3)">
          <div class="feature-header hbox(between+center)">
            <div class="feature-icon w(72) h(72) r(18) bg(#667eea..#764ba2) vbox(pack) shadow(0/4px/16px/rgba(102,126,234,0.3)) text-shadow(0/2px/4px/rgba(0,0,0,0.3))">
              <div class="font(28) c(white)">📦</div>
            </div>
            <div class="feature-number font(48) c(#334155) font(Inter) bold">01</div>
          </div>
          <div class="vbox gap(16)">
            <h3 class="font(28/1.3) bold c(white..#e0e7ff)">Auto Layout</h3>
            <p class="font(15/1.6) c(#94a3b8..#cbd5e1)">
              Figma의 Auto Layout을 그대로 구현합니다. <code class="font-family(mono) c(#667eea)">hbox</code>, <code class="font-family(mono) c(#667eea)">vbox</code>, <code class="font-family(mono) c(#667eea)">gap</code>으로 직관적인 레이아웃을 구성하고, <code class="font-family(mono) c(#667eea)">pack</code> 단축어로 완벽한 중앙 정렬을 한 번에 처리합니다.
            </p>
          </div>
          <div class="code-sample p(20) r(12) bg(#0a0a0a.8) b(1/#334155.3) backdrop(blur/10)">
            <code class="font(13/1.5) c(#fbbf24) font-family(mono)">
              <span class="c(#667eea)">hbox</span><span class="c(#94a3b8)">(</span><span class="c(#10b981)">pack</span><span class="c(#94a3b8)">)</span> <span class="c(#667eea)">gap</span><span class="c(#94a3b8)">(</span><span class="c(#f59e0b)">16</span><span class="c(#94a3b8)">)</span><br>
              <span class="c(#667eea)">vbox</span><span class="c(#94a3b8)">(</span><span class="c(#10b981)">center+middle</span><span class="c(#94a3b8)">)</span>
            </code>
          </div>
        </div>

        <!-- Smart Sizing Feature -->
        <div class="feature-card vbox gap(28) p(36) r(20) bg(linear/135deg/#1a1a1a/#2a2a2a) b(1/#334155.5) shadow(0/8px/32px/rgba(0,0,0,0.3)) transition hover:translate(0/-12) hover:shadow(0/16px/48px/rgba(16,185,129,0.2)) hover:b(1/#10b981.3)">
          <div class="feature-header hbox(between+center)">
            <div class="feature-icon w(72) h(72) r(18) bg(#10b981..#059669) vbox(pack) shadow(0/4px/16px/rgba(16,185,129,0.3))">
              <div class="font(28) c(white)">🔧</div>
            </div>
            <div class="feature-number font(48) c(#334155) font(Inter) bold">02</div>
          </div>
          <div class="vbox gap(16)">
            <h3 class="font(28/1.3) bold c(white..#e0e7ff)">Smart Sizing</h3>
            <p class="font(15/1.6) c(#94a3b8..#cbd5e1)">
              <code class="font-family(mono) c(#10b981)">w(hug)</code>, <code class="font-family(mono) c(#10b981)">w(fill)</code>, <code class="font-family(mono) c(#10b981)">w(300..600)</code> 등 Figma 방식의 크기 제약 시스템을 완벽하게 지원합니다. 반응형 디자인도 Figma의 제약 조건처럼 직관적으로 설정할 수 있습니다.
            </p>
          </div>
          <div class="code-sample p(20) r(12) bg(#0a0a0a.8) b(1/#334155.3) backdrop(blur/10)">
            <code class="font(13/1.5) c(#fbbf24) font-family(mono)">
              <span class="c(#10b981)">w</span><span class="c(#94a3b8)">(</span><span class="c(#f59e0b)">fill</span><span class="c(#94a3b8)">)</span> <span class="c(#10b981)">h</span><span class="c(#94a3b8)">(</span><span class="c(#f59e0b)">hug</span><span class="c(#94a3b8)">)</span><br>
              <span class="c(#10b981)">w</span><span class="c(#94a3b8)">(</span><span class="c(#f59e0b)">300..600</span><span class="c(#94a3b8)">)</span>
            </code>
          </div>
        </div>

        <!-- Visual Effects Feature -->
        <div class="feature-card vbox gap(28) p(36) r(20) bg(linear/135deg/#1a1a1a/#2a2a2a) b(1/#334155.5) shadow(0/8px/32px/rgba(0,0,0,0.3)) transition hover:translate(0/-12) hover:shadow(0/16px/48px/rgba(245,158,11,0.2)) hover:b(1/#f59e0b.3)">
          <div class="feature-header hbox(between+center)">
            <div class="feature-icon w(72) h(72) r(18) bg(#f59e0b..#d97706) vbox(pack) shadow(0/4px/16px/rgba(245,158,11,0.3))">
              <div class="font(28) c(white)">✨</div>
            </div>
            <div class="feature-number font(48) c(#334155) font(Inter) bold">03</div>
          </div>
          <div class="vbox gap(16)">
            <h3 class="font(28/1.3) bold c(white..#e0e7ff)">Visual Effects</h3>
            <p class="font(15/1.6) c(#94a3b8..#cbd5e1)">
              그라디언트, 그림자, 블러, 텍스트 그라디언트 등 Figma Effects를 코드로 간단하게 구현합니다. <code class="font-family(mono) c(#f59e0b)">bg(#667eea..#764ba2)</code>로 아름다운 그라디언트를 한 줄로 만들 수 있습니다.
            </p>
          </div>
          <div class="code-sample p(20) r(12) bg(#0a0a0a.8) b(1/#334155.3) backdrop(blur/10)">
            <code class="font(13/1.5) c(#fbbf24) font-family(mono)">
              <span class="c(#f59e0b)">bg</span><span class="c(#94a3b8)">(</span><span class="c(#667eea)">#667eea..#764ba2</span><span class="c(#94a3b8)">)</span><br>
              <span class="c(#f59e0b)">shadow</span><span class="c(#94a3b8)">(</span><span class="c(#10b981)">lg</span><span class="c(#94a3b8)">)</span> <span class="c(#f59e0b)">backdrop</span><span class="c(#94a3b8)">(</span><span class="c(#10b981)">blur/10</span><span class="c(#94a3b8)">)</span>
            </code>
          </div>
        </div>

        <!-- Typography Feature -->
        <div class="feature-card vbox gap(28) p(36) r(20) bg(linear/135deg/#1a1a1a/#2a2a2a) b(1/#334155.5) shadow(0/8px/32px/rgba(0,0,0,0.3)) transition hover:translate(0/-12) hover:shadow(0/16px/48px/rgba(139,92,246,0.2)) hover:b(1/#8b5cf6.3)">
          <div class="feature-header hbox(between+center)">
            <div class="feature-icon w(72) h(72) r(18) bg(#8b5cf6..#7c3aed) vbox(pack) shadow(0/4px/16px/rgba(139,92,246,0.3))">
              <div class="font(28) c(white) font-family(serif)">Aa</div>
            </div>
            <div class="feature-number font(48) c(#334155) font(Inter) bold">04</div>
          </div>
          <div class="vbox gap(16)">
            <h3 class="font(28/1.3) bold c(white..#e0e7ff)">Typography</h3>
            <p class="font(15/1.6) c(#94a3b8..#cbd5e1)">
              <code class="font-family(mono) c(#8b5cf6)">font(Inter/16/24/-2%/500)</code> 한 줄로 모든 텍스트 속성을 정의할 수 있습니다. 폰트 패밀리, 크기, 행간, 자간, 굵기까지 Figma의 텍스트 패널과 완전히 동일한 방식으로 설정합니다.
            </p>
          </div>
          <div class="code-sample p(20) r(12) bg(#0a0a0a.8) b(1/#334155.3) backdrop(blur/10)">
            <code class="font(13/1.5) c(#fbbf24) font-family(mono)">
              <span class="c(#8b5cf6)">font</span><span class="c(#94a3b8)">(</span><span class="c(#10b981)">Inter/16/24/-2%/500</span><span class="c(#94a3b8)">)</span><br>
              <span class="c(#8b5cf6)">c</span><span class="c(#94a3b8)">(</span><span class="c(#667eea)">red..blue</span><span class="c(#94a3b8)">)</span> <span class="c(#64748b)">// 텍스트 그라디언트</span>
            </code>
          </div>
        </div>

        <!-- Responsive Feature -->
        <div class="feature-card vbox gap(28) p(36) r(20) bg(linear/135deg/#1a1a1a/#2a2a2a) b(1/#334155.5) shadow(0/8px/32px/rgba(0,0,0,0.3)) transition hover:translate(0/-12) hover:shadow(0/16px/48px/rgba(6,182,212,0.2)) hover:b(1/#06b6d4.3)">
          <div class="feature-header hbox(between+center)">
            <div class="feature-icon w(72) h(72) r(18) bg(#06b6d4..#0891b2) vbox(pack) shadow(0/4px/16px/rgba(6,182,212,0.3))">
              <div class="font(28) c(white)">📱</div>
            </div>
            <div class="feature-number font(48) c(#334155) font(Inter) bold">05</div>
          </div>
          <div class="vbox gap(16)">
            <h3 class="font(28/1.3) bold c(white..#e0e7ff)">Responsive Design</h3>
            <p class="font(15/1.6) c(#94a3b8..#cbd5e1)">
              <code class="font-family(mono) c(#06b6d4)">sm:</code>, <code class="font-family(mono) c(#06b6d4)">md:</code>, <code class="font-family(mono) c(#06b6d4)">lg:</code> 접두사로 반응형 디자인을 쉽고 직관적으로 구현합니다. 모바일 퍼스트 접근법과 브레이크포인트 시스템이 완벽하게 통합되어 있습니다.
            </p>
          </div>
          <div class="code-sample p(20) r(12) bg(#0a0a0a.8) b(1/#334155.3) backdrop(blur/10)">
            <code class="font(13/1.5) c(#fbbf24) font-family(mono)">
              <span class="c(#06b6d4)">sm:</span><span class="c(#667eea)">vbox</span> <span class="c(#06b6d4)">md:</span><span class="c(#667eea)">hbox</span><br>
              <span class="c(#06b6d4)">lg:</span><span class="c(#667eea)">gap</span><span class="c(#94a3b8)">(</span><span class="c(#f59e0b)">32</span><span class="c(#94a3b8)">)</span>
            </code>
          </div>
        </div>

        <!-- Interactions Feature -->
        <div class="feature-card vbox gap(28) p(36) r(20) bg(linear/135deg/#1a1a1a/#2a2a2a) b(1/#334155.5) shadow(0/8px/32px/rgba(0,0,0,0.3)) transition hover:translate(0/-12) hover:shadow(0/16px/48px/rgba(236,72,153,0.2)) hover:b(1/#ec4899.3)">
          <div class="feature-header hbox(between+center)">
            <div class="feature-icon w(72) h(72) r(18) bg(#ec4899..#db2777) vbox(pack) shadow(0/4px/16px/rgba(236,72,153,0.3))">
              <div class="font(28) c(white)">🎯</div>
            </div>
            <div class="feature-number font(48) c(#334155) font(Inter) bold">06</div>
          </div>
          <div class="vbox gap(16)">
            <h3 class="font(28/1.3) bold c(white..#e0e7ff)">Interactions</h3>
            <p class="font(15/1.6) c(#94a3b8..#cbd5e1)">
              <code class="font-family(mono) c(#ec4899)">hover:</code>, <code class="font-family(mono) c(#ec4899)">active:</code>, <code class="font-family(mono) c(#ec4899)">focus:</code> 등으로 인터랙션 상태를 간단하게 정의할 수 있습니다. 트랜지션과 애니메이션도 직관적인 문법으로 손쉽게 구현할 수 있습니다.
            </p>
          </div>
          <div class="code-sample p(20) r(12) bg(#0a0a0a.8) b(1/#334155.3) backdrop(blur/10)">
            <code class="font(13/1.5) c(#fbbf24) font-family(mono)">
              <span class="c(#ec4899)">hover:</span><span class="c(#667eea)">scale</span><span class="c(#94a3b8)">(</span><span class="c(#f59e0b)">1.05</span><span class="c(#94a3b8)">)</span><br>
              <span class="c(#ec4899)">active:</span><span class="c(#667eea)">scale</span><span class="c(#94a3b8)">(</span><span class="c(#f59e0b)">0.98</span><span class="c(#94a3b8)">)</span>
            </code>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Enhanced Syntax Showcase -->
  <section class="syntax-showcase w(fill) p(100/40) bg(gradient/135deg/#050505/#0a0a0a)">
    <div class="container max-w(1400) mx(auto) vbox gap(80)">
      <div class="section-header vbox(pack) gap(24) text(center)">
        <div class="section-badge hbox(pack) p(6/16) r() bg(rgba(245,158,11,0.1)) b(1/rgba(245,158,11,0.2))">
          <span class="font(11) c(#f59e0b) font-family(mono) uppercase tracking(.1em)">Syntax</span>
        </div>
        <h2 class="font(56/1.2) bold c(white..#e0e7ff) text-shadow(0/2px/4px/rgba(0,0,0,0.3))">
          Beautiful & Intuitive Syntax
        </h2>
        <p class="font(20/1.6) c(#64748b..#94a3b8) max-w(800)">
          전통적인 CSS의 복잡함을 벗어나 <span class="c(#f59e0b) italic">직관적이고 아름다운 문법</span>으로<br>
          Figma 디자인을 코드로 완벽하게 표현할 수 있습니다
        </p>
      </div>
      
      <div class="syntax-examples grid-cols(2) gap(48)">
        <!-- Traditional CSS -->
        <div class="comparison-card vbox gap(32) p(40) r(20) bg(linear/135deg/#0a0a0a/#1a1a1a) b(1/#374151.3) shadow(0/8px/32px/rgba(0,0,0,0.4))">
          <div class="card-header vbox gap(12)">
            <div class="hbox(between+center)">
              <h3 class="font(28/1.3) bold c(#ef4444..#dc2626)">Traditional CSS</h3>
              <div class="status-badge p(4/12) r() bg(rgba(239,68,68,0.1)) b(1/rgba(239,68,68,0.2))">
                <span class="font(10) c(#ef4444) font-family(mono) uppercase">Verbose</span>
              </div>
            </div>
            <p class="font(14) c(#64748b)">복잡하고 장황한 기존 CSS 문법</p>
          </div>
          <div class="code-block p(28) r(16) bg(#0a0a0a.8) b(1/#374151.2) backdrop(blur/10)">
            <pre class="font(12/1.8) c(#94a3b8) font-family(mono)"><code><span class="c(#ef4444)">.card</span> <span class="c(#94a3b8)">&#123;</span>
  <span class="c(#10b981)">display</span><span class="c(#94a3b8)">:</span> <span class="c(#fbbf24)">flex</span><span class="c(#94a3b8)">;</span>
  <span class="c(#10b981)">flex-direction</span><span class="c(#94a3b8)">:</span> <span class="c(#fbbf24)">column</span><span class="c(#94a3b8)">;</span>
  <span class="c(#10b981)">justify-content</span><span class="c(#94a3b8)">:</span> <span class="c(#fbbf24)">center</span><span class="c(#94a3b8)">;</span>
  <span class="c(#10b981)">align-items</span><span class="c(#94a3b8)">:</span> <span class="c(#fbbf24)">center</span><span class="c(#94a3b8)">;</span>
  <span class="c(#10b981)">width</span><span class="c(#94a3b8)">:</span> <span class="c(#fbbf24)">100%</span><span class="c(#94a3b8)">;</span>
  <span class="c(#10b981)">padding</span><span class="c(#94a3b8)">:</span> <span class="c(#fbbf24)">32px</span><span class="c(#94a3b8)">;</span>
  <span class="c(#10b981)">border-radius</span><span class="c(#94a3b8)">:</span> <span class="c(#fbbf24)">16px</span><span class="c(#94a3b8)">;</span>
  <span class="c(#10b981)">background</span><span class="c(#94a3b8)">:</span> <span class="c(#fbbf24)">linear-gradient(135deg, #667eea, #764ba2)</span><span class="c(#94a3b8)">;</span>
  <span class="c(#10b981)">box-shadow</span><span class="c(#94a3b8)">:</span> <span class="c(#fbbf24)">0 10px 25px rgba(0,0,0,0.2)</span><span class="c(#94a3b8)">;</span>
  <span class="c(#10b981)">transition</span><span class="c(#94a3b8)">:</span> <span class="c(#fbbf24)">transform 0.2s ease</span><span class="c(#94a3b8)">;</span>
<span class="c(#94a3b8)">&#125;</span>
<span class="c(#ef4444)">.card:hover</span> <span class="c(#94a3b8)">&#123;</span>
  <span class="c(#10b981)">transform</span><span class="c(#94a3b8)">:</span> <span class="c(#fbbf24)">scale(1.05)</span><span class="c(#94a3b8)">;</span>
<span class="c(#94a3b8)">&#125;</span></code></pre>
          </div>
          <div class="stats hbox gap(16)">
            <div class="stat-item vbox gap(4)">
              <span class="font(20) bold c(#ef4444)">13</span>
              <span class="font(11) c(#64748b) uppercase">Lines</span>
            </div>
            <div class="stat-item vbox gap(4)">
              <span class="font(20) bold c(#ef4444)">312</span>
              <span class="font(11) c(#64748b) uppercase">Characters</span>
            </div>
          </div>
        </div>

        <!-- AdorableCSS v2 -->
        <div class="comparison-card vbox gap(32) p(40) r(20) bg(linear/135deg/#0a0a0a/#1a1a1a) b(1/#10b981.3) shadow(0/8px/32px/rgba(16,185,129,0.2))">
          <div class="card-header vbox gap(12)">
            <div class="hbox(between+center)">
              <h3 class="font(28/1.3) bold c(#22c55e..#16a34a)">AdorableCSS v2</h3>
              <div class="status-badge p(4/12) r() bg(rgba(34,197,94,0.1)) b(1/rgba(34,197,94,0.2))">
                <span class="font(10) c(#22c55e) font-family(mono) uppercase">Elegant</span>
              </div>
            </div>
            <p class="font(14) c(#64748b)">간결하고 직관적인 Figma 스타일 문법</p>
          </div>
          <div class="code-block p(28) r(16) bg(#0a0a0a.8) b(1/#10b981.2) backdrop(blur/10)">
            <pre class="font(13/2) c(#22c55e) font-family(mono)"><code><span class="c(#10b981)">vbox</span><span class="c(#94a3b8)">(</span><span class="c(#fbbf24)">pack</span><span class="c(#94a3b8)">)</span> 
<span class="c(#10b981)">w</span><span class="c(#94a3b8)">(</span><span class="c(#fbbf24)">fill</span><span class="c(#94a3b8)">)</span> 
<span class="c(#10b981)">p</span><span class="c(#94a3b8)">(</span><span class="c(#fbbf24)">32</span><span class="c(#94a3b8)">)</span> 
<span class="c(#10b981)">r</span><span class="c(#94a3b8)">(</span><span class="c(#fbbf24)">16</span><span class="c(#94a3b8)">)</span> 
<span class="c(#10b981)">bg</span><span class="c(#94a3b8)">(</span><span class="c(#667eea)">#667eea..#764ba2</span><span class="c(#94a3b8)">)</span> 
<span class="c(#10b981)">shadow</span><span class="c(#94a3b8)">(</span><span class="c(#fbbf24)">lg</span><span class="c(#94a3b8)">)</span> 
<span class="c(#10b981)">transition</span> 
<span class="c(#ec4899)">hover:</span><span class="c(#10b981)">scale</span><span class="c(#94a3b8)">(</span><span class="c(#fbbf24)">1.05</span><span class="c(#94a3b8)">)</span></code></pre>
          </div>
          <div class="stats hbox gap(16)">
            <div class="stat-item vbox gap(4)">
              <span class="font(20) bold c(#22c55e)">8</span>
              <span class="font(11) c(#64748b) uppercase">Lines</span>
            </div>
            <div class="stat-item vbox gap(4)">
              <span class="font(20) bold c(#22c55e)">89</span>
              <span class="c(#64748b) uppercase">Characters</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Syntax Benefits -->
      <div class="benefits-grid grid-cols(4) gap(24) pt(40)">
        <div class="benefit-item vbox(pack) gap(12) p(24) r(12) bg(rgba(16,185,129,0.05)) b(1/rgba(16,185,129,0.1))">
          <div class="font(24) c(#10b981)">⚡</div>
          <span class="font(14) bold c(#10b981)">71% 적은 코드</span>
        </div>
        <div class="benefit-item vbox(pack) gap(12) p(24) r(12) bg(rgba(102,126,234,0.05)) b(1/rgba(102,126,234,0.1))">
          <div class="font(24) c(#667eea)">🎨</div>
          <span class="font(14) bold c(#667eea)">Figma 호환</span>
        </div>
        <div class="benefit-item vbox(pack) gap(12) p(24) r(12) bg(rgba(245,158,11,0.05)) b(1/rgba(245,158,11,0.1))">
          <div class="font(24) c(#f59e0b)">🚀</div>
          <span class="font(14) bold c(#f59e0b)">빠른 개발</span>
        </div>
        <div class="benefit-item vbox(pack) gap(12) p(24) r(12) bg(rgba(139,92,246,0.05)) b(1/rgba(139,92,246,0.1))">
          <div class="font(24) c(#8b5cf6)">💡</div>
          <span class="font(14) bold c(#8b5cf6)">직관적</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Spectacular Live Examples -->
  <section class="live-examples w(fill) p(100/40) bg(#0a0a0a)">
    <div class="container max-w(1400) mx(auto) vbox gap(80)">
      <div class="section-header vbox(pack) gap(24) text(center)">
        <div class="section-badge hbox(pack) p(6/16) r() bg(rgba(236,72,153,0.1)) b(1/rgba(236,72,153,0.2))">
          <span class="font(11) c(#ec4899) font-family(mono) uppercase tracking(.1em)">Examples</span>
        </div>
        <h2 class="font(56/1.2) bold c(white..#e0e7ff) text-shadow(0/2px/4px/rgba(0,0,0,0.3))">
          Live Interactive Examples
        </h2>
        <p class="font(20/1.6) c(#64748b..#94a3b8) max-w(800)">
          실제로 AdorableCSS v2로 만든 <span class="c(#ec4899) italic">인터랙티브 컴포넌트들</span>을 직접 체험해보세요
        </p>
      </div>
      
      <div class="examples-grid grid-cols(3) gap(40)">
        <!-- Enhanced Card Example -->
        <div class="example-container vbox gap(24)">
          <div class="example-header hbox(between+center)">
            <h4 class="font(18) bold c(#94a3b8)">Card Component</h4>
            <div class="example-badge p(4/8) r() bg(rgba(102,126,234,0.1)) font(10) c(#667eea) font-family(mono) uppercase">Interactive</div>
          </div>
          <div class="card-example vbox gap(20) p(28) r(16) bg(linear/135deg/#1a1a1a/#2a2a2a) b(1/#334155.3) shadow(0/8px/24px/rgba(0,0,0,0.3)) transition hover:translate(0/-8) hover:shadow(0/16px/40px/rgba(102,126,234,0.2)) hover:b(1/#667eea.5)">
            <div class="card-image w(fill) h(140) r(12) bg(gradient/135deg/#667eea/#764ba2) relative clip">
              <div class="image-overlay absolute w(fill) h(fill) bg(rgba(0,0,0,0.2)) vbox(pack) opacity(0) transition hover:opacity(1)">
                <div class="font(24) c(white)">🎨</div>
              </div>
            </div>
            <div class="card-content vbox gap(12)">
              <h5 class="font(20/1.3) bold c(white..#e0e7ff)">Beautiful Design</h5>
              <p class="font(14/1.6) c(#94a3b8..#cbd5e1)">Crafted with AdorableCSS v2's intuitive syntax and Figma-first approach</p>
            </div>
            <div class="card-actions hbox gap(12)">
              <button class="flex p(10) r(8) bg(#667eea..#764ba2) c(white) font(13) bold transition hover:scale(1.02) active:scale(0.98) shadow(0/4px/12px/rgba(102,126,234,0.3))">
                Primary
              </button>
              <button class="p(10/16) r(8) b(1/#667eea) c(#667eea) bg(transparent) font(13) transition hover:bg(#667eea) hover:c(white)">
                Secondary
              </button>
            </div>
          </div>
        </div>

        <!-- Enhanced Button Showcase -->
        <div class="example-container vbox gap(24)">
          <div class="example-header hbox(between+center)">
            <h4 class="font(18) bold c(#94a3b8)">Button Variants</h4>
            <div class="example-badge p(4/8) r() bg(rgba(16,185,129,0.1)) font(10) c(#10b981) font-family(mono) uppercase">Hover</div>
          </div>
          <div class="button-showcase vbox gap(20) p(28) r(16) bg(linear/135deg/#1a1a1a/#2a2a2a) b(1/#334155.3)">
            <button class="w(fill) p(14) r(10) bg(#667eea..#764ba2) c(white) font(14) bold transition hover:scale(1.03) hover:shadow(0/8px/20px/rgba(102,126,234,0.4)) active:scale(0.97) text-shadow(0/1px/2px/rgba(0,0,0,0.2))">
              Gradient Primary
            </button>
            <button class="w(fill) p(14) r(10) b(1/#10b981) c(#10b981) bg(transparent) font(14) bold transition hover:bg(#10b981) hover:c(white) hover:shadow(0/4px/16px/rgba(16,185,129,0.3))">
              Success Outline
            </button>
            <button class="w(fill) p(14) r(10) bg(linear/135deg/#ef4444/#dc2626) c(white) font(14) bold transition hover:scale(1.02) hover:shadow(0/6px/18px/rgba(239,68,68,0.4)) active:scale(0.98)">
              Danger Gradient
            </button>
            <button class="w(fill) p(14) r(10) bg(rgba(245,158,11,0.1)) backdrop(blur/10) b(1/#f59e0b.3) c(#f59e0b) font(14) bold transition hover:bg(rgba(245,158,11,0.2)) hover:b(1/#f59e0b)">
              Glass Morphism
            </button>
          </div>
        </div>

        <!-- Enhanced Layout Demo -->
        <div class="example-container vbox gap(24)">
          <div class="example-header hbox(between+center)">
            <h4 class="font(18) bold c(#94a3b8)">Auto Layout</h4>
            <div class="example-badge p(4/8) r() bg(rgba(245,158,11,0.1)) font(10) c(#f59e0b) font-family(mono) uppercase">Figma</div>
          </div>
          <div class="layout-demo vbox gap(20) p(28) r(16) bg(linear/135deg/#1a1a1a/#2a2a2a) b(1/#334155.3)">
            <!-- Header Layout -->
            <div class="demo-header hbox(between+center) gap(16) p(16) r(8) bg(rgba(102,126,234,0.1)) backdrop(blur/10) b(1/rgba(102,126,234,0.2))">
              <div class="hbox(center) gap(12)">
                <div class="w(36) h(36) r() bg(#667eea..#764ba2) vbox(pack)">
                  <div class="font(14) c(white)">📦</div>
                </div>
                <div class="vbox gap(2)">
                  <div class="w(80) h(8) r(4) bg(#94a3b8)"></div>
                  <div class="w(60) h(6) r(3) bg(#64748b)"></div>
                </div>
              </div>
              <div class="hbox gap(8)">
                <div class="w(24) h(24) r() bg(#10b981) transition hover:scale(1.1)"></div>
                <div class="w(24) h(24) r() bg(#f59e0b) transition hover:scale(1.1)"></div>
                <div class="w(24) h(24) r() bg(#ef4444) transition hover:scale(1.1)"></div>
              </div>
            </div>
            
            <!-- Content Grid -->
            <div class="demo-grid grid-cols(2) gap(12)">
              <div class="grid-item p(16) r(8) bg(rgba(16,185,129,0.1)) b(1/rgba(16,185,129,0.2)) transition hover:bg(rgba(16,185,129,0.15))">
                <div class="vbox gap(8)">
                  <div class="w(20) h(20) r() bg(#10b981)"></div>
                  <div class="w(fill) h(6) r(3) bg(#10b981.5)"></div>
                </div>
              </div>
              <div class="grid-item p(16) r(8) bg(rgba(245,158,11,0.1)) b(1/rgba(245,158,11,0.2)) transition hover:bg(rgba(245,158,11,0.15))">
                <div class="vbox gap(8)">
                  <div class="w(20) h(20) r() bg(#f59e0b)"></div>
                  <div class="w(fill) h(6) r(3) bg(#f59e0b.5)"></div>
                </div>
              </div>
            </div>
            
            <!-- Footer Actions -->
            <div class="demo-footer hbox(center) gap(12) pt(8)">
              <div class="action-item w(32) h(8) r(4) bg(#667eea) transition hover:bg(#5b6fd8)"></div>
              <div class="action-item w(24) h(8) r(4) bg(#8b5cf6) transition hover:bg(#7c3aed)"></div>
              <div class="action-item w(40) h(8) r(4) bg(#ec4899) transition hover:bg(#db2777)"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Advanced Examples Row -->
      <div class="advanced-examples grid-cols(2) gap(48) pt(40)">
        <!-- Form Example -->
        <div class="form-example vbox gap(28) p(32) r(20) bg(linear/135deg/#0f0f0f/#1a1a1a) b(1/#334155.3) shadow(0/8px/32px/rgba(0,0,0,0.3))">
          <div class="form-header vbox gap(12)">
            <h4 class="font(24/1.3) bold c(white..#e0e7ff)">Contact Form</h4>
            <p class="font(14) c(#64748b)">Beautiful form with AdorableCSS v2</p>
          </div>
          <div class="form-fields vbox gap(20)">
            <div class="field-group vbox gap(8)">
              <label class="font(12) c(#94a3b8) font-family(mono) uppercase tracking(.1em)">Name</label>
              <input class="w(fill) p(12) r(8) bg(rgba(255,255,255,0.05)) b(1/#334155) c(white) font(14) transition focus:b(1/#667eea) focus:bg(rgba(102,126,234,0.1))" placeholder="Your name">
            </div>
            <div class="field-group vbox gap(8)">
              <label class="font(12) c(#94a3b8) font-family(mono) uppercase tracking(.1em)">Email</label>
              <input class="w(fill) p(12) r(8) bg(rgba(255,255,255,0.05)) b(1/#334155) c(white) font(14) transition focus:b(1/#667eea) focus:bg(rgba(102,126,234,0.1))" placeholder="your@email.com">
            </div>
            <button class="w(fill) p(16) r(10) bg(#667eea..#764ba2) c(white) font(14) bold transition hover:scale(1.02) hover:shadow(0/8px/24px/rgba(102,126,234,0.4)) active:scale(0.98)">
              Send Message ✨
            </button>
          </div>
        </div>
        
        <!-- Dashboard Widget -->
        <div class="dashboard-widget vbox gap(28) p(32) r(20) bg(linear/135deg/#0f0f0f/#1a1a1a) b(1/#334155.3) shadow(0/8px/32px/rgba(0,0,0,0.3))">
          <div class="widget-header hbox(between+center)">
            <div class="vbox gap(4)">
              <h4 class="font(24/1.3) bold c(white..#e0e7ff)">Analytics</h4>
              <p class="font(12) c(#64748b) font-family(mono)">Real-time data</p>
            </div>
            <div class="status-indicator w(12) h(12) r() bg(#10b981) animate(pulse/2s/ease-in-out/infinite)"></div>
          </div>
          <div class="stats-grid grid-cols(2) gap(16)">
            <div class="stat-card p(16) r(12) bg(rgba(16,185,129,0.1)) b(1/rgba(16,185,129,0.2))">
              <div class="vbox gap(8)">
                <span class="font(24/1) bold c(#10b981)">2.4k</span>
                <span class="font(11) c(#64748b) uppercase tracking(.1em)">Users</span>
              </div>
            </div>
            <div class="stat-card p(16) r(12) bg(rgba(102,126,234,0.1)) b(1/rgba(102,126,234,0.2))">
              <div class="vbox gap(8)">
                <span class="font(24/1) bold c(#667eea)">98%</span>
                <span class="font(11) c(#64748b) uppercase tracking(.1em)">Uptime</span>
              </div>
            </div>
          </div>
          <div class="chart-area h(80) r(8) bg(rgba(0,0,0,0.2)) relative">
            <div class="chart-line absolute bottom(10) left(10) w(calc(100%-20px)) h(2) r(1) bg(#667eea..#764ba2)"></div>
            <div class="chart-dots absolute bottom(8) left(20) w(6) h(6) r() bg(#667eea)"></div>
            <div class="chart-dots absolute bottom(12) left(60) w(6) h(6) r() bg(#667eea)"></div>
            <div class="chart-dots absolute bottom(16) left(100) w(6) h(6) r() bg(#667eea)"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Enhanced Footer -->
  <footer class="footer w(fill) p(60/40) bg(gradient/135deg/#000/#0a0a0a) b(t/1/rgba(51,65,85,0.3))">
    <div class="container max-w(1400) mx(auto) vbox gap(48)">
      <!-- Footer Header -->
      <div class="footer-header vbox(pack) gap(20) text(center)">
        <div class="footer-logo hbox(pack) gap(12)">
          <div class="logo-icon w(48) h(48) r(12) bg(#667eea..#764ba2) vbox(pack) shadow(0/4px/16px/rgba(102,126,234,0.3))">
            <div class="font(20) c(white)">🎨</div>
          </div>
          <div class="vbox gap(4)">
            <h3 class="font(28/1.2) bold c(white..#e0e7ff)">AdorableCSS v2</h3>
            <p class="font(12) c(#64748b) font-family(mono) uppercase tracking(.1em)">Figma-first CSS Framework</p>
          </div>
        </div>
        <p class="font(16/1.6) c(#64748b..#94a3b8) max-w(600)">
          디자이너와 개발자를 위한 혁신적인 CSS 프레임워크로 
          <span class="c(#667eea) italic">완벽한 디자인-코드 동기화</span>를 경험하세요
        </p>
      </div>
      
      <!-- Footer Navigation -->
      <div class="footer-nav grid-cols(4) gap(32)">
        <div class="nav-section vbox gap(16)">
          <h4 class="font(14) bold c(#94a3b8) uppercase tracking(.1em)">Resources</h4>
          <div class="nav-links vbox gap(12)">
            <a href="#" class="font(14) c(#64748b) transition hover:c(#667eea)">Documentation</a>
            <a href="#" class="font(14) c(#64748b) transition hover:c(#667eea)">Getting Started</a>
            <a href="#" class="font(14) c(#64748b) transition hover:c(#667eea)">API Reference</a>
            <a href="#" class="font(14) c(#64748b) transition hover:c(#667eea)">Examples</a>
          </div>
        </div>
        <div class="nav-section vbox gap(16)">
          <h4 class="font(14) bold c(#94a3b8) uppercase tracking(.1em)">Community</h4>
          <div class="nav-links vbox gap(12)">
            <a href="#" class="font(14) c(#64748b) transition hover:c(#667eea)">GitHub</a>
            <a href="#" class="font(14) c(#64748b) transition hover:c(#667eea)">Discord</a>
            <a href="#" class="font(14) c(#64748b) transition hover:c(#667eea)">Twitter</a>
            <a href="#" class="font(14) c(#64748b) transition hover:c(#667eea)">Blog</a>
          </div>
        </div>
        <div class="nav-section vbox gap(16)">
          <h4 class="font(14) bold c(#94a3b8) uppercase tracking(.1em)">Tools</h4>
          <div class="nav-links vbox gap(12)">
            <a href="#" class="font(14) c(#64748b) transition hover:c(#667eea)">Figma Plugin</a>
            <a href="#" class="font(14) c(#64748b) transition hover:c(#667eea)">VS Code Extension</a>
            <a href="#" class="font(14) c(#64748b) transition hover:c(#667eea)">CLI Tool</a>
            <a href="#" class="font(14) c(#64748b) transition hover:c(#667eea)">Playground</a>
          </div>
        </div>
        <div class="nav-section vbox gap(16)">
          <h4 class="font(14) bold c(#94a3b8) uppercase tracking(.1em)">Company</h4>
          <div class="nav-links vbox gap(12)">
            <a href="#" class="font(14) c(#64748b) transition hover:c(#667eea)">About</a>
            <a href="#" class="font(14) c(#64748b) transition hover:c(#667eea)">Team</a>
            <a href="#" class="font(14) c(#64748b) transition hover:c(#667eea)">Contact</a>
            <a href="#" class="font(14) c(#64748b) transition hover:c(#667eea)">Careers</a>
          </div>
        </div>
      </div>
      
      <!-- Footer Bottom -->
      <div class="footer-bottom pt(32) b(t/1/rgba(51,65,85,0.2))">
        <div class="hbox(between+center) gap(24)">
          <div class="font(12) c(#4b5563)">
            © 2024 AdorableCSS. Made with <span class="c(#ec4899)">❤️</span> for designers and developers.
          </div>
          <div class="social-links hbox gap(16)">
            <a href="#" class="w(32) h(32) r(8) bg(rgba(102,126,234,0.1)) b(1/rgba(102,126,234,0.2)) vbox(pack) transition hover:bg(rgba(102,126,234,0.2)) hover:scale(1.1)">
              <span class="font(14) c(#667eea)">📧</span>
            </a>
            <a href="#" class="w(32) h(32) r(8) bg(rgba(16,185,129,0.1)) b(1/rgba(16,185,129,0.2)) vbox(pack) transition hover:bg(rgba(16,185,129,0.2)) hover:scale(1.1)">
              <span class="font(14) c(#10b981)">🐙</span>
            </a>
            <a href="#" class="w(32) h(32) r(8) bg(rgba(245,158,11,0.1)) b(1/rgba(245,158,11,0.2)) vbox(pack) transition hover:bg(rgba(245,158,11,0.2)) hover:scale(1.1)">
              <span class="font(14) c(#f59e0b)">🐦</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>

<style>
  .hero-bg-grid {
    background-image: 
      linear-gradient(rgba(102, 126, 234, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(102, 126, 234, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
  }
  
  .hero-bg-glow1 { top: 10%; left: 20%; }
  .hero-bg-glow2 { top: 60%; right: 15%; }
  .hero-bg-glow3 { bottom: 20%; left: 10%; }
  
  .particle-1 { top: 20%; left: 15%; }
  .particle-2 { top: 70%; right: 20%; }
  .particle-3 { bottom: 30%; right: 40%; }
  
  .max-w\(600\) { max-width: 600px; }
  .max-w\(700\) { max-width: 700px; }
  .max-w\(800\) { max-width: 800px; }
  .max-w\(1400\) { max-width: 1400px; }
  .mx\(auto\) { margin-left: auto; margin-right: auto; }
  .pt\(24\) { padding-top: 24px; }
  .pt\(32\) { padding-top: 32px; }
  .pt\(40\) { padding-top: 40px; }
  .bottom\(40\) { bottom: 40px; }
  .left\(50\%\) { left: 50%; }
  .translate\(-50\%\/0\) { transform: translateX(-50%); }
  .grid-cols\(3\) { 
    display: grid; 
    grid-template-columns: repeat(3, 1fr); 
  }
  .grid-cols\(2\) { 
    display: grid; 
    grid-template-columns: repeat(2, 1fr); 
  }
  .grid-cols\(4\) { 
    display: grid; 
    grid-template-columns: repeat(4, 1fr); 
  }
  .font-family\(mono\) { 
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace; 
  }
  .font-family\(serif\) { 
    font-family: Georgia, 'Times New Roman', Times, serif; 
  }
  .flex { flex: 1; }
  .b\(t\/1\/rgba\(51\,65\,85\,0\.3\)\) { border-top: 1px solid rgba(51,65,85,0.3); }
  .b\(t\/1\/rgba\(51\,65\,85\,0\.2\)\) { border-top: 1px solid rgba(51,65,85,0.2); }
  .tracking\(\.1em\) { letter-spacing: 0.1em; }
  .calc\(100\%-20px\) { width: calc(100% - 20px); }
  
  @media (max-width: 1024px) {
    .grid-cols\(4\) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 768px) {
    .grid-cols\(3\), .grid-cols\(2\), .grid-cols\(4\) {
      grid-template-columns: 1fr;
    }
    
    .hero h1 {
      font-size: 48px !important;
    }
    
    .hero .hero-subtitle {
      font-size: 18px !important;
    }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
  
  @keyframes fade {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
</style>