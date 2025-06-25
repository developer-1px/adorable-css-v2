<script lang="ts">
  import { Layers, Palette, Zap } from 'lucide-svelte';
</script>

<section class="features py(6xl) bg(gray-50)">
  <div class="container(4xl) px(lg)">
    <!-- Section Header -->
    <div class="text(center) mb(4xl)">
      <h2 class="900 font(4xl/1.2) c(gray-900) mb(lg)">
        Three Revolutionary Concepts
      </h2>
      <p class="font(lg) c(gray-600) container(2xl)">
        AdorableCSS rethinks how CSS should work in the modern design era
      </p>
    </div>
    
    <!-- Features -->
    <div class="grid grid-cols(1) md:grid-cols(3) gap(2xl)">
      <!-- Figma-Native -->
      <div class="text(center) p(2xl) bg(white) r(xl) border(1/gray-200) hover:shadow(lg) transition">
        <div class="w(80px) h(80px) bg(purple-100) r(full) vbox(pack) mx(auto) mb(xl)">
          <Layers size="40" class="c(purple-600)" />
        </div>
        <h3 class="font(xl) 700 c(gray-900) mb(md)">Figma-Native</h3>
        <p class="font(md) c(gray-600) mb(lg)">
          Write CSS the way you think in Figma. No more mental translation between design and code.
        </p>
        <div class="bg(gray-50) r(lg) p(lg) text(left)">
          <div class="font(sm) c(gray-500) mb(sm)">Auto Layout → Horizontal</div>
          <code class="font(sm) c(purple-600) font-family(mono)">hbox(middle+between)</code>
        </div>
      </div>
      
      <!-- OKLCH Colors -->
      <div class="text(center) p(2xl) bg(white) r(xl) border(1/gray-200) hover:shadow(lg) transition">
        <div class="w(80px) h(80px) bg(pink-100) r(full) vbox(pack) mx(auto) mb(xl)">
          <Palette size="40" class="c(pink-600)" />
        </div>
        <h3 class="font(xl) 700 c(gray-900) mb(md)">OKLCH Colors</h3>
        <p class="font(md) c(gray-600) mb(lg)">
          Perfect gradients that never go muddy. Perceptually uniform color space for beautiful results.
        </p>
        <div class="bg(gray-50) r(lg) p(lg) text(left)">
          <div class="font(sm) c(gray-500) mb(sm)">Perfect gradient</div>
          <code class="font(sm) c(pink-600) font-family(mono)">bg(135deg/purple-400,pink-400)</code>
        </div>
      </div>
      
      <!-- Zero Runtime -->
      <div class="text(center) p(2xl) bg(white) r(xl) border(1/gray-200) hover:shadow(lg) transition">
        <div class="w(80px) h(80px) bg(green-100) r(full) vbox(pack) mx(auto) mb(xl)">
          <Zap size="40" class="c(green-600)" />
        </div>
        <h3 class="font(xl) 700 c(gray-900) mb(md)">Zero Runtime</h3>
        <p class="font(md) c(gray-600) mb(lg)">
          Pure CSS output with no JavaScript overhead. Lightning fast performance guaranteed.
        </p>
        <div class="bg(gray-50) r(lg) p(lg) text(left)">
          <div class="font(sm) c(gray-500) mb(sm)">Build time compilation</div>
          <code class="font(sm) c(green-600) font-family(mono)">AdorableCSS → Pure CSS</code>
        </div>
      </div>
    </div>
    
    <!-- Live Example -->
    <div class="mt(4xl) text(center)">
      <div class="container(3xl) p(2xl) bg(white) r(xl) border(1/gray-200)">
        <h3 class="font(xl) 700 c(gray-900) mb(lg)">See It In Action</h3>
        <div class="bg(gray-900) r(lg) p(xl) mb(lg)">
          <pre class="font(sm/1.6) c(white) font-family(mono) text(left)"><code>{`// Traditional CSS: 15+ lines
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 24px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  border-radius: 16px;
  box-shadow: 0 10px 15px rgba(0,0,0,0.1);
}

// AdorableCSS: 1 line
<div class="hbox(middle+between) gap(16) p(24) 
           bg(135deg/purple-500,pink-500) r(16) shadow(lg)">`}</code></pre>
        </div>
        <p class="font(md) c(gray-600)">
          Same result, <strong class="c(gray-900)">96% less code</strong>
        </p>
      </div>
    </div>
  </div>
</section>

<style>
  code {
    font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  }
  
  pre {
    margin: 0;
    white-space: pre-wrap;
    word-break: break-word;
  }
</style>