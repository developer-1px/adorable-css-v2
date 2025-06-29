<script lang="ts">
  import GradientButton from '$lib/components/brand/GradientButton.svelte';
  import { Github, ArrowRight, Sparkles, Zap, Package } from 'lucide-svelte';
</script>

<!-- Hero Section -->
<section class="hero(gradient)">
  <!-- Background Pattern -->
  <div class="hero-bg(dots)"></div>
  
  <!-- Hero Content -->
  <div class="hero-content">
    <!-- Badge -->
    <div class="hbox(center) mb(24)">
      <div class="hbox(middle) gap(8) px(16) py(8) r(full) bg(purple-500.1) border(1/purple-500.2)">
        <Sparkles size="16" class="c(purple-500)" />
        <span class="font(sm) c(purple-600) bold(medium)">v2.0 Now Available</span>
      </div>
    </div>
    
    <!-- Main Heading -->
    <h1 class="font(clamp(2.5rem,8vw,5rem)/1.1/-2%) bold c(gray-900) mb(24)">
      Write CSS like you
      <span class="c(45deg/purple-500..pink-500)">think in Figma</span>
    </h1>
    
    <!-- Subheading -->
    <p class="font(clamp(1.125rem,3vw,1.5rem)/1.6) c(gray-600) max-w(3xl) mx(auto) mb(48)">
      A Figma-first CSS framework that bridges design and code. 
      Built-in design system, intuitive syntax, and seamless integration.
    </p>
    
    <!-- CTA Buttons -->
    <div class="hbox(center/wrap) gap(16) mb(32)">
      <GradientButton variant="adorable" size="lg" arrow>
        Get Started
      </GradientButton>
      
      <a 
        href="https://github.com/adorablecss/adorable-css" 
        class="btn(secondary/lg) hbox(middle) gap(8)"
      >
        <Github size="20" />
        <span>View on GitHub</span>
      </a>
    </div>
    
    <!-- Quick Install -->
    <div class="vbox(center) gap(12)">
      <p class="font(sm) c(gray-500) bold(medium)">Quick Install</p>
      <div class="hbox(middle) gap(12) px(20) py(12) r(lg) bg(gray-100) border(1/gray-200)">
        <code class="font(mono/sm) c(gray-800)">npm install adorable-css</code>
        <button class="icon-btn(sm) hover:bg(gray-200)">
          <Package size="16" />
        </button>
      </div>
    </div>
  </div>
  
  <!-- Feature Grid Preview -->
  <div class="grid(3) gap(24) max-w(6xl) mx(auto) mt(80) relative z(10)">
    <!-- Figma-First -->
    <div class="card vbox gap(16) p(24) bg(white.8) backdrop-blur(sm) border(1/gray-200) hover:shadow(lg) transition">
      <div class="48x48 r(lg) bg(purple-500.1) c(purple-500)">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
        </svg>
      </div>
      <h3 class="font(xl) bold c(gray-900)">Figma Mental Model</h3>
      <p class="font(sm) c(gray-600) leading(relaxed)">
        Auto Layout, constraints, and layer positioning - just like in Figma
      </p>
    </div>
    
    <!-- Built-in Design System -->
    <div class="card vbox gap(16) p(24) bg(white.8) backdrop-blur(sm) border(1/gray-200) hover:shadow(lg) transition">
      <div class="48x48 r(lg) bg(emerald-500.1) c(emerald-500)">
        <Zap size="24" />
      </div>
      <h3 class="font(xl) bold c(gray-900)">Design System Built-in</h3>
      <p class="font(sm) c(gray-600) leading(relaxed)">
        Professional design tokens, semantic colors, and consistent spacing out of the box
      </p>
    </div>
    
    <!-- Developer Experience -->
    <div class="card vbox gap(16) p(24) bg(white.8) backdrop-blur(sm) border(1/gray-200) hover:shadow(lg) transition">
      <div class="48x48 r(lg) bg(blue-500.1) c(blue-500)">
        <Sparkles size="24" />
      </div>
      <h3 class="font(xl) bold c(gray-900)">Amazing DX</h3>
      <p class="font(sm) c(gray-600) leading(relaxed)">
        IntelliSense support, tiny bundle size, and zero runtime overhead
      </p>
    </div>
  </div>
</section>

<!-- Code Comparison Section -->
<section class="section py(80) bg(gray-50)">
  <div class="container max-w(6xl)">
    <div class="text(center) mb(48)">
      <h2 class="font(3xl) bold c(gray-900) mb(16)">
        Write Less, Design More
      </h2>
      <p class="font(lg) c(gray-600)">
        See how AdorableCSS simplifies your workflow
      </p>
    </div>
    
    <!-- Code Comparison -->
    <div class="grid(2) gap(32) items(start)">
      <!-- Traditional CSS -->
      <div class="vbox gap(16)">
        <div class="hbox(middle) gap(8)">
          <div class="8x8 r(full) bg(gray-400)"></div>
          <h3 class="font(lg) bold c(gray-700)">Traditional CSS</h3>
        </div>
        <div class="r(lg) bg(gray-900) p(24) overflow(hidden)">
          <pre class="font(mono/sm) c(gray-300)"><code>{`.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 0.75rem;
  background: linear-gradient(
    135deg, 
    #8b5cf6 0%, 
    #ec4899 100%
  );
  box-shadow: 0 10px 15px -3px 
    rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
}`}</code></pre>
        </div>
      </div>
      
      <!-- AdorableCSS -->
      <div class="vbox gap(16)">
        <div class="hbox(middle) gap(8)">
          <div class="8x8 r(full) bg(purple-500)"></div>
          <h3 class="font(lg) bold c(gray-900)">AdorableCSS</h3>
        </div>
        <div class="r(lg) bg(white) border(2/purple-500) p(24) overflow(hidden)">
          <pre class="font(mono/sm) c(gray-900)"><code>{`<div class="
  vbox(center) 
  gap(16) 
  p(24) 
  r(lg) 
  bg(135deg/purple-500..pink-500)
  shadow(lg) 
  hover:scale(1.05) 
  transition
">
  <!-- Your content -->
</div>`}</code></pre>
        </div>
      </div>
    </div>
  </div>
</section>