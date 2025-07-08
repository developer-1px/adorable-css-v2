<script lang="ts">
  import { allTokens } from 'adorable-css';
  import { Copy, Check, Palette, Grid } from 'lucide-svelte';
  
  // Organize color palette by groups using new OKLCH token system
  function getColorPalette() {
    const groups = {
      spectrum: ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'],
      neutral: ['gray', 'slate', 'zinc', 'neutral', 'stone'],
      base: ['white', 'black', 'transparent', 'current']
    };
    
    // Group color scales from new token system
    const scales = {};
    Object.entries(allTokens.color).forEach(([key, value]) => {
      if (key.includes('-') && !key.includes('-hex')) {
        const [colorName, shade] = key.split('-');
        if (!scales[colorName]) scales[colorName] = {};
        scales[colorName][shade] = value;
      }
    });
    
    return { groups, scales };
  }
  
  const { groups, scales } = getColorPalette();
  const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
  
  let copiedColor = '';
  
  function copyColor(colorName: string) {
    navigator.clipboard.writeText(colorName);
    copiedColor = colorName;
    setTimeout(() => copiedColor = '', 2000);
  }
  
  // Get contrast text color based on shade
  function getTextColor(shade: string): string {
    const shadeNum = parseInt(shade);
    return shadeNum >= 500 ? 'white' : 'gray-900';
  }
</script>

<svelte:head>
  <title>Color Palette - AdorableCSS</title>
  <meta name="description" content="Complete OKLCH color palette with all shades and variations" />
</svelte:head>

<div class="min-h(screen) bg(white)">
  <!-- Hero Section -->
  <section class="py(5xl) text(center) bb(4/black)">
    <div class="vbox(center) gap(xl)">
      <h1 class="display(3xl) font(black) tracking(tighter)">
        COLOR PALETTE
      </h1>
      <div class="vbox(center)">
        <p class="text(xl) font(medium) max-w(2xl) leading(relaxed)">
          Complete OKLCH color system.<br/>
          Perceptually uniform. Beautiful gradients.
        </p>
      </div>
    </div>
  </section>
  
  <!-- Sub Navigation -->
  <section class="bg(gray-50) bb(1/gray-200)">
    <div class="max-w(6xl) mx(auto) px(xl)">
      <nav class="hbox(center) gap(xl)">
        <a href="/tokens" class="py(lg) px(xl) bb(3/transparent) c(gray-600) hover:c(gray-900) font(medium) whitespace(nowrap) transition flex(1) text(center)">
          Design Scales
        </a>
        <a href="/tokens/palette" class="py(lg) px(xl) bb(3/gray-900) c(gray-900) font(medium) whitespace(nowrap) flex(1) text(center)">
          Color Palette
        </a>
      </nav>
    </div>
  </section>
  
  <style>
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
  </style>

  <!-- Introduction Section -->
  <section class="py(4xl) px(5xl) bg(gray-50)">
    <div class="max-w(4xl) mx(auto) vbox gap(2xl)">
      <div class="grid gap(3xl)" style="grid-template-columns: 1fr 1fr;">
        <div class="vbox gap(lg)">
          <h2 class="font(2xl) font(bold) c(gray-900)">OKLCH Color Space</h2>
          <p class="font(lg) c(gray-600) leading(relaxed)">
            Perceptually uniform color model where each step feels equally spaced. 
            Creates naturally beautiful gradients between any two colors.
          </p>
        </div>
        <div class="vbox gap(lg)">
          <h2 class="font(2xl) font(bold) c(gray-900)">Complete Palette</h2>
          <p class="font(lg) c(gray-600) leading(relaxed)">
            17 spectrum colors + 5 neutral grays. Each with 11 carefully crafted shades 
            from 25 to 900 for maximum flexibility.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Token System Content -->
  <div class="vbox gap(5xl) p(5xl)">
    
    <!-- Base Colors -->
    <div class="vbox gap(2xl)">
      <div class="vbox gap(md)">
        <h2 class="display(xl) font(black) tracking(tight)">Base Colors</h2>
        <p class="font(lg) c(gray-600) max-w(3xl)">Fundamental color values for your design system</p>
      </div>
      
      <div class="grid gap(xl)" style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));">
        {#each groups.base as colorName}
          {#if allTokens.color[colorName]}
            <div class="vbox gap(lg) p(xl) border(2/gray-900) r(lg) bg(white) hover:shadow(xl) hover:scale(1.02) transition group">
              <div class="relative">
                <div 
                  class="h(120) w(full) r(md) shadow(md) group-hover:shadow(lg) transition
                         {colorName === 'white' ? 'bg(white) border(2/gray-200)' : ''}
                         {colorName === 'black' ? 'bg(black)' : ''}
                         {colorName === 'transparent' ? 'bg(repeating-linear-gradient(45deg, white 0, white 5px, gray-100 5px, gray-100 10px)) border(2/gray-200)' : ''}
                         {colorName === 'current' ? 'bg(purple-500)' : ''}"
                ></div>
                <button 
                  class="absolute top(md) right(md) p(sm) r(md) bg(white) shadow(md) opacity(0) group-hover:opacity(100) transition"
                  on:click={() => copyColor(colorName)}
                >
                  {#if copiedColor === colorName}
                    <Check size="16" class="c(green-500)" />
                  {:else}
                    <Copy size="16" class="c(gray-600)" />
                  {/if}
                </button>
              </div>
              <div class="vbox gap(xs)">
                <code class="font(mono) font(sm) font(bold) c(gray-900)">{colorName}</code>
                <code class="font(mono) font(xs) c(gray-600)">{allTokens.color[colorName]}</code>
              </div>
              <code class="font(mono) font(xs) c(gray-500) text(center) pt(sm) border-t(1/gray-200)">
                c({colorName}) bg({colorName})
              </code>
            </div>
          {/if}
        {/each}
      </div>
    </div>

    <!-- Spectrum Colors -->
    <div class="vbox gap(2xl) border-t(4/black) pt(4xl)">
      <div class="vbox gap(md)">
        <h2 class="display(xl) font(black) tracking(tight)">Spectrum Colors</h2>
        <p class="font(lg) c(gray-600) max-w(3xl)">17 vibrant colors, each with 11 shades for endless possibilities</p>
      </div>
      
      <div class="border(2/gray-900) r(lg) overflow(hidden)">
        <table class="w(full)">
          <thead class="bg(gray-900) c(white)">
            <tr>
              <th class="text(left) p(lg) font(bold) font(sm) uppercase tracking(wider) w(120)">Color</th>
              {#each shades as shade}
                <th class="text(center) p(sm) font(bold) font(xs) uppercase tracking(wider)">{shade}</th>
              {/each}
            </tr>
          </thead>
          <tbody>
            {#each groups.spectrum as colorName, index}
              {#if scales[colorName]}
                <tr class="border-t(1/gray-200) hover:bg(gray-50) transition">
                  <td class="p(lg) font(medium) capitalize">{colorName}</td>
                  {#each shades as shade}
                    <td class="p(0)">
                      {#if scales[colorName][shade]}
                        {@const colorValue = scales[colorName][shade]}
                        <button 
                          class="group w(full) h(60) hover:scale(1.1) hover:z(10) relative transition"
                          on:click={() => copyColor(`${colorName}-${shade}`)}
                          title="{colorName}-{shade}"
                          style="background: {colorValue}"
                        >
                          <div class="absolute inset(0) opacity(0) group-hover:opacity(100) bg(black.2) hbox(center) items(center) transition">
                            {#if copiedColor === `${colorName}-${shade}`}
                              <Check size="14" class="c(white)" />
                            {:else}
                              <Copy size="14" class="c(white)" />
                            {/if}
                          </div>
                        </button>
                      {/if}
                    </td>
                  {/each}
                </tr>
              {/if}
            {/each}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Neutral Colors -->
    <div class="vbox gap(2xl) border-t(4/black) pt(4xl)">
      <div class="vbox gap(md)">
        <h2 class="display(xl) font(black) tracking(tight)">Neutral Colors</h2>
        <p class="font(lg) c(gray-600) max-w(3xl)">5 neutral grays for text, borders, and backgrounds</p>
      </div>
      
      <div class="border(2/gray-900) r(lg) overflow(hidden)">
        <table class="w(full)">
          <thead class="bg(gray-900) c(white)">
            <tr>
              <th class="text(left) p(lg) font(bold) font(sm) uppercase tracking(wider) w(120)">Color</th>
              {#each shades as shade}
                <th class="text(center) p(sm) font(bold) font(xs) uppercase tracking(wider)">{shade}</th>
              {/each}
            </tr>
          </thead>
          <tbody>
            {#each groups.neutral as colorName, index}
              {#if scales[colorName]}
                <tr class="border-t(1/gray-200) hover:bg(gray-50) transition">
                  <td class="p(lg) font(medium) capitalize">{colorName}</td>
                  {#each shades as shade}
                    <td class="p(0)">
                      {#if scales[colorName][shade]}
                        {@const colorValue = scales[colorName][shade]}
                        <button 
                          class="group w(full) h(60) hover:scale(1.1) hover:z(10) relative transition"
                          on:click={() => copyColor(`${colorName}-${shade}`)}
                          title="{colorName}-{shade}"
                          style="background: {colorValue}"
                        >
                          <div class="absolute inset(0) opacity(0) group-hover:opacity(100) bg(black.2) hbox(center) items(center) transition">
                            {#if copiedColor === `${colorName}-${shade}`}
                              <Check size="14" class="c(white)" />
                            {:else}
                              <Copy size="14" class="c(white)" />
                            {/if}
                          </div>
                        </button>
                      {/if}
                    </td>
                  {/each}
                </tr>
              {/if}
            {/each}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Opacity Notation -->
    <div class="vbox gap(2xl) border-t(4/black) pt(4xl)">
      <div class="vbox gap(md)">
        <h2 class="display(xl) font(black) tracking(tight)">Opacity Notation</h2>
        <p class="font(lg) c(gray-600) max-w(3xl)">Apply opacity to any color using dot notation</p>
      </div>

      <!-- Examples Grid -->
      <div class="grid gap(xl)" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));">
        <!-- Basic Opacity -->
        <div class="vbox gap(lg) p(xl) border(2/gray-900) r(lg) bg(white) hover:shadow(xl) hover:scale(1.02) transition group">
          <h3 class="font(lg) font(bold) c(gray-900)">Basic Usage</h3>
          <div class="vbox gap(md)">
            <div class="hbox gap(md) items(center)">
              <div class="w(60) h(60) bg(black) r(md)"></div>
              <code class="font(mono) font(sm)">bg(black)</code>
            </div>
            <div class="hbox gap(md) items(center)">
              <div class="w(60) h(60) bg(black.5) r(md)"></div>
              <code class="font(mono) font(sm)">bg(black.5)</code>
            </div>
            <div class="hbox gap(md) items(center)">
              <div class="w(60) h(60) bg(black.2) r(md)"></div>
              <code class="font(mono) font(sm)">bg(black.2)</code>
            </div>
          </div>
        </div>

        <!-- Color with Opacity -->
        <div class="vbox gap(lg) p(xl) border(2/gray-900) r(lg) bg(white) hover:shadow(xl) hover:scale(1.02) transition group">
          <h3 class="font(lg) font(bold) c(gray-900)">With Colors</h3>
          <div class="vbox gap(md)">
            <div class="hbox gap(md) items(center)">
              <div class="w(60) h(60) bg(purple-500) r(md)"></div>
              <code class="font(mono) font(sm)">bg(purple-500)</code>
            </div>
            <div class="hbox gap(md) items(center)">
              <div class="w(60) h(60) bg(purple-500.5) r(md)"></div>
              <code class="font(mono) font(sm)">bg(purple-500.5)</code>
            </div>
            <div class="hbox gap(md) items(center)">
              <div class="w(60) h(60) bg(purple-500.2) r(md)"></div>
              <code class="font(mono) font(sm)">bg(purple-500.2)</code>
            </div>
          </div>
        </div>

        <!-- Opacity Values -->
        <div class="vbox gap(lg) p(xl) border(2/gray-900) r(lg) bg(white) hover:shadow(xl) hover:scale(1.02) transition group">
          <h3 class="font(lg) font(bold) c(gray-900)">Opacity Scale</h3>
          <div class="grid(2) gap(md)">
            <code class="font(mono) font(sm)">.1 = 10%</code>
            <code class="font(mono) font(sm)">.2 = 20%</code>
            <code class="font(mono) font(sm)">.3 = 30%</code>
            <code class="font(mono) font(sm)">.4 = 40%</code>
            <code class="font(mono) font(sm)">.5 = 50%</code>
            <code class="font(mono) font(sm)">.6 = 60%</code>
            <code class="font(mono) font(sm)">.7 = 70%</code>
            <code class="font(mono) font(sm)">.8 = 80%</code>
            <code class="font(mono) font(sm)">.9 = 90%</code>
            <code class="font(mono) font(sm)">.95 = 95%</code>
          </div>
        </div>

        <!-- Common Patterns -->
        <div class="vbox gap(lg) p(xl) border(2/gray-900) r(lg) bg(white) hover:shadow(xl) hover:scale(1.02) transition group">
          <h3 class="font(lg) font(bold) c(gray-900)">Common Patterns</h3>
          <div class="vbox gap(sm)">
            <p class="font(sm) c(gray-600)"><code class="font(mono) bg(gray-100) px(xs) r(xs)">bg(white.1)</code> - Subtle overlays</p>
            <p class="font(sm) c(gray-600)"><code class="font(mono) bg(gray-100) px(xs) r(xs)">bg(black.5)</code> - Dim backgrounds</p>
            <p class="font(sm) c(gray-600)"><code class="font(mono) bg(gray-100) px(xs) r(xs)">c(gray-900.6)</code> - Muted text</p>
            <p class="font(sm) c(gray-600)"><code class="font(mono) bg(gray-100) px(xs) r(xs)">border(1/gray-200.3)</code> - Light borders</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>