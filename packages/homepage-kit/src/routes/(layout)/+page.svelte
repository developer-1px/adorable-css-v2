<script lang="ts">
  import { Github, ArrowRight, Zap, Layers, Code2, Sparkles, Wand2, BrainCircuit } from 'lucide-svelte';
  import Button from '$lib/components/ui/Button.svelte';
</script>

<!-- Hero Section -->
<section class="relative min-h(90vh) vbox(center) bg(white) overflow(hidden)">
  <!-- Background Gradients -->
  <div class="absolute top(-20%) left(-10%) size(800px) bg(indigo-500/10) r(full) blur(120px) pointer-events(none)"></div>
  <div class="absolute bottom(-10%) right(-5%) size(600px) bg(violet-500/10) r(full) blur(100px) pointer-events(none)"></div>

  <div class="w(full) max-w(1200px) mx(auto) px(xl) py(160px) relative z(10)">
    <div class="vbox(center) gap(64px)">
      
      <!-- Main Heading -->
      <div class="vbox(center) gap(32px) max-w(800px) text(center)">
        <div class="hbox(center) gap(sm) bg(gray-50) border(1/gray-200) px(md) py(xs) r(full)">
          <Sparkles size="14" class="c(indigo-600)" />
          <span class="text(sm) font(bold) c(gray-600)">v2.0 is mostly ready</span>
        </div>

        <h1 class="text(72px) font(black) tracking(tight) leading(1) c(gray-900)">
          CSS for the<br/>
          <span class="c(transparent) bg-clip(text) bg(linear-to-r/indigo-600..violet-600)">AI Age</span>
        </h1>
        
        <p class="text(20px) c(gray-500) leading(1.6) max-w(640px)">
          The first design-system engine built for LLMs and Humans.
          Stop translating design into code—just declare your <span class="c(gray-900) font(bold)">intent</span>.
        </p>

        <div class="hbox(center) gap(md) mt(lg)">
          <Button size="lg" class="h(56px) px(40px) r(full) text(18px) bg(gray-900) hover:bg(black) hover:scale(1.05) transition">
            Get Started
            <ArrowRight size="20" class="ml(sm)" />
          </Button>
          <Button variant="outline" size="lg" class="h(56px) px(32px) r(full) text(18px) border(1/gray-200) hover:bg(gray-50)">
            <Github size="20" class="mr(sm)" />
            GitHub
          </Button>
        </div>
      </div>

      <!-- Interactive Demo Preview (Static for now) -->
      <div class="w(full) max-w(900px) bg(gray-900) r(24px) border(1/gray-800) shadow(2xl) p(md) relative overflow(hidden)">
        <!-- Mock Window Controls -->
        <div class="hbox(middle) gap(sm) mb(lg) px(sm)">
          <div class="size(12) r(full) bg(red-500)"></div>
          <div class="size(12) r(full) bg(yellow-500)"></div>
          <div class="size(12) r(full) bg(green-500)"></div>
        </div>

        <div class="grid(1) md:grid-cols(2) gap(0) border-t(1/gray-800)">
          <!-- Code Side -->
          <div class="p(xl) vbox gap(lg) border-r(1/gray-800)">
            <div class="vbox gap(xs)">
              <div class="hbox(middle) gap(sm) mb(sm)">
                <BrainCircuit size="16" class="c(violet-400)" />
                <span class="text(xs) font(bold) uppercase c(gray-500) tracking(widest)">AI Prompt</span>
              </div>
              <p class="font(mono) text(sm) c(gray-300)">"Make a user card with an avatar and details"</p>
            </div>
            
            <div class="vbox gap(xs) mt(lg)">
               <div class="hbox(middle) gap(sm) mb(sm)">
                <Code2 size="16" class="c(indigo-400)" />
                <span class="text(xs) font(bold) uppercase c(gray-500) tracking(widest)">Generated Code</span>
              </div>
              <code class="font(mono) text(sm) c(indigo-300) leading(1.6)">
                &lt;div class="<span class="c(white) font(bold)">hbox gap(16) p(24) bg(white) r(xl)</span>"&gt;<br/>
                &nbsp;&nbsp;&lt;Avatar /&gt;<br/>
                &nbsp;&nbsp;&lt;div class="<span class="c(white) font(bold)">vbox gap(4)</span>"&gt;...&lt;/div&gt;<br/>
                &lt;/div&gt;
              </code>
            </div>
          </div>

          <!-- Preview Side -->
          <div class="p(xl) bg(gray-50/5) hbox(center middle)">
            <!-- Actual Rendered Component using AdorableCSS -->
            <div class="hbox gap(4) p(6) bg(white) r(xl) shadow(lg) w(full) max-w(320px)">
              <div class="size(48) r(full) bg(linear-to-br/indigo-500..violet-500)"></div>
              <div class="vbox gap(4)">
                <div class="w(120) h(16) bg(gray-200) r(sm)"></div>
                <div class="w(80) h(12) bg(gray-100) r(sm)"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  </div>
</section>

<!-- Values Section -->
<section class="py(120px) bg(gray-50)">
  <div class="w(full) max-w(1200px) mx(auto) px(xl)">
    <div class="grid(1) md:grid-cols(3) gap(32px)">
      
      <!-- Card 1 -->
      <div class="vbox gap(6) p(8) bg(white) r(6) border(1/gray-200) hover:shadow(xl) transition duration(500) hover:-translate-y(1)">
        <div class="size(56) r(4) bg(indigo-50) hbox(center) c(indigo-600)">
          <Wand2 size="28" />
        </div>
        <div class="vbox gap(3)">
          <h3 class="text(20px) font(bold) c(gray-900)">Hallucination-Free</h3>
          <p class="text(16px) c(gray-500) leading(1.6)">
            AI struggles with generic utility names. AdorableCSS provides semantic, unambiguous tokens that LLMs get right every time.
          </p>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="vbox gap(6) p(8) bg(white) r(6) border(1/gray-200) hover:shadow(xl) transition duration(500) hover:-translate-y(1)">
        <div class="size(56) r(4) bg(violet-50) hbox(center) c(violet-600)">
          <Layers size="28" />
        </div>
        <div class="vbox gap(3)">
          <h3 class="text(20px) font(bold) c(gray-900)">Figma-Native</h3>
          <p class="text(16px) c(gray-500) leading(1.6)">
            Stop translating "Auto Layout" to "Flexbox". Use the same vocabulary your designers use: <code class="bg(gray-100) px(6px) py(2px) r(md) text(xs)">hbox</code>, <code class="bg(gray-100) px(6px) py(2px) r(md) text(xs)">gap</code>, <code class="bg(gray-100) px(6px) py(2px) r(md) text(xs)">fill</code>.
          </p>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="vbox gap(6) p(8) bg(white) r(6) border(1/gray-200) hover:shadow(xl) transition duration(500) hover:-translate-y(1)">
        <div class="size(56) r(4) bg(emerald-50) hbox(center) c(emerald-600)">
          <Zap size="28" />
        </div>
        <div class="vbox gap(3)">
          <h3 class="text(20px) font(bold) c(gray-900)">Zero Runtime</h3>
          <p class="text(16px) c(gray-500) leading(1.6)">
            Write with the speed of dynamic styles, ship with the performance of static CSS. It's the best of both worlds.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- Manifesto / Philosophy -->
<section class="py(120px) bg(white)">
  <div class="w(full) max-w(800px) mx(auto) px(xl) text(center)">
    <h2 class="text(40px) font(bold) c(gray-900) mb(24px)">Intent over Implementation</h2>
    <p class="text(20px) c(gray-600) leading(1.8)">
      Traditional CSS was built for documents. Modern tools like Tailwind brought utilities, but they still map 1:1 to CSS properties.
      <br/><br/>
      <strong>AdorableCSS is different.</strong> It's built for <span class="c(indigo-600) font(bold)">UI Design Intent</span>. 
      When you say <code class="c(indigo-600)">hbox</code>, you mean "horizontal layout", not "display: flex; flex-direction: row". 
      By raising the abstraction level, we make code more readable for humans and more writable for AI.
    </p>
  </div>
</section>

<!-- Footer Simple -->
<footer class="py(64px) border-t(1/gray-100) bg(white)">
  <div class="text(center) c(gray-400) text(sm)">
    &copy; 2026 AdorableCSS. Open Source.
  </div>
</footer>