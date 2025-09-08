<script>
import { onMount } from 'svelte';
import { generateCSS, defineComponent, registerComponents } from 'adorable-css';

// Define custom components for this page
const components = {
  // Layout
  'page-layout': defineComponent({
    base: 'vbox flex(1) gap(4rem) min-h(screen) md:gap(2rem)'
  }),

  'container': defineComponent({
    base: 'vbox w(full) max-w(1200px) mx(auto) px(2rem) z(1) gap(4rem) md:px(1rem) md:gap(2rem)'
  }),

  // Header
  'header': defineComponent({
    base: 'vbox items(center) gap(1rem) text(center) py(4rem) relative md:py(2rem)'
  }),

  'logo': defineComponent({
    base: 'font(700) text(4rem..7xl) tracking(-0.02em) rotate(-2deg) transition hover:rotate(2deg) hover:scale(1.05) md:text(3rem)'
  }),

  'tagline': defineComponent({
    base: 'text(1.8rem) font(300) c(gray-600) rotate(1deg)'
  }),

  // Hero
  'hero': defineComponent({
    base: 'bg(white) border(2/black) r(20) p(3rem) relative rotate(-0.5deg) shadow(xl) md:p(2rem) md:rotate(0)'
  }),

  'hero-content': defineComponent({
    base: 'vbox gap(2rem) text(1.3rem/1.8) max-w(800px) mx(auto) text(center)'
  }),

  'code-example': defineComponent({
    base: 'vbox gap(0.5rem) font(mono) bg(gray-900) c(yellow-400) p(2rem) r(10) text(1rem) overflow-x(auto) relative'
  }),

  'code-line': defineComponent({
    base: 'pl(2rem)'
  }),

  // Features
  'features-grid': defineComponent({
    base: 'grid grid-cols(repeat(auto-fit,minmax(300px,1fr))) gap(3rem) md:gap(2rem)'
  }),

  'feature-card': defineComponent({
    base: 'vbox gap(1rem) bg(white) border(2/black) p(2rem) relative transition hover:rotate(0) hover:translate-y(-5px) hover:shadow(xl)',
    variants: {
      first: 'rotate(1deg) r(30/15/30/15)',
      second: 'rotate(-1deg) r(15/30/15/30)',
      third: 'rotate(0.5deg) r(20)'
    }
  }),

  'feature-number': defineComponent({
    base: 'absolute top(-20) left(20) text(3rem) font(700) c(red-500)'
  }),

  'feature-title': defineComponent({
    base: 'text(2rem) font(700) pt(1rem)'
  }),

  'feature-description': defineComponent({
    base: 'text(1.1rem/1.6) c(gray-800)'
  }),

  // CTA
  'cta-section': defineComponent({
    base: 'vbox items(center) gap(2rem) text(center) py(6rem) relative md:py(3rem)'
  }),

  'cta-sketch': defineComponent({
    base: 'text(1.5rem) c(gray-600) rotate(-10deg) italic'
  }),

  'cta-button': defineComponent({
    base: 'inline-block font(700) text(1.4rem) c(black) bg(yellow-100) px(3rem) py(1.5rem) no-underline border(3/black) r(full) relative transition rotate(-1deg) hover:rotate(1deg) hover:translate-y(-3px) hover:shadow(lg)'
  }),

  // Doodles
  'doodle-bg': defineComponent({
    base: 'fixed inset(0) pointer-events(none) opacity(3%)'
  }),

  'doodle': defineComponent({
    base: 'absolute text(2rem) c(gray-600) opacity(50%) pointer-events(none)',
    variants: {
      '1': 'top(10%) left(5%) rotate(-15deg)',
      '2': 'top(20%) right(10%) text(1.5rem) rotate(20deg)',
      '3': 'bottom(30%) left(8%) rotate(-10deg)',
      '4': 'bottom(20%) right(5%) text(3rem) rotate(15deg)'
    }
  }),

  // Sketch effects
  'sketch-underline': defineComponent({
    base: 'relative inline-block after:content("") after:absolute after:bottom(-5) after:left(-5) after:right(-5) after:h(15) after:bg(yellow-400) after:rotate(-1deg) after:z(-1) after:opacity(80%)'
  }),

  'sketch-circle': defineComponent({
    base: 'relative inline-block before:content("") before:absolute before:top(50%) before:left(50%) before:w(120%) before:h(120%) before:border(3/red-500) before:r(full) before:translate(-50%/-50%) before:rotate(-5deg) before:z(-1)'
  })
};

let css = '';

onMount(() => {
  // Register components
  registerComponents(components);

  // Generate CSS for all classes used
  const classes = [
    'page-layout',
    'container',
    'header',
    'logo',
    'tagline',
    'hero',
    'hero-content',
    'code-example',
    'code-line',
    'features-grid',
    'feature-card(first)',
    'feature-card(second)',
    'feature-card(third)',
    'feature-number',
    'feature-title',
    'feature-description',
    'cta-section',
    'cta-sketch',
    'cta-button',
    'doodle-bg',
    'doodle(1)',
    'doodle(2)',
    'doodle(3)',
    'doodle(4)',
    'sketch-underline',
    'sketch-circle',
    // Additional utility classes
    'font(bold)',
    'italic'
  ];

  css = generateCSS(classes, { includeTokens: true });
});
</script>

<svelte:head>
  <title>AdorableCSS - Design to Code, Magically (No Margin Version)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Kalam:wght@300;400;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet">

  {@html `<style>${css}</style>`}

  <style>
    /* Custom color tokens */
    :root {
      --cream: #FFFEF9;
      --soft-black: #1A1A1A;
      --charcoal: #2D2D2D;
      --warm-gray: #6B6B6B;
      --light-gray: #E8E8E8;
      --accent-coral: #FF6B6B;
      --accent-blue: #4ECDC4;
      --accent-yellow: #FFE66D;
      --accent-purple: #9B59B6;
      --white: #FFFFFF;
      --shadow: rgba(0, 0, 0, 0.06);
      --shadow-deep: rgba(0, 0, 0, 0.12);
    }

    /* Font families */
    .logo { font-family: 'Caveat', cursive; }
    .tagline { font-family: 'Kalam', cursive; }
    .code-example { font-family: 'Space Mono', monospace; }
    .cta-button { font-family: 'Space Mono', monospace; }
    .feature-number { font-family: 'Caveat', cursive; }
    .feature-title { font-family: 'Kalam', cursive; }
    .cta-sketch { font-family: 'Caveat', cursive; }
    .doodle { font-family: 'Caveat', cursive; }

    /* Background pattern for doodle-bg */
    .doodle-bg {
      background-image:
        radial-gradient(circle at 20% 30%, var(--soft-black) 1px, transparent 1px),
        radial-gradient(circle at 80% 70%, var(--soft-black) 1px, transparent 1px),
        radial-gradient(circle at 40% 80%, var(--soft-black) 1px, transparent 1px);
      background-size: 50px 50px, 30px 30px, 40px 40px;
    }

    /* Hero label */
    .hero::before {
      content: 'FIGMA → CODE';
      position: absolute;
      top: -15px;
      left: 30px;
      background: var(--accent-coral);
      color: var(--white);
      font-family: 'Space Mono', monospace;
      font-weight: 700;
      font-size: 0.9rem;
      padding: 0.5rem 1rem;
      transform: rotate(-3deg);
    }

    /* Code example label */
    .code-example::before {
      content: '// adorable.css';
      position: absolute;
      top: 10px;
      left: 20px;
      color: var(--warm-gray);
      font-size: 0.85rem;
    }

    /* Base styles */
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--cream);
      color: var(--soft-black);
    }

    code {
      font-family: 'Space Mono', monospace;
      background: var(--light-gray);
      padding: 0.2em 0.4em;
      border-radius: 3px;
      font-size: 0.9em;
    }

    strong {
      font-weight: 700;
    }

    em {
      font-style: italic;
    }
  </style>
</svelte:head>

<div class="doodle-bg"></div>

<!-- Floating doodles -->
<div class="doodle doodle(1)">✨</div>
<div class="doodle doodle(2)">→</div>
<div class="doodle doodle(3)">{'{ }'}</div>
<div class="doodle doodle(4)">♥</div>

<div class="page-layout">
  <div class="container">
    <!-- Header -->
    <header class="header">
      <h1 class="logo">
        Adorable<span class="sketch-underline">CSS</span>
      </h1>
      <p class="tagline">where design meets code with a smile</p>
    </header>

    <!-- Hero -->
    <section class="hero">
      <div class="hero-content">
        <p>
          <strong class="font(bold)">AdorableCSS</strong> is a <span class="sketch-circle">Figma-first</span> CSS framework
          that speaks your design language. No more translation between design and code—just pure,
          intuitive syntax that makes sense.
        </p>

        <div class="code-example">
          <div class="code-line">hbox(pack) gap(16) p(24) r(lg) bg(white) shadow(soft)</div>
          <div class="code-line">text(title/2xl) font(bold) c(charcoal)</div>
          <div class="code-line">w(fill) h(hug) hover:scale(1.05) transition</div>
        </div>

        <p>
          <em class="italic">It's like Figma auto-layout, but in code. Magic? Pretty much.</em>
        </p>
      </div>
    </section>

    <!-- Features -->
    <section class="features-grid">
      <div class="feature-card feature-card(first)">
        <span class="feature-number">01</span>
        <h3 class="feature-title">Figma Native</h3>
        <p class="feature-description">
          Use the same mental model as Figma. <code>hbox()</code>, <code>vbox()</code>,
          <code>w(fill)</code>—it all just works exactly as you'd expect.
        </p>
      </div>

      <div class="feature-card feature-card(second)">
        <span class="feature-number">02</span>
        <h3 class="feature-title">Token Everything</h3>
        <p class="feature-description">
          15 design token categories cover every design decision.
          Consistency isn't just easy—it's automatic.
        </p>
      </div>

      <div class="feature-card feature-card(third)">
        <span class="feature-number">03</span>
        <h3 class="feature-title">Zero Runtime</h3>
        <p class="feature-description">
          Compiles to pure CSS at build time. No JavaScript,
          no runtime overhead. Just clean, fast styles.
        </p>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <span class="cta-sketch">ready to try?</span>
      <a href="/docs" class="cta-button">Get Started →</a>
    </section>
  </div>
</div>