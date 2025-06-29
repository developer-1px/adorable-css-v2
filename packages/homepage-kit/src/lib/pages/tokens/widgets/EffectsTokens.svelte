<script lang="ts">
  import { defaultTokens } from 'adorable-css';
</script>

<div class="effects-tokens">

  <!-- Animation Tokens -->
  <div class="section-card bg(white.9) backdrop-blur(md) r(2xl) shadow(xl) p(xl) b(1/gray-100) mb(2xl)">
    <h3 class="700 font(xl) c(gray-900) mb(lg)">Animation Tokens</h3>
    <p class="font(sm) c(gray-600) mb(xl)">Duration and easing functions for smooth animations</p>
    
    <div class="vbox gap(xl)">
      <!-- Durations -->
      <div>
        <h4 class="600 font(md) mb(md) c(gray-800)">Durations</h4>
        <div class="grid grid-cols(2) md:grid-cols(3) gap(md)">
          {#each Object.entries(defaultTokens.duration) as [key, value]}
            <div class="duration-item p(lg) bg(to-br/rgb(236,254,255)..rgb(239,246,255))) r(xl) b(1/cyan-100) hbox(middle) gap(md) hover:shadow(lg) transition group">
              <div class="1920x1920 bg(to-br/rgb(6,182,212)..rgb(59,130,246))) r(lg) shadow(md) animate(pulse/{value}/ease-in-out/infinite)"></div>
              <div>
                <code class="600 font(sm) c(135deg/#3b82f6..#8b5cf6)">duration({key})</code>
                <div class="font(xs) c(gray-600) font-family(mono)">{value}</div>
              </div>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Easing -->
      <div>
        <h4 class="600 font(md) mb(md) c(gray-800)">Easing Functions</h4>
        <div class="grid grid-cols(2) md:grid-cols(3) gap(md)">
          {#each Object.entries(defaultTokens.ease) as [key, value]}
            <div class="easing-item p(lg) bg(to-br/rgb(250,245,255)..rgb(253,242,248))) r(xl) b(1/purple-100) hover:shadow(lg) transition group">
              <code class="600 font(sm) c(135deg/#3b82f6..#8b5cf6)">ease({key})</code>
              <div class="font(xs) c(gray-600) mt(xs) font-family(mono)">{value}</div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>