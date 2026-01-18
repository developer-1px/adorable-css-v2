<script lang="ts">
  import { Github, ArrowRight, Zap, Layers, Code2, Sparkles, Wand2, BrainCircuit, Play, Component } from 'lucide-svelte';
  import Button from '$lib/components/ui/Button.svelte';
</script>

<!-- Hero Section -->
<section class="relative min-h(92vh) vbox(center) bg(white) overflow(hidden)">
  <!-- Background Gradients -->
  <div class="absolute top(-200px) left(10%) size(800px) bg(indigo-600/10) r(full) blur(140px) pointer-events(none) animate(pulse-slow)"></div>
  <div class="absolute bottom(-100px) right(-10%) size(900px) bg(violet-600/10) r(full) blur(160px) pointer-events(none) animate(pulse-slow) animation-delay(2s)"></div>
  <div class="absolute top(40%) left(40%) size(400px) bg(fuchsia-400/10) r(full) blur(100px) pointer-events(none)"></div>

  <div class="w(full) max-w(1440px) mx(auto) px(xl) pt(180px) pb(120px) relative z(10)">
    <div class="vbox(center) gap(80px)">
      
      <!-- Main Heading Area -->
      <div class="vbox(center) gap(32px) max-w(960px) text(center)">
        
        <!-- Badge -->
        <a href="/docs/getting-started" class="group hbox(middle) gap(sm) bg(white) border(1/gray-200) hover:border(indigo-200) pl(4px) pr(lg) py(4px) r(full) shadow(sm) hover:shadow(md) transition mb(lg)">
          <div class="bg(indigo-600) c(white) px(sm) py(2px) r(full) text(xs) font(bold) uppercase tracking(wide)">New</div>
          <span class="text(sm) font(medium) c(gray-600) group-hover:c(gray-900)">v2.0 Beta is now public</span>
          <ArrowRight size="14" class="c(gray-400) group-hover:c(indigo-600) group-hover:translate-x(2px) transition" />
        </a>

        <h1 class="text(64px) sm:text(80px) lg:text(96px) font(black) tracking(tighter) leading(0.95) c(gray-900)">
          Styling for the<br/>
          <span class="bg(clip-text) c(transparent) bg(linear-to-r/indigo-600..fuchsia-500..violet-600) animate(gradient-x)">Intelligence Age</span>
        </h1>
        
        <p class="text(20px) sm:text(24px) c(gray-500) leading(1.5) max-w(720px) font(medium)">
          The first design engine built for LLMs and Humans.
          <br class="hidden sm:block" />
          Stop writing styles—declare your <span class="c(gray-900) font(bold)">intent</span>.
        </p>

        <div class="hbox(center) gap(md) mt(lg) wrap">
          <Button size="xl" class="h(64px) px(48px) r(full) text(18px) font(bold) bg(gray-900) hover:bg(black) hover:scale(1.05) transition shadow(xl) shadow(indigo-500/20)">
            Get Started
            <ArrowRight size="20" class="ml(sm)" />
          </Button>
          
          <Button variant="outline" size="xl" class="h(64px) px(40px) r(full) text(18px) font(bold) bg(white) border(1/gray-200) hover:bg(gray-50) hover:border(gray-300) c(gray-700)">
            <Github size="20" class="mr(sm)" />
            Star on GitHub
          </Button>
        </div>
        
        <!-- Social Proof / Tech Stack -->
        <div class="mt(2xl) pt(xl) border-t(1/gray-100) w(200px)"></div>
        <div class="vbox(center) gap(md)">
           <div class="text(xs) font(bold) uppercase tracking(widest) c(gray-400)">Works perfectly with</div>
           <div class="hbox(middle) gap(xl) opacity(60) grayscale hover:grayscale(0) transition duration(500)">
             <!-- Simple text fallback for icons if not available, usually SVGs would go here -->
             <span class="font(bold) c(gray-800)">Svelte</span>
             <span class="font(bold) c(gray-800)">React</span>
             <span class="font(bold) c(gray-800)">Vue</span>
             <span class="font(bold) c(gray-800)">Solid</span>
           </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- Demo Section (Floating Interface) -->
<section class="relative z(20) -mt(80px) pb(120px) overflow(hidden)">
  <div class="w(full) max-w(1200px) mx(auto) px(lg)">
    <div class="relative bg(gray-900) r(32px) border(1/gray-800) shadow(0px_40px_100px_-20px_rgba(0,0,0,0.5)) p(xs) overflow(hidden)">
      
      <!-- Glow effect behind -->
      <div class="absolute top(-50%) left(20%) w(60%) h(full) bg(indigo-500/20) blur(120px) pointer-events(none)"></div>
      
      <!-- Browser chrome -->
      <div class="hbox(middle) gap(sm) px(xl) py(lg) border-b(1/white/5) bg(white/2)">
         <div class="hbox gap(8px)">
           <div class="size(12) r(full) bg(red-500/80)"></div>
           <div class="size(12) r(full) bg(yellow-500/80)"></div>
           <div class="size(12) r(full) bg(green-500/80)"></div>
         </div>
         <div class="mx(auto) bg(black/40) px(lg) py(xs) r(md) w(400px) text(xs) c(gray-500) text(center) font(mono) border(1/white/5)">
           adhoc-bounty.app
         </div>
      </div>

      <!-- Split View -->
      <div class="grid(1) lg:grid-cols(2) gap(0) min-h(500px)">
        <!-- Code Editor -->
        <div class="relative p(2xl) bg(black/40) backdrop-blur(sm) font(mono) text(14px) leading(1.6)">
           <div class="absolute top(xl) right(xl) text(xs) font(bold) uppercase c(white/20) tracking(widest)">Source</div>
           
           <div class="vbox gap(2xl)">
             <!-- Code Block 1 -->
             <div class="group">
               <div class="text(xs) c(indigo-400) mb(xs)">// 1. Semantic Layout</div>
               <div class="pl(md) border-l(2/white/10) group-hover:border-indigo-500 transition">
                 <span class="c(purple-300)">&lt;div class</span>=<span class="c(green-300)">"hbox(between) p(xl) bg(white) shadow(lg) r(2xl)"</span><span class="c(purple-300)">&gt;</span>
               </div>
             </div>

             <!-- Code Block 2 -->
             <div class="group">
               <div class="text(xs) c(indigo-400) mb(xs)">// 2. Natural Syntax</div>
               <div class="pl(md) border-l(2/white/10) group-hover:border-indigo-500 transition">
                 <span class="c(purple-300)">&lt;h1 class</span>=<span class="c(green-300)">"text(4xl) font(black) c(gradient-brand)"</span><span class="c(purple-300)">&gt;</span><br/>
                 &nbsp;&nbsp;Hello World<br/>
                 <span class="c(purple-300)">&lt;/h1&gt;</span>
               </div>
             </div>
             
             <!-- Code Block 3 -->
             <div class="group">
               <div class="text(xs) c(indigo-400) mb(xs)">// 3. Conditional Logic</div>
               <div class="pl(md) border-l(2/white/10) group-hover:border-indigo-500 transition">
                 <span class="c(purple-300)">&lt;button class</span>=<span class="c(green-300)">"hover:scale(1.1) active:scale(0.95)"</span><span class="c(purple-300)">&gt;</span>
               </div>
             </div>
           </div>
        </div>

        <!-- Preview -->
        <div class="relative bg(gray-100) p(2xl) hbox(center middle) overflow(hidden)">
           <!-- Grid Pattern -->
           <div class="absolute inset(0) bg-grid-gray-200/50 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
           
           <!-- The actual rendered output -->
           <div class="relative w(full) max-w(380px)">
              <div class="bg(white) p(6) r(24px) shadow(2xl) shadow(indigo-500/10) border(1/white) vbox gap(6)">
                 <!-- User Header -->
                 <div class="hbox(middle) gap(4)">
                    <div class="size(12) r(full) bg(linear-to-tr/indigo-400..violet-500)"></div>
                    <div class="vbox">
                       <div class="w(24) h(4) bg(gray-900) r(full) mb(1.5)"></div>
                       <div class="w(16) h(3) bg(gray-200) r(full)"></div>
                    </div>
                    <div class="spacer"></div>
                    <div class="size(8) r(full) bg(gray-50) hover:bg(gray-100) icon-center c(gray-400)">
                       <div class="size(1) bg(currentColor) r(full)"></div>
                    </div>
                 </div>
                 
                 <!-- Main Image area -->
                 <div class="aspect(4/3) bg(gray-50) r(xl) vbox(center middle) border(2/dashed/gray-200) relative overflow(hidden) group">
                    <div class="absolute inset(0) bg(linear-to-br/indigo-50..violet-50) opacity(0) group-hover:opacity(100) transition duration(500)"></div>
                    <Sparkles size="32" class="c(gray-300) group-hover:c(indigo-400) group-hover:scale(1.2) transition duration(500)" />
                 </div>

                 <!-- Action Bar -->
                 <div class="hbox(between) pt(2)">
                    <div class="hbox gap(2)">
                       <div class="h(8) w(20) bg(gray-100) r(full)"></div>
                       <div class="h(8) w(12) bg(gray-100) r(full)"></div>
                    </div>
                    <button class="bg(gray-900) hover:bg(indigo-600) c(white) px(5) py(2) r(full) text(xs) font(bold) transition hover:shadow(lg) hover:shadow(indigo-500/30) hover:-translate-y(0.5)">
                       Generate
                    </button>
                 </div>
              </div>

              <!-- Floating Tooltips/Indicators representing generic design tokens -->
              <div class="absolute -right(12) top(20) bg(gray-900) c(white) px(3) py(1) r(md) text(xs) font(mono) shadow(lg) animate(bounce-slow)">
                 p(6)
              </div>
              <div class="absolute -left(4) bottom(32) bg(indigo-600) c(white) px(3) py(1) r(md) text(xs) font(mono) shadow(lg) animate(bounce-slow) animation-delay(1s)">
                 shadow(2xl)
              </div>
           </div>

        </div>
      </div>
    </div>
  </div>
</section>

<!-- Values / Bento Grid -->
<section class="py(120px) bg(gray-50)">
  <div class="w(full) max-w(1200px) mx(auto) px(xl)">
    <div class="text(center) max-w(700px) mx(auto) mb(80px)">
      <h2 class="text(40px) font(black) tracking(tight) c(gray-900) mb(lg)">
        Why we built this.
      </h2>
      <p class="text(xl) c(gray-500)">
        We reimagined CSS to be cleaner for humans and unambiguous for machines. 
        It's not just a utility library; it's a language.
      </p>
    </div>

    <div class="grid(1) md:grid-cols(3) gap(24px)">
      
      <!-- Card 1: Hallucination Free -->
      <div class="md:col-span(2) group relative bg(white) r(32px) border(1/gray-200) p(40px) overflow(hidden) hover:shadow(2xl) hover:border(indigo-200) transition duration(500)">
         <div class="relative z(10) max-w(400px)">
           <div class="s(64) r(20px) bg(indigo-50) c(indigo-600) hbox(center) mb(32px)">
             <Wand2 size="32" strokeWidth={2.5} />
           </div>
           <h3 class="text(28px) font(bold) c(gray-900) mb(sm)">Hallucination-Free AI</h3>
           <p class="text(18px) c(gray-500) leading(1.6)">
             LLMs struggle with names like <code class="text(sm) bg(gray-100) px(1) r(sm)">flex-row-reverse</code>. AdorableCSS uses semantic, predictable tokens like <code class="text(sm) bg(indigo-50) c(indigo-700) px(1) r(sm)">hbox(reverse)</code> that AI guesses right 99% of the time.
           </p>
         </div>
         <!-- Decorative -->
         <div class="absolute right(0) top(0) bottom(0) w(240px) bg(gradient-to-l/white..transparent) z(5)"></div>
         <div class="absolute -right(20px) top(50%) -translate-y(50%) opacity(10) group-hover:opacity(20) transition duration(500) font(mono) text(xs) c(indigo-600) whitespace-pre leading(1.2)">
            hbox(top) vbox(center) text(center)
            bg(white) c(gray-900) border(1/gray)
            absolute top(0) left(0) w(full)
            hbox(top) vbox(center) text(center)
            bg(white) c(gray-900) border(1/gray)
         </div>
      </div>

      <!-- Card 2: Figma Native -->
      <div class="bg(white) r(32px) border(1/gray-200) p(40px) hover:shadow(2xl) hover:border(violet-200) transition duration(500) group">
        <div class="s(64) r(20px) bg(violet-50) c(violet-600) hbox(center) mb(32px)">
           <Layers size="32" strokeWidth={2.5} />
        </div>
        <h3 class="text(28px) font(bold) c(gray-900) mb(sm)">Figma Native</h3>
        <p class="text(18px) c(gray-500) leading(1.6)">
          Use the same vocabulary as your design tools. <span class="font(bold) c(gray-900)">Auto Layout</span> becomes real code.
        </p>
      </div>

      <!-- Card 3: Zero Runtime -->
      <div class="bg(white) r(32px) border(1/gray-200) p(40px) hover:shadow(2xl) hover:border(emerald-200) transition duration(500)">
         <div class="s(64) r(20px) bg(emerald-50) c(emerald-600) hbox(center) mb(32px)">
           <Zap size="32" strokeWidth={2.5} />
         </div>
         <h3 class="text(28px) font(bold) c(gray-900) mb(sm)">Zero Runtime</h3>
         <p class="text(18px) c(gray-500) leading(1.6)">
           All the DX of CSS-in-JS, none of the cost. Compiles to atomic, static CSS.
         </p>
      </div>

      <!-- Card 4: Developer Experience -->
      <div class="md:col-span(2) bg(gray-900) r(32px) p(40px) relative overflow(hidden) group">
         <div class="relative z(10) hbox(between bottom) h(full)">
           <div class="max-w(400px)">
             <h3 class="text(28px) font(bold) c(white) mb(sm)">DX First</h3>
             <p class="text(18px) c(gray-300) leading(1.6)">
               Type-safe, auto-completable, and designed for speed. You'll never generic atomic classes again.
             </p>
           </div>
           <div class="s(64) r(full) bg(white/10) c(white) hbox(center) group-hover:bg(white) group-hover:c(gray-900) transition duration(300)">
              <ArrowRight size="32" />
           </div>
         </div>
         
         <!-- Background Grid -->
         <div class="absolute inset(0) opacity(20)">
            <svg width="100%" height="100%">
               <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="0.5"/>
               </pattern>
               <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
         </div>
      </div>

    </div>
  </div>
</section>

<!-- Call to Action -->
<section class="py(160px) bg(white) relative overflow(hidden)">
  <div class="absolute inset(0) bg(linear-to-b/transparent..gray-50)"></div>
  <div class="absolute top(0) left(50%) -translate-x(50%) size(1000px) bg(indigo-500/5) r(full) blur(100px) pointer-events(none)"></div>

  <div class="w(full) max-w(800px) mx(auto) px(xl) text(center) relative z(10)">
    <div class="inline-block mb(xl) p(12px) bg(white) r(20px) shadow(xl) border(1/gray-100) rotate(-6deg) hover:rotate(0) transition duration(500)">
       <Play size="48" class="c(indigo-600) fill(indigo-100)" />
    </div>

    <h2 class="text(56px) font(black) tracking(tighter) c(gray-900) mb(24px) leading(1)">
      Ready to move fast?
    </h2>
    <p class="text(24px) c(gray-500) leading(1.6) mb(48px)">
      Join the future of styling. Open source and free forever.
    </p>

    <div class="hbox(center) gap(md) mt(lg) wrap">
      <a href="/docs/getting-started" class="bg(indigo-600) hover:bg(indigo-700) c(white) px(48px) py(20px) r(full) text(xl) font(bold) shadow(xl) shadow(indigo-500/30) hover:scale(1.05) transition text(none) hbox(center) gap(3)">
        Get Started Now
      </a>
    </div>
  </div>
</section>

<!-- Footer -->
<footer class="py(80px) border-t(1/gray-100) bg(white)">
  <div class="max-w(1200px) mx(auto) px(xl) hbox(between top) wrap gap(xl)">
    <div class="vbox gap(md) max-w(300px)">
      <div class="hbox(middle) gap(sm)">
        <div class="size(24) bg(gray-900) r(6px)"></div>
        <span class="font(bold) text(lg)">AdorableCSS</span>
      </div>
      <p class="text(sm) c(gray-500) leading(1.6)">
        The design engine for the AI era. Open source.
      </p>
      <div class="text(sm) c(gray-400)">
        &copy; 2026 AdorableCSS
      </div>
    </div>

    <div class="hbox gap(64px)">
      <div class="vbox gap(lg)">
        <h4 class="font(bold) c(gray-900)">Resources</h4>
        <a href="/docs" class="text(sm) c(gray-500) hover:c(indigo-600) text(none)">Documentation</a>
        <a href="/reference" class="text(sm) c(gray-500) hover:c(indigo-600) text(none)">Reference</a>
        <a href="/showcase" class="text(sm) c(gray-500) hover:c(indigo-600) text(none)">Showcase</a>
      </div>
      
      <div class="vbox gap(lg)">
        <h4 class="font(bold) c(gray-900)">Project</h4>
        <a href="https://github.com/adorablecss/adorable-css" class="text(sm) c(gray-500) hover:c(indigo-600) text(none)">GitHub</a>
        <a href="https://npmjs.org/adorable-css" class="text(sm) c(gray-500) hover:c(indigo-600) text(none)">NPM</a>
        <a href="/license" class="text(sm) c(gray-500) hover:c(indigo-600) text(none)">License</a>
      </div>
    </div>
  </div>
</footer>