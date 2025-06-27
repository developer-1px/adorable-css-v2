<script lang="ts">
  import { Palette, Ruler, Sparkles, Sliders } from 'lucide-svelte';
  
  let spacingScale = $state(1.5); // Golden ratio default
  let spacingBase = $state(4); // Base unit in px
  let colorTemperature = $state(0);
  let colorVibrance = $state(0);

  // Color adjustment
  $effect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-temp', colorTemperature.toString());
    root.style.setProperty('--color-vibrance', colorVibrance.toString());
  });
  
  const spacingPresets = [
    { name: 'Compact', scale: 1.2, base: 4, description: 'Dense, data-heavy interfaces' },
    { name: 'Default', scale: 1.5, base: 4, description: 'Balanced for most uses' },
    { name: 'Comfortable', scale: 1.618, base: 4, description: 'Golden ratio spacing' },
    { name: 'Spacious', scale: 2, base: 4, description: 'Luxury, minimal designs' }
  ];
  
  const colorMoods = [
    { name: 'Neutral', temp: 0, vibrance: 0 },
    { name: 'Warm & Cozy', temp: 20, vibrance: 10 },
    { name: 'Cool & Professional', temp: -20, vibrance: -10 },
    { name: 'Vibrant & Playful', temp: 0, vibrance: 30 },
    { name: 'Muted & Elegant', temp: -10, vibrance: -20 }
  ];
</script>

<section class="section(feature) bg(gray-50)">
  <div class="contain(wide)">
    
    <!-- Section Header -->
    <div class="content(centered)">
      <h2 class="900 font(4xl) c(gray-900)">
        Design Tokens That
        <span class="block bg(135deg/#8b5cf6..#ec4899)" style="-webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
          Adapt to Your Brand
        </span>
      </h2>
      <p class="lead() flow()">
        Every brand has its own personality. <strong class="c(gray-900)">AdorableCSS's smart token system</strong> 
        lets you customize spacing rhythm and color mood while maintaining perfect mathematical relationships. 
        No more "close enough"—get exactly the feeling you want.
      </p>
    </div>

    <!-- Spacing Tool -->
    <div class="card(elevated) p(xl)">
      <div class="hbox(middle) gap(lg) mb(xl)">
        <div class="w(60px) h(60px) bg(purple-100) r(full) vbox(pack)">
          <Ruler size="30" class="c(purple-600)" />
        </div>
        <div class="vbox gap(xs)">
          <h3 class="700 font(2xl) c(gray-800)">Spacing Rhythm Designer</h3>
          <p class="font(md) c(gray-600)">
            Drag to feel the perfect spacing. Watch your entire UI breathe differently.
          </p>
        </div>
      </div>
      
      <div class="grid grid-cols(1) lg:grid-cols(2) gap(xl)">
        <!-- Controls -->
        <div class="vbox gap(lg)">
          <div class="vbox gap(md)">
            <label class="font(sm) 600 c(gray-700)">
              Spacing Scale: <span class="c(purple-600)">{spacingScale.toFixed(2)}</span>
              <span class="font(xs) c(gray-500) ml(sm)">(Mathematical ratio between sizes)</span>
            </label>
            <input 
              type="range" 
              min="1.1" 
              max="2.5" 
              step="0.01"
              bind:value={spacingScale}
              class="w(full)"
              style="--thumb-color: #8b5cf6"
            />
            <div class="hbox(between) font(xs) c(gray-500)">
              <span>Tight</span>
              <span>Balanced</span>
              <span>Spacious</span>
            </div>
          </div>
          
          <div class="vbox gap(md)">
            <label class="font(sm) 600 c(gray-700)">
              Base Unit: <span class="c(purple-600)">{spacingBase}px</span>
              <span class="font(xs) c(gray-500) ml(sm)">(Smallest spacing unit)</span>
            </label>
            <input 
              type="range" 
              min="2" 
              max="8" 
              step="1"
              bind:value={spacingBase}
              class="w(full)"
              style="--thumb-color: #8b5cf6"
            />
          </div>
          
          <!-- Presets -->
          <div class="vbox gap(sm)">
            <h4 class="font(sm) 600 c(gray-700)">Quick Presets</h4>
            <div class="grid grid-cols(2) gap(sm)">
              {#each spacingPresets as preset}
                <button 
                  class="card() p(md) text(left) hover:border(purple-500) transition cursor(pointer)"
                  class:border-purple-500={spacingScale === preset.scale && spacingBase === preset.base}
                  onclick={() => { spacingScale = preset.scale; spacingBase = preset.base; }}
                >
                  <div class="600 font(sm) c(gray-800)">{preset.name}</div>
                  <div class="font(xs) c(gray-600)">{preset.description}</div>
                </button>
              {/each}
            </div>
          </div>
        </div>
        
        <!-- Live Preview -->
        <div class="vbox gap(lg)">
          <div class="card() p(lg)">
            <h4 class="heading(h4) mb(var(--spacing-md))">Live Preview</h4>
            <p class="mb(var(--spacing-lg)) c(gray-600)">
              This card updates in real-time as you adjust the spacing scale.
            </p>
            <div class="hbox gap(var(--spacing-md))">
              <button class="btn() px(var(--spacing-lg)) py(var(--spacing-md))">Button</button>
              <button class="btn(secondary) px(var(--spacing-lg)) py(var(--spacing-md))">Cancel</button>
            </div>
          </div>
          
          <!-- Visual Scale -->
          <div class="vbox gap(sm)">
            <h5 class="font(sm) 600 c(gray-700)">Your Spacing Scale (4px Grid)</h5>
            <div class="vbox gap(xs)">
              {#each [
                { size: 'xs', label: '4px', desc: '1x' },
                { size: 'sm', label: '8px', desc: '2x' },
                { size: 'md', label: '12px', desc: '3x' },
                { size: 'lg', label: '16px', desc: '4x' },
                { size: 'xl', label: '20px', desc: '5x' },
                { size: '2xl', label: '24px', desc: '6x' },
                { size: '3xl', label: '32px', desc: '8x' },
                { size: '4xl', label: '40px', desc: '10x' }
              ] as item}
                <div class="hbox(middle) gap(md)">
                  <div class="w(40px) font(xs) c(gray-500)">{item.size}</div>
                  <div 
                    class="h(20px) bg(purple-400) r(sm) transition"
                    style="width: var(--spacing-{item.size})"
                  ></div>
                  <div class="font(xs) c(gray-600) hbox gap(xs)">
                    <span class="600">{item.label}</span>
                    <span class="c(gray-400)">({item.desc})</span>
                  </div>
                </div>
              {/each}
            </div>
            <div class="mt(sm) p(sm) bg(purple-50) r(sm)">
              <p class="font(xs) c(purple-700)">
                <strong>4px Grid System:</strong> Every spacing value is a multiple of 4px,
                ensuring pixel-perfect alignment across all screen sizes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Color Tool -->
    <div class="card(elevated) p(xl)">
      <div class="hbox(middle) gap(lg) mb(xl)">
        <div class="w(60px) h(60px) bg(pink-100) r(full) vbox(pack)">
          <Palette size="30" class="c(pink-600)" />
        </div>
        <div class="vbox gap(xs)">
          <h3 class="700 font(2xl) c(gray-800)">Color Mood Studio</h3>
          <p class="font(md) c(gray-600)">
            Adjust the emotional temperature and vibrance. Feel the mood shift across your entire palette.
          </p>
        </div>
      </div>
      
      <div class="grid grid-cols(1) lg:grid-cols(2) gap(xl)">
        <!-- Controls -->
        <div class="vbox gap(lg)">
          <div class="vbox gap(md)">
            <label class="font(sm) 600 c(gray-700)">
              Temperature: <span class="c(purple-600)">{colorTemperature > 0 ? '+' : ''}{colorTemperature}°</span>
              <span class="font(xs) c(gray-500) ml(sm)">{colorTemperature > 0 ? 'Warmer' : colorTemperature < 0 ? 'Cooler' : 'Neutral'}</span>
            </label>
            <input 
              type="range" 
              min="-30" 
              max="30" 
              step="1"
              bind:value={colorTemperature}
              class="w(full)"
              style="--thumb-color: {colorTemperature > 0 ? '#f59e0b' : '#06b6d4'}"
            />
            <div class="hbox(between) font(xs) c(gray-500)">
              <span class="c(blue-600)">Cool</span>
              <span>Neutral</span>
              <span class="c(orange-600)">Warm</span>
            </div>
          </div>
          
          <div class="vbox gap(md)">
            <label class="font(sm) 600 c(gray-700)">
              Vibrance: <span class="c(purple-600)">{colorVibrance > 0 ? '+' : ''}{colorVibrance}%</span>
              <span class="font(xs) c(gray-500) ml(sm)">{colorVibrance > 0 ? 'More vivid' : colorVibrance < 0 ? 'More muted' : 'Natural'}</span>
            </label>
            <input 
              type="range" 
              min="-50" 
              max="50" 
              step="1"
              bind:value={colorVibrance}
              class="w(full)"
              style="--thumb-color: #ec4899"
            />
            <div class="hbox(between) font(xs) c(gray-500)">
              <span>Muted</span>
              <span>Natural</span>
              <span>Vibrant</span>
            </div>
          </div>
          
          <!-- Mood Presets -->
          <div class="vbox gap(sm)">
            <h4 class="font(sm) 600 c(gray-700)">Color Moods</h4>
            <div class="vbox gap(sm)">
              {#each colorMoods as mood}
                <button 
                  class="card() p(md) text(left) hbox(middle+between) hover:border(purple-500) transition cursor(pointer)"
                  class:border-purple-500={colorTemperature === mood.temp && colorVibrance === mood.vibrance}
                  onclick={() => { colorTemperature = mood.temp; colorVibrance = mood.vibrance; }}
                >
                  <span class="600 font(sm) c(gray-800)">{mood.name}</span>
                  <div class="hbox gap(sm)">
                    <div class="w(30px) h(30px) r(md) bg(purple-400)" 
                         style="filter: hue-rotate({mood.temp}deg) saturate({1 + mood.vibrance/100})"></div>
                    <div class="w(30px) h(30px) r(md) bg(pink-400)" 
                         style="filter: hue-rotate({mood.temp}deg) saturate({1 + mood.vibrance/100})"></div>
                    <div class="w(30px) h(30px) r(md) bg(blue-400)" 
                         style="filter: hue-rotate({mood.temp}deg) saturate({1 + mood.vibrance/100})"></div>
                  </div>
                </button>
              {/each}
            </div>
          </div>
        </div>
        
        <!-- Live Color Preview -->
        <div class="vbox gap(lg)">
          <!-- UI Components Preview -->
          <div class="card() p(lg)">
            <h4 class="heading(h4) mb(lg)" style="filter: hue-rotate({colorTemperature}deg) saturate({1 + colorVibrance/100})">
              Your Brand Interface
            </h4>
            <p class="mb(lg) c(gray-600)">
              Watch how temperature and vibrance affect your entire color system.
            </p>
            
            <div class="vbox gap(md)">
              <div class="hbox gap(md)">
                <button class="btn(primary)" style="filter: hue-rotate({colorTemperature}deg) saturate({1 + colorVibrance/100})">
                  Primary Action
                </button>
                <button class="btn(secondary)" style="filter: hue-rotate({colorTemperature}deg) saturate({1 + colorVibrance/100})">
                  Secondary
                </button>
              </div>
              
              <div class="hbox gap(sm)">
                <span class="badge(success)" style="filter: hue-rotate({colorTemperature}deg) saturate({1 + colorVibrance/100})">Active</span>
                <span class="badge(warning)" style="filter: hue-rotate({colorTemperature}deg) saturate({1 + colorVibrance/100})">Pending</span>
                <span class="badge(error)" style="filter: hue-rotate({colorTemperature}deg) saturate({1 + colorVibrance/100})">Error</span>
              </div>
            </div>
          </div>
          
          <!-- Color Palette Grid -->
          <div class="vbox gap(sm)">
            <h5 class="font(sm) 600 c(gray-700)">Adjusted Palette</h5>
            <div class="grid grid-cols(5) gap(xs)">
              {#each ['purple', 'blue', 'green', 'yellow', 'red'] as color}
                {#each ['200', '400', '500', '600', '800'] as shade}
                  <div 
                    class="h(40px) r(md) bg({color}-{shade})" 
                    style="filter: hue-rotate({colorTemperature}deg) saturate({1 + colorVibrance/100})"
                    title="{color}-{shade}"
                  ></div>
                {/each}
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- The Philosophy -->
    <div class="vbox(center) text(center) gap(lg) pt(xl)">
      <div class="card(gradient) p(xl) container(4xl)">
        <div class="hbox(pack) gap(sm) mb(lg)">
          <Sparkles class="c(white)" size="24" />
          <h3 class="700 font(2xl) c(white)">Design is a Feeling</h3>
          <Sparkles class="c(white)" size="24" />
        </div>
        <p class="font(lg) c(white.9) leading(1.7) mb(lg)">
          Great designers don't calculate spacing ratios—they <em>feel</em> them. 
          They don't compute color harmonies—they <em>sense</em> them.
        </p>
        <p class="font(md) c(white.8)">
          <strong class="c(white)">Our tools bridge intuition and implementation.</strong> 
          Adjust by feeling, export as system. This is how design systems should be born—from 
          human sensibility, not spreadsheet formulas.
        </p>
      </div>
      
      <div class="hbox(pack) gap(lg) pt(lg)">
        <button class="btn(primary/lg) hbox(middle) gap(sm)">
          <Sliders size="20" />
          Try the Design Studio
        </button>
        <button class="btn(secondary/lg)">
          Export Your System
        </button>
      </div>
    </div>
    
  </div>
</section>

<style>
  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    height: 6px;
    background: #e5e7eb;
    border-radius: 3px;
    outline: none;
  }
  
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--thumb-color, #8b5cf6);
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    transition: all 0.2s ease;
  }
  
  input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }
  
  input[type="range"]::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--thumb-color, #8b5cf6);
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    transition: all 0.2s ease;
  }
  
  input[type="range"]::-moz-range-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }
</style>