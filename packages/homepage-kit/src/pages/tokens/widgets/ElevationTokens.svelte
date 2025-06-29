<script lang="ts">
  import { Layers, Copy, Check } from 'lucide-svelte';
  
  let copiedCode = '';
  let copiedIndex = -1;
  
  async function copyCode(code: string, index: number) {
    try {
      await navigator.clipboard.writeText(code);
      copiedCode = code;
      copiedIndex = index;
      setTimeout(() => {
        copiedCode = '';
        copiedIndex = -1;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  // Elevation levels based on Material Design
  const elevationVariants = [
    { 
      level: 0, 
      usage: 'No elevation', 
      description: 'Default state, no shadow',
      example: 'Base surfaces'
    },
    { 
      level: 1, 
      usage: 'Subtle lift', 
      description: 'Cards, chips, or small components',
      example: 'Card components'
    },
    { 
      level: 2, 
      usage: 'Raised surface', 
      description: 'Raised buttons, small dialogs',
      example: 'Raised buttons'
    },
    { 
      level: 4, 
      usage: 'Prominent surface', 
      description: 'App bars, tabs, large components',
      example: 'Navigation headers'
    },
    { 
      level: 6, 
      usage: 'High emphasis', 
      description: 'Floating action buttons, snackbars',
      example: 'FAB buttons'
    },
    { 
      level: 8, 
      usage: 'Modal surface', 
      description: 'Modal dialogs, drawers',
      example: 'Modal dialogs'
    },
    { 
      level: 12, 
      usage: 'Prominent modal', 
      description: 'Large modals, sheets',
      example: 'Bottom sheets'
    },
    { 
      level: 16, 
      usage: 'High modal', 
      description: 'Important notifications',
      example: 'Alert dialogs'
    },
    { 
      level: 24, 
      usage: 'Maximum elevation', 
      description: 'Critical alerts, highest priority',
      example: 'System alerts'
    }
  ];
</script>

<div class="vbox gap(2xl)">
  <!-- Section Header -->
  <div class="hbox(middle) gap(md) mb(lg)">
    <div class="hbox(middle) gap(sm) p(md) bg(to-br/purple-100..indigo-100) r(lg)">
      <Layers size="20" class="c(purple-600)" />
    </div>
    <div class="vbox gap(xs)">
      <h2 class="font(2xl) bold c(gray-900)">Elevation</h2>
      <p class="c(gray-600)">Material Design inspired depth system with layered shadows</p>
    </div>
  </div>

  <!-- Description -->
  <div class="p(xl) bg(purple-50) r(xl) border(1px/purple-100)">
    <h3 class="font(lg) bold c(purple-900) mb(sm)">About Elevation</h3>
    <p class="c(purple-800) line-height(1.6) mb(md)">
      Our elevation system combines <strong>key light</strong> (directional shadows) and 
      <strong>ambient light</strong> (soft shadows) to create realistic depth perception. 
      Each level provides a specific use case for interface hierarchy.
    </p>
    <div class="hbox gap(md) text(sm)">
      <div class="hbox(middle) gap(xs)">
        <span class="w(8px) h(8px) r(full) bg(purple-600)"></span>
        <span class="c(purple-700)">Key Shadow: Directional depth</span>
      </div>
      <div class="hbox(middle) gap(xs)">
        <span class="w(8px) h(8px) r(full) bg(purple-400)"></span>
        <span class="c(purple-700)">Ambient Shadow: Soft depth</span>
      </div>
    </div>
  </div>

  <!-- Interactive Elevation Grid -->
  <div class="vbox gap(xl)">
    <h3 class="font(xl) bold c(gray-900)">Interactive Elevation Levels</h3>
    
    <div class="grid(3) gap(xl) ..md:grid(2) ..sm:grid(1)">
      {#each elevationVariants as { level, usage, description, example }, index}
        <div 
          class="group relative p(2xl) r(2xl) bg(white) hover:bg(gray-50) transition-all duration-300 cursor-pointer border(1px/gray-200) hover:border(purple-200) elevation({level})"
          role="button"
          tabindex="0"
          on:click={() => copyCode(`elevation(${level})`, index)}
          on:keydown={(e) => e.key === 'Enter' && copyCode(`elevation(${level})`, index)}
        >
          <!-- Copy feedback -->
          <div class="absolute top(md) right(md) opacity(0) group-hover:opacity(100) transition-opacity">
            {#if copiedIndex === index}
              <div class="hbox(middle) gap(xs) px(sm) py(xs) bg(green-100) c(green-700) r(md) text(xs) font(medium)">
                <Check size="12" />
                <span>Copied!</span>
              </div>
            {:else}
              <div class="hbox(middle) gap(xs) px(sm) py(xs) bg(gray-100) c(gray-600) r(md) text(xs) font(medium)">
                <Copy size="12" />
                <span>Copy</span>
              </div>
            {/if}
          </div>

          <!-- Content -->
          <div class="vbox gap(md)">
            <!-- Level indicator -->
            <div class="hbox(between) items(center)">
              <div class="hbox(middle) gap(sm)">
                <code class="px(sm) py(xs) bg(purple-100) c(purple-700) r(md) font(mono) text(sm) font(bold)">
                  elevation({level})
                </code>
                <span class="text(xs) c(gray-500) font(medium) uppercase tracking(0.1em)">
                  Level {level}
                </span>
              </div>
            </div>

            <!-- Visual demonstration -->
            <div class="relative h(80px) bg(gray-50) r(lg) overflow(hidden) hbox(center) items(center)">
              <div class="w(60px) h(60px) bg(white) r(lg) elevation({level}) hbox(center) items(center)">
                <span class="text(xs) c(gray-500) font(bold)">{level}</span>
              </div>
            </div>

            <!-- Usage info -->
            <div class="vbox gap(xs)">
              <h4 class="font(md) bold c(gray-900)">{usage}</h4>
              <p class="text(sm) c(gray-600) line-height(1.5)">{description}</p>
              <p class="text(xs) c(purple-600) font(medium)">Example: {example}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Code Examples -->
  <div class="vbox gap(lg) p(xl) bg(gray-50) r(xl) border(1px/gray-200)">
    <h3 class="font(xl) bold c(gray-900)">Usage Examples</h3>
    
    <div class="vbox gap(md)">
      <!-- Basic usage -->
      <div class="vbox gap(sm)">
        <h4 class="font(md) bold c(gray-800)">Basic Usage</h4>
        <div class="p(md) bg(gray-900) r(lg) font(mono) text(sm) c(gray-100)">
          <div class="vbox gap(xs)">
            <div><span class="c(gray-500)">&lt;!-- Card component --&gt;</span></div>
            <div><span class="c(blue-400)">&lt;div</span> <span class="c(green-400)">class</span>=<span class="c(yellow-300)">"p(xl) bg(white) r(lg) elevation(2)"</span><span class="c(blue-400)">&gt;</span></div>
            <div class="ml(md)">Card content with subtle elevation</div>
            <div><span class="c(blue-400)">&lt;/div&gt;</span></div>
          </div>
        </div>
      </div>

      <!-- Interactive states -->
      <div class="vbox gap(sm)">
        <h4 class="font(md) bold c(gray-800)">Interactive States</h4>
        <div class="p(md) bg(gray-900) r(lg) font(mono) text(sm) c(gray-100)">
          <div class="vbox gap(xs)">
            <div><span class="c(gray-500)">&lt;!-- Button with hover elevation --&gt;</span></div>
            <div><span class="c(blue-400)">&lt;button</span> <span class="c(green-400)">class</span>=<span class="c(yellow-300)">"elevation(2) hover:elevation(4) transition"</span><span class="c(blue-400)">&gt;</span></div>
            <div class="ml(md)">Hover for higher elevation</div>
            <div><span class="c(blue-400)">&lt;/button&gt;</span></div>
          </div>
        </div>
      </div>

      <!-- Component combinations -->
      <div class="vbox gap(sm)">
        <h4 class="font(md) bold c(gray-800)">Component Combinations</h4>
        <div class="p(md) bg(gray-900) r(lg) font(mono) text(sm) c(gray-100)">
          <div class="vbox gap(xs)">
            <div><span class="c(gray-500)">&lt;!-- Modal dialog --&gt;</span></div>
            <div><span class="c(blue-400)">&lt;div</span> <span class="c(green-400)">class</span>=<span class="c(yellow-300)">"bg(white) r(2xl) p(2xl) elevation(8) max-w(md)"</span><span class="c(blue-400)">&gt;</span></div>
            <div class="ml(md)">Modal content</div>
            <div><span class="c(blue-400)">&lt;/div&gt;</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Design Guidelines -->
  <div class="vbox gap(lg) p(xl) bg(blue-50) r(xl) border(1px/blue-100)">
    <h3 class="font(xl) bold c(blue-900)">Design Guidelines</h3>
    
    <div class="grid(2) gap(lg) ..md:grid(1)">
      <!-- Do's -->
      <div class="vbox gap(md)">
        <h4 class="font(md) bold c(green-700) hbox(middle) gap(xs)">
          <span class="w(12px) h(12px) r(full) bg(green-500)"></span>
          Do's
        </h4>
        <ul class="vbox gap(sm) text(sm) c(green-800)">
          <li class="hbox gap(sm)">
            <span class="c(green-500)">•</span>
            <span>Use consistent elevation levels across similar components</span>
          </li>
          <li class="hbox gap(sm)">
            <span class="c(green-500)">•</span>
            <span>Higher elevation for more important content</span>
          </li>
          <li class="hbox gap(sm)">
            <span class="c(green-500)">•</span>
            <span>Use elevation to establish visual hierarchy</span>
          </li>
          <li class="hbox gap(sm)">
            <span class="c(green-500)">•</span>
            <span>Consider elevation in dark mode designs</span>
          </li>
        </ul>
      </div>

      <!-- Don'ts -->
      <div class="vbox gap(md)">
        <h4 class="font(md) bold c(red-700) hbox(middle) gap(xs)">
          <span class="w(12px) h(12px) r(full) bg(red-500)"></span>
          Don'ts
        </h4>
        <ul class="vbox gap(sm) text(sm) c(red-800)">
          <li class="hbox gap(sm)">
            <span class="c(red-500)">•</span>
            <span>Don't use too many different elevation levels</span>
          </li>
          <li class="hbox gap(sm)">
            <span class="c(red-500)">•</span>
            <span>Avoid excessive elevation for small components</span>
          </li>
          <li class="hbox gap(sm)">
            <span class="c(red-500)">•</span>
            <span>Don't stack high elevations without purpose</span>
          </li>
          <li class="hbox gap(sm)">
            <span class="c(red-500)">•</span>
            <span>Avoid elevation conflicts between overlapping elements</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

<style>
  /* Smooth transitions for elevation changes */
  :global(.transition-elevation) {
    transition: box-shadow 0.3s ease-out;
  }
  
  /* Smooth copy feedback */
  button:active {
    transform: scale(0.95);
    transition: transform 0.1s ease;
  }
  
  /* Code block styling improvements */
  :global(.font\(mono\)) {
    font-family: 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace;
  }
</style>