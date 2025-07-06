<script lang="ts">
  import { defaultTokens } from 'adorable-css';

  // Shadow scales from adorable-css design system
  const shadowScales = Object.entries(defaultTokens.shadow).map(([name, value]) => ({
    name,
    value,
    class: `shadow(${name})`,
    usage: getShadowUsage(name),
    description: getShadowDescription(name)
  }));

  function getShadowUsage(name: string): string {
    const usageMap: Record<string, string> = {
      'none': 'Flat elements, no elevation',
      'xs': 'Subtle borders, fine details',
      'sm': 'Small cards, buttons',
      'md': 'Cards, dropdowns (default)',
      'lg': 'Large cards, modals',
      'xl': 'Overlays, pop-overs',
      '2xl': 'Large modals, major overlays',
      'inner': 'Inset elements, pressed states',
      'card': 'Standard card elevation',
      'hover': 'Interactive hover states'
    };
    return usageMap[name] || 'Custom usage';
  }

  function getShadowDescription(name: string): string {
    const descriptionMap: Record<string, string> = {
      'none': 'No shadow - completely flat',
      'xs': 'Very subtle shadow for fine details',
      'sm': 'Light shadow for small elements',
      'md': 'Standard shadow for cards and 04-components',
      'lg': 'Prominent shadow for important elements',
      'xl': 'Strong shadow for floating elements',
      '2xl': 'Heavy shadow for major overlays',
      'inner': 'Inward shadow for pressed/inset states',
      'card': 'Optimized shadow for card 04-components',
      'hover': 'Enhanced shadow for interactive states'
    };
    return descriptionMap[name] || 'Custom shadow';
  }

  function copyElevationCSS() {
    const css = `/* AdorableCSS Elevation Foundation */
:root {
  /* Shadow scales */
  ${Object.entries(defaultTokens.shadow).map(([name, value]) => `  --shadow-${name}: ${value};`).join('\n')}
}`;
    
    navigator.clipboard.writeText(css);
  }
</script>

<div class="vbox(center) py(4xl)">
  <div class="max-w(5xl) vbox gap(6xl)">
    <!-- Header -->
    <div class="text(center) vbox gap(lg)">
      <h2 class="display(xl) font(black) tracking(tight)">Elevation Foundation</h2>
      <div class="vbox(center)">
        <p class="text(lg) c(gray-600) max-w(3xl)">Shadow system for creating depth and hierarchy in your interface</p>
      </div>
    </div>

    <!-- Shadow Scale -->
    <section class="vbox gap(3xl)">
      <div class="vbox gap(lg)">
        <h3 class="title(xl) font(bold)">Shadow Scale</h3>
        <p class="caption c(gray-600)">Complete elevation scale from flat to floating elements</p>
      </div>
      
      <div class="vbox gap(2xl) p(3xl) bg(gray-50) r(lg)">
        {#each shadowScales as shadow}
          <div class="vbox gap(lg) border-b(1/gray-200) pb(2xl)">
            <div class="hbox(between) items(baseline)">
              <div class="hbox gap(xl) items(baseline)">
                <code class="text(base) font(mono) font(bold) uppercase tracking(wider) w(3xl)">{shadow.name}</code>
                <div class="vbox gap(xs)">
                  <code class="text(sm) font(mono) c(gray-600)">{shadow.class}</code>
                  <code class="text(xs) font(mono) c(gray-500) max-w(18xl) truncate">{shadow.value}</code>
                </div>
              </div>
              <span class="caption(sm) c(gray-500) italic">{shadow.usage}</span>
            </div>
            
            <!-- Visual Example -->
            <div class="hbox gap(lg) items(center)">
              <div 
                class="w(5xl) h(5xl) bg(white) r(lg) {shadow.class} hbox(center)"
              >
                <div class="w(2xl) h(2xl) bg(gray-200) r(md)"></div>
              </div>
              <div class="vbox gap(xs)">
                <div class="text(md) font(medium)">{shadow.name} Shadow</div>
                <div class="text(sm) c(gray-600)">{shadow.description}</div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Usage Examples -->
    <section class="vbox gap(3xl)">
      <div class="vbox gap(lg)">
        <h3 class="title(xl) font(bold)">Common Usage Examples</h3>
        <p class="caption c(gray-600)">How to apply shadows in real interface components</p>
      </div>
      
      <div class="grid(3) gap(xl)">
        <!-- Card Example -->
        <div class="vbox gap(lg)">
          <h4 class="title(md) font(bold)">Card Components</h4>
          <div class="vbox gap(md)">
            <div class="p(lg) bg(white) r(lg) shadow(sm)">
              <div class="vbox gap(sm)">
                <div class="title(sm)">Small Card</div>
                <div class="text(sm) c(gray-600)">shadow(sm) for basic cards</div>
              </div>
            </div>
            <div class="p(lg) bg(white) r(lg) shadow(md)">
              <div class="vbox gap(sm)">
                <div class="title(sm)">Standard Card</div>
                <div class="text(sm) c(gray-600)">shadow(md) for prominent cards</div>
              </div>
            </div>
            <div class="p(lg) bg(white) r(lg) shadow(lg)">
              <div class="vbox gap(sm)">
                <div class="title(sm)">Feature Card</div>
                <div class="text(sm) c(gray-600)">shadow(lg) for important cards</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Example -->
        <div class="vbox gap(lg)">
          <h4 class="title(md) font(bold)">Overlay Components</h4>
          <div class="vbox gap(md)">
            <div class="p(lg) bg(white) r(lg) shadow(xl)">
              <div class="vbox gap(sm)">
                <div class="title(sm)">Modal Dialog</div>
                <div class="text(sm) c(gray-600)">shadow(xl) for modals</div>
              </div>
            </div>
            <div class="p(lg) bg(white) r(lg) shadow(2xl)">
              <div class="vbox gap(sm)">
                <div class="title(sm)">Large Overlay</div>
                <div class="text(sm) c(gray-600)">shadow(2xl) for major overlays</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Example -->
        <div class="vbox gap(lg)">
          <h4 class="title(md) font(bold)">Interactive States</h4>
          <div class="vbox gap(md)">
            <button class="p(lg) bg(white) r(lg) shadow(sm) hover:shadow(hover) transition-shadow">
              <div class="vbox gap(sm)">
                <div class="title(sm)">Hover Effect</div>
                <div class="text(sm) c(gray-600)">shadow(hover) on hover</div>
              </div>
            </button>
            <div class="p(lg) bg(gray-50) r(lg) shadow(inner)">
              <div class="vbox gap(sm)">
                <div class="title(sm)">Pressed State</div>
                <div class="text(sm) c(gray-600)">shadow(inner) for inset</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Copy Button -->
    <div class="text(center)">
      <button 
        on:click={copyElevationCSS}
        class="px(3xl) py(xl) bg(black) c(white) font(bold) tracking(wide) uppercase hover:scale(1.05) transition-transform"
      >
        Copy All Elevation CSS
      </button>
    </div>
  </div>
</div>