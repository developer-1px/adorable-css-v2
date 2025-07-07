<script lang="ts">
  import { Github, ArrowRight, Play, Star, Users } from 'lucide-svelte';
</script>

<!-- Hero Section - Bold Minimal -->
<section class="relative min-h(100vh) vbox(center) bg(white)">
  <div class="container(5xl) mx(auto) px(3xl) py(8xl)">
    <div class="vbox(center) gap(8xl) max-w(5xl)">
      
      <!-- Power Statement -->
      <div class="vbox(center) gap(2xl)">
        <div class="px(lg) py(sm) bg(gray-900) c(white) r(full) label(sm) bold(600)">
          Figma-First CSS Framework
        </div>
        
        <h1 class="display(4xl) c(gray-900) bold(900) leading(0.9) text(center) tracking(-0.02em)">
          Write CSS the way<br/>
          you think in Figma
        </h1>
        
        <p class="body(2xl) c(gray-600) max-w(3xl) text(center) leading(1.4)">
          Same language. Zero translation.<br/>
          <span class="c(gray-900) bold(600)">80% less code</span> than traditional CSS.
        </p>
      </div>
      
      <!-- Live Demo -->
      <div class="w(full) max-w(4xl) bg(gray-50) r(2xl) p(4xl)">
        <div class="vbox gap(3xl)">
          <!-- Input -->
          <div class="vbox gap(lg)">
            <div class="hbox(middle) gap(md)">
              <div class="size(8) bg(red-500) r(full)"></div>
              <span class="caption c(gray-600) bold(600)">FIGMA DESIGN</span>
            </div>
            <p class="body(xl) c(gray-900)">"Auto Layout Vertical, 24px gap, center aligned"</p>
          </div>
          
          <!-- Arrow -->
          <div class="hbox(center)">
            <ArrowRight size="32" class="c(gray-400)" />
          </div>
          
          <!-- Output -->
          <div class="vbox gap(lg)">
            <div class="hbox(middle) gap(md)">
              <div class="size(8) bg(green-500) r(full)"></div>
              <span class="caption c(gray-600) bold(600)">ADORABLE CSS</span>
            </div>
            <div class="p(2xl) bg(gray-900) r(xl)">
              <code class="code(xl) c(green-400) bold(600)">vbox(center) gap(24)</code>
            </div>
          </div>
        </div>
      </div>
      
      <!-- CTA -->
      <div class="vbox(center) gap(xl)">
        <div class="hbox(center) gap(lg)">
          <a href="/playground" class="px(3xl) py(lg) bg(gray-900) c(white) r(xl) label(lg) bold(600) hover:bg(gray-800) transition">
            Try Now
          </a>
          <a href="https://github.com/adorablecss/adorable-css" class="hbox(middle) gap(sm) px(3xl) py(lg) border(2/gray-200) c(gray-700) r(xl) label(lg) bold(600) hover:border(gray-300) transition">
            <Github size="20" />
            <span>GitHub</span>
          </a>
        </div>
        
        <!-- Stats -->
        <div class="hbox(center) gap(2xl) mt(xl)">
          <div class="hbox(middle) gap(sm)">
            <Star size="16" class="c(yellow-500)" />
            <span class="caption c(gray-600)">2.3k stars</span>
          </div>
          <div class="hbox(middle) gap(sm)">
            <Users size="16" class="c(blue-500)" />
            <span class="caption c(gray-600)">10k+ developers</span>
          </div>
          <div class="hbox(middle) gap(sm)">
            <div class="size(4) bg(green-500) r(full)"></div>
            <span class="caption c(gray-600)">Zero runtime</span>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</section>

<!-- The Gap Section -->
<section class="bg(gray-900) py(8xl)">
  <div class="container(5xl) mx(auto) px(3xl)">
    <div class="vbox(center) gap(6xl)">
      
      <div class="vbox(center) gap(2xl) max-w(4xl)">
        <h2 class="heading(display/2xl) c(white) bold(800) text(center) leading(1.1)">
          The 20-year gap between<br/>
          design tools and CSS
        </h2>
        <p class="body(xl) c(gray-400) text(center) leading(1.5)">
          CSS was built for documents. Figma was built for interfaces.<br/>
          AdorableCSS bridges this fundamental disconnect.
        </p>
      </div>
      
      <!-- Before/After Comparison -->
      <div class="grid(2) gap(3xl) max-w(5xl)">
        <!-- Before -->
        <div class="vbox gap(2xl) p(3xl) bg(red-500.1) border(1/red-500.3) r(2xl)">
          <div class="hbox(middle) gap(md)">
            <div class="size(8) bg(red-500) r(full)"></div>
            <span class="caption c(red-400) bold(700) tracking(0.1em)">BEFORE</span>
          </div>
          
          <div class="vbox gap(lg)">
            <p class="body(lg) c(white) bold(600)">"Auto Layout Vertical, 16px gap"</p>
            <div class="h(1) bg(red-500.3)"></div>
            <p class="caption c(red-300)">MENTAL TRANSLATION</p>
            <div class="h(1) bg(red-500.3)"></div>
            <div class="p(lg) bg(gray-800) r(lg)">
              <code class="code(sm) c(red-300)">
                display: flex;<br/>
                flex-direction: column;<br/>
                gap: 1rem;
              </code>
            </div>
          </div>
        </div>
        
        <!-- After -->
        <div class="vbox gap(2xl) p(3xl) bg(green-500.1) border(1/green-500.3) r(2xl)">
          <div class="hbox(middle) gap(md)">
            <div class="size(8) bg(green-500) r(full)"></div>
            <span class="caption c(green-400) bold(700) tracking(0.1em)">ADORABLE CSS</span>
          </div>
          
          <div class="vbox gap(lg)">
            <p class="body(lg) c(white) bold(600)">"Auto Layout Vertical, 16px gap"</p>
            <div class="h(1) bg(green-500.3)"></div>
            <p class="caption c(green-300)">DIRECT TRANSLATION</p>
            <div class="h(1) bg(green-500.3)"></div>
            <div class="p(lg) bg(gray-800) r(lg)">
              <code class="code(sm) c(green-300)">
                vbox gap(16)
              </code>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</section>

<!-- Impact Section -->
<section class="bg(white) py(8xl)">
  <div class="container(5xl) mx(auto) px(3xl)">
    <div class="vbox(center) gap(6xl)">
      
      <h2 class="heading(display/2xl) c(gray-900) bold(800) text(center) max-w(4xl) leading(1.1)">
        The impact on your team
      </h2>
      
      <!-- Impact Grid -->
      <div class="grid(3) gap(3xl) max-w(6xl)">
        <div class="vbox(center) gap(xl) text(center)">
          <div class="heading(display/3xl) c(blue-600) bold(900)">80%</div>
          <p class="body(lg) c(gray-900) bold(600)">Less code to write</p>
          <p class="body(md) c(gray-600)">Same visual result, dramatically less CSS</p>
        </div>
        
        <div class="vbox(center) gap(xl) text(center)">
          <div class="heading(display/3xl) c(green-600) bold(900)">50%</div>
          <p class="body(lg) c(gray-900) bold(600)">Faster development</p>
          <p class="body(md) c(gray-600)">Design-to-code cycle acceleration</p>
        </div>
        
        <div class="vbox(center) gap(xl) text(center)">
          <div class="heading(display/3xl) c(purple-600) bold(900)">0</div>
          <p class="body(lg) c(gray-900) bold(600)">Runtime overhead</p>
          <p class="body(md) c(gray-600)">Pure CSS output, zero JavaScript</p>
        </div>
      </div>
      
    </div>
  </div>
</section>

<!-- Get Started Section -->
<section class="bg(gray-50) py(8xl)">
  <div class="container(4xl) mx(auto) px(3xl)">
    <div class="vbox(center) gap(6xl)">
      
      <div class="vbox(center) gap(2xl)">
        <h2 class="heading(display/2xl) c(gray-900) bold(800) text(center) leading(1.1)">
          Start in 30 seconds
        </h2>
        <p class="body(xl) c(gray-600) text(center)">
          No complex setup. No learning curve if you know Figma.
        </p>
      </div>
      
      <!-- Install -->
      <div class="w(full) max-w(3xl) p(3xl) bg(gray-900) r(2xl)">
        <div class="vbox gap(xl)">
          <div class="hbox(middle) gap(md)">
            <div class="size(8) bg(green-500) r(full)"></div>
            <span class="caption c(gray-400) bold(600)">INSTALL</span>
          </div>
          <code class="code(2xl) c(green-400) bold(600)">npm install adorable-css</code>
        </div>
      </div>
      
      <!-- CTA -->
      <div class="vbox(center) gap(lg)">
        <a href="/playground" class="px(4xl) py(xl) bg(gray-900) c(white) r(2xl) heading(h1) bold(700) hover:bg(gray-800) transition text(center)">
          Try AdorableCSS Now
        </a>
        <p class="caption c(gray-500)">No signup required • Works in any framework</p>
      </div>
      
    </div>
  </div>
</section>