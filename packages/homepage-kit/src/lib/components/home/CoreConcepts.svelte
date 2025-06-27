<script lang="ts">
  import { Layers, Palette, Zap } from 'lucide-svelte';
</script>

<section class="features py(6xl) bg(gray-50)">
  <div class="container(4xl) px(lg) vbox gap(4xl)">
    <!-- Section Header -->
    <div class="vbox(center) text(center) gap(lg)">
      <h2 class="heading(h1/section) c(gray-900)">
        Why AdorableCSS Changes Everything
      </h2>
      <p class="font(lg) c(gray-600) container(2xl)">
        We solved the three biggest problems in CSS development: 
        <strong class="c(gray-900)">complex syntax</strong>, 
        <strong class="c(gray-900)">bad default design</strong>, and 
        <strong class="c(gray-900)">steep learning curves</strong>.
      </p>
    </div>
    
    <!-- Features -->
    <div class="grid grid-cols(1) md:grid-cols(3) gap(2xl)">
      <!-- Figma-Native -->
      <div class="card(interactive/lg) vbox(center) text(center) gap(lg)">
        <div class="w(80px) h(80px) bg(purple-100) r(full) vbox(pack)">
          <Layers size="40" class="c(purple-600)" />
        </div>
        <div class="vbox gap(md)">
          <h3 class="heading(h3)">Think Figma, Write Code</h3>
          <p class="font(md) c(gray-600)">
            <strong>Zero mental translation.</strong> If you can use Figma's Auto Layout, 
            you already know AdorableCSS. No learning curve for designers.
          </p>
        </div>
        <div class="card(flat) text(left) vbox gap(sm)">
          <div class="font(sm) c(gray-500)">Auto Layout → Horizontal</div>
          <code class="font(sm) c(purple-600) font-family(mono)">hbox(middle+between)</code>
        </div>
      </div>
      
      <!-- Design Tokens -->
      <div class="card(interactive/lg) vbox(center) text(center) gap(lg)">
        <div class="w(80px) h(80px) bg(pink-100) r(full) vbox(pack)">
          <Palette size="40" class="c(pink-600)" />
        </div>
        <div class="vbox gap(md)">
          <h3 class="heading(h3)">Design Tokens Made Simple</h3>
          <p class="font(md) c(gray-600)">
            <strong>Apple-quality defaults, your brand instantly.</strong> One CSS variable 
            rebrands your entire app. Beautiful design that scales with your company.
          </p>
        </div>
        <div class="card(flat) text(left) vbox gap(sm)">
          <div class="font(sm) c(gray-500)">Instant rebranding</div>
          <code class="font(sm) c(pink-600) font-family(mono)">--primary: #8b5cf6</code>
        </div>
      </div>
      
      <!-- Smart Design System -->
      <div class="card(interactive/lg) vbox(center) text(center) gap(lg)">
        <div class="w(80px) h(80px) bg(green-100) r(full) vbox(pack)">
          <Zap size="40" class="c(green-600)" />
        </div>
        <div class="vbox gap(md)">
          <h3 class="heading(h3)">Intelligence Built-In</h3>
          <p class="font(md) c(gray-600)">
            <strong>Components that adapt automatically.</strong> Spacing, colors, and proportions 
            follow design system principles. Good design happens without thinking.
          </p>
        </div>
        <div class="card(flat) text(left) vbox gap(sm)">
          <div class="font(sm) c(gray-500)">Smart components</div>
          <code class="font(sm) c(green-600) font-family(mono)">card() btn() heading()</code>
        </div>
      </div>
    </div>
    
    <!-- Live Example -->
    <div class="mt(4xl) text(center)">
      <div class="card(elevated/xl) container(3xl)">
        <h3 class="heading(h3) c(gray-900) ">The Proof: Same Beauty, 96% Less Code</h3>
        <div class="bg(gray-900) r(lg) p(xl) ">
          <pre class="font(sm/1.6) c(white) font-family(mono) text(left)"><code>{`// Old way: Complex CSS (15+ lines)
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 32px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  border-radius: 16px;
  box-shadow: 0 10px 15px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}
.container:hover { transform: scale(1.05); }

// AdorableCSS: Beautiful by default (1 line)
<div class="hbox(middle+between) gap(lg) p(2xl) 
           bg(135deg/purple-500,pink-500) r(xl) shadow(lg) 
           hover:scale(1.05) transition">`}</code></pre>
        </div>
        <div class="vbox gap(sm)">
          <p class="font(md) c(gray-600)">
            <strong class="c(gray-900)">Same professional result.</strong> 
            Perfect spacing, beautiful colors, smooth interactions—all automatic.
          </p>
          <p class="font(sm) c(purple-600) 600">
            💡 No design knowledge required. Just follow the syntax and get Apple-quality UI.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

