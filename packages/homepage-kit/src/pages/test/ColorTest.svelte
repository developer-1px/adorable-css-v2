<script lang="ts">
  import { colorPalette } from 'adorable-css';
  
  console.log('Color Palette:', colorPalette);
  
  const colorGroups = {
    red: ['red', 'rose'],
    orange: ['orange', 'amber'],
    yellow: ['yellow', 'lime'],
    green: ['green', 'emerald', 'teal'],
    blue: ['cyan', 'sky', 'blue'],
    indigo: ['indigo'],
    purple: ['violet', 'purple', 'fuchsia', 'pink'],
    neutral: ['gray', 'slate', 'zinc', 'neutral', 'stone']
  };
  
  const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
</script>

<div class="p(2xl)">
  <h1 class="bold font(3xl) mb(2xl)">Color Palette Test</h1>
  
  <!-- Test gradient -->
  <div class="mb(2xl)">
    <h2 class="bold font(xl) mb(lg)">Gradient Test</h2>
    <div class="h(100px) w(400px) bg(135deg/purple-400..pink-400) r(xl) shadow(lg)"></div>
  </div>
  
  <!-- Test individual colors -->
  <div class="mb(2xl)">
    <h2 class="bold font(xl) mb(lg)">Individual Colors</h2>
    <div class="hbox gap(lg)">
      <div class="w(100px) h(100px) bg(purple-400) r(lg) shadow(md)"></div>
      <div class="w(100px) h(100px) bg(pink-400) r(lg) shadow(md)"></div>
      <div class="w(100px) h(100px) bg(blue-500) r(lg) shadow(md)"></div>
    </div>
  </div>
  
  <!-- Color palette display -->
  {#each Object.entries(colorGroups) as [groupName, colors]}
    <div class="mb(2xl)">
      <h2 class="bold font(xl) mb(lg) capitalize">{groupName} Colors</h2>
      {#each colors as colorName}
        <div class="mb(lg)">
          <h3 class="font(md) semibold mb(sm) capitalize">{colorName}</h3>
          <div class="hbox gap(1)">
            {#each shades as shade}
              {@const colorKey = `${colorName}-${shade}`}
              {@const colorValue = colorPalette[colorKey]}
              {#if colorValue}
                <div 
                  class="w(60px) h(60px) r(md) shadow(sm)"
                  style="background: {colorValue}"
                  title="{colorKey}: {colorValue}"
                >
                  <div class="text(center) pt(20px) font(xs) {shade <= '200' ? 'c(gray-800)' : 'c(white)'}">
                    {shade}
                  </div>
                </div>
              {/if}
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/each}
</div>