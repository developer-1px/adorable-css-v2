<script lang="ts">
  let baseRadius = 4;
  let scaleRatio = 2;
  let unit = 'px';
  
  const scaleSteps = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
  const commonRatios = [
    { name: 'Linear', value: 1.5 },
    { name: 'Double', value: 2 },
    { name: 'Golden', value: 1.618 },
    { name: 'Major Third', value: 1.25 }
  ];
  
  $: radiusScale = generateRadiusScale(baseRadius, scaleRatio, unit);
  
  function generateRadiusScale(base: number, ratio: number, unit: string) {
    const baseIndex = scaleSteps.indexOf('md');
    return scaleSteps.reduce((scale, step, index) => {
      const multiplier = Math.pow(ratio, index - baseIndex);
      const value = Math.max(base * multiplier, 0);
      
      if (unit === 'rem') {
        scale[step] = `${(value / 16).toFixed(3)}rem`;
      } else {
        scale[step] = `${Math.round(value)}px`;
      }
      
      return scale;
    }, {} as Record<string, string>);
  }
  
  function copyToClipboard() {
    const cssVars = Object.entries(radiusScale)
      .map(([step, value]) => `  --radius-${step}: ${value};`)
      .join('\n');
    
    const code = `:root {\n${cssVars}\n}`;
    navigator.clipboard.writeText(code);
  }
</script>

<div class="vbox gap(3xl)">
  <h2 class="display(lg) font(black) tracking(tight)">Radius</h2>
  
  <!-- Controls -->
  <div class="grid(3) gap(3xl)">
    <div class="vbox gap(lg)">
      <label class="block title(base) font(bold)">Base Radius</label>
      <input 
        type="number" 
        bind:value={baseRadius}
        min="1"
        max="32"
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
    
    <div class="grid(7) gap(lg)">
      {#each Object.entries(radiusScale) as [step, value]}
        <div class="vbox gap(md) items(center)">
          <div 
            class="w(5xl) h(5xl) bg(gray-900)"
            style="border-radius: {value}"
          ></div>
          <div class="text(center)">
            <div class="text(sm) font(mono) font(bold) uppercase tracking(wider)">{step}</div>
            <div class="text(xs) font(mono) c(gray-600)">{value}</div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>