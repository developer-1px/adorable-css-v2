<script lang="ts">
  // Semantic color foundation
  const colorFoundation = {
    semantic: {
      primary: { 
        value: '#6366F1', 
        usage: 'Main brand actions, links, focus states',
        variants: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']
      },
      success: { 
        value: '#10B981', 
        usage: 'Success states, confirmations, positive feedback',
        variants: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']
      },
      warning: { 
        value: '#F59E0B', 
        usage: 'Warnings, caution states, pending actions',
        variants: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']
      },
      danger: { 
        value: '#EF4444', 
        usage: 'Errors, destructive actions, critical alerts',
        variants: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']
      },
      info: { 
        value: '#3B82F6', 
        usage: 'Information, neutral notifications, help',
        variants: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']
      }
    },
    neutral: {
      gray: { 
        value: '#6B7280', 
        usage: 'Text, borders, backgrounds, subtle elements',
        variants: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']
      },
      white: { 
        value: '#FFFFFF', 
        usage: 'Backgrounds, cards, overlays',
        variants: ['pure']
      },
      black: { 
        value: '#000000', 
        usage: 'Text, icons, strong emphasis',
        variants: ['pure']
      }
    },
    surface: {
      background: { 
        value: '#FAFAFA', 
        usage: 'Page backgrounds, app backgrounds',
        variants: ['light', 'base', 'dark']
      },
      paper: { 
        value: '#FFFFFF', 
        usage: 'Card backgrounds, modal backgrounds',
        variants: ['light', 'base', 'dark']
      },
      overlay: { 
        value: 'rgba(0, 0, 0, 0.5)', 
        usage: 'Modal overlays, dropdown shadows',
        variants: ['light', 'base', 'dark']
      }
    }
  };

  function generateColorScale(baseColor: string) {
    // Simplified color scale generation for demo
    const scales = {
      '50': '#F8FAFC',
      '100': '#F1F5F9',
      '200': '#E2E8F0',
      '300': '#CBD5E1',
      '400': '#94A3B8',
      '500': baseColor,
      '600': '#475569',
      '700': '#334155',
      '800': '#1E293B',
      '900': '#0F172A'
    };
    return scales;
  }

  function copyColorsCSS() {
    let css = ':root {\n';
    
    Object.entries(colorFoundation).forEach(([category, colors]) => {
      Object.entries(colors).forEach(([name, props]) => {
        css += `  --color-${name}: ${props.value};\n`;
        if (props.variants && props.variants.length > 1) {
          const scales = generateColorScale(props.value);
          props.variants.forEach(variant => {
            if (scales[variant]) {
              css += `  --color-${name}-${variant}: ${scales[variant]};\n`;
            }
          });
        }
      });
    });
    
    css += '}';
    navigator.clipboard.writeText(css);
  }
</script>

<div class="vbox(center) py(4xl)">
  <div class="max-w(5xl) vbox gap(6xl)">
    <!-- Header -->
    <div class="text(center) vbox gap(lg)">
      <h2 class="display(xl) font(black) tracking(tight)">Color Foundation</h2>
      <div class="vbox(center)">
        <p class="text(lg) c(gray-600) max-w(3xl)">Semantic color system for consistent UI communication</p>
      </div>
    </div>

    <!-- Color Categories -->
    <div class="vbox gap(5xl)">
      {#each Object.entries(colorFoundation) as [category, colors]}
        <section class="vbox gap(3xl)">
          <div>
            <h3 class="title(xl) font(bold) capitalize">{category} Colors</h3>
            <p class="caption c(gray-600)">
              {category === 'semantic' ? 'Colors with meaning and purpose for UI states' :
               category === 'neutral' ? 'Neutral colors for text, borders, and backgrounds' :
               'Surface colors for layouts and containers'}
            </p>
          </div>
          
          <div class="vbox gap(3xl)">
            {#each Object.entries(colors) as [name, props]}
              <div class="vbox gap(2xl) p(3xl) bg(gray-50) r(lg)">
                <div class="hbox(between) items(baseline)">
                  <div>
                    <h4 class="title(lg) font(bold) capitalize">{name}</h4>
                    <p class="caption c(gray-600)">{props.usage}</p>
                  </div>
                  <code class="text(sm) font(mono) c(gray-600)">{props.value}</code>
                </div>
                
                <!-- Color Preview -->
                <div class="hbox gap(xs)">
                  {#if props.variants && props.variants.length > 1}
                    {#each generateColorScale(props.value) as [variant, color]}
                      <div class="vbox gap(xs) items(center)">
                        <div 
                          class="w(3xl) h(3xl) r(md) border(1/gray-300)"
                          style="background-color: {color}"
                        ></div>
                        <span class="text(xs) font(mono) c(gray-500)">{variant}</span>
                      </div>
                    {/each}
                  {:else}
                    <div class="vbox gap(xs) items(center)">
                      <div 
                        class="w(4xl) h(4xl) r(lg) border(1/gray-300)"
                        style="background-color: {props.value}"
                      ></div>
                      <span class="text(sm) font(mono) c(gray-600)">{name}</span>
                    </div>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </section>
      {/each}
    </div>

    <!-- Copy Button -->
    <div class="text(center)">
      <button 
        on:click={copyColorsCSS}
        class="px(3xl) py(xl) bg(black) c(white) font(bold) tracking(wide) uppercase hover:scale(1.05) transition-transform"
      >
        Copy All Colors CSS
      </button>
    </div>
  </div>
</div>