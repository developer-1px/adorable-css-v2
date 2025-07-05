<script lang="ts">
  import { Github, ArrowRight, MessageCircle, Users, Layers, Code, Palette, Grid } from 'lucide-svelte';
  import CodeBlock from '$lib/components/ui/CodeBlock.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import Button from '$lib/components/ui/Button.svelte';
</script>

<!-- Hero Section -->
<section class="relative min-h(100vh) vbox(center) bg(white)">
  <div class="container(6xl) mx(auto) px(2xl) py(8xl)">
    <div class="vbox(center) gap(6xl)">
      
      <!-- Main Heading -->
      <div class="vbox(center) gap(3xl) max-w(4xl)">
        <h1 class="heading(display/3xl) c(mute-900) leading(tight)">
          CSS Framework that Speaks
          <br />
          <span class="c(mute-600)">Figma Language</span>
        </h1>
        
        <p class="body(xl) c(mute-600) max-w(4xl)">
          Write CSS using the same terms designers use in Figma. 
          <span class="c(mute-900)">hbox(), gap(), w(fill)</span> — no translation needed.
        </p>
      </div>
      
      <!-- Simple Demo -->
      <div class="p(3xl) bg(mute-50) r(2xl) max-w(4xl)">
        <div class="vbox(center) gap(xl)">
          <div class="hbox(center) gap(2xl)">
            <div class="vbox(center) gap(sm)">
              <p class="caption c(mute-700)">Designer</p>
              <p class="body(lg) c(mute-900)">"hbox gap(16)"</p>
            </div>
            <ArrowRight size="24" class="c(mute-400)" />
            <div class="vbox(center) gap(sm)">
              <p class="caption c(mute-700)">Developer</p>
              <code class="code(lg) c(mute-900)">hbox gap(16)</code>
            </div>
          </div>
          <p class="caption c(mute-600)">Same language, perfect communication</p>
        </div>
      </div>
      
      <!-- CTA -->
      <div class="hbox(center) gap(lg)">
        <Button size="lg" variant="default">
          Try AdorableCSS
        </Button>
        <Button size="lg" variant="ghost">
          <div class="hbox(middle) gap(sm)">
            <Github size="20" />
            <span>GitHub</span>
          </div>
        </Button>
      </div>
      
    </div>
  </div>
</section>

<!-- Problem Section -->
<section class="bg(mute-50) py(6xl)">
  <div class="container(6xl) mx(auto) px(2xl)">
    <div class="vbox(center) gap(4xl)">
      
      <div class="vbox(center) gap(xl) max-w(4xl)">
        <h2 class="heading(h1) c(mute-900)">
          The Problem
        </h2>
        <p class="body(lg) c(mute-600)">
          Designer: "Auto Layout Horizontal, 16px gap"
          <br />
          Developer: "display: flex; gap: 1rem"
          <br />
          <span class="c(mute-900)">Same intention, different vocabulary.</span>
        </p>
      </div>
      
    </div>
  </div>
</section>

<!-- Solution Section -->
<section class="bg(white) py(6xl)">
  <div class="container(6xl) mx(auto) px(2xl)">
    <div class="vbox(center) gap(4xl)">
      
      <div class="vbox(center) gap(xl) max-w(4xl)">
        <h2 class="heading(h1) c(mute-900)">
          The Solution
        </h2>
        <p class="body(lg) c(mute-600)">
          Use the same terms in both design and code
        </p>
      </div>
      
      <!-- Simple Before/After -->
      <div class="grid(2) gap(2xl) max-w(4xl)">
        <div class="vbox(center) gap(lg) p(2xl) bg(mute-50) r(xl)">
          <h3 class="heading(h3) c(mute-900)">Before</h3>
          <div class="vbox(center) gap(md)">
            <p class="body(md) c(mute-700)">"Auto Layout Vertical"</p>
            <p class="caption c(mute-500)">↓ translation required</p>
            <code class="code(sm) c(mute-800)">display: flex; flex-direction: column;</code>
          </div>
        </div>
        
        <div class="vbox(center) gap(lg) p(2xl) bg(white) r(xl) border(2/mute-200)">
          <h3 class="heading(h3) c(mute-900)">AdorableCSS</h3>
          <div class="vbox(center) gap(md)">
            <p class="body(md) c(mute-700)">"vbox"</p>
            <p class="caption c(mute-500)">↓ same term</p>
            <code class="code(sm) c(mute-800)">vbox</code>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</section>

<!-- Features Section -->
<section class="bg(mute-50) py(6xl)">
  <div class="container(6xl) mx(auto) px(2xl)">
    <div class="vbox(center) gap(4xl)">
      
      <div class="vbox(center) gap(xl) max-w(4xl)">
        <h2 class="heading(h1) c(mute-900)">
          Core Features
        </h2>
      </div>
      
      <!-- Feature Grid -->
      <div class="grid(3) gap(xl) max-w(4xl)">
        <div class="vbox(center) gap(lg) p(xl) bg(white) r(lg)">
          <Grid size="32" class="c(mute-700)" />
          <h3 class="heading(h3) c(mute-900)">Figma Terms</h3>
          <p class="body(md) c(mute-600)">
            hbox(), vbox(), gap(), w(fill) — use the same words designers use
          </p>
        </div>
        
        <div class="vbox(center) gap(lg) p(xl) bg(white) r(lg)">
          <Palette size="32" class="c(mute-700)" />
          <h3 class="heading(h3) c(mute-900)">Design Tokens</h3>
          <p class="body(md) c(mute-600)">
            c(primary), gap(lg), heading(h1) — semantic tokens, not hex codes
          </p>
        </div>
        
        <div class="vbox(center) gap(lg) p(xl) bg(white) r(lg)">
          <Layers size="32" class="c(mute-700)" />
          <h3 class="heading(h3) c(mute-900)">Components</h3>
          <p class="body(md) c(mute-600)">
            btn(primary/lg), card(elevated) — describe what you want
          </p>
        </div>
      </div>
      
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="bg(mute-900) py(6xl)">
  <div class="container(5xl) mx(auto) px(2xl)">
    <div class="vbox(center) gap(4xl)">
      
      <div class="vbox(center) gap(xl) max-w(4xl)">
        <h2 class="heading(h1) c(white)">
          Start Using AdorableCSS
        </h2>
        <p class="body(lg) c(white.8)">
          Experience what it's like when designers and developers 
          finally speak the same language.
        </p>
      </div>
      
      <div class="hbox(center) gap(lg)">
        <Button size="lg" variant="secondary">
          Try AdorableCSS
        </Button>
        <Button size="lg" variant="ghost">
          <div class="hbox(middle) gap(sm) c(white)">
            <Github size="20" />
            <span>GitHub</span>
          </div>
        </Button>
      </div>
      
      <!-- Install -->
      <div class="p(xl) bg(white.1) r(lg) max-w(4xl)">
        <div class="vbox(center) gap(md)">
          <p class="caption c(white.7)">Install in 30 seconds</p>
          <code class="code(lg) c(white) bg(transparent)">npm install adorable-css</code>
        </div>
      </div>
      
    </div>
  </div>
</section>