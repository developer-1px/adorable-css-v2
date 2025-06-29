<script lang="ts">
  import { colorPalette } from 'adorable-css';
  import { Palette, Droplet, Sun, Copy, Check } from 'lucide-svelte';
  import TokenSection from '$lib/components/tokens/TokenSection.svelte';
  import TokenCard from '$lib/components/tokens/TokenCard.svelte';
  import ColorSwatch from '$lib/components/tokens/ColorSwatch.svelte';
  import CopyButton from '$lib/components/tokens/CopyButton.svelte';
  
  // Get color groups from OKLCH palette
  function getColorGroups() {
    const groups = {
      brand: ['indigo', 'purple', 'violet'],
      semantic: ['blue', 'green', 'amber', 'red'],
      spectrum: ['rose', 'pink', 'fuchsia', 'orange', 'yellow', 'lime', 'emerald', 'teal', 'cyan', 'sky'],
      neutral: ['gray', 'slate', 'zinc', 'neutral', 'stone'],
      palette: {}
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
          class="group relative h(160px) r(xl) {gradient.class} shadow(lg) hover:shadow(2xl) 
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

  <!-- Brand Colors -->
  <div class="bg(white) r(2xl) shadow(xl) shadow(gray-200.5) overflow(hidden)">
    <div class="p(2xl) border-b(1px/gray-100)">
      <div class="hbox(between/middle) mb(xl)">
        <div>
          <h3 class="heading(h2) c(gray-900) mb(xs)">Brand Colors</h3>
          <p class="text(sm) c(gray-600)">Primary palette for brand identity</p>
        </div>
        <Droplet size="20" class="c(indigo-500)" />
      </div>
      
      <div class="grid gap(2xl)">
        {#each colorGroups.brand as colorName}
          {#if colorGroups.palette[colorName]}
            <div>
              <h4 class="font(lg) bold capitalize c(gray-800) mb(lg)">{colorName}</h4>
              <div class="grid(auto-fit/minmax(80px,1fr)) gap(sm)">
                {#each shades as shade}
                  {#if colorGroups.palette[colorName][shade]}
                    {@const colorValue = colorGroups.palette[colorName][shade]}
                    <button 
                      class="group vbox gap(xs) p(sm) r(lg) hover:bg(gray-50) transition cursor-pointer"
                      on:click={() => copyColor(`${colorName}-${shade}`)}
                    >
                      <div 
                        class="h(64px) w(full) r(lg) shadow(md) group-hover:shadow(lg) 
                               group-hover:scale(1.05) transition relative overflow(hidden)" 
                        style="background: {colorValue}"
                      >
                        <div class="absolute inset(0) opacity(0) group-hover:opacity(100) 
                                    bg(black.1) hbox(center/middle) transition">
                          {#if copiedColor === `${colorName}-${shade}`}
                            <Check size="16" class="c(white)" />
                          {:else}
                            <Copy size="16" class="c(white)" />
                          {/if}
                        </div>
                      </div>
                      <span class="text(xs) font(medium) c(gray-700)">{shade}</span>
                    </button>
                  {/if}
                {/each}
              </div>
            </div>
          {/if}
        {/each}
      </div>
    </div>
  </div>

  <!-- Semantic Colors -->
  <div class="bg(white) r(2xl) shadow(xl) shadow(gray-200.5) p(2xl)">
    <h3 class="heading(h2) c(gray-900) mb(xs)">Semantic Colors</h3>
    <p class="text(sm) c(gray-600) mb(2xl)">Meaningful colors for UI communication</p>
    
    <div class="grid(2) lg:grid(4) gap(xl)">
      {#each colorGroups.semantic as colorName}
        {#if colorGroups.palette[colorName]}
          <div class="vbox gap(sm)">
            <h4 class="font(medium) capitalize c(gray-800)">{colorName}</h4>
            <div class="vbox gap(xs)">
              {#each ['400', '500', '600'] as shade}
                {#if colorGroups.palette[colorName][shade]}
                  {@const colorValue = colorGroups.palette[colorName][shade]}
                  <button 
                    class="group hbox(between/middle) p(sm) r(lg) hover:bg(gray-50) transition"
                    on:click={() => copyColor(`${colorName}-${shade}`)}
                  >
                    <div class="hbox(start/middle) gap(sm)">
                      <div 
                        class="size(32px) r(md) shadow(sm)" 
                        style="background: {colorValue}"
                      ></div>
                      <code class="text(xs) c(gray-600)">{colorName}-{shade}</code>
                    </div>
                    <div class="opacity(0) group-hover:opacity(100) transition">
                      {#if copiedColor === `${colorName}-${shade}`}
                        <Check size="14" class="c(gray-500)" />
                      {:else}
                        <Copy size="14" class="c(gray-500)" />
                      {/if}
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

  <!-- Full Spectrum -->
  <details class="bg(white) r(2xl) shadow(xl) shadow(gray-200.5) overflow(hidden)">
    <summary class="p(2xl) cursor-pointer hover:bg(gray-50) transition">
      <div class="hbox(between/middle)">
        <div>
          <h3 class="heading(h2) c(gray-900) mb(xs) inline">Full Color Spectrum</h3>
          <p class="text(sm) c(gray-600)">Complete palette with all shades</p>
        </div>
        <span class="text(sm) c(indigo-600)">Show all colors →</span>
      </div>
    </summary>
    
    <div class="p(2xl) pt(0) vbox gap(2xl)">
      {#each [...colorGroups.spectrum, ...colorGroups.neutral] as colorName}
        {#if colorGroups.palette[colorName]}
          <div>
            <h4 class="font(lg) bold capitalize c(gray-800) mb(lg)">{colorName}</h4>
            <div class="grid(auto-fit/minmax(60px,1fr)) gap(xs)">
              {#each shades as shade}
                {#if colorGroups.palette[colorName][shade]}
                  {@const colorValue = colorGroups.palette[colorName][shade]}
                  <button 
                    class="group vbox gap(xs) p(xs) r(md) hover:bg(gray-50) transition"
                    on:click={() => copyColor(`${colorName}-${shade}`)}
                  >
                    <div 
                      class="h(48px) w(full) r(md) shadow(sm) group-hover:shadow(md) 
                             group-hover:scale(1.05) transition" 
                      style="background: {colorValue}"
                    ></div>
                    <span class="text(2xs) c(gray-600)">{shade}</span>
                  </button>
                {/if}
              {/each}
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </details>

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
          blue for info, green for success, amber for warning, red for danger
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