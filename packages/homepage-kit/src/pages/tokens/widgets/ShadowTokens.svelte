<script lang="ts">
  import { defaultTokens } from 'adorable-css';
  import { Sun, Layers, MousePointer, Sparkles } from 'lucide-svelte';
  
  const shadows = Object.entries(defaultTokens.shadow).map(([key, value]) => ({ key, value }));
  
  // Elevation levels for integrated display
  const elevationLevels = [
    { level: 'xs', dp: '1dp', description: 'Subtle elevation for UI elements' },
    { level: 'sm', dp: '2dp', description: 'Small elevation for cards and buttons' },
    { level: 'md', dp: '4dp', description: 'Medium elevation for raised components' },
    { level: 'lg', dp: '8dp', description: 'Large elevation for dropdowns and tooltips' },
    { level: 'xl', dp: '16dp', description: 'Extra large elevation for modals' },
    { level: '2xl', dp: '24dp', description: 'Maximum elevation for overlays' }
  ];
</script>

<div class="vbox gap(4xl)">
  <!-- Section Header -->
  <div class="text(center)">
    <div class="hbox(pack) gap(sm) mb(xl)">
      <Sun size="24" class="c(indigo-600)" />
      <h2 class="display(lg) c(gray-900)">Shadows & Elevation</h2>
    </div>
    <p class="text(lg) c(gray-600) max-w(2xl) mx(auto)">
      A refined shadow system that creates depth and hierarchy. 
      From subtle elevation to dramatic effects for memorable interfaces.
    </p>
  </div>

  <!-- Shadow Scale -->
  <div class="bg(white) r(2xl) shadow(xl) shadow(gray-200.5) p(2xl) overflow(hidden)">
    <div class="hbox(between/middle) mb(3xl)">
      <div>
        <h3 class="heading(h2) c(gray-900) mb(xs)">Shadow Scale</h3>
        <p class="text(sm) c(gray-600)">Progressive elevation system - hover to feel the depth</p>
      </div>
      <Layers size="20" class="c(gray-400)" />
    </div>
    
    <!-- Horizontal shadow scale -->
    <div class="overflow-x(auto) pb(xl) -mx(xl)">
      <div class="hbox gap(0) px(xl) w(full)">
        {#each shadows as { key, value }, index}
          <div class="group relative flex(1) min-w(0)">
            <!-- Shadow card -->
            <div class="bg(white) h(180px) w(full) shadow({key}) 
                        hover:shadow(2xl) transition-all duration-300 
                        hover:translate-y(-8px) hover:z(10) cursor-pointer
                        border-y(1px/gray-100) 
                        {index === 0 ? 'border-l(1px/gray-100) r(l-lg)' : ''}
                        {index === shadows.length - 1 ? 'border-r(1px/gray-100) r(r-lg)' : ''}
                        relative">
              <div class="vbox(pack) h(full) p(sm)">
                <div class="font(xl) md:font(2xl) bold c(indigo-600) mb(xs)">
                  {key === 'none' ? '0' : key}
                </div>
                <code class="text(2xs) md:text(xs) px(xs) md:px(sm) py(xs) r(md) bg(indigo-50) c(indigo-700) inline-block">
                  shadow({key})
                </code>
              </div>
              
              <!-- Elevation indicator at bottom -->
              <div class="absolute bottom(0) left(0) right(0) h(3px) bg(to-t/indigo-200..transparent)"></div>
            </div>
            
            <!-- Connecting line to show progression -->
            {#if index < shadows.length - 1}
              <div class="absolute top(50%) right(-1px) w(1px) h(30px) bg(gray-200) z(1) translate-y(-50%)"></div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Visual elevation chart -->
    <div class="mt(3xl) pt(3xl) border-t(1px/gray-200)">
      <h4 class="font(lg) bold c(gray-800) mb(xl) text(center)">Elevation Profile</h4>
      <div class="hbox(stretch) gap(0) h(120px) items(end)">
        {#each shadows as { key }, index}
          <div class="flex(1) hbox(pack) relative group">
            <div 
              class="w(full) bg(to-t/indigo-500..indigo-300) transition-all duration-300
                     group-hover:bg(to-t/indigo-600..indigo-400)"
              style="height: {index * 15}%; max-height: 100%"
            >
              <div class="absolute -top(20px) left(50%) translate-x(-50%) text(xs) c(gray-600) whitespace-nowrap">
                {index * 4}dp
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Interactive Shadow Demo -->
  <div class="bg(135deg/indigo-50..purple-50) r(2xl) p(3xl)">
    <h3 class="heading(h2) c(gray-900) mb(2xl) text(center)">Interactive Shadow Demo</h3>
    
    <div class="grid(3) gap(2xl) max-w(4xl) mx(auto)">
      <div class="group cursor-pointer">
        <div class="bg(white) r(xl) p(xl) shadow(sm) 
                    group-hover:shadow(xl) transition-all duration-300 
                    group-hover:translate-y(-4px) group-hover:rotate(-1deg)">
          <MousePointer class="size(32px) c(indigo-600) mb(lg) mx(auto)" />
          <h4 class="font(lg) bold c(gray-900) text(center) mb(sm)">Hover Effect</h4>
          <p class="text(sm) c(gray-600) text(center)">Smooth elevation on hover</p>
        </div>
      </div>
      
      <div class="group cursor-pointer">
        <div class="bg(white) r(xl) p(xl) shadow(md) 
                    group-hover:shadow(2xl) transition-all duration-500 
                    group-hover:scale(1.05)">
          <Sparkles class="size(32px) c(purple-600) mb(lg) mx(auto)" />
          <h4 class="font(lg) bold c(gray-900) text(center) mb(sm)">Scale & Shadow</h4>
          <p class="text(sm) c(gray-600) text(center)">Combined transformations</p>
        </div>
      </div>
      
      <div class="group cursor-pointer">
        <div class="bg(white) r(xl) p(xl) shadow(lg) 
                    group-hover:shadow(none) transition-all duration-300 
                    group-hover:border(2px/indigo-500)">
          <Layers class="size(32px) c(pink-600) mb(lg) mx(auto)" />
          <h4 class="font(lg) bold c(gray-900) text(center) mb(sm)">Press Effect</h4>
          <p class="text(sm) c(gray-600) text(center)">Depth reduction on hover</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Elevation System -->
  <div class="bg(white) r(2xl) shadow(xl) shadow(gray-200.5) p(2xl) overflow(hidden)">
    <div class="hbox(between/middle) mb(3xl)">
      <div>
        <h3 class="heading(h2) c(gray-900) mb(xs)">Elevation System</h3>
        <p class="text(sm) c(gray-600)">Material-inspired elevation using shadow tokens</p>
      </div>
      <Layers size="20" class="c(gray-400)" />
    </div>
    
    <!-- Elevation Scale Grid -->
    <div class="grid(3) gap(xl) mb(3xl)">
      {#each elevationLevels as elevation}
        <div class="group relative">
          <div class="bg(white) h(120px) shadow({elevation.level}) 
                      hover:shadow(2xl) transition-all duration-300 
                      hover:translate-y(-4px) cursor-pointer
                      border(1px/gray-100) r(xl) p(xl)
                      hbox(center/middle)">
            <div class="vbox(center) text(center)">
              <div class="font(2xl) bold c(indigo-600) mb(xs)">
                {elevation.dp}
              </div>
              <code class="text(xs) px(sm) py(xs) r(md) bg(indigo-50) c(indigo-700) inline-block mb(sm)">
                shadow({elevation.level})
              </code>
              <p class="text(2xs) c(gray-600)">{elevation.description}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
    
    <!-- Combined Shadow & Elevation Demo -->
    <div class="pt(3xl) border-t(1px/gray-200)">
      <h4 class="font(lg) bold c(gray-800) mb(xl) text(center)">Shadow & Elevation Combinations</h4>
      <div class="grid(4) gap(lg)">
        <div class="text(center)">
          <div class="size(80px) r(lg) bg(white) shadow(sm) shadow(gray-300.5) hbox(center/middle) mx(auto) mb(md)">
            <span class="text(lg) font(bold) c(gray-700)">Soft</span>
          </div>
          <code class="text(xs) c(gray-600)">shadow(sm) shadow(gray-300.5)</code>
        </div>
        <div class="text(center)">
          <div class="size(80px) r(lg) bg(white) shadow(md) shadow(indigo-200.3) hbox(center/middle) mx(auto) mb(md)">
            <span class="text(lg) font(bold) c(indigo-700)">Color</span>
          </div>
          <code class="text(xs) c(gray-600)">shadow(md) shadow(indigo-200.3)</code>
        </div>
        <div class="text(center)">
          <div class="size(80px) r(lg) bg(gradient(white..gray-50)) shadow(lg) hbox(center/middle) mx(auto) mb(md)">
            <span class="text(lg) font(bold) c(gray-700)">Raised</span>
          </div>
          <code class="text(xs) c(gray-600)">shadow(lg)</code>
        </div>
        <div class="text(center)">
          <div class="size(80px) r(lg) bg(white) shadow(2xl) shadow(purple-200.4) hbox(center/middle) mx(auto) mb(md)">
            <span class="text(lg) font(bold) c(purple-700)">Drama</span>
          </div>
          <code class="text(xs) c(gray-600)">shadow(2xl) shadow(purple-200.4)</code>
        </div>
      </div>
    </div>
  </div>

  <!-- Design Guidelines -->
  <div class="bg(gray-900) r(2xl) p(3xl) c(white)">
    <h3 class="heading(h1) mb(2xl) text(center)">Shadow Design Guidelines</h3>
    <div class="vbox gap(2xl) max-w(4xl) mx(auto)">
      <!-- Material Design Elevation Reference -->
      <div class="bg(white.05) r(xl) p(xl) backdrop-blur(sm)">
        <h4 class="font(xl) bold mb(lg) c(white)">Material Design Elevation</h4>
        <div class="grid(6) gap(lg) text(center)">
          <div>
            <div class="badge(sm/primary) mb(sm)">0dp</div>
            <p class="text(xs) opacity(0.8)">Surface</p>
          </div>
          <div>
            <div class="badge(sm/primary) mb(sm)">1dp</div>
            <p class="text(xs) opacity(0.8)">Card</p>
          </div>
          <div>
            <div class="badge(sm/primary) mb(sm)">2dp</div>
            <p class="text(xs) opacity(0.8)">Button</p>
          </div>
          <div>
            <div class="badge(sm/primary) mb(sm)">4dp</div>
            <p class="text(xs) opacity(0.8)">App Bar</p>
          </div>
          <div>
            <div class="badge(sm/primary) mb(sm)">8dp</div>
            <p class="text(xs) opacity(0.8)">Menu</p>
          </div>
          <div>
            <div class="badge(sm/primary) mb(sm)">24dp</div>
            <p class="text(xs) opacity(0.8)">Dialog</p>
          </div>
        </div>
      </div>
      
      <!-- Usage Tips -->
      <div class="grid(2) gap(xl)">
        <div class="bg(white.1) r(lg) p(lg) backdrop-blur(sm)">
          <h5 class="font(lg) bold mb(md)">🎨 Color Shadows</h5>
          <p class="text(sm) opacity(0.9) mb(md)">
            Add color to shadows for more vibrant, modern designs
          </p>
          <code class="text(xs) bg(white.1) px(sm) py(xs) r(md) block">
            shadow(xl) shadow(purple-200.4)
          </code>
        </div>
        
        <div class="bg(white.1) r(lg) p(lg) backdrop-blur(sm)">
          <h5 class="font(lg) bold mb(md)">🚀 Interactive States</h5>
          <p class="text(sm) opacity(0.9) mb(md)">
            Use shadow transitions for hover and active states
          </p>
          <code class="text(xs) bg(white.1) px(sm) py(xs) r(md) block">
            shadow(sm) hover:shadow(xl)
          </code>
        </div>
      </div>
      
      <!-- Best Practices -->
      <div class="bg(gradient(to-r/purple-600..pink-600)) r(lg) p(lg)">
        <h5 class="font(lg) bold mb(md)">✨ Best Practices</h5>
        <ul class="vbox gap(sm) text(sm)">
          <li class="opacity(0.9)">• Use consistent elevation across similar components</li>
          <li class="opacity(0.9)">• Higher elevation = more importance or temporary state</li>
          <li class="opacity(0.9)">• Combine shadows with transforms for realistic depth</li>
          <li class="opacity(0.9)">• Consider using colored shadows for brand expression</li>
        </ul>
      </div>
    </div>
  </div>
</div>