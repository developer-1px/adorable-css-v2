<script lang="ts">
  import { defaultTokens } from 'adorable-css';
  import { Sun, Layers, MousePointer, Sparkles } from 'lucide-svelte';
  
  const shadows = Object.entries(defaultTokens.shadow).map(([key, value]) => ({ key, value }));
  
  // Component showcase items
  const componentShowcase = [
    {
      title: 'Card Variants',
      items: [
        { name: 'Default', class: 'card()', content: 'Default card with subtle shadow' },
        { name: 'Elevated', class: 'card(elevated)', content: 'Elevated card for emphasis' },
        { name: 'Interactive', class: 'card(interactive)', content: 'Hover me for interaction' },
        { name: 'Glass', class: 'card(glass)', content: 'Glass morphism effect' }
      ]
    },
    {
      title: 'Button Styles',
      items: [
        { name: 'Primary', class: 'btn(primary)', content: 'Primary Action' },
        { name: 'Secondary', class: 'btn(secondary)', content: 'Secondary' },
        { name: 'Ghost', class: 'btn(ghost)', content: 'Ghost Button' },
        { name: 'Danger', class: 'btn(danger)', content: 'Delete' }
      ]
    },
    {
      title: 'Badge Variants',
      items: [
        { name: 'Default', class: 'badge()', content: 'Default' },
        { name: 'Primary', class: 'badge(primary)', content: 'Primary' },
        { name: 'Success', class: 'badge(success)', content: 'Success' },
        { name: 'Warning', class: 'badge(warning)', content: 'Warning' }
      ]
    }
  ];
</script>

<div class="vbox gap(4xl)">
  <!-- Section Header -->
  <div class="text(center)">
    <div class="hbox(center) gap(sm) mb(xl)">
      <Sun size="24" class="c(indigo-600)" />
      <h2 class="heading(display) c(gray-900)">Shadows & Elevation</h2>
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
              <div class="vbox(center/middle) h(full) p(sm)">
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
          <div class="flex(1) hbox(center) relative group">
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

  <!-- Component Showcase -->
  <div class="vbox gap(3xl)">
    <div class="text(center)">
      <h3 class="heading(h1) c(gray-900) mb(sm)">Components in Action</h3>
      <p class="text(lg) c(gray-600)">See how our design tokens come together in real components</p>
    </div>
    
    {#each componentShowcase as section}
      <div class="bg(white) r(2xl) shadow(xl) shadow(gray-200.5) p(2xl)">
        <h4 class="heading(h3) c(gray-900) mb(2xl)">{section.title}</h4>
        
        <div class="grid(2) md:grid(4) gap(xl) items(center)">
          {#each section.items as item}
            <div class="vbox(center) gap(lg)">
              {#if section.title === 'Card Variants'}
                <div class="{item.class} w(full) min-h(120px) hbox(center/middle)">
                  <p class="text(sm) c(gray-700)">{item.content}</p>
                </div>
              {:else if section.title === 'Button Styles'}
                <button class="{item.class}">
                  {item.content}
                </button>
              {:else if section.title === 'Badge Variants'}
                <span class="{item.class}">
                  {item.content}
                </span>
              {/if}
              <code class="text(xs) c(gray-600)">{item.class}</code>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>

  <!-- Elevation Guidelines -->
  <div class="bg(gray-900) r(2xl) p(3xl) c(white)">
    <h3 class="heading(h1) mb(2xl) text(center)">Elevation Guidelines</h3>
    <div class="grid(4) gap(2xl) max-w(5xl) mx(auto)">
      <div class="text(center)">
        <div class="size(80px) r(full) bg(white.1) hbox(center/middle) mx(auto) mb(lg) shadow(sm)">
          <span class="text(2xl) font(bold)">0dp</span>
        </div>
        <h4 class="font(lg) bold mb(sm)">Surface</h4>
        <p class="text(sm) opacity(0.8)">Cards, sheets</p>
      </div>
      <div class="text(center)">
        <div class="size(80px) r(full) bg(white.15) hbox(center/middle) mx(auto) mb(lg) shadow(md)">
          <span class="text(2xl) font(bold)">2dp</span>
        </div>
        <h4 class="font(lg) bold mb(sm)">Raised</h4>
        <p class="text(sm) opacity(0.8)">Buttons, chips</p>
      </div>
      <div class="text(center)">
        <div class="size(80px) r(full) bg(white.2) hbox(center/middle) mx(auto) mb(lg) shadow(lg)">
          <span class="text(2xl) font(bold)">8dp</span>
        </div>
        <h4 class="font(lg) bold mb(sm)">Overlay</h4>
        <p class="text(sm) opacity(0.8)">Dropdowns, tooltips</p>
      </div>
      <div class="text(center)">
        <div class="size(80px) r(full) bg(white.25) hbox(center/middle) mx(auto) mb(lg) shadow(2xl)">
          <span class="text(2xl) font(bold)">24dp</span>
        </div>
        <h4 class="font(lg) bold mb(sm)">Modal</h4>
        <p class="text(sm) opacity(0.8)">Dialogs, sheets</p>
      </div>
    </div>
  </div>
</div>