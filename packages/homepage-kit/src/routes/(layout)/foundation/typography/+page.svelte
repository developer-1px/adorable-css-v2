<script lang="ts">
  import { Type, ArrowRight, Check } from 'lucide-svelte';
  import Button from '$lib/components/ui/Button.svelte';

  const fontSizes = [
    { token: 'text(xs)', size: '12px', label: 'Caption' },
    { token: 'text(sm)', size: '14px', label: 'Body Small' },
    { token: 'text(base)', size: '16px', label: 'Body' },
    { token: 'text(lg)', size: '18px', label: 'Body Large' },
    { token: 'text(xl)', size: '20px', label: 'Title Small' },
    { token: 'text(2xl)', size: '24px', label: 'Title Medium' },
    { token: 'text(3xl)', size: '30px', label: 'Title Large' },
    { token: 'text(4xl)', size: '36px', label: 'Display Small' },
    { token: 'text(5xl)', size: '48px', label: 'Display Medium' },
    { token: 'text(6xl)', size: '60px', label: 'Display Large' },
    { token: 'text(7xl)', size: '72px', label: 'Display Extra Large' },
  ];

  const weights = [
    { token: 'font(100)', label: 'Thin' },
    { token: 'font(200)', label: 'Extra Light' },
    { token: 'font(300)', label: 'Light' },
    { token: 'font(400)', label: 'Regular' },
    { token: 'font(500)', label: 'Medium' },
    { token: 'font(600)', label: 'Semi Bold' },
    { token: 'font(700)', label: 'Bold' },
    { token: 'font(800)', label: 'Extra Bold' },
    { token: 'font(900)', label: 'Black' },
  ];
</script>

<svelte:head>
  <title>Typography - AdorableCSS</title>
</svelte:head>

<!-- Hero Section -->
<section class="vbox(center) py(100px) bg(white)">
  <div class="container(6xl) px(24px) vbox(center) gap(32px)">
    <div class="size(64px) bg(indigo-50) c(indigo-600) r(16px) vbox(center)">
      <Type size="32" />
    </div>
    <div class="vbox(center) gap(16px) text(center) max-w(800px)">
      <h1 class="text(56px) bold(800) tracking(tight) c(gray-900) leading(1.1)">
        Typography that<br/>
        <span class="c(indigo-600)">Scales Perfectly</span>
      </h1>
      <p class="text(20px) c(gray-500) leading(1.6) max-w(600px)">
        A comprehensive type system designed for readability and hierarchy.
        Use composite <code class="text(16px) c(gray-900) bg(gray-100) px(6px) py(2px) r(4px)">text()</code> 
        utilities for complete control.
      </p>
    </div>
  </div>
</section>

<!-- Scale Section -->
<section class="py(80px) bg(gray-50)">
  <div class="container(6xl) mx(auto) px(24px)">
    <div class="vbox gap(48px)">
      
      <div class="vbox gap(16px)">
        <h2 class="text(32px) bold(700) c(gray-900)">Type Scale</h2>
        <p class="text(18px) c(gray-500)">Consistent sizing from caption to display.</p>
      </div>

      <div class="vbox gap(1px) bg(gray-200) w(full) border(1/gray-200) r(16px) clip">
        {#each fontSizes as font}
          <div class="hbox(middle) gap(24px) p(24px) bg(white) hover:bg(gray-50) transition">
            <div class="w(120px) vbox gap(4px)">
              <code class="text(14px) c(indigo-600) bold">{font.token}</code>
              <span class="text(12px) c(gray-400)">{font.size}</span>
            </div>
            <div class="w(1px) h(24px) bg(gray-100)"></div>
            <div class="vbox">
              <span class="{font.token} c(gray-900)">The quick brown fox jumps over the lazy dog.</span>
            </div>
          </div>
        {/each}
      </div>

    </div>
  </div>
</section>

<!-- Weights Section -->
<section class="py(80px) bg(white)">
  <div class="container(6xl) mx(auto) px(24px)">
    <div class="grid(2) gap(64px)">
      
      <div class="vbox gap(32px)">
        <div class="vbox gap(16px)">
          <h2 class="text(32px) bold(700) c(gray-900)">Font Weights</h2>
          <p class="text(18px) c(gray-500)">
            Use <code class="c(indigo-600)">bold(weight)</code> or <code class="c(indigo-600)">font(weight)</code> 
            to set explicit weights.
          </p>
        </div>

        <div class="vbox gap(16px)">
          {#each weights as weight}
            <div class="hbox(middle) gap(16px)">
              <code class="w(100px) text(14px) c(gray-400)">{weight.token}</code>
              <span class="text(24px) {weight.token} c(gray-900)">{weight.label} Typograhy</span>
            </div>
          {/each}
        </div>
      </div>

      <!-- Composite Demo -->
      <div class="vbox gap(32px)">
        <div class="vbox gap(16px)">
          <h2 class="text(32px) bold(700) c(gray-900)">Composite Utilities</h2>
          <p class="text(18px) c(gray-500)">
            Combine size, line-height, and tracking in a single utility.
          </p>
        </div>

        <div class="vbox gap(24px) p(32px) bg(gray-900) r(24px)">
          
          <div class="vbox gap(16px) p(24px) bg(white/10) r(16px) border(1/white/10)">
            <div class="hbox(middle) gap(12px) mb(8px)">
              <div class="px(8px) py(4px) bg(indigo-500) c(white) text(xs) bold r(4px)">NEW</div>
              <code class="text(14px) c(indigo-300)">text(4xl/1.1/tight)</code>
            </div>
            <p class="text(4xl/1.1/tight) bold(800) c(white)">
              Efficient<br/>Typography
            </p>
          </div>

          <div class="vbox gap(16px) p(24px) bg(white/10) r(16px) border(1/white/10)">
            <div class="hbox(middle) gap(12px) mb(8px)">
               <code class="text(14px) c(pink-300)">text(sm/relaxed/widest)</code>
            </div>
            <p class="text(sm/relaxed/widest) uppercase bold c(white/80)">
              Designed for Clarity
            </p>
            <p class="text(sm/relaxed) c(white/60)">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore.
            </p>
          </div>

        </div>
      </div>

    </div>
  </div>
</section>