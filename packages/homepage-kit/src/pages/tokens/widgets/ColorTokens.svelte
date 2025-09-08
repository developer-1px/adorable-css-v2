<script lang="ts">
  import { colorPalette } from 'adorable-css';
  import { Palette, Droplet, Sun, Copy, Check } from 'lucide-svelte';

  // Get color groups from OKLCH palette
  function getColorGroups() {
    const groups = {
      brand: ['indigo', 'purple', 'violet'],
      semantic: ['primary', 'secondary', 'accent', 'mute', 'success', 'info', 'warning', 'error'],
      spectrum: ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'],
      neutral: ['gray', 'slate', 'zinc', 'neutral', 'stone'],
    };
    
    // Group color scales
    const scales = {};
    Object.entries(colorPalette).forEach(([key, value]) => {
      if (key.includes('-') && !key.includes('-hex')) {
        const [colorName, shade] = key.split('-');
        if (!scales[colorName]) scales[colorName] = {};
        scales[colorName][shade] = value;
      }
    });
    
    groups.palette = scales;
    return groups;
  }
  
  const colorGroups = getColorGroups();
  const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
  
  let copiedColor = '';
  
  function copyColor(colorName: string) {
    navigator.clipboard.writeText(colorName);
    copiedColor = colorName;
    setTimeout(() => copiedColor = '', 2000);
  }
  
  // Featured gradients
  const featuredGradients = [
    { name: 'Sunset', value: '135deg/rose-400..orange-500', class: 'bg(135deg/rose-400..orange-500)' },
    { name: 'Ocean', value: '90deg/blue-400..teal-500', class: 'bg(90deg/blue-400..teal-500)' },
    { name: 'Forest', value: '45deg/emerald-400..green-600', class: 'bg(45deg/emerald-400..green-600)' },
    { name: 'Lavender', value: '180deg/purple-400..pink-500', class: 'bg(180deg/purple-400..pink-500)' },
    { name: 'Sunrise', value: 'to-tr/amber-300..yellow-400', class: 'bg(to-tr/amber-300..yellow-400)' },
    { name: 'Berry', value: '135deg/fuchsia-500..purple-600', class: 'bg(135deg/fuchsia-500..purple-600)' }
  ];
  
  // Semantic color mappings
  const semanticColors = {
    primary: { base: 'purple-500', shades: ['purple-400', 'purple-500', 'purple-600'], label: 'Primary brand color' },
    secondary: { base: 'gray-500', shades: ['gray-400', 'gray-500', 'gray-600'], label: 'Secondary neutral' },
    accent: { base: 'pink-500', shades: ['pink-400', 'pink-500', 'pink-600'], label: 'Accent highlights' },
    mute: { base: 'gray-500', shades: ['gray-400', 'gray-500', 'gray-600'], label: 'Muted elements' },
    success: { base: 'green-500', shades: ['green-400', 'green-500', 'green-600'], label: 'Success states' },
    info: { base: 'blue-500', shades: ['blue-400', 'blue-500', 'blue-600'], label: 'Information' },
    warning: { base: 'amber-500', shades: ['amber-400', 'amber-500', 'amber-600'], label: 'Warning alerts' },
    error: { base: 'red-500', shades: ['red-400', 'red-500', 'red-600'], label: 'Error states' }
  };
  
  // Brand colors for display
  const brandStartColor = colorGroups.palette['purple']?.['500'] || '';
  const brandEndColor = colorGroups.palette['pink']?.['500'] || '';
</script>

<div class="vbox gap(4xl)">
  <!-- Header Section -->
  <div class="vbox gap(2xl)">
    <div class="hbox(middle) gap(lg)">
      <div class="p(lg) r(xl) bg(indigo-100)">
        <Palette size={24} class="c(indigo-600)" />
      </div>
      <div class="vbox gap(sm)">
        <h2 class="heading(display/2xl) font(800) c(gray-900)">Color System</h2>
        <p class="body(lg) c(gray-600)">OKLCH-based color palette designed for perfect perceptual uniformity. Every color works harmoniously in gradients and provides excellent accessibility.</p>
      </div>
    </div>
  </div>

  <!-- Featured Gradients Card -->
  <div class="bg(white) r(2xl) p(3xl) shadow(lg) border(1/gray-100)">
    <div class="hbox(between/middle) mb(2xl)">
      <div>
        <h3 class="heading(h2) font(700) c(gray-900) mb(xs)">Featured Gradients</h3>
        <p class="body(md) c(gray-600)">Beautiful, smooth gradients powered by OKLCH</p>
      </div>
      <Sun size={20} class="c(gray-400)" />
    </div>
    
    <div class="grid(2) md:grid(3) gap(xl)">
      {#each featuredGradients as gradient}
        <button 
          class="group relative h(32) r(xl) {gradient.class} shadow(lg) hover:shadow(2xl) 
                 hover:scale(1.02) transition-all cursor-pointer overflow(hidden)"
          on:click={() => copyColor(gradient.value)}
        >
          <div class="absolute inset(0) bg(black.0) group-hover:bg(black.1) transition"></div>
          <div class="absolute bottom(0) left(0) right(0) p(xl) text(left)">
            <h4 class="font(lg) bold c(white) mb(xs) drop-shadow-lg">{gradient.name}</h4>
            <code class="font(xs) c(white.8) bg(black.2) px(sm) py(xs) r(md) inline-block backdrop-blur(sm)">
              {gradient.value}
            </code>
          </div>
          <div class="absolute top(md) right(md) opacity(0) group-hover:opacity(100) transition">
            {#if copiedColor === gradient.value}
              <Check size={16} class="c(white)" />
            {:else}
              <Copy size={16} class="c(white)" />
            {/if}
          </div>
        </button>
      {/each}
    </div>
  </div>

  <!-- Brand Identity -->
  <div class="bg(white) r(2xl) shadow(xl) shadow(gray-200.5) overflow(hidden) p(2xl)">
    <div class="hbox(between/middle) mb(xl)">
      <div>
        <h3 class="heading(h2) c(gray-900) mb(xs)">Brand Identity</h3>
        <p class="font(sm) c(gray-600)">Primary brand gradient</p>
      </div>
      <Droplet size={20} class="c(purple-500)" />
    </div>
    
    <div class="grid(3) gap(xl)">
      <button 
        class="group relative h(32) r(xl) bg(135deg/purple-500..pink-500) shadow(lg) hover:shadow(2xl) 
               hover:scale(1.02) transition-all cursor-pointer overflow(hidden)"
        on:click={() => copyColor('brand')}
      >
        <div class="absolute inset(0) bg(black.0) group-hover:bg(black.1) transition"></div>
        <div class="absolute bottom(0) left(0) right(0) p(xl) text(left)">
          <h4 class="font(lg) bold c(white) mb(xs) drop-shadow-lg">Brand</h4>
          <code class="font(xs) c(white.8) bg(black.2) px(sm) py(xs) r(md) inline-block backdrop-blur(sm)">
            purple-500..pink-500
          </code>
        </div>
        <div class="absolute top(md) right(md) opacity(0) group-hover:opacity(100) transition">
          {#if copiedColor === 'brand'}
            <Check size={16} class="c(white)" />
          {:else}
            <Copy size={16} class="c(white)" />
          {/if}
        </div>
      </button>
      
      <div class="vbox gap(md)">
        <h4 class="font(medium) c(gray-800)">Brand Start</h4>
        <button 
          class="h(16) w(full) r(lg) shadow(md) hover:shadow(lg) transition cursor-pointer border(none)"
          style="background: {brandStartColor}"
          on:click={() => copyColor('purple-500')}
        ></button>
        <code class="font(sm) c(gray-600)">purple-500</code>
      </div>
      
      <div class="vbox gap(md)">
        <h4 class="font(medium) c(gray-800)">Brand End</h4>
        <button 
          class="h(16) w(full) r(lg) shadow(md) hover:shadow(lg) transition cursor-pointer border(none)"
          style="background: {brandEndColor}"
          on:click={() => copyColor('pink-500')}
        ></button>
        <code class="font(sm) c(gray-600)">pink-500</code>
      </div>
    </div>
  </div>

  <!-- Semantic Colors -->
  <div class="bg(gray-50) r(2xl) p(3xl) border(1/gray-200)">
    <h3 class="heading(h2) font(700) c(gray-900) mb(2xl) text(center)">Semantic Colors</h3>
    <p class="body(lg) c(gray-600) text(center) mb(3xl) max-w(3xl) mx(auto)">
      Purpose-driven colors that communicate meaning and enhance user experience
    </p>
    
    <div class="grid(2) md:grid(4) gap(xl)">
      {#each Object.entries(semanticColors) as [name, config]}
        <div class="bg(white) r(xl) p(xl) shadow(md) hover:shadow(lg) transition">
          <div class="vbox gap(md)">
            <div class="h(16) w(full) r(lg) bg({config.base}) shadow(sm)"></div>
            <div>
              <h4 class="font(medium) c(gray-900) capitalize">{name}</h4>
              <p class="font(xs) c(gray-600)">{config.label}</p>
            </div>
            <div class="hbox gap(xs)">
              {#each config.shades as shade}
                <button 
                  class="h(8) flex(1) r(sm) bg({shade}) hover:scale(1.1) transition cursor-pointer"
                  on:click={() => copyColor(shade)}
                ></button>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Color Palette Grid -->
  <div class="bg(white) r(2xl) shadow(xl) p(3xl) overflow(hidden)">
    <h3 class="heading(h2) font(700) c(gray-900) mb(2xl) text(center)">Complete Color Palette</h3>
    <p class="body(lg) c(gray-600) text(center) mb(3xl) max-w(3xl) mx(auto)">
      Full spectrum of colors with consistent lightness progression
    </p>
    
    <!-- Spectrum Colors -->
    <div class="mb(3xl)">
      <h4 class="font(lg) font(600) c(gray-800) mb(xl)">Spectrum Colors</h4>
      <div class="overflow-x(auto) -mx(xl)">
        <div class="px(xl) pb(lg)">
          <div class="grid grid-cols-12 gap(xs) min-w(1200px)">
            <!-- Header row -->
            <div></div>
            {#each shades as shade}
              <div class="text(center) font(xs) c(gray-600) font(mono)">{shade}</div>
            {/each}
            
            <!-- Color rows -->
            {#each colorGroups.spectrum as colorName}
              {#if colorGroups.palette[colorName]}
                <div class="font(sm) c(gray-700) capitalize pr(sm)">{colorName}</div>
                {#each shades as shade}
                  {#if colorGroups.palette[colorName][shade]}
                    <button
                      class="h(10) w(full) r(sm) hover:scale(1.1) transition cursor-pointer shadow(sm)"
                      style="background: {colorGroups.palette[colorName][shade]}"
                      on:click={() => copyColor(`${colorName}-${shade}`)}
                      title="{colorName}-{shade}"
                    ></button>
                  {:else}
                    <div></div>
                  {/if}
                {/each}
              {/if}
            {/each}
          </div>
        </div>
      </div>
    </div>
    
    <!-- Neutral Colors -->
    <div>
      <h4 class="font(lg) font(600) c(gray-800) mb(xl)">Neutral Colors</h4>
      <div class="overflow-x(auto) -mx(xl)">
        <div class="px(xl) pb(lg)">
          <div class="grid grid-cols-12 gap(xs) min-w(800px)">
            <!-- Header row -->
            <div></div>
            {#each shades as shade}
              <div class="text(center) font(xs) c(gray-600) font(mono)">{shade}</div>
            {/each}
            
            <!-- Color rows -->
            {#each colorGroups.neutral as colorName}
              {#if colorGroups.palette[colorName]}
                <div class="font(sm) c(gray-700) capitalize pr(sm)">{colorName}</div>
                {#each shades as shade}
                  {#if colorGroups.palette[colorName][shade]}
                    <button
                      class="h(10) w(full) r(sm) hover:scale(1.1) transition cursor-pointer shadow(sm)"
                      style="background: {colorGroups.palette[colorName][shade]}"
                      on:click={() => copyColor(`${colorName}-${shade}`)}
                      title="{colorName}-{shade}"
                    ></button>
                  {:else}
                    <div></div>
                  {/if}
                {/each}
              {/if}
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Color Usage Tips -->
  <div class="bg(gradient-to-br/indigo-600..purple-600) r(2xl) p(3xl) c(white)">
    <h3 class="heading(h1) mb(2xl) text(center)">Color Usage Tips</h3>
    <div class="grid(2) gap(2xl) max-w(4xl) mx(auto)">
      <div class="bg(white.1) r(lg) p(xl) backdrop-blur(sm)">
        <h4 class="font(lg) font(600) mb(md)">🎨 Gradients</h4>
        <p class="font(sm) opacity(90) mb(md)">
          OKLCH gradients are smoother and more vibrant than RGB
        </p>
        <code class="font(xs) bg(white.1) px(sm) py(xs) r(md) block">
          bg(45deg/blue-400..purple-500)
        </code>
      </div>
      
      <div class="bg(white.1) r(lg) p(xl) backdrop-blur(sm)">
        <h4 class="font(lg) font(600) mb(md)">🔍 Alpha Values</h4>
        <p class="font(sm) opacity(90) mb(md)">
          Use dot notation for transparency
        </p>
        <code class="font(xs) bg(white.1) px(sm) py(xs) r(md) block">
          bg(black.5) // 50% opacity
        </code>
      </div>
      
      <div class="bg(white.1) r(lg) p(xl) backdrop-blur(sm)">
        <h4 class="font(lg) font(600) mb(md)">🎯 Semantic Colors</h4>
        <p class="font(sm) opacity(90) mb(md)">
          Use semantic names for consistent theming
        </p>
        <code class="font(xs) bg(white.1) px(sm) py(xs) r(md) block">
          c(primary) bg(success)
        </code>
      </div>
      
      <div class="bg(white.1) r(lg) p(xl) backdrop-blur(sm)">
        <h4 class="font(lg) font(600) mb(md)">🌈 Color Functions</h4>
        <p class="font(sm) opacity(90) mb(md)">
          Advanced color manipulation
        </p>
        <code class="font(xs) bg(white.1) px(sm) py(xs) r(md) block">
          bg(purple-500/hover)
        </code>
      </div>
    </div>
  </div>

  <!-- Copied notification -->
  {#if copiedColor}
    <div class="fixed bottom(xl) right(xl) bg(black) c(white) px(xl) py(md) r(lg) shadow(2xl) animate-bounce">
      Copied: {copiedColor}
    </div>
  {/if}
</div>