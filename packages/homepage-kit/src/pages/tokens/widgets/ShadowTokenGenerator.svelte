<script lang="ts">
  let elevation = 8;
  let opacity = 0.1;
  let blur = 2;
  
  const scaleSteps = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  
  $: shadowScale = generateShadowScale(elevation, opacity, blur);
  
  function generateShadowScale(baseElevation: number, baseOpacity: number, baseBlur: number) {
    return scaleSteps.reduce((scale, step, index) => {
      const multiplier = Math.pow(1.5, index);
      const y = Math.round(baseElevation * multiplier * 0.5);
      const blur = Math.round(baseBlur * multiplier);
      const spread = Math.round(blur * -0.25);
      const opacity = Math.min(baseOpacity + (index * 0.02), 0.25);
      
      scale[step] = `0 ${y}px ${blur}px ${spread}px rgb(0 0 0 / ${opacity.toFixed(2)})`;
      return scale;
    }, {} as Record<string, string>);
  }
  
  function copyToClipboard() {
    const cssVars = Object.entries(shadowScale)
      .map(([step, value]) => `  --shadow-${step}: ${value};`)
      .join('\n');
    
    const code = `:root {\n${cssVars}\n}`;
    navigator.clipboard.writeText(code);
  }
</script>

<div class="vbox gap(3xl)">
  <h2 class="display(lg) font(black) tracking(tight)">Shadow</h2>
  
  <!-- Controls -->
  <div class="grid(3) gap(3xl)">
    <div class="vbox gap(lg)">
      <label class="block title(base) font(bold)">Elevation</label>
      <input 
        type="range" 
        bind:value={elevation}
        min="2"
        max="24"
        step="2"
        class="w(full)"
      />
      <div class="fonr(lg) font(mono) font(bold) text(center)">{elevation}px</div>
    </div>
    
    <div class="vbox gap(lg)">
      <label class="block title(base) font(bold)">Opacity</label>
      <input 
        type="range" 
        bind:value={opacity}
        min="0.05"
        max="0.3"
        step="0.01"
        class="w(full)"
      />
      <div class="fonr(lg) font(mono) font(bold) text(center)">{opacity.toFixed(2)}</div>
    </div>
    
    <div class="vbox gap(lg)">
      <label class="block title(base) font(bold)">Blur</label>
      <input 
        type="range" 
        bind:value={blur}
        min="1"
        max="8"
        step="1"
        class="w(full)"
      />
      <div class="fonr(lg) font(mono) font(bold) text(center)">{blur}px</div>
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
    
    <div class="grid(3) gap(3xl) p(3xl) bg(gray-50)">
      {#each Object.entries(shadowScale) as [step, value]}
        <div class="vbox gap(lg) items(center)">
          <div 
            class="w(6xl) h(4xl) bg(white) r(lg)"
            style="box-shadow: {value}"
          ></div>
          <div class="text(center)">
            <div class="font(sm) font(mono) font(bold) uppercase tracking(wider)">{step}</div>
            <div class="font(xs) font(mono) c(gray-600) max-w(5xl) break(words)">{value}</div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>