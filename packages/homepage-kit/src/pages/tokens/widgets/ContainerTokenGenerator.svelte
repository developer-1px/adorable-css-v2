<script lang="ts">
  let baseSize = 640;
  let scaleRatio = 1.25;
  let unit = 'px';
  
  const scaleSteps = ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
  const commonRatios = [
    { name: 'Minor Third', value: 1.2 },
    { name: 'Major Third', value: 1.25 },
    { name: 'Perfect Fourth', value: 1.333 },
    { name: 'Golden Ratio', value: 1.618 }
  ];
  
  $: containerScale = generateContainerScale(baseSize, scaleRatio, unit);
  
  function generateContainerScale(base: number, ratio: number, unit: string) {
    const baseIndex = scaleSteps.indexOf('sm');
    return scaleSteps.reduce((scale, step, index) => {
      const multiplier = Math.pow(ratio, index - baseIndex);
      const value = Math.round(base * multiplier);
      
      if (unit === 'rem') {
        scale[step] = `${(value / 16).toFixed(1)}rem`;
      } else {
        scale[step] = `${value}px`;
      }
      
      return scale;
    }, {} as Record<string, string>);
  }
  
  function copyToClipboard() {
    const cssVars = Object.entries(containerScale)
      .map(([step, value]) => `  --container-${step}: ${value};`)
      .join('\n');
    
    const code = `:root {\n${cssVars}\n}`;
    navigator.clipboard.writeText(code);
  }
</script>

<div class="vbox gap(3xl)">
  <h2 class="display(lg) font(black) tracking(tight)">Container</h2>
  
  <!-- Controls -->
  <div class="grid(3) gap(3xl)">
    <div class="vbox gap(lg)">
      <label class="block title(base) font(bold)">Base Size</label>
      <input 
        type="number" 
        bind:value={baseSize}
        min="320"
        max="1920"
        step="80"
        class="w(full) text(2xl) font(mono) font(bold) border(0) border-b(xs/black) bg(transparent) pb(sm) focus:outline(0)"
      />
    </div>
    
    <div class="vbox gap(lg)">
      <label class="block title(base) font(bold)">Scale Ratio</label>
      <select 
        bind:value={scaleRatio}
        class="w(full) text(lg) font(mono) font(bold) border(0) border-b(xs/black) bg(transparent) pb(sm) focus:outline(0)"
      >
        {#each commonRatios as ratio}
          <option value={ratio.value}>{ratio.name}</option>
        {/each}
      </select>
    </div>
    
    <div class="vbox gap(lg)">
      <label class="block title(base) font(bold)">Unit</label>
      <div class="hbox gap(xl)">
        <label class="hbox gap(md) cursor(pointer)">
          <input type="radio" bind:group={unit} value="rem" class="scale(1.5)" />
          <span class="title(base) font(bold)">rem</span>
        </label>
        <label class="hbox gap(md) cursor(pointer)">
          <input type="radio" bind:group={unit} value="px" class="scale(1.5)" />
          <span class="title(base) font(bold)">px</span>
        </label>
      </div>
    </div>
  </div>
  
  <!-- Preview -->
  <div class="vbox gap(xl)">
    <div class="hbox(between) items(end)">
      <h3 class="title(lg) font(bold)">Preview</h3>
      <button 
        on:click={copyToClipboard}
        class="px(xl) py(md) bg(black) c(white) font(bold) tracking(wide) uppercase hover:scale(1.05) transition-transform"
      >
        Copy
      </button>
    </div>
    
    <div class="vbox gap(lg) overflow(x-auto)">
      {#each Object.entries(containerScale) as [step, value]}
        <div class="vbox gap(sm)">
          <div class="hbox(between) items(center)">
            <code class="text(sm) font(mono) font(bold) uppercase tracking(wider)">{step}</code>
            <code class="text(sm) font(mono) c(gray-600)">{value}</code>
          </div>
          <div 
            class="h(lg) bg(gray-900) r(sm) min-w(full)"
            style="max-width: {value}; width: {value}"
          ></div>
        </div>
      {/each}
    </div>
  </div>
</div>