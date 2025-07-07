<script lang="ts">
  import { defaultTokens } from 'adorable-css';

  // Spacing scales from adorable-css design system
  const spacingScales = Object.entries(defaultTokens.spacing).map(([name, value]) => ({
    name,
    value,
    class: `gap(${name})`,
    paddingClass: `p(${name})`,
    marginClass: `m(${name})`,
    usage: getSpacingUsage(name),
    description: getSpacingDescription(name)
  }));

  // Container scales from adorable-css design system
  const containerScales = Object.entries(defaultTokens.container).map(([name, value]) => ({
    name,
    value,
    class: `max-w(${name})`,
    widthClass: `w(${name})`,
    usage: getContainerUsage(name),
    description: getContainerDescription(name)
  }));

  // Common grid patterns
  const gridPatterns = [
    { name: 'grid(2)', description: '2 equal columns', usage: 'Two-column layouts' },
    { name: 'grid(3)', description: '3 equal columns', usage: 'Card grids, feature lists' },
    { name: 'grid(4)', description: '4 equal columns', usage: 'Image galleries, icon grids' },
    { name: 'grid(12)', description: '12-column grid', usage: 'Complex responsive layouts' },
    { name: 'grid(auto-fit/200)', description: 'Auto-fit with min 200px', usage: 'Responsive card grids' },
    { name: 'grid(auto-fill/150)', description: 'Auto-fill with min 150px', usage: 'Image thumbnails' }
  ];

  // Layout utilities
  const layoutUtilities = [
    { name: 'hbox', description: 'Horizontal flexbox', usage: 'Side-by-side layouts' },
    { name: 'vbox', description: 'Vertical flexbox', usage: 'Stacked layouts' },
    { name: 'hbox(center)', description: 'Centered horizontal layout', usage: 'Centered content' },
    { name: 'vbox(center)', description: 'Centered vertical layout', usage: 'Page centering' },
    { name: 'hbox(between)', description: 'Space between items', usage: 'Navigation, headers' },
    { name: 'hbox(around)', description: 'Space around items', usage: 'Button groups' }
  ];

  function getSpacingUsage(name: string): string {
    const usageMap: Record<string, string> = {
      'xs': 'Tight spacing, compact UI',
      'sm': 'Small gaps, dense layouts',
      'md': 'Standard spacing (default)',
      'lg': 'Comfortable spacing',
      'xl': 'Large spacing, generous layouts',
      '2xl': 'Section spacing',
      '3xl': 'Large section spacing',
      '4xl': 'Page-level spacing',
      '5xl': 'Major section breaks',
      '6xl': 'Hero section spacing',
      '7xl': 'Large hero spacing',
      '8xl': 'Massive spacing',
      '9xl': 'Ultra large spacing'
    };
    return usageMap[name] || 'Custom spacing';
  }

  function getSpacingDescription(name: string): string {
    const descriptionMap: Record<string, string> = {
      'xs': 'Very tight spacing for compact interfaces',
      'sm': 'Small spacing for dense content',
      'md': 'Standard spacing for most use cases',
      'lg': 'Comfortable spacing for readability',
      'xl': 'Large spacing for generous layouts',
      '2xl': 'Section-level spacing',
      '3xl': 'Large section separation',
      '4xl': 'Page-level content spacing',
      '5xl': 'Major content blocks',
      '6xl': 'Hero and feature sections',
      '7xl': 'Large feature sections',
      '8xl': 'Massive content separation',
      '9xl': 'Ultra large spacing for dramatic effect'
    };
    return descriptionMap[name] || 'Custom spacing description';
  }

  function getContainerUsage(name: string): string {
    const usageMap: Record<string, string> = {
      'xs': 'Mobile content, small cards',
      'sm': 'Small content areas',
      'md': 'Standard content width',
      'lg': 'Comfortable reading width',
      'xl': 'Large content sections',
      '2xl': 'Wide content areas',
      '3xl': 'Very wide layouts',
      '4xl': 'Extra wide content',
      '5xl': 'Maximum comfortable width',
      '6xl': 'Very large displays',
      '7xl': 'Ultra wide displays',
      '8xl': 'Maximum content width',
      '9xl': 'Full-width layouts',
      'prose': 'Optimal reading width',
      'full': 'Full container width',
      'screen': 'Full viewport width'
    };
    return usageMap[name] || 'Custom container usage';
  }

  function getContainerDescription(name: string): string {
    const descriptionMap: Record<string, string> = {
      'xs': 'Very small containers for mobile',
      'sm': 'Small content containers',
      'md': 'Standard content width for most pages',
      'lg': 'Comfortable width for reading content',
      'xl': 'Large content areas',
      '2xl': 'Wide layouts for dashboards',
      '3xl': 'Very wide content areas',
      '4xl': 'Extra wide for complex layouts',
      '5xl': 'Maximum readable width',
      '6xl': 'Very large display content',
      '7xl': 'Ultra wide display layouts',
      '8xl': 'Maximum structured content',
      '9xl': 'Extremely wide layouts',
      'prose': 'Optimized for reading (45-75 characters)',
      'full': 'Full width of parent container',
      'screen': 'Full viewport width'
    };
    return descriptionMap[name] || 'Custom container description';
  }

  function copySpacingCSS() {
    const css = `/* AdorableCSS Spacing Foundation */
:root {
  /* Spacing scales */
  ${Object.entries(defaultTokens.spacing).map(([name, value]) => `  --spacing-${name}: ${value};`).join('\n')}
  
  /* Container scales */
  ${Object.entries(defaultTokens.container).map(([name, value]) => `  --container-${name}: ${value};`).join('\n')}
}`;
    
    navigator.clipboard.writeText(css);
  }
</script>

<div class="vbox(center) py(4xl)">
  <div class="max-w(5xl) vbox gap(6xl)">
    <!-- Header -->
    <div class="text(center) vbox gap(lg)">
      <h2 class="display(xl) font(black) tracking(tight)">Grid & Spacing Foundation</h2>
      <div class="vbox(center)">
        <p class="fonr(lg) c(gray-600) max-w(3xl)">Layout system for creating consistent spacing and responsive grids</p>
      </div>
    </div>

    <!-- Spacing Scale -->
    <section class="vbox gap(3xl)">
      <div class="vbox gap(lg)">
        <h3 class="title(xl) font(bold)">Spacing Scale</h3>
        <p class="caption c(gray-600)">Mathematical spacing progression for consistent layouts</p>
      </div>
      
      <div class="vbox gap(2xl) p(3xl) bg(gray-50) r(lg)">
        {#each spacingScales as spacing}
          <div class="vbox gap(lg) bb(1/gray-200) pb(2xl)">
            <div class="hbox(between) items(baseline)">
              <div class="hbox gap(xl) items(baseline)">
                <code class="text(base) font(mono) font(bold) uppercase tracking(wider) w(3xl)">{spacing.name}</code>
                <div class="vbox gap(xs)">
                  <code class="font(sm) font(mono) c(gray-600)">{spacing.value}</code>
                  <code class="font(xs) font(mono) c(gray-500)">{spacing.class}</code>
                </div>
              </div>
              <span class="caption(sm) c(gray-500) italic">{spacing.usage}</span>
            </div>
            
            <!-- Visual Example -->
            <div class="vbox gap(md)">
              <div class="hbox gap(lg)">
                <!-- Gap example -->
                <div class="vbox gap(xs)">
                  <code class="font(xs) font(mono) c(gray-500)">gap({spacing.name})</code>
                  <div class="hbox {spacing.class}">
                    <div class="w(xl) h(xl) bg(blue-200) r(sm)"></div>
                    <div class="w(xl) h(xl) bg(blue-200) r(sm)"></div>
                    <div class="w(xl) h(xl) bg(blue-200) r(sm)"></div>
                  </div>
                </div>
                
                <!-- Padding example -->
                <div class="vbox gap(xs)">
                  <code class="font(xs) font(mono) c(gray-500)">p({spacing.name})</code>
                  <div class="bg(green-100) r(sm) w(fit)">
                    <div class="{spacing.paddingClass}">
                      <div class="w(xl) h(xl) bg(green-300) r(sm)"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="font(sm) c(gray-600)">{spacing.description}</div>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Container Scale -->
    <section class="vbox gap(3xl)">
      <div class="vbox gap(lg)">
        <h3 class="title(xl) font(bold)">Container Scale</h3>
        <p class="caption c(gray-600)">Content width constraints for readable layouts</p>
      </div>
      
      <div class="vbox gap(2xl) p(3xl) bg(gray-50) r(lg)">
        {#each containerScales.slice(0, 10) as container}
          <div class="vbox gap(lg) bb(1/gray-200) pb(2xl)">
            <div class="hbox(between) items(baseline)">
              <div class="hbox gap(xl) items(baseline)">
                <code class="text(base) font(mono) font(bold) uppercase tracking(wider) w(3xl)">{container.name}</code>
                <div class="vbox gap(xs)">
                  <code class="font(sm) font(mono) c(gray-600)">{container.value}</code>
                  <code class="font(xs) font(mono) c(gray-500)">{container.class}</code>
                </div>
              </div>
              <span class="caption(sm) c(gray-500) italic">{container.usage}</span>
            </div>
            
            <!-- Visual Example -->
            <div class="vbox gap(md)">
              <div class="w(full) bg(gray-200) r(sm) h(2xl) relative">
                <div class="{container.class} bg(blue-200) h(full) r(sm) relative">
                  <div class="absolute inset(0) hbox(center) font(xs) font(mono) c(gray-700)">
                    {container.value}
                  </div>
                </div>
              </div>
              
              <div class="font(sm) c(gray-600)">{container.description}</div>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Grid Patterns -->
    <section class="vbox gap(3xl)">
      <div class="vbox gap(lg)">
        <h3 class="title(xl) font(bold)">Grid Patterns</h3>
        <p class="caption c(gray-600)">Common grid layouts for responsive design</p>
      </div>
      
      <div class="vbox gap(2xl) p(3xl) bg(gray-50) r(lg)">
        {#each gridPatterns as grid}
          <div class="vbox gap(lg) bb(1/gray-200) pb(2xl)">
            <div class="hbox(between) items(baseline)">
              <div class="hbox gap(xl) items(baseline)">
                <code class="text(base) font(mono) font(bold) uppercase tracking(wider)">{grid.name}</code>
                <span class="caption(sm) c(gray-500) italic">{grid.usage}</span>
              </div>
            </div>
            
            <!-- Visual Example -->
            <div class="vbox gap(md)">
              <div class="{grid.name} gap(sm)">
                <div class="bg(purple-200) r(sm) h(2xl) hbox(center) font(xs) font(mono)">1</div>
                <div class="bg(purple-200) r(sm) h(2xl) hbox(center) font(xs) font(mono)">2</div>
                <div class="bg(purple-200) r(sm) h(2xl) hbox(center) font(xs) font(mono)">3</div>
                {#if grid.name.includes('4') || grid.name.includes('12')}
                  <div class="bg(purple-200) r(sm) h(2xl) hbox(center) font(xs) font(mono)">4</div>
                {/if}
                {#if grid.name.includes('auto')}
                  <div class="bg(purple-200) r(sm) h(2xl) hbox(center) font(xs) font(mono)">4</div>
                  <div class="bg(purple-200) r(sm) h(2xl) hbox(center) font(xs) font(mono)">5</div>
                {/if}
              </div>
              
              <div class="font(sm) c(gray-600)">{grid.description}</div>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Layout Utilities -->
    <section class="vbox gap(3xl)">
      <div class="vbox gap(lg)">
        <h3 class="title(xl) font(bold)">Layout Utilities</h3>
        <p class="caption c(gray-600)">Flexbox utilities for common layout patterns</p>
      </div>
      
      <div class="vbox gap(2xl) p(3xl) bg(gray-50) r(lg)">
        {#each layoutUtilities as layout}
          <div class="vbox gap(lg) bb(1/gray-200) pb(2xl)">
            <div class="hbox(between) items(baseline)">
              <div class="hbox gap(xl) items(baseline)">
                <code class="text(base) font(mono) font(bold) uppercase tracking(wider)">{layout.name}</code>
                <span class="caption(sm) c(gray-500) italic">{layout.usage}</span>
              </div>
            </div>
            
            <!-- Visual Example -->
            <div class="vbox gap(md)">
              <div class="{layout.name} gap(sm) bg(gray-100) p(md) r(sm) min-h(4xl)">
                <div class="bg(orange-200) r(sm) p(sm) font(xs) font(mono)">Item 1</div>
                <div class="bg(orange-200) r(sm) p(sm) font(xs) font(mono)">Item 2</div>
                <div class="bg(orange-200) r(sm) p(sm) font(xs) font(mono)">Item 3</div>
              </div>
              
              <div class="font(sm) c(gray-600)">{layout.description}</div>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Copy Button -->
    <div class="text(center)">
      <button 
        on:click={copySpacingCSS}
        class="px(3xl) py(xl) bg(black) c(white) font(bold) tracking(wide) uppercase hover:scale(1.05) transition-transform"
      >
        Copy All Spacing CSS
      </button>
    </div>
  </div>
</div>