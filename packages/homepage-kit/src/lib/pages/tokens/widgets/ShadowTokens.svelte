<script lang="ts">
  import { defaultTokens } from 'adorable-css';
</script>

<div class="shadow-tokens">
  <!-- Shadow System -->
  <div class="section-card bg(white.9) backdrop-blur(md) r(2xl) shadow(xl) p(xl) b(1/gray-100)">
    <h3 class="700 font(xl) c(gray-900) mb(lg)">Shadow System</h3>
    <p class="font(sm) c(gray-600) mb(xl)">Elevation hierarchy for depth and layering</p>
    
    <div class="vbox gap(lg)">
      {#each Object.entries(defaultTokens.shadow) as [key, value]}
        <div class="shadow-demo p(xl) bg(to-right/rgb(238,242,255)..rgb(250,245,255))) r(xl) hover:bg(to-right/rgb(224,231,255)..rgb(243,232,255))) transition">
          <div class="hbox(middle) gap(xl)">
            <div class="min-w(3xl)">
              <code class="600 font(md) c(135deg/#3b82f6..#8b5cf6)">shadow({key})</code>
              <div class="font(xs) c(gray-600) mt(xs) font-family(mono)">{value}</div>
            </div>
            <div class="flex(1) p(xl) bg(white) r(xl) shadow({key}) hover:scale(1.02) transition">
              <div class="600 font(sm) c(gray-800)">Elevation level: {key}</div>
              <div class="font(xs) c(gray-600) mt(xs)">Hover to see the effect</div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>