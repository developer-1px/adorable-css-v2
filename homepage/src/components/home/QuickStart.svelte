<script lang="ts">
  import Code from '../Code.svelte';
  import { Rocket, Download, BookOpen } from 'lucide-svelte';
</script>

<section class="quick-start w(fill) py(5xl) bg(gradient-to-br/purple-50/pink-50)">
  <div class="container(lg) text(center)">
    <!-- Section Header -->
    <div class="mb(4xl)">
      <div class="inline-flex(middle) gap(sm) px(lg) py(sm) r(full) bg(white) shadow(md) mb(xl)">
        <Rocket size="20" class="c(purple-600)" />
        <span class="font(sm) bold c(purple-600)">Get Started</span>
      </div>
      
      <h2 class="font(5xl) bold c(gray-900) mb(lg)">
        Start Creating Beautiful CSS
      </h2>
      <p class="font(xl) c(gray-600) container(md/px:0)">
        Join thousands of designers and developers using AdorableCSS
      </p>
    </div>
    
    <!-- Installation Steps -->
    <div class="steps grid grid-cols(3) gap(xl) mb(4xl)">
      <div class="step-card p(2xl) bg(white) r(xl) shadow(lg) hover:shadow(2xl) transition">
        <div class="step-number w(3xl) h(3xl) bg(purple-100) r(full) vbox(pack) mx(auto) mb(xl)">
          <span class="font(xl) bold c(purple-600)">1</span>
        </div>
        <h3 class="font(xl) bold c(gray-900) mb(md)">Install</h3>
        <div class="p(lg) bg(gray-50) r(lg) mb(lg)">
          <Code code="npm install adorable-css" language="bash" />
        </div>
        <p class="font(sm) c(gray-600)">Add to your project</p>
      </div>
      
      <div class="step-card p(2xl) bg(white) r(xl) shadow(lg) hover:shadow(2xl) transition">
        <div class="step-number w(3xl) h(3xl) bg(purple-100) r(full) vbox(pack) mx(auto) mb(xl)">
          <span class="font(xl) bold c(purple-600)">2</span>
        </div>
        <h3 class="font(xl) bold c(gray-900) mb(md)">Configure</h3>
        <div class="p(lg) bg(gray-50) r(lg) mb(lg)">
          <Code code="import 'adorable-css'" language="javascript" />
        </div>
        <p class="font(sm) c(gray-600)">Import in your app</p>
      </div>
      
      <div class="step-card p(2xl) bg(white) r(xl) shadow(lg) hover:shadow(2xl) transition">
        <div class="step-number w(3xl) h(3xl) bg(purple-100) r(full) vbox(pack) mx(auto) mb(xl)">
          <span class="font(xl) bold c(purple-600)">3</span>
        </div>
        <h3 class="font(xl) bold c(gray-900) mb(md)">Create</h3>
        <div class="p(lg) bg(gray-50) r(lg) mb(lg)">
          <Code code='class="vbox gap(lg)"' language="html" />
        </div>
        <p class="font(sm) c(gray-600)">Start building!</p>
      </div>
    </div>
    
    <!-- CTA Buttons -->
    <div class="cta-buttons hbox(pack) gap(lg)">
      <a href="/docs" class="hbox(middle) gap(sm) px(2xl) py(lg) bg(purple-600) c(white) r(xl) font(lg) semibold shadow(xl) hover:shadow(2xl) hover:scale(1.02) transition">
        <BookOpen size="20" />
        Read Documentation
      </a>
      <a href="/playground" class="hbox(middle) gap(sm) px(2xl) py(lg) bg(white) c(purple-600) r(xl) font(lg) semibold shadow(lg) hover:shadow(xl) transition">
        <Download size="20" />
        Try Playground
      </a>
    </div>
    
    <!-- Features List -->
    <div class="features-summary mt(5xl) grid grid-cols(4) gap(xl)">
      <div class="feature-item">
        <div class="font(4xl) mb(sm)">🎨</div>
        <h4 class="font(md) bold c(gray-900)">Figma Native</h4>
      </div>
      <div class="feature-item">
        <div class="font(4xl) mb(sm)">⚡</div>
        <h4 class="font(md) bold c(gray-900)">Zero Runtime</h4>
      </div>
      <div class="feature-item">
        <div class="font(4xl) mb(sm)">🌈</div>
        <h4 class="font(md) bold c(gray-900)">OKLCH Colors</h4>
      </div>
      <div class="feature-item">
        <div class="font(4xl) mb(sm)">✨</div>
        <h4 class="font(md) bold c(gray-900)">Beautiful Effects</h4>
      </div>
    </div>
  </div>
</section>

<style>
  .step-card {
    transition: all 0.3s ease;
  }
  
  .step-card:hover {
    transform: translateY(-4px);
  }
  
  .step-card:hover .step-number {
    transform: scale(1.1);
  }
  
  .step-number {
    transition: transform 0.3s ease;
  }
</style>