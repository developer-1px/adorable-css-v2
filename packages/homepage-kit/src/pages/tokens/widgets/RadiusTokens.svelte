<script lang="ts">
  import { defaultTokens } from 'adorable-css';
  import { Circle, Copy, RectangleHorizontal, Square, Zap } from 'lucide-svelte';
  
  // Enhanced radius data with usage context
  const radiusVariants = Object.entries(defaultTokens.radius).map(([key, value]) => ({
    key,
    value,
    usage: getRadiusUsage(key),
    category: getRadiusCategory(key)
  }));
  
  function getRadiusUsage(key: string) {
    const usageMap = {
      'none': 'Sharp edges, formal interfaces',
      'sm': 'Inputs, badges, small elements',
      'md': 'Cards, buttons, form controls', 
      'lg': 'Panels, modals, content blocks',
      'xl': 'Hero sections, large containers',
      '2xl': 'Feature cards, major sections',
      '3xl': 'Dramatic rounded elements',
      'full': 'Circles, pills, avatars'
    };
    return usageMap[key] || 'General rounding';
  }
  
  function getRadiusCategory(key: string) {
    if (['none', 'sm'].includes(key)) return 'subtle';
    if (['md', 'lg'].includes(key)) return 'moderate';
    if (key === 'full') return 'circular';
    return 'dramatic';
  }
  
  // Copy functionality
  let copiedCode = '';
  
  function copyCode(code: string) {
    navigator.clipboard.writeText(code);
    copiedCode = code;
    setTimeout(() => copiedCode = '', 2000);
  }
</script>

<div class="vbox gap(5xl)">
  <!-- Enhanced Section Header -->
  <div class="text(center) relative">
    <!-- Floating decoration -->
    <div class="absolute top(-20px) left(50%) translate-x(-50%) w(200px) h(1px) bg(to-r/transparent..orange-300..transparent) opacity(60)"></div>
    
    <div class="hbox(pack) gap(md) mb(xl)">
      <div class="p(md) r(full) bg(to-br/orange-100..amber-100) border(1px/orange-200)">
        <Circle size="24" class="c(orange-600)" />
      </div>
      <h2 class="display(lg) c(to-r/orange-600..amber-600)">Border Radius</h2>
    </div>
    <p class="text(xl) c(gray-600) max-w(4xl) mx(auto) leading(relaxed)">
      Thoughtful corner radius that brings softness and personality to every interface element
    </p>
    
    <!-- Stats row -->
    <div class="hbox(pack) gap(2xl) mt(2xl) text(center)">
      <div class="vbox gap(xs)">
        <div class="text(2xl) bold c(orange-600)">{radiusVariants.length}</div>
        <div class="text(sm) c(gray-500)">Radius Steps</div>
      </div>
      <div class="vbox gap(xs)">
        <div class="text(2xl) bold c(amber-600)">∞</div>
        <div class="text(sm) c(gray-500)">From Sharp to Round</div>
      </div>
      <div class="vbox gap(xs)">
        <div class="text(2xl) bold c(orange-500)">✓</div>
        <div class="text(sm) c(gray-500)">Perfect Curves</div>
      </div>
    </div>
  </div>

  <!-- Quick Radius Scale Overview -->
  <div class="bg(white) r(3xl) shadow(xl) shadow(orange-100.3) overflow(hidden) border(1px/gray-100)">
    <div class="bg(to-r/orange-50..amber-50) p(2xl) border-b(1px/orange-100)">
      <div class="hbox(between/middle) mb(xl)">
        <div>
          <h3 class="heading(h2) c(gray-900) mb(sm)">Radius Scale</h3>
          <p class="text(base) c(gray-600) max-w(xl)">From sharp precision to gentle curves, each radius serves a purpose</p>
        </div>
        <div class="p(lg) r(2xl) bg(white) shadow(lg)">
          <RectangleHorizontal size="24" class="c(orange-500)" />
        </div>
      </div>
    </div>
    
    <div class="p(2xl)">
      <!-- Horizontal Visual Scale -->
      <div class="bg(gray-50) r(2xl) p(2xl) mb(2xl)">
        <h4 class="text(sm) bold c(gray-700) mb(lg) uppercase tracking(wide)">Visual Scale</h4>
        <div class="hbox(center/middle) gap(xl) items(center)">
          {#each radiusVariants as { key, value }}
            <div class="vbox(center) gap(sm)">
              <!-- Visual square with radius -->
              <div class="w(48px) h(48px) bg(to-br/orange-400..amber-500) r({key}) shadow(md) hover:shadow(lg) transition"></div>
              <!-- Label -->
              <div class="text(xs) c(gray-600) font(mono)">{key}</div>
              <div class="text(xs) c(gray-500) font(mono)">{value}</div>
            </div>
          {/each}
        </div>
        <p class="text(xs) c(gray-500) text(center) mt(lg)">See radius applied to different UI components in the playground below</p>
      </div>
    </div>
  </div>

  <!-- Interactive Radius Playground -->
  <div class="bg(to-br/slate-50..gray-50) r(3xl) p(3xl) border(1px/gray-200)">
    <div class="text(center) mb(3xl)">
      <h3 class="heading(h2) c(gray-900) mb(sm)">Radius in Context</h3>
      <p class="text(lg) c(gray-600)">See how different radius values work across various UI components</p>
    </div>
    
    <div class="grid(3) gap(2xl)">
      <!-- UI Elements -->
      <div class="bg(white) r(xl) p(xl) shadow(lg) border(1px/orange-100)">
        <h4 class="heading(h4) c(gray-900) mb(lg) hbox(middle) gap(sm)">
          <Square size="16" class="c(orange-500)" />
          UI Elements
        </h4>
        <div class="vbox gap(md)">
          <button class="px(lg) py(md) bg(orange-500) c(white) r(sm) hover:r(md) transition-all duration-300">
            Button r(sm)
          </button>
          <div class="px(md) py(sm) bg(orange-50) border(1px/orange-200) r(md)">
            Input r(md)
          </div>
          <span class="px(sm) py(xs) bg(orange-100) c(orange-700) r(lg) text(sm) inline-block">
            Badge r(lg)
          </span>
        </div>
      </div>
      
      <!-- Cards & Panels -->
      <div class="bg(white) r(xl) p(xl) shadow(lg) border(1px/amber-100)">
        <h4 class="heading(h4) c(gray-900) mb(lg) hbox(middle) gap(sm)">
          <RectangleHorizontal size="16" class="c(amber-500)" />
          Cards & Panels
        </h4>
        <div class="vbox gap(md)">
          <div class="p(md) bg(amber-50) border(1px/amber-200) r(lg)">
            <div class="text(sm) c(gray-700)">Card r(lg)</div>
          </div>
          <div class="p(lg) bg(amber-50) border(1px/amber-200) r(xl)">
            <div class="text(sm) c(gray-700)">Panel r(xl)</div>
          </div>
          <div class="p(xl) bg(amber-50) border(1px/amber-200) r(2xl)">
            <div class="text(sm) c(gray-700)">Container r(2xl)</div>
          </div>
        </div>
      </div>
      
      <!-- Special Cases -->
      <div class="bg(white) r(xl) p(xl) shadow(lg) border(1px/orange-100)">
        <h4 class="heading(h4) c(gray-900) mb(lg) hbox(middle) gap(sm)">
          <Circle size="16" class="c(orange-600)" />
          Special Cases
        </h4>
        <div class="vbox gap(md) items(start)">
          <div class="w(40px) h(40px) bg(orange-200) r(full) hbox(center/middle)">
            <span class="text(xs) font(mono)">full</span>
          </div>
          <div class="px(lg) py(sm) bg(orange-100) c(orange-700) r(full)">
            Pill Button
          </div>
          <div class="w(60px) h(20px) bg(orange-300) r(3xl)"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Epic Radius Showcase -->
  <div class="relative overflow(hidden) r(3xl)">
    <!-- Background -->
    <div class="absolute inset(0) bg(135deg/orange-600..amber-600)">
      <div class="absolute inset(0) bg(radial-gradient/circle_at_30%_20%/orange-400.3..transparent)"></div>
      <div class="absolute inset(0) bg(radial-gradient/circle_at_70%_80%/amber-400.3..transparent)"></div>
    </div>
    
    <div class="relative z(10) p(4xl) text(center) c(white)">
      <div class="mb(3xl)">
        <h3 class="heading(hero) mb(lg)">Perfect Curves</h3>
        <p class="text(xl) opacity(90) max-w(4xl) mx(auto) leading(relaxed)">
          From sharp precision to gentle curves, radius creates personality and hierarchy in your interface.
        </p>
      </div>
      
      <!-- Live radius demo -->
      <div class="bg(white.05) backdrop-blur(md) r(2xl) p(3xl) border(1px/white.1)">
        <div class="grid(3) gap(2xl) max-w(4xl) mx(auto)">
          <div class="vbox gap(lg) p(2xl) bg(white.05) backdrop-blur(md) r(xl) border(1px/white.1) text(center)">
            <div class="p(lg) r(full) bg(white.1) mx(auto) mb(lg)">
              <Square size="24" class="c(white)" />
            </div>
            <div class="heading(h4) c(white)">Purposeful</div>
            <div class="text(sm) c(white.8) leading(relaxed)">
              Each radius value serves a specific purpose in the interface hierarchy
            </div>
          </div>
          
          <div class="vbox gap(lg) p(2xl) bg(white.05) backdrop-blur(md) r(xl) border(1px/white.1) text(center)">
            <div class="p(lg) r(full) bg(white.1) mx(auto) mb(lg)">
              <RectangleHorizontal size="24" class="c(white)" />
            </div>
            <div class="heading(h4) c(white)">Harmonious</div>
            <div class="text(sm) c(white.8) leading(relaxed)">
              Consistent scaling creates visual harmony across all component sizes
            </div>
          </div>
          
          <div class="vbox gap(lg) p(2xl) bg(white.05) backdrop-blur(md) r(xl) border(1px/white.1) text(center)">
            <div class="p(lg) r(full) bg(white.1) mx(auto) mb(lg)">
              <Zap size="24" class="c(white)" />
            </div>
            <div class="heading(h4) c(white)">Modern</div>
            <div class="text(sm) c(white.8) leading(relaxed)">
              Contemporary radius values that feel fresh and approachable
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>