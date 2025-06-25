<script lang="ts">
  import { defaultTokens } from 'adorable-css';
</script>

<div class="effects-tokens">
  <!-- Opacity Levels -->
  <div class="section-card bg(white/90) backdrop-blur(md) r(2xl) shadow(xl) p(xl) b(1/gray-100) mb(2xl)">
    <h3 class="font(xl) bold c(gray-900) mb(lg)">Opacity Levels</h3>
    <p class="font(sm) c(gray-600) mb(xl)">Consistent transparency values</p>
    
    <div class="grid grid-cols(3) md:grid-cols(5) gap(md)">
      {#each Object.entries(defaultTokens.opacity) as [key, value]}
        <div class="opacity-demo text(center) group">
          <div class="relative h(5xl) mb(md)">
            <div class="w(4xl) h(4xl) bg(linear-gradient(to_bottom_right,rgb(20,184,166),rgb(6,182,212))) r(xl) mx(auto) layer(fill)"></div>
            <div class="w(4xl) h(4xl) bg(linear-gradient(to_bottom_right,rgb(168,85,247),rgb(236,72,153))) opacity({key}) r(xl) mx(auto) relative hover:scale(110) transition"></div>
          </div>
          <code class="font(sm) font(semibold)" style="background: linear-gradient(135deg,#3b82f6,#8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">opacity({key})</code>
          <div class="font(xs) c(gray-600) font-family(mono)">{value}</div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Z-Index Scale -->
  <div class="section-card bg(white/90) backdrop-blur(md) r(2xl) shadow(xl) p(xl) b(1/gray-100) mb(2xl)">
    <h3 class="font(xl) bold c(gray-900) mb(lg)">Z-Index Scale</h3>
    <p class="font(sm) c(gray-600) mb(xl)">Layering system for overlapping elements</p>
    
    <div class="grid grid-cols(2) md:grid-cols(3) gap(lg)">
      {#each Object.entries(defaultTokens.zIndex) as [key, value]}
        <div class="z-index-item p(lg) bg(linear-gradient(to_bottom_right,rgb(240,253,250),rgb(236,254,255))) r(xl) b(1/teal-100) hover:shadow(lg) transition group">
          <div class="hbox(middle) gap(sm) mb(sm)">
            <div class="w(32px) h(32px) r(md) bg(teal-500/20) hbox(pack)">
              <div class="font(sm) bold c(teal-700)">{value}</div>
            </div>
            <code class="font(sm) font(semibold)" style="background: linear-gradient(135deg,#3b82f6,#8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">z({key})</code>
          </div>
          <div class="font(sm) c(gray-700) font(medium)">
            {key === 'modal' && 'Modals and dialogs'}
            {key === 'popover' && 'Popovers and tooltips'}
            {key === 'dropdown' && 'Dropdown menus'}
            {key === 'sticky' && 'Sticky headers'}
            {key === 'overlay' && 'Overlays and backdrops'}
            {key === 'base' && 'Base level content'}
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Animation Tokens -->
  <div class="section-card bg(white/90) backdrop-blur(md) r(2xl) shadow(xl) p(xl) b(1/gray-100)">
    <h3 class="font(xl) bold c(gray-900) mb(lg)">Animation Tokens</h3>
    <p class="font(sm) c(gray-600) mb(xl)">Duration and easing functions for smooth animations</p>
    
    <div class="vbox gap(xl)">
      <!-- Durations -->
      <div>
        <h4 class="font(md) font(semibold) mb(md) c(gray-800)">Durations</h4>
        <div class="grid grid-cols(2) md:grid-cols(3) gap(md)">
          {#each Object.entries(defaultTokens.duration) as [key, value]}
            <div class="duration-item p(lg) bg(linear-gradient(to_bottom_right,rgb(236,254,255),rgb(239,246,255))) r(xl) b(1/cyan-100) hbox(middle) gap(md) hover:shadow(lg) transition group">
              <div class="w(3xl) h(3xl) bg(linear-gradient(to_bottom_right,rgb(6,182,212),rgb(59,130,246))) r(lg) shadow(md) animate(pulse/{value}/ease-in-out/infinite)"></div>
              <div>
                <code class="font(sm) font(semibold)" style="background: linear-gradient(135deg,#3b82f6,#8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">duration({key})</code>
                <div class="font(xs) c(gray-600) font-family(mono)">{value}</div>
              </div>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Easing -->
      <div>
        <h4 class="font(md) font(semibold) mb(md) c(gray-800)">Easing Functions</h4>
        <div class="grid grid-cols(2) md:grid-cols(3) gap(md)">
          {#each Object.entries(defaultTokens.ease) as [key, value]}
            <div class="easing-item p(lg) bg(linear-gradient(to_bottom_right,rgb(250,245,255),rgb(253,242,248))) r(xl) b(1/purple-100) hover:shadow(lg) transition group">
              <code class="font(sm) font(semibold)" style="background: linear-gradient(135deg,#3b82f6,#8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">ease({key})</code>
              <div class="font(xs) c(gray-600) mt(xs) font-family(mono)">{value}</div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>