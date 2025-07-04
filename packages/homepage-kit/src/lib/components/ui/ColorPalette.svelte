<script>
  import { colorsPlugin } from 'adorable-css';
  import Card from './Card.svelte';
  import CardHeader from './CardHeader.svelte';
  import CardTitle from './CardTitle.svelte';
  import CardContent from './CardContent.svelte';

  // Get the nested color palette from the advanced color system
  let colorPalette = colorsPlugin.getNestedColorPalette();
  let currentTheme = colorsPlugin.getCurrentTheme();
  const availableThemes = colorsPlugin.getAvailableThemes();

  // Color groups for organized display (rainbow order)
  const colorGroups = {
    red: ['red', 'rose'],
    orange: ['orange', 'amber'],
    yellow: ['yellow', 'lime'],
    green: ['green', 'emerald', 'teal'],
    blue: ['cyan', 'sky', 'blue'],
    indigo: ['indigo'],
    purple: ['violet', 'purple', 'fuchsia', 'pink'],
    neutral: ['slate', 'gray', 'zinc', 'neutral', 'stone']
  };

  // Function to copy color value to clipboard
  function copyToClipboard(colorValue, colorName) {
    navigator.clipboard.writeText(colorValue).then(() => {
      console.log(`Copied ${colorName}: ${colorValue}`);
    });
  }

  // Function to get hex value for display
  function getHexValue(colorName, shade) {
    const flatPalette = colorsPlugin.palette;
    return flatPalette[`${colorName}-${shade}-hex`] || flatPalette[`${colorName}-${shade}`];
  }

  // Function to get OKLCH value
  function getOklchValue(colorName, shade) {
    const flatPalette = colorsPlugin.palette;
    return flatPalette[`${colorName}-${shade}`];
  }

  // Current theme selection
  let selectedTheme = currentTheme.name.toLowerCase();
  
  function handleThemeChange() {
    colorsPlugin.setTheme(selectedTheme);
    // Force reactivity update
    colorPalette = colorsPlugin.getNestedColorPalette();
    currentTheme = colorsPlugin.getCurrentTheme();
  }
</script>

<div class="color-palette-container vbox gap(xl)">
  <!-- Theme Selector -->
  <Card>
    <CardHeader>
      <CardTitle>Color Theme Control</CardTitle>
    </CardHeader>
    <CardContent className="vbox gap(md)">
      <div class="hbox gap(md) flex-wrap">
        {#each availableThemes as theme}
          <button 
            class="p(sm/md) r(md) border(1) font(sm) transition(all_200ms) {selectedTheme === theme ? 'bg(primary-500) c(white) border(primary-500)' : 'bg(white) c(neutral-700) border(neutral-300) hover:bg(neutral-50)'}"
            on:click={() => { selectedTheme = theme; handleThemeChange(); }}
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </button>
        {/each}
      </div>
      <div class="font(sm) c(neutral-600)">
        Current theme: <span class="500">{currentTheme.name}</span>
        {#if currentTheme.options}
          <span class="ml(sm) font-family(mono) font(xs) c(neutral-500)">
            T:{currentTheme.options.temperature || 0} S:{currentTheme.options.saturation || 0} L:{currentTheme.options.lightness || 0}
          </span>
        {/if}
      </div>
    </CardContent>
  </Card>

  <!-- Color Groups -->
  {#each Object.entries(colorGroups) as [groupName, colors]}
    <Card>
      <CardHeader>
        <CardTitle>{groupName.charAt(0).toUpperCase() + groupName.slice(1)} Colors</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="vbox gap(lg)">
          {#each colors as colorName}
            {#if colorPalette[colorName]}
              <div class="color-row vbox gap(sm)">
                <h4 class="600 font(md) c(neutral-800) capitalize">{colorName}</h4>
                <div class="color-swatches hbox gap(xs)">
                  {#each Object.entries(colorPalette[colorName]) as [shade, colorValue]}
                    <div 
                      class="color-swatch relative cursor(pointer) hover:scale(1.05) transition(transform_200ms)"
                      on:click={() => copyToClipboard(colorValue, `${colorName}-${shade}`)}
                      title="Click to copy: {colorValue}"
                    >
                      <div 
                        class="size(40) r(md) shadow(sm) border(1/white)"
                        style="background-color: {colorValue}"
                      ></div>
                      <div class="absolute (center,100%+xs) text(center) w(max-content)">
                        <div class="font(xs) c(neutral-600) bg(white) p(xs) r(sm) shadow(sm) border(1/neutral-200)">
                          {shade}
                        </div>
                      </div>
                    </div>
                  {/each}
                </div>
                
                <!-- Color details -->
                <div class="color-details vbox gap(xs) mt(sm) p(sm) bg(neutral-50) r(md)">
                  <div class="font(xs) c(neutral-600) font-family(mono)">
                    Base: {getHexValue(colorName, '500') || colorPalette[colorName]['500']}
                  </div>
                  <div class="font(xs) c(neutral-500) font-family(mono)">
                    OKLCH: {getOklchValue(colorName, '500') || colorPalette[colorName]['500']}
                  </div>
                </div>
              </div>
            {/if}
          {/each}
        </div>
      </CardContent>
    </Card>
  {/each}

  <!-- Usage Examples -->
  <Card>
    <CardHeader>
      <CardTitle>Usage Examples</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="vbox gap(lg)">
        <!-- Text Colors -->
        <div class="vbox gap(sm)">
          <h4 class="600 font(md)">Text Colors</h4>
          <div class="grid(3) gap(md)">
            <div class="p(md) r(md) bg(white) border(1/neutral-200)">
              <div class="c(blue-600) font(md)">c(blue-600)</div>
              <div class="font(xs) c(neutral-500) font-family(mono) mt(xs)">Text color utility</div>
            </div>
            <div class="p(md) r(md) bg(white) border(1/neutral-200)">
              <div class="c(success) font(md)">c(success)</div>
              <div class="font(xs) c(neutral-500) font-family(mono) mt(xs)">Success color</div>
            </div>
            <div class="p(md) r(md) bg(white) border(1/neutral-200)">
              <div class="c(red-500) font(md)">c(red-500)</div>
              <div class="font(xs) c(neutral-500) font-family(mono) mt(xs)">Error color</div>
            </div>
          </div>
        </div>

        <!-- Background Colors -->
        <div class="vbox gap(sm)">
          <h4 class="600 font(md)">Background Colors</h4>
          <div class="grid(3) gap(md)">
            <div class="p(md) r(md) bg(blue-100) border(1/blue-200)">
              <div class="c(blue-800) font(md)">bg(blue-100)</div>
              <div class="font(xs) c(blue-600) font-family(mono) mt(xs)">Light background</div>
            </div>
            <div class="p(md) r(md) bg(success) border(1/success-600)">
              <div class="c(white) font(md)">bg(success)</div>
              <div class="font(xs) c(white) font-family(mono) mt(xs)">Primary background</div>
            </div>
            <div class="p(md) r(md) bg(neutral-800) border(1/neutral-900)">
              <div class="c(white) font(md)">bg(gray-800)</div>
              <div class="font(xs) c(neutral-300) font-family(mono) mt(xs)">Dark background</div>
            </div>
          </div>
        </div>

        <!-- Gradients -->
        <div class="vbox gap(sm)">
          <h4 class="600 font(md)">Gradient Examples</h4>
          <div class="grid(2) gap(md)">
            <div class="p(md) r(md) bg(45deg/red-500..orange-500)">
              <div class="c(white) font(md)">bg(45deg/red-500..orange-500)</div>
              <div class="font(xs) c(red-100) font-family(mono) mt(xs)">Diagonal gradient</div>
            </div>
            <div class="p(md) r(md) bg(180deg/green-400..blue-500)">
              <div class="c(white) font(md)">bg(180deg/green-400..blue-500)</div>
              <div class="font(xs) c(green-100) font-family(mono) mt(xs)">Vertical gradient</div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</div>

<style>
  .color-swatch {
    position: relative;
  }
  
  .color-swatch:hover .color-details {
    opacity: 1;
    visibility: visible;
  }
  
  .color-details {
    opacity: 0;
    visibility: hidden;
    transition: all 200ms ease;
  }
  
  .color-swatch:hover .color-details {
    opacity: 1;
    visibility: visible;
  }
</style>