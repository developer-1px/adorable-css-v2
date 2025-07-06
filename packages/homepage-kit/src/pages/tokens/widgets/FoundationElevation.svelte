<script lang="ts">
  import { Layers, Box, Card as CardIcon, Monitor, Smartphone, Tablet } from 'lucide-svelte';
  import { Card } from '$lib/components/ui';

  // Elevation levels based on Material Design with AdorableCSS naming
  const elevationLevels = [
    {
      name: 'Surface',
      level: 0,
      shadow: 'none',
      usage: 'Default surface, no elevation',
      examples: 'Background, default cards',
      zIndex: 0
    },
    {
      name: 'Subtle',
      level: 1,
      shadow: 'xs',
      usage: 'Slight elevation for cards and containers',
      examples: 'Content cards, form inputs',
      zIndex: 1
    },
    {
      name: 'Raised',
      level: 2,
      shadow: 'sm',
      usage: 'Elevated content and interactive elements',
      examples: 'Buttons, hover states, active cards',
      zIndex: 10
    },
    {
      name: 'Floating',
      level: 3,
      shadow: 'md',
      usage: 'Floating elements and focused states',
      examples: 'Focused inputs, selected items',
      zIndex: 20
    },
    {
      name: 'Lifted',
      level: 4,
      shadow: 'lg',
      usage: 'Prominent floating elements',
      examples: 'Navigation bars, toolbars',
      zIndex: 30
    },
    {
      name: 'Overlay',
      level: 5,
      shadow: 'xl',
      usage: 'Overlay elements above main content',
      examples: 'Dropdowns, tooltips, popovers',
      zIndex: 1000
    },
    {
      name: 'Modal',
      level: 6,
      shadow: '2xl',
      usage: 'Modal and dialog overlays',
      examples: 'Modals, dialogs, drawer panels',
      zIndex: 1400
    }
  ];

  // Component elevation examples
  const componentExamples = [
    {
      component: 'Card',
      defaultElevation: 'Subtle',
      hoverElevation: 'Raised',
      description: 'Content containers with subtle elevation'
    },
    {
      component: 'Button',
      defaultElevation: 'Raised',
      hoverElevation: 'Floating',
      description: 'Interactive elements with clear affordance'
    },
    {
      component: 'Navigation',
      defaultElevation: 'Lifted',
      hoverElevation: 'Lifted',
      description: 'Always above content for easy access'
    },
    {
      component: 'Dropdown',
      defaultElevation: 'Overlay',
      hoverElevation: 'Overlay',
      description: 'Temporary overlays above interface'
    }
  ];

  // Interactive examples
  let hoveredCard = null;
</script>

<div class="vbox gap(4xl)">
  <!-- Section Header -->
  <div class="text(center)">
    <div class="hbox(pack) gap(sm)">
      <Layers size="2xl" class="c(primary)" />
      <h1 class="display(lg) gradient">Elevation System</h1>
    </div>
    <p class="body(lg) c(neutral-600) max-w(4xl) mx(auto) pt(xl)">
      A systematic approach to depth and hierarchy using shadows and z-index. 
      Creates visual layers that guide user attention and establish clear information architecture.
    </p>
  </div>

  <!-- Elevation Levels -->
  <div class="vbox gap(3xl)">
    <div class="vbox gap(lg)">
      <h2 class="heading(h2) c(gray-900)">Elevation Levels</h2>
      <p class="body(md) c(gray-600)">
        Seven distinct elevation levels, each with specific use cases and z-index values.
      </p>
    </div>

    <div class="grid(1) md:grid(2) lg:grid(3) gap(xl)">
      {#each elevationLevels as elevation}
        <div 
          class="vbox gap(lg) p(2xl) bg(white) r(xl) shadow({elevation.shadow}) border(1/gray-100) transition-all duration(300) hover:translate-y(-4)"
          on:mouseenter={() => hoveredCard = elevation.level}
          on:mouseleave={() => hoveredCard = null}
        >
          <!-- Level Info -->
          <div class="vbox gap(sm)">
            <div class="hbox(between) items(center)">
              <div class="title(lg) c(gray-900)">{elevation.name}</div>
              <div class="caption bg(purple-100) c(purple-700) px(sm) py(xs) r(full)">
                Level {elevation.level}
              </div>
            </div>
            <div class="body(sm) c(gray-600)">{elevation.usage}</div>
          </div>

          <!-- Shadow Demo -->
          <div class="vbox gap(md)">
            <div class="caption c(gray-700)">Shadow:</div>
            <div class="relative h(4xl) bg(gray-50) r(md) overflow(hidden)">
              <div 
                class="absolute top(50%) left(50%) translate(-50%, -50%) w(2xl) h(xl) bg(white) r(sm) shadow({elevation.shadow}) transition-all"
                class:scale(110)={hoveredCard === elevation.level}
              ></div>
            </div>
          </div>

          <!-- Technical Details -->
          <div class="vbox gap(sm)">
            <div class="hbox(between)">
              <span class="caption c(gray-500)">Shadow Token:</span>
              <code class="mono caption bg(gray-100) px(xs) r(xs)">shadow({elevation.shadow})</code>
            </div>
            <div class="hbox(between)">
              <span class="caption c(gray-500)">Z-Index:</span>
              <code class="mono caption bg(gray-100) px(xs) r(xs)">{elevation.zIndex}</code>
            </div>
          </div>

          <!-- Examples -->
          <div class="vbox gap(sm)">
            <div class="caption c(gray-700)">Examples:</div>
            <div class="body(sm) c(gray-600)">{elevation.examples}</div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Component Usage -->
  <div class="vbox gap(3xl)">
    <div class="vbox gap(lg)">
      <h2 class="heading(h2) c(gray-900)">Component Elevation</h2>
      <p class="body(md) c(gray-600)">
        How different components use elevation to communicate their role and state.
      </p>
    </div>

    <div class="grid(2) gap(xl)">
      {#each componentExamples as example}
        <Card size="lg">
          <div class="vbox gap(lg)">
            <div class="vbox gap(sm)">
              <h3 class="title(lg) c(gray-900)">{example.component}</h3>
              <p class="body(sm) c(gray-600)">{example.description}</p>
            </div>

            <!-- State Examples -->
            <div class="vbox gap(md)">
              <div class="caption c(gray-700)">Elevation States:</div>
              
              <div class="hbox gap(lg)">
                <!-- Default State -->
                <div class="vbox gap(sm) text(center)">
                  <div class="caption c(gray-600)">Default</div>
                  <div 
                    class="w(5xl) h(3xl) bg(white) r(md) shadow({elevationLevels.find(e => e.name === example.defaultElevation)?.shadow}) border(1/gray-200) hbox(center)"
                  >
                    <Box size="md" class="c(gray-400)" />
                  </div>
                  <code class="mono caption">
                    {elevationLevels.find(e => e.name === example.defaultElevation)?.shadow}
                  </code>
                </div>

                <!-- Hover State -->
                <div class="vbox gap(sm) text(center)">
                  <div class="caption c(gray-600)">Hover</div>
                  <div 
                    class="w(5xl) h(3xl) bg(white) r(md) shadow({elevationLevels.find(e => e.name === example.hoverElevation)?.shadow}) border(1/gray-200) hbox(center) transform translate-y(-xs)"
                  >
                    <Box size="md" class="c(purple-500)" />
                  </div>
                  <code class="mono caption">
                    {elevationLevels.find(e => e.name === example.hoverElevation)?.shadow}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </Card>
      {/each}
    </div>
  </div>

  <!-- Usage Guidelines -->
  <div class="vbox gap(3xl)">
    <div class="vbox gap(lg)">
      <h2 class="heading(h2) c(gray-900)">Usage Guidelines</h2>
      <p class="body(md) c(gray-600)">
        Best practices for implementing elevation in your design system.
      </p>
    </div>

    <div class="grid(3) gap(xl)">
      <!-- Consistency -->
      <Card size="lg" class="border(2/blue-200) bg(blue-50)">
        <div class="vbox gap(lg)">
          <div class="hbox gap(sm) items(center)">
            <Layers size="xl" class="c(blue-600)" />
            <div class="title(md) c(blue-900)">Consistency</div>
          </div>
          
          <div class="vbox gap(md)">
            <div class="body(sm) c(blue-800)">
              Use consistent elevation levels across similar components
            </div>
            <div class="body(sm) c(blue-800)">
              Maintain the same hover states for interactive elements
            </div>
            <div class="body(sm) c(blue-800)">
              Follow the established z-index hierarchy
            </div>
          </div>
        </div>
      </Card>

      <!-- Hierarchy -->
      <Card size="lg" class="border(2/purple-200) bg(purple-50)">
        <div class="vbox gap(lg)">
          <div class="hbox gap(sm) items(center)">
            <CardIcon size="xl" class="c(purple-600)" />
            <div class="title(md) c(purple-900)">Hierarchy</div>
          </div>
          
          <div class="vbox gap(md)">
            <div class="body(sm) c(purple-800)">
              Higher elevation indicates higher importance
            </div>
            <div class="body(sm) c(purple-800)">
              Use elevation to guide user attention
            </div>
            <div class="body(sm) c(purple-800)">
              Don't skip elevation levels arbitrarily
            </div>
          </div>
        </div>
      </Card>

      <!-- Performance -->
      <Card size="lg" class="border(2/green-200) bg(green-50)">
        <div class="vbox gap(lg)">
          <div class="hbox gap(sm) items(center)">
            <Monitor size="xl" class="c(green-600)" />
            <div class="title(md) c(green-900)">Performance</div>
          </div>
          
          <div class="vbox gap(md)">
            <div class="body(sm) c(green-800)">
              Use CSS transforms for hover effects
            </div>
            <div class="body(sm) c(green-800)">
              Avoid excessive shadow blur on mobile
            </div>
            <div class="body(sm) c(green-800)">
              Consider reduced motion preferences
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>

  <!-- Implementation Example -->
  <div class="vbox gap(3xl)">
    <div class="vbox gap(lg)">
      <h2 class="heading(h2) c(gray-900)">Implementation</h2>
      <p class="body(md) c(gray-600)">
        Example code for implementing elevation in your components.
      </p>
    </div>

    <Card size="lg" class="bg(gray-50)">
      <div class="vbox gap(lg)">
        <div class="title(md) c(gray-900)">CSS Example</div>
        
        <pre class="mono caption leading(relaxed) overflow(x-auto)"><code>{`<!-- Basic elevation -->
<div class="shadow(sm) hover:shadow(md) transition">
  Card with subtle elevation
</div>

<!-- Interactive button -->
<button class="shadow(sm) hover:shadow(lg) hover:translate-y(-2) transition-all">
  Elevated button
</button>

<!-- Modal overlay -->
<div class="shadow(2xl) z(modal) backdrop-blur(md)">
  Modal content
</div>`}</code></pre>
      </div>
    </Card>
  </div>
</div>