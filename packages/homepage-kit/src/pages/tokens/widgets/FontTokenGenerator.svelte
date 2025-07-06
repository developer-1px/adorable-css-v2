<script lang="ts">
  let baseSize = 16;
  let scaleRatio = 1.25;
  let unit = 'rem';
  
  const scaleSteps = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'];
  const commonRatios = [
    { name: 'Minor Second', value: 1.067 },
    { name: 'Major Second', value: 1.125 },
    { name: 'Minor Third', value: 1.2 },
    { name: 'Major Third', value: 1.25 },
    { name: 'Perfect Fourth', value: 1.333 },
    { name: 'Golden Ratio', value: 1.618 }
  ];
  
  $: fontScale = generateFontScale(baseSize, scaleRatio, unit);
  
  function generateFontScale(base: number, ratio: number, unit: string) {
    const baseIndex = scaleSteps.indexOf('base');
    return scaleSteps.reduce((scale, step, index) => {
      const multiplier = Math.pow(ratio, index - baseIndex);
      const size = base * multiplier;
      
      if (unit === 'rem') {
        scale[step] = `${(size / 16).toFixed(3)}rem`;
      } else {
        scale[step] = `${Math.round(size)}px`;
      }
      
      return scale;
    }, {} as Record<string, string>);
  }
  
  function copyToClipboard() {
    const cssVars = Object.entries(fontScale)
      .map(([step, value]) => `  --text-${step}: ${value};`)
      .join('\n');
    
    const code = `:root {\n${cssVars}\n}`;
    navigator.clipboard.writeText(code);
  }
</script>

<div class="vbox(center) py(6xl)">
  <div class="max-w(5xl) vbox gap(8xl)">
    <!-- Header -->
    <div class="text(center) vbox gap(2xl)">
      <h2 class="display(2xl) c(gray-900)">Typography Scale Generator</h2>
      <p class="body(lg) c(mute) max-w(3xl)">Configure mathematical font size progression for consistent typography</p>
    </div>
  
  <!-- Controls Section -->
  <section class="vbox gap(4xl)">
    <h3 class="title(xl) font(bold)">Configuration</h3>
    
    <div class="vbox gap(4xl)">
      <!-- Base Size -->
      <div class="vbox gap(xl)">
        <label for="baseSize" class="title(lg) font(bold)">Base Size</label>
        <input 
          id="baseSize"
          type="number" 
          bind:value={baseSize}
          min="12"
          max="24"
          class="w(xs) text(3xl) font(mono) font(bold) border(0) border-b(xs/black) bg(transparent) pb(lg) outline(0)"
        />
        <p class="caption c(gray-600)">Foundation size for 'md' scale step</p>
      </div>
      
      <!-- Scale Ratio -->
      <div class="vbox gap(xl)">
        <label for="scaleRatio" class="title(lg) font(bold)">Scale Ratio</label>
        <select 
          id="scaleRatio"
          bind:value={scaleRatio}
          class="w(sm) text(xl) font(mono) font(bold) border(0) border-b(xs/black) bg(transparent) pb(lg) outline(0)"
        >
          {#each commonRatios as ratio (ratio.value)}
            <option value={ratio.value}>{ratio.name} ({ratio.value})</option>
          {/each}
        </select>
        <p class="caption c(gray-600)">Mathematical progression ratio between steps</p>
      </div>
      
      <!-- Unit -->
      <fieldset class="vbox gap(xl)">
        <legend class="title(lg) font(bold)">Unit Type</legend>
        <div class="hbox gap(3xl)">
          <label class="hbox gap(lg) cursor(pointer)">
            <input type="radio" bind:group={unit} value="rem" class="scale(1.2)" />
            <span class="title(lg) font(bold)">rem</span>
          </label>
          <label class="hbox gap(lg) cursor(pointer)">
            <input type="radio" bind:group={unit} value="px" class="scale(1.2)" />
            <span class="title(lg) font(bold)">px</span>
          </label>
        </div>
        <p class="caption c(gray-600)">rem scales with user preferences, px is absolute</p>
      </fieldset>
    </div>
  </section>
  
  <!-- Preview Section -->
  <section class="vbox gap(4xl)">
    <div class="hbox(between) items(center)">
      <h3 class="title(xl) font(bold)">Generated Scale</h3>
      <button 
        on:click={copyToClipboard}
        class="px(3xl) py(xl) bg(black) c(white) font(bold) tracking(wide) uppercase hover:scale(1.05) transition-transform"
      >
        Copy CSS Variables
      </button>
    </div>
    
    <div class="vbox gap(3xl) p(3xl) bg(gray-50) r(lg)">
      {#each Object.entries(fontScale) as [step, value] (step)}
        <div class="vbox gap(lg) border-b(xs/gray-200) pb(3xl)">
          <div class="hbox(between) items(baseline)">
            <div class="hbox gap(xl) items(baseline)">
              <code class="text(lg) font(mono) font(bold) uppercase tracking(wider) w(xs)">{step}</code>
              <code class="text(base) font(mono) c(gray-600)">{value}</code>
            </div>
          </div>
          <div 
            class="font(bold) leading(tight) c(gray-900)"
            style="font-size: {value};"
          >
            The quick brown fox jumps over the lazy dog
          </div>
        </div>
      {/each}
    </div>
  </section>
  </div>
</div>