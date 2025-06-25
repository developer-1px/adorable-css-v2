<script lang="ts">
  import { defaultTokens } from 'adorable-css';
</script>

<div class="spacing-tokens">
  <!-- Spacing Scale -->
  <div class="section-card bg(white/90) backdrop-blur(md) r(2xl) shadow(xl) p(xl) b(1/gray-100) mb(2xl)">
    <h3 class="font(xl) bold c(gray-900) mb(lg)">Spacing Scale</h3>
    <p class="font(sm) c(gray-600) mb(xl)">Consistent spacing system with practical increments</p>
    
    <div class="vbox gap(sm)">
      {#each Object.entries(defaultTokens.spacing) as [key, value]}
        <div class="spacing-row p(md) hover:bg(linear-gradient(to_right,rgb(240,253,244),transparent)) r(xl) transition group">
          <div class="hbox(middle) gap(lg)">
            <div class="token-label min-w(xl) text(right)">
              <code class="font(sm) font(semibold)" style="background: linear-gradient(135deg,#3b82f6,#8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">p({key})</code>
              <div class="font(xs) c(gray-600) font-family(mono)">{value}</div>
            </div>
            <div class="spacing-visual flex(middle) gap(md)">
              <div class="h(2xl) bg(linear-gradient(to_right,rgb(34,197,94),rgb(20,184,166))) r(sm) shadow(sm) group-hover:shadow(md) transition" style="width: {value}"></div>
              <div class="p({key}) bg(linear-gradient(to_bottom_right,rgb(220,252,231),rgb(204,251,241))) b(1/green-300) r(lg) group-hover:shadow(md) transition">
                <div class="bg(linear-gradient(to_bottom_right,rgb(34,197,94),rgb(20,184,166))) w(2xl) h(lg) r(sm)"></div>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Spacing Usage Examples -->
  <div class="section-card bg(white/90) backdrop-blur(md) r(2xl) shadow(xl) p(xl) b(1/gray-100) mb(2xl)">
    <h3 class="font(xl) bold c(gray-900) mb(lg)">Spacing Usage</h3>
    <p class="font(sm) c(gray-600) mb(xl)">Common spacing patterns and combinations</p>
    
    <div class="grid grid-cols(2) md:grid-cols(3) gap(lg)">
      <div class="example-card p(xs) bg(linear-gradient(to_bottom_right,rgb(220,252,231),rgb(204,251,241))) r(xl) b(1/green-200) hover:shadow(lg) transition">
        <div class="bg(white/90) p(xs) r(lg) font(sm) text(center) font(semibold) c(green-700) shadow(sm)">p(xs)</div>
      </div>
      <div class="example-card p(sm) bg(linear-gradient(to_bottom_right,rgb(220,252,231),rgb(204,251,241))) r(xl) b(1/green-200) hover:shadow(lg) transition">
        <div class="bg(white/90) p(sm) r(lg) font(sm) text(center) font(semibold) c(green-700) shadow(sm)">p(sm)</div>
      </div>
      <div class="example-card p(md) bg(linear-gradient(to_bottom_right,rgb(220,252,231),rgb(204,251,241))) r(xl) b(1/green-200) hover:shadow(lg) transition">
        <div class="bg(white/90) p(md) r(lg) font(sm) text(center) font(semibold) c(green-700) shadow(sm)">p(md)</div>
      </div>
      <div class="example-card p(lg) bg(linear-gradient(to_bottom_right,rgb(220,252,231),rgb(204,251,241))) r(xl) b(1/green-200) hover:shadow(lg) transition">
        <div class="bg(white/90) p(lg) r(lg) font(sm) text(center) font(semibold) c(green-700) shadow(sm)">p(lg)</div>
      </div>
      <div class="example-card p(xl) bg(linear-gradient(to_bottom_right,rgb(220,252,231),rgb(204,251,241))) r(xl) b(1/green-200) hover:shadow(lg) transition">
        <div class="bg(white/90) p(xl) r(lg) font(sm) text(center) font(semibold) c(green-700) shadow(sm)">p(xl)</div>
      </div>
      <div class="example-card p(2xl) bg(linear-gradient(to_bottom_right,rgb(220,252,231),rgb(204,251,241))) r(xl) b(1/green-200) hover:shadow(lg) transition">
        <div class="bg(white/90) p(2xl) r(lg) font(sm) text(center) font(semibold) c(green-700) shadow(sm)">p(2xl)</div>
      </div>
    </div>
  </div>

  <!-- Size Tokens -->
  <div class="section-card bg(white/90) backdrop-blur(md) r(2xl) shadow(xl) p(xl) b(1/gray-100)">
    <h3 class="font(xl) bold c(gray-900) mb(lg)">Size Tokens</h3>
    <p class="font(sm) c(gray-600) mb(xl)">Width and height tokens for consistent sizing</p>
    
    <div class="vbox gap(sm)">
      {#each Object.entries(defaultTokens.size) as [key, value]}
        <div class="size-row p(md) hover:bg(linear-gradient(to_right,rgb(240,253,244),transparent)) r(xl) transition group">
          <div class="hbox(middle) gap(lg)">
            <div class="token-label min-w(xl) text(right)">
              <code class="font(sm) font(semibold)" style="background: linear-gradient(135deg,#3b82f6,#8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">w({key})</code>
              <div class="font(xs) c(gray-600) font-family(mono)">{value}</div>
            </div>
            <div class="size-visual flex(middle) gap(md)">
              <div class="w({key}) h({key}) bg(linear-gradient(to_bottom_right,rgb(34,197,94),rgb(20,184,166))) r(lg) shadow(md) hover:shadow(lg) transition"></div>
              <div class="font(xs) c(gray-600) font-family(mono)">h({key})</div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>