<script lang="ts">
  import { defaultTokens } from 'adorable-css';
  
  // Get color groups
  function getColorGroups() {
    const groups = {
      brand: ['primary', 'secondary'],
      semantic: ['success', 'warning', 'error', 'info'],
      neutral: ['white', 'black', 'gray'],
      palette: []
    };
    
    // Group color scales
    const scales = {};
    Object.entries(defaultTokens.colors).forEach(([key, value]) => {
      if (key.includes('-')) {
        const [colorName, shade] = key.split('-');
        if (!scales[colorName]) scales[colorName] = {};
        scales[colorName][shade] = value;
      }
    });
    
    groups.palette = Object.entries(scales);
    return groups;
  }
  
  const colorGroups = getColorGroups();
</script>

<div class="color-tokens">
  <!-- Brand Colors -->
  <div class="section-card bg(white/90) backdrop-blur(md) r(2xl) shadow(xl) p(xl) b(1/gray-100) mb(2xl)">
    <h3 class="font(xl) bold c(gray-900) mb(lg)">Brand Colors</h3>
    <p class="font(sm) c(gray-600) mb(xl)">Primary brand identity colors</p>
    
    <div class="grid grid-cols(2) gap(lg)">
      {#each colorGroups.brand as colorName}
        {#if defaultTokens.colors[colorName]}
          <div class="color-swatch group">
            <div class="h(5xl) r(xl) bg(--colors-{colorName}) hbox(center+center) c(white) font(md) bold shadow(lg) hover:shadow(2xl) hover:scale(105) transition b(2/transparent) hover:b(2/white/30)">
              {colorName}
            </div>
            <div class="mt(md) text(center)">
              <code class="font(sm) font(semibold)" style="background: linear-gradient(135deg,#3b82f6,#8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">c({colorName})</code>
              <div class="font(xs) c(gray-600) font-family(mono) mt(xs)">{defaultTokens.colors[colorName]}</div>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>

  <!-- Semantic Colors -->
  <div class="section-card bg(white/90) backdrop-blur(md) r(2xl) shadow(xl) p(xl) b(1/gray-100) mb(2xl)">
    <h3 class="font(xl) bold c(gray-900) mb(lg)">Semantic Colors</h3>
    <p class="font(sm) c(gray-600) mb(xl)">Colors with specific meanings for UI feedback</p>
    
    <div class="grid grid-cols(2) md:grid-cols(4) gap(lg)">
      {#each colorGroups.semantic as colorName}
        {#if defaultTokens.colors[colorName]}
          <div class="color-swatch group">
            <div class="h(5xl) r(xl) bg(--colors-{colorName}) hbox(center+center) c(white) font(md) bold shadow(lg) hover:shadow(2xl) hover:scale(105) transition">
              {colorName}
            </div>
            <div class="mt(md) text(center)">
              <code class="font(sm) font(semibold)" style="background: linear-gradient(135deg,#3b82f6,#8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">c({colorName})</code>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>

  <!-- Color Scales -->
  <div class="section-card bg(white/90) backdrop-blur(md) r(2xl) shadow(xl) p(xl) b(1/gray-100)">
    <h3 class="font(xl) bold c(gray-900) mb(lg)">Color Scales</h3>
    <p class="font(sm) c(gray-600) mb(xl)">Complete color palettes with 11 shades each</p>
    
    <div class="vbox gap(xl)">
      {#each colorGroups.palette as [colorName, shades]}
        <div class="color-scale p(lg) bg(linear-gradient(to_right,rgb(249,250,251),transparent)) r(xl) hover:shadow(md) transition">
          <h4 class="font(md) bold mb(md) capitalize" style="background: linear-gradient(135deg,#3b82f6,#8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">{colorName}</h4>
          <div class="hbox gap(xs) overflow-x(auto)">
            {#each Object.entries(shades) as [shade, value]}
              <div class="flex-1 min-w(60px) group">
                <div 
                  class="h(3xl) r(lg) shadow(sm) hover:shadow(lg) hover:scale(110) transition cursor-pointer" 
                  style="background-color: {value}"
                  title="{colorName}-{shade}: {value}"
                ></div>
                <div class="font(xs) c(gray-700) text(center) mt(xs) font(semibold)">{shade}</div>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>