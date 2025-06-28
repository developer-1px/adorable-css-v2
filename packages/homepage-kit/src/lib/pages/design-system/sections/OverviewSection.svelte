<script lang="ts">
  import { Zap, Palette, Box, Code2, Layout, Type, Sparkles, Grid } from 'lucide-svelte';
  
  const stats = [
    { label: 'Layout Utilities', value: '50+', icon: Layout, color: 'blue' },
    { label: 'Components', value: '25+', icon: Box, color: 'purple' },
    { label: 'Color Variants', value: '100+', icon: Palette, color: 'pink' },
    { label: 'Effect Utilities', value: '30+', icon: Sparkles, color: 'orange' }
  ];
  
  const features = [
    { 
      icon: Zap, 
      title: 'Lightning Fast', 
      desc: 'Zero-runtime CSS generation for optimal performance',
      color: 'yellow'
    },
    { 
      icon: Palette, 
      title: 'Design Tokens', 
      desc: 'Comprehensive token system for consistent design',
      color: 'purple'
    },
    { 
      icon: Box, 
      title: 'Component Ready', 
      desc: 'Pre-built patterns for rapid development',
      color: 'blue'
    },
    { 
      icon: Code2, 
      title: 'Developer Friendly', 
      desc: 'Intuitive syntax that matches how you think',
      color: 'green'
    }
  ];
</script>

<section id="overview" class="section()">
  <!-- Hero -->
  <div class="container() text(center)">
    <h1 class="heading()">
      AdorableCSS Design System
    </h1>
    <p class="prose()">
      A comprehensive design system built with the Figma-first philosophy. 
      Beautiful, consistent, and incredibly easy to use.
    </p>
  </div>

  <!-- Stats -->
  <div class="grid() gap() container()">
    {#each stats as stat}
      <div class="card() text(center)">
        <div class="hbox(pack)">
          <svelte:component this={stat.icon} size="24" />
        </div>
        <div class="heading()">{stat.value}</div>
        <div class="prose()">{stat.label}</div>
      </div>
    {/each}
  </div>

  <!-- Features Grid -->
  <div class="grid() gap() container()">
    {#each features as feature}
      <div class="card()">
        <div class="hbox(pack) mb()">
          <svelte:component this={feature.icon} size="32" />
        </div>
        <h3 class="heading()">{feature.title}</h3>
        <p class="prose()">{feature.desc}</p>
      </div>
    {/each}
  </div>

  <!-- Quick Start -->
  <div class="card() container()">
    <h2 class="heading() text(center)">Get Started in Seconds</h2>
    <div class="bg() r() p() font(mono)">
      <code>&lt;script src="https://unpkg.com/adorable-css@latest"&gt;&lt;/script&gt;</code>
    </div>
    <p class="prose() text(center)">
      Add this single line to your HTML and start building beautiful interfaces immediately.
    </p>
  </div>
</section>