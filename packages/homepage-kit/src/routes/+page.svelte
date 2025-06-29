<script lang="ts">
  import { Github, ArrowRight, Sparkles, Zap, Package } from 'lucide-svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import FeatureCard from '$lib/components/ui/FeatureCard.svelte';
  import IconBox from '$lib/components/ui/IconBox.svelte';
  import CodeBlock from '$lib/components/ui/CodeBlock.svelte';
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
      <Button href="/docs" size="lg">
        Get Started
        <ArrowRight size="20" />
      </Button>
      
      <Button href="https://github.com/adorablecss/adorable-css" variant="secondary" size="lg">
        <Github size="20" />
        <span>View on GitHub</span>
      </Button>
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
    <FeatureCard
      title="Figma Mental Model"
      description="Auto Layout, constraints, and layer positioning - just like in Figma"
      iconColor="purple-500"
    >
      <svelte:fragment slot="icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
        </svg>
      </svelte:fragment>
    </FeatureCard>
    
    <!-- Built-in Design System -->
    <FeatureCard
      icon={Zap}
      iconColor="emerald-500"
      title="Design System Built-in"
      description="Professional design tokens, semantic colors, and consistent spacing out of the box"
    />
    
    <!-- Developer Experience -->
    <FeatureCard
      icon={Sparkles}
      iconColor="blue-500"
      title="Amazing DX"
      description="IntelliSense support, tiny bundle size, and zero runtime overhead"
    />
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
          <IconBox size="sm" color="gray-400" bgOpacity={1} rounded="full" />
          <h3 class="font(lg) bold c(gray-700)">Traditional CSS</h3>
        </div>
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
      
      <!-- AdorableCSS -->
      <div class="vbox gap(16)">
        <div class="hbox(middle) gap(8)">
          <IconBox size="sm" color="purple-500" rounded="full" />
          <h3 class="font(lg) bold c(gray-900)">AdorableCSS</h3>
        </div>
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
</section>