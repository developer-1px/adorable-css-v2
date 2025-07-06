<script lang="ts">
  import { Type, Hash, Eye } from 'lucide-svelte';
  
  // Font size 02-design_tokens using the new dynamic calc() system
  const fontTokens = [
    { name: '4xs', size: 'text(4xs)', description: 'Tiny text', usage: 'Fine print' },
    { name: '3xs', size: 'text(3xs)', description: 'Extra small', usage: 'Captions' },
    { name: '2xs', size: 'text(2xs)', description: 'Very small', usage: 'Helper text' },
    { name: 'xs', size: 'text(xs)', description: 'Small text', usage: 'Labels' },
    { name: 'sm', size: 'text(sm)', description: 'Small body', usage: 'Secondary text' },
    { name: 'md', size: 'text(md)', description: 'Base size', usage: 'Body text' },
    { name: 'lg', size: 'text(lg)', description: 'Large text', usage: 'Emphasis' },
    { name: 'xl', size: 'text(xl)', description: 'Extra large', usage: 'Subheadings' },
    { name: '2xl', size: 'text(2xl)', description: 'Double XL', usage: 'Headings' },
    { name: '3xl', size: 'text(3xl)', description: 'Triple XL', usage: 'Large headings' },
    { name: '4xl', size: 'text(4xl)', description: 'Quad XL', usage: 'Display text' },
    { name: '5xl', size: 'text(5xl)', description: 'Penta XL', usage: 'Hero text' },
    { name: '6xl', size: 'text(6xl)', description: 'Hexa XL', usage: 'Giant text' },
    { name: '7xl', size: 'text(7xl)', description: 'Septa XL', usage: 'Massive text' },
    { name: '8xl', size: 'text(8xl)', description: 'Octa XL', usage: 'Enormous text' },
  ];
  
  let copiedToken = '';
  
  function copyToken(token: string) {
    navigator.clipboard.writeText(token);
    copiedToken = token;
    setTimeout(() => copiedToken = '', 2000);
  }
</script>

<div class="vbox gap(4xl)">
  <!-- Header -->
  <div class="text(center)">
    <div class="hbox(pack) gap(sm)">
      <Type size={32} class="c(primary)" />
      <h1 class="display(lg) gradient">Font Tokens</h1>
    </div>
    <p class="body(lg) c(neutral-600) max-w(4xl) mx(auto) pt(xl)">
      Dynamic font size system using mathematical scaling. Based on configurable ratio and clean multipliers.
    </p>
  </div>

  <!-- Font Scale Display -->
  <div class="bg(white) r(2xl) p(3xl) shadow(xl) shadow(neutral-200.5)">
    <div class="hbox(start) gap(sm) pb(2xl)">
      <Hash size={24} class="c(primary)" />
      <h2 class="heading(h2) c(neutral-900)">Font Scale</h2>
    </div>
    
    <div class="vbox gap(lg)">
      {#each fontTokens as token}
        <div 
          class="group hbox(between/center) p(xl) r(xl) bg(neutral-50) hover:bg(neutral-100) hover:shadow(md) transition cursor(pointer)"
          on:click={() => copyToken(token.size)}
        >
          <div class="vbox gap(sm)">
            <div class="hbox(start) gap(md)">
              <code class="badge(sm/primary)">{token.size}</code>
              <span class="caption(xs) c(neutral-500)">{token.usage}</span>
            </div>
            <p class="caption(base) c(neutral-600)">{token.description}</p>
          </div>
          
          <div class="{token.size} c(neutral-800) font(medium) text(right)">
            The quick brown fox
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Font System Info -->
  <div class="bg(neutral-900) r(2xl) p(3xl) c(white)">
    <div class="hbox(start) gap(sm) pb(xl)">
      <Eye size={24} class="c(white)" />
      <h3 class="heading(h3) c(white)">How Font Scaling Works</h3>
    </div>
    
    <div class="grid(1) md:grid(2) gap(xl)">
      <div class="vbox gap(md)">
        <h4 class="title(sm) c(white)">Dynamic Calculation</h4>
        <p class="body(sm) c(white.9)">
          Font sizes are calculated dynamically using CSS calc() with configurable ratio.
          Example: <code class="bg(white.2) px(xs) r(sm)">calc(var(--font-base) * 1.25)</code>
        </p>
      </div>
      
      <div class="vbox gap(md)">
        <h4 class="title(sm) c(white)">Ratio-Based Scaling</h4>
        <p class="body(sm) c(white.9)">
          Each step multiplies by the ratio (default: 1.2). 
          md is base, lg = base × 1.2, xl = base × 1.2²
        </p>
      </div>
      
      <div class="vbox gap(md)">
        <h4 class="title(sm) c(white)">CSS Variables</h4>
        <p class="body(sm) c(white.9)">
          Control base size and ratio: <code class="bg(white.2) px(xs) r(sm)">--font-base: 1rem</code>, 
          <code class="bg(white.2) px(xs) r(sm)">--font-ratio: 1.2</code>
        </p>
      </div>
      
      <div class="vbox gap(md)">
        <h4 class="title(sm) c(white)">Usage</h4>
        <p class="body(sm) c(white.9)">
          Simply use: <code class="bg(white.2) px(xs) r(sm)">text(lg)</code>, 
          <code class="bg(white.2) px(xs) r(sm)">text(2xl)</code>, 
          <code class="bg(white.2) px(xs) r(sm)">text(6xl)</code>
        </p>
      </div>
    </div>
  </div>

  <!-- Copy Feedback -->
  {#if copiedToken}
    <div class="fixed bottom(xl) right(xl) bg(success) c(white) px(lg) py(md) r(lg) shadow(xl) animate(fade-in-up)">
      Copied: {copiedToken}
    </div>
  {/if}
</div>

<style>
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(var(--spacing-xl));
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  :global(.animate\(fade-in-up\)) {
    animation: fade-in-up 0.3s ease-out;
  }
</style>