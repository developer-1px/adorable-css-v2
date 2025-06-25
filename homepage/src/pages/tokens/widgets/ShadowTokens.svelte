<script lang="ts">
  import { defaultTokens } from 'adorable-css';
</script>

<div class="shadow-tokens">
  <!-- Shadow System -->
  <div class="section-card bg(white/90) backdrop-blur(md) r(2xl) shadow(xl) p(xl) b(1/gray-100)">
    <h3 class="font(xl) bold c(gray-900) mb(lg)">Shadow System</h3>
    <p class="font(sm) c(gray-600) mb(xl)">Elevation hierarchy for depth and layering</p>
    
    <div class="vbox gap(lg)">
      {#each Object.entries(defaultTokens.shadow) as [key, value]}
        <div class="shadow-demo p(xl) bg(linear-gradient(to_right,rgb(238,242,255),rgb(250,245,255))) r(xl) hover:bg(linear-gradient(to_right,rgb(224,231,255),rgb(243,232,255))) transition">
          <div class="hbox(middle) gap(xl)">
            <div class="min-w(3xl)">
              <code class="font(md) font(semibold)" style="background: linear-gradient(135deg,#3b82f6,#8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">shadow({key})</code>
              <div class="font(xs) c(gray-600) mt(xs) font-family(mono)">{value}</div>
            </div>
            <div class="flex-1 p(xl) bg(white) r(xl) shadow({key}) hover:scale(1.02) transition">
              <div class="font(sm) c(gray-800) font(semibold)">Elevation level: {key}</div>
              <div class="font(xs) c(gray-600) mt(xs)">Hover to see the effect</div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>