<script lang="ts">
  import { defaultTokens } from 'adorable-css';
  import { Ruler, Copy, Grid, Layers, Box } from 'lucide-svelte';
  import TokenSection from '$lib/components/tokens/TokenSection.svelte';
  import TokenCard from '$lib/components/tokens/TokenCard.svelte';
  
  // Enhanced spacing data with usage context
  const spacingVariants = Object.entries(defaultTokens.spacing).map(([key, value]) => ({
    key,
    value,
    usage: getSpacingUsage(key),
    category: getSpacingCategory(key)
  }));
  
  function getSpacingUsage(key: string) {
    const usageMap = {
      'xs': 'Tight spacing, form elements',
      'sm': 'Card padding, button spacing', 
      'md': 'Section spacing, component gaps',
      'lg': 'Layout spacing, content blocks',
      'xl': 'Major sections, page margins',
      '2xl': 'Hero sections, large containers',
      '3xl': 'Page-level spacing',
      '4xl': 'Maximum spacing for emphasis'
    };
    return usageMap[key] || 'General spacing';
  }
  
  function getSpacingCategory(key: string) {
    if (['xs', 'sm'].includes(key)) return 'micro';
    if (['md', 'lg'].includes(key)) return 'component';
    return 'layout';
  }
  
  // Copy functionality
  let copiedCode = '';
  
  function copyCode(code: string) {
    navigator.clipboard.writeText(code);
    copiedCode = code;
    setTimeout(() => copiedCode = '', 2000);
  }
</script>

<TokenSection 
  icon={Ruler}
  iconColor="green-600"
  title="Spacing System"
  description="A mathematical spacing system that creates visual rhythm and perfect alignment"
  gradient={true}
  stats={[
    { value: String(spacingVariants.length), label: 'Spacing Steps', color: 'green-600' },
    { value: '4:1', label: 'Scale Ratio', color: 'emerald-600' },
    { value: '✓', label: 'Responsive', color: 'green-500' }
  ]}
>

  <!-- Quick Spacing Scale Overview -->
  <TokenCard
    title="Spacing Scale"
    subtitle="Visual representation of all spacing tokens"
    gradient={true}
    gradientColors="green-50..emerald-50"
    shadowColor="green-100.3"
  >
    
    <div class="p(2xl)">
      <!-- Horizontal Visual Scale -->
      <div class="bg(gray-50) r(2xl) p(2xl) mb(2xl)">
        <h4 class="text(sm) bold c(gray-700) mb(lg) uppercase tracking(wide)">Visual Scale</h4>
        <div class="hbox(center/middle) gap(lg) items(end)">
          {#each spacingVariants as { key, value }}
            <div class="vbox(center) gap(sm)">
              <!-- Visual bar -->
              <div class="bg(to-br/green-400..emerald-500) r(sm) shadow(sm)" 
                   style="width: 12px; height: {value}; min-height: 4px; max-height: 80px;"></div>
              <!-- Label -->
              <div class="text(xs) c(gray-600) font(mono)">{key}</div>
              <div class="text(xs) c(gray-500) font(mono)">{value}</div>
            </div>
          {/each}
        </div>
        <p class="text(xs) c(gray-500) text(center) mt(lg)">Click spacing examples in the playground below to copy usage</p>
      </div>
    </div>
  </TokenCard>

  <!-- Interactive Spacing Playground -->
  <div class="bg(to-br/slate-50..gray-50) r(3xl) p(3xl) border(1px/gray-200)">
    <div class="text(center) mb(3xl)">
      <h3 class="heading(h2) c(gray-900) mb(sm)">Spacing Playground</h3>
      <p class="text(lg) c(gray-600)">See how different spacing values affect layout and visual hierarchy</p>
    </div>
    
    <div class="grid(3) gap(2xl)">
      <!-- Micro spacing -->
      <div class="bg(white) r(xl) p(xl) shadow(lg) border(1px/green-100)">
        <h4 class="heading(h4) c(gray-900) mb(lg) hbox(middle) gap(sm)">
          <Box size="16" class="c(green-500)" />
          Micro Spacing
        </h4>
        <div class="vbox gap(md)">
          <div class="p(xs) bg(green-50) border(1px/green-200) r(lg)">
            <div class="text(sm) c(gray-700)">p(xs) - Tight elements</div>
          </div>
          <div class="p(sm) bg(green-50) border(1px/green-200) r(lg)">
            <div class="text(sm) c(gray-700)">p(sm) - Form controls</div>
          </div>
        </div>
      </div>
      
      <!-- Component spacing -->
      <div class="bg(white) r(xl) p(xl) shadow(lg) border(1px/emerald-100)">
        <h4 class="heading(h4) c(gray-900) mb(lg) hbox(middle) gap(sm)">
          <Layers size="16" class="c(emerald-500)" />
          Component
        </h4>
        <div class="vbox gap(md)">
          <div class="p(md) bg(emerald-50) border(1px/emerald-200) r(lg)">
            <div class="text(sm) c(gray-700)">p(md) - Cards, panels</div>
          </div>
          <div class="p(lg) bg(emerald-50) border(1px/emerald-200) r(lg)">
            <div class="text(sm) c(gray-700)">p(lg) - Content areas</div>
          </div>
        </div>
      </div>
      
      <!-- Layout spacing -->
      <div class="bg(white) r(xl) p(xl) shadow(lg) border(1px/green-100)">
        <h4 class="heading(h4) c(gray-900) mb(lg) hbox(middle) gap(sm)">
          <Grid size="16" class="c(green-600)" />
          Layout
        </h4>
        <div class="vbox gap(md)">
          <div class="p(xl) bg(green-50) border(1px/green-200) r(lg)">
            <div class="text(sm) c(gray-700)">p(xl) - Sections</div>
          </div>
          <div class="p(2xl) bg(green-50) border(1px/green-200) r(lg)">
            <div class="text(sm) c(gray-700)">p(2xl) - Containers</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Epic Spacing Showcase -->
  <div class="relative overflow(hidden) r(3xl)">
    <!-- Background -->
    <div class="absolute inset(0) bg(135deg/green-600..emerald-600)">
      <div class="absolute inset(0) bg(radial-gradient/circle_at_30%_20%/green-400.3..transparent)"></div>
      <div class="absolute inset(0) bg(radial-gradient/circle_at_70%_80%/emerald-400.3..transparent)"></div>
    </div>
    
    <div class="relative z(10) p(4xl) text(center) c(white)">
      <div class="mb(3xl)">
        <h3 class="heading(hero) mb(lg)">Perfect Spacing</h3>
        <p class="text(xl) opacity(90) max-w(4xl) mx(auto) leading(relaxed)">
          Every pixel matters. Our spacing system creates visual harmony through mathematical precision.
        </p>
      </div>
      
      <!-- Live spacing demo -->
      <div class="bg(white.05) backdrop-blur(md) r(2xl) p(3xl) border(1px/white.1)">
        <div class="grid(3) gap(2xl) max-w(4xl) mx(auto)">
          <div class="vbox gap(lg) p(2xl) bg(white.05) backdrop-blur(md) r(xl) border(1px/white.1) text(center)">
            <div class="p(lg) r(full) bg(white.1) mx(auto) mb(lg)">
              <Ruler size="24" class="c(white)" />
            </div>
            <div class="heading(h4) c(white)">Consistent</div>
            <div class="text(sm) c(white.8) leading(relaxed)">
              Mathematical progression ensures perfect visual rhythm across all screen sizes
            </div>
          </div>
          
          <div class="vbox gap(lg) p(2xl) bg(white.05) backdrop-blur(md) r(xl) border(1px/white.1) text(center)">
            <div class="p(lg) r(full) bg(white.1) mx(auto) mb(lg)">
              <Grid size="24" class="c(white)" />
            </div>
            <div class="heading(h4) c(white)">Responsive</div>
            <div class="text(sm) c(white.8) leading(relaxed)">
              Adapts beautifully from mobile to desktop while maintaining proportional relationships
            </div>
          </div>
          
          <div class="vbox gap(lg) p(2xl) bg(white.05) backdrop-blur(md) r(xl) border(1px/white.1) text(center)">
            <div class="p(lg) r(full) bg(white.1) mx(auto) mb(lg)">
              <Layers size="24" class="c(white)" />
            </div>
            <div class="heading(h4) c(white)">Semantic</div>
            <div class="text(sm) c(white.8) leading(relaxed)">
              Each step has clear purpose and context, making design decisions effortless
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</TokenSection>