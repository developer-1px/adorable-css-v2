<script lang="ts">
  import { onMount } from 'svelte';
  import { 
    Sparkles,
    Rocket,
    BookOpen,
    Github,
    Check,
    ArrowDown,
    Lightbulb as Idea,
    CheckCircle,
    Target,
    Play,
    Copy,
    Zap,
    Palette,
    Code2,
    Layers,
    Download
  } from 'lucide-svelte';
  import Code from './components/Code.svelte';
  
  let heroVisible = false;
  let currentDemoIndex = 0;
  let isTyping = false;
  let typedCode = '';
  
  const demoExamples = [
    'vbox gap(lg) p(2xl)',
    'hbox items(center) gap(md)',
    'bg(primary..accent) r(xl)',
    'hover:scale(1.05) transition',
    'grid grid-cols(3) gap(xl)',
    'shadow(xl) backdrop-blur(sm)',
    'heading(h1) c(primary)'
  ];
  
  onMount(() => {
    heroVisible = true;
    startTypingDemo();
  });
  
  function startTypingDemo() {
    const example = demoExamples[currentDemoIndex];
    isTyping = true;
    typedCode = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < example.length) {
        typedCode += example[i];
        i++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          currentDemoIndex = (currentDemoIndex + 1) % demoExamples.length;
          setTimeout(startTypingDemo, 500);
        }, 2000);
      }
    }, 80);
  }
</script>

<div class="showcase-page vbox w(fill) min-h(screen) bg(--colors-white)">
  <!-- Hero Section -->
  <section class="hero relative w(fill) min-h(screen) vbox items(center) justify(center) bg(linear-gradient/135deg/--colors-white/--colors-gray-50) overflow(hidden)">
    <!-- Animated Background Elements -->
    <div class="layer opacity(3)">
      <div class="floating-shapes">
        {#each Array(50) as _, i}
          <div class="shape shape-{i % 5}" style="animation-delay: {i * 0.2}s"></div>
        {/each}
      </div>
    </div>
    
    <!-- Dynamic Grid Pattern -->
    <div class="layer opacity(8)">
      <div class="animated-grid">
        {#each Array(100) as _, i}
          <div class="grid-dot" style="animation-delay: {i * 0.1}s"></div>
        {/each}
      </div>
    </div>
    
    <!-- Multiple Floating Orbs with Animation -->
    <div class="absolute top(5%) left(10%) w(6xl) h(6xl) bg(--colors-primary) bg-opacity(15) r(full) blur(4xl) floating-orb-1"></div>
    <div class="absolute top(20%) right(15%) w(4xl) h(4xl) bg(--colors-accent) bg-opacity(12) r(full) blur(3xl) floating-orb-2"></div>
    <div class="absolute bottom(15%) left(25%) w(5xl) h(5xl) bg(--colors-success) bg-opacity(10) r(full) blur(3xl) floating-orb-3"></div>
    <div class="absolute bottom(5%) right(5%) w(7xl) h(7xl) bg(--colors-warning) bg-opacity(8) r(full) blur(4xl) floating-orb-4"></div>
    
    <!-- Particle System -->
    <div class="particles layer">
      {#each Array(30) as _, i}
        <div class="particle particle-{i % 3}" style="left: {Math.random() * 100}%; animation-delay: {i * 0.3}s"></div>
      {/each}
    </div>
    
    <!-- Main Content -->
    <div class="relative z(10) container max-w(1280px) mx(auto) px(xl) text(center)">
      <!-- Enhanced Badge with Animation -->
      <div class="inline-flex items(center) gap(xs) px(lg) py(sm) r(full) bg(--colors-primary) bg-opacity(10) b(--colors-primary) border-opacity(20) mb(xl) animated-badge">
        <Sparkles size="16" class="c(--colors-primary) sparkle-icon" />
        <span class="font(sm) medium c(--colors-primary)">v2.0 Beta • Live Demo Available</span>
        <div class="pulse-dot"></div>
      </div>
      
      <!-- Enhanced Main Heading with Typing Effect -->
      <h1 class="heading(h1) c(--colors-gray-900) mb(lg) hero-title">
        From <span class="highlight-word">Figma</span> to <span class="highlight-word">CSS</span>,<br>
        <span class="bg(linear-gradient/135deg/--colors-primary/--colors-accent) gradient-text">Perfectly in Sync</span>
      </h1>
      
      <p class="font(xl/1.6) c(--colors-gray-600) max-w(768px) mx(auto) mb(lg) hero-subtitle">
        The first CSS framework that speaks Figma's language. Design tokens, Auto Layout, 
        and visual effects that translate 1:1 from design to code.
      </p>
      
      <!-- Live Typing Demo -->
      <div class="live-typing-demo perspective(1000) mb(2xl)">
        <div class="demo-window">
          <div class="demo-header">
            <div class="demo-dots">
              <div class="dot red"></div>
              <div class="dot yellow"></div>
              <div class="dot green"></div>
            </div>
            <span class="demo-title">AdorableCSS Live</span>
          </div>
          <div class="demo-content">
            <span class="prompt">$</span>
            <Code children={typedCode} />
            <span class="cursor {isTyping ? 'blink' : ''}">|</span>
          </div>
        </div>
      </div>
      
      <!-- Enhanced CTA Buttons -->
      <div class="hbox gap(lg) items(center) justify(center) mb(2xl) cta-group perspective(1000)">
        <button class="cta-primary hbox gap(sm) items(center) px(xl) py(lg) r(xl) bg(linear-gradient/135deg/--colors-primary/--colors-accent) c(white) font(lg) semibold shadow(xl) hover:shadow(2xl) hover:scale(1.05) transition relative overflow(hidden)">
          <Play size="20" class="play-icon" />
          <span>Try Live Demo</span>
          <div class="button-shine"></div>
        </button>
        <button class="cta-secondary hbox gap(sm) items(center) px(xl) py(lg) r(xl) bg(rgba(255,255,255,0.9)) backdrop-blur(sm) b(--colors-gray-200) c(--colors-gray-700) font(lg) semibold hover:bg(white) hover:shadow(lg) transition">
          <Github size="20" />
          <span>View on GitHub</span>
        </button>
        <button class="cta-docs hbox gap(sm) items(center) px(lg) py(md) r(lg) bg(--colors-success) bg-opacity(10) b(--colors-success) border-opacity(30) c(--colors-success) font(md) semibold hover:bg-opacity(20) transition">
          <BookOpen size="18" />
          <span>Documentation</span>
        </button>
      </div>
      
      <!-- Enhanced Stats with Animation -->
      <div class="stats-grid grid grid-cols(4) gap(2xl) pt(2xl) mt(2xl) bt(1) bc(--colors-gray-200) perspective(1000)">
        <div class="stat-card text(center) p(xl) r(xl) bg(rgba(255,255,255,0.8)) backdrop-blur(sm) hover:shadow(lg) transition">
          <div class="stat-icon mb(md)">
            <Sparkles size="32" class="c(--colors-primary)" />
          </div>
          <div class="font(3xl) bold c(--colors-primary) mb(sm) counter" data-target="99">0</div>
          <div class="font(sm) c(--colors-gray-600) medium">Figma Compatible</div>
          <div class="stat-bar"></div>
        </div>
        <div class="stat-card text(center) p(xl) r(xl) bg(rgba(255,255,255,0.8)) backdrop-blur(sm) hover:shadow(lg) transition">
          <div class="stat-icon mb(md)">
            <Download size="32" class="c(--colors-success)" />
          </div>
          <div class="font(3xl) bold c(--colors-success) mb(sm) counter" data-target="50000">0</div>
          <div class="font(sm) c(--colors-gray-600) medium">Downloads</div>
          <div class="stat-bar success"></div>
        </div>
        <div class="stat-card text(center) p(xl) r(xl) bg(rgba(255,255,255,0.8)) backdrop-blur(sm) hover:shadow(lg) transition">
          <div class="stat-icon mb(md)">
            <Github size="32" class="c(--colors-warning)" />
          </div>
          <div class="font(3xl) bold c(--colors-warning) mb(sm) counter" data-target="2100">0</div>
          <div class="font(sm) c(--colors-gray-600) medium">GitHub Stars</div>
          <div class="stat-bar warning"></div>
        </div>
        <div class="stat-card text(center) p(xl) r(xl) bg(rgba(255,255,255,0.8)) backdrop-blur(sm) hover:shadow(lg) transition">
          <div class="stat-icon mb(md)">
            <Zap size="32" class="c(--colors-accent)" />
          </div>
          <div class="font(3xl) bold c(--colors-accent) mb(sm) counter" data-target="95">0</div>
          <div class="font(sm) c(--colors-gray-600) medium">Performance Score</div>
          <div class="stat-bar accent"></div>
        </div>
      </div>
    </div>
    
    <!-- Scroll Indicator -->
    <div class="absolute bottom(xl) left(50%) scroll-indicator">
      <ArrowDown size="24" class="c(--colors-gray-400)" />
    </div>
  </section>

  <!-- Ecosystem Section -->
  <section class="ecosystem w(fill) py(5xl) bg(linear-gradient/180deg/--colors-gray-50/--colors-white)">
    <div class="container max-w(1280px) mx(auto) px(xl)">
      <!-- Section Header -->
      <div class="text(center) mb(3xl)">
        <div class="inline-flex items(center) gap(xs) px(lg) py(sm) r(full) bg(--colors-accent) bg-opacity(10) b(--colors-accent) border-opacity(20) mb(lg)">
          <Layers size="16" class="c(--colors-accent)" />
          <span class="font(sm) medium c(--colors-accent)">Complete Ecosystem</span>
        </div>
        <h2 class="heading(h1) c(--colors-gray-900) mb(lg)">
          Everything You Need to Ship Faster
        </h2>
        <p class="font(xl/1.6) c(--colors-gray-600) max-w(768px) mx(auto)">
          From design tokens to deployment, AdorableCSS provides a complete toolkit for modern web development.
        </p>
      </div>

      <!-- Ecosystem Grid -->
      <div class="grid grid-cols(3) gap(2xl) mb(3xl)">
        <!-- Figma Plugin -->
        <div class="ecosystem-card p(2xl) bg(white) r(2xl) shadow(lg) hover:shadow(2xl) hover:scale(1.02) transition">
          <div class="card-icon mb(xl)">
            <div class="w(4xl) h(4xl) bg(--colors-accent) bg-opacity(10) r(xl) vbox items(center) justify(center)">
              <span class="font(2xl)">🎨</span>
            </div>
          </div>
          <h3 class="heading(h3) c(--colors-gray-900) mb(md)">Figma Plugin</h3>
          <p class="font(md/1.6) c(--colors-gray-600) mb(lg)">
            Generate production-ready code directly from your Figma designs. Perfect Auto Layout translation.
          </p>
          <div class="code-example p(md) bg(--colors-gray-50) r(lg) mb(lg)">
            <Code children="vbox gap(lg) p(xl)" />
          </div>
          <button class="w(fill) hbox items(center) justify(center) gap(sm) p(md) r(lg) bg(--colors-accent) c(white) font(sm) semibold hover:bg-opacity(90) transition">
            <Download size="16" />
            Install Plugin
          </button>
        </div>

        <!-- Design Tokens -->
        <div class="ecosystem-card p(2xl) bg(white) r(2xl) shadow(lg) hover:shadow(2xl) hover:scale(1.02) transition">
          <div class="card-icon mb(xl)">
            <div class="w(4xl) h(4xl) bg(--colors-warning) bg-opacity(10) r(xl) vbox items(center) justify(center)">
              <Palette size="24" class="c(--colors-warning)" />
            </div>
          </div>
          <h3 class="heading(h3) c(--colors-gray-900) mb(md)">Design Tokens</h3>
          <p class="font(md/1.6) c(--colors-gray-600) mb(lg)">
            Comprehensive token system for colors, typography, spacing, and more. Sync with your design system.
          </p>
          <div class="code-example p(md) bg(--colors-gray-50) r(lg) mb(lg)">
            <Code children="c(--colors-primary-500)" />
          </div>
          <button class="w(fill) hbox items(center) justify(center) gap(sm) p(md) r(lg) bg(--colors-warning) c(white) font(sm) semibold hover:bg-opacity(90) transition">
            <BookOpen size="16" />
            View Tokens
          </button>
        </div>

        <!-- CLI Tools -->
        <div class="ecosystem-card p(2xl) bg(white) r(2xl) shadow(lg) hover:shadow(2xl) hover:scale(1.02) transition">
          <div class="card-icon mb(xl)">
            <div class="w(4xl) h(4xl) bg(--colors-success) bg-opacity(10) r(xl) vbox items(center) justify(center)">
              <span class="font(xl) c(--colors-success)">⚡</span>
            </div>
          </div>
          <h3 class="heading(h3) c(--colors-gray-900) mb(md)">CLI & Build Tools</h3>
          <p class="font(md/1.6) c(--colors-gray-600) mb(lg)">
            Powerful CLI for optimizing CSS, generating tokens, and integrating with any build system.
          </p>
          <div class="code-example p(md) bg(--colors-gray-50) r(lg) mb(lg)">
            <Code children="npx adorable-css build" language="javascript" />
          </div>
          <button class="w(fill) hbox items(center) justify(center) gap(sm) p(md) r(lg) bg(--colors-success) c(white) font(sm) semibold hover:bg-opacity(90) transition">
            <Github size="16" />
            Get Started
          </button>
        </div>
      </div>

      <!-- Framework Integrations -->
      <div class="integrations">
        <h3 class="heading(h2) c(--colors-gray-900) text(center) mb(2xl)">Works with Every Framework</h3>
        <div class="grid grid-cols(6) gap(xl) items(center)">
          {#each ['React', 'Vue', 'Svelte', 'Angular', 'Nuxt', 'Next.js'] as framework}
            <div class="integration-logo p(lg) bg(white) r(lg) shadow(md) hover:shadow(lg) transition text(center)">
              <div class="font(sm) semibold c(--colors-gray-700)">{framework}</div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- Live Demo Section -->
  <section class="demo-section w(fill) py(5xl) bg(--colors-gray-900)">
    <div class="container max-w(1280px) mx(auto) px(xl)">
      <!-- Section Header -->
      <div class="text(center) mb(3xl)">
        <div class="inline-flex items(center) gap(xs) px(lg) py(sm) r(full) bg(--colors-accent) bg-opacity(10) b(--colors-accent) border-opacity(20) mb(lg)">
          <Code2 size="16" class="c(--colors-accent)" />
          <span class="font(sm) medium c(--colors-accent)">Interactive Demo</span>
        </div>
        <h2 class="heading(h1) c(white) mb(lg)">
          See the Magic in Action
        </h2>
        <p class="font(xl/1.6) c(--colors-gray-400) max-w(768px) mx(auto)">
          Watch how Figma designs transform into production-ready CSS with zero configuration.
        </p>
      </div>

      <!-- Enhanced Demo Grid -->
      <div class="demo-container">
        <!-- Multi-tab Code Editor -->
        <div class="demo-editor">
          <div class="editor-tabs hbox bg(--colors-gray-800) r(xl/xl/0/0)">
            <div class="tab active hbox gap(xs) items(center) px(lg) py(md) bg(--colors-gray-700) c(--colors-gray-200) font(sm) medium">
              <span>component.html</span>
            </div>
            <div class="tab hbox gap(xs) items(center) px(lg) py(md) c(--colors-gray-400) font(sm) hover:c(--colors-gray-200) transition">
              <span>styles.css</span>
            </div>
            <div class="tab hbox gap(xs) items(center) px(lg) py(md) c(--colors-gray-400) font(sm) hover:c(--colors-gray-200) transition">
              <span>output.css</span>
            </div>
          </div>
          <div class="editor-header hbox gap(sm) items(center) px(lg) py(md) bg(--colors-gray-800) b(--colors-gray-700)">
            <div class="window-controls hbox gap(xs)">
              <div class="w(sm) h(sm) r(full) bg(--colors-error)"></div>
              <div class="w(sm) h(sm) r(full) bg(--colors-warning)"></div>
              <div class="w(sm) h(sm) r(full) bg(--colors-success)"></div>
            </div>
            <span class="font(sm) medium c(--colors-gray-300) ml(md)">AdorableCSS Studio</span>
            <div class="ml(auto) hbox gap(sm)">
              <button class="hbox gap(xs) items(center) px(sm) py(xs) r(md) bg(--colors-gray-700) c(--colors-gray-300) font(xs) hover:bg(--colors-gray-600)">
                <Copy size="12" />
                Copy
              </button>
              <button class="hbox gap(xs) items(center) px(sm) py(xs) r(md) bg(--colors-primary) c(white) font(xs) hover:bg-opacity(90)">
                <Play size="12" />
                Run
              </button>
            </div>
          </div>
          <div class="editor-content p(xl) bg(--colors-gray-950) r(0/0/xl/xl) font(md) font-family(mono) min-h(300px) relative">
            <div class="line-numbers absolute left(0) top(xl) font(xs) c(--colors-gray-500) text(right) pr(md)">
              {#each Array(8) as _, i}
                <div class="line-number">{i + 1}</div>
              {/each}
            </div>
            <div class="code-content ml(2xl)">
              <Code 
                children={`<div class="
  vbox(center) gap(lg)
  w(fill) p(2xl)
  bg(rgba(255,255,255,0.9))
  backdrop-blur(md) r(xl)
  shadow(xl) hover:scale(1.02)
  transition transform-style(preserve-3d)
">
  <h2 class="layer(center)">Hello AdorableCSS!</h2>
  <p class="transform(rotate(3)+scale(0.95))">Perfect Figma sync</p>
</div>`}
                language="html"
                className="demo-code"
              />
            </div>
          </div>
        </div>

        <!-- Enhanced Live Preview -->
        <div class="demo-preview">
          <div class="preview-header hbox items(center) justify(between) p(lg) bg(--colors-gray-100) r(xl/xl/0/0) b(--colors-gray-200)">
            <span class="font(sm) medium c(--colors-gray-700)">Live Preview</span>
            <div class="preview-controls hbox gap(sm)">
              <button class="preview-btn active" data-device="desktop">💻</button>
              <button class="preview-btn" data-device="tablet">📱</button>
              <button class="preview-btn" data-device="mobile">📱</button>
            </div>
          </div>
          <div class="preview-content p(xl) bg(--colors-gray-50) r(0/0/xl/xl) min-h(300px) vbox justify(center) relative">
            <!-- Browser Chrome -->
            <div class="browser-chrome p(sm) bg(white) r(lg) shadow(md) w(fill)">
              <div class="chrome-header hbox items(center) gap(sm) p(sm) bg(--colors-gray-100) r(lg/lg/0/0) b(--colors-gray-200)">
                <div class="hbox gap(xs)">
                  <div class="w(xs) h(xs) r(full) bg(--colors-error)"></div>
                  <div class="w(xs) h(xs) r(full) bg(--colors-warning)"></div>
                  <div class="w(xs) h(xs) r(full) bg(--colors-success)"></div>
                </div>
                <div class="address-bar flex(1) mx(lg) px(sm) py(xs) bg(rgba(255,255,255,0.8)) backdrop-blur(md) r(sm) font(xs) c(--colors-gray-500)">
                  localhost:3000
                </div>
              </div>
              <div class="chrome-content p(lg)">
                <!-- Actual Result -->
                <div class="vbox gap(lg) w(fill) p(2xl) bg(rgba(255,255,255,0.9)) backdrop-blur(md) r(xl) shadow(xl) hover:scale(1.02) transition cursor(pointer) result-preview transform-style(preserve-3d)">
                  <h2 class="heading(h2) c(--colors-gray-900) relative">Hello AdorableCSS!</h2>
                  <p class="font(lg) c(--colors-gray-600) transform(rotate(3)+scale(0.95))">Perfect Figma sync</p>
                  <div class="hbox gap(md) mt(lg) perspective(500)">
                    <div class="w(2xl) h(2xl) bg(--colors-primary) bg-opacity(20) r(lg) hover:transform(rotateY(45))"></div>
                    <div class="w(2xl) h(2xl) bg(--colors-success) bg-opacity(20) r(lg) hover:transform(rotateX(45))"></div>
                    <div class="w(2xl) h(2xl) bg(--colors-warning) bg-opacity(20) r(lg) hover:transform(rotateZ(45))"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="features w(fill) py(5xl) bg(--colors-white)">
    <div class="container max-w(1280px) mx(auto) px(xl)">
      <!-- Section Header -->
      <div class="text(center) mb(3xl)">
        <div class="inline-flex items(center) gap(xs) px(lg) py(sm) r(full) bg(--colors-success) bg-opacity(10) b(--colors-success) border-opacity(20) mb(lg)">
          <Layers size="16" class="c(--colors-success)" />
          <span class="font(sm) medium c(--colors-success)">Features</span>
        </div>
        <h2 class="heading(h1) c(--colors-gray-900) mb(lg)">
          Everything You Need
        </h2>
        <p class="font(xl/1.6) c(--colors-gray-600) max-w(768px) mx(auto)">
          A complete toolkit that bridges the gap between design and development.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols(3) gap(2xl)">
        <!-- Auto Layout -->
        <div class="feature-card p(2xl) bg(--colors-gray-50) r(2xl) hover:shadow(xl) transition">
          <div class="w(4xl) h(4xl) bg(--colors-primary) bg-opacity(10) r(xl) vbox items(center) justify(center) mb(xl)">
            <Layers size="24" class="c(--colors-primary)" />
          </div>
          <h3 class="heading(h3) c(--colors-gray-900) mb(md)">Auto Layout</h3>
          <p class="font(md/1.6) c(--colors-gray-600) mb(lg)">
            Perfect 1:1 mapping with Figma's Auto Layout. Use <Code children="hbox" inline />, <Code children="vbox" inline />, and <Code children="gap" inline /> exactly like in Figma.
          </p>
          <div class="p(lg) bg(white) r(lg) b(--colors-gray-200)">
            <Code children="vbox gap(lg)" />
          </div>
        </div>

        <!-- Smart Sizing -->
        <div class="feature-card p(2xl) bg(--colors-gray-50) r(2xl) hover:shadow(xl) transition">
          <div class="w(4xl) h(4xl) bg(--colors-success) bg-opacity(10) r(xl) vbox items(center) justify(center) mb(xl)">
            <Target size="24" class="c(--colors-success)" />
          </div>
          <h3 class="heading(h3) c(--colors-gray-900) mb(md)">Smart Sizing</h3>
          <p class="font(md/1.6) c(--colors-gray-600) mb(lg)">
            Figma's sizing constraints in CSS. <Code children="w(fill)" inline />, <Code children="w(hug)" inline />, and even ranges like <Code children="w(300..600)" inline />.
          </p>
          <div class="p(lg) bg(white) r(lg) b(--colors-gray-200)">
            <Code children="w(fill) h(hug)" />
          </div>
        </div>

        <!-- Visual Effects -->
        <div class="feature-card p(2xl) bg(--colors-gray-50) r(2xl) hover:shadow(xl) transition">
          <div class="w(4xl) h(4xl) bg(--colors-warning) bg-opacity(10) r(xl) vbox items(center) justify(center) mb(xl)">
            <Palette size="24" class="c(--colors-warning)" />
          </div>
          <h3 class="heading(h3) c(--colors-gray-900) mb(md)">Visual Effects</h3>
          <p class="font(md/1.6) c(--colors-gray-600) mb(lg)">
            Gradients, shadows, and effects with intuitive syntax. Create beautiful visuals with <Code children="bg(#667eea..#764ba2)" inline />.
          </p>
          <div class="p(lg) bg(white) r(lg) b(--colors-gray-200)">
            <Code children="bg(primary..accent) backdrop-blur(lg)" />
          </div>
        </div>

        <!-- Typography -->
        <div class="feature-card p(2xl) bg(--colors-gray-50) r(2xl) hover:shadow(xl) transition">
          <div class="w(4xl) h(4xl) bg(--colors-accent) bg-opacity(10) r(xl) vbox items(center) justify(center) mb(xl)">
            <span class="font(2xl) semibold c(--colors-accent)">Aa</span>
          </div>
          <h3 class="heading(h3) c(--colors-gray-900) mb(md)">Typography</h3>
          <p class="font(md/1.6) c(--colors-gray-600) mb(lg)">
            All typography properties in one utility. <Code children="heading(h1)" inline /> applies perfect spacing and hierarchy.
          </p>
          <div class="p(lg) bg(white) r(lg) b(--colors-gray-200)">
            <Code children="heading(h1)" />
          </div>
        </div>

        <!-- Transforms & Animations -->
        <div class="feature-card p(2xl) bg(--colors-gray-50) r(2xl) hover:shadow(xl) transition">
          <div class="w(4xl) h(4xl) bg(--colors-info) bg-opacity(10) r(xl) vbox items(center) justify(center) mb(xl)">
            <span class="font(2xl) c(--colors-info)">✨</span>
          </div>
          <h3 class="heading(h3) c(--colors-gray-900) mb(md)">Transforms & Animations</h3>
          <p class="font(md/1.6) c(--colors-gray-600) mb(lg)">
            Powerful transforms and smooth animations. Create engaging micro-interactions with <Code children="hover:scale(1.05)" inline /> and <Code children="transition" inline />.
          </p>
          <div class="p(lg) bg(white) r(lg) b(--colors-gray-200)">
            <Code children="transform(rotate(45)+scale(1.2))" />
          </div>
        </div>

        <!-- Interactions -->
        <div class="feature-card p(2xl) bg(--colors-gray-50) r(2xl) hover:shadow(xl) transition">
          <div class="w(4xl) h(4xl) bg(--colors-error) bg-opacity(10) r(xl) vbox items(center) justify(center) mb(xl)">
            <Zap size="24" class="c(--colors-error)" />
          </div>
          <h3 class="heading(h3) c(--colors-gray-900) mb(md)">Interactions</h3>
          <p class="font(md/1.6) c(--colors-gray-600) mb(lg)">
            Smooth hover, focus, and active states. <Code children="hover:scale(1.05)" inline /> makes elements feel alive.
          </p>
          <div class="p(lg) bg(white) r(lg) b(--colors-gray-200)">
            <Code children="hover:scale(1.02)" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Community & Testimonials Section -->
  <section class="community w(fill) py(5xl) bg(linear-gradient/135deg/--colors-primary/--colors-accent) relative overflow(hidden)">
    <!-- Background Pattern -->
    <div class="layer opacity(10)">
      <div class="community-pattern"></div>
    </div>
    
    <div class="container max-w(1280px) mx(auto) px(xl) relative z(10)">
      <!-- Section Header -->
      <div class="text(center) mb(3xl)">
        <div class="inline-flex items(center) gap(xs) px(lg) py(sm) r(full) bg(rgba(255,255,255,0.2)) backdrop-blur(sm) b(rgba(255,255,255,0.3)) mb(lg)">
          <span class="font(2xl)">💬</span>
          <span class="font(sm) medium c(white)">Community Love</span>
        </div>
        <h2 class="heading(h1) c(white) mb(lg)">
          Loved by Developers & Designers
        </h2>
        <p class="font(xl/1.6) c(rgba(255,255,255,0.9)) max-w(768px) mx(auto)">
          Join thousands of creators who are shipping faster with AdorableCSS.
        </p>
      </div>

      <!-- Testimonials Grid -->
      <div class="testimonials-grid grid grid-cols(3) gap(xl) mb(3xl)">
        {#each [
          {
            name: "Sarah Chen",
            role: "Frontend Lead at Stripe",
            avatar: "👩‍💻",
            text: "AdorableCSS cut our design-to-code time by 70%. The Figma integration is pure magic!",
            rating: 5
          },
          {
            name: "Marcus Rodriguez",
            role: "Design System Lead",
            avatar: "👨‍🎨",
            text: "Finally, a CSS framework that thinks like designers. Our entire team adopted it in a week.",
            rating: 5
          },
          {
            name: "Elena Popov",
            role: "Product Designer",
            avatar: "👩‍🎨",
            text: "The seamless Figma sync means our designs always match the final product. Game changer!",
            rating: 5
          }
        ] as testimonial}
          <div class="testimonial-card p(2xl) bg(rgba(255,255,255,0.95)) backdrop-blur(sm) r(xl) hover:scale(1.02) transition">
            <div class="stars mb(lg)">
              {#each Array(testimonial.rating) as _}
                <span class="star">⭐</span>
              {/each}
            </div>
            <p class="font(lg/1.6) c(--colors-gray-800) mb(xl) italic">
              "{testimonial.text}"
            </p>
            <div class="author hbox items(center) gap(md)">
              <div class="avatar w(3xl) h(3xl) r(full) bg(--colors-gray-100) vbox items(center) justify(center) font(xl)">
                {testimonial.avatar}
              </div>
              <div>
                <div class="font(md) semibold c(--colors-gray-900)">{testimonial.name}</div>
                <div class="font(sm) c(--colors-gray-600)">{testimonial.role}</div>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <!-- Community Stats -->
      <div class="community-stats grid grid-cols(4) gap(xl)">
        {#each [
          { icon: "👥", number: "15k+", label: "Discord Members" },
          { icon: "💡", number: "500+", label: "Feature Requests" },
          { icon: "🚀", number: "2M+", label: "Components Built" },
          { icon: "🌍", number: "50+", label: "Countries" }
        ] as stat}
          <div class="stat-item text(center) p(xl) bg(rgba(255,255,255,0.1)) backdrop-blur(sm) r(xl) hover:bg(rgba(255,255,255,0.15)) transition">
            <div class="stat-icon font(3xl) mb(md)">{stat.icon}</div>
            <div class="stat-number font(2xl) bold c(white) mb(sm)">{stat.number}</div>
            <div class="stat-label font(sm) c(rgba(255,255,255,0.8))">{stat.label}</div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Advanced Features Showcase -->
  <section class="advanced-features w(fill) py(5xl) bg(--colors-white)">
    <div class="container max-w(1280px) mx(auto) px(xl)">
      <!-- Section Header -->
      <div class="text(center) mb(3xl)">
        <div class="inline-flex items(center) gap(xs) px(lg) py(sm) r(full) bg(--colors-error) bg-opacity(10) b(--colors-error) border-opacity(20) mb(lg)">
          <Zap size="16" class="c(--colors-error)" />
          <span class="font(sm) medium c(--colors-error)">Advanced Features</span>
        </div>
        <h2 class="heading(h1) c(--colors-gray-900) mb(lg)">
          Power Features for Pro Developers
        </h2>
        <p class="font(xl/1.6) c(--colors-gray-600) max-w(768px) mx(auto)">
          Advanced capabilities that make complex layouts simple and maintainable.
        </p>
      </div>

      <!-- Advanced Features Grid -->
      <div class="advanced-grid grid grid-cols(2) gap(3xl)">
        <!-- Advanced Layout System -->
        <div class="feature-showcase">
          <h3 class="heading(h2) c(--colors-gray-900) mb(lg)">Advanced Layout System</h3>
          <p class="font(lg/1.6) c(--colors-gray-600) mb(xl)">
            Powerful layout utilities with grid, flexbox, and constraint-based sizing for complex desktop interfaces.
          </p>
          <div class="showcase-demo p(2xl) bg(--colors-gray-50) r(xl) mb(xl)">
            <div class="layout-demo">
              <div class="layout-container">
                <Code children="grid grid-cols(12) gap(xl) layer(center)" />
              </div>
            </div>
          </div>
          <div class="feature-benefits vbox gap(md)">
            {#each ["12-column grid system", "Constraint-based sizing", "Layer positioning"] as benefit}
              <div class="benefit hbox items(center) gap(sm)">
                <CheckCircle size="16" class="c(--colors-success)" />
                <span class="font(md) c(--colors-gray-700)">{benefit}</span>
              </div>
            {/each}
          </div>
        </div>

        <!-- Design System Integration -->
        <div class="feature-showcase">
          <h3 class="heading(h2) c(--colors-gray-900) mb(lg)">Design System Sync</h3>
          <p class="font(lg/1.6) c(--colors-gray-600) mb(xl)">
            Automatically sync with your design tokens and maintain consistency across teams.
          </p>
          <div class="showcase-demo p(2xl) bg(--colors-gray-50) r(xl) mb(xl)">
            <div class="tokens-demo">
              <Code children="c(--colors-primary-500) bg(--brand-surface)" />
            </div>
          </div>
          <div class="feature-benefits vbox gap(md)">
            {#each ["Real-time token sync", "Multi-brand support", "Automatic dark mode"] as benefit}
              <div class="benefit hbox items(center) gap(sm)">
                <CheckCircle size="16" class="c(--colors-success)" />
                <span class="font(md) c(--colors-gray-700)">{benefit}</span>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Comparison Section -->
  <section class="comparison w(fill) py(5xl) bg(--colors-gray-900)">
    <div class="container max-w(1280px) mx(auto) px(xl)">
      <!-- Section Header -->
      <div class="text(center) mb(3xl)">
        <div class="inline-flex items(center) gap(xs) px(lg) py(sm) r(full) bg(--colors-warning) bg-opacity(10) b(--colors-warning) border-opacity(20) mb(lg)">
          <CheckCircle size="16" class="c(--colors-warning)" />
          <span class="font(sm) medium c(--colors-warning)">Comparison</span>
        </div>
        <h2 class="heading(h1) c(white) mb(lg)">
          Less Code, More Design
        </h2>
        <p class="font(xl/1.6) c(--colors-gray-400) max-w(768px) mx(auto)">
          See how AdorableCSS dramatically reduces the amount of code you need to write.
        </p>
      </div>

      <!-- Comparison Grid -->
      <div class="grid grid-cols(2) gap(2xl)">
        <!-- Traditional CSS -->
        <div class="comparison-card">
          <div class="card-header p(xl) bg(--colors-red-900) bg-opacity(20) r(xl/xl/0/0) b(--colors-error) border-opacity(30)">
            <h3 class="heading(h3) c(--colors-error) mb(xs)">Traditional CSS</h3>
            <p class="font(sm) c(--colors-gray-400)">Verbose and repetitive</p>
          </div>
          <div class="card-content p(xl) bg(--colors-gray-800) r(0/0/xl/xl)">
            <pre class="font(sm/1.8) c(--colors-gray-300) font-family(mono) overflow(auto)"><code>{`.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 32px;
  border-radius: 16px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  transition: transform 0.2s ease;
}
.card:hover {
  transform: scale(1.05);
}`}</code></pre>
            <div class="mt(xl) hbox gap(lg)">
              <div class="stat">
                <div class="font(xl) bold c(--colors-error)">13</div>
                <div class="font(xs) c(--colors-gray-500)">Lines</div>
              </div>
              <div class="stat">
                <div class="font(xl) bold c(--colors-error)">312</div>
                <div class="font(xs) c(--colors-gray-500)">Characters</div>
              </div>
            </div>
          </div>
        </div>

        <!-- AdorableCSS -->
        <div class="comparison-card">
          <div class="card-header p(xl) bg(--colors-green-900) bg-opacity(20) r(xl/xl/0/0) b(--colors-success) border-opacity(30)">
            <h3 class="heading(h3) c(--colors-success) mb(xs)">AdorableCSS</h3>
            <p class="font(sm) c(--colors-gray-400)">Clean and intuitive</p>
          </div>
          <div class="card-content p(xl) bg(--colors-gray-800) r(0/0/xl/xl)">
            <div class="font(sm/1.8) c(--colors-gray-300) font-family(mono) overflow(auto)">
              <Code 
                children="vbox(center) gap(lg)
w(fill) p(2xl) r(xl)
bg(#667eea..#764ba2)
shadow(lg) transition
hover:scale(1.05)"
              />
            </div>
            <div class="mt(xl) hbox gap(lg)">
              <div class="stat">
                <div class="font(xl) bold c(--colors-success)">5</div>
                <div class="font(xs) c(--colors-gray-500)">Lines</div>
              </div>
              <div class="stat">
                <div class="font(xl) bold c(--colors-success)">89</div>
                <div class="font(xs) c(--colors-gray-500)">Characters</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Benefits -->
      <div class="benefits mt(3xl) grid grid-cols(4) gap(lg)">
        <div class="benefit p(lg) text(center) bg(--colors-gray-800) r(xl)">
          <div class="font(2xl) mb(sm)">⚡</div>
          <div class="font(md) semibold c(--colors-success)">71% Less Code</div>
        </div>
        <div class="benefit p(lg) text(center) bg(--colors-gray-800) r(xl)">
          <div class="font(2xl) mb(sm)">🎨</div>
          <div class="font(md) semibold c(--colors-primary)">Figma Native</div>
        </div>
        <div class="benefit p(lg) text(center) bg(--colors-gray-800) r(xl)">
          <div class="font(2xl) mb(sm)">🚀</div>
          <div class="font(md) semibold c(--colors-warning)">Faster Development</div>
        </div>
        <div class="benefit p(lg) text(center) bg(--colors-gray-800) r(xl)">
          <div class="font(2xl) mb(sm)">✨</div>
          <div class="font(md) semibold c(--colors-accent)">Better UX</div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="cta w(fill) py(5xl) bg(--colors-gray-900)">
    <div class="container max-w(1024px) mx(auto) px(xl) text(center)">
      <h2 class="heading(h1) c(white) mb(lg)">
        Ready to Transform Your Workflow?
      </h2>
      <p class="font(xl/1.6) c(--colors-gray-300) mb(2xl) max-w(768px) mx(auto)">
        Join thousands of developers and designers who are already building faster with AdorableCSS.
      </p>
      
      <div class="hbox gap(lg) items(center) justify(center) mb(xl)">
        <button class="hbox gap(sm) items(center) px(2xl) py(xl) r(xl) bg(white) c(--colors-primary) font(lg) semibold shadow(xl) hover:shadow(2xl) hover:scale(1.02) transition">
          <Download size="20" />
          <span>Get Started Free</span>
        </button>
        <button class="hbox gap(sm) items(center) px(2xl) py(xl) r(xl) b(2/white) c(white) font(lg) semibold hover:bg(--colors-gray-800) transition">
          <BookOpen size="20" />
          <span>Read Documentation</span>
        </button>
      </div>
      
      <p class="font(sm) c(--colors-gray-400)">
        Free • Open Source • MIT License
      </p>
    </div>
  </section>
</div>

<style>
  .showcase-page {
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
  }

  /* Hero Animations */
  .floating-shapes {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .shape {
    position: absolute;
    border-radius: 50%;
    opacity: 0.1;
    animation: float 20s infinite linear;
  }

  .shape-0 {
    width: 60px;
    height: 60px;
    background: var(--colors-primary);
    top: 20%;
    left: 10%;
  }

  .shape-1 {
    width: 80px;
    height: 80px;
    background: var(--colors-accent);
    top: 60%;
    left: 80%;
  }

  .shape-2 {
    width: 40px;
    height: 40px;
    background: var(--colors-success);
    top: 80%;
    left: 20%;
  }

  .shape-3 {
    width: 100px;
    height: 100px;
    background: var(--colors-warning);
    top: 30%;
    left: 70%;
  }

  .shape-4 {
    width: 50px;
    height: 50px;
    background: var(--colors-error);
    top: 10%;
    left: 50%;
  }

  @keyframes float {
    0% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
    }
    100% {
      transform: translateY(0px) rotate(360deg);
    }
  }

  .animated-grid {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 2rem;
    padding: 2rem;
  }

  .grid-dot {
    width: 4px;
    height: 4px;
    background: var(--colors-primary);
    border-radius: 50%;
    opacity: 0;
    animation: dotPulse 3s infinite;
  }

  @keyframes dotPulse {
    0%, 100% {
      opacity: 0;
      transform: scale(1);
    }
    50% {
      opacity: 0.6;
      transform: scale(1.5);
    }
  }

  .floating-orb-1 {
    animation: floatOrb1 15s ease-in-out infinite;
  }

  .floating-orb-2 {
    animation: floatOrb2 12s ease-in-out infinite;
  }

  .floating-orb-3 {
    animation: floatOrb3 18s ease-in-out infinite;
  }

  .floating-orb-4 {
    animation: floatOrb4 20s ease-in-out infinite;
  }

  @keyframes floatOrb1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(30px, -20px) scale(1.1); }
    50% { transform: translate(-20px, -30px) scale(0.9); }
    75% { transform: translate(-30px, 20px) scale(1.05); }
  }

  @keyframes floatOrb2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(-25px, 25px) scale(1.2); }
    66% { transform: translate(25px, -15px) scale(0.8); }
  }

  @keyframes floatOrb3 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    20% { transform: translate(20px, -25px) scale(1.1); }
    40% { transform: translate(-30px, -10px) scale(0.9); }
    60% { transform: translate(15px, 30px) scale(1.15); }
    80% { transform: translate(-20px, 15px) scale(0.95); }
  }

  @keyframes floatOrb4 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(-40px, -20px) scale(1.3); }
    50% { transform: translate(30px, -40px) scale(0.7); }
    75% { transform: translate(20px, 30px) scale(1.1); }
  }

  .particles {
    pointer-events: none;
  }

  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: white;
    border-radius: 50%;
    opacity: 0;
    animation: particleFloat 8s infinite linear;
  }

  .particle-0 {
    animation-duration: 6s;
  }

  .particle-1 {
    animation-duration: 8s;
  }

  .particle-2 {
    animation-duration: 10s;
  }

  @keyframes particleFloat {
    0% {
      opacity: 0;
      transform: translateY(100vh) scale(0);
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateY(-100px) scale(1);
    }
  }

  /* Enhanced Hero Elements */
  .animated-badge {
    animation: badgePulse 2s ease-in-out infinite;
  }

  @keyframes badgePulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.4);
    }
    50% {
      transform: scale(1.02);
      box-shadow: 0 0 0 10px rgba(14, 165, 233, 0);
    }
  }

  .sparkle-icon {
    animation: sparkle 1.5s ease-in-out infinite;
  }

  @keyframes sparkle {
    0%, 100% {
      transform: rotate(0deg) scale(1);
    }
    25% {
      transform: rotate(90deg) scale(1.1);
    }
    50% {
      transform: rotate(180deg) scale(1);
    }
    75% {
      transform: rotate(270deg) scale(1.1);
    }
  }

  .pulse-dot {
    width: 8px;
    height: 8px;
    background: var(--colors-primary);
    border-radius: 50%;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .highlight-word {
    position: relative;
    display: inline-block;
  }

  .highlight-word::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--colors-accent), var(--colors-primary));
    border-radius: 2px;
    animation: underlineSlide 0.6s ease-out forwards;
    transform-origin: left;
  }

  @keyframes underlineSlide {
    from {
      transform: scaleX(0);
    }
    to {
      transform: scaleX(1);
    }
  }

  .gradient-text {
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    background-size: 200% 200%;
    animation: gradientShift 3s ease-in-out infinite;
  }

  @keyframes gradientShift {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  .scroll-indicator {
    transform: translateX(-50%);
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    40%, 43% {
      transform: translateX(-50%) translateY(-30px);
    }
    70% {
      transform: translateX(-50%) translateY(-15px);
    }
    90% {
      transform: translateX(-50%) translateY(-4px);
    }
  }
  
  /* Live Typing Demo */

  .demo-window {
    background: linear-gradient(145deg, #1e1e1e, #2d2d2d);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    animation: floatDemo 6s ease-in-out infinite;
  }

  @keyframes floatDemo {
    0%, 100% {
      transform: translateY(0px) rotateX(0deg);
    }
    50% {
      transform: translateY(-10px) rotateX(2deg);
    }
  }

  .demo-header {
    background: linear-gradient(90deg, #333, #444);
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .demo-dots {
    display: flex;
    gap: 8px;
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .dot.red { background: #ff5f57; }
  .dot.yellow { background: #ffbd2e; }
  .dot.green { background: #28ca42; }

  .demo-title {
    color: #e0e0e0;
    font-size: 14px;
    font-weight: 500;
  }

  .demo-content {
    background: #1a1a1a;
    padding: 20px;
    font-family: 'SF Mono', monospace;
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 60px;
  }

  .prompt {
    color: #00ff88;
    font-weight: bold;
  }

  .cursor {
    color: #00ff88;
    animation: blink 1s infinite;
  }

  .cursor.blink {
    animation: blink 0.5s infinite;
  }

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  /* Enhanced CTA Buttons */

  .cta-primary {
    position: relative;
    overflow: hidden;
    animation: ctaFloat 4s ease-in-out infinite;
  }

  .cta-primary:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 25px 50px rgba(14, 165, 233, 0.4);
  }

  .button-shine {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    animation: shine 3s infinite;
  }

  @keyframes shine {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  @keyframes ctaFloat {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-3px);
    }
  }

  .play-icon {
    animation: playPulse 2s ease-in-out infinite;
  }

  @keyframes playPulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  .cta-secondary {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .cta-secondary:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 1);
  }

  .cta-docs:hover {
    transform: translateY(-1px) scale(1.02);
  }

  /* Enhanced Stats */

  .stat-card {
    transform-style: preserve-3d;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .stat-card:hover {
    transform: translateY(-8px) rotateX(5deg);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }

  .stat-icon {
    animation: iconFloat 3s ease-in-out infinite;
  }

  @keyframes iconFloat {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-5px) rotate(5deg);
    }
  }

  .counter {
    transition: all 0.3s ease;
  }

  .stat-bar {
    height: 3px;
    width: 0;
    background: var(--colors-primary);
    border-radius: 2px;
    margin-top: 8px;
    animation: statBarGrow 2s ease-out forwards;
    animation-delay: 1s;
  }

  .stat-bar.success {
    background: var(--colors-success);
  }

  .stat-bar.warning {
    background: var(--colors-warning);
  }

  .stat-bar.accent {
    background: var(--colors-accent);
  }

  @keyframes statBarGrow {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  /* Demo Container */
  .demo-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: start;
  }

  .demo-editor {
    background: linear-gradient(145deg, #1a1a1a, #2d2d2d);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  }

  .editor-tabs {
    border-bottom: 1px solid var(--colors-gray-700);
  }

  .tab {
    cursor: pointer;
    transition: all 0.2s ease;
    border-bottom: 2px solid transparent;
  }

  .tab.active {
    background: var(--colors-gray-700);
    color: var(--colors-gray-200);
    border-bottom-color: var(--colors-primary);
  }

  .tab:hover:not(.active) {
    background: rgba(255, 255, 255, 0.05);
  }

  .line-numbers {
    width: 30px;
  }

  .line-number {
    line-height: 24px;
    color: var(--colors-gray-500);
    font-size: 12px;
  }

  .code-content {
    position: relative;
  }

  /* Browser Chrome */
  .browser-chrome {
    animation: chromeFloat 5s ease-in-out infinite;
  }

  @keyframes chromeFloat {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  .chrome-header {
    background: linear-gradient(90deg, #f5f5f5, #e8e8e8);
  }

  .address-bar {
    background: rgba(255, 255, 255, 0.8);
  }

  .result-preview {
    animation: resultPulse 3s ease-in-out infinite;
  }

  @keyframes resultPulse {
    0%, 100% {
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
    50% {
      box-shadow: 0 20px 40px rgba(14, 165, 233, 0.2);
    }
  }

  .preview-btn {
    padding: 8px 12px;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .preview-btn.active {
    background: var(--colors-primary);
    transform: scale(1.1);
  }

  .preview-btn:hover:not(.active) {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }

  /* Community Section */
  .community-pattern {
    background-image: 
      radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 2px, transparent 2px),
      radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 2px, transparent 2px);
    background-size: 60px 60px;
    background-position: 0 0, 30px 30px;
    animation: patternMove 20s linear infinite;
  }

  @keyframes patternMove {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(60px, 60px);
    }
  }

  .testimonial-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    animation: cardFloat 6s ease-in-out infinite;
  }

  .testimonial-card:nth-child(1) { animation-delay: 0s; }
  .testimonial-card:nth-child(2) { animation-delay: 2s; }
  .testimonial-card:nth-child(3) { animation-delay: 4s; }

  @keyframes cardFloat {
    0%, 100% {
      transform: translateY(0px) scale(1);
    }
    50% {
      transform: translateY(-8px) scale(1.02);
    }
  }

  .stars {
    display: flex;
    gap: 4px;
  }

  .star {
    animation: starTwinkle 2s ease-in-out infinite;
  }

  .star:nth-child(1) { animation-delay: 0s; }
  .star:nth-child(2) { animation-delay: 0.2s; }
  .star:nth-child(3) { animation-delay: 0.4s; }
  .star:nth-child(4) { animation-delay: 0.6s; }
  .star:nth-child(5) { animation-delay: 0.8s; }

  @keyframes starTwinkle {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.8;
    }
  }

  .avatar {
    animation: avatarBounce 4s ease-in-out infinite;
  }

  @keyframes avatarBounce {
    0%, 100% {
      transform: scale(1) rotate(0deg);
    }
    50% {
      transform: scale(1.1) rotate(5deg);
    }
  }

  .community-stats .stat-item {
    animation: statFloat 4s ease-in-out infinite;
  }

  .community-stats .stat-item:nth-child(1) { animation-delay: 0s; }
  .community-stats .stat-item:nth-child(2) { animation-delay: 1s; }
  .community-stats .stat-item:nth-child(3) { animation-delay: 2s; }
  .community-stats .stat-item:nth-child(4) { animation-delay: 3s; }

  @keyframes statFloat {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .feature-card:hover {
    transform: translateY(-4px);
  }
  
  .comparison-card {
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.2);
  }
  
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  
  code {
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  }

  /* Code highlighter customization for demo sections */
  :global(.demo-code .code-highlighter) {
    font-size: inherit;
    line-height: inherit;
  }

  :global(.demo-code .token-utility) {
    color: #38bdf8;
  }

  :global(.demo-code .token-value) {
    color: #34d399;
  }

  :global(.demo-code .token-separator) {
    color: #64748b;
  }
</style>