<script lang="ts">
  let baseUnit = 4;
  let scaleType = 'progressive';
  let unit = 'rem';
  
  const scaleSteps = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'];
  const scaleTypes = [
    { value: 'linear', name: 'Linear', desc: 'Even progression' },
    { value: 'progressive', name: 'Progressive', desc: 'Tighter at small, looser at large' },
    { value: 'fibonacci', name: 'Fibonacci', desc: 'Natural growth pattern' },
    { value: 'exponential', name: 'Exponential', desc: 'Dramatic scaling' }
  ];
  
  $: spacingScale = generateSpacingScale(baseUnit, scaleType, unit);
  
  function generateSpacingScale(base: number, type: string, unit: string) {
    const multipliers = getMultipliers(type);
    return scaleSteps.reduce((scale, step, index) => {
      if (index < multipliers.length) {
        const value = base * multipliers[index];
        if (unit === 'rem') {
          scale[step] = `${(value / 16).toFixed(3)}rem`;
        } else {
          scale[step] = `${Math.round(value)}px`;
        }
      }
      return scale;
    }, {} as Record<string, string>);
  }
  
  function getMultipliers(type: string): number[] {
    switch (type) {
      case 'linear':
        return [0.25, 0.5, 1, 1.5, 2, 3, 4, 6, 8];
      case 'progressive':
        return [0.25, 0.5, 1, 1.25, 1.5, 2, 2.5, 3, 4];
      case 'fibonacci':
        return [0.5, 1, 1, 2, 3, 5, 8, 13, 21].map(n => n / 5);
      case 'exponential':
        return Array.from({ length: 9 }, (_, i) => Math.pow(1.5, i - 2));
      default:
        return [];
    }
  }
  
  function copyToClipboard() {
    const cssVars = Object.entries(spacingScale)
      .map(([step, value]) => `  --spacing-${step}: ${value};`)
      .join('\n');
    
    const code = `:root {\n${cssVars}\n}`;
    navigator.clipboard.writeText(code);
  }
</script>

<div class="vbox(center) py(4xl)">
  <div class="max-w(4xl) vbox gap(8xl)">
    <!-- Header -->
    <div class="text(center) vbox gap(lg)">
      <h2 class="display(xl) font(black) tracking(tight)">Spacing Scale</h2>
      <div class="vbox(center)">
        <p class="text(lg) c(gray-600) max-w(2xl)">Generate consistent spacing system for layouts</p>
      </div>
    </div>
  
  <!-- Controls -->
  <section class="vbox gap(4xl)">
    <h3 class="title(xl) font(bold)">Configuration</h3>
    
    <div class="vbox gap(4xl)">
      <!-- Base Unit -->
      <div class="vbox gap(xl)">
        <label class="title(lg) font(bold)">Base Unit</label>
        <input 
          type="number" 
          bind:value={baseUnit}
          min="2"
          max="16"
          class="w(12xl) text(3xl) font(mono) font(bold) border(0) border-b(xs/black) bg(transparent) pb(lg) focus:outline(0)"
        />
        <p class="caption c(gray-600)">Smallest spacing unit (typically xs or sm)</p>
      </div>
      
      <!-- Scale Type -->
      <div class="vbox gap(xl)">
        <label class="title(lg) font(bold)">Progression Type</label>
        <select 
          bind:value={scaleType}
          class="w(25xl) text(xl) font(mono) font(bold) border(0) border-b(xs/black) bg(transparent) pb(lg) focus:outline(0)"
        >
          {#each scaleTypes as type}
            <option value={type.value}>{type.name} - {type.desc}</option>
          {/each}
        </select>
        <p class="caption c(gray-600)">How spacing values increase across the scale</p>
      </div>
      
      <!-- Unit -->
      <div class="vbox gap(xl)">
        <label class="title(lg) font(bold)">Unit Type</label>
        <div class="hbox gap(3xl)">
          <label class="hbox gap(lg) cursor(pointer)">
            <input type="radio" bind:group={unit} value="rem" class="scale(1.5)" />
            <span class="title(lg) font(bold)">rem</span>
          </label>
          <label class="hbox gap(lg) cursor(pointer)">
            <input type="radio" bind:group={unit} value="px" class="scale(1.5)" />
            <span class="title(lg) font(bold)">px</span>
          </label>
        </div>
        <p class="caption c(gray-600)">rem scales with user preferences, px is absolute</p>
      </div>
    </div>
  </section>
  
  <!-- Preview -->
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
    
    <div class="vbox gap(2xl) p(3xl) bg(gray-50) r(lg)">
      {#each Object.entries(spacingScale) as [step, value]}
        <div class="vbox gap(lg)">
          <div class="hbox(between) items(baseline)">
            <code class="text(lg) font(mono) font(bold) uppercase tracking(wider)">{step}</code>
            <code class="text(base) font(mono) c(gray-600)">{value}</code>
          </div>
          <div class="h(xl) bg(black) r(xs) transition-all" style="width: {value}; max-width: 100%;"></div>
        </div>
      {/each}
    </div>
  </section>
  </div>
</div>