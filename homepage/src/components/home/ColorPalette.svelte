<script lang="ts">
  import { colorPalette } from 'adorable-css';
  import GlassCard from '../brand/GlassCard.svelte';
  import { Copy, Check } from 'lucide-svelte';
  
  let copiedColor = '';
  
  const gradientExamples = [
    { name: 'Adorable', class: 'bg(purple-400..pink-400/135deg)', colors: ['purple-400', 'pink-400'] },
    { name: 'Ocean', class: 'bg(blue-400..teal-400/90deg)', colors: ['blue-400', 'teal-400'] },
    { name: 'Sunset', class: 'bg(orange-400..rose-400/45deg)', colors: ['orange-400', 'rose-400'] },
    { name: 'Forest', class: 'bg(green-400..emerald-400/120deg)', colors: ['green-400', 'emerald-400'] },
    { name: 'Galaxy', class: 'bg(indigo-600..purple-600/135deg)', colors: ['indigo-600', 'purple-600'] },
    { name: 'Fire', class: 'bg(red-500..yellow-400/45deg)', colors: ['red-500', 'yellow-400'] }
  ];
  
  const colorGroups = {
    primary: ['purple', 'pink', 'blue'],
    accent: ['teal', 'cyan', 'sky'],
    warm: ['red', 'orange', 'yellow'],
    nature: ['green', 'emerald', 'lime'],
    neutral: ['gray', 'slate', 'zinc']
  };
  
  const shades = ['300', '400', '500', '600', '700'];
  
  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    copiedColor = text;
    setTimeout(() => copiedColor = '', 2000);
  }
</script>

<section class="color-palette relative py(5xl) overflow(hidden)">
  <!-- Background gradient -->
  <div class="absolute inset(0) bg(gradient-to-b/white/purple-50/5) pointer-events(none)"></div>
  
  <div class="container(xl) relative z(10)">
    <!-- Section Header -->
    <div class="text(center) mb(4xl)">
      <h2 class="brand-heading font(5xl) mb(lg) c(gray-900)">
        <span class="gradient-text">OKLCH</span> Color System
      </h2>
      <p class="font(xl) c(gray-600) container(2xl/px:0)">
        Perceptually uniform colors that create perfect gradients every time
      </p>
    </div>
    
    <!-- Gradient Examples -->
    <div class="mb(5xl)">
      <h3 class="font(2xl) 700 c(gray-900) mb(2xl) text(center)">Signature Gradients</h3>
      <div class="grid grid-cols(2) md:grid-cols(3) gap(xl)">
        {#each gradientExamples as gradient}
          <div class="group cursor(pointer)" on:click={() => copyToClipboard(gradient.class)}>
            <div class="h(120px) {gradient.class} r(xl) shadow(lg) hover:shadow(xl) transition relative overflow(hidden)">
              <div class="absolute inset(0) bg(white/0) hover:bg(white/10) transition"></div>
              <div class="layer(center) opacity(0) group-hover:opacity(100) transition">
                <div class="bg(black/60) backdrop-blur(sm) px(lg) py(sm) r(full) hbox(middle) gap(sm)">
                  {#if copiedColor === gradient.class}
                    <Check size="16" class="c(white)" />
                    <span class="font(sm) c(white) 600">Copied!</span>
                  {:else}
                    <Copy size="16" class="c(white)" />
                    <span class="font(sm) c(white) 600">Copy</span>
                  {/if}
                </div>
              </div>
            </div>
            <div class="mt(md) text(center)">
              <h4 class="font(md) 600 c(gray-900)">{gradient.name}</h4>
              <code class="font(xs) c(gray-600) font-family(mono)">{gradient.class}</code>
            </div>
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Color Swatches -->
    <div>
      <h3 class="font(2xl) 700 c(gray-900) mb(2xl) text(center)">Color Palette</h3>
      {#each Object.entries(colorGroups) as [groupName, colors]}
        <div class="mb(3xl)">
          <h4 class="font(lg) 600 c(gray-700) mb(xl) capitalize">{groupName} Colors</h4>
          <div class="vbox gap(lg)">
            {#each colors as colorName}
              <div class="hbox gap(sm) items(stretch)">
                <div class="w(100px) font(sm) 500 c(gray-600) py(md)">{colorName}</div>
                <div class="flex(1) hbox gap(xs)">
                  {#each shades as shade}
                    {@const colorKey = `${colorName}-${shade}`}
                    {@const colorValue = colorPalette[colorKey]}
                    {#if colorValue}
                      <button 
                        class="flex(1) h(60px) r(md) shadow(sm) hover:shadow(md) hover:scale(1.05) transition relative group"
                        style="background: {colorValue}"
                        on:click={() => copyToClipboard(colorKey)}
                      >
                        <div class="absolute inset(0) vbox(center) opacity(0) group-hover:opacity(100) transition">
                          <div class="bg(black/60) backdrop-blur(sm) px(md) py(xs) r(md)">
                            <div class="font(xs) c(white) 600">{shade}</div>
                          </div>
                        </div>
                      </button>
                    {/if}
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
    
    <!-- Color Tips -->
    <GlassCard>
      <div class="text(center)">
        <h3 class="font(xl) 700 c(gray-900) mb(lg)">Pro Tip</h3>
        <p class="c(gray-600) container(3xl/px:0)">
          OKLCH colors maintain consistent brightness across different hues, making gradients look naturally smooth. 
          Try combining any colors - they'll always look great together!
        </p>
      </div>
    </GlassCard>
  </div>
</section>

<style>
  @import '../../styles/brand.css';
</style>