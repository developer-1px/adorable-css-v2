<script lang="ts">
  import { onMount } from 'svelte';
  import { SCALE_RATIOS } from 'adorable-css';
  
  // Configuration state
  let typographyConfig = {
    base: 16,
    ratio: 1.2,
    unit: 'rem' as 'rem' | 'px',
    clamp: {
      min: 10,
      max: 128
    }
  };
  
  let spacingConfig = {
    baseUnit: 4,
    scale: 'progressive' as 'linear' | 'progressive' | 'fibonacci' | 'exponential',
    unit: 'rem' as 'rem' | 'px'
  };
  
  let containerConfig = {
    base: 320,
    ratio: 1.333,
    unit: 'px' as 'rem' | 'px'
  };

  // Generated scales
  let fontScale: Record<string, string> = {};
  let spacingScale: Record<string, string> = {};
  let containerScale: Record<string, string> = {};
  
  // Scale steps
  const scaleSteps = ['4xs', '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
  
  // Common ratios
  const ratios = [
    { name: 'Minor Second', value: 1.067, description: 'Very subtle (1.067)' },
    { name: 'Major Second', value: 1.125, description: 'Subtle (1.125)' },
    { name: 'Minor Third', value: 1.2, description: 'Balanced (1.2)' },
    { name: 'Major Third', value: 1.25, description: 'Clear (1.25)' },
    { name: 'Perfect Fourth', value: 1.333, description: 'Strong (1.333)' },
    { name: 'Perfect Fifth', value: 1.5, description: 'High contrast (1.5)' },
    { name: 'Golden Ratio', value: 1.618, description: 'Natural (1.618)' }
  ];
  
  // Spacing scale types
  const spacingScales = [
    { value: 'linear', name: 'Linear', description: 'Even progression' },
    { value: 'progressive', name: 'Progressive', description: 'Tighter at small, looser at large' },
    { value: 'fibonacci', name: 'Fibonacci', description: 'Natural growth pattern' },
    { value: 'exponential', name: 'Exponential', description: 'Dramatic scaling' }
  ];
  
  // Generate typography scale
  function generateTypographyScale() {
    const mdIndex = scaleSteps.indexOf('md');
    fontScale = {};
    
    scaleSteps.forEach((step, index) => {
      const n = index - mdIndex;
      let value = typographyConfig.base * Math.pow(typographyConfig.ratio, n);
      
      // Apply clamping
      if (typographyConfig.clamp) {
        value = Math.max(typographyConfig.clamp.min, Math.min(typographyConfig.clamp.max, value));
      }
      
      if (typographyConfig.unit === 'rem') {
        fontScale[step] = `${(value / 16).toFixed(3)}rem`;
      } else {
        fontScale[step] = `${Math.round(value)}px`;
      }
    });
  }
  
  // Generate spacing scale
  function generateSpacingScale() {
    spacingScale = {};
    const multipliers = getSpacingMultipliers();
    
    scaleSteps.forEach((step, index) => {
      if (index < multipliers.length) {
        const value = spacingConfig.baseUnit * multipliers[index];
        if (spacingConfig.unit === 'rem') {
          spacingScale[step] = `${(value / 16).toFixed(3)}rem`;
        } else {
          spacingScale[step] = `${Math.round(value)}px`;
        }
      }
    });
  }
  
  // Get spacing multipliers based on scale type
  function getSpacingMultipliers(): number[] {
    switch (spacingConfig.scale) {
      case 'linear':
        return [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 6, 8, 12];
      case 'progressive':
        return [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4, 5];
      case 'fibonacci':
        return [0.5, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55].map(n => n / 5);
      case 'exponential':
        return Array.from({ length: 11 }, (_, i) => {
          const n = i - 5;
          return Math.pow(1.5, n);
        });
      default:
        return [];
    }
  }
  
  // Generate container scale
  function generateContainerScale() {
    const mdIndex = scaleSteps.indexOf('md');
    containerScale = {};
    
    scaleSteps.forEach((step, index) => {
      const n = index - mdIndex;
      const value = containerConfig.base * Math.pow(containerConfig.ratio, n);
      
      if (containerConfig.unit === 'rem') {
        containerScale[step] = `${(value / 16).toFixed(3)}rem`;
      } else {
        containerScale[step] = `${Math.round(value)}px`;
      }
    });
  }
  
  // Generate all scales
  function generateAllScales() {
    generateTypographyScale();
    generateSpacingScale();
    generateContainerScale();
  }
  
  // Copy configuration to clipboard
  function copyConfig() {
    const config = `import { generateTokenScales, SCALE_RATIOS } from '@adorable-css/design-system/tokens';

const tokens = generateTokenScales({
  typography: {
    base: ${typographyConfig.base},
    ratio: ${typographyConfig.ratio}, // ${ratios.find(r => r.value === typographyConfig.ratio)?.name || 'Custom'}
    unit: '${typographyConfig.unit}',
    clamp: { min: ${typographyConfig.clamp.min}, max: ${typographyConfig.clamp.max} }
  },
  spacing: {
    baseUnit: ${spacingConfig.baseUnit},
    scale: '${spacingConfig.scale}',
    unit: '${spacingConfig.unit}'
  },
  sizing: {
    base: ${containerConfig.base},
    ratio: ${containerConfig.ratio}, // ${ratios.find(r => r.value === containerConfig.ratio)?.name || 'Custom'}
    unit: '${containerConfig.unit}'
  }
});`;
    
    navigator.clipboard.writeText(config);
  }
  
  // Initialize on mount
  onMount(() => {
    generateAllScales();
  });
  
  // Reactive updates
  $: if (typographyConfig || spacingConfig || containerConfig) {
    generateAllScales();
  }
</script>

<div class="vbox gap(3xl)">
  <!-- Header -->
  <div class="vbox gap(lg) text(center)">
    <h2 class="display(md) gradient">Token Scale Generator</h2>
    <p class="body(lg) c(gray-600) max-w(4xl) mx(auto)">
      Create mathematically consistent design token scales. Configure your ratios and see the results in real-time.
    </p>
  </div>

  <!-- Configuration Section -->
  <div class="grid(1) lg:grid(3) gap(2xl)">
    <!-- Typography Configuration -->
    <div class="vbox gap(xl) p(2xl) bg(white) r(xl) shadow(sm)">
      <div class="vbox gap(sm)">
        <h3 class="title(lg) c(gray-900)">Typography Scale</h3>
        <p class="body(sm) c(gray-600)">Configure font size progression</p>
      </div>
      
      <div class="vbox gap(lg)">
        <!-- Base Size -->
        <div class="vbox gap(xs)">
          <label class="label(sm) c(gray-700)">Base Size (md)</label>
          <div class="hbox gap(sm)">
            <input 
              type="number" 
              bind:value={typographyConfig.base}
              min="8"
              max="32"
              class="flex(1) px(md) py(sm) r(md) border(1/gray-300) focus:border(purple-500) focus:ring(2/purple-200)"
            />
            <span class="body(sm) c(gray-600) self-center">px</span>
          </div>
        </div>
        
        <!-- Ratio -->
        <div class="vbox gap(xs)">
          <label class="label(sm) c(gray-700)">Scale Ratio</label>
          <select 
            bind:value={typographyConfig.ratio}
            class="px(md) py(sm) r(md) border(1/gray-300) focus:border(purple-500) focus:ring(2/purple-200)"
          >
            {#each ratios as ratio}
              <option value={ratio.value}>{ratio.name} - {ratio.description}</option>
            {/each}
          </select>
        </div>
        
        <!-- Unit -->
        <div class="vbox gap(xs)">
          <label class="label(sm) c(gray-700)">Unit</label>
          <div class="hbox gap(md)">
            <label class="hbox gap(xs)">
              <input type="radio" bind:group={typographyConfig.unit} value="rem" />
              <span class="body(sm)">rem</span>
            </label>
            <label class="hbox gap(xs)">
              <input type="radio" bind:group={typographyConfig.unit} value="px" />
              <span class="body(sm)">px</span>
            </label>
          </div>
        </div>
        
        <!-- Clamp -->
        <div class="vbox gap(xs)">
          <label class="label(sm) c(gray-700)">Clamp Range</label>
          <div class="hbox gap(sm)">
            <input 
              type="number" 
              bind:value={typographyConfig.clamp.min}
              placeholder="Min"
              class="flex(1) px(md) py(sm) r(md) border(1/gray-300) focus:border(purple-500) focus:ring(2/purple-200)"
            />
            <span class="body(sm) c(gray-600)">to</span>
            <input 
              type="number" 
              bind:value={typographyConfig.clamp.max}
              placeholder="Max"
              class="flex(1) px(md) py(sm) r(md) border(1/gray-300) focus:border(purple-500) focus:ring(2/purple-200)"
            />
          </div>
        </div>
      </div>
    </div>
    
    <!-- Spacing Configuration -->
    <div class="vbox gap(xl) p(2xl) bg(white) r(xl) shadow(sm)">
      <div class="vbox gap(sm)">
        <h3 class="title(lg) c(gray-900)">Spacing Scale</h3>
        <p class="body(sm) c(gray-600)">Configure spacing progression</p>
      </div>
      
      <div class="vbox gap(lg)">
        <!-- Base Unit -->
        <div class="vbox gap(xs)">
          <label class="label(sm) c(gray-700)">Base Unit</label>
          <div class="hbox gap(sm)">
            <input 
              type="number" 
              bind:value={spacingConfig.baseUnit}
              min="2"
              max="16"
              class="flex(1) px(md) py(sm) r(md) border(1/gray-300) focus:border(purple-500) focus:ring(2/purple-200)"
            />
            <span class="body(sm) c(gray-600) self-center">px</span>
          </div>
        </div>
        
        <!-- Scale Type -->
        <div class="vbox gap(xs)">
          <label class="label(sm) c(gray-700)">Scale Type</label>
          <select 
            bind:value={spacingConfig.scale}
            class="px(md) py(sm) r(md) border(1/gray-300) focus:border(purple-500) focus:ring(2/purple-200)"
          >
            {#each spacingScales as scale}
              <option value={scale.value}>{scale.name} - {scale.description}</option>
            {/each}
          </select>
        </div>
        
        <!-- Unit -->
        <div class="vbox gap(xs)">
          <label class="label(sm) c(gray-700)">Unit</label>
          <div class="hbox gap(md)">
            <label class="hbox gap(xs)">
              <input type="radio" bind:group={spacingConfig.unit} value="rem" />
              <span class="body(sm)">rem</span>
            </label>
            <label class="hbox gap(xs)">
              <input type="radio" bind:group={spacingConfig.unit} value="px" />
              <span class="body(sm)">px</span>
            </label>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Container Configuration -->
    <div class="vbox gap(xl) p(2xl) bg(white) r(xl) shadow(sm)">
      <div class="vbox gap(sm)">
        <h3 class="title(lg) c(gray-900)">Container Scale</h3>
        <p class="body(sm) c(gray-600)">Configure container sizes</p>
      </div>
      
      <div class="vbox gap(lg)">
        <!-- Base Size -->
        <div class="vbox gap(xs)">
          <label class="label(sm) c(gray-700)">Base Size (md)</label>
          <div class="hbox gap(sm)">
            <input 
              type="number" 
              bind:value={containerConfig.base}
              min="200"
              max="800"
              class="flex(1) px(md) py(sm) r(md) border(1/gray-300) focus:border(purple-500) focus:ring(2/purple-200)"
            />
            <span class="body(sm) c(gray-600) self-center">px</span>
          </div>
        </div>
        
        <!-- Ratio -->
        <div class="vbox gap(xs)">
          <label class="label(sm) c(gray-700)">Scale Ratio</label>
          <select 
            bind:value={containerConfig.ratio}
            class="px(md) py(sm) r(md) border(1/gray-300) focus:border(purple-500) focus:ring(2/purple-200)"
          >
            {#each ratios as ratio}
              <option value={ratio.value}>{ratio.name} - {ratio.description}</option>
            {/each}
          </select>
        </div>
        
        <!-- Unit -->
        <div class="vbox gap(xs)">
          <label class="label(sm) c(gray-700)">Unit</label>
          <div class="hbox gap(md)">
            <label class="hbox gap(xs)">
              <input type="radio" bind:group={containerConfig.unit} value="rem" />
              <span class="body(sm)">rem</span>
            </label>
            <label class="hbox gap(xs)">
              <input type="radio" bind:group={containerConfig.unit} value="px" />
              <span class="body(sm)">px</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Generated Scales Preview -->
  <div class="vbox gap(2xl)">
    <!-- Typography Scale -->
    <div class="vbox gap(lg) p(2xl) bg(white) r(xl) shadow(sm)">
      <div class="hbox(between)">
        <h3 class="title(lg) c(gray-900)">Generated Typography Scale</h3>
        <button 
          on:click={copyConfig}
          class="btn(ghost/sm) hbox gap(sm)"
        >
          <svg class="w(16) h(16)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          Copy Config
        </button>
      </div>
      
      <div class="vbox gap(md)">
        {#each Object.entries(fontScale) as [step, value]}
          <div class="hbox(between) p(md) r(md) bg(gray-50)">
            <div class="hbox gap(lg)">
              <code class="mono body(sm) c(purple-600)">{step}</code>
              <span 
                class="body(base) c(gray-900)"
                style="font-size: {value}"
              >
                The quick brown fox
              </span>
            </div>
            <code class="mono caption c(gray-600)">{value}</code>
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Spacing Scale -->
    <div class="vbox gap(lg) p(2xl) bg(white) r(xl) shadow(sm)">
      <h3 class="title(lg) c(gray-900)">Generated Spacing Scale</h3>
      
      <div class="vbox gap(md)">
        {#each Object.entries(spacingScale) as [step, value]}
          <div class="hbox(between) p(md) r(md) bg(gray-50)">
            <div class="hbox gap(lg)">
              <code class="mono body(sm) c(purple-600) w(48)">{step}</code>
              <div 
                class="h(24) bg(purple-500) r(sm)"
                style="width: {value}"
              ></div>
            </div>
            <code class="mono caption c(gray-600)">{value}</code>
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Container Scale -->
    <div class="vbox gap(lg) p(2xl) bg(white) r(xl) shadow(sm)">
      <h3 class="title(lg) c(gray-900)">Generated Container Scale</h3>
      
      <div class="vbox gap(md) overflow(x-auto)">
        {#each Object.entries(containerScale) as [step, value]}
          <div class="hbox(between) p(md) r(md) bg(gray-50) min-w(400)">
            <div class="hbox gap(lg)">
              <code class="mono body(sm) c(purple-600) w(48)">{step}</code>
              <div 
                class="h(40) bg(purple-100) border(2/purple-300) r(sm) hbox(center)"
                style="width: {value}; max-width: 100%"
              >
                <span class="caption c(purple-700)">Container</span>
              </div>
            </div>
            <code class="mono caption c(gray-600) ml(lg)">{value}</code>
          </div>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Export Section -->
  <div class="vbox gap(lg) p(2xl) bg(purple-50) r(xl) border(2/purple-200)">
    <h3 class="title(lg) c(purple-900)">Use in Your Project</h3>
    <pre class="p(lg) bg(white) r(md) overflow(x-auto) mono caption">
<code>{`// adorable.config.ts
import { generateTokenScales } from '@adorable-css/design-system/tokens';

export const tokens = generateTokenScales({
  typography: {
    base: ${typographyConfig.base},
    ratio: ${typographyConfig.ratio},
    unit: '${typographyConfig.unit}',
    clamp: { min: ${typographyConfig.clamp.min}, max: ${typographyConfig.clamp.max} }
  },
  spacing: {
    baseUnit: ${spacingConfig.baseUnit},
    scale: '${spacingConfig.scale}',
    unit: '${spacingConfig.unit}'
  }
});`}</code>
    </pre>
  </div>
</div>