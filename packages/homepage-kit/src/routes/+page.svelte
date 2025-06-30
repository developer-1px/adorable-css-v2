<script lang="ts">
  import { Github, ArrowRight, Sparkles, Zap, Package } from 'lucide-svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import FeatureCard from '$lib/components/ui/FeatureCard.svelte';
  import IconBox from '$lib/components/ui/IconBox.svelte';
  import CodeBlock from '$lib/components/ui/CodeBlock.svelte';
</script>

<!-- Hero Section -->
<section class="relative min-h(100vh) vbox(center) overflow(hidden) bg(white)">
  <!-- Light Grid Background -->
  <div class="absolute layer(fill) pointer-events(none)">
    <!-- Large checkered grid pattern -->
    <div class="absolute layer(fill)" 
         style="background-image: 
                linear-gradient(to right, rgb(0 0 0 / 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgb(0 0 0 / 0.03) 1px, transparent 1px);
                background-size: 80px 80px;">
    </div>
    <!-- Subtle gradient overlay -->
    <div class="absolute layer(fill) bg(to-b/white.0..white.7)"></div>
  </div>
  
  <!-- Hero Content -->
  <div class="relative z(10) vbox(center) gap(32) px(24) py(80) max-w(6xl) mx(auto) text(center)">
    <!-- Badge -->
    <div>
      <div class="hbox(middle) gap(8) px(20) py(10) r(full) glass(20/0.05) border(1/purple-500.3) shadow(lg/purple-500.1) hover:shadow(xl/purple-500.2) transition group">
        <Sparkles size="16" class="c(purple-500)" />
        <span class="label(sm) bold(semi) bg(clip-text) c(135deg/purple-600..pink-600)">v2.0 Now Available</span>
        <span class="px(8) py(2) r(full) bg(purple-500) c(white) caption(xs) bold">NEW</span>
      </div>
    </div>
    
    <!-- Main Heading -->
    <h1 class="display(2xl) c(gray-900)">
      Write CSS like you
      <br />
      <span class="relative inline-block">
        <span class="relative z(10) bg(clip-text) c(135deg/purple-600..pink-600)">think in Figma</span>
        <span class="absolute bottom(-8) left(0) right(0) h(20) bg(purple-500.1) blur(xl)"></span>
      </span>
    </h1>
    
    <!-- Subheading -->
    <p class="body(lg) c(gray-600) max-w(4xl) mx(auto)">
      A <span class="bold(semi) c(purple-600)">Figma-first</span> CSS framework that bridges design and code. 
      Built-in design system, intuitive syntax, and seamless integration.
    </p>
    
    <!-- CTA Buttons -->
    <div class="hbox(center/wrap) gap(20)">
      <a href="/docs" class="group px(32) py(16) r(xl) bg(purple-500..pink-500) c(white) label(button) bold shadow(xl) hover:shadow(2xl) hover:translate-y(-2) active:translate-y(0) transition relative overflow(hidden)">
        <span class="relative z(10) hbox(middle) gap(8)">
          Get Started
          <ArrowRight size="20" class="group-hover:translate-x(4) transition" />
        </span>
        <span class="absolute layer(fill) bg(white.2) scale(0) group-hover:scale(100) transition(transform/0.5s) r(full)"></span>
      </a>
      
      <a href="https://github.com/adorablecss/adorable-css" target="_blank" rel="noopener" class="group px(32) py(16) r(xl) glass(20/0.05) border(2/gray-300) hover:border(2/purple-500) c(gray-700) hover:c(purple-600) label(button) bold shadow(md) hover:shadow(lg) hover:translate-y(-2) active:translate-y(0) transition">
        <span class="hbox(middle) gap(8)">
          <Github size="20" />
          <span>View on GitHub</span>
        </span>
      </a>
    </div>
    
    <!-- Quick Install -->
    <div class="vbox(center) gap(16)">
      <p class="caption(sm) uppercase tracking(wider)">Quick Install</p>
      <div class="group relative">
        <div class="hbox(middle) gap(16) px(24) py(14) r(xl) glass(20/0.05) border(1/gray-300) shadow(lg) hover:shadow(xl) transition">
          <code class="label(base) font(mono) c(gray-800) select-all">npm install adorable-css</code>
          <button class="size(36) r(lg) hbox(center) bg(purple-100) hover:bg(purple-200) c(purple-700) transition group">
            <Package size="18" class="group-hover:scale(110) transition" />
          </button>
        </div>
        <!-- Copy feedback -->
        <div class="absolute top(full) left(50%) translate-x(-50%) mt(8) px(12) py(6) r(md) bg(gray-900) c(white) caption(xs) opacity(0) group-hover:opacity(100) transition pointer-events(none)">
          Click to copy
        </div>
      </div>
    </div>
  </div>
  
  <!-- Feature Grid Preview -->
  <div class="grid(3) gap(32) max-w(7xl) mx(auto) px(24) pb(120) relative z(10) ..lg:grid(1) lg:gap(24)">
    <!-- Figma-First -->
    <div class="group vbox gap(16) p(32) r(2xl) glass(20/0.02) border(1/gray-200) hover:border(1/purple-500.5) shadow(lg) hover:shadow(2xl) transition relative overflow(hidden)">
      <!-- Background gradient on hover -->
      <div class="absolute layer(fill) bg(radial/purple-500.05..transparent) opacity(0) group-hover:opacity(100) transition"></div>
      
      <div class="relative z(10)">
        <div class="size(64) r(xl) bg(purple-500..purple-600) shadow(lg/purple-500.3) group-hover:shadow(xl/purple-500.4) hbox(center) mb(16) group-hover:scale(110) transition">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
        </div>
        <h3 class="title(lg) c(gray-900) mb(8)">Figma Mental Model</h3>
        <p class="body(base) c(gray-600)">Auto Layout, constraints, and layer positioning - just like in Figma</p>
      </div>
    </div>
    
    <!-- Built-in Design System -->
    <div class="group vbox gap(16) p(32) r(2xl) glass(20/0.02) border(1/gray-200) hover:border(1/emerald-500.5) shadow(lg) hover:shadow(2xl) transition relative overflow(hidden)">
      <!-- Background gradient on hover -->
      <div class="absolute layer(fill) bg(radial/emerald-500.05..transparent) opacity(0) group-hover:opacity(100) transition"></div>
      
      <div class="relative z(10)">
        <div class="size(64) r(xl) bg(emerald-500..emerald-600) shadow(lg/emerald-500.3) group-hover:shadow(xl/emerald-500.4) hbox(center) mb(16) group-hover:scale(110) transition">
          <Zap size="32" class="c(white)" />
        </div>
        <h3 class="title(lg) c(gray-900) mb(8)">Design System Built-in</h3>
        <p class="body(base) c(gray-600)">Professional design tokens, semantic colors, and consistent spacing out of the box</p>
      </div>
    </div>
    
    <!-- Developer Experience -->
    <div class="group vbox gap(16) p(32) r(2xl) glass(20/0.02) border(1/gray-200) hover:border(1/blue-500.5) shadow(lg) hover:shadow(2xl) transition relative overflow(hidden)">
      <!-- Background gradient on hover -->
      <div class="absolute layer(fill) bg(radial/blue-500.05..transparent) opacity(0) group-hover:opacity(100) transition"></div>
      
      <div class="relative z(10)">
        <div class="size(64) r(xl) bg(blue-500..blue-600) shadow(lg/blue-500.3) group-hover:shadow(xl/blue-500.4) hbox(center) mb(16) group-hover:scale(110) transition">
          <Sparkles size="32" class="c(white)" />
        </div>
        <h3 class="title(lg) c(gray-900) mb(8)">Amazing DX</h3>
        <p class="body(base) c(gray-600)">IntelliSense support, tiny bundle size, and zero runtime overhead</p>
      </div>
    </div>
  </div>
</section>

<!-- Code Comparison Section -->
<section class="relative py(120) overflow(hidden)">
  <!-- Background pattern -->
  <div class="absolute layer(fill) bg(gray-50)"></div>
  <div class="absolute layer(fill)" 
       style="background-image: 
              linear-gradient(to right, rgb(255 255 255 / 0.5) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(255 255 255 / 0.5) 1px, transparent 1px);
              background-size: 40px 40px;"></div>
  
  <div class="relative z(10) container max-w(7xl)">
    <div class="text(center) mb(64)">
      <h2 class="display(xl) c(gray-900) mb(20)">
        Write Less, <span class="bg(clip-text) c(135deg/purple-600..pink-600)">Design More</span>
      </h2>
      <p class="body(lg) c(gray-600) max-w(2xl) mx(auto)">
        See how AdorableCSS simplifies your workflow with intuitive, Figma-like syntax
      </p>
    </div>
    
    <!-- Code Comparison -->
    <div class="grid(2) gap(40) items(stretch) ..lg:grid(1) lg:gap(32)">
      <!-- Traditional CSS -->
      <div class="vbox gap(20) group">
        <div class="hbox(middle) gap(12)">
          <div class="size(48) r(xl) bg(gray-200) hbox(center) group-hover:bg(gray-300) transition">
            <div class="size(24) r(md) bg(gray-400)"></div>
          </div>
          <div class="vbox gap(4)">
            <h3 class="title(base) c(gray-500)">Traditional CSS</h3>
            <p class="caption(xs) c(gray-400)">17 lines, 268 characters</p>
          </div>
        </div>
        <div class="r(xl) overflow(hidden) shadow(xl) border(1/gray-200) group-hover:shadow(2xl) transition">
          <CodeBlock 
            theme="dark"
            language="css"
            code={`.card {
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
}`}
          />
        </div>
      </div>
      
      <!-- AdorableCSS -->
      <div class="vbox gap(20) group">
        <div class="hbox(middle) gap(12)">
          <div class="size(48) r(xl) bg(purple-500..pink-500) hbox(center) shadow(md/purple-500.3) group-hover:shadow(lg/purple-500.4) group-hover:scale(110) transition">
            <Sparkles size="24" class="c(white)" />
          </div>
          <div class="vbox gap(4)">
            <h3 class="title(base) bold c(gray-900)">AdorableCSS</h3>
            <p class="caption(xs) c(purple-600) bold(medium)">10 lines, 145 characters</p>
          </div>
        </div>
        <div class="r(xl) overflow(hidden) shadow(xl) border(2/purple-500.3) group-hover:shadow(2xl) group-hover:border(2/purple-500.5) transition">
          <CodeBlock 
            theme="branded"
            language="html"
            code={`<div class="
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
</div>`}
          />
        </div>
      </div>
    </div>
  </div>
</section>