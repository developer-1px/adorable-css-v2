<script lang="ts">
  import { colorPalette } from 'adorable-css';
  
  console.log('ColorPalette imported:', colorPalette);
  console.log('Sample colors:', {
    'purple-400': colorPalette['purple-400'],
    'pink-400': colorPalette['pink-400'],
    'blue-500': colorPalette['blue-500']
  });
  
  // Get color groups from OKLCH palette
  function getColorGroups() {
    const groups = {
      neutral: ['gray', 'slate', 'zinc', 'neutral', 'stone'],
      warm: ['red', 'orange', 'amber', 'yellow'],
      green: ['lime', 'green', 'emerald', 'teal'],
      blue: ['cyan', 'sky', 'blue', 'indigo'],
      purple: ['violet', 'purple', 'fuchsia', 'pink', 'rose'],
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
  const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
</script>

<div class="color-tokens">
  <!-- OKLCH Color Palette -->
  <div class="section-card bg(white.9) backdrop-blur(md) r(2xl) shadow(xl) p(xl) b(1/gray-100) mb(2xl)">
    <h3 class="700 font(2xl) c(gray-900) mb(lg)">OKLCH Color System</h3>
    <p class="font(md) c(gray-600) mb(xl)">Perceptually uniform colors with beautiful gradients</p>
    
    <!-- Gradient Examples -->
    <div class="mb(2xl)">
      <h4 class="700 font(lg) c(gray-800) mb(lg)">Gradient Examples</h4>
      <div class="grid grid-cols(1) md:grid-cols(3) gap(lg)">
        <div class="h(24) r(xl) bg(135deg/blue-400,purple-400) hbox(center+center) c(white) 700 font(md) shadow(lg)">
          blue-400..purple-400
        </div>
        <div class="h(24) r(xl) bg(90deg/pink-300,orange-400) hbox(center+center) c(white) 700 font(md) shadow(lg)">
          pink-300..orange-400  
        </div>
        <div class="h(24) r(xl) bg(45deg/green-400,teal-500) hbox(center+center) c(white) 700 font(md) shadow(lg)">
          green-400..teal-500
        </div>
      </div>
    </div>
  </div>

  <!-- Neutral Colors -->
  <div class="section-card bg(white.9) backdrop-blur(md) r(2xl) shadow(xl) p(xl) b(1/gray-100) mb(2xl)">
    <h3 class="700 font(xl) c(gray-900) mb(lg)">Neutral Colors</h3>
    <p class="font(sm) c(gray-600) mb(xl)">Essential grays and neutral tones</p>
    
    <div class="vbox gap(lg)">
      {#each colorGroups.neutral as colorName}
        {#if colorGroups.palette[colorName]}
          <div class="color-scale">
            <h4 class="700 font(md) mb(sm) capitalize c(gray-800)">{colorName}</h4>
            <div class="hbox gap(1) overflow-x(auto)">
              {#each shades as shade}
                {#if colorGroups.palette[colorName][shade]}
                  <div class="flex-1 min-w(60px) group">
                    <div 
                      class="h(16) r(md) shadow(sm) hover:shadow(lg) hover:scale(1.05) transition cursor-pointer b(1/gray-200)" 
                      style="background: {colorGroups.palette[colorName][shade]}"
                      title="{colorName}-{shade}"
                    ></div>
                    <div class="font(xs) c(gray-600) text(center) mt(xs)">{shade}</div>
                  </div>
                {/if}
              {/each}
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>

  <!-- Color Groups -->
  {#each [['Warm Colors', colorGroups.warm], ['Green Colors', colorGroups.green], ['Blue Colors', colorGroups.blue], ['Purple Colors', colorGroups.purple]] as [groupName, colors]}
    <div class="section-card bg(white.9) backdrop-blur(md) r(2xl) shadow(xl) p(xl) b(1/gray-100) mb(2xl)">
      <h3 class="700 font(xl) c(gray-900) mb(lg)">{groupName}</h3>
      
      <div class="vbox gap(lg)">
        {#each colors as colorName}
          {#if colorGroups.palette[colorName]}
            <div class="color-scale">
              <h4 class="700 font(md) mb(sm) capitalize c(gray-800)">{colorName}</h4>
              <div class="hbox gap(1) overflow-x(auto)">
                {#each shades as shade}
                  {#if colorGroups.palette[colorName][shade]}
                    <div class="flex-1 min-w(60px) group">
                      <div 
                        class="h(16) r(md) shadow(sm) hover:shadow(lg) hover:scale(1.05) transition cursor-pointer" 
                        style="background: {colorGroups.palette[colorName][shade]}"
                        title="{colorName}-{shade}"
                      ></div>
                      <div class="font(xs) c(gray-600) text(center) mt(xs)">{shade}</div>
                    </div>
                  {/if}
                {/each}
              </div>
            </div>
          {/if}
        {/each}
      </div>
    </div>
  {/each}
</div>