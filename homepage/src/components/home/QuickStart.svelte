<script lang="ts">
  import Code from '../Code.svelte';
  import GradientButton from '../brand/GradientButton.svelte';
  import GlassCard from '../brand/GlassCard.svelte';
  import { Terminal, Package, Code2, Sparkles, Zap, Palette, Heart } from 'lucide-svelte';
  
  const steps = [
    {
      icon: Package,
      title: 'Install',
      code: 'npm install adorable-css',
      language: 'bash',
      description: 'Add to your project in seconds'
    },
    {
      icon: Code2,
      title: 'Import',
      code: "import 'adorable-css'",
      language: 'javascript',
      description: 'Zero configuration needed'
    },
    {
      icon: Sparkles,
      title: 'Create',
      code: 'class="bg(purple-400..pink-400/135deg)"',
      language: 'html',
      description: 'Start building beautiful UIs'
    }
  ];
  
  const features = [
    { icon: '🎨', title: 'Figma Native', description: 'Design concepts as code' },
    { icon: '⚡', title: 'Lightning Fast', description: 'Zero runtime overhead' },
    { icon: '🌈', title: 'OKLCH Colors', description: 'Perfect gradients always' },
    { icon: '✨', title: 'Modern Effects', description: 'Glassmorphism & more' }
  ];
</script>

<section class="quick-start relative py(6xl) overflow(hidden)">
  <!-- Background -->
  <div class="absolute inset(0) bg(gradient-to-b/purple-50/5/transparent) pointer-events(none)"></div>
  
  <div class="container(xl) relative z(10)">
    <!-- Section Header -->
    <div class="text(center) mb(5xl)">
      <div class="inline-block mb(xl)">
        <div class="px(xl) py(md) bg(gradient-adorable) r(full) shadow(lg) inline-flex(middle) gap(sm)">
          <Terminal size="20" class="c(white)" />
          <span class="font(sm) 700 c(white) uppercase tracking(wider)">Quick Start</span>
        </div>
      </div>
      
      <h2 class="brand-heading font(6xl) mb(xl) c(gray-900)">
        From Zero to <span class="gradient-text">Beautiful</span>
      </h2>
      <p class="font(xl) c(gray-600) container(3xl/px:0) leading(relaxed)">
        Get up and running with AdorableCSS in less than 60 seconds. 
        No complex setup, no configuration hassles.
      </p>
    </div>
    
    <!-- Installation Steps -->
    <div class="grid grid-cols(1) md:grid-cols(3) gap(xl) mb(5xl)">
      {#each steps as step, i}
        <div class="opacity(0)" style="animation: slide-up 0.6s var(--ease-out-expo) {0.2 + i * 0.1}s forwards">
          <GlassCard hover>
            <div class="vbox gap(xl) text(center)">
              <!-- Step Number -->
              <div class="relative mx(auto)">
                <div class="w(80px) h(80px) r(full) bg(gradient-adorable) opacity(10) absolute -top(10px) -left(10px) blur(30px)"></div>
                <div class="w(60px) h(60px) r(full) bg(gradient-adorable) vbox(center) relative">
                  <span class="font(2xl) 800 c(white)">{i + 1}</span>
                </div>
              </div>
              
              <!-- Content -->
              <div>
                <h3 class="font(xl) 700 c(gray-900) mb(sm)">{step.title}</h3>
                <p class="font(sm) c(gray-600) mb(lg)">{step.description}</p>
              </div>
              
              <!-- Code -->
              <div class="bg(gray-900) r(lg) p(lg) relative overflow(hidden) group">
                <code class="font(sm) c(white) font-family(mono)">{step.code}</code>
                <div class="absolute top(sm) right(sm) opacity(0) group-hover:opacity(100) transition">
                  <button class="px(sm) py(xs) bg(white/20) backdrop-blur(sm) r(md) font(xs) c(white) 600">
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      {/each}
    </div>
    
    <!-- Live Demo -->
    <div class="mb(5xl) opacity(0)" style="animation: slide-up 0.6s var(--ease-out-expo) 0.5s forwards">
      <GlassCard padding="3xl">
        <div class="text(center) mb(3xl)">
          <h3 class="font(2xl) 700 c(gray-900) mb(md)">See It In Action</h3>
          <p class="c(gray-600)">This entire page is built with AdorableCSS</p>
        </div>
        
        <div class="grid grid-cols(1) md:grid-cols(2) gap(2xl)">
          <!-- Code Example -->
          <div>
            <h4 class="font(md) 600 c(gray-700) mb(lg)">Write this:</h4>
            <div class="bg(gray-900) r(lg) p(xl) overflow(x-auto)">
              <Code code={`<div class="
  vbox(center) gap(xl) p(3xl)
  bg(purple-400..pink-400/135deg)
  r(2xl) shadow(2xl)
  hover:scale(1.05) transition
">
  <Heart size="48" class="c(white)" />
  <h2 class="font(2xl) 700 c(white)">
    Made with Love
  </h2>
</div>`} />
            </div>
          </div>
          
          <!-- Live Preview -->
          <div>
            <h4 class="font(md) 600 c(gray-700) mb(lg)">Get this:</h4>
            <div class="h(full) vbox(center)">
              <div class="vbox(center) gap(xl) p(3xl) bg(purple-400..pink-400/135deg) r(2xl) shadow(2xl) hover:scale(1.05) transition cursor(pointer)">
                <Heart size="48" class="c(white)" fill="white" />
                <h2 class="font(2xl) 700 c(white)">Made with Love</h2>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
    
    <!-- CTA Section -->
    <div class="text(center) opacity(0)" style="animation: slide-up 0.6s var(--ease-out-expo) 0.6s forwards">
      <div class="mb(3xl)">
        <h3 class="font(3xl) 700 c(gray-900) mb(lg)">Ready to Transform Your CSS Experience?</h3>
        <p class="font(lg) c(gray-600)">Join thousands of developers building beautiful interfaces</p>
      </div>
      
      <div class="hbox(center) gap(lg) flex-wrap mb(4xl)">
        <GradientButton variant="adorable" size="lg" arrow>
          Get Started Now
        </GradientButton>
        
        <button class="px(2xl) py(lg) glass-card c(gray-800) r(xl) 600 hover:shadow(lg) hover:scale(1.05) transition">
          View Documentation
        </button>
      </div>
      
      <!-- Features Grid -->
      <div class="grid grid-cols(2) md:grid-cols(4) gap(xl)">
        {#each features as feature}
          <div class="text(center) group cursor(pointer)">
            <div class="font(4xl) mb(md) group-hover:scale(1.02) transition">{feature.icon}</div>
            <h4 class="font(md) 700 c(gray-900) mb(xs)">{feature.title}</h4>
            <p class="font(sm) c(gray-600)">{feature.description}</p>
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Final Message -->
    <div class="text(center) mt(5xl) pt(5xl) bt(1/gray-200)">
      <p class="font(lg) c(gray-600) mb(md)">
        Built with <span class="gradient-text 700">love</span> by developers, for developers
      </p>
      <p class="font(sm) c(gray-500)">
        MIT Licensed • Open Source • Community Driven
      </p>
    </div>
  </div>
</section>

<style>
  @import '../../styles/brand.css';
</style>