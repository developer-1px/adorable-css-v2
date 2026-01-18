<script lang="ts">
  import { defaultTokens } from 'adorable-css';
  import { Sparkles, Copy, Clock, Waves } from 'lucide-svelte';
  
  // Enhanced effects data
  const durationVariants = Object.entries(defaultTokens.duration).map(([key, value]) => ({
    key,
    value,
    usage: getDurationUsage(key),
    category: 'duration'
  }));
  
  const easeVariants = Object.entries(defaultTokens.ease).map(([key, value]) => ({
    key,
    value,
    usage: getEaseUsage(key),
    category: 'easing'
  }));
  
  function getDurationUsage(key: string) {
    const usageMap = {
      'fast': 'Quick micro-interactions, hover states',
      'normal': 'Standard UI transitions, modals',
      'slow': 'Page transitions, complex animations',
      'slower': 'Dramatic reveals, storytelling'
    };
    return usageMap[key] || 'General animation timing';
  }
  
  function getEaseUsage(key: string) {
    const usageMap = {
      'linear': 'Progress bars, loading states',
      'in': 'Element entrances, fade-ins',
      'out': 'Element exits, fade-outs', 
      'in-out': 'Smooth bidirectional animations'
    };
    return usageMap[key] || 'Animation curve';
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
    <div class="absolute top(-lg) left(50%) translate-x(-50%) w(12xl) h(xs) bg(to-r/transparent..primary-300..transparent) opacity(60)"></div>
    
    <div class="hbox(pack) gap(md) mb(xl)">
      <div class="p(md) r(full) bg(to-br/primary-100..primary-200) b(1/primary-200)">
        <Sparkles size="24" class="c(primary)" />
      </div>
      <h2 class="display(lg) c(to-r/primary..primary-700)">Effects & Animation</h2>
    </div>
    <p class="text(xl) c(gray-600) max-w(4xl) mx(auto) leading(relaxed)">
      Carefully crafted timing and easing that brings interfaces to life with purposeful motion
    </p>
    
    <!-- Stats row -->
    <div class="hbox(pack) gap(2xl) mt(2xl) text(center)">
      <div class="vbox gap(xs)">
        <div class="text(2xl) bold c(primary)">{durationVariants.length}</div>
        <div class="text(sm) c(gray-500)">Duration Steps</div>
      </div>
      <div class="vbox gap(xs)">
        <div class="text(2xl) bold c(primary-600)">{easeVariants.length}</div>
        <div class="text(sm) c(gray-500)">Easing Curves</div>
      </div>
      <div class="vbox gap(xs)">
        <div class="text(2xl) bold c(primary-500)">∞</div>
        <div class="text(sm) c(gray-500)">Combinations</div>
      </div>
    </div>
  </div>

  <!-- Animation Duration Tokens -->
  <div class="bg(white) r(3xl) shadow(2xl) shadow(primary-100.3) overflow(hidden) b(1/neutral-100)">
    <div class="bg(to-r/primary-50..neutral-50) p(2xl) bb(1/primary-100)">
      <div class="hbox(between/middle) mb(xl)">
        <div>
          <h3 class="heading(h2) c(gray-900) mb(sm)">Animation Duration</h3>
          <p class="text(base) c(gray-600) max-w(xl)">Precise timing that feels natural and responsive to user interactions</p>
        </div>
        <div class="p(lg) r(2xl) bg(white) shadow(lg)">
          <Clock size="24" class="c(primary)" />
        </div>
      </div>
    </div>
    
    <div class="p(2xl)">
      <div class="vbox gap(xl)">
        {#each durationVariants as { key, value, usage }, index}
          <div class="group relative p(2xl) r(2xl) bg(gray-50) hover:bg(white transition-all duration(500ms) hover:shadow(xl) hover:shadow(primary-100.2) b(1/transparent) hover:b(1/primary-200) cursor-pointer"
               on:click={() => copyCode(`duration(${key})`)}>
            
            <!-- Copy indicator -->
            <div class="absolute top(md) right(md) opacity(0) group-hover:opacity(100) transition-all duration(300ms)">
              {#if copiedCode === `duration(${key})`}
                <div class="px(sm) py(xs) r(full) bg(primary-100) c(primary-700) text(xs) bold">
                  ✓ Copied!
                </div>
              {:else}
                <button class="p(sm) r(full) bg(primary-100) hover:bg(primary-200) transition">
                  <Copy size="14" class="c(primary)" />
                </button>
              {/if}
            </div>
            
            <div class="hbox gap(2xl) items(center)">
              <!-- Meta info -->
              <div class="min-w(15xl)">
                <div class="hbox(middle) gap(md) mb(sm)">
                  <div class="px(md) py(sm) r(full) bg(to-r/primary..primary-700) text(white) text(xs) bold uppercase tracking(wide)">
                    timing
                  </div>
                  <code class="text(sm) px(md) py(sm) r(lg) bg(neutral-900) c(white) font(mono) group-hover:bg(primary) transition">
                    duration({key})
                  </code>
                </div>
                <div class="text(xs) c(gray-500) font(mono) mb(sm)">{value}</div>
                <div class="text(sm) c(gray-700)">{usage}</div>
              </div>
              
              <!-- Animation demo -->
              <div class="flex(1) relative h(4xl) bg(primary-50) r(xl) b(1/primary-200) overflow(hidden)">
                <div class="absolute left(md) top(50%) translate-y(-50%) w(2xl) h(2xl) bg(to-br/primary..primary-600) r(lg) shadow(lg) 
                           group-hover:translate-x(calc(100vw - 400px)) transition-transform duration({key}) ease(out)"></div>
                <div class="absolute right(md) top(50%) translate-y(-50%) text(xs) c(primary) font(mono)">
                  {key}
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Easing Functions -->
  <div class="bg(white) r(3xl) shadow(2xl) shadow(primary-100.3) overflow(hidden) b(1/neutral-100)">
    <div class="bg(to-r/primary-50..primary-100) p(2xl) bb(1/primary-100)">
      <div class="hbox(between/middle) mb(xl)">
        <div>
          <h3 class="heading(h2) c(gray-900) mb(sm)">Easing Functions</h3>
          <p class="text(base) c(gray-600) max-w(xl)">Animation curves that create natural, life-like motion</p>
        </div>
        <div class="p(lg) r(2xl) bg(white) shadow(lg)">
          <Waves size="24" class="c(primary)" />
        </div>
      </div>
    </div>
    
    <div class="p(2xl)">
      <div class="grid(2) gap(xl)">
        {#each easeVariants as { key, value, usage }, index}
          <div class="group relative p(2xl) r(2xl) bg(gray-50) hover:bg(white transition-all duration(500ms) hover:shadow(xl) hover:shadow(primary-100.2) b(1/transparent) hover:b(1/primary-200) cursor-pointer"
               on:click={() => copyCode(`ease(${key})`)}>
            
            <!-- Copy indicator -->
            <div class="absolute top(md) right(md) opacity(0) group-hover:opacity(100) transition-all duration(300ms)">
              {#if copiedCode === `ease(${key})`}
                <div class="px(sm) py(xs) r(full) bg(primary-100) c(primary-700) text(xs) bold">
                  ✓ Copied!
                </div>
              {:else}
                <button class="p(sm) r(full) bg(primary-100) hover:bg(primary-200) transition">
                  <Copy size="14" class="c(blue-600)" />
                </button>
              {/if}
            </div>
            
            <div class="vbox gap(lg)">
              <!-- Header -->
              <div class="hbox(between/middle)">
                <div class="hbox(middle) gap(md)">
                  <div class="px(md) py(sm) r(full) bg(to-r/blue-600..indigo-600) text(white) text(xs) bold uppercase tracking(wide)">
                    curve
                  </div>
                  <code class="text(sm) px(md) py(sm) r(lg) bg(gray-900) c(white) font(mono) group-hover:bg(blue-600) transition">
                    ease({key})
                  </code>
                </div>
                <div class="text(xs) c(gray-400) uppercase tracking(wide)">Curve {index + 1}</div>
              </div>
              
              <!-- Curve visualization -->
              <div class="h(6xl) bg(blue-50) r(xl) border(1px/blue-200) relative overflow(hidden)">
                <!-- Grid background -->
                <div class="absolute inset(0)" style="background-image: 
                     linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
                     background-size: 20px 20px;"></div>
                
                <!-- Demo ball -->
                <div class="absolute left(md) top(md) w(20px) h(20px) bg(to-br/blue-500..indigo-600) r(full) shadow(md) 
                           group-hover:translate-x(200px) group-hover:translate-y(60px) transition-all duration(normal) ease({key})"></div>
                
                <!-- Curve info -->
                <div class="absolute bottom(md) right(md)">
                  <div class="text(xs) c(blue-600) font(mono) bg(white.8) px(sm) py(xs) r(md)">{value}</div>
                </div>
              </div>
              
              <!-- Usage info -->
              <div class="pt(lg) border-t(1px/gray-200)">
                <div class="text(xs) c(gray-500) uppercase tracking(wide) mb(xs)">Best for</div>
                <div class="text(sm) c(gray-700)">{usage}</div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

</div>