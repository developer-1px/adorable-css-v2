<script lang="ts">
  import { colorPalette } from 'adorable-css';
  import { Palette, Droplet, Sun, Copy, Check } from 'lucide-svelte';
  import TokenSection from '$lib/components/tokens/TokenSection.svelte';
  import TokenCard from '$lib/components/tokens/TokenCard.svelte';

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

<TokenSection 
  icon={Palette}
  iconColor="indigo-600"
  title="Color System"
  description="OKLCH-based color palette designed for perfect perceptual uniformity. Every color works harmoniously in gradients and provides excellent accessibility."
>

  <!-- Featured Gradients -->
  <TokenCard 
    title="Featured Gradients"
    subtitle="Beautiful, smooth gradients powered by OKLCH"
    icon={Sun}
    iconColor="gray-400"
  >
    
    <div class="grid(2) md:grid(3) gap(xl)">
      {#each featuredGradients as gradient}
        <button 
          class="group relative h(lg) r(xl) {gradient.class} shadow(lg) hover:shadow(2xl) 
                 hover:scale(1.02) transition-all cursor-pointer overflow(hidden)"
          on:click={() => copyColor(gradient.value)}
        >
          <div class="absolute inset(0) bg(black.0) group-hover:bg(black.1) transition"></div>
          <div class="absolute bottom(0) left(0) right(0) p(xl) text(left)">
            <h4 class="font(lg) bold c(white) mb(xs) drop-shadow-lg">{gradient.name}</h4>
            <code class="text(xs) c(white.8) bg(black.2) px(sm) py(xs) r(md) inline-block backdrop-blur(sm)">
              {gradient.value}
            </code>
          </div>
          <div class="absolute top(md) right(md) opacity(0) group-hover:opacity(100) transition">
            {#if copiedColor === gradient.value}
              <Check size="16" class="c(white)" />
            {:else}
              <Copy size="16" class="c(white)" />
            {/if}
          </div>
        </button>
      {/each}
    </div>
  </TokenCard>

  <!-- Brand Identity -->
  <div class="bg(white) r(2xl) shadow(xl) shadow(gray-200.5) overflow(hidden) p(2xl)">
    <div class="hbox(between/middle) mb(xl)">
      <div>
        <h3 class="heading(h2) c(gray-900) mb(xs)">Brand Identity</h3>
        <p class="text(sm) c(gray-600)">Primary brand gradient</p>
      </div>
      <Droplet size="20" class="c(purple-500)" />
    </div>
    
    <div class="grid(3) gap(xl)">
      <button 
        class="group relative h(lg) r(xl) bg(135deg/purple-500..pink-500) shadow(lg) hover:shadow(2xl) 
               hover:scale(1.02) transition-all cursor-pointer overflow(hidden)"
        on:click={() => copyColor('brand')}
      >
        <div class="absolute inset(0) bg(black.0) group-hover:bg(black.1) transition"></div>
        <div class="absolute bottom(0) left(0) right(0) p(xl) text(left)">
          <h4 class="font(lg) bold c(white) mb(xs) drop-shadow-lg">Brand</h4>
          <code class="text(xs) c(white.8) bg(black.2) px(sm) py(xs) r(md) inline-block backdrop-blur(sm)">
            purple-500..pink-500
          </code>
        </div>
        <div class="absolute top(md) right(md) opacity(0) group-hover:opacity(100) transition">
          {#if copiedColor === 'brand'}
            <Check size="16" class="c(white)" />
          {:else}
            <Copy size="16" class="c(white)" />
          {/if}
        </div>
      </button>
      
      <div class="vbox gap(md)">
        <h4 class="font(medium) c(gray-800)">Brand Start</h4>
        <button 
          class="h(md) w(full) r(lg) shadow(md) hover:shadow(lg) transition cursor-pointer border(none)"
          style="background: {brandStartColor}"
          on:click={() => copyColor('purple-500')}
        ></button>
        <code class="text(sm) c(gray-600)">purple-500</code>
      </div>
      
      <div class="vbox gap(md)">
        <h4 class="font(medium) c(gray-800)">Brand End</h4>
        <button 
          class="h(md) w(full) r(lg) shadow(md) hover:shadow(lg) transition cursor-pointer border(none)"
          style="background: {brandEndColor}"
          on:click={() => copyColor('pink-500')}
        ></button>
        <code class="text(sm) c(gray-600)">pink-500</code>
      </div>
    </div>
  </div>

  <!-- Full Spectrum -->
  <div class="bg(white) r(2xl) shadow(xl) shadow(gray-200.5) overflow(hidden)">
    <div class="p(2xl) border-b(1px/gray-100)">
      <div class="hbox(between/middle) mb(xl)">
        <div>
          <h3 class="heading(h2) c(gray-900) mb(xs)">Full Color Spectrum</h3>
          <p class="text(sm) c(gray-600)">Complete palette with all shades</p>
        </div>
        <Sun size="20" class="c(amber-500)" />
      </div>
    </div>
    
    <div class="vbox">
      {#each [...colorGroups.spectrum, ...colorGroups.neutral] as colorName}
        {#if colorGroups.palette[colorName]}
          {@const color700 = colorGroups.palette[colorName]?.['700'] || ''}
          <div class="hbox hover:bg(gray-50) transition">
            <div class="w(120px) hbox(center/middle) py(lg) px(md)" style="color: {color700}">
              <h4 class="font(medium) capitalize text(center)">{colorName}</h4>
            </div>
              <div class="hbox gap(0) flex(1) px(xs) py(xs)">
                {#each shades as shade}
                  {#if colorGroups.palette[colorName][shade]}
                    {@const colorValue = colorGroups.palette[colorName][shade]}
                    <button 
                      class="group relative flex(1) hover:z(10)"
                      on:click={() => copyColor(`${colorName}-${shade}`)}
                      title="{colorName}-{shade}"
                    >
                      <div 
                        class="h(48px) w(full) shadow(sm) group-hover:shadow(xl) 
                               group-hover:scale(1.1) transition-all cursor-pointer
                               {shade === '50' ? 'r(l-lg)' : ''}
                               {shade === '950' ? 'r(r-lg)' : ''}" 
                        style="background: {colorValue}"
                      >
                        <div class="absolute inset(0) opacity(0) group-hover:opacity(100) 
                                    bg(black.2) hbox(center/middle) transition
                                    {shade === '50' ? 'r(l-lg)' : ''}
                                    {shade === '950' ? 'r(r-lg)' : ''}">
                          {#if copiedColor === `${colorName}-${shade}`}
                            <Check size="16" class="c(white)" />
                          {:else}
                            <Copy size="16" class="c(white)" />
                          {/if}
                        </div>
                        <div class="absolute bottom(xs) left(0) right(0) text(center)">
                          <span class="text(2xs) c({parseInt(shade) >= 600 ? 'white.8' : 'black.6'}) font(medium)">{shade}</span>
                        </div>
                      </div>
                    </button>
                  {/if}
                {/each}
              </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>

  <!-- Semantic Colors -->
  <div class="bg(white) r(2xl) shadow(xl) shadow(gray-200.5) p(2xl)">
    <h3 class="heading(h2) c(gray-900) mb(xs)">Semantic Colors</h3>
    <p class="text(sm) c(gray-600) mb(2xl)">Meaningful colors for UI communication</p>
    
    <div class="grid(2) lg:grid(4) gap(lg)">
      {#each Object.entries(semanticColors) as [semanticName, config]}
        {@const [colorName, shade] = config.base.split('-')}
        {@const colorValue = colorGroups.palette[colorName]?.[shade] || ''}
        <div class="vbox gap(sm)">
          <button 
            class="group vbox gap(md) p(sm) r(lg) hover:bg(gray-50) transition border(1/gray-200) cursor-pointer relative"
            on:click={() => copyColor(semanticName)}
          >
            <div 
              class="h(64px) w(full) r(sm) shadow(md) group-hover:shadow(lg) transition"
              style="background: {colorValue}"
            ></div>
            <div class="vbox gap(xs)">
              <code class="text(sm) c(gray-900) font(bold)">{semanticName}</code>
              <p class="text(xs) c(gray-600)">{config.label}</p>
              <code class="text(xs) c(gray-500)">{config.base}</code>
            </div>
            <div class="absolute top(md) right(md) opacity(0) group-hover:opacity(100) transition">
              {#if copiedColor === semanticName}
                <Check size="14" class="c(gray-500)" />
              {:else}
                <Copy size="14" class="c(gray-500)" />
              {/if}
            </div>
          </button>
        </div>
      {/each}
    </div>
  </div>

  <!-- Color Usage Tips -->
  <div class="bg(135deg/indigo-600..purple-600) r(2xl) p(3xl) c(white)">
    <h3 class="heading(h1) mb(2xl) text(center)">Color Best Practices</h3>
    <div class="grid(3) gap(2xl) max-w(4xl) mx(auto)">
      <div class="text(center)">
        <div class="size(80px) r(full) bg(white.2) hbox(center/middle) mx(auto) mb(lg)">
          <span class="text(2xl)">🎨</span>
        </div>
        <h4 class="font(lg) bold mb(sm)">Use Semantic Colors</h4>
        <p class="text(sm) opacity(0.9)">
          primary, success, warning, error for consistent meaning
        </p>
      </div>
      <div class="text(center)">
        <div class="size(80px) r(full) bg(white.2) hbox(center/middle) mx(auto) mb(lg)">
          <span class="text(2xl)">🌈</span>
        </div>
        <h4 class="font(lg) bold mb(sm)">OKLCH Gradients</h4>
        <p class="text(sm) opacity(0.9)">
          Smooth, perceptually uniform gradients between any colors
        </p>
      </div>
      <div class="text(center)">
        <div class="size(80px) r(full) bg(white.2) hbox(center/middle) mx(auto) mb(lg)">
          <span class="text(2xl)">♿</span>
        </div>
        <h4 class="font(lg) bold mb(sm)">Accessible Contrast</h4>
        <p class="text(sm) opacity(0.9)">
          500+ shades on white, 400- shades on black backgrounds
        </p>
      </div>
    </div>
  </div>
</TokenSection>